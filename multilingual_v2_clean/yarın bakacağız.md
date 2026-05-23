# 🗓️ Yarın Bakılacaklar: Fiyatlandırma ve Strateji Notları (13.05.2026)

Bugün yapılan maliyet analizleri, paket kurguları ve kâr marjı stratejilerinin özeti:

## 1. Güncel API Maliyetleri (Vertex AI - Mayıs 2026)
*   **Metin (Gemini 3 Flash):** ~$0.30 (1M Input) / ~$1.80 (1M Output)
*   **Görsel (Gemini 3.1 Flash Image):** 
    *   1K (Standart): $0.067 / görsel
    *   512px (Ekonomik): $0.045 / görsel
*   **Ses (Gemini 3.1 Flash TTS):** $0.05 / dakika (24kHz Mono WAV)

## 2. Paket Kurguları (Hedef Kâr Odaklı)
**Genel Kural:** 512px görsel kalitesi + 2 Görsel (1 Sahne + 1 Karakter Paftası) mantığıyla:

### 📦 Paket 1 ($15 - Hedef Kâr: $3)
*   **İçerik:** 24-25 Hikaye.
*   **Dağılım:** 5 Premium (13 Görsel + Ses) + 19 Hızlı (2 Görsel + Ses).
*   **Maliyet:** ~$12.00 | **Kâr:** ~$3.00

### 📦 Paket 2 ($30 - Hedef Kâr: $7)
*   **İçerik:** 52-55 Hikaye.
*   **Dağılım:** 5 Premium + 47-50 Hızlı.
*   **Maliyet:** ~$23.00 | **Kâr:** ~$7.00

## 3. Stratejik Kredi (Sihirli Enerji) Sistemi
Kullanıcıya doğrudan hikaye sayısı yerine "Enerji" vererek esneklik sağlama:
*   **Büyülü Premium (AI):** 2 Enerji
*   **Hızlı Okuma/Dinleme (AI):** 1 Enerji
*   **Taslak/Sihirli Karıştır (Cache):** 0.5 Enerji (veya 1 Enerji ama daha ucuz maliyet)

## 4. "Gizli Kâr" Alanı: Taslak Teşvikleri
*   **Strateji:** Taslak (Draft/Cache Hit) kullanımlarını kullanıcının gözünde "daha ucuz/ekonomik" hale getirerek kullanıcıyı API maliyeti olmayan bu alana yönlendirmek.
*   **Amacı:** API maliyetini sıfırlayarak paket başı kârı $4-7 bandından $10+ bandına çıkarmak.

## 5. AuthGate (Sihirli Kalkan) ve Dönüşüm Stratejisi
Ziyaretçileri üyeliğe teşvik etmek için geliştirilen "Tease & Lock" (Merak Uyandır ve Kilitle) mimarisi uygulandı:

*   **Buzlu Cam (Glassmorphism) Kilidi:**
    *   `components/AuthGate.tsx` bileşeni oluşturuldu.
    *   Giriş yapmayan kullanıcılar için Ses, Tür, Stil ve Yaş alanları **20px blur** ile kilitlendi.
*   **İnteraktif Dönüşüm Butonu:**
    *   Ziyaretçiler için "Masal Oluştur" butonu turuncu renge büründü ve "GİRİŞ YAP VE ÜRET" metni eklendi.
    *   Tıklama anında doğrudan `/login` sayfasına yönlendirme sağlandı.
*   **Teknik İyileştirme (Refactoring):**
    *   **Nested Form Hatası Giderildi:** Ses yükleme modalı ana formun dışına taşınarak HTML standartlarına uygun hale getirildi.
    *   **Hiyerarşi Onarımı:** JSX etiketleri ve parantez dengesizlikleri giderilerek derleme hataları temizlendi.

## 6. Kritik Hata: Admin Portal Senkronizasyonu
Yeni kullanıcılar kayıt olmasına rağmen Admin Dashboard verileri güncellenmiyor:
*   **Belirti:** "Total Users" ve "Active Subscriptions" sayaçları sabit kalıyor (Sadece 1 görünüyor).
*   **Belirti:** CRM listesinde yeni kayıt olan kullanıcılar listelenmiyor.
*   **Olası Nedenler:** `auth.users` -> `public.profiles` tetikleyicisi (trigger) çalışmıyor olabilir veya Admin paneli veriyi önbellekten (cache) çekiyor olabilir.

---
*Not: Yarın bu veriler ışığında veritabanı şeması (credits/plans) ve UI entegrasyonu konuşulacak.*
