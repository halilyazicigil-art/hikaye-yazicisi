'use server'

import { createClient } from '@/utils/supabase/server'
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
 * 🎨 GÖRSEL MOTORU (FAZ 2)
 */
async function generateImage(hook: string, characters: any, style: string, projectId: string, token: string) {
    const stylePrefixMap: Record<string, string> = {
        'Sulu Boya': "A professional children's book watercolor illustration of ",
        '3D Pixar Stili': "A high-quality 3D Disney Pixar style animation frame of ",
        'Yağlı Boya': "A classic oil painting style illustration of ",
        'Pop Art': "A vibrant Pop Art style illustration of "
    };
    
    const styleSuffixMap: Record<string, string> = {
        'Sulu Boya': ". soft pastel colors, dreamlike atmosphere, high quality, detailed",
        '3D Pixar Stili': ". vibrant colors, cute character designs, cinematic lighting, 8k render",
        'Yağlı Boya': ". rich textures, artistic brushstrokes, warm lighting, timeless",
        'Pop Art': ". bold lines, bright colors, comic book aesthetic, dynamic"
    };

    const charAnchors = Object.entries(characters)
        .map(([name, desc]) => `${name}: ${desc}`)
        .join(". ");

    const finalPrompt = `${stylePrefixMap[style] || stylePrefixMap['Sulu Boya']} ${charAnchors}. Action: ${hook} ${styleSuffixMap[style] || styleSuffixMap['Sulu Boya']}`;

    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: finalPrompt }] }]
        })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(`Görsel API hatası: ${response.status} - ${data.error?.message || 'Bilinmeyen Hata'}`);
    }

    const media = extractMediaData(data.candidates);
    if (!media) throw new Error("Görsel verisi API yanıtında bulunamadı.");
    return media;
}

/**
 * 🎙️ SES MOTORU (FAZ 3)
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
        throw new Error(`Ses API hatası: ${response.status} - ${data.error?.message || 'Bilinmeyen Hata'}`);
    }

    const media = extractMediaData(data.candidates);
    if (!media) throw new Error("Ses verisi API yanıtında bulunamadı.");
    return media;
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
        const systemPrompt = `Aşağıdaki konuyla ilgili 8-10 sayfalık sürükleyici bir çocuk masalı yaz. ÇIKTI: JSON formatında 'title', 'characters' (her karakterin fiziksel tarifiyle), 'scenes' (her sahne için 'text' ve o sahneyi çizecek 'visualHook' tarifiyle) olarak dön. DİL: Türkçe.`;
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

        // FAZ 2: GÖRSEL
        const pagesWithImages = [];
        for (const scene of storyData.scenes) {
            try {
                const media = await generateImage(scene.visualHook, storyData.characters, formData.style, projectId, token);
                const fileName = `story_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
                
                const { error: uploadErr } = await supabase.storage
                    .from('story_assets')
                    .upload(`images/${fileName}`, Buffer.from(media.data, 'base64'), { contentType: media.mimeType });

                if (uploadErr) throw new Error(`Storage Upload Hatası: ${uploadErr.message}`);

                const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);
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
            
            const audioFileName = `audio_${Date.now()}.mp3`;
            const { error: audUploadErr } = await supabase.storage
                .from('story_assets')
                .upload(`audio/${audioFileName}`, Buffer.from(media.data, 'base64'), { contentType: media.mimeType });

            if (audUploadErr) throw new Error(`Storage Ses Hatası: ${audUploadErr.message}`);

            const { data: { publicUrl: aUrl } } = supabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);
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
