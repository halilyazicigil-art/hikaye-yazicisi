"use client";
import React from 'react'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Sparkles, Wand2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

/**
 * How It Works Page
 * A clean, high-fidelity landing page explaining the platform process.
 * Matches the light & airy aesthetic of the homepage.
 */
export default function HowItWorksPage() {
  const { t } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (err) {
        console.error("Auth fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  return (
    <main className="min-h-screen bg-[#BDD9F2] font-nunito relative overflow-x-hidden selection:bg-[#84B1D9] selection:text-white">
      
      {/* 🌌 IMMERSIVE GLOBAL BACKGROUND (Synced with Homepage) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center bg-no-repeat opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/20 via-[#BDD9F2]/40 to-[#BDD9F2]/80"></div>
      </div>
      
      {/* 🎈 Subtle Floating Decor */}
      <div className="fixed top-1/3 -left-32 w-[30rem] h-[30rem] bg-white/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="fixed bottom-1/3 -right-32 w-[30rem] h-[30rem] bg-blue-300/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="relative z-10">
        <Navbar user={user} isLoading={isLoading} />

        {/* 📘 Main Content Area */}
        <div className="pt-24 pb-48">
          <HowItWorks />
          
          {/* ✨ PREMIUM FINAL CALL TO ACTION */}
          <section className="max-w-6xl mx-auto px-6 mt-16">
            <div className="relative bg-white/40 backdrop-blur-3xl rounded-[4rem] lg:rounded-[6rem] p-16 lg:p-24 border border-white/60 shadow-2xl shadow-sky-900/10 overflow-hidden group text-center transform transition-transform duration-700 hover:scale-[1.01]">
              {/* Decorative Magic Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#84B1D9]/10 to-transparent opacity-50"></div>
              
              <div className="relative z-10 space-y-12">
                <header className="space-y-8">
                  <div className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-white mb-8 group-hover:rotate-6 transition-transform duration-700">
                    <Wand2 size={48} className="text-[#84B1D9] drop-shadow-lg" />
                  </div>
                  <h2 className="text-4xl md:text-7xl font-lora font-black text-[#052159] leading-[1.1] tracking-tighter">
                    {t('how_it_works.cta_title')}
                  </h2>
                  <p className="text-xl md:text-2xl text-[#052159]/60 font-medium max-w-2xl mx-auto leading-relaxed">
                    {t('how_it_works.cta_desc')}
                  </p>
                </header>

                <div className="flex justify-center pt-8">
                  <Link 
                    href="/#create" 
                    className="group/btn relative bg-gradient-to-r from-[#84B1D9] to-[#052159] text-white px-12 py-6 lg:px-20 lg:py-10 rounded-[3rem] font-black text-xl lg:text-3xl transition-all shadow-[0_20px_60px_rgba(5,33,89,0.3)] hover:shadow-[0_25px_80px_rgba(5,33,89,0.4)] hover:-translate-y-2 active:scale-95 flex items-center gap-6 overflow-hidden"
                  >
                    <Sparkles className="relative z-10 animate-pulse" size={32} />
                    <span className="relative z-10 uppercase tracking-widest">{t('how_it_works.cta_button')}</span>
                    {/* Dynamic Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </Link>
                </div>

                <div className="pt-16 flex items-center justify-center gap-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#84B1D9] opacity-30"></div>
                  <div className="text-[#84B1D9] text-[10px] lg:text-xs font-black uppercase tracking-[0.6em] whitespace-nowrap opacity-80">
                    ✨ {t('how_it_works.badge_safe')} ✨
                  </div>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#84B1D9] opacity-30"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 🌙 Clean Minimal Footer */}
        <footer className="py-20 text-center relative z-10">
          <div className="text-[#052159]/20 text-xs font-black uppercase tracking-[0.6em] mb-4">
            MAGIC LIBRARY • EST 2024
          </div>
          <div className="text-[#052159]/40 text-sm font-bold">
            &copy; {t('how_it_works.footer_copy')}
          </div>
        </footer>
      </div>
    </main>
  )
}
