'use client'

import { useAudioPlayer, Track } from '@/context/AudioPlayerContext'
import { Volume2 } from 'lucide-react'

interface AudioBannerProps {
  story: {
    id: string
    title: string
    audio_url: string
    image_url: string
  }
}

export default function AudioBanner({ story }: AudioBannerProps) {
  const { playTrack, addToQueue, currentTrack, isPlaying, queue } = useAudioPlayer()
  const [added, setAdded] = useState(false)

  if (!story.audio_url) return null

  const track: Track = {
    id: story.id,
    title: story.title,
    audioUrl: story.audio_url,
    imageUrl: story.image_url
  }

  const handlePlay = () => {
    playTrack(track)
  }

  const handleAddToQueue = () => {
    addToQueue(track)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isThisPlaying = currentTrack?.id === story.id && isPlaying
  const isInQueue = queue.some(i => i.id === story.id)

  return (
    <div className="mb-6 bg-[#081826] border border-[#182A46] rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
      
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-[#052159] rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0 border border-white/5 relative">
          <div className="absolute inset-0 bg-sky-400/10 animate-pulse rounded-2xl" />
          <Volume2 size={28} className="relative z-10" />
        </div>
        <div>
          <h3 className="font-black text-white text-xl leading-tight tracking-tight uppercase">Büyülü Ses Kaydı Mevcut!</h3>
          <p className="text-[#81808C] text-sm font-bold mt-1">Bu masalı pürüzsüz bir seslendirme ile hemen dinleyebilirsiniz.</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <button
          onClick={handleAddToQueue}
          disabled={isThisPlaying || isInQueue}
          className={`flex-1 sm:flex-none px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 border ${
            added || isInQueue
            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' 
            : 'bg-[#182A46]/50 hover:bg-[#182A46] text-white border-white/5'
          }`}
        >
          <ListMusic size={18} />
          {added ? 'Sıraya Eklendi' : isInQueue ? 'Sırada' : 'Sıraya Ekle'}
        </button>

        <button
          onClick={handlePlay}
          className={`flex-1 sm:flex-none px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 whitespace-nowrap border ${
            isThisPlaying 
            ? 'bg-emerald-600 text-white border-emerald-500/50 cursor-default' 
            : 'bg-sky-500 hover:bg-sky-400 text-white border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
          }`}
        >
          {isThisPlaying ? 'Şu An Çalıyor...' : 'Hemen Dinle'}
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { ListMusic } from 'lucide-react'
