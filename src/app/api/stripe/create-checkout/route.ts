import { NextRequest, NextResponse } from 'next/server';
import { donorCheckoutFields, stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, coverFees, subscribeToNewsletter } = body;

    // Create checkout session for one-time donation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      ...donorCheckoutFields,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'One-Time Donation to KGNA',
              description: 'Support our mission to preserve Kashmiri culture',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        donationType: 'one-time',
        subscribeToNewsletter: subscribeToNewsletter ? 'true' : 'false',
        coverFees: coverFees ? 'true' : 'false',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}