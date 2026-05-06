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
    <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-50">
      <Link href="/" className="flex items-center gap-4 group">
        <div className="relative">
          <Cloud className="w-9 h-9 text-white fill-white group-hover:scale-110 transition-transform drop-shadow-md" />
          <Cloud className="w-6 h-6 text-white fill-white absolute -bottom-1 -right-2 opacity-90 drop-shadow-sm" />
        </div>
        <span className="text-3xl font-lora font-bold tracking-tight text-white ml-3 drop-shadow-md">MyStory</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-2 bg-[#84B1D9]/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-white/20">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={link.href} 
            className={`px-4 py-1.5 rounded-full transition-all hover:bg-white/20 text-white font-bold drop-shadow-sm ${
              pathname === link.href ? 'bg-white/30 shadow-inner' : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/parent" className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg drop-shadow-sm">
              Panele Dön
            </Link>
            <form action="/auth/sign-out" method="post">
              <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-6 py-2.5 rounded-2xl font-bold transition-all border border-gray-200 shadow-lg">
                Çıkış Yap
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="bg-white text-[#84B1D9] px-6 py-2.5 rounded-xl font-bold hover:bg-sky-50 transition-all shadow-lg">
            Giriş Yap
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
