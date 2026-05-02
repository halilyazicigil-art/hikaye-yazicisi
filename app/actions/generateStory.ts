'use server'

import { createClient } from '@/utils/supabase/server'
import { createSign } from 'crypto'

export async function generateStoryAction(formData: {
    prompt: string;
    genre: string;
    imageStyle: string;
    ageGroup: string;
    characters: string[];
    educationalValue: string;
    voiceOption: string;
    elevenVoiceId: string;
    childName: string;
    age: string;
}) {
    const { prompt, genre, imageStyle, ageGroup, characters: charactersInput, educationalValue, voiceOption, elevenVoiceId, childName, age } = formData

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Oturum açmanız gerekiyor.")

    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const vertexToken = process.env.GOOGLE_VERTEX_ACCESS_TOKEN 

    // STİL KONFİGÜRASYONU
    const styleMap: Record<string, { prefix: string, suffix: string }> = {
        'Sulu Boya': { 
            prefix: 'A professional children\'s book watercolor illustration of', 
            suffix: 'soft pastel colors, dreamlike atmosphere, high quality, detailed' 
        },
        '3D Pixar Stili': { 
            prefix: 'A high-quality 3D Disney Pixar style animation frame of', 
            suffix: 'vibrant colors, cute character designs, cinematic lighting, 8k render' 
        },
        'Yağlı Boya': { 
            prefix: 'A classic oil painting style illustration of', 
            suffix: 'rich textures, artistic brushstrokes, warm lighting, timeless' 
        },
        'Pop Art': { 
            prefix: 'A vibrant Pop Art style illustration of', 
            suffix: 'bold lines, bright colors, comic book aesthetic, dynamic' 
        }
    }
    const styleConfig = styleMap[imageStyle] || styleMap['Sulu Boya']

    // 1. ADIM: METİN ÜRETİMİ (Vertex AI - Stream Yapısı)
    console.log("1. Adım: Masal üretiliyor (Vertex AI Stream)...")
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `Aşağıdaki konuyla ilgili 8-10 sayfalık sürükleyici bir çocuk masalı yaz. 
            ÇIKTI: JSON formatında 'title', 'characters' (her karakterin fiziksel tarifiyle), 'scenes' (her sahne için 'text' ve o sahneyi çizecek 'visualHook' tarifiyle) olarak dön. 
            Konu: ${prompt} 
            Tür: ${genre} 
            Yaş: ${ageGroup} 
            Karakterler: ${charactersInput} 
            Eğitici Değer: ${educationalValue}` }] }],
            generationConfig: { responseMimeType: "application/json" }
        })
    })

    const aiDataRaw = await textResponse.json()
    let storyJsonRaw = aiDataRaw.map((chunk: any) => chunk.candidates?.[0]?.content?.parts?.[0]?.text || '').join('')
    
    // JSON Temizliği (Markdown blokları varsa)
    storyJsonRaw = storyJsonRaw.replace(/```json/g, '').replace(/```/g, '').trim();
    const storyData = JSON.parse(storyJsonRaw)
    const { scenes, characters } = storyData

    // Karakter Çapalarını (Anchor) Birleştir
    const characterAnchors = characters ? Object.values(characters).join('. ') : '';
    console.log(`>>> [KARAKTER ÇAPALARI]: ${characterAnchors}`);

    // 2. ADIM: GÖRSEL ÜRETİMİ (SİHİRLİ BİRLEŞTİRME 2.0)
    console.log("2. Adım: Görseller üretiliyor...")
    const pages = []
    for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i]
        const hook = scene.visualHook || scene.sceneDescription || "A beautiful scene";
        
        // FORMÜL: Stil Prefix + Karakter Kimlikleri + Sayfanın Vurucu Aksiyonu + Stil Suffix
        const finalImagePrompt = `${styleConfig.prefix} ${characterAnchors}. Scenario: ${hook}. ${styleConfig.suffix}`;
        console.log(`>>> [SAYFA ${i+1} PROMPT]: ${finalImagePrompt}`);

        const imgResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: finalImagePrompt }] }]
            })
        })
        const imgData = await imgResponse.json()
        const b64 = imgData.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data
        
        let publicUrl = ''
        if (b64) {
            const fileName = `story_${Date.now()}_${i}.png`
            const { error: upErr } = await supabase.storage.from('story_assets').upload(fileName, Buffer.from(b64, 'base64'), { contentType: 'image/png' })
            if (!upErr) {
                publicUrl = supabase.storage.from('story_assets').getPublicUrl(fileName).data.publicUrl
            }
        }
        pages.push({ text: scene.text, image_url: publicUrl })
    }

    // 3. ADIM: SES ÜRETİMİ (Gemini 3.1 Flash TTS)
    let audioUrl = null
    if (voiceOption !== 'Sessiz' && elevenVoiceId) {
        console.log(`3. Adım: Ses üretiliyor (${elevenVoiceId})...`);
        const finalVoiceId = elevenVoiceId.includes('-') ? elevenVoiceId.split('-').pop() : elevenVoiceId;

        const rawTextForAudio = pages.map(p => p.text).join(' ');
        const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: { text: rawTextForAudio },
                voice: { languageCode: 'tr-tr', name: finalVoiceId, modelName: 'gemini-3.1-flash-tts-preview' },
                audioConfig: { audioEncoding: 'MP3' }
            })
        })
        const audioData = await audioResponse.json()
        if (audioData.audioContent) {
            const audioFileName = `story_audio_${Date.now()}.mp3`
            await supabase.storage.from('story_assets').upload(audioFileName, Buffer.from(audioData.audioContent, 'base64'), { contentType: 'audio/mpeg' })
            audioUrl = supabase.storage.from('story_assets').getPublicUrl(audioFileName).data.publicUrl
        }
    }

    const { data: savedStory } = await supabase.from('stories').insert({
        user_id: user.id,
        title: storyData.title,
        content: storyJsonRaw,
        pages: pages,
        audio_url: audioUrl,
        image_style: imageStyle
    }).select().single()

    return savedStory
}
