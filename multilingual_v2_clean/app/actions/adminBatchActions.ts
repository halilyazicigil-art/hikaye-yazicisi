'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { QuotaService } from '@/services/QuotaService'
import { EnterpriseSec } from '@/utils/security/enterprise-sec'

const ENRICHED_STYLES: Record<string, string> = {
    watercolor: "Hand-painted watercolor illustration, soft wet-on-wet washes, paper texture, ethereal and dreamy",
    pixar: "3D animated feature film style, cinematic volumetric lighting, high-detail textures, big expressive eyes",
    pastel: "Soft chalk pastel drawing, muted powdery colors, hazy dreamlike atmosphere, gentle textures",
    anime: "Modern high-quality anime art style, vibrant cel-shading, detailed backgrounds, emotional cinematic lighting",
    oil: "Classic oil painting, thick impasto brushstrokes, rich canvas texture, dramatic chiaroscuro lighting",
    pop_art: "Vibrant pop art style, bold black outlines, halftone dot patterns, high-contrast CMYK colors",
    cartoon: "Hand-drawn 2D cartoon illustration, clean bold outlines, flat vibrant colors, playful and expressive",
    retro: "1970s vintage film aesthetic, faded colors, warm analog grain, soft vignette, nostalgic texture"
};

/**
 * 🏭 TOPLU İŞLERİ VERİTABANINA EKLE (PERSISTENT ENQUEUE)
 */
