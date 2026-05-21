"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Layers,
  ArrowRight,
  CalendarClock,
  AlertTriangle,
  Clock,
  XCircle,
  CheckCircle2,
  MinusCircle,
  LayoutDashboard,
  ListChecks,
  KanbanSquare,
  Route,
  ScanSearch,
  ArrowLeftRight,
  ShieldCheck,
  Server,
  Settings,
  WifiOff,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { JiraComparisonTable } from "@/components/ui/jira-comparison-table";
import data from "@/data/jira-karsilastirma.json";

type Tone = "past" | "imminent" | "future";

interface ToneStyle {
  badge: string;
  badgeText: string;
  dot: string;
  card: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  glow?: string;
}

const toneStyles: Record<Tone, ToneStyle> = {
  past: {
    badge: "bg-white/5 border-white/10",
    badgeText: "text-(--color-text-muted)",
    dot: "bg-white/30",
    card: "bg-white/2 border-white/8",
    label: "Geçti",
    icon: Clock,
    iconColor: "text-(--color-text-muted)",
  },
  imminent: {
    badge: "bg-amber-500/15 border-amber-500/30",
    badgeText: "text-amber-300",
    dot: "bg-amber-400 animate-pulse",
    card: "bg-amber-500/8 border-amber-500/30",
    label: "Yaklaşıyor",
    icon: AlertTriangle,
    iconColor: "text-amber-300",
    glow: "shadow-[0_0_50px_-10px_rgba(251,191,36,0.35)]",
  },
  future: {
    badge: "bg-red-500/10 border-red-500/25",
    badgeText: "text-(--color-accent-red-light)",
    dot: "bg-(--color-accent-red-light)",
    card: "bg-red-500/4 border-red-500/15",
    label: "Yakında",
    icon: XCircle,
    iconColor: "text-(--color-accent-red-light)",
  },
};

const moduleAccents: Record<
  string,
  {
    glow: string;
    cardBg: string;
    iconBg: string;
    iconBorder: string;
    iconText: string;
    titleAccent: string;
  }
> = {
  blue: {
    glow: "bg-blue-500/10 group-hover:bg-blue-500/20",
    cardBg: "from-blue-500/5 to-purple-500/5",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconText: "text-(--color-accent-blue-light)",
    titleAccent: "text-(--color-accent-blue-light)",
  },
  purple: {
    glow: "bg-purple-500/10 group-hover:bg-purple-500/20",
    cardBg: "from-purple-500/5 to-indigo-500/5",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    iconText: "text-(--color-accent-purple-light)",
    titleAccent: "text-(--color-accent-purple-light)",
  },
  emerald: {
    glow: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    cardBg: "from-emerald-500/5 to-cyan-500/5",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconText: "text-(--color-accent-emerald-light)",
    titleAccent: "text-(--color-accent-emerald-light)",
  },
  cyan: {
    glow: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    cardBg: "from-cyan-500/5 to-sky-500/5",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
    iconText: "text-(--color-accent-cyan-light)",
    titleAccent: "text-(--color-accent-cyan-light)",
  },
};

const moduleIconMap = {
  LayoutDashboard,
  ListChecks,
  KanbanSquare,
  Route,
};

const onPremIconMap = {
  ShieldCheck,
  Server,
  Settings,
  WifiOff,
};

const migrationIconMap = {
  ScanSearch,
  ArrowLeftRight,
  ShieldCheck,
};

