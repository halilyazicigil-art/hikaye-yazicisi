import { SupabaseClient } from '@supabase/supabase-js';

export class ApiSlotBroker {
  /**
   * 🛡️ ATOMİK API YUVASI KİRALA (ACQUIRE API SLOT)
   * Bu fonksiyon, bir iş (Job) için boş olan ilk yuvayı (primary veya backup) atomically kiralar.
   * Eğer veritabanı şeması henüz kurulmadıysa (SQL çalıştırılmadıysa) veya hata alınırsa,
   * sistemin çökmesini engellemek için defensive fallback olarak 'primary' döner.
   * 
   * @param supabase Supabase Admin veya Server Client
   * @param jobId Masal üretim işinin UUID'si
   * @returns 'primary' | 'backup' | null (Kiralanamadıysa null döner)
   */
  public static async acquireSlot(
    supabase: SupabaseClient,
    jobId: string
  ): Promise<'primary' | 'backup' | null> {
    try {
      const { data, error } = await supabase.rpc('acquire_api_slot', {
        p_job_id: jobId
      });

      if (error) {
        if (error.code === 'PGRST202' || error.code === 'PGRST205' || error.message.includes('acquire_api_slot')) {
          console.warn(
            `⚠️ [ApiSlotBroker Fallback] Supabase RPC 'acquire_api_slot' bulunamadı! ` +
            `Lütfen api_slots.sql dosyasındaki sorguları Supabase SQL Editor üzerinden çalıştırın. ` +
            `Defensive Fallback olarak 'primary' slotu kiralanmış varsayılıyor.`
          );
          return 'primary';
        }
        
        console.error(`❌ [ApiSlotBroker Error] Slot kiralama hatası: ${error.message}`);
        return null;
      }

      if (data === 'primary' || data === 'backup') {
        return data as 'primary' | 'backup';
      }

      return null;
    } catch (err: any) {
      console.error(`❌ [ApiSlotBroker Exception] Beklenmeyen hata: ${err.message}`);
      return 'primary';
    }
  }

  /**
   * 🔓 API YUVASINI SERBEST BIRAK (RELEASE API SLOT)
   * İş bittiğinde veya hata aldığında kiralanan yuvayı serbest bırakır.
   * 
   * @param supabase Supabase Admin veya Server Client
   * @param jobId Masal üretim işinin UUID'si
   */
  public static async releaseSlot(
    supabase: SupabaseClient,
    jobId: string
  ): Promise<void> {
    try {
      const { error } = await supabase.rpc('release_api_slot', {
        p_job_id: jobId
      });

      if (error) {
        if (error.code !== 'PGRST202' && error.code !== 'PGRST205') {
          console.error(`❌ [ApiSlotBroker Error] Slot serbest bırakma hatası: ${error.message}`);
        }
      }
    } catch (err: any) {
      console.error(`❌ [ApiSlotBroker Exception] Serbest bırakırken beklenmeyen hata: ${err.message}`);
    }
  }
}
