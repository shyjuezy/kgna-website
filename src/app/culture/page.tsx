import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import {
  Palette,
  Music,
  Utensils,
  BookOpen,
  Users,
  Heart,
  Sparkles,
  Mountain,
  Languages,
  Calendar
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kashmiri Culture & Heritage",
  description: "Explore the rich cultural heritage of Kashmir - from traditional arts and crafts to cuisine, music, language, and festivals.",
};

// Cultural data
const culturalArts = [
  {
    name: "Pashmina Weaving",
    description: "The world-renowned art of weaving the finest cashmere wool into luxurious shawls",
    icon: Sparkles,
    image: PLACEHOLDER_IMAGES.tradition,
    details: "Pashmina, derived from the Persian word 'pashm' meaning wool, represents centuries of Kashmiri craftsmanship. Each authentic Pashmina shawl takes months to complete by hand."
  },
  {
    name: "Paper Mache",
    description: "Intricate decorative art using paper pulp, featuring colorful designs and patterns",
    icon: Palette,
    image: PLACEHOLDER_IMAGES.tradition,
    details: "Known locally as 'kar-i-qalamdani', this 14th-century art form involves creating beautiful objects decorated with intricate designs and vibrant colors."
  },
  {
    name: "Kani Shawls",
    description: "Traditional woven shawls with intricate patterns using small wooden sticks called 'kanis'",
    icon: Sparkles,
    image: PLACEHOLDER_IMAGES.tradition,
    details: "These masterpieces can take up to a year to complete, with patterns so complex they're coded in a special notation system called 'talim'."
  },
  {
    name: "Walnut Wood Carving",
    description: "Exquisite carved furniture and decorative items from Kashmir's walnut trees",
    icon: Mountain,
    image: PLACEHOLDER_IMAGES.tradition,
    details: "Kashmiri walnut carving is distinguished by its deep undercutting and intricate open work called 'jali', creating stunning three-dimensional effects."
  }
];

const traditionalCuisine = [
  {
    name: "Wazwan",
    description: "The grand feast of 36 courses, a culinary art form and social ritual",
    highlights: ["Rista", "Rogan Josh", "Tabak Maaz", "Gushtaba"],
    traditions: "Served on large copper plates called 'trami', shared by four people"
  },
  {
    name: "Kahwa",
    description: "Traditional green tea infused with saffron, cardamom, and almonds",
    highlights: ["Saffron", "Cardamom", "Cinnamon", "Almonds"],
    traditions: "Served in small shallow cups called 'khos' as a symbol of hospitality"
  },
  {
    name: "Noon Chai",
    description: "Pink salt tea, a morning tradition served with traditional breads",
    highlights: ["Special tea leaves", "Salt", "Milk", "Baking soda"],
    traditions: "Accompanied by various Kashmiri breads like bakarkhani and sheermal"
  },
  {
    name: "Harisa",
    description: "Traditional winter delicacy made from mutton and rice",
    highlights: ["Slow-cooked overnight", "Winter specialty", "Nutritious", "Communal preparation"],
    traditions: "Traditionally prepared in large copper vessels during cold winter mornings"
  }
];

const festivals = [
  {
    name: "Navroz",
    description: "Persian New Year celebrating the arrival of spring",
    date: "March 21",
    significance: "Marks renewal, hope, and the triumph of good over evil"
  },
  {
    name: "Shivratri (Herath)",
    description: "The great night of Shiva, celebrated uniquely in Kashmir",
    date: "February/March",
    significance: "Celebrates the marriage of Shiva and Parvati with unique Kashmiri rituals"
  },
  {
    name: "Baisakhi",
    description: "Harvest festival marking the solar new year",
    date: "April 13-14",
    significance: "Celebrates the harvest season and new beginnings"
  },
  {
    name: "Kheer Bhawani Festival",
    description: "Annual festival at the sacred Kheer Bhawani temple",
    date: "May/June",
    significance: "Devotees gather to worship the goddess Ragnya Devi"
  }
];

const musicAndDance = [
  {
    name: "Rouf",
    description: "Traditional dance performed by women during festivities",
    details: "Graceful footwork combined with synchronized movements, performed in rows"
  },
  {
    name: "Hafiza",
    description: "Classical dance form with Sufi influences",
    details: "Combines spiritual expression with artistic movement"
  },
  {
    name: "Santoor",
    description: "The hundred-stringed musical instrument",
    details: "Kashmir's signature instrument, creating ethereal melodies"
  },
  {
    name: "Rabab",
    description: "Traditional string instrument central to Kashmiri music",
    details: "Accompanies Sufi music and traditional folk songs"
  }
];

