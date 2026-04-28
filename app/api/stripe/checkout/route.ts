import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

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
    const productName = isPremium ? 'MasalKovanı Premium (Kraliçe Arı)' : 'MasalKovanı Pro (Tatlı Bal)'
    const productDesc = isPremium 
      ? 'Sınırsız masal oluşturma ve ebeveyn ses klonlama özelliği.' 
      : 'Ayda 50 masal oluşturma hakkı.'
    const unitAmount = isPremium ? 4000 : 1500 // $40.00 veya $15.00

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
      success_url: `${req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://hikaye-yazicisi.onrender.com'}/parent?success=true&plan=${plan}`,
      cancel_url: `${req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://hikaye-yazicisi.onrender.com'}/parent?canceled=true`,
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
