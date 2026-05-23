-- ============================================================
-- SİHİRLİ OYNATMA LİSTELERİ — Spotify Modeli
-- Supabase SQL Editor'da çalıştırın
-- ============================================================

-- 1) Anonim takma ad üretici fonksiyon
-- Kullanıcıya otomatik şirin bir takma ad atar (COPPA uyumu)
CREATE OR REPLACE FUNCTION generate_pseudonym()
RETURNS TEXT AS $$
DECLARE
  adjectives TEXT[] := ARRAY[
    'Sihirli', 'Cesur', 'Mor', 'Altın', 'Gümüş', 'Yıldızlı',
    'Rüzgarlı', 'Bulutlu', 'Işıltılı', 'Neşeli', 'Gizemli',
    'Uçan', 'Parlak', 'Renkli', 'Masal', 'Gökkuşaklı'
  ];
  nouns TEXT[] := ARRAY[
    'Bulut', 'Aslan', 'Kelebek', 'Yıldız', 'Orman', 'Deniz',
    'Kahraman', 'Ejderha', 'Şehzade', 'Peri', 'Tilki', 'Kartal',
    'Dolphin', 'Unicorn', 'Kaptan', 'Gezgin'
  ];
BEGIN
  RETURN adjectives[floor(random() * array_length(adjectives, 1) + 1)] 
      || ' ' 
      || nouns[floor(random() * array_length(nouns, 1) + 1)];
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 2) Kullanıcı takma adları tablosu
-- Her kullanıcıya bir kez atanır, değişmez
-- ============================================================
CREATE TABLE IF NOT EXISTS user_pseudonyms (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  pseudonym    TEXT NOT NULL DEFAULT generate_pseudonym(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE user_pseudonyms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkes takma adları okuyabilir"
  ON user_pseudonyms FOR SELECT USING (true);

CREATE POLICY "Kullanıcı kendi takma adını görebilir"
  ON user_pseudonyms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 3) Oynatma listeleri tablosu
-- ============================================================
CREATE TABLE IF NOT EXISTS playlists (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  cover_image  TEXT,           -- İlk eklenen masalın görseli otomatik alınır
  is_public    BOOLEAN NOT NULL DEFAULT true,
  story_count  INTEGER NOT NULL DEFAULT 0,
  save_count   INTEGER NOT NULL DEFAULT 0,  -- Kaç kişi kaydetmiş
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Herkese açık listeleri herkes okuyabilir"
  ON playlists FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi listesini oluşturabilir"
  ON playlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi listesini güncelleyebilir"
  ON playlists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi listesini silebilir"
  ON playlists FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 4) Liste içindeki masallar
-- ============================================================
CREATE TABLE IF NOT EXISTS playlist_stories (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id  UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  story_id     UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  added_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(playlist_id, story_id)   -- Aynı masal bir listeye 2 kez eklenemez
);

-- RLS
ALTER TABLE playlist_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Liste içeriğini herkes görebilir (public liste)"
  ON playlist_stories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM playlists p
      WHERE p.id = playlist_id
        AND (p.is_public = true OR p.user_id = auth.uid())
    )
  );

CREATE POLICY "Liste sahibi masal ekleyebilir"
  ON playlist_stories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists p
      WHERE p.id = playlist_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Liste sahibi masal çıkarabilir"
  ON playlist_stories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM playlists p
      WHERE p.id = playlist_id AND p.user_id = auth.uid()
    )
  );

-- ============================================================
-- 5) Kaydetme tablosu (Başkasının listesini kaydet)
-- ============================================================
CREATE TABLE IF NOT EXISTS playlist_saves (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  playlist_id  UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  saved_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, playlist_id)   -- Aynı listeyi 2 kez kaydedemez
);

-- RLS
ALTER TABLE playlist_saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcı kendi kayıtlarını görebilir"
  ON playlist_saves FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcı liste kaydedebilir"
  ON playlist_saves FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kaydını silebilir"
  ON playlist_saves FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- 6) Otomatik story_count güncelleyici trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_playlist_story_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE playlists
    SET story_count = story_count + 1,
        updated_at  = NOW(),
        cover_image = COALESCE(
          cover_image,
          (SELECT image_url FROM stories WHERE id = NEW.story_id LIMIT 1)
        )
    WHERE id = NEW.playlist_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE playlists
    SET story_count = GREATEST(story_count - 1, 0),
        updated_at  = NOW()
    WHERE id = OLD.playlist_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER playlist_story_count_trigger
  AFTER INSERT OR DELETE ON playlist_stories
  FOR EACH ROW EXECUTE FUNCTION update_playlist_story_count();

-- ============================================================
-- 7) Otomatik save_count güncelleyici trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_playlist_save_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE playlists SET save_count = save_count + 1 WHERE id = NEW.playlist_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE playlists SET save_count = GREATEST(save_count - 1, 0) WHERE id = OLD.playlist_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER playlist_save_count_trigger
  AFTER INSERT OR DELETE ON playlist_saves
  FOR EACH ROW EXECUTE FUNCTION update_playlist_save_count();

-- ============================================================
-- 8) Kullanıcı ilk giriş yaptığında otomatik takma ad ata
-- ============================================================
CREATE OR REPLACE FUNCTION auto_assign_pseudonym()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_pseudonyms (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- NOT: Bu trigger zaten auth.users tablosunda varsa atla
-- Eğer yoksa aşağıdakini aktif et:
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION auto_assign_pseudonym();

-- ============================================================
-- Mevcut kullanıcılara takma ad ata (tek seferlik)
-- ============================================================
INSERT INTO user_pseudonyms (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================
-- Kontrol sorguları
-- ============================================================
SELECT 'playlists tablosu oluşturuldu ✅' as durum;
SELECT 'playlist_stories tablosu oluşturuldu ✅' as durum;
SELECT 'playlist_saves tablosu oluşturuldu ✅' as durum;
SELECT 'user_pseudonyms tablosu oluşturuldu ✅' as durum;
SELECT COUNT(*) as pseudonym_sayisi FROM user_pseudonyms;
