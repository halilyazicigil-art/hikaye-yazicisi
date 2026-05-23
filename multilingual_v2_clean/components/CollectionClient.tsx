'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, Sparkles, Star, Lock, CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'

interface Badge {
  id: string
  title: string
  description: string
  icon: string
  milestone: number
}

interface ProfilePet {
  pet_name: string
  xp: number
  level: number
  stage: string
}

interface CollectionClientProps {
  lang: 'tr' | 'en'
  translations: any
  pet: ProfilePet | null
  badges: Badge[]
  earnedBadgeIds: string[]
  earnedBadgeDates: Record<string, string>
  privateListensCount: number
}

function getLevelProgress(xp: number, level: number) {
  let minXp = 0
  let maxXp = 100

  if (level === 1) { minXp = 0; maxXp = 100; }
  else if (level === 2) { minXp = 100; maxXp = 200; }
  else if (level === 3) { minXp = 200; maxXp = 400; }
  else if (level === 4) { minXp = 400; maxXp = 600; }
  else if (level === 5) { minXp = 600; maxXp = 800; }
  else if (level === 6) { minXp = 800; maxXp = 1000; }
  else if (level === 7) { minXp = 1000; maxXp = 1200; }
  else if (level === 8) { minXp = 1200; maxXp = 1500; }
  else if (level === 9) { minXp = 1500; maxXp = 2000; }
  else { minXp = 2000; maxXp = 2000; }

  const range = maxXp - minXp
  const currentProgress = xp - minXp
  const percentage = range > 0 ? Math.min(100, Math.max(0, (currentProgress / range) * 100)) : 100

  return { minXp, maxXp, percentage }
}

const getPetStageDetails = (stage: string, lang: 'tr' | 'en') => {
  switch (stage) {
    case 'egg':
      return {
        icon: '🥚',
        name: lang === 'tr' ? 'Sihirli Yumurta' : 'Magic Egg',
        description: lang === 'tr' ? 'Hala uykuda olan sihirli bir yumurta. Büyütmek için daha fazla hikaye dinle!' : 'A sleeping magical egg. Listen to more stories to hatch it!',
        color: 'from-amber-200 to-amber-400 bg-amber-500/10 border-amber-500/20 text-amber-500',
      }
    case 'baby':
      return {
        icon: '🐣',
        name: lang === 'tr' ? 'Bebek Ejderha' : 'Baby Dragon',
        description: lang === 'tr' ? 'Yumurtasından yeni çıkmış sevimli bir ejderha yavrusu!' : 'A cute baby dragon newly hatched from its egg!',
        color: 'from-orange-200 to-orange-400 bg-orange-500/10 border-orange-500/20 text-orange-500',
      }
    case 'child':
      return {
        icon: '🐥',
        name: lang === 'tr' ? 'Küçük Dinazor' : 'Little Dinosaur',
        description: lang === 'tr' ? 'Koşup oynamayı seven, meraklı ve enerjik bir arkadaş.' : 'A curious and energetic companion who loves running around.',
        color: 'from-yellow-200 to-yellow-400 bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
      }
    case 'teen':
      return {
        icon: '🦖',
        name: lang === 'tr' ? 'Genç Ejderha' : 'Teen Dragon',
        description: lang === 'tr' ? 'Büyülü güçlerini keşfeden, cesur bir genç ejderha.' : 'A brave teen dragon exploring its magical powers.',
        color: 'from-emerald-200 to-emerald-400 bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
      }
    case 'adult':
    default:
      return {
        icon: '🐉',
        name: lang === 'tr' ? 'Yüce Ejderha' : 'Ancient Dragon',
        description: lang === 'tr' ? 'Masallar diyarının koruyucusu, görkemli ve bilge bir ejderha.' : 'A majestic and wise dragon, protector of the fairy tale lands.',
        color: 'from-purple-200 to-purple-400 bg-purple-500/10 border-purple-500/20 text-purple-500',
      }
  }
}

