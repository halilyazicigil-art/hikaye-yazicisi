'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function SettingsPage() {
  const [sub, setSub] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle()
        setSub(data)
      }
    }
    loadData()
  }, [])

  const handleUpgrade = async () => {
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (e) {
      alert('Ödeme sayfasına yönlendirilemedi.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="mb-8">
          <Link href="/parent" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
            &larr; Kütüphaneye Dön
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Ayarlar</h1>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Abonelik Durumu</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600 font-medium">Hesap Email</span>
              <span className="font-bold text-gray-900">{user?.email || 'Yükleniyor...'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600 font-medium">Mevcut Plan</span>
              <span className="font-bold text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-lg">
                {sub?.plan_id || 'FREEMIUM'}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600 font-medium">Abonelik Durumu</span>
              <span className={`font-bold px-3 py-1 rounded-lg ${sub?.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                {sub?.status === 'active' ? 'Aktif' : 'Pasif'}
              </span>
            </div>
          </div>
          
          {sub?.status !== 'active' && (
            <div className="mt-8 border-t pt-8">
              <h3 className="text-xl font-bold mb-2">Sınırları Kaldırın</h3>
              <p className="text-gray-500 mb-6">Ayda 50 masal hakkı ve premium özellikler için MasalKovanı Premium paketine geçin.</p>
              <button 
                onClick={handleUpgrade}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                MasalKovanı Premium ($15/ay)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
