import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MasalKovanı Premium',
              description: 'Ayda 50 masal oluşturma ve ebeveyn ses klonlama özelliği.',
            },
            unit_amount: 1500, // $15.00
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://hikaye-yazicisi.onrender.com'}/parent?success=true`,
      cancel_url: `${req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://hikaye-yazicisi.onrender.com'}/parent?canceled=true`,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
