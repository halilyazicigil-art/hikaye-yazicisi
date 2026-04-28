'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, Shuffle, X, Plus } from 'lucide-react'
import { generateStoryAction } from '@/app/actions/generateStory'
import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'

const AI_VOICES = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Anne Şefkati', desc: 'Yumuşak ve sevgi dolu' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Masalcı Baba', desc: 'Tok ve güven verici' },
  { id: 'IKne3meq5pSxc9nNC7vY', name: 'Cesur Şövalye', desc: 'Kahramanvari ve enerjik' },
  { id: 'Lcf7NAUoQs9mX74shS92', name: 'Küçük Peri', desc: 'Neşeli ve büyülü' },
  { id: 'VR6Aewyiyih3pM1nuFpD', name: 'Bilge Kaplumbağa', desc: 'Yavaş ve öğretici' },
  { id: 'N2lVS1wzCLPce5hPByuF', name: 'Yıldız Tozu', desc: 'Huzurlu ve mistik' },
  { id: 'SAz9YHcvj6GT2oSNwa6X', name: 'Dev Devran', desc: 'Derin ve güçlü' },
  { id: 'ErXw3p0z3HjgvePyS0UN', name: 'Neşeli Tavşan', desc: 'Hızlı ve eğlenceli' },
  { id: 'Zlb1ssbc9RfoaQdO6K9f', name: 'Deniz Kızı', desc: 'Akıcı ve melodik' },
  { id: 'piTKPvrLXI70W7G3O7mH', name: 'Rüzgarın Fısıltısı', desc: 'Hafif ve sakin' },
]

