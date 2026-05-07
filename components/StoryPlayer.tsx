'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Download, BookOpen, Music, Maximize, Minimize, ChevronRight, ChevronLeft } from 'lucide-react'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import { motion, AnimatePresence } from 'framer-motion'

interface StoryPageData {
  text: string
  image_url: string
  duration?: number
}

interface StoryPlayerProps {
  id: string
  title: string
  content: string[]
  imageUrl: string
  audioUrl: string
  pages?: StoryPageData[]
}

export default function StoryPlayer({ id, title, content, imageUrl, audioUrl, pages }: StoryPlayerProps) {
  const { 
    currentTrack, isPlaying, playTrack, togglePlay, audioRef, 
    progress: globalProgress, viewMode, setViewMode 
  } = useAudioPlayer()
  const [currentPage, setCurrentPage] = useState(0)
  const [localProgress, setLocalProgress] = useState(0)

  // 📖 Okuyucu açıldığında modu güncelle (Eğer arka plandaysak)
  useEffect(() => {
    if (viewMode === 'background') {
      setViewMode('reader')
    }
  }, [viewMode, setViewMode])

  const toggleFullscreen = () => {
    if (viewMode === 'fullscreen') {
      setViewMode('reader')
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    } else {
      setViewMode('fullscreen')
      document.documentElement.requestFullscreen()
    }
  }

  const bookPages = pages && pages.length > 0
    ? pages
    : content.map(text => ({ text, image_url: imageUrl }))

  const isThisPlaying = currentTrack?.id === id && isPlaying

  // Sayfa başlangıç zamanlarını hesapla (Varsa kesin süreleri, yoksa tahmini oranlamayı kullan)
  const getPageTimestamps = useCallback((audioDuration: number) => {
    // Eğer tüm sayfaların kesin süresi varsa (Yeni Sistem), bunları toplayarak ilerle
    const hasPreciseDurations = bookPages.every(p => p.duration !== undefined);

    if (hasPreciseDurations) {
      let accumulated = 0;
      return bookPages.map((p) => {
        const start = accumulated;
        accumulated += p.duration || 0;
        return start;
      });
    }

    // Fallback: Eski tahmini yöntem (Metin uzunluğu oranına göre)
    const totalChars = bookPages.reduce((sum, p) => sum + p.text.length, 0)
    let accumulated = 0
    return bookPages.map((p) => {
      const start = (accumulated / totalChars) * audioDuration
      accumulated += p.text.length
      return start
    })
  }, [bookPages])

  // Ses süresi boyunca sayfayı takip et (auto page-turn)
  useEffect(() => {
    if (currentTrack?.id !== id || !audioRef.current) return

    const audio = audioRef.current
    const duration = audio.duration
    if (!duration || isNaN(duration)) return

    const timestamps = getPageTimestamps(duration)
    setLocalProgress((audio.currentTime / duration) * 100)

    // Hangi sayfadayız?
    let newPage = 0
    for (let i = timestamps.length - 1; i >= 0; i--) {
      if (audio.currentTime >= timestamps[i]) {
        newPage = i
        break
      }
    }
    setCurrentPage(newPage)
  }, [id, currentTrack?.id, globalProgress, getPageTimestamps])

  const handleTogglePlay = () => {
    if (currentTrack?.id === id) {
      togglePlay()
    } else {
      playTrack({ id, title, audioUrl, imageUrl })
    }
  }

  const currentDisplayImage = bookPages[currentPage]?.image_url || imageUrl

  return (
    <div className="max-w-6xl mx-auto">
      {/* Kitap container */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-sky-100 flex flex-col md:flex-row min-h-[640px]">

        {/* Sol — Görsel */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-sky-50 to-orange-50 flex items-center justify-center p-8 border-r border-sky-100">
          <div className="w-full aspect-square relative">
            {currentDisplayImage ? (
              <img
                key={currentPage}
                src={currentDisplayImage}
                alt={`Sayfa ${currentPage + 1}`}
                className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white animate-in fade-in zoom-in duration-500"
              />
            ) : (
              <div className="w-full h-full bg-sky-100/60 rounded-3xl flex flex-col items-center justify-center text-amber-300">
                <BookOpen size={64} className="mb-3 opacity-40" />
                <p className="font-bold text-lg opacity-50">Görsel yükleniyor...</p>
              </div>
            )}
          </div>

          <div className="absolute top-6 left-6 flex gap-2 z-20">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-sky-100">
              <span className="text-sky-800 font-black text-sm tracking-wider">
                {currentPage + 1} / {bookPages.length}
              </span>
            </div>
            <button 
              onClick={toggleFullscreen}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-sky-100 hover:bg-sky-50 text-sky-800 transition-all"
              title="Tam Ekran"
            >
              <Maximize size={18} />
            </button>
          </div>

          {/* Ses çubuğu — sadece play butonu */}
          {audioUrl && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <button
                onClick={handleTogglePlay}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 border-4 border-white ${
                  isThisPlaying ? 'bg-orange-500' : 'bg-sky-500'
                } text-white`}
              >
                {isThisPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </button>
            </div>
          )}

          {/* Progress bar */}
          {audioUrl && currentTrack?.id === id && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-100">
              <div
                className="h-full bg-sky-500 transition-all duration-300"
                style={{ width: `${localProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Sağ — Metin */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-between bg-[#FFFDF8]">
          <div>
            {/* Başlık */}
            <h1 className="text-2xl md:text-3xl font-black text-sky-900 mb-8 leading-tight pb-5 border-b-2 border-sky-100">
              {title}
            </h1>

            {/* Metin */}
            <p
              key={currentPage}
              className="text-xl md:text-2xl leading-relaxed text-slate-600 font-medium animate-in fade-in slide-in-from-right-4 duration-400"
            >
              {bookPages[currentPage]?.text || 'Masal yükleniyor...'}
            </p>
          </div>

          {/* Alt navigasyon */}
          <div className="mt-10">
            {/* Sayfa geçiş butonları */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <button
                onClick={() => {
                  const newPage = Math.max(0, currentPage - 1);
                  setCurrentPage(newPage);
                  
                  // Eğer ses çalıyorsa, sesin zamanını da o sayfanın başına çek
                  if (currentTrack?.id === id && audioRef.current) {
                    const timestamps = getPageTimestamps(audioRef.current.duration);
                    audioRef.current.currentTime = timestamps[newPage];
                  }
                }}
                disabled={currentPage === 0}
                className="flex-1 py-4 bg-white text-sky-800 rounded-2xl font-bold text-lg disabled:opacity-25 border-2 border-sky-200 shadow-sm hover:bg-sky-50 hover:border-amber-300 transition-all"
              >
                ← Geri
              </button>

              <div className="flex flex-col items-center px-4">
                <span className="text-sky-900 font-black text-xl">{currentPage + 1}</span>
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">sayfa</span>
                <span className="text-sky-900 font-black text-xl">{bookPages.length}</span>
              </div>

              <button
                onClick={() => {
                  const newPage = Math.min(bookPages.length - 1, currentPage + 1);
                  setCurrentPage(newPage);
                  
                  // Eğer ses çalıyorsa, sesin zamanını da o sayfanın başına çek
                  if (currentTrack?.id === id && audioRef.current) {
                    const timestamps = getPageTimestamps(audioRef.current.duration);
                    audioRef.current.currentTime = timestamps[newPage];
                  }
                }}
                disabled={currentPage === bookPages.length - 1}
                className="flex-1 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg disabled:opacity-25 shadow-lg transition-all"
              >
                İleri →
              </button>
            </div>

            {/* Nokta göstergesi */}
            <div className="flex justify-center gap-1.5 mb-1">
              {bookPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`rounded-full transition-all ${
                    i === currentPage
                      ? 'w-6 h-2.5 bg-sky-500'
                      : 'w-2.5 h-2.5 bg-sky-200 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🎭 PREMİUM TAM EKRAN (CINEMATIC MODE) */}
      <AnimatePresence>
        {viewMode === 'fullscreen' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#052159] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Arka Plan Görseli (Blurlu) */}
            <div className="absolute inset-0 opacity-20 blur-3xl scale-110">
               <img src={currentDisplayImage} className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center px-10 md:px-20 gap-12">
              {/* Sol: Dev Görsel */}
              <motion.div 
                key={`img-${currentPage}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-full md:w-1/2 aspect-square max-h-[70vh] relative shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden border-8 border-white/10"
              >
                <img src={currentDisplayImage} className="w-full h-full object-cover" />
              </motion.div>

              {/* Sağ: Metin ve Başlık */}
              <div className="w-full md:w-1/2 text-white space-y-8">
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-6xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-white/70"
                >
                  {title}
                </motion.h1>
                
                <motion.p 
                  key={`text-${currentPage}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl leading-relaxed font-medium text-sky-50/90"
                >
                  {bookPages[currentPage]?.text}
                </motion.p>

                {/* Alt Kontroller */}
                <div className="flex items-center gap-6 pt-10">
                   <button 
                     onClick={handleTogglePlay}
                     className="w-20 h-20 bg-sky-500 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
                   >
                     {isThisPlaying ? <Pause size={40} /> : <Play size={40} className="ml-1" />}
                   </button>

                   <div className="flex gap-3">
                      <button 
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all disabled:opacity-20"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button 
                        onClick={() => setCurrentPage(Math.min(bookPages.length - 1, currentPage + 1))}
                        disabled={currentPage === bookPages.length - 1}
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all disabled:opacity-20"
                      >
                        <ChevronRight size={32} />
                      </button>
                   </div>

                   <button 
                    onClick={toggleFullscreen}
                    className="ml-auto p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all"
                    title="Tam Ekrandan Çık"
                   >
                     <Minimize size={32} />
                   </button>
                </div>
              </div>
            </div>

            {/* Alt Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/5">
               <motion.div 
                 className="h-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.8)]"
                 initial={{ width: 0 }}
                 animate={{ width: `${localProgress}%` }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
