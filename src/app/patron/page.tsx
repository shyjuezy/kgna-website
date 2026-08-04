import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ORGANIZATION_INFO } from "@/lib/constants";
import { getCmsPage, getSection, listProp, textProp } from "@/lib/cms";
import { resolveDonationProducts } from "@/config/donation-tiers";
import { Heart, Mail, Repeat, Award, Users, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Patron",
  description:
    "Become a KGNA patron with an annual gift that sustains Kashmiri cultural programs, education, and community support year round.",
};

// Icons stay in code - the admin authors the copy, not the iconography.
const BENEFIT_ICONS = [Repeat, Users, Award];

const benefits = [
  {
    icon: Repeat,
    title: "Predictable support",
    body: "An annual commitment lets us plan festivals, classes, and youth programs a year ahead instead of month to month.",
  },
  {
    icon: Users,
    title: "Community reach",
    body: "Patron gifts fund the gatherings that connect Kashmiri families across North America, including those who could not otherwise attend.",
  },
  {
    icon: Award,
    title: "Recognition, if you want it",
    body: "Patrons can be acknowledged in our annual programme, or stay anonymous - it is entirely your choice.",
  },
];

export default async function PatronPage() {
  // Copy comes from the patron page in the admin; the levels stay tied to the
  // annual rows under donate > Tiers so the two can never drift apart.
  const [patron, donate] = await Promise.all([
    getCmsPage("patron"),
    getCmsPage("donate"),
  ]);

  const cmsTiers = listProp<Record<string, unknown>>(
    getSection(donate, "tiers"),
    "items",
    [],
  );
  const annual = resolveDonationProducts(cmsTiers).annual;
  const levels = annual.tiers ?? [];

  const hero = getSection(patron, "hero");
  const why = getSection(patron, "benefits");
  const levelsCopy = getSection(patron, "levels");
  const cta = getSection(patron, "cta");

  const authored = listProp<Record<string, unknown>>(why, "items", []);
  const whyItems = (authored.length ? authored : benefits).map((item, i) => ({
    icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length],
    title: String(item.title ?? ""),
    body: String(item.body ?? ""),
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {textProp(hero, "heading", "Become a Patron")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {textProp(
                hero,
                "body",
                `Patrons make an annual commitment to ${ORGANIZATION_INFO.shortName}. It is the steadiest kind of support we receive, and the reason we can plan a full year of cultural programming.`,
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-10">
              {textProp(why, "heading", "Why patrons matter")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyItems.map((benefit) => (
                <Card key={benefit.title}>
                  <CardContent className="p-6">
                    <benefit.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Levels */}
      {levels.length > 0 ? (
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center mb-4">
                {textProp(levelsCopy, "heading", "Patron levels")}
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                {textProp(
                  levelsCopy,
                  "body",
                  "Every level is an annual gift. Choose the one that fits, or enter your own amount on the donate form.",
                )}
              </p>
              <div className="space-y-4">
                {levels.map((level) => {
                  const isDefault = level.amount === annual.default;

                  return (
                    <Link
                      key={level.amount}
                      href={`/donate?frequency=annual&amount=${level.amount}`}
                      className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                    >
                      <Card
                        className={cn(
                          "transition-all group-hover:shadow-md group-hover:-translate-y-0.5",
                          isDefault
                            ? "ring-2 ring-primary/40"
                            : "group-hover:ring-1 group-hover:ring-primary/20",
                        )}
                      >
                        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                          <p className="text-2xl font-bold text-primary sm:w-32 shrink-0">
                            ${level.amount.toLocaleString("en-US")}
                            <span className="text-sm font-normal text-muted-foreground">
                              /year
                            </span>
                          </p>
                          <p className="text-muted-foreground flex-1">
                            {level.impact}
                          </p>
                          {isDefault ? (
                            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                              Most chosen
                            </span>
                          ) : null}
                          <ChevronRight className="hidden sm:block h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-serif font-bold">
              {textProp(cta, "heading", "Ready to become a patron?")}
            </h2>
            <p className="text-muted-foreground">
              {textProp(
                cta,
                "body",
                "The donate form opens on the annual option. Contributions are tax-deductible to the extent allowed by law.",
              )}{" "}
              {/* Kept out of the CMS field so the link cannot be lost in an edit. */}
              <Link href="/nonprofit-status" className="text-primary underline">
                See our 501(c)(3) status
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/donate?frequency=annual">
                  <Heart className="mr-2 h-5 w-5" />
                  {textProp(cta, "primaryLabel", "Become a patron")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href={`mailto:${ORGANIZATION_INFO.email}?subject=${encodeURIComponent(
                    "Patron enquiry",
                  )}`}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {textProp(cta, "secondaryLabel", "Talk to us first")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
