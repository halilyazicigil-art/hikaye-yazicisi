'use server'

import { createClient } from '@/utils/supabase/server'
import { createSign } from 'crypto'

async function getVertexToken(): Promise<string> {
  const privateKey = (process.env.GOOGLE_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL || ''

  const now = Math.floor(Date.now() / 1000)
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url')

  const signingInput = `${header}.${payload}`
  const sign = createSign('RSA-SHA256')
  sign.update(signingInput)
  const signature = sign.sign(privateKey, 'base64url')
  const jwt = `${signingInput}.${signature}`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  })
  const tokenData = await tokenRes.json()
  return tokenData.access_token
}

export async function testPipeline(testPrompt: string = "Küçük tavşan ve yaşlı kaplumbağa yarışıyor", style: string = "Sulu Boya", voiceId: string = "tr-TR-Chirp3-HD-Iapetus") {
  const results = {
    text: { status: 'PENDING', content: '', error: null },
    image: { status: 'PENDING', url: '', error: null },
    audio: { status: 'PENDING', url: '', error: null },
    savedId: null as string | null
  }

  const IMAGE_STYLE_MAP: Record<string, { prefix: string, suffix: string }> = {
    'Sulu Boya': { prefix: 'High-quality children\'s storybook illustration, soft watercolor style, ', suffix: ', hand-painted textures, bleeding colors, magical atmosphere, no text, masterpiece.' },
    '3D Pixar Stili': { prefix: 'Cute 3D render, Pixar and Disney animation style, high detail, ', suffix: ', bright vibrant colors, 8k resolution, cinematic lighting, no text.' },
    'Pastel Düşler': { prefix: 'Dreamy pastel illustration, soft luminous lighting, ', suffix: ', magical sparkles, gentle colors, whimsical atmosphere, no text.' },
    'Anime': { prefix: 'Studio Ghibli style anime illustration, hand-drawn look, ', suffix: ', lush backgrounds, emotional lighting, high quality, no text.' },
    'Yağlı Boya': { prefix: 'Classic oil painting, visible brushstrokes, rich textures, ', suffix: ', warm lighting, artistic masterpiece, storybook feel, no text.' },
    'Pop Art': { prefix: 'Vibrant Pop Art style, bold lines, comic book aesthetic, ', suffix: ', bright saturated colors, high contrast, modern look, no text.' },
    'Çizgi Film': { prefix: 'Classic 2D cartoon style, clean lines, simple and bright, ', suffix: ', fun and friendly atmosphere, flat colors, no text.' },
    'Vintage Retro': { prefix: 'Vintage 1950s storybook style, retro colors, nostalgic feel, ', suffix: ', grainy texture, classic illustration, no text.' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const token = await getVertexToken()
    const projectId = "hikayeyazicisi"
    const styleConfig = IMAGE_STYLE_MAP[style] || IMAGE_STYLE_MAP['Sulu Boya']

    // 1. FAZ: METİN VE KARAKTER ÇAPASI
    console.log("1. Faz: Test metni ve karakter çapaları üretiliyor...")
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Aşağıdaki test konusu için tek sahneli bir masal parçası yaz. 
          Konu: ${testPrompt}. 
          KURALLAR: Karakterler için sabit birer fiziksel tarif oluştur (Character Anchor) ve sahneyi teknik olarak tarif et (Scene Description).
          ÇIKTI: JSON formatında 'text' ve 'sceneDescription' olarak dön.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })

    const aiDataRaw = await textResponse.json()
    const storyJsonRaw = aiDataRaw.map((chunk: any) => chunk.candidates?.[0]?.content?.parts?.[0]?.text || '').join('')
    const storyData = JSON.parse(storyJsonRaw)
    results.text.content = storyData.text
    results.text.status = 'SUCCESS'

    // 2. FAZ: GÖRSEL (SABİT STİL + TEMA)
    console.log("2. Faz: Test görseli üretiliyor...")
    const finalImagePrompt = `${styleConfig.prefix} ${storyData.sceneDescription} ${styleConfig.suffix}`
    const imageResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: finalImagePrompt }] }] })
    })
    const imageData = await imageResponse.json()
    const b64 = imageData.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data
    
    let publicImageUrl = ''
    if (b64) {
      const fileName = `test_story_${Date.now()}.png`
      await supabase.storage.from('story_assets').upload(fileName, Buffer.from(b64, 'base64'), { contentType: 'image/png' })
      publicImageUrl = supabase.storage.from('story_assets').getPublicUrl(fileName).data.publicUrl
      results.image.url = publicImageUrl
      results.image.status = 'SUCCESS'
    } else {
      results.image.status = 'FAILED'
      results.image.error = JSON.stringify(imageData)
    }

    // 3. FAZ: SES (CHIRP HD - PROMPTSUZ + FİLTRELİ)
    console.log("3. Faz: Test sesi üretiliyor...")
    const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text: storyData.text.replace(/'/g, '') },
        voice: { languageCode: 'tr-TR', name: voiceId },
        audioConfig: { audioEncoding: 'MP3' }
      })
    })
    const audioData = await audioResponse.json()
    
    let publicAudioUrl = ''
    if (audioData.audioContent) {
      const audioFileName = `test_voice_${Date.now()}.mp3`
      await supabase.storage.from('story_assets').upload(audioFileName, Buffer.from(audioData.audioContent, 'base64'), { contentType: 'audio/mpeg' })
      publicAudioUrl = supabase.storage.from('story_assets').getPublicUrl(audioFileName).data.publicUrl
      results.audio.url = publicAudioUrl
      results.audio.status = 'SUCCESS'
    } else {
      results.audio.status = 'FAILED'
      results.audio.error = audioData.error?.message || JSON.stringify(audioData)
    }

    // 4. FAZ: KÜTÜPHANEYE KAYDET
    if (user && results.text.status === 'SUCCESS') {
        const { data: savedStory } = await supabase.from('stories').insert({
            user_id: user.id,
            title: `[SİSTEM TESTİ] ${testPrompt.substring(0, 20)}...`,
            content_json: [storyData.text],
            pages: [{ text: storyData.text, image_url: publicImageUrl }],
            image_url: publicImageUrl,
            audio_url: publicAudioUrl
        }).select().single()
        results.savedId = savedStory?.id
    }

  } catch (error: any) {
    console.error("Pipeline Hatası:", error)
    if (results.text.status === 'PENDING') results.text.status = 'FAILED'
  }

  return results
}
