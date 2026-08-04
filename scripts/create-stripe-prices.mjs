/**
 * Creates the recurring donation Product and its Prices in Stripe, then prints
 * the env block to paste into .env.local / Vercel.
 *
 * Why this exists: when NEXT_PUBLIC_STRIPE_PRICE_* hold placeholder values,
 * create-subscription falls back to creating a fresh Product AND Price on every
 * recurring donation. A hundred $100 patrons become a hundred identical
 * Products, and Stripe can no longer answer "how many annual patrons do we
 * have". Real ids for the fixed tiers fix that; dynamic creation stays as the
 * fallback for genuine custom amounts.
 *
 * Usage:
 *   node --env-file=.env.local scripts/create-stripe-prices.mjs --dry-run
 *   node --env-file=.env.local scripts/create-stripe-prices.mjs
 *   node --env-file=.env.production.local scripts/create-stripe-prices.mjs --live
 *
 * Safe to re-run: the product is matched on metadata and prices on lookup_key,
 * so an existing one is reused rather than duplicated.
 */
import Stripe from "stripe";

const DRY_RUN = process.argv.includes("--dry-run");
const ALLOW_LIVE = process.argv.includes("--live");

const PRODUCT_NAME = "Recurring Donation to KGNA";
const PRODUCT_MARKER = "kgna_recurring_donation";

// Mirrors the fixed tiers in src/config/donation-tiers.ts. $1000 annual is
// included even though the CMS no longer offers that tier: the env var and the
// code's price map still reference it, so leaving it out would leave one
// placeholder behind and one amount still minting a Product per donation.
const TIERS = [
  { interval: "month", envWord: "MONTHLY", key: "monthly", amounts: [10, 25, 50, 100] },
  { interval: "year", envWord: "ANNUAL", key: "annual", amounts: [100, 250, 500, 1000] },
];

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error("STRIPE_SECRET_KEY is not set. Pass one with --env-file=<file>.");
  process.exit(1);
}

const isTestKey = secretKey.startsWith("sk_test_") || secretKey.startsWith("rk_test_");
const isLiveKey = secretKey.startsWith("sk_live_") || secretKey.startsWith("rk_live_");

if (isLiveKey && !ALLOW_LIVE) {
  console.error(
    "Refusing to run: this is a LIVE key.\n" +
      "Run against test mode first. If you really mean live, re-run with --live.",
  );
  process.exit(1);
}
if (ALLOW_LIVE && !isLiveKey) {
  console.error("--live was passed but the key is not a live key. Aborting to avoid confusion.");
  process.exit(1);
}
if (!isTestKey && !isLiveKey) {
  console.error("Unrecognised key prefix - expected sk_test_/sk_live_. Aborting.");
  process.exit(1);
}

const mode = isLiveKey ? "LIVE" : "TEST";
const stripe = new Stripe(secretKey, { apiVersion: "2025-12-15.clover" });

console.log(`\nMode: ${mode}${DRY_RUN ? "  (dry run - nothing will be created)" : ""}\n`);

/** Finds the donation product by marker metadata, creating it if absent. */
async function findOrCreateProduct() {
  for await (const product of stripe.products.list({ limit: 100, active: true })) {
    if (product.metadata?.kgna_role === PRODUCT_MARKER) {
      return { product, created: false };
    }
  }
  if (DRY_RUN) return { product: { id: "prod_(would create)" }, created: true };

  const product = await stripe.products.create({
    name: PRODUCT_NAME,
    description: "Recurring support for KGNA's cultural, educational and community programs.",
    metadata: { kgna_role: PRODUCT_MARKER },
  });
  return { product, created: true };
}

/** Reuses a price by lookup_key so re-running never duplicates. */
async function findOrCreatePrice({ productId, amount, interval, lookupKey }) {
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], limit: 1 });
  if (existing.data.length > 0) {
    return { price: existing.data[0], created: false };
  }
  if (DRY_RUN) return { price: { id: "price_(would create)" }, created: true };

  const price = await stripe.prices.create({
    product: productId,
    unit_amount: amount * 100,
    currency: "usd",
    recurring: { interval },
    lookup_key: lookupKey,
    nickname: `${interval === "month" ? "Monthly" : "Annual"} $${amount}`,
    metadata: { kgna_role: PRODUCT_MARKER },
  });
  return { price, created: true };
}

let product, productCreated;
try {
  ({ product, created: productCreated } = await findOrCreateProduct());
} catch (error) {
  if (error?.type === "StripeAuthenticationError") {
    console.error(
      `Stripe rejected the ${mode} key.\n\n` +
        "STRIPE_SECRET_KEY looks like a placeholder rather than a real key.\n" +
        "Grab a test key from https://dashboard.stripe.com/test/apikeys (starts\n" +
        "with sk_test_) and put it in .env.local, then re-run.\n",
    );
    process.exit(1);
  }
  throw error;
}
console.log(`Product  ${product.id}  ${productCreated ? "created" : "reused"}  (${PRODUCT_NAME})\n`);

const envLines = [];
for (const tier of TIERS) {
  for (const amount of tier.amounts) {
    const lookupKey = `kgna_${tier.key}_${amount}`;
    const { price, created } = await findOrCreatePrice({
      productId: product.id,
      amount,
      interval: tier.interval,
      lookupKey,
    });
    console.log(
      `  ${tier.envWord.padEnd(7)} $${String(amount).padEnd(5)} ${price.id.padEnd(32)} ${created ? "created" : "reused"}`,
    );
    envLines.push(`NEXT_PUBLIC_STRIPE_PRICE_${tier.envWord}_${amount}=${price.id}`);
  }
}

console.log(`\n--- paste into ${mode === "LIVE" ? "Vercel (Production)" : ".env.local"} ---\n`);
console.log(envLines.join("\n"));
console.log(
  DRY_RUN
    ? "\n(dry run - ids above are placeholders; re-run without --dry-run to create)\n"
    : "\nDone. Restart the dev server so the new values are picked up.\n",
);
