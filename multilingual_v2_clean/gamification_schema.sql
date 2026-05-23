-- 1) Badges Master Table
CREATE TABLE IF NOT EXISTS public.badges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  milestone INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Check if select policy exists before creating
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'badges' AND policyname = 'Everyone can select badges'
  ) THEN
    CREATE POLICY "Everyone can select badges" ON public.badges FOR SELECT USING (true);
  END IF;
END
$$;

-- 2) Profile Badges (Earned Badges)
CREATE TABLE IF NOT EXISTS public.profile_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, badge_id)
);

ALTER TABLE public.profile_badges ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profile_badges' AND policyname = 'Users can select own child badges'
  ) THEN
    CREATE POLICY "Users can select own child badges" ON public.profile_badges FOR SELECT
      USING (EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = profile_id AND p.user_id = auth.uid()
      ));
  END IF;
END
$$;

-- 3) Profile Pets (Okuma Arkadaşı)
CREATE TABLE IF NOT EXISTS public.profile_pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  pet_name TEXT NOT NULL DEFAULT 'Sihirli Yumurta',
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  stage TEXT NOT NULL DEFAULT 'egg', -- 'egg', 'baby', 'child', 'teen', 'adult'
  pet_type TEXT DEFAULT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profile_pets ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profile_pets' AND policyname = 'Users can select own child pet'
  ) THEN
    CREATE POLICY "Users can select own child pet" ON public.profile_pets FOR SELECT
      USING (EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = profile_id AND p.user_id = auth.uid()
      ));
  END IF;
END
$$;

-- 4) Profile Story Activity Log (Audit Log for rewards)
CREATE TABLE IF NOT EXISTS public.profile_story_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  source TEXT NOT NULL, -- 'parent', 'library', 'parent_private', 'community_popular'
  listened_at TIMESTAMPTZ DEFAULT NOW()
  -- NOT: UNIQUE(profile_id, story_id, source) kısıtı kaldırıldı.
  -- Kullanıcılar sevdikleri hikayeleri tekrar dinlediklerinde XP/rozet kazanmaya devam eder.
  -- Suistimal koruması zaten %80 dinleme eşiği (anti-cheat threshold) ile sağlanmaktadır.
);

ALTER TABLE public.profile_story_activity ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profile_story_activity' AND policyname = 'Users can select own child activity'
  ) THEN
    CREATE POLICY "Users can select own child activity" ON public.profile_story_activity FOR SELECT
      USING (EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = profile_id AND p.user_id = auth.uid()
      ));
  END IF;
END
$$;

-- Insert default badges
INSERT INTO public.badges (id, title, description, icon, milestone) VALUES
  ('first_spark', 'İlk Kıvılcım', 'İlk özel masalını başarıyla tamamladın! 🌟', '🌟', 1),
  ('bookworm', 'Kitap Kurdu', '3 adet özel masal tamamlayarak harika bir başlangıç yaptın! 🐛', '🐛', 3),
  ('story_explorer', 'Masal Gezgini', '5 adet özel masal dinleyerek farklı diyarlara yolculuk ettin! 🗺️', '🗺️', 5),
  ('hero_reader', 'Kahraman Okur', '10 adet özel masal dinledin, artık gerçek bir kahramansın! 🏆', '🏆', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  milestone = EXCLUDED.milestone;

-- 5) Atomic Reward Rule Engine Stored Procedure
CREATE OR REPLACE FUNCTION public.complete_story_listen(
  p_profile_id UUID,
  p_story_id UUID,
  p_source TEXT
)
RETURNS JSONB
SECURITY DEFINER
AS $$
DECLARE
  v_pet_record RECORD;
  v_old_xp INTEGER;
  v_new_xp INTEGER;
  v_old_level INTEGER;
  v_new_level INTEGER;
  v_old_stage TEXT;
  v_new_stage TEXT;
  v_level_up BOOLEAN := FALSE;
  v_evolved BOOLEAN := FALSE;
  v_new_badges_count INTEGER := 0;
  v_badge_record RECORD;
  v_newly_earned JSONB := '[]'::jsonb;
  v_total_private_listens INTEGER;
