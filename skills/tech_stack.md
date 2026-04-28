# Teknoloji Yığını (Tech Stack) Kuralları

Bu projede kullanılacak teknolojiler ve geliştirme standartları aşağıdaki gibidir:

## 1. Frontend: Next.js 15
- **Mimari:** Sadece **App Router** (`app/` dizini) kullanılacaktır. Eski Pages Router kullanılmamalıdır.
- **Sunucu ve İstemci Bileşenleri:** Mümkün olduğunca Server Components kullanılmalı, sadece etkileşim gerektiren durumlarda `'use client'` ile Client Components tercih edilmelidir.

## 2. Stil: Tailwind CSS v3
- Tüm stillendirmeler Tailwind CSS v3 kullanılarak yapılacaktır.
- Harici CSS dosyaları (globals.css hariç) veya inline style kullanımı minimize edilmelidir.

## 3. Veritabanı & Backend: Supabase
- **Yetkilendirme ve Veri Güvenliği:** Veritabanı işlemleri **sadece** Supabase Row Level Security (RLS) politikalarıyla korunacaktır.
- Her tablo için uygun RLS politikaları (SELECT, INSERT, UPDATE, DELETE) yazılmalı ve anonim/yetkili kullanıcı erişimleri buna göre kısıtlanmalıdır.
- Supabase istemcisi hem sunucu hem de istemci tarafında güvenli bir şekilde başlatılmalıdır.
