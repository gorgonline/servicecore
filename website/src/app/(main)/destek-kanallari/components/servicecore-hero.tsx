"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import destekData from "@/data/destek-kanallari.json";

export function ServiceCoreHero() {
  const { description } = destekData.hero;

  return (
    <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-(--color-surface-base)">
      {/* Brand Aligned Dynamic Background Glares */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-(--color-brand-primary)/20 to-transparent opacity-60 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-150 h-150 bg-emerald-500/10 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10 flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
        {/* Title Side */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-(--color-brand-primary)/10 to-emerald-500/10 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-(--color-brand-primary)" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
              Operasyonel Mükemmellik
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            Premium <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">BT Destek</span>
          </h1>
        </motion.div>
        
        {/* Description Side */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {description.split("\\n\\n").map((paragraph, index) => (
            <p
              key={index}
              className={`${
                index === 0 
                  ? "text-lg md:text-xl text-(--color-text-overline)" 
                  : "text-base text-(--color-text-secondary)"
              } font-light leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}
          
          <div className="flex flex-wrap gap-4 mt-4">
            <a 
              href="#packages"
              className="rounded-full h-14 px-8 inline-flex items-center justify-center bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) text-white font-semibold cursor-pointer transition-all duration-300 shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong)"
            >
              SLA Paketlerini İnceleyin
            </a>
            <a 
               href="#channels"
               className="rounded-full h-14 px-8 inline-flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium cursor-pointer transition-colors"
            >
              Destek Kanalları
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade line matching pricing section */}
      <div className="absolute bottom-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
