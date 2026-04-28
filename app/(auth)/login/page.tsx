'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { BookOpen, KeyRound, Mail, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push('/parent')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-6 shadow-sm">
            <BookOpen size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Hoş Geldiniz</h1>
          <p className="text-gray-500 text-sm">Ebeveyn kontrol paneline erişmek için giriş yapın.</p>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 space-y-5">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">E-posta Adresi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="ornek@mail.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Şifre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <KeyRound size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-semibold text-base transition-all flex items-center justify-center shadow-lg shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="relative z-10 text-center mt-8 text-sm text-gray-500">
          Hesabınız yok mu?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Hemen Kaydolun
          </Link>
        </p>
      </div>
    </div>
  )
}
