-- 1. Tabloların Oluşturulması

-- Ebeveyn (Kullanıcı) Profilleri
CREATE TABLE public.users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  pin_code text, -- Ebeveyn paneli şifresi (hashlenmiş olarak tutulması önerilir)
  stripe_customer_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Abonelik Durumları
CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  plan_id text NOT NULL DEFAULT 'free',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Çocuk Profilleri
CREATE TABLE public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  age integer NOT NULL,
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Masallar
CREATE TABLE public.stories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content_json jsonb NOT NULL, -- Masal metin sayfaları
  image_url text, -- Kapak veya ana görsel URL'i
  audio_url text, -- Seslendirme dosyası URL'i
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Yeni kullanıcı kaydolduğunda otomatik olarak users tablosuna ekleyen trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Row Level Security (RLS) Politikaları

-- RLS'i aktif etme
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Users: Sadece kullanıcının kendisi kendi satırını görebilir ve güncelleyebilir
CREATE POLICY "Kullanıcılar kendi profillerini görebilir" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Kullanıcılar kendi profillerini güncelleyebilir" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions: Sadece ilgili ebeveyn kendi abonelik durumunu görebilir
CREATE POLICY "Ebeveyn kendi aboneliğini görebilir" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Profiles (Çocuklar): Ebeveyn sadece kendi çocuklarını görebilir ve yönetebilir
CREATE POLICY "Ebeveyn sadece kendi çocuklarını görebilir" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Ebeveyn kendi çocuk profilini ekleyebilir" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Ebeveyn kendi çocuk profilini güncelleyebilir" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Ebeveyn kendi çocuk profilini silebilir" ON public.profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Stories (Masallar): Masallara sadece profili (dolayısıyla masalı) oluşturan ebeveyn erişebilir
CREATE POLICY "Ebeveyn kendi çocuklarının masallarını görebilir" ON public.stories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = stories.profile_id AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Ebeveyn masal ekleyebilir" ON public.stories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = stories.profile_id AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Ebeveyn masal silebilir" ON public.stories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = stories.profile_id AND profiles.user_id = auth.uid()
    )
  );
