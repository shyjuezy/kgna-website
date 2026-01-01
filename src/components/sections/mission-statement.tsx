"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MISSION_STATEMENT } from "@/lib/constants";
import { Heart, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: Heart,
    title: "Charitable",
    description: "Supporting our community through philanthropic initiatives and humanitarian aid"
  },
  {
    icon: GraduationCap,
    title: "Educational",
    description: "Preserving and teaching Kashmiri language, history, and cultural traditions"
  },
  {
    icon: Users,
    title: "Scientific",
    description: "Promoting research and documentation of Kashmiri heritage and culture"
  }
];

export function MissionStatement() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {MISSION_STATEMENT}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <pillar.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </div>
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
          <Link href="/about">
            <Button size="lg" variant="outline">
              Learn More About KGNA
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}