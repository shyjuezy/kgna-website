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

function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
}: CounterProps) {
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
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

type DisplayStat = {
  value: number;
  label: string;
  suffix: string;
  prefix: string;
};

const stats: DisplayStat[] = [
  {
    value: IMPACT_STATS.events,
    label: "Events",
    suffix: "+",
    prefix: "",
  },
  {
    value: IMPACT_STATS.attendees,
    label: "Attendees",
    suffix: "+",
    prefix: "",
  },
  {
    value: IMPACT_STATS.patrons,
    label: "Patrons",
    suffix: "+",
    prefix: "",
  },
];

/**
 * CMS values are authored as display strings like "5000+" or "1,200". Pull the
 * leading number out for the count-up animation and keep whatever follows as a
 * suffix, so a trailing "+" is not silently dropped. An explicit suffix or
 * prefix from the CMS always wins.
 */
function parseStatValue(raw: string) {
  const match = raw.trim().match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!match) {
    return { value: 0, prefix: "", suffix: raw.trim() };
  }
  const [, prefix, digits, suffix] = match;
  return {
    value: Number.parseFloat(digits.replace(/,/g, "")) || 0,
    prefix: prefix.trim(),
    suffix: suffix.trim(),
  };
}

// Keep the last row balanced instead of always assuming four metrics.
function columnsClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-3";
  if (count % 4 === 0) return "grid-cols-2 lg:grid-cols-4";
  if (count % 3 === 0) return "grid-cols-2 lg:grid-cols-3";
  return "grid-cols-2 lg:grid-cols-4";
}

type ImpactStatsProps = {
  heading?: string;
  body?: string;
  items?: Array<{
    value?: string;
    label?: string;
    suffix?: string;
    prefix?: string;
  }>;
};

export function ImpactStats({
  heading = "Our Impact",
  body = "Building bridges across generations and preserving our heritage for the future",
  items,
}: ImpactStatsProps) {
  const displayStats = items?.length
    ? items.map((item) => {
        const parsed = parseStatValue(item.value ?? "");
        return {
          value: parsed.value,
          label: item.label ?? "",
          suffix: item.suffix ?? parsed.suffix,
          prefix: item.prefix ?? parsed.prefix,
        };
      })
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {heading}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{body}</p>
        </motion.div>

        <div className={`grid ${columnsClass(displayStats.length)} gap-8`}>
          {displayStats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
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
              <div className="text-sm md:text-base opacity-90">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
