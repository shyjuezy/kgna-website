export interface DonationTier {
  amount: number;
  impact: string;
}

interface DonationProduct {
  priceId?: string | null;
  amounts: number[];
  default: number;
  prices?: Record<number, string>;
  tiers?: DonationTier[];
}

export const DONATION_PRODUCTS: Record<'one-time' | 'monthly' | 'annual', DonationProduct> = {
  'one-time': {
    priceId: null, // Dynamic amount
    amounts: [25, 50, 100, 250, 500],
    default: 50,
    tiers: [
      {
        amount: 25,
        impact: "Helps preserve Kashmiri language materials for future generations"
      },
      {
        amount: 50,
        impact: "Sponsors a student's participation in cultural education programs"
      },
      {
        amount: 100,
        impact: "Supports community gatherings that connect diaspora families"
      },
      {
        amount: 250,
        impact: "Funds documentary projects preserving oral histories"
      },
      {
        amount: 500,
        impact: "Enables scholarship opportunities for young Kashmiris"
      }
    ]
  },
  'monthly': {
    amounts: [10, 25, 50, 100],
    default: 25,
    // Create recurring prices in Stripe for each
    prices: {
      10: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_10 || 'price_monthly_10',
      25: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_25 || 'price_monthly_25',
      50: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_50 || 'price_monthly_50',
      100: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_100 || 'price_monthly_100',
    },
    tiers: [
      {
        amount: 10,
        impact: "Monthly support for cultural preservation initiatives"
      },
      {
        amount: 25,
        impact: "Sustains ongoing educational programs"
      },
      {
        amount: 50,
        impact: "Provides consistent support for community events"
      },
      {
        amount: 100,
        impact: "Champions major cultural heritage projects"
      }
    ]
  },
  'annual': {
    amounts: [100, 250, 500, 1000],
    default: 250,
    prices: {
      100: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_100 || 'price_annual_100',
      250: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_250 || 'price_annual_250',
      500: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_500 || 'price_annual_500',
      1000: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_1000 || 'price_annual_1000',
    },
    tiers: [
      {
        amount: 100,
        impact: "Annual supporter of cultural preservation"
      },
      {
        amount: 250,
        impact: "Patron of educational initiatives"
      },
      {
        amount: 500,
        impact: "Guardian of heritage programs"
      },
      {
        amount: 1000,
        impact: "Visionary leader in community development"
      }
    ]
  }
};