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
    <div className="mb-6 bg-[#F8E6D1] border border-[#EED9C4] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#B65B35] rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0">
          <Volume2 size={24} />
        </div>
        <div>
          <h3 className="font-bold text-[#5D4037] text-lg leading-tight">Hikaye anlatımı mevcuttur!</h3>
          <p className="text-[#8D6E63] text-sm font-medium">Bu hikayeyi mevcut kredilerinizle dinleyebilirsiniz.</p>
        </div>
      </div>
      
      <button
        onClick={handlePlay}
        className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap ${
          isThisPlaying 
          ? 'bg-green-500 text-white cursor-default' 
          : 'bg-[#B65B35] hover:bg-[#A04D27] text-white'
        }`}
      >
        {isThisPlaying ? 'Dinleniyor...' : 'Ses dosyasını oynat'}
      </button>
    </div>
  )
}
