"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import type { DatasheetCover, DatasheetMeta } from "./types";

interface HeroProps {
  cover: DatasheetCover;
  meta: DatasheetMeta;
}

export function DatasheetHero({ cover, meta }: HeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      data-ds-hero
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-32 pb-16 print:break-after-page print:min-h-[260mm] print:pt-12 print:pb-8"
    >
      {/* Soft single ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none print:hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(0,112,243,0.18), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12">
        {/* Eyebrow */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/8 mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-brand-primary) animate-pulse print:hidden" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-(--color-brand-accent)">
            {cover.eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="datasheet-h1 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl"
        >
          {cover.title_main}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">
            {cover.title_accent}
          </span>
        </motion.h1>

        {/* Lede */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl"
        >
          {cover.lede}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="mt-5 text-base font-light leading-relaxed text-(--color-text-muted) max-w-2xl"
        >
          {cover.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center gap-3 print:hidden"
        >
          <a
            href="/datasheet.pdf"
            download="Servicecore-Datasheet.pdf"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
            aria-label="Datasheet'i PDF olarak indir"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{cover.primary_cta.label}</span>
          </a>

          <a
            href={cover.secondary_cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
          >
            <span>{cover.secondary_cta.label}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>

        {/* Bottom meta */}
        <div className="mt-32 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-(--color-text-muted)">
          <span>{meta.version} · {meta.release_date} · {meta.language}</span>
          <span>{meta.company_full} — {meta.company_location}</span>
        </div>
      </div>
    </section>
  );
}
