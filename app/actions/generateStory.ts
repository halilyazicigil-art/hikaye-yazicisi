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

    // =====================================================================
    // GÖRSEL STİL KÜTÜPHANESİ (Sabit Stiller)
    // =====================================================================
    const IMAGE_STYLE_MAP: Record<string, { prefix: string, suffix: string }> = {
      'Sulu Boya': { 
        prefix: 'High-quality children\'s storybook illustration, soft watercolor style, ', 
        suffix: ', hand-painted textures, bleeding colors, magical atmosphere, no text, masterpiece.' 
      },
      '3D Pixar Stili': { 
        prefix: 'Cute 3D render, Pixar and Disney animation style, high detail, ', 
        suffix: ', bright vibrant colors, 8k resolution, cinematic lighting, no text.' 
      },
      'Pastel Düşler': { 
        prefix: 'Dreamy pastel illustration, soft luminous lighting, ', 
        suffix: ', magical sparkles, gentle colors, whimsical atmosphere, no text.' 
      },
      'Anime': { 
        prefix: 'Studio Ghibli style anime illustration, hand-drawn look, ', 
        suffix: ', lush backgrounds, emotional lighting, high quality, no text.' 
      },
      'Yağlı Boya': { 
        prefix: 'Classic oil painting, visible brushstrokes, rich textures, ', 
        suffix: ', warm lighting, artistic masterpiece, storybook feel, no text.' 
      },
      'Pop Art': { 
        prefix: 'Vibrant Pop Art style, bold lines, comic book aesthetic, ', 
        suffix: ', bright saturated colors, high contrast, modern look, no text.' 
      },
      'Çizgi Film': { 
        prefix: 'Classic 2D cartoon style, clean lines, simple and bright, ', 
        suffix: ', fun and friendly atmosphere, flat colors, no text.' 
      },
      'Vintage Retro': { 
        prefix: 'Vintage 1950s storybook style, retro colors, nostalgic feel, ', 
        suffix: ', grainy texture, classic illustration, no text.' 
      }
    }

    const selectedStyle = theme.includes('Çizim Stili:') ? theme.split('Çizim Stili:')[1].split('.')[0].trim() : 'Sulu Boya'
    const styleConfig = IMAGE_STYLE_MAP[selectedStyle] || IMAGE_STYLE_MAP['Sulu Boya']

    // 1. ADIM: METİN ÜRETİMİ (Gemini 3 Flash Preview - Vertex AI)
    console.log("1. Adım: Masal metni ve karakter çapaları üretiliyor...")
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `
          Bir çocuk masalı yazarı ve görsel yönetmeni gibi davran. 
          Aşağıdaki kriterlere göre Türkçe bir çocuk masalı yaz:
          Çocuk Adı: ${childName}, Kahramanlar: ${hero}, Konu: ${theme}, Yaş: ${age}.

          KURALLAR:
          1. Masal tam 8-10 sahneden oluşmalı.
          2. KAHRAMAN ÇAPASI: Hikayedeki en fazla 3 ana karakter için SABİT birer fiziksel tarif (İngilizce) oluştur. 
             ÖNEMLİ: Karakterlerin birbirine göre BOY ve YAŞ farklarını mutlaka belirt. 
             (Örn: "Character A is a tall adult elephant, Character B is a tiny baby mouse. A is much larger than B"). 
             Bu karşılaştırmalı tarifi her sahnede AYNI kullan.
          3. SAHNE TEMASI: Her sahne için sadece O AN ne olduğunu anlatan teknik bir görsel tarif (İngilizce) yaz. 
             ASLA stil (watercolor vb.) kelimeleri kullanma! Sadece eylemi ve mekanı yaz.
          
          ÇIKTI FORMATI (JSON):
          {
            "title": "Masal Başlığı",
            "characters": { "char1": "tarif", "char2": "tarif", "char3": "tarif" },
            "scenes": [
              { "text": "Türkçe masal metni...", "sceneDescription": "Sahneye ait ana tema (İngilizce)..." }
            ]
          }
        ` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })

    const aiDataRaw = await textResponse.json()
    let storyJsonRaw = aiDataRaw.map((chunk: any) => chunk.candidates?.[0]?.content?.parts?.[0]?.text || '').join('')
    const storyData = JSON.parse(storyJsonRaw)
    const { title, scenes, characters } = storyData

    // 2. ADIM: GÖRSEL ÜRETİMİ (SABİT STİL + KARAKTER ÇAPASI + SAHNE TEMASI)
    console.log("2. Adım: Görseller 'Sihirli Birleştirme' ile üretiliyor...")
    const pages = []
    for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i]
        
        // Sabit Stil + Sahne Teması Birleşimi
        const finalImagePrompt = `${styleConfig.prefix} ${scene.sceneDescription} ${styleConfig.suffix}`

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

    // 3. ADIM: SES ÜRETİMİ (Gemini 3.1 Flash TTS - Style Instructions Destekli)
    let audioUrl = null
    if (voiceOption !== 'Sessiz' && elevenVoiceId) {
        console.log(`3. Adım: Ses üretiliyor (Model: gemini-3.1-flash-tts-preview, Ses: ${elevenVoiceId})...`)

        // 12 Sihirli Masalcı Okuma Talimatları (Efsanevi Liste)
        const VOICE_INSTRUCTIONS: Record<string, string> = {
            'Achird': 'Tok, bilgece, sakin ve güven veren bir tonla, torunlarına masal anlatır gibi oku.',
            'Algenib': 'Neşeli, hızlı, enerjik ve yerinde duramayan heyecanlı bir tavşan gibi oku.',
            'Algieba': 'Güçlü, kararlı, kahramanvari ve yankılı bir sesle oku.',
            'Alnilam': 'Otoriter, ağırbaşlı, onurlu ve saygın bir kral gibi oku.',
            'Charon': 'Heyecanlı, sürprizleri seven ve çocuklarıyla oyun oynayan bir baba gibi oku.',
            'Iapetus': 'Derin, yankılı, koruyucu ve doğanın gücünü hissettiren bir tonda, ağırbaşlı bir muhafız gibi oku.',
            'Aoede': 'Sıcak, şefkatli, sevgi dolu ve huzurlu bir sesle masal anlatır gibi oku.',
            'Callirrhoe': 'Akıcı, masalsı ve merak uyandıran bir anlatıcı tonuyla oku.',
            'Despina': 'Çok sakin, rahatlatıcı, adeta fısıltı gibi yumuşak bir sesle oku.',
            'Fenrir': 'Neşeli, hafif, genç ve enerjik bir tonda, sihirli bir dünyadan seslenir gibi oku.',
            'Gacrux': 'Mistik, zarif ve hafif yankılı bir sesle, bir prensesin zarafetiyle masal anlatır gibi oku.',
            'Kore': 'Canlı, renkli, çocuksu ve her cümlesinde neşe saçan bir sesle, hayat dolu bir tonda oku.',
        };

        try {
            // Ses akıcılığı için kesme işaretlerini temizleyen filtre
            const cleanedTextForAudio = (pages.map(p => p.text).join(' ') || '').replace(/'/g, '');
            console.log(`>>> KRİTİK LOG: Google Gemini-TTS'e gönderilen GERÇEK SES: ${elevenVoiceId}`);

            const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${vertexToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: { 
                        text: cleanedTextForAudio,
                        prompt: VOICE_INSTRUCTIONS[elevenVoiceId] || 'Sıcak ve masalsı bir tonda oku.'
                    },
                    voice: { 
                        languageCode: 'tr-tr', 
                        name: elevenVoiceId,
                        modelName: 'gemini-3.1-flash-tts-preview'
                    },
                    audioConfig: { 
                        audioEncoding: 'MP3',
                        pitch: 0,
                        speakingRate: 1
                    }
                })
            })
            const audioData = await audioResponse.json()

            if (audioData.audioContent) {
                const audioFileName = `voice_${Date.now()}.mp3`
                const { error: upErr } = await supabase.storage.from('story_assets').upload(audioFileName, Buffer.from(audioData.audioContent, 'base64'), { contentType: 'audio/mpeg' })
                if (!upErr) {
                    audioUrl = supabase.storage.from('story_assets').getPublicUrl(audioFileName).data.publicUrl
                }
            } else if (audioData.error) {
                console.error("TTS Google Hatası:", audioData.error)
            }
        } catch (ttsErr) {
            console.error("TTS Kritik Bağlantı Hatası:", ttsErr)
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
