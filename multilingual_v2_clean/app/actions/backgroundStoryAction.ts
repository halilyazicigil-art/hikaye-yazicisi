'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { QuotaService } from '@/services/QuotaService'
import { EnterpriseSec } from '@/utils/security/enterprise-sec'

export async function backgroundStoryAction(formData: {
    hero: string;
    theme: string;
    voiceOption: string;
    age: string;
    style: string;
    elevenVoiceId?: string;
    master_ref_story_id?: string | null;
    isShuffle?: boolean;
    language?: string;
    originalPrompt?: string; // Akıllı eşleşme için yalın konu metni
    tab?: string; // 'normal', 'egitici', 'devam', 'kisa'
    metadata?: any; // Arayüzden gelen tüm seçimlerin (Tür, Stil vb.) taşındığı güvenli paket
}) {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // 1. KOTA BİLGİLERİNİ MERKEZDEN ÇEK (Veritabanı Yükünü Azaltır)
        const quotaStats = await QuotaService.getUserQuotaStats(supabase, user.id);
        const limits = QuotaService.getPlanLimits(quotaStats.planId, false);
        
        const totalLimit = quotaStats.totalLimit;
        const shuffleLimit = quotaStats.shuffleLimit;
        const manualLimit = quotaStats.manualLimit;
        const audioLimit = limits.audioLimit; // Ses limiti statik olarak çekilir
        
        const wordLimit = quotaStats.isPremium ? 500 : (quotaStats.isPro ? 250 : 300);

        // 🚨 KOTA ENGELLEME (GÜVENLİK DUVARI) - [CERRAHİ MERKEZİLEŞTİRME]
        if (quotaStats.isSuspended) {
            throw new Error('Hesabınız sistem yöneticisi tarafından askıya alınmıştır. Lütfen destek ekibiyle iletişime geçin.');
        }

        const validation = QuotaService.validateQuota(quotaStats, {
            isShuffle: formData.isShuffle,
            isAudio: formData.voiceOption !== 'Sessiz',
            tab: formData.tab
        });

        if (!validation.success) {
            throw new Error(validation.message);
        }

        // --- [KURUMSAL KUYRUK VE CACHE MİMARİSİ v4] ---

        // 1. Normalizasyon ve Parmak İzi (Fingerprint) Oluşturma
        const normalize = (txt: string) => txt.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g," ").trim();
        const pChars = (formData.hero || "").split(',').map((c: string) => c.trim()).sort().join(', ');
        
        // 🚀 FİX: Admin (Uzun) ve Kullanıcı (Kısa) parmak izlerini aynı anda aramak için liste oluşturuyoruz.
        const fingerprints = [];
        const shortFingerprint = formData.originalPrompt ? `${normalize(pChars)}|${normalize(formData.originalPrompt)}` : null;
        const longFingerprint = formData.theme ? `${normalize(pChars)}|${normalize(formData.theme)}` : null;

        if (shortFingerprint) fingerprints.push(shortFingerprint);
        if (longFingerprint && longFingerprint !== shortFingerprint) fingerprints.push(longFingerprint);

        // Sisteme kaydedilecek ASIL parmak izi (Tercihen kısa olan)
        const mainFingerprint = shortFingerprint || longFingerprint || "";

        // 2. Kullanıcının aktif işi var mı? (Kuyruk ve cooldown hesabı için)
        const { data: activeJobs } = await supabase
            .from('generation_jobs')
            .select('id, status')
            .eq('user_id', user.id)
            .in('status', ['processing', 'pending', 'cached_processing']);

        const hasActiveJob = (activeJobs?.length || 0) > 0;

        // Son biten işin zamanını bul (60 sn mola kuralı için)
        const { data: lastJob } = await supabase
            .from('generation_jobs')
            .select('completed_at')
            .eq('user_id', user.id)
            .eq('status', 'completed')
            .order('completed_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        let scheduledAt = new Date();
        const cooldownMs = 60 * 1000;
        if (lastJob?.completed_at) {
            const lastCompleted = new Date(lastJob.completed_at);
            const nextPossibleStart = new Date(lastCompleted.getTime() + cooldownMs);
            if (nextPossibleStart > scheduledAt) {
                scheduledAt = nextPossibleStart;
            }
        }

        const initialStatus = hasActiveJob ? 'waiting_in_queue' : (scheduledAt > new Date() ? 'waiting_in_queue' : 'pending');

        // 3. CACHE HIT — Atomik Shuffle Bul & Kopyala (Race Condition Kalkanı)
        // Eski yöntem: Önce oku → sonra kopyala (2 sorgu → race condition riski).
        // Yeni yöntem: PostgreSQL'de tek transaction'da hem bul hem kopyala.
        // 300 kullanıcı aynı anda bassın → hepsi hazır taslaktan kopyalanır.
        if (!formData.master_ref_story_id && fingerprints.length > 0) {
            const shuffleResult = await EnterpriseSec.findAndCopyShuffleAtomic(adminSupabase, {
                fingerprints,
                userId: user.id,
                status: hasActiveJob ? 'waiting_in_queue' : (scheduledAt > new Date() ? 'waiting_in_queue' : 'cached_processing'),
                payload: { ...formData, fingerprint: mainFingerprint },
                fingerprint: mainFingerprint,
                scheduledAt: scheduledAt.toISOString(),
                estimatedDuration: 180
            });

            if (shuffleResult.success && shuffleResult.jobId) {
                console.log(`>>> [ATOMIC CACHE HIT]: Job ID: ${shuffleResult.jobId}`);
                return { success: true, jobId: shuffleResult.jobId };
            }

            // 'no_cache_hit' → taslak yok, sıfırdan üretime devam et
            // Diğer hata → sıfırdan üretime devam et (güvenli fallback)
            if (shuffleResult.error && shuffleResult.error !== 'no_cache_hit') {
                console.warn(`>>> [SHUFFLE FALLBACK] RPC hatası, sıfırdan üretim başlıyor: ${shuffleResult.error}`);
            }
        }

        // 5. FRESH GENERATION (SIFIRDAN ÜRETİM) DURUMU
        const { data: job, error: jobErr } = await supabase.from('generation_jobs').insert({
            user_id: user.id,
            status: initialStatus,
            progress: 0,
            payload: { ...formData, wordLimit, user_id: user.id, fingerprint: mainFingerprint, metadata: formData.metadata },
            fingerprint: mainFingerprint,
            scheduled_at: scheduledAt.toISOString(),
            estimated_duration: 0 // Canlı üretim
        }).select().single();

        if (jobErr) throw jobErr;

        // Eğer iş hemen başlayabiliyorsa worker'ı tetikle
        if (initialStatus === 'pending') {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:5353';
            const workerUrl = `${appUrl}/api/story-worker`;
            
            fetch(workerUrl, {
                method: 'POST',
                headers: EnterpriseSec.getAuthorizationHeaders(),
                body: JSON.stringify({ jobId: job.id }),
            }).catch((err) => {
                console.warn(`>>> [ACTION] Worker tetikleme sinyali zayıf: ${err.message}`);
            });
        }

        return { success: true, jobId: job.id };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(">>> [BACKGROUND ACTION HATA]:", message);
        return { success: false, error: message };
    }
}
