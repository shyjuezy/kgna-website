"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { motion } from "framer-motion";

const galleryImages = [
  {
    id: "1",
    url: PLACEHOLDER_IMAGES.kashmir1,
    title: "Kashmir Valley",
    category: "landscape"
  },
  {
    id: "2",
    url: PLACEHOLDER_IMAGES.culturalEvent,
    title: "Cultural Festival 2023",
    category: "events"
  },
  {
    id: "3",
    url: PLACEHOLDER_IMAGES.food,
    title: "Traditional Wazwan",
    category: "cuisine"
  },
  {
    id: "4",
    url: PLACEHOLDER_IMAGES.tradition,
    title: "Heritage Crafts",
    category: "culture"
  },
  {
    id: "5",
    url: PLACEHOLDER_IMAGES.community,
    title: "Community Gathering",
    category: "events"
  },
  {
    id: "6",
    url: PLACEHOLDER_IMAGES.kashmir2,
    title: "Dal Lake",
    category: "landscape"
  },
  {
    id: "7",
    url: PLACEHOLDER_IMAGES.team,
    title: "Volunteer Team",
    category: "community"
  },
  {
    id: "8",
    url: PLACEHOLDER_IMAGES.kashmir3,
    title: "Mountain Ranges",
    category: "landscape"
  }
];

export function FeaturedGallery() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Photo Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capturing moments from our events and the beauty of Kashmir
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="break-inside-avoid"
            >
              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={image.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/gallery">
            <Button size="lg" variant="outline">
              View Full Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}