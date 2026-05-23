import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Oturum açmalısınız.' }, { status: 401 })
    }

    // 🔒 ELEVENLABS DEVRE DIŞI BIRAKILDI
    return NextResponse.json({ 
      success: false, 
      error: 'Ses klonlama özelliği şu anda bakım aşamasındadır. Platformumuz artık tamamen Vertex AI Gemini TTS API teknolojisini kullanmaktadır.' 
    }, { status: 501 })

  } catch (error: any) {
    console.error('Clone Voice Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
