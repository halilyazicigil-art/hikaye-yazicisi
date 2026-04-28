'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, Image as ImageIcon, Download } from 'lucide-react'

interface StoryPlayerProps {
  title: string
  content: string[]
  imageUrl: string
  audioUrl: string
}

export default function StoryPlayer({ title, content, imageUrl, audioUrl }: StoryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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
          body { 
            font-family: 'Outfit', sans-serif; 
            line-height: 1.8; 
            color: #334155; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 50px;
            background-color: #fffdf8;
          }
          h1 { 
            text-align: center; 
            color: #92400e; 
            font-size: 48px; 
            font-weight: 900;
            margin-bottom: 50px;
            border-bottom: 4px solid #fef3c7;
            padding-bottom: 20px;
          }
          .story-content { 
            font-size: 20px; 
            white-space: pre-wrap;
          }
          .page-break {
            height: 40px;
            border-bottom: 2px dashed #fde68a;
            margin: 40px 0;
          }
          .footer {
            margin-top: 100px;
            text-align: center;
            font-size: 14px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="story-content">
          ${content.join('<div class="page-break"></div>')}
        </div>
        <div class="footer">MyStory ile Sevgiyle Hazırlandı</div>
      </body>
      </html>
    `
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${title}.html`
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

  return (
    <div className="max-w-4xl mx-auto bg-amber-50 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-amber-100 flex flex-col md:flex-row">
      {/* Visual Section */}
      <div className="w-full md:w-1/2 relative bg-amber-200/50 min-h-[300px] flex items-center justify-center p-4">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Masal Görseli" 
            className="w-full h-full object-cover rounded-3xl shadow-inner"
          />
        ) : (
          <div className="text-amber-400 flex flex-col items-center">
            <ImageIcon size={64} className="mb-4 opacity-50" />
            <p className="font-bold text-xl opacity-70">Görsel Yükleniyor...</p>
          </div>
        )}
        
        {/* Audio Player Controls overlaid on image */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 border-2 border-amber-100">
          <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
            title="Oynat/Duraklat"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <div className="h-10 w-px bg-amber-200 mx-2" />

          <button 
            onClick={downloadAudio}
            className="flex flex-col items-center gap-1 text-amber-700 hover:text-amber-900 transition-colors group"
            title="Sesli Kitap Olarak İndir (MP3)"
          >
            <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Ses</span>
          </button>

          <div className="h-10 w-px bg-amber-200 mx-1" />

          <button 
            onClick={downloadBook}
            className="flex flex-col items-center gap-1 text-amber-700 hover:text-amber-900 transition-colors group"
            title="Masal Metnini İndir (HTML/Kitap)"
          >
            <Download size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Kitap</span>
          </button>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FFFdf8]">
        <h1 className="text-4xl md:text-5xl font-black text-amber-900 mb-8 leading-tight font-['Comic_Sans_MS',_sans-serif]">
          {title}
        </h1>
        
        <div className="text-2xl md:text-3xl leading-relaxed text-slate-700 font-medium space-y-6">
          <p>{content[currentPage] || "Bir varmış bir yokmuş..."}</p>
        </div>

        {/* Page Navigation */}
        <div className="mt-12 flex justify-between items-center border-t-4 border-amber-100 pt-6">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-6 py-3 bg-amber-100 text-amber-800 rounded-2xl font-bold text-xl disabled:opacity-50 hover:bg-amber-200 transition-colors"
          >
            Geri
          </button>
          <span className="text-amber-800 font-bold text-xl bg-amber-100 px-4 py-2 rounded-xl">
            Sayfa {currentPage + 1}
          </span>
          <button 
            onClick={() => setCurrentPage(Math.min(content.length - 1, currentPage + 1))}
            disabled={currentPage === content.length - 1}
            className="px-6 py-3 bg-amber-500 text-white rounded-2xl font-bold text-xl disabled:opacity-50 hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  )
}
