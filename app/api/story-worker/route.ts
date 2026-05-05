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
                // Kota aşımları için (429) çok daha agresif bir bekleme (5 sn baz) + Jitter
                const baseDelay = isRateLimit ? 6000 : 2000;
                // Exponential Backoff: 6s, 9s, 13s, 20s, 30s...
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
            uploaded_master_ref?: string;
        };

        // 2. ADIM: METİN YAZIMI (%10)
        // İstek öncesi veritabanı durumunu processing_text olarak güncelleyebiliriz (opsiyonel)
        await supabase.from('generation_jobs').update({ status: 'processing_text' }).eq('id', jobId);
        
        const storySystemPrompt = `GÖREV: Bir çocuk hikayesi yaz. 
        FORMAT: Sadece JSON döndür. 
        CRITICAL: Return ONLY valid JSON. The JSON keys MUST be exactly: 'title', 'characters', 'scenes'. DO NOT translate the keys into Turkish.
        ZORUNLU ALANLAR: title (string), characters (obj: {name: description}), scenes (array: [{text, visualHook}]). 
        SAHNE SAYISI: 12.
        
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

        const textData = await textResp.json() as { candidates: { content: { parts: { text: string }[] } }[] };
        const rawText = textData.candidates[0].content.parts[0].text;
        
        let storyData;
        try {
            storyData = JSON.parse(rawText);
        } catch (e) {
            console.log(">>> JSON Parse failed, trying armoredParser:", e);
            storyData = armoredParser(rawText);
        }

        // Metin işlemi tamamlandı
        await supabase.from('generation_jobs').update({ status: 'text_ready', progress: 10 }).eq('id', jobId);

        // 3. ADIM: MASTER KARAKTER PAFTASI (%20) VEYA BYPASS
        await supabase.from('generation_jobs').update({ status: 'generating_master' }).eq('id', jobId);
        
        let masterMedia: { data: string, mimeType: string };
        let masterUrl: string;

        if (payload.uploaded_master_ref) {
            console.log(`[Bypass] Kullanıcı referans paftası yükledi. Çizim atlanıyor: ${payload.uploaded_master_ref}`);
            const imgRes = await fetch(payload.uploaded_master_ref);
            if (!imgRes.ok) throw new Error("Yüklenen referans görseli okunamadı.");
            
            const arrayBuffer = await imgRes.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');
            
            masterMedia = { data: base64Data, mimeType: 'image/png' };
            masterUrl = payload.uploaded_master_ref;
        } else {
            const charsObj = storyData.characters || storyData.karakterler || storyData.Characters || {};
            if (Object.keys(charsObj).length === 0) {
                charsObj["Kahraman"] = "A young adventurer in standard clothing";
            }
            // LLM fazladan karakter üretirse master paftayı bozmaması için ilk 3 karakteri alıyoruz
            const charDescriptions = Object.values(charsObj).slice(0, 3).join(". ");
            
            const masterPrompt = `A technical character lineup reference sheet on a plain, neutral light-grey background. Arrange the following characters side-by-side in a horizontal row, standing in a relaxed neutral pose. Full body visible. Characters: ${charDescriptions}. Professional concept art style, clean silhouette, no background scenery, no text.`;
            
            const generatedMedia = await generateImagePro(masterPrompt, projectId, token);
            if (!generatedMedia) throw new Error("Master Pafta üretilemedi");
            masterMedia = generatedMedia;
            
            // Supabase Realtime 1MB Payload sınırına takılmamak için master görselini Storage'a yüklüyoruz
            const masterFileName = `master_${jobId}.png`;
            const { error: masterUploadErr } = await supabase.storage.from('story_assets').upload(`images/${masterFileName}`, Buffer.from(masterMedia.data, 'base64'), { contentType: 'image/png' });
            if (masterUploadErr) throw new Error("Master görsel yüklenemedi: " + masterUploadErr.message);
            
            const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${masterFileName}`);
            masterUrl = publicUrl;
        }
        
        // Master Karakter işlemi tamamlandı
        await supabase.from('generation_jobs').update({ status: 'master_ready', progress: 20, master_ref_data: masterUrl }).eq('id', jobId);

        // 4. ADIM: 12 SAHNE ÇİZİMİ (%30-80) (Eski Sıralı Sistem)
        await supabase.from('generation_jobs').update({ status: 'processing', progress: 30 }).eq('id', jobId);
        
        interface Scene {
            text: string;
            visualHook: string;
        }

        const pagesWithImages = [];
        
        // Gelen talep üzerine eski sırayla işleme (bir görsel bitmeden diğerine geçmeme) sistemine dönüldü
        for (let i = 0; i < storyData.scenes.length; i++) {
            const scene = storyData.scenes[i];
            
            // PROMPT ENGINEERING: Referansın aynısını çizmesini engellemek ve yazıları yasaklamak için güçlü yönlendirme
            const scenePrompt = `[SCENE ${i+1}] Style: ${payload.style}. 
NEW ACTION/SCENE TO DRAW: ${scene.visualHook}. 
CHARACTER REFERENCE: Use the provided reference image ONLY for character design and face consistency. 
CRITICAL INSTRUCTION 1: Do NOT reproduce the reference image exactly. You MUST draw the characters performing the NEW ACTION/SCENE described above. Change their poses and environment to match the new scene.
CRITICAL INSTRUCTION 2: The image MUST NOT contain any text, letters, words, watermarks, signatures, or typography. Clean visual art only.`;

            const media = await generateImagePro(scenePrompt, projectId, token, [{ name: 'master', data: masterMedia.data }]);
            
            const fileName = `bg_img_${jobId}_${i}.png`;
            const { error: uploadErr } = await supabase.storage.from('story_assets').upload(`images/${fileName}`, Buffer.from(media!.data, 'base64'), { contentType: 'image/png' });
            if (uploadErr) throw new Error(`Sayfa ${i+1} görseli yüklenemedi: ${uploadErr.message}`);
            
            const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);
            
            // İlerlemeyi güncelle
            const currentProgress = 30 + Math.floor(((i + 1) / storyData.scenes.length) * 50);
            await supabase.from('generation_jobs').update({ progress: currentProgress }).eq('id', jobId);
            
            pagesWithImages.push({ text: scene.text, image_url: publicUrl });
            
            // Kota aşımını önlemek için her sahne arasında bekleme
            if (i < storyData.scenes.length - 1) {
                await delay(2000);
            }
        }

        // 5. ADIM: SESLENDİRME (%90)
        await supabase.from('generation_jobs').update({ status: 'generating_audio', progress: 80 }).eq('id', jobId);
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

        // Ses işlemi tamamlandı
        await supabase.from('generation_jobs').update({ status: 'audio_ready', progress: 90 }).eq('id', jobId);

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
