'use client'

import { useState, useEffect } from 'react'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import { X, Play, Pause, Rewind, FastForward, Maximize2, Music, ListMusic, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import QueueRatingModal from '@/components/QueueRatingModal'
import QueueXPSummaryModal from '@/components/QueueXPSummaryModal'
import CelebrationModal from '@/components/CelebrationModal'
import { Track, CelebrationData } from '@/context/AudioPlayerContext'

export default function GlobalAudioPlayer() {
  const pathname = usePathname()
  const { 
    currentTrack, isPlaying, progress, duration, isPlayerVisible, queue, 
    togglePlay, closePlayer, skipForward, skipBackward, seekTo, playNext, 
    removeFromQueue, viewMode, setViewMode, setOnQueueEnd, clearPlayedTracks
  } = useAudioPlayer()
  const [showQueue, setShowQueue] = useState(false)
  const [ratingTracks, setRatingTracks] = useState<Track[] | null>(null)
  const [xpEvents, setXpEvents] = useState<CelebrationData[]>([])
  const [showXPSummary, setShowXPSummary] = useState(false)
  const lang = typeof document !== 'undefined'
    ? (document.cookie.match(/language=([^;]+)/)?.[1] || 'tr')
    : 'tr'

  // Kuyruk bitince: önce XP özeti (varsa), sonra rating modal
  useEffect(() => {
    setOnQueueEnd((tracks, pendingXP) => {
      if (tracks.length > 0) {
        // Rating'i hazırla
        setRatingTracks(tracks)
        // XP özeti varsa göster, yoksa direkt rating aç
        if (pendingXP && pendingXP.length > 0) {
          setXpEvents(pendingXP)
          setShowXPSummary(true)
        }
      }
    })
    return () => setOnQueueEnd(null)
  }, [setOnQueueEnd])

  // Okuyucudan çıkıldığında viewMode'u 'background' moduna çek
  useEffect(() => {
    if (!pathname.startsWith('/story/')) {
      if (viewMode !== 'background') {
        setViewMode('background')
      }
    }
  }, [pathname, viewMode, setViewMode])

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration ? (progress / duration) * 100 : 0

  // Player görünmezse sadece modal ve celebration modal render et
  if (!isPlayerVisible || !currentTrack) {
    return (
      <>
        <AnimatePresence>
          {/* 1. Önce XP özeti */}
          {showXPSummary && xpEvents.length > 0 && (
            <QueueXPSummaryModal
              xpEvents={xpEvents}
              storyCount={ratingTracks?.length ?? xpEvents.length}
              lang={lang}
              onClose={() => setShowXPSummary(false)}
            />
          )}
          {/* 2. Sonra rating modal */}
          {!showXPSummary && ratingTracks && (
            <QueueRatingModal
              tracks={ratingTracks}
              lang={lang}
              onClose={() => {
                setRatingTracks(null)
                setXpEvents([])
                clearPlayedTracks()
              }}
            />
          )}
        </AnimatePresence>
        {!ratingTracks && !showXPSummary && <CelebrationModal />}
      </>
    )
  }

  return (
    <>
    <div className={`fixed bottom-6 right-6 z-50 w-80 bg-[#081826] rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500 animate-in slide-in-from-bottom-10 fade-in ${showQueue ? 'h-[30rem]' : 'h-auto'}`}>
      
      {/* 📜 Playlist / Queue View */}
      {showQueue && (
        <div className="absolute inset-0 z-40 bg-[#081826] flex flex-col animate-in slide-in-from-top-full duration-300">
          <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#052159]">
            <h4 className="text-white font-bold text-xs flex items-center gap-2 uppercase tracking-widest">
              <ListMusic size={16} className="text-sky-400" /> Masal Kuyruğu
            </h4>
            <button onClick={() => setShowQueue(false)} className="text-white/60 hover:text-white transition p-1 hover:bg-white/10 rounded-full">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {queue.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-[11px] p-10 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Music size={32} className="opacity-20" />
                </div>
                Sıranız henüz boş.<br/>Kütüphaneden masal ekleyerek devamlılığı sağlayabilirsiniz.
              </div>
            ) : (
              queue.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition group border border-transparent hover:border-sky-500/20">
                  <img src={item.imageUrl} className="w-11 h-11 rounded-xl object-cover shadow-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[11px] font-bold truncate leading-tight mb-1">{item.title}</p>
                    <p className="text-[10px] text-sky-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" /> Sıradaki
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromQueue(item.id)}
                    className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-400/10 rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 bg-[#081826] border-t border-white/5">
            <button onClick={() => setShowQueue(false)} className="w-full py-3 bg-[#052159] hover:bg-[#072a73] text-white text-[11px] font-bold rounded-2xl transition-all border border-white/5 shadow-lg active:scale-[0.98]">
              Oynatıcıya Dön
            </button>
          </div>
        </div>
      )}

      {/* Upper Part (Image & Controls) */}
      <div className="relative h-52 w-full group">
        <img 
          src={currentTrack.imageUrl} 
          alt={currentTrack.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081826] via-[#081826]/40 to-black/30" />
        
        {/* Top Badges & Buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <div className="flex flex-col gap-1.5">
            <div className="bg-[#052159]/80 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl border border-white/10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Canlı Dinletisi
            </div>
            {queue.length > 0 && (
              <div className="bg-sky-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-lg animate-bounce w-fit">
                SIRADA {queue.length} MASAL
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowQueue(!showQueue)}
              className={`p-2 ${showQueue ? 'bg-sky-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-xl backdrop-blur-md transition-all border border-white/10 shadow-lg`}
              title="Sırayı Göster"
            >
              <ListMusic size={16} />
            </button>
            <button onClick={closePlayer} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all border border-white/10 shadow-lg">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Center Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-5 pt-4 pointer-events-none">
          <button onClick={skipBackward} className="text-white/60 hover:text-white transition-all active:scale-90 pointer-events-auto">
            <Rewind size={24} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-sky-500 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all transform hover:scale-110 active:scale-90 border-4 border-[#081826] pointer-events-auto"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          <button 
            onClick={queue.length > 0 ? playNext : skipForward} 
            className="text-white/60 hover:text-white transition-all active:scale-90 pointer-events-auto group/skip relative"
          >
            <FastForward size={24} fill="currentColor" />
            {queue.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full border-2 border-[#081826] animate-ping" />
            )}
          </button>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white text-[10px] font-black z-20">
          <span className="w-8 text-right tabular-nums">{formatTime(progress)}</span>
          
          <div className="flex-1 relative h-6 group/slider cursor-pointer flex items-center">
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={progressPercentage || 0}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
             />
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                <div 
                   className="h-full bg-gradient-to-r from-sky-400 to-sky-300 rounded-full transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                   style={{ width: `${progressPercentage}%` }}
                />
             </div>
             {/* Slider Thumb Circle */}
             <div 
                className="absolute w-3 h-3 bg-white rounded-full shadow-lg border-2 border-sky-500 transition-all duration-100 opacity-0 group-hover/slider:opacity-100"
                style={{ left: `calc(${progressPercentage}% - 6px)` }}
              />
          </div>
          
          <span className="w-8 tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Lower Part (Details) */}
      <div className="p-5 bg-gradient-to-b from-[#081826] to-[#040d14]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-white text-[14px] line-clamp-1 mb-0.5 tracking-tight">{currentTrack.title}</h3>
            <p className="text-[10px] text-sky-400/80 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> ŞU AN ÇALIYOR
            </p>
          </div>
          <Link 
            href={`/story/${currentTrack.id}${currentTrack.source ? `?source=${currentTrack.source}` : ''}`} 
            onClick={() => setViewMode('reader')}
            className="text-white/40 hover:text-sky-400 transition-colors p-1"
          >
            <Maximize2 size={16} />
          </Link>
        </div>

        <div className="bg-white/5 p-3 rounded-[1rem] border border-white/5 flex items-center gap-3 group/info hover:bg-white/10 transition-all cursor-default">
          <div className="relative w-12 h-9 shrink-0 overflow-hidden rounded-lg shadow-lg">
             <img 
               src={currentTrack.imageUrl} 
               alt="Thumbnail" 
               className="w-full h-full object-cover transition-transform group-hover/info:scale-110"
             />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-400 font-medium leading-tight line-clamp-2">
              {isPlaying ? 'Hikaye tüm hızıyla devam ediyor...' : 'Masalın devamı için oynatın.'}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* ⭐ Kuyruk bitti — Önce XP Özeti, Sonra Toplu Puanlama */}
    <AnimatePresence>
      {/* 1. XP Özeti */}
      {showXPSummary && xpEvents.length > 0 && (
        <QueueXPSummaryModal
          xpEvents={xpEvents}
          storyCount={ratingTracks?.length ?? xpEvents.length}
          lang={lang}
          onClose={() => setShowXPSummary(false)}
        />
      )}
      {/* 2. Rating */}
      {!showXPSummary && ratingTracks && (
        <QueueRatingModal
          tracks={ratingTracks}
          lang={lang}
          onClose={() => {
            setRatingTracks(null)
            setXpEvents([])
            clearPlayedTracks()
          }}
        />
      )}
    </AnimatePresence>

    {!ratingTracks && !showXPSummary && <CelebrationModal />}
  </>
  )
}
