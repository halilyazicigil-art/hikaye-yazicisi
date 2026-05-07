'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { togglePinAction } from '@/app/actions/pinAction'

export default function PinButton({ storyId, initialPinned }: { storyId: string, initialPinned: boolean }) {
  const [isPinned, setIsPinned] = useState(initialPinned)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)
    const res = await togglePinAction(storyId)
    if (res.success) {
      setIsPinned(res.isPinned || false)
    } else {
      alert(res.error)
    }
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isPinned ? "Kahramanları Sabitten Kaldır" : "Kahramanları Ana Sayfaya Sabitle"}
      className={`p-2.5 rounded-full shadow-lg transition-all duration-300 ${
        isPinned 
          ? 'bg-orange-500 text-white scale-110' 
          : 'bg-white/80 text-gray-400 hover:text-orange-500 hover:scale-110 backdrop-blur-sm'
      }`}
    >
      <Sparkles size={18} fill={isPinned ? "currentColor" : "none"} />
    </button>
  )
}
