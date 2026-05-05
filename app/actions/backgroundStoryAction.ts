'use server'

import { createClient } from '@/utils/supabase/server'

export async function backgroundStoryAction(formData: {
    hero: string;
    theme: string;
    voiceOption: string;
    childName: string;
    age: string;
    style: string;
    elevenVoiceId?: string;
    uploaded_master_ref?: string;
}) {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // 1. Abonelik ve Profil Bilgilerini Çek (KOTA KONTROLÜ İÇİN)
        const [{ data: sub }, { data: profiles }] = await Promise.all([
            supabase.from('subscriptions').select('plan_id, current_period_end').eq('user_id', user.id).maybeSingle(),
            supabase.from('profiles').select('id').eq('user_id', user.id)
        ]);

        const profileIds = profiles?.map(p => p.id) || [];
        const isPremium = sub?.plan_id === 'premium';
        const isPro = sub?.plan_id === 'pro';
        const storyLimit = isPremium ? 90 : (isPro ? 40 : 3);

        // 2. Mevcut Fatura Dönemindeki Kullanımı Hesapla (Sert Sıfırlama Mantığı)
        let startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        if (sub?.current_period_end) {
            startDate = new Date(sub.current_period_end);
            startDate.setDate(startDate.getDate() - 30);
        }

        const { count: usedStories } = await supabase
            .from('stories')
            .select('*', { count: 'exact', head: true })
            .in('profile_id', profileIds)
            .gte('created_at', startDate.toISOString());

        // 🚨 KOTA ENGELLEME (GÜVENLİK DUVARI) - AYLIK ÜRETİM LİMİTİ
        if ((usedStories || 0) >= storyLimit) {
            throw new Error(`Aylık hikaye limitinize ulaştınız (${storyLimit}/${storyLimit}). Yeni haklarınız dönem sonunda yenilenecektir.`);
        }

        // 🧹 ARŞİV TEMİZLEME (YENİ KURAL)
        const archiveLimit = isPremium ? 100 : (isPro ? 50 : 3);
        const { count: totalArchiveCount } = await supabase
            .from('stories')
            .select('*', { count: 'exact', head: true })
            .in('profile_id', profileIds);

        if ((totalArchiveCount || 0) >= archiveLimit) {
            // En eski hikayeyi bul ve sil
            const { data: oldestStory } = await supabase
                .from('stories')
                .select('id')
                .in('profile_id', profileIds)
                .order('created_at', { ascending: true })
                .limit(1)
                .single();

            if (oldestStory) {
                await supabase.from('stories').delete().eq('id', oldestStory.id);
                console.log(`>>> [ARŞİV TEMİZLİĞİ]: Limit dolduğu için en eski hikaye (${oldestStory.id}) silindi.`);
            }
        }

        // 3. İş Kuyruğuna Ekle (Sadece Kota Varsa)
        const { data: job, error: jobErr } = await supabase.from('generation_jobs').insert({
            user_id: user.id,
            status: 'pending',
            progress: 0,
            payload: formData
        }).select().single();

        if (jobErr) throw jobErr;

        // 2. Worker'ı Tetikle (Fire and Forget)
        // Render üzerinde timeout yaşamamak için isteği asenkron olarak gönderiyoruz
        const workerUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://hikaye-yazicisi.onrender.com'}/api/story-worker`;
        
        fetch(workerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: job.id }),
        }).catch(err => console.error(">>> WORKER TETİKLEME HATASI (Normal olabilir):", err));

        return { success: true, jobId: job.id };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(">>> [BACKGROUND ACTION HATA]:", message);
        return { success: false, error: message };
    }
}
