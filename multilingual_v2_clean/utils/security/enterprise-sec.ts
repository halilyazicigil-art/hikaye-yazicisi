import crypto from 'crypto';
import { SupabaseClient } from '@supabase/supabase-js';

// 🛡️ GÜVENLİ PAYLAŞILAN ANAHTAR (SHARED SECRET)
const DEFAULT_WORKER_KEY = 'lumibook_secure_worker_auth_key_2026';

/**
 * EnterpriseSec: LumiBook Faz 1 Kurumsal Güvenlik ve Koruma Kalkanı Servisi
 */
export class EnterpriseSec {
  
  /**
   * 1. API Token Doğrulama (Edge / Serverless Uyumlu)
   * /api/story-worker ucuna gelen isteklerin yetkisini doğrular.
   */
  static verifyApiToken(req: Request): boolean {
    try {
      const headerKey = req.headers.get('x-internal-worker-key');
      const expectedKey = process.env.INTERNAL_WORKER_KEY || DEFAULT_WORKER_KEY;
      
      if (!headerKey) return false;
      
      // Zaman saldırılarına (timing attacks) karşı güvenli karşılaştırma
      return crypto.timingSafeEqual(
        Buffer.from(headerKey),
        Buffer.from(expectedKey)
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * 2. API İstek Başlıkları Oluşturma
   * Fetch isteklerine eklenecek güvenli yetkilendirme başlıklarını döner.
   */
  static getAuthorizationHeaders(): Record<string, string> {
    return {
      'x-internal-worker-key': process.env.INTERNAL_WORKER_KEY || DEFAULT_WORKER_KEY,
      'Content-Type': 'application/json'
    };
  }

  /**
   * 3. PBKDF2 Tabanlı PIN Hashleme (GDPR / SOC2 Uyumlu)
   * Düz metin PIN kodunu güvenli ve tuzlanmış (salted) PBKDF2 hash formatına dönüştürür.
   */
  static hashPin(pin: string): string {
    if (!pin) throw new Error('PIN kodu boş olamaz');
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(pin, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  /**
   * 4. PIN Doğrulama
   * Kullanıcının girdiği PIN kodunun hash ile eşleşmesini doğrular.
   */
  static verifyPin(pin: string, storedValue: string): boolean {
    if (!pin || !storedValue || !storedValue.includes(':')) return false;
    try {
      const [salt, originalHash] = storedValue.split(':');
      const hash = crypto.pbkdf2Sync(pin, salt, 1000, 64, 'sha512').toString('hex');
      
      return crypto.timingSafeEqual(
        Buffer.from(hash),
        Buffer.from(originalHash)
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * 5. Atomik Önbellek Kopyalama (Database Transaction RPC Fallback)
   * Story kopyalama ve fake job ekleme adımlarını atomik olarak veritabanında çalıştırır.
   * Supabase RPC yüklüyse RPC'yi çalıştırır, yüklü değilse sıralı ama güvenli rollback mantığı uygular.
   */
  static async executeAtomicCacheCopy(
    supabase: SupabaseClient,
    params: {
      userId: string;
      masterStoryId: string;
      status: string;
      payload: any;
      fingerprint: string;
      scheduledAt: string;
      estimatedDuration: number;
    }
  ): Promise<{ success: boolean; jobId?: string; error?: string }> {
    try {
      // Önce veritabanındaki RPC fonksiyonunu deniyoruz (En yüksek güvenlik & atomiklik seviyesi)
      const { data: jobId, error: rpcErr } = await supabase.rpc('copy_story_and_create_job', {
        p_user_id: params.userId,
        p_master_story_id: params.masterStoryId,
        p_status: params.status,
        p_payload: params.payload,
        p_fingerprint: params.fingerprint,
        p_scheduled_at: params.scheduledAt,
        p_estimated_duration: params.estimatedDuration
      });

      if (!rpcErr && jobId) {
        console.log(`>>> [RPC TRANSACTION SUCCESS] Job Created Atomically: ${jobId}`);
        return { success: true, jobId };
      }

      // Eğer RPC veritabanında henüz yüklü değilse (Fallback Modu)
      // Cerrahi geri alma (Rollback) mantığı ile sıralı güvenli işlemler başlatılır:
      console.warn(`>>> [RPC FALLBACK WARNING] Stored Procedure bulunamadı, sıralı işlem yapılıyor... ${rpcErr?.message}`);

      // A. Master masalı çek
      const { data: masterStory, error: getErr } = await supabase
        .from('stories')
        .select('*')
        .eq('id', params.masterStoryId)
        .single();

      if (getErr || !masterStory) {
        return { success: false, error: `Master hikaye bulunamadı: ${getErr?.message}` };
      }

      // B. Yeni hikayeyi ekle
      const { data: copiedStory, error: copyErr } = await supabase
        .from('stories')
        .insert({
          user_id: params.userId,
          title: masterStory.title,
          content_json: masterStory.content_json,
          image_url: masterStory.image_url,
          audio_url: masterStory.audio_url,
          is_shuffle: masterStory.is_shuffle,
          metadata: masterStory.metadata
        })
        .select()
        .single();

      if (copyErr || !copiedStory) {
        return { success: false, error: `Hikaye kopyalanamadı: ${copyErr?.message}` };
      }

      // C. Sanal işi (fake job) ekle
      const { data: fakeJob, error: jobErr } = await supabase
        .from('generation_jobs')
        .insert({
          user_id: params.userId,
          status: params.status,
          progress: 0,
          story_id: copiedStory.id,
          payload: params.payload,
          fingerprint: params.fingerprint,
          scheduled_at: params.scheduledAt,
          estimated_duration: params.estimatedDuration
        })
        .select()
        .single();

      if (jobErr || !fakeJob) {
        // 🚨 ROLLBACK SİMÜLASYONU: İkinci adım çökerse, ilk adımdaki kopyalanan hikayeyi veritabanından güvenle siliyoruz!
        console.error(`>>> [TRANSACTION ROLLBACK] Job oluşturulamadı, kopyalanan story (${copiedStory.id}) temizleniyor...`);
        await supabase.from('stories').delete().eq('id', copiedStory.id);
        return { success: false, error: `Sanal iş oluşturulamadı: ${jobErr?.message}` };
      }

      return { success: true, jobId: fakeJob.id };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * 6. Atomik Shuffle Bul & Kopyala (Race Condition Kalkanı)
   * 300 eşzamanlı kullanıcı aynı anda "Karıştır" bassın — hepsi
   * hazır taslaktan kopyalanır, hiçbiri null alıp sıfırdan üretime düşmez.
   *
   * Tek PostgreSQL transaction: bul → kopyala → job oluştur.
   * RPC başarısız olursa → null döner → çağıran sıfırdan üretir.
   */
  static async findAndCopyShuffleAtomic(
    adminSupabase: SupabaseClient,
    params: {
      fingerprints: string[];
      userId: string;
      status: string;
      payload: any;
      fingerprint: string;
      scheduledAt: string;
      estimatedDuration: number;
    }
  ): Promise<{ success: boolean; jobId?: string; error?: string }> {
    try {
      const { data: newJobId, error: rpcErr } = await adminSupabase.rpc(
        'find_and_copy_shuffle',
        {
          p_fingerprints:        params.fingerprints,
          p_user_id:             params.userId,
          p_status:              params.status,
          p_payload:             params.payload,
          p_fingerprint:         params.fingerprint,
          p_scheduled_at:        params.scheduledAt,
          p_estimated_duration:  params.estimatedDuration,
        }
      );

      if (rpcErr) {
        console.error(`>>> [SHUFFLE RPC ERROR] ${rpcErr.message}`);
        return { success: false, error: rpcErr.message };
      }

      if (!newJobId) {
        // Taslak bulunamadı → sıfırdan üretim başlatılmalı
        return { success: false, error: 'no_cache_hit' };
      }

      console.log(`>>> [SHUFFLE ATOMIC HIT] Job kopyalandı: ${newJobId}`);
      return { success: true, jobId: newJobId };

    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
