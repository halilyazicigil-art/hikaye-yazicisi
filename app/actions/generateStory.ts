'use server'

import { createClient } from '@/utils/supabase/server'
import { createSign } from 'crypto'

// =====================================================================
// Vertex AI için Service Account'tan OAuth2 Access Token üretici
// Gemini 3 Flash Preview ve Imagen 4.0 bu token ile çalışır
// JSON parse yerine iki ayrı env değişkeni kullanıyoruz (daha kararlı)
// =====================================================================
async function getVertexAccessToken(): Promise<string> {
  // Private key'deki \n karakterlerini gerçek newline'a çevir
  const privateKey = (process.env.GOOGLE_SA_PRIVATE_KEY || '')
    .replace(/\\n/g, '\n')
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
  if (!tokenData.access_token) {
    console.error('Vertex AI Token Hatası:', tokenData)
    throw new Error('Vertex AI access token alınamadı.')
  }
  return tokenData.access_token
}

interface StoryRequest {
  childName: string
  hero: string
  theme: string
  age: string | number
  voiceOption?: string 
  elevenVoiceId?: string
}

// Görüntü stili → Imagen 4.0 prompt karşılığı (Prefix ve Description olarak)
const IMAGE_STYLE_MAP: Record<string, { prefix: string, desc: string, negative?: string }> = {
  'Sulu Boya': { 
    prefix: 'Children\'s storybook illustration, warm watercolor painting style,', 
    desc: 'soft washes, gentle blending, magical and soft aesthetic' 
  },
  '3D Pixar Stili': { 
    prefix: 'Professional 3D animation render, Pixar-style 3D character art,', 
    desc: 'smooth CGI, vibrant cinematic lighting, highly detailed 3D cartoon' 
  },
  'Pastel Düşler': { 
    prefix: 'Ethereal pastel illustration, soft dreamy aesthetic,', 
    desc: 'muted color palette, pale tones, desaturated colors, gentle whimsical style, soft diffused lighting',
    negative: 'saturated colors, bright colors, high contrast, neon, vivid'
  },
  'Kil Modelleme': { 
    prefix: 'Hand-crafted claymation style art, stop-motion clay figurine look,', 
    desc: 'textured clay, miniature world aesthetic, tactile craft style' 
  },
  'Anime': { 
    prefix: 'Modern anime style illustration, vibrant Japanese animation aesthetic,', 
    desc: 'clean lines, vivid colors, expressive cinematic anime look' 
  },
  'Yağlı Boya': { 
    prefix: 'Classic oil painting style, rich textured brushstrokes,', 
    desc: 'classical storybook art, impasto technique, warm artistic lighting' 
  },
  'Diorama': { 
    prefix: 'Miniature diorama photography style, detailed model world,', 
    desc: 'tilt-shift effect, macro lens perspective, tiny handcrafted scene' 
  },
  'Karakalem': { 
    prefix: 'Detailed monochrome pencil sketch, charcoal drawing art,', 
    desc: 'black and white hand-drawn illustration, realistic graphite shading, no colors',
    negative: 'color, colorful, rainbow, saturation, paint'
  },
  'Pop Art': { 
    prefix: 'Bold Pop Art style, comic book aesthetic,', 
    desc: 'vibrant primary colors, halftone dots, high contrast graphic art' 
  },
  'Çizgi Film': { 
    prefix: 'Clean vector cartoon style, modern animated series look,', 
    desc: 'bold outlines, flat vibrant colors, cheerful 2D animation' 
  },
  'Origami Kağıt': { 
    prefix: 'Paper craft origami style, folded paper art scene,', 
    desc: 'textured paper, sharp folds, geometric paper shapes, layered paper art' 
  },
  'Vintage Retro': { 
    prefix: 'Vintage 1950s storybook illustration, nostalgic retro children\'s book art,', 
    desc: 'muted warm color palette, grainy paper texture, classic storybook feel' 
  },
}

// Yaş grubuna göre dil ve karmaşıklık kuralları
const AGE_RULES: Record<string, string> = {
  '0-1': 'Extremely simple sentences (max 3 words). Focus on sounds (onomatopoeia), colors, and basic objects. Use a rhythmic, lullaby-like tone.',
  '1-2': 'Very simple sentences (max 4-5 words). Focus on daily actions, animals, and family. Use repetition and a very gentle tone.',
  '2-4': 'Simple story structure with concrete events. Use repetitive phrases and clear, descriptive words. Tone should be magical and nurturing.',
  '4-6': 'Engaging plot with more dialogue and descriptive language. Include a clear moral lesson or discovery. Tone should be curious and warm.',
  '6-10': 'Rich descriptive language and a clear adventure structure. Focus on character emotions and problem-solving. Tone should be adventurous and engaging.',
  '10-13': 'Complex plot with abstract themes and advanced vocabulary. Focus on character growth and more intricate challenges. Tone should be mature and compelling.',
}

