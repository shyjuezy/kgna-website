import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { frequency, amount, coverFees, donorInfo } = body;

    // Create checkout session for one-time donation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: donorInfo.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'One-Time Donation to KGNA',
              description: donorInfo.isHonorarium && donorInfo.honorariumName
                ? `In ${donorInfo.honorariumName}`
                : 'Support our mission to preserve Kashmiri culture',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        donationType: 'one-time',
        firstName: donorInfo.firstName,
        lastName: donorInfo.lastName,
        phone: donorInfo.phone || '',
        isHonorarium: donorInfo.isHonorarium ? 'true' : 'false',
        honorariumName: donorInfo.honorariumName || '',
        subscribeToNewsletter: donorInfo.subscribeToNewsletter ? 'true' : 'false',
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