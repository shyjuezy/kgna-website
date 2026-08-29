import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { Heart, Users, TrendingUp, Globe } from "lucide-react";

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
  // No placeholder link: the band below renders PayPal as "opening soon" copy
  // when this is unset, so an unconfigured method is a sentence rather than a
  // button that goes nowhere. Set directGiving.paypalUrl in the admin with the
  // hosted donate link from the KGNA PayPal business account.
  const paypalUrl = textProp(directGiving, "paypalUrl", "").trim();
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
            <div className="lg:col-span-2 space-y-6">
              {/* Patron route for donors who want the annual commitment. */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Prefer an annual commitment? Patrons fund a full year of
                  programming.
                </p>
                <Button asChild variant="outline" className="shrink-0">
                  <Link href="/patron">Become a patron</Link>
                </Button>
              </div>
              <DonationForm
                tiers={donationTiers}
                defaultFrequency={requestedFrequency}
                defaultAmount={requestedAmount}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Direct giving. Promoted out of the sidebar into a full-width band so
          card, Zelle and PayPal read as three peers rather than the form plus
          two footnotes - and so the page closes on something other than the
          submit button. Zelle has no merchant API, so it can only ever be
          handle-plus-instructions: nothing confirms the transfer back to us. */}
      {zelleHandle || paypalUrl ? (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-lg bg-secondary px-6 py-10 sm:px-8 sm:py-12">
              {/* Khatamband, the interlocking lattice of a Kashmiri ceiling. */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
              >
                <defs>
                  <pattern
                    id="khatamband"
                    width="28"
                    height="28"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 14 L14 0 L28 14 L14 28 Z"
                      fill="none"
                      stroke="#FFC439"
                      strokeWidth="1"
                    />
                    <path
                      d="M14 0 V28 M0 14 H28"
                      stroke="#FFC439"
                      strokeWidth="0.6"
                      opacity="0.55"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#khatamband)" />
              </svg>

              <div className="relative mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-2xl font-bold text-secondary-foreground sm:text-3xl">
                    {textProp(
                      directGiving,
                      "heading",
                      "Three ways to send your gift",
                    )}
                  </h2>
                  <p className="mt-2 text-sm text-secondary-foreground/70">
                    {textProp(
                      directGiving,
                      "body",
                      "Use whichever you already trust - all three reach the same place.",
                    )}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Card is not an action here: the form above already is. */}
                  <div className="flex flex-col gap-3 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFC439]">
                      Above, on this page
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-secondary-foreground">
                      Card
                    </h3>
                    <p className="flex-1 text-sm text-secondary-foreground/70">
                      One-time, monthly or annual, with an emailed receipt and
                      an instant tax acknowledgement.
                    </p>
                    <div className="grid h-11 place-items-center rounded-md border border-white/20 text-sm text-secondary-foreground/60">
                      Use the form above
                    </div>
                  </div>

                  {zelleHandle ? (
                    <div className="flex flex-col gap-3 rounded-lg border border-white/15 bg-white/[0.06] p-6">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFC439]">
                        No processing fee
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-secondary-foreground">
                        Zelle
                      </h3>
                      <p className="flex-1 text-sm text-secondary-foreground/70">
                        {textProp(
                          directGiving,
                          "zelleNote",
                          "Bank to bank, so the full amount arrives. Include your name so we can match the gift to you.",
                        )}
                      </p>
                      <CopyHandle value={zelleHandle} />
                      <p className="text-xs text-secondary-foreground/60">
                        {textProp(
                          directGiving,
                          "zelleReceiptNote",
                          "Zelle sends no receipt - email us and we will send an acknowledgement for your records.",
                        )}
                      </p>
                    </div>
                  ) : null}

                  {paypalUrl ? (
                    <div className="flex flex-col gap-3 rounded-lg border border-white/15 bg-white/[0.06] p-6">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFC439]">
                        Familiar checkout
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-secondary-foreground">
                        PayPal
                      </h3>
                      <p className="flex-1 text-sm text-secondary-foreground/70">
                        Pay from your PayPal balance or a linked card, without
                        re-entering your details.
                      </p>
                      <PayPalDonateButton
                        href={paypalUrl}
                        label={textProp(directGiving, "paypalLabel", "Donate")}
                      />
                    </div>
                  ) : (
                    /* Unset is a designed state, not a disabled button: a
                       method that cannot take money should not look like a
                       control a donor can press. */
                    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-6">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFC439]">
                        Opening soon
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-secondary-foreground">
                        PayPal
                      </h3>
                      <p className="flex-1 text-sm text-secondary-foreground/70">
                        We are finishing setup with PayPal. Until then, card and
                        Zelle both work today.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
