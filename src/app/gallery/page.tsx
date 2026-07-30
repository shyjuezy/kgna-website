"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { safeImageUrl } from "@/lib/images";
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  Mountain,
  Heart,
  Grid3x3,
  LayoutGrid
} from "lucide-react";
import { motion } from "framer-motion";
import type { CmsPageContent } from "@/lib/cms";

// export const metadata: Metadata = {
//   title: "Photo Gallery",
//   description: "Explore our collection of photos capturing the essence of Kashmiri culture, community events, and the natural beauty of Kashmir.",
// };

// Gallery categories
type GalleryCategory = "all" | "events" | "culture" | "landscape" | "community" | "heritage";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: GalleryCategory;
  date?: string;
  location?: string;
  featured?: boolean;
};

// Gallery items data
const galleryItems: GalleryItem[] = [
  // Events
  {
    id: 1,
    title: "Annual Cultural Festival 2024",
    description: "Community members celebrating at our flagship event",
    image: PLACEHOLDER_IMAGES.culturalEvent,
    category: "events" as GalleryCategory,
    date: "June 2024",
    location: "New York",
    featured: true
  },
  {
    id: 2,
    title: "Youth Leadership Summit",
    description: "Young leaders discussing community initiatives",
    image: PLACEHOLDER_IMAGES.team,
    category: "events" as GalleryCategory,
    date: "April 2024",
    location: "Chicago"
  },
  {
    id: 3,
    title: "Community Iftar Gathering",
    description: "Breaking fast together during Ramadan",
    image: PLACEHOLDER_IMAGES.community,
    category: "events" as GalleryCategory,
    date: "March 2024",
    location: "Boston"
  },

  // Culture
  {
    id: 4,
    title: "Traditional Wazwan Preparation",
    description: "Master chefs preparing the grand feast",
    image: PLACEHOLDER_IMAGES.food,
    category: "culture" as GalleryCategory,
    date: "2024",
    featured: true
  },
  {
    id: 5,
    title: "Kashmiri Handicrafts Exhibition",
    description: "Showcasing traditional arts and crafts",
    image: PLACEHOLDER_IMAGES.tradition,
    category: "culture" as GalleryCategory,
    date: "2024"
  },
  {
    id: 6,
    title: "Traditional Dance Performance",
    description: "Rouf dance performance at cultural event",
    image: PLACEHOLDER_IMAGES.culturalEvent,
    category: "culture" as GalleryCategory,
    date: "2024"
  },

  // Landscape
  {
    id: 7,
    title: "Dal Lake at Sunset",
    description: "The iconic Dal Lake with houseboats",
    image: PLACEHOLDER_IMAGES.kashmir1,
    category: "landscape" as GalleryCategory,
    location: "Kashmir",
    featured: true
  },
  {
    id: 8,
    title: "Mountain Ranges of Kashmir",
    description: "Snow-capped peaks of the Himalayas",
    image: PLACEHOLDER_IMAGES.kashmir3,
    category: "landscape" as GalleryCategory,
    location: "Kashmir"
  },
  {
    id: 9,
    title: "Mughal Gardens",
    description: "Historic gardens in full bloom",
    image: PLACEHOLDER_IMAGES.kashmir2,
    category: "landscape" as GalleryCategory,
    location: "Kashmir"
  },

  // Community
  {
    id: 10,
    title: "Volunteer Team Meeting",
    description: "Planning committee for upcoming events",
    image: PLACEHOLDER_IMAGES.team,
    category: "community" as GalleryCategory,
    date: "2024"
  },
  {
    id: 11,
    title: "Youth Workshop",
    description: "Teaching Kashmiri language to children",
    image: PLACEHOLDER_IMAGES.community,
    category: "community" as GalleryCategory,
    date: "2024"
  },
  {
    id: 12,
    title: "Senior Citizens Gathering",
    description: "Elders sharing stories and traditions",
    image: PLACEHOLDER_IMAGES.community,
    category: "community" as GalleryCategory,
    date: "2024"
  },

  // Heritage
  {
    id: 13,
    title: "Historic Mosque Architecture",
    description: "Traditional Kashmiri wooden architecture",
    image: PLACEHOLDER_IMAGES.kashmir1,
    category: "heritage" as GalleryCategory,
    location: "Kashmir"
  },
  {
    id: 14,
    title: "Traditional Craftsmanship",
    description: "Artisan working on Paper Mache",
    image: PLACEHOLDER_IMAGES.tradition,
    category: "heritage" as GalleryCategory,
    date: "2024"
  },
  {
    id: 15,
    title: "Cultural Artifacts Display",
    description: "Historic items from Kashmir",
    image: PLACEHOLDER_IMAGES.tradition,
    category: "heritage" as GalleryCategory,
    date: "2024"
  }
];