export default function JiraAlternatifiPage() {
  const reduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const heroStaggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const heroItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 22 },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroStaggerContainer}
            className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          >
            <motion.div
              variants={heroItem}
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Layers size={14} />
              {data.hero.badge}
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {data.hero.titleLead}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) via-(--color-accent-cyan-light) to-(--color-accent-purple-light)">
                {data.hero.titleHighlight}
              </span>{" "}
              {data.hero.titleTrail}
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              {data.hero.lead}
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <Link href={data.hero.primaryCta.href}>
                <button className="min-h-11 px-8 h-12 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(0,112,243,0.55)] cursor-pointer flex items-center gap-2">
                  {data.hero.primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href={data.hero.secondaryCta.href}>
                <button className="min-h-11 px-8 h-12 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  {data.hero.secondaryCta.label}
                </button>
              </Link>
            </motion.div>

            {/* Hero stats */}
            <motion.div
              variants={heroItem}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12 w-full"
            >
              {data.hero.heroStats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 items-start text-left px-4 py-3 rounded-xl border border-white/8 bg-white/2 backdrop-blur-xl"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                    {stat.label}
                  </span>
                  <span className="text-sm lg:text-base font-bold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full max-h-125"
          >
            <Image
              src={data.hero.heroImage.src}
              alt={data.hero.heroImage.alt}
              width={data.hero.heroImage.width}
              height={data.hero.heroImage.height}
              className="block max-w-none rounded-2xl group-hover:scale-[1.01] transition-transform duration-700 origin-top-left"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. URGENCY — Atlassian timeline */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-amber-500/8 via-transparent to-transparent blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-black tracking-widest uppercase mb-6 shadow-inner"
            >
              <CalendarClock size={14} />
              {data.urgency.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {data.urgency.title}
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {data.urgency.subtitle}
            </p>
          </motion.div>

          {/* Timeline rail */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-linear-to-r from-white/5 via-white/15 to-white/5 pointer-events-none" />

            {data.urgency.milestones.map((m, i) => {
              const tone = m.tone as Tone;
              const cfg = toneStyles[tone];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`relative flex flex-col items-center text-center rounded-2xl border ${cfg.card} ${cfg.glow ?? ""} backdrop-blur-xl p-5 lg:p-6 transition-all hover:scale-[1.02]`}
                >
                  {/* Dot on timeline */}
                  <div className="hidden lg:flex absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ring-4 ring-(--color-surface-base) items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                  </div>

                  <div
                    className={`mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${cfg.badge} mb-4`}
                  >
                    <Icon className={`w-3 h-3 ${cfg.iconColor}`} />
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${cfg.badgeText}`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  <span lang="en" className="text-xs font-mono text-(--color-text-muted) tracking-wider mb-2">
                    {m.date}
                  </span>
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-tight mb-3">
                    {m.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-(--color-text-secondary) font-light leading-relaxed">
                    {m.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {data.urgency.footnote && (
            <p className="mt-10 text-center text-xs text-(--color-text-muted) font-light max-w-2xl mx-auto">
              {data.urgency.footnote}
            </p>
          )}
        </div>
      </section>

      {/* 3. COMPARISON */}
      <JiraComparisonTable />

      {/* 4. MODULES — Zig-zag */}
      <section className="py-24 lg:py-32 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-(--color-accent-purple-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner"
            >
              <Layers size={14} />
              {data.modules.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {data.modules.title}
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {data.modules.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {data.modules.items.map((item, i) => {
              const accent = moduleAccents[item.accent] ?? moduleAccents.blue;
              const Icon = moduleIconMap[item.icon as keyof typeof moduleIconMap] ?? Layers;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-24`}
                >
                  <div className="w-full lg:w-1/2">
                    <div
                      className={`relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br ${accent.cardBg} backdrop-blur-xl group overflow-hidden`}
                    >
                      <div
                        className={`absolute -inset-10 ${accent.glow} blur-[50px] transition-colors duration-700 pointer-events-none`}
                      />
                      <div className="relative w-full rounded-2xl overflow-hidden bg-(--color-surface-base) border border-white/5 shadow-2xl max-h-110">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          width={item.imageWidth}
                          height={item.imageHeight}
                          className="block max-w-none group-hover:scale-[1.01] transition-transform duration-500 origin-top-left"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-7">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl ${accent.iconBg} border ${accent.iconBorder} flex items-center justify-center ${accent.iconText}`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${accent.iconText}`}>
                        {item.eyebrow}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                      {item.title}{" "}
                      <span className={accent.titleAccent}>{item.titleHighlight}</span>
                    </h3>
                    <p className="text-base lg:text-lg text-(--color-text-secondary) leading-relaxed font-light">
                      {item.description}
                    </p>
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="flex items-start gap-3 text-(--color-text-overline)"
                        >
                          <CheckCircle2
                            className={`w-5 h-5 ${accent.iconText} shrink-0 mt-0.5`}
                          />
                          <span className="text-sm lg:text-base font-light leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/3 border border-white/8 mt-2">
                      <MinusCircle className="w-3.5 h-3.5 text-(--color-text-muted)" />
                      <span className="text-[11px] font-medium text-(--color-text-muted) tracking-wide">
                        {item.jiraBadge}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MIGRATION */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-(--color-surface-base-dark) border-y border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-100 h-100 bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-(--color-accent-emerald-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner"
            >
              <ShieldCheck size={14} />
              {data.migration.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {data.migration.title}
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {data.migration.subtitle}
            </p>
            {data.migration.intro && (
              <p className="mt-4 text-sm text-(--color-text-muted) font-light leading-relaxed max-w-2xl mx-auto">
                {data.migration.intro}
              </p>
            )}
          </motion.div>

          {/* Steps timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
          >
            {/* Dashed connector (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[16%] right-[16%] h-px border-t border-dashed border-emerald-500/30 pointer-events-none" />

            {data.migration.steps.map((step) => {
              const Icon =
                migrationIconMap[step.icon as keyof typeof migrationIconMap] ??
                ShieldCheck;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-6 lg:p-8 transition-all hover:border-emerald-500/30"
                >
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                    className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-(--color-surface-elevated-solid) border border-emerald-500/40 flex items-center justify-center text-(--color-accent-emerald-light) font-bold tabular-nums shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)]"
                  >
                    {step.step}
                  </motion.div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-(--color-accent-emerald-light) mt-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    {step.deliverables.map((d, di) => (
                      <li
                        key={di}
                        className="flex items-start gap-2 text-xs text-(--color-text-overline) font-light"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light) shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Guarantee checklist */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-8 lg:p-10 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-(--color-accent-emerald-light)">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                {data.migration.guaranteeChecklist.title}
              </h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.migration.guaranteeChecklist.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/2 border border-white/5 text-sm text-(--color-text-overline) font-light"
                >
                  <CheckCircle2 className="w-4 h-4 text-(--color-accent-emerald-light) shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 6. ON-PREM */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-100 bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner"
            >
              <Server size={14} />
              {data.onPrem.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {data.onPrem.title}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light)">
                {data.onPrem.titleHighlight}
              </span>
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {data.onPrem.subtitle}
            </p>
          </motion.div>

          {/* 4 advantage cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {data.onPrem.advantages.map((adv, i) => {
              const accent = moduleAccents[adv.accent] ?? moduleAccents.blue;
              const Icon =
                onPremIconMap[adv.icon as keyof typeof onPremIconMap] ?? ShieldCheck;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-6 lg:p-7 flex flex-col gap-4 transition-colors hover:border-white/20 group overflow-hidden"
                >
                  <div
                    className={`absolute -inset-10 ${accent.glow} blur-[60px] transition-colors duration-700 pointer-events-none opacity-50`}
                  />
                  <div className="relative z-10 flex flex-col gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${accent.iconBg} border ${accent.iconBorder} flex items-center justify-center ${accent.iconText}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {adv.title}
                    </h3>
                    <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Killer stat */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-(--color-brand-primary)/25 bg-linear-to-br from-(--color-brand-primary)/12 via-cyan-500/5 to-transparent p-8 lg:p-10 backdrop-blur-xl overflow-hidden"
          >
            <Server className="absolute top-6 right-6 w-12 h-12 text-(--color-brand-primary)/20" />
            <div className="relative z-10 flex flex-col gap-3 max-w-3xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-accent-cyan-light)">
                Toplam sahip olma maliyeti
              </span>
              <p className="text-lg lg:text-xl text-white font-light leading-relaxed">
                {data.onPrem.killerStat.value}
              </p>
              <p className="text-base lg:text-lg text-(--color-accent-cyan-light) font-semibold leading-relaxed">
                {data.onPrem.killerStat.highlight}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. TRUST */}
      <section className="py-20 lg:py-24 relative overflow-hidden bg-(--color-surface-base-dark) border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div
              lang="en"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-(--color-accent-cyan-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner"
            >
              {data.trust.badge}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              {data.trust.title}
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {data.trust.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {data.trust.stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl p-6 lg:p-8 flex flex-col gap-2 text-center"
              >
                <span className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs lg:text-sm text-(--color-text-secondary) font-light leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-(--color-accent-purple-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner">
              <HelpCircle size={14} />
              {data.faq.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              {data.faq.title}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-3"
          >
            {data.faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 lg:px-6 py-5 text-left min-h-11 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base lg:text-lg font-semibold text-white tracking-tight">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-(--color-text-overline)"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { type: "spring", stiffness: 220, damping: 28 },
                          opacity: { duration: 0.2 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 lg:px-6 pb-5 pt-1 text-sm lg:text-base text-(--color-text-secondary) font-light leading-relaxed border-t border-white/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-12 lg:mt-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Layers className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span
                      lang="en"
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)"
                    >
                      {data.cta.badge}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {data.cta.title}
                  </h2>

                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                    {data.cta.description}
                  </p>

                  <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href={data.cta.primaryCta.href}>
                        <button className="min-h-11 px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(0,112,243,0.55)] cursor-pointer flex items-center gap-2">
                          {data.cta.primaryCta.label}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={data.cta.secondaryCta.href}>
                        <button className="min-h-11 px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                          {data.cta.secondaryCta.label}
                        </button>
                      </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-(--color-text-muted)">
                      {data.cta.tags.map((tag, i) => {
                        const dotColors = [
                          "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
                          "bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]",
                          "bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]",
                          "bg-(--color-accent-cyan-base) shadow-[0_0_8px_rgba(34,211,238,0.6)]",
                        ];
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${dotColors[i % dotColors.length]}`}
                            />
                            {tag}
                          </div>
                        );
                      })}
                    </div>
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
