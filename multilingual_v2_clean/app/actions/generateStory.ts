'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { buildSystemPrompt } from '@/constants/prompts'
import { getVertexAccessToken } from '@/utils/vertex-auth'

/**
 * 🛡️ ZIRHLI PARSER
 */
function armoredParser(text: string) {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("JSON bloğu bulunamadı.");
        const parsed = JSON.parse(jsonMatch[0].trim());
        if (!parsed.scenes || !Array.isArray(parsed.scenes)) throw new Error("Sahneler eksik.");
        return parsed;
    } catch (err) {
        console.error(">>> [ZIRHLI PARSER] HATA:", err);
        throw new Error("Üretilen veri JSON formatında değil veya eksik.");
    }
}

/**
 * 🔍 AKILLI MULTIMODAL AYIKLAYICI
 * Hem base64 verisini hem de MIME tipini döner.
 */
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

function extractMediaData(candidates: Candidate[]) {
    if (!candidates?.[0]?.content?.parts) return null;
    const mediaPart = candidates[0].content.parts.find((p: MediaPart) => p.inlineData?.data);
    if (!mediaPart || !mediaPart.inlineData) return null;
    return {
        data: mediaPart.inlineData.data,
        mimeType: mediaPart.inlineData.mimeType
    };
}

/**
 * 🎙️ SES ID DÜZELTİCİ
 */
function voiceIdFixer(voiceId: string): string {
    const map: Record<string, string> = {
        'Achird': 'Achird', 'Algenib': 'Algenib', 'Algieba': 'Algieba',
        'Alnilam': 'Alnilam', 'Charon': 'Charon', 'Iapetus': 'Iapetus',
        'Aoede': 'Aoede', 'Callirrhoe': 'Callirrhoe', 'Despina': 'Despina',
        'Fenrir': 'Fenrir', 'Gacrux': 'Gacrux', 'Kore': 'Kore'
    };
    return map[voiceId] || 'Aoede';
}

/**
 * 🎙️ WAV MÜHÜRLEYİCİ (PCM -> WAV)
 * Vertex AI'dan gelen ham PCM verisine 44-byte WAV başlığı ekler.
 * Parametreler: 24kHz, 16-bit, Mono (Gemini 3.1 Standartı)
 */
function addWavHeader(pcmData: Buffer): Buffer {
    const numChannels = 1;
    const sampleRate = 24000; // Gemini 3.1 TTS varsayılanı
    const bitsPerSample = 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const wavHeader = Buffer.alloc(44);

    wavHeader.write('RIFF', 0);
    wavHeader.writeUInt32LE(36 + pcmData.length, 4);
    wavHeader.write('WAVE', 8);
    wavHeader.write('fmt ', 12);
    wavHeader.writeUInt32LE(16, 16);
    wavHeader.writeUInt16LE(1, 20); // AudioFormat: PCM
    wavHeader.writeUInt16LE(numChannels, 22);
    wavHeader.writeUInt32LE(sampleRate, 24);
    wavHeader.writeUInt32LE(byteRate, 28);
    wavHeader.writeUInt16LE(blockAlign, 32);
    wavHeader.writeUInt16LE(bitsPerSample, 34);
    wavHeader.write('data', 36);
    wavHeader.writeUInt32LE(pcmData.length, 40);

    return Buffer.concat([wavHeader, pcmData]);
}

/**
 * 🎨 GÖRSEL MOTORU (FAZ 2)
 */
type CharacterDescriptions = Record<string, string>;
type CharacterRef = { name: string, data: string };

