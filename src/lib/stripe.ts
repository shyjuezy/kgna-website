import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

/**
 * Donor details are collected on the Stripe Checkout page rather than on our
 * form, which keeps the donate page to amount + one click. Stripe already asks
 * for email, and card payments ask for the cardholder name, so there is no
 * separate name field (it made card donors type their name twice). Email and
 * name come back on the completed session as customer_details, and the
 * optional dedication as custom_fields[key="tribute"].
 */
export const donorCheckoutFields = {
  submit_type: 'donate',
  custom_fields: [
    {
      key: 'tribute',
      label: { type: 'custom', custom: 'In honor or memory of' },
      type: 'text',
      optional: true,
    },
  ],
} satisfies Pick<
  Stripe.Checkout.SessionCreateParams,
  'submit_type' | 'custom_fields'
>;
