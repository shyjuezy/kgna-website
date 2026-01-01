"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const donationAmounts = [25, 50, 100, 250];

export function DonationCTA() {
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
            Support Our Mission
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your generosity helps us preserve Kashmiri heritage, support our community,
            and create lasting connections for future generations.
          </p>

          {/* Quick Donation Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {donationAmounts.map((amount) => (
              <Link key={amount} href={`/donate?amount=${amount}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[100px] hover:bg-primary hover:text-primary-foreground"
                >
                  ${amount}
                </Button>
              </Link>
            ))}
            <Link href="/donate">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[100px] hover:bg-primary hover:text-primary-foreground"
              >
                Custom
              </Button>
            </Link>
          </div>

          {/* Monthly Support CTA */}
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Become a Monthly Supporter</h3>
            <p className="text-muted-foreground mb-6">
              Join our community of sustaining donors and make a lasting impact with
              regular monthly contributions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm">Tax-deductible</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">Join 500+ donors</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm">Maximum impact</span>
              </div>
            </div>

            <Link href="/donate?frequency=monthly">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Heart className="mr-2 h-5 w-5" />
                Become a Monthly Supporter
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}