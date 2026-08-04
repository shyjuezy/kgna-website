import { Hero } from "@/components/sections/hero";
import { MissionStatement } from "@/components/sections/mission-statement";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { ImpactStats } from "@/components/sections/impact-stats";
import { DonationCTA } from "@/components/sections/donation-cta";
import { FeaturedGallery } from "@/components/sections/featured-gallery";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { getCmsPage, getSection, listProp, optionalTextProp } from "@/lib/cms";

export default async function HomePage() {
  const content = await getCmsPage("home");
  const hero = getSection(content, "hero");
  const mission = getSection(content, "mission");
  const events = getSection(content, "events");
  const impact = getSection(content, "impact");
  const donation =
    getSection(content, "donation") ?? getSection(content, "donationCta");
  const gallery = getSection(content, "gallery");
  const newsletter = getSection(content, "newsletter");

  return (
    <>
      <Hero
        headline={optionalTextProp(hero, "headline")}
        subheadline={optionalTextProp(hero, "subheadline")}
        cta1={
          optionalTextProp(hero, "cta1") ??
          optionalTextProp(hero, "primaryLabel")
        }
        cta2={
          optionalTextProp(hero, "cta2") ??
          optionalTextProp(hero, "secondaryLabel")
        }
        cta1Href={
          optionalTextProp(hero, "cta1Href") ??
          optionalTextProp(hero, "primaryHref")
        }
        cta2Href={
          optionalTextProp(hero, "cta2Href") ??
          optionalTextProp(hero, "secondaryHref")
        }
        image={
          optionalTextProp(hero, "image") ?? optionalTextProp(hero, "imageUrl")
        }
      />
      <MissionStatement
        heading={optionalTextProp(mission, "heading")}
        body={optionalTextProp(mission, "body")}
        items={listProp(mission, "items", listProp(mission, "pillars", []))}
      />
      <UpcomingEvents
        heading={optionalTextProp(events, "heading")}
        body={optionalTextProp(events, "body")}
        items={listProp(events, "items", [])}
      />
      <ImpactStats
        heading={optionalTextProp(impact, "heading")}
        body={optionalTextProp(impact, "body")}
        items={listProp(impact, "items", listProp(impact, "stats", []))}
      />
      <DonationCTA
        heading={optionalTextProp(donation, "heading")}
        body={optionalTextProp(donation, "body")}
        patronHeading={optionalTextProp(donation, "patronHeading")}
        patronBody={optionalTextProp(donation, "patronBody")}
        cta={optionalTextProp(donation, "cta")}
        ctaHref={optionalTextProp(donation, "ctaHref")}
      />
      <FeaturedGallery
        heading={optionalTextProp(gallery, "heading")}
        body={optionalTextProp(gallery, "body")}
        items={listProp(gallery, "items", [])}
      />
      <NewsletterSignup
        heading={optionalTextProp(newsletter, "heading")}
        body={optionalTextProp(newsletter, "body")}
        placeholder={optionalTextProp(newsletter, "placeholder")}
        button={optionalTextProp(newsletter, "button")}
        privacy={optionalTextProp(newsletter, "privacy")}
      />
    </>
  );
}
