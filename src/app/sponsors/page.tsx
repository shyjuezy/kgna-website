import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCmsPage, getSection, listProp, textProp } from "@/lib/cms";
import { safeImageUrl } from "@/lib/images";
import { ExternalLink, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Sponsors, vendors, authors, and local businesses connected to the Kashmiri community across North America.",
};

/**
 * The four listing groups, in page order. `badgeKey` is the one field that
 * differs per group - everything else shares a row shape, so a single card
 * renders all of them.
 */
const GROUPS = [
  {
    type: "sponsors",
    heading: "Our sponsors",
    body: "Organizations whose support makes our programming possible.",
    badgeKey: "tier",
  },
  {
    type: "vendors",
    heading: "Vendors",
    body: "Caterers, musicians, photographers, and other vendors our community works with.",
    badgeKey: "category",
  },
  {
    type: "authors",
    heading: "Authors",
    body: "Writers from the Kashmiri community and their published work.",
    badgeKey: "work",
  },
  {
    type: "businesses",
    heading: "Local businesses",
    body: "Businesses run by members of our community.",
    badgeKey: "category",
  },
] as const;

/** First letters of the name, used when a listing has no usable logo. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function ListingCard({
  item,
  badgeKey,
}: {
  item: Record<string, unknown>;
  badgeKey: string;
}) {
  const name = String(item.name ?? "").trim();
  if (!name) return null;

  // Empty or non-allowlisted hosts resolve to "", so they fall through to the
  // monogram rather than an unrelated stock photo.
  const logo = safeImageUrl(item.imageUrl, "");
  const badge = String(item[badgeKey] ?? "").trim();
  const blurb = String(item.blurb ?? "").trim();
  const location = String(item.location ?? "").trim();
  const url = String(item.url ?? "").trim();

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="p-6 flex gap-4">
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary"
          >
            {initials(name)}
          </div>
        )}

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold leading-tight">{name}</h3>
            {badge ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {badge}
              </span>
            ) : null}
          </div>

          {blurb ? (
            <p className="text-sm text-muted-foreground">{blurb}</p>
          ) : null}

          {location ? (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {location}
            </p>
          ) : null}

          {url ? (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Visit site
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function SponsorsPage() {
  // The route is /sponsors but the CMS slug is still "directory" - the admin app
  // keys content by slug, so renaming this string before the page is migrated
  // there would silently empty every group on the live site.
  const content = await getCmsPage("directory");
  const hero = getSection(content, "hero");

  const groups = GROUPS.map((group) => {
    const section = getSection(content, group.type);
    return {
      ...group,
      heading: textProp(section, "heading", group.heading),
      body: textProp(section, "body", group.body),
      // Seeded example rows render as-is. They are deliberately worded as
      // templates ("Example Sponsor", "Replace with...") so they read as
      // fill-in-me content rather than as real listings, until an editor
      // replaces them in the admin.
      items: listProp<Record<string, unknown>>(section, "items", []),
    };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {textProp(hero, "heading", "Sponsors")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {textProp(
                hero,
                "body",
                "Sponsors, vendors, authors, and local businesses connected to the Kashmiri community across North America.",
              )}
            </p>
          </div>
        </div>
      </section>

      {groups.length > 0 ? (
        groups.map((group, index) => (
          <section
            key={group.type}
            className={cn(
              "py-16",
              index % 2 === 0 ? "bg-background" : "bg-primary/5",
            )}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-center mb-3">
                  {group.heading}
                </h2>
                <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                  {group.body}
                </p>
                {/* Flex rather than grid: section counts vary, and a grid pins
                    a lone card to column 1 with a wide gap beside it. Widths
                    match a 2-up / 3-up grid, so full rows still line up. */}
                <div className="flex flex-wrap justify-center gap-6">
                  {group.items.map((item, itemIndex) => (
                    <div
                      key={`${String(item.name ?? "")}-${itemIndex}`}
                      className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                    >
                      <ListingCard item={item} badgeKey={group.badgeKey} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>Listings are being compiled. Please check back soon.</p>
          </div>
        </section>
      )}

      {/* Listing enquiry */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-serif font-bold">
              Want to be listed?
            </h2>
            <p className="opacity-90">
              Listings are offered to sponsors, vendors, authors, and businesses
              connected to our community. Get in touch and we will follow up.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-background px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
