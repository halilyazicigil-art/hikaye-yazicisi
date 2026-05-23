'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, Zap, Trophy, ChevronRight } from 'lucide-react'
import { CelebrationData } from '@/context/AudioPlayerContext'
import Confetti from './Confetti'

interface QueueXPSummaryModalProps {
  xpEvents: CelebrationData[]
  storyCount: number
  lang: string
  onClose: () => void
}

const getPetStageDetails = (stage: string, lang: string) => {
  switch (stage) {
    case 'egg':   return { icon: '🥚', name: lang === 'tr' ? 'Sihirli Yumurta' : 'Magic Egg' }
    case 'baby':  return { icon: '🐣', name: lang === 'tr' ? 'Bebek Ejderha' : 'Baby Dragon' }
    case 'child': return { icon: '🐥', name: lang === 'tr' ? 'Küçük Dinazor' : 'Little Dinosaur' }
    case 'teen':  return { icon: '🦖', name: lang === 'tr' ? 'Genç Ejderha' : 'Teen Dragon' }
    default:      return { icon: '🐉', name: lang === 'tr' ? 'Yüce Ejderha' : 'Ancient Dragon' }
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

export default function QueueXPSummaryModal({ xpEvents, storyCount, lang, onClose }: QueueXPSummaryModalProps) {
  const tr = (a: string, b: string) => lang === 'tr' ? a : b

  // Toplam XP kazancını hesapla
  const totalXP = xpEvents.reduce((sum, e) => sum + (e.xpAdded || 0), 0)
  const didLevelUp = xpEvents.some(e => e.petStats?.levelUp)
  const didEvolve = xpEvents.some(e => e.petStats?.evolved)
  const levelUpCount = xpEvents.filter(e => e.petStats?.levelUp).length

  // Son pet durumunu al (en son XP eventi)
  const lastXPEvent = xpEvents.filter(e => e.rewardType === 'xp' && e.petStats).slice(-1)[0]
  const petStats = lastXPEvent?.petStats
  const petStage = petStats ? getPetStageDetails(petStats.stage, lang) : null

  // Tüm kazanılan rozetleri topla (badge eventleri)
  const allBadges = xpEvents
    .filter(e => e.rewardType === 'badge' && e.newlyEarnedBadges)
    .flatMap(e => e.newlyEarnedBadges || [])
  const uniqueBadges = allBadges.filter((b, i, arr) => arr.findIndex(x => x.id === b.id) === i)

  // Animasyonlu XP sayacı
  const [displayedXP, setDisplayedXP] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const animDone = useRef(false)

  useEffect(() => {
    if (totalXP === 0 || animDone.current) return
    animDone.current = true

    const duration = 1800
    const steps = 60
    const stepTime = duration / steps
    const increment = totalXP / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), totalXP)
      setDisplayedXP(current)
      if (step >= steps) {
        clearInterval(timer)
        setTimeout(() => setShowDetails(true), 300)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [totalXP])

  // XP bar hesaplama
  let startPct = 0
  let endPct = 0
  let levelEndXP = 100

  if (petStats) {
    const xpAdded = lastXPEvent?.xpAdded || 0
    const prevXP = petStats.xp - xpAdded
    const hasLevelUp = petStats.levelUp || false
    
    const prevProgress = getLevelProgress(prevXP, hasLevelUp ? petStats.level - 1 : petStats.level)
    const currentProgress = getLevelProgress(petStats.xp, petStats.level)
    
    startPct = hasLevelUp ? 0 : prevProgress.percentage
    endPct = currentProgress.percentage
    levelEndXP = currentProgress.maxXp
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="xp-summary-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {(didLevelUp || didEvolve) && <Confetti />}

      {/* Modal */}
      <motion.div
        key="xp-summary-modal"
        initial={{ y: 80, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="fixed bottom-0 left-0 right-0 z-[201] mx-auto max-w-md px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-b from-[#0a1628] to-[#050d1a] rounded-[2.5rem] shadow-[0_-8px_80px_rgba(56,189,248,0.25)] border border-sky-500/20 overflow-hidden relative">

          {/* Glow efekti */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-24 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Tutamaç */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-10 h-1 bg-sky-500/40 rounded-full" />
          </div>

          <div className="px-7 pb-7 pt-2 flex flex-col items-center text-center">

            {/* Üst başlık */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center justify-center gap-1.5 mb-1">
                <Sparkles size={11} />
                {tr('DİNLEME TAMAMLANDI!', 'LISTENING SESSION COMPLETE!')}
              </p>
              <h3 className="text-white font-black text-xl leading-tight">
                {tr(
                  `${storyCount} masal dinledin! 🎉`,
                  `You listened to ${storyCount} stories! 🎉`
                )}
              </h3>
            </motion.div>

            {/* XP Sayacı */}
            {totalXP > 0 && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 220 }}
                className="mb-5"
              >
                <div className="relative inline-flex flex-col items-center">
                  {/* Parlayan daire */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/20 blur-xl" />
                    <div className="absolute inset-0 rounded-full border-2 border-sky-500/30" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border-t-2 border-r-2 border-sky-400/60"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <Zap size={18} className="text-sky-400 mb-0.5" fill="currentColor" />
                      <span className="text-3xl font-black text-white tabular-nums">
                        +{displayedXP}
                      </span>
                      <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">XP</span>
                    </div>
                  </div>

                  {/* Level up badge */}
                  {didLevelUp && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
                      className="mt-2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-emerald-500/30"
                    >
                      <Star size={10} fill="white" />
                      {levelUpCount > 1
                        ? tr(`${levelUpCount}x SEVİYE ATLADI!`, `${levelUpCount}x LEVEL UP!`)
                        : tr('SEVİYE ATLADI!', 'LEVEL UP!')}
                    </motion.div>
                  )}

                  {/* Evrim badge */}
                  {didEvolve && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.8, type: 'spring', stiffness: 300 }}
                      className="mt-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg"
                    >
                      <Sparkles size={10} />
                      {tr('EVRİMLEŞTİ!', 'EVOLVED!')}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Evcil hayvan + XP bar */}
            {petStats && petStage && showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-5"
              >
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4 flex items-center gap-4">
                  {/* Pet icon */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-3xl select-none shrink-0"
                  >
                    {petStage.icon}
                  </motion.div>

                  {/* Bar + info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-white font-black text-xs">{petStage.name}</span>
                      <span className="text-sky-400 text-[10px] font-black">
                        {tr('Seviye', 'Lv.')} {petStats.level}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: `${startPct}%` }}
                        animate={{ width: `${endPct}%` }}
                        transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sky-500 text-[9px] font-bold">+{lastXPEvent?.xpAdded || 0} XP</span>
                      <span className="text-white/40 text-[9px] font-bold">{petStats.xp} / {levelEndXP} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* XP özeti (hikaye başına) */}
            {showDetails && xpEvents.length > 0 && xpEvents.some(e => e.rewardType === 'xp') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full mb-5"
              >
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-3 text-center">
                    <div className="text-2xl font-black text-white">{storyCount}</div>
                    <div className="text-[9px] text-sky-400 font-black uppercase tracking-wider">
                      {tr('Masal', 'Stories')}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-3 text-center">
                    <div className="text-2xl font-black text-emerald-400">+{totalXP}</div>
                    <div className="text-[9px] text-sky-400 font-black uppercase tracking-wider">XP</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-3 text-center">
                    <div className="text-2xl font-black text-amber-400">
                      {uniqueBadges.length > 0 ? uniqueBadges.length : (petStats?.level ?? '—')}
                    </div>
                    <div className="text-[9px] text-sky-400 font-black uppercase tracking-wider">
                      {uniqueBadges.length > 0 ? tr('Rozet', 'Badge') : tr('Seviye', 'Level')}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Kazanılan rozetler (varsa) */}
            {showDetails && uniqueBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-5"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1 mb-2">
                  <Trophy size={10} /> {tr('Kazanılan Rozetler', 'Badges Earned')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueBadges.map(badge => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-2.5 py-1.5"
                    >
                      <span className="text-base">{badge.icon}</span>
                      <span className="text-[10px] font-black text-amber-300">{badge.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Kapat butonu */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white rounded-2xl font-black text-sm shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {tr('Masalları Değerlendir', 'Rate the Stories')}
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
