"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";
import { tokens as runtimeTokens } from "@/lib/tokens";

interface ServiceCoreHeroProps {
  title: string;
  highlightedWord?: string; // Gradyan yapılacak kelime
  subtitle: string;
  badge?: string;
}

export default function ServiceCoreHero({ 
  title, 
  highlightedWord, 
  subtitle, 
  badge = "Operasyonel Mükemmellik" 
}: ServiceCoreHeroProps) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  useEffect(() => {
    if (!mounted) setMounted(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mounted]);

  // Başlığı parçalara ayırıp highlight kelimesini gradyanla sarmak için logic
  const renderTitle = () => {
    if (!highlightedWord) return title;
    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">
          {highlightedWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-32 pb-40 lg:pt-48 lg:pb-64 overflow-hidden bg-(--color-surface-base)"
    >
      {/* Dynamic Background Shader */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {mounted && isSectionInView && dimensions && !shouldReduceMotion && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={runtimeTokens.meshGradient.hero}
              distortion={0.6}
              swirl={0.4}
              speed={0.3}
              grainMixer={0.3}
              grainOverlay={0.05}
              offsetX={0.1}
            />
            <div className="absolute inset-0 bg-(--color-surface-base)/60" />
          </>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-(--color-brand-primary)" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-text-overline)">
              {badge}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
          >
            {renderTitle()}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
      
      {/* Premium Decorative Fade */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
    </section>
  );
}
