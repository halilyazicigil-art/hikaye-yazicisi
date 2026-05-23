import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { QuotaService } from '@/services/QuotaService'

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

    const { petType, petName } = body

    if (!petType || typeof petType !== 'string' || !['dragon', 'pegasus'].includes(petType)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Geçersiz veya eksik karakter tipi (petType).' },
        { status: 400 }
      )
    }

    if (!petName || typeof petName !== 'string' || petName.trim().length === 0 || petName.trim().length > 25) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Geçersiz veya çok uzun karakter adı (petName).' },
        { status: 400 }
      )
    }

    const cleanPetName = petName.trim()

    // 3) Retrieve the active child profile of the user (uses authenticated client to verify ownership)
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle()

    if (profileError) {
      console.error('[GAMIFICATION_INIT_ERROR] Fetch profile failed:', profileError)
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
        console.error('[GAMIFICATION_INIT_ERROR] Auto-create profile failed:', createError)
        return NextResponse.json(
          { success: false, error: 'Internal Server Error', message: 'Profil otomatik oluşturulamadı.' },
          { status: 500 }
        )
      }
      profile = newProfile
    }

    // 4) Check if companion already exists to preserve existing progress (uses authenticated client)
    const { data: existingPet, error: fetchError } = await supabase
      .from('profile_pets')
      .select('*')
      .eq('profile_id', profile.id)
      .maybeSingle()

    if (fetchError) {
      console.error('[GAMIFICATION_INIT_ERROR] Fetch pet failed:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Internal Server Error', message: 'Mevcut evcil hayvan bilgisi sorgulanamadı.' },
        { status: 500 }
      )
    }

    let resultPet
    if (existingPet) {
      // Surgical update: update type and name only, preserve level/XP/stage
      // Uses admin client to bypass write restrictions and prevent client-side console cheating
      const { data, error: updateError } = await adminSupabase
        .from('profile_pets')
        .update({
          pet_type: petType,
          pet_name: cleanPetName,
          updated_at: new Date().toISOString()
        })
        .eq('profile_id', profile.id)
        .select()
        .single()

      if (updateError) {
        console.error('[GAMIFICATION_INIT_ERROR] Update failed:', updateError)
        return NextResponse.json(
          { success: false, error: 'Internal Server Error', message: 'Evcil hayvan bilgileri güncellenemedi.' },
          { status: 500 }
        )
      }
      resultPet = data
    } else {
      // Fresh creation
      // Uses admin client to bypass write restrictions and prevent client-side console cheating
      const { data, error: insertError } = await adminSupabase
        .from('profile_pets')
        .insert({
          profile_id: profile.id,
          pet_type: petType,
          pet_name: cleanPetName,
          xp: 0,
          level: 1,
          stage: 'egg'
        })
        .select()
        .single()

      if (insertError) {
        console.error('[GAMIFICATION_INIT_ERROR] Insert failed:', insertError)
        return NextResponse.json(
          { success: false, error: 'Internal Server Error', message: 'Yeni evcil hayvan oluşturulamadı.' },
          { status: 500 }
        )
      }
      resultPet = data
    }

    return NextResponse.json({
      success: true,
      pet: resultPet
    }, { status: 200 })

  } catch (err: any) {
    console.error('[GAMIFICATION_INIT_ERROR] Unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: err.message || 'Bir iç hata oluştu.' },
      { status: 500 }
    )
  }
}
