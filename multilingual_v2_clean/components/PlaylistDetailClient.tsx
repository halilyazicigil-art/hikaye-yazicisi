'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, ListMusic, BookMarked, Globe, Lock,
  Trash2, ArrowLeft, Users, Star, Music, GripVertical, ExternalLink
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import { createClient } from '@/utils/supabase/client'

interface Story {
  id: string
  title: string
  image_url: string
  audio_url?: string
  content_json?: any
  metadata?: any
  average_rating?: number
  rowId: string
  sort_order: number
}

interface Playlist {
  id: string
  title: string
  description?: string
  cover_image: string | null
  story_count: number
  save_count: number
  is_public: boolean
  user_id: string
  created_at: string
  user_pseudonyms?: { pseudonym: string }
}

interface PlaylistDetailClientProps {
  user: any
  playlist: Playlist
  stories: Story[]
  isSaved: boolean
  isOwner: boolean
  lang: string
  dict: any
}

const tr = (lang: string, a: string, b: string) => lang === 'tr' ? a : b

export default function PlaylistDetailClient({
  user, playlist, stories: initialStories, isSaved: initialSaved, isOwner, lang, dict
}: PlaylistDetailClientProps) {
  const [stories, setStories] = useState(initialStories)
  const [saved, setSaved] = useState(initialSaved)
  const [savingToggle, setSavingToggle] = useState(false)
  const { playTrack, addToQueue, playList, isPlaying, currentTrack } = useAudioPlayer()
  const supabase = createClient()
  const pseudonym = playlist.user_pseudonyms?.pseudonym

  // Tümünü Dinle — kuyruk sistemine yükle
  const handlePlayAll = () => {
    const playable = stories.filter(s => s.audio_url)
    if (playable.length === 0) return
    const source = playlist.is_public ? 'community_popular' : 'parent_private'
    const tracks = playable.map(s => ({
      id: s.id,
      title: s.title,
      audioUrl: s.audio_url!,
      imageUrl: s.image_url,
      source
    }))
    playList(tracks)
  }

  // Listeyi kaydet / çıkar
  const handleSaveToggle = async () => {
    if (!user) return
    setSavingToggle(true)
    if (saved) {
      await supabase.from('playlist_saves').delete().eq('user_id', user.id).eq('playlist_id', playlist.id)
      setSaved(false)
    } else {
      await supabase.from('playlist_saves').insert({ user_id: user.id, playlist_id: playlist.id })
      setSaved(true)
    }
    setSavingToggle(false)
  }

  // Masalı listeden çıkar (sadece sahip)
  const handleRemoveStory = async (rowId: string, storyId: string) => {
    await supabase.from('playlist_stories').delete().eq('id', rowId)
    setStories(prev => prev.filter(s => s.rowId !== rowId))
  }

  const audioCount = stories.filter(s => s.audio_url).length

  return (
    <div className="min-h-screen bg-[#BDD9F2] relative pb-32">
      {/* Arkaplan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/50 via-transparent to-[#BDD9F2]/80" />
      </div>

      <div className="relative z-10">
        <Navbar user={user} />

        <main className="max-w-4xl mx-auto px-6 py-10">

          {/* Geri */}
          <Link href="/playlists" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-black text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> {tr(lang, 'Tüm Listeler', 'All Playlists')}
          </Link>

          {/* Playlist Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 border border-white/50"
          >
            <div className="flex flex-col md:flex-row">
              {/* Kapak */}
              <div className="relative w-full md:w-64 aspect-square md:aspect-auto shrink-0 bg-gradient-to-br from-violet-100 to-violet-50">
                {playlist.cover_image ? (
                  <img src={playlist.cover_image} alt={playlist.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center min-h-[200px]">
                    <ListMusic size={64} className="text-violet-200" />
                  </div>
                )}
              </div>

              {/* Bilgi */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  {/* Yayın durumu */}
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full mb-3 ${
                    playlist.is_public ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {playlist.is_public ? <Globe size={11} /> : <Lock size={11} />}
                    {playlist.is_public ? tr(lang, 'Herkese Açık', 'Public') : tr(lang, 'Gizli', 'Private')}
                  </div>

                  <h1 className="text-3xl font-lora font-black text-gray-800 mb-2">{playlist.title}</h1>

                  {pseudonym && (
                    <p className="text-sm text-violet-400 font-bold flex items-center gap-1.5 mb-3">
                      <Users size={14} /> {pseudonym}
                    </p>
                  )}

                  {playlist.description && (
                    <p className="text-gray-500 text-sm mb-4">{playlist.description}</p>
                  )}

                  <div className="flex items-center gap-4 text-[11px] font-black text-gray-400">
                    <span className="flex items-center gap-1"><Music size={12} /> {stories.length} {tr(lang, 'masal', 'stories')}</span>
                    <span className="flex items-center gap-1"><BookMarked size={12} /> {playlist.save_count} {tr(lang, 'kayıt', 'saves')}</span>
                  </div>
                </div>

                {/* Aksiyonlar */}
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  {/* Tümünü Dinle */}
                  {audioCount > 0 && (
                    <button
                      id="play-all-playlist"
                      onClick={handlePlayAll}
                      className="flex items-center gap-2 px-7 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all"
                    >
                      <Play size={18} fill="white" />
                      {tr(lang, 'Tümünü Dinle', 'Play All')}
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{audioCount}</span>
                    </button>
                  )}

                  {/* Kaydet / Çıkar (sahip değilse) */}
                  {!isOwner && user && (
                    <button
                      onClick={handleSaveToggle}
                      disabled={savingToggle}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all hover:scale-105 ${
                        saved
                          ? 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200'
                      }`}
                    >
                      <BookMarked size={16} />
                      {saved ? tr(lang, 'Kaydedildi ✓', 'Saved ✓') : tr(lang, 'Kaydet', 'Save Playlist')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Masallar Listesi */}
          <div className="space-y-3">
            <h2 className="text-white font-black text-lg px-1 mb-4">
              {tr(lang, 'Masallar', 'Stories')}
            </h2>

            <AnimatePresence>
              {stories.length === 0 ? (
                <div className="text-center py-16 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/30">
                  <ListMusic size={48} className="text-white/30 mx-auto mb-3" />
                  <p className="text-white/60 font-bold">
                    {tr(lang, 'Bu listede henüz masal yok', 'No stories in this playlist yet')}
                  </p>
                  <Link href="/library" className="mt-4 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-black transition-colors">
                    {tr(lang, 'Kütüphaneye Git →', 'Go to Library →')}
                  </Link>
                </div>
              ) : (
                stories.map((story, index) => {
                  const isCurrentlyPlaying = currentTrack?.id === story.id && isPlaying
                  return (
                    <motion.div
                      key={story.rowId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.04 }}
                      className={`group flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border ${
                        isCurrentlyPlaying ? 'border-violet-300 bg-violet-50' : 'border-white/50 hover:border-violet-200'
                      }`}
                    >
                      {/* Sıra numarası */}
                      <div className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-[11px] font-black ${
                        isCurrentlyPlaying ? 'bg-violet-500 text-white' : 'bg-violet-50 text-violet-400'
                      }`}>
                        {isCurrentlyPlaying ? <Pause size={12} /> : index + 1}
                      </div>

                      {/* Kapak */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-violet-50">
                        {story.image_url ? (
                          <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-violet-200">
                            <Music size={16} />
                          </div>
                        )}
                      </div>

                      {/* Başlık */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-black text-sm truncate ${isCurrentlyPlaying ? 'text-violet-700' : 'text-gray-800'}`}>
                          {story.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {story.audio_url && (
                            <span className="text-[9px] font-black text-emerald-500 flex items-center gap-1">
                              <Music size={9} /> {tr(lang, 'Sesli', 'Audio')}
                            </span>
                          )}
                          {story.average_rating && story.average_rating > 0 && (
                            <span className="text-[9px] font-black text-amber-500 flex items-center gap-1">
                              <Star size={9} fill="currentColor" /> {story.average_rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Aksiyonlar */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        {story.audio_url && (
                          <button
                            onClick={() => addToQueue({
                              id: story.id,
                              title: story.title,
                              audioUrl: story.audio_url!,
                              imageUrl: story.image_url,
                              source: playlist.is_public ? 'community_popular' : 'parent_private'
                            })}
                            className="p-2 bg-violet-50 hover:bg-violet-100 text-violet-500 rounded-xl transition-all"
                            title={tr(lang, 'Kuyruğa Ekle', 'Add to Queue')}
                          >
                            <Music size={14} />
                          </button>
                        )}
                        <Link
                          href={`/story/${story.id}?source=${playlist.is_public ? 'community_popular' : 'parent_private'}`}
                          className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-xl transition-all"
                          title={tr(lang, 'Hikayeye Git', 'Go to Story')}
                        >
                          <ExternalLink size={14} />
                        </Link>
                        {isOwner && (
                          <button
                            onClick={() => handleRemoveStory(story.rowId, story.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-400 rounded-xl transition-all"
                            title={tr(lang, 'Listeden Çıkar', 'Remove from Playlist')}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
