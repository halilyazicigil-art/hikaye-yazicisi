import React from 'react'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function HowItWorksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-[#BDD9F2] font-nunito relative overflow-x-hidden">
      {/* Whimsical Background Layer */}
      <div className="fixed inset-0 bg-[url('/images/whimsical-bg.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <Navbar user={user} />

      {/* Page Content */}
      <div className="pt-10 pb-20">
        <HowItWorks />
        
        {/* Extra CTA for the bottom of the page */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/30 backdrop-blur-md rounded-[3rem] p-12 border border-white/50 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-[#052159] mb-6">
              Sihirli Serüvene Hazır mısınız?
            </h2>
            <p className="text-xl text-[#052159]/80 mb-10 font-medium">
              Çocuğunuzun hayal dünyasını beraber keşfedelim. İlk masalınızı oluşturmak sadece birkaç saniyenizi alacak.
            </p>
            <Link 
              href="/#create" 
              className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:scale-105 inline-block"
            >
              Hemen Masal Oluştur
            </Link>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="py-10 text-center text-[#052159]/50 text-sm">
        &copy; 2026 MyStory. Tüm hakları saklıdır.
      </footer>
      </div>
    </main>
  )
}
