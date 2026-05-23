import { useEffect, useRef } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { RealtimeGuard, JobState } from '../utils/realtime-guard'

interface UseJobTrackerProps {
  supabase: SupabaseClient
  jobId: string | null
  onSuccess: (storyId: string) => void
  onFailure: (errorMessage: string) => void
  onProgress?: (job: JobState) => void
  pollingIntervalMs?: number
}

/**
 * 🏛️ KURUMSAL HASSAS TAKİP KANCASI (useJobTracker)
 * 
 * Bu kanca, verilen jobId için hem Supabase Realtime (Katman 1) hem de
 * güvenli Fallback Polling (Katman 2) mekanizmalarını paralel yönetir.
 */
export function useJobTracker({
  supabase,
  jobId,
  onSuccess,
  onFailure,
  onProgress,
  pollingIntervalMs = 3000
}: UseJobTrackerProps) {
  // Callback'lerin güncel referanslarını koru (React rerender optimizasyonu)
  const onSuccessRef = useRef(onSuccess)
  const onFailureRef = useRef(onFailure)
  const onProgressRef = useRef(onProgress)

  useEffect(() => {
    onSuccessRef.current = onSuccess
    onFailureRef.current = onFailure
    onProgressRef.current = onProgress
  }, [onSuccess, onFailure, onProgress])

  useEffect(() => {
    if (!jobId) return

    let pollingInterval: NodeJS.Timeout | null = null
    let channel: any = null
    let eventSource: EventSource | null = null
    let isTerminated = false

    const handleAction = (job: JobState) => {
      if (isTerminated) return
      
      if (onProgressRef.current) {
        onProgressRef.current(job)
      }

      const didAct = RealtimeGuard.evaluateJobAction(
        job,
        (storyId) => {
          isTerminated = true
          onSuccessRef.current(storyId)
        },
        (errorMsg) => {
          isTerminated = true
          onFailureRef.current(errorMsg)
        }
      )

      if (didAct) {
        cleanup()
      }
    }

    const cleanup = () => {
      isTerminated = true
      if (pollingInterval) {
        clearInterval(pollingInterval)
        pollingInterval = null
      }
      if (channel) {
        supabase.removeChannel(channel)
        channel = null
      }
      if (eventSource) {
        eventSource.close()
        eventSource = null
      }
    }

    // 🚀 [KATMAN 1]: High-Speed Server-Sent Events (SSE) Canlı İlerleme Yayını
    try {
      if (typeof window !== 'undefined' && window.EventSource) {
        eventSource = new EventSource(`/api/story-progress?jobId=${jobId}`)
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data && data.progress !== undefined) {
              handleAction({
                id: jobId,
                progress: data.progress,
                status: data.status,
                story_id: data.storyId,
                error_message: data.error
              } as JobState)
            }
          } catch (e) {
            console.error('[useJobTracker] SSE parsing error:', e)
          }
        }
        eventSource.onerror = (err) => {
          console.warn('[useJobTracker] SSE stream errored, fallback active:', err)
          if (eventSource) {
            eventSource.close()
            eventSource = null
          }
        }
      }
    } catch (err) {
      console.error('[useJobTracker] SSE failed to initialize:', err)
    }

    // 🚀 [KATMAN 2]: Supabase Row-Specific Realtime Aboneliği
    try {
      channel = supabase
        .channel(`job-shield-${jobId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'generation_jobs',
            filter: `id=eq.${jobId}`
          },
          (payload) => {
            if (payload.new) {
              handleAction(payload.new as JobState)
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`[useJobTracker] Realtime subscribed for job: ${jobId}`)
          }
        })
    } catch (err) {
      console.error('[useJobTracker] Realtime subscription failed, fallback active:', err)
    }

    // 🚀 [KATMAN 3]: Güvenli Yedekleme Sorgulaması (Fallback Polling)
    pollingInterval = setInterval(async () => {
      if (isTerminated) return
      
      const latestJobState = await RealtimeGuard.checkJobStatus(supabase, jobId)
      if (latestJobState) {
        handleAction(latestJobState)
      }
    }, pollingIntervalMs)

    // İlk durumu hemen anında sorgula (Sayfa yenilense bile kaldığı yerden devam etsin)
    RealtimeGuard.checkJobStatus(supabase, jobId).then((initialState) => {
      if (initialState) {
        handleAction(initialState)
      }
    })

    return () => {
      cleanup()
    }
  }, [supabase, jobId, pollingIntervalMs])
}
