import { Star, BookHeart, Plus, Crown, Sparkles, Wand2, Settings, Clock, Shuffle, Volume2 } from 'lucide-react'
import { QuotaService } from '@/services/QuotaService'
import AddToQueueButton from '@/components/AddToQueueButton'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import PinButton from '@/components/PinButton'
 
import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'
 

export default async function ParentDashboard({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'tr'
  const dict = await getDictionary(language as 'tr' | 'en')
  const t = (key: string) => {
    const keys = key.split('.')
    let val: any = dict
    for (const k of keys) {
      val = val?.[k]
    }
    return val || key
  }

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  
  if (!user) {
    redirect('/login')
  }

  // Next.js 15 searchParams resolution
  const params = await searchParams
  const success = params?.success
  const plan = params?.plan as string
  
  const GENRES = [
    t('library.genres.all'),
    t('library.genres.tale'),
    t('library.genres.sci_fi'),
    t('library.genres.adventure'),
    t('library.genres.fantasy'),
    t('library.genres.fable')
  ]
  const activeGenre = (params?.genre as string) || GENRES[0]

  // WEBHOOK BYPASS: If returning from Stripe Checkout successfully
  if (success === 'true' && typeof plan === 'string') {
    try {
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (serviceKey) {
        const supabaseAdmin = createSupabaseClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          serviceKey
        )
        
        await supabaseAdmin.from('subscriptions').upsert({
          user_id: user.id,
          status: 'active',
          plan_id: plan,
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }, { onConflict: 'user_id' })
      }
    } catch (err) {
      console.error('Subscription sync error:', err)
      // Sayfayı çökertmemek için hatayı yutuyoruz, ancak abonelik geç yansıyabilir
    }
  }

  const quota = await QuotaService.getUserQuotaStats(supabase, user.id);
  const { isPro, isPremium, audioUsed: mAudioUsed, audioLimit: mAudioLimit } = quota;
  // quota objesini UI'ın beklediği mAudio formatına uyumluyoruz
  Object.assign(quota, { mAudioUsed, mAudioLimit });

  const totalStories = quota.totalUsed;

  // Son Masallar (Görsel Liste için) - Zırhlı Sorgu
  let recentStories: any[] = []
  try {
    let storiesQuery = supabase
      .from('stories')
      .select('id, title, created_at, content_json, metadata, image_url, audio_url, is_pinned')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (activeGenre !== GENRES[0]) {
      storiesQuery = storiesQuery.filter('metadata->>genre', 'eq', activeGenre)
    }

    const { data: stories } = await storiesQuery.limit(20)
    recentStories = stories || []
  } catch (error) {
    recentStories = []
  }

  return (
    <div className="min-h-screen bg-[#BDD9F2] font-nunito p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-sky-900/10">
          <div>
            <h1 className="text-3xl font-lora font-bold text-[#2d2d2d] tracking-tight">{t('parent.title')}</h1>
            <p className="text-gray-500 mt-1">{t('parent.subtitle')}</p>
          </div>
          <div className="flex gap-4 items-center">
            {isPremium && (
               <span className="hidden sm:inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold border border-purple-200">
                 👑 {t('pricing.plans.premium.name')}
               </span>
            )}
            {isPro && !isPremium && (
               <span className="hidden sm:inline-flex items-center bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-bold border border-sky-200">
                 ☁️ {t('pricing.plans.pro.name')}
               </span>
            )}
            {quota.role === 'admin' && (
              <Link href="/admin" className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-bold shadow-sm">
                Admin
              </Link>
            )}
            <Link href="/settings" className="p-3 bg-[#BDD9F2] text-[#84B1D9] rounded-xl hover:bg-[#BDD9F2] transition border border-[#BDD9F2]/30">
              <Settings size={24} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Quick Actions */}
          <div className="space-y-8">
            {/* Quick Create Action */}
            <div className="bg-[#84B1D9] p-8 rounded-[2rem] text-white shadow-xl shadow-sky-900/20 relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8FBDD9] rounded-full mix-blend-screen filter blur-[40px] opacity-40"></div>
              <h2 className="text-2xl font-lora font-bold mb-2 relative z-10">{t('parent.quick_create_title')}</h2>
              <p className="text-sky-100 mb-6 relative z-10">{t('parent.quick_create_desc')}</p>
              <Link href="/#create" className="flex items-center justify-center w-full py-4 bg-white text-[#84B1D9] rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-md relative z-10">
                <Plus size={24} className="mr-2" />
                {t('form.buttons.generate')}
              </Link>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-sky-900/10 space-y-4">
              <h3 className="font-bold text-gray-900 text-lg border-b border-sky-100 pb-4">{t('parent.stats_title')}</h3>
              
              <div className="flex flex-col gap-3">
                {/* Arşiv */}
                <div className="flex items-center justify-between p-4 bg-sky-50 border border-sky-100 rounded-2xl">
                  <div className="flex items-center text-sky-700 font-bold">
                    <BookHeart className="mr-3 text-sky-500" size={24} /> {t('parent.archived_stories')}
                  </div>
                  <span className="text-2xl font-black text-sky-800">{totalStories}</span>
                </div>

                {/* Taslak */}
                <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                  <div className="flex items-center text-amber-700 font-bold text-sm">
                    <Shuffle className="mr-3 text-amber-500" size={20} /> {t('parent.magic_shuffles')}
                  </div>
                  <span className="text-lg font-black text-amber-800">
                    {Math.max(0, quota.shuffleLimit - quota.shuffleUsed)} / {quota.shuffleLimit}
                  </span>
                </div>

                {/* Özgün */}
                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <div className="flex items-center text-emerald-800 font-bold text-sm">
                    <Plus className="mr-3 text-emerald-500" size={20} /> {t('parent.custom_stories')}
                  </div>
                  <span className="text-lg font-black text-emerald-800">
                    {Math.max(0, quota.manualLimit - quota.manualUsed)} / {quota.manualLimit}
                  </span>
                </div>

                {/* Sesli */}
                <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <div className="flex items-center text-indigo-800 font-bold text-sm">
                    <Volume2 className="mr-3 text-indigo-500" size={20} /> {t('parent.custom_audio')}
                  </div>
                  <span className="text-lg font-black text-indigo-800">
                    {Math.max(0, mAudioLimit - mAudioUsed)} / {mAudioLimit}
                  </span>
                </div>

                {/* Serüvene Devam */}
                <div className="flex items-center justify-between p-4 bg-sky-50 border border-sky-100 rounded-2xl">
                  <div className="flex items-center text-sky-800 font-bold text-sm">
                    <Sparkles className="mr-3 text-sky-500" size={20} /> {t('parent.continue_adventure')}
                  </div>
                  <span className="text-lg font-black text-sky-800">
                    {Math.max(0, quota.continueLimit - quota.continueUsed)} / {quota.continueLimit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Library */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-sky-900/10 p-8">
            <div className="mb-6 space-y-6">
              <h2 className="text-2xl font-lora font-bold text-[#2d2d2d]">{t('parent.library_title')}</h2>
              
              {/* Filter Bar */}
              <div className="flex flex-wrap gap-2 pb-2">
                {GENRES.map((genre) => (
                  <Link
                    key={genre}
                    href={`/parent${genre === GENRES[0] ? '' : `?genre=${encodeURIComponent(genre)}`}`}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      activeGenre === genre
                        ? 'bg-[#84B1D9] text-white border-[#84B1D9] shadow-md'
                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            {recentStories.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                {t('parent.no_stories')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentStories.map((story) => {
                  const meta = story.metadata || {}
                  // Karakterleri content_json'dan veya metadata'dan çek
                  const characters = meta.characters || 
                                   (Array.isArray(story.content_json) ? [] : []) // Basit bir fallback

                  return (
                    <Link 
                      href={`/story/${story.id}?source=parent`} 
                      key={story.id}
                      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-sky-50"
                    >
                      {/* Cover Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {story.image_url && (
                          <div className="absolute top-4 right-4 z-20">
                            <PinButton storyId={story.id} initialPinned={!!story.is_pinned} />
                          </div>
                        )}
                        {story.image_url ? (
                          <Image 
                            src={story.image_url} 
                            alt={story.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-sky-50 flex items-center justify-center text-sky-200">
                            <BookHeart size={64} />
                          </div>
                        )}
                        
                        {/* Audio & Queue Controls */}
                        {story.audio_url && (
                          <div className="absolute top-4 right-4 flex gap-2 animate-in fade-in zoom-in duration-500">
                            <AddToQueueButton 
                              story={{
                                id: story.id,
                                title: story.title,
                                audio_url: story.audio_url || "",
                                image_url: story.image_url || ""
                              }} 
                              iconOnly 
                              className="bg-white/90 backdrop-blur-md shadow-lg"
                            />
                            <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-lg text-emerald-500">
                              <Volume2 size={18} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-7 space-y-4 flex-grow flex flex-col">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xl font-lora font-bold text-gray-800 leading-tight group-hover:text-[#84B1D9] transition-colors line-clamp-2">
                            {story.title}
                          </h3>
                          <Sparkles className="text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>

                        {/* 🏷️ Metadata Etiketleri */}
                        <div className="flex flex-wrap gap-2">
                          {meta.genre && (
                            <span className="bg-sky-100/50 text-sky-800 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-sky-200/50 flex items-center gap-1">
                              📖 {meta.genre}
                            </span>
                          )}
                          {meta.style && (
                            <span className="bg-amber-50 text-amber-700 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-amber-100 flex items-center gap-1">
                              🎨 {meta.style}
                            </span>
                          )}
                          {meta.voice_name && (
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-emerald-100 flex items-center gap-1">
                              🎙️ {meta.voice_name}
                            </span>
                          )}
                          {meta.age_group && (
                            <span className="bg-purple-50 text-purple-700 text-[10px] px-2.5 py-1.5 rounded-xl font-bold border border-purple-100 flex items-center gap-1">
                              👶 {meta.age_group} {t('library.age_suffix')}
                            </span>
                          )}
                        </div>

                        {/* Story Excerpt */}
                        {Array.isArray(story.content_json) && story.content_json[0]?.text && (
                          <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3">
                            {story.content_json[0].text}
                          </p>
                        )}

                        <div className="pt-4 mt-auto border-t border-gray-50 flex justify-between items-center">
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                            <Clock size={12} />
                            {new Date(story.created_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                          </div>
                          <span className="text-[11px] font-bold text-[#84B1D9] group-hover:translate-x-1 transition-transform">
                            {t('library.read_now')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Upgrade Banner - Dinamik */}
            {!isPremium && (
              <div className={`mt-8 ${isPro ? 'bg-purple-50 border-purple-200' : 'bg-[#BDD9F2] border-[#BDD9F2]'} border rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between shadow-inner`}>
                <div>
                  <h3 className={`${isPro ? 'text-purple-800' : 'text-[#84B1D9]'} font-lora font-bold text-lg`}>
                    {isPro ? t('parent.upgrade_banner.title_pro') : t('parent.upgrade_banner.title_free')}
                  </h3>
                  <p className="text-gray-600 mt-1">{t('parent.upgrade_banner.desc')}</p>
                </div>
                <Link href="/settings" className={`mt-4 md:mt-0 px-6 py-3 ${isPro ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-[#BDD9F2] hover:bg-[#BDD9F2] text-amber-950'} rounded-xl font-bold shadow-sm transition-all inline-block text-center`}>
                  {t('parent.upgrade_banner.button')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
