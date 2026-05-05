'use client'

import React from 'react'
import Link from 'next/link'
import { Check, ShieldCheck, CreditCard, Lock, ArrowLeft, Cloud, Sun, Zap } from 'lucide-react'

const pricingPlans = [
  {
    id: 'free',
    name: 'Pamuk Bulut',
    price: '0',
    description: 'Yeni başlayan minik hayalperestler için.',
    features: {
      'İstek Sınırı': '150 Karakter',
      'Bölüm Sayısı': '2 Bölüme kadar',
      'Hikaye Uzunluğu': '300 Kelime',
      'Hikaye Limiti': '3 Masal/Ay',
      'Tür Seçimi': 'Sınırlı',
      'Hikaye Arşivi': '3 Masal',
      'Kütüphaneye Erişim': 'Standart',
      'Hızlı Geliştirme': 'Temel',
      'Özel Temalar': 'Temel',
      'AI Optimizasyon': 'Temel',
      'Sesli Hikayeler': 'Yok',
      'Ses Klonlama': 'Kapalı',
      'Ses Modelleri': '1 Model',
      'Hikaye Anlatımı': 'Standart',
      'Yayın Lisansı': 'Yok',
      'Podcast Çıkışı': 'Yok',
      'E-Kitap Oluşturma': 'Yok',
    },
    buttonText: 'Hemen Başla',
    highlight: false
  },
  {
    id: 'pro',
    name: 'Gümüş Gökyüzü',
    price: '15',
    description: 'Daha fazla macera ve ses klonlama isteyenlere.',
    features: {
      'İstek Sınırı': '400 Karakter',
      'Bölüm Sayısı': '20 Bölüme kadar',
      'Hikaye Uzunluğu': '800 Kelime',
      'Hikaye Limiti': '40 Masal/Ay',
      'Tür Seçimi': 'Kilidi Açıldı',
      'Hikaye Arşivi': '50 Masal',
      'Kütüphaneye Erişim': 'Gelişmiş',
      'Hızlı Geliştirme': 'Temel',
      'Özel Temalar': 'Temel',
      'AI Optimizasyon': 'Gelişmiş',
      'Sesli Hikayeler': '20 Adet',
      'Ses Klonlama': 'Aktif',
      'Ses Modelleri': '3 Model',
      'Hikaye Anlatımı': 'Kendi Hikayelerim',
      'Yayın Lisansı': 'Dahil',
      'Podcast Çıkışı': '2 Adet',
      'E-Kitap Oluşturma': 'Dahil',
    },
    buttonText: 'Abone Ol ve Tasarruf Et',
    highlight: true,
    tag: 'En Popüler'
  },
  {
    id: 'premium',
    name: 'Altın Güneş',
    price: '40',
    description: 'Sınırsız hayal gücü ve en yüksek kalite.',
    features: {
      'İstek Sınırı': '610 Karakter',
      'Bölüm Sayısı': '20 Bölüme kadar',
      'Hikaye Uzunluğu': '1200 Kelime',
      'Hikaye Limiti': '90 Masal/Ay',
      'Tür Seçimi': 'Kilidi Açıldı',
      'Hikaye Arşivi': '100 Masal',
      'Kütüphaneye Erişim': 'Gelişmiş',
      'Hızlı Geliştirme': 'Gelişmiş',
      'Özel Temalar': 'Gelişmiş',
      'AI Optimizasyon': 'Gelişmiş',
      'Sesli Hikayeler': '50 Adet',
      'Ses Klonlama': 'Aktif',
      'Ses Modelleri': '6 Model',
      'Hikaye Anlatımı': 'Kendi Hikayelerim',
      'Yayın Lisansı': 'Dahil',
      'Podcast Çıkışı': '6 Adet',
      'E-Kitap Oluşturma': 'Dahil',
    },
    buttonText: 'Hemen Abone Ol',
    highlight: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#EFEBED] font-sans selection:bg-[#BDD9F2]">
      {/* Navbar Area */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[#052159] hover:opacity-80 transition">
          <ArrowLeft size={20} />
          <span className="font-bold">Ana Sayfaya Dön</span>
        </Link>
        <div className="flex items-center gap-2">
          <Cloud className="text-[#84B1D9]" />
          <span className="text-2xl font-lora font-bold text-[#052159]">MyStory</span>
        </div>
        <div className="w-[100px]"></div>
      </nav>

      {/* Hero Section */}
      <div className="text-center pt-10 pb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-lora font-bold text-[#052159] mb-6">Abone Ol ve Tasarruf Et</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          MyStory AI abonelik planlarına genel bakış. Çocuklarınızın yapay zeka ile sihirli hikayeler yaratmasına yardımcı olun.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-[2.5rem] p-8 shadow-xl border-2 transition-all hover:scale-[1.02] ${
                plan.highlight ? 'border-[#84B1D9] ring-4 ring-[#84B1D9]/10' : 'border-white'
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFC107] text-[#052159] px-6 py-1 rounded-full font-bold shadow-md">
                  {plan.tag}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#052159] mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-[#84B1D9]">{plan.price} $</span>
                  <span className="text-gray-400 font-medium">/ Ay</span>
                </div>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 border-t border-gray-100 pt-8">
                {Object.entries(plan.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className={`font-bold ${value === 'Yok' || value === 'Kapalı' ? 'text-gray-300' : 'text-[#052159]'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href={`/checkout?plan=${plan.id}`}
                className={`block w-full py-4 rounded-2xl text-center font-bold transition-all shadow-lg ${
                  plan.highlight 
                    ? 'bg-[#84B1D9] text-white hover:bg-[#6FA3CD] shadow-[#84B1D9]/20' 
                    : 'bg-[#FDF8F0] text-[#052159] hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {plan.buttonText}
              </Link>

              <div className="mt-6 flex flex-col items-center gap-2 text-[10px] text-gray-400">
                <div className="flex items-center gap-1">
                  <Lock size={12} className="text-emerald-500" />
                  Stripe üzerinden güvenli ödeme
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={12} />
                  Kartlar, dijital cüzdanlar kabul edilmektedir.
                </div>
                <p>İstediğiniz zaman iptal edebilirsiniz. Gizli ücret yok.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-24 text-center">
          <p className="text-[#052159] font-bold text-lg mb-8">
            <span className="text-[#84B1D9]">11.030&apos;dan fazla</span> mutlu ebeveyn ve eğitimciye katılın.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm border-t border-gray-200 pt-12">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#84B1D9]" />
              Stripe tarafından desteklenmektedir.
            </div>
            <div className="flex items-center gap-2">
              <Lock className="text-[#84B1D9]" />
              256 bit SSL şifreleme
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check />
              Anında İptal Seçeneği
            </div>
          </div>
          
          <div className="mt-8 opacity-40 grayscale flex justify-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
