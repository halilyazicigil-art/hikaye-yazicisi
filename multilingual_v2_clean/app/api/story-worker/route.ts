import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'
import { getVertexAccessToken, getActiveProjectId, callVertexAI } from '@/utils/vertex-auth'
import { MetadataSealer } from '@/utils/metadata-sealer'
import { EnterpriseSec } from '@/utils/security/enterprise-sec'
import { EnterpriseQueue } from '@/utils/security/enterprise-queue'
import { ApiSlotBroker } from '@/utils/security/ApiSlotBroker'
import { VertexCostCalculator } from '@/utils/security/VertexCostCalculator'

// 🧠 TİP TANIMLARI
interface MediaPart {
    inlineData?: {
        data: string;
        mimeType: string;
    };
}

interface Candidate {
    content?: {
        parts?: MediaPart[];
    };
}

interface CharacterRef {
    name: string;
    data: string;
}

// 🛡️ SES ID HARİTASI (İki Yönlü)
const VOICE_ID_MAP: Record<string, string> = {
    'Bilge Dede': 'Achird', 'Gezgin Tavşan': 'Algenib', 'Cesur Şövalye': 'Algieba', 'Yüce Kral': 'Alnilam',
    'Heyecanlı Baba': 'Charon', 'Orman Muhafızı': 'Iapetus', 'Bilge Anne': 'Aoede', 'Masalcı Kadın': 'Callirrhoe',
    'Huzur Perisi': 'Despina', 'Sihirli Peri': 'Fenrir', 'Gizemli Prenses': 'Gacrux', 'Gökkuşağı Kızı': 'Kore',
    'Wise Grandpa': 'Achird', 'Traveler Rabbit': 'Algenib', 'Brave Knight': 'Algieba', 'Grand King': 'Alnilam',
    'Excited Dad': 'Charon', 'Forest Guardian': 'Iapetus', 'Wise Mother': 'Aoede', 'Storyteller Woman': 'Callirrhoe',
    'Serenity Fairy': 'Despina', 'Magic Fairy': 'Fenrir', 'Mysterious Princess': 'Gacrux', 'Rainbow Girl': 'Kore'
};

// 🛡️ YARDIMCI FONKSİYONLAR
function armoredParser(text: string) {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("JSON bloğu bulunamadı.");
        const parsed = JSON.parse(jsonMatch[0].trim());
        return parsed;
    } catch (err) {
        throw new Error("JSON Ayrıştırma Hatası");
    }
}

