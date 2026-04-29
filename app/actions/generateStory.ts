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

    // 5. Masal Üretimi ve Sahneleme (Gemini 3 Flash)
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("Eksik API Anahtarı: GOOGLE_GENERATIVE_AI_API_KEY")
      return { success: false, error: 'Sistem yapılandırma hatası: AI API anahtarı eksik.' }
    }

    // İlk adım: Hikayeyi yaz ve sahneleri belirle
    const prompt = `Sen profesyonel bir çocuk kitabı yazarısın. 
    Lütfen ${age} yaşındaki "${childName}" için, kahramanı "${hero}" olan, "${theme}" temalı harika bir masal yaz.
    
    KURALLAR:
    1. Masalı tam olarak 9 ile 11 arasında sahneye (sayfaya) böl.
    2. Her sahne için:
       - "text": O sayfanın hikaye metni (en az 3-4 cümle).
       - "imagePrompt": O sahneyi anlatan, Imagen 4 için İNGİLİZCE görsel komutu.
    3. GÖRSEL TUTARLILIK İÇİN: 
       - Karakterlerin (özellikle ${hero}) fiziksel özelliklerini (saç rengi, kıyafeti, yaşı) her "imagePrompt" içinde AYNI şekilde detaylıca tekrarla.
       - Stil olarak "${theme}" içinde belirtilen stili kullan.
    4. Yanıtı SADECE şu JSON formatında ver:
       {
         "title": "Masal Başlığı",
         "scenes": [
           { "text": "...", "imagePrompt": "..." },
           ...
         ]
       }`
    
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      }),
    })
    
    const aiData = await aiResponse.json()
    if (!aiData.candidates) return { success: false, error: 'Gemini hikayeyi oluşturamadı.' }
    
    const storyDataRaw = JSON.parse(aiData.candidates[0].content.parts[0].text)
    const { title, scenes } = storyDataRaw

    // 6. Çoklu Görsel Üretimi (Imagen 4.0 - Her Sahne İçin)
    const pages = await Promise.all(scenes.map(async (scene: any, index: number) => {
      let sceneImageUrl = ''
      try {
        const imagenResponse = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/hikay-494819/locations/us-central1/publishers/google/models/imagen-4.0-generate-001:predict`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${process.env.GOOGLE_CLOUD_TTS_API_KEY}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            instances: [{ prompt: scene.imagePrompt }],
            parameters: {
              sampleCount: 1,
              aspectRatio: "1:1",
              outputMimeType: "image/png",
              addWatermark: false
            }
          })
        })

        if (imagenResponse.ok) {
          const imagenData = await imagenResponse.json()
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
        }
      } catch (e) {
        console.error(`Sayfa ${index} görsel hatası:`, e)
      }
      return { text: scene.text, image_url: sceneImageUrl }
    }))

    // 7. Ses Üretimi (Tüm metin için tek bir ses veya sayfa bazlı - Şimdilik tüm metin)
    let audioUrl = null
    if (isRequestingVoice) {
      try {
        const fullText = scenes.map((s: any) => s.text).join(' ')
        const voiceId = elevenVoiceId || 'tr-TR-Studio-A' 

        const ttsResponse = await fetch(`https://texttospeech.googleapis.com/v2/text:synthesize?key=${process.env.GOOGLE_CLOUD_TTS_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: fullText.slice(0, 3200) },
            voice: { languageCode: 'tr-TR', name: voiceId },
            audioConfig: { audioEncoding: 'MP3' }
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
        }
      } catch (e) {
        console.error('Seslendirme hatası:', e)
      }
    }

    // 8. Veritabanına Kaydet
    const { data: finalStory, error: dbError } = await supabase
      .from('stories')
      .insert({
        profile_id: profileId,
        title: title,
        content_json: scenes.map((s: any) => s.text), // Eski yapı uyumluluğu için
        pages: pages, // Yeni çoklu sayfa yapısı
        image_url: pages[0].image_url, // İlk sayfa kapak olsun
        audio_url: audioUrl
      })
      .select()
      .single()

    if (dbError) throw dbError
    return { success: true, story: finalStory }
  } catch (globalError: any) {
    console.error("Sistem Hatası:", globalError)
    return { success: false, error: globalError.message || 'Beklenmeyen hata.' }
  }
}
