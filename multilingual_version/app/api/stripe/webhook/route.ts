import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Webhook'ta RLS kurallarını atlayıp veritabanına yazabilmek için Service Role Key kullanılır.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build')

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
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Webhook error'
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }

  // Başarılı ödeme ve abonelik tamamlama olaylarını dinle
  if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = event.data.object as any
    const userId = session.metadata?.userId || session.subscription_details?.metadata?.userId

    if (userId) {
      // 1. Stripe Customer ID'yi users tablosuna kaydet (Portal için gerekli)
      if (session.customer) {
        // Veritabanını güncelleyelim ki bir sonraki seferde hızlı gelsin
        await supabaseAdmin.from('users').update({ 
          stripe_customer_id: session.customer as string 
        }).eq('id', userId)
      }

      // 2. Abonelik durumunu güncelle
      const planId = session.metadata?.planId || 'pro'
      await supabaseAdmin.from('subscriptions').upsert({
        user_id: userId,
        status: 'active',
        plan_id: planId,
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }, { onConflict: 'user_id' })

      // 3. Ödeme kaydını payments tablosuna ekle (Finansal Kokpit için)
      const amount = session.amount_total || session.amount_paid || 0
      if (amount > 0) {
        try {
          await supabaseAdmin.from('payments').insert({
            user_id: userId,
            stripe_payment_id: session.id || session.payment_intent || session.charge,
            amount: amount / 100, // Stripe verisi kuruş/cents cinsindendir
            currency: (session.currency || 'usd').toUpperCase(),
          })
        } catch (err: any) {
          console.error("Payments insert error:", err)
        }
      }
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    // Abonelik iptal edilirse
    const subscription = event.data.object as Stripe.Subscription
    // ...
  }

  return NextResponse.json({ received: true })
}
