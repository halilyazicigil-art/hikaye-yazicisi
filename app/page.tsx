import StoryForm from '@/components/StoryForm'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let isPro = false;
  let isPremium = false;

  if (user) {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan_id, current_period_end')
      .eq('user_id', user.id)
      .maybeSingle()

    const now = new Date()
    const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true

    if (!isExpired) {
      if (sub?.plan_id === 'pro') isPro = true;
      if (sub?.plan_id === 'premium') isPremium = true;
    }
  }

  return (
    <main className="min-h-screen bg-[#BDD9F2] text-[#052159] overflow-x-hidden font-nunito relative">
      
      {/* 🌌 TÜM SAYFAYI KAPSAYAN SABİT SİHİRLİ ARKA PLAN */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Ana Görsel Katmanı - Fixed yaparak her yere yayıyoruz */}
        <div className="absolute inset-0 bg-[url('/clouds_paper_boats_bg.png')] bg-cover bg-center bg-no-repeat opacity-60"></div>
        {/* Yumuşak Renk Overlay'i - Sayfa boyunca sabit kalır */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/20 via-[#BDD9F2]/40 to-[#BDD9F2]/80"></div>
      </div>

      <div className="relative z-10">
        {/* 1. KAHRAMAN BÖLÜMÜ (Hero) */}
        <div className="relative w-full min-h-[85vh] flex flex-col overflow-hidden">
          <div className="relative z-50">
            <Navbar user={user} />
          </div>
          
          <div className="flex-grow flex flex-col justify-center relative z-20">
            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
              <h1 className="text-5xl md:text-7xl font-lora font-bold text-[#052159] leading-tight mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]">
                Hayallerini Süsleyen Masalları Beraber Yazın
              </h1>
              <p className="text-xl md:text-2xl text-[#052159] mb-10 max-w-3xl mx-auto font-medium drop-shadow-[0_1px_5px_rgba(255,255,255,0.4)]">
                Çocuğunuzun ismini, en sevdiği karakteri ve temayı seçin. Geri kalan tüm sihri yapay zeka halletsin. Resimli, sesli ve sadece ona özel uyku öncesi serüvenleri yaratın.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
                <a href="#create" className="bg-[#84B1D9] hover:bg-[#8FBDD9] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl w-full sm:w-auto hover:scale-105">
                  Masal Üretmeye Başla
                </a>
                <Link href="/pricing" className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl w-full sm:w-auto border border-gray-200 hover:scale-105 text-center">
                  Abonelik Planları
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-emerald-700 drop-shadow-md">
                <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Güvenli ve Reklamsız</span>
                <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pedagojik Filtreler</span>
                <span className="flex items-center gap-1 text-sky-600 bg-white/50 px-3 py-1 rounded-full">⭐ Yüzlerce Mutlu Aile</span>
              </div>
            </section>
          </div>
        </div>

        {/* 2. FORM VE ÖZELLİKLER ALANI */}
        <div className="relative">
          {/* Form Section */}
          <section id="create" className="pb-24 px-4 pt-16">
            <div className="text-center mb-12">
              <p className="text-sky-600 font-bold mb-4 tracking-widest text-sm uppercase">✨ İlk Adımı Birlikte Atın</p>
              <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#052159] mb-4">Macerayı Sen Belirle</h2>
              <p className="text-xl text-[#052159] font-medium opacity-80">Sadece birkaç kelimeyle kahramanınızı yönlendirin, gerisini bize bırakın.</p>
            </div>
            <StoryForm isPro={isPro} isPremium={isPremium} />
          </section>

          {/* Features Section */}
          <section className="max-w-7xl mx-auto px-6 py-24 border-t border-sky-900/10">
            <div className="text-center mb-20">
              <span className="text-[#84B1D9] font-bold tracking-widest uppercase text-sm">MyStory Ayrıcalıkları</span>
              <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#052159] mt-4 mb-6">
                Her Gece Yeni Bir Dünyaya Uyanın
              </h2>
              <p className="text-xl text-[#052159] max-w-2xl mx-auto font-medium opacity-80">Gelişmiş teknolojilerle çocuğunuzun hayal gücünü besleyen en güvenilir araç seti.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-sky-100 rounded-2xl mb-8 bg-[url('/images/visual_feast.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">Görsel Şölen ve Seslendirme</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">Her sayfasına özel üretilen yüksek kaliteli resimler ve stüdyo kalitesindeki seslendirmeler.</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Farklı çizim stilleri</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Profesyonel okuyucu</li>
                </ul>
              </div>
              
              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-blue-100 rounded-2xl mb-8 bg-[url('/images/parent_reading.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">Sizin Sesinizden Düşlere</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">Kendi sesinizi sisteme tanıtın ve tüm hikayeler sizin sesinizden okunsun.</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Premium: Ses Klonlama</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Daima yanında hissettir</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-purple-100 rounded-2xl mb-8 bg-[url('/images/character_continuity.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">Sonsuz Serüven, Aynı Kahraman</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">Kendi karakterlerinizi kütüphanenize kaydedin, farklı masallarda oynatın.</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Karakter kütüphanesi</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Görsel tutarlılık</li>
                </ul>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 shadow-xl shadow-sky-900/5 border border-white/50 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all">
                <div className="w-full h-48 bg-pink-100 rounded-2xl mb-8 bg-[url('/images/values_education.png')] bg-cover bg-center shadow-inner"></div>
                <h3 className="text-2xl font-lora font-bold mb-4">Değerler Eğitimi ve Güvenlik</h3>
                <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed">Dostluk, dürüstlük veya paylaşma gibi dersleri masalın ana fikri yapın.</p>
                <ul className="text-left w-full space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Eğitici Mod seçeneği</li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Yaşa uygun içerik</li>
                </ul>
              </div>
            </div>
          </section>
          
          <footer className="py-12 text-center text-[#052159]/40 text-sm font-medium">
            &copy; 2026 MyStory. Çocuğunuzun hayallerini pırıldatan masal dünyası.
          </footer>
        </div>
      </div>
    </main>
  )
}
