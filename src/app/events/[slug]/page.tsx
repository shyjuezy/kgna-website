import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  Ticket,
  Mail,
  Phone,
  Globe
} from "lucide-react";

// This would normally fetch from your database
async function getEvent(slug: string) {
  // Mock data - replace with actual API call
  const events = {
    "1": {
      id: "1",
      title: "Annual Cultural Festival 2025",
      description: "Join us for our biggest celebration of the year featuring traditional music, dance performances, authentic Kashmiri cuisine, and activities for all ages. This festival brings together the Kashmiri diaspora from across North America for a day of cultural immersion and community bonding.",
      longDescription: `
        The Annual Cultural Festival is KGNA's flagship event, celebrating the rich tapestry of Kashmiri heritage. This year's festival promises to be our most spectacular yet, featuring:

        **Cultural Performances**
        - Traditional Rouf and Hafiza dance performances
        - Sufi music concert by renowned artists
        - Children's cultural program
        - Fashion show featuring traditional Kashmiri attire

        **Food & Cuisine**
        - Authentic Wazwan preparation demonstration
        - Food stalls with traditional Kashmiri delicacies
        - Kahwa tea station
        - Kids-friendly food options

        **Activities & Workshops**
        - Kashmiri language workshop for beginners
        - Traditional craft demonstrations (Paper Mache, Embroidery)
        - Children's activities corner with face painting and games
        - Photo booth with traditional props

        **Community & Networking**
        - Business networking session
        - Youth meet and greet
        - Senior citizens' corner
        - Community awards ceremony
      `,
      date: new Date("2025-06-15"),
      time: "5:00 PM - 10:00 PM",
      location: "Queens Community Center, New York",
      address: "123 Main Street, Queens, NY 11101",
      category: "cultural",
      imageUrl: PLACEHOLDER_IMAGES.culturalEvent,
      galleryImages: [
        PLACEHOLDER_IMAGES.kashmir1,
        PLACEHOLDER_IMAGES.tradition,
        PLACEHOLDER_IMAGES.community,
        PLACEHOLDER_IMAGES.food
      ],
      registrationUrl: "#",
      capacity: 500,
      registered: 342,
      price: {
        adults: 25,
        children: 10,
        family: 60
      },
      organizer: {
        name: "KGNA Events Team",
        email: "events@kgna.us",
        phone: "(555) 123-4567"
      },
      sponsors: ["Local Business 1", "Community Partner 2", "Media Partner 3"]
    }
  };

  return events[slug as keyof typeof events] || null;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const registrationPercentage = (event.registered / event.capacity) * 100;

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
            <Button variant="outline" className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
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
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {event.date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">About This Event</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">{event.description}</p>
                  <div className="space-y-4 whitespace-pre-line">
                    {event.longDescription}
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {event.galleryImages && event.galleryImages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.galleryImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors */}
              {event.sponsors && event.sponsors.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Event Sponsors</h2>
                  <div className="flex flex-wrap gap-4">
                    {event.sponsors.map((sponsor) => (
                      <Badge key={sponsor} variant="secondary" className="px-4 py-2">
                        {sponsor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Registration */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Event Registration</h3>

                  {/* Capacity Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Spots Filled</span>
                      <span className="font-medium">{event.registered} / {event.capacity}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all duration-300"
                        style={{ width: `${registrationPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium">Ticket Prices</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Adults</span>
                        <span className="font-medium">${event.price.adults}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Children (12 & under)</span>
                        <span className="font-medium">${event.price.children}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Family (2 adults + children)</span>
                        <span className="font-medium">${event.price.family}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Ticket className="mr-2 h-5 w-5" />
                    Register Now
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Registration closes 24 hours before the event
                  </p>
                </CardContent>
              </Card>

              {/* Venue Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Venue Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-sm text-muted-foreground">{event.address}</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Organizer</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${event.organizer.email}`} className="text-sm hover:underline">
                        {event.organizer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.organizer.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Share This Event</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}