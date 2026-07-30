"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DONATION_PRODUCTS } from "@/config/donation-tiers";
import type { DonationProduct } from "@/config/donation-tiers";
import { cn } from "@/lib/utils";

interface AmountSelectorProps {
  frequency: 'one-time' | 'monthly' | 'annual';
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
  /** Resolved config (CMS overrides applied). Falls back to the built-ins. */
  config?: DonationProduct;
}

export function AmountSelector({ frequency, selectedAmount, onAmountChange, config: configProp }: AmountSelectorProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const config = configProp ?? DONATION_PRODUCTS[frequency];
  const amounts = config.amounts;
  const tiers = config.tiers;

  const handlePresetClick = (amount: number) => {
    setIsCustom(false);
    setCustomAmount("");
    onAmountChange(amount);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    const amount = parseInt(customAmount) || 0;
    if (amount > 0) {
      onAmountChange(amount);
    }
  };

  const handleCustomChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    const amount = parseInt(numericValue) || 0;
    if (amount > 0) {
      onAmountChange(amount);
    }
  };

  const getImpactMessage = (amount: number) => {
    const tier = tiers?.find(t => t.amount === amount);
    return tier?.impact || "";
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Select Amount</label>

      {/* Preset Amounts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {amounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant={selectedAmount === amount && !isCustom ? "default" : "outline"}
            className={cn(
              "h-16",
              selectedAmount === amount && !isCustom && "bg-primary hover:bg-primary/90"
            )}
            onClick={() => handlePresetClick(amount)}
          >
            ${amount}
          </Button>
        ))}
        <Button
          type="button"
          variant={isCustom ? "default" : "outline"}
          className={cn(
            "h-16",
            isCustom && "bg-primary hover:bg-primary/90"
          )}
          onClick={() => {
            setIsCustom(true);
          }}
        >
          Custom
        </Button>
      </div>

      {/* Custom Amount Input */}
      {isCustom && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              type="text"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              onBlur={handleCustomClick}
              className="pl-7"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Impact Message */}
      {selectedAmount > 0 && !isCustom && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {getImpactMessage(selectedAmount) || `Your $${selectedAmount} donation makes a difference!`}
          </p>
        </div>
      )}

      {/* Monthly/Annual Savings Message */}
      {frequency === 'monthly' && (
        <p className="text-xs text-muted-foreground text-center">
          Monthly donations provide sustainable support for our programs
        </p>
      )}
      {frequency === 'annual' && (
        <p className="text-xs text-muted-foreground text-center">
          Save time with an annual donation and provide year-long support
        </p>
      )}
    </div>
  );
}