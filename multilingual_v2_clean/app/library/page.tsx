import { createClient } from '@/utils/supabase/server'
import LibraryClient from '@/components/LibraryClient'
import { cookies } from 'next/headers'
import { getDictionary } from '@/utils/getDictionary'

export default async function LibraryPage() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get('language')?.value as 'en' | 'tr') || 'tr'
  const dict = getDictionary(lang)
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Tüm hikayeleri çekiyoruz (Filtreleme Client tarafında yapılacak)
  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('is_shuffle', false)
    .order('created_at', { ascending: false })

  // Herkese açık popüler dinleme listelerini çekiyoruz (Maksimum 10 adet)
  const { data: publicPlaylists } = await supabase
    .from('playlists')
    .select('id, title, cover_image, story_count, save_count, is_public, user_id, created_at')
    .eq('is_public', true)
    .order('save_count', { ascending: false })
    .limit(10)

  // Bu listelerin sahiplerinin takma adlarını ayrı çekiyoruz (Join olmadan, FK hatasını önlemek için)
  const userIds = [...new Set((publicPlaylists || []).map((p: any) => p.user_id))]
  let pseudonymMap: Record<string, string> = {}
  if (userIds.length > 0) {
    const { data: pseudonyms } = await supabase
      .from('user_pseudonyms')
      .select('user_id, pseudonym')
      .in('user_id', userIds)
    pseudonymMap = Object.fromEntries((pseudonyms || []).map(p => [p.user_id, p.pseudonym]))
  }

  const playlistsWithPseudonyms = (publicPlaylists || []).map((p: any) => ({
    ...p,
    user_pseudonyms: pseudonymMap[p.user_id] ? { pseudonym: pseudonymMap[p.user_id] } : null
  }))

  return (
    <LibraryClient 
      stories={stories || []} 
      publicPlaylists={playlistsWithPseudonyms}
      user={user} 
      dict={dict} 
      lang={lang} 
    />
  )
}
