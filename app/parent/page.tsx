import { BookHeart, Plus, Settings, Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ParentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Kullanıcının profillerini (çocuklarını) alalım
  const { data: profiles } = await supabase.from('profiles').select('id, name').eq('user_id', user.id)
  const profileIds = profiles?.map(p => p.id) || []

  // Çocuğun masallarını çekelim
  let recentStories: any[] = []
  if (profileIds.length > 0) {
    const { data: stories } = await supabase
      .from('stories')
      .select('id, title, created_at, profiles(name)')
      .in('profile_id', profileIds)
      .order('created_at', { ascending: false })
      .limit(10)
    
    recentStories = stories || []
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ebeveyn Kontrol Paneli</h1>
          <p className="text-gray-500 mt-1">Çocuklarınızın masal dünyasını buradan yönetin.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/settings" className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition">
            <Settings size={24} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats & Quick Actions */}
        <div className="space-y-8">
          {/* Quick Create Action */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-200">
            <h2 className="text-2xl font-bold mb-2">Yeni Masal Yarat!</h2>
            <p className="text-indigo-100 mb-6">Yapay zeka destekli yeni bir macera oluşturmak için hemen başlayın.</p>
            <Link href="/" className="flex items-center justify-center w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-md">
              <Plus size={24} className="mr-2" />
              Masal Oluştur
            </Link>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg border-b pb-4">Aylık İstatistikler</h3>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
              <div className="flex items-center text-orange-600 font-semibold">
                <BookHeart className="mr-3" size={24} /> Okunan Masallar
              </div>
              <span className="text-2xl font-black text-orange-700">{recentStories.length}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Library */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Eski Masallar Kütüphanesi</h2>
          </div>

          {recentStories.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Henüz masal oluşturmadınız.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentStories.map((story) => (
                <Link href={`/story/${story.id}`} key={story.id} className="group relative p-6 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 rounded-3xl transition-all cursor-pointer block">
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm text-yellow-400">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <BookHeart size={24} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-900 transition-colors">
                    {story.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">{story.profiles?.name || 'Çocuk'}</span>
                    <span>{new Date(story.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Upgrade Banner */}
          <div className="mt-8 bg-gradient-to-r from-amber-100 to-yellow-50 border border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-amber-900 font-bold text-lg">Premium&apos;a Geçin!</h3>
              <p className="text-amber-800/80 mt-1">Kendi sesinizi klonlayarak masalları siz okuyun.</p>
            </div>
            <Link href="/settings" className="mt-4 md:mt-0 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all inline-block text-center">
              Yükselt
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
