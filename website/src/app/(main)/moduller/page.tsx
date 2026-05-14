"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  LayoutGrid,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  MousePointerClick,
  FileText,
  RefreshCw,
  Box,
  Settings,
  TrendingUp,
  BookOpen,
  Activity,
  Terminal,
  LineChart,
  CheckCircle2,
  Users,
  Layers,
  Building2,
  UserCircle,
  Sliders,
  Smartphone,
  GitBranch,
  Link2,
  Code,
  FileSignature,
  Sparkles,
  Waypoints,
  Combine,
  CalendarClock,
  Plug,
  type LucideIcon,
} from "lucide-react";
import data from "@/data/moduller.json";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  AlertCircle,
  HelpCircle,
  MousePointerClick,
  FileText,
  RefreshCw,
  Box,
  Settings,
  TrendingUp,
  BookOpen,
  Activity,
  Terminal,
  LineChart,
  CheckCircle2,
  Users,
  Layers,
  Building2,
  UserCircle,
  Sliders,
  Smartphone,
  GitBranch,
  Link2,
  Code,
  FileSignature,
  Sparkles,
  Waypoints,
  Combine,
  CalendarClock,
  Plug,
};

const toneMap: Record<
  string,
  { bg: string; border: string; text: string; gradient: string }
> = {
  blue: {
    bg: "bg-blue-500/15",
    border: "border-blue-500/25",
    text: "text-(--color-accent-blue-light)",
    gradient: "from-blue-500/10",
  },
  emerald: {
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/25",
    text: "text-(--color-accent-emerald-light)",
    gradient: "from-emerald-500/10",
  },
  purple: {
    bg: "bg-purple-500/15",
    border: "border-purple-500/25",
    text: "text-(--color-accent-purple-light)",
    gradient: "from-purple-500/10",
  },
  cyan: {
    bg: "bg-cyan-500/15",
    border: "border-cyan-500/25",
    text: "text-(--color-accent-cyan-light)",
    gradient: "from-cyan-500/10",
  },
  orange: {
    bg: "bg-orange-500/15",
    border: "border-orange-500/25",
    text: "text-(--color-accent-orange-light)",
    gradient: "from-orange-500/10",
  },
  indigo: {
    bg: "bg-indigo-500/15",
    border: "border-indigo-500/25",
    text: "text-indigo-400",
    gradient: "from-indigo-500/10",
  },
};

export default function ModullerPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <LayoutGrid size={14} />
              {data.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {data.hero.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                {data.hero.titleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl mb-12"
            >
              {data.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 text-xs font-mono text-(--color-text-muted) tracking-wider"
            >
              <span className="text-(--color-accent-blue-light) font-semibold">
                {data.modules.length}
              </span>
              <span>entegre modül · native bağlantı · tek platform</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MODULES GRID */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.modules.map((mod, i) => {
              const Icon = iconMap[mod.icon] ?? LayoutGrid;
              const tone = toneMap[mod.tone] ?? toneMap.blue;
              return (
                <motion.div key={i} variants={fadeUp}>
                  <Link
                    href={mod.href}
                    className="group relative block rounded-3xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-white/20 transition-all p-6 overflow-hidden h-full cursor-pointer"
                  >
                    <div
                      className={`absolute -inset-10 bg-linear-to-br ${tone.gradient} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    />

                    <div className="relative flex flex-col h-full gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${tone.bg} border ${tone.border} flex items-center justify-center ${tone.text} shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) px-2 py-1 rounded-full bg-white/3 border border-white/8 shrink-0">
                          {mod.category}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">
                          {mod.name}
                        </h3>
                        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                          {mod.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                        <span
                          className={`text-xs font-semibold ${tone.text} group-hover:translate-x-0.5 transition-transform`}
                        >
                          İncele
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 ${tone.text} group-hover:translate-x-1 transition-transform`}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. CTA BANNER */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-32">
            <motion.div
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <LayoutGrid className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Modüller
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {data.cta.title}
                  </h2>

                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                    {data.cta.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={data.cta.primaryHref}>
                      <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                        {data.cta.primaryLabel}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link href={data.cta.secondaryHref}>
                      <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                        {data.cta.secondaryLabel}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
