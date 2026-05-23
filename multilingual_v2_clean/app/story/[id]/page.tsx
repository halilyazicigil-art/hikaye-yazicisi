import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import StoryPlayer from '@/components/StoryPlayer'
import { QuotaService } from '@/services/QuotaService'
import Link from 'next/link'
import { Music, Sparkles } from 'lucide-react'
import DownloadBookButton from '@/components/DownloadBookButton'
import PodcastDownloadButton from '@/components/PodcastDownloadButton'
import AudioBanner from '@/components/AudioBanner'

import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'

export default async function StoryPage({ params, searchParams }: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ source?: string }>
}) {
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

  const { id } = await params
  const { source } = await searchParams
  // Sihirli Kütüphane kuralı: Kaynak 'parent' (kullanıcının kendi yaratıcı alanı) değilse
  // download/indirme butonları gizlenir. Bu kural;
  //   - Sihirli Kütüphane (source=library)
  //   - Topluluk dinleme listeleri (source=community_popular)
  //   - Özel dinleme listeleri (source=parent_private)
  //   - Diğer tüm kaynaklar
  // için geçerlidir.
  const hideDownloads = source !== 'parent'

  const supabase = await createClient()

  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    redirect('/login');
  }

  // Zırhlı Veri Çekme (QuotaService, Story)
  let story: any = null;
  let quota: any = null;

  try {
    const [storyResult, quotaResult] = await Promise.all([
      supabase.from('stories').select('*').eq('id', id).maybeSingle(),
      QuotaService.getUserQuotaStats(supabase, user.id),
    ]);
    story = storyResult.data;
    quota = quotaResult;
  } catch (error) {
    console.error('[STORY_PAGE_DATA_FETCH_ERROR]', error);
  }

  if (!quota) {
    // QuotaService başarısız olsa bile (içindeki try-catch sayesinde) 
    // uygulama çökmeyecek ama biz burada ekstra güvenlik sağlıyoruz.
    quota = { isPro: false, isPremium: false, planId: 'free', podcastLimit: 0, podcastUsed: 0 };
  }

  const { isPro, isPremium, planId, podcastLimit: downloadLimit, podcastUsed: currentDownloads } = quota;

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-sky-50/30">
        <h1 className="text-2xl font-bold mb-4 text-sky-900">{t('story.not_found')}</h1>
        <Link href="/parent" className="text-sky-600 underline font-semibold">{t('story.back_to_parent')}</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 to-orange-50/20 p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto">

        {/* Üst bar */}
        <div className="mb-6 flex flex-wrap justify-between items-center gap-3">
          {/* Geri butonu */}
          <Link
            href={
              source === 'library' ? '/library'
              : (source === 'community_popular' || source === 'parent_private') ? '/playlists'
              : '/parent'
            }
            className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-sky-100 font-bold text-sky-800 hover:bg-sky-50 hover:border-sky-200 transition-all text-sm"
          >
            ← {
              source === 'library' ? t('story.back_to_library')
              : (source === 'community_popular' || source === 'parent_private') ? (t('story.back_to_playlists') || 'Dinleme Listelerine Dön')
              : t('story.back_to_parent')
            }
          </Link>

          {/* İndirme butonları */}
          <div className="flex items-center gap-3">
            {!hideDownloads && <DownloadBookButton story={story} />}

            {/* Bu Kahramanlarla Yeni Serüven Başlat */}
            {!hideDownloads && story.id && (isPro || isPremium) && (
              <Link
                href={`/?continue_from=${story.id}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-5 py-3 rounded-2xl shadow-lg border-b-4 border-orange-700 font-bold transition-all text-sm animate-pulse hover:animate-none"
              >
                <Sparkles size={16} />
                {t('story.start_new_adventure')}
              </Link>
            )}

            {/* Podcast İndir (Akıllı Kota Butonu) */}
            {!hideDownloads && story.audio_url && (
              <PodcastDownloadButton 
                storyId={story.id}
                audioUrl={story.audio_url}
                title={story.title}
                currentDownloads={currentDownloads}
                limit={downloadLimit}
                planId={planId}
              />
            )}
          </div>
        </div>

        {/* Seslendirme Bannerı */}
        <AudioBanner story={story} source={source} />

        {/* Story Player */}
        <StoryPlayer
          id={story.id}
          title={story.title}
          content={[]}
          imageUrl={story.image_url}
          audioUrl={story.audio_url}
          pages={story.content_json}
          source={source || 'parent'}
          isFree={!isPro && !isPremium}
          lang={language}
        />

        {/* Alt bilgi */}
        <p className="text-center text-[#052159] text-xs font-bold mt-6 tracking-wide opacity-70">
          {t('story.created_for_you')}
        </p>
      </div>
    </div>
  )
}
