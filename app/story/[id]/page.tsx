import { createClient } from '@/utils/supabase/server'
import StoryPlayer from '@/components/StoryPlayer'
import Link from 'next/link'
import { Download, Music, ImageIcon } from 'lucide-react'
import DownloadBookButton from '@/components/DownloadBookButton'
import AudioBanner from '@/components/AudioBanner'

export default async function StoryPage({ params, searchParams }: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ source?: string }>
}) {
  const { id } = await params
  const { source } = await searchParams
  const hideDownloads = source === 'library'

  const supabase = await createClient()

  const { data: story } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single()

  // Karakter paftasını almak için generation_jobs tablosuna bakıyoruz
  const { data: job } = await supabase
    .from('generation_jobs')
    .select('master_ref_data')
    .eq('story_id', id)
    .single()

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-sky-50/30">
        <h1 className="text-2xl font-bold mb-4 text-sky-900">Masal bulunamadı</h1>
        <Link href="/parent" className="text-sky-600 underline font-semibold">Kütüphaneye Dön</Link>
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
            href={source === 'library' ? '/library' : '/parent'}
            className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-sky-100 font-bold text-sky-800 hover:bg-sky-50 hover:border-sky-200 transition-all text-sm"
          >
            ← {source === 'library' ? 'Kitaplığa Dön' : 'Kütüphaneye Dön'}
          </Link>

          {/* İndirme butonları */}
          {!hideDownloads && (
            <div className="flex items-center gap-3">
              {/* Kitap İndir (PDF) */}
              <DownloadBookButton story={story} />

              {/* Bu Kahramanlarla Yeni Serüven Başlat */}
              {story.id && (
                <Link
                  href={`/?continue_from=${story.id}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-5 py-3 rounded-2xl shadow-lg border-b-4 border-orange-700 font-bold transition-all text-sm animate-pulse hover:animate-none"
                >
                  <Sparkles size={16} />
                  Bu Kahramanlarla Yeni Serüven Başlat
                </Link>
              )}

              {/* Podcast İndir */}
              {story.audio_url && (
                <a
                  href={story.audio_url}
                  download={`${story.title}.mp3`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-2xl font-bold shadow-md transition-all text-sm"
                >
                  <Music size={16} />
                  Podcast İndir
                </a>
              )}
            </div>
          )}
        </div>

        {/* Seslendirme Bannerı */}
        <AudioBanner story={story} />

        {/* Story Player */}
        <StoryPlayer
          id={story.id}
          title={story.title}
          content={[]}
          imageUrl={story.image_url}
          audioUrl={story.audio_url}
          pages={story.content_json}
        />

        {/* Alt bilgi */}
        <p className="text-center text-[#052159] text-xs font-bold mt-6 tracking-wide opacity-70">
          🌟 Bu masal sizin için özel oluşturuldu · MyStory
        </p>
      </div>
    </div>
  )
}
