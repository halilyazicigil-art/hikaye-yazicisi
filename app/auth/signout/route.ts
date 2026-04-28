import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  
  // Render.com arkasındaki proxy sorununu (localhost:10000) aşmak için Origin veya public URL kullanımı
  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://hikaye-yazicisi.onrender.com'
  
  return NextResponse.redirect(`${origin}/`, {
    status: 302,
  })
}