async function generateImage(
    hook: string, 
    characters: CharacterDescriptions, 
    style: string, 
    projectId: string, 
    token: string, 
    activeCharacters?: string[], 
    camera?: string, 
    lighting?: string,
    characterRefs?: CharacterRef[] 
) {
    const stylePrefixMap: Record<string, string> = {
        'Sulu Boya': "watercolor storybook illustration",
        '3D Pixar Stili': "3D Disney Pixar animation frame",
        'Yağlı Boya': "classic oil painting illustration",
        'Pop Art': "vibrant Pop Art illustration",
        'Pastel Düşler': "ethereal pastel illustration",
        'Anime': "Studio Ghibli style anime",
        'Çizgi Film': "2D vector cartoon",
        'Vintage Retro': "1950s retro storybook style"
    };

    const identityDNA = Object.entries(characters || {})
        .filter(([name]) => activeCharacters?.includes(name))
        .map(([name, desc]) => `${name} (${desc})`)
        .join(". ");

    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // 🛡️ MULTIMODAL PROMPT
    const promptText = `
        [TASK: Generate a high-fidelity illustration for a children's book]
        [STYLE: ${stylePrefixMap[style] || stylePrefixMap['Sulu Boya']}]
        [IDENTITY DNA: ${identityDNA || 'Multiple characters'}]
        [SCENE ACTION: ${hook}]
        [CINEMATIC: ${camera || 'Eye-level shot'}, ${lighting || 'Natural lighting'}]
        [MANDATORY: 100% character fidelity from references. Advanced narrative reasoning required.]
        [ID: ${uniqueId}]
    `;

    interface RequestPart {
        text?: string;
        inlineData?: {
            mimeType: string;
            data: string;
        };
    }

    const parts: RequestPart[] = [{ text: promptText }];
    if (characterRefs && characterRefs.length > 0) {
        characterRefs.forEach(ref => {
            parts.push({
                inlineData: {
                    mimeType: "image/png",
                    data: ref.data
                }
            });
        });
    }

    // 🚀 2026 PRO UPGRADE: GLOBAL endpoint + gemini-3.1-flash-image-preview
    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`;

    const MAX_RETRIES = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); 

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: parts }],
                    generationConfig: { 
                        temperature: 1.0,
                        seed: Math.floor(Math.random() * 2147483647),
                        responseModalities: ["IMAGE"],
                        imageConfig: {
                            imageSize: "512"
                        }
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const data = await response.json().catch(() => ({}));

            if (!response.ok) throw new Error(`API Hatası: ${response.status} - ${data.error?.message}`);

            const media = extractMediaData(data.candidates);
            if (media) return media;
            throw new Error("Görsel verisi bulunamadı.");

        } catch (error: unknown) {
            lastError = error instanceof Error ? error : new Error(String(error));
            console.log(`>>> Deneme ${attempt} başarısız: ${lastError.message}.`);
            if (attempt < MAX_RETRIES) {
                const waitTime = attempt * 2000; 
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }

    throw lastError || new Error("Görsel üretimi başarısız.");
}

/**
 * 🎙️ SES MOTORU (FAZ 3) - Vertex AI (WAV MÜHÜRLÜ)
 */
async function generateAudio(text: string, voiceId: string, projectId: string, token: string) {
    const shortId = voiceIdFixer(voiceId);
    
    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-tts-preview:generateContent`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: text }] }],
            generationConfig: { 
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: shortId
                        }
                    }
                }
            }
        })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        console.error(">>> [FAZ 3 SES HATA]:", response.status, JSON.stringify(data));
        throw new Error(`Ses API hatası: ${response.status} - ${data.error?.message || 'Bilinmeyen Hata'}`);
    }

    const media = extractMediaData(data.candidates);
    if (!media) throw new Error("Ses verisi API yanıtında bulunamadı.");
    
    const pcmBuffer = Buffer.from(media.data, 'base64');
    const wavBuffer = addWavHeader(pcmBuffer);

    return {
        data: wavBuffer.toString('base64'),
        mimeType: 'audio/wav'
    };
}

