"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { DonorInfo } from "@/types";

interface DonorInfoFormProps {
  donorInfo: DonorInfo;
  onChange: (info: DonorInfo) => void;
}

export function DonorInfoForm({ donorInfo, onChange }: DonorInfoFormProps) {
  const handleChange = (field: keyof DonorInfo, value: string | boolean | undefined) => {
    onChange({
      ...donorInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Your Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={donorInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={donorInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={donorInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={donorInfo.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="honorarium"
            checked={donorInfo.isHonorarium}
            onCheckedChange={(checked) => handleChange('isHonorarium', checked)}
          />
          <Label
            htmlFor="honorarium"
            className="text-sm font-normal cursor-pointer"
          >
            Make this donation in honor or memory of someone
          </Label>
        </div>

        {donorInfo.isHonorarium && (
          <div className="ml-6 space-y-2">
            <Label htmlFor="honorariumName">Name</Label>
            <Input
              id="honorariumName"
              placeholder="In honor/memory of..."
              value={donorInfo.honorariumName || ''}
              onChange={(e) => handleChange('honorariumName', e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={donorInfo.subscribeToNewsletter}
            onCheckedChange={(checked) => handleChange('subscribeToNewsletter', checked)}
          />
          <Label
            htmlFor="newsletter"
            className="text-sm font-normal cursor-pointer"
          >
            I&apos;d like to receive updates about KGNA&apos;s work and impact
          </Label>
        </div>
      </div>
    </div>
  );
}