import { SupabaseClient } from '@supabase/supabase-js'

export interface JobState {
  status: string
  progress: number
  story_id?: string
  error_message?: string
}

/**
 * 🏛️ KURUMSAL KORUMA KALKANI (RealtimeGuard)
 * 
 * Bu yardımcı sınıf, Supabase Realtime bağlantı kesintilerinden korur ve 
 * işlerin tamamlanma durumunu (polling ve row-specific) güvenle sorgular.
 */
export class RealtimeGuard {
  /**
   * Belirtilen işin durumunu veritabanından doğrudan sorgular (Polling Fallback)
   */
  static async checkJobStatus(
    supabase: SupabaseClient,
    jobId: string
  ): Promise<JobState | null> {
    try {
      const { data, error } = await supabase
        .from('generation_jobs')
        .select('status, progress, story_id, error_message')
        .eq('id', jobId)
        .maybeSingle()

      if (error) {
        console.error(`[RealtimeGuard.checkJobStatus] DB Error for job ${jobId}:`, error)
        return null
      }

      return data as JobState
    } catch (e) {
      console.error(`[RealtimeGuard.checkJobStatus] Unexpected Error for job ${jobId}:`, e)
      return null
    }
  }

  /**
   * İş durumuna göre yapılması gereken eylemi belirler (Yönlendirme veya Hata Yönetimi)
   */
  static evaluateJobAction(
    job: JobState,
    onSuccess: (storyId: string) => void,
    onFailure: (errorMessage: string) => void
  ): boolean {
    if (job.status === 'completed' && job.story_id) {
      onSuccess(job.story_id)
      return true // Aksiyon alındı (Yönlendirildi)
    }

    if (job.status === 'failed') {
      onFailure(job.error_message || 'Bilinmeyen bir hata oluştu.')
      return true // Aksiyon alındı (Hata gösterildi)
    }

    return false // Aksiyon alınmadı (İş devam ediyor)
  }
}
