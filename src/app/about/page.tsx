import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MISSION_STATEMENT, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { getCmsPage, type CmsPageContent } from "@/lib/cms";
import { safeImageUrl } from "@/lib/images";
import {
  Heart,
  GraduationCap,
  Users,
  Target,
  Eye,
  Award,
  Calendar,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about KGNA's mission, history, and the dedicated team working to preserve Kashmiri culture in North America.",
};

type ValueItem = {
  title: string;
  description: string;
  icon: typeof Heart;
};

type MilestoneItem = {
  year: string;
  title: string;
  description: string;
  icon: typeof Heart;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};

const FALLBACK_ABOUT_CONTENT: CmsPageContent = {
  title: "About",
  sections: [
    {
      type: "hero",
      props: {
        heading: "About KGNA",
        body: "For over 30 years, we've been the bridge connecting Kashmiri Americans to their roots while building a vibrant community for the future.",
      },
    },
    {
      type: "missionVision",
      props: {
        missionTitle: "Our Mission",
        missionBody: MISSION_STATEMENT,
        visionTitle: "Our Vision",
        visionBody:
          "To be the leading organization that empowers Kashmiri Americans to thrive while maintaining strong connections to their cultural heritage, creating a legacy that spans generations.",
      },
    },
    {
      type: "values",
      props: {
        heading: "Our Core Values",
        items: [
          {
            title: "Cultural Preservation",
            description:
              "Keeping Kashmiri traditions, language, and customs alive for future generations",
          },
          {
            title: "Community Building",
            description:
              "Creating spaces for Kashmiris to connect, celebrate, and support each other",
          },
          {
            title: "Education",
            description:
              "Teaching youth about their heritage through language classes and cultural programs",
          },
          {
            title: "Inclusivity",
            description:
              "Welcoming all members of the Kashmiri diaspora regardless of background",
          },
        ],
      },
    },
    {
      type: "journey",
      props: {
        heading: "Our Journey",
        items: [
          {
            year: "1994",
            title: "KGNA Founded",
            description:
              "A small group of Kashmiri families came together to establish KGNA",
          },
          {
            year: "2000",
            title: "501(c)(3) Status",
            description: "Received official nonprofit recognition from the IRS",
          },
          {
            year: "2005",
            title: "First Annual Conference",
            description:
              "Hosted our first large-scale gathering with 500+ attendees",
          },
          {
            year: "2010",
            title: "Youth Programs Launch",
            description:
              "Started dedicated programs for second-generation Kashmiris",
          },
          {
            year: "2015",
            title: "National Expansion",
            description:
              "Established chapters in 15 cities across North America",
          },
          {
            year: "2020",
            title: "Virtual Connectivity",
            description: "Launched online programs reaching thousands globally",
          },
          {
            year: "2024",
            title: "30 Years of Service",
            description: "Celebrating three decades of cultural preservation",
          },
        ],
      },
    },
    {
      type: "leadership",
      props: {
        heading: "Our Leadership Team",
        body: "KGNA is run by an elected volunteer board that oversees our programs, finances, and community initiatives.",
        structure: "",
        // Deliberately empty: this fallback is only used when the CMS is
        // unreachable, and it must never invent named individuals for a real
        // nonprofit's board. An empty list renders no tiles.
        members: [],
      },
    },
    {
      type: "cta",
      props: {
        heading: "Get Involved",
        body: "Join us in our mission to preserve Kashmiri culture and build a stronger community. There are many ways to contribute your time, skills, and resources.",
        primaryLabel: "Become a Volunteer",
        primaryHref: "/volunteer",
        secondaryLabel: "Support Our Mission",
        secondaryHref: "/donate",
      },
    },
  ],
};

const valueIcons = [Heart, Users, GraduationCap, Target];
const milestoneIcons = [
  Users,
  Award,
  Calendar,
  GraduationCap,
  MapPin,
  Users,
  Heart,
];

