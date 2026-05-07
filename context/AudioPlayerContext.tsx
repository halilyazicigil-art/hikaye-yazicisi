'use client'

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface Track {
  id: string
  title: string
  audioUrl: string
  imageUrl: string
}

export type ViewMode = 'background' | 'reader' | 'fullscreen'

interface AudioPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  isPlayerVisible: boolean
  queue: Track[]
  playTrack: (track: Track) => void
  addToQueue: (track: Track) => void
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
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [queue, setQueue] = useState<Track[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('background')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
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
    setCurrentTrack(track)
    setIsPlayerVisible(true)
    setIsPlaying(true)
    setProgress(0)
  }

  const addToQueue = (track: Track) => {
    if (!currentTrack) {
      playTrack(track)
    } else {
      setQueue(prev => {
        if (prev.find(i => i.id === track.id)) return prev
        return [...prev, track]
      })
    }
  }

  const removeFromQueue = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id))
  }

  const playNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0]
      setQueue(prev => prev.slice(1))
      setCurrentTrack(nextTrack)
      setIsPlaying(true)
      setProgress(0)

      // 🚀 OTOMATİK NAVİGASYON (Premium Akış)
      // Eğer kullanıcı kitap okuyucusu veya tam ekrandaysa, yeni kitaba otomatik git
      if (viewMode === 'reader' || viewMode === 'fullscreen') {
        router.push(`/story/${nextTrack.id}`)
      }
    } else {
      setIsPlaying(false)
      setCurrentTrack(null)
      // Kuyruk bittiyse ve okuyucudaysak arka plana dön
      if (viewMode !== 'background') setViewMode('background')
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
        playTrack,
        addToQueue,
        removeFromQueue,
        playNext,
        togglePlay,
        seekTo,
        closePlayer,
        skipForward,
        skipBackward,
        audioRef,
        viewMode,
        setViewMode
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