export default function CulturePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Kashmiri Culture & Heritage
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the rich tapestry of Kashmir&apos;s cultural heritage - from ancient arts
              and crafts to vibrant festivals, traditional cuisine, and timeless customs that
              define our identity.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-serif font-bold">Our Cultural Legacy</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Kashmir&apos;s culture is a unique blend of various influences that have shaped
                  its identity over millennia. Known as &quot;Paradise on Earth,&quot; Kashmir has been
                  a melting pot of Persian, Central Asian, and Indian influences, creating a
                  distinctive cultural identity.
                </p>
                <p className="text-muted-foreground">
                  From the intricate patterns of our handicrafts to the soul-stirring melodies
                  of our music, from the aromatic spices of our cuisine to the graceful movements
                  of our dances, every aspect of Kashmiri culture tells a story of resilience,
                  creativity, and deep spiritual connection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Arts and Crafts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">Traditional Arts & Crafts</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Kashmir&apos;s handicrafts are world-renowned for their exquisite beauty and
                meticulous craftsmanship passed down through generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {culturalArts.map((art) => (
                <Card key={art.name} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={art.image}
                      alt={art.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <art.icon className="h-5 w-5" />
                        <h3 className="text-xl font-semibold">{art.name}</h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-3">{art.description}</p>
                    <p className="text-sm">{art.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Utensils className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-serif font-bold">Kashmiri Cuisine</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A culinary journey through the flavors of Kashmir, where every dish tells a story
                of tradition, hospitality, and celebration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {traditionalCuisine.map((dish) => (
                <Card key={dish.name}>
                  <CardHeader>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardDescription>{dish.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Key Elements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dish.highlights.map((item) => (
                          <Badge key={item} variant="secondary">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{dish.traditions}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music and Dance */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Music className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-serif font-bold">Music & Dance</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The rhythm and melodies that echo through the valleys, expressing joy,
                devotion, and the soul of Kashmir.
              </p>
            </div>

            <Tabs defaultValue="dance" className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto">
                <TabsTrigger value="dance">Traditional Dances</TabsTrigger>
                <TabsTrigger value="music">Musical Instruments</TabsTrigger>
              </TabsList>

              <TabsContent value="dance" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {musicAndDance.filter((item) => item.name === "Rouf" || item.name === "Hafiza").map((dance) => (
                    <Card key={dance.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          {dance.name}
                        </CardTitle>
                        <CardDescription>{dance.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{dance.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="music" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {musicAndDance.filter((item) => item.name === "Santoor" || item.name === "Rabab").map((instrument) => (
                    <Card key={instrument.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Music className="h-5 w-5 text-primary" />
                          {instrument.name}
                        </CardTitle>
                        <CardDescription>{instrument.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{instrument.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-serif font-bold">Festivals & Celebrations</h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Throughout the year, Kashmir celebrates diverse festivals that reflect our
                plural cultural heritage and communal harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {festivals.map((festival) => (
                <Card key={festival.name} className="h-full">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{festival.date}</Badge>
                    <CardTitle className="text-lg">{festival.name}</CardTitle>
                    <CardDescription>{festival.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{festival.significance}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Language Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Languages className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-serif font-bold">Kashmiri Language</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Kashmiri (کٲشُر), also known as Koshur, is an Indo-Aryan language spoken by
                  approximately 7 million people. It has a rich literary tradition dating back
                  to the 14th century, with poets like Lal Ded and Habba Khatoon contributing
                  to its classical literature.
                </p>
                <p className="text-muted-foreground mb-6">
                  The language uses both Perso-Arabic and Devanagari scripts and is known for
                  its unique phonetic features and rich vocabulary influenced by Sanskrit,
                  Persian, and Arabic.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-primary mb-1">7M+</p>
                    <p className="text-sm text-muted-foreground">Native Speakers</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-primary mb-1">700+</p>
                    <p className="text-sm text-muted-foreground">Years of Literature</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-primary mb-1">2</p>
                    <p className="text-sm text-muted-foreground">Writing Scripts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Preserve Our Heritage
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join us in preserving and celebrating Kashmiri culture for future generations.
              Participate in our cultural programs, workshops, and events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  View Cultural Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}