'use client'

import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { ArrowLeft, Cloud, Lock, CreditCard, ShieldCheck, Check } from 'lucide-react'

export default function PricingPage() {
  const { t } = useLanguage()

  const pricingPlans = [
    {
      id: 'free',
      name: t('pricing.plans.free.name'),
      price: '0',
      description: t('pricing.plans.free.desc'),
      features: {
        [t('pricing.features.request_limit')]: '150 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Karakter' : 'Characters'),
        [t('pricing.features.chapter_count')]: '2 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Bölüme kadar' : 'Chapters'),
        [t('pricing.features.story_length')]: '300 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Kelime' : 'Words'),
        [t('pricing.features.magic_shuffles')]: '3 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet' : 'Items'),
        [t('pricing.features.continue_adventure')]: t('pricing.values.off'),
        [t('pricing.features.listening_list')]: t('pricing.values.off'),
        [t('pricing.features.character_memory')]: t('pricing.values.off'),
        [t('pricing.features.smart_transitions')]: t('pricing.values.off'),
        [t('pricing.features.magic_library')]: t('pricing.values.text_only'),
        [t('pricing.features.write_own')]: t('pricing.values.off'),
        [t('pricing.features.story_limit')]: '3 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Taslak/Ay' : 'Drafts/Mo'),
        [t('pricing.features.genre_selection')]: 'Sınırlı',
        [t('pricing.features.archive')]: '3 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.library_access')]: t('pricing.values.standard'),
        [t('pricing.features.parent_panel')]: 'Sınırlı',
        [t('pricing.features.audio_stories')]: t('pricing.values.none'),
        [t('pricing.features.voice_cloning')]: t('pricing.values.off'),
        [t('pricing.features.voice_models')]: '1 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Model' : 'Model'),
        [t('pricing.features.narration')]: t('pricing.values.standard'),
        [t('pricing.features.license')]: t('pricing.values.none'),
        [t('pricing.features.podcast_output')]: '0 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet' : 'Items'),
        [t('pricing.features.ebook_creation')]: t('pricing.values.none'),
      },
      buttonText: t('pricing.plans.free.button'),
      highlight: false
    },
    {
      id: 'pro',
      name: t('pricing.plans.pro.name'),
      price: '15',
      description: t('pricing.plans.pro.desc'),
      features: {
        [t('pricing.features.request_limit')]: '400 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Karakter' : 'Characters'),
        [t('pricing.features.chapter_count')]: '20 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Bölüme kadar' : 'Chapters'),
        [t('pricing.features.story_length')]: '500 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Kelime' : 'Words'),
        [t('pricing.features.magic_shuffles')]: '10 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet (Premium)' : 'Items (Premium)'),
        [t('pricing.features.continue_adventure')]: '10 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet/Ay' : 'Items/Mo'),
        [t('pricing.features.listening_list')]: '5 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.character_memory')]: '5 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.smart_transitions')]: t('pricing.values.on'),
        [t('pricing.features.magic_library')]: t('pricing.values.audio_text'),
        [t('pricing.features.write_own')]: '30 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet/Ay' : 'Items/Mo'),
        [t('pricing.features.story_limit')]: '40 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal/Ay' : 'Stories/Mo'),
        [t('pricing.features.genre_selection')]: t('pricing.values.unlocked'),
        [t('pricing.features.archive')]: '50 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.library_access')]: t('pricing.values.advanced'),
        [t('pricing.features.parent_panel')]: t('pricing.values.full'),
        [t('pricing.features.audio_stories')]: '20 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet' : 'Items'),
        [t('pricing.features.voice_cloning')]: 'Aktif',
        [t('pricing.features.voice_models')]: '3 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Model' : 'Models'),
        [t('pricing.features.narration')]: 'Kendi Hikayelerim',
        [t('pricing.features.license')]: t('pricing.values.on'),
        [t('pricing.features.podcast_output')]: '6 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet' : 'Items'),
        [t('pricing.features.ebook_creation')]: t('pricing.values.on'),
      },
      buttonText: t('pricing.plans.pro.button'),
      highlight: true,
      tag: t('pricing.most_popular')
    },
    {
      id: 'premium',
      name: t('pricing.plans.premium.name'),
      price: '40',
      description: t('pricing.plans.premium.desc'),
      features: {
        [t('pricing.features.request_limit')]: '610 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Karakter' : 'Characters'),
        [t('pricing.features.chapter_count')]: '20 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Bölüme kadar' : 'Chapters'),
        [t('pricing.features.story_length')]: '1000 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Kelime' : 'Words'),
        [t('pricing.features.magic_shuffles')]: '25 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet (Premium)' : 'Items (Premium)'),
        [t('pricing.features.continue_adventure')]: '25 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet/Ay' : 'Items/Mo'),
        [t('pricing.features.listening_list')]: '15 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.character_memory')]: '10 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.smart_transitions')]: t('pricing.values.on'),
        [t('pricing.features.magic_library')]: t('pricing.values.audio_text'),
        [t('pricing.features.write_own')]: '55 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet/Ay' : 'Items/Mo'),
        [t('pricing.features.story_limit')]: '80 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal/Ay' : 'Stories/Mo'),
        [t('pricing.features.genre_selection')]: t('pricing.values.unlocked'),
        [t('pricing.features.archive')]: '100 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Masal' : 'Stories'),
        [t('pricing.features.library_access')]: t('pricing.values.advanced'),
        [t('pricing.features.parent_panel')]: t('pricing.values.full'),
        [t('pricing.features.audio_stories')]: '40 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet' : 'Items'),
        [t('pricing.features.voice_cloning')]: 'Aktif',
        [t('pricing.features.voice_models')]: '6 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Model' : 'Models'),
        [t('pricing.features.narration')]: 'Kendi Hikayelerim',
        [t('pricing.features.license')]: t('pricing.values.on'),
        [t('pricing.features.podcast_output')]: '15 ' + (t('navbar.lang_tr').includes('Türkçe') ? 'Adet' : 'Items'),
        [t('pricing.features.ebook_creation')]: t('pricing.values.on'),
      },
      buttonText: t('pricing.plans.premium.button'),
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#EFEBED] font-sans selection:bg-[#BDD9F2]">
      {/* Navbar Area */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[#052159] hover:opacity-80 transition">
          <ArrowLeft size={20} />
          <span className="font-bold">{t('navbar.return_home')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <Cloud className="text-[#84B1D9]" />
          <span className="text-2xl font-lora font-bold text-[#052159]">MyStory</span>
        </div>
        <div className="w-[100px]"></div>
      </nav>

      {/* Hero Section */}
      <div className="text-center pt-10 pb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-lora font-bold text-[#052159] mb-6">{t('pricing.hero_title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('pricing.hero_subtitle')}
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
                  <span className="text-gray-400 font-medium">{t('pricing.monthly')}</span>
                </div>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 border-t border-gray-100 pt-8">
                {Object.entries(plan.features).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className={`font-bold ${value === t('pricing.values.none') || value === t('pricing.values.off') ? 'text-gray-300' : 'text-[#052159]'}`}>
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
                  {t('pricing.secure_payment')}
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={12} />
                  {t('pricing.cards_accepted')}
                </div>
                <p>{t('pricing.cancel_anytime')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-24 text-center">
          <p className="text-[#052159] font-bold text-lg mb-8">
            {t('pricing.trust_text')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm border-t border-gray-200 pt-12">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#84B1D9]" />
              {t('pricing.stripe_powered')}
            </div>
            <div className="flex items-center gap-2">
              <Lock className="text-[#84B1D9]" />
              {t('pricing.encryption')}
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check />
              {t('pricing.instant_cancel')}
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