function getSection(content: CmsPageContent, type: string) {
  return content.sections.find((section) => section.type === type)?.props ?? {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asRecordArray(value: unknown) {
  return Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
}

async function getAboutContent(): Promise<CmsPageContent> {
  const content = await getCmsPage("about");
  return content?.sections?.length ? content : FALLBACK_ABOUT_CONTENT;
}

function getValues(content: CmsPageContent): ValueItem[] {
  const values = getSection(content, "values");
  const fallback = getSection(FALLBACK_ABOUT_CONTENT, "values");
  const items = asRecordArray(values.items).length
    ? asRecordArray(values.items)
    : asRecordArray(fallback.items);

  return items.map((item, index) => ({
    title: asString(item.title),
    description: asString(item.description),
    icon: valueIcons[index] ?? Heart,
  }));
}

function getMilestones(content: CmsPageContent): MilestoneItem[] {
  const journey = getSection(content, "journey");
  const fallback = getSection(FALLBACK_ABOUT_CONTENT, "journey");
  const items = asRecordArray(journey.items).length
    ? asRecordArray(journey.items)
    : asRecordArray(fallback.items);

  return items.map((item, index) => ({
    year: asString(item.year),
    title: asString(item.title),
    description: asString(item.description),
    icon: milestoneIcons[index] ?? Calendar,
  }));
}

function getTeamMembers(content: CmsPageContent): TeamMember[] {
  const leadership = getSection(content, "leadership");

  // No fallback list on purpose. Emptying the tiles in the admin has to mean
  // "show no tiles" - substituting placeholder people here would put invented
  // names back on the page. Same for the photo: an unset image shows no image
  // rather than a stock photo of strangers presented as our board.
  return asRecordArray(leadership.members).map((member) => ({
    name: asString(member.name),
    role: asString(member.role),
    bio: asString(member.bio),
    // Empty stays empty so generic tiles render without a photo; a set but
    // unsupported host degrades to a placeholder rather than crashing.
    imageUrl: member.imageUrl ? safeImageUrl(member.imageUrl) : "",
  }));
}

export default async function AboutPage() {
  const content = await getAboutContent();
  const hero = getSection(content, "hero");
  const missionVision = getSection(content, "missionVision");
  const values = getSection(content, "values");
  const journey = getSection(content, "journey");
  const leadership = getSection(content, "leadership");
  const cta = getSection(content, "cta");
  const valueItems = getValues(content);
  const milestones = getMilestones(content);
  const teamMembers = getTeamMembers(content);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {asString(hero.heading, "About KGNA")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {asString(hero.body)}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-serif font-bold">
                      {asString(missionVision.missionTitle, "Our Mission")}
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    {asString(missionVision.missionBody, MISSION_STATEMENT)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-serif font-bold">
                      {asString(missionVision.visionTitle, "Our Vision")}
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    {asString(missionVision.visionBody)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-center mb-8">
                {asString(values.heading, "Our Core Values")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valueItems.map((value) => (
                  <div key={value.title} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              {asString(journey.heading, "Our Journey")}
            </h2>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    className={cn(
                      "relative flex items-center",
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end",
                    )}
                  >
                    <div
                      className={cn(
                        "w-full md:w-5/12",
                        index % 2 === 0
                          ? "md:text-right md:pr-8"
                          : "md:text-left md:pl-8",
                      )}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <Badge className="mb-2">{milestone.year}</Badge>
                          <h3 className="text-xl font-semibold mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="absolute left-8 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:-ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-4">
              {asString(leadership.heading, "Our Leadership Team")}
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {asString(leadership.body)}
            </p>

            {/* Blanket statement on how the board is structured. */}
            {asString(leadership.structure) ? (
              <Card className="max-w-3xl mx-auto mb-12 bg-muted/30">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {asString(leadership.structure)}
                  </p>
                </CardContent>
              </Card>
            ) : null}

            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card
                    key={`${member.role}-${member.name}-${index}`}
                    className="overflow-hidden"
                  >
                    {/* Generic tiles carry no photo; only show one if set. */}
                    {member.imageUrl ? (
                      <div className="relative h-64">
                        <Image
                          src={member.imageUrl}
                          alt={member.name || member.role}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <CardContent className="p-6">
                      {member.name ? (
                        <>
                          <h3 className="text-xl font-semibold mb-1">
                            {member.name}
                          </h3>
                          <Badge variant="secondary" className="mb-3">
                            {member.role}
                          </Badge>
                        </>
                      ) : (
                        <h3 className="text-lg font-semibold uppercase tracking-wide mb-3">
                          {member.role}
                        </h3>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              {asString(cta.heading, "Get Involved")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {asString(cta.body)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={asString(cta.primaryHref, "/volunteer")}>
                <Button size="lg" variant="outline">
                  {asString(cta.primaryLabel, "Become a Volunteer")}
                </Button>
              </Link>
              <Link href={asString(cta.secondaryHref, "/donate")}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Heart className="mr-2 h-5 w-5" />
                  {asString(cta.secondaryLabel, "Support Our Mission")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
