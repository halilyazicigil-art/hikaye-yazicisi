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
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer()

  if (!story.audio_url) return null

  const handlePlay = () => {
    const track: Track = {
      id: story.id,
      title: story.title,
      audioUrl: story.audio_url,
      imageUrl: story.image_url
    }
    playTrack(track)
  }

  const isThisPlaying = currentTrack?.id === story.id && isPlaying

  return (
    <div className="mb-6 bg-[#081826] border border-[#182A46] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#052159] rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0 border border-[#182A46]">
          <Volume2 size={24} />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg leading-tight">Hikaye anlatımı mevcuttur!</h3>
          <p className="text-[#81808C] text-sm font-medium">Bu hikayeyi mevcut kredilerinizle dinleyebilirsiniz.</p>
        </div>
      </div>
      
      <button
        onClick={handlePlay}
        className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap ${
          isThisPlaying 
          ? 'bg-emerald-600 text-white cursor-default' 
          : 'bg-[#182A46] hover:bg-[#052159] text-white border border-[#2E4159]'
        }`}
      >
        {isThisPlaying ? 'Dinleniyor...' : 'Ses dosyasını oynat'}
      </button>
    </div>
  )
}