export async function generateStoryAction({ childName, hero, theme, age, voiceOption = 'AI', elevenVoiceId }: StoryRequest) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Oturum açmanız gerekiyor.' }

    // Profil Kontrolü ve Oluşturma
    let profileId = null
    const { data: profiles } = await supabase.from('profiles').select('id').eq('user_id', user.id).limit(1)
    if (profiles && profiles.length > 0) {
      profileId = profiles[0].id
    } else {
      const { data: newProfile, error: profileErr } = await supabase.from('profiles').insert({
        user_id: user.id,
        name: childName,
        age: age
      }).select().single()
      if (profileErr) {
        console.error("Profil hatası:", profileErr)
        return { success: false, error: 'Profil oluşturulamadı.' }
      }
      profileId = newProfile.id
    }

    // 1. Abonelik ve Kota Bilgilerini Al
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('status, plan_id, current_period_end')
      .eq('user_id', user.id)
      .maybeSingle()

    const isActive = subData?.status === 'active'
    const isPro = isActive && subData?.plan_id === 'pro'
    const isPremium = isActive && subData?.plan_id === 'premium'

    // Kural: Pro: 40, Premium: 80, Free: 3
    const storyLimit = isPremium ? 80 : (isPro ? 40 : 3)
    // Kural: Sesli Hikaye: Pro: 20, Premium: 40, Free: 1
    const voiceLimit = isPremium ? 40 : (isPro ? 20 : 1)

    // 2. Faturalandırma Döngüsüne Göre Başlangıç Tarihi Hesapla
    let startDate = new Date()
    startDate.setDate(1) // Varsayılan ay başı
    startDate.setHours(0, 0, 0, 0)

    if (subData?.current_period_end) {
      startDate = new Date(subData.current_period_end)
      startDate.setDate(startDate.getDate() - 30) // 30 gün öncesi (Faturalandırma başlangıcı)
    }

    // 3. Mevcut Kullanımı Sorgula
    const { data: currentMonthStories } = await supabase
      .from('stories')
      .select('id, audio_url')
      .in('profile_id', [profileId]) // Mevcut profil için
      .gte('created_at', startDate.toISOString())

    const totalUsed = currentMonthStories?.length || 0
    const voiceUsed = currentMonthStories?.filter(s => s.audio_url).length || 0

    // Kota Kontrolleri
    if (totalUsed >= storyLimit) {
      return { success: false, error: `Aylık toplam masal sınırınıza ulaştınız (${totalUsed}/${storyLimit}).` }
    }

    const isRequestingVoice = voiceOption !== 'Sessiz'
    if (isRequestingVoice && voiceUsed >= voiceLimit) {
      return { success: false, error: `Aylık sesli masal sınırınıza ulaştınız (${voiceUsed}/${voiceLimit}). Sadece sessiz masal oluşturabilirsiniz.` }
    }

    // 4. Arşiv Limiti Kontrolü (Maksimum 80 hikaye tutulabilir)
    const { count: totalArchiveCount } = await supabase
      .from('stories')
      .select('*', { count: 'exact', head: true })
      .in('profile_id', [profileId])

    if (totalArchiveCount !== null && totalArchiveCount >= 80) {
      // En eski hikayeyi bul ve sil
      const { data: oldestStory } = await supabase
        .from('stories')
        .select('id')
        .in('profile_id', [profileId])
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

      if (oldestStory) {
        await supabase.from('stories').delete().eq('id', oldestStory.id)
      }
    }

    // 5. Masal Üretimi ve Sahneleme (Gemini 3 Flash)
    // Vertex AI için Service Account'tan token al (Gemini 3 Flash + Imagen 4.0)
    const vertexToken = await getVertexAccessToken()

    // Kullanıcının seçtiği türü ve stili theme string'inden parse et
    const genreMatch = theme.match(/^([^ ]+)/)
    const selectedGenre = genreMatch ? genreMatch[1].trim() : 'Masal'
    
    const styleMatch = theme.match(/Çizim Stili:\s*([^.]+)/)
    const selectedStyle = styleMatch ? styleMatch[1].trim() : 'Sulu Boya'
    const styleConfig = IMAGE_STYLE_MAP[selectedStyle] || IMAGE_STYLE_MAP['Sulu Boya']

    const ageKey = typeof age === 'string' ? age : (age <= 2 ? '1-2' : age <= 4 ? '2-4' : age <= 6 ? '4-6' : age <= 10 ? '6-10' : '10-13')
    const ageRules = AGE_RULES[ageKey] || AGE_RULES['2-4']

    // Eğitici değer ayıklama ve talimatı
    const eduMatch = theme.match(/Eğitici Değer:\s*([^.]+)/)
    const educationalValue = eduMatch ? eduMatch[1].trim() : null
    const educationalInstructions = educationalValue 
      ? `MISSION: This is an EDUCATIONAL story. The primary goal is to teach the child the value of "${educationalValue}". 
         The plot MUST revolve around this lesson. Characters' choices and the story's resolution MUST reinforce this value. 
         Ensure the moral of the story is clear and impactful for the child.`
      : ''

    // İlk adım: Hikayeyi yaz ve sahneleri belirle
    // Karakterleri parse et (tutarlılık için)
    const characterList = hero.split(',').map((c: string) => c.trim()).filter(Boolean)
    const characterCount = characterList.length
    const characterDesc = characterList.map((c: string, i: number) => 
      `Character ${i+1}: "${c}" - MUST include: exact skin tone (e.g. "warm olive skin", "light peach skin", "dark brown skin"), exact hair (color + style), exact outfit (color + style), approximate age. This description MUST be identical in every scene.`
    ).join('\n')

    const prompt = `You are a professional children's book author and illustrator director.
Write a ${selectedGenre} story for a ${age}-year-old child. 
${educationalInstructions ? educationalInstructions + '\n' : ''}Linguistic and Complexity Rules for this age: ${ageRules}
Heroes: "${hero}". Theme: "${theme}".

STRICT RULES:
1. Split the story into exactly 9-11 scenes (pages).
2. For each scene provide:
   - "text": The story text for that page (minimum 3-4 sentences, in Turkish).
   - "imagePrompt": An English image generation prompt for Imagen 4.0. NEVER include character names here. Use only physical descriptions (e.g. "The red-capped boy" instead of "Ali").
3. CHARACTER CONSISTENCY (ABSOLUTELY CRITICAL - NO EXCEPTIONS):
   - Define EVERY character's appearance ONCE in "characterDescriptions" at the top level.
   - ${characterDesc}
   - EVERY "imagePrompt" MUST include the EXACT character description string, word for word, copied verbatim.
   - NEVER change skin tone, hair color, outfit, or any physical trait between scenes.
   - The story has EXACTLY ${characterCount} main character(s). NEVER add more characters.
4. STRICT IMAGE RULES:
   - NEVER, EVER include any text, letters, names, or words in the images.
   - Do NOT include labels, captions, or signposts.
   - Response ONLY with visual descriptions.
5. IMAGEN PROMPT RULES:
   - Start every imagePrompt with: "A high-quality scene where..."
   - Then COPY-PASTE the EXACT character descriptions from characterDescriptions.
   - Then describe what is happening in the scene.
   - End EVERY imagePrompt with: "exactly ${characterCount} character(s) only, no extra people, ABSOLUTELY NO TEXT, NO LETTERS, NO WORDS, NO WRITING, NO CAPTIONS, NO LABELS, NO SIGNATURES"
   ${styleConfig.negative ? `- NEGATIVE INSTRUCTIONS: ${styleConfig.negative}` : ''}
   - NEVER describe characters differently across scenes.
6. Respond ONLY in this exact JSON format:
{
  "title": "Story Title in Turkish",
  "characterDescriptions": {
    ${characterList.map((c: string) => `"${c}": "[REQUIRED: exact skin tone, exact hair color+style, exact outfit color+style, approximate age, one distinguishing feature]"`).join(',\n    ')}
  },
  "scenes": [
    { "text": "...", "imagePrompt": "..." },
    ...
  ]
}`
    
    // Gemini 3 Flash Preview → Google AI Studio API (bağımsız, GOOGLE_GENERATIVE_AI_API_KEY ile)
    // Model ID teyit: https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      }),
    })
    
    const aiData = await aiResponse.json()
    if (!aiData.candidates) {
      console.error("Gemini Hikaye Hatası:", aiData)
      return { success: false, error: 'Gemini hikayeyi oluşturamadı. API loglarını kontrol edin.' }
    }
    
    const storyDataRaw = JSON.parse(aiData.candidates[0].content.parts[0].text)
    const { title, scenes, characterDescriptions } = storyDataRaw
    
    // Karakterlerin tam tanımlarını bir string olarak hazırla (İsimleri temizleyerek - yazıyı engellemek için)
    const charAnchor = characterDescriptions 
      ? Object.entries(characterDescriptions).map(([name, desc]) => `${desc}`).join('; ')
      : ''

    // 6. Çoklu Görsel Üretimi (Imagen 4.0 - Her Sahne İçin)
    const pages = await Promise.all(scenes.map(async (scene: any, index: number) => {
      let sceneImageUrl = ''
      
      // İSİM SÜZGECİ: imagePrompt içindeki karakter isimlerini yazılımsal olarak temizle
      let cleanImagePrompt = scene.imagePrompt || ''
      characterList.forEach((name: string) => {
        // İsmi (case-insensitive ve tam kelime olarak) bul ve kaldır
        const nameRegex = new RegExp(`\\b${name}\\b`, 'gi')
        cleanImagePrompt = cleanImagePrompt.replace(nameRegex, '')
      })

      try {
        const imagenResponse = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/hikayeyazicisi/locations/us-central1/publishers/google/models/imagen-4.0-generate-001:predict`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${vertexToken}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            instances: [{ 
              prompt: `ABSOLUTELY NO TEXT. ${styleConfig.prefix} ${styleConfig.desc}. ${cleanImagePrompt}${charAnchor ? ` -- CHARACTER ANCHOR: ${charAnchor}` : ''}, high quality, NO TEXT, NO LABELS, NO WRITING` 
            }],
            parameters: {
              sampleCount: 1,
              aspectRatio: "1:1",
              outputMimeType: "image/png",
              addWatermark: false
            }
          })
        })

        const imagenData = await imagenResponse.json()

        if (imagenData.predictions && imagenData.predictions.length > 0) {
          const b64Image = imagenData.predictions[0].bytesBase64Encoded
          const imageBuffer = Buffer.from(b64Image, 'base64')
          const imageFileName = `story_${Date.now()}_page_${index}.png`
          
          const { error: uploadError } = await supabase.storage
            .from('story_assets')
            .upload(imageFileName, imageBuffer, { contentType: 'image/png' })
            
          if (!uploadError) {
            const { data: imgUrlData } = supabase.storage.from('story_assets').getPublicUrl(imageFileName)
            sceneImageUrl = imgUrlData.publicUrl
          }
        } else {
          console.error(`Imagen 4.0 Hatası (Sayfa ${index}):`, imagenData)
        }
      } catch (e) {
        console.error(`Sayfa ${index} görsel üretim hatası:`, e)
      }
      return { text: scene.text, image_url: sceneImageUrl }
    }))

    // 7. Ses Üretimi
    let audioUrl = null
    if (isRequestingVoice) {
      try {
        const fullText = scenes.map((s: any) => s.text).join(' ')
        const voiceId = elevenVoiceId || 'tr-TR-Chirp3-HD-Aoede' 

        const ttsResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: fullText.slice(0, 4800) },
            voice: { languageCode: 'tr-TR', name: voiceId },
            audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95 }
          })
        })

        if (ttsResponse.ok) {
          const ttsData = await ttsResponse.json()
          const audioBuffer = Buffer.from(ttsData.audioContent, 'base64')
          const audioFileName = `story_audio_${Date.now()}.mp3`
          const { error: uploadError } = await supabase.storage.from('story_assets').upload(audioFileName, audioBuffer, { contentType: 'audio/mpeg' })
          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage.from('story_assets').getPublicUrl(audioFileName)
            audioUrl = publicUrlData.publicUrl
          }
        } else {
          const errorData = await ttsResponse.json()
          console.error("TTS API Hatası:", errorData)
        }
      } catch (e) {
        console.error('Seslendirme genel hatası:', e)
      }
    }

    // 8. Veritabanına Kaydet (insert ve select ayrı - RLS uyumlu)
    const { error: dbError } = await supabase
      .from('stories')
      .insert({
        profile_id: profileId,
        title: title,
        content_json: scenes.map((s: any) => s.text),
        pages: pages,
        image_url: pages[0]?.image_url || '',
        audio_url: audioUrl
      })

    if (dbError) {
      console.error("Veritabanı Kayıt Hatası:", dbError)
      throw dbError
    }

    // RLS nedeniyle insert'ten ID dönmeyebilir, ayrı sorguluyoruz
    const { data: savedStory, error: fetchError } = await supabase
      .from('stories')
      .select('id')
      .eq('profile_id', profileId)
      .eq('title', title)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !savedStory) {
      console.error("Kayıt sonrası ID sorgu hatası:", fetchError)
      return { success: true, id: null } // Hikaye kaydedildi ama yönlendirme yapılamıyor
    }
    
    return { success: true, id: savedStory.id }

  } catch (globalError: any) {
    console.error("Sistem Hatası:", globalError)
    return { success: false, error: globalError.message || 'Beklenmeyen hata.' }
  }
}
