"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FrequencyToggleProps {
  frequency: "one-time" | "monthly" | "annual";
  onFrequencyChange: (frequency: "one-time" | "monthly" | "annual") => void;
}

export function FrequencyToggle({
  frequency,
  onFrequencyChange,
}: FrequencyToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Donation Frequency</label>
      <Tabs
        value={frequency}
        onValueChange={(value) => onFrequencyChange(value as typeof frequency)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="one-time">One-Time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          {/* Inline rather than absolutely positioned. Floating it above the
              tab either overflowed into the neighbouring tab (-right-2) or
              overlapped this tab's own label (-top-2), because the tab strip is
              not tall enough to clear a badge. */}
          <TabsTrigger value="annual" className="gap-1.5">
            Annual
            <span className="hidden whitespace-nowrap rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground sm:inline-block">
              Most Impact
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