export async function generateStoryAction(formData: {
    hero: string;
    theme: string;
    voiceOption: string;
    childName: string;
    age: string;
    style: string;
    elevenVoiceId?: string;
}) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID!;
    const supabase = await createClient();
    const adminSupabase = await createAdminClient(); 

    try {
        const token = await getVertexAccessToken();
        if (!token) throw new Error("Auth Token alınamadı.");

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Oturum açılmadı.");

        let { data: profile } = await supabase.from('profiles').select('id').eq('user_id', user.id).limit(1).single();
        if (!profile) {
            const { data: newProfile, error: profErr } = await supabase.from('profiles').insert({
                user_id: user.id,
                name: formData.childName || 'Küçük Kahraman',
                age: parseInt(formData.age) || 5
            }).select().single();
            if (profErr) throw profErr;
            profile = newProfile;
        }

        const systemPrompt = buildSystemPrompt(formData.theme, formData.age);
        const userPrompt = `Konu: ${formData.theme}, Kahraman: ${formData.hero}, Yaş: ${formData.age}, Çocuk Adı: ${formData.childName}`;

        const textUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent`;

        const textResponse = await fetch(textUrl, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const textData = await textResponse.json().catch(() => ({}));
        if (!textResponse.ok) throw new Error(`Metin API hatası: ${textResponse.status}`);
        const storyData = armoredParser(textData.candidates[0].content.parts[0].text);

        // FAZ 2 & 3: GÖRSEL VE SES (SIRALI VE SENKRON)
        const pagesWithImages = [];
        const characterArchive: Record<string, string> = {}; 
        const allAudioChunks: Buffer[] = [];
        const voiceId = formData.elevenVoiceId || formData.voiceOption;
        const isSilent = formData.voiceOption === 'Sessiz';

        for (let i = 0; i < storyData.scenes.length; i++) {
            const scene = storyData.scenes[i];
            try {
                // --- GÖRSEL ÜRETİMİ ---
                const currentRefs = scene.active_characters
                    ?.map((name: string) => ({ name, data: (characterArchive as any)[name] }))
                    .filter((ref: any) => ref && ref.data) as { name: string, data: string }[];

                const media = await generateImage(
                    scene.visualHook, 
                    storyData.characters, 
                    formData.style, 
                    projectId, 
                    token,
                    scene.active_characters,
                    scene.camera_angle,
                    scene.lighting,
                    currentRefs
                );

                scene.active_characters?.forEach((name: string) => {
                    if (!characterArchive[name]) {
                        characterArchive[name] = media.data;
                    }
                });
                
                const fileName = `story_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
                await adminSupabase.storage
                    .from('story_assets')
                    .upload(`images/${fileName}`, Buffer.from(media.data, 'base64'), { contentType: media.mimeType });

                const { data: { publicUrl: imgPublicUrl } } = adminSupabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);

                // --- SES ÜRETİMİ (HER SAHNE İÇİN AYRI) ---
                let sceneDuration = 0;
                if (!isSilent) {
                    try {
                        const audioMedia = await generateAudio(scene.text, voiceId, projectId, token);
                        // PCM verisini al (Başlığı eklemeden önceki hali lazım concat için)
                        // generateAudio şu an base64 WAV dönüyor, onu PCM'e geri çevirmemiz lazım veya generateAudio'yu güncelleyebiliriz.
                        // Mevcut generateAudio WAV başlığı ekliyor (44 byte). Onu kırpıp PCM alalım.
                        const wavBuffer = Buffer.from(audioMedia.data, 'base64');
                        const pcmBuffer = wavBuffer.subarray(44); // Başlığı atla
                        allAudioChunks.push(pcmBuffer);
                        
                        // Süre hesabı: 24kHz, 16-bit Mono (48000 bytes per second)
                        sceneDuration = pcmBuffer.length / 48000;
                    } catch (audErr) {
                        console.error(`Sahne ${i+1} ses hatası:`, audErr);
                    }
                }

                pagesWithImages.push({ 
                    text: scene.text, 
                    image_url: imgPublicUrl,
                    duration: sceneDuration > 0 ? sceneDuration : undefined
                });

            } catch (imgErr: unknown) {
                console.error(`Sahne ${i+1} hatası:`, imgErr);
                pagesWithImages.push({ text: scene.text, image_url: '', duration: undefined });
            }
        }

        // SESLERİ BİRLEŞTİR VE YÜKLE
        let finalAudioUrl = '';
        if (allAudioChunks.length > 0) {
            try {
                const combinedPcm = Buffer.concat(allAudioChunks);
                const wavBuffer = addWavHeader(combinedPcm);
                const audioFileName = `audio_${Date.now()}.wav`;
                
                await adminSupabase.storage
                    .from('story_assets')
                    .upload(`audio/${audioFileName}`, wavBuffer, { contentType: 'audio/wav' });

                const { data: { publicUrl: aUrl } } = adminSupabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);
                finalAudioUrl = aUrl;
            } catch (concatErr) {
                console.error("Ses birleştirme hatası:", concatErr);
            }
        }

        const { data: savedStory, error: dbErr } = await supabase.from('stories').insert({
            profile_id: profile!.id,
            title: storyData.title,
            content_json: pagesWithImages,
            image_url: pagesWithImages[0]?.image_url || '',
            audio_url: finalAudioUrl
        }).select().single();

        if (dbErr) throw dbErr;
        return { success: true, id: savedStory.id };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(">>> [STORY MOTOR HATA]:", message);
        return { success: false, error: message };
    }
}
