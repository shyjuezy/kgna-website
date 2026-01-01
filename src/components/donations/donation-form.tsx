"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FrequencyToggle } from "./frequency-toggle";
import { AmountSelector } from "./amount-selector";
import { DonorInfoForm } from "./donor-info-form";
import { DONATION_PRODUCTS } from "@/config/donation-tiers";
import { Heart, Shield, Loader2 } from "lucide-react";
import type { DonationFormData, DonorInfo } from "@/types";

interface DonationFormProps {
  defaultFrequency?: 'one-time' | 'monthly' | 'annual';
  defaultAmount?: number;
}

export function DonationForm({ defaultFrequency = 'one-time', defaultAmount }: DonationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'annual'>(defaultFrequency);
  const [amount, setAmount] = useState(defaultAmount || DONATION_PRODUCTS[frequency].default);
  const [coverFees, setCoverFees] = useState(false);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isHonorarium: false,
    honorariumName: '',
    subscribeToNewsletter: true
  });

  const processingFeePercent = 0.03;
  const processingFee = Math.round(amount * processingFeePercent * 100) / 100;
  const totalAmount = coverFees ? amount + processingFee : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (amount < 1) {
      alert('Please select a donation amount');
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = frequency === 'one-time'
        ? '/api/stripe/create-checkout'
        : '/api/stripe/create-subscription';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frequency,
          amount: totalAmount,
          coverFees,
          donorInfo,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your donation. Please try again.');
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
              setAmount(DONATION_PRODUCTS[f].default);
            }}
          />

          <AmountSelector
            frequency={frequency}
            selectedAmount={amount}
            onAmountChange={setAmount}
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
                  Your donation will cover the transaction costs so 100% goes to our programs
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donor Information */}
      <Card>
        <CardHeader>
          <CardTitle>Donor Information</CardTitle>
          <CardDescription>
            We&apos;ll email you a receipt for your donation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DonorInfoForm donorInfo={donorInfo} onChange={setDonorInfo} />
        </CardContent>
      </Card>

      {/* Summary & Submit */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Donation Amount</span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
            {coverFees && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Processing Fee</span>
                <span className="font-medium">${processingFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-primary">
                ${totalAmount.toFixed(2)}
                {frequency !== 'one-time' && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    /{frequency === 'monthly' ? 'month' : 'year'}
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
                  {frequency === 'one-time' ? 'Donate Now' : `Start ${frequency} Donation`}
                </>
              )}
            </Button>

            <div className="flex flex-col items-center space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Secure donation powered by Stripe</span>
              </div>
              <p>KGNA is a 501(c)(3) tax-exempt organization</p>
              <p>Your donation is tax-deductible to the fullest extent allowed by law</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}