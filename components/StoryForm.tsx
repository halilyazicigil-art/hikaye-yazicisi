'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, Shuffle, X, Plus } from 'lucide-react'
import { generateStoryAction } from '@/app/actions/generateStory'

export default function StoryForm({ isPro = false, isPremium = false }: { isPro?: boolean, isPremium?: boolean }) {
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Form Data
  const [voice, setVoice] = useState<string>('Sihirli Ses (AI)')
  const [genre, setGenre] = useState<string>('Masal')
  const [imageStyle, setImageStyle] = useState<string>('Sulu Boya')
  const [age, setAge] = useState<number>(4)
  const [characters, setCharacters] = useState<string[]>(['Sevimli Ayı'])
  const [educationalValue, setEducationalValue] = useState<string>('Dürüstlük')

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleVoiceSelect = (v: string) => {
    if (v === 'Kendi Sesim' && !isPro && !isPremium) {
      alert('Kendi sesinizi kullanmak için Tatlı Bal veya Kraliçe Arı paketine yükseltmelisiniz.')
      return
    }
    setVoice(v)
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
        voiceOption: voice === 'Sessiz (Sadece Metin)' ? 'Sessiz' : 'AI'
      })
      
      if (response.success) {
        window.location.href = `/story/${response.story.id}`
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
                <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{voice}</span>
                {openSection === 'voice' ? <ChevronUp className="text-[#8c6239]" /> : <ChevronDown className="text-gray-400" />}
              </div>
            </div>
            {openSection === 'voice' && (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50/50 rounded-xl mt-2">
                {['Sessiz (Sadece Metin)', 'Sihirli Ses (AI)', 'Kendi Sesim'].map(v => (
                  <div key={v} onClick={() => handleVoiceSelect(v)} className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer border-2 transition ${voice === v ? 'border-[#b3593b] bg-[#fdfaf3]' : 'border-transparent bg-white hover:border-gray-200 shadow-sm'} ${v === 'Kendi Sesim' && !isPro && !isPremium ? 'opacity-50 relative' : ''}`}>
                    {v === 'Kendi Sesim' && !isPro && !isPremium && (
                      <span className="absolute top-1 right-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">Pro</span>
                    )}
                    <span className={`font-bold ${voice === v ? 'text-[#b3593b]' : 'text-gray-600'}`}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

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
