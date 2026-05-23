import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { QuotaService } from '@/services/QuotaService'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    // Kullanıcı giriş yapmamışsa (AuthGate tetiklenmeli)
    if (error || !user) {
      return NextResponse.json({ 
        isAuthenticated: false, 
        isLocked: true, 
        message: "Lütfen sihirli masallar üretmek için giriş yapın." 
      }, { status: 401 })
    }

    // Kullanıcının kota ve paket bilgilerini al (Pamuk Bulut kontrolleri için)
    const quota = await QuotaService.getUserQuotaStats(supabase, user.id)

    return NextResponse.json({
      isAuthenticated: true,
      isLocked: false,
      user: {
        id: user.id,
        email: user.email,
        role: quota.role
      },
      plan: {
        isPro: quota.isPro,
        isPremium: quota.isPremium,
        planId: quota.planId
      },
      limits: {
        totalLimit: quota.totalLimit,
        totalUsed: quota.totalUsed,
        shuffleLimit: quota.shuffleLimit,
        shuffleUsed: quota.shuffleUsed,
        manualLimit: quota.manualLimit,
        manualUsed: quota.manualUsed
      }
    }, { status: 200 })

  } catch (err: any) {
    return NextResponse.json({ 
      error: "Sunucu bağlantı hatası.", 
      details: err.message 
    }, { status: 500 })
  }
}
