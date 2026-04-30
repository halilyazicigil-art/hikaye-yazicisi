'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Download, BookOpen, Music } from 'lucide-react'

interface StoryPageData {
  text: string
  image_url: string
}

interface StoryPlayerProps {
  title: string
  content: string[]
  imageUrl: string
  audioUrl: string
  pages?: StoryPageData[]
}

export default function StoryPlayer({ title, content, imageUrl, audioUrl, pages }: StoryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const bookPages = pages && pages.length > 0
    ? pages
    : content.map(text => ({ text, image_url: imageUrl }))

  // Sayfa başlangıç zamanlarını metin uzunluğu oranına göre hesapla
  const getPageTimestamps = useCallback((duration: number) => {
    const totalChars = bookPages.reduce((sum, p) => sum + p.text.length, 0)
    let accumulated = 0
    return bookPages.map((p) => {
      const start = (accumulated / totalChars) * duration
      accumulated += p.text.length
      return start
    })
  }, [bookPages])

  // Ses süresi boyunca sayfayı takip et (auto page-turn)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const duration = audio.duration
      if (!duration || isNaN(duration)) return

      const timestamps = getPageTimestamps(duration)
      setProgress((audio.currentTime / duration) * 100)

      // Hangi sayfadayız?
      let newPage = 0
      for (let i = timestamps.length - 1; i >= 0; i--) {
        if (audio.currentTime >= timestamps[i]) {
          newPage = i
          break
        }
      }
      setCurrentPage(newPage)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [getPageTimestamps])

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const downloadBook = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
          body { font-family: 'Outfit', sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background: #fff; }
          .cover { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #fef3c7, #fde68a); text-align: center; page-break-after: always; }
          h1 { color: #92400e; font-size: 56px; margin: 20px; }
          .page { padding: 40px; display: flex; flex-direction: column; align-items: center; page-break-after: always; }
          .page-image { width: 100%; max-width: 600px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px; }
          .page-text { font-size: 22px; text-align: center; max-width: 700px; color: #475569; }
          .footer { margin-top: 30px; color: #94a3b8; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="cover"><h1>${title}</h1><p>Özel Resimli Masal Kitabı</p></div>
        ${bookPages.map((p, i) => `
          <div class="page">
            <img class="page-image" src="${p.image_url || imageUrl}" />
            <div class="page-text">${p.text}</div>
            <div class="footer">Sayfa ${i + 1} / ${bookPages.length}</div>
          </div>
        `).join('')}
      </body>
      </html>
    `
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${title}_Resimli_Kitap.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const currentDisplayImage = bookPages[currentPage]?.image_url || imageUrl

  return (
    <div className="max-w-6xl mx-auto">
      {/* Kitap container */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-amber-100 flex flex-col md:flex-row min-h-[640px]">

        {/* Sol — Görsel */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-8 border-r border-amber-100">
          <div className="w-full aspect-square relative">
            {currentDisplayImage ? (
              <img
                key={currentPage}
                src={currentDisplayImage}
                alt={`Sayfa ${currentPage + 1}`}
                className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white animate-in fade-in zoom-in duration-500"
              />
            ) : (
              <div className="w-full h-full bg-amber-100/60 rounded-3xl flex flex-col items-center justify-center text-amber-300">
                <BookOpen size={64} className="mb-3 opacity-40" />
                <p className="font-bold text-lg opacity-50">Görsel yükleniyor...</p>
              </div>
            )}
          </div>

          {/* Sayfa numarası rozeti */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-amber-100">
            <span className="text-amber-800 font-black text-sm tracking-wider">
              {currentPage + 1} / {bookPages.length}
            </span>
          </div>

          {/* Ses çubuğu — sadece play butonu */}
          {audioUrl && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <audio ref={audioRef} src={audioUrl} />
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 border-4 border-white"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </button>
            </div>
          )}

          {/* Progress bar */}
          {audioUrl && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-100">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Sağ — Metin */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-between bg-[#FFFDF8]">
          <div>
            {/* Başlık */}
            <h1 className="text-2xl md:text-3xl font-black text-amber-900 mb-8 leading-tight pb-5 border-b-2 border-amber-100">
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
                  setCurrentPage(Math.max(0, currentPage - 1))
                  if (audioRef.current) audioRef.current.pause()
                  setIsPlaying(false)
                }}
                disabled={currentPage === 0}
                className="flex-1 py-4 bg-white text-amber-800 rounded-2xl font-bold text-lg disabled:opacity-25 border-2 border-amber-200 shadow-sm hover:bg-amber-50 hover:border-amber-300 transition-all"
              >
                ← Geri
              </button>

              <div className="flex flex-col items-center px-4">
                <span className="text-amber-900 font-black text-xl">{currentPage + 1}</span>
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">sayfa</span>
                <span className="text-amber-900 font-black text-xl">{bookPages.length}</span>
              </div>

              <button
                onClick={() => {
                  setCurrentPage(Math.min(bookPages.length - 1, currentPage + 1))
                  if (audioRef.current) audioRef.current.pause()
                  setIsPlaying(false)
                }}
                disabled={currentPage === bookPages.length - 1}
                className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold text-lg disabled:opacity-25 shadow-lg transition-all"
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
                      ? 'w-6 h-2.5 bg-amber-500'
                      : 'w-2.5 h-2.5 bg-amber-200 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
