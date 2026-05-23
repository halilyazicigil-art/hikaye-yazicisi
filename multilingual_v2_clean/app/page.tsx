'use client'

import StoryForm from '@/features/story-creator/ui/StoryForm'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { QuotaService } from '@/services/QuotaService'
import { CheckCircle2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useLanguage } from '@/context/LanguageContext'

export default function LandingPage() {
  const { t } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [isPro, setIsPro] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) {
          const quota = await QuotaService.getUserQuotaStats(supabase, user.id);
          setUser({ ...user, role: quota.role });
          setIsPro(quota.isPro);
          setIsPremium(quota.isPremium);
        }
      } catch (err) {
        console.error("Auth fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  return (
    <main className="min-h-screen bg-[#BDD9F2] text-[#052159] overflow-x-hidden font-nunito relative">
      
      {/* 🌌 TÜM SAYFAYI KAPSAYAN SABİT SİHİRLİ ARKA PLAN */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Ana Görsel Katmanı - Fixed yaparak her yere yayıyoruz */}
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center bg-no-repeat opacity-60"></div>
        {/* Yumuşak Renk Overlay'i - Sayfa boyunca sabit kalır */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/20 via-[#BDD9F2]/40 to-[#BDD9F2]/80"></div>
      </div>

      <div className="relative z-10">
        {/* 1. KAHRAMAN BÖLÜMÜ (Hero) */}
        <div className="relative w-full min-h-[85vh] flex flex-col overflow-hidden">
          <div className="relative z-50">
            <Navbar user={user} isLoading={isLoading} />
          </div>
          
          <div className="flex-grow flex flex-col justify-center relative z-20">
            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
              <h1 className="text-5xl md:text-7xl font-lora font-bold text-[#052159] leading-tight mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-[#052159] mb-10 max-w-3xl mx-auto font-medium drop-shadow-[0_1px_5px_rgba(255,255,255,0.4)]">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                <a href="#create" className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl w-full sm:w-auto hover:scale-105">
                  {t('hero.cta_primary')}
                </a>
                <Link href="/pricing" className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl w-full sm:w-auto border border-gray-200 hover:scale-105 text-center">
                  {t('hero.cta_secondary')}
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-emerald-700 drop-shadow-md">
                <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t('features.safe')}</span>
                <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t('features.pedagogical')}</span>
                <span className="flex items-center gap-1 text-sky-600 bg-white/50 px-3 py-1 rounded-full">⭐ {t('features.happy_families')}</span>
              </div>
            </section>
          </div>
        </div>

        {/* 2. FORM VE ÖZELLİKLER ALANI */}
        <div className="relative">
          {/* Form Section */}
          <section id="create" className="pb-24 px-4 pt-16">
            <div className="text-center mb-12">
              <p className="text-sky-600 font-bold mb-4 tracking-widest text-sm uppercase">{t('landing.form_subtitle')}</p>
              <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#052159] mb-4">{t('landing.form_title')}</h2>
              <p className="text-xl text-[#052159] font-medium opacity-80">{t('landing.form_description')}</p>
            </div>
            <StoryForm isPro={isPro} isPremium={isPremium} />
          </section>

          {/* Features Section */}
          <section className="max-w-7xl mx-auto px-6 py-24 border-t border-sky-900/10">
            <div className="text-center mb-20">
              <span className="text-[#84B1D9] font-bold tracking-widest uppercase text-sm">{t('landing.features_badge')}</span>
              <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#052159] mt-4 mb-6">
                {t('landing.features_title')}
              </h2>
              <p className="text-xl text-[#052159] max-w-2xl mx-auto font-medium opacity-80">{t('landing.features_subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-sky-100 rounded-2xl mb-8 bg-[url('/images/visual_feast.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">{t('landing.feat1_title')}</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">{t('landing.feat1_desc')}</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat1_bullet1')}</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat1_bullet2')}</li>
                </ul>
              </div>
              
              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-blue-100 rounded-2xl mb-8 bg-[url('/images/parent_reading.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">{t('landing.feat2_title')}</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">{t('landing.feat2_desc')}</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat2_bullet1')}</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat2_bullet2')}</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-purple-100 rounded-2xl mb-8 bg-[url('/images/character_continuity.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">{t('landing.feat3_title')}</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">{t('landing.feat3_desc')}</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat3_bullet1')}</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat3_bullet2')}</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-pink-100 rounded-2xl mb-8 bg-[url('/images/values_education.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">{t('landing.feat4_title')}</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">{t('landing.feat4_desc')}</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat4_bullet1')}</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> {t('landing.feat4_bullet2')}</li>
                </ul>
              </div>
            </div>
          </section>
          
          <footer className="py-12 text-center text-[#052159]/40 text-sm font-medium">
            {t('landing.footer')}
          </footer>
        </div>
      </div>
    </main>
  )
}
