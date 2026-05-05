'use client'

import { useState } from 'react'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useEffect } from 'react'

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
  // Arka Plan Test State'leri
  const [jobId, setJobId] = useState<string | null>(null)
  
  interface JobStatus {
    status: string;
    progress: number;
    master_ref_data?: string;
    story_id?: string;
    error_message?: string;
    id: string;
    payload: Record<string, unknown>;
  }
  
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null)
  const supabase = createClient()

  // Realtime Takip
  useEffect(() => {
    if (!jobId) return

    const channel = supabase
      .channel(`job-${jobId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'generation_jobs',
        filter: `id=eq.${jobId}` 
      }, (payload) => {
        setJobStatus(payload.new as JobStatus)
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [jobId])

  const handleBackgroundTest = async () => {
    setLoading(true)
    try {
      const res = await backgroundStoryAction({
        hero: 'Test Kahramanı',
        theme: prompt,
        voiceOption: selectedVoice,
        childName: 'Test Çocuk',
        age: '5',
        style: selectedStyle
      })
      if (res.success && res.jobId) {
        setJobId(res.jobId)
        // İlk durumu al
        const { data } = await supabase.from('generation_jobs').select('*').eq('id', res.jobId).single()
        setJobStatus(data)
      }
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
          
          <div className="flex justify-center">
            <button 
              onClick={handleBackgroundTest}
              disabled={loading}
              className={`w-full max-w-md py-4 rounded-2xl text-white font-bold text-lg transition-all ${loading ? 'bg-gray-400' : 'bg-[#4A3E3E] hover:bg-black shadow-lg shadow-black/20'}`}
            >
              {loading && jobId ? 'Kuyrukta İşleniyor...' : 'Hikaye Üretimini Başlat (Yeni Asenkron Hat) 🚀'}
            </button>
          </div>
        </div>

        {/* ARKA PLAN İLERLEME DURUMU */}
        {jobStatus && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#4A3E3E] mb-8 animate-in zoom-in duration-500">
            <h2 className="text-2xl font-bold text-[#4A3E3E] mb-6 flex items-center gap-2">
              🛰️ Arka Plan İşlem Takibi
              <span className="text-xs bg-[#F0EBE3] px-3 py-1 rounded-full text-[#8C7B7B] font-normal">ID: {jobId}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-[#4A3E3E]">İlerleme Durumu: {jobStatus.status.toUpperCase()}</span>
                  <span className="text-sm font-bold text-[#D4A373]">{jobStatus.progress}%</span>
                </div>
                <div className="w-full bg-[#F0EBE3] h-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#D4A373] h-full transition-all duration-1000 ease-out"
                    style={{ width: `${jobStatus.progress}%` }}
                  />
                </div>
                
                <ul className="mt-6 space-y-3">
                  <li className={`flex items-center gap-2 text-sm ${jobStatus.progress >= 10 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                    {jobStatus.progress >= 10 ? '✅' : '⏳'} Metin Üretimi
                  </li>
                  <li className={`flex items-center gap-2 text-sm ${jobStatus.progress >= 20 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                    {jobStatus.progress >= 20 ? '✅' : '⏳'} Master Karakter Paftası (Karakter Mühürleme)
                  </li>
                  <li className={`flex items-center gap-2 text-sm ${jobStatus.progress >= 80 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                    {jobStatus.progress >= 80 ? '✅' : '⏳'} 12 Sahne Paralel Çizim
                  </li>
                  <li className={`flex items-center gap-2 text-sm ${jobStatus.progress >= 100 ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                    {jobStatus.progress >= 100 ? '✅' : '⏳'} Seslendirme ve Kayıt
                  </li>
                </ul>

                {jobStatus.status === 'completed' && jobStatus.story_id && (
                  <Link 
                    href={`/story/${jobStatus.story_id}`}
                    className="mt-8 block w-full py-4 bg-green-600 text-white text-center font-bold rounded-2xl hover:bg-green-700 shadow-lg"
                  >
                    Masal Hazır! Hemen Oku ✨
                  </Link>
                )}

                {jobStatus.status === 'failed' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-200">
                    ❌ Hata: {jobStatus.error_message}
                  </div>
                )}
              </div>

              {/* MASTER REFERANS ÖNİZLEME */}
              <div className="bg-[#F9F7F2] rounded-2xl p-4 border border-[#E8E2D6] flex flex-col items-center justify-center min-h-[300px]">
                <h4 className="text-xs font-bold text-[#8C7B7B] uppercase mb-4">Master Karakter Paftası (Referans)</h4>
                {jobStatus.master_ref_data ? (
                  <img 
                    src={`data:image/png;base64,${jobStatus.master_ref_data}`} 
                    className="w-full rounded-xl shadow-lg border-4 border-white"
                    alt="Master Reference"
                  />
                ) : (
                  <div className="text-gray-400 text-sm text-center italic">
                    Karakterler henüz mühürlenmedi...
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
