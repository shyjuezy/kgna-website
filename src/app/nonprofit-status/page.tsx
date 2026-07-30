import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LegalPageShell, LegalSection } from "@/components/sections/legal-page";
import {
  LEGAL_INFO,
  MISSION_STATEMENT,
  ORGANIZATION_INFO,
} from "@/lib/constants";
import { FileText, Heart, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "501(c)(3) Status",
  description:
    "Information about the Kashmiri Group of North America's tax-exempt status, the deductibility of donations, and how to request our financial documents.",
};

export default function NonprofitStatusPage() {
  return (
    <LegalPageShell
      title="501(c)(3) Status"
      intro={`${ORGANIZATION_INFO.name} is a nonprofit organization. Here is what that means for you and your donation.`}
      effectiveDate={LEGAL_INFO.effectiveDate}
    >
      {/* Status summary */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-serif font-bold">
              Organization Details
            </h2>
          </div>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[max-content_1fr] text-sm">
            <dt className="font-semibold">Legal name</dt>
            <dd className="text-muted-foreground">{ORGANIZATION_INFO.name}</dd>

            <dt className="font-semibold">Tax status</dt>
            <dd className="text-muted-foreground">
              {ORGANIZATION_INFO.taxStatus}
            </dd>

            <dt className="font-semibold">EIN</dt>
            <dd className="text-muted-foreground">
              {LEGAL_INFO.ein ?? (
                <>
                  Available on request —{" "}
                  <a
                    className="text-primary underline"
                    href={`mailto:${ORGANIZATION_INFO.email}?subject=EIN%20request`}
                  >
                    email us
                  </a>
                </>
              )}
            </dd>

            {LEGAL_INFO.determinationDate ? (
              <>
                <dt className="font-semibold">IRS determination</dt>
                <dd className="text-muted-foreground">
                  {LEGAL_INFO.determinationDate}
                </dd>
              </>
            ) : null}

            {LEGAL_INFO.mailingAddressConfirmed ? (
              <>
                <dt className="font-semibold">Mailing address</dt>
                <dd className="text-muted-foreground">
                  {ORGANIZATION_INFO.address.street}
                  <br />
                  {ORGANIZATION_INFO.address.city},{" "}
                  {ORGANIZATION_INFO.address.state}{" "}
                  {ORGANIZATION_INFO.address.zip}
                </dd>
              </>
            ) : null}

            <dt className="font-semibold">Contact</dt>
            <dd className="text-muted-foreground">
              <a
                className="text-primary underline"
                href={`mailto:${ORGANIZATION_INFO.email}`}
              >
                {ORGANIZATION_INFO.email}
              </a>
            </dd>
          </dl>
        </CardContent>
      </Card>

      <LegalSection title="What Tax-Exempt Status Means">
        <p>
          Section 501(c)(3) of the Internal Revenue Code covers organizations
          formed for charitable, educational, religious, scientific, and similar
          public purposes. Being recognized under it means the organization is
          exempt from federal income tax on income related to its exempt
          purpose, and that contributions to it are generally tax-deductible for
          the donor.
        </p>
        <p>
          It also comes with obligations we take seriously: our funds must be
          used to advance our stated mission, no part of our earnings may
          benefit any private individual, and we are restricted from political
          campaign activity on behalf of or against any candidate.
        </p>
      </LegalSection>

      <LegalSection title="Is My Donation Tax-Deductible?">
        <p>
          Contributions to {ORGANIZATION_INFO.shortName} are deductible to the
          extent allowed by law. A few practical points:
        </p>
        <ul>
          <li>
            You will receive an emailed acknowledgement for every gift. Keep it
            — the IRS requires written acknowledgement for contributions of $250
            or more.
          </li>
          <li>
            If you receive something of value in return — an event ticket, a
            dinner, or merchandise — only the amount above the fair market value
            of what you received is deductible. We will note that amount when it
            applies.
          </li>
          <li>
            Donated services and volunteer time are not deductible, though
            certain out-of-pocket expenses may be.
          </li>
          <li>
            We are not able to give tax advice. For how a gift affects your
            specific return, please consult a qualified tax professional.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How Contributions Are Used">
        <p>{MISSION_STATEMENT}</p>
        <p>Your support funds the work that mission describes:</p>
        <ul>
          <li>
            Cultural festivals, performances, and community gatherings across
            North America
          </li>
          <li>
            Educational programs, language classes, and heritage preservation
            projects
          </li>
          <li>Youth and senior programs that keep generations connected</li>
          <li>Community assistance for Kashmiri families in need</li>
        </ul>
      </LegalSection>

      <LegalSection title="Financial Transparency">
        <p>
          We believe donors are entitled to see how their money is handled. The
          following are available on request by emailing{" "}
          <a href={`mailto:${ORGANIZATION_INFO.email}`}>
            {ORGANIZATION_INFO.email}
          </a>
          :
        </p>
        <ul>
          <li>Our IRS determination letter</li>
          <li>Our most recent Form 990 annual information return</li>
          <li>Our articles of incorporation and bylaws</li>
        </ul>
        <p>
          Publicly filed Form 990 returns for tax-exempt organizations can also
          be looked up through the{" "}
          <a
            href="https://apps.irs.gov/app/eos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IRS Tax Exempt Organization Search
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Other Ways to Give">
        <ul>
          <li>
            <strong>Employer matching.</strong> Many employers match charitable
            contributions, which can double your impact. Check with your HR
            department and send us the paperwork if you need our details.
          </li>
          <li>
            <strong>Donor-advised funds.</strong> We can accept grants
            recommended through a donor-advised fund. Contact us for the
            information your fund administrator will need.
          </li>
          <li>
            <strong>In-kind and event sponsorship.</strong> Venues, catering,
            printing, and professional services are often as valuable as cash.
            Get in touch to discuss.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          For anything relating to our nonprofit status, our filings, or a
          specific donation, reach us at{" "}
          <a href={`mailto:${ORGANIZATION_INFO.email}`}>
            {ORGANIZATION_INFO.email}
          </a>
          {LEGAL_INFO.mailingAddressConfirmed
            ? " or write to the mailing address above."
            : "."}
        </p>
        <p>
          See also our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </LegalSection>

      {/* Donate CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Heart className="h-6 w-6 text-primary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold">Ready to support our mission?</h3>
              <p className="text-sm text-muted-foreground">
                Every contribution helps preserve Kashmiri heritage for the next
                generation.
              </p>
            </div>
          </div>
          <Button asChild className="shrink-0">
            <Link href="/donate">
              <FileText className="mr-2 h-4 w-4" />
              Donate
            </Link>
          </Button>
        </CardContent>
      </Card>
    </LegalPageShell>
  );
}
