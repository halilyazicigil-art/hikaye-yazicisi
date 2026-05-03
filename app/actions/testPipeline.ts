'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { getVertexAccessToken } from '@/utils/vertex-auth'

/**
 * 🛡️ ZIRHLI PARSER
 */
function armoredParser(text: string) {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("JSON bulunamadı.");
        return JSON.parse(jsonMatch[0].trim());
    } catch (err) {
        throw new Error("JSON Parse Hatası.");
    }
}

/**
 * 🔍 AKILLI MULTIMODAL AYIKLAYICI
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
        'Orman Muhafızı': 'Aoede',
        'Bilge Dede': 'Achird',
        'Neşeli Peri': 'Callirrhoe',
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

    const charAnchors = Object.entries(characters || {})
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
        throw new Error(`Görsel API Hatası (${response.status}): ${data.error?.message || JSON.stringify(data)}`);
    }

    const media = extractMediaData(data.candidates);
    if (!media) throw new Error("Görsel verisi yanıtta bulunamadı.");
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
        throw new Error(`Ses API Hatası (${response.status}): ${data.error?.message || JSON.stringify(data)}`);
    }

    const media = extractMediaData(data.candidates);
    if (!media) throw new Error("Ses verisi yanıtta bulunamadı.");
    return media;
}

export async function testPipelineAction(prompt: string, style: string, voiceId: string) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID!;
  const supabase = await createClient();
  const adminSupabase = await createAdminClient(); // 🛡️ Zırhlı storage erişimi

  try {
    const token = await getVertexAccessToken();
    if (!token) throw new Error("Token alınamadı.");

    const textUrl = `https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:generateContent`;

    const textResponse = await fetch(textUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Konu: ${prompt}. ÇIKTI: JSON formatında 'text' (string), 'characters' (object: name->desc) ve 'visualHook' (string) olarak dön. DİL: Türkçe.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const textData = await textResponse.json().catch(() => ({}));
    if (!textResponse.ok) throw new Error(`Metin API Hatası: ${textResponse.status}`);

    const storyData = armoredParser(textData.candidates[0].content.parts[0].text);

    // FAZ 2: GÖRSEL
    const mediaImage = await generateImage(storyData.visualHook, storyData.characters, style, projectId, token);
    const imgFileName = `test_${Date.now()}.png`;
    const { error: imgErr } = await adminSupabase.storage
      .from('story_assets')
      .upload(`images/${imgFileName}`, Buffer.from(mediaImage.data, 'base64'), { contentType: mediaImage.mimeType });

    if (imgErr) throw new Error(`Görsel Yükleme Hatası: ${imgErr.message}`);
    const { data: { publicUrl: imageUrl } } = adminSupabase.storage.from('story_assets').getPublicUrl(`images/${imgFileName}`);

    // FAZ 3: SES
    const mediaAudio = await generateAudio(storyData.text, voiceId, projectId, token);
    const audFileName = `test_audio_${Date.now()}.mp3`;
    const { error: audErr } = await adminSupabase.storage
      .from('story_assets')
      .upload(`audio/${audFileName}`, Buffer.from(mediaAudio.data, 'base64'), { contentType: mediaAudio.mimeType });

    if (audErr) throw new Error(`Ses Yükleme Hatası: ${audErr.message}`);
    const { data: { publicUrl: audioUrl } } = adminSupabase.storage.from('story_assets').getPublicUrl(`audio/${audFileName}`);

    return {
      text: { status: 'SUCCESS', content: storyData.text },
      image: { status: 'SUCCESS', url: imageUrl },
      audio: { status: 'SUCCESS', url: audioUrl }
    };

  } catch (error: any) {
    console.error(">>> [TEST HATA]:", error.message);
    return {
      text: { status: 'ERROR', error: error.message },
      image: { status: 'ERROR', error: error.message },
      audio: { status: 'ERROR', error: error.message }
    };
  }
}
