'use client'

import { AlertTriangle, Home, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SuspendedPage() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#BDD9F2] flex flex-col items-center justify-center p-6 font-nunito relative overflow-hidden">
      {/* Background Magic */}
      <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/20 via-[#BDD9F2]/40 to-[#BDD9F2]/90 pointer-events-none"></div>

      {/* Main Content */}
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-red-900/10 border border-white relative z-10 overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity">
          <AlertTriangle size={200} className="text-red-900" />
        </div>
        
        <div className="mx-auto w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-inner border border-red-100">
          <AlertTriangle size={48} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-[#052159] font-lora mb-6 relative z-10">Hesabınız Askıya Alındı</h1>
        
        <p className="text-gray-600 font-medium text-lg mb-10 relative z-10 leading-relaxed max-w-lg mx-auto">
          Sistem yöneticileri tarafından hesabınız geçici veya kalıcı olarak durdurulmuştur. Güvenlik politikalarımız gereği şu anda platformu kullanamazsınız. Bu durumun bir hata olduğunu düşünüyorsanız lütfen destek ekibiyle iletişime geçin.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href="mailto:destek@mystory.ai" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95">
            Destek ile İletişime Geç
          </a>
          <button onClick={handleLogout} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm active:scale-95">
            <LogOut size={20} />
            Güvenli Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  )
}
