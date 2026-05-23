'use client'

import { useAudioPlayer, Track } from '@/context/AudioPlayerContext'
import { ListMusic, Check } from 'lucide-react'
import { useState } from 'react'

interface AddToQueueButtonProps {
  story: {
    id: string
    title: string
    audio_url: string
    image_url: string
  }
  className?: string
  iconOnly?: boolean
  source?: string
}

export default function AddToQueueButton({ story, className = "", iconOnly = false, source }: AddToQueueButtonProps) {
  const { addToQueue, queue, currentTrack } = useAudioPlayer()
  const [added, setAdded] = useState(false)

  if (!story.audio_url) return null

  const isInQueue = queue.some(i => i.id === story.id)
  const isCurrent = currentTrack?.id === story.id

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault() // Link tıklamasını engelle
    e.stopPropagation() // Link tıklamasını engelle
    
    if (added || isInQueue || isCurrent) return

    const track: Track = {
      id: story.id,
      title: story.title,
      audioUrl: story.audio_url,
      imageUrl: story.image_url,
      source
    }
    
    addToQueue(track)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (iconOnly) {
    return (
      <button
        onClick={handleAdd}
        disabled={added || isInQueue || isCurrent}
        className={`p-2 rounded-full transition-all border shadow-sm flex items-center justify-center ${
          added || isInQueue || isCurrent
          ? 'bg-sky-500 text-white border-sky-400'
          : 'bg-white hover:bg-sky-50 text-[#84B1D9] border-sky-100'
        } ${className}`}
        title={added ? 'Eklendi!' : isInQueue ? 'Sırada' : 'Kuyruğa Ekle'}
      >
        {added || isInQueue || isCurrent ? <Check size={16} /> : <ListMusic size={16} />}
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      disabled={added || isInQueue || isCurrent}
      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border flex items-center gap-1.5 ${
        added || isInQueue || isCurrent
        ? 'bg-sky-500 text-white border-sky-400 cursor-default'
        : 'bg-white hover:bg-sky-50 text-[#84B1D9] border-sky-100 active:scale-95'
      } ${className}`}
    >
      {added || isInQueue || isCurrent ? (
        <><Check size={12} /> {added ? 'Eklendi!' : 'Sırada'}</>
      ) : (
        <><ListMusic size={12} /> Sıraya Ekle</>
      )}
    </button>
  )
}
