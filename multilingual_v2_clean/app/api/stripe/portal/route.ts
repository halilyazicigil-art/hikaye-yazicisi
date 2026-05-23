import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build')

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

    let customerId = userData?.stripe_customer_id

    // Self-healing: Eğer DB'de yoksa Stripe'dan email ile bulmaya çalışalım
    if (!customerId && user.email) {
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      })
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id
        // Veritabanını güncelleyelim ki bir sonraki seferde hızlı gelsin
        await supabase.from('users').update({ 
          stripe_customer_id: customerId 
        }).eq('id', user.id)
      }
    }

    if (!customerId) {
      return NextResponse.json({ error: 'Stripe müşteri kaydı bulunamadı' }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get('origin')}/settings`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
