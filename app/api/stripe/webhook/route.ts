import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Webhook'ta RLS kurallarını atlayıp veritabanına yazabilmek için Service Role Key kullanılır.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } else {
      event = JSON.parse(payload) // Webhook secret yoksa test ortamı varsayımı
    }
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Başarılı ödeme ve abonelik tamamlama olaylarını dinle
  if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
    let session = event.data.object as any
    const userId = session.metadata?.userId || session.subscription_details?.metadata?.userId

    if (userId) {
      // Kullanıcının abonelik durumunu 'active' yapıyoruz
      await supabaseAdmin.from('subscriptions').upsert({
        user_id: userId,
        status: 'active',
        plan_id: 'bee_hive',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }, { onConflict: 'user_id' })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    // Abonelik iptal edilirse
    const subscription = event.data.object as Stripe.Subscription
    // ...
  }

  return NextResponse.json({ received: true })
}
