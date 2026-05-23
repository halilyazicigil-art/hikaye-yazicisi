# Halil'in Kuralları

Bu proje boyunca AI (Antigravity) tarafından harfiyen uyulacak kurallardır:

1. **Backend ve Frontend Ayrımı**: Backend'de yapılan hikaye eşleştirme (karakter + konu bazlı fingerprint) mantığı ile frontend'deki gösterim mantığı birbirinden ayrı tutulmalıdır. Bir alandaki değişiklik diğerini bozmamalıdır.
2. **Kod Sadeleştirme Yasağı**: Birebir birbirini etkileyecek hayati bir durum değişmiyorsa, kod içlerinde "temizlik" veya "sadeleştirme" adı altında keyfi değişiklikler yapılmayacaktır. Mevcut çalışan yapı korunacaktır.
3. **Manuel Kontrol ve Hassasiyet**: Otomatik toplu değişiklikler yerine, özellikle senaryo ve metadata gibi alanlarda manuel, tek tek kontrol edilerek işlem yapılacaktır.
4. **Veri Bütünlüğü**: Frontend'de seçilen her bilgi (dil, stil, ses vb.) arka tarafa eksiksiz ve doğru formatta (anahtar bazlı) aktarılmalı ve kaydedilmelidir.
