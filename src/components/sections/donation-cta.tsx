"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Heart, Repeat, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const donationAmounts = [25, 50, 100, 250];

// Kept in step with the three benefits on /patron so the promise made here is
// the one the landing page actually explains.
const patronBenefits = [
  { icon: Heart, label: "Tax-deductible" },
  { icon: Repeat, label: "Funds a full year of programmes" },
  { icon: Award, label: "Recognition, if you want it" },
];

type DonationCTAProps = {
  heading?: string;
  body?: string;
  patronHeading?: string;
  patronBody?: string;
  cta?: string;
  ctaHref?: string;
};

export function DonationCTA({
  heading = "Support Our Mission",
  body = "Your generosity helps us preserve Kashmiri heritage, support our community, and create lasting connections for future generations.",
  patronHeading = "Become a Patron",
  patronBody = "Patrons make an annual commitment that lets us plan festivals, classes, and youth programs a year ahead instead of month to month.",
  cta = "Become a Patron",
  // Lands on the donation form with the annual (patron) frequency preselected.
  ctaHref = "/donate?frequency=annual",
}: DonationCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {body}
          </p>

          {/* Quick Donation Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {donationAmounts.map((amount) => (
              <Button
                key={amount}
                asChild
                variant="outline"
                size="lg"
                className="min-w-[100px] hover:bg-primary hover:text-primary-foreground"
              >
                <Link href={`/donate?frequency=one-time&amount=${amount}`}>
                  ${amount}
                </Link>
              </Button>
            ))}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[100px] hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/donate?frequency=one-time">Custom</Link>
            </Button>
          </div>

          {/* Patron CTA - the headline ask of this section */}
          <div className="relative overflow-hidden rounded-2xl bg-card p-8 md:p-10 shadow-lg ring-1 ring-primary/15">
            {/* Accent rule that lifts the card above the plain white it was */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-primary/60 to-secondary"
            />

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Patron programme
            </span>

            <h3 className="mt-5 text-2xl md:text-3xl font-serif font-bold">
              {patronHeading}
            </h3>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              {patronBody}
            </p>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              {patronBenefits.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary/5 ring-1 ring-primary/10 px-3 py-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Link href={ctaHref}>
                <Heart className="mr-2 h-5 w-5" />
                {cta}
              </Link>
            </Button>

            {/* Monthly giving still exists - keep a way in now that the primary
                action points at the patron page instead. */}
            <p className="mt-4 text-sm text-muted-foreground">
              Prefer to give monthly?{" "}
              <Link
                href="/donate?frequency=monthly"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Set up a recurring gift
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
