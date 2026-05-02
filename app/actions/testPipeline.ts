'use server'

import { createClient } from '@/utils/supabase/server'

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
async function generateImage(hook: string, characters: any, style: string, apiKey: string) {
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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: finalPrompt }] }],
            generationConfig: { responseMimeType: "image/png" }
        })
    });

    if (!response.ok) throw new Error(`Görsel API Hatası: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data; 
}

/**
 * 🎙️ SES MOTORU (FAZ 3)
 */
async function generateAudio(text: string, voiceId: string, apiKey: string) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: text }] }],
            generationConfig: { 
                audioConfig: { voiceId: voiceId }
            }
        })
    });

    if (!response.ok) throw new Error(`Ses API Hatası: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data; 
}

export async function testPipelineAction(prompt: string, style: string, voiceId: string) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;
  const supabase = await createClient();

  try {
    // ---------------------------------------------------------
    // FAZ 1: METİN
    // ---------------------------------------------------------
    const textResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Konu: ${prompt}. ÇIKTI: JSON formatında 'text' (string), 'characters' (object: name->desc) ve 'visualHook' (string) olarak dön. DİL: Türkçe.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const textData = await textResponse.json();
    const storyData = armoredParser(textData.candidates[0].content.parts[0].text);

    // ---------------------------------------------------------
    // FAZ 2: GÖRSEL
    // ---------------------------------------------------------
    const base64Image = await generateImage(storyData.visualHook, storyData.characters, style, apiKey);
    const fileName = `test_${Date.now()}.png`;
    await supabase.storage.from('story_assets').upload(`images/${fileName}`, Buffer.from(base64Image, 'base64'), { contentType: 'image/png' });
    const { data: { publicUrl: imageUrl } } = supabase.storage.from('story_assets').getPublicUrl(`images/${fileName}`);

    // ---------------------------------------------------------
    // FAZ 3: SES
    // ---------------------------------------------------------
    const base64Audio = await generateAudio(storyData.text, voiceId, apiKey);
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