export default function StoryForm({ isPro = false, isPremium = false }: { isPro?: boolean, isPremium?: boolean }) {
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Form Data
  const [voice, setVoice] = useState<string>('EXAVITQu4vr4xnSDxMaL') // Varsayılan: Anne Şefkati
  const [voiceName, setVoiceName] = useState<string>('Anne Şefkati')
  const [clonedVoices, setClonedVoices] = useState<any[]>([])
  const [isUploadingVoice, setIsUploadingVoice] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  
  const [genre, setGenre] = useState<string>('Masal')
  const [imageStyle, setImageStyle] = useState<string>('Sulu Boya')
  const [age, setAge] = useState<number>(4)
  const [characters, setCharacters] = useState<string[]>(['Sevimli Ayı'])
  const [educationalValue, setEducationalValue] = useState<string>('Dürüstlük')

  const supabase = createClient()

  useEffect(() => {
    const fetchClonedVoices = async () => {
      const { data } = await supabase.from('cloned_voices').select('*')
      if (data) setClonedVoices(data)
    }
    fetchClonedVoices()
  }, [])

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
      alert('Eğitici mod için Tatlı Bal veya Kraliçe Arı paketine sahip olmalısınız.')
      return
    }
    setTab(selectedTab)
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
      
      const response = await generateStoryAction({
        childName: 'Kullanıcı',
        hero: chars,
        theme: fullTheme,
        age: age,
        voiceOption: voice === 'Sessiz' ? 'Sessiz' : 'AI',
        elevenVoiceId: voice !== 'Sessiz' ? voice : undefined
      })
      
      if (response.success) {
        window.location.href = `/story/${response.story.id}`
      } else {
        alert(response.error || 'Bilinmeyen bir hata oluştu.')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu'
      alert(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-12 mb-20 border border-amber-50">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          type="button"
          onClick={() => handleTabSelect('normal')}
          className={`w-1/2 px-4 py-4 font-bold text-lg transition-colors ${tab === 'normal' ? 'text-amber-700 border-b-4 border-amber-600 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Normal Hikayeler
        </button>
        <button
          type="button"
          onClick={() => handleTabSelect('egitici')}
          className={`w-1/2 px-4 py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${tab === 'egitici' ? 'text-amber-700 border-b-4 border-amber-600 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
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
          <div className="absolute bottom-2 left-2 flex gap-4 text-amber-700/60">
            <button type="button" className="p-2 hover:bg-amber-50 rounded-lg transition"><ImageIcon size={20} /></button>
            <button type="button" className="p-2 hover:bg-amber-50 rounded-lg transition"><Shuffle size={20} /></button>
          </div>
        </div>

        {/* Accordions */}
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          
          {/* SES (AUDIO) */}
          <div className="py-2">
            <div onClick={() => toggleSection('voice')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Ses</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{voiceName}</span>
                {openSection === 'voice' ? <ChevronUp className="text-[#8c6239]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'voice' && (
              <div className="p-4 space-y-6 bg-gray-50/50 rounded-xl mt-2">
                {/* Sessiz Seçeneği */}
                <div 
                  onClick={() => handleVoiceSelect('Sessiz', 'Sessiz')}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition text-center ${voice === 'Sessiz' ? 'border-[#b3593b] bg-[#fdfaf3]' : 'border-transparent bg-white shadow-sm'}`}
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
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.id ? 'border-[#b3593b] bg-[#fdfaf3]' : 'border-transparent bg-white shadow-sm'}`}
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
                        className={`p-3 rounded-xl cursor-pointer border-2 transition flex flex-col items-center ${voice === v.eleven_voice_id ? 'border-[#b3593b] bg-[#fdfaf3]' : 'border-transparent bg-white shadow-sm'}`}
                      >
                        <span className="font-bold text-sm text-center">{v.name}</span>
                        <span className="text-[10px] text-emerald-500">Kendi Sesin</span>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => {
                        if (!isPremium) {
                          alert('Kendi sesinizi klonlamak için Kraliçe Arı paketine sahip olmalısınız.')
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

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-amber-800 font-bold flex items-start gap-2">
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
                <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{genre}</span>
                {openSection === 'genre' ? <ChevronUp className="text-[#8c6239]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'genre' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 flex flex-wrap gap-2">
                {['Masal', 'Bilim Kurgu', 'Macera', 'Fantastik', 'Fabl'].map(g => (
                  <button type="button" key={g} onClick={() => setGenre(g)} className={`px-4 py-2 rounded-full font-bold transition ${genre === g ? 'bg-[#b3593b] text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
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
                <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{imageStyle}</span>
                {openSection === 'style' ? <ChevronUp className="text-[#8c6239]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'style' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2 flex flex-wrap gap-2">
                {['Sulu Boya', 'Karikatür', '3D Animasyon', 'Gerçekçi', 'Anime'].map(s => (
                  <button type="button" key={s} onClick={() => setImageStyle(s)} className={`px-4 py-2 rounded-full font-bold transition ${imageStyle === s ? 'bg-[#b3593b] text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
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
                <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{age} Yaş</span>
                {openSection === 'age' ? <ChevronUp className="text-[#8c6239]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'age' && (
              <div className="p-4 bg-gray-50/50 rounded-xl mt-2">
                <input 
                  type="range" 
                  min="2" max="12" 
                  value={age} 
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#b3593b]"
                />
                <div className="flex justify-between text-gray-500 font-bold text-sm mt-2">
                  <span>2 Yaş</span><span>12 Yaş</span>
                </div>
              </div>
            )}
          </div>

          {/* KARAKTERLER */}
          <div className="py-2">
            <div onClick={() => toggleSection('characters')} className="flex items-center justify-between py-3 hover:bg-gray-50/50 cursor-pointer transition px-2 rounded-lg">
              <span className="font-bold text-gray-800 text-lg">Karakterler</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{characters.length} Karakter</span>
                {openSection === 'characters' ? <ChevronUp className="text-[#8c6239]" /> : <ChevronDown className="text-gray-400" />}
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
                      className="flex-grow p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#b3593b]"
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
                  <button type="button" onClick={() => setCharacters([...characters, ''])} className="text-[#b3593b] font-bold text-sm flex items-center p-2 hover:bg-[#f0e6dd] rounded-lg transition">
                    <Plus size={16} className="mr-1"/> Karakter Ekle
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center pb-4">
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-[#c28d75] hover:bg-[#a6745f] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center disabled:opacity-70 w-64"
          >
            {isGenerating ? (
              <span className="flex items-center animate-pulse">
                <Sparkles className="animate-spin mr-2" size={20} />
                Sihir Yapılıyor...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="mr-2" size={20} />
                Gönder
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
