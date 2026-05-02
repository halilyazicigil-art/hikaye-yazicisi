# Ürün Gereksinim Dokümanı (PRD) - Hikaye Yazıcısı

## 1. Genel Bakış
**Ürün Adı:** Hikaye Yazıcısı (Story Writer)
**Hedef Kitle:** 3-12 yaş arası çocuklar ve ebeveynleri.
**Ürün Özeti:** Çocukların hayal gücünü geliştiren, eğlenceli ve kişiselleştirilmiş masallar oluşturan yapay zeka destekli bir platform. Ebeveynler, kendi seslerini klonlayarak çocuklarına masal anlatabilir, çocuklar ise üretilen masallara suluboya tarzında görsellerle eşlik edebilir.

## 2. İş Modeli (Freemium)
- **Ücretsiz Katman (Free):** Sınırlı sayıda aylık masal üretimi, standart yapay zeka sesleri (ElevenLabs default), temel görseller.
- **Premium Katman (Pro):** Sınırsız masal üretimi, **ebeveyn ses klonlama (Voice Cloning)** özelliği, yüksek çözünürlüklü ve detaylı suluboya görseller, gelişmiş karakter oluşturma seçenekleri.

## 3. Temel Özellikler

### 3.1. Ebeveyn Kontrol Paneli (Parent Dashboard)
- **PIN Koruması:** Çocukların erişemeyeceği, sadece ebeveynlerin 4 haneli bir PIN ile girebileceği güvenli alan.
- **Profil Yönetimi:** Birden fazla çocuk profili oluşturma (yaş, ilgi alanları, okuma seviyesi ayarları).
- **Ses Klonlama (Premium):** ElevenLabs entegrasyonu ile ebeveynin kendi sesini sisteme tanıtması ve masalların bu sesle okunması.
- **Okuma Geçmişi:** Çocuğun en sevdiği masallar, toplam okuma süresi ve kelime dağarcığı gelişimi.
- **Abonelik Yönetimi:** Stripe entegrasyonu ile freemium'dan premium'a geçiş ve faturalandırma yönetimi.

### 3.2. Yapay Zeka Masal Üretimi (Story Generation)
- **LLM Entegrasyonu (Google AI Studio):** Çocuğun seçtiği tema, kahraman, ortam ve ahlaki derse (örn: paylaşmak, dürüstlük) göre pedagojik olarak uygun masal metni oluşturma.
- **Yaş Uyarlaması:** 3-5 yaş için daha basit kelimeler ve kısa cümleler; 6-12 yaş için daha zengin betimlemeler ve uzun hikaye örgüleri.

### 3.3. Görsel Üretimi (Illustrations)
- **Gemini Image Entegrasyonu:** Masalın her sayfası için karakter uyumlu, çocuk dostu ve yüksek kaliteli görseller üretimi.

### 3.4. Ses Sentezi (Voice Narration)
- **ElevenLabs Entegrasyonu:** Metinden sese (TTS) dönüşüm. Ücretsiz kullanıcılar için profesyonel anlatıcı sesleri; Premium kullanıcılar için klonlanmış ebeveyn sesi.

### 3.5. Çocuk Arayüzü (Child Interface)
- Eğlenceli, büyük butonlara sahip, okunması kolay tipografi (örn: inter, comic sans türevi çocuk dostu fontlar).
- Sürükleyici okuma/dinleme modu (sayfa çevirme animasyonları, kelime vurgulama).

## 4. Teknik Gereksinimler & Kısıtlamalar
- **Frontend:** Next.js 15 (App Router), Tailwind CSS v3. Responsive ve mobil uyumlu tasarım.
- **Backend & Veritabanı:** Supabase. Tüm veriler (kullanıcılar, profiller, masallar) Supabase PostgreSQL üzerinde tutulacak.
- **Güvenlik:** Supabase Row Level Security (RLS) ile çocuk profillerine sadece ilgili ebeveynin erişebilmesi sağlanacak.
- **Performans:** Görseller Gemini üzerinden optimize edilerek getirilecek, metin üretiminde streaming (akış) kullanılarak bekleme süresi azaltılacak.
