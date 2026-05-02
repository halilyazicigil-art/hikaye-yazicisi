# KURAL SETİ

### 📊 Güncel Sistem Model Envanteri (2026)
| Bileşen | Kullanılan Model | Sürüm (ID) | Kullanım Amacı |
| :--- | :--- | :--- | :--- |
| **Metin** | Gemini 3 Flash | `gemini-3-flash-preview` | Masal kurgusu, karakter çapaları ve sahne tarifleri. |
| **Görsel** | Gemini 3.1 Flash Image | `gemini-3.1-flash-image-preview` | Karakter ve sahne çizimleri (Nano Banana 2). |
| **Ses** | Gemini 3.1 Flash TTS | `gemini-3.1-flash-tts-preview` | Style Instructions destekli karakter seslendirme. |

Bu proje boyunca uyulması gereken temel çalışma prensipleridir:

1. **Disiplinli Analiz:** "Kural Seti"ne bağlı kalarak sorunu bul denildiğinde, bu dosyadaki tüm maddelere eksiksiz uyulacaktır.
2. **Kök Neden Analizi (Root Cause Analysis):** Bir sorun oluştuğunda hemen işleme başlanmayacaktır. Önce derinlemesine araştırma yapılacak, gerçek kök neden bulunacak ve çözüm önerisi kullanıcıya sunulacaktır. Kullanıcı onayı alınmadan kod üzerinde hiçbir değişiklik yapılmayacaktır.
3. **Komut ve Guardrail Bağlılığı:** Verilen prompt ve isteğe %100 bağlı kalınacak. Bir komut alındığında hemen uygulamaya geçilmeyecek; önce bu değişikliğin sistemin diğer alanlarını (performans, stabilite, diğer API'ler) bozup bozmayacağı derinlemesine düşünülecek. Risk tespit edilirse kullanıcı derhal uyarılacak. Sadece güvenli olduğuna karar verilen ve kullanıcı tarafından onaylanan işlemler yürütülecektir. Onay almadan hiçbir işlem (deploy, kod değişikliği vb.) yapılmayacaktır.
4. **Model Sadakati:** Hikaye oluşturma modeli olarak sadece `gemini-3-flash-preview` kullanılacaktır. Başka bir modelin kullanılması teklif dahi edilemez. Eğer model değişikliği gerektiği düşünülürse, önce tarayıcıda en güncel Flash model API'si araştırılacak ve ardından kullanıcıya öneri sunulacaktır.

9. **Yedekleme ve Versiyon Takibi:** Her büyük güncellemeden önce ve sonra kararlı sürüm GitHub'a push edilecek ve bu dosyanın sonuna yedeğin ismi not düşülecektir.

---

### 🎙️ 12 SİHİRLİ MASALCI (SES ID ENVENTERİ)
Tüm ses ID'leri Google Gemini TTS uyumu için **Kısa Format** (Persona İsmi) olarak mühürlenmiştir:

- **Beyefendiler:** `Achird` (Bilge Dede), `Algenib` (Gezgin Tavşan), `Algieba` (Cesur Şövalye), `Alnilam` (Yüce Kral), `Charon` (Heyecanlı Baba), `Iapetus` (Orman Muhafızı)
- **Hanımefendiler:** `Aoede` (Bilge Anne), `Callirrhoe` (Masalcı Kadın), `Despina` (Huzur Perisi), `Fenrir` (Sihirli Peri), `Gacrux` (Gizemli Prenses), `Kore` (Gökkuşağı Kızı)

---

## 💾 VERSİYON VE YEDEK GEÇMİŞİ

| Tarih | Yedek İsmi (Commit Message) | Açıklama |
| :--- | :--- | :--- |
| 02.05.2026 | **STABLE_BACKUP_VOICES_V1** | 12 Sihirli Masalcı, Chirp 3 HD Sesler ve Vertex AI Entegrasyonu tamamlandı. |
| 02.05.2026 | **FINAL_IMAGE_WIZARD_V1** | Sabit Stil ve Karakter Çapası (Consistent Image) sistemi tamamlandı. |
