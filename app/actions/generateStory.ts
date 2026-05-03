'use server'

import { createClient } from '@/utils/supabase/server'
import { getVertexAccessToken } from '@/utils/vertex-auth'

/**
 * 🛡️ ZIRHLI PARSER (Manifesto 4)
 * streamGenerateContent veya generateContent yanıtlarından JSON ayıklamak için geliştirildi.
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
 * 🎙️ SES ID DÜZELTİCİ (Manifesto 4)
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
 * 🎨 GÖRSEL MOTORU (FAZ 2) - Vertex AI v1 (Global)
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

    // 2026 Vertex AI v1 Global Endpoint
    const url = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: finalPrompt }] }]
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error(">>> [FAZ 2 GÖRSEL HATA]:", response.status, JSON.stringify(err));
        throw new Error(`Görsel API hatası: ${response.status}`);
    }
    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data; 
}

/**
 * 🎙️ SES MOTORU (FAZ 3) - Vertex AI v1 (Global)
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
            contents: [{ parts: [{ text: text }] }],
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

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error(">>> [FAZ 3 SES HATA]:", response.status, JSON.stringify(err));
        throw new Error(`Ses API hatası: ${response.status}`);
    }
    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data; 
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

        // ---------------------------------------------------------
        // FAZ 1: METİN (Vertex AI v1 Global - Gemini 3 Flash)
        // ---------------------------------------------------------
        const systemPrompt = `Aşağıdaki konuyla ilgili 8-10 sayfalık sürükleyici bir çocuk masalı yaz. ÇIKTI: JSON formatında 'title', 'characters' (her karakterin fiziksel tarifiyle), 'scenes' (her sahne için 'text' ve o sahneyi çizecek 'visualHook' tarifiyle) olarak dön. DİL: Türkçe.`;
        const userPrompt = `Konu: ${formData.theme}, Kahraman: ${formData.hero}, Yaş: ${formData.age}, Çocuk Adı: ${formData.childName}`;

        const textUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent`;

        const textResponse = await fetch(textUrl, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!textResponse.ok) {
            const err = await textResponse.json().catch(() => ({}));
            console.error(">>> [FAZ 1 METİN HATA]:", textResponse.status, JSON.stringify(err));
            throw new Error(`Metin API hatası: ${textResponse.status}`);
        }
        
        const textData = await textResponse.json();
        const storyData = armoredParser(textData.candidates[0].content.parts[0].text);

        // ---------------------------------------------------------
        // FAZ 2: GÖRSEL
        // ---------------------------------------------------------
        const pagesWithImages = [];
        for (const scene of storyData.scenes) {
            try {
                const base64Image = await generateImage(scene.visualHook, storyData.characters, formData.style, projectId, token);
                const fileName = `story_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
                await supabase.storage
                    .from('story_assets')
                    .upload(`images/${fileName}`, Buffer.from(base64Image, 'base64'), { contentType: 'image/png' });

                const { data: { publicUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);
                pagesWithImages.push({ text: scene.text, image_url: publicUrl });
            } catch (imgErr) {
                console.error("Görsel hatası:", imgErr);
                pagesWithImages.push({ text: scene.text, image_url: '' });
            }
        }

        // ---------------------------------------------------------
        // FAZ 3: SES
        // ---------------------------------------------------------
        let audioUrl = '';
        try {
            const fullText = storyData.scenes.map((s: any) => s.text).join(" ");
            const voiceId = formData.elevenVoiceId || formData.voiceOption;
            const base64Audio = await generateAudio(fullText, voiceId, projectId, token);
            
            const audioFileName = `audio_${Date.now()}.mp3`;
            await supabase.storage
                .from('story_assets')
                .upload(`audio/${audioFileName}`, Buffer.from(base64Audio, 'base64'), { contentType: 'audio/mpeg' });

            const { data: { publicUrl: aUrl } } = supabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);
            audioUrl = aUrl;
        } catch (audErr) {
            console.error("Ses hatası:", audErr);
        }

        // ---------------------------------------------------------
        // KAYIT
        // ---------------------------------------------------------
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
