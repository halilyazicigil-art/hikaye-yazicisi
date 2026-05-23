'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Sparkles, KeyRound, Mail, Loader2, Globe, Check } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

export default function RegisterPage() {
  const { t, language, setLanguage } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Kullanıcı sisteme girdiğinde varsayılan olarak İngilizce görsün (Eğer daha önce seçmediyse)
  useEffect(() => {
    const saved = localStorage.getItem('app-language')
    if (!saved) {
      setLanguage('en')
    }
  }, [setLanguage])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          preferred_language: language
        }
      },
    })

    if (error) {
      setError(error.message)
    } else {
      // Başarılı kayıtta çerezi mühürle
      document.cookie = `language=${language}; path=/; max-age=31536000; samesite=lax`
      setSuccess(true)
    }
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    // Google ile girmeden önce çerezi mühürle
    document.cookie = `language=${language}; path=/; max-age=31536000; samesite=lax`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4 font-sans">
      <div className="w-full max-w-[440px]">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 text-orange-500 mb-6 hover:scale-105 transition-transform">
            <Sparkles size={28} strokeWidth={2} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('auth.register.title')}</h1>
          <p className="text-gray-500 mt-2">{t('auth.register.subtitle')}</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06),0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] p-8 md:p-10 border border-gray-100">
          
          {success ? (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('auth.register.success_title')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {t('auth.register.success_desc')}
              </p>
              <Link href="/login" className="block w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]">
                {t('auth.register.success_button')}
              </Link>
            </div>
          ) : (
            <>
              {/* Social Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70"
              >
                {isGoogleLoading ? <Loader2 className="animate-spin mr-3 text-gray-400" size={20} /> : <GoogleIcon />}
                {t('auth.register.google_button')}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">{t('auth.register.or')}</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium animate-in fade-in slide-in-from-top-1">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t('auth.register.email_label')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400 font-medium"
                      placeholder={t('auth.register.email_placeholder')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t('auth.register.password_label')}</label>
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
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400 font-medium"
                      placeholder={t('auth.register.password_placeholder')}
                    />
                  </div>
                </div>

                {/* Language Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <Globe size={14} className="text-gray-400" />
                    {t('auth.register.lang_label')}
                  </label>
                  <div className="flex p-1 bg-gray-50 border border-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setLanguage('tr')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                        language === 'tr' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Türkçe
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                        language === 'en' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-base transition-all flex items-center justify-center shadow-lg shadow-orange-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                  {isLoading ? t('auth.register.button_loading') : t('auth.register.button')}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500 font-medium">
          {t('auth.register.has_account')}{' '}
          <Link href="/login" className="font-bold text-orange-600 hover:text-orange-500 transition-colors">
            {t('auth.register.login_now')}
          </Link>
        </p>
      </div>
    </div>
  )
}
