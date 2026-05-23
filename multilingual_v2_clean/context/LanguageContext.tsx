'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import tr from '../locales/tr.json'

type Language = 'en' | 'tr'
type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const dictionaries = { en, tr }

import { useRouter } from 'next/navigation'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const router = useRouter()

  // Sayfa yüklendiğinde tercihi hatırla
  useEffect(() => {
    const saved = localStorage.getItem('app-language') as Language
    if (saved && (saved === 'en' || saved === 'tr')) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('app-language', lang)
    // Sunucu tarafının (Server Components) dili okuyabilmesi için cookie set ediyoruz
    document.cookie = `language=${lang}; path=/; max-age=31536000; samesite=lax` // 1 yıl
    router.refresh()
  }

  // Basit bir çeviri fonksiyonu (nested keys desteğiyle: "navbar.home")
  const t = (key: string) => {
    const keys = key.split('.')
    let result: any = dictionaries[language]
    
    for (const k of keys) {
      if (result[k]) {
        result = result[k]
      } else {
        return key // Anahtar bulunamazsa anahtarı döndür
      }
    }
    
    return result as string
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
