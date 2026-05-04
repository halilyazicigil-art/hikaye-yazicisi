'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
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
function extractMediaData(candidates: any[]) {
    if (!candidates?.[0]?.content?.parts) return null;
    const mediaPart = candidates[0].content.parts.find((p: any) => p.inlineData?.data);
    if (!mediaPart) return null;
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
async function generateImage(hook: string, characters: any, style: string, projectId: string, token: string, activeCharacters?: string[], sceneIndex?: number, totalScenes?: number, camera?: string, lighting?: string) {
    const stylePrefixMap: Record<string, string> = {
        'Sulu Boya': "A professional children's book watercolor illustration of ",
        '3D Pixar Stili': "A high-quality 3D Disney Pixar style animation frame of ",
        'Yağlı Boya': "A classic oil painting style illustration of ",
        'Pop Art': "A vibrant Pop Art style illustration of ",
        'Pastel Düşler': "A soft pastel colors dreamlike illustration of ",
        'Anime': "High quality Studio Ghibli style anime illustration of ",
        'Çizgi Film': "A clean 2D vector cartoon style illustration of ",
        'Vintage Retro': "A classic 1950s golden age storybook illustration of "
    };
    
    const styleSuffixMap: Record<string, string> = {
        'Sulu Boya': ". soft pastel colors, dreamlike atmosphere, high quality, detailed",
        '3D Pixar Stili': ". vibrant colors, cute character designs, cinematic lighting, 8k render",
        'Yağlı Boya': ". rich textures, artistic brushstrokes, warm lighting, timeless",
        'Pop Art': ". bold lines, bright colors, comic book aesthetic, dynamic",
        'Pastel Düşler': ". ethereal lighting, soft edges, whimsical, magical",
        'Anime': ". detailed backgrounds, expressive eyes, cinematic composition",
        'Çizgi Film': ". flat colors, bold outlines, playful, friendly",
        'Vintage Retro': ". muted tones, textured paper, nostalgic, charming"
    };

    // 🛡️ 2026 CERRAHİ: Dinamik Perspektif ve Sahne Mührü
    const activeCharSpecs = Object.entries(characters || {})
        .filter(([name]) => activeCharacters?.includes(name))
        .map(([name, desc]) => `CHARACTER ${name}: ${desc}`)
        .join(". ");

    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const identityBlock = activeCharSpecs ? `[IDENTITY REFERENCE: ${activeCharSpecs}]` : "[NO CHARACTER]";
    const sceneBlock = `[SCENE ${sceneIndex || 1} OF ${totalScenes || 12}]`;
    const perspectiveBlock = `[CAMERA: ${camera || 'Eye-level'}] [LIGHTING: ${lighting || 'Natural'}]`;
    const actionBlock = `[SCENE ACTION: ${hook}] [UNIQUE ID: ${uniqueId}]`;
    const styleBlock = `[ARTISTIC STYLE: ${stylePrefixMap[style] || stylePrefixMap['Sulu Boya']} ${styleSuffixMap[style] || styleSuffixMap['Sulu Boya']}]`;
    const mandatoryBlock = `MANDATORY: 100% character fidelity for IDENTITY REFERENCE. Strictly follow CAMERA and LIGHTING. Avoid any duplication with previous scenes. Unique composition required.`;

    const finalPrompt = `${identityBlock} ${sceneBlock} ${perspectiveBlock} ${actionBlock} ${styleBlock} ${mandatoryBlock}`;

    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`;

    // 🩺 SIRALI SABIR VE ÜSTEL KURTARMA DÖNGÜSÜ
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
                    contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
                    generationConfig: { 
                        responseMimeType: "application/json",
                        temperature: 1.0,
                        seed: Math.floor(Math.random() * 2147483647) // 2026 Spec: Teknik Seed Enjeksiyonu
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

        } catch (error: any) {
            lastError = error;
            console.log(`>>> Deneme ${attempt} başarısız: ${error.message}.`);
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
    
    // 🛡️ VERTEX-ZIRHLI: Ham PCM verisini WAV başlığıyla sarmalıyoruz
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
    const adminSupabase = await createAdminClient(); // 🛡️ Zırhlı storage erişimi

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

        // FAZ 1: METİN
        const systemPrompt = `
                GÖREV: Bir çocuk hikayesi yaz.
                DİL: Türkçe.
                ÇIKTI: JSON formatında olmalı.

                İÇERİK KURALLARI:
                1. 'title': Hikayenin başlığı.
                2. 'characters': Hikayedeki karakterlerin sözlüğü. { "İsim": "Çok detaylı fiziksel tarif, kıyafet, saç rengi" } formatında. (Görsel süreklilik için kritik).
                3. 'scenes': ZORUNLU OLARAK TAM 12 SAHNE ÜRETİLECEK. Her sahne şunları içermeli:
                   - 'text': Çocuğun okuyacağı masal metni (Türkçe).
                   - 'active_characters': Bu sahnede fiziksel olarak bulunan karakter isimlerinin listesi (Örn: ["Ali", "Canan"]).
                   - 'camera_angle': Bu sahne için benzersiz bir kamera açısı (Örn: 'Close-up', 'Wide-angle', 'Bird-s eye view', 'Side view').
                   - 'lighting': Sahneye özel ışıklandırma (Örn: 'Golden hour', 'Cinematic', 'Soft moon light', 'Bright sun').
                   - 'visualHook': BU SAHNE İÇİN GÖRSEL MOTORUNA GİDECEK KESİN TALİMAT (İngilizce). 
                     KURALLAR: 'Subject-Verb-Object' yapısını kullan. Sadece 'active_characters' listesindeki isimleri kullan. 
                     Örn: 'Ali jumping in the air' veya 'Mırnav sitting on a red chair'. Aksiyonu ve ortamı net betimle.
                
                KULLANICI PROMPT'U: ${formData.theme}
                HEDEF YAŞ: ${formData.age}
            `;
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

        // FAZ 2: GÖRSEL (SIRALI, FİLTRELİ VE SABIRLI)
        const pagesWithImages = [];
        let sceneCount = 1;
        for (const scene of storyData.scenes) {
            try {
                const media = await generateImage(
                    scene.visualHook, 
                    storyData.characters, 
                    formData.style, 
                    projectId, 
                    token,
                    scene.active_characters,
                    sceneCount++,
                    storyData.scenes.length,
                    scene.camera_angle,
                    scene.lighting
                );
                const fileName = `story_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
                
                const { error: uploadErr } = await adminSupabase.storage
                    .from('story_assets')
                    .upload(`images/${fileName}`, Buffer.from(media.data, 'base64'), { contentType: media.mimeType });

                if (uploadErr) throw new Error(`Storage Upload Hatası: ${uploadErr.message}`);

                const { data: { publicUrl } } = adminSupabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);
                pagesWithImages.push({ text: scene.text, image_url: publicUrl });
            } catch (imgErr: any) {
                console.error("Görsel hatası:", imgErr.message);
                pagesWithImages.push({ text: scene.text, image_url: '' });
            }
        }

        // FAZ 3: SES
        let audioUrl = '';
        try {
            const fullText = storyData.scenes.map((s: any) => s.text).join(" ");
            const voiceId = formData.elevenVoiceId || formData.voiceOption;
            const media = await generateAudio(fullText, voiceId, projectId, token);
            
            const audioFileName = `audio_${Date.now()}.wav`; // .wav olarak kaydediyoruz
            const { error: audUploadErr } = await adminSupabase.storage
                .from('story_assets')
                .upload(`audio/${audioFileName}`, Buffer.from(media.data, 'base64'), { contentType: media.mimeType });

            if (audUploadErr) throw new Error(`Storage Ses Hatası: ${audUploadErr.message}`);

            const { data: { publicUrl: aUrl } } = adminSupabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);
            audioUrl = aUrl;
        } catch (audErr: any) {
            console.error("Ses hatası:", audErr.message);
        }

        const { data: savedStory, error: dbErr } = await supabase.from('stories').insert({
            profile_id: profile!.id,
            title: storyData.title,
            content_json: pagesWithImages,
            image_url: pagesWithImages[0]?.image_url || '',
            audio_url: audioUrl
        }).select().single();

        if (dbErr) throw dbErr;
        return { success: true, id: savedStory.id };

    } catch (error: any) {
        console.error(">>> [STORY MOTOR HATA]:", error);
        return { success: false, error: error.message };
    }
}
