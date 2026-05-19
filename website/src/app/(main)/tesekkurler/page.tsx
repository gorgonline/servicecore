"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  trackAdsConversion,
  trackFormSubmit,
  type FormConversionType,
} from "@/lib/analytics";
import {
  motion,
  Variants,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  Inbox,
  LayoutGrid,
  LifeBuoy,
  Mail,
  Phone,
  Presentation,
  Rocket,
  Search,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import tokens from "@/data/design-tokens.json";
import { runtimeTokens } from "@/lib/tokens";
import tesekkurlerData from "@/data/tesekkurler.json";

// Talep edilen JSON kontekslerinin daraltilmis tip seti — disardan gelen "?from=..." degerleri whitelist disindaysa "default" devreye girer.
type TesekkurlerContext =
  | "demo"
  | "iletisim"
  | "partner"
  | "analiz"
  | "default";

const ALLOWED_CONTEXTS: ReadonlyArray<TesekkurlerContext> = [
  "demo",
  "iletisim",
  "partner",
  "analiz",
];

// Lucide ikon eslestirmesi — JSON'daki "icon" stringi bu haritadan cozulur.
// PresentationChart Lucide'de yok; analiz timeline'i icin Presentation ikonu kullanildi (PresentationIcon alias).
const ICON_MAP: Record<string, LucideIcon> = {
  ArrowRight,
  BookOpen,
  Boxes,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  Inbox,
  LayoutGrid,
  LifeBuoy,
  Mail,
  Phone,
  Presentation,
  PresentationChart: Presentation,
  Rocket,
  Search,
  ShieldCheck,
  Users,
};

// Designer karari: iconAccent JSON'dan gelir, brand renklerine cozulur.
// Hardcoded hex YASAK — tek kaynak design-tokens.json + lib/tokens (brand/tokens.json'dan uretilen).
// Hex degerleri suffix opacity ile birlikte: "26" = /15, "33" = /20 (Tailwind 4'te keyfi color/opacity yerine inline style).
const ACCENT_MAP: Record<
  string,
  { bgColor: string; textColor: string; ringColor: string }
> = {
  primary: {
    bgColor: `${tokens.colors.brand.primary}26`,
    textColor: tokens.colors.brand.primary,
    ringColor: `${tokens.colors.brand.primary}33`,
  },
  accent: {
    bgColor: `${tokens.colors.brand.accent}26`,
    textColor: tokens.colors.brand.accent,
    ringColor: `${tokens.colors.brand.accent}33`,
  },
  purple: {
    bgColor: `${runtimeTokens.colors.brand.purple}26`,
    textColor: runtimeTokens.colors.brand.purple,
    ringColor: `${runtimeTokens.colors.brand.purple}33`,
  },
  secondary: {
    bgColor: `${tokens.colors.brand.secondary}26`,
    textColor: tokens.colors.brand.secondary,
    ringColor: `${tokens.colors.brand.secondary}33`,
  },
  // Emerald — basari aksanli timeline ve support chip'leri icin.
  emerald: {
    bgColor: `${runtimeTokens.colors.accent.emeraldBase}26`,
    textColor: runtimeTokens.colors.accent.emeraldLight,
    ringColor: `${runtimeTokens.colors.accent.emeraldBase}33`,
  },
};

function resolveAccent(key: string) {
  return ACCENT_MAP[key] ?? ACCENT_MAP.primary;
}

function resolveContext(raw: string | null): TesekkurlerContext {
  if (!raw) return "default";
  const lower = raw.toLowerCase();
  return ALLOWED_CONTEXTS.includes(lower as TesekkurlerContext)
    ? (lower as TesekkurlerContext)
    : "default";
}

// Suspense fallback — spinner YASAK, glassmorphism iskelet kart yapisi.
// Hero ve timeline kartlarinin yuksekligi 1:1 yansitilir ki layout zipla­masin.
function TesekkurlerSkeleton() {
  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: tokens.colors.surface.base }}
    >
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-[calc(100dvh-5rem)] flex items-center justify-center">
          <div className="flex flex-col items-center text-center gap-6 max-w-4xl w-full py-24 animate-pulse">
            <div className="h-9 w-72 rounded-full bg-white/5 border border-white/10" />
            <div className="h-4 w-44 bg-white/5 rounded-full" />
            <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10" />
            <div className="h-12 w-full max-w-2xl bg-white/5 rounded-2xl" />
            <div className="h-12 w-3/4 max-w-xl bg-white/5 rounded-2xl" />
            <div className="h-5 w-full max-w-xl bg-white/5 rounded-full" />
            <div className="h-5 w-2/3 max-w-md bg-white/5 rounded-full" />
            <div className="flex gap-4 mt-4">
              <div className="h-14 w-44 rounded-full bg-white/5 border border-white/10" />
              <div className="h-14 w-44 rounded-full bg-white/5 border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="h-48 rounded-2xl bg-white/2 border border-white/5"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TesekkurlerContent() {
  const shouldReduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const context = resolveContext(searchParams.get("from"));
  const ctx = tesekkurlerData.contexts[context];
  const support = tesekkurlerData.support;
  const page = tesekkurlerData.page;

  // Timeline, Explore, Support viewport'a girince animasyon basliyor (once: true).
  const timelineRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });
  const exploreInView = useInView(exploreRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });
  const supportInView = useInView(supportRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });

  // Spring tanimlari — design-tokens runtime degerleriyle ayni.
  const springDefault = { type: "spring", stiffness: 300, damping: 24 } as const;
  const springSnappy = { type: "spring", stiffness: 400, damping: 17 } as const;

  // Hero stagger — designer'dan stagger 0.12, delayChildren 0.2.
  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  // Timeline kartlari — stagger 0.08, y:20->0.
  const timelineContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };
  const timelineItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  // Explore kartlari — stagger 0.1, y:30->0.
  const exploreContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
    },
  };
  const exploreItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  // Support chip'leri — stagger 0.06, y:10->0.
  const supportContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 },
    },
  };
  const supportItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  const PrimaryCtaIcon = ICON_MAP[ctx.primaryCta.icon] ?? ArrowRight;
  const SecondaryCtaIcon = ICON_MAP[ctx.secondaryCta.icon] ?? Home;

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: tokens.colors.surface.base }}
    >
      {/* 1. HERO — Talebiniz alindi */}
      <section
        className="relative w-full overflow-hidden text-white"
        style={{ backgroundColor: tokens.colors.surface.base }}
      >
        {/* Background katmanlari — emerald glow (ust merkez), primary glow (sol-alt), grid pattern. */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 rounded-full blur-[150px] opacity-30"
            style={{ backgroundColor: runtimeTokens.colors.accent.emeraldBase }}
          />
          <div
            className="absolute bottom-0 left-0 w-125 h-125 rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: tokens.colors.brand.primary }}
          />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen" />
        </div>

        {/* Hero icerik */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-[calc(100dvh-5rem)] flex items-center justify-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-6 max-w-4xl w-full py-24"
          >
            {/* Ticket header pill: REQ-DEMO/MSG/PARTNER/ANALYSIS/OK + status nokta */}
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <CheckCircle2
                className="w-4 h-4"
                style={{ color: runtimeTokens.colors.accent.emeraldLight }}
              />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-white">
                {ctx.ticketCode}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-(--color-text-muted)">
                Durum:{" "}
                <span className="text-(--color-text-secondary)">
                  {ctx.ticketStatusLabel}
                </span>
              </span>
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{
                    backgroundColor: runtimeTokens.colors.accent.emeraldBase,
                  }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{
                    backgroundColor: runtimeTokens.colors.accent.emeraldBase,
                  }}
                />
              </span>
            </motion.div>

            {/* Page badge */}
            <motion.div
              variants={heroItem}
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)"
            >
              {page.badge}
            </motion.div>

            {/* Buyuk check ikonu — emerald daire icinde, pulse halkasi */}
            <motion.div
              variants={heroItem}
              className="relative flex items-center justify-center"
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: runtimeTokens.colors.accent.emeraldBase,
                }}
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: [0, 0.5, 0], scale: [1, 1.6, 2] }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <span
                className="relative w-24 h-24 rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: `${runtimeTokens.colors.accent.emeraldBase}26`,
                  borderColor: `${runtimeTokens.colors.accent.emeraldBase}55`,
                }}
              >
                <CheckCircle2
                  className="w-12 h-12"
                  style={{ color: runtimeTokens.colors.accent.emeraldLight }}
                  strokeWidth={1.75}
                />
              </span>
            </motion.div>

            {/* Overline */}
            <motion.div
              variants={heroItem}
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)"
            >
              {ctx.overline}
            </motion.div>

            {/* Baslik — titleHighlight emerald->brand-accent gradient */}
            <motion.h1
              variants={heroItem}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
            >
              {ctx.title.split(ctx.titleHighlight).map((part, idx, arr) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && (
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-emerald-base) to-(--color-brand-accent)">
                      {ctx.titleHighlight}
                    </span>
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Lead */}
            <motion.p
              variants={heroItem}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-2xl"
            >
              {ctx.lead}
            </motion.p>

            {/* Body — ikinci paragraph */}
            <motion.p
              variants={heroItem}
              className="text-base text-(--color-text-muted) font-light leading-relaxed max-w-2xl"
            >
              {ctx.description}
            </motion.p>

            {/* CTA'lar */}
            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center justify-center gap-4 mt-4"
            >
              <Link href={ctx.primaryCta.href}>
                <motion.button
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.05,
                    boxShadow: `0 0 40px -5px ${tokens.colors.brand.primary}99`,
                  }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                  transition={springSnappy}
                  className="h-14 px-8 rounded-full font-medium text-white flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                  style={{
                    backgroundColor: tokens.colors.brand.primary,
                    boxShadow: `0 0 30px -5px ${tokens.colors.brand.primary}80`,
                  }}
                >
                  {ctx.primaryCta.label}
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: shouldReduceMotion ? 0 : 5 }}
                    transition={springSnappy}
                  >
                    <PrimaryCtaIcon className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Link>
              <Link href={ctx.secondaryCta.href}>
                <motion.button
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                  transition={springSnappy}
                  className="h-14 px-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl font-medium text-white flex items-center gap-2 hover:bg-white/10 hover:border-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                >
                  <SecondaryCtaIcon className="w-5 h-5" />
                  {ctx.secondaryCta.label}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TIMELINE — Bundan sonra ne olacak */}
      <section className="relative w-full py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={timelineRef}
            variants={timelineContainer}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            {/* Section header */}
            <motion.div
              variants={timelineItem}
              className="flex flex-col items-center text-center mb-12 lg:mb-16"
            >
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-3">
                {ctx.timeline.overline}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {ctx.timeline.title}
              </h2>
            </motion.div>

            {/* 4'lu timeline grid — desktop'ta yatay separator */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {ctx.timeline.steps.map((step, idx) => {
                const StepIcon = ICON_MAP[step.icon] ?? CheckCircle2;
                const isLast = idx === ctx.timeline.steps.length - 1;
                return (
                  <motion.div
                    key={step.step}
                    variants={timelineItem}
                    className="relative"
                  >
                    {/* Desktop yatay separator — kartlar arasinda gradient */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-linear-to-r from-white/15 to-transparent"
                      />
                    )}
                    <div className="h-full rounded-2xl bg-white/2 border border-white/5 backdrop-blur-sm p-6 hover:bg-white/4 hover:border-white/10 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-secondary)">
                          {step.step}
                        </span>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${runtimeTokens.colors.accent.emeraldBase}1F`,
                          }}
                        >
                          <StepIcon
                            className="w-5 h-5"
                            style={{
                              color:
                                runtimeTokens.colors.accent.emeraldLight,
                            }}
                          />
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. EXPLORE — Bekleme suresinde keşfedilebilir kaynaklar */}
      <section className="relative w-full py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={exploreRef}
            variants={exploreContainer}
            initial="hidden"
            animate={exploreInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            {/* Section header */}
            <motion.div
              variants={exploreItem}
              className="flex flex-col items-center text-center mb-12 lg:mb-16"
            >
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-3">
                {ctx.explore.overline}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                {ctx.explore.title}
              </h2>
              <p className="text-lg text-(--color-text-secondary) font-light max-w-2xl">
                {ctx.explore.description}
              </p>
            </motion.div>

            {/* 3'lu kart grid — not-found suggestions pattern'i birebir */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ctx.explore.cards.map((card) => {
                const Icon = ICON_MAP[card.icon] ?? Home;
                const accent = resolveAccent(card.iconAccent);
                return (
                  <motion.div
                    key={card.id}
                    variants={exploreItem}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.02, transition: springSnappy }
                    }
                  >
                    <Link
                      href={card.href}
                      className="group block h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 transition-colors duration-200 hover:bg-white/7 hover:border-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                    >
                      <div className="flex flex-col gap-3 h-full">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: accent.bgColor }}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{ color: accent.textColor }}
                            />
                          </div>
                          <h3 className="text-base font-semibold text-white tracking-tight">
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed flex-1">
                          {card.description}
                        </p>
                        <div className="flex justify-end mt-2">
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={
                              shouldReduceMotion
                                ? undefined
                                : { x: 5, transition: springSnappy }
                            }
                            className="text-(--color-text-muted) group-hover:text-white transition-colors"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. SUPPORT — Acil teknik destek kanallari (baglamdan bagimsiz) */}
      <section className="relative w-full py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            ref={supportRef}
            variants={supportContainer}
            initial="hidden"
            animate={supportInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Ust separator */}
            <div className="h-px w-full max-w-md mb-12 bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {/* Section header */}
            <motion.div
              variants={supportItem}
              className="flex flex-col items-center text-center mb-10"
            >
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-3">
                {support.overline}
              </span>
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-white mb-3">
                {support.title}
              </h3>
              <p className="text-base text-(--color-text-secondary) font-light max-w-2xl">
                {support.description}
              </p>
            </motion.div>

            {/* Chip grid — flex-wrap, her chip <a> (mailto/tel/href) */}
            <div className="flex flex-wrap gap-3 justify-center">
              {support.channels.map((channel) => {
                const ChannelIcon = ICON_MAP[channel.icon] ?? LifeBuoy;
                return (
                  <motion.div
                    key={channel.label}
                    variants={supportItem}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.05, transition: springSnappy }
                    }
                  >
                    <a
                      href={channel.href}
                      className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                    >
                      <ChannelIcon
                        className="w-4 h-4"
                        style={{
                          color: runtimeTokens.colors.accent.emeraldLight,
                        }}
                      />
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
                        {channel.label}
                      </span>
                      <span
                        className="text-sm font-mono font-medium text-white"
                        lang="en"
                      >
                        {channel.value}
                      </span>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function TesekkurlerPage() {
  // Next.js 16 + React 19: useSearchParams Suspense boundary icinde olmali — yoksa CSR bailout uyarisi gelir.
  return (
    <Suspense fallback={<TesekkurlerSkeleton />}>
      <TesekkurlerContent />
    </Suspense>
  );
}
