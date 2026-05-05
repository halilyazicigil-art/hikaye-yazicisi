import StoryForm from '@/components/StoryForm'
import HowItWorks from '@/components/HowItWorks'
import Link from 'next/link'
import { CheckCircle2, Cloud } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isPro = false
  let isPremium = false

  if (user) {
    const { data: sub } = await supabase.from('subscriptions').select('plan_id').eq('user_id', user.id).maybeSingle()
    if (sub) {
      isPro = sub.plan_id === 'pro'
      isPremium = sub.plan_id === 'premium'
    }
  }

  return (
    <main className="min-h-screen bg-[#BDD9F2] text-[#052159] overflow-x-hidden font-nunito relative">
      {/* Decorative watercolor background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#84B1D9] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#8FBDD9] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>

      {/* Hero and Navbar Wrapper with Background */}
      <div className="relative w-full bg-[url('/images/hero-bg-v2.png')] bg-cover bg-center bg-no-repeat pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#BDD9F2]/90 via-[#BDD9F2]/70 to-[#BDD9F2]"></div>
        
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Cloud className="w-9 h-9 text-white fill-white" />
              <Cloud className="w-6 h-6 text-white fill-white absolute -bottom-1 -right-2 opacity-80" />
            </div>
            <span className="text-3xl font-lora font-bold tracking-tight text-white ml-3">MyStory</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-white font-bold">
            <Link href="/pricing" className="hover:text-[#052159] transition">Fiyatlandırma</Link>
            <a href="#how-it-works" className="hover:text-[#052159] transition">Nasıl Çalışır</a>
            <a href="#" className="hover:text-[#052159] transition">Masallar</a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <>
                {user.email === 'halilibrahimyazicigil@gmail.com' && (
                  <Link href="/admin" className="font-bold text-emerald-600 hover:text-emerald-700 transition">Admin</Link>
                )}
                <Link href="/parent" className="font-bold text-white hover:text-[#052159] transition">Panele Dön</Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="bg-[#84B1D9] hover:bg-[#84B1D9] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
                    Çıkış Yap
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/register" className="font-bold text-white hover:text-[#052159] transition hidden sm:inline-block">Üye Ol</Link>
                <Link href="/login" className="bg-[#84B1D9] hover:bg-[#84B1D9] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
                  Giriş Yap
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center relative z-20">
          <h1 className="text-5xl md:text-7xl font-lora font-bold text-[#052159] leading-tight mb-6 drop-shadow-sm">
            Hayallerini Süsleyen Masalları Beraber Yazın
          </h1>
          <p className="text-xl md:text-2xl text-[#052159] mb-10 max-w-3xl mx-auto font-medium drop-shadow-sm">
            Çocuğunuzun ismini, en sevdiği karakteri ve temayı seçin. Geri kalan tüm sihri yapay zeka halletsin. Resimli, sesli ve sadece ona özel uyku öncesi serüvenleri yaratın.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <a href="#create" className="bg-[#84B1D9] hover:bg-[#84B1D9] text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl w-full sm:w-auto hover:scale-105">
              Masal Üretmeye Başla
            </a>
            <Link href="/pricing" className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#052159] px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl w-full sm:w-auto border border-gray-200 hover:scale-105 text-center">
              Abonelik Planları
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-emerald-700 mb-6 drop-shadow-sm">
            <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Güvenli ve Reklamsız</span>
            <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pedagojik Filtreler</span>
            <span className="flex items-center gap-1 text-sky-600 bg-white/50 px-3 py-1 rounded-full">⭐ Yüzlerce Mutlu Aile</span>
          </div>
        </section>
      </div>

      {/* Form Section */}
      <section id="create" className="relative z-10 pb-20 px-4 -mt-10">
        <div className="text-center mb-8">
          <p className="text-sky-600 font-bold mb-4 tracking-widest text-sm uppercase">✨ İlk Adımı Birlikte Atın</p>
          <h2 className="text-4xl font-lora font-bold text-[#052159] mb-4">Macerayı Sen Belirle</h2>
          <p className="text-xl text-[#052159]">Sadece birkaç kelimeyle kahramanınızı yönlendirin, gerisini bize bırakın.</p>
        </div>
        <StoryForm isPro={isPro} isPremium={isPremium} />
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-sky-900/5 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#84B1D9] font-bold tracking-widest uppercase text-sm">MyStory Ayrıcalıkları</span>
          <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#052159] mt-4 mb-4">
            Her Gece Yeni Bir Dünyaya Uyanın
          </h2>
          <p className="text-xl text-[#052159]">Gelişmiş teknolojilerle çocuğunuzun hayal gücünü besleyen en güvenilir araç seti.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-sky-100 rounded-2xl mb-6 bg-[url('/images/visual_feast.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Görsel Şölen ve Doğal Seslendirme</h3>
            <p className="text-gray-600 mb-6 flex-grow text-sm">Her sayfasına özel üretilen yüksek kaliteli resimler ve stüdyo kalitesindeki seslendirmeler ile hikayeler artık çok canlı.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Farklı çizim stilleri</li>
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Profesyonel okuyucu modları</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-blue-100 rounded-2xl mb-6 bg-[url('/images/parent_reading.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Sizin Sesinizden Düşlere Doğru</h3>
            <p className="text-gray-600 mb-6 flex-grow text-sm">Masalları sizden dinlemeyi seven minikler için, kendi sesinizi sisteme tanıtın ve tüm hikayeler sizin sesinizden okunsun.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Premium: Ses Klonlama</li>
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Daima yanında hissettir</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-purple-100 rounded-2xl mb-6 bg-[url('/images/character_continuity.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Sonsuz Serüven, Aynı Kahraman</h3>
            <p className="text-gray-600 mb-6 flex-grow text-sm">Kendi karakterlerinizi kütüphanenize kaydedin. Aynı kahramanı farklı masallarda oynatın ve her gece yeni bir maceraya çıkın.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Karakter kütüphanesi</li>
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Görsel tutarlılık</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-pink-100 rounded-2xl mb-6 bg-[url('/images/values_education.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Değerler Eğitimi ve Güvenlik</h3>
            <p className="text-gray-600 mb-6 flex-grow text-sm">Dostluk, dürüstlük veya paylaşma gibi dilediğiniz bir dersi seçerek masalın ana fikrini çocuklarınıza aşılayın.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Eğitici Mod seçeneği</li>
              <li className="flex items-center gap-2 text-xs font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={16}/> Yaşa uygun içerik denetimi</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  )
}
