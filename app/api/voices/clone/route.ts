import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Oturum açmalısınız.' }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const audioFile = formData.get('audio') as File

    if (!name || !audioFile) {
      return NextResponse.json({ success: false, error: 'İsim ve ses dosyası gereklidir.' }, { status: 400 })
    }

    // 1. ElevenLabs'e Gönder
    const elevenLabsFormData = new FormData()
    elevenLabsFormData.append('name', name)
    elevenLabsFormData.append('files', audioFile)
    elevenLabsFormData.append('description', `Kullanıcı ${user.id} tarafından eklendi.`)

    const elevenResponse = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY || ''
      },
      body: elevenLabsFormData
    })

    const elevenData = await elevenResponse.json()

    if (!elevenResponse.ok) {
      console.error('ElevenLabs Error:', elevenData)
      return NextResponse.json({ success: false, error: elevenData.detail?.message || 'ElevenLabs ses klonlama başarısız oldu.' }, { status: 500 })
    }

    const voiceId = elevenData.voice_id

    // 2. Supabase'e Kaydet
    const { data: voiceRecord, error: dbError } = await supabase
      .from('cloned_voices')
      .insert({
        user_id: user.id,
        name: name,
        eleven_voice_id: voiceId
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database Error:', dbError)
      return NextResponse.json({ success: false, error: 'Veritabanı kaydı başarısız oldu.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      voice: voiceRecord
    })

  } catch (error: any) {
    console.error('Clone Voice Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
