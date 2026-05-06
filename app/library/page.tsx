import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { BookHeart, Volume2, Clock, Sparkles } from 'lucide-react'
import AddToQueueButton from '@/components/AddToQueueButton'
import Navbar from '@/components/Navbar'

const GENRES = ['Tümü', 'Masal', 'Bilim Kurgu', 'Macera', 'Fantastik', 'Fabl']

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const params = await searchParams
  const activeGenre = params.genre || 'Tümü'

  let query = supabase
    .from('stories')
    .select('*')
    .eq('is_shuffle', false)
    .order('created_at', { ascending: false })

  if (activeGenre !== 'Tümü') {
    // metadata->>genre JSONB filtresi
    query = query.filter('metadata->>genre', 'eq', activeGenre)
  }

  const { data: stories } = await query

  return (
    <div className="min-h-screen bg-[#BDD9F2] relative overflow-x-hidden">
      {/* 🌌 TÜM SAYFAYI KAPSAYAN SABİT SİHİRLİ ARKA PLAN */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center bg-no-repeat opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/20 via-[#BDD9F2]/40 to-[#BDD9F2]/80"></div>
      </div>

      <div className="relative z-10">
        <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-lora font-bold text-white drop-shadow-md">
            Sihirli Kitaplık
          </h1>
          <p className="text-sky-100 text-xl max-w-2xl mx-auto">
            Hayal gücünüzle yarattığınız benzersiz maceraların toplandığı özel koleksiyonunuz.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {GENRES.map((genre) => (
            <Link
              key={genre}
              href={`/library${genre === 'Tümü' ? '' : `?genre=${encodeURIComponent(genre)}`}`}
              className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-sm ${
                activeGenre === genre
                  ? 'bg-white text-[#84B1D9] scale-105 shadow-md'
                  : 'bg-[#84B1D9]/40 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {genre}
            </Link>
          ))}
        </div>

        {/* Story Grid */}
        {!stories || stories.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20">
            <BookHeart className="mx-auto w-16 h-16 text-white/50 mb-4" />
            <p className="text-white text-xl font-medium">Bu kategoride henüz masal bulunmuyor.</p>
            <Link href="/#create" className="text-white underline mt-4 inline-block font-bold">
              Hemen yeni bir tane yarat!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => {
              const meta = story.metadata || {}
              return (
                <Link 
                  href={`/story/${story.id}`} 
                  key={story.id}
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
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
                      <h3 className="text-2xl font-lora font-bold text-gray-800 leading-tight group-hover:text-[#84B1D9] transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <Sparkles className="text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </div>

                    {/* 🏷️ Metadata Etiketleri (Premium Görünüm) */}
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
                          👶 {meta.age_group} Yaş
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                      {Array.isArray(story.content_json) && story.content_json[0]?.text 
                        ? story.content_json[0].text 
                        : 'Büyülü bir macera seni bekliyor...'}
                    </p>

                    <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{new Date(story.created_at).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <span className="text-[#84B1D9] group-hover:underline">Şimdi Oku →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer Decoration */}
      <footer className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/20">
          <Sparkles size={18} className="text-amber-300" />
          <span>Senin hayal gücünle büyüyen bir dünya</span>
        </div>
      </footer>
    </div>
  </div>
  )
}
