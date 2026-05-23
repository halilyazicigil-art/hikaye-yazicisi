'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface StarRatingProps {
  storyId: string
  lang: string
}

export default function StarRating({ storyId, lang }: StarRatingProps) {
  const [userRating, setUserRating]     = useState<number | null>(null)
  const [hovered, setHovered]           = useState<number | null>(null)
  const [submitted, setSubmitted]       = useState(false)
  const [loading, setLoading]           = useState(false)
  const [avgRating, setAvgRating]       = useState<number | null>(null)
  const [totalRatings, setTotalRatings] = useState<number>(0)
  const [checking, setChecking]         = useState(true)

  const supabase = createClient()

  // Sayfa yüklenince: kullanıcı daha önce oy vermiş mi + mevcut ortalama
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setChecking(false); return }

      // Önceki oy kontrolü (localStorage tabanlı — hızlı)
      const lsKey = `rating_${user.id}_${storyId}`
      const prevRating = localStorage.getItem(lsKey)
      if (prevRating) {
        setUserRating(Number(prevRating))
        setSubmitted(true)
      }

      // Mevcut ortalama puanı çek
      const { data: story } = await supabase
        .from('stories')
        .select('average_rating, total_ratings')
        .eq('id', storyId)
        .maybeSingle()

      if (story) {
        setAvgRating(story.average_rating ?? 0)
        setTotalRatings(story.total_ratings ?? 0)
      }
      setChecking(false)
    }
    init()
  }, [storyId])

  const handleRate = async (stars: number) => {
    if (submitted || loading) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    // Mevcut değerleri al
    const { data: story } = await supabase
      .from('stories')
      .select('average_rating, total_ratings')
      .eq('id', storyId)
      .maybeSingle()

    if (!story) { setLoading(false); return }

    const currentTotal = story.total_ratings ?? 0
    const currentAvg   = story.average_rating ?? 0

    // Yeni ortalama hesapla
    const newTotal = currentTotal + 1
    const newAvg   = ((currentAvg * currentTotal) + stars) / newTotal

    const { error } = await supabase
      .from('stories')
      .update({
        average_rating: Math.round(newAvg * 10) / 10, // 1 ondalık basamak
        total_ratings:  newTotal
      })
      .eq('id', storyId)

    if (!error) {
      setUserRating(stars)
      setSubmitted(true)
      setAvgRating(Math.round(newAvg * 10) / 10)
      setTotalRatings(newTotal)
      // LocalStorage'a kaydet (tekrar oy vermeyi engelle)
      localStorage.setItem(`rating_${user.id}_${storyId}`, String(stars))
    }

    setLoading(false)
  }

  if (checking) return null

  const displayRating = hovered ?? userRating ?? 0

  return (
    <div className="mt-10 pt-8 border-t-2 border-sky-100">
      <div className="flex flex-col items-center gap-3 text-center">

        {/* Başlık */}
        <p className="text-sky-900 font-black text-base tracking-wide">
          {submitted
            ? (lang === 'tr' ? '⭐ Değerlendirmen kaydedildi!' : '⭐ Your rating was saved!')
            : (lang === 'tr' ? 'Bu masalı beğendin mi?' : 'Did you enjoy this tale?')}
        </p>

        {/* Yıldızlar */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              id={`star-rating-${star}`}
              disabled={submitted || loading}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !submitted && setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className={`transition-all duration-200 disabled:cursor-default ${
                !submitted ? 'hover:scale-125 active:scale-110 cursor-pointer' : 'cursor-default'
              }`}
              aria-label={`${star} yıldız`}
            >
              <Star
                size={36}
                className={`transition-all duration-150 ${
                  star <= displayRating
                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                    : 'fill-transparent text-amber-200'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Ortalama puan göstergesi */}
        {avgRating !== null && totalRatings > 0 && (
          <p className="text-sky-500 text-xs font-bold opacity-70">
            {lang === 'tr'
              ? `Ortalama: ${avgRating} ⭐ · ${totalRatings} değerlendirme`
              : `Average: ${avgRating} ⭐ · ${totalRatings} ratings`}
          </p>
        )}

        {/* Gönderim sonrası küçük teşekkür mesajı */}
        {submitted && userRating && (
          <p className="text-amber-500 text-[11px] font-black uppercase tracking-widest animate-in fade-in duration-500">
            {lang === 'tr'
              ? `${userRating} yıldız verdin · Teşekkürler! 🌟`
              : `You gave ${userRating} stars · Thank you! 🌟`}
          </p>
        )}
      </div>
    </div>
  )
}
