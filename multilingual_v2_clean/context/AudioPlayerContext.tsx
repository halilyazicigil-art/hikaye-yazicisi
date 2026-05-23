'use client'

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

export interface Track {
  id: string
  title: string
  audioUrl: string
  imageUrl: string
  source?: string
  playlistId?: string
}

export type ViewMode = 'background' | 'reader' | 'fullscreen'

export interface CelebrationData {
  rewardType: 'xp' | 'badge'
  xpAdded?: number
  petStats?: {
    xp: number
    level: number
    stage: string
    levelUp: boolean
    evolved: boolean
  }
  newlyEarnedBadges?: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
}

interface AudioPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  isPlayerVisible: boolean
  queue: Track[]
  playedTracks: Track[]
  playTrack: (track: Track) => void
  addToQueue: (track: Track) => void
  playList: (tracks: Track[]) => void
  removeFromQueue: (id: string) => void
  playNext: () => void
  togglePlay: () => void
  seekTo: (percentage: number) => void
  closePlayer: () => void
  skipForward: () => void
  skipBackward: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  setOnQueueEnd: (cb: ((tracks: Track[], pendingXP: CelebrationData[]) => void) | null) => void
  clearPlayedTracks: () => void
  celebration: CelebrationData | null
  setCelebration: (data: CelebrationData | null) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [queue, setQueue] = useState<Track[]>([])
  const [playedTracks, setPlayedTracks] = useState<Track[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('background')
  const [userPlan, setUserPlan] = useState<string>('free')
  const [celebration, setCelebration] = useState<CelebrationData | null>(null)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const onQueueEndRef = useRef<((tracks: Track[], pendingXP: CelebrationData[]) => void) | null>(null)
  const listenedSecondsRef = useRef<Set<number>>(new Set())
  // Kuyrukta birden fazla hikaye varken kazanılan XP'yi biriktir
  const pendingXPDataRef = useRef<CelebrationData[]>([])
  // Kuyruk başladığında (birden fazla hikaye) XP gösterimini ertele
  const isInQueueModeRef = useRef<boolean>(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUserPlan = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: sub } = await supabase.from('subscriptions').select('plan_id').eq('user_id', user.id).maybeSingle()
        setUserPlan(sub?.plan_id || 'free')
      }
    }
    fetchUserPlan()
  }, [supabase])

  // Reset the unique listening tracker when track changes
  useEffect(() => {
    listenedSecondsRef.current.clear()
  }, [currentTrack?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime)
      if (audio.duration) {
        const sec = Math.floor(audio.currentTime)
        listenedSecondsRef.current.add(sec)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      triggerGamificationCompletion()
      playNext()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, queue])

  const triggerGamificationCompletion = async () => {
    if (!currentTrack || !currentTrack.id) return

    const durationSec = audioRef.current?.duration || duration
    const uniqueSecondsListened = listenedSecondsRef.current.size

    if (!durationSec || durationSec <= 0 || uniqueSecondsListened <= 0) return

    // Hile koruması: Ses dosyasının gerçekten sonuna gelinip gelinmediğini kontrol et (ended = true veya son 1.5 saniye)
    const isAudioEnded = audioRef.current?.ended || (audioRef.current && Math.abs(audioRef.current.currentTime - durationSec) < 1.5)
    if (!isAudioEnded) {
      console.log('[GAMIFICATION] Hile koruması: Ses dosyası sonuna ulaşılmadı veya çalma tamamlanmadı.')
      return
    }

    const source = currentTrack.source || 'library'
    const threshold = durationSec * 0.8

    if (uniqueSecondsListened < threshold) {
      console.log(`[GAMIFICATION] Hile koruması tetiklendi. Dinlenen benzersiz saniye: ${uniqueSecondsListened}, gereken: ${Math.ceil(threshold)}`)
      return
    }

    try {
      const res = await fetch('/api/gamification/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          storyId: currentTrack.id,
          source,
          secondsListened: uniqueSecondsListened,
          duration: durationSec
        })
      })

      if (!res.ok) {
        console.error('[GAMIFICATION] Hikaye tamamlama API hatası:', res.statusText)
        return
      }

      const data = await res.json()
      if (data.success && data.rewarded) {
        const celebData: CelebrationData = {
          rewardType: data.reward_type,
          xpAdded: data.xp_added,
          petStats: data.pet_stats ? {
            xp: data.pet_stats.xp,
            level: data.pet_stats.level,
            stage: data.pet_stats.stage,
            levelUp: data.pet_stats.level_up,
            evolved: data.pet_stats.evolved
          } : undefined,
          newlyEarnedBadges: data.newly_earned_badges && data.newly_earned_badges.length > 0 ? data.newly_earned_badges : undefined
        }

        if (isInQueueModeRef.current) {
          // Kuyruk modu: XP'yi biriktir, modal açma
          pendingXPDataRef.current.push(celebData)
        } else {
          // Tek hikaye: normal modal aç
          setCelebration(celebData)
        }
      }
    } catch (err) {
      console.error('[GAMIFICATION] İstek gönderilirken hata oluştu:', err)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn('Audio play blocked by browser:', e)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlayerVisible(true)
      setIsPlaying(true)
      return
    }
    // Önceki track varsa played listesine ekle
    if (currentTrack) {
      setPlayedTracks(prev => {
        if (prev.find(t => t.id === currentTrack.id)) return prev
        return [...prev, currentTrack]
      })
    }
    setCurrentTrack(track)
    setIsPlayerVisible(true)
    setIsPlaying(true)
    setProgress(0)
  }

  const addToQueue = (track: Track) => {
    const limit = userPlan === 'premium' ? 15 : (userPlan === 'pro' ? 5 : 0)

    if (limit === 0) {
      toast.warning("Sihirli Dinleme Listesi özelliği sadece Gümüş Gökyüzü ve Altın Güneş paketlerinde mevcuttur. Lütfen paketini yükselt!")
      return
    }

    // Zaten listede veya çalıyor mu kontrol et
    if (currentTrack?.id === track.id || queue.find(i => i.id === track.id)) {
      return
    }

    const currentTotal = (currentTrack ? 1 : 0) + queue.length

    if (currentTotal >= limit) {
      toast.warning(`Sihirli Dinleme Listesi sınırına ulaştın! ${userPlan === 'pro' ? 'Gümüş Gökyüzü' : 'Altın Güneş'} paket limitin ${limit} masaldır.`)
      return
    }

    if (!currentTrack) {
      playTrack(track)
    } else {
      // Kuyruğa ekleme → kuyruk modunu aktifleştir
      // Not: Zaten kuyruk modundaysak mevcut birikmiş XP'yi SIFIRLAMA
      if (!isInQueueModeRef.current) {
        isInQueueModeRef.current = true
        pendingXPDataRef.current = []
      }
      setQueue(prev => [...prev, track])
      toast.success("Masal dinleme listesine eklendi!")
    }
  }

  const playList = (tracks: Track[]) => {
    if (tracks.length === 0) return

    const limit = userPlan === 'premium' ? 15 : (userPlan === 'pro' ? 5 : 0)

    if (limit === 0) {
      toast.warning("Sihirli Dinleme Listesi özelliği sadece Gümüş Gökyüzü ve Altın Güneş paketlerinde mevcuttur. Lütfen paketini yükselt!")
      return
    }

    const allowedTracks = tracks.slice(0, limit)
    
    // Kuyruk modunu aktifleştir (XP'leri biriktir, tek tek gösterme)
    if (allowedTracks.length > 1) {
      isInQueueModeRef.current = true
      pendingXPDataRef.current = []
    }

    // İlk masalı çal
    setCurrentTrack(allowedTracks[0])
    setIsPlayerVisible(true)
    setIsPlaying(true)
    setProgress(0)
    
    // Kalanları kuyruğa ekle
    setQueue(allowedTracks.slice(1))

    if (tracks.length > limit) {
      toast.warning(`Sihirli Dinleme Listesi sınırına ulaştın! Sadece ilk ${limit} masal kuyruğa eklendi.`)
    } else {
      toast.success(`${allowedTracks.length} masal dinleme kuyruğuna eklendi!`)
    }
  }

  const removeFromQueue = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id))
  }

  const playNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0]
      // Mevcut track'i played listesine ekle
      if (currentTrack) {
        setPlayedTracks(prev => {
          if (prev.find(t => t.id === currentTrack.id)) return prev
          return [...prev, currentTrack]
        })
      }
      setQueue(prev => prev.slice(1))
      setCurrentTrack(nextTrack)
      setIsPlaying(true)
      setProgress(0)

      if (viewMode === 'reader' || viewMode === 'fullscreen') {
        const sourceParam = nextTrack.source ? `?source=${nextTrack.source}` : ''
        if (typeof window !== 'undefined') {
          window.history.pushState(null, '', `/story/${nextTrack.id}${sourceParam}`)
        }
      }
    } else {
      // Kuyruk bitti — son track'i played'e ekle, callback'i tetikle
      setIsPlaying(false)
      setCurrentTrack(null)
      if (viewMode !== 'background') setViewMode('background')

      setPlayedTracks(prev => {
        const finalList = currentTrack && !prev.find(t => t.id === currentTrack.id)
          ? [...prev, currentTrack]
          : prev
        // Callback'i tetikle (birden fazla track varsa)
        if (finalList.length > 0 && onQueueEndRef.current) {
          const collectedXP = [...pendingXPDataRef.current]
          // Kuyruk modunu kapat
          isInQueueModeRef.current = false
          pendingXPDataRef.current = []
          setTimeout(() => onQueueEndRef.current?.(finalList, collectedXP), 500)
        } else {
          // Tek hikaye: kuyruk modunu kapat
          isInQueueModeRef.current = false
          pendingXPDataRef.current = []
        }
        return finalList
      })
    }
  }

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying)
    }
  }

  const seekTo = (percentage: number) => {
    if (audioRef.current && duration) {
      const newTime = (percentage / 100) * duration
      audioRef.current.currentTime = newTime
      setProgress(newTime)
    }
  }

  const skipForward = () => {
    if (audioRef.current && duration) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    }
  }

  const closePlayer = () => {
    setIsPlayerVisible(false)
    setIsPlaying(false)
    setCurrentTrack(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current.load()
    }
  }

  const setOnQueueEnd = (cb: ((tracks: Track[], pendingXP: CelebrationData[]) => void) | null) => {
    onQueueEndRef.current = cb
  }

  const clearPlayedTracks = () => {
    setPlayedTracks([])
  }

  return (
    <AudioPlayerContext.Provider
    value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        isPlayerVisible,
        queue,
        playedTracks,
        playTrack,
        addToQueue,
        playList,
        removeFromQueue,
        playNext,
        togglePlay,
        seekTo,
        closePlayer,
        skipForward,
        skipBackward,
        audioRef,
        viewMode,
        setViewMode,
        setOnQueueEnd,
        clearPlayedTracks,
        celebration,
        setCelebration
      }}
    >
      {children}
      <audio ref={audioRef} src={currentTrack?.audioUrl} preload="metadata" />
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
