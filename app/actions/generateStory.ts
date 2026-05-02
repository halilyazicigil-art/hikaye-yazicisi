'use server'

import { createClient } from '@/utils/supabase/server'
import { createSign } from 'crypto'

// =====================================================================
// Vertex AI OAuth2 Access Token Üretici (Kredi Kullanımı İçin)
// =====================================================================
async function getVertexAccessToken(): Promise<string> {
  const privateKey = (process.env.GOOGLE_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  const clientEmail = process.env.GOOGLE_SA_CLIENT_EMAIL || ''

  if (!privateKey || !clientEmail) {
    throw new Error('GOOGLE_SA_PRIVATE_KEY veya GOOGLE_SA_CLIENT_EMAIL eksik!')
  }

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
  if (!tokenData.access_token) throw new Error('Vertex AI token alınamadı.')
  return tokenData.access_token
}

interface StoryRequest {
  childName: string
  hero: string
  theme: string
  age: string | number
  voiceOption?: string 
  elevenVoiceId?: string // UI'daki id'yi temsil eder
}

export async function generateStoryAction({ childName, hero, theme, age, voiceOption = 'AI', elevenVoiceId }: StoryRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Profil ve Kota Kontrolleri (Varsayılan Mantık Korundu)
    const { data: profiles } = await supabase.from('profiles').select('id').eq('user_id', user.id).limit(1)
    let profileId = profiles?.[0]?.id
    if (!profileId) {
        const { data: newProfile } = await supabase.from('profiles').insert({ user_id: user.id, name: childName, age: age }).select().single()
        profileId = newProfile?.id
    }

    const vertexToken = await getVertexAccessToken()
    const projectId = "hikayeyazicisi"

    // 1. ADIM: METİN ÜRETİMİ (Gemini 3 Flash Preview - Vertex AI)
    console.log("1. Adım: Masal metni üretiliyor (Gemini 3 Flash)...")
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Aşağıdaki kriterlere göre Türkçe bir çocuk masalı yaz. Masal tam 8-10 sahneden oluşmalı. JSON formatında 'title' ve 'scenes' (dizi, her eleman 'text' ve 'imagePrompt' içermeli) olarak dön. Konu: ${theme}, Karakter: ${hero}, Yaş: ${age}.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })

    const aiDataRaw = await textResponse.json()
    let storyJsonRaw = aiDataRaw.map((chunk: any) => chunk.candidates?.[0]?.content?.parts?.[0]?.text || '').join('')
    const storyData = JSON.parse(storyJsonRaw)
    const { title, scenes } = storyData

    // 2. ADIM: GÖRSEL ÜRETİMİ (Nano Banana 2 - Vertex AI)
    console.log("2. Adım: Görseller üretiliyor (Nano Banana 2)...")
    const pages = []
    for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i]
        const imgResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: `High quality storybook illustration: ${scene.imagePrompt}. Style: pastel colors, magical atmosphere, no text.` }] }]
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

    // 3. ADIM: SES ÜRETİMİ (Flash TTS / Chirp HD - Vertex AI)
    let audioUrl = null
    if (voiceOption !== 'Sessiz' && elevenVoiceId) {
        console.log(`3. Adım: Ses üretiliyor (Model: ${elevenVoiceId})...`)
        const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: { text: pages.map(p => p.text).join(' ') },
                voice: { languageCode: 'tr-TR', name: elevenVoiceId }, // elevenVoiceId artık tr-TR-Chirp3-HD-... formundadır
                audioConfig: { audioEncoding: 'MP3' }
            })
        })
        const audioData = await audioResponse.json()
        if (audioData.audioContent) {
            const audioFileName = `voice_${Date.now()}.mp3`
            const { error: upErr } = await supabase.storage.from('story_assets').upload(audioFileName, Buffer.from(audioData.audioContent, 'base64'), { contentType: 'audio/mpeg' })
            if (!upErr) {
                audioUrl = supabase.storage.from('story_assets').getPublicUrl(audioFileName).data.publicUrl
            }
        }
    }

    // 4. ADIM: VERİTABANI KAYIT
    const { data: savedStory } = await supabase.from('stories').insert({
        profile_id: profileId,
        title: title,
        content_json: pages.map(p => p.text),
        pages: pages,
        image_url: pages[0]?.image_url || '',
        audio_url: audioUrl
    }).select().single()

    return { success: true, id: savedStory?.id }

  } catch (err: any) {
    console.error("GenerateStory Hatası:", err)
    return { success: false, error: err.message }
  }
}
