"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Boxes,
  Building2,
  Code,
  Headphones,
  Layers,
  Network,
  Settings,
  Truck,
  type LucideIcon,
} from "lucide-react";
import cozumlerData from "@/data/cozumler.json";
import bolumler from "@/data/anasayfa-bolumler.json";
import { En } from "@/components/ui/En";

interface Solution {
  slug: string;
  abbr: string;
  name: string;
  name_tr: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  modules: string[];
}

interface AccentTone {
  text: string;
  chip: string;
  border: string;
  glow: string;
}

const ICONS: Record<string, LucideIcon> = {
  Settings,
  Building2,
  Layers,
  Headphones,
  Network,
  Truck,
  Box,
  Boxes,
  Code,
};

const ACCENTS: Record<string, AccentTone> = {
  blue: {
    text: "text-(--color-accent-blue-light)",
    chip: "bg-(--color-accent-blue-base)/10 border-(--color-accent-blue-base)/30",
    border: "group-hover:border-(--color-accent-blue-base)/40",
    glow: "bg-(--color-accent-blue-base)/20",
  },
  purple: {
    text: "text-(--color-accent-purple-light)",
    chip: "bg-(--color-accent-purple-base)/10 border-(--color-accent-purple-base)/30",
    border: "group-hover:border-(--color-accent-purple-base)/40",
    glow: "bg-(--color-accent-purple-base)/20",
  },
  emerald: {
    text: "text-(--color-accent-emerald-light)",
    chip: "bg-(--color-accent-emerald-base)/10 border-(--color-accent-emerald-base)/30",
    border: "group-hover:border-(--color-accent-emerald-base)/40",
    glow: "bg-(--color-accent-emerald-base)/20",
  },
  cyan: {
    text: "text-(--color-accent-cyan-light)",
    chip: "bg-(--color-accent-cyan-base)/10 border-(--color-accent-cyan-base)/30",
    border: "group-hover:border-(--color-accent-cyan-base)/40",
    glow: "bg-(--color-accent-cyan-base)/20",
  },
  orange: {
    text: "text-(--color-accent-orange-light)",
    chip: "bg-(--color-accent-orange-base)/10 border-(--color-accent-orange-base)/30",
    border: "group-hover:border-(--color-accent-orange-base)/40",
    glow: "bg-(--color-accent-orange-base)/20",
  },
  pink: {
    text: "text-(--color-accent-pink-light)",
    chip: "bg-(--color-accent-pink-base)/10 border-(--color-accent-pink-base)/30",
    border: "group-hover:border-(--color-accent-pink-base)/40",
    glow: "bg-(--color-accent-pink-base)/20",
  },
  amber: {
    text: "text-(--color-accent-amber-light)",
    chip: "bg-(--color-accent-amber-base)/10 border-(--color-accent-amber-base)/30",
    border: "group-hover:border-(--color-accent-amber-base)/40",
    glow: "bg-(--color-accent-amber-base)/20",
  },
  teal: {
    text: "text-(--color-accent-sky-light)",
    chip: "bg-(--color-accent-sky-base)/10 border-(--color-accent-sky-base)/30",
    border: "group-hover:border-(--color-accent-sky-base)/40",
    glow: "bg-(--color-accent-sky-base)/20",
  },
  indigo: {
    text: "text-(--color-accent-blue-light)",
    chip: "bg-(--color-brand-primary)/10 border-(--color-brand-primary)/30",
    border: "group-hover:border-(--color-brand-primary)/40",
    glow: "bg-(--color-brand-primary)/20",
  },
};

function toneOf(accent: string): AccentTone {
  return ACCENTS[accent] ?? ACCENTS.blue;
}

const SOLUTIONS = cozumlerData.solutions as Solution[];
const CONTENT = bolumler.cozumler;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 26 },
  },
};

export function SolutionsSection() {
  const reduceMotion = useReducedMotion();
  const featured = SOLUTIONS.find((s) => s.slug === CONTENT.featuredSlug) ?? SOLUTIONS[0];
  const rest = SOLUTIONS.filter((s) => s.slug !== featured.slug);

  return (
    <section className="relative w-full py-24 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute -top-40 left-1/4 w-[45%] h-[60%] rounded-full bg-(--color-brand-primary)/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35%] h-[50%] rounded-full bg-(--color-accent-purple-base)/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-(--color-brand-primary)" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                {CONTENT.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
              {CONTENT.title}
            </h2>
            <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {cozumlerData.intro.description}
            </p>
          </div>

          <Link
            href={CONTENT.cta.href}
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 font-medium text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) cursor-pointer"
          >
            {CONTENT.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Featured solution */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <FeaturedCard solution={featured} />
          </motion.div>

          {rest.map((solution) => (
            <motion.div key={solution.slug} variants={cardVariants}>
              <SolutionCard solution={solution} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCard({ solution }: { solution: Solution }) {
  const tone = toneOf(solution.accent);
  const Icon = ICONS[solution.icon] ?? Settings;

  return (
    <Link
      href={`/cozumler/${solution.slug}`}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl p-8 md:p-10 transition-all duration-500 hover:bg-white/6 hover:shadow-(--shadow-glow-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) cursor-pointer ${tone.border}`}
    >
      <div className={`absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px] transition-opacity duration-700 opacity-60 group-hover:opacity-100 ${tone.glow}`} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${tone.chip}`}>
            <Icon className={`h-6 w-6 ${tone.text}`} />
          </span>
          <span className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.18em] ${tone.chip} ${tone.text}`}>
            <En>{solution.abbr}</En>
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
          {solution.name_tr}
        </h3>
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-(--color-text-muted) mb-5">
          <En>{solution.name}</En>
        </p>
        <p className="max-w-xl text-sm md:text-base text-(--color-text-secondary) font-light leading-relaxed">
          {solution.description}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-white">
        {CONTENT.cardCta}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  const tone = toneOf(solution.accent);
  const Icon = ICONS[solution.icon] ?? Settings;

  return (
    <Link
      href={`/cozumler/${solution.slug}`}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/8 bg-white/2 backdrop-blur-md p-8 transition-all duration-500 hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) cursor-pointer ${tone.border}`}
    >
      <div className={`absolute -left-20 -bottom-20 h-40 w-40 rounded-full blur-[70px] opacity-40 transition-opacity duration-700 group-hover:opacity-90 ${tone.glow}`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${tone.chip}`}>
            <Icon className={`h-5 w-5 ${tone.text}`} />
          </span>
          <span className={`font-mono text-[11px] font-semibold tracking-[0.18em] ${tone.text}`}>
            <En>{solution.abbr}</En>
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
          {solution.name_tr}
        </h3>
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
          {solution.tagline}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-semibold text-(--color-text-overline) transition-colors duration-300 group-hover:text-white">
        {CONTENT.cardCta}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
