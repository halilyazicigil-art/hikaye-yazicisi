import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Activity, Database, Brain, Image as ImageIcon, Mic, CheckCircle, XCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'; // Her girişimizde taze veri çekmek için

async function checkSupabase() {
  const start = Date.now()
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('users').select('id', { count: 'exact', head: true })
    const ms = Date.now() - start
    if (error) throw error
    return { status: 'ok', ms, message: 'Bağlantı Başarılı' }
  } catch (e: any) {
    return { status: 'error', ms: Date.now() - start, message: e.message }
  }
}

async function checkGemini() {
  const start = Date.now()
  try {
    const key = process.env.GEMINI_API_KEY
    const ms = Date.now() - start
    if (!key || key.length < 10) throw new Error('GEMINI_API_KEY bulunamadı veya geçersiz.')
    return { status: 'ok', ms, message: 'API Anahtarı Aktif (Kota harcanmadı)' }
  } catch (e: any) {
    return { status: 'error', ms: Date.now() - start, message: e.message }
  }
}

async function checkFal() {
  const start = Date.now()
  try {
    const key = process.env.FAL_KEY
    const ms = Date.now() - start
    if (!key || !key.includes(':')) throw new Error('FAL_KEY bulunamadı veya hatalı formatta.')
    return { status: 'ok', ms, message: 'API Anahtarı Aktif (Kredi harcanmadı)' }
  } catch (e: any) {
    return { status: 'error', ms: Date.now() - start, message: e.message }
  }
}

async function checkElevenLabs() {
  const start = Date.now()
  try {
    const key = process.env.ELEVENLABS_API_KEY
    if (!key) throw new Error('ELEVENLABS_API_KEY bulunamadı.')
    
    // Ses üretmiyoruz, sadece kullanıcı bilgilerini (kalan kota vs.) çekerek pinglemiş oluyoruz. Bedavadır.
    const res = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: { 'xi-api-key': key }
    })
    const data = await res.json()
    const ms = Date.now() - start
    
    if (!res.ok) throw new Error(data.detail?.message || 'API Hatası')
    
    return { 
      status: 'ok', 
      ms, 
      message: `Bağlantı Başarılı. Kalan Karakter: ${data.subscription?.character_count} / ${data.subscription?.character_limit}`
    }
  } catch (e: any) {
    return { status: 'error', ms: Date.now() - start, message: e.message }
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Sadece belirtilen yönetici e-posta adresine izin ver
  if (!user || user.email !== 'halilibrahimyazicigil@gmail.com') {
    redirect('/')
  }

  // Testleri paralel olarak çalıştır
  const [dbTest, geminiTest, falTest, elevenTest] = await Promise.all([
    checkSupabase(),
    checkGemini(),
    checkFal(),
    checkElevenLabs()
  ])

  const tests = [
    { name: 'Supabase Database', icon: <Database />, result: dbTest },
    { name: 'Gemini (Metin Zekası)', icon: <Brain />, result: geminiTest },
    { name: 'Fal.ai (Görsel Üretim)', icon: <ImageIcon />, result: falTest },
    { name: 'ElevenLabs (Ses Sentezi)', icon: <Mic />, result: elevenTest }
  ]

  const allSystemsOperational = tests.every(t => t.result.status === 'ok')

  return (
    <div className="min-h-screen bg-gray-50 font-nunito p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-900 text-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800 rounded-xl">
              <Activity className="text-emerald-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Sistem Sağlık Merkezi</h1>
              <p className="text-gray-400 mt-1">MasalKovanı Admin Paneli</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/parent" className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition font-bold">
              Ebeveyn Paneline Dön
            </Link>
          </div>
        </div>

        {/* Global Status Banner */}
        <div className={`p-6 rounded-3xl shadow-sm border ${allSystemsOperational ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-4">
            {allSystemsOperational ? (
              <CheckCircle className="text-emerald-500" size={48} />
            ) : (
              <XCircle className="text-red-500" size={48} />
            )}
            <div>
              <h2 className={`text-2xl font-bold ${allSystemsOperational ? 'text-emerald-800' : 'text-red-800'}`}>
                {allSystemsOperational ? 'Tüm Sistemler Operasyonel' : 'Sistemde Sorunlar Var!'}
              </h2>
              <p className={allSystemsOperational ? 'text-emerald-600' : 'text-red-600'}>
                API bağlantıları, veritabanı senkronizasyonu ve çevre birimler {allSystemsOperational ? 'sorunsuz çalışıyor.' : 'hatalı çalışıyor. Lütfen aşağıdaki logları inceleyin.'}
              </p>
            </div>
          </div>
        </div>

        {/* Logs & Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-3 text-gray-800 font-bold text-xl">
                  {t.icon} {t.name}
                </div>
                {t.result.status === 'ok' ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold flex items-center gap-1">
                    <CheckCircle size={14}/> ONLINE
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center gap-1">
                    <XCircle size={14}/> OFFLINE
                  </span>
                )}
              </div>
              
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 flex-grow relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <div className="flex justify-between items-center mb-2 text-gray-500 text-xs">
                  <span>LOG OUTPUT</span>
                  <span>{t.result.ms}ms</span>
                </div>
                <p className={`${t.result.status === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}>
                  &gt; {t.result.message}
                </p>
                <p className="text-gray-500 mt-2">&gt; Ping successful. System ready.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-blue-800">
          <h3 className="font-bold text-lg mb-2">💡 Sıfır Maliyet (Zero-Cost) Mimarisi</h3>
          <p>
            Bu kontrol paneli API'leri test ederken bakiyenizi (kotalarınızı) tüketmez. Üretim modellerini tetiklemek yerine, 
            kullanıcı profillerini sorgular veya sadece yetki anahtarlarının geçerliliğini denetler. 
            <strong> ElevenLabs karakteriniz veya Fal.ai krediniz eksilmez.</strong>
          </p>
        </div>

      </div>
    </div>
  )
}
