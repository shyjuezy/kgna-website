"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { safeImageUrl } from "@/lib/images";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "@/types";

// Mock data - replace with actual API call
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Cultural Festival 2024",
    description: "Join us for a celebration of Kashmiri culture with traditional music, dance, and cuisine",
    date: new Date("2024-06-15"),
    time: "5:00 PM - 10:00 PM",
    location: "Community Center, New York",
    category: "cultural",
    imageUrl: PLACEHOLDER_IMAGES.culturalEvent,
    registrationUrl: "#"
  },
  {
    id: "2",
    title: "Kashmiri Language Workshop",
    description: "Learn the basics of Kashmiri language in this interactive workshop for all ages",
    date: new Date("2024-05-20"),
    time: "2:00 PM - 4:00 PM",
    location: "Virtual Event",
    category: "educational",
    imageUrl: PLACEHOLDER_IMAGES.tradition,
    registrationUrl: "#"
  },
  {
    id: "3",
    title: "Community Iftar Gathering",
    description: "Break your fast with the community during the holy month of Ramadan",
    date: new Date("2024-04-10"),
    time: "7:00 PM - 9:00 PM",
    location: "Islamic Center, Boston",
    category: "social",
    imageUrl: PLACEHOLDER_IMAGES.community,
    registrationUrl: "#"
  }
];

const categoryColors = {
  cultural: "bg-purple-500",
  educational: "bg-blue-500",
  social: "bg-green-500",
  fundraiser: "bg-orange-500"
};

type UpcomingEventsProps = {
  heading?: string;
  body?: string;
  items?: Array<Record<string, unknown>>;
};

function eventFromCms(item: Record<string, unknown>, index: number): Event {
  const category = typeof item.category === "string" ? item.category : "cultural";

  return {
    id: typeof item.id === "string" ? item.id : String(index + 1),
    title: typeof item.title === "string" ? item.title : "Community Event",
    description: typeof item.description === "string" ? item.description : "",
    date: new Date(typeof item.date === "string" ? item.date : Date.now()),
    time: typeof item.time === "string" ? item.time : "",
    location: typeof item.location === "string" ? item.location : "",
    category: category as Event["category"],
    imageUrl: safeImageUrl(item.image, PLACEHOLDER_IMAGES.culturalEvent),
    registrationUrl: typeof item.registrationUrl === "string" ? item.registrationUrl : "#",
  };
}

export function UpcomingEvents({
  heading = "Upcoming Events",
  body = "Join us in celebrating Kashmiri culture through our community events and gatherings",
  items,
}: UpcomingEventsProps) {
  const events = items?.length ? items.map(eventFromCms) : mockEvents;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {body}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                              src={event.imageUrl ?? PLACEHOLDER_IMAGES.culturalEvent}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${categoryColors[event.category] ?? "bg-slate-500"}`}
                  >
                    {event.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date.toLocaleDateString()} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  <Link href={`/events/${event.id}`}>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/events">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View All Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
