-- ============================================================
-- LumiBook: Atomik Shuffle Kopyalama RPC (Race Condition Çözümü)
-- Bu fonksiyon "bul" ve "kopyala" adımlarını TEK bir PostgreSQL
-- transaction içinde birleştirir. 300 eşzamanlı istek gelse bile
-- hiçbiri null almaz, hepsi hazır taslaktan kopyalanır.
-- Supabase SQL Editor'da çalıştırın.
-- ============================================================

CREATE OR REPLACE FUNCTION find_and_copy_shuffle(
    p_fingerprints   TEXT[],       -- Eşleştirilecek parmak izi listesi
    p_user_id        UUID,         -- Kopya sahibi olacak kullanıcı
    p_status         TEXT,         -- Job başlangıç durumu
    p_payload        JSONB,        -- Job payload verisi
    p_fingerprint    TEXT,         -- Yeni job'a yazılacak ana parmak izi
    p_scheduled_at   TIMESTAMPTZ,  -- Planlanmış başlangıç zamanı
    p_estimated_duration INT       -- Tahmini süre (saniye)
)
RETURNS UUID   -- Oluşturulan job'ın ID'si; taslak bulunamazsa NULL döner
LANGUAGE plpgsql
SECURITY DEFINER   -- Service role yetkisiyle çalışır (admin erişimi)
AS $$
DECLARE
    v_master_story_id   UUID;
    v_master_story      RECORD;
    v_copied_story_id   UUID;
    v_new_job_id        UUID;
BEGIN
    -- ─────────────────────────────────────────────────────────
    -- ADIM 1: Uygun bir tamamlanmış taslak job'ı BUL ve KİLİTLE
    -- FOR SHARE: Diğer kullanıcılar da aynı satırı okuyabilir
    -- (paylaşımlı kilit), ama satırı güncelleyemez/silemez.
    -- Bu sayede 300 kullanıcı AYNI taslak kaydını eş zamanlı
    -- okuyup kopyalayabilir — hiçbiri null almaz.
    -- ─────────────────────────────────────────────────────────
    SELECT gj.story_id
    INTO   v_master_story_id
    FROM   generation_jobs gj
    WHERE  gj.fingerprint = ANY(p_fingerprints)
      AND  gj.status      = 'completed'
      AND  gj.story_id   IS NOT NULL
    ORDER BY gj.created_at ASC
    LIMIT  1
    FOR SHARE;                      -- Paylaşımlı okuma kilidi

    -- Taslak bulunamadıysa NULL döndür → çağıran kod sıfırdan üretir
    IF v_master_story_id IS NULL THEN
        RETURN NULL;
    END IF;

    -- ─────────────────────────────────────────────────────────
    -- ADIM 2: Master hikayenin tüm sütunlarını çek
    -- ─────────────────────────────────────────────────────────
    SELECT *
    INTO   v_master_story
    FROM   stories
    WHERE  id = v_master_story_id;

    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    -- ─────────────────────────────────────────────────────────
    -- ADIM 3: Hikayeyi kullanıcı adına KOPYALA
    -- ─────────────────────────────────────────────────────────
    INSERT INTO stories (
        user_id,
        title,
        content_json,
        image_url,
        audio_url,
        is_shuffle,
        metadata
    )
    VALUES (
        p_user_id,
        v_master_story.title,
        v_master_story.content_json,
        v_master_story.image_url,
        v_master_story.audio_url,
        v_master_story.is_shuffle,
        v_master_story.metadata
    )
    RETURNING id INTO v_copied_story_id;

    -- ─────────────────────────────────────────────────────────
    -- ADIM 4: Sahte (fake) job kaydı oluştur
    -- Hikaye kopyalama başarısız olursa job da oluşmaz (atomik)
    -- ─────────────────────────────────────────────────────────
    INSERT INTO generation_jobs (
        user_id,
        status,
        progress,
        story_id,
        payload,
        fingerprint,
        scheduled_at,
        estimated_duration
    )
    VALUES (
        p_user_id,
        p_status,
        100,              -- Hazır taslak; zaten %100 tamamlanmış
        v_copied_story_id,
        p_payload,
        p_fingerprint,
        p_scheduled_at,
        p_estimated_duration
    )
    RETURNING id INTO v_new_job_id;

    -- İkisi de atomik: biri başarısız olursa tamamı geri alınır (ROLLBACK)
    RETURN v_new_job_id;
END;
$$;

-- Fonksiyona erişim izni ver
GRANT EXECUTE ON FUNCTION find_and_copy_shuffle TO authenticated;
GRANT EXECUTE ON FUNCTION find_and_copy_shuffle TO service_role;
