'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Cloud, Loader2 } from 'lucide-react'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const [status, setStatus] = useState<'checking' | 'redirecting' | 'error'>('checking')
  const supabase = createClient()

  useEffect(() => {
    async function startCheckout() {
      // 1. Kullanıcı oturumunu kontrol et
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Giriş yapmamışsa login sayfasına yönlendir, girişten sonra buraya dönsün
        const nextUrl = encodeURIComponent(`/checkout?plan=${plan}`)
        router.push(`/login?next=${nextUrl}`)
        return
      }

      // 2. Ücretsiz plan seçildiyse doğrudan panele gönder
      if (plan === 'free') {
        router.push('/parent')
        return
      }

      // 3. Ödeme oturumu oluştur
      try {
        setStatus('redirecting')
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan })
        })

        const data = await res.json()

        if (data.url) {
          window.location.href = data.url
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error('Checkout error:', error)
        setStatus('error')
      }
    }

    if (plan) {
      startCheckout()
    } else {
      router.push('/pricing')
    }
  }, [plan, router, supabase])

  return (
    <div className="min-h-screen bg-[#EFEBED] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full border border-white/50">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Cloud className="w-16 h-16 text-[#84B1D9] fill-[#84B1D9]" />
            <Loader2 className="w-8 h-8 text-[#052159] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
        </div>

        {status === 'checking' && (
          <>
            <h1 className="text-2xl font-lora font-bold text-[#052159] mb-4">Oturum Kontrol Ediliyor</h1>
            <p className="text-gray-500 italic">Lütfen bekleyin, sizi harika masallara ulaştırıyoruz...</p>
          </>
        )}

        {status === 'redirecting' && (
          <>
            <h1 className="text-2xl font-lora font-bold text-[#052159] mb-4">Ödemeye Hazırlanıyor</h1>
            <p className="text-gray-500 italic">Güvenli ödeme sayfasına yönlendiriliyorsunuz. Lütfen sayfayı kapatmayın.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-lora font-bold text-red-500 mb-4">Bir Hata Oluştu</h1>
            <p className="text-gray-500 mb-8">Ödeme oturumu başlatılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#84B1D9] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6FA3CD] transition"
            >
              Tekrar Dene
            </button>
          </>
        )}
      </div>
      
      <div className="mt-12 flex items-center gap-6 opacity-30 grayscale pointer-events-none">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#EFEBED] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#84B1D9] animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

