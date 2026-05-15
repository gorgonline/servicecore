"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface OfficeShowcaseProps {
  image: string;
  alt: string;
  label: string;
  mapQuery: string;
}

export function OfficeShowcase({ image, alt, label, mapQuery }: OfficeShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-160 md:h-168 lg:h-208 overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-[12%] -bottom-[12%]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-(--color-surface-base)/30" />
      <div className="absolute inset-0 bg-linear-to-t from-(--color-surface-base)/60 via-transparent to-transparent" />

      <div className="absolute top-6 right-6 md:top-10 md:right-10 w-64 md:w-80 h-48 md:h-56 rounded-2xl bg-(--color-surface-base)/40 border border-white/15 backdrop-blur-md overflow-hidden shadow-2xl">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-(--color-surface-base)/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none">
          <span className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase">{label}</span>
        </div>
      </div>
    </section>
  );
}
