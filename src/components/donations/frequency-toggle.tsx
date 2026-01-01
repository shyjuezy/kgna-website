"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FrequencyToggleProps {
  frequency: 'one-time' | 'monthly' | 'annual';
  onFrequencyChange: (frequency: 'one-time' | 'monthly' | 'annual') => void;
}

export function FrequencyToggle({ frequency, onFrequencyChange }: FrequencyToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Donation Frequency</label>
      <Tabs value={frequency} onValueChange={(value) => onFrequencyChange(value as typeof frequency)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="one-time">One-Time</TabsTrigger>
          <TabsTrigger value="monthly" className="relative">
            Monthly
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
              Most Impact
            </span>
          </TabsTrigger>
          <TabsTrigger value="annual">Annual</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}