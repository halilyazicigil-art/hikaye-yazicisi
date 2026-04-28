import StoryForm from '@/components/StoryForm'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
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
    <main className="min-h-screen bg-[#fdfaf3] text-[#3d3d3d] overflow-x-hidden font-nunito relative">
      {/* Decorative watercolor background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f4dcb5] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#f7d6c4] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>

      {/* Hero and Navbar Wrapper with Background */}
      <div className="relative w-full bg-[url('/images/hero_bg.png')] bg-cover bg-center bg-no-repeat pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf3]/90 via-[#fdfaf3]/70 to-[#fdfaf3]"></div>
        
        {/* Navbar */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐝</span>
            <span className="text-3xl font-lora font-bold tracking-tight text-[#b3593b]">MasalKovanı</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            {user ? (
              <>
                {user.email === 'halilibrahimyazicigil@gmail.com' && (
                  <Link href="/admin" className="font-bold text-emerald-600 hover:text-emerald-700 transition">Admin</Link>
                )}
                <Link href="/parent" className="font-bold text-[#b3593b] hover:text-[#8c462e] transition">Panele Dön</Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="bg-[#b3593b] hover:bg-[#8c462e] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
                    Çıkış Yap
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/register" className="font-bold text-[#b3593b] hover:text-[#8c462e] transition hidden sm:inline-block">Üye Ol</Link>
                <Link href="/login" className="bg-[#b3593b] hover:bg-[#8c462e] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
                  Giriş Yap
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center relative z-20">
          <h1 className="text-5xl md:text-7xl font-lora font-bold text-[#2d2d2d] leading-tight mb-6 drop-shadow-sm">
            Hayallerini Süsleyen Masalları Beraber Yazın
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-10 max-w-3xl mx-auto font-medium drop-shadow-sm">
            Çocuğunuzun ismini, en sevdiği karakteri ve temayı seçin. Geri kalan tüm sihri yapay zeka halletsin. Resimli, sesli ve sadece ona özel uyku öncesi serüvenleri yaratın.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <a href="#create" className="bg-[#b3593b] hover:bg-[#8c462e] text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl w-full sm:w-auto hover:scale-105">
              Masal Üretmeye Başla
            </a>
            <a href="#pricing" className="bg-white/90 backdrop-blur-sm hover:bg-white text-[#3d3d3d] px-8 py-4 rounded-xl font-bold text-lg transition shadow-xl w-full sm:w-auto border border-gray-200 hover:scale-105">
              Abonelik Planları
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-emerald-700 mb-6 drop-shadow-sm">
            <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Güvenli ve Reklamsız</span>
            <span className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Pedagojik Filtreler</span>
            <span className="flex items-center gap-1 text-amber-600 bg-white/50 px-3 py-1 rounded-full">⭐ Yüzlerce Mutlu Aile</span>
          </div>
        </section>
      </div>

      {/* Form Section */}
      <section id="create" className="relative z-10 pb-20 px-4 -mt-10">
        <div className="text-center mb-8">
          <p className="text-amber-600 font-bold mb-4 tracking-widest text-sm uppercase">✨ İlk Adımı Birlikte Atın</p>
          <h2 className="text-4xl font-lora font-bold text-[#2d2d2d] mb-4">Macerayı Sen Belirle</h2>
          <p className="text-xl text-gray-600">Sadece birkaç kelimeyle kahramanınızı yönlendirin, gerisini bize bırakın.</p>
        </div>
        <StoryForm isPro={isPro} isPremium={isPremium} />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-amber-900/5 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#b3593b] font-bold tracking-widest uppercase text-sm">MasalKovanı Ayrıcalıkları</span>
          <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#2d2d2d] mt-4 mb-4">
            Her Gece Yeni Bir Dünyaya Uyanın
          </h2>
          <p className="text-xl text-gray-600">Gelişmiş teknolojilerle çocuğunuzun hayal gücünü besleyen en güvenilir araç seti.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-amber-100 rounded-2xl mb-6 bg-[url('/images/visual_feast.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Görsel Şölen ve Doğal Seslendirme</h3>
            <p className="text-gray-600 mb-6 flex-grow">Her sayfasına özel üretilen yüksek kaliteli resimler ve stüdyo kalitesindeki seslendirmeler ile hikayeler artık çok canlı.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Farklı çizim stilleri</li>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Profesyonel okuyucu modları</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-blue-100 rounded-2xl mb-6 bg-[url('/images/parent_reading.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Sizin Sesinizden Düşlere Doğru</h3>
            <p className="text-gray-600 mb-6 flex-grow">Masalları sizden dinlemeyi seven minikler için, kendi sesinizi sisteme tanıtın ve tüm hikayeler sizin sesinizden okunsun.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Premium: Ses Klonlama</li>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Daima yanında hissettir</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-pink-100 rounded-2xl mb-6 bg-[url('/images/values_education.png')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Değerler Eğitimi ve Güvenlik</h3>
            <p className="text-gray-600 mb-6 flex-grow">Sadece eğlenceli değil, aynı zamanda öğretici. Dostluk, dürüstlük veya paylaşma gibi dilediğiniz bir dersi seçerek masalın ana fikrini belirleyin.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Eğitici Mod seçeneği</li>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Yaşa uygun içerik denetimi</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#2d2d2d] mt-4 mb-4">
            Size Uygun Planı Seçin
          </h2>
          <p className="text-xl text-gray-600">Maceraya katılmak için bütçenize en uygun Kovanı seçin.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Free Plan */}
          <div className="bg-[#fcfaf7] border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full opacity-80 scale-95">
            <h3 className="text-2xl font-lora font-bold mb-2">Başlangıç Kovanı</h3>
            <div className="text-4xl font-bold text-[#b3593b] mb-8">Ücretsiz</div>
            <ul className="space-y-4 text-sm font-bold text-gray-700 flex-grow">
              <li className="flex justify-between border-b pb-2"><span>Hikaye Uzunluğu</span> <span>Standart</span></li>
              <li className="flex justify-between border-b pb-2"><span>Kullanım</span> <span>3/Ay</span></li>
              <li className="flex justify-between border-b pb-2"><span>Yapay Zeka Seslendirme</span> <span>Sınırlı</span></li>
            </ul>
            <Link href={user ? "/parent" : "/register"} className="w-full mt-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-center transition">
              {user ? 'Panelime Git' : 'Kayıt Ol'}
            </Link>
          </div>

          {/* Pro Plan */}
          <div className={`bg-white border-2 border-[#e6b17e] rounded-[2rem] p-8 shadow-xl flex flex-col h-full relative z-10 ${isPro ? 'ring-4 ring-amber-500/30' : ''}`}>
            {isPro ? (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-bold px-6 py-1 rounded-full text-sm shadow-lg whitespace-nowrap">Mevcut Planınız 🍯</div>
            ) : (
              <div className="absolute -top-4 right-8 bg-[#f5c345] text-amber-900 font-bold px-4 py-1 rounded-full text-sm">En Popüler</div>
            )}
            <h3 className="text-2xl font-lora font-bold mb-2">Tatlı Bal (Pro)</h3>
            <div className="text-4xl font-bold text-[#b3593b] mb-8">15 $ <span className="text-lg text-gray-500 font-normal">/ Ay</span></div>
            <ul className="space-y-3 text-xs font-bold text-gray-700 flex-grow">
              <li className="flex justify-between border-b pb-1"><span>Aylık Masal</span> <span>40 Adet</span></li>
              <li className="flex justify-between border-b pb-1"><span>Sesli Masal</span> <span>20 Adet</span></li>
              <li className="flex justify-between border-b pb-1"><span>Ses Klonlama</span> <span>Aktif</span></li>
              <li className="flex justify-between border-b pb-1"><span>Bölüm Sayısı</span> <span>20 Bölüm</span></li>
              <li className="flex justify-between border-b pb-1"><span>İstek Sınırı</span> <span>400 Karakter</span></li>
              <li className="flex justify-between border-b pb-1"><span>Arşiv Kapasitesi</span> <span>80 Masal</span></li>
              <li className="flex justify-between border-b pb-1 text-emerald-600"><span>Yayın Lisansı</span> <span>Dahil</span></li>
            </ul>
            <Link 
              href={isPro || isPremium ? "/parent" : "/settings"} 
              className={`w-full mt-6 py-4 rounded-xl font-bold text-center transition shadow-md ${isPro || isPremium ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-[#b3593b] hover:bg-[#8c462e] text-white'}`}
            >
              {isPro || isPremium ? 'Panele Dön' : 'Hemen Başla'}
            </Link>
          </div>

          {/* Premium Plan */}
          <div className={`bg-[#fcfaf7] border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full relative ${isPremium ? 'ring-4 ring-purple-500/30 opacity-100 scale-100 border-purple-200 bg-white' : 'opacity-80 scale-95'}`}>
            {isPremium && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-bold px-6 py-1 rounded-full text-sm shadow-lg whitespace-nowrap">Mevcut Planınız 👑</div>
            )}
            <h3 className="text-2xl font-lora font-bold mb-2">Kraliçe Arı (Premium)</h3>
            <div className="text-4xl font-bold text-[#b3593b] mb-8">40 $ <span className="text-lg text-gray-500 font-normal">/ Ay</span></div>
            <ul className="space-y-3 text-xs font-bold text-gray-700 flex-grow">
              <li className="flex justify-between border-b pb-1"><span>Aylık Masal</span> <span>80 Adet</span></li>
              <li className="flex justify-between border-b pb-1"><span>Sesli Masal</span> <span>40 Adet</span></li>
              <li className="flex justify-between border-b pb-1"><span>Ses Klonlama</span> <span>Aktif</span></li>
              <li className="flex justify-between border-b pb-1"><span>Bölüm Sayısı</span> <span>20 Bölüm</span></li>
              <li className="flex justify-between border-b pb-1"><span>İstek Sınırı</span> <span>610 Karakter</span></li>
              <li className="flex justify-between border-b pb-1"><span>Arşiv Kapasitesi</span> <span>80 Masal</span></li>
              <li className="flex justify-between border-b pb-1 text-emerald-600"><span>Yayın Lisansı</span> <span>Dahil</span></li>
            </ul>
            <Link 
              href={isPremium ? "/parent" : "/settings"} 
              className={`w-full mt-6 py-3 rounded-xl font-bold text-center transition ${isPremium ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            >
              {isPremium ? 'Panele Dön' : 'Yükselt'}
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
