-- =========================================================================
-- 🛡️ CURUMSAL API YUVA KİRALAMA ALTYAPISI (API SLOT LEASING SCHEME)
-- Lütfen bu SQL kodunu Supabase Dashboard > SQL Editor üzerinden çalıştırın.
-- =========================================================================

-- 1. API Anahtar Yuvaları Tablosu
CREATE TABLE IF NOT EXISTS public.api_key_slots (
    slot_name text PRIMARY KEY,            -- 'primary' (Ana API) veya 'backup' (Yedek API)
    is_locked boolean DEFAULT false,       -- Yuva kilitli mi?
    locked_at timestamp with time zone,     -- Kilitlenme zamanı
    job_id uuid                            -- Kilidi elinde tutan işin (Job) ID'si
);

-- RLS (Row Level Security) Politikaları
-- Bu tabloya dışarıdan anonim erişimi engelliyoruz. Sadece Service Role yetkili olacak.
ALTER TABLE public.api_key_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role only" ON public.api_key_slots
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 2. İlk Yuvaları Yerleştir (Mevcut değilse)
INSERT INTO public.api_key_slots (slot_name, is_locked)
VALUES 
('primary', false),
('backup', false)
ON CONFLICT (slot_name) DO NOTHING;

-- 3. Atomik Yuva Kiralama Fonksiyonu (acquire_api_slot)
-- Bu fonksiyon, verilen bir iş (Job) için boş olan ilk yuvayı (primary veya backup) atomically kiralar.
CREATE OR REPLACE FUNCTION public.acquire_api_slot(p_job_id uuid)
RETURNS text AS $$
DECLARE
    v_allocated_slot text := null;
BEGIN
    -- Önce zaman aşımına uğramış (15 dakikadan uzun süredir kilitli kalmış) yuvaları kurtar (Deadlock koruması)
    UPDATE public.api_key_slots
    SET is_locked = false, locked_at = null, job_id = null
    WHERE is_locked = true AND locked_at < now() - interval '15 minutes';

    -- Eğer bu iş zaten bir yuva kiralamışsa, o yuvayı güncelle (keep-alive) ve geri dön (Re-entrancy / Checkpoint koruması)
    UPDATE public.api_key_slots
    SET locked_at = now()
    WHERE job_id = p_job_id
    RETURNING slot_name INTO v_allocated_slot;

    IF v_allocated_slot IS NOT NULL THEN
        RETURN v_allocated_slot;
    END IF;

    -- Boş olan ilk yuvayı kilitle (Önce 'primary', sonra 'backup' tercih edilir)
    UPDATE public.api_key_slots
    SET is_locked = true, locked_at = now(), job_id = p_job_id
    WHERE slot_name = (
        SELECT slot_name 
        FROM public.api_key_slots 
        WHERE is_locked = false 
        ORDER BY (CASE WHEN slot_name = 'primary' THEN 1 ELSE 2 END) ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED -- Eşzamanlılık çakışmalarını %100 önleyen atomik veritabanı kilidi!
    )
    RETURNING slot_name INTO v_allocated_slot;

    RETURN v_allocated_slot;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Yuva Serbest Bırakma Fonksiyonu (release_api_slot)
-- İlgili iş (Job) tamamlandığında veya başarısız olduğunda kiraladığı yuvayı serbest bırakır.
CREATE OR REPLACE FUNCTION public.release_api_slot(p_job_id uuid)
RETURNS void AS $$
BEGIN
    UPDATE public.api_key_slots
    SET is_locked = false, locked_at = null, job_id = null
    WHERE job_id = p_job_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
