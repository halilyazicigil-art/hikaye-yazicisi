'use client'

import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

interface RatingModalProps {
  storyId: string
  storyTitle: string
  lang: string
  onClose: () => void
}

export default function RatingModal({ storyId, storyTitle, lang, onClose }: RatingModalProps) {
  const [hovered, setHovered]     = useState<number | null>(null)
  const [selected, setSelected]   = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const supabase = createClient()

  // 10 saniye sonra otomatik kapat
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!submitted) onClose()
    }, 10000)
    return () => clearTimeout(timer)
  }, [submitted, onClose])

  const handleRate = async (stars: number) => {
    if (loading || submitted) return
    setSelected(stars)
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const lsKey = `rating_${user.id}_${storyId}`
    if (localStorage.getItem(lsKey)) {
      setSubmitted(true)
      setLoading(false)
      setTimeout(onClose, 1500)
      return
    }

    const { data: story } = await supabase
      .from('stories')
      .select('average_rating, total_ratings')
      .eq('id', storyId)
      .maybeSingle()

    if (!story) { setLoading(false); return }

    const currentTotal = story.total_ratings ?? 0
    const currentAvg   = story.average_rating ?? 0
    const newTotal     = currentTotal + 1
    const newAvg       = ((currentAvg * currentTotal) + stars) / newTotal

    const { error } = await supabase
      .from('stories')
      .update({
        average_rating: Math.round(newAvg * 10) / 10,
        total_ratings:  newTotal
      })
      .eq('id', storyId)

    if (!error) {
      localStorage.setItem(lsKey, String(stars))
      setSubmitted(true)
      setTimeout(onClose, 1800)
    }

    setLoading(false)
  }

  const displayRating = hovered ?? selected ?? 0

  return (
    <>
      {/* Backdrop — ayrı key ile */}
      <motion.div
        key="rating-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Bottom Sheet — ayrı key ile */}
      <motion.div
        key="rating-sheet"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[201] mx-auto max-w-lg px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] border border-sky-100 overflow-hidden relative">

          {/* Üst tutamaç */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-10 h-1 bg-sky-200 rounded-full" />
          </div>

          {/* Kapat */}
          <button
            id="rating-modal-close"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-400 transition-all"
          >
            <X size={16} />
          </button>

          <div className="px-8 pb-8 pt-2 flex flex-col items-center gap-5 text-center">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <div className="text-5xl">🌟</div>
                <p className="text-sky-900 font-black text-xl">
                  {lang === 'tr' ? 'Teşekkürler!' : 'Thank you!'}
                </p>
                <p className="text-sky-500 text-sm font-medium">
                  {lang === 'tr'
                    ? 'Değerlendirmen diğer ailelere yol gösterecek.'
                    : 'Your rating will guide other families.'}
                </p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-widest text-sky-400">
                    {lang === 'tr' ? 'Masal bitti!' : 'Story complete!'}
                  </p>
                  <h3 className="text-sky-900 font-black text-lg leading-tight line-clamp-2">
                    {lang === 'tr'
                      ? `"${storyTitle}" masalını beğendin mi?`
                      : `Did you enjoy "${storyTitle}"?`}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      id={`rating-star-${star}`}
                      disabled={loading}
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(null)}
                      className="transition-all duration-150 hover:scale-125 active:scale-110 disabled:cursor-wait"
                    >
                      <Star
                        size={42}
                        className={`transition-all duration-150 ${
                          star <= displayRating
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]'
                            : 'fill-transparent text-sky-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-sky-300 px-1">
                  <span>{lang === 'tr' ? 'Çok kötü' : 'Poor'}</span>
                  <span>{lang === 'tr' ? 'Mükemmel!' : 'Excellent!'}</span>
                </div>

                <button
                  id="rating-modal-skip"
                  onClick={onClose}
                  className="text-[11px] text-sky-300 font-bold hover:text-sky-500 transition-colors underline underline-offset-2"
                >
                  {lang === 'tr' ? 'Şimdi değil' : 'Maybe later'}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
