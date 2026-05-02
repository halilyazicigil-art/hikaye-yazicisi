'use server'

import { createClient } from '@/utils/supabase/server'

interface TestResults {
  text: { status: 'PENDING' | 'SUCCESS' | 'ERROR', content?: string, error?: string }
  image: { status: 'PENDING' | 'SUCCESS' | 'ERROR', url?: string, error?: string }
  audio: { status: 'PENDING' | 'SUCCESS' | 'ERROR', url?: string, error?: string }
}

export async function testPipelineAction(prompt: string, style: string, voiceId: string) {
  const results: TestResults = {
    text: { status: 'PENDING' },
    image: { status: 'PENDING' },
    audio: { status: 'PENDING' }
  }

  try {
    const supabase = await createClient()
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const vertexToken = process.env.GOOGLE_VERTEX_ACCESS_TOKEN 

    // STİL
    const styleMap: Record<string, any> = {
      'Sulu Boya': { prefix: 'A professional children\'s book watercolor illustration of', suffix: 'soft pastel colors, dreamlike atmosphere' },
      '3D Pixar Stili': { prefix: 'A high-quality 3D Disney Pixar style animation frame of', suffix: 'vibrant colors, cute character designs, cinematic lighting' }
    }
    const styleConfig = styleMap[style] || styleMap['Sulu Boya']

    // 1. FAZ: METİN (Stream)
    console.log("1. Faz: Metin üretiliyor (Test Stream)...")
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Konu: ${prompt}. ÇIKTI: JSON formatında 'text', 'characters' (object) ve 'visualHook' (string) olarak dön.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })

    const aiDataRaw = await textResponse.json()
    let storyJsonRaw = aiDataRaw.map((chunk: any) => chunk.candidates?.[0]?.content?.parts?.[0]?.text || '').join('')
    storyJsonRaw = storyJsonRaw.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const storyData = JSON.parse(storyJsonRaw)
    results.text.content = storyData.text
    results.text.status = 'SUCCESS'

    // Karakter Çapaları
    const characterAnchors = storyData.characters ? Object.values(storyData.characters).join('. ') : '';

    // 2. FAZ: GÖRSEL
    console.log("2. Faz: Görsel üretiliyor...")
    const hook = storyData.visualHook || "A beautiful scene";
    const finalImagePrompt = `${styleConfig.prefix} ${characterAnchors}. Scenario: ${hook}. ${styleConfig.suffix}`;

    const imageResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: finalImagePrompt }] }] })
    })
    const imageData = await imageResponse.json()
    const b64 = imageData.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data
    
    if (b64) {
      const fileName = `test_story_${Date.now()}.png`
      await supabase.storage.from('story_assets').upload(fileName, Buffer.from(b64, 'base64'), { contentType: 'image/png' })
      results.image.url = supabase.storage.from('story_assets').getPublicUrl(fileName).data.publicUrl
      results.image.status = 'SUCCESS'
    } else {
      results.image.status = 'ERROR'
      results.image.error = JSON.stringify(imageData)
    }

    // 3. FAZ: SES
    const finalVoiceId = voiceId.includes('-') ? voiceId.split('-').pop() : voiceId;
    const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text: storyData.text || '' },
        voice: { languageCode: 'tr-tr', name: finalVoiceId, modelName: 'gemini-3.1-flash-tts-preview' },
        audioConfig: { audioEncoding: 'MP3' }
      })
    })
    const audioData = await audioResponse.json()
    if (audioData.audioContent) {
      const fileName = `test_audio_${Date.now()}.mp3`
      await supabase.storage.from('story_assets').upload(fileName, Buffer.from(audioData.audioContent, 'base64'), { contentType: 'audio/mpeg' })
      results.audio.url = supabase.storage.from('story_assets').getPublicUrl(fileName).data.publicUrl
      results.audio.status = 'SUCCESS'
    } else {
      results.audio.status = 'ERROR'
      results.audio.error = JSON.stringify(audioData)
    }

    return results
  } catch (error: any) {
    return {
      text: { status: 'ERROR', error: error.message },
      image: { status: 'ERROR', error: error.message },
      audio: { status: 'ERROR', error: error.message }
    }
  }
}
