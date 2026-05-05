'use client'

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'

export interface Track {
  id: string
  title: string
  audioUrl: string
  imageUrl: string
}

interface AudioPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  isPlayerVisible: boolean
  playTrack: (track: Track) => void
  togglePlay: () => void
  seekTo: (percentage: number) => void
  closePlayer: () => void
  skipForward: () => void
  skipBackward: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack])

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
        playTrack,
        togglePlay,
        seekTo,
        closePlayer,
        skipForward,
        skipBackward,
        audioRef
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
