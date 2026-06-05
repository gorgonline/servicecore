"use client";

import { motion, Variants, useInView } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import { useState, useEffect, useRef } from "react";
import { tokens as runtimeTokens } from "@/lib/tokens";

interface AboutHeroProps {
  title: string;
  subtitle?: string;
  description: string;
}

export default function AboutHero({ title, subtitle, description }: AboutHeroProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-(--color-surface-base) text-white">
      {/* Background Shader */}
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
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md mb-8 mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-(--color-brand-primary)" />
            <span className="text-xs font-semibold tracking-[0.2em] text-(--color-text-overline) uppercase">
              {subtitle || "SERVICECORE HİKAYESİ"}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            {title}
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg lg:text-xl text-(--color-text-secondary) font-light max-w-2xl mx-auto leading-relaxed">
            {description}
          </motion.p>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-(--color-surface-base) to-transparent z-20" />
    </section>
  );
}
