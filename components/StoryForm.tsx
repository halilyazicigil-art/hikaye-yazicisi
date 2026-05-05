'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, Shuffle, X, Plus } from 'lucide-react'
import { backgroundStoryAction } from '@/app/actions/backgroundStoryAction'
import { saveStoryMetadata } from '@/app/actions/metadata'
import { uploadReferenceImage } from '@/app/actions/uploadReferenceImage'
import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'

const AI_VOICES = [
  // — Beyefendi Masalcılar —
  { id: 'Achird',       name: 'Bilge Dede',      desc: 'Tok, bilgece ve güven veren' },
  { id: 'Algenib',      name: 'Gezgin Tavşan',   desc: 'Neşeli ve yerinde duramayan' },
  { id: 'Algieba',      name: 'Cesur Şövalye',   desc: 'Güçlü ve kahramanvari' },
  { id: 'Alnilam',      name: 'Yüce Kral',       desc: 'Otoriter ve onurlu' },
  { id: 'Charon',       name: 'Heyecanlı Baba',  desc: 'Sürprizleri seven ve oyunbaz' },
  { id: 'Iapetus',      name: 'Orman Muhafızı',  desc: 'Derin ve koruyucu bir ses' },
  // — Hanımefendi Masalcılar —
  { id: 'Aoede',        name: 'Bilge Anne',      desc: 'En şefkatli ve huzur veren' },
  { id: 'Callirrhoe',   name: 'Masalcı Kadın',   desc: 'Akıcı ve merak uyandıran' },
  { id: 'Despina',      name: 'Huzur Perisi',    desc: 'Yumuşak ve sakinleştirici' },
  { id: 'Fenrir',       name: 'Sihirli Peri',    desc: 'Genç, taze ve büyülü' },
  { id: 'Gacrux',       name: 'Gizemli Prenses',  desc: 'Zarif, mistik ve asil' },
  { id: 'Kore',         name: 'Gökkuşağı Kızı',   desc: 'Canlı, neşeli ve renkli' },
]

const GENRES = ['Masal', 'Bilim Kurgu', 'Macera', 'Fantastik', 'Fabl']
const IMAGE_STYLES = ['Sulu Boya', '3D Pixar Stili', 'Pastel Düşler', 'Anime', 'Yağlı Boya', 'Pop Art', 'Çizgi Film', 'Vintage Retro']
const AGE_GROUPS = ['0-1', '1-2', '2-4', '4-6', '6-10', '10-13']

