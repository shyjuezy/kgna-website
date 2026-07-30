import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ORGANIZATION_INFO } from "@/lib/constants";
import { getCmsPage, getSection, listProp } from "@/lib/cms";
import { resolveDonationProducts } from "@/config/donation-tiers";
import { Heart, Mail, Repeat, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Patron",
  description:
    "Become a KGNA patron with an annual gift that sustains Kashmiri cultural programs, education, and community support year round.",
};

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
  // Patron levels are the annual tiers, so they stay in step with whatever is
  // authored in the admin (donate > Tiers) rather than being duplicated here.
  const content = await getCmsPage("donate");
  const cmsTiers = listProp<Record<string, unknown>>(
    getSection(content, "tiers"),
    "items",
    [],
  );
  const annual = resolveDonationProducts(cmsTiers).annual;
  const levels = annual.tiers ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Become a Patron
            </h1>
            <p className="text-lg text-muted-foreground">
              Patrons make an annual commitment to {ORGANIZATION_INFO.shortName}
              . It is the steadiest kind of support we receive, and the reason
              we can plan a full year of cultural programming.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-10">
              Why patrons matter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center mb-4">
                Patron levels
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Every level is an annual gift. Choose the one that fits, or
                enter your own amount on the donate form.
              </p>
              <div className="space-y-4">
                {levels.map((level) => (
                  <Card key={level.amount}>
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <p className="text-2xl font-bold text-primary sm:w-32 shrink-0">
                        ${level.amount.toLocaleString("en-US")}
                        <span className="text-sm font-normal text-muted-foreground">
                          /year
                        </span>
                      </p>
                      <p className="text-muted-foreground">{level.impact}</p>
                    </CardContent>
                  </Card>
                ))}
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
              Ready to become a patron?
            </h2>
            <p className="text-muted-foreground">
              The donate form opens on the annual option. Contributions are
              tax-deductible to the extent allowed by law - see our{" "}
              <Link href="/nonprofit-status" className="text-primary underline">
                501(c)(3) status
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Become a patron
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href={`mailto:${ORGANIZATION_INFO.email}?subject=${encodeURIComponent(
                    "Patron enquiry",
                  )}`}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Talk to us first
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
