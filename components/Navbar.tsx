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
      
      <div className="hidden md:flex items-center gap-8 text-white font-bold">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={link.href} 
            className={`transition-all hover:text-sky-100 drop-shadow-sm ${
              pathname === link.href ? 'text-white border-b-2 border-white' : 'text-white/80'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/parent" className="text-white font-bold hover:text-sky-100 transition drop-shadow-sm">Panele Dön</Link>
            <form action="/auth/sign-out" method="post">
              <button className="bg-white/30 backdrop-blur-md hover:bg-white/40 text-white px-6 py-2.5 rounded-xl font-bold transition-all border border-white/30 shadow-lg">
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