const STORY_SCENARIOS = [
  {
    characters: ['Kaptan Bulut', 'Martı Gümüş'],
    prompt: 'Kaptan Bulut ve yardımcısı Martı Gümüş, gökyüzündeki gökkuşağının renklerinin neden solduğunu bulmak için renkli bir yolculuğa çıkıyor.'
  },
  {
    characters: ['Robot Çark', 'Küçük Mühendis Melis'],
    prompt: 'Robot Çark ve Melis, bozulan bir yıldız haritasını tamir etmek için uzay gemileriyle Samanyolu galaksisinde gizemli bir parçanın peşine düşerler.'
  },
  {
    characters: ['Sevimli Ayı Pofuduk', 'Bilge Baykuş'],
    prompt: 'Ayı Pofuduk, kış uykusuna yatmadan önce ormandaki en büyük bal kovanının haritasını bulmak için Bilge Baykuş ile bir maceraya atılır.'
  },
  {
    characters: ['Prenses Ada', 'Uçan At Kanat'],
    prompt: 'Prenses Ada, krallığın üzerinden hiç eksilmeyen yağmur bulutlarını dağıtmak için Uçan Atı Kanat ile güneşin doğduğu diyara uçar.'
  },
  {
    characters: ['Minik Tavşan Pamuk', 'Hızlı Kaplumbağa'],
    prompt: 'Pamuk ve Kaplumbağa, ormanda düzenlenen yıllık büyük piknik için en lezzetli havuçları toplamak üzere gizli bahçeye giderler.'
  },
  {
    characters: ['Cesur İtfaiyeci Kerem', 'Yavru Kedi Duman'],
    prompt: 'İtfaiyeci Kerem, bir ağacın en tepesinde mahsur kalan Duman\'ı kurtarmaya çalışırken, ikisi birden sihirli bir tünelden başka bir diyara geçerler.'
  },
  {
    characters: ['Dedektif Can', 'Konuşan Köpek Tarçın'],
    prompt: 'Dedektif Can ve Tarçın, müzedeki en değerli elmasın neden sadece geceleri parladığını çözmek için gizemli bir ipucunu takip ederler.'
  },
  {
    characters: ['Minik Peri Işıltı', 'Dev Arı Vızvız'],
    prompt: 'Peri Işıltı, kanatlarındaki tozun azalması üzerine, dünyanın en nadir çiçeğinden polen toplamak için Dev Arı Vızvız\'ın sırtında bir yolculuğa çıkar.'
  },
  {
    characters: ['Süper Çocuk Mert', 'Gölge Adam'],
    prompt: 'Mert, şehri ele geçirmeye çalışan Gölge Adam\'ı iyilik ve neşe ile durdurmak için mahalledeki tüm çocuklarla bir plan yapar.'
  },
  {
    characters: ['Mavi Ejderha Alev', 'Küçük Viking'],
    prompt: 'Alev, ateş püskürtemediği için üzüldüğünde, Küçük Viking ona acı biberlerin ve dostluğun sırrını anlatarak yardım eder.'
  }
]

