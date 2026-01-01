import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Handle successful payment
        console.log('✅ Checkout session completed:', session.id);

        // Extract metadata
        const metadata = session.metadata || {};

        // TODO: Add donor to database
        // TODO: Send thank you email
        // TODO: Add to newsletter if opted in

        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('✅ Subscription created:', subscription.id);

        // TODO: Store subscription details
        // TODO: Send welcome email for recurring donors

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('📝 Subscription updated:', subscription.id);

        // TODO: Update subscription details in database

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        console.log('❌ Subscription cancelled:', subscription.id);

        // TODO: Update donor status
        // TODO: Send cancellation confirmation

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;

        console.log('✅ Recurring payment succeeded:', invoice.id);

        // TODO: Record recurring donation
        // TODO: Send receipt

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;

        console.log('❌ Recurring payment failed:', invoice.id);

        // TODO: Send payment failure notification
        // TODO: Update donor status

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}