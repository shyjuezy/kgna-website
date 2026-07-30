import type { ReactNode } from "react";
import { LEGAL_INFO, ORGANIZATION_INFO } from "@/lib/constants";

type LegalPageShellProps = {
  title: string;
  intro: string;
  effectiveDate: string;
  children: ReactNode;
};

export function LegalPageShell({
  title,
  intro,
  effectiveDate,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">{intro}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Last updated: {effectiveDate}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">{children}</div>
        </div>
      </section>
    </div>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-serif font-bold">{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}

/**
 * Postal contact details for the legal pages. The street address is only
 * printed once LEGAL_INFO.mailingAddressConfirmed is true, so these pages never
 * publish the scaffold placeholder as an address for legal notices.
 */
export function LegalContactBlock() {
  return (
    <p>
      <strong>{ORGANIZATION_INFO.name}</strong>
      <br />
      {LEGAL_INFO.mailingAddressConfirmed ? (
        <>
          {ORGANIZATION_INFO.address.street}
          <br />
          {ORGANIZATION_INFO.address.city}, {ORGANIZATION_INFO.address.state}{" "}
          {ORGANIZATION_INFO.address.zip}
          <br />
        </>
      ) : null}
      <a href={`mailto:${ORGANIZATION_INFO.email}`}>
        {ORGANIZATION_INFO.email}
      </a>
    </p>
  );
}
