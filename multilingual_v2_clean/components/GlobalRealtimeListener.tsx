'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'

export default function GlobalRealtimeListener() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const [userId, setUserId] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // 1. Mevcut kullanıcıyı ve rolünü öğren
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        const { data: userData } = await supabase
          .from('users')
          .select('role, is_suspended')
          .eq('id', user.id)
          .single()
        
        setIsAdmin(userData?.role === 'admin')
        
        // Eğer giriş anında askıdaysa ve henüz askıya alınma sayfasında değilse direkt yönlendir
        if (userData?.is_suspended && !pathname?.startsWith('/suspended')) {
          router.push('/suspended')
        }
      }
    }
    fetchUser()
  }, [pathname, router, supabase])

  useEffect(() => {
    // 2. Realtime Abonelikleri
    const channel = supabase.channel('global-realtime-security')

    // A. Sistem Bakım Modu Dinleyicisi
    channel.on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'system_settings', filter: 'id=eq.1' },
      (payload) => {
        const newSettings = payload.new as any
        // Eğer bakım modu açıldıysa ve kullanıcı admin değilse, bakım sayfasına at
        if (newSettings?.maintenance_mode && !isAdmin) {
          if (!pathname?.startsWith('/maintenance')) {
            router.push('/maintenance')
          }
        }
        // Eğer bakım modu kapandıysa ve bakım sayfasındaysa, ana sayfaya at
        if (!newSettings?.maintenance_mode && pathname?.startsWith('/maintenance')) {
          router.push('/')
        }
      }
    )

    // B. Kullanıcı Askıya Alınma Dinleyicisi (Sadece kendi ID'sini dinler)
    if (userId) {
      channel.on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${userId}` },
        (payload) => {
          const updatedUser = payload.new as any
          
          if (updatedUser?.is_suspended) {
            // Anında kilit ekranına yönlendir
            if (!pathname?.startsWith('/suspended')) {
              window.location.href = '/suspended' // Tam bir yenileme ve kilit için window.location
            }
          } else {
            // Engel kalktıysa ana sayfaya döndür
            if (pathname?.startsWith('/suspended')) {
              window.location.href = '/'
            }
          }
        }
      )
    }

    // Aboneliği başlat
    channel.subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, isAdmin, pathname, router, supabase])

  return null // Ekranda hiçbir şey göstermeyen "görünmez" bir kalkandır
}