export default function CollectionClient({
  lang,
  translations,
  pet,
  badges,
  earnedBadgeIds,
  earnedBadgeDates,
  privateListensCount,
}: CollectionClientProps) {
  const t = (key: string, fallback: string) => {
    const keys = key.split('.')
    let val = translations
    for (const k of keys) {
      val = val?.[k]
    }
    return val || fallback
  }

  // Set default pet stats if not initialized yet
  const petStats = pet || {
    pet_name: t('gamification.pet_egg', 'Sihirli Yumurta'),
    xp: 0,
    level: 1,
    stage: 'egg'
  }

  const { maxXp, percentage } = getLevelProgress(petStats.xp, petStats.level)
  const currentStage = getPetStageDetails(petStats.stage, lang)

  return (
    <div className="min-h-screen bg-[#BDD9F2] font-nunito p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-lg border border-white/40">
          <div className="flex items-center gap-4">
            <Link 
              href="/parent" 
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition shadow-inner active:scale-95"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-3xl font-lora font-black text-slate-800 leading-tight">
                {t('gamification.companion_room', 'Okuma Arkadaşı & Rozetler')}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {t('gamification.play_to_earn', 'Sihirli Kütüphane\'den kitap dinleyerek okuma arkadaşını büyüt, kendi kütüphanenden kitap dinleyerek rozetler kazan!')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Virtual Pet Companion Status */}
          <div className="md:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white/50 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-4 right-4 bg-sky-500/10 text-sky-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {t('gamification.pet_status', 'Okuma Arkadaşı Durumu')}
              </div>

              {/* Big Animated Pet Icon */}
              <div className="relative w-36 h-36 mt-8 mb-4 flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50/50 rounded-full shadow-inner border border-sky-100 text-7xl select-none">
                <motion.span 
                  animate={{ 
                    y: [0, -8, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  {currentStage.icon}
                </motion.span>
                <div className="absolute -inset-2 rounded-full border border-sky-200/40 animate-ping opacity-20 pointer-events-none" />
              </div>

              {/* Pet Name & Level */}
              <h2 className="text-2xl font-lora font-black text-slate-800 mb-1">
                {currentStage.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs font-black text-sky-500 bg-sky-50 px-3 py-1 rounded-full mb-6">
                <Star size={12} className="fill-sky-500 text-sky-500" />
                <span>{t('gamification.level', 'Seviye')} {petStats.level}</span>
              </div>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-6 px-4">
                {currentStage.description}
              </p>

              {/* Progress bar */}
              <div className="w-full space-y-2 px-2">
                <div className="flex justify-between text-xs font-black text-slate-400">
                  <span>{t('gamification.stage', 'Gelişim Aşaması')}: <strong className="text-slate-600">{petStats.stage.toUpperCase()}</strong></span>
                  <span>{petStats.xp} / {maxXp} XP</span>
                </div>
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200/50 relative shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 mt-1">
                  <Info size={11} /> {t('gamification.next_level', 'Sonraki Seviye')} için {(maxXp - petStats.xp) > 0 ? maxXp - petStats.xp : 0} XP gerekli.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Badges Showcase */}
          <div className="md:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white/50 space-y-6"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h2 className="text-xl font-lora font-black text-slate-800 flex items-center gap-2">
                  <Trophy className="text-amber-500" size={22} />
                  {t('gamification.badges', 'Kahraman Rozetleri')}
                </h2>
                <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full">
                  {earnedBadgeIds.length} / {badges.length}
                </span>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge) => {
                  const isEarned = earnedBadgeIds.includes(badge.id)
                  const earnedDate = earnedBadgeDates[badge.id]

                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-5 rounded-3xl border transition-all duration-300 flex items-start gap-4 ${
                        isEarned
                          ? 'bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-300/40 shadow-md shadow-amber-500/5'
                          : 'bg-slate-50/50 border-slate-200/60 opacity-60'
                      }`}
                    >
                      {/* Badge Icon Container */}
                      <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-sm border ${
                        isEarned
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-white text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-400 grayscale'
                      }`}>
                        {badge.icon}
                      </div>

                      {/* Badge Details */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-1.5 justify-between">
                          <h3 className={`font-black text-sm truncate ${isEarned ? 'text-slate-800' : 'text-slate-500'}`}>
                            {badge.title}
                          </h3>
                          {isEarned ? (
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                          ) : (
                            <Lock size={12} className="text-slate-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {badge.description}
                        </p>

                        {/* Earned Date or Unlock description */}
                        {isEarned ? (
                          <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                            <span>{t('gamification.earned_at', 'Kazanıldı:')}</span>
                            <span>
                              {earnedDate ? new Date(earnedDate).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : ''}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            {t('gamification.locked_desc', `Kilidi açmak için {count} masal daha dinlemelisin.`).replace('{count}', String(Math.max(0, badge.milestone - privateListensCount)))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
