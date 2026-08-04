export interface DonationTier {
  amount: number;
  impact: string;
}

export interface DonationProduct {
  priceId?: string | null;
  amounts: number[];
  default: number;
  prices?: Record<number, string>;
  tiers?: DonationTier[];
}

export const DONATION_PRODUCTS: Record<
  "one-time" | "monthly" | "annual",
  DonationProduct
> = {
  "one-time": {
    priceId: null, // Dynamic amount
    amounts: [25, 50, 100, 250, 500],
    default: 50,
    tiers: [
      {
        amount: 25,
        impact:
          "Helps preserve Kashmiri language materials for future generations",
      },
      {
        amount: 50,
        impact:
          "Sponsors a student's participation in cultural education programs",
      },
      {
        amount: 100,
        impact: "Supports community gatherings that connect diaspora families",
      },
      {
        amount: 250,
        impact: "Funds documentary projects preserving oral histories",
      },
      {
        amount: 500,
        impact: "Enables scholarship opportunities for young Kashmiris",
      },
    ],
  },
  monthly: {
    amounts: [10, 25, 50, 100],
    default: 25,
    // Create recurring prices in Stripe for each
    prices: {
      10: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_10 || "price_monthly_10",
      25: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_25 || "price_monthly_25",
      50: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_50 || "price_monthly_50",
      100:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_100 || "price_monthly_100",
    },
    tiers: [
      {
        amount: 10,
        impact: "Monthly support for cultural preservation initiatives",
      },
      {
        amount: 25,
        impact: "Sustains ongoing educational programs",
      },
      {
        amount: 50,
        impact: "Provides consistent support for community events",
      },
      {
        amount: 100,
        impact: "Champions major cultural heritage projects",
      },
    ],
  },
  annual: {
    amounts: [100, 250, 500, 1000],
    default: 100,
    prices: {
      100:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_100 || "price_annual_100",
      250:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_250 || "price_annual_250",
      500:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_500 || "price_annual_500",
      1000:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL_1000 || "price_annual_1000",
    },
    tiers: [
      {
        amount: 100,
        impact: "Annual supporter of cultural preservation",
      },
      {
        amount: 250,
        impact: "Patron of educational initiatives",
      },
      {
        amount: 500,
        impact: "Guardian of heritage programs",
      },
      {
        amount: 1000,
        impact: "Visionary leader in community development",
      },
    ],
  },
};
export type DonationFrequency = "one-time" | "monthly" | "annual";

/** One row as authored in the admin (all values arrive as strings). */
export type CmsDonationTier = {
  frequency?: unknown;
  amount?: unknown;
  impact?: unknown;
  /**
   * Marks this row as the preselected amount for its frequency. The admin has
   * no field for this yet - until it does, nothing sets it and the built-in
   * default in DONATION_PRODUCTS wins. Accepts a checkbox boolean or the
   * string a text input would send.
   */
  default?: unknown;
  isDefault?: unknown;
};

function isTruthyFlag(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const raw = value.trim().toLowerCase();
    return raw === "true" || raw === "yes" || raw === "1";
  }
  return value === 1;
}

function normalizeFrequency(value: unknown): DonationFrequency {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (raw === "monthly") return "monthly";
  if (raw === "annual" || raw === "annually" || raw === "yearly")
    return "annual";
  return "one-time";
}

function normalizeAmount(value: unknown): number | null {
  const raw = typeof value === "string" ? value : String(value ?? "");
  const parsed = Number.parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/**
 * Applies admin-authored amount/impact rows on top of the built-in tiers.
 *
 * Amounts are safe to edit freely: recurring donations create their Stripe price
 * on demand, so a new amount needs no Stripe setup. Frequencies with no rows in
 * the CMS keep their built-in defaults.
 */
export function resolveDonationProducts(
  cmsTiers?: CmsDonationTier[],
): Record<DonationFrequency, DonationProduct> {
  if (!cmsTiers?.length) {
    return DONATION_PRODUCTS;
  }

  const grouped: Record<DonationFrequency, DonationTier[]> = {
    "one-time": [],
    monthly: [],
    annual: [],
  };

  // An admin-flagged default, per frequency. First flagged row wins so a
  // double-tick cannot make the preselected amount depend on row order.
  const flaggedDefault: Partial<Record<DonationFrequency, number>> = {};

  for (const row of cmsTiers) {
    const amount = normalizeAmount(row.amount);
    if (amount === null) continue;
    const frequency = normalizeFrequency(row.frequency);
    grouped[frequency].push({
      amount,
      impact: typeof row.impact === "string" ? row.impact.trim() : "",
    });
    if (
      flaggedDefault[frequency] === undefined &&
      (isTruthyFlag(row.default) || isTruthyFlag(row.isDefault))
    ) {
      flaggedDefault[frequency] = amount;
    }
  }

  const frequencies: DonationFrequency[] = ["one-time", "monthly", "annual"];
  const resolved = {} as Record<DonationFrequency, DonationProduct>;

  for (const frequency of frequencies) {
    const base = DONATION_PRODUCTS[frequency];
    const rows = grouped[frequency];

    if (!rows.length) {
      resolved[frequency] = base;
      continue;
    }

    const sorted = [...rows].sort((a, b) => a.amount - b.amount);
    const amounts = sorted.map((tier) => tier.amount);
    resolved[frequency] = {
      ...base,
      amounts,
      // An admin-flagged row wins; otherwise keep the previous default when the
      // editor left it in the list, falling back to the smallest amount.
      default:
        flaggedDefault[frequency] ??
        (amounts.includes(base.default) ? base.default : amounts[0]),
      tiers: sorted,
    };
  }

  return resolved;
}
