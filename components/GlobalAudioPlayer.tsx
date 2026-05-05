'use client'

import { useAudioPlayer } from '@/context/AudioPlayerContext'
import { X, Play, Pause, Rewind, FastForward, Maximize2, Music } from 'lucide-react'
import Link from 'next/link'

export default function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, isPlayerVisible, togglePlay, closePlayer, skipForward, skipBackward, seekTo } = useAudioPlayer()

  if (!isPlayerVisible || !currentTrack) return null

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration ? (progress / duration) * 100 : 0

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-[1.2rem] shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in">
      {/* Upper Part (Image & Controls) */}
      <div className="relative h-48 w-full group">
        <img 
          src={currentTrack.imageUrl} 
          alt={currentTrack.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Top Badges & Buttons */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="bg-[#B65B35] text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1.5 shadow-md">
            <Music size={12} /> Hikaye oyuncusu
          </div>
          <div className="flex gap-1.5">
            <Link 
              href={`/story/${currentTrack.id}`} 
              onClick={closePlayer}
              className="p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-md backdrop-blur-sm transition"
            >
              <Maximize2 size={14} />
            </Link>
            <button onClick={closePlayer} className="p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-md backdrop-blur-sm transition">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Center Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-5 pt-4">
          <button onClick={skipBackward} className="text-white/80 hover:text-white transition active:scale-95">
            <Rewind size={22} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-[#B65B35] hover:bg-[#A04D27] text-white rounded-full flex items-center justify-center shadow-xl transition transform hover:scale-105 active:scale-95 border-[1.5px] border-white/30"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={skipForward} className="text-white/80 hover:text-white transition active:scale-95">
            <FastForward size={22} fill="currentColor" />
          </button>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-white text-xs font-medium">
          <span className="w-8 text-right drop-shadow-md">{formatTime(progress)}</span>
          
          <div className="flex-1 relative h-5 group/slider cursor-pointer flex items-center">
             {/* Actual invisible range input for seeking */}
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={progressPercentage || 0}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
             />
             
             {/* Visual Bar */}
             <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                   className="h-full bg-[#B65B35] rounded-full transition-all duration-100 ease-linear"
                   style={{ width: `${progressPercentage}%` }}
                />
             </div>
          </div>
          
          <span className="w-8 drop-shadow-md">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Lower Part (Details) */}
      <div className="p-4 bg-[#FFFDF8]">
        <h3 className="font-bold text-gray-800 text-[13px] line-clamp-1 mb-3">{currentTrack.title}</h3>
        <div className="flex items-center gap-3">
          <img 
            src={currentTrack.imageUrl} 
            alt="Thumbnail" 
            className="w-12 h-8 rounded-md object-cover shadow-sm border border-gray-200"
          />
          <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-tight">
            {currentTrack.title}
          </p>
        </div>
      </div>
    </div>
  )
}