BEGIN

  -- Log listen activity
  INSERT INTO public.profile_story_activity (profile_id, story_id, source)
  VALUES (p_profile_id, p_story_id, p_source);

  -- Evaluate Rewards
  IF p_source IN ('library', 'community_popular') THEN
    -- Virtual Pet XP Route
    SELECT * INTO v_pet_record FROM public.profile_pets WHERE profile_id = p_profile_id;
    
    IF NOT FOUND THEN
      v_old_xp := 0;
      v_old_level := 1;
      v_old_stage := 'egg';
      
      INSERT INTO public.profile_pets (profile_id, xp, level, stage, pet_type)
      VALUES (p_profile_id, 0, 1, 'egg', 'dragon')
      RETURNING xp, level, stage INTO v_pet_record;
    ELSE
      v_old_xp := v_pet_record.xp;
      v_old_level := v_pet_record.level;
      v_old_stage := v_pet_record.stage;
    END IF;

    v_new_xp := v_old_xp + 50;

    -- Pet levels threshold (Level up every 100 XP / 200 XP at higher levels)
    IF v_new_xp < 100 THEN v_new_level := 1;
    ELSIF v_new_xp < 200 THEN v_new_level := 2;
    ELSIF v_new_xp < 400 THEN v_new_level := 3;
    ELSIF v_new_xp < 600 THEN v_new_level := 4;
    ELSIF v_new_xp < 800 THEN v_new_level := 5;
    ELSIF v_new_xp < 1000 THEN v_new_level := 6;
    ELSIF v_new_xp < 1200 THEN v_new_level := 7;
    ELSIF v_new_xp < 1500 THEN v_new_level := 8;
    ELSIF v_new_xp < 2000 THEN v_new_level := 9;
    ELSE v_new_level := 10;
    END IF;

    -- Evolution stages
    IF v_new_level <= 2 THEN v_new_stage := 'egg';
    ELSIF v_new_level <= 5 THEN v_new_stage := 'baby';
    ELSIF v_new_level <= 8 THEN v_new_stage := 'child';
    ELSIF v_new_level = 9 THEN v_new_stage := 'teen';
    ELSE v_new_stage := 'adult';
    END IF;

    IF v_new_level > v_old_level THEN v_level_up := TRUE; END IF;
    IF v_new_stage <> v_old_stage THEN v_evolved := TRUE; END IF;

    UPDATE public.profile_pets
    SET xp = v_new_xp, level = v_new_level, stage = v_new_stage, updated_at = NOW()
    WHERE profile_id = p_profile_id;

    RETURN jsonb_build_object(
      'success', true,
      'rewarded', true,
      'reward_type', 'xp',
      'xp_added', 50,
      'pet_stats', jsonb_build_object(
        'xp', v_new_xp,
        'level', v_new_level,
        'stage', v_new_stage,
        'level_up', v_level_up,
        'evolved', v_evolved
      ),
      'newly_earned_badges', '[]'::jsonb
    );

  ELSE
    -- Badges Milestone Route (parent / parent_private)
    SELECT COUNT(*) INTO v_total_private_listens
    FROM public.profile_story_activity
    WHERE profile_id = p_profile_id AND source IN ('parent', 'parent_private');

    FOR v_badge_record IN
      SELECT b.id, b.title, b.description, b.icon
      FROM public.badges b
      WHERE b.milestone <= v_total_private_listens
        AND NOT EXISTS (
          SELECT 1 FROM public.profile_badges pb
          WHERE pb.profile_id = p_profile_id AND pb.badge_id = b.id
        )
    LOOP
      INSERT INTO public.profile_badges (profile_id, badge_id)
      VALUES (p_profile_id, v_badge_record.id);

      v_newly_earned := v_newly_earned || jsonb_build_object(
        'id', v_badge_record.id,
        'title', v_badge_record.title,
        'description', v_badge_record.description,
        'icon', v_badge_record.icon
      );
    END LOOP;

    RETURN jsonb_build_object(
      'success', true,
      'rewarded', true,
      'reward_type', 'badge',
      'xp_added', 0,
      'pet_stats', null,
      'newly_earned_badges', v_newly_earned
    );
  END IF;
END;
$$ LANGUAGE plpgsql;
