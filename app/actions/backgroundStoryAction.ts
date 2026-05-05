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
        
        // 🚨 ABONELİK SÜRE KONTROLÜ
        const now = new Date();
        const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true;
        
        const isPremium = !isExpired && sub?.plan_id === 'premium';
        const isPro = !isExpired && sub?.plan_id === 'pro';
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
            const message = isExpired 
                ? "Abonelik süreniz dolmuştur. Masal üretimine devam etmek için lütfen üyeliğinizi yenileyin."
                : `Aylık hikaye limitinize ulaştınız (${storyLimit}/${storyLimit}). Yeni haklarınız dönem sonunda yenilenecektir.`;
            throw new Error(message);
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

        // 🏆 FREEMIUM CACHING MİMARİSİ (MALİYET SIFIRLAMA)
        if (!isPro && !isPremium) {
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

                    // UI'ın anında yönlendirme yapabilmesi için sahte bir tamamlanmış iş oluşturuyoruz
                    const { data: fakeJob } = await supabase.from('generation_jobs').insert({
                        user_id: user.id,
                        status: 'completed',
                        progress: 100,
                        story_id: copiedStory.id,
                        payload: formData
                    }).select().single();

                    console.log(`>>> [FREEMIUM CACHE HIT]: API kullanılmadı! Kopyalanan Story ID: ${copiedStory.id}`);
                    return { success: true, jobId: fakeJob.id };
                }
            }
        }

        // 3. İş Kuyruğuna Ekle (Sadece Kota Varsa ve Cache'de Yoksa)
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