const categoryData = [
  { value: "all", label: "All Photos", icon: Grid3x3, count: galleryItems.length },
  { value: "events", label: "Events", icon: Calendar, count: galleryItems.filter(i => i.category === "events").length },
  { value: "culture", label: "Culture", icon: Heart, count: galleryItems.filter(i => i.category === "culture").length },
  { value: "landscape", label: "Landscapes", icon: Mountain, count: galleryItems.filter(i => i.category === "landscape").length },
  { value: "community", label: "Community", icon: Users, count: galleryItems.filter(i => i.category === "community").length },
  { value: "heritage", label: "Heritage", icon: Camera, count: galleryItems.filter(i => i.category === "heritage").length }
];

export default function GalleryPage() {
  const [cmsContent, setCmsContent] = useState<CmsPageContent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const getSection = (type: string) => cmsContent?.sections.find((section) => section.type === type)?.props;
  const text = (props: Record<string, unknown> | undefined, key: string, fallback: string) => {
    const value = props?.[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const hero = getSection("hero");
  const gallery = getSection("gallery");
  const featured = getSection("featured") ?? gallery;
  const cta = getSection("cta") ?? gallery;
  const cmsGalleryItems = Array.isArray(gallery?.items)
    ? gallery.items.map((item, index) => {
        const record = item as Record<string, unknown>;
        return {
          id: Number(record.id ?? index + 1),
          title: typeof record.title === "string" ? record.title : "Gallery photo",
          description: typeof record.description === "string" ? record.description : "",
          image: safeImageUrl(record.image, PLACEHOLDER_IMAGES.community),
          category: (typeof record.category === "string" ? record.category : "community") as GalleryCategory,
          date: typeof record.date === "string" ? record.date : undefined,
          location: typeof record.location === "string" ? record.location : undefined,
          featured: record.featured === "yes",
        };
      })
    : galleryItems;

  useEffect(() => {
    fetch("/api/cms/gallery")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setCmsContent(payload?.content ?? null))
      .catch(() => setCmsContent(null));
  }, []);

  const filteredItems = selectedCategory === "all"
    ? cmsGalleryItems
    : cmsGalleryItems.filter(item => item.category === selectedCategory);

  const featuredItems = cmsGalleryItems.filter(item => item.featured);
  const currentCategoryData = categoryData.map((category) => ({
    ...category,
    count: category.value === "all"
      ? cmsGalleryItems.length
      : cmsGalleryItems.filter((item) => item.category === category.value).length,
  }));

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
              {text(hero, "heading", "Photo Gallery")}
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
                "Capturing moments from our events, cultural celebrations, and the breathtaking beauty of Kashmir through the lens.",
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-6">
              {text(featured, "heading", text(featured, "featuredHeading", "Featured Photos"))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.description}</p>
                        </div>
                      </div>
                      <Badge className="absolute top-4 right-4">Featured</Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Category Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {currentCategoryData.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.value as GalleryCategory)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-end mb-6">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "masonry" ? "default" : "outline"}
                  onClick={() => setViewMode("masonry")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
            }>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={viewMode === "masonry" ? "break-inside-avoid mb-4" : ""}
                >
                  <div
                    className="group cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className={`relative ${
                        viewMode === "masonry"
                          ? index % 3 === 0 ? "h-80" : index % 3 === 1 ? "h-64" : "h-72"
                          : "h-64"
                      }`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-white text-center p-4">
                              <h3 className="font-semibold mb-1">{item.title}</h3>
                              <p className="text-sm opacity-90">{item.description}</p>
                              {item.date && (
                                <div className="flex items-center justify-center gap-2 mt-2 text-xs">
                                  <Calendar className="h-3 w-3" />
                                  {item.date}
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center justify-center gap-2 mt-1 text-xs">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={`absolute top-2 left-2 ${
                          item.category === "events" ? "bg-blue-500" :
                          item.category === "culture" ? "bg-purple-500" :
                          item.category === "landscape" ? "bg-green-500" :
                          item.category === "community" ? "bg-orange-500" :
                          "bg-pink-500"
                        }`}>
                          {item.category}
                        </Badge>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal (Simple version) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-background/95 backdrop-blur p-6 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-muted-foreground mb-3">{selectedImage.description}</p>
              <div className="flex items-center gap-4 text-sm">
                {selectedImage.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedImage.date}
                  </div>
                )}
                {selectedImage.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedImage.location}
                  </div>
                )}
                <Badge>{selectedImage.category}</Badge>
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              {text(cta, "heading", text(cta, "ctaHeading", "Share Your Memories"))}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {text(
                cta,
                "body",
                text(
                  cta,
                  "ctaBody",
                  "Have photos from our events or cultural celebrations? We'd love to feature them in our gallery. Share your memories with the community!",
                ),
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Camera className="mr-2 h-5 w-5" />
                {text(cta, "primary", "Submit Photos")}
              </Button>
              <Button size="lg" variant="outline">
                {text(cta, "secondary", "View on Instagram")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