export async function enqueueAdminBatch(selectedScenarios: any[], batchCount: number) {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // Sadece eksik olan ve seçilen adette taslağı al
        const missing = selectedScenarios.filter(s => !s.isCached).slice(0, batchCount);
        if (missing.length === 0) {
            return { success: false, error: "İşlenecek eksik taslak bulunmadı." };
        }

        // Kullanıcının şu an çalışan bir işi var mı?
        const { data: activeJobs } = await supabase
            .from('generation_jobs')
            .select('id, status')
            .eq('user_id', user.id)
            .in('status', ['processing', 'pending', 'cached_processing', 'generating_audio', 'processing_text', 'generating_master']);

        const hasActiveJob = (activeJobs?.length || 0) > 0;

        let lastScheduledTime = Date.now();

        const enqueuedJobs = [];

        for (let i = 0; i < missing.length; i++) {
            const scenario = missing[i];
            const richStyle = ENRICHED_STYLES[scenario.style] || scenario.style;

            // Parmak İzi (Fingerprint)
            const pChars = scenario.characters.map((c: string) => c.trim()).sort().join(', ');
            const normalize = (txt: string) => txt.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g," ").trim();
            const fingerprint = `${normalize(pChars)}|${normalize(scenario.prompt)}`;

            // Cooldown Zamanlaması (Her taslak arası 2 dakika = 120000ms dinlenme)
            // Eğer ilk işse ve aktif çalışan iş yoksa hemen başlatıyoruz, diğerlerini 2'şer dakika arayla planlıyoruz.
            let scheduledAt: Date;
            if (i < 2 && !hasActiveJob) {
                scheduledAt = new Date();
            } else {
                // Aktif iş varsa veya 3. ve sonraki işlerse sırayla planlanır
                const delayMs = (i < 2 ? 1 : i) * 120 * 1000; 
                scheduledAt = new Date(lastScheduledTime + delayMs);
            }

            const initialStatus = (i < 2 && !hasActiveJob) ? 'pending' : 'waiting_in_queue';

            // Job Kaydını Oluştur
            const { data: job, error: jobErr } = await adminSupabase.from('generation_jobs').insert({
                user_id: user.id,
                status: initialStatus,
                progress: 0,
                payload: {
                    hero: pChars,
                    theme: scenario.theme,
                    voiceOption: 'AI',
                    age: scenario.age,
                    style: richStyle,
                    elevenVoiceId: scenario.voice || 'Aoede',
                    isShuffle: true,
                    language: scenario.language,
                    originalPrompt: scenario.prompt,
                    is_admin_batch: true, // 🏭 Toplu işlem bayrağı
                    scenario_id: scenario.id,
                    metadata: {
                        genre: scenario.genre,
                        style: scenario.style,
                        language: scenario.language,
                        age_group: scenario.age.replace(' Yaş', ''),
                        characters: scenario.characters,
                        voice_name: scenario.voice || 'Aoede'
                    }
                },
                fingerprint: fingerprint,
                scheduled_at: scheduledAt.toISOString(),
                estimated_duration: 0 // Canlı üretim
            }).select().single();

            if (jobErr) {
                console.error("Batch enqueue error:", jobErr);
                throw jobErr;
            }

            enqueuedJobs.push(job);

            // Eğer ilk 2 iş hemen başlayabiliyorsa worker'ı tetikle
            if (i < 2 && initialStatus === 'pending') {
                const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:8181';
                fetch(`${appUrl}/api/story-worker`, {
                    method: 'POST',
                    headers: EnterpriseSec.getAuthorizationHeaders(),
                    body: JSON.stringify({ jobId: job.id }),
                }).catch((err) => {
                    console.warn(`>>> [BATCH] Worker tetikleme sinyali zayıf: ${err.message}`);
                });
            }
        }

        return { success: true, count: enqueuedJobs.length };

    } catch (error: any) {
        console.error("enqueueAdminBatch Error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * ⏸️ SIRADAKİ TOPLU İŞLERİ DURAKLAT (PAUSE)
 */
export async function pauseAdminBatch() {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // waiting_in_queue durumundaki admin toplu işlerini 'paused' durumuna çek
        // (Mevcutta çalışan 'processing', 'generating_audio' vb. işlere dokunulmaz!)
        const { data: updated, error } = await adminSupabase
            .from('generation_jobs')
            .update({ status: 'paused' })
            .eq('user_id', user.id)
            .eq('status', 'waiting_in_queue')
            .filter('payload->>is_admin_batch', 'eq', 'true')
            .select('id');

        if (error) throw error;

        return { success: true, count: updated?.length || 0 };

    } catch (error: any) {
        console.error("pauseAdminBatch Error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * ▶️ DURAKLATILMIŞ TOPLU İŞLERİ DEVAM ETTİR (RESUME)
 */
export async function resumeAdminBatch() {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // Duraklatılmış admin işlerini al
        const { data: pausedJobs, error: fetchErr } = await adminSupabase
            .from('generation_jobs')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'paused')
            .filter('payload->>is_admin_batch', 'eq', 'true')
            .order('created_at', { ascending: true });

        if (fetchErr) throw fetchErr;
        if (!pausedJobs || pausedJobs.length === 0) {
            return { success: true, count: 0 };
        }

        // Şu an çalışan aktif iş var mı?
        const { data: activeJobs } = await supabase
            .from('generation_jobs')
            .select('id')
            .eq('user_id', user.id)
            .in('status', ['processing', 'pending', 'cached_processing', 'generating_audio', 'processing_text', 'generating_master']);

        const hasActiveJob = (activeJobs?.length || 0) > 0;

        let lastScheduledTime = Date.now();
        const updatedJobs = [];

        for (let i = 0; i < pausedJobs.length; i++) {
            const job = pausedJobs[i];

            // Cooldown Zamanlaması (Her taslak arası 2 dakika dinlenme)
            let scheduledAt: Date;
            if (i < 2 && !hasActiveJob) {
                scheduledAt = new Date();
            } else {
                const delayMs = (i < 2 ? 1 : i) * 120 * 1000;
                scheduledAt = new Date(lastScheduledTime + delayMs);
            }

            const initialStatus = (i < 2 && !hasActiveJob) ? 'pending' : 'waiting_in_queue';

            const { data: updated, error: updateErr } = await adminSupabase
                .from('generation_jobs')
                .update({ 
                    status: initialStatus,
                    scheduled_at: scheduledAt.toISOString()
                })
                .eq('id', job.id)
                .select()
                .single();

            if (updateErr) throw updateErr;
            updatedJobs.push(updated);

            // Eğer ilk 2 iş hemen başlayabiliyorsa worker'ı tetikle
            if (i < 2 && initialStatus === 'pending') {
                const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:8181';
                fetch(`${appUrl}/api/story-worker`, {
                    method: 'POST',
                    headers: EnterpriseSec.getAuthorizationHeaders(),
                    body: JSON.stringify({ jobId: job.id }),
                }).catch((err) => {
                    console.warn(`>>> [BATCH] Worker tetikleme sinyali zayıf: ${err.message}`);
                });
            }
        }

        return { success: true, count: updatedJobs.length };

    } catch (error: any) {
        console.error("resumeAdminBatch Error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * ⏹️ TÜM TOPLU İŞLERİ DURDUR VE YOK ET (STOP / CANCEL)
 */
export async function stopAdminBatch() {
    const supabase = await createClient();
    const adminSupabase = await createAdminClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        // waiting_in_queue ve paused durumundaki tüm admin toplu işlerini 'dismissed' (yok edilmiş) yap
        // (Çalışan güncel işe yine dokunulmaz!)
        const { data: updated, error } = await adminSupabase
            .from('generation_jobs')
            .update({ status: 'dismissed' })
            .eq('user_id', user.id)
            .in('status', ['waiting_in_queue', 'paused'])
            .filter('payload->>is_admin_batch', 'eq', 'true')
            .select('id');

        if (error) throw error;

        return { success: true, count: updated?.length || 0 };

    } catch (error: any) {
        console.error("stopAdminBatch Error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * 📊 CANLI AKTİF TOPLU İŞLERİ GETİR (FETCH STATUS)
 */
export async function getAdminBatchJobs() {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: "Oturum açılmadı." };

        const { data: jobs, error } = await supabase
            .from('generation_jobs')
            .select('id, status, progress, payload, error_message, created_at, scheduled_at')
            .eq('user_id', user.id)
            .filter('payload->>is_admin_batch', 'eq', 'true')
            .in('status', ['pending', 'waiting_in_queue', 'processing_text', 'text_ready', 'generating_master', 'master_ready', 'processing', 'generating_audio', 'audio_ready', 'failed', 'paused', 'completed'])
            .order('created_at', { ascending: true });

        if (error) throw error;

        return { success: true, jobs };

    } catch (error: any) {
        console.error("getAdminBatchJobs Error:", error);
        return { success: false, error: error.message };
    }
}
