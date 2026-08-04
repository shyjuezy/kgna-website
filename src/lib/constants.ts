// Fallback figures for the "Our Impact" section, used only when the CMS has no
// impact stats. The live numbers are maintained in the admin
// (home > Impact > Stats), which can add and remove metrics freely.
export const IMPACT_STATS = {
  events: 50,
  attendees: 5000,
  patrons: 250,
};

export const HERO_CONTENT = {
  headline: "Preserving Kashmir's Rich Heritage in North America",
  subheadline:
    "Join the largest network of Kashmiri Americans united in celebrating our culture, supporting our community, and preserving our identity for future generations.",
  cta1: "Explore Events",
  cta2: "Support Our Mission",
};

export const MISSION_STATEMENT = `KGNA is a non-profit organization devoted to charitable, educational, and scientific development in an effort to preserve the unique Kashmiri culture and identity. We bring together Kashmiris across North America to celebrate our heritage and build lasting community connections.`;

export const ORGANIZATION_INFO = {
  name: "Kashmiri Group of North America",
  shortName: "KGNA",
  taxStatus: "501(c)(3) tax-exempt organization",
  email: "info@kgna.us",
  address: {
    street: "3255 Lawrenceville Suwanee Road, Suite P-129",
    city: "Suwanee",
    state: "GA",
    zip: "30024",
    country: "USA",
  },
};

// Facts used by the legal pages (/privacy, /terms, /nonprofit-status).
// Leave a value as null when it isn't confirmed yet - the pages omit the claim
// entirely rather than publishing a placeholder.
export type LegalInfo = {
  ein: string | null;
  determinationDate: string | null;
  governingState: string | null;
  mailingAddressConfirmed: boolean;
  effectiveDate: string;
  donationDisputeWindowDays: number;
};

export const LEGAL_INFO: LegalInfo = {
  // TODO(kgna): EIN from the IRS determination letter, formatted "12-3456789".
  ein: null,
  // TODO(kgna): date on the IRS determination letter, e.g. "March 14, 2019".
  determinationDate: null,
  // TODO(kgna): state whose law governs the Terms of Service, e.g. "New York".
  governingState: null,
  // ORGANIZATION_INFO.address is now the real Suwanee address, but this stays
  // false deliberately: flipping it publishes that address on /privacy, /terms
  // and /nonprofit-status as the org's address for legal notices and donation
  // disputes, which is a separate decision from showing it in the footer.
  // TODO(kgna): set to true once KGNA confirms this suite should receive legal
  // mail - and bump effectiveDate below when you do, since the pages gain text.
  mailingAddressConfirmed: false,
  // Bump this whenever the text of the legal pages changes.
  effectiveDate: "July 29, 2026",
  // Window for raising a donation billing issue, referenced by the Terms.
  donationDisputeWindowDays: 30,
};

// Placeholder image URLs - mix of local and Unsplash images
export const PLACEHOLDER_IMAGES = {
  heroBackground: "/images/kashmir-shikara-hero.jpg",
  kashmir1:
    "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=2000",
  kashmir2:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000",
  kashmir3:
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2000",
  culturalEvent:
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000",
  community:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000",
  food: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000",
  tradition:
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
};
