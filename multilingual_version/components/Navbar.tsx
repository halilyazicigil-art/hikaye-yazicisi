"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cloud } from 'lucide-react'
import { useAudioPlayer } from '@/context/AudioPlayerContext'

import { useLanguage } from '@/context/LanguageContext'

const Navbar = ({ user, isLoading = false }: { user?: any, isLoading?: boolean }) => {
  const pathname = usePathname()
  const { viewMode } = useAudioPlayer()
  const { language, setLanguage, t } = useLanguage()

  if (viewMode === 'fullscreen') return null

  const navLinks = [
    { name: t('navbar.pricing'), href: '/pricing' },
    { name: t('navbar.how_it_works'), href: '/how-it-works' },
    { name: t('navbar.library'), href: '/library' },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Language Switcher Bar */}
      <div className="w-full bg-white/10 backdrop-blur-sm border-b border-white/10 py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-4 text-xs font-bold text-[#052159]">
          <button 
            onClick={() => setLanguage('en')}
            className={`flex items-center gap-1.5 transition-all hover:scale-110 ${language === 'en' ? 'opacity-100 scale-105 underline underline-offset-4' : 'opacity-60'}`}
          >
            <span className="text-base">🇬🇧</span> {t('navbar.lang_en')}
          </button>
          <div className="w-[1px] h-3 bg-[#052159]/20 self-center"></div>
          <button 
            onClick={() => setLanguage('tr')}
            className={`flex items-center gap-1.5 transition-all hover:scale-110 ${language === 'tr' ? 'opacity-100 scale-105 underline underline-offset-4' : 'opacity-60'}`}
          >
            <span className="text-base">🇹🇷</span> {t('navbar.lang_tr')}
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-8 w-full flex justify-between items-center relative z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Cloud className="w-12 h-12 text-white fill-white group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            <Cloud className="w-8 h-8 text-white fill-white absolute -bottom-1 -right-2 opacity-80 drop-shadow-md group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <span className="text-4xl md:text-5xl font-lora font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 ml-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            MyStory
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2 bg-[#D9E8F5] backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`px-5 py-2 rounded-full transition-all text-sm font-black tracking-wide border duration-300 bg-white text-[#052159] border-white shadow-sm hover:scale-105 hover:bg-sky-50 ${
                  isActive ? 'shadow-md scale-105 ring-2 ring-[#84B1D9]/20' : ''
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            // Skeleton loader to prevent layout shift
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-32 h-12 bg-white/20 rounded-2xl"></div>
              <div className="w-32 h-12 bg-white/20 rounded-2xl"></div>
            </div>
          ) : user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className="bg-gradient-to-r from-gray-900 to-slate-800 text-white px-7 py-3 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(15,23,42,0.3)] hover:shadow-[0_0_30px_rgba(15,23,42,0.5)] hover:scale-105 border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  {t('navbar.admin')}
                </Link>
              )}
              <Link href="/parent" className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-7 py-3 rounded-2xl font-black transition-all shadow-xl hover:scale-105 border border-white/20">
                {t('navbar.parent_panel')}
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-7 py-3 rounded-2xl font-black transition-all border border-gray-200 shadow-xl hover:scale-105">
                  {t('navbar.logout')}
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="bg-white text-[#84B1D9] px-8 py-3 rounded-2xl font-black hover:bg-sky-50 transition-all shadow-2xl hover:scale-105">
              {t('navbar.login')}
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
