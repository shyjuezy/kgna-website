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

      {/* Direct giving. A ledger rail rather than a block: it sits above the
          form, so it has to stay short enough that a donor scrolls past it
          rather than over it. Card is listed for completeness but is not an
          action here - it links down to the form, which is the real control.
          Zelle has no merchant API, so it can only ever be handle-plus-
          instructions: nothing confirms the transfer back to us. */}
      {zelleHandle || paypalUrl ? (
        <section className="pt-4 pb-2">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-lg border bg-card">
              <div className="h-[3px] bg-secondary" />
              <div className="grid divide-y lg:grid-cols-[19rem_repeat(2,minmax(0,1fr))] lg:divide-x lg:divide-y-0">
                {/* The card route has no cell of its own: it is not a choice
                    offered inside this rail, it is the form underneath. Naming
                    it here and linking down costs a line instead of a column,
                    and keeps the rail an accommodation rather than a menu that
                    reopens a decision the donor has already made. */}
                <div className="flex flex-col justify-center p-6">
                  <h2 className="font-serif text-lg font-bold">
                    {textProp(
                      directGiving,
                      "heading",
                      "Rather not use a card?",
                    )}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {textProp(
                      directGiving,
                      "body",
                      "Card gifts \u2014 one-time, monthly or annual \u2014 are handled by the form below.",
                    )}
                  </p>
                  <a
                    href="#donation-form"
                    className="mt-3 self-start border-b border-primary/40 pb-px text-xs font-medium text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Go to the form &rarr;
                  </a>
                </div>

                {zelleHandle ? (
                  <div className="flex flex-col gap-2 p-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-accent">
                      No processing fee
                    </span>
                    <p className="text-sm font-semibold">Zelle</p>
                    <p className="flex-1 text-xs text-muted-foreground">
                      Bank to bank, so the full amount arrives. Include your
                      name so we can match the gift to you.
                    </p>
                    <CopyHandle value={zelleHandle} />
                    <p className="text-[11px] text-muted-foreground">
                      No automatic receipt &mdash; email us and we&apos;ll
                      acknowledge it for your records.
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-col gap-2 p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-accent">
                    Familiar checkout
                  </span>
                  <p className="text-sm font-semibold">PayPal</p>
                  <p className="flex-1 text-xs text-muted-foreground">
                    Pay from your PayPal balance or a card already linked to
                    your account.
                  </p>
                  <PayPalDonateButton
                    href={paypalUrl}
                    label={textProp(directGiving, "paypalLabel", "Donate")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

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
