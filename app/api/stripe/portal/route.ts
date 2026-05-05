import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build', {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    // Stripe Customer ID'yi veritabanından alalım (users tablosunda olmalı)
    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (!userData?.stripe_customer_id) {
      return NextResponse.json({ error: 'Stripe müşteri kaydı bulunamadı' }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripe_customer_id,
      return_url: `${req.headers.get('origin')}/settings`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
