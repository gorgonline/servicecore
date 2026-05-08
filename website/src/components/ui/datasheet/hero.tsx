"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
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
      className="relative min-h-dvh flex flex-col overflow-hidden pt-32 pb-12 print:break-after-page print:min-h-[260mm] print:pt-20 print:pb-12"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-205 h-205 rounded-full pointer-events-none print:hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(0,112,243,0.14), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center mx-auto w-full max-w-4xl px-6 lg:px-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[10px] font-mono font-semibold tracking-[0.28em] uppercase text-(--color-text-muted) mb-12"
        >
          {cover.eyebrow}
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
          className="datasheet-h1 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl"
        >
          {cover.title_main} {cover.title_accent}
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
          className="mt-10 text-lg md:text-xl font-light leading-relaxed text-(--color-text-secondary) max-w-2xl"
        >
          {cover.lede}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="mt-14 print:hidden"
        >
          <a
            href="/datasheet.pdf"
            download="Servicecore-Datasheet.pdf"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
            aria-label="Datasheet'i PDF olarak indir"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{cover.primary_cta.label}</span>
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 lg:px-12 mt-16 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-(--color-text-muted)">
        <span>
          {meta.version} · {meta.release_date} · {meta.language}
        </span>
        <span>{meta.company_full}</span>
      </div>
    </section>
  );
}
