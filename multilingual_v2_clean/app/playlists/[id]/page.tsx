import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'
import PlaylistDetailClient from '@/components/PlaylistDetailClient'

export default async function PlaylistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'tr'
  const dict = await getDictionary(language as 'tr' | 'en')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Playlist — join YOK (foreign key eksik olabilir)
  const { data: playlist } = await supabase
    .from('playlists')
    .select('id, title, description, cover_image, story_count, save_count, is_public, user_id, created_at')
    .eq('id', id)
    .single()

  if (!playlist) notFound()

  // Gizli listeye erişim kontrolü
  if (!playlist.is_public && playlist.user_id !== user?.id) notFound()

  // Playlist sahibinin takma adını ayrı sorgula
  const { data: pseudonymRow } = await supabase
    .from('user_pseudonyms')
    .select('pseudonym')
    .eq('user_id', playlist.user_id)
    .maybeSingle()

  const playlistWithPseudonym = {
    ...playlist,
    user_pseudonyms: pseudonymRow ? { pseudonym: pseudonymRow.pseudonym } : null
  }

  // Listedeki masallar (sıralı)
  const { data: playlistStories } = await supabase
    .from('playlist_stories')
    .select('id, sort_order, story_id')
    .eq('playlist_id', id)
    .order('sort_order', { ascending: true })

  // Masal detaylarını ayrı çek
  const storyIds = (playlistStories || []).map((ps: any) => ps.story_id)
  let storiesData: any[] = []
  if (storyIds.length > 0) {
    const { data } = await supabase
      .from('stories')
      .select('id, title, image_url, audio_url, content_json, metadata, average_rating')
      .in('id', storyIds)
    storiesData = data || []
  }

  // Sort order ile birleştir
  const stories = (playlistStories || []).map((ps: any) => {
    const story = storiesData.find(s => s.id === ps.story_id)
    return story ? { ...story, rowId: ps.id, sort_order: ps.sort_order } : null
  }).filter(Boolean)

  // Kullanıcı bu listeyi kaydetmiş mi?
  let isSaved = false
  if (user) {
    const { data: saveCheck } = await supabase
      .from('playlist_saves')
      .select('id')
      .eq('user_id', user.id)
      .eq('playlist_id', id)
      .maybeSingle()
    isSaved = !!saveCheck
  }

  const isOwner = user?.id === playlist.user_id

  return (
    <PlaylistDetailClient
      user={user}
      playlist={playlistWithPseudonym as any}
      stories={stories}
      isSaved={isSaved}
      isOwner={isOwner}
      lang={language}
      dict={dict}
    />
  )
}
