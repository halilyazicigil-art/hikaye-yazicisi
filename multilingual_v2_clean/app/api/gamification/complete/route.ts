import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { QuotaService } from '@/services/QuotaService'

// Validation regex for UUID v4
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const adminSupabase = await createAdminClient()

    // 1) Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'Oturum açılmadı.' },
        { status: 401 }
      )
    }

    // Check subscription plan
    const quota = await QuotaService.getUserQuotaStats(supabase, user.id)
    if (quota.planId === 'free') {
      return NextResponse.json(
        { success: false, error: 'Forbidden', message: 'Bu özellikleri kullanmak istiyorsan abonelik satın al.' },
        { status: 403 }
      )
    }

    // 2) Parse and validate body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Geçersiz JSON içeriği.' },
        { status: 400 }
      )
    }

    const { storyId, source, secondsListened, duration } = body

    if (!storyId || typeof storyId !== 'string' || !UUID_REGEX.test(storyId)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Geçersiz veya eksik storyId (UUID).' },
        { status: 400 }
      )
    }

    const validSources = ['parent', 'library', 'parent_private', 'community_popular']
    if (!source || typeof source !== 'string' || !validSources.includes(source)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Geçersiz veya eksik kaynak (source).' },
        { status: 400 }
      )
    }

    if (
      typeof secondsListened !== 'number' ||
      typeof duration !== 'number' ||
      secondsListened < 0 ||
      duration <= 0
    ) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Geçersiz dinleme süresi değerleri.' },
        { status: 400 }
      )
    }

    // 3) Anti-cheat validation (must listen to at least 80% of unique duration)
    const threshold = duration * 0.8
    if (secondsListened < threshold) {
      return NextResponse.json(
        {
          success: false,
          rewarded: false,
          message: 'Hikaye dinleme süresi tamamlanmadı (en az %80 dinlenmelidir).',
          details: { secondsListened, required: Math.ceil(threshold) }
        },
        { status: 200 } // Retaining 200 status as this is a business rule evaluation, not a server crash
      )
    }

    // 4) Retrieve the active child profile of the user
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle()

    if (profileError) {
      console.error('[GAMIFICATION_API_ERROR] Fetch profile failed:', profileError)
      return NextResponse.json(
        { success: false, error: 'Internal Server Error', message: 'Profil bilgisi sorgulanamadı.' },
        { status: 500 }
      )
    }

    if (!profile) {
      const { data: newProfile, error: createError } = await adminSupabase
        .from('profiles')
        .insert({
          user_id: user.id,
          name: 'Küçük Kahraman',
          age: 5
        })
        .select('id')
        .single()

      if (createError) {
        console.error('[GAMIFICATION_API_ERROR] Auto-create profile failed:', createError)
        return NextResponse.json(
          { success: false, error: 'Internal Server Error', message: 'Profil otomatik oluşturulamadı.' },
          { status: 500 }
        )
      }
      profile = newProfile
    }

    // 5) Execute atomic stored procedure
    const { data: rpcResult, error: rpcError } = await supabase.rpc('complete_story_listen', {
      p_profile_id: profile.id,
      p_story_id: storyId,
      p_source: source
    })

    if (rpcError) {
      console.error('[GAMIFICATION_API_ERROR] RPC call failed:', rpcError)
      return NextResponse.json(
        { success: false, error: 'Internal Server Error', message: 'Ödüllendirme sistemi çalıştırılamadı.' },
        { status: 500 }
      )
    }

    // 6) Return the gamification results
    return NextResponse.json(rpcResult, { status: 200 })

  } catch (err: any) {
    console.error('[GAMIFICATION_API_ERROR] Unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: err.message || 'Bir hata oluştu.' },
      { status: 500 }
    )
  }
}
