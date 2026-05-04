import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'
import { getVertexAccessToken } from '@/utils/vertex-auth'

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

// 🛡️ YARDIMCI FONKSİYONLAR (Mevcut mantıktan kopyalandı)
function armoredParser(text: string) {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("JSON bloğu bulunamadı.");
        return JSON.parse(jsonMatch[0].trim());
    } catch (err) {
        throw new Error("JSON Ayrıştırma Hatası");
    }
}

function extractMediaData(candidates: Candidate[]) {
    if (!candidates?.[0]?.content?.parts) return null;
    const mediaPart = candidates[0].content.parts.find((p: MediaPart) => p.inlineData?.data);
    if (!mediaPart || !mediaPart.inlineData) return null;
    return { data: mediaPart.inlineData.data, mimeType: mediaPart.inlineData.mimeType };
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

// 🎨 GÖRSEL ÜRETİMİ (Pro Model)
async function generateImagePro(prompt: string, projectId: string, token: string, refs?: CharacterRef[]) {
    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent`;
    
    interface RequestPart {
        text?: string;
        inlineData?: {
            mimeType: string;
            data: string;
        };
    }

    const parts: RequestPart[] = [{ text: prompt }];
    if (refs) {
        refs.forEach(ref => parts.push({ inlineData: { mimeType: "image/png", data: ref.data } }));
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: 'user', parts }],
            generationConfig: { 
                seed: Math.floor(Math.random() * 2147483647)
            }
        })
    });

    const data = await response.json() as { candidates?: Candidate[], error?: { message: string } };
    if (!response.ok) throw new Error(data.error?.message || "Görsel Hatası");
    return extractMediaData(data.candidates || []);
}

export async function POST(req: NextRequest) {
    const { jobId } = (await req.json()) as { jobId: string };
    const supabase = await createAdminClient();
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID!;
    
    try {
        // 1. İşi Al
        const { data: job, error: jobErr } = await supabase.from('generation_jobs').select('*').eq('id', jobId).single();
        if (jobErr || !job) throw new Error("İş bulunamadı");

        const token = await getVertexAccessToken();
        const payload = job.payload as {
            theme: string;
            hero: string;
            style: string;
            voiceOption: string;
            profile_id?: string;
        };

        // 2. ADIM: METİN YAZIMI (%10)
        await supabase.from('generation_jobs').update({ status: 'text_ready', progress: 10 }).eq('id', jobId);
        
        const storySystemPrompt = `GÖREV: Bir çocuk hikayesi yaz. 
        FORMAT: Sadece JSON döndür. 
        ZORUNLU ALANLAR: title (string), characters (obj: {name: description}), scenes (array: [{text, visualHook}]). 
        SAHNE SAYISI: 12.
        KONU: ${payload.theme}, KAHRAMAN: ${payload.hero}`;

        const textUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent`;
        const textResp = await fetch(textUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ role: 'user', parts: [{ text: storySystemPrompt }] }], 
                generationConfig: { 
                    responseMimeType: "application/json"
                } 
            })
        });

        if (!textResp.ok) {
            const errData = await textResp.json();
            throw new Error(`LLM Metin Hatası: ${errData.error?.message || textResp.statusText}`);
        }

        const textData = await textResp.json() as { candidates: { content: { parts: { text: string }[] } }[] };
        const rawText = textData.candidates[0].content.parts[0].text;
        
        let storyData;
        try {
            storyData = JSON.parse(rawText);
        } catch (e) {
            console.log(">>> JSON Parse failed, trying armoredParser:", e);
            storyData = armoredParser(rawText);
        }

        // 3. ADIM: MASTER KARAKTER PAFTASI (%20)
        await supabase.from('generation_jobs').update({ status: 'master_ready', progress: 20 }).eq('id', jobId);
        const charNames = Object.keys(storyData.characters).join(", ");
        const masterPrompt = `[MASTER CHARACTER SHEET] Generate a high-fidelity reference sheet for ${charNames}. ${JSON.stringify(storyData.characters)}. Show characters side-by-side, full body, neutral white background. Clear details.`;
        const masterMedia = await generateImagePro(masterPrompt, projectId, token);
        if (!masterMedia) throw new Error("Master Pafta üretilemedi");
        await supabase.from('generation_jobs').update({ master_ref_data: masterMedia.data }).eq('id', jobId);

        // 4. ADIM: PARALEL GÖRSEL ÜRETİMİ (%30-80)
        await supabase.from('generation_jobs').update({ status: 'processing', progress: 30 }).eq('id', jobId);
        
        interface Scene {
            text: string;
            visualHook: string;
        }

        const imagePromises = storyData.scenes.map(async (scene: Scene, idx: number) => {
            const scenePrompt = `[SCENE ${idx+1}] Style: ${payload.style}. Content: ${scene.visualHook}. Characters from reference image.`;
            const media = await generateImagePro(scenePrompt, projectId, token, [{ name: 'master', data: masterMedia.data }]);
            
            const fileName = `bg_img_${jobId}_${idx}.png`;
            await supabase.storage.from('story_assets').upload(`images/${fileName}`, Buffer.from(media!.data, 'base64'), { contentType: 'image/png' });
            const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);
            
            // İlerlemeyi güncelle
            const currentProgress = 30 + Math.floor(((idx + 1) / 12) * 50);
            await supabase.from('generation_jobs').update({ progress: currentProgress }).eq('id', jobId);
            
            return { text: scene.text, image_url: publicUrl };
        });

        const pagesWithImages = await Promise.all(imagePromises);

        // 5. ADIM: SESLENDİRME (%90)
        await supabase.from('generation_jobs').update({ status: 'audio_ready', progress: 90 }).eq('id', jobId);
        const fullText = storyData.scenes.map((s: Scene) => s.text).join(" ");
        const ttsUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-tts-preview:generateContent`;
        const ttsResp = await fetch(ttsUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: fullText }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: payload.voiceOption } } } } })
        });
        const ttsData = await ttsResp.json() as { candidates: Candidate[] };
        const audioMedia = extractMediaData(ttsData.candidates);
        const audioFileName = `bg_audio_${jobId}.wav`;
        await supabase.storage.from('story_assets').upload(`audio/${audioFileName}`, addWavHeader(Buffer.from(audioMedia!.data, 'base64')), { contentType: 'audio/wav' });
        const { data: { publicUrl: audioUrl } } = supabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);

        // 6. ADIM: MÜHÜR VE BİTİŞ (%100)
        const { data: story, error: storyErr } = await supabase.from('stories').insert({
            profile_id: payload.profile_id || (await supabase.from('profiles').select('id').eq('user_id', job.user_id).single()).data?.id,
            title: storyData.title,
            content_json: pagesWithImages,
            image_url: pagesWithImages[0].image_url,
            audio_url: audioUrl
        }).select().single();

        if (storyErr) throw storyErr;

        await supabase.from('generation_jobs').update({ status: 'completed', progress: 100, story_id: story.id }).eq('id', jobId);

        return NextResponse.json({ success: true });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(">>> WORKER HATASI:", message);
        await supabase.from('generation_jobs').update({ status: 'failed', error_message: message }).eq('id', jobId);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
