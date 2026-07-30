import { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactBlock,
  LegalPageShell,
  LegalSection,
} from "@/components/sections/legal-page";
import { LEGAL_INFO, ORGANIZATION_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How the Kashmiri Group of North America collects, uses, and protects the personal information you share with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      intro={`How ${ORGANIZATION_INFO.shortName} collects, uses, and protects the information you share with us.`}
      effectiveDate={LEGAL_INFO.effectiveDate}
    >
      <LegalSection title="Overview">
        <p>
          {ORGANIZATION_INFO.name} (&ldquo;{ORGANIZATION_INFO.shortName},&rdquo;
          &ldquo;we,&rdquo; or &ldquo;us&rdquo;) is a nonprofit organization
          dedicated to preserving Kashmiri culture and identity in North
          America. This policy explains what information we collect through this
          website, why we collect it, and the choices you have.
        </p>
        <p>
          We collect only what we need to run our programs — responding to your
          questions, processing donations, and keeping the community informed.
          We do not sell or rent your personal information to anyone.
        </p>
      </LegalSection>

      <LegalSection title="Information You Give Us">
        <p>We collect information you choose to submit through this website:</p>
        <ul>
          <li>
            <strong>Contact form.</strong> Your name, email address, phone
            number, the subject and body of your message, and the areas of our
            work you tell us you&rsquo;re interested in.
          </li>
          <li>
            <strong>Donations.</strong> Your name, email address, the amount,
            and whether the gift is one-time or recurring. Payment card details
            are handled entirely by our payment processor — see below.
          </li>
        </ul>
        {/* TODO(kgna): the newsletter forms are not wired to any backend yet, so
            no subscriber data is collected. When they are, add the newsletter
            collection category back here plus the retention and unsubscribe
            wording further down this page. */}
        <p>
          Registration for some events is handled by third-party ticketing or
          registration services. Where it is, the information you enter is
          collected by that provider under its own privacy policy rather than by
          us.
        </p>
      </LegalSection>

      <LegalSection title="Information Collected Automatically">
        <p>
          Like most websites, our hosting provider records standard technical
          information when you visit — including your IP address, browser type,
          referring page, and the pages you request. This is used to keep the
          site secure and available. We do not use third-party advertising or
          behavioral tracking services on this site.
        </p>
      </LegalSection>

      <LegalSection title="Payment Processing">
        <p>
          Donations are processed by <strong>Stripe</strong>. Your full payment
          card number, security code, and bank details are transmitted directly
          to Stripe and are never stored on or processed by{" "}
          {ORGANIZATION_INFO.shortName} servers. Stripe handles this information
          as an independent controller under its own{" "}
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>
          .
        </p>
        <p>
          From Stripe we receive the information needed to acknowledge your gift
          and keep proper records: your name, email address, the amount and
          date, the donation type, and a receipt identifier. If you set up a
          recurring donation, you can review or cancel it at any time by
          contacting us.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and Local Storage">
        <p>
          We keep this minimal. Your light/dark theme preference is stored
          locally in your browser so the site remembers it between visits.
          During checkout, Stripe sets cookies that are necessary to complete
          the transaction and to detect fraud. We do not use advertising
          cookies.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>We use the information described above to:</p>
        <ul>
          <li>
            Respond to your questions, volunteer offers, and membership
            inquiries
          </li>
          <li>Process donations and send receipts and acknowledgements</li>
          <li>
            Maintain the donation and financial records a tax-exempt
            organization is required to keep
          </li>
          <li>Protect the security and integrity of the site</li>
        </ul>
      </LegalSection>

      <LegalSection title="When We Share Information">
        <p>
          <strong>
            We do not sell, rent, or trade your personal information.
          </strong>{" "}
          We share it only in these situations:
        </p>
        <ul>
          <li>
            <strong>Service providers.</strong> Vendors who operate parts of
            this site on our behalf — payment processing, website hosting, and
            email delivery — and only to the extent needed to provide that
            service.
          </li>
          <li>
            <strong>Legal requirements.</strong> When we are required to
            disclose information by law, subpoena, or other legal process, or
            where disclosure is necessary to protect the rights or safety of our
            community.
          </li>
          <li>
            <strong>With your direction.</strong> When you ask us to share it,
            for example to connect you with a partner organization.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How Long We Keep It">
        <p>
          Donation and financial records are retained for as long as required by
          tax and nonprofit recordkeeping rules. Contact form messages are kept
          as long as needed to handle your inquiry and maintain a record of our
          correspondence.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices">
        <ul>
          <li>
            <strong>Access, correction, and deletion.</strong> Email us at{" "}
            <a href={`mailto:${ORGANIZATION_INFO.email}`}>
              {ORGANIZATION_INFO.email}
            </a>{" "}
            to ask what information we hold about you, to correct it, or to
            request deletion. Note that we may need to retain certain donation
            records to meet legal obligations even after a deletion request.
          </li>
          <li>
            <strong>Recurring donations.</strong> Email us to change or cancel a
            recurring gift and we will take care of it.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          We do not knowingly collect personal information from children under
          13 through this website. Registrations for youth programs should be
          submitted by a parent or guardian. If you believe a child has provided
          us with personal information, contact us and we will delete it.
        </p>
      </LegalSection>

      <LegalSection title="Links to Other Sites">
        <p>
          Our site links to other organizations, social media platforms, and
          event partners. We are not responsible for their privacy practices,
          and we encourage you to read the policies of any site you visit.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this policy as our programs and this website change.
          When we do, we will revise the &ldquo;last updated&rdquo; date at the
          top of this page. Material changes will be communicated more
          prominently where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          Questions about this policy or about your information can be sent to:
        </p>
        <LegalContactBlock />
        <p>
          See also our <Link href="/terms">Terms of Service</Link> and{" "}
          <Link href="/nonprofit-status">501(c)(3) status</Link>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
