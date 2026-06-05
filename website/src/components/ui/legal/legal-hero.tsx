"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, FileText } from "lucide-react";
import { tokens as runtimeTokens } from "@/lib/tokens";
import type { LegalMeta } from "./types";

interface LegalHeroProps {
  meta: LegalMeta;
}

export function LegalHero({ meta }: LegalHeroProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    margin: "200px 0px 200px 0px",
  });

  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  useEffect(() => {
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const eyebrowAnim = reduced ? false : { opacity: 0, y: 10 };
  const titleAnim = reduced ? false : { opacity: 0, y: 16 };
  const descAnim = reduced ? false : { opacity: 0, y: 10 };
  const stripAnim = reduced ? false : { opacity: 0, y: 8 };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-(--color-surface-base) text-white pt-24 pb-16"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {mounted && isSectionInView && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              maxPixelCount={1280 * 720}
              minPixelRatio={1}
              colors={runtimeTokens.meshGradient.about}
              distortion={0.6}
              swirl={0.4}
              speed={0.3}
              grainMixer={0.3}
              grainOverlay={0.05}
              offsetX={0.1}
            />
            <div className="absolute inset-0 bg-(--color-surface-base)/60 pointer-events-none" />
          </>
        )}
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={eyebrowAnim}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md mb-8 mx-auto"
          >
            <span className="flex h-2 w-2 rounded-full bg-(--color-brand-primary) shadow-[0_0_8px_rgba(0,112,243,0.6)]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-(--color-text-overline)">
              {meta.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={titleAnim}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: reduced ? 0 : 0.08,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
          >
            {meta.title}
          </motion.h1>

          <motion.p
            initial={descAnim}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: reduced ? 0 : 0.14,
            }}
            className="text-lg lg:text-xl text-(--color-text-secondary) font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {meta.description}
          </motion.p>

          <motion.div
            initial={stripAnim}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              delay: reduced ? 0 : 0.2,
            }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-(--color-text-muted)"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide">
              <Calendar
                className="w-3.5 h-3.5 text-(--color-text-overline)"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>{meta.lastUpdatedLabel}</span>
            </span>
            <span
              aria-hidden="true"
              className="hidden md:inline-block w-px h-3 bg-white/10"
            />
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide">
              <FileText
                className="w-3.5 h-3.5 text-(--color-text-overline)"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span lang="en" className="font-mono tracking-wider">
                {meta.version}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden md:inline-block w-px h-3 bg-white/10"
            />
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide">
              <Clock
                className="w-3.5 h-3.5 text-(--color-text-overline)"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>{meta.reading_time_minutes} dakikalık okuma</span>
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-(--color-surface-base) to-transparent z-20" />
    </section>
  );
}
