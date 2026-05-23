'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ListMusic, Plus, Globe, BookMarked, Trash2,
  Play, Lock, Users, Star, Edit2, Check, X
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import { createClient } from '@/utils/supabase/client'

interface Playlist {
  id: string
  title: string
  description?: string
  cover_image: string | null
  story_count: number
  save_count: number
  is_public: boolean
  created_at: string
  user_pseudonyms?: { pseudonym: string }
}

interface PlaylistsClientProps {
  user: any
  myPlaylists: Playlist[]
  communityPlaylists: Playlist[]
  savedPlaylists: Playlist[]
  myPseudonym: string
  lang: string
  dict: any
}

const tr = (lang: string, a: string, b: string) => lang === 'tr' ? a : b

// Tek liste kartı
function PlaylistCard({
  playlist,
  lang,
  isOwner,
  onDelete,
  onTogglePublic
}: {
  playlist: Playlist
  lang: string
  isOwner?: boolean
  onDelete?: (id: string) => void
  onTogglePublic?: (id: string, current: boolean) => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(playlist.title)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const saveTitle = async () => {
    if (!title.trim() || title === playlist.title) { setEditing(false); return }
    setSaving(true)
    await supabase.from('playlists').update({ title: title.trim() }).eq('id', playlist.id)
    setSaving(false)
    setEditing(false)
  }

  const pseudonym = playlist.user_pseudonyms?.pseudonym

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-white/50"
    >
      {/* Kapak görseli */}
      <Link href={`/playlists/${playlist.id}`}>
        <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-100 to-violet-50 overflow-hidden">
          {playlist.cover_image ? (
            <img
              src={playlist.cover_image}
              alt={playlist.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ListMusic size={48} className="text-violet-200" />
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Çal butonu */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 bg-violet-500 rounded-full flex items-center justify-center shadow-2xl">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>

          {/* Masal sayısı */}
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full">
            {playlist.story_count} {tr(lang, 'masal', 'stories')}
          </div>

          {/* Public/Private badge */}
          <div className={`absolute top-3 left-3 text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${
            playlist.is_public
              ? 'bg-emerald-500/90 text-white'
              : 'bg-gray-500/90 text-white'
          }`}>
            {playlist.is_public ? <Globe size={10} /> : <Lock size={10} />}
            {playlist.is_public ? tr(lang, 'Herkese Açık', 'Public') : tr(lang, 'Gizli', 'Private')}
          </div>
        </div>
      </Link>

      {/* Bilgi kısmı */}
      <div className="p-5">
        {/* Başlık */}
        {editing ? (
          <div className="flex items-center gap-2 mb-3">
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') setEditing(false) }}
              className="flex-1 px-3 py-1.5 rounded-xl border-2 border-violet-300 focus:border-violet-500 outline-none text-sm font-black text-violet-900"
            />
            <button onClick={saveTitle} disabled={saving} className="p-1.5 bg-violet-500 text-white rounded-lg">
              <Check size={14} />
            </button>
            <button onClick={() => setEditing(false)} className="p-1.5 bg-gray-100 text-gray-500 rounded-lg">
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-2 mb-2">
            <Link href={`/playlists/${playlist.id}`} className="flex-1">
              <h3 className="font-black text-gray-800 text-base leading-tight hover:text-violet-600 transition-colors line-clamp-2">
                {playlist.title}
              </h3>
            </Link>
            {isOwner && (
              <button onClick={() => setEditing(true)} className="p-1 text-gray-300 hover:text-violet-500 transition-colors shrink-0">
                <Edit2 size={13} />
              </button>
            )}
          </div>
        )}

        {/* Takma ad (başkasının listesi) */}
        {!isOwner && pseudonym && (
          <p className="text-[11px] text-violet-400 font-bold mb-2 flex items-center gap-1">
            <Users size={11} /> {pseudonym}
          </p>
        )}

        {/* İstatistikler */}
        <div className="flex items-center gap-3 text-[10px] font-black text-gray-400">
          <span className="flex items-center gap-1">
            <BookMarked size={11} />
            {playlist.save_count} {tr(lang, 'kayıt', 'saves')}
          </span>
        </div>

        {/* Sahip aksiyonları */}
        {isOwner && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
            <button
              onClick={() => onTogglePublic?.(playlist.id, playlist.is_public)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                playlist.is_public
                  ? 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              {playlist.is_public ? <Lock size={11} /> : <Globe size={11} />}
              {playlist.is_public ? tr(lang, 'Gizle', 'Make Private') : tr(lang, 'Paylaş', 'Make Public')}
            </button>
            <button
              onClick={() => onDelete?.(playlist.id)}
              className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Ana Bileşen
export default function PlaylistsClient({
  user, myPlaylists: initialMy, communityPlaylists, savedPlaylists, myPseudonym, lang, dict
}: PlaylistsClientProps) {
  const [myPlaylists, setMyPlaylists] = useState(initialMy)
  const [tab, setTab] = useState<'mine' | 'community' | 'saved'>('mine')
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleCreate = async () => {
    if (!newTitle.trim()) return
    setSaving(true)
    const { data } = await supabase
      .from('playlists')
      .insert({ user_id: user.id, title: newTitle.trim(), is_public: true })
      .select('id, title, cover_image, story_count, save_count, is_public, created_at')
      .single()
    if (data) {
      setMyPlaylists(prev => [data, ...prev])
      setNewTitle('')
      setCreating(false)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(lang === 'tr' ? 'Bu listeyi silmek istediğine emin misin?' : 'Are you sure you want to delete this playlist?')) return
    await supabase.from('playlists').delete().eq('id', id)
    setMyPlaylists(prev => prev.filter(p => p.id !== id))
  }

  const handleTogglePublic = async (id: string, current: boolean) => {
    await supabase.from('playlists').update({ is_public: !current }).eq('id', id)
    setMyPlaylists(prev => prev.map(p => p.id === id ? { ...p, is_public: !current } : p))
  }

  const tabs = [
    { key: 'mine' as const, label: lang === 'tr' ? 'Listelerim' : 'My Playlists', count: myPlaylists.length },
    { key: 'community' as const, label: lang === 'tr' ? 'Topluluk' : 'Community', count: communityPlaylists.length },
    { key: 'saved' as const, label: lang === 'tr' ? 'Kayıttakiler' : 'Saved', count: savedPlaylists.length },
  ]

  const currentList = tab === 'mine' ? myPlaylists : tab === 'community' ? communityPlaylists : savedPlaylists

  return (
    <div className="min-h-screen bg-[#BDD9F2] relative pb-32">
      {/* Arkaplan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/50 via-transparent to-[#BDD9F2]/80" />
      </div>

      <div className="relative z-10">
        <Navbar user={user} />

        <main className="max-w-7xl mx-auto px-6 py-12">

          {/* Başlık */}
          <div className="text-center mb-10 space-y-3">
            <h1 className="text-5xl md:text-6xl font-lora font-black text-white drop-shadow-2xl">
              {lang === 'tr' ? 'Sihirli Dinleme Listeleri' : 'Magic Playlists'}
            </h1>
            <p className="text-white/80 text-base font-bold">
              {myPseudonym && (
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-black text-white">
                  ✨ {myPseudonym}
                </span>
              )}
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 bg-white/20 backdrop-blur-xl rounded-full gap-1 border border-white/30 shadow-xl">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    tab === t.key
                      ? 'bg-white text-violet-600 shadow-lg scale-105'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t.label}
                  {t.count > 0 && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                      tab === t.key ? 'bg-violet-100 text-violet-600' : 'bg-white/20 text-white'
                    }`}>
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Yeni Liste Oluştur (sadece "Listelerim" tab'ında) */}
          {tab === 'mine' && (
            <div className="flex justify-center mb-10">
              {creating ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-violet-200"
                >
                  <input
                    autoFocus
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setCreating(false) }}
                    placeholder={lang === 'tr' ? 'Liste adı gir...' : 'Enter playlist name...'}
                    className="w-64 px-3 py-1.5 rounded-xl border-2 border-violet-200 focus:border-violet-400 outline-none text-sm font-black text-violet-900 placeholder-violet-200"
                  />
                  <button
                    onClick={handleCreate}
                    disabled={saving || !newTitle.trim()}
                    className="px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl font-black text-xs disabled:opacity-50 transition-all"
                  >
                    {saving ? '...' : lang === 'tr' ? 'Oluştur' : 'Create'}
                  </button>
                  <button onClick={() => setCreating(false)} className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:bg-gray-200 transition-all">
                    <X size={14} />
                  </button>
                </motion.div>
              ) : (
                <button
                  id="create-playlist-btn"
                  onClick={() => setCreating(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-full font-black text-sm shadow-xl hover:scale-105 transition-all"
                >
                  <Plus size={18} />
                  {lang === 'tr' ? 'Yeni Liste Oluştur' : 'Create New Playlist'}
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {currentList.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20 bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/30">
              <ListMusic size={64} className="text-white/30 mx-auto mb-4" />
              <h2 className="text-xl font-black text-white mb-2">
                {tab === 'mine'
                  ? (lang === 'tr' ? 'Henüz listeniz yok' : 'No playlists yet')
                  : tab === 'saved'
                  ? (lang === 'tr' ? 'Henüz liste kaydetmediniz' : 'No saved playlists')
                  : (lang === 'tr' ? 'Topluluk listesi bulunamadı' : 'No community playlists found')}
              </h2>
              {tab === 'mine' && (
                <button
                  onClick={() => setCreating(true)}
                  className="mt-4 px-8 py-3 bg-white text-violet-600 rounded-full font-black text-sm hover:scale-105 transition-all"
                >
                  {lang === 'tr' ? 'İlk Listeni Oluştur' : 'Create Your First Playlist'}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentList.map((pl, i) => (
                <motion.div
                  key={pl.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <PlaylistCard
                    playlist={pl}
                    lang={lang}
                    isOwner={tab === 'mine'}
                    onDelete={handleDelete}
                    onTogglePublic={handleTogglePublic}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
