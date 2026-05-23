'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Star, Trophy, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import en from '../locales/en.json'
import tr from '../locales/tr.json'
import DragonCompanion from './companions/DragonCompanion'
import PegasusCompanion from './companions/PegasusCompanion'

interface Badge {
  badge_id: string
  badges?: {
    icon: string
    title: string
  }
}

interface ProfilePet {
  pet_name: string
  xp: number
  level: number
  stage: string
  pet_type: 'dragon' | 'pegasus' | null
}

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
}

const dictionaries = { en, tr }

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

// Companion specific stage names, descriptions and speech bubbles local mapping
const companionData = {
  dragon: {
    stages: {
      tr: {
        egg: 'Sihirli Yumurta',
        baby: 'Bebek Ejderha',
        child: 'Küçük Dinazor',
        teen: 'Genç Ejderha',
        adult: 'Yüce Ejderha'
      },
      en: {
        egg: 'Magic Egg',
        baby: 'Baby Dragon',
        child: 'Little Dinosaur',
        teen: 'Teen Dragon',
        adult: 'Elder Dragon'
      }
    },
    descriptions: {
      tr: {
        egg: 'Hala uykuda olan sihirli bir yumurta. Büyütmek için daha fazla hikaye dinle!',
        baby: 'Yumurtasından yeni çıkmış sevimli bir ejderha yavrusu!',
        child: 'Koşup oynamayı seven, meraklı ve enerjik bir arkadaş.',
        teen: 'Büyülü güçlerini keşfeden, cesur bir genç ejderha.',
        adult: 'Masallar diyarının koruyucusu, görkemli ve bilge bir ejderha.'
      },
      en: {
        egg: 'A magic egg still sleeping. Listen to more stories to hatch it!',
        baby: 'A cute baby dragon newly hatched from its egg!',
        child: 'A curious and energetic companion who loves running around.',
        teen: 'A brave teen dragon discovering its magical powers.',
        adult: 'A majestic and wise dragon, protector of the fairy tale lands.'
      }
    },
    messages: {
      tr: {
        egg: [
          'Zzz... Hala uykudayım. Beni uyandırmak için daha fazla masal dinle! 🥚',
          'Sihirli güçler yumurtanın içinde birikiyor... ✨',
          'Şşşt... Masal bittiğinde kabuğum çatlayebilir mi acaba? 🥚'
        ],
        baby: [
          'Cee-ee! 🐣 Çok tatlı bir masal dinliyoruz! Seviyemi yükseltmek için devam edelim.',
          'Büyümek için sabırsızlanıyorum! Masallar çok lezzetli! 🍼',
          'Beni ekranın istediğin köşesine taşıyabilirsin! 🎈'
        ],
        child: [
          'Harika gidiyoruz! 🐥 Bu masalın sonunu çok merak ediyorum!',
          'Seninle masal dinlemek en sevdiğim aktivite! 🌟',
          'Daha fazla rozet kazanmak için ebeveyn arşivini dinlemeyi unutma! 🏆'
        ],
        teen: [
          'Diyarları keşfetmeye hazır mısın? 🦖 Masal dinledikçe güçleniyorum!',
          'Büyülü güçlerimi test ediyorum! Raaarr! 🦖',
          'Kitap okumak hayal gücümü uçuruyor! ✨'
        ],
        adult: [
          'Bilgelik masallarla büyür. 🐉 Masallar diyarını korumak için buradayım!',
          'Gerçek bir okuma şampiyonusun! Seninle gurur duyuyorum! 👑',
          'Bu bilge ejderha her zaman seninle masal dinlemeye hazır! 🐉'
        ]
      },
      en: {
        egg: [
          'Zzz... Still sleeping. Listen to more stories to wake me up! 🥚',
          'Magical powers are gathering inside the egg... ✨',
          'Shh... I wonder if my shell will crack when the story ends? 🥚'
        ],
        baby: [
          'Peek-a-boo! 🐣 We are listening to such a sweet story! Let\'s keep going to level up.',
          'I can\'t wait to grow! Stories are so delicious! 🍼',
          'You can drag me to any corner of the screen! 🎈'
        ],
        child: [
          'We are doing great! 🐥 I\'m so curious about the ending of this story!',
          'Listening to stories with you is my absolute favorite thing! 🌟',
          'Don\'t forget to listen to parent archive to earn more badges! 🏆'
        ],
        teen: [
          'Ready to explore the realms? 🦖 I get stronger as we listen to stories!',
          'Testing my magical powers! Raaarr! 🦖',
          'Reading books makes my imagination fly! ✨'
        ],
        adult: [
          'Wisdom grows with stories. 🐉 I\'m here to protect the fairy tale lands!',
          'You are a true reading champion! I\'m so proud of you! 👑',
          'This wise dragon is always ready to listen to stories with you! 🐉'
        ]
      }
    }
  },
  pegasus: {
    stages: {
      tr: {
        egg: 'Yıldızlı Yumurta',
        baby: 'Bebek Pegasus',
        child: 'Küçük Pegasus',
        teen: 'Rüzgar Pegasusu',
        adult: 'Bilge Pegasus'
      },
      en: {
        egg: 'Starry Egg',
        baby: 'Baby Pegasus',
        child: 'Little Pegasus',
        teen: 'Wind Pegasus',
        adult: 'Wise Pegasus'
      }
    },
    descriptions: {
      tr: {
        egg: 'Parıldayan yıldız tozlarıyla kaplı bir yumurta. Masal dinledikçe ışıldıyor!',
        baby: 'Sihirli kanatlarıyla ilk uçuşunu yapmaya çalışan şirin bir yavru.',
        child: 'Bulutların üstünde seksek oynamayı çok seven tatlı bir dost.',
        teen: 'Rüzgarlara yön veren, gökkuşağı yeleli cesur bir pegasus.',
        adult: 'Yıldızların bilgeliğini taşıyan, asil ve koruyucu bir pegasus.'
      },
      en: {
        egg: 'An egg covered in shimmering star dust. It glows brighter as you listen!',
        baby: 'A cute baby trying to make its first flight with magical wings.',
        child: 'A sweet friend who loves playing hopscotch on the clouds.',
        teen: 'A brave pegasus with a rainbow mane, guiding the winds.',
        adult: 'A noble and protective pegasus, carrying the wisdom of the stars.'
      }
    },
    messages: {
      tr: {
        egg: [
          'Zzz... Yıldızlar bana güzel rüyalar fısıldıyor. 🌟 Beni uyandırmak için masal dinlemeye devam et!',
          'Alnımdaki boynuzda sihirli bir parıltı hissediyorum... ✨',
          'Masallar benim gücüm! Yumurtadan çıkmama yardım et. 💫'
        ],
        baby: [
          'Merhaba! 🦄 Kanatlarım henüz çok küçük ama seninle uçmayı öğreneceğim!',
          'Şeker gibi tatlı masallar! Çok gıdıklanıyorum! 🍬',
          'Sana eşlik etmek harika. Başka bir masal açalım mı? 🦄'
        ],
        child: [
          'Bulutların üstünde zıplıyorum! ☁️ Bu masalı çok sevdim!',
          'Sen okudukça yelelerim parlıyor, biliyor musun? ✨',
          'En sevdiğim masallar sihirli ve neşeli olanlar! 💫'
        ],
        teen: [
          'Gökkuşağının renklerini gördün mü? 🌈 Rüzgarla birlikte yarışabiliriz!',
          'Seviyemiz yükseldikçe kanatlarım daha güçlü çırpıyor! 🦄',
          'Büyük hayaller kurmak bizi yıldızlara uçurur! ✨'
        ],
        adult: [
          'Sihir ve bilgelik masallarda gizlidir. 🌌 Her zaman senin koruyucun olacağım.',
          'Harika bir okuyucusun! Yıldızlar senin için parlıyor. 💫',
          'Seninle birlikte yeni serüvenlere uçmaya hazırım! 🦄'
        ]
      },
      en: {
        egg: [
          'Zzz... Stars are whispering sweet dreams to me. 🌟 Keep listening to wake me up!',
          'I feel a magical spark in my horn... ✨',
          'Stories are my strength! Help me hatch from my egg. 💫'
        ],
        baby: [
          'Hello! 🦄 My wings are still small, but I will learn to fly with you!',
          'Stories sweet as candy! That tickles! 🍬',
          'It\'s wonderful to accompany you. Shall we play another story? 🦄'
        ],
        child: [
          'Jumping on the clouds! ☁️ I loved this story so much!',
          'Did you know my mane shines brighter when you read? ✨',
          'My favorite stories are the magical and happy ones! 💫'
        ],
        teen: [
          'Did you see the colors of the rainbow? 🌈 We can race with the wind!',
          'My wings flap stronger as our level goes up! 🦄',
          'Dreaming big flies us to the stars! ✨'
        ],
        adult: [
          'Magic and wisdom are hidden in stories. 🌌 I will always be your protector.',
          'You are a wonderful reader! The stars shine for you. 💫',
          'I am ready to fly to new adventures with you! 🦄'
        ]
      }
    }
  }
}

