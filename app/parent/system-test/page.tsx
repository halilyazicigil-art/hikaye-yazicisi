'use client'

import { useState } from 'react'
import { testPipelineAction } from '@/app/actions/testPipeline'
import Link from 'next/link'

const STYLES = ['Sulu Boya', '3D Pixar Stili', 'Pastel Düşler', 'Anime', 'Yağlı Boya', 'Pop Art', 'Çizgi Film', 'Vintage Retro']
const VOICES = [
  { id: 'Achird', name: 'Bilge Dede' },
  { id: 'Algenib', name: 'Gezgin Tavşan' },
  { id: 'Algieba', name: 'Cesur Şövalye' },
  { id: 'Alnilam', name: 'Yüce Kral' },
  { id: 'Charon', name: 'Heyecanlı Baba' },
  { id: 'Iapetus', name: 'Orman Muhafızı' },
  { id: 'Aoede', name: 'Bilge Anne' },
  { id: 'Callirrhoe', name: 'Masalcı Kadın' },
  { id: 'Despina', name: 'Huzur Perisi' },
  { id: 'Fenrir', name: 'Sihirli Peri' },
  { id: 'Gacrux', name: 'Gizemli Prenses' },
  { id: 'Kore', name: 'Gökkuşağı Kızı' },
]

export default function SystemTestPage() {
  const [prompt, setPrompt] = useState('Küçük bir robot ve kedisi yıldızlara bakıyor')
  const [selectedStyle, setSelectedStyle] = useState('Sulu Boya')
  const [selectedVoice, setSelectedVoice] = useState('Iapetus')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleTest = async () => {
    setLoading(true)
    try {
      const data = await testPipelineAction(prompt, selectedStyle, selectedVoice)
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
          <Link href="/parent" className="inline-block mb-4 text-[#D4A373] hover:underline">← Ebeveyn Paneline Dön</Link>
          <h1 className="text-4xl font-bold text-[#4A3E3E] mb-2">🧪 Sistem Teşhis Merkezi</h1>
          <p className="text-[#8C7B7B]">Masal üretim motorunu (Metin, Görsel, Ses) canlı olarak test edin.</p>
        </header>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#F0EBE3] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-[#6B5B5B] mb-2">Test Konusu</label>
              <input 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8E2D6] focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                placeholder="Örn: Ormanda kaybolan bir panda..."
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
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg transition-all ${loading ? 'bg-gray-400 animate-pulse' : 'bg-[#D4A373] hover:bg-[#BC8A5F] shadow-lg shadow-[#D4A373]/30'}`}
          >
            {loading ? 'Motorlar Isınıyor...' : 'Tam Sistem Testini Başlat 🚀'}
          </button>
        </div>

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* METİN SONUCU */}
              <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
                <h3 className="font-bold text-[#4A3E3E] mb-4 flex items-center">📝 Üretilen Metin</h3>
                {results.text.status === 'SUCCESS' ? (
                  <p className="text-sm text-[#6B5B5B] leading-relaxed bg-[#F9F7F2] p-4 rounded-xl italic">"{results.text.content}"</p>
                ) : (
                  <div className="text-red-500 bg-red-50 p-4 rounded-xl text-xs">{results.text.error}</div>
                )}
              </div>

              {/* GÖRSEL SONUCU */}
              <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
                <h3 className="font-bold text-[#4A3E3E] mb-4 flex items-center">🎨 Görsel Çıktısı</h3>
                {results.image.status === 'SUCCESS' ? (
                  <img src={results.image.url} className="w-full aspect-square object-cover rounded-2xl border border-[#F0EBE3]" alt="Test" />
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="text-red-500 font-bold mb-2">Görsel Üretilemedi</div>
                    <p className="text-[10px] text-red-400 text-center bg-red-50 p-2 rounded-lg">{results.image.error}</p>
                  </div>
                )}
              </div>

              {/* SES SONUCU */}
              <div className="bg-white p-6 rounded-3xl border border-[#F0EBE3] shadow-md">
                <h3 className="font-bold text-[#4A3E3E] mb-4 flex items-center">🔊 Sesli Anlatım</h3>
                {results.audio.status === 'SUCCESS' ? (
                  <audio controls className="w-full mt-4"><source src={results.audio.url} type="audio/mpeg" /></audio>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="text-red-500 font-bold mb-2">Ses Üretilemedi</div>
                    <p className="text-[10px] text-red-400 text-center bg-red-50 p-2 rounded-lg">{results.audio.error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
