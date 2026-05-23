# Hikaye Türleri Haritası

Bu dosya, uygulamada seçilebilen hikaye türlerinin Frontend (TR/EN) isimleri ile veritabanında (Supabase) ve arka planda kullanılan teknik anahtarlar arasındaki eşleşmeyi içerir.

| Frontend İsim (TR) | Frontend Name (EN) | Backend Key (Teknik Anahtar) |
| :--- | :--- | :--- |
| **Masal** | Tale | `tale` |
| **Bilim Kurgu** | Sci-Fi | `sci_fi` |
| **Macera** | Adventure | `adventure` |
| **Fantastik** | Fantasy | `fantasy` |
| **Fabl** | Fable | `fable` |

---
**Teknik Not:** "Akıllı Sözlük" (Heuristic Matcher) mantığı, veritabanından gelen verileri bu anahtarlar üzerinden kontrol ederek doğru dili ve etiketi ekrana yansıtır.
