-- ============================================================
-- 📅 21.05.2026 - Yıldız Beğeni & Sıralama Özelliği
-- ============================================================
-- stories tablosuna average_rating ve total_ratings kolonları eklenir.
-- Mevcut satırlar için varsayılan değer: 0
-- ============================================================

ALTER TABLE stories
  ADD COLUMN IF NOT EXISTS average_rating FLOAT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_ratings  INTEGER DEFAULT 0;

-- İndeks: "En Çok Beğenilenler" sıralaması için performans optimizasyonu
CREATE INDEX IF NOT EXISTS idx_stories_average_rating
  ON stories (average_rating DESC);

-- ============================================================
-- ✅ Kontrol: Kolonların eklendiğini doğrula
-- ============================================================
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'stories'
--   AND column_name IN ('average_rating', 'total_ratings');
