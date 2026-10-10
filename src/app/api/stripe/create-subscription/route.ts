import { NextRequest, NextResponse } from "next/server";
import { donorCheckoutFields, stripe } from "@/lib/stripe";
import { DONATION_PRODUCTS } from "@/config/donation-tiers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { frequency, amount, coverFees, subscribeToNewsletter } = body;

    // For subscriptions, we need to use pre-created price IDs or create them dynamically
    const config = DONATION_PRODUCTS[frequency as "monthly" | "annual"];
    let priceId: string | undefined;

    // Check if we have a pre-configured price for this amount
    if (config.prices && amount in config.prices) {
      priceId = config.prices[amount as keyof typeof config.prices];
    }

    // Only fall back to creating a price when there is no usable configured one.
    // The previous check was `priceId.startsWith('price_')`, which is true of
    // every real Stripe price id - so configured ids were always discarded and
    // a new Product + Price was created on every recurring donation.
    const isPlaceholderPriceId = (value: string) =>
      /^price_(monthly|annual)_\d+$/.test(value);

    if (!priceId || isPlaceholderPriceId(priceId)) {
      const product = await stripe.products.create({
        name: `${frequency === "monthly" ? "Monthly" : "Annual"} Donation to KGNA`,
        description: "Recurring support for our mission",
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100),
        currency: "usd",
        recurring: {
          interval: frequency === "monthly" ? "month" : "year",
        },
      });

      priceId = price.id;
    }

    // Create checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      ...donorCheckoutFields,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        donationType: frequency,
        subscribeToNewsletter: subscribeToNewsletter ? "true" : "false",
        coverFees: coverFees ? "true" : "false",
        customAmount: amount.toString(),
      },
      subscription_data: {
        metadata: {
          donationType: frequency,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating subscription session:", error);
    return NextResponse.json(
      { error: "Failed to create subscription session" },
      { status: 500 },
    );
  }
}
