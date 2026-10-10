"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FrequencyToggle } from "./frequency-toggle";
import { AmountSelector } from "./amount-selector";
import { resolveDonationProducts } from "@/config/donation-tiers";
import type { CmsDonationTier } from "@/config/donation-tiers";
import { Heart, Shield, Loader2 } from "lucide-react";

interface DonationFormProps {
  defaultFrequency?: "one-time" | "monthly" | "annual";
  defaultAmount?: number;
  /** Amount + impact rows authored in the admin. */
  tiers?: CmsDonationTier[];
}

// Annual is the default: it is the frequency we promote as "Most Impact".
// Name, email and an optional honor/memory dedication are collected on the
// Stripe Checkout page, so this form is only the gift itself and one click.
export function DonationForm({
  defaultFrequency = "annual",
  defaultAmount,
  tiers,
}: DonationFormProps) {
  const products = resolveDonationProducts(tiers);
  const [isLoading, setIsLoading] = useState(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "annual">(
    defaultFrequency,
  );
  const [amount, setAmount] = useState(
    defaultAmount || products[defaultFrequency].default,
  );
  const [coverFees, setCoverFees] = useState(false);
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);

  const processingFeePercent = 0.03;
  const processingFee = Math.round(amount * processingFeePercent * 100) / 100;
  const totalAmount = coverFees ? amount + processingFee : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 1) {
      alert("Please select a donation amount");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint =
        frequency === "one-time"
          ? "/api/stripe/create-checkout"
          : "/api/stripe/create-subscription";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          frequency,
          amount: totalAmount,
          coverFees,
          subscribeToNewsletter,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Frequency Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Support</CardTitle>
          <CardDescription>
            Select how you&apos;d like to support our mission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FrequencyToggle
            frequency={frequency}
            onFrequencyChange={(f) => {
              setFrequency(f);
              setAmount(products[f].default);
            }}
          />

          <AmountSelector
            frequency={frequency}
            selectedAmount={amount}
            onAmountChange={setAmount}
            config={products[frequency]}
          />

          {/* Processing Fee Option */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="coverFees"
                checked={coverFees}
                onCheckedChange={(checked) => setCoverFees(checked as boolean)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="coverFees"
                  className="text-sm font-normal cursor-pointer"
                >
                  Cover processing fees (${processingFee.toFixed(2)})
                </Label>
                <p className="text-xs text-muted-foreground">
                  Your donation will cover the transaction costs so 100% goes to
                  our programs
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribeToNewsletter"
              checked={subscribeToNewsletter}
              onCheckedChange={(checked) =>
                setSubscribeToNewsletter(checked as boolean)
              }
            />
            <Label
              htmlFor="subscribeToNewsletter"
              className="text-sm font-normal cursor-pointer"
            >
              I&apos;d like to receive updates about KGNA&apos;s work and impact
            </Label>
          </div>

          {/* Summary & Submit */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Donation Amount
              </span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
            {coverFees && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Processing Fee
                </span>
                <span className="font-medium">${processingFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-primary">
                ${totalAmount.toFixed(2)}
                {frequency !== "one-time" && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    /{frequency === "monthly" ? "month" : "year"}
                  </span>
                )}
              </span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  {frequency === "one-time"
                    ? "Donate Now"
                    : `Start ${frequency} donation`}
                </>
              )}
            </Button>

            <div className="flex flex-col items-center space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>
                  Next: your name and card on Stripe&apos;s secure checkout
                </span>
              </div>
              <p>KGNA is a 501(c)(3) tax-exempt organization</p>
              <p>
                Your donation is tax-deductible to the fullest extent allowed by
                law
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
