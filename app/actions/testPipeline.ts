'use server'

import { createClient } from '@/utils/supabase/server'
import { getVertexAccessToken } from '@/utils/vertex-auth'

/**
 * 🛡️ ZIRHLI PARSER (Manifesto 4)
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
 * 🎨 GÖRSEL MOTORU (FAZ 2)
 */
async function generateImage(hook: string, characters: any, style: string, projectId: string, location: string, token: string) {
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

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`;

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

    if (!response.ok) throw new Error(`Görsel API Hatası: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data; 
}

/**
 * 🎙️ SES MOTORU (FAZ 3)
 */
async function generateAudio(text: string, voiceId: string, projectId: string, location: string, token: string) {
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-3.1-flash-tts-preview:generateContent`;

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
                            voiceName: voiceId
                        }
                    }
                }
            }
        })
    });

    if (!response.ok) throw new Error(`Ses API Hatası: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data; 
}

export async function testPipelineAction(prompt: string, style: string, voiceId: string) {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID!;
  const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
  const supabase = await createClient();

  try {
    const token = await getVertexAccessToken();
    if (!token) throw new Error("Token alınamadı.");

    const textUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-3-flash-preview:generateContent`;

    const textResponse = await fetch(textUrl, {
      method: 'POST',
      headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Konu: ${prompt}. ÇIKTI: JSON formatında 'text' (string), 'characters' (object: name->desc) ve 'visualHook' (string) olarak dön. DİL: Türkçe.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!textResponse.ok) throw new Error(`Metin API Hatası: ${textResponse.status}`);

    const textData = await textResponse.json();
    const storyData = armoredParser(textData.candidates[0].content.parts[0].text);

    const base64Image = await generateImage(storyData.visualHook, storyData.characters, style, projectId, location, token);
    const fileName = `test_${Date.now()}.png`;
    await supabase.storage.from('story_assets').upload(`images/${fileName}`, Buffer.from(base64Image, 'base64'), { contentType: 'image/png' });
    const { data: { publicUrl: imageUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${imageUrl}`);

    const base64Audio = await generateAudio(storyData.text, voiceId, projectId, location, token);
    const audioFileName = `test_audio_${Date.now()}.mp3`;
    await supabase.storage.from('story_assets').upload(`audio/${audioFileName}`, Buffer.from(base64Audio, 'base64'), { contentType: 'audio/mpeg' });
    const { data: { publicUrl: audioUrl } } = supabase.storage.from('story_assets').getPublicUrl(`audio/${audioFileName}`);

    return {
      text: { status: 'SUCCESS', content: storyData.text },
      image: { status: 'SUCCESS', url: imageUrl },
      audio: { status: 'SUCCESS', url: audioUrl }
    };

  } catch (error: any) {
    console.error(">>> [TEST HATA]:", error);
    return {
      text: { status: 'ERROR', error: error.message },
      image: { status: 'ERROR', error: error.message },
      audio: { status: 'ERROR', error: error.message }
    };
  }
}
