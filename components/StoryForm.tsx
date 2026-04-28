'use client'

import { useState } from 'react'
import { Wand2, Sparkles, User, Palette } from 'lucide-react'

import { generateStoryAction } from '@/app/actions/generateStory'

export default function StoryForm() {
  const [childName, setChildName] = useState('')
  const [hero, setHero] = useState('')
  const [theme, setTheme] = useState('')
  const [age, setAge] = useState<number>(6)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const response = await generateStoryAction({
        childName,
        hero,
        theme,
        age,
        profileId: 'cf89a5cb-XXXX-XXXX-XXXX-XXXXXXXXXXXX' // Geçici Mock ID, gerçek uygulamada seçilen profilden gelecek
      })
      if (response.success) {
        alert('Masal başarıyla oluşturuldu!')
        // window.location.href = `/story/${response.story.id}`
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-[2.5rem] shadow-2xl border-4 border-yellow-100 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 text-yellow-500 rounded-3xl mb-4 rotate-3 shadow-lg">
          <Sparkles size={40} />
        </div>
        <h2 className="text-4xl font-black text-indigo-900 mb-2 font-['Comic_Sans_MS',_sans-serif]">
          Kendi Masalını Yarat!
        </h2>
        <p className="text-lg text-indigo-600 font-medium">Hayal gücünü serbest bırak, sihir başlasın.</p>
      </div>

      <form onSubmit={handleGenerate} className="relative z-10 space-y-6">
        <div className="bg-blue-50/50 p-6 rounded-3xl border-2 border-blue-100">
          <label className="flex items-center text-xl font-bold text-blue-900 mb-3">
            <User className="mr-2 text-blue-500" size={24} /> Masal Kimin İçin?
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full px-6 py-4 text-xl bg-white border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all placeholder-blue-300"
            placeholder="Çocuğun adı..."
            required
          />
        </div>

        <div className="bg-emerald-50/50 p-6 rounded-3xl border-2 border-emerald-100">
          <label className="flex items-center text-xl font-bold text-emerald-900 mb-3">
            <User className="mr-2 text-emerald-500" size={24} /> Kahramanımız Kim?
          </label>
          <input
            type="text"
            value={hero}
            onChange={(e) => setHero(e.target.value)}
            className="w-full px-6 py-4 text-xl bg-white border-2 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all placeholder-emerald-300"
            placeholder="Cesur bir aslan, uçan bir araba..."
            required
          />
        </div>

        <div className="bg-purple-50/50 p-6 rounded-3xl border-2 border-purple-100">
          <label className="flex items-center text-xl font-bold text-purple-900 mb-3">
            <Palette className="mr-2 text-purple-500" size={24} /> Masalın Konusu Ne Olsun?
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-6 py-4 text-xl bg-white border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-purple-900"
            required
          >
            <option value="" disabled>Bir tema seçin...</option>
            <option value="friendship">Arkadaşlık ve Paylaşmak</option>
            <option value="courage">Cesaret ve Özgüven</option>
            <option value="space">Uzay Macerası</option>
            <option value="animals">Hayvanlar Alemi</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-5 px-8 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white rounded-3xl font-black text-2xl transition-all flex items-center justify-center shadow-xl shadow-pink-500/30 hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center animate-pulse">
              <Sparkles className="animate-spin mr-3" size={28} />
              Sihir Yapılıyor...
            </span>
          ) : (
            <span className="flex items-center">
              <Wand2 className="mr-3" size={28} />
              Masalımı Yaz!
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
