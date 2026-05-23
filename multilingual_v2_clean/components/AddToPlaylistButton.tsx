'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ListPlus, Plus, Check, X, Loader2, BookMarked } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

interface Playlist {
  id: string
  title: string
  story_count: number
  cover_image: string | null
}

interface AddToPlaylistButtonProps {
  story: {
    id: string
    title: string
    image_url: string
  }
  lang: string
}

export default function AddToPlaylistButton({ story, lang }: AddToPlaylistButtonProps) {
  const [open, setOpen] = useState(false)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(false)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [savingNew, setSavingNew] = useState(false)

  const supabase = createClient()
  const tr = (a: string, b: string) => lang === 'tr' ? a : b

  // Modal açılınca listeleri çek
  useEffect(() => {
    if (!open) return
    const fetch = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('playlists')
        .select('id, title, story_count, cover_image')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      setPlaylists(data || [])

      // Bu masalın hangi listelerde olduğunu kontrol et
      if (data && data.length > 0) {
        const { data: existing } = await supabase
          .from('playlist_stories')
          .select('playlist_id')
          .eq('story_id', story.id)
          .in('playlist_id', data.map(p => p.id))

        setAddedIds(new Set((existing || []).map(e => e.playlist_id)))
      }

      setLoading(false)
    }
    fetch()
  }, [open, story.id])

  const handleToggle = async (playlistId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (addedIds.has(playlistId)) {
      // Kaldır
      await supabase
        .from('playlist_stories')
        .delete()
        .eq('playlist_id', playlistId)
        .eq('story_id', story.id)
      setAddedIds(prev => { const s = new Set(prev); s.delete(playlistId); return s })
      setPlaylists(prev => prev.map(p =>
        p.id === playlistId ? { ...p, story_count: Math.max(p.story_count - 1, 0) } : p
      ))
    } else {
      // Ekle
      const { data: maxOrder } = await supabase
        .from('playlist_stories')
        .select('sort_order')
        .eq('playlist_id', playlistId)
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle()

      await supabase
        .from('playlist_stories')
        .insert({ playlist_id: playlistId, story_id: story.id, sort_order: (maxOrder?.sort_order ?? -1) + 1 })
      setAddedIds(prev => new Set([...prev, playlistId]))
      setPlaylists(prev => prev.map(p =>
        p.id === playlistId ? { ...p, story_count: p.story_count + 1 } : p
      ))
    }
  }

  const handleCreateNew = async () => {
    if (!newTitle.trim()) return
    setSavingNew(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSavingNew(false); return }

    const { data: newPlaylist } = await supabase
      .from('playlists')
      .insert({
        user_id: user.id,
        title: newTitle.trim(),
        cover_image: story.image_url,
        is_public: true
      })
      .select('id, title, story_count, cover_image')
      .single()

    if (newPlaylist) {
      // Masalı yeni listeye ekle
      await supabase
        .from('playlist_stories')
        .insert({ playlist_id: newPlaylist.id, story_id: story.id, sort_order: 0 })

      setPlaylists(prev => [{ ...newPlaylist, story_count: 1 }, ...prev])
      setAddedIds(prev => new Set([...prev, newPlaylist.id]))
    }

    setNewTitle('')
    setCreating(false)
    setSavingNew(false)
  }

  // SSR güvenliği için portal mount kontrolü
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const modalContent = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="playlist-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            key="playlist-modal-panel"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto max-w-md px-4 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-[2rem] shadow-2xl border border-violet-100 overflow-hidden">

              {/* Tutamaç */}
              <div className="flex justify-center pt-4 pb-1">
                <div className="w-10 h-1 bg-violet-200 rounded-full" />
              </div>

              {/* Başlık */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-violet-50">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-400">
                    {tr('Listeye Ekle', 'Add to Playlist')}
                  </p>
                  <h3 className="text-violet-900 font-black text-sm line-clamp-1">{story.title}</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-full bg-violet-50 hover:bg-violet-100 text-violet-400 transition-all"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Liste */}
              <div className="max-h-64 overflow-y-auto divide-y divide-violet-50">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 size={24} className="text-violet-400 animate-spin" />
                  </div>
                ) : playlists.length === 0 && !creating ? (
                  <div className="flex flex-col items-center py-8 gap-2 text-violet-300">
                    <BookMarked size={32} />
                    <p className="text-xs font-bold">
                      {tr('Henüz listeniz yok', 'No playlists yet')}
                    </p>
                  </div>
                ) : (
                  playlists.map(pl => (
                    <button
                      key={pl.id}
                      onClick={() => handleToggle(pl.id)}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 hover:bg-violet-50 transition-colors ${
                        addedIds.has(pl.id) ? 'bg-violet-50/60' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-violet-100 shrink-0">
                        {pl.cover_image ? (
                          <img src={pl.cover_image} alt={pl.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-violet-300">
                            <BookMarked size={16} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-black text-sm text-violet-900 truncate">{pl.title}</p>
                        <p className="text-[10px] text-violet-400 font-medium">
                          {pl.story_count} {tr('masal', 'stories')}
                        </p>
                      </div>
                      {addedIds.has(pl.id) && (
                        <Check size={18} className="text-violet-500 shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Yeni Liste Oluştur */}
              <div className="px-5 py-4 border-t border-violet-50">
                {creating ? (
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleCreateNew(); if (e.key === 'Escape') setCreating(false) }}
                      placeholder={tr('Liste adı...', 'Playlist name...')}
                      className="flex-1 px-4 py-2.5 rounded-xl border-2 border-violet-200 focus:border-violet-400 outline-none text-sm font-bold text-violet-900 placeholder-violet-200"
                    />
                    <button
                      onClick={handleCreateNew}
                      disabled={savingNew || !newTitle.trim()}
                      className="px-4 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-xl font-black text-xs disabled:opacity-50 transition-all"
                    >
                      {savingNew ? <Loader2 size={14} className="animate-spin" /> : tr('Oluştur', 'Create')}
                    </button>
                    <button
                      onClick={() => { setCreating(false); setNewTitle('') }}
                      className="p-2.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-400 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCreating(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-violet-200 hover:border-violet-400 hover:bg-violet-50 text-violet-400 hover:text-violet-600 font-black text-xs transition-all"
                  >
                    <Plus size={16} />
                    {tr('Yeni Liste Oluştur', 'Create New Playlist')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Tetikleyici buton */}
      <button
        id={`add-to-playlist-${story.id}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
        className="p-2.5 bg-violet-500/90 backdrop-blur-md rounded-full shadow-xl text-white hover:bg-violet-600 hover:scale-110 transition-all duration-200"
        title={tr('Listeye Ekle', 'Add to Playlist')}
      >
        <ListPlus size={18} />
      </button>

      {/* Modal — document.body'de render edilir, hiçbir DOM kısıtlamasından etkilenmez */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  )
}
