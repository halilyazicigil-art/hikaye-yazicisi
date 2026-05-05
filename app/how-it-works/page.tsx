import React from 'react'
import HowItWorks from '@/components/HowItWorks'
import Link from 'next/link'
import { Cloud, ArrowLeft } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#BDD9F2] font-nunito relative overflow-x-hidden">
      {/* Whimsical Background Layer */}
      <div className="fixed inset-0 bg-[url('/images/whimsical-bg.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0"></div>
      
      <div className="relative z-10">
      {/* Navbar for Inner Page */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <Cloud className="w-9 h-9 text-white fill-white group-hover:scale-110 transition-transform" />
            <Cloud className="w-6 h-6 text-white fill-white absolute -bottom-1 -right-2 opacity-80" />
          </div>
          <span className="text-3xl font-lora font-bold tracking-tight text-white ml-3">MyStory</span>
        </Link>
        
        <Link href="/" className="flex items-center gap-2 text-white font-bold hover:text-[#052159] transition">
          <ArrowLeft size={20} /> Ana Sayfaya Dön
        </Link>
      </nav>

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
