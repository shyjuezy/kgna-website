import { Hero } from "@/components/sections/hero";
import { MissionStatement } from "@/components/sections/mission-statement";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { ImpactStats } from "@/components/sections/impact-stats";
import { DonationCTA } from "@/components/sections/donation-cta";
import { FeaturedGallery } from "@/components/sections/featured-gallery";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionStatement />
      <UpcomingEvents />
      <ImpactStats />
      <DonationCTA />
      <FeaturedGallery />
      <NewsletterSignup />
    </>
  );
}