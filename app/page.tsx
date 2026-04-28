import StoryForm from '@/components/StoryForm'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] text-[#3d3d3d] overflow-x-hidden font-nunito relative">
      {/* Decorative watercolor background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f4dcb5] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#f7d6c4] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐝</span>
          <span className="text-3xl font-lora font-bold tracking-tight text-[#b3593b]">HikayeYazıcısı</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/register" className="font-bold text-[#b3593b] hover:text-[#8c462e] transition">Üye Olmak</Link>
          <Link href="/login" className="bg-[#b3593b] hover:bg-[#8c462e] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
            Giriş Yap
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-10 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-lora font-bold text-[#2d2d2d] leading-tight mb-6">
          Çocuklarınızın Asla Unutamayacağı Büyülü Uyku Öncesi Hikayeleri Yaratın
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-medium">
          3-12 yaş arası çocuklara uyum sağlayan yapay zeka destekli hikaye anlatımı.
          Çocuklar için özel olarak hazırlanmış, kişiselleştirilmiş, resimli ve sesli anlatımlı hikayeler.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <a href="#create" className="bg-[#b3593b] hover:bg-[#8c462e] text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-md w-full sm:w-auto">
            Hikayeler Oluşturmaya Başlayın
          </a>
          <a href="#pricing" className="bg-white hover:bg-gray-50 text-[#3d3d3d] px-8 py-4 rounded-xl font-bold text-lg transition shadow-md w-full sm:w-auto border border-gray-100">
            Fiyatları Görüntüle
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-emerald-600 mb-16">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hiçbir zaman reklam yok.</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Ebeveyn onaylı</span>
          <span className="flex items-center gap-1 text-amber-500">⭐ 10.000'den fazla ebeveyn</span>
        </div>
      </section>

      {/* Form Section */}
      <section id="create" className="relative z-10 pb-20 px-4">
        <div className="text-center mb-8">
          <p className="text-amber-600 font-bold mb-4 tracking-widest text-sm uppercase">✨ Büyülü hikayeler yaratan ebeveynlere katılın.</p>
          <h2 className="text-4xl font-lora font-bold text-[#2d2d2d] mb-4">Hikayenize Başlayın</h2>
          <p className="text-xl text-gray-600">Aklınıza gelen herhangi bir fikri yazın. Sihrin gerçekleşmesini izleyin.</p>
        </div>
        <StoryForm />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-amber-900/5 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#b3593b] font-bold tracking-widest uppercase text-sm">ÖZELLİKLER</span>
          <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#2d2d2d] mt-4 mb-4">
            Çocuklarınızın Asla Unutamayacağı Uyku Öncesi Ritüelleri Oluşturun
          </h2>
          <p className="text-xl text-gray-600">Kişiselleştirilmiş hikayeler. Sizin sesiniz. Hepsi tek bir yerde.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-amber-100 rounded-2xl mb-6 bg-[url('https://fal.media/files/monkey/j1L-E88888.jpeg')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Güzel Hikayeler ve Ses Kayıtları</h3>
            <p className="text-gray-600 mb-6 flex-grow">Saniyeler içinde sınırsız sayıda resimli hikaye oluşturun. 3 ile 12 yaş arası için mükemmel. Yapay zeka anlatımı.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Sınırsız hikaye yaratımı</li>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Çoklu dil desteği</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-blue-100 rounded-2xl mb-6 bg-[url('https://fal.media/files/monkey/a-2-88888.jpeg')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Sizin Sesiniz. Onların Hikayesi.</h3>
            <p className="text-gray-600 mb-6 flex-grow">Çocuğunuz her hikayeyi SİZİN okuduğunuzu duyacak. Geç saatlere kadar çalışsanız bile bağlantıda kalın.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Sadece 5 dakika sürer</li>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> %99,9 ses doğruluğu</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 bg-pink-100 rounded-2xl mb-6 bg-[url('https://fal.media/files/monkey/b-3-88888.jpeg')] bg-cover bg-center"></div>
            <h3 className="text-2xl font-lora font-bold mb-4">Eğitici ve Güvenli</h3>
            <p className="text-gray-600 mb-6 flex-grow">Pedagojik olarak incelenmiş içerikler ile çocuğunuzun kelime dağarcığını ve hayal gücünü güvenle geliştirin.</p>
            <ul className="text-left w-full space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Yaşa özel filtreleme</li>
              <li className="flex items-center gap-2 text-sm font-bold text-gray-700"><CheckCircle2 className="text-emerald-500" size={18}/> Değerler eğitimi odaklı</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-lora font-bold text-[#2d2d2d] mt-4 mb-4">
            Abone Ol ve Tasarruf Et
          </h2>
          <p className="text-xl text-gray-600">Çocuklarınızın yapay zeka ile sihirli hikayeler yaratmasına yardımcı olun.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Free Plan */}
          <div className="bg-[#fcfaf7] border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full opacity-80 scale-95">
            <h3 className="text-2xl font-lora font-bold mb-2">Arı Lite</h3>
            <div className="text-4xl font-bold text-[#b3593b] mb-8">Ücretsiz</div>
            <ul className="space-y-4 text-sm font-bold text-gray-700 flex-grow">
              <li className="flex justify-between border-b pb-2"><span>Hikaye Uzunluğu</span> <span>400 kelime</span></li>
              <li className="flex justify-between border-b pb-2"><span>Hikayelere İzin Verilir</span> <span>3/Ay</span></li>
              <li className="flex justify-between border-b pb-2"><span>Kütüphaneye Hızlı Erişim</span> <span>Standart</span></li>
            </ul>
            <Link href="/register" className="w-full mt-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-center transition">
              Kayıt Ol
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white border-2 border-[#e6b17e] rounded-[2rem] p-8 shadow-xl flex flex-col h-full relative z-10">
            <div className="absolute -top-4 right-8 bg-[#f5c345] text-amber-900 font-bold px-4 py-1 rounded-full text-sm">En Popüler</div>
            <h3 className="text-2xl font-lora font-bold mb-2">Arı Kovanı</h3>
            <div className="text-4xl font-bold text-[#b3593b] mb-8">15 $ <span className="text-lg text-gray-500 font-normal">/ Ay</span></div>
            <ul className="space-y-4 text-sm font-bold text-gray-700 flex-grow">
              <li className="flex justify-between border-b pb-2"><span>Hikaye Uzunluğu</span> <span>800 kelime</span></li>
              <li className="flex justify-between border-b pb-2"><span>Hikayelere İzin Verilir</span> <span>50/Ay</span></li>
              <li className="flex justify-between border-b pb-2"><span>Kütüphaneye Hızlı Erişim</span> <span>Gelişmiş</span></li>
              <li className="flex justify-between border-b pb-2"><span>Özel Hikaye Temaları</span> <span>Var</span></li>
            </ul>
            <Link href="/settings" className="w-full mt-8 py-4 bg-[#b3593b] hover:bg-[#8c462e] text-white rounded-xl font-bold text-center transition shadow-md">
              Şimdi Başla
            </Link>
          </div>

          {/* Premium Plan (Mock) */}
          <div className="bg-[#fcfaf7] border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full opacity-80 scale-95">
            <h3 className="text-2xl font-lora font-bold mb-2">Arı Vızıltısı</h3>
            <div className="text-4xl font-bold text-[#b3593b] mb-8">40 $ <span className="text-lg text-gray-500 font-normal">/ Ay</span></div>
            <ul className="space-y-4 text-sm font-bold text-gray-700 flex-grow">
              <li className="flex justify-between border-b pb-2"><span>Hikaye Uzunluğu</span> <span>1200 kelime</span></li>
              <li className="flex justify-between border-b pb-2"><span>Hikayelere İzin Verilir</span> <span>Sınırsız</span></li>
              <li className="flex justify-between border-b pb-2"><span>Kütüphaneye Hızlı Erişim</span> <span>VIP</span></li>
            </ul>
            <Link href="/settings" className="w-full mt-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-center transition">
              Yükselt
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
