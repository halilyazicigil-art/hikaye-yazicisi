import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build')

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const plan = body.plan === 'premium' ? 'premium' : 'pro'
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    const isPremium = plan === 'premium'
    const productName = isPremium ? 'Altın Güneş (Premium Paket)' : 'Gümüş Gökyüzü (Pro Paket)'
    const productDesc = isPremium 
      ? 'Aylık 90 masal üretimi, 100 masal arşivi ve ebeveyn ses klonlama özelliği.' 
      : 'Aylık 40 masal üretimi ve 50 masal arşivi hakkı.'
    const unitAmount = isPremium ? 4000 : 1500 // 40.00 USD ve 15.00 USD

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: productDesc,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://luminook.onrender.com'}/parent?success=true&plan=${plan}`,
      cancel_url: `${req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://luminook.onrender.com'}/parent?canceled=true`,
      metadata: {
        userId: user.id,
        planId: plan,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
