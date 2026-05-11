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
    master_ref_story_id?: string | null;
    isShuffle?: boolean;
    language?: string;
}) {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // 1. Abonelik Bilgilerini Çek (KOTA KONTROLÜ İÇİN)
        const { data: sub } = await supabase.from('subscriptions').select('plan_id, current_period_end').eq('user_id', user.id).maybeSingle();
        
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
        const wordLimit = isPremium ? 500 : (isPro ? 250 : 300);

        // 2. Mevcut Fatura Dönemi Başlangıcını Hesapla
        const startDate = sub?.current_period_end 
            ? new Date(new Date(sub.current_period_end).setMonth(new Date(sub.current_period_end).getMonth() - 1))
            : new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        // 3. Kullanım Verilerini Tek Sorguda Çek (Optimizasyon)
        const { data: periodStories } = await supabase
            .from('stories')
            .select('is_shuffle, audio_url')
            .eq('user_id', user.id)
            .gte('created_at', startDate.toISOString());

        const usedStories = periodStories?.length || 0;
        const shuffleUsed = periodStories?.filter(s => s.is_shuffle).length || 0;
        const manualUsed = usedStories - shuffleUsed;
        const sAudioUsed = periodStories?.filter(s => s.is_shuffle && s.audio_url).length || 0;
        const mAudioUsed = periodStories?.filter(s => !s.is_shuffle && s.audio_url).length || 0;

        // 🚨 KOTA ENGELLEME (GÜVENLİK DUVARI)
        if (usedStories >= totalLimit) {
            throw new Error(`Aylık toplam hikaye limitinize ulaştınız (${totalLimit}/${totalLimit}).`);
        }

        if (formData.isShuffle) {
            if (shuffleUsed >= shuffleLimit) {
                throw new Error(`Aylık sihirli taslak (karıştır) limitinize ulaştınız (${shuffleLimit}/${shuffleLimit}).`);
            }
            if ((sAudioUsed + mAudioUsed) >= audioLimit && formData.voiceOption !== 'Sessiz') {
                throw new Error(`Toplam sesli üretim limitiniz doldu (${audioLimit}/${audioLimit}).`);
            }
        } else {
            if (!isPro && !isPremium) {
                throw new Error("Pamuk Bulut paketi ile sadece sihirli taslakları (karıştır) kullanabilirsiniz. Kendi hikayenizi yazmak için lütfen abone olun.");
            }
            if (manualUsed >= manualLimit) {
                throw new Error(`Aylık özgün hikaye (kendi yazdığınız) limitinize ulaştınız (${manualLimit}/${manualLimit}).`);
            }
            if ((sAudioUsed + mAudioUsed) >= audioLimit && formData.voiceOption !== 'Sessiz') {
                throw new Error(`Toplam sesli üretim limitiniz doldu (${audioLimit}/${audioLimit}).`);
            }
        }

        // 🏆 CACHING MİMARİSİ
        const { data: existingJob } = await supabase
            .from('generation_jobs')
            .select('story_id')
            .eq('status', 'completed')
            .eq('payload->>language', formData.language || 'tr')
            .eq('payload->>theme', formData.theme)
            .not('story_id', 'is', null)
            .limit(1)
            .maybeSingle();

        if (!formData.master_ref_story_id && existingJob && existingJob.story_id) {
            const { data: masterStory } = await supabase
                .from('stories')
                .select('*')
                .eq('id', existingJob.story_id)
                .single();

            if (masterStory) {
                const { data: copiedStory, error: copyErr } = await supabase
                    .from('stories')
                    .insert({
                        user_id: user.id,
                        title: masterStory.title,
                        content_json: masterStory.content_json,
                        image_url: masterStory.image_url,
                        audio_url: masterStory.audio_url,
                        is_shuffle: masterStory.is_shuffle
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
            payload: { ...formData, wordLimit, user_id: user.id }
        }).select().single();

        if (jobErr) throw jobErr;

        // 2. Worker'ı Tetikle (Fire and Forget)
        // Local'de 127.0.0.1 kullanarak DNS sorunlarını aşıyoruz
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:5353';
        const workerUrl = `${appUrl}/api/story-worker`;
        
        console.log(`>>> [TRIGGER]: Worker tetikleniyor: ${workerUrl}`);
        
        fetch(workerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: job.id }),
        }).catch(async (err) => {
            const errMsg = `Worker'a ulaşılamadı: ${err.message}`;
            console.error(">>> WORKER TETİKLEME HATASI:", errMsg);
            // Hatayı veritabanına yazalım ki UI'da radar görebilsin
            await supabase.from('generation_jobs').update({ 
                status: 'failed', 
                error_message: errMsg 
            }).eq('id', job.id);
        });

        return { success: true, jobId: job.id };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(">>> [BACKGROUND ACTION HATA]:", message);
        return { success: false, error: message };
    }
}
