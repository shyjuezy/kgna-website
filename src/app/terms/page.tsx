import { Metadata } from "next";
import Link from "next/link";
import {
  LegalContactBlock,
  LegalPageShell,
  LegalSection,
} from "@/components/sections/legal-page";
import { LEGAL_INFO, ORGANIZATION_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Kashmiri Group of North America website, donate, or register for our events.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      intro={`The terms that apply when you use this website, donate to ${ORGANIZATION_INFO.shortName}, or register for our events.`}
      effectiveDate={LEGAL_INFO.effectiveDate}
    >
      <LegalSection title="Acceptance of These Terms">
        <p>
          By using this website, donating, or registering for an event, you
          agree to these terms. If you do not agree with them, please do not use
          the site. These terms apply to everyone who visits, and additional
          terms may apply to specific events or programs — where they do, we
          will tell you at the time.
        </p>
      </LegalSection>

      <LegalSection title="Who May Use This Site">
        <p>
          Anyone may browse this site. To make a donation or register for an
          event you must be at least 18 years old, or have the consent of a
          parent or guardian. You agree that the information you submit through
          our forms is accurate and that you are authorized to use any payment
          method you provide.
        </p>
      </LegalSection>

      <LegalSection title="Donations">
        <ul>
          <li>
            <strong>Voluntary gifts.</strong> Donations are voluntary
            contributions to {ORGANIZATION_INFO.name}, not payments for goods or
            services, unless we state otherwise (for example, a ticketed
            dinner).
          </li>
          <li>
            <strong>Processing.</strong> Donations are processed securely by
            Stripe. Submitting the donation form authorizes the charge you have
            selected.
          </li>
          <li>
            <strong>Recurring donations.</strong> If you choose a monthly or
            annual gift, your payment method will be charged automatically on
            that schedule until you cancel. You may cancel at any time by
            contacting us; cancellation stops future charges and does not
            reverse completed ones.
          </li>
          <li>
            <strong>Receipts.</strong> An acknowledgement is emailed to the
            address you provide. Keep it for your tax records.
          </li>
          <li>
            <strong>Errors and refunds.</strong> Donations are generally
            non-refundable. If a gift was made in error or an incorrect amount
            was charged, contact us at{" "}
            <a href={`mailto:${ORGANIZATION_INFO.email}`}>
              {ORGANIZATION_INFO.email}
            </a>{" "}
            within {LEGAL_INFO.donationDisputeWindowDays} days and we will
            review the request in good faith.
          </li>
          <li>
            <strong>Tax treatment.</strong> See our{" "}
            <Link href="/nonprofit-status">501(c)(3) status page</Link> for
            information on the deductibility of contributions.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Events and Programs">
        <ul>
          <li>
            Some events require advance registration and may have limited
            capacity. Registration is confirmed only when you receive a
            confirmation. Where registration or ticketing is handled by an
            outside service, that provider&rsquo;s terms apply to the
            transaction as well as these.
          </li>
          <li>
            Event dates, times, venues, and programming may change. We will make
            reasonable efforts to notify registrants of significant changes or
            cancellations.
          </li>
          <li>
            We ask all attendees to treat fellow community members, volunteers,
            performers, and venue staff with respect. We may decline entry to,
            or ask anyone to leave, an event where conduct is disruptive or
            unsafe.
          </li>
          <li>
            <strong>Photography.</strong> We often photograph and record our
            events and may use those images in our gallery, newsletters, and
            promotional material. If you would prefer not to appear, let an
            organizer know at the event or contact us afterwards and we will
            remove identifiable images of you where reasonably possible.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Acceptable Use">
        <p>When using this site, you agree not to:</p>
        <ul>
          <li>
            Use it for any unlawful purpose or to violate anyone&rsquo;s rights
          </li>
          <li>
            Submit false, misleading, abusive, harassing, or hateful content
            through our forms
          </li>
          <li>
            Attempt to gain unauthorized access to the site, its systems, or
            other users&rsquo; data
          </li>
          <li>
            Interfere with the site&rsquo;s operation, including through
            automated scraping, bulk form submissions, or attempts to overwhelm
            our services
          </li>
          <li>
            Impersonate {ORGANIZATION_INFO.shortName}, our staff, or our
            volunteers
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          The text, photographs, graphics, logos, and design of this site are
          owned by {ORGANIZATION_INFO.shortName} or used with permission from
          their owners, and are protected by copyright and trademark law. You
          may view and share our pages for personal, non-commercial purposes
          with attribution. Reproducing our content or photographs for
          commercial use, or in a way that suggests our endorsement, requires
          our written permission.
        </p>
        <p>
          If you believe material on this site infringes your rights, contact us
          at{" "}
          <a href={`mailto:${ORGANIZATION_INFO.email}`}>
            {ORGANIZATION_INFO.email}
          </a>{" "}
          with details and we will review it promptly.
        </p>
      </LegalSection>

      <LegalSection title="Content You Submit">
        <p>
          When you send us a message, photograph, story, or other material, you
          confirm that you have the right to share it and you give{" "}
          {ORGANIZATION_INFO.shortName} permission to use it in connection with
          our mission — for example, in our news section or newsletter — unless
          you tell us otherwise. Please do not send confidential or sensitive
          personal information through our forms.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services and Links">
        <p>
          This site relies on third-party services, including Stripe for
          payments, and links to external sites and social media platforms.
          Those services are governed by their own terms and privacy policies.
          We are not responsible for the content or practices of sites we do not
          operate.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          This website and its content are provided on an &ldquo;as is&rdquo;
          and &ldquo;as available&rdquo; basis. We work to keep information
          accurate and current, but we do not warrant that the site will be
          uninterrupted or error-free, or that all content is complete and up to
          date. Nothing on this site is legal, tax, financial, medical, or
          immigration advice — consult a qualified professional for your
          situation.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {ORGANIZATION_INFO.name}, its
          board members, officers, volunteers, and staff will not be liable for
          any indirect, incidental, consequential, or punitive damages arising
          out of your use of this site or attendance at our events. Nothing in
          these terms limits liability that cannot be limited under applicable
          law.
        </p>
      </LegalSection>

      <LegalSection title="Indemnification">
        <p>
          You agree to indemnify and hold harmless {ORGANIZATION_INFO.shortName}{" "}
          and its board members, officers, volunteers, and staff from claims
          arising out of your breach of these terms or your misuse of this site.
        </p>
      </LegalSection>

      {LEGAL_INFO.governingState ? (
        <LegalSection title="Governing Law">
          <p>
            These terms are governed by the laws of the State of{" "}
            {LEGAL_INFO.governingState}, without regard to its conflict-of-laws
            rules. Any dispute relating to these terms or this website will be
            brought in the state or federal courts located in{" "}
            {LEGAL_INFO.governingState}.
          </p>
        </LegalSection>
      ) : null}

      <LegalSection title="Changes to These Terms">
        <p>
          We may revise these terms from time to time. The &ldquo;last
          updated&rdquo; date at the top of this page reflects the current
          version, and continuing to use the site after a change means you
          accept the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>Questions about these terms can be sent to:</p>
        <LegalContactBlock />
        <p>
          See also our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
