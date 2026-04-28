import { createClient } from '@/utils/supabase/server'
import StoryPlayer from '@/components/StoryPlayer'
import Link from 'next/link'

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: story } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single()

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-amber-50/30">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Masal bulunamadı</h1>
        <Link href="/parent" className="text-indigo-600 underline font-semibold">Kütüphaneye Dön</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/parent" className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 font-bold text-gray-700 hover:bg-gray-50 transition-all hover:shadow-md">
            &larr; Kütüphaneye Dön
          </Link>
          {story.audio_url && (
            <a 
              href={story.audio_url} 
              download={`MyStory_Masal_${story.id}.mp3`}
              target="_blank"
              rel="noreferrer"
              className="bg-purple-100 text-purple-700 px-6 py-3 rounded-2xl font-bold flex items-center shadow-sm border border-purple-200 hover:bg-purple-200 transition-all hover:shadow-md"
            >
              🎙️ Podcast Olarak İndir
            </a>
          )}
        </div>
        <StoryPlayer 
          title={story.title} 
          content={story.content_json} 
          imageUrl={story.image_url} 
          audioUrl={story.audio_url} 
        />
      </div>
    </div>
  )
}
