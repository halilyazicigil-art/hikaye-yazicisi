'use client'

import { useState } from 'react'
import { testPipeline } from '@/app/actions/testPipeline'

export default function TestPipelinePage() {
  const [prompt, setPrompt] = useState('Ayşe arabaya biniyor')
  const [style, setStyle] = useState('(pastel)')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleTest = async () => {
    setLoading(true)
    try {
      const data = await testPipeline(prompt, style)
      setResults(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] p-8 font-outfit">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#4A3E3E] mb-2">🧪 Saha Test Laboratuvarı</h1>
          <p className="text-[#8C7B7B]">Boru hattını (Pipeline) tek tıkla test edin, kredinizi koruyun.</p>
        </header>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-brown-100/20 border border-[#F0EBE3] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-[#6B5B5B] mb-2">Test Cümlesi</label>
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8E2D6] focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-[#4A3E3E]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#6B5B5B] mb-2">Stil Komutu</label>
              <input 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8E2D6] focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-[#4A3E3E]"
              />
            </div>
          </div>
          
          <button 
            onClick={handleTest}
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all ${loading ? 'bg-gray-400' : 'bg-[#D4A373] hover:bg-[#BC8A5F] shadow-lg shadow-[#D4A373]/30'}`}
          >
            {loading ? 'Boru Hattı Test Ediliyor...' : 'Sihirli Testi Başlat 🚀'}
          </button>
        </div>

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Metin Sonucu */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#4A3E3E]">📝 Metin (Flash 3.1)</h3>
                <StatusBadge status={results.text.status} />
              </div>
              <p className="text-sm text-[#6B5B5B] leading-relaxed bg-[#F9F7F2] p-4 rounded-xl italic">
                "{results.text.content || 'Üretilemedi'}"
              </p>
              {results.text.error && <p className="text-xs text-red-500 mt-2">{results.text.error}</p>}
            </div>

            {/* Görsel Sonucu */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#4A3E3E]">🎨 Görsel (Banana 2)</h3>
                <StatusBadge status={results.image.status} />
              </div>
              {results.image.url ? (
                <img src={results.image.url} className="w-full aspect-square object-cover rounded-2xl shadow-inner border border-[#F0EBE3]" alt="Test" />
              ) : (
                <div className="w-full aspect-square bg-[#F9F7F2] rounded-2xl flex items-center justify-center text-gray-400">Görsel Yok</div>
              )}
              {results.image.error && <p className="text-xs text-red-500 mt-2">{results.image.error}</p>}
            </div>

            {/* Ses Sonucu */}
            <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#4A3E3E]">🔊 Ses (Flash TTS)</h3>
                <StatusBadge status={results.audio.status} />
              </div>
              {results.audio.url ? (
                <audio controls className="w-full mt-4">
                  <source src={results.audio.url} type="audio/mpeg" />
                </audio>
              ) : (
                <div className="w-full py-8 bg-[#F9F7F2] rounded-2xl flex items-center justify-center text-gray-400 italic">Ses Dosyası Yok</div>
              )}
              {results.audio.error && <p className="text-xs text-red-500 mt-2">{results.audio.error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    'SUCCESS': 'bg-green-100 text-green-700',
    'FAILED': 'bg-red-100 text-red-700',
    'PENDING': 'bg-gray-100 text-gray-700'
  }
  return (
    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${colors[status]}`}>
      {status}
    </span>
  )
}
