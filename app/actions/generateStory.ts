'use server'

import { createClient } from '@/utils/supabase/server'

interface StoryRequest {
  childName: string
  hero: string
  theme: string
  age: number
}

export async function generateStoryAction({ childName, hero, theme, age }: StoryRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Oturum açmanız gerekiyor.')

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
    if (profileErr) throw new Error('Profil oluşturulamadı.')
    profileId = newProfile.id
  }

  // Kota Kontrolü (Rate Limiting)
  const { data: subData } = await supabase
    .from('subscriptions')
    .select('status, plan_id')
    .eq('user_id', user.id)
    .maybeSingle()

  const isActive = subData?.status === 'active'
  const isPro = isActive && subData?.plan_id === 'pro'
  const isPremium = isActive && subData?.plan_id === 'premium'

  const monthlyLimit = isPremium ? Infinity : (isPro ? 50 : 3)

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Sadece o aya ait bu kullanıcının profilindeki hikayeleri sayıyoruz
  const { count, error: countError } = await supabase
    .from('stories')
    .select('*', { count: 'exact', head: true })
    .eq('profile_id', profileId)
    .gte('created_at', startOfMonth.toISOString())

  if (count !== null && count >= monthlyLimit) {
    throw new Error(`Aylık masal sınırınıza ulaştınız. (Limit: ${monthlyLimit} masal/ay). Lütfen paketinizi yükseltin.`)
  }

  // 1. Masal Üretimi (Google AI Studio - Gemini)
  // Adaptive Age Logic (Yaşa Göre Uyarlama) prompt içinde sağlanıyor.
  const prompt = `Sen 3-12 yaş arası çocuklar için mükemmel, pedagojik olarak onaylanmış masallar anlatan bir yapay zeka yazarısın. 
  Lütfen ${age} yaşındaki "${childName}" isimli çocuk için, baş kahramanı "${hero}" olan ve ana teması "${theme}" üzerine kurulu eğitici, akıcı ve hayal gücünü geliştiren yaklaşık 800 kelimelik bir masal yaz. 
  Kelimeleri ve cümle yapılarını ${age} yaşındaki bir çocuğun gelişimine tam uygun olacak şekilde seç. Hikayeyi paragraflara böl ve ilk satıra sadece masalın başlığını yaz (markdown kullanma).`
  
  const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })
  
  const aiData = await aiResponse.json()
  if (!aiData.candidates) throw new Error('Masal üretilemedi.')
  
  const storyText = aiData.candidates[0].content.parts[0].text
  const lines = storyText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0)
  const title = lines[0].replace(/[*#]/g, '')
  const content = lines.slice(1) // Paragraflar dizisi

  // 2. Görsel Üretimi (fal.ai FLUX.1)
  const falResponse = await fetch('https://fal.run/fal-ai/flux/schnell', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${process.env.FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `A highly detailed watercolor illustration for a children's book cover. Theme: ${theme}, featuring ${hero}. Dreamy, magical, soft pastel colors, cute and pedagogical.`,
      image_size: 'landscape_4_3',
      num_inference_steps: 4
    })
  })
  
  const falData = await falResponse.json()
  const imageUrl = falData.images?.[0]?.url || ''

  // 3. Ses Üretimi (ElevenLabs TTS)
  // 'Bella' isimli ElevenLabs hazır çocuk dostu ses ID'si kullanıldı. (Premiumda dinamik ebeveyn sesi ID'si ile değiştirilebilir)
  const voiceId = 'EXAVITQu4vr4xnSDxMaL' 
  const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: content.join(' '), // Sadece masal metni okutuluyor
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      }
    })
  })
  
  const audioBlob = await elevenLabsResponse.blob()
  
  // 4. Supabase Storage'a Ses Dosyasını Yükleme
  const audioFileName = `story_audio_${Date.now()}.mp3`
  const { error: uploadError } = await supabase.storage
    .from('story_assets')
    .upload(audioFileName, audioBlob, { contentType: 'audio/mpeg' })

  if (uploadError) {
    console.error('Storage upload error:', uploadError)
    throw new Error('Ses dosyası Storage alanına yüklenemedi.')
  }

  const { data: publicUrlData } = supabase.storage
    .from('story_assets')
    .getPublicUrl(audioFileName)
    
  const audioUrl = publicUrlData.publicUrl

  // 5. Veritabanına (PostgreSQL) Kaydetme
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
    console.error('DB Insert error:', dbError)
    throw new Error('Veritabanına kaydedilemedi.')
  }

  return { success: true, story: storyData }
}
