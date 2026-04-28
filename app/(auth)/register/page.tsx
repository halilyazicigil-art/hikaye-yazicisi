'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Sparkles, KeyRound, Mail, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-rose-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 mb-6 shadow-sm">
            <Sparkles size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Hesap Oluştur</h1>
          <p className="text-gray-500 text-sm">Çocuğunuz için sihirli masallar yaratmaya başlayın.</p>
        </div>

        {success ? (
          <div className="relative z-10 text-center p-6 bg-green-50 border border-green-100 rounded-2xl">
            <h3 className="text-green-800 font-bold mb-2 text-lg">Kayıt Başarılı!</h3>
            <p className="text-green-600 text-sm mb-4">Lütfen e-posta adresinize gönderilen doğrulama bağlantısına tıklayın.</p>
            <Link href="/login" className="inline-block py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors">
              Giriş Yap
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="relative z-10 space-y-5">
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
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
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
                  minLength={6}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="En az 6 karakter"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-semibold text-base transition-all flex items-center justify-center shadow-lg shadow-orange-600/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
              {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
          </form>
        )}

        <p className="relative z-10 text-center mt-8 text-sm text-gray-500">
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
            Giriş Yapın
          </Link>
        </p>
      </div>
    </div>
  )
}
