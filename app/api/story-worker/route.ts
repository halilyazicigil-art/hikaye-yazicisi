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
        const parsed = JSON.parse(jsonMatch[0].trim());
        const pages = parsed?.scenes || parsed?.pages || [];
        if (pages.length === 0) throw new Error("Yapay zeka hikaye sayfalarını oluşturamadı.");
        return parsed;
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

// 🎨 GÖRSEL ÜRETİMİ (Pro Model)
async function generateImagePro(prompt: string, projectId: string, token: string, refs?: CharacterRef[], retries = 5) {
    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`;
    
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

    let lastError: any;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
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

            const data = await response.json() as { candidates?: Candidate[], error?: { message: string, code?: number } };
            
            if (!response.ok) {
                const isRateLimit = response.status === 429 || data.error?.code === 429 || data.error?.message?.includes('Resource exhausted');
                throw new Error(isRateLimit ? `Rate Limit 429: ${data.error?.message}` : (data.error?.message || `HTTP Error ${response.status}: Görsel Hatası`));
            }
            
            const extracted = extractMediaData(data.candidates || []);
            if (!extracted) {
                throw new Error("Görsel boş döndü veya güvenlik filtresine takıldı (Empty candidate).");
            }
            return extracted;
        } catch (error: any) {
            lastError = error;
            const isRateLimit = error.message.includes('429') || error.message.includes('Resource exhausted');
            
            console.warn(`[Görsel Üretimi] Deneme ${attempt + 1}/${retries + 1} başarısız:`, error.message);
            
            if (attempt < retries) {
                const baseDelay = isRateLimit ? 6000 : 2000;
                const backoff = (baseDelay * Math.pow(1.5, attempt)) + (Math.random() * 2000); 
                console.log(`[Görsel Üretimi] Kota doldu, sistem ${Math.round(backoff)}ms uyutuluyor... (Deneme: ${attempt + 1})`);
                await delay(backoff);
            }
        }
    }
    
    throw new Error(`Tüm görsel üretimi denemeleri başarısız oldu. Son Hata: ${lastError?.message}`);
}

export async function POST(req: NextRequest) {
    const { jobId } = (await req.json()) as { jobId: string };
    const supabase = await createAdminClient();
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID!;
    
    async function updateJob(id: string, updates: any) {
        await supabase.from('generation_jobs').update(updates).eq('id', id);
    }

    try {
        const { data: job, error: jobErr } = await supabase.from('generation_jobs').select('*').eq('id', jobId).single();
        if (jobErr || !job) throw new Error("İş bulunamadı");

        const token = await getVertexAccessToken();
        const payload = job.payload as any;

        await updateJob(jobId, { status: 'processing_text' });
        
        const storySystemPrompt = `GÖREV: Bir çocuk hikayesi yaz. 
        FORMAT: Sadece JSON döndür. 
        CRITICAL: Return ONLY valid JSON. The JSON keys MUST be exactly: 'title', 'characters', 'scenes'. DO NOT translate the keys into Turkish.
        ZORUNLU ALANLAR: title (string), characters (obj: {name: description}), scenes (array: [{text, visualHook}]). 
        SAHNE SAYISI: 12.
        HİKAYE UZUNLUĞU: Hikaye toplamda yaklaşık ${payload.wordLimit || 500} kelime olmalıdır. Her sahne (scene) metni bu uzunluğu dengeleyecek şekilde detaylı yazılmalıdır.
        
        CRITICAL RULE FOR VISUAL ENGINE (IP & SAFETY):
        Eğer kullanıcı Disney, Marvel, Pixar vb. bilinen telifli karakterler (Örn: Alaaddin, Elsa, Örümcek Adam) veya ünlü kişiler talep ederse, hikaye metninde (text) bu isimleri kullanabilirsin. 
        ANCAK, görsel motoru için hazırlayacağın 'characters' sözlüğünde ve 'visualHook' alanında BU ÖZEL İSİMLERİ ASLA KULLANMA! Onları telifsiz jenerik fiziksel tasvirlere çevir (Örn: 'Alaaddin' yerine 'Arap kıyafetli esmer genç', 'Cin' yerine 'Devasa mavi sihirli ruh').
        Ayrıca güvenlik filtrelerine takılmamak için 'characters' tasvirlerinde ve 'visualHook' sahnelerinde 'çocuk, child, boy, girl, kid' kelimelerini KESİNLİKLE KULLANMA. Yerine 'young adventurer, tiny hero, small individual, youth' gibi yaş/cinsiyet belirtmeyen jenerik kelimeler kullan. 'visualHook' kesinlikle İngilizce olmalı.

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

        const textData = await textResp.json() as any;
        const rawText = textData.candidates[0].content.parts[0].text;
        const storyData = armoredParser(rawText);

        await updateJob(jobId, { status: 'text_ready', progress: 10 });

        // 3. ADIM: MASTER KARAKTER PAFTASI (%20)
        await updateJob(jobId, { status: 'generating_master' });
        
        let masterMedia: { data: string, mimeType: string };
        let masterUrl: string;

        if (payload.uploaded_master_ref) {
            const imgRes = await fetch(payload.uploaded_master_ref);
            if (!imgRes.ok) throw new Error("Yüklenen referans görseli okunamadı.");
            const arrayBuffer = await imgRes.arrayBuffer();
            masterMedia = { data: Buffer.from(arrayBuffer).toString('base64'), mimeType: 'image/png' };
            masterUrl = payload.uploaded_master_ref;
        } else {
            const charsObj = storyData.characters || storyData.karakterler || storyData.Characters || {};
            const charDescriptions = Object.values(charsObj).slice(0, 3).join(". ") || "A young adventurer in standard clothing";
            
            const masterPrompt = `A technical character lineup reference sheet on a plain, neutral light-grey background. Arrange the following characters side-by-side in a horizontal row, standing in a relaxed neutral pose. Full body visible. Characters: ${charDescriptions}. Professional concept art style, clean silhouette, no background scenery, no text.`;
            
            masterMedia = await generateImagePro(masterPrompt, projectId, token);
            const masterFileName = `master_${jobId}.png`;
            await supabase.storage.from('story_assets').upload(`images/${masterFileName}`, Buffer.from(masterMedia.data, 'base64'), { contentType: 'image/png' });
            masterUrl = supabase.storage.from('story_assets').getPublicUrl(`images/${masterFileName}`).data.publicUrl;
        }
        
        await updateJob(jobId, { status: 'master_ready', progress: 20, master_ref_data: masterUrl });

        // 4. ADIM: SAHNE ÇİZİMİ
        await updateJob(jobId, { status: 'processing', progress: 30 });
        const pages = storyData.scenes || [];
        const pagesWithImages = [];
        
        for (let i = 0; i < pages.length; i++) {
            const scene = pages[i];
            const scenePrompt = `[SCENE ${i+1}] Style: ${payload.style}. 
NEW ACTION/SCENE TO DRAW: ${scene.visualHook}. 
CHARACTER REFERENCE: Use the provided reference image ONLY for character design and face consistency. 
CRITICAL INSTRUCTION 1: Do NOT reproduce the reference image exactly. You MUST draw the characters performing the NEW ACTION/SCENE described above. Change their poses and environment to match the new scene.
CRITICAL INSTRUCTION 2: The image MUST NOT contain any text, letters, words, watermarks, signatures, or typography. Clean visual art only.`;

            const media = await generateImagePro(scenePrompt, projectId, token, [{ name: 'master', data: masterMedia.data }]);
            const fileName = `bg_img_${jobId}_${i}.png`;
            await supabase.storage.from('story_assets').upload(`images/${fileName}`, Buffer.from(media!.data, 'base64'), { contentType: 'image/png' });
            const publicUrl = supabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`).data.publicUrl;
            
            const progress = 30 + Math.floor(((i + 1) / (pages.length || 1)) * 60);
            await updateJob(jobId, { progress });
            pagesWithImages.push({ text: scene.text, image_url: publicUrl });
            
            }
        }

        // 5. ADIM: SESLENDİRME (%90)
        await supabase.from('generation_jobs').update({ status: 'generating_audio', progress: 80 }).eq('id', jobId);
        const fullText = storyData.scenes.map((s: Scene) => s.text).join(" ");
        let audioUrl = null;

        if (payload.voiceOption !== 'Sessiz') {
            const voiceName = payload.elevenVoiceId || 'Aoede'; // AI_VOICES id'leri
            const ttsUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-tts-preview:generateContent`;
            const ttsResp = await fetch(ttsUrl, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: fullText }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } } } } })
            });
            const ttsData = await ttsResp.json() as { candidates?: Candidate[], error?: any };
            
            if (!ttsData.candidates || ttsData.candidates.length === 0) {
                throw new Error("TTS Hatası: " + JSON.stringify(ttsData.error || ttsData));
            }
            
            const audioMedia = extractMediaData(ttsData.candidates);
            if (!audioMedia) throw new Error("Ses üretilemedi, medya verisi eksik.");
            
            const audioFileName = `bg_audio_${jobId}.wav`;
            await supabase.storage.from('story_assets').upload(`audio/${audioFileName}`, addWavHeader(Buffer.from(audioMedia.data, 'base64')), { contentType: 'audio/wav' });
            const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);
            audioUrl = publicUrl;
        }

        // Ses işlemi tamamlandı
        await supabase.from('generation_jobs').update({ status: 'audio_ready', progress: 90 }).eq('id', jobId);

        // 6. ADIM: MÜHÜR VE BİTİŞ (%100)
        const { data: story, error: storyErr } = await supabase.from('stories').insert({
            user_id: job.user_id,
            title: storyData.title,
            content_json: pagesWithImages,
            image_url: pagesWithImages[0].image_url,
            audio_url: audioUrl,
            is_shuffle: payload.isShuffle || false
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
