'use client'

import { useState } from 'react'
import { testPipeline } from '@/app/actions/testPipeline'
import Link from 'next/link'

const STYLES = ['Sulu Boya', '3D Pixar Stili', 'Pastel Düşler', 'Anime', 'Yağlı Boya', 'Pop Art', 'Çizgi Film', 'Vintage Retro']
const VOICES = [
  { id: 'tr-TR-Chirp3-HD-Achird', name: 'Bilge Dede' },
  { id: 'tr-TR-Chirp3-HD-Algenib', name: 'Gezgin Tavşan' },
  { id: 'tr-TR-Chirp3-HD-Algieba', name: 'Cesur Şövalye' },
  { id: 'tr-TR-Chirp3-HD-Alnilam', name: 'Yüce Kral' },
  { id: 'tr-TR-Chirp3-HD-Charon', name: 'Heyecanlı Baba' },
  { id: 'tr-TR-Chirp3-HD-Iapetus', name: 'Orman Muhafızı' },
  { id: 'tr-TR-Chirp3-HD-Aoede', name: 'Bilge Anne' },
  { id: 'tr-TR-Chirp3-HD-Callirrhoe', name: 'Masalcı Kadın' },
  { id: 'tr-TR-Chirp3-HD-Despina', name: 'Huzur Perisi' },
  { id: 'tr-TR-Chirp3-HD-Fenrir', name: 'Sihirli Peri' },
  { id: 'tr-TR-Chirp3-HD-Gacrux', name: 'Gizemli Prenses' },
  { id: 'tr-TR-Chirp3-HD-Kore', name: 'Gökkuşağı Kızı' },
]

export default function TestPipelinePage() {
  const [prompt, setPrompt] = useState('Küçük bir robot ve kedisi yıldızlara bakıyor')
  const [selectedStyle, setSelectedStyle] = useState('Sulu Boya')
  const [selectedVoice, setSelectedVoice] = useState('tr-TR-Chirp3-HD-Iapetus')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleTest = async () => {
    setLoading(true)
    try {
      const data = await testPipeline(prompt, selectedStyle, selectedVoice)
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
          <h1 className="text-4xl font-bold text-[#4A3E3E] mb-2">🧪 Sistem Laboratuvarı</h1>
          <p className="text-[#8C7B7B]">Karakter uyumunu ve sesleri canlı kütüphane kaydıyla test edin.</p>
        </header>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#F0EBE3] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-[#6B5B5B] mb-2">Test Konusu</label>
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8E2D6] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#6B5B5B] mb-2">Çizim Stili</label>
              <select 
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8E2D6] focus:outline-none"
              >
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#6B5B5B] mb-2">Masalcı Sesi</label>
              <select 
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8E2D6] focus:outline-none"
              >
                {VOICES.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleTest}
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all ${loading ? 'bg-gray-400' : 'bg-[#D4A373] hover:bg-[#BC8A5F] shadow-lg shadow-[#D4A373]/30'}`}
          >
            {loading ? 'Laboratuvar Çalışıyor...' : 'Tam Sistem Testini Başlat 🚀'}
          </button>
        </div>

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
                <h3 className="font-bold text-[#4A3E3E] mb-4">📝 Üretilen Metin</h3>
                <p className="text-sm text-[#6B5B5B] leading-relaxed bg-[#F9F7F2] p-4 rounded-xl italic">"{results.text.content}"</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
                <h3 className="font-bold text-[#4A3E3E] mb-4">🎨 Çizim (Banana 2)</h3>
                {results.image.url ? (
                  <img src={results.image.url} className="w-full aspect-square object-cover rounded-2xl border border-[#F0EBE3]" alt="Test" />
                ) : <div className="text-red-500">Görsel Üretilemedi</div>}
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
                <h3 className="font-bold text-[#4A3E3E] mb-4">🔊 Ses (Flash TTS)</h3>
                {results.audio.url ? (
                  <audio controls className="w-full mt-4"><source src={results.audio.url} type="audio/mpeg" /></audio>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="text-red-500 font-bold">Ses Üretilemedi</div>
                    {results.audio.error && <p className="text-[10px] text-red-400 mt-2 text-center bg-red-50 p-2 rounded-lg">{results.audio.error}</p>}
                  </div>
                )}
              </div>
            </div>

            {results.savedId && (
              <div className="bg-green-50 border border-green-200 p-6 rounded-3xl flex flex-col items-center">
                <p className="text-green-800 font-bold mb-4">✅ Test Masalı Kütüphaneye Kaydedildi!</p>
                <Link 
                  href={`/story/${results.savedId}`}
                  className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
                >
                  Masalı Kütüphanede Görüntüle 📖
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
