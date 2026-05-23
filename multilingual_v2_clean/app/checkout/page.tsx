'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Cloud, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const [status, setStatus] = useState<'checking' | 'redirecting' | 'error'>('checking')
  const supabase = createClient()
  const { t } = useLanguage()

  useEffect(() => {
    async function startCheckout() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        const nextUrl = encodeURIComponent(`/checkout?plan=${plan}`)
        router.push(`/login?next=${nextUrl}`)
        return
      }

      if (plan === 'free') {
        router.push('/parent')
        return
      }

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
      } catch (err) {
        console.error('Checkout error:', err)
        setStatus('error')
      }
    }

    startCheckout()
  }, [plan, router, supabase.auth])

  return (
    <div className="min-h-screen bg-[#BDD9F2]/20 flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-white max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-blue-600" />
        
        {status === 'error' ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-4 font-lora">{t('checkout.error_title')}</h1>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              {t('checkout.error_desc')}
            </p>
            <Link 
              href="/pricing" 
              className="inline-flex px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
            >
              {t('checkout.retry')}
            </Link>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-sky-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-sky-200 animate-bounce">
              {status === 'checking' ? <Loader2 size={32} className="animate-spin" /> : <Sparkles size={32} />}
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4 font-lora">
              {status === 'checking' ? t('checkout.checking_status') : t('checkout.redirecting_status')}
            </h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              {status === 'checking' ? t('checkout.checking_desc') : t('checkout.redirecting_desc')}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 bg-sky-200 rounded-full animate-bounce" 
                    style={{ animationDelay: `${i * 0.15}s` }} 
                  />
                ))}
              </div>
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Stripe Secure Checkout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#BDD9F2]/20 flex items-center justify-center">
        <Loader2 className="animate-spin text-sky-500" size={48} />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
