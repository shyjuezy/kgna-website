import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORGANIZATION_INFO, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { safeImageUrl } from "@/lib/images";
import { getCmsPage, getSection, listProp } from "@/lib/cms";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Mail,
  Info,
  Lock,
} from "lucide-react";

type EventDetail = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  city: string;
  category: string;
  imageUrl: string;
};

function str(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/**
 * Events are authored as display strings like "Queens Community Center, New
 * York". Only the city is shown publicly, so take the last comma-separated
 * segment. Values with no comma ("Virtual Event") pass through unchanged.
 */
function cityOf(location: string) {
  const segments = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return segments.length ? segments[segments.length - 1] : "";
}

function toEventDetail(item: Record<string, unknown>): EventDetail {
  const location = str(item.location);
  return {
    id: str(item.id),
    title: str(item.title, "Community Event"),
    description: str(item.description),
    date: str(item.date),
    time: str(item.time),
    city: cityOf(location),
    category: str(item.category, "cultural"),
    imageUrl:
      safeImageUrl(
        str(item.image) || str(item.imageUrl),
        PLACEHOLDER_IMAGES.culturalEvent,
      ),
  };
}

/**
 * Looks the event up in the CMS rather than a hardcoded map, so every event
 * that appears in a listing has a detail page.
 *
 * Events are currently authored in two separate CMS lists - the events page
 * (upcoming + past) and the home page's events section - and their ids overlap.
 * The events page wins because it is the fuller list; the home page is only
 * consulted for ids that exist nowhere else. Collapsing these into one list
 * would remove the need for this precedence.
 */
async function getEvent(slug: string): Promise<EventDetail | null> {
  const lists: Array<Array<Record<string, unknown>>> = [];

  const eventsPage = await getCmsPage("events");
  if (eventsPage) {
    const events = getSection(eventsPage, "events");
    const upcoming = getSection(eventsPage, "upcoming") ?? events;
    const past = getSection(eventsPage, "past") ?? events;
    lists.push(
      listProp(upcoming, "items", listProp(upcoming, "upcoming", [])),
      listProp(past, "items", listProp(past, "past", [])),
    );
  }

  const homePage = await getCmsPage("home");
  if (homePage) {
    lists.push(listProp(getSection(homePage, "events"), "items", []));
  }

  for (const list of lists) {
    const match = list.find((item) => str(item.id) === slug);
    if (match) {
      return toEventDetail(match);
    }
  }

  return null;
}

function formatDate(value: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  // Format in UTC: the stored values are plain dates, and local formatting
  // would shift them a day for anyone west of Greenwich.
  return parsed.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const inviteSubject = encodeURIComponent(
    `Invitation request: ${event.title}`,
  );
  const inviteHref = `mailto:${ORGANIZATION_INFO.email}?subject=${inviteSubject}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative h-[400px]">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/events">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-primary">{event.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - Event Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info - the single place date, time and city appear */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {event.date ? (
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">
                            {formatDate(event.date)}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {event.time ? (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-medium">{event.time}</p>
                        </div>
                      </div>
                    ) : null}
                    {event.city ? (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Location
                          </p>
                          <p className="font-medium">{event.city}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              {event.description ? (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">
                    About This Event
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ) : null}

              {/* Disclaimers */}
              <Card className="bg-muted/30">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary shrink-0" />
                    <h2 className="text-lg font-semibold">
                      Before you request an invitation
                    </h2>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                    <li>
                      This is a ticketed private event. Attendance is by
                      invitation only, and invitations are not transferable.
                    </li>
                    <li>
                      Registration and ticketing are handled off-site by our
                      ticketing partner once an invitation has been issued.
                      There is no public registration for this event.
                    </li>
                    <li>
                      KGNA reserves the right to cancel and refund your
                      registration if the event is cancelled or rescheduled, if
                      venue capacity or safety requirements change, or if the
                      registration was not made by the invited guest.
                    </li>
                    <li>
                      Requesting an invitation does not guarantee admission.
                      Capacity is limited and requests are reviewed by the
                      organizers.
                    </li>
                    <li>
                      We photograph and record our events and may use those
                      images in our gallery and promotional material. See our{" "}
                      <Link href="/terms" className="text-primary underline">
                        Terms of Service
                      </Link>{" "}
                      for details.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Invitation request - replaces public registration */}
              <Card className="border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="h-5 w-5 text-primary shrink-0" />
                    <h3 className="text-xl font-semibold">Invite only</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    This event is not open for public registration. If you would
                    like to attend, email the organizers to request an
                    invitation.
                  </p>
                  <Button asChild className="w-full" size="lg">
                    <a href={inviteHref}>
                      <Mail className="mr-2 h-5 w-5" />
                      Email organizer to request an invitation
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    {ORGANIZATION_INFO.email}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