function extractMediaData(candidates: Candidate[]) {
    if (!candidates?.[0]?.content?.parts) return null;
    const mediaPart = candidates[0].content.parts.find((p: MediaPart) => p.inlineData?.data);
    return mediaPart?.inlineData || null;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addWavHeader(pcmData: Buffer): Buffer {
    const numChannels = 1, sampleRate = 24000, bitsPerSample = 16;
    const wavHeader = Buffer.alloc(44);
    wavHeader.write('RIFF', 0);
    wavHeader.writeUInt32LE(36 + pcmData.length, 4);
    wavHeader.write('WAVE', 8);
    wavHeader.write('fmt ', 12);
    wavHeader.writeUInt32LE(16, 16);
    wavHeader.writeUInt16LE(1, 20);
    wavHeader.writeUInt16LE(numChannels, 22);
    wavHeader.writeUInt32LE(sampleRate, 24);
    wavHeader.writeUInt32LE((sampleRate * numChannels * bitsPerSample) / 8, 28);
    wavHeader.writeUInt16LE((numChannels * bitsPerSample) / 8, 32);
    wavHeader.writeUInt16LE(bitsPerSample, 34);
    wavHeader.write('data', 36);
    wavHeader.writeUInt32LE(pcmData.length, 40);
    return Buffer.concat([wavHeader, pcmData]);
}

// 🎙️ LLM METİN ÜRETİMİ (İnatçı Deneme)
async function generateStoryPro(
    prompt: string, 
    jobId?: string,
    supabase?: any,
    slot?: 'primary' | 'backup'
) {
    const modelPath = 'models/gemini-3-flash-preview:generateContent';
    const body = { 
        contents: [{ role: 'user', parts: [{ text: prompt }] }], 
        generationConfig: { responseMimeType: "application/json" } 
    };

    const { response: data } = await callVertexAI(modelPath, body, { preferredSlot: slot });
    
    // Asynchronously log the cost if metadata is available
    if (jobId && supabase && data.usageMetadata) {
        const cost = VertexCostCalculator.calculate(
            'gemini-3-flash-preview',
            data.usageMetadata.promptTokenCount || 0,
            data.usageMetadata.candidatesTokenCount || 0
        );
        supabase.from('job_costs').insert({
            job_id: jobId,
            step_name: 'text_generation',
            model_name: 'gemini-3-flash-preview',
            input_tokens: data.usageMetadata.promptTokenCount || 0,
            output_tokens: data.usageMetadata.candidatesTokenCount || 0,
            input_cost: cost.inputCost,
            output_cost: cost.outputCost
        }).then(({ error }: { error: any }) => {
            if (error) console.error("[Cost Logger Error] Text generation cost logging failed:", error.message);
        });
    }

    return armoredParser(data.candidates[0].content.parts[0].text);
}

// 🎨 GÖRSEL ÜRETİMİ (Pro Model - İnatçı)
async function generateImagePro(
    prompt: string, 
    refs?: CharacterRef[],
    jobId?: string,
    supabase?: any,
    stepName?: string,
    slot?: 'primary' | 'backup'
) {
    const modelPath = 'models/gemini-3.1-flash-image-preview:generateContent';
    const parts: any[] = [{ text: prompt }];
    if (refs) refs.forEach(ref => parts.push({ inlineData: { mimeType: "image/png", data: ref.data } }));

    const body = { 
        contents: [{ role: 'user', parts }], 
        generationConfig: { 
            seed: Math.floor(Math.random() * 2147483647),
            responseModalities: ["IMAGE"],
            imageConfig: {
                imageSize: "512"
            }
        } 
    };

    const { response: data } = await callVertexAI(modelPath, body, { preferredSlot: slot });

    // Asynchronously log the cost if metadata is available
    if (jobId && supabase && stepName && data.usageMetadata) {
        const cost = VertexCostCalculator.calculate(
            'gemini-3.1-flash-image-preview',
            data.usageMetadata.promptTokenCount || 0,
            data.usageMetadata.candidatesTokenCount || 0
        );
        supabase.from('job_costs').insert({
            job_id: jobId,
            step_name: stepName,
            model_name: 'gemini-3.1-flash-image-preview',
            input_tokens: data.usageMetadata.promptTokenCount || 0,
            output_tokens: data.usageMetadata.candidatesTokenCount || 0,
            input_cost: cost.inputCost,
            output_cost: cost.outputCost
        }).then(({ error }: { error: any }) => {
            if (error) console.error(`[Cost Logger Error] Image cost logging for ${stepName} failed:`, error.message);
        });
    }

    const extracted = extractMediaData(data.candidates || []);
    if (extracted) return extracted;
    throw new Error("Boş görsel döndü.");
}

// 🔒 RETRY PATTERN WITH EXPONENTIAL BACKOFF FOR SUPABASE RESILIENCY
async function fetchWithRetry(
    fn: () => any,
    retries = 3,
    delayMs = 1000
): Promise<{ data: any; error: any }> {
    let lastError: any = null;
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fn();
            if (!res.error) return res;
            lastError = res.error;
            
            // If it's a transient database/PostgREST/timeout error, wait and retry
            const msg = res.error.message?.toLowerCase() || '';
            const code = res.error.code || '';
            if (
                code === 'PGRST002' || 
                code === '57014' || 
                msg.includes('timeout') || 
                msg.includes('schema cache') || 
                msg.includes('connection')
            ) {
                console.warn(`>>> [DATABASE RETRY] Transient database issue detected (Code: ${code}, Msg: ${msg}). Retrying in ${delayMs * (i + 1)}ms... (Attempt ${i + 1}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, delayMs * (i + 1)));
                continue;
            }
            return res; // Immediate return for other semantic errors
        } catch (err: any) {
            lastError = err;
            await new Promise(resolve => setTimeout(resolve, delayMs * (i + 1)));
        }
    }
    return { data: null, error: lastError };
}

export async function POST(req: NextRequest) {
    // 🛡️ FAZ 1: KURUMSAL KORUMA KALKANI - Token yetkilendirme kontrolü
    if (!EnterpriseSec.verifyApiToken(req)) {
        console.error(">>> [WORKER UNAUTHORIZED] Yetkisiz tetikleme denemesi engellendi.");
        return NextResponse.json({ success: false, error: 'Unauthorized key signature' }, { status: 401 });
    }

    const { jobId } = (await req.json()) as { jobId: string };
    const supabase = await createAdminClient();
    let projectId = process.env.GOOGLE_CLOUD_PROJECT_ID!;
    
    async function updateJob(id: string, updates: Record<string, any>) {
        const { error } = await fetchWithRetry(() => 
            supabase.from('generation_jobs').update(updates).eq('id', id).select('id').single()
        );
        if (error) {
            console.error(`>>> [updateJob Error] Update failed after retries: ${error.message}`);
        }
    }

    let userId: string | undefined = undefined;

    try {
        const { data: jobData, error: jobErr } = await fetchWithRetry(() => 
            supabase.from('generation_jobs').select('*').eq('id', jobId).single()
        );
        if (jobErr) throw new Error(`Veritabanı Hatası: ${jobErr.message} (Kod: ${jobErr.code})`);
        const job = jobData as any;
        if (!job) throw new Error(`İş bulunamadı: ID "${jobId}" veritabanında mevcut değil.`);
        
        // 🔒 ATOMIC CONCURRENCY GUARD: Eğer iş zaten tamamlanmışsa veya başarısız olmuşsa mükerrer işlemeyi engelle
        if (job.status === 'completed' || job.status === 'failed' || job.status === 'dismissed') {
            console.log(`>>> [WORKER REDUNDANCY SHIELD] İş zaten sonlandırılmış (Durum: ${job.status}). İşlem sonlandırıldı.`);
            return NextResponse.json({ success: true, message: `İş zaten sonlanmış (Durum: ${job.status}).` });
        }

        userId = job.user_id;

        // 🛡️ API Slot Kiralama Kalkanı
        const leasedSlot = await ApiSlotBroker.acquireSlot(supabase, jobId);
        if (!leasedSlot) {
            console.log(`>>> [ApiSlotBroker Meşgul] Tüm API yuvaları şu an meşgul. İş ${jobId} kuyrukta kalmaya devam ediyor.`);
            await updateJob(jobId, { status: 'waiting_in_queue' });
            return NextResponse.json({ success: true, message: 'API slots fully booked, kept in waiting queue.' });
        }
        console.log(`🛡️ [ApiSlotBroker] İş ${jobId} için '${leasedSlot}' yuvası kiralandı.`);

        const token = await getVertexAccessToken(leasedSlot);
        projectId = getActiveProjectId(leasedSlot);
        const payload = job.payload as any;

        // --- [CHECKPOINT VERİLERİ] ---
        let storyData = payload.checkpoint_story_data;
        let masterUrl = payload.checkpoint_master_url || job.master_ref_data;
        let pagesWithImages = payload.checkpoint_pages || [];
        let audioUrl = payload.checkpoint_audio_url;

        // --- [ABONELİK PLANI VE KELİME SINIRI] ---
        const { data: sub } = await supabase
            .from('subscriptions')
            .select('plan_id, current_period_end')
            .eq('user_id', job.user_id)
            .maybeSingle();

        const now = new Date();
        const isExpired = sub?.current_period_end ? new Date(sub.current_period_end) < now : true;
        const isPremium = !isExpired && sub?.plan_id === 'premium'; // Altın Güneş
        const isPro = !isExpired && sub?.plan_id === 'pro';         // Gümüş Gökyüzü
        const maxWords = isPremium ? 500 : 250;

        // ==========================================
        // 🏁 ADIM 0: LLM METİN ÜRETİMİ (Max: 10 saniye)
        // ==========================================
        if (!storyData) {
            await updateJob(jobId, { status: 'processing_text', progress: 5 });
            let sPrompt = "";
            if (payload.tab === 'kisa') {
                sPrompt = `Create a children's story for a ${payload.age} year old child. Theme: ${payload.theme}. Hero: ${payload.hero}. Education: ${payload.educationalValue}. Structure the response as a valid JSON with keys: title, characters (object: {name: description}), scenes (array: 12 objects with 'text' and 'visualHook' in English). 
                Bana 12 adet sahneden (sayfadan) oluşan bir masal kitabı yaz. Her sahne için ilgi çekici ve genel karakter referanslarına uygun görsel promptu (visualHook) ver. Language: ${payload.language || 'Turkish'}. Total words: ${maxWords}.`;
            } else {
                sPrompt = `Create a children's story for a ${payload.age} year old child. Theme: ${payload.theme}. Hero: ${payload.hero}. Education: ${payload.educationalValue}. Structure the response as a valid JSON with keys: title, characters (object: {name: description}), scenes (array: 12 objects with 'text' and 'visualHook' in English). Language: ${payload.language || 'Turkish'}. Total words: 500.`;
            }
            storyData = await generateStoryPro(sPrompt, jobId, supabase, leasedSlot);
            
            await supabase.from('generation_jobs').update({ 
                payload: { ...payload, checkpoint_story_data: storyData } 
            }).eq('id', jobId);

            // İlerlemeyi SSE ile yay ve bir sonraki adıma geç
            await EnterpriseQueue.publishProgress(jobId, 10, { status: 'processing_text' });
            await EnterpriseQueue.triggerNextStepAsync(jobId);
            return NextResponse.json({ success: true, message: 'Text generated, enqueued next step.' });
        }

        // ==========================================
        // 🏁 ADIM 1: MASTER RESİM ÇİZİMİ (Max: 10 saniye)
        // ==========================================
        if (!masterUrl) {
            await updateJob(jobId, { status: 'generating_master', progress: 15 });
            const refId = payload.master_ref_story_id;
            if (refId && refId.length > 10) {
                try {
                    const imgUrl = refId.startsWith('http') ? refId : (await supabase.from('stories').select('image_url, metadata').eq('id', refId).single()).data?.metadata?.master_image_url;
                    if (imgUrl) {
                        masterUrl = imgUrl;
                    }
                } catch (e) {}
            }
            if (!masterUrl) {
                const chars = Object.values(storyData.characters || {}).join(". ");
                const mPrompt = `Character lineup reference sheet: ${chars}. Plain grey background, concept art, no text.`;
                const masterMedia = await generateImagePro(mPrompt, undefined, jobId, supabase, 'master_image', leasedSlot);
                const mFile = `master_${jobId}.png`;
                await supabase.storage.from('story_assets').upload(`images/${mFile}`, Buffer.from(masterMedia.data, 'base64'), { contentType: 'image/png' });
                masterUrl = supabase.storage.from('story_assets').getPublicUrl(`images/${mFile}`).data.publicUrl;
            }

            await supabase.from('generation_jobs').update({ 
                master_ref_data: masterUrl, 
                payload: { ...payload, checkpoint_story_data: storyData, checkpoint_master_url: masterUrl } 
            }).eq('id', jobId);

            await EnterpriseQueue.publishProgress(jobId, 20, { status: 'generating_master' });
            await EnterpriseQueue.triggerNextStepAsync(jobId);
            return NextResponse.json({ success: true, message: 'Master reference created, enqueued next step.' });
        }

        // Karakter referansını yükle
        const mRes = await fetch(masterUrl);
        const mBuf = await mRes.arrayBuffer();
        const masterMedia = { data: Buffer.from(mBuf).toString('base64'), mimeType: 'image/png' };

        const scenes = storyData.scenes || [];

        // ==========================================
        // 🏁 ADIM 2-13: SAHNE GÖRSELLERİNİN ÇİZİLMESİ (Max: Adım başına 10 saniye)
        // ==========================================
        if (payload.tab === 'kisa') {
            // --- TEK KARE ŞAHESER ---
            let sUrl = pagesWithImages[0]?.image_url;
            if (!sUrl) {
                await updateJob(jobId, { status: 'processing', progress: 30 });
                const visualHook = scenes[0]?.visualHook || "A magnificent children's book illustration showing the main character and theme";
                const sPrompt = `Style: ${payload.style}. Action: ${visualHook}. Use provided characters. No text.`;
                const sMedia = await generateImagePro(sPrompt, [{ name: 'master', data: masterMedia.data }], jobId, supabase, 'page_image_0', leasedSlot);
                const sFile = `bg_${jobId}_0.png`;
                await supabase.storage.from('story_assets').upload(`images/${sFile}`, Buffer.from(sMedia.data, 'base64'), { contentType: 'image/png' });
                sUrl = supabase.storage.from('story_assets').getPublicUrl(`images/${sFile}`).data.publicUrl;

                for (let i = 0; i < scenes.length; i++) {
                    pagesWithImages[i] = { 
                        text: scenes[i].text, 
                        image_url: sUrl,
                        duration: pagesWithImages[i]?.duration
                    };
                }

                await supabase.from('generation_jobs').update({ 
                    progress: 80, 
                    payload: { 
                        ...payload, 
                        checkpoint_story_data: storyData, 
                        checkpoint_master_url: masterUrl, 
                        checkpoint_pages: pagesWithImages 
                    } 
                }).eq('id', jobId);

                await EnterpriseQueue.publishProgress(jobId, 80, { status: 'processing', pageIndex: 0 });
                await EnterpriseQueue.triggerNextStepAsync(jobId);
                return NextResponse.json({ success: true, message: 'Master masterpiece scene complete, enqueued audio.' });
            }
        } else {
            // --- STANDART GÖRSELLİ MASAL (Adım Adım / Sayfa Sayfa) ---
            const nextStep = EnterpriseQueue.shouldProcessNextStep(payload, scenes.length);
            
            if (nextStep.nextPageIndex < scenes.length) {
                const i = nextStep.nextPageIndex;
                await updateJob(jobId, { status: 'processing', progress: nextStep.progress });
                
                const sPrompt = `[SCENE ${i+1}] Style: ${payload.style}. Action: ${scenes[i].visualHook}. Use provided characters. No text.`;
                const sMedia = await generateImagePro(sPrompt, [{ name: 'master', data: masterMedia.data }], jobId, supabase, `page_image_${i}`, leasedSlot);
                const sFile = `bg_${jobId}_${i}.png`;
                
                await supabase.storage.from('story_assets').upload(`images/${sFile}`, Buffer.from(sMedia.data, 'base64'), { contentType: 'image/png' });
                const sUrl = supabase.storage.from('story_assets').getPublicUrl(`images/${sFile}`).data.publicUrl;
                
                pagesWithImages[i] = { text: scenes[i].text, image_url: sUrl };

                const nextStatus = EnterpriseQueue.shouldProcessNextStep({
                    checkpoint_story_data: storyData,
                    checkpoint_pages: pagesWithImages
                }, scenes.length);

                await supabase.from('generation_jobs').update({ 
                    progress: nextStatus.progress, 
                    payload: { 
                        ...payload, 
                        checkpoint_story_data: storyData, 
                        checkpoint_master_url: masterUrl, 
                        checkpoint_pages: pagesWithImages 
                    } 
                }).eq('id', jobId);

                await EnterpriseQueue.publishProgress(jobId, nextStatus.progress, { status: 'processing', pageIndex: i });
                await EnterpriseQueue.triggerNextStepAsync(jobId);
                return NextResponse.json({ success: true, message: `Scene ${i + 1} generated successfully.` });
            }
        }

        // ==========================================
        // 🏁 ADIM 14-25: SES DOSYALARININ ÜRETİLMESİ (Adım başına 2 saniye)
        // ==========================================
        if (!audioUrl && payload.voiceOption !== 'Sessiz') {
            const vName = VOICE_ID_MAP[payload.elevenVoiceId || 'Aoede'] || payload.elevenVoiceId || 'Aoede';
            const ttsUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-tts-preview:generateContent`;
            const langCode = payload.language === 'en' ? 'en-US' : 'tr-TR';

            // İlk boş ses dosyasını bul ve sadece onu üret
            let nextVoiceIndex = -1;
            for (let i = 0; i < pagesWithImages.length; i++) {
                const page = pagesWithImages[i];
                if (page.text && !page.audio_chunk && !page.audio_chunk_path && page.duration === undefined) {
                    nextVoiceIndex = i;
                    break;
                }
            }
 
            if (nextVoiceIndex !== -1) {
                const i = nextVoiceIndex;
                const currentProg = 80 + Math.floor((i / pagesWithImages.length) * 15);
                await updateJob(jobId, { status: 'generating_audio', progress: currentProg });
 
                const ttsBody = { 
                    contents: [{ role: 'user', parts: [{ text: pagesWithImages[i].text }] }], 
                    generationConfig: { 
                        responseModalities: ["AUDIO"],
                        speechConfig: { 
                            voiceConfig: { prebuiltVoiceConfig: { voiceName: vName } },
                            languageCode: langCode
                        } 
                    } 
                };
 
                const modelPath = 'models/gemini-3.1-flash-tts-preview:generateContent';
                let ttsD: any;
                try {
                    const callResult = await callVertexAI(modelPath, ttsBody, { timeoutMs: 90_000, preferredSlot: leasedSlot });
                    ttsD = callResult.response;
                } catch (err: any) {
                    console.error(`[Worker] TTS generation failed: ${err.message}`);
                    throw err;
                }

                // Asynchronously log the cost if metadata is available
                if (ttsD.usageMetadata) {
                    const cost = VertexCostCalculator.calculate(
                        'gemini-3.1-flash-tts-preview',
                        ttsD.usageMetadata.promptTokenCount || 0,
                        ttsD.usageMetadata.candidatesTokenCount || 0
                    );
                    supabase.from('job_costs').insert({
                        job_id: jobId,
                        step_name: `audio_page_${i}`,
                        model_name: 'gemini-3.1-flash-tts-preview',
                        input_tokens: ttsD.usageMetadata.promptTokenCount || 0,
                        output_tokens: ttsD.usageMetadata.candidatesTokenCount || 0,
                        input_cost: cost.inputCost,
                        output_cost: cost.outputCost
                    }).then(({ error }: { error: any }) => {
                        if (error) console.error(`[Cost Logger Error] TTS audio cost logging failed for page ${i}:`, error.message);
                    });
                }

                const extracted = extractMediaData(ttsD?.candidates || []);
                if (extracted?.data) {
                    const pcmBuffer = Buffer.from(extracted.data, 'base64');
                    const chunkPath = `audio/temp/${jobId}_page_${i}.pcm`;
                    
                    // 🔒 Upload chunk to storage to keep database payload extremely small
                    const { error: uploadErr } = await supabase.storage
                        .from('story_assets')
                        .upload(chunkPath, pcmBuffer, { contentType: 'application/octet-stream', upsert: true });

                    if (!uploadErr) {
                        pagesWithImages[i].audio_chunk_path = chunkPath;
                        pagesWithImages[i].duration = pcmBuffer.length > 0 ? pcmBuffer.length / 48000 : 0.001;
                    } else {
                        console.error(`[Worker] Chunk upload failed: ${uploadErr.message}`);
                        pagesWithImages[i].audio_chunk = extracted.data; // Fallback to DB
                        pagesWithImages[i].duration = pcmBuffer.length > 0 ? pcmBuffer.length / 48000 : 0.001;
                    }
                } else {
                    // Google ses verisi dönmedi — bu sayfayı atla, devam et
                    pagesWithImages[i].duration = 0.001;
                }
 
                const nextProg = 80 + Math.floor(((i + 1) / pagesWithImages.length) * 15);
                await supabase.from('generation_jobs').update({ 
                    progress: nextProg,
                    payload: { 
                        ...payload, 
                        checkpoint_pages: pagesWithImages 
                    } 
                }).eq('id', jobId);
 
                await EnterpriseQueue.publishProgress(jobId, nextProg, { status: 'generating_audio', audioPageIndex: i });
                await EnterpriseQueue.triggerNextStepAsync(jobId);
                return NextResponse.json({ success: true, message: `Audio chunk ${i + 1} generated.` });
            }
 
            // Tüm ses parçaları oluştuktan sonra hepsini tek bir WAV dosyasında birleştir
            const chunks: Buffer[] = [];
            const tempPathsToDelete: string[] = [];

            for (let i = 0; i < pagesWithImages.length; i++) {
                const page = pagesWithImages[i];
                if (page.audio_chunk) {
                    chunks.push(Buffer.from(page.audio_chunk, 'base64'));
                } else if (page.audio_chunk_path) {
                    const { data: chunkData, error: downloadErr } = await supabase.storage
                        .from('story_assets')
                        .download(page.audio_chunk_path);
                    if (!downloadErr && chunkData) {
                        const chunkBuf = Buffer.from(await chunkData.arrayBuffer());
                        chunks.push(chunkBuf);
                        tempPathsToDelete.push(page.audio_chunk_path);
                    } else {
                        console.error(`[Worker] Temporary audio chunk download failed: ${downloadErr?.message}`);
                    }
                }
            }
 
            if (chunks.length > 0) {
                await updateJob(jobId, { status: 'generating_audio', progress: 96 });
                const combinedPcm = Buffer.concat(chunks);
                const wavBuffer = addWavHeader(combinedPcm); 
                const aFile = `audio_${jobId}.wav`;
                await supabase.storage.from('story_assets').upload(`audio/${aFile}`, wavBuffer, { contentType: 'audio/wav' });
                audioUrl = supabase.storage.from('story_assets').getPublicUrl(`audio/${aFile}`).data.publicUrl;
 
                // Geçici chunks verilerini temizleyerek payload boyutunu optimize et
                const cleanedPages = pagesWithImages.map((p: any) => {
                    const { audio_chunk, audio_chunk_path, ...rest } = p;
                    return rest;
                });
 
                await supabase.from('generation_jobs').update({ 
                    payload: { 
                        ...payload, 
                        checkpoint_story_data: storyData, 
                        checkpoint_master_url: masterUrl, 
                        checkpoint_pages: cleanedPages, 
                        checkpoint_audio_url: audioUrl 
                    } 
                }).eq('id', jobId);
 
                pagesWithImages = cleanedPages;

                // 🧹 Storage temizliği: Geçici PCM dosyalarını sil
                if (tempPathsToDelete.length > 0) {
                    await supabase.storage.from('story_assets').remove(tempPathsToDelete).catch((err) => {
                        console.warn(`[Worker] Temp PCM cleanup failed: ${err.message}`);
                    });
                }
            }
        }

        // ==========================================
        // 🏁 ADIM 26: MASAL OLUŞTURMA VE KAPANIŞ
        // ==========================================
        const { data: story } = await supabase.from('stories').insert({
            user_id: job.user_id, 
            title: storyData.title, 
            content_json: pagesWithImages,
            image_url: pagesWithImages[0].image_url, 
            audio_url: audioUrl, 
            is_shuffle: payload.isShuffle || false,
            metadata: MetadataSealer.seal(payload, storyData, masterUrl)
        }).select().single();

        if (story) {
            await updateJob(jobId, { 
                status: 'completed', 
                progress: 100, 
                story_id: story.id,
                completed_at: new Date().toISOString()
            });

            await EnterpriseQueue.publishProgress(jobId, 100, { status: 'completed', storyId: story.id });

            // 🔓 API yuvasını serbest bırak!
            await ApiSlotBroker.releaseSlot(supabase, jobId);

            // Kuyruktaki bir sonraki bekleyen işi tetikle (Reaktif Tetikleme!)
            const { data: nextJob } = await supabase
                .from('generation_jobs')
                .select('id')
                .eq('status', 'waiting_in_queue')
                .order('created_at', { ascending: true })
                .limit(1)
                .maybeSingle();

            if (nextJob) {
                console.log(`🚀 [Queue Reactive Trigger] Sıradaki iş tetikleniyor: ${nextJob.id}`);
                await EnterpriseQueue.triggerNextStepAsync(nextJob.id);
            }
        }

        return NextResponse.json({ success: true, message: 'Story generation complete!' });

    } catch (error: any) {
        console.error(">>> WORKER HATASI:", error.message);
        
        // 🔓 API yuvasını serbest bırak!
        await ApiSlotBroker.releaseSlot(supabase, jobId);

        const { LoggerService } = require('@/services/LoggerService');
        await LoggerService.fatal(
            'WORKER', 
            `Hikaye Üretim Hatası: ${error.message}`, 
            'story-worker/route.ts',
            { jobId, stack: error.stack },
            userId
        );

        await updateJob(jobId, { status: 'failed', error_message: error.message });
        await EnterpriseQueue.publishProgress(jobId, -1, { status: 'failed', error: error.message });

        // Kuyruktaki bir sonraki bekleyen işi tetikle (Deadlock Kalkanı)
        const { data: nextJob } = await supabase
            .from('generation_jobs')
            .select('id')
            .eq('status', 'waiting_in_queue')
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (nextJob) {
            console.log(`🚀 [Queue Reactive Trigger on Fail] Sıradaki iş tetikleniyor: ${nextJob.id}`);
            await EnterpriseQueue.triggerNextStepAsync(nextJob.id);
        }

        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
