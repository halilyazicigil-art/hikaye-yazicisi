"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cloud } from 'lucide-react'

const Navbar = ({ user }: { user?: any }) => {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Fiyatlandırma', href: '/pricing' },
    { name: 'Nasıl Çalışır', href: '/how-it-works' },
    { name: 'Sihirli Kitaplık', href: '/library' },
  ]

  return (
    <nav className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center relative z-50">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative">
          {/* Main Glow Effect */}
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Cloud className="w-12 h-12 text-white fill-white group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          <Cloud className="w-8 h-8 text-white fill-white absolute -bottom-1 -right-2 opacity-80 drop-shadow-md group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
        <span className="text-4xl md:text-5xl font-lora font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 ml-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          MyStory
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={link.href} 
            className={`px-5 py-2 rounded-full transition-all text-sm font-black tracking-wide border transition-all duration-300 ${
              pathname === link.href 
                ? 'bg-white text-[#84B1D9] border-white shadow-md scale-105' 
                : 'text-white border-white/20 hover:bg-white/20 hover:border-white/40'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/parent" className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-7 py-3 rounded-2xl font-black transition-all shadow-xl hover:scale-105 border border-white/20">
              Panele Dön
            </Link>
            <form action="/auth/sign-out" method="post">
              <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-7 py-3 rounded-2xl font-black transition-all border border-gray-200 shadow-xl hover:scale-105">
                Çıkış Yap
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="bg-white text-[#84B1D9] px-8 py-3 rounded-2xl font-black hover:bg-sky-50 transition-all shadow-2xl hover:scale-105">
            Giriş Yap
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
