'use client'

import { useState, useCallback, useEffect } from 'react'
import { Star, X, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Track } from '@/context/AudioPlayerContext'

interface TrackRating {
  track: Track
  rating: number | null
  submitted: boolean
}

interface QueueRatingModalProps {
  tracks: Track[]
  lang: string
  onClose: () => void
}

export default function QueueRatingModal({ tracks, lang, onClose }: QueueRatingModalProps) {
  const [ratings, setRatings] = useState<TrackRating[]>(
    tracks.map(track => ({ track, rating: null, submitted: false }))
  )
  const [hovered, setHovered] = useState<{ id: string; star: number } | null>(null)
  const [allDone, setAllDone] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const supabase = createClient()

  // Load existing ratings from localStorage on mount
  useEffect(() => {
    const loadExistingRatings = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setRatings(prev => {
        const updated = prev.map(item => {
          const lsKey = `rating_${user.id}_${item.track.id}`
          const savedRating = localStorage.getItem(lsKey)
          if (savedRating) {
            return {
              ...item,
              rating: Number(savedRating),
              submitted: true
            }
          }
          return item
        })

        // If all tracks are already rated, skip to the completed screen directly
        if (updated.every(r => r.submitted)) {
          setAllDone(true)
        }

        return updated
      })
    }

    loadExistingRatings()
  }, [tracks, supabase])

  const handleRate = useCallback(async (trackId: string, stars: number) => {
    if (loading) return
    setLoading(trackId)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(null); return }

    const lsKey = `rating_${user.id}_${trackId}`
    if (!localStorage.getItem(lsKey)) {
      const { data: story } = await supabase
        .from('stories')
        .select('average_rating, total_ratings')
        .eq('id', trackId)
        .maybeSingle()

      if (story) {
        const currentTotal = story.total_ratings ?? 0
        const currentAvg   = story.average_rating ?? 0
        const newTotal     = currentTotal + 1
        const newAvg       = ((currentAvg * currentTotal) + stars) / newTotal

        await supabase
          .from('stories')
          .update({
            average_rating: Math.round(newAvg * 10) / 10,
            total_ratings:  newTotal
          })
          .eq('id', trackId)

        localStorage.setItem(lsKey, String(stars))
      }
    }

    setRatings(prev => {
      const updated = prev.map(r =>
        r.track.id === trackId ? { ...r, rating: stars, submitted: true } : r
      )
      // Hepsi puanlandıysa "tamamlandı" ekranı göster
      if (updated.every(r => r.submitted)) {
        setTimeout(() => setAllDone(true), 600)
      }
      return updated
    })

    setLoading(null)
  }, [loading, supabase])

  const tr = (a: string, b: string) => lang === 'tr' ? a : b

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="queue-rating-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — ortada, scroll destekli */}
      <motion.div
        key="queue-rating-panel"
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[201] mx-auto max-w-xl px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-[2rem] shadow-[0_-8px_60px_rgba(0,0,0,0.2)] border border-sky-100 overflow-hidden relative max-h-[85vh] flex flex-col">

          {/* Tutamaç */}
          <div className="flex justify-center pt-4 pb-2 shrink-0">
            <div className="w-10 h-1 bg-sky-200 rounded-full" />
          </div>

          {/* Kapat */}
          <button
            id="queue-rating-close"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-400 transition-all z-10"
          >
            <X size={16} />
          </button>

          {allDone ? (
            /* Tüm puanlar verildi ekranı */
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4 px-8 py-10 text-center"
            >
              <div className="text-6xl">🌟</div>
              <h3 className="text-sky-900 font-black text-2xl">
                {tr('Muhteşem dinleme!', 'Amazing listening session!')}
              </h3>
              <p className="text-sky-500 text-sm font-medium max-w-xs">
                {tr(
                  'Tüm değerlendirmelerin kaydedildi. Teşekkürler!',
                  'All your ratings have been saved. Thank you!'
                )}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 bg-sky-500 text-white rounded-full font-black text-sm hover:bg-sky-600 transition-all"
              >
                {tr('Kapat', 'Close')}
              </button>
            </motion.div>
          ) : (
            <>
              {/* Başlık */}
              <div className="px-8 pt-2 pb-4 shrink-0 text-center border-b border-sky-50">
                <p className="text-[11px] font-black uppercase tracking-widest text-sky-400 mb-1">
                  {tr('Dinleme listesi tamamlandı!', 'Listening session complete!')}
                </p>
                <h3 className="text-sky-900 font-black text-lg">
                  {tr('Masalları puanla ⭐', 'Rate the tales ⭐')}
                </h3>
                <p className="text-sky-400 text-xs font-medium mt-1">
                  {tr(
                    `${tracks.length} masal dinledin — her birine puan ver`,
                    `You listened to ${tracks.length} tales — rate each one`
                  )}
                </p>
              </div>

              {/* Masal listesi — scrollable */}
              <div className="overflow-y-auto flex-1 divide-y divide-sky-50 px-2">
                {ratings.map((item, idx) => {
                  const displayStars = hovered?.id === item.track.id
                    ? hovered.star
                    : item.rating ?? 0

                  return (
                    <motion.div
                      key={item.track.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                        item.submitted ? 'bg-emerald-50/50' : 'hover:bg-sky-50/50'
                      }`}
                    >
                      {/* Kapak */}
                      {item.track.imageUrl && (
                        <img
                          src={item.track.imageUrl}
                          alt={item.track.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm"
                        />
                      )}

                      {/* Başlık + Yıldızlar */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sky-900 font-black text-sm truncate leading-tight mb-2">
                          {item.track.title}
                        </p>

                        {item.submitted ? (
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span className="text-emerald-600 text-[11px] font-black">
                              {item.rating} ⭐ {tr('verildi', 'rated')}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                id={`queue-rate-${item.track.id}-${star}`}
                                disabled={!!loading}
                                onClick={() => handleRate(item.track.id, star)}
                                onMouseEnter={() => setHovered({ id: item.track.id, star })}
                                onMouseLeave={() => setHovered(null)}
                                className="transition-all duration-100 hover:scale-125 disabled:cursor-wait"
                              >
                                <Star
                                  size={22}
                                  className={`transition-all duration-100 ${
                                    star <= displayStars
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'fill-transparent text-sky-200'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Alt buton */}
              <div className="px-6 py-4 shrink-0 border-t border-sky-50">
                <button
                  id="queue-rating-skip"
                  onClick={onClose}
                  className="w-full py-3 text-sky-400 font-black text-sm hover:text-sky-600 transition-colors"
                >
                  {tr('Şimdi değil', 'Maybe later')}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}
