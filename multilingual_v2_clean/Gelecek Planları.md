# 🚀 Gelecek Planları (Roadmap)

İşler iyi gittiğinde ve sistem büyüdüğünde hayata geçirilmesi planlanan "Kütüphane Devrimi" özellikleri:

## 1. AI Sohbet Kartları (Magic Talk Cards)
*   **Amaç:** Ebeveynin çocukla okunan hikaye üzerine derin sohbetler başlatabilmesi.
*   **Nasıl Yapılacak?**
    *   `generateStory.ts` içindeki AI promptuna "3 adet tartışma sorusu üret" talimatı eklenecek.
    *   Sorular `metadata.discussion_questions` alanına kaydedilecek.
    *   Hikaye okuma ekranında şık kartlar olarak sunulacak.

## 2. Okuma Karnesi (Reading Dashboard)
*   **Amaç:** Haftalık okuma alışkanlıklarını görselleştirmek ve gelişimi takip etmek.
*   **Nasıl Yapılacak?**
    *   `content_json` üzerinden kelime sayımı yapılacak.
    *   Supabase üzerinden son 7 günlük üretim verileri anlık sorgulanacak.
    *   Ebeveyn paneline şık sütun grafikler (Dashboard) eklenecek.

## 3. Favori Koleksiyonlarım (Smart Folders)
*   **Amaç:** Hikaye kütüphanesini tematik klasörlerle yönetebilmek.
*   **Nasıl Yapılacak?**
    *   `collections` adında yeni bir veritabanı tablosu açılacak.
    *   Hikayeler ile koleksiyonlar arasında ilişki (Foreign Key) kurulacak.
    *   Kütüphanede "Sürükle-Bırak" veya "Klasöre Ekle" özelliği aktif edilecek.

---
*Bu dosya projenin vizyonunu korumak ve büyüme aşamasında rehberlik etmek için oluşturulmuştur.*