export default function StoryForm({ isPro = false, isPremium = false }: { isPro?: boolean, isPremium?: boolean }) {
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Form Data
  const [voice, setVoice] = useState<string>('Aoede') 
  const [voiceName, setVoiceName] = useState<string>('Bilge Anne')
  const [clonedVoices, setClonedVoices] = useState<any[]>([])
  const [isUploadingVoice, setIsUploadingVoice] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  
  const [genre, setGenre] = useState<string>('Masal')
  const [imageStyle, setImageStyle] = useState<string>('Sulu Boya')
  const [ageGroup, setAgeGroup] = useState<string>('2-4')
  const [characters, setCharacters] = useState<string[]>(['Sevimli Ayı'])
  const [educationalValue, setEducationalValue] = useState<string>('Dürüstlük')
  const [uploadedRefFile, setUploadedRefFile] = useState<File | null>(null)

  const supabase = createClient()
  const [jobId, setJobId] = useState<string | null>(null)
  
  interface JobStatus {
    status: string;
    progress: number;
    master_ref_data?: string;
    story_id?: string;
    error_message?: string;
    id: string;
  }
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null)
  const [remainingStories, setRemainingStories] = useState<number | null>(null)

  useEffect(() => {
    const fetchQuota = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 1. Abonelik ve Profil Bilgilerini Çek
      const [{ data: sub }, { data: profiles }] = await Promise.all([
        supabase.from('subscriptions').select('plan_id, current_period_end').eq('user_id', user.id).maybeSingle(),
        supabase.from('profiles').select('id').eq('user_id', user.id)
      ])

      const profileIds = profiles?.map(p => p.id) || []
      const isPremiumUser = sub?.plan_id === 'premium'
      const isProUser = sub?.plan_id === 'pro'
      const storyLimit = isPremiumUser ? 90 : (isProUser ? 40 : 3)

      // 2. Mevcut Dönem Başlangıcını Bul (Sert Sıfırlama)
      let startDate = new Date()
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
      if (sub?.current_period_end) {
        startDate = new Date(sub.current_period_end)
        startDate.setDate(startDate.getDate() - 30)
      }

      // 3. Kullanımı Say
      const { count } = await supabase
        .from('stories')
        .select('*', { count: 'exact', head: true })
        .in('profile_id', profileIds)
        .gte('created_at', startDate.toISOString())

      setRemainingStories(Math.max(0, storyLimit - (count || 0)))
    }

    fetchQuota()
    
    const fetchClonedVoices = async () => {
      const { data } = await supabase.from('cloned_voices').select('*')
      if (data) setClonedVoices(data)
    }
    fetchClonedVoices()
  }, [])

  useEffect(() => {
    if (!jobId) return

    const channel = supabase
      .channel(`job-${jobId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'generation_jobs',
        filter: `id=eq.${jobId}` 
      }, async (payload) => {
        const newStatus = payload.new as JobStatus;
        setJobStatus(newStatus)

        if (newStatus.status === 'completed' && newStatus.story_id) {
          // Başarılı üretim sonrası sayacı düşür (iyimser güncelleme)
          setRemainingStories(prev => (prev !== null ? prev - 1 : 0))
          
          // 🛡️ METADATA KAYDI (BORU HATTI DIŞI)
          await saveStoryMetadata(newStatus.story_id, {
            voice_name: voiceName,
            genre: genre,
            style: imageStyle,
            age_group: ageGroup,
            educational_value: tab === 'egitici' ? educationalValue : null,
            characters: characters.filter(c => c.trim() !== '')
          });
          window.location.href = `/story/${newStatus.story_id}`
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [jobId, voiceName, genre, imageStyle, ageGroup, tab, educationalValue, characters])

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleVoiceSelect = (id: string, name: string) => {
    setVoice(id)
    setVoiceName(name)
  }

  const handleVoiceUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const file = formData.get('audio') as File
    const name = formData.get('name') as string

    if (!file || !name) return
    if (file.size > 10 * 1024 * 1024) {
      alert('Dosya boyutu çok büyük (Max 10MB)')
      return
    }

    setIsUploadingVoice(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Giriş yapmalısınız")

      // API Action çağrısı (ileride oluşturulacak)
      const res = await fetch('/api/voices/clone', {
        method: 'POST',
        body: formData
      })
      const result = await res.json()
      
      if (result.success) {
        setClonedVoices([...clonedVoices, result.voice])
        setVoice(result.voice.eleven_voice_id)
        setVoiceName(result.voice.name)
        setShowVoiceModal(false)
        alert('Sesiniz başarıyla eklendi! Artık masalları sizin sesinizle okuyabiliriz.')
      } else {
        alert(result.error || 'Ses klonlama hatası')
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUploadingVoice(false)
    }
  }

  const maxChars = isPremium ? 610 : (isPro ? 400 : 200)

  const handleTabSelect = (selectedTab: 'normal' | 'egitici') => {
    if (selectedTab === 'egitici' && !isPro && !isPremium) {
      alert('Eğitici mod için Tatlı Bal veya Altın Güneş paketine sahip olmalısınız.')
      return
    }
    setTab(selectedTab)
  }

  const handleRandomize = () => {
    // Random Voice
    const randomVoice = AI_VOICES[Math.floor(Math.random() * AI_VOICES.length)]
    setVoice(randomVoice.id)
    setVoiceName(randomVoice.name)

    // Random Genre
    const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)]
    setGenre(randomGenre)

    // Random Style
    const randomStyle = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)]
    setImageStyle(randomStyle)

    // Random Age Group
    const randomAge = AGE_GROUPS[Math.floor(Math.random() * AGE_GROUPS.length)]
    setAgeGroup(randomAge)

    // Random Scenario (Contextual Prompt & Characters)
    const randomScenario = STORY_SCENARIOS[Math.floor(Math.random() * STORY_SCENARIOS.length)]
    setPrompt(randomScenario.prompt)
    setCharacters(randomScenario.characters)
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt) {
      alert('Lütfen bir hikaye konusu yazın!')
      return
    }
    
    setIsGenerating(true)
    try {
      const chars = characters.filter(c => c.trim() !== '').join(', ') || 'İsimsiz Kahraman'
      const egitici = tab === 'egitici' ? ` Eğitici Değer: ${educationalValue}.` : ''
      const fullTheme = `${genre} tarzında. Konu: ${prompt}. Çizim Stili: ${imageStyle}. Ses Seçimi: ${voice}. Karakterler: ${chars}.${egitici}`
      
      let uploadedMasterRefUrl = undefined;
      if (uploadedRefFile) {
        const formData = new FormData();
        formData.append('file', uploadedRefFile);
        const uploadRes = await uploadReferenceImage(formData);
        if (uploadRes.success) {
          uploadedMasterRefUrl = uploadRes.url;
        } else {
          alert('Karakter referansı yüklenirken bir hata oluştu: ' + uploadRes.error);
          setIsGenerating(false);
          return;
        }
      }

      const response = await backgroundStoryAction({
        childName: 'Kullanıcı',
        hero: chars,
        theme: fullTheme,
        age: ageGroup,
        voiceOption: voice === 'Sessiz' ? 'Sessiz' : 'AI',
        elevenVoiceId: voice !== 'Sessiz' ? voice : undefined,
        style: imageStyle,
        uploaded_master_ref: uploadedMasterRefUrl
      })
      
      if (response.success && response.jobId) {
        setJobId(response.jobId)
        // İlk durumu al
        const { data } = await supabase.from('generation_jobs').select('*').eq('id', response.jobId).single()
        setJobStatus(data)
      } else {
        alert(response.error || 'Bilinmeyen bir hata oluştu.')
        setIsGenerating(false)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu'
      alert(errorMessage)
      setIsGenerating(false)
    }
    // NOT: setIsGenerating(false) işlemini başarılı durumda yapmıyoruz çünkü modalın görünmesini ve sürecin devam etmesini istiyoruz.
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-12 mb-20 border border-sky-50">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          type="button"
          onClick={() => handleTabSelect('normal')}
          className={`w-1/2 px-4 py-4 font-bold text-lg transition-colors ${tab === 'normal' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Normal Hikayeler
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('egitici')}
          className={`w-1/2 px-4 py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${tab === 'egitici' ? 'text-sky-700 border-b-4 border-sky-600 bg-sky-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Eğitici Hikayeler
          {!isPro && !isPremium && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Pro</span>}
        </button>
      </div>

      <form onSubmit={handleGenerate} className="p-6">
        {/* Main Textarea */}
        <div className="relative mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, maxChars))}
            placeholder={tab === 'normal' ? "Bana şu konu hakkında bir hikaye yaz..." : "Çocuğunuza ne öğretmek istersiniz? Örn: Ayşe'nin dişlerini fırçalamayı öğrenmesi..."}
            className="w-full h-32 resize-none text-xl p-4 focus:outline-none placeholder-gray-400 text-gray-800"
            required
          />
          <div className="absolute top-2 right-2 text-xs font-bold text-gray-400">
            {prompt.length} / {maxChars}
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-4">
            <label className={`p-2 rounded-lg transition cursor-pointer flex items-center gap-2 ${uploadedRefFile ? 'bg-indigo-100 text-indigo-700' : 'text-sky-700/60 hover:bg-sky-50'}`}>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedRefFile(e.target.files[0])
                  }
                }}
              />
              <ImageIcon size={20} />
              {uploadedRefFile && <span className="text-xs font-bold whitespace-nowrap overflow-hidden max-w-[120px] text-ellipsis">{uploadedRefFile.name}</span>}
            </label>
            <button 
              type="button" 
              onClick={handleRandomize}
              className="p-2 text-sky-700/60 hover:bg-sky-50 rounded-lg transition-all hover:scale-110 active:scale-95 group"
              title="Sürpriz Seçim Yap"
            >
              <Shuffle size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
            {uploadedRefFile && (
              <button type="button" onClick={() => setUploadedRefFile(null)} className="p-1 text-red-400 hover:text-red-600 transition">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Accordions */}
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          
          {/* SES (AUDIO) */}
          <div className="py-2">
            <div onClick={() => toggleSection('voice')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Ses</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#84B1D9] text-white px-3 py-1 rounded-full text-sm font-bold">{voiceName}</span>
                {openSection === 'voice' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'voice' && (
              <div className="p-4 space-y-6 bg-gray-50/50 rounded-xl mt-2">
                {/* Sessiz Seçeneği */}
                <div 
                  onClick={() => handleVoiceSelect('Sessiz', 'Sessiz')}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition text-center ${voice === 'Sessiz' ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                >
                  <span className="font-bold">Sessiz (Sadece Metin)</span>
                </div>

                {/* AI Sesleri */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Sihirli Masalcılar (AI)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {AI_VOICES.map(v => (
                      <div 
                        key={v.id} 
                        onClick={() => handleVoiceSelect(v.id, v.name)}
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.id ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                      >
                        <span className="font-bold text-sm text-center">{v.name}</span>
                        <span className="text-[10px] text-gray-400 text-center">{v.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kendi Sesim */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Kendi Sesim</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {clonedVoices.map(v => (
                      <div 
                        key={v.eleven_voice_id} 
                        onClick={() => handleVoiceSelect(v.eleven_voice_id, v.name)}
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.eleven_voice_id ? 'border-[#84B1D9] bg-[#BDD9F2]' : 'border-transparent bg-white shadow-sm'}`}
                      >
                        <span className="font-bold text-sm text-center">{v.name}</span>
                        <span className="text-[10px] text-emerald-500">Kendi Sesin</span>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => {
                        if (!isPremium) {
                          alert('Kendi sesinizi klonlamak için Altın Güneş paketine sahip olmalısınız.')
                        } else {
                          setShowVoiceModal(true)
                        }
                      }}
                      className="p-3 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 transition min-h-[60px]"
                    >
                      <Plus size={20} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-500">Yeni Ses Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Voice Upload Modal */}
          {showVoiceModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
                <button onClick={() => setShowVoiceModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={24} className="text-gray-400" />
                </button>

                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Plus size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Kendi Sesini Ekle</h3>
                  <p className="text-gray-500 mt-2">Masalları senin sesinle okuyalım!</p>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-sky-800 font-bold flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    Kural: En gerçekçi sonuç için en az 5 dakikalık, arkada gürültü olmayan net bir ses kaydı yüklemelisiniz.
                  </p>
                </div>

                <form onSubmit={handleVoiceUpload} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sese Bir İsim Ver</label>
                    <input name="name" type="text" placeholder="Örn: Anne Sesi, Canım Babam" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-purple-500 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ses Dosyasını Seç (MP3, WAV)</label>
                    <input name="audio" type="file" accept="audio/*" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer" required />
                  </div>
                  <button 
                    disabled={isUploadingVoice}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 transition-all disabled:opacity-50"
                  >
                    {isUploadingVoice ? 'Ses Klonlanıyor...' : 'Sesi Klonla ve Kaydet'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* EĞİTİCİ (Sadece Eğitici tabındaysa) */}
          {tab === 'egitici' && (
            <div className="py-2">
              <div onClick={() => toggleSection('educational')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
                <span className="font-bold text-gray-800 text-lg text-emerald-600">Öğretilecek Değer</span>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">{educationalValue}</span>
                  {openSection === 'educational' ? <ChevronUp className="text-emerald-700" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </div>
              {openSection === 'educational' && (
                <div className="p-4 bg-gray-50/50 rounded-xl mt-2 grid grid-cols-2 gap-3">
                  {['Dürüstlük', 'Paylaşmak', 'Cesaret', 'Sabır', 'Sorumluluk', 'Doğa Sevgisi'].map(val => (
                    <button type="button" key={val} onClick={() => setEducationalValue(val)} className={`p-3 rounded-lg font-bold border transition ${educationalValue === val ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white text-gray-600 hover:border-gray-300'}`}>
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TÜR (GENRE) */}
          <div className="py-2">
            <div onClick={() => toggleSection('genre')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Tür</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#84B1D9] text-white px-3 py-1 rounded-full text-sm font-bold">{genre}</span>
                {openSection === 'genre' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'genre' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 flex flex-wrap gap-2">
                {GENRES.map(g => (
                  <button type="button" key={g} onClick={() => setGenre(g)} className={`px-4 py-2 rounded-full font-bold transition ${genre === g ? 'bg-[#84B1D9] text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GÖRÜNTÜ STİLİ */}
          <div className="py-2">
            <div onClick={() => toggleSection('style')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Görüntü Stili</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#84B1D9] text-white px-3 py-1 rounded-full text-sm font-bold">{imageStyle}</span>
                {openSection === 'style' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'style' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 flex flex-wrap gap-2">
                {IMAGE_STYLES.map(s => (
                  <button type="button" key={s} onClick={() => setImageStyle(s)} className={`px-4 py-2 rounded-full font-bold transition ${imageStyle === s ? 'bg-[#84B1D9] text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* YAŞ GRUBU */}
          <div className="py-2">
            <div onClick={() => toggleSection('age')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Yaş Grubu</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#84B1D9] text-white px-3 py-1 rounded-full text-sm font-bold">{ageGroup} Yaş</span>
                {openSection === 'age' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'age' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2">
                <div className="flex flex-wrap justify-center gap-3">
                  {AGE_GROUPS.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setAgeGroup(range)}
                      className={`px-5 py-3 rounded-xl font-bold transition-all border-2 ${
                        ageGroup === range
                          ? 'bg-[#84B1D9] text-white border-[#84B1D9] shadow-lg scale-105'
                          : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-4 font-medium uppercase tracking-widest">
                  Masal içeriği seçilen yaşa göre özel olarak hazırlanacaktır
                </p>
              </div>
            )}
          </div>

          {/* KARAKTERLER */}
          <div className="py-2">
            <div onClick={() => toggleSection('characters')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Karakterler</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#84B1D9] text-white px-3 py-1 rounded-full text-sm font-bold">{characters.length} Karakter</span>
                {openSection === 'characters' ? <ChevronUp className="text-[#8FBDD9]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'characters' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 space-y-3">
                {characters.map((char, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={char}
                      onChange={(e) => {
                        const newChars = [...characters]
                        newChars[index] = e.target.value
                        setCharacters(newChars)
                      }}
                      className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#84B1D9]"
                      placeholder={`Karakter ${index + 1} detayları...`}
                    />
                    {characters.length > 1 && (
                      <button type="button" onClick={() => {
                        setCharacters(characters.filter((_, i) => i !== index))
                      }} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition">
                        <X size={20}/>
                      </button>
                    )}
                  </div>
                ))}
                {characters.length < 3 && (
                  <button type="button" onClick={() => setCharacters([...characters, ''])} className="text-[#84B1D9] font-bold text-sm flex items-center p-2 hover:bg-[#BDD9F2] rounded-lg transition">
                    <Plus size={16} className="mr-1"/> Karakter Ekle
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Submit Button */}
        <div className="mt-8 flex flex-col items-center pb-4">
          <button
            type="submit"
            disabled={isGenerating || (remainingStories !== null && remainingStories <= 0)}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center w-64 ${
              (remainingStories !== null && remainingStories <= 0) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-[#84B1D9] hover:bg-[#8FBDD9] text-white'
            } disabled:opacity-70`}
          >
            {isGenerating ? (
              <span className="flex items-center animate-pulse">
                <Sparkles className="animate-spin mr-2" size={20} />
                Sihir Yapılıyor...
              </span>
            ) : (remainingStories !== null && remainingStories <= 0) ? (
              <span className="flex items-center">
                <X className="mr-2" size={20} />
                Limit Doldu
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2" size={20} />
                Gönder
              </span>
            )}
          </button>
          
          {(remainingStories !== null && remainingStories <= 0) && (
            <p className="mt-4 text-red-500 font-bold text-sm bg-red-50 px-4 py-2 rounded-full border border-red-100">
              ⚠️ Aylık hikaye limitinize ulaştınız.
            </p>
          )}
          
          {remainingStories !== null && remainingStories > 0 && remainingStories <= 5 && (
            <p className="mt-4 text-orange-600 font-bold text-sm bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
              Dikkat! Sadece {remainingStories} masal hakkınız kaldı.
            </p>
          )}
        </div>
      </form>

      {/* Progress Modal Overlay */}
      {jobId && jobStatus && (
        <div className="fixed inset-0 bg-[#BDD9F2]/95 backdrop-blur-sm z-[200] flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl p-8 shadow-2xl border-4 border-[#84B1D9] relative animate-in zoom-in duration-500">
            {jobStatus.status === 'failed' && (
              <button 
                onClick={() => {
                  setJobId(null);
                  setJobStatus(null);
                  setIsGenerating(false);
                }} 
                className="absolute top-6 right-6 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
              >
                <X size={24} />
              </button>
            )}

            <div className="text-center mb-8">
              <h2 className="text-3xl font-lora font-bold text-[#2d2d2d] mb-2">
                Sihirli Masalınız Hazırlanıyor... ✨
              </h2>
              <p className="text-[#84B1D9] font-medium">Lütfen bu sayfayı kapatmayın, süreç 1-2 dakika sürebilir.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Progress Panel */}
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Durum: {jobStatus.status}</span>
                    <span className="text-lg font-black text-[#84B1D9]">{jobStatus.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-[#BDD9F2] to-[#84B1D9] h-full transition-all duration-1000 ease-out"
                      style={{ width: `${jobStatus.progress}%` }}
                    />
                  </div>
                </div>
                
                <ul className="space-y-4 bg-sky-50/50 p-6 rounded-2xl border border-sky-100/50">
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 10 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 10 ? '✅' : '⏳'}</span> Senaryo ve Metin Yazımı
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 20 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 20 ? '✅' : '⏳'}</span> Karakterler Çiziliyor (Master Pafta)
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 80 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 80 ? '✅' : '⏳'}</span> 12 Sahne Resimleniyor
                  </li>
                  <li className={`flex items-center gap-3 font-bold ${jobStatus.progress >= 100 ? 'text-emerald-600' : 'text-gray-400'}`}>
                    <span className="text-xl">{jobStatus.progress >= 100 ? '✅' : '⏳'}</span> Seslendirme ve Son Rötuşlar
                  </li>
                </ul>

                {jobStatus.status === 'completed' && (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-center font-bold text-lg border border-emerald-200">
                    🎉 Masalınız Tamamlandı! Yönlendiriliyorsunuz...
                  </div>
                )}

                {jobStatus.status === 'failed' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-200 font-bold">
                    ❌ Eyvah, bir hata oluştu: {jobStatus.error_message}
                  </div>
                )}
              </div>

              {/* Visual Reference Panel */}
              <div className="bg-[#BDD9F2] rounded-3xl p-6 border-2 border-dashed border-[#BDD9F2] flex flex-col items-center justify-center min-h-[300px]">
                <h4 className="text-sm font-bold text-sky-700 uppercase tracking-widest mb-4">Karakter Referansınız</h4>
                {jobStatus.master_ref_data ? (
                  <img 
                    src={jobStatus.master_ref_data.startsWith('http') ? jobStatus.master_ref_data : `data:image/png;base64,${jobStatus.master_ref_data}`} 
                    className="w-full rounded-2xl shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform"
                    alt="Master Reference"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-sky-900/40">
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <p className="font-bold">Ana karakterler henüz oluşturulmadı...</p>
                    <p className="text-sm mt-2">Yapay zeka şu an senaryoyu kurguluyor.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
