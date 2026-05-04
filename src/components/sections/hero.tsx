"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT, PLACEHOLDER_IMAGES } from "@/lib/constants";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

type HeroProps = {
  headline?: string;
  subheadline?: string;
  cta1?: string;
  cta2?: string;
  cta1Href?: string;
  cta2Href?: string;
  image?: string;
};

export function Hero({
  headline = HERO_CONTENT.headline,
  subheadline = HERO_CONTENT.subheadline,
  cta1 = HERO_CONTENT.cta1,
  cta2 = HERO_CONTENT.cta2,
  cta1Href = "/events",
  cta2Href = "/donate",
  image = PLACEHOLDER_IMAGES.heroBackground,
}: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Kashmir Valley"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href={cta1Href}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Calendar className="mr-2 h-5 w-5" />
                {cta1}
              </Button>
            </Link>
            <Link href={cta2Href}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-black"
              >
                {cta2}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
