"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { safeImageUrl } from "@/lib/images";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  ChevronRight,
  Ticket,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "@/types";
import type { CmsPageContent } from "@/lib/cms";

// export const metadata: Metadata = {
//   title: "Events",
//   description: "Join us for cultural celebrations, educational workshops, and community gatherings.",
// };

// Mock event data - replace with actual API call
const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Annual Cultural Festival 2025",
    description:
      "Join us for our biggest celebration of the year featuring traditional music, dance performances, authentic Kashmiri cuisine, and activities for all ages.",
    date: new Date("2025-06-15"),
    time: "5:00 PM - 10:00 PM",
    location: "Queens Community Center, New York",
    category: "cultural",
    imageUrl: PLACEHOLDER_IMAGES.culturalEvent,
    registrationUrl: "#",
  },
  {
    id: "2",
    title: "Kashmiri Language Workshop",
    description:
      "Learn the basics of Kashmiri language in this interactive workshop. Perfect for children and adults who want to connect with their linguistic heritage.",
    date: new Date("2025-02-20"),
    time: "2:00 PM - 4:00 PM",
    location: "Virtual Event (Zoom)",
    category: "educational",
    imageUrl: PLACEHOLDER_IMAGES.tradition,
    registrationUrl: "#",
  },
  {
    id: "3",
    title: "Spring Navroz Celebration",
    description:
      "Welcome spring with traditional Kashmiri Navroz festivities including special prayers, cultural programs, and community feast.",
    date: new Date("2025-03-21"),
    time: "11:00 AM - 3:00 PM",
    location: "KGNA Community Hall, Boston",
    category: "cultural",
    imageUrl: PLACEHOLDER_IMAGES.kashmir1,
    registrationUrl: "#",
  },
  {
    id: "4",
    title: "Youth Leadership Summit",
    description:
      "A day-long summit for young Kashmiris to develop leadership skills, network with professionals, and engage in community service planning.",
    date: new Date("2025-04-10"),
    time: "9:00 AM - 5:00 PM",
    location: "Marriott Hotel, Chicago",
    category: "educational",
    imageUrl: PLACEHOLDER_IMAGES.team,
    registrationUrl: "#",
  },
  {
    id: "5",
    title: "Community Iftar Gathering",
    description:
      "Break your fast with the community during the holy month of Ramadan. Open to all members and friends of the Kashmiri community.",
    date: new Date("2025-04-05"),
    time: "7:00 PM - 9:00 PM",
    location: "Islamic Center, Houston",
    category: "social",
    imageUrl: PLACEHOLDER_IMAGES.community,
    registrationUrl: "#",
  },
  {
    id: "6",
    title: "Annual Fundraising Gala",
    description:
      "An elegant evening supporting KGNA's educational and cultural programs. Features dinner, entertainment, and silent auction.",
    date: new Date("2025-09-20"),
    time: "6:00 PM - 11:00 PM",
    location: "Grand Ballroom, San Francisco",
    category: "fundraiser",
    imageUrl: PLACEHOLDER_IMAGES.culturalEvent,
    registrationUrl: "#",
  },
];

const pastEvents: Event[] = [
  {
    id: "p1",
    title: "KGNA Convention 2024",
    description:
      "Three-day convention featuring cultural programs, business sessions, and youth activities.",
    date: new Date("2024-07-15"),
    time: "All Day",
    location: "Washington DC",
    category: "cultural",
    imageUrl: PLACEHOLDER_IMAGES.kashmir2,
    isPastEvent: true,
  },
  {
    id: "p2",
    title: "Winter Food Festival",
    description:
      "Celebration of traditional Kashmiri winter cuisine with cooking demonstrations.",
    date: new Date("2024-12-10"),
    time: "12:00 PM - 6:00 PM",
    location: "Community Center, Seattle",
    category: "social",
    imageUrl: PLACEHOLDER_IMAGES.food,
    isPastEvent: true,
  },
  {
    id: "p3",
    title: "Heritage Workshop Series",
    description: "Monthly workshops on Kashmiri crafts, music, and traditions.",
    date: new Date("2024-11-15"),
    time: "3:00 PM - 5:00 PM",
    location: "Various Locations",
    category: "educational",
    imageUrl: PLACEHOLDER_IMAGES.tradition,
    isPastEvent: true,
  },
];

const categoryColors = {
  cultural: "bg-purple-500",
  educational: "bg-blue-500",
  social: "bg-green-500",
  fundraiser: "bg-orange-500",
};

const categoryLabels = {
  cultural: "Cultural",
  educational: "Educational",
  social: "Social",
  fundraiser: "Fundraiser",
};

