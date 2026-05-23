'use client'

import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  BookHeart, 
  Volume2, 
  Sparkles, 
  LayoutGrid, 
  Zap, 
  ArrowRight,
  ChevronDown,
  Star,
  ListMusic,
  BookMarked,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import AddToQueueButton from '@/components/AddToQueueButton'
import AddToPlaylistButton from '@/components/AddToPlaylistButton'
import Navbar from '@/components/Navbar'
import { SmartDictionary } from '@/utils/smart-dictionary'

// --- TİPLER ---
interface StoryMetadata {
  genre?: string
  style?: string
  voice_name?: string
  language?: string
  master_image_url?: string
  master_ref_story_id?: string
  age_group?: string
  educational_value?: string
}

interface Story {
  id: string
  title: string
  image_url: string
  audio_url?: string
  content_json?: any
  metadata?: StoryMetadata
  created_at: string
  average_rating?: number
  total_ratings?: number
}

type SortOption = 'newest' | 'top_rated'

// --- ALT BİLEŞENLER ---

/**
 * 🎨 StoryCard: Her bir hikayeyi temsil eden premium kart bileşeni
 */
const StoryCard = ({ story, dict, lang }: { story: Story, dict: any, lang: string }) => {
  const meta = story.metadata || {}
  const href = `/story/${story.id}?source=library`

  return (
    <div className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50">

      {/* Visual Header — Link sadece buraya */}
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-sky-50">
        {story.image_url ? (
          <Image
            src={story.image_url}
            alt={story.title}
            fill
            sizes="(max-w-7xl) 33vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookHeart size={48} className="text-sky-200" />
          </div>
        )}

        {/* 🎵 Kuyruk & Ses — sağ üst (Link içinde, yine de çalışır) */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 z-10">
          {story.audio_url && (
            <>
              <AddToQueueButton
                story={{ id: story.id, title: story.title, audio_url: story.audio_url, image_url: story.image_url }}
                iconOnly
                className="bg-white/95 backdrop-blur-md shadow-xl hover:scale-110 transition-transform"
                source="library"
              />
              <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-full shadow-xl text-emerald-500">
                <Volume2 size={18} />
              </div>
            </>
          )}
        </div>
      </Link>

      {/* 💜 Listeye Ekle — Link'in DIŞINDA, sol üst, z-20 ile üstte */}
      <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        <AddToPlaylistButton
          story={{ id: story.id, title: story.title, image_url: story.image_url }}
          lang={lang}
        />
      </div>

      {/* Content Body — ayrı Link */}
      <Link href={href} className="p-7 flex flex-col flex-grow space-y-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-xl font-lora font-black text-gray-800 line-clamp-2 leading-tight group-hover:text-[#84B1D9] transition-colors">
            {story.title}
          </h3>
          <Sparkles className="text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap gap-2">
          {meta.language && (
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center gap-1.5 shadow-sm">
              {meta.language === 'tr' ? '🇹🇷 Türkçe' : '🇺🇸 English'}
            </span>
          )}
          {meta.genre && (
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center gap-1.5 shadow-sm">
              📖 {(() => {
                const key = SmartDictionary.getGenreKey(meta.genre);
                if (key) return dict.library?.genres?.[key] || key;
                return meta.genre === 'all' ? (lang === 'tr' ? 'Genel' : 'General') : meta.genre;
              })()}
            </span>
          )}
          {meta.style && (
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1.5 shadow-sm">
              🎨 {(() => {
                const key = SmartDictionary.getStyleKey(meta.style);
                if (key) return dict.styles?.[key] || key;
                return meta.style;
              })()}
            </span>
          )}
          {meta.voice_name && (
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1.5 shadow-sm">
              🎙️ {(() => {
                const key = SmartDictionary.getVoiceKey(meta.voice_name);
                if (key) return dict.voices?.[key]?.name || key;
                return meta.voice_name === 'Sessiz' ? (lang === 'tr' ? 'Sessiz' : 'Silent') : meta.voice_name;
              })()}
            </span>
          )}
          {meta.age_group && (
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center gap-1.5 shadow-sm">
              👶 {meta.age_group.replace(' Yaş', '').replace(' Age', '')} {dict.library?.age_suffix || (lang === 'tr' ? 'Yaş' : 'Age')}
            </span>
          )}
          {meta.educational_value && (
            <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1.5 shadow-sm">
              ✨ {(() => {
                const key = SmartDictionary.getEdValueKey(meta.educational_value);
                if (key) return dict.form?.sections?.educational_values?.[key] || key;
                return meta.educational_value;
              })()}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed opacity-80 italic">
          {Array.isArray(story.content_json) && story.content_json[0]?.text
            ? story.content_json[0].text
            : dict.library.default_preview}
        </p>

        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-gray-50 flex justify-end">
          <div className="flex items-center gap-1 text-[#84B1D9] text-[10px] font-black group-hover:gap-2 transition-all">
            {dict.library.read_now}
            <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </div>
  )
}

/**
 * 🛠️ FilterBar: Hiyerarşik filtreleme butonları
 */
const FilterBar = ({ 
  mode, 
  genre, 
  onChange, 
  dict,
  genreConfig 
}: { 
  mode: string, 
  genre: string, 
  onChange: (m?: string, g?: string) => void,
  dict: any,
  genreConfig: any[]
}) => {
  return (
    <div className="max-w-4xl mx-auto mb-16 space-y-8">
      {/* Mode Switcher (Hepsi / Serüvenler) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-white/55 backdrop-blur-3xl border border-white/70 rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-black/5">
          <button
            onClick={() => onChange('all')}
            className={`flex items-center gap-2.5 px-10 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-500 ${
              mode === 'all' 
              ? 'bg-white text-[#052159] shadow-xl scale-105 border border-white/80' 
              : 'text-[#052159]/75 hover:bg-white/20 hover:text-[#052159]'
            }`}
          >
            <LayoutGrid size={16} />
            {dict.library.categories.all}
          </button>
          <button
            onClick={() => onChange('adventures')}
            className={`flex items-center gap-2.5 px-10 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-500 ${
              mode === 'adventures' 
              ? 'bg-white text-[#052159] shadow-xl scale-105 border border-white/80' 
              : 'text-[#052159]/75 hover:bg-white/20 hover:text-[#052159]'
            }`}
          >
            <Zap size={16} className={mode === 'adventures' ? 'text-amber-500' : 'text-[#052159]/75'} />
            {dict.library.categories.adventures}
          </button>
        </div>
      </div>

      {/* Genre Chips */}
      <div className="flex flex-wrap justify-center gap-2.5 px-4">
        {genreConfig.map((g) => (
          <button
            key={g.id}
            onClick={() => onChange(undefined, g.id)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              genre === g.id
                ? 'bg-white text-[#052159] border-white shadow-xl scale-110'
                : 'bg-white/40 backdrop-blur-md text-[#052159]/80 border-white/40 hover:bg-white/60 hover:text-[#052159]'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * ⭐ SortDropdown: Sıralama seçici (En Yeniler / En Çok Beğenilenler)
 */
const SortDropdown = ({
  sort,
  onChange,
  dict
}: {
  sort: SortOption,
  onChange: (s: SortOption) => void,
  dict: any
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Dışarı tıklanınca kapat
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const sortLabel = sort === 'top_rated'
    ? dict.library.sort.top_rated
    : dict.library.sort.newest

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger Butonu */}
      <button
        id="library-sort-dropdown"
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
          sort === 'top_rated'
            ? 'bg-white text-[#052159] border-white shadow-xl scale-105'
            : 'bg-white/40 backdrop-blur-md text-[#052159]/80 border-white/40 hover:bg-white/60 hover:text-[#052159]'
        }`}
      >
        <Star size={12} className={sort === 'top_rated' ? 'fill-amber-500 text-amber-500' : 'text-[#052159]/60'} />
        {sortLabel}
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menüsü */}
      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 min-w-[200px] bg-white/95 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden">
          {(['newest', 'top_rated'] as SortOption[]).map((option) => (
            <button
              key={option}
              id={`library-sort-${option}`}
              onClick={() => { onChange(option); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all duration-200 ${
                sort === option
                  ? 'bg-[#052159]/10 text-[#052159]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {option === 'top_rated'
                ? <Star size={13} className={sort === option ? 'fill-amber-400 text-amber-400' : 'text-amber-400'} />
                : <Sparkles size={13} className="text-sky-400" />
              }
              {dict.library.sort[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// --- ANA BİLEŞEN ---

export default function LibraryClient({ 
  stories, 
  publicPlaylists = [],
  user, 
  dict, 
  lang 
}: { 
  stories: Story[], 
  publicPlaylists?: any[],
  user: any, 
  dict: any, 
  lang: string 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 1. Durum Yönetimi (URL tabanlı)
  const activeMode = (searchParams.get('mode') as 'all' | 'adventures') || 'all'
  const activeGenre = searchParams.get('genre') || 'all'
  const activeLangFilter = searchParams.get('lang') || 'all'
  const activeSort = (searchParams.get('sort') as SortOption) || 'newest'
  const currentPage = Number(searchParams.get('page')) || 1
  const pageSize = 12


  // 2. Tür Konfigürasyonu
  const GENRE_CONFIG = useMemo(() => [
    { id: 'all', label: dict.library.genres.all },
    { id: 'tale', label: dict.library.genres.tale },
    { id: 'sci_fi', label: dict.library.genres.sci_fi },
    { id: 'adventure', label: dict.library.genres.adventure },
    { id: 'fantasy', label: dict.library.genres.fantasy },
    { id: 'fable', label: dict.library.genres.fable }
  ], [dict]);

  const LANG_CONFIG = useMemo(() => [
    { id: 'all', label: dict.library.genres.all }, // 'Hepsi' için genel anahtar
    { id: 'tr', label: 'TÜRKÇE 🇹🇷' },
    { id: 'en', label: 'ENGLISH 🇺🇸' }
  ], [dict]);

  // 3. Filtreleme Fonksiyonu
  const handleFilterChange = useCallback((newMode?: string, newGenre?: string, newLang?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newMode) {
      params.set('mode', newMode)
      params.set('page', '1')
    }
    if (newGenre) {
      params.set('genre', newGenre)
      params.set('page', '1')
    }
    if (newLang) {
      params.set('lang', newLang)
      params.set('page', '1')
    }
    router.push(`/library?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  // 3b. Sıralama Fonksiyonu
  const handleSortChange = useCallback((newSort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', newSort)
    params.set('page', '1')
    router.push(`/library?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  // 3c. Sayfa Değiştirme Fonksiyonu
  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/library?${params.toString()}`, { scroll: false })
  }, [router, searchParams])


  // 4. Veri İşleme Motoru (Akıllı Eşleştirmeli & Çapraz Filtreli)
  const filteredList = useMemo(() => {
    // A. Tekilleştirme (Aynı başlıkta olanlardan birini al)
    const uniqueStories = Array.from(
      (stories || []).reduce((map, s) => {
        if (!map.has(s.title)) map.set(s.title, s);
        return map;
      }, new Map<string, Story>()).values()
    );

    // B. Serüven Tespiti
    const masterCounts = (stories || []).reduce((acc, s) => {
      const master = s.metadata?.master_image_url;
      if (master) acc[master] = (acc[master] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // C. Akıllı Eşleştirme Yardımcıları (Heuristic Matchers)
    const genreMatch = (storyGenre: string | undefined, target: string) => {
      if (!storyGenre) return false;
      if (target === 'all') return true;
      const key = SmartDictionary.getGenreKey(storyGenre);
      return key === target;
    };

    const langMatch = (storyLang: string | undefined, target: string) => {
      if (!storyLang) return false;
      if (target === 'all') return true;
      const key = SmartDictionary.getLangKey(storyLang);
      return key === target;
    };

    let result = uniqueStories;

    // --- ÇAPRAZ FİLTRELEME (INTERSECTION) ---

    // 1. Mod Filtresi
    if (activeMode === 'adventures') {
      result = result.filter(s => {
        const master = s.metadata?.master_image_url;
        const isSequel = s.metadata?.master_ref_story_id;
        return isSequel || (master && masterCounts[master] > 1);
      });
    }

    // 2. Akıllı Tür Filtresi
    if (activeGenre !== 'all') {
      result = result.filter(s => genreMatch(s.metadata?.genre, activeGenre));
    }

    // 3. Akıllı Dil Filtresi
    if (activeLangFilter !== 'all') {
      result = result.filter(s => langMatch(s.metadata?.language, activeLangFilter));
    }

    // 4. Sıralama (Tüm filtreler uygulandıktan sonra)
    if (activeSort === 'top_rated') {
      result = [...result].sort((a, b) => {
        const ratingA = a.average_rating ?? 0
        const ratingB = b.average_rating ?? 0
        if (ratingB !== ratingA) return ratingB - ratingA
        // Eşit puanlarda en yeni önce gelir
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
    } else {
      // 'newest' — zaten veritabanından created_at DESC geliyor, ama tekilleştirme sonrası garantile
      result = [...result].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }

    return result;
  }, [stories, activeMode, activeGenre, activeLangFilter, activeSort]);

  // 5. Sayfalama İşleme
  const totalPages = Math.ceil(filteredList.length / pageSize)
  const paginatedList = useMemo(() => {
    const from = (currentPage - 1) * pageSize
    const to = from + pageSize
    return filteredList.slice(from, to)
  }, [filteredList, currentPage, pageSize])

  return (
    <div className="min-h-screen bg-[#BDD9F2] relative selection:bg-[#84B1D9] selection:text-white pb-32">
      {/* 🌌 Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/50 via-transparent to-[#BDD9F2]/80"></div>
      </div>

      <div className="relative z-10">
        <Navbar user={user} />
      
        <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-5xl md:text-7xl font-lora font-black text-[#052159] tracking-tight">
              {dict.library.title}
            </h1>
            <div className="h-1.5 w-24 bg-[#052159]/20 mx-auto rounded-full blur-[1px]"></div>
            <p className="text-[#052159]/80 text-lg md:text-xl max-w-2xl mx-auto font-bold">
              {dict.library.subtitle}
            </p>
          </div>

          {/* 🌟 Popüler Dinleme Listeleri */}
          {publicPlaylists && publicPlaylists.length > 0 && (
            <div className="mb-16 space-y-6">
              <div className="flex items-center justify-between border-b border-[#052159]/15 pb-4">
                <h2 className="text-2xl md:text-3xl font-lora font-black text-[#052159]">
                  {lang === 'tr' ? 'Popüler Dinleme Listeleri' : 'Popular Playlists'}
                </h2>
                <Link
                  href="/playlists"
                  className="text-[10px] font-black uppercase tracking-widest text-[#052159] bg-white border border-white/80 px-5 py-2.5 rounded-full shadow-md hover:bg-white/90 hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  {lang === 'tr' ? 'Hepsini Gör' : 'See All'}
                  <ArrowRight size={12} />
                </Link>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-4 pt-2 -mx-6 px-6 scroll-smooth snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {publicPlaylists.map((pl) => {
                  const pseudonym = pl.user_pseudonyms?.pseudonym
                  return (
                    <div
                      key={pl.id}
                      className="w-64 shrink-0 snap-start bg-white/90 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm border border-white/50 flex flex-col group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
                    >
                      {/* Kapak */}
                      <Link href={`/playlists/${pl.id}`} className="relative aspect-[4/3] bg-gradient-to-br from-violet-100 to-violet-50 overflow-hidden block">
                        {pl.cover_image ? (
                          <img
                            src={pl.cover_image}
                            alt={pl.title}
                            className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ListMusic size={40} className="text-violet-200" />
                          </div>
                        )}
                        {/* Masal sayısı */}
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                          {pl.story_count} {lang === 'tr' ? 'masal' : 'stories'}
                        </div>
                      </Link>

                      {/* Bilgi */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <Link href={`/playlists/${pl.id}`}>
                            <h3 className="font-black text-gray-800 text-sm leading-snug line-clamp-2 hover:text-[#84B1D9] transition-colors">
                              {pl.title}
                            </h3>
                          </Link>
                          {pseudonym && (
                            <p className="text-[10px] text-violet-400 font-bold mt-1 flex items-center gap-1">
                              <Users size={10} /> {pseudonym}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[9px] font-black text-gray-400">
                          <span className="flex items-center gap-1">
                            <BookMarked size={10} />
                            {pl.save_count} {lang === 'tr' ? 'kayıt' : 'saves'}
                          </span>
                          <Link href={`/playlists/${pl.id}`} className="text-[#84B1D9] hover:text-[#5fa2dd] flex items-center gap-0.5 transition-colors">
                            {lang === 'tr' ? 'Dinle' : 'Listen'} <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 🎭 Clean Filter Engine */}
          <FilterBar 
            mode={activeMode} 
            genre={activeGenre} 
            onChange={handleFilterChange} 
            dict={dict} 
            genreConfig={GENRE_CONFIG}
          />

          {/* 🌍 Language Selector + ⭐ Sort Row - Premium Row */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 px-4 -mt-10 mb-16">
            {LANG_CONFIG.map((l) => (
              <button
                key={l.id}
                onClick={() => handleFilterChange(undefined, undefined, l.id)}
                className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeLangFilter === l.id
                    ? 'bg-white text-[#052159] border-white shadow-xl scale-105'
                    : 'bg-white/40 backdrop-blur-md text-[#052159]/80 border-white/40 hover:bg-white/60 hover:text-[#052159]'
                }`}
              >
                {l.label}
              </button>
            ))}

            {/* Ayraç */}
            <div className="w-px h-5 bg-[#052159]/20 mx-1" />

            {/* ⭐ Sıralama Dropdown'u */}
            <SortDropdown
              sort={activeSort}
              onChange={handleSortChange}
              dict={dict}
            />
          </div>

{/* 📚 Story Grid Engine */}
          {filteredList.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-24 bg-white/10 backdrop-blur-3xl rounded-[3.5rem] border border-white/30 shadow-2xl">
              <div className="relative inline-block mb-6">
                <BookHeart className="w-20 h-20 text-white/40 animate-pulse" />
                <Zap className="absolute -top-2 -right-2 text-amber-300 animate-bounce" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                {activeMode === 'adventures' 
                  ? (lang === 'tr' ? 'Henüz Bir Serüven Bulunmuyor' : 'No Adventures Found Yet')
                  : dict.library.no_stories}
              </h2>
              <p className="text-white/60 mb-8 font-medium">
                {activeMode === 'adventures' 
                  ? (lang === 'tr' ? 'Aynı karakterlerle yeni hikayeler üreterek serüvenlerini başlatabilirsin!' : 'Start your adventures by creating new stories with the same characters!')
                  : dict.library.create_now}
              </p>
              <Link href="/#create" className="px-10 py-4 bg-white text-[#84B1D9] rounded-full font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                {lang === 'tr' ? 'Masal Oluştur' : 'Create Story'}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedList.map((story) => (
                <StoryCard key={story.id} story={story} dict={dict} lang={lang} />
              ))}
            </div>
          )}


          {/* 📟 Premium Pagination Control */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={`p-2 rounded-xl border transition-all ${currentPage === 1 ? 'opacity-30 pointer-events-none' : 'bg-white/80 hover:bg-white border-white/60 text-[#052159]'}`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isNear = Math.abs(pageNum - currentPage) <= 1;
                  const isEdge = pageNum === 1 || pageNum === totalPages;
                  
                  if (!isNear && !isEdge) {
                    if (pageNum === 2 || (pageNum === totalPages - 1 && totalPages > 4)) {
                      const showEllipsis = (pageNum === 2 && currentPage > 3) || (pageNum === totalPages - 1 && currentPage < totalPages - 2);
                      if (showEllipsis) return <span key={pageNum} className="px-2 text-[#052159]/60 font-bold">...</span>;
                      return null;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl font-bold transition-all border ${
                        currentPage === pageNum
                          ? 'bg-[#84B1D9] border-[#84B1D9] text-white shadow-md'
                          : 'bg-white/40 border-white/40 text-[#052159] hover:bg-white hover:border-[#84B1D9] hover:text-[#84B1D9]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={`p-2 rounded-xl border transition-all ${currentPage === totalPages ? 'opacity-30 pointer-events-none' : 'bg-white/80 hover:bg-white border-white/60 text-[#052159]'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}


        </main>

        <footer className="text-center mt-20 opacity-60">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white font-black uppercase tracking-tighter text-xs">
            <Sparkles size={16} className="text-amber-300" />
            {dict.library.footer_slogan}
          </div>
        </footer>
      </div>
    </div>
  )
}
