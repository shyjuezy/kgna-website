"use client";

import { useEffect, useRef, useState } from "react";
import { IMPACT_STATS } from "@/lib/constants";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  {
    value: IMPACT_STATS.yearsActive,
    label: "Years of Service",
    suffix: "+"
  },
  {
    value: IMPACT_STATS.members,
    label: "Community Members",
    suffix: "+",
    prefix: ""
  },
  {
    value: IMPACT_STATS.eventsHosted,
    label: "Events Hosted",
    suffix: "+"
  },
  {
    value: IMPACT_STATS.citiesServed,
    label: "Cities Across NA",
    suffix: "+"
  }
];

type ImpactStatsProps = {
  heading?: string;
  body?: string;
  items?: Array<{ value?: string; label?: string; suffix?: string; prefix?: string }>;
};

export function ImpactStats({
  heading = "Our Impact",
  body = "Building bridges across generations and preserving our heritage for the future",
  items,
}: ImpactStatsProps) {
  const displayStats = items?.length
    ? items.map((item) => ({
        value: Number.parseInt(item.value ?? "0", 10) || 0,
        label: item.label ?? "",
        suffix: item.suffix ?? "",
        prefix: item.prefix ?? "",
      }))
    : stats;

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{heading}</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {body}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-sm md:text-base opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
