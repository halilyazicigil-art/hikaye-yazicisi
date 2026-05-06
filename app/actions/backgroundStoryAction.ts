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
    isShuffle?: boolean;
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
        
        // 🚨 ABONELİK SÜRE KONTROLÜ
        const now = new Date();
        const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true;
        
        const isPremium = !isExpired && sub?.plan_id === 'premium';
        const isPro = !isExpired && sub?.plan_id === 'pro';
        
        // 🚨 KESİN PAKET KURALLARI (TASLAK VS ÖZGÜN)
        const totalLimit = isPremium ? 80 : (isPro ? 40 : 3);
        const shuffleLimit = isPremium ? 25 : (isPro ? 10 : 3);
        const manualLimit = isPremium ? 55 : (isPro ? 30 : 0);
        
        const audioLimit = isPremium ? 40 : (isPro ? 20 : 3);
        const wordLimit = isPremium ? 1000 : (isPro ? 500 : 300);

        // 2. Mevcut Fatura Dönemindeki Kullanımı Hesapla (Sert Sıfırlama Mantığı)
        let startDate = new Date();
        if (sub?.current_period_end) {
            // Abone olanlar için: Fatura dönemi başlangıcı = bitişten 1 ay öncesi
            startDate = new Date(sub.current_period_end);
            startDate.setMonth(startDate.getMonth() - 1);
        } else {
            // Ücretsiz (Pamuk Bulut) için: Her ayın 1'inde sıfırlanır
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
        }

        const [
            { count: totalUsed },
            { count: usedShuffle },
            { count: usedManual },
            { count: usedAudioStories }
        ] = await Promise.all([
            supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).gte('created_at', startDate.toISOString()),
            supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).eq('is_shuffle', true).gte('created_at', startDate.toISOString()),
            supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).eq('is_shuffle', false).gte('created_at', startDate.toISOString()),
            supabase.from('stories').select('*', { count: 'exact', head: true }).in('profile_id', profileIds).not('audio_url', 'is', null).gte('created_at', startDate.toISOString())
        ]);

        const usedStories = totalUsed || 0;
        const shuffleUsed = usedShuffle || 0;
        const manualUsed = usedManual || 0;

        // 🚨 KOTA ENGELLEME (GÜVENLİK DUVARI)
        if (usedStories >= totalLimit) {
            throw new Error(`Aylık toplam hikaye limitinize ulaştınız (${totalLimit}/${totalLimit}).`);
        }

        if (formData.isShuffle) {
            if (shuffleUsed >= shuffleLimit) {
                throw new Error(`Aylık sihirli taslak (karıştır) limitinize ulaştınız (${shuffleLimit}/${shuffleLimit}).`);
            }
            if ((usedAudioStories || 0) >= audioLimit) {
                throw new Error(`Aylık sesli masal limitinize ulaştınız (${audioLimit}/${audioLimit}). Taslaklar sesli üretildiği için şu an yeni taslak oluşturamazsınız.`);
            }
        } else {
            if (!isPro && !isPremium) {
                throw new Error("Pamuk Bulut paketi ile sadece sihirli taslakları (karıştır) kullanabilirsiniz. Kendi hikayenizi yazmak için lütfen abone olun.");
            }
            if (manualUsed >= manualLimit) {
                throw new Error(`Aylık özgün hikaye (kendi yazdığınız) limitinize ulaştınız (${manualLimit}/${manualLimit}).`);
            }
        }

        // 🚨 SESLİ MASAL KOTASI KONTROLÜ (MANUEL ÜRETİM İÇİN)
        if (!formData.isShuffle && formData.voiceOption !== 'Sessiz' && (usedAudioStories || 0) >= audioLimit) {
            throw new Error(`Aylık sesli masal limitinize ulaştınız (${audioLimit}/${audioLimit}). Bu masalı 'Sessiz' modda üretebilir veya paketinizi yükseltebilirsiniz.`);
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

        // 🏆 CACHING MİMARİSİ (TÜM PAKETLER İÇİN MALİYET SIFIRLAMA)
        const { data: existingJob } = await supabase
            .from('generation_jobs')
            .select('story_id')
            .eq('status', 'completed')
            .eq('payload->>theme', formData.theme)
            .not('story_id', 'is', null)
            .limit(1)
            .maybeSingle();

        if (existingJob && existingJob.story_id) {
            const { data: masterStory } = await supabase
                .from('stories')
                .select('*')
                .eq('id', existingJob.story_id)
                .single();

            if (masterStory) {
                const targetProfileId = profileIds.length > 0 ? profileIds[0] : null;
                if (!targetProfileId) throw new Error("Hikaye oluşturmak için en az bir çocuk profiliniz olmalı.");

                const { data: copiedStory, error: copyErr } = await supabase
                    .from('stories')
                    .insert({
                        profile_id: targetProfileId,
                        title: masterStory.title,
                        content_json: masterStory.content_json,
                        image_url: masterStory.image_url,
                        audio_url: masterStory.audio_url
                    })
                    .select()
                    .single();

                if (copyErr) throw copyErr;

                // UI'da gerçekçi bir bekleme süresi yaratmak için 'cached_processing' durumuyla başlatıyoruz
                const { data: fakeJob } = await supabase.from('generation_jobs').insert({
                    user_id: user.id,
                    status: 'cached_processing',
                    progress: 0,
                    story_id: copiedStory.id,
                    payload: formData
                }).select().single();

                console.log(`>>> [CACHE HIT]: API kullanılmadı! Kopyalanan Story ID: ${copiedStory.id}`);
                return { success: true, jobId: fakeJob.id };
            }
        }

        // 3. İş Kuyruğuna Ekle (Sadece Kota Varsa ve Cache'de Yoksa)
        const { data: job, error: jobErr } = await supabase.from('generation_jobs').insert({
            user_id: user.id,
            status: 'pending',
            progress: 0,
            payload: { ...formData, wordLimit }
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
