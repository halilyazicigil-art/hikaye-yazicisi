'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Calendar, CreditCard, ShieldCheck, ArrowLeft, Crown, Cloud, Star } from 'lucide-react'

export default function SettingsPage() {
  const [sub, setSub] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loadingPortal, setLoadingPortal] = useState(false)
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

  const handleUpgrade = async (planName: 'pro' | 'premium') => {
    try {
      const res = await fetch('/api/stripe/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planName })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (e) {
      alert('Ödeme sayfasına yönlendirilemedi.')
    }
  }

  const handleManageSubscription = async () => {
    setLoadingPortal(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Portal açılamadı.')
      }
    } catch (e) {
      alert('Abonelik yönetim sayfasına şu an ulaşılamıyor.')
    } finally {
      setLoadingPortal(false)
    }
  }

  // Tarihleri hesaplayalım
  const endDate = sub?.current_period_end ? new Date(sub.current_period_end) : null
  const startDate = endDate ? new Date(endDate) : null
  if (startDate) startDate.setDate(startDate.getDate() - 30)

  const formatDate = (date: Date | null) => {
    if (!date) return '-'
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const getPlanName = (planId: string) => {
    switch (planId) {
      case 'premium': return 'Altın Güneş 👑'
      case 'pro': return 'Gümüş Gökyüzü ☁️'
      default: return 'Pamuk Bulut (Ücretsiz) ☁️'
    }
  }

  return (
    <div className="min-h-screen bg-[#BDD9F2] font-nunito p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/parent" className="flex items-center gap-2 px-4 py-2 bg-white/50 text-[#84B1D9] font-bold rounded-xl hover:bg-white transition-all shadow-sm">
            <ArrowLeft size={20} /> Kütüphaneye Dön
          </Link>
        </div>

        <h1 className="text-4xl font-lora font-bold text-gray-900">Hesap Ayarları</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left: User Info & Plan Status */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-sky-900/10">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-[#84B1D9]" size={28} />
                <h2 className="text-2xl font-lora font-bold text-gray-800">Abonelik Detayları</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-[#BDD9F2]/20 rounded-2xl border border-[#BDD9F2]/30">
                  <p className="text-sm text-gray-500 mb-1">Mevcut Plan</p>
                  <p className="text-xl font-bold text-[#84B1D9]">{getPlanName(sub?.plan_id)}</p>
                </div>
                
                <div className="p-6 bg-[#BDD9F2]/20 rounded-2xl border border-[#BDD9F2]/30">
                  <p className="text-sm text-gray-500 mb-1">Abonelik Durumu</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${sub?.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {sub?.status === 'active' ? '● Aktif' : '○ Pasif'}
                  </span>
                </div>

                <div className="p-6 bg-white border border-sky-100 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Calendar size={16} /> Başlangıç Tarihi
                  </div>
                  <p className="text-lg font-bold text-gray-800">{formatDate(startDate)}</p>
                </div>

                <div className="p-6 bg-white border border-sky-100 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Calendar size={16} /> {sub?.status === 'active' ? 'Sıradaki Yenileme' : 'Bitiş Tarihi'}
                  </div>
                  <p className="text-lg font-bold text-gray-800">{formatDate(endDate)}</p>
                </div>
              </div>

              {sub?.status === 'active' && (
                <div className="mt-8 pt-8 border-t border-sky-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <CreditCard size={20} className="text-[#84B1D9]" /> Otomatik Ödeme Aktif
                      </h3>
                      <p className="text-sm text-gray-500">Aboneliğiniz yenileme tarihinde kartınızdan otomatik olarak tahsil edilecektir.</p>
                    </div>
                    <button 
                      onClick={handleManageSubscription}
                      disabled={loadingPortal}
                      className="w-full sm:w-auto px-6 py-3 bg-[#84B1D9] text-white rounded-xl font-bold hover:bg-[#8FBDD9] transition-all shadow-md disabled:opacity-50"
                    >
                      {loadingPortal ? 'Yükleniyor...' : 'Ödeme Yöntemini Yönet'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Upgrade Options if not Premium */}
          <div className="space-y-6">
            {sub?.plan_id !== 'premium' && (
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <Crown className="absolute top-[-10%] right-[-10%] text-white/10 w-32 h-32" />
                <h3 className="text-2xl font-lora font-bold mb-4 relative z-10">Paketini Yükselt</h3>
                
                <div className="space-y-4 relative z-10">
                  {sub?.plan_id !== 'pro' && (
                    <button 
                      onClick={() => handleUpgrade('pro')}
                      className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-left transition-all group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold flex items-center gap-2">
                          <Cloud size={18} /> Gümüş Gökyüzü
                        </span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-md">750 TL/ay</span>
                      </div>
                      <p className="text-xs text-indigo-100">50 Masal Arşivi ve Gelişmiş Özellikler</p>
                    </button>
                  )}

                  <button 
                    onClick={() => handleUpgrade('premium')}
                    className="w-full bg-white text-indigo-600 p-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all text-left"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center gap-2">
                        <Star size={18} className="fill-indigo-600" /> Altın Güneş
                      </span>
                    </div>
                    <p className="text-lg font-black mb-2">1.881,11 TL/ay</p>
                    <p className="text-[10px] text-indigo-400 font-normal">100 Masal Arşivi, Ses Klonlama ve Sınırsız Hayal Gücü.</p>
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white/50 p-6 rounded-[2rem] border border-white/50">
              <h4 className="font-bold text-gray-700 mb-2">Destek Lazım mı?</h4>
              <p className="text-sm text-gray-500 mb-4">Abonelik veya ödemelerle ilgili her türlü sorunuz için bize ulaşın.</p>
              <a href="mailto:destek@mystory.com" className="text-[#84B1D9] font-bold hover:underline">destek@mystory.com</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
