import { BookHeart, Plus, Settings, Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

async function getQuotaStats(supabase: any, profileIds: string[], sub: any, isPro: boolean, isPremium: boolean) {
  let usedStories = 0
  if (profileIds.length > 0) {
    // Bu ay üretilen masallar (Kota hesabı için - Faturalandırma döngüsüne uygun)
    let startDate = new Date()
    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    if (sub?.current_period_end) {
      startDate = new Date(sub.current_period_end)
      startDate.setDate(startDate.getDate() - 30)
    }
    
    const { data: monthStories } = await supabase
      .from('stories')
      .select('id, audio_url')
      .in('profile_id', profileIds)
      .gte('created_at', startDate.toISOString())
      
    usedStories = monthStories?.length || 0
    const usedVoiceStories = monthStories?.filter((s: any) => s.audio_url).length || 0

    const storyLimit = isPremium ? 80 : (isPro ? 40 : 3)
    const voiceLimit = isPremium ? 40 : (isPro ? 20 : 1)

    const remainingText = `${Math.max(0, storyLimit - usedStories)} / ${storyLimit}`
    const remainingVoiceText = `${Math.max(0, voiceLimit - usedVoiceStories)} / ${voiceLimit}`

    return { usedStories, usedVoiceStories, storyLimit, voiceLimit, remainingText, remainingVoiceText }
  }
  return { usedStories: 0, usedVoiceStories: 0, storyLimit: 3, voiceLimit: 1, remainingText: '0 / 3', remainingVoiceText: '0 / 1' }
}

export default async function ParentDashboard({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Next.js 15 searchParams resolution
  const params = await searchParams
  const success = params?.success
  const plan = params?.plan as string

  // WEBHOOK BYPASS: If returning from Stripe Checkout successfully
  if (success === 'true' && typeof plan === 'string') {
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    await supabaseAdmin.from('subscriptions').upsert({
      user_id: user.id,
      status: 'active',
      plan_id: plan,
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }, { onConflict: 'user_id' })
  }

  const { data: sub } = await supabase.from('subscriptions').select('plan_id, status, current_period_end').eq('user_id', user.id).maybeSingle()
  const isPro = sub?.plan_id === 'pro'
  const isPremium = sub?.plan_id === 'premium'

  const { data: profiles } = await supabase.from('profiles').select('id, name').eq('user_id', user.id)
  const profileIds = profiles?.map(p => p.id) || []

  let recentStories: any[] = []
  if (profileIds.length > 0) {
    const { data: stories } = await supabase
      .from('stories')
      .select('id, title, created_at, profiles(name)')
      .in('profile_id', profileIds)
      .order('created_at', { ascending: false })
      .limit(10)
    
    recentStories = stories || []
  }

  const { remainingText, remainingVoiceText } = await getQuotaStats(supabase, profileIds, sub, isPro, isPremium)

  return (
    <div className="min-h-screen bg-[#fdfaf3] font-nunito p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-amber-900/10">
          <div>
            <h1 className="text-3xl font-lora font-bold text-[#2d2d2d] tracking-tight">Ebeveyn Kontrol Paneli</h1>
            <p className="text-gray-500 mt-1">Çocuklarınızın masal dünyasını buradan yönetin.</p>
          </div>
          <div className="flex gap-4 items-center">
            {isPremium && (
               <span className="hidden sm:inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold border border-purple-200">
                 👑 Kraliçe Arı
               </span>
            )}
            {isPro && !isPremium && (
               <span className="hidden sm:inline-flex items-center bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold border border-amber-200">
                 🍯 Tatlı Bal
               </span>
            )}
            {user.email === 'halilibrahimyazicigil@gmail.com' && (
              <Link href="/admin" className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-bold shadow-sm">
                Admin
              </Link>
            )}
            <Link href="/settings" className="p-3 bg-[#fdfaf3] text-[#b3593b] rounded-xl hover:bg-[#f4e8d3] transition border border-[#e6b17e]/30">
              <Settings size={24} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Quick Actions */}
          <div className="space-y-8">
            {/* Quick Create Action */}
            <div className="bg-[#b3593b] p-8 rounded-[2rem] text-white shadow-xl shadow-amber-900/20 relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#d97c59] rounded-full mix-blend-screen filter blur-[40px] opacity-40"></div>
              <h2 className="text-2xl font-lora font-bold mb-2 relative z-10">Yeni Masal Yarat!</h2>
              <p className="text-amber-100 mb-6 relative z-10">Yapay zeka destekli yeni bir macera oluşturmak için hemen başlayın.</p>
              <Link href="/#create" className="flex items-center justify-center w-full py-4 bg-white text-[#b3593b] rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-md relative z-10">
                <Plus size={24} className="mr-2" />
                Masal Oluştur
              </Link>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-900/10 space-y-4">
              <h3 className="font-bold text-gray-900 text-lg border-b border-amber-100 pb-4">Aylık İstatistikler</h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-[#fdfaf3] border border-amber-100 rounded-2xl">
                  <div className="flex items-center text-[#8c462e] font-semibold">
                    <BookHeart className="mr-3" size={24} /> Okunan Masallar
                  </div>
                  <span className="text-2xl font-black text-[#b3593b]">{recentStories.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <div className="flex items-center text-emerald-800 font-semibold text-sm">
                    <Clock className="mr-3" size={20} /> Kalan Masal Hakkı
                  </div>
                  <span className="text-lg font-bold text-emerald-700">{remainingText}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                  <div className="flex items-center text-blue-800 font-semibold text-sm">
                    <Star className="mr-3" size={20} /> Kalan Sesli Masal Hakkı
                  </div>
                  <span className="text-lg font-bold text-blue-700">{remainingVoiceText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Library */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-amber-900/10 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-lora font-bold text-[#2d2d2d]">Eski Masallar Kütüphanesi</h2>
            </div>

            {recentStories.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                Henüz masal oluşturmadınız.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentStories.map((story) => (
                  <Link href={`/story/${story.id}`} key={story.id} className="group relative p-6 bg-[#fdfaf3] hover:bg-[#f4e8d3] border border-amber-100 rounded-3xl transition-all cursor-pointer block">
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm text-amber-500">
                      <Star size={18} fill="currentColor" />
                    </div>
                    <div className="w-12 h-12 bg-white text-[#b3593b] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                      <BookHeart size={24} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#8c462e] transition-colors font-lora">
                      {story.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">{story.profiles?.name || 'Çocuk'}</span>
                      <span>{new Date(story.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Upgrade Banner - Dinamik */}
            {!isPremium && (
              <div className={`mt-8 ${isPro ? 'bg-purple-50 border-purple-200' : 'bg-[#fdfaf3] border-[#e6b17e]'} border rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-inner`}>
                <div>
                  <h3 className={`${isPro ? 'text-purple-800' : 'text-[#8c462e]'} font-lora font-bold text-lg`}>
                    {isPro ? 'Kraliçe Arı\'ya Terfi Edin! 👑' : 'Premium\'a Geçin!'}
                  </h3>
                  <p className="text-gray-600 mt-1">Kendi sesinizi klonlayarak masalları siz okuyun.</p>
                </div>
                <Link href="/settings" className={`mt-4 md:mt-0 px-6 py-3 ${isPro ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-[#e6b17e] hover:bg-[#d9a066] text-amber-950'} rounded-xl font-bold shadow-sm transition-all inline-block text-center`}>
                  Yükselt
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
