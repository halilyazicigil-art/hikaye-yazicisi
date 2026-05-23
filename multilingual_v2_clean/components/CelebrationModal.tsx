'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import { useLanguage } from '@/context/LanguageContext'
import Confetti from './Confetti'
import { Trophy, Star, Sparkles, ChevronRight } from 'lucide-react'

// Pet stage icons and names helper
const getPetStageDetails = (stage: string, lang: 'tr' | 'en') => {
  switch (stage) {
    case 'egg':
      return {
        icon: '🥚',
        name: lang === 'tr' ? 'Sihirli Yumurta' : 'Magic Egg',
        description: lang === 'tr' ? 'Hala uykuda olan sihirli bir yumurta. Büyütmek için daha fazla hikaye dinle!' : 'A sleeping magical egg. Listen to more stories to hatch it!',
        color: 'from-amber-200 to-amber-400',
      }
    case 'baby':
      return {
        icon: '🐣',
        name: lang === 'tr' ? 'Bebek Ejderha' : 'Baby Dragon',
        description: lang === 'tr' ? 'Yumurtasından yeni çıkmış sevimli bir ejderha yavrusu!' : 'A cute baby dragon newly hatched from its egg!',
        color: 'from-orange-200 to-orange-400',
      }
    case 'child':
      return {
        icon: '🐥',
        name: lang === 'tr' ? 'Küçük Dinazor' : 'Little Dinosaur',
        description: lang === 'tr' ? 'Koşup oynamayı seven, meraklı ve enerjik bir arkadaş.' : 'A curious and energetic companion who loves running around.',
        color: 'from-yellow-200 to-yellow-400',
      }
    case 'teen':
      return {
        icon: '🦖',
        name: lang === 'tr' ? 'Genç Ejderha' : 'Teen Dragon',
        description: lang === 'tr' ? 'Büyülü güçlerini keşfeden, cesur bir genç ejderha.' : 'A brave teen dragon exploring its magical powers.',
        color: 'from-emerald-200 to-emerald-400',
      }
    case 'adult':
    default:
      return {
        icon: '🐉',
        name: lang === 'tr' ? 'Yüce Ejderha' : 'Ancient Dragon',
        description: lang === 'tr' ? 'Masallar diyarının koruyucusu, görkemli ve bilge bir ejderha.' : 'A majestic and wise dragon, protector of the fairy tale lands.',
        color: 'from-purple-200 to-purple-400',
      }
  }
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

export default function CelebrationModal() {
  const { celebration, setCelebration } = useAudioPlayer()
  const { language, t } = useLanguage()
  const [showEvolution, setShowEvolution] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // For handling multiple badges/rewards in sequence

  // Reset step on new celebration trigger
  useEffect(() => {
    if (celebration) {
      setCurrentStep(0)
      
      // If we have pet stats with evolution/level up, we can trigger an evolution screen after a short delay
      if (celebration.rewardType === 'xp' && celebration.petStats?.evolved) {
        const timer = setTimeout(() => {
          setShowEvolution(true)
        }, 3000)
        return () => clearTimeout(timer)
      }
    } else {
      setShowEvolution(false)
    }
  }, [celebration])

  if (!celebration) return null

  const handleClose = () => {
    // If we have multiple badges, we can progress to the next badge
    if (celebration.rewardType === 'badge' && celebration.newlyEarnedBadges && currentStep < celebration.newlyEarnedBadges.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCelebration(null)
    }
  }

  // Render Badge Achievement Content
  if (celebration.rewardType === 'badge' && celebration.newlyEarnedBadges && celebration.newlyEarnedBadges.length > 0) {
    const badge = celebration.newlyEarnedBadges[currentStep]
    
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <Confetti />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 shadow-2xl flex flex-col items-center text-center overflow-hidden z-10"
          >
            {/* Glowing Background Radial */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl" />

            {/* Premium Gold Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white mb-6 relative"
            >
              <span className="text-5xl select-none">{badge.icon || '🏆'}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full border-4 border-amber-300/40"
              />
            </motion.div>

            {/* Achievement text */}
            <span className="text-amber-500 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Trophy size={14} /> {language === 'tr' ? 'YENİ BAŞARI KİLİDİ AÇILDI' : 'NEW ACHIEVEMENT UNLOCKED'}
            </span>

            <h2 className="text-3xl font-lora font-black text-gray-800 leading-tight mb-3">
              {badge.title}
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-8 px-4">
              {badge.description}
            </p>

            {/* Close / Next Button */}
            <button
              onClick={handleClose}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-2xl font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {celebration.newlyEarnedBadges.length > 1 && currentStep < celebration.newlyEarnedBadges.length - 1 ? (
                <>
                  {language === 'tr' ? 'Sıradaki Ödül' : 'Next Reward'} <ChevronRight size={18} />
                </>
              ) : (
                language === 'tr' ? 'Harika, Teşekkürler!' : 'Awesome, Thanks!'
              )}
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }

  // Render Pet XP / Evolution Content
  if (celebration.rewardType === 'xp' && celebration.petStats) {
    const stats = celebration.petStats
    const currentStage = getPetStageDetails(stats.stage, language)
    const xpAdded = celebration.xpAdded || 50
    const prevXP = stats.xp - xpAdded
    const prevProgress = getLevelProgress(prevXP, stats.levelUp ? stats.level - 1 : stats.level)
    const currentProgress = getLevelProgress(stats.xp, stats.level)
    
    const startProgress = stats.levelUp ? 0 : prevProgress.percentage
    const endProgress = currentProgress.percentage
    const levelEndXP = currentProgress.maxXp

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <Confetti />

          {/* Evolution screen transition OR normal progress screen */}
          {showEvolution && stats.evolved ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#1b1e36] to-[#0d0f1f] text-white rounded-[2.5rem] p-8 border border-white/10 shadow-2xl flex flex-col items-center text-center overflow-hidden z-10"
            >
              {/* Outer rays/glow */}
              <div className="absolute w-[300px] h-[300px] bg-sky-500/20 rounded-full blur-[80px] -z-10" />

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-8xl mb-6 relative select-none"
              >
                {currentStage.icon}
                <div className="absolute -inset-4 bg-sky-400/20 rounded-full blur-xl -z-10" />
              </motion.div>

              <span className="text-sky-400 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Sparkles size={14} /> {language === 'tr' ? 'ARKADAŞIN EVRİMLEŞTİ!' : 'COMPANION EVOLVED!'}
              </span>

              <h2 className="text-3xl font-lora font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-sky-400 mb-3">
                {currentStage.name}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed mb-8 px-4">
                {currentStage.description}
              </p>

              <button
                onClick={handleClose}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white rounded-2xl font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {language === 'tr' ? 'Yeni Arkadaşımla Devam Et!' : 'Continue with My New Companion!'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 shadow-2xl flex flex-col items-center text-center overflow-hidden z-10"
            >
              {/* Pet stage details */}
              <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-indigo-50/50 rounded-full flex items-center justify-center shadow-inner border border-sky-100 mb-4 text-5xl select-none">
                {currentStage.icon}
              </div>

              {/* Progress Text */}
              <span className="text-sky-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mb-2">
                <Star size={11} className="fill-sky-500 text-sky-500" /> {language === 'tr' ? 'OKUMA ARKADAŞI İLERLEMESİ' : 'READING COMPANION PROGRESS'}
              </span>

              <h2 className="text-2xl font-lora font-black text-gray-800 leading-tight mb-2">
                {currentStage.name}
              </h2>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#84B1D9] mb-6">
                <span>{language === 'tr' ? 'Seviye' : 'Level'} {stats.level}</span>
                {stats.levelUp && (
                  <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
                    {language === 'tr' ? 'SEVİYE ATLADI!' : 'LEVEL UP!'}
                  </span>
                )}
              </div>

              {/* XP progress bar */}
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-3 border border-sky-100/50 relative shadow-inner">
                {/* Previous Progress */}
                <div
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full absolute left-0 top-0 transition-all duration-300"
                  style={{ width: `${startProgress}%` }}
                />
                {/* Added Progress animation */}
                <motion.div
                  initial={{ width: `${startProgress}%` }}
                  animate={{ width: `${endProgress}%` }}
                  transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full absolute left-0 top-0"
                />
              </div>

              <div className="flex justify-between w-full text-[10px] font-black text-slate-400 px-1 mb-8">
                <span>+{stats.levelUp ? (language === 'tr' ? 'Seviye Sonu' : 'Level Up') : `${xpAdded} XP`}</span>
                <span>{stats.xp} / {levelEndXP} XP</span>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white rounded-2xl font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {language === 'tr' ? 'Süper, Devam Et!' : 'Great, Continue!'}
              </button>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    )
  }

  return null
}
