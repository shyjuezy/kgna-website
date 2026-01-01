import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MISSION_STATEMENT, ORGANIZATION_INFO, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Heart, GraduationCap, Users, Target, Eye, Award, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about KGNA's mission, history, and the dedicated team working to preserve Kashmiri culture in North America.",
};

// Mock team data - replace with actual data
const teamMembers = [
  {
    name: "Dr. Ahmad Shah",
    role: "President",
    bio: "Leading KGNA's mission to preserve Kashmiri heritage for over 10 years.",
    imageUrl: PLACEHOLDER_IMAGES.team
  },
  {
    name: "Sarah Malik",
    role: "Vice President",
    bio: "Passionate about connecting Kashmiri youth with their cultural roots.",
    imageUrl: PLACEHOLDER_IMAGES.team
  },
  {
    name: "Mohammad Ali",
    role: "Secretary",
    bio: "Dedicated to organizing cultural events and community programs.",
    imageUrl: PLACEHOLDER_IMAGES.team
  },
  {
    name: "Fatima Khan",
    role: "Treasurer",
    bio: "Ensuring financial transparency and sustainability of our programs.",
    imageUrl: PLACEHOLDER_IMAGES.team
  },
  {
    name: "Rashid Ahmed",
    role: "Event Coordinator",
    bio: "Creating memorable cultural experiences for our community.",
    imageUrl: PLACEHOLDER_IMAGES.team
  },
  {
    name: "Zahra Hussain",
    role: "Youth Program Director",
    bio: "Engaging the next generation in Kashmiri cultural activities.",
    imageUrl: PLACEHOLDER_IMAGES.team
  }
];

const milestones = [
  {
    year: "1994",
    title: "KGNA Founded",
    description: "A small group of Kashmiri families came together to establish KGNA",
    icon: Users
  },
  {
    year: "2000",
    title: "501(c)(3) Status",
    description: "Received official nonprofit recognition from the IRS",
    icon: Award
  },
  {
    year: "2005",
    title: "First Annual Conference",
    description: "Hosted our first large-scale gathering with 500+ attendees",
    icon: Calendar
  },
  {
    year: "2010",
    title: "Youth Programs Launch",
    description: "Started dedicated programs for second-generation Kashmiris",
    icon: GraduationCap
  },
  {
    year: "2015",
    title: "National Expansion",
    description: "Established chapters in 15 cities across North America",
    icon: MapPin
  },
  {
    year: "2020",
    title: "Virtual Connectivity",
    description: "Launched online programs reaching thousands globally",
    icon: Users
  },
  {
    year: "2024",
    title: "30 Years of Service",
    description: "Celebrating three decades of cultural preservation",
    icon: Heart
  }
];

const values = [
  {
    icon: Heart,
    title: "Cultural Preservation",
    description: "Keeping Kashmiri traditions, language, and customs alive for future generations"
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Creating spaces for Kashmiris to connect, celebrate, and support each other"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Teaching youth about their heritage through language classes and cultural programs"
  },
  {
    icon: Target,
    title: "Inclusivity",
    description: "Welcoming all members of the Kashmiri diaspora regardless of background"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              About KGNA
            </h1>
            <p className="text-lg text-muted-foreground">
              For over 30 years, we&apos;ve been the bridge connecting Kashmiri Americans
              to their roots while building a vibrant community for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-serif font-bold">Our Mission</h2>
                  </div>
                  <p className="text-muted-foreground">
                    {MISSION_STATEMENT}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-serif font-bold">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground">
                    To be the leading organization that empowers Kashmiri Americans to thrive
                    while maintaining strong connections to their cultural heritage, creating a
                    legacy that spans generations.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Core Values */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-center mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Journey</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={cn(
                      "relative flex items-center",
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    )}
                  >
                    <div className={cn(
                      "w-full md:w-5/12",
                      index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                    )}>
                      <Card>
                        <CardContent className="p-6">
                          <Badge className="mb-2">{milestone.year}</Badge>
                          <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-8 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:-ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-4">Our Leadership Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Dedicated volunteers working tirelessly to serve our community and preserve our heritage
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Get Involved</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join us in our mission to preserve Kashmiri culture and build a stronger community.
              There are many ways to contribute your time, skills, and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/volunteer">
                <Button size="lg" variant="outline">
                  Become a Volunteer
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Heart className="mr-2 h-5 w-5" />
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}