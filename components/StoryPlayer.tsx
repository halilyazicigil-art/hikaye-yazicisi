'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, Image as ImageIcon, Download } from 'lucide-react'

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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Eğer yeni sistem 'pages' varsa onu kullan, yoksa eski yapıdan array oluştur
  const bookPages = pages && pages.length > 0 
    ? pages 
    : content.map(text => ({ text, image_url: imageUrl }))

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = `${title}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
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
          body { font-family: 'Outfit', sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #fff; }
          .cover { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fef3c7; text-align: center; page-break-after: always; }
          h1 { color: #92400e; font-size: 64px; margin: 20px; }
          .page { padding: 40px; display: flex; flex-direction: column; align-items: center; page-break-after: always; }
          .page-image { width: 100%; max-width: 600px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px; }
          .page-text { font-size: 24px; text-align: center; max-width: 700px; color: #475569; }
          .footer { margin-top: 50px; color: #94a3b8; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="cover">
          <h1>${title}</h1>
          <p>Özel Resimli Masal Kitabı</p>
        </div>
        ${bookPages.map((p, i) => `
          <div class="page">
            <img class="page-image" src="${p.image_url || imageUrl}" />
            <div class="page-text">${p.text}</div>
            <div class="footer">Sayfa ${i + 1}</div>
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

  const togglePlay = () => {
    if (audioUrl) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }
  }

  const currentDisplayImage = bookPages[currentPage]?.image_url || imageUrl

  return (
    <div className="max-w-6xl mx-auto bg-amber-50 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-amber-100 flex flex-col md:flex-row min-h-[600px]">
      {/* Visual Section (Left Page) */}
      <div className="w-full md:w-1/2 relative bg-amber-200/30 flex items-center justify-center p-6 border-r-4 border-amber-100/50">
        <div className="w-full aspect-square relative">
          {currentDisplayImage ? (
            <img 
              key={currentPage} // Animasyon/Yenilenme için key ekledik
              src={currentDisplayImage} 
              alt={`Masal Sayfası ${currentPage + 1}`} 
              className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white animate-in fade-in zoom-in duration-700"
            />
          ) : (
            <div className="w-full h-full bg-amber-100 rounded-3xl flex flex-col items-center justify-center text-amber-400">
              <ImageIcon size={64} className="mb-4 opacity-50" />
              <p className="font-bold text-xl opacity-70">Görsel Hazırlanıyor...</p>
            </div>
          )}
        </div>
        
        {/* Audio Player Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 border-2 border-amber-100 z-10">
          <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <div className="h-10 w-px bg-amber-200 mx-2" />

          <button onClick={downloadAudio} className="flex flex-col items-center gap-1 text-amber-700 hover:text-amber-900 group">
            <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase">Ses</span>
          </button>

          <div className="h-10 w-px bg-amber-200 mx-1" />

          <button onClick={downloadBook} className="flex flex-col items-center gap-1 text-amber-700 hover:text-amber-900 group">
            <Download size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase">Kitap</span>
          </button>
        </div>
      </div>

      {/* Text Section (Right Page) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between bg-[#FFFdf8] relative">
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
          <ImageIcon size={120} />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-black text-amber-900 mb-10 leading-tight border-b-4 border-amber-100 pb-4">
            {title}
          </h1>
          
          <div className="text-2xl md:text-3xl leading-relaxed text-slate-700 font-medium min-h-[300px] animate-in fade-in slide-in-from-right-4 duration-500">
            {bookPages[currentPage]?.text || "Masal yükleniyor..."}
          </div>
        </div>

        {/* Page Navigation */}
        <div className="mt-12 flex justify-between items-center bg-amber-50/50 p-4 rounded-2xl">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-8 py-4 bg-white text-amber-800 rounded-2xl font-bold text-xl disabled:opacity-30 border-2 border-amber-200 shadow-sm hover:bg-amber-100 transition-all"
          >
            &larr; Geri
          </button>
          <div className="flex flex-col items-center">
            <span className="text-amber-900 font-black text-2xl">
              {currentPage + 1} / {bookPages.length}
            </span>
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest mt-1">SAYFA</span>
          </div>
          <button 
            onClick={() => setCurrentPage(Math.min(bookPages.length - 1, currentPage + 1))}
            disabled={currentPage === bookPages.length - 1}
            className="px-8 py-4 bg-amber-600 text-white rounded-2xl font-bold text-xl disabled:opacity-30 shadow-lg hover:bg-amber-700 transition-all"
          >
            İleri &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
