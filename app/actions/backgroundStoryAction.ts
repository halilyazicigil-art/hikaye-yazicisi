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
            { count: usedManual }
        ] = await Promise.all([
            supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', user.id).gte('created_at', startDate.toISOString()),
            supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_shuffle', true).gte('created_at', startDate.toISOString()),
            supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_shuffle', false).gte('created_at', startDate.toISOString())
        ]);

        const usedStories = totalUsed || 0;
        const shuffleUsed = usedShuffle || 0;
        const manualUsed = usedManual || 0;

        // 🚨 SESLİ HİKAYE REZERVASYON SİSTEMİ HESAPLAMASI
        const shuffleAudioLimit = shuffleLimit; // Taslaklar her zaman sesli
        const manualAudioLimit = audioLimit - shuffleLimit; // Geriye kalan ses hakları manuel üretim içindir

        // Sesli üretim sayılarını ayrıştır
        const [
            { count: usedShuffleAudio },
            { count: usedManualAudio }
        ] = await Promise.all([
            supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_shuffle', true).not('audio_url', 'is', null).gte('created_at', startDate.toISOString()),
            supabase.from('stories').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_shuffle', false).not('audio_url', 'is', null).gte('created_at', startDate.toISOString())
        ]);

        const sAudioUsed = usedShuffleAudio || 0;
        const mAudioUsed = usedManualAudio || 0;

        // 🚨 KOTA ENGELLEME (GÜVENLİK DUVARI)
        if (usedStories >= totalLimit) {
            throw new Error(`Aylık toplam hikaye limitinize ulaştınız (${totalLimit}/${totalLimit}).`);
        }

        if (formData.isShuffle) {
            if (shuffleUsed >= shuffleLimit) {
                throw new Error(`Aylık sihirli taslak (karıştır) limitinize ulaştınız (${shuffleLimit}/${shuffleLimit}).`);
            }
            if (sAudioUsed >= shuffleAudioLimit) {
                throw new Error(`Sihirli taslaklar için ayrılan sesli üretim limitiniz doldu (${shuffleAudioLimit}/${shuffleAudioLimit}).`);
            }
        } else {
            if (!isPro && !isPremium) {
                throw new Error("Pamuk Bulut paketi ile sadece sihirli taslakları (karıştır) kullanabilirsiniz. Kendi hikayenizi yazmak için lütfen abone olun.");
            }
            if (manualUsed >= manualLimit) {
                throw new Error(`Aylık özgün hikaye (kendi yazdığınız) limitinize ulaştınız (${manualLimit}/${manualLimit}).`);
            }
        }

        // 🚨 SESLİ MASAL KOTASI KONTROLÜ (MANUEL ÜRETİM İÇİN REZERVASYON KONTROLÜ)
        if (!formData.isShuffle && formData.voiceOption !== 'Sessiz') {
            if (mAudioUsed >= manualAudioLimit) {
                throw new Error(`Kendi hikayeleriniz için sesli üretim limitiniz doldu (${mAudioUsed}/${manualAudioLimit}). Kalan ses haklarınız Sihirli Taslaklar için rezerve edilmiştir.`);
            }
        }

        // 🏆 CACHING MİMARİSİ
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