export default function FloatingCompanion() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const { celebration } = useAudioPlayer()

  const isExcludedPage = pathname.startsWith('/login') || 
                         pathname.startsWith('/register') || 
                         pathname.startsWith('/auth') || 
                         pathname.startsWith('/admin') ||
                         pathname.startsWith('/maintenance') ||
                         pathname.startsWith('/suspended')

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [bubbleMessage, setBubbleMessage] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [isTickled, setIsTickled] = useState(false)
  const [showJoyFlight, setShowJoyFlight] = useState(false)
  const joyFlightTimerRef = useRef<NodeJS.Timeout | null>(null)
  const companionRef = useRef<HTMLButtonElement>(null)
  const tickleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const clickCountTimerRef = useRef<NodeJS.Timeout | null>(null)
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const autoCloseIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [autoCloseProgress, setAutoCloseProgress] = useState(100)
  
  const [profileId, setProfileId] = useState<string | null>(null)
  const [pet, setPet] = useState<ProfilePet | null>(null)
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isFreeTier, setIsFreeTier] = useState<boolean | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Character selection states
  const [selectedType, setSelectedType] = useState<'dragon' | 'pegasus' | null>(null)
  const [customName, setCustomName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)

  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)

  const activeLang = (language === 'tr' || language === 'en') ? language : 'tr'
  const dict = dictionaries[activeLang]

  // activePet buraya alındı — useEffect bağımlılık dizilerinde TDZ hatası oluşmaması için
  // tüm hook'lardan önce tanımlanması gerekiyor.
  const activePet = pet || {
    pet_name: '',
    xp: 0,
    level: 1,
    stage: 'egg',
    pet_type: null as 'dragon' | 'pegasus' | null
  }

  // Restore position and minimized status from localStorage
  useEffect(() => {
    if (isExcludedPage) return
    const savedX = localStorage.getItem('companion-x')
    const savedY = localStorage.getItem('companion-y')
    if (savedX !== null) dragX.set(parseFloat(savedX))
    if (savedY !== null) dragY.set(parseFloat(savedY))

    const savedMinimized = localStorage.getItem('companion-minimized')
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === 'true')
    }
  }, [isExcludedPage, dragX, dragY])

  // Listen to global celebration events to update pet and badge states instantly
  useEffect(() => {
    console.log('[COMPANION] celebration hook triggered. Celebration:', celebration)
    if (celebration) {
      if (celebration.petStats) {
        console.log('[COMPANION] Updating pet stats from celebration:', celebration.petStats)
        setPet(prev => {
          // If we already have a newer or same level/XP in memory, don't revert it
          if (prev && prev.xp > celebration.petStats!.xp) {
            console.log('[COMPANION] Skipping celebration update: local XP is higher. Local:', prev.xp, 'Celebration:', celebration.petStats!.xp)
            return prev
          }
          const updated: ProfilePet = {
            pet_name: prev?.pet_name || 'Sihirli Arkadaş',
            xp: celebration.petStats!.xp,
            level: celebration.petStats!.level,
            stage: celebration.petStats!.stage,
            pet_type: prev?.pet_type || 'dragon'
          }
          console.log('[COMPANION] setPet updated state from celebration:', updated)
          return updated
        })
      }
      if (celebration.newlyEarnedBadges && celebration.newlyEarnedBadges.length > 0) {
        console.log('[COMPANION] Updating badges from celebration:', celebration.newlyEarnedBadges)
        setEarnedBadges(prev => {
          const existingIds = new Set(prev.map(b => b.badge_id))
          const newBadges = celebration.newlyEarnedBadges!
            .filter(nb => !existingIds.has(nb.id))
            .map(nb => ({
              badge_id: nb.id,
              badges: {
                title: nb.title,
                icon: nb.icon
              }
            }))
          return [...prev, ...newBadges]
        })
      }
    }
  }, [celebration])

  // Adult aşamada kutlama gelince tam ekran sevinç uçuşu
  useEffect(() => {
    if (celebration && activePet.stage === 'adult' && pet?.pet_type) {
      if (joyFlightTimerRef.current) clearTimeout(joyFlightTimerRef.current)
      setShowJoyFlight(true)
      joyFlightTimerRef.current = setTimeout(() => {
        setShowJoyFlight(false)
      }, 3500)
    }
  }, [celebration, activePet.stage, pet?.pet_type])

  // Fetch companion data on mount
  useEffect(() => {
    if (isExcludedPage) return

    const supabase = createClient()
    let isMounted = true

    const loadData = async () => {
      if (isMounted) setIsLoadingData(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          if (isMounted) setIsAuthenticated(false)
          return
        }

        if (isMounted) setIsAuthenticated(true)

        // Fetch plan status efficiently
        let planId = 'free'
        try {
          const { data: sub, error: subError } = await supabase
            .from('subscriptions')
            .select('plan_id, current_period_end')
            .eq('user_id', user.id)
            .maybeSingle()

          if (!subError && sub) {
            const now = new Date()
            const isExpired = sub.current_period_end ? new Date(sub.current_period_end) < now : true
            planId = (!isExpired && sub.plan_id) ? sub.plan_id : 'free'
          }
        } catch (err) {
          console.error('[COMPANION] Plan fetch error:', err)
        }

        if (planId === 'free') {
          if (isMounted) {
            setIsFreeTier(true)
          }
          return
        } else {
          if (isMounted) {
            setIsFreeTier(false)
          }
        }

        // Fetch profile
        let { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', user.id)
          .limit(1)
          .maybeSingle()

        if (!profile && !profileError) {
          try {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                user_id: user.id,
                name: 'Küçük Kahraman',
                age: 5
              })
              .select('id')
              .single()

            if (!createError && newProfile) {
              profile = newProfile
            }
          } catch (createErr) {
            console.error('[COMPANION] Auto-create profile failed:', createErr)
          }
        }

        if (profileError || !profile) {
          return
        }

        if (isMounted) setProfileId(profile.id)

        // Fetch pet & badges
        const [petResult, badgesResult] = await Promise.all([
          supabase.from('profile_pets').select('pet_name, xp, level, stage, pet_type').eq('profile_id', profile.id).maybeSingle(),
          supabase.from('profile_badges').select('badge_id, badges(icon, title)').eq('profile_id', profile.id)
        ])

        if (!isMounted) return

        if (petResult.data) {
          setPet(petResult.data as ProfilePet)
        }
        if (badgesResult.data) {
          const formatted = (badgesResult.data as any[]).map(item => ({
            badge_id: item.badge_id,
            badges: Array.isArray(item.badges) ? item.badges[0] : item.badges
          }))
          setEarnedBadges(formatted)
        }
      } catch (err) {
        console.error('[COMPANION] loadData error:', err)
      } finally {
        if (isMounted) setIsLoadingData(false)
      }
    }

    loadData()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        loadData()
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          setIsAuthenticated(false)
          setProfileId(null)
          setPet(null)
          setEarnedBadges([])
          setIsFreeTier(null)
          setIsLoadingData(false)
        }
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [isExcludedPage])

  // Real-time updates
  useEffect(() => {
    if (!profileId || isExcludedPage) return

    const supabase = createClient()
    console.log('[COMPANION] Initializing real-time channel subscriptions for profileId:', profileId)

    const petChannel = supabase
      .channel(`profile_pets_${profileId}`)
      .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'profile_pets',
            filter: `profile_id=eq.${profileId}`
          },
          (payload) => {
            console.log('[COMPANION] Realtime pet update payload received:', payload)
            if (payload.new) {
              const newPet = payload.new as any
              
              // If the payload has missing crucial columns (which happens if REPLICA IDENTITY FULL is not enabled on Postgres),
              // we should ignore or log it to prevent state corruption.
              if (newPet.xp === undefined || newPet.stage === undefined || newPet.level === undefined) {
                console.warn('[COMPANION] Realtime payload is missing columns. Ensure REPLICA IDENTITY FULL is enabled. Payload:', newPet)
                return
              }

              setPet(prev => {
                // Ensure we don't overwrite with older data (race condition protection)
                if (prev && prev.xp > newPet.xp) {
                  console.log('[COMPANION] Skipping Realtime update: current local XP is higher. Local:', prev.xp, 'Realtime:', newPet.xp)
                  return prev
                }
                const updated: ProfilePet = {
                  pet_name: newPet.pet_name || prev?.pet_name || 'Sihirli Arkadaş',
                  xp: newPet.xp,
                  level: newPet.level,
                  stage: newPet.stage,
                  pet_type: newPet.pet_type || prev?.pet_type || 'dragon'
                }
                console.log('[COMPANION] setPet updated state from Realtime:', updated)
                return updated
              })
            }
          }
      )
      .subscribe((status) => {
        console.log(`[COMPANION] Realtime pet subscription status:`, status)
      })

    const badgesChannel = supabase
      .channel(`profile_badges_${profileId}`)
      .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'profile_badges',
            filter: `profile_id=eq.${profileId}`
          },
          async (payload) => {
            console.log('[COMPANION] Realtime badge INSERT payload received:', payload)
            if (!payload.new || !payload.new.id) return

            const { data: badgeData, error } = await supabase
              .from('profile_badges')
              .select('badge_id, badges(icon, title)')
              .eq('id', payload.new.id)
              .single()
            
            if (error) {
              console.error('[COMPANION] Error fetching newly earned badge details:', error)
              return
            }

            if (badgeData) {
              const formatted: Badge = {
                badge_id: (badgeData as any).badge_id,
                badges: Array.isArray((badgeData as any).badges) ? (badgeData as any).badges[0] : (badgeData as any).badges
              }
              console.log('[COMPANION] Formatting newly earned badge details:', formatted)
              setEarnedBadges(prev => {
                if (prev.some(b => b.badge_id === formatted.badge_id)) return prev
                return [...prev, formatted]
              })
            }
          }
      )
      .subscribe((status) => {
        console.log(`[COMPANION] Realtime badges subscription status:`, status)
      })

    return () => {
      console.log('[COMPANION] Unsubscribing from real-time channels for profile:', profileId)
      supabase.removeChannel(petChannel)
      supabase.removeChannel(badgesChannel)
    }
  }, [profileId, isExcludedPage])


  const getPetStageName = (stage: string, type: 'dragon' | 'pegasus') => {
    const activeType = (type === 'dragon' || type === 'pegasus') ? type : 'dragon'
    return companionData[activeType]?.stages[activeLang]?.[stage as 'egg' | 'baby' | 'child' | 'teen' | 'adult'] || stage
  }

  const petName = pet?.pet_name || getPetStageName(activePet.stage, activePet.pet_type || 'dragon')

  const getMotivationalMessage = (stage: string, type: 'dragon' | 'pegasus', clickNum: number) => {
    const activeType = (type === 'dragon' || type === 'pegasus') ? type : 'dragon'
    if (clickNum > 3) {
      return activeLang === 'tr' 
        ? 'Haha! Gıdıklanıyorum! Lütfen dur, okumaya odaklanalım! 😄'
        : 'Haha! That tickles! Please stop, let\'s focus on reading! 😄'
    }

    const messages = companionData[activeType]?.messages[activeLang]?.[stage as 'egg' | 'baby' | 'child' | 'teen' | 'adult'] || []
    if (messages.length === 0) {
      return '...'
    }
    const randomIndex = Math.floor(Math.random() * messages.length)
    return messages[randomIndex]
  }

  useEffect(() => {
    if (pet && pet.pet_type) {
      setBubbleMessage(getMotivationalMessage(pet.stage, pet.pet_type as 'dragon' | 'pegasus', 0))
    }
  }, [pet?.stage, pet?.pet_type, activeLang])

  // --- Auto-close 8s timer + click outside ---
  const startAutoCloseTimer = useCallback(() => {
    // Clear any existing timers
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)
    if (autoCloseIntervalRef.current) clearInterval(autoCloseIntervalRef.current)

    const DURATION_MS = 8000
    const TICK_MS = 80
    let elapsed = 0
    setAutoCloseProgress(100)

    autoCloseIntervalRef.current = setInterval(() => {
      elapsed += TICK_MS
      const remaining = Math.max(0, 100 - (elapsed / DURATION_MS) * 100)
      setAutoCloseProgress(remaining)
    }, TICK_MS)

    autoCloseTimerRef.current = setTimeout(() => {
      if (autoCloseIntervalRef.current) clearInterval(autoCloseIntervalRef.current)
      setIsOpen(false)
      setAutoCloseProgress(100)
    }, DURATION_MS)
  }, [])

  const cancelAutoCloseTimer = useCallback(() => {
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)
    if (autoCloseIntervalRef.current) clearInterval(autoCloseIntervalRef.current)
    setAutoCloseProgress(100)
  }, [])

  // Start/stop timer when card opens/closes
  useEffect(() => {
    if (isOpen && !isMinimized) {
      startAutoCloseTimer()
    } else {
      cancelAutoCloseTimer()
    }
    return () => cancelAutoCloseTimer()
  }, [isOpen, isMinimized, startAutoCloseTimer, cancelAutoCloseTimer])

  // NOT: Click-outside artık document.addEventListener yerine
  // JSX'teki şeffaf backdrop div ile yönetiliyor (Framer Motion drag ile çakışmıyor).

  useEffect(() => {
    if (isMinimized || (activePet.stage !== 'teen' && activePet.stage !== 'adult')) {
      setEyeOffset({ x: 0, y: 0 })
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!companionRef.current) return
      const rect = companionRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.hypot(dx, dy)
      
      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 })
      } else {
        const maxOffset = 3
        const factor = Math.min(maxOffset, distance * 0.02) / distance
        setEyeOffset({
          x: dx * factor,
          y: dy * factor
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMinimized, activePet.stage])

  if (isExcludedPage || isAuthenticated === null || isAuthenticated === false || isFreeTier === true || isLoadingData) {
    return null
  }

  const handleRandomizeName = () => {
    if (!selectedType) return
    const suggestions = {
      dragon: activeLang === 'tr' 
        ? ['Alev', 'Kıvılcım', 'Ejder', 'Poyraz', 'Gölge', 'Fırtına', 'Boran'] 
        : ['Ember', 'Spark', 'Drake', 'Shadow', 'Storm', 'Blaze', 'Ignis'],
      pegasus: activeLang === 'tr' 
        ? ['Yıldız', 'Pırıltı', 'Bulut', 'Gökkuşağı', 'Luna', 'Sihir', 'Masal'] 
        : ['Star', 'Twinkle', 'Cloud', 'Rainbow', 'Luna', 'Magic', 'Fable']
    }
    const list = suggestions[selectedType]
    const randomName = list[Math.floor(Math.random() * list.length)]
    setCustomName(randomName)
  }

  const handleInitialize = async () => {
    if (!selectedType || !customName.trim()) return
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/gamification/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petType: selectedType, petName: customName.trim() })
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        setSubmitError(data.message || (activeLang === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.'))
      } else {
        setPet(data.pet)
      }
    } catch (err: any) {
      setSubmitError(activeLang === 'tr' ? 'Sunucu bağlantı hatası.' : 'Server connection error.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const playMagicalChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 (Arpeggio)
      const now = ctx.currentTime
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + index * 0.1)
        gain.gain.setValueAtTime(0.15, now + index * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.4)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + index * 0.1)
        osc.stop(now + index * 0.1 + 0.4)
      })
    } catch (e) {
      console.error('Audio synthesis failed:', e)
    }
  }

  const handlePetClick = () => {
    if (!pet || !pet.pet_type) return

    if (tickleTimerRef.current) clearTimeout(tickleTimerRef.current)
    setIsTickled(true)
    tickleTimerRef.current = setTimeout(() => setIsTickled(false), 600)

    if (['child', 'teen', 'adult'].includes(activePet.stage)) {
      playMagicalChime()
    }

    if (clickCountTimerRef.current) clearTimeout(clickCountTimerRef.current)
    setClickCount(prev => {
      const next = prev + 1
      setBubbleMessage(getMotivationalMessage(activePet.stage, pet.pet_type as 'dragon' | 'pegasus', next))
      return next
    })
    clickCountTimerRef.current = setTimeout(() => setClickCount(0), 4000)

    setIsOpen(true)

    const emojis = ['✨', '❤️', '🌟', '💖', '⭐']
    const newParticles: Particle[] = Array.from({ length: 5 }).map(() => {
      const id = particleIdRef.current++
      return {
        id,
        x: Math.random() * 40 - 20,
        y: Math.random() * -20 - 10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      }
    })

    setParticles(prev => [...prev, ...newParticles])
  }

  const handleDragEnd = () => {
    localStorage.setItem('companion-x', dragX.get().toString())
    localStorage.setItem('companion-y', dragY.get().toString())
  }

  const handleToggleMinimize = () => {
    const newVal = !isMinimized
    setIsMinimized(newVal)
    localStorage.setItem('companion-minimized', String(newVal))
  }

  // Display mandatory Character Selection Screen if pet type is not selected yet
  if (!pet || !pet.pet_type) {
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[10000] flex items-center justify-center p-4 overflow-y-auto pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-slate-900/90 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 max-w-3xl w-full shadow-2xl flex flex-col items-center text-white relative overflow-hidden"
        >
          {/* Shimmer background glow */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-center gap-2.5 mb-2">
            <Sparkles className="text-sky-400 animate-pulse" size={24} />
            <h1 className="text-2xl md:text-3xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-pink-400 to-indigo-400 tracking-tight">
              {activeLang === 'tr' ? 'Kitap Okuma Arkadaşını Seç' : 'Choose Your Reading Companion'}
            </h1>
          </div>
          
          <p className="text-sm md:text-base text-slate-300 max-w-lg text-center leading-relaxed mb-8 font-medium">
            {activeLang === 'tr' 
              ? 'Hikayeleri dinledikçe arkadaşını büyütecek, onun yeni formlarını keşfedeceksin! Hemen bir yol seç ve ona isim ver.' 
              : 'Grow your companion as you listen to stories, discovering new forms! Choose a path and name your friend.'}
          </p>

          {/* Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            {/* Dragon Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedType('dragon')
                setCustomName('')
              }}
              className={`relative rounded-3xl p-6 border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4 ${
                selectedType === 'dragon'
                  ? 'bg-gradient-to-b from-rose-500/20 to-red-500/10 border-rose-500 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="w-24 h-24 flex items-center justify-center relative">
                <DragonCompanion stage="egg" />
              </div>
              <div className="text-center">
                <h3 className="font-black text-lg md:text-xl text-rose-300">
                  {activeLang === 'tr' ? 'Ejderha Yolu' : 'Dragon Path'}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
                  {activeLang === 'tr' ? 'Macera ve Cesaret' : 'Adventure & Courage'}
                </span>
                <p className="text-xs text-slate-400 mt-2 max-w-[200px] leading-relaxed">
                  {activeLang === 'tr' 
                    ? 'Macera sever erkek ve kız çocukları için güç ve bilgelik yolu.' 
                    : 'A path of strength and wisdom for adventure-loving kids.'}
                </p>
              </div>
            </motion.div>

            {/* Pegasus Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedType('pegasus')
                setCustomName('')
              }}
              className={`relative rounded-3xl p-6 border-2 cursor-pointer transition-all duration-300 flex flex-col items-center gap-4 ${
                selectedType === 'pegasus'
                  ? 'bg-gradient-to-b from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.25)]'
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="w-24 h-24 flex items-center justify-center relative">
                <PegasusCompanion stage="egg" />
              </div>
              <div className="text-center">
                <h3 className="font-black text-lg md:text-xl text-fuchsia-300">
                  {activeLang === 'tr' ? 'Pegasus Yolu' : 'Pegasus Path'}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
                  {activeLang === 'tr' ? 'Sihir ve Sevgi' : 'Magic & Love'}
                </span>
                <p className="text-xs text-slate-400 mt-2 max-w-[200px] leading-relaxed">
                  {activeLang === 'tr' 
                    ? 'Hayal gücü yüksek kız ve erkek çocukları için sevgi ve sihir yolu.' 
                    : 'A path of love and magic for imaginative kids.'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Name Inputs */}
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 mt-8 w-full max-w-md"
            >
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                {activeLang === 'tr' ? 'Arkadaşının Adı' : 'Companion\'s Name'}
              </label>
              <div className="flex gap-2 w-full max-w-sm relative">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={activeLang === 'tr' ? 'Örn: Alev, Luna...' : 'e.g. Ember, Luna...'}
                  maxLength={20}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 text-center focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-transparent placeholder-slate-500 font-semibold tracking-wide text-lg shadow-inner transition-all pr-12"
                />
                <button
                  onClick={handleRandomizeName}
                  type="button"
                  title={activeLang === 'tr' ? 'Rastgele İsim' : 'Random Name'}
                  className="absolute right-3 top-3.5 p-1 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white rounded-lg transition-all"
                >
                  <Sparkles size={18} />
                </button>
              </div>
              
              {submitError && (
                <p className="text-xs text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
                  {submitError}
                </p>
              )}

              <button
                onClick={handleInitialize}
                disabled={isSubmitting || customName.trim().length === 0}
                className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-base py-4 px-12 rounded-2xl shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none mt-4 tracking-wider uppercase flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                    {activeLang === 'tr' ? 'Hazırlanıyor...' : 'Preparing...'}
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    {activeLang === 'tr' ? 'Yumurtayı Seç ve Başlat' : 'Hatch & Start'}
                  </>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    )
  }

  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* 🎉 Adult aşama: Tam ekran sevinç uçuşu overlay */}
      <AnimatePresence>
        {showJoyFlight && pet?.pet_type && (
          <motion.div
            key="joy-flight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Arka plan gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-transparent" />

            {/* Uçan kıvılcımlar */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl select-none pointer-events-none"
                initial={{
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                  scale: 0.5
                }}
                animate={{
                  x: (Math.random() - 0.5) * window.innerWidth * 1.4,
                  y: -window.innerHeight * 0.6 - Math.random() * 200,
                  opacity: 0,
                  scale: Math.random() * 1.5 + 0.5,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2.5 + Math.random() * 1.5,
                  delay: Math.random() * 0.8,
                  ease: 'easeOut'
                }}
              >
                {['✨', '⭐', '🌟', '💫', '🔥', '💥', '🌈', '❤️', '🎇'][i % 9]}
              </motion.div>
            ))}

            {/* Merkezdeki büyük karakter */}
            <motion.div
              initial={{ scale: 0.2, y: 300, opacity: 0, rotate: -15 }}
              animate={{
                scale: [0.2, 1.6, 1.3, 1.7, 1.4, 1.6],
                y: [300, -80, 20, -100, -20, -60],
                opacity: [0, 1, 1, 1, 1, 0.8],
                rotate: [-15, 10, -8, 6, -4, 0]
              }}
              exit={{ scale: 0.4, y: -300, opacity: 0 }}
              transition={{ duration: 3.2, ease: 'easeInOut' }}
              className="relative z-10"
            >
              {/* Glow halkası */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className={`absolute inset-0 rounded-full blur-3xl pointer-events-none ${
                  pet.pet_type === 'dragon'
                    ? 'bg-orange-500/50'
                    : 'bg-purple-500/50'
                }`}
              />
              <div className="w-64 h-64">
                {pet.pet_type === 'dragon' ? (
                  <DragonCompanion stage="adult" isHappy={true} />
                ) : (
                  <PegasusCompanion stage="adult" isHappy={true} />
                )}
              </div>
            </motion.div>

            {/* Alt mesaj */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            >
              <p className="text-white font-black text-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] select-none">
                {pet.pet_type === 'dragon'
                  ? (activeLang === 'tr' ? '🔥 Raaarr! Masal tamamlandı!' : '🔥 Raaarr! Story complete!')
                  : (activeLang === 'tr' ? '✨ Muhteşem! Masal tamamlandı!' : '✨ Magnificent! Story complete!')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Şeffaf backdrop: popup açıkken dışarı tıklandığında kapatır.
          document.addEventListener yerine React onClick kullanılıyor →
          Framer Motion drag sistemiyle çakışmaz, yumurta yerinden oynamaz. */}
      {isOpen && !isMinimized && (
        <div
          className="fixed inset-0 z-[9997]"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]">
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className="pointer-events-auto absolute bottom-24 right-6 select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none', x: dragX, y: dragY }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >

          {/* Yumurta/Karakter butonu — flex-col-reverse'de DOM'da İLK = görsel olarak ALTTA sabit.
              Kart (AnimatePresence) DOM'da ikinci olduğu için görsel olarak ÜSTTE büyüyüp küçülür.
              Böylece kart açılıp kapanırken yumurta kesinlikle yerinden oynamaz. */}
          <div className="relative flex items-center gap-2">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: p.x, y: p.y - 60 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute text-lg pointer-events-none select-none z-50 left-8 top-8"
              >
                {p.emoji}
              </motion.span>
            ))}

            {isMinimized ? (
              // Mini sleeping orb when minimized
              <motion.button
                onClick={() => handleToggleMinimize()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center cursor-pointer pointer-events-auto relative group overflow-hidden"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full bg-indigo-500/20 pointer-events-none"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.span
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], y: [-5, -20], x: [0, 3, -3], scale: [0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0 }}
                    className="absolute text-[10px] font-black text-indigo-200"
                    style={{ top: '10px', left: '15px' }}
                  >
                    z
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], y: [-8, -25], x: [0, -3, 3], scale: [0.5, 1.2] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }}
                    className="absolute text-xs font-black text-purple-200"
                    style={{ top: '8px', left: '22px' }}
                  >
                    Z
                  </motion.span>
                </div>
                <div className="text-xl filter drop-shadow-md select-none group-hover:scale-110 transition-transform">
                  💤
                </div>
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Maximize2 size={14} className="text-white" />
                </div>
              </motion.button>
            ) : (
              // Full vector companion render
              <motion.button
                ref={companionRef}
                onClick={handlePetClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer pointer-events-auto flex items-center justify-center select-none bg-transparent border-0 outline-none p-0 focus:outline-none"
              >
                <motion.div
                  animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-sky-400/20 to-indigo-500/20 blur-xl pointer-events-none"
                />
                {activePet.pet_type === 'dragon' ? (
                  <DragonCompanion
                    stage={activePet.stage}
                    isTickled={isTickled}
                    isHappy={celebration !== null}
                    eyeOffset={eyeOffset}
                  />
                ) : (
                  <PegasusCompanion
                    stage={activePet.stage}
                    isTickled={isTickled}
                    isHappy={celebration !== null}
                    eyeOffset={eyeOffset}
                  />
                )}
              </motion.button>
            )}
          </div>

          {/* Kart — flex-col-reverse'de DOM'da İKİNCİ = görsel olarak ÜSTTE. Yumurtanın üzerine açılır. */}
          <AnimatePresence>
            {isOpen && !isMinimized && (
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="w-72 p-5 flex flex-col gap-3.5 pointer-events-auto absolute bottom-full mb-4 right-0 group rounded-[3rem_3rem_0.5rem_3rem] transition-all duration-300 border-2 z-50"
                style={{
                  background: '#ffffff',
                  borderColor: 'rgba(10, 22, 40, 0.1)',
                  color: '#0a1628',
                  boxShadow: '0 20px 45px rgba(10, 22, 40, 0.12)',
                }}
                onMouseEnter={cancelAutoCloseTimer}
                onMouseLeave={startAutoCloseTimer}
              >
                {/* Speech Bubble Tail */}
                <div
                  className="absolute -bottom-2.5 right-8 w-5 h-5 rotate-45 border-r-2 border-b-2 z-0"
                  style={{
                    background: '#ffffff',
                    borderColor: 'rgba(10, 22, 40, 0.1)',
                  }}
                />

                {/* Pinned Badges Cluster */}
                {earnedBadges.length > 0 && (
                  <div className="absolute -top-4 -left-3 z-30 flex -space-x-1.5 select-none">
                    {earnedBadges.slice(0, 3).map((badge, idx) => (
                      <div
                        key={badge.badge_id}
                        style={{ rotate: `${-12 + idx * 8}deg` }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-white flex items-center justify-center text-sm shadow-md cursor-help relative hover:scale-110 hover:z-40 transition-all"
                        title={badge.badges?.title}
                      >
                        {/* Only show the pin on the first badge */}
                        {idx === 0 && (
                          <div className="absolute -top-2.5 -left-2 w-6 h-6 rotate-12 z-10 pointer-events-none">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 6L15 15" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                              <path d="M7 7L11 11" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                              <circle cx="5" cy="5" r="4.5" fill="url(#pinHeadRadial)" />
                              <circle cx="4" cy="4" r="1.5" fill="#ffa4b4" />
                              <defs>
                                <radialGradient id="pinHeadRadial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4 4) rotate(45) scale(6)">
                                  <stop stopColor="#ff4b72" />
                                  <stop offset="0.7" stopColor="#e11d48" />
                                  <stop offset="1" stopColor="#9f1239" />
                                </radialGradient>
                              </defs>
                            </svg>
                          </div>
                        )}
                        <span>{badge.badges?.icon || '🏆'}</span>
                      </div>
                    ))}
                    {earnedBadges.length > 3 && (
                      <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] font-black text-slate-300 self-end -mb-1 shadow-sm relative z-20">
                        +{earnedBadges.length - 3}
                      </div>
                    )}
                  </div>
                )}

                {/* Minimal hover-only buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={() => handleToggleMinimize()}
                    title={activeLang === 'tr' ? 'Küçült' : 'Minimize'}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all hover:scale-105 active:scale-95"
                    style={{ color: '#0a1628' }}
                  >
                    <Minimize2 size={12} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title={activeLang === 'tr' ? 'Kapat' : 'Close'}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all hover:scale-105 active:scale-95"
                    style={{ color: '#0a1628' }}
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2.5 z-10">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-600">
                    <Sparkles size={13} className="animate-pulse" /> {petName}
                  </div>
                  <div 
                    className="text-[10px] font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full"
                    style={{ color: '#0a1628' }}
                  >
                    {getPetStageName(activePet.stage, activePet.pet_type || 'dragon')}
                  </div>
                </div>

                <p 
                  className="text-xs leading-relaxed font-medium pr-12 z-10 text-left"
                  style={{ color: '#0a1628' }}
                >
                  {bubbleMessage}
                </p>

                <div 
                  className="p-3 rounded-2xl flex flex-col gap-2 border z-10"
                  style={{
                    background: 'rgba(10, 22, 40, 0.05)',
                    borderColor: 'rgba(10, 22, 40, 0.08)',
                  }}
                >
                  <div 
                    className="flex justify-between items-center text-[10px] font-black"
                    style={{ color: '#0a1628' }}
                  >
                    <span>{dict.gamification?.level || 'Level'} {activePet.level}</span>
                    <span>{activePet.xp} / {getLevelProgress(activePet.xp, activePet.level).maxXp} XP</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden border bg-slate-100 border-slate-200/40">
                    <div
                      className="bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      style={{ width: `${getLevelProgress(activePet.xp, activePet.level).percentage}%` }}
                    />
                  </div>
                </div>

                {/* Auto-close countdown progress bar */}
                <div className="w-full h-0.5 bg-slate-100 rounded-full overflow-hidden mt-1 z-10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500/60 to-indigo-500/40"
                    style={{ width: `${autoCloseProgress}%` }}
                    transition={{ duration: 0.08 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}

