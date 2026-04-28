'use client'

import { useState } from 'react'
import { Sparkles, ChevronRight, Image as ImageIcon, Shuffle } from 'lucide-react'
import { generateStoryAction } from '@/app/actions/generateStory'

export default function StoryForm() {
  const [prompt, setPrompt] = useState('')
  const [tab, setTab] = useState<'normal' | 'egitici'>('normal')
  const [isGenerating, setIsGenerating] = useState(false)

  // Accordion states
  const [age, setAge] = useState<number>(4)
  const [hero, setHero] = useState<string>('Sevimli Ayı')
  const [genre, setGenre] = useState<string>('Masal')
  const [imageStyle, setImageStyle] = useState<string>('Sulu Boya')
  const [voice, setVoice] = useState<string>('Tatlı Kadın Sesi')

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt) {
      alert('Lütfen bir hikaye konusu yazın!')
      return
    }
    
    setIsGenerating(true)
    try {
      // Prompt, tür ve stil bilgilerini tek bir 'theme' içinde birleştiriyoruz.
      const fullTheme = `${genre} tarzında. Konu: ${prompt}. Çizim Stili: ${imageStyle}. ${tab === 'egitici' ? 'Eğitici ve öğretici bir ders içermeli.' : ''}`
      
      const response = await generateStoryAction({
        childName: 'Çocuğum', // Otomatik profil için
        hero: hero,
        theme: fullTheme,
        age: age
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
          onClick={() => setTab('normal')}
          className={`px-8 py-4 font-bold text-lg transition-colors ${tab === 'normal' ? 'text-amber-700 border-b-4 border-amber-600 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Normal Hikayeler
        </button>
        <button
          type="button"
          onClick={() => setTab('egitici')}
          className={`px-8 py-4 font-bold text-lg transition-colors ${tab === 'egitici' ? 'text-amber-700 border-b-4 border-amber-600 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Eğitici Hikayeler
        </button>
      </div>

      <form onSubmit={handleGenerate} className="p-6">
        {/* Main Textarea */}
        <div className="relative mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Bana şu konu hakkında bir hikaye yaz..."
            className="w-full h-32 resize-none text-xl p-4 focus:outline-none placeholder-gray-400 text-gray-800"
            required
          />
          <div className="absolute bottom-2 left-2 flex gap-4 text-amber-700/60">
            <button type="button" className="p-2 hover:bg-amber-50 rounded-lg transition"><ImageIcon size={20} /></button>
            <button type="button" className="p-2 hover:bg-amber-50 rounded-lg transition"><Shuffle size={20} /></button>
          </div>
        </div>

        {/* Options List */}
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          
          <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 cursor-pointer transition px-2">
            <span className="font-bold text-gray-800 text-lg">Ses</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{voice}</span>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 cursor-pointer transition px-2">
            <span className="font-bold text-gray-800 text-lg">Tür</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{genre}</span>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 cursor-pointer transition px-2">
            <span className="font-bold text-gray-800 text-lg">Görüntü Stili</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#f0e6dd] text-[#8c6239] px-3 py-1 rounded-full text-sm font-bold">{imageStyle}</span>
              <ChevronRight className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 cursor-pointer transition px-2">
            <span className="font-bold text-gray-800 text-lg">Yaş Grubu</span>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-16 text-center bg-[#f0e6dd] text-[#8c6239] px-2 py-1 rounded-full text-sm font-bold outline-none"
                min="2" max="12"
              />
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 cursor-pointer transition px-2">
            <span className="font-bold text-gray-800 text-lg">Karakterler</span>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={hero} 
                onChange={(e) => setHero(e.target.value)}
                className="w-32 text-right bg-transparent text-[#8c6239] font-bold outline-none placeholder-[#8c6239]/50"
                placeholder="Kahraman..."
              />
              <ChevronRight className="text-gray-400" />
            </div>
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
