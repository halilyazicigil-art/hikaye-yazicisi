"use client";
import React from 'react'
import { Sparkles, Wand2, BookOpen, Moon, ArrowRight, Play, Share2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

/**
 * PremiumStepCard Component
 * High-fidelity card that matches the approved vertical-stack mockup.
 */
const PremiumStepCard = ({ index, title, description, icon, color, children }: { 
  index: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color: string;
  children?: React.ReactNode;
}) => (
  <div className="group relative w-full max-w-5xl mx-auto mb-12">
    {/* Background Glow */}
    <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-[3rem] blur-xl opacity-10 group-hover:opacity-30 transition duration-1000`}></div>
    
    <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-sky-900/5 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 transform transition-all duration-700 hover:scale-[1.01]">
      
      {/* 1. Large Visual Icon Section */}
      <div className={`flex-shrink-0 w-32 h-32 lg:w-48 lg:h-48 rounded-[2.5rem] bg-gradient-to-br ${color} bg-opacity-10 flex items-center justify-center shadow-inner relative group-hover:rotate-3 transition-transform duration-500`}>
        <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-pulse"></div>
        <div className="relative drop-shadow-2xl">{icon}</div>
      </div>

      {/* 2. Content & Simulation Section */}
      <div className="flex-1 space-y-6 w-full text-center lg:text-left">
        <header className="space-y-2">
          <div className="text-[#84B1D9] font-black text-sm tracking-[0.4em] mb-2">ADIM 0{index + 1}</div>
          <h3 className="text-3xl lg:text-4xl font-lora font-black text-[#052159] tracking-tight uppercase">
            {title}
          </h3>
          <p className="text-lg lg:text-xl text-[#052159]/60 font-medium leading-relaxed max-w-2xl">
            {description}
          </p>
        </header>

        {/* The 'Wow' Factor: Simulated Interface Elements */}
        <div className="pt-4">
          {children}
        </div>
      </div>

      {/* Decorative Step Number (Subtle) */}
      <div className="absolute bottom-8 right-12 text-[#052159]/5 font-black text-8xl pointer-events-none select-none">
        0{index + 1}
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto relative">
      
      {/* Header Section */}
      <header className="text-center mb-32 space-y-6">
        <div className="inline-block px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white text-[#84B1D9] text-xs font-black uppercase tracking-[0.4em] shadow-sm mb-4">
          {t('landing.features_badge')}
        </div>
        <h2 className="text-5xl md:text-7xl font-lora font-bold text-[#052159] tracking-tighter">
          {t('how_it_works.title')}
        </h2>
        <p className="text-xl md:text-3xl text-[#052159]/50 max-w-3xl mx-auto font-medium italic">
          {t('how_it_works.subtitle')}
        </p>
      </header>

      {/* Premium Vertical Steps */}
      <div className="space-y-8 relative z-10">
        
        {/* STEP 1: Imagine */}
        <PremiumStepCard 
          index={0}
          title={t('how_it_works.step1_title')}
          description={t('how_it_works.step1_desc')}
          icon={<Wand2 className="text-amber-500" size={64} strokeWidth={1.5} />}
          color="from-amber-100 to-orange-200"
        >
          <div className="bg-white/60 border border-white px-6 py-4 rounded-2xl shadow-inner max-w-md mx-auto lg:mx-0">
            <span className="text-[#052159]/30 text-sm italic font-medium">"Bulutların üzerinde yaşayan bir martı..."</span>
            <div className="h-1 w-4 bg-amber-400 mt-2 animate-bounce"></div>
          </div>
        </PremiumStepCard>

        {/* STEP 2: Create */}
        <PremiumStepCard 
          index={1}
          title={t('how_it_works.step2_title')}
          description={t('how_it_works.step2_desc')}
          icon={<Sparkles className="text-sky-500" size={64} strokeWidth={1.5} />}
          color="from-sky-100 to-blue-200"
        >
          <div className="w-full max-w-md mx-auto lg:mx-0 space-y-3">
            <div className="flex justify-between text-[10px] font-black text-[#84B1D9] uppercase tracking-widest">
              <span>Masal Üretiliyor...</span>
              <span>85%</span>
            </div>
            <div className="h-3 w-full bg-white/60 rounded-full overflow-hidden p-0.5 border border-white shadow-inner">
              <div className="h-full w-[85%] bg-gradient-to-r from-sky-400 to-[#84B1D9] rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>
        </PremiumStepCard>

        {/* STEP 3: Read */}
        <PremiumStepCard 
          index={2}
          title={t('how_it_works.step3_title')}
          description={t('how_it_works.step3_desc')}
          icon={<Moon className="text-indigo-500" size={64} strokeWidth={1.5} />}
          color="from-indigo-100 to-purple-200"
        >
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="flex items-center gap-2 bg-[#052159] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:-translate-y-1 transition-all">
              <Play size={16} fill="white" /> {t('library.read_now')}
            </button>
            <button className="flex items-center gap-2 bg-white/80 text-[#052159] px-6 py-3 rounded-xl font-bold text-sm border border-white shadow-lg hover:bg-white transition-all">
              <Share2 size={16} /> Paylaş
            </button>
          </div>
        </PremiumStepCard>

      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-[50rem] bg-sky-200/10 rounded-full blur-[180px] -z-10"></div>
    </section>
  )
}

export default HowItWorks


