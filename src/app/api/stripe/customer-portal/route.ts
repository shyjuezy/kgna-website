import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, sessionId } = body;

    let customer_id = customerId;

    // If no customer ID provided, try to get it from a session
    if (!customer_id && sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      customer_id = session.customer as string;
    }

    if (!customer_id) {
      return NextResponse.json(
        { error: 'Customer ID required' },
        { status: 400 }
      );
    }

    // Create a portal session for the customer
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create customer portal session' },
      { status: 500 }
    );
  }
}