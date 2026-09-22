"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChartColumnBig,
  Headset,
  Server,
  SlidersHorizontal,
  Sparkles,
  Timer,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import farkVarData from "@/data/fark-var.json";
import bolumler from "@/data/anasayfa-bolumler.json";

interface Ozellik {
  baslik: string;
  aciklama: string;
}

const ICONS: Record<string, LucideIcon> = {
  BadgeCheck,
  Timer,
  ChartColumnBig,
  Workflow,
  Building2,
  SlidersHorizontal,
  Server,
  Headset,
};

const ACCENT_TEXT: Record<string, string> = {
  blue: "text-(--color-accent-blue-light)",
  purple: "text-(--color-accent-purple-light)",
  emerald: "text-(--color-accent-emerald-light)",
  cyan: "text-(--color-accent-cyan-light)",
  orange: "text-(--color-accent-orange-light)",
  amber: "text-(--color-accent-amber-light)",
  indigo: "text-(--color-brand-accent)",
  pink: "text-(--color-accent-pink-light)",
};

const ACCENT_CHIP: Record<string, string> = {
  blue: "bg-(--color-accent-blue-base)/10 border-(--color-accent-blue-base)/25",
  purple: "bg-(--color-accent-purple-base)/10 border-(--color-accent-purple-base)/25",
  emerald: "bg-(--color-accent-emerald-base)/10 border-(--color-accent-emerald-base)/25",
  cyan: "bg-(--color-accent-cyan-base)/10 border-(--color-accent-cyan-base)/25",
  orange: "bg-(--color-accent-orange-base)/10 border-(--color-accent-orange-base)/25",
  amber: "bg-(--color-accent-amber-base)/10 border-(--color-accent-amber-base)/25",
  indigo: "bg-(--color-brand-primary)/10 border-(--color-brand-primary)/25",
  pink: "bg-(--color-accent-pink-base)/10 border-(--color-accent-pink-base)/25",
};

const CONTENT = bolumler.farkYaratanlar;
const ALL_FEATURES = farkVarData.fark_yaratan_ozellikler as Ozellik[];

const SELECTED = CONTENT.secilenler
  .map((item) => {
    const match = ALL_FEATURES.find((f) => f.baslik === item.baslik);
    return match ? { ...item, aciklama: match.aciklama } : null;
  })
  .filter((item): item is { baslik: string; icon: string; accent: string; aciklama: string } => item !== null);

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

export function DifferentiatorsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-24 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[55%] rounded-full bg-(--color-accent-emerald-base)/6 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header — merkezli */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-(--color-accent-emerald-base)/10 border border-(--color-accent-emerald-base)/25 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-(--color-accent-emerald-light)" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-accent-emerald-light)">
              {CONTENT.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
            {CONTENT.title}
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            {CONTENT.description}
          </p>
        </motion.div>

        {/* İki sütunlu liste — tek cam panel */}
        <motion.div
          variants={listVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl"
        >
          {SELECTED.map((item, index) => {
            const Icon = ICONS[item.icon] ?? BadgeCheck;
            const isLeftColumn = index % 2 === 0;
            const isLastRowOnDesktop = index >= SELECTED.length - (SELECTED.length % 2 === 0 ? 2 : 1);
            return (
              <motion.div
                key={item.baslik}
                variants={rowVariants}
                className={`group relative flex gap-5 p-7 lg:p-8 border-b border-white/5 last:border-b-0 transition-colors duration-500 hover:bg-white/4 ${
                  isLeftColumn ? "md:border-r md:border-r-white/5" : ""
                } ${isLastRowOnDesktop ? "md:border-b-0" : ""}`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 ${
                    ACCENT_CHIP[item.accent] ?? ACCENT_CHIP.blue
                  }`}
                >
                  <Icon className={`h-5 w-5 ${ACCENT_TEXT[item.accent] ?? ACCENT_TEXT.blue}`} />
                </span>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-[11px] font-semibold text-(--color-text-dim)">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-white">
                      {item.baslik}
                    </h3>
                  </div>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                    {item.aciklama}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href={CONTENT.cta.href}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 font-medium text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-(--shadow-glow-primary-weak) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) cursor-pointer"
          >
            {CONTENT.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
