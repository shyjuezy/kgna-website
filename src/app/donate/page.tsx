import { Metadata } from "next";
import Image from "next/image";
import { DonationForm } from "@/components/donations/donation-form";
import { PayPalDonateButton } from "@/components/donations/paypal-donate-button";
import { CopyHandle } from "@/components/donations/copy-handle";
import {
  getCmsPage,
  getSection,
  linesProp,
  listProp,
  optionalTextProp,
  textProp,
} from "@/lib/cms";
import type { DonationFrequency } from "@/config/donation-tiers";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import {
  ArrowDown,
  CreditCard,
  Globe,
  Heart,
  Lock,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Donate - Support Our Mission",
  description:
    "Support KGNA's mission to preserve Kashmiri culture and identity through your generous donation.",
};

const reasons = [
  {
    icon: Heart,
    title: "Preserve Heritage",
    description:
      "Help maintain and pass on Kashmiri traditions to future generations",
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Support programs that bring the Kashmiri diaspora together",
  },
  {
    icon: TrendingUp,
    title: "Enable Growth",
    description: "Fund educational initiatives and cultural events",
  },
  {
    icon: Globe,
    title: "Expand Reach",
    description: "Help us serve more communities across North America",
  },
];

/** "annual"/"yearly" -> annual, "monthly" -> monthly, anything else -> undefined. */
function parseFrequency(value: unknown): DonationFrequency | undefined {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (raw === "monthly") return "monthly";
  if (raw === "annual" || raw === "annually" || raw === "yearly")
    return "annual";
  if (raw === "one-time" || raw === "once") return "one-time";
  return undefined;
}

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const content = await getCmsPage("donate");
  const hero = getSection(content, "hero");
  const support =
    getSection(content, "support") ?? getSection(content, "reasons");
  const tax = getSection(content, "tax") ?? getSection(content, "taxInfo");
  const otherWays = getSection(content, "otherWays");
  const directGiving = getSection(content, "directGiving");
  // Defaulted in code, not just seeded: the donate page already exists in the
  // CMS and seedDefaults() only inserts missing pages, so a seed-only value
  // would never reach this page. Handle taken from the Zelle popup on the
  // current kgna.us site.
  const zelleHandle = textProp(
    directGiving,
    "zelleHandle",
    "treasurer@kgna.us",
  ).trim();
  // The button always renders; the real target arrives from the CMS. Until
  // directGiving.paypalUrl is set in the admin to the hosted donate link from
  // the KGNA PayPal business account, this falls back to PayPal's home page -
  // which is not a donation destination, so set it before promoting PayPal.
  const paypalUrl = textProp(
    directGiving,
    "paypalUrl",
    "https://www.paypal.com/",
  ).trim();
  const supportReasons = listProp(support, "items", reasons);
  // Amount + impact rows are authored in the admin (donate > Tiers > Items).
  // Empty falls back to the built-in tiers in @/config/donation-tiers.
  const tiersSection = getSection(content, "tiers");
  const donationTiers = listProp<Record<string, unknown>>(
    tiersSection,
    "items",
    [],
  );
  // Links elsewhere on the site preselect a frequency/amount, e.g. the home
  // patron CTA sends ?frequency=annual. Anything unparseable falls through to
  // the form's own defaults rather than erroring.
  const requestedFrequency = parseFrequency(params.frequency);
  const requestedAmountRaw = Number.parseFloat(
    String(
      Array.isArray(params.amount) ? params.amount[0] : (params.amount ?? ""),
    ),
  );
  const requestedAmount =
    Number.isFinite(requestedAmountRaw) &&
    requestedAmountRaw > 0 &&
    requestedAmountRaw <= 100000
      ? requestedAmountRaw
      : undefined;

  const otherWayItems = linesProp(otherWays, "items", [
    "Donor Advised Funds",
    "Corporate Matching",
    "Legacy Giving",
    "Stock Donations",
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {textProp(hero, "heading", "Support Our Mission")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {textProp(
                hero,
                "body",
                "Your generosity helps preserve Kashmiri heritage and strengthens our community across North America",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Card-led rail. Card is the primary route, so it takes the wide cell
          and the only filled button, which jumps to the form below. Zelle and
          PayPal are an accommodation in a narrower column; PayPal uses its
          white plate so the gold doesn't outshout the card button. Zelle has
          no merchant API, so it can only ever be handle-plus-instructions:
          nothing confirms the transfer back to us.
          The card copy reads cardHeading/cardBody rather than heading/body:
          those older keys described a "not a card" cell and may still hold
          that text in the CMS. */}
      <section className="pt-4 pb-2">
        <div className="container mx-auto px-4">
          <div
            className={`grid overflow-hidden rounded-lg border bg-card ${
              zelleHandle || paypalUrl ? "lg:grid-cols-[1.35fr_1fr]" : ""
            }`}
          >
            <div className="flex flex-col justify-center gap-2.5 bg-gradient-to-br from-primary/5 to-card p-6 lg:p-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-accent">
                Recommended
              </span>
              <h2 className="font-serif text-2xl font-bold">
                {textProp(directGiving, "cardHeading", "Donate by card")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {textProp(
                  directGiving,
                  "cardBody",
                  "One-time, monthly or annual. We\u2019ll email you a receipt for your records.",
                )}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href="#donation-form"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
                >
                  <CreditCard className="h-[18px] w-[18px]" />
                  Donate by card
                  <ArrowDown className="h-4 w-4" />
                </a>
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Secure checkout via Stripe &middot; All major cards
                </span>
              </div>
            </div>

            {zelleHandle || paypalUrl ? (
              <div className="flex flex-col justify-center gap-2.5 border-t p-6 lg:border-l lg:border-t-0">
                <p className="text-xs font-semibold">
                  {textProp(
                    directGiving,
                    "altHeading",
                    "Prefer not to use a card?",
                  )}
                </p>
                {zelleHandle ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">Zelle</span>
                      <div className="min-w-0 flex-1">
                        <CopyHandle value={zelleHandle} />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      No fee. Add your name in the memo; email us for a
                      receipt.
                    </p>
                  </>
                ) : null}
                {zelleHandle && paypalUrl ? (
                  <hr className="border-dashed" />
                ) : null}
                {paypalUrl ? (
                  <PayPalDonateButton
                    href={paypalUrl}
                    variant="white"
                    label={textProp(directGiving, "paypalLabel", "Donate")}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Why Donate Section */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">
                  {textProp(support, "heading", "Why Your Support Matters")}
                </h2>
                <div className="space-y-4">
                  {supportReasons.map((reason, index) => {
                    const Icon = reasons[index]?.icon ?? Heart;
                    return (
                      <div key={reason.title} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{reason.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tax Info */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">
                  {textProp(tax, "heading", "Tax-Deductible Giving")}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {textProp(
                    tax,
                    "body",
                    "KGNA is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the fullest extent allowed by law.",
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {textProp(
                    tax,
                    "ein",
                    textProp(
                      tax,
                      "note",
                      "EIN: XX-XXXXXXX (will be provided on your receipt)",
                    ),
                  )}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={
                    optionalTextProp(support, "image") ??
                    PLACEHOLDER_IMAGES.community
                  }
                  alt="KGNA Community"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Other Ways to Give */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">
                  {textProp(otherWays, "heading", "Other Ways to Give")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {otherWayItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="text-sm mt-4">
                  {textProp(otherWays, "contactLabel", "Contact us at")}{" "}
                  <a
                    href={`mailto:${textProp(otherWays, "email", textProp(otherWays, "contactEmail", "donate@kgna.us"))}`}
                    className="text-primary hover:underline"
                  >
                    {textProp(
                      otherWays,
                      "email",
                      textProp(otherWays, "contactEmail", "donate@kgna.us"),
                    )}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div id="donation-form" className="lg:col-span-2 space-y-6 scroll-mt-20">
              <DonationForm
                tiers={donationTiers}
                defaultFrequency={requestedFrequency}
                defaultAmount={requestedAmount}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