export default function EventsPage() {
  const [cmsContent, setCmsContent] = useState<CmsPageContent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const getSection = (type: string) =>
    cmsContent?.sections.find((section) => section.type === type)?.props;
  const text = (
    props: Record<string, unknown> | undefined,
    key: string,
    fallback: string,
  ) => {
    const value = props?.[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const list = (
    props: Record<string, unknown> | undefined,
    key: string,
    fallback: Event[],
  ) => {
    const value = props?.[key];
    if (!Array.isArray(value)) {
      return fallback;
    }

    return value.map((item, index) => {
      const record = item as Record<string, unknown>;
      const category =
        typeof record.category === "string" ? record.category : "cultural";

      return {
        id: typeof record.id === "string" ? record.id : String(index + 1),
        title:
          typeof record.title === "string" ? record.title : "Community Event",
        description:
          typeof record.description === "string" ? record.description : "",
        date: new Date(
          typeof record.date === "string" ? record.date : Date.now(),
        ),
        time: typeof record.time === "string" ? record.time : "",
        location: typeof record.location === "string" ? record.location : "",
        category: category as Event["category"],
        imageUrl: safeImageUrl(
          record.image ?? record.imageUrl,
          PLACEHOLDER_IMAGES.culturalEvent,
        ),
        registrationUrl:
          typeof record.registrationUrl === "string"
            ? record.registrationUrl
            : "#",
        isPastEvent: record.isPastEvent === "yes",
      };
    });
  };
  const hero = getSection("hero");
  const events = getSection("events");
  const upcoming = getSection("upcoming") ?? events;
  const past = getSection("past") ?? events;
  const newsletter = getSection("newsletter");
  const cmsUpcomingEvents = list(
    upcoming,
    "items",
    list(upcoming, "upcoming", upcomingEvents),
  );
  const cmsPastEvents = list(past, "items", list(past, "past", pastEvents));

  useEffect(() => {
    fetch("/api/cms/events")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setCmsContent(payload?.content ?? null))
      .catch(() => setCmsContent(null));
  }, []);

  // Allow deep links such as /events?tab=past (used by the footer) to open the
  // matching tab. Read from location rather than useSearchParams so this
  // statically prerendered route does not need a Suspense boundary.
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "past" || tab === "upcoming") {
      // Mount-only URL adoption: empty deps, fixed value, so no cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tab);
    }
  }, []);

  // Filter events based on search and category
  const filterEvents = (events: Event[]) => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredUpcoming = filterEvents(cmsUpcomingEvents);
  const filteredPast = filterEvents(cmsPastEvents);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4"
            >
              {text(hero, "heading", "Events & Gatherings")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {text(
                hero,
                "body",
                "Join us in celebrating Kashmiri culture through various events, workshops, and community gatherings throughout the year.",
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="fundraiser">Fundraiser</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
                <TabsTrigger value="upcoming">
                  Upcoming Events ({filteredUpcoming.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past Events ({filteredPast.length})
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Events */}
              <TabsContent value="upcoming">
                {filteredUpcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUpcoming.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={
                                event.imageUrl ??
                                PLACEHOLDER_IMAGES.culturalEvent
                              }
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Badge
                              className={`absolute top-4 right-4 ${categoryColors[event.category] ?? "bg-slate-500"}`}
                            >
                              {categoryLabels[event.category] ?? event.category}
                            </Badge>
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-2">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {event.date.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span className="line-clamp-1">
                                  {event.location}
                                </span>
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3 mb-4">
                              {event.description}
                            </p>
                            <div className="flex gap-2">
                              <Link
                                href={`/events/${event.id}`}
                                className="flex-1"
                              >
                                <Button variant="outline" className="w-full">
                                  Learn More
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                              <Button className="bg-primary hover:bg-primary/90">
                                <Ticket className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No events found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Past Events */}
              <TabsContent value="past">
                {filteredPast.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPast.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full opacity-90 hover:opacity-100 transition-opacity overflow-hidden">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={
                                event.imageUrl ??
                                PLACEHOLDER_IMAGES.culturalEvent
                              }
                              alt={event.title}
                              fill
                              className="object-cover grayscale-[30%]"
                            />
                            <Badge
                              variant="secondary"
                              className="absolute top-4 right-4"
                            >
                              Past Event
                            </Badge>
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-2">
                              {event.title}
                            </CardTitle>
                            <CardDescription className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {event.date.toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span className="line-clamp-1">
                                  {event.location}
                                </span>
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3 mb-4">
                              {event.description}
                            </p>
                            <Link href={`/events/${event.id}`}>
                              <Button variant="ghost" className="w-full">
                                View Photos & Recap
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No past events found
                    </h3>
                    <p className="text-muted-foreground">
                      Check back later for event recaps and photos
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              {text(newsletter, "heading", "Never Miss an Event")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {text(
                newsletter,
                "body",
                "Subscribe to our newsletter to receive updates about upcoming events, workshops, and community gatherings.",
              )}
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {text(newsletter, "cta", "Subscribe to Newsletter")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
