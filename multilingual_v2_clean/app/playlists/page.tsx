import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'
import PlaylistsClient from '@/components/PlaylistsClient'

export default async function PlaylistsPage() {
  const cookieStore = await cookies()
  const language = cookieStore.get('language')?.value || 'tr'
  const dict = await getDictionary(language as 'tr' | 'en')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Kullanıcının kendi listeleri
  const { data: myPlaylists } = await supabase
    .from('playlists')
    .select('id, title, description, cover_image, story_count, save_count, is_public, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  // Topluluk listeleri — JOIN YOK (foreign key olmayabilir)
  const { data: communityPlaylists } = await supabase
    .from('playlists')
    .select('id, title, description, cover_image, story_count, save_count, is_public, created_at, user_id')
    .eq('is_public', true)
    .order('save_count', { ascending: false })
    .limit(30)

  // Topluluk listelerinin sahiplerinin takma adlarını ayrı çek
  const communityUserIds = [...new Set((communityPlaylists || []).map((p: any) => p.user_id))]
  let pseudonymMap: Record<string, string> = {}
  if (communityUserIds.length > 0) {
    const { data: pseudonyms } = await supabase
      .from('user_pseudonyms')
      .select('user_id, pseudonym')
      .in('user_id', communityUserIds)
    pseudonymMap = Object.fromEntries((pseudonyms || []).map(p => [p.user_id, p.pseudonym]))
  }

  const communityWithPseudonyms = (communityPlaylists || []).map((p: any) => ({
    ...p,
    user_pseudonyms: pseudonymMap[p.user_id] ? { pseudonym: pseudonymMap[p.user_id] } : null
  }))

  // Kullanıcının kaydettiği listeler — JOIN YOK
  const { data: savedRows } = await supabase
    .from('playlist_saves')
    .select('playlist_id')
    .eq('user_id', user.id)

  const savedPlaylistIds = (savedRows || []).map((r: any) => r.playlist_id)
  let savedPlaylists: any[] = []
  if (savedPlaylistIds.length > 0) {
    const { data } = await supabase
      .from('playlists')
      .select('id, title, cover_image, story_count, save_count, is_public, created_at, user_id')
      .in('id', savedPlaylistIds)
    savedPlaylists = data || []
  }

  // Kullanıcının takma adı (Yoksa otomatik oluştur - self-healing fallback)
  let myPseudonym = ''
  const { data: pseudonymRow } = await supabase
    .from('user_pseudonyms')
    .select('pseudonym')
    .eq('user_id', user.id)
    .maybeSingle()

  if (pseudonymRow?.pseudonym) {
    myPseudonym = pseudonymRow.pseudonym
  } else {
    const adjectives = ['Sihirli', 'Cesur', 'Mor', 'Altın', 'Gümüş', 'Yıldızlı', 'Rüzgarlı', 'Bulutlu', 'Işıltılı', 'Neşeli']
    const nouns = ['Bulut', 'Aslan', 'Kelebek', 'Yıldız', 'Orman', 'Deniz', 'Kahraman', 'Ejderha', 'Tilki', 'Kartal']
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const autoPseudonym = `${randomAdj} ${randomNoun}`
    
    // Tabloya ekle (hata verirse yut ve fallback adı kullan)
    try {
      await supabase
        .from('user_pseudonyms')
        .insert({ user_id: user.id, pseudonym: autoPseudonym })
      myPseudonym = autoPseudonym
    } catch (e) {
      myPseudonym = autoPseudonym
    }
  }

  return (
    <PlaylistsClient
      user={user}
      myPlaylists={myPlaylists || []}
      communityPlaylists={communityWithPseudonyms}
      savedPlaylists={savedPlaylists}
      myPseudonym={myPseudonym}
      lang={language}
      dict={dict}
    />
  )
}
