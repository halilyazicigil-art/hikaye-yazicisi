'use server'

import { createClient } from '@/utils/supabase/server'

interface StoryRequest {
  childName: string
  hero: string
  theme: string
  age: number
  voiceOption?: string 
  elevenVoiceId?: string
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

    // 5. Masal Üretimi (Gemini)
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("Eksik API Anahtarı: GOOGLE_GENERATIVE_AI_API_KEY")
      return { success: false, error: 'Sistem yapılandırma hatası: AI API anahtarı eksik.' }
    }

    const prompt = `Sen 3-12 yaş arası çocuklar için mükemmel, pedagojik olarak onaylanmış masallar anlatan bir yapay zeka yazarısın. 
    Lütfen ${age} yaşındaki "${childName}" isimli çocuk için, baş kahramanı "${hero}" olan ve ana teması "${theme}" üzerine kurulu eğitici, akıcı ve hayal gücünü geliştiren bir masal yaz. 
    KURALLAR:
    - En az 40 uzun paragraftan oluşan, çok detaylı, olay örgüsü zengin bir masal yaz.
    - Kelimeleri ve cümle yapılarını ${age} yaşındaki bir çocuğun gelişimine tam uygun seç. 
    - İlk satıra sadece masalın başlığını yaz (markdown kullanma).`
    
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    })
    
    const aiData = await aiResponse.json()
    if (!aiData.candidates) {
      console.error("Gemini Hatası:", aiData)
      const exactError = aiData.error?.message || 'Bilinmeyen API hatası'
      return { success: false, error: `Gemini Hatası: ${exactError}. Lütfen API anahtarınızı veya model kotanızı kontrol edin.` }
    }
    
    const storyText = aiData.candidates[0].content.parts[0].text
    const lines = storyText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0)
    const title = lines[0].replace(/[*#]/g, '')
    const content = lines.slice(1)

    // 6. Görsel Üretimi
    let imageUrl = ''
    const isDev = process.env.APP_ENV === 'dev'

    if (isDev) {
      // DEV MODE: Hugging Face (Ücretsiz)
      try {
        if (!process.env.HF_TOKEN) throw new Error("HF_TOKEN eksik")
        const translateResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Translate this to a short English image prompt for children's book: "${theme}, featuring ${hero}"` }] }],
          }),
        })
        const transData = await translateResponse.json()
        const enPrompt = transData.candidates?.[0]?.content?.parts?.[0]?.text || 'a cute illustration'

        const hfResponse = await fetch("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", {
          headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
          method: "POST",
          body: JSON.stringify({ inputs: enPrompt }),
        })
        
        if (hfResponse.ok) {
          const contentType = hfResponse.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const errData = await hfResponse.json()
            console.error("HF API JSON Hatası:", errData)
          } else {
            const imageBlob = await hfResponse.blob()
            const imageFileName = `story_image_${Date.now()}.png`
            await supabase.storage.from('story_assets').upload(imageFileName, imageBlob, { contentType: 'image/png' })
            const { data: imgUrlData } = supabase.storage.from('story_assets').getPublicUrl(imageFileName)
            imageUrl = imgUrlData.publicUrl
          }
        } else {
           console.error("HF API Hatası:", await hfResponse.text())
        }
      } catch (e) {
        console.error('HF Image Error:', e)
      }
    } else {
      // PROD MODE: fal.ai (Ücretli)
      try {
        if (!process.env.FAL_KEY) throw new Error("FAL_KEY eksik")
        const falResponse = await fetch('https://fal.run/fal-ai/flux/schnell', {
          method: 'POST',
          headers: {
            'Authorization': `Key ${process.env.FAL_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `A highly detailed watercolor illustration for a children's book cover. Theme: ${theme}, featuring ${hero}. Dreamy, magical, soft pastel colors.`,
            image_size: 'landscape_4_3',
            num_inference_steps: 4
          })
        })
        if (falResponse.ok) {
          const falData = await falResponse.json()
          imageUrl = falData.images?.[0]?.url || ''
        } else {
          console.error("FAL API Hatası:", await falResponse.text())
        }
      } catch (e) {
        console.error('FAL Image Error:', e)
      }
    }

    // 7. Ses Üretimi (Eğer kota dahilindeyse ve istenmişse)
    let audioUrl = null
    if (isRequestingVoice) {
      try {
        if (!process.env.ELEVENLABS_API_KEY) throw new Error("ELEVENLABS_API_KEY eksik")
        const voiceId = elevenVoiceId || 'EXAVITQu4vr4xnSDxMaL' 
        const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': process.env.ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: content.join(' '),
            model_id: 'eleven_multilingual_v2',
            voice_settings: { stability: 0.3, similarity_boost: 0.85 }
          })
        })
        
        if (elevenLabsResponse.ok) {
          const audioBlob = await elevenLabsResponse.blob()
          const audioFileName = `story_audio_${Date.now()}.mp3`
          await supabase.storage.from('story_assets').upload(audioFileName, audioBlob, { contentType: 'audio/mpeg' })
          const { data: publicUrlData } = supabase.storage.from('story_assets').getPublicUrl(audioFileName)
          audioUrl = publicUrlData.publicUrl
        } else {
           console.error("ElevenLabs API Hatası:", await elevenLabsResponse.text())
        }
      } catch (e) {
         console.error('ElevenLabs Audio Error:', e)
      }
    }

    // 8. Kaydet
    const { data: storyData, error: dbError } = await supabase
      .from('stories')
      .insert({
        profile_id: profileId,
        title: title,
        content_json: content,
        image_url: imageUrl,
        audio_url: audioUrl
      })
      .select()
      .single()

    if (dbError) {
      console.error("DB Kayıt Hatası:", dbError)
      return { success: false, error: 'Veritabanına kaydedilemedi. Lütfen tekrar deneyin.' }
    }

    return { success: true, story: storyData }
  } catch (globalError: any) {
    console.error("Bilinmeyen Sistem Hatası:", globalError)
    return { success: false, error: 'Sunucu tarafında beklenmeyen bir hata oluştu.' }
  }
}
