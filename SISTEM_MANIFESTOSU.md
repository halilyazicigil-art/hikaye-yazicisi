# 📜 SİSTEM MANİFESTOSU: MYSTORY MASAL MOTORU

Bu belge, MyStory projesinin tüm zekasını, boru hattı kurallarını, model ayarlarını ve prompt mimarisini içeren "Ana Kaynak" belgesidir.

---

## 🎙️ 1. SES KÜTÜPHANESİ VE PERSONA AYARLARI
Google Gemini 3.1 Flash TTS modeli için tanımlanmış 12 "Sihirli Masalcı" ve onlara atanan özel anlatım tarzları (Style Instructions).

| Takma Ad (Dashboard) | Teknik ID | Persona / Anlatım Tarzı (Prompt) |
| :--- | :--- | :--- |
| **Bilge Dede** | `Achird` | Tok, bilgece, sakin ve güven veren bir tonla, torunlarına masal anlatır gibi oku. |
| **Gezgin Tavşan** | `Algenib` | Neşeli, hızlı, enerjik ve yerinde duramayan heyecanlı bir tavşan gibi oku. |
| **Cesur Şövalye** | `Algieba` | Güçlü, kararlı, kahramanvari ve yankılı bir sesle oku. |
| **Yüce Kral** | `Alnilam` | Otoriter, ağırbaşlı, onurlu ve saygın bir kral gibi oku. |
| **Heyecanlı Baba** | `Charon` | Heyecanlı, sürprizleri seven ve çocuklarıyla oyun oynayan bir baba gibi oku. |
| **Orman Muhafızı** | `Iapetus` | Derin, yankılı, koruyucu ve doğanın gücünü hissettiren bir tonda, ağırbaşlı bir muhafız gibi oku. |
| **Bilge Anne** | `Aoede` | Sıcak, şefkatli, sevgi dolu ve huzurlu bir sesle masal anlatır gibi oku. |
| **Masalcı Kadın** | `Callirrhoe` | Akıcı, masalsı ve merak uyandıran bir anlatıcı tonuyla oku. |
| **Huzur Perisi** | `Despina` | Çok sakin, rahatlatıcı, adeta fısıltı gibi yumuşak bir sesle oku. |
| **Sihirli Peri** | `Fenrir` | Neşeli, hafif, genç ve enerjik bir tonda, sihirli bir dünyadan seslenir gibi oku. |
| **Gizemli Prenses** | `Gacrux` | Mistik, zarif ve hafif yankılı bir sesle, bir prensesin zarafetiyle masal anlatır gibi oku. |
| **Gökkuşağı Kızı** | `Kore` | Canlı, renkli, çocuksu ve her cümlesinde neşe saçan bir sesle, hayat dolu bir tonda oku. |

---

## 🎨 2. GÖRSEL OLUŞTURMA KURALLARI (Sihirli Birleştirme 2.0)
Imagen 3 tabanlı çizim motoru için uygulanan "Karakter ve Stil Sabitleme" protokolü.

### A. Görüntü Stili Şablonları
- **Sulu Boya:** `A professional children's book watercolor illustration of [PROMPT]. soft pastel colors, dreamlike atmosphere, high quality, detailed`
- **3D Pixar:** `A high-quality 3D Disney Pixar style animation frame of [PROMPT]. vibrant colors, cute character designs, cinematic lighting, 8k render`
- **Yağlı Boya:** `A classic oil painting style illustration of [PROMPT]. rich textures, artistic brushstrokes, warm lighting, timeless`
- **Pop Art:** `A vibrant Pop Art style illustration of [PROMPT]. bold lines, bright colors, comic book aesthetic, dynamic`

### B. Prompt Birleştirme Formülü (Consistent Image Logic)
Her sahne için üretilen nihai komut:
`{Style Prefix} + {Karakter Fiziksel Çapaları} + {Sahnede Gerçekleşen Aksiyon (Visual Hook)} + {Style Suffix}`

---

## 📝 3. METİN OLUŞTURMA KURALLARI
Gemini 3 Flash modelinin masal kurgusunda uyduğu yapısal kurallar.

### A. Sistem Komutu (System Prompt)
Gemini'ye masalı yazdırırken gönderilen ana talimat:
> "Aşağıdaki konuyla ilgili 8-10 sayfalık sürükleyici bir çocuk masalı yaz. ÇIKTI: JSON formatında 'title', 'characters' (her karakterin fiziksel tarifiyle), 'scenes' (her sahne için 'text' ve o sahneyi çizecek 'visualHook' tarifiyle) olarak dön."

### B. Çıktı Formatı (JSON Yapısı)
```json
{
  "title": "Masalın Başlığı",
  "characters": {
    "Karakter Adı": "Fiziksel özelliklerin ve kıyafetlerin detaylı tarifi"
  },
  "scenes": [
    {
      "text": "Sayfada okunacak hikaye metni",
      "visualHook": "Bu sahnenin görseli için spesifik aksiyon tarifi"
    }
  ]
}
```

---

## 🛡️ 4. VERİ HATTI GÜVENLİK PROTOKOLLERİ
- **JSON Temizleyici:** Gemini yanıtındaki ```json işaretlerini otomatik siler.
- **Ses ID Düzeltici:** Teknik ID'ler ne olursa olsun, API'ye gönderilmeden önce "Kısa ID" formatına (`Aoede` vb.) otomatik indirgenir.
- **Karakter Mühürleme:** Hikayenin başında üretilen karakter tarifleri, hikaye boyu her sayfanın çizim komutuna otomatik eklenir (Karakterlerin değişmemesi için).

---

## 5. TEKNİK ENTEGRASYON VE API ENVANTERİ
Sistemin çalışması için gerekli olan tüm harici servis bağlantıları ve yetkilendirme anahtarları.

### A. Veritabanı ve Medya Depolama (Supabase)
- **URL:** `https://anxxcbbfhzwpwarywcbv.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Bucket:** `story_assets` (Görsel ve seslerin depolandığı alan)

### B. Yapay Zeka Servisleri (Google Cloud & Vertex AI)
- **Proje Kimliği:** `hikayeyazicisi`
- **Servis Hesabı:** `hikaye-yazicisi-sa@hikayeyazicisi.iam.gserviceaccount.com`
- **Metin Üretimi (Vertex AI):** `gemini-3-flash-preview`
- **Görsel Üretimi (Vertex AI):** `gemini-3.1-flash-image-preview`
- **Ses Sentezi (Vertex AI):** `gemini-3.1-flash-tts-preview`
- **API Key (Gemini & TTS):** `AIzaSyBcKzTPDKcHRJKA3PMM9hp_sHHdssdwUxk`


---
*Son Güncelleme: 02.05.2026 - MyStory Geliştirici Ekibi*
