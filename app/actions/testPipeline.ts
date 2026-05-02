import { supabase } from '@/lib/supabase'

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
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
    const vertexToken = process.env.GOOGLE_VERTEX_ACCESS_TOKEN // Veya uygun token çevresel değişkeni
    
    // Geçici çözüm: GCP Token alımı (Eğer service account yüklüyse)
    // Burada token'ın hazır olduğunu varsayıyoruz.
    const token = vertexToken 

    const styleMap: Record<string, any> = {
      'Sulu Boya': { prefix: 'A beautiful watercolor illustration of', suffix: 'soft edges, dreamlike colors, children book style' },
      '3D Pixar': { prefix: 'A high-detail 3D render in Pixar style of', suffix: 'vibrant colors, cute characters, cinematic lighting' },
      'Karakalem': { prefix: 'A professional pencil sketch of', suffix: 'detailed shading, hand-drawn, artistic' }
    }
    const styleConfig = styleMap[style] || styleMap['Sulu Boya']

    // 1. FAZ: METİN
    console.log("1. Faz: Metin üretiliyor...")
    const textResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3-flash-preview:streamGenerateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `Aşağıdaki konuyla ilgili tek sayfalık bir çocuk masalı ve karakter tarifi yaz. 
          Konu: ${prompt} 
          ÇIKTI: JSON formatında 'text', 'characters' (object) ve 'visualHook' (string) olarak dön.` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })

    const aiDataRaw = await textResponse.json()
    let storyJsonRaw = aiDataRaw.map((chunk: any) => chunk.candidates?.[0]?.content?.parts?.[0]?.text || '').join('')
    
    // [ZIRHLI PARSER]
    storyJsonRaw = storyJsonRaw.replace(/```json/g, '').replace(/```/g, '').trim();
    console.log(">>> [TEST ZIRHLI PARSER] Temizlenmiş JSON:", storyJsonRaw);

    const storyData = JSON.parse(storyJsonRaw)
    results.text.content = storyData.text || "Metin bulunamadı"
    results.text.status = 'SUCCESS'

    // Karakter Çapalarını (Anchor) Birleştir (Maksimum Esneklik)
    let characterAnchors = "";
    if (storyData.characters) {
        const charValues = Array.isArray(storyData.characters) 
            ? storyData.characters.map((c: any) => `${c.name}: ${c.description || c.physicalDescription || c.physical_appearance || JSON.stringify(c)}`)
            : Object.values(storyData.characters).map((v: any) => typeof v === 'string' ? v : (v.description || v.physicalDescription || JSON.stringify(v)));
        characterAnchors = charValues.join('. ');
    }
    console.log(`>>> [TEŞHİS TEST] Mühürlenen Karakter Çapaları: ${characterAnchors}`);

    // 2. FAZ: GÖRSEL (SİHİRLİ BİRLEŞTİRME 2.0)
    console.log("2. Faz: Test görseli üretiliyor...")
    const hook = storyData.visualHook || storyData.sceneDescription || storyData.visual_description || "A beautiful scene";
    const finalImagePrompt = `${styleConfig.prefix} Physical Appearance: ${characterAnchors}. Scenario: ${hook}. ${styleConfig.suffix}`;
    console.log(`>>> [PROMPT TEST]: ${finalImagePrompt}`);

    const imageResponse = await fetch(`https://aiplatform.googleapis.com/v1/projects/${projectId}/locations/global/publishers/google/models/gemini-3.1-flash-image-preview:generateContent`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: finalImagePrompt }] }] })
    })
    const imageData = await imageResponse.json()
    const b64 = imageData.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data
    
    if (b64) {
      const uniqueId = Math.random().toString(36).substring(7);
      const fileName = `test_story_${Date.now()}_${uniqueId}.png`
      await supabase.storage.from('story_assets').upload(fileName, Buffer.from(b64, 'base64'), { contentType: 'image/png' })
      const publicImageUrl = supabase.storage.from('story_assets').getPublicUrl(fileName).data.publicUrl
      results.image.url = publicImageUrl
      results.image.status = 'SUCCESS'
    } else {
      results.image.status = 'ERROR'
      results.image.error = JSON.stringify(imageData)
    }

    // 3. FAZ: SES (Gemini 3.1 Flash TTS)
    const finalVoiceId = voiceId.includes('-') ? voiceId.split('-').pop() : voiceId;
    console.log(`3. Faz: Ses üretiliyor (Final ID: ${finalVoiceId})...`);

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

    const audioResponse = await fetch(`https://texttospeech.googleapis.com/v1beta1/text:synthesize`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { 
          text: storyData.text || '',
          prompt: VOICE_INSTRUCTIONS[finalVoiceId as string] || 'Sıcak ve masalsı bir tonda oku.'
        },
        voice: { 
          languageCode: 'tr-tr', 
          name: finalVoiceId,
          modelName: 'gemini-3.1-flash-tts-preview'
        },
        audioConfig: { audioEncoding: 'MP3' }
      })
    })
    const audioData = await audioResponse.json()
    const audioB64 = audioData.audioContent

    if (audioB64) {
      const fileName = `test_audio_${Date.now()}.mp3`
      await supabase.storage.from('story_assets').upload(fileName, Buffer.from(audioB64, 'base64'), { contentType: 'audio/mpeg' })
      results.audio.url = supabase.storage.from('story_assets').getPublicUrl(fileName).data.publicUrl
      results.audio.status = 'SUCCESS'
    } else {
      results.audio.status = 'ERROR'
      results.audio.error = JSON.stringify(audioData)
    }

    return results
  } catch (error: any) {
    console.error("Test Hattı Hatası:", error)
    return {
      text: { status: 'ERROR', error: error.message },
      image: { status: 'ERROR', error: error.message },
      audio: { status: 'ERROR', error: error.message }
    }
  }
}
