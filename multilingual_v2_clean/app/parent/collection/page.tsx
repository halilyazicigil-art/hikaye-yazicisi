import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { getDictionary } from '@/utils/getDictionary'
import CollectionClient from '@/components/CollectionClient'
import { QuotaService } from '@/services/QuotaService'
import { Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Koleksiyon Odası | LumiBook',
  description: 'Çocuğunuzun okuma arkadaşını büyütün ve kazandığı başarı rozetlerini görüntüleyin.',
}

export default async function CollectionPage() {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'tr'
  const dict = await getDictionary(language as 'tr' | 'en')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1) Get user subscription plan and verify paid access
  const quota = await QuotaService.getUserQuotaStats(supabase, user.id)
  const isFree = quota.planId === 'free'

  // 2) Get or auto-create child profile
  let { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!profile) {
    const adminSupabase = await createAdminClient()
    const { data: newProfile, error: createError } = await adminSupabase
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
  }

  // If subscription is free, display a premium upsell screen instead of redirecting or rendering features
  if (isFree) {
    const isTr = language === 'tr'
    return (
      <div className="min-h-screen bg-[#BDD9F2] font-nunito p-4 sm:p-8 flex items-center justify-center">
        <div className="max-w-xl w-full space-y-6">
          <div className="flex justify-start">
            <Link 
              href="/parent" 
              className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-slate-700 rounded-2xl transition shadow-sm border border-white/40 font-bold text-sm active:scale-95"
            >
              <ArrowLeft size={16} />
              {isTr ? 'Geri Dön' : 'Go Back'}
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50 text-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Lock / Premium Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg border-2 border-white text-white">
              <Lock size={36} className="animate-pulse" />
            </div>

            <h1 className="text-2xl md:text-3xl font-lora font-black text-slate-800 tracking-tight mb-4 animate-fade-in">
              {isTr ? '🔒 Premium Özellik: Koleksiyon Odası' : '🔒 Premium Feature: Collection Room'}
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium mb-8 max-w-md mx-auto">
              {isTr 
                ? 'Okuma Arkadaşı (LumiCompanion) ve Başarı Rozetleri özellikleri sadece Gümüş Gökyüzü ve Altın Güneş abonelerimize özeldir. Bu özellikleri kullanmak istiyorsan abonelik satın al.'
                : 'Reading Companion (LumiCompanion) and Achievement Badges features are exclusive to our Silver Sky and Golden Sun subscribers. If you want to use these features, please purchase a subscription.'}
            </p>

            <div className="space-y-4">
              <Link 
                href="/settings"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-2xl font-black text-base shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isTr ? 'Abonelik Paketlerini İncele' : 'Review Subscription Plans'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    redirect('/parent')
  }

  // 3) Get pet details
  const { data: pet } = await supabase
    .from('profile_pets')
    .select('pet_name, xp, level, stage')
    .eq('profile_id', profile.id)
    .maybeSingle()

  // 4) Get all badges
  const { data: badges } = await supabase
    .from('badges')
    .select('id, title, description, icon, milestone')
    .order('milestone', { ascending: true })

  // 5) Get earned badges
  const { data: earnedBadges } = await supabase
    .from('profile_badges')
    .select('badge_id, earned_at')
    .eq('profile_id', profile.id)

  const earnedBadgeIds = (earnedBadges || []).map((b) => b.badge_id)
  const earnedBadgeDates = (earnedBadges || []).reduce((acc, curr) => {
    acc[curr.badge_id] = curr.earned_at
    return acc
  }, {} as Record<string, string>)

  // 6) Get private listens count
  const { count: privateListensCount } = await supabase
    .from('profile_story_activity')
    .select('*', { count: 'exact', head: true })
    .eq('profile_id', profile.id)
    .in('source', ['parent', 'parent_private'])

  return (
    <CollectionClient
      lang={language as 'tr' | 'en'}
      translations={dict}
      pet={pet}
      badges={badges || []}
      earnedBadgeIds={earnedBadgeIds}
      earnedBadgeDates={earnedBadgeDates}
      privateListensCount={privateListensCount || 0}
    />
  )
}
