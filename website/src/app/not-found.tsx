"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  Variants,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  LifeBuoy,
  Home,
  LayoutGrid,
  Boxes,
  type LucideIcon,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import tokens from "@/data/design-tokens.json";
import { runtimeTokens } from "@/lib/tokens";
import notFoundData from "@/data/not-found.json";

// Lucide ikon eslestirmesi — JSON'daki "icon" string'i bu haritadan cozulur.
const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  LayoutGrid,
  Boxes,
  LifeBuoy,
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
};

// Resolve accent — bilinmeyen anahtarlar primary'ye duser.
function resolveAccent(key: string) {
  return ACCENT_MAP[key] ?? ACCENT_MAP.primary;
}

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  // Diagnostics ve Suggestions bolumleri viewport'a girince animasyona basliyor.
  const diagnosticsRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const quicklinksRef = useRef<HTMLDivElement>(null);
  const diagnosticsInView = useInView(diagnosticsRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });
  const suggestionsInView = useInView(suggestionsRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });
  const quicklinksInView = useInView(quicklinksRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });

  // Spring tanimlari — design-tokens runtime degerleriyle ayni.
  const springDefault = { type: "spring", stiffness: 300, damping: 24 } as const;
  const springSnappy = { type: "spring", stiffness: 400, damping: 17 } as const;

  // Hero stagger container — designer'dan stagger 0.12, delayChildren 0.2.
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

  // Diagnostics — 4 hucre stagger 0.08, y:10->0.
  const diagContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const diagItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  // Suggestions — 4 kart stagger 0.1, y:30->0.
  const suggestContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const suggestItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  // Quicklinks — pill grid stagger 0.04, y:8->0.
  const pillContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const pillItem: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: springDefault },
  };

  return (
    <>
      <Navbar />

      {/* Ana icerik wrapper — (main)/layout.tsx'in pt-20/24 davranisini birebir taklit et. */}
      <main
        className="flex flex-col"
        style={{ backgroundColor: tokens.colors.surface.base }}
      >
        {/* 1. HERO — INC-404 olay kaydi */}
        <section
          className="relative w-full overflow-hidden text-white pt-20 lg:pt-24"
          style={{ backgroundColor: tokens.colors.surface.base }}
        >
          {/* Background katmanlari — sirayla: primary glow (ust), purple glow (sol-alt), grid pattern. */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Ust merkez primary glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 rounded-full blur-[150px] opacity-30"
              style={{ backgroundColor: tokens.colors.brand.primary }}
            />
            {/* Sol-alt purple glow */}
            <div
              className="absolute bottom-0 left-0 w-125 h-125 rounded-full blur-[120px] opacity-20"
              style={{ backgroundColor: runtimeTokens.colors.brand.purple }}
            />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen" />
          </div>

          {/* Dev arka katman "404" rakami — aria-hidden. */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.04 : 0.08 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          >
            <span
              className="font-mono font-bold text-white"
              style={{ fontSize: "clamp(200px, 30vw, 400px)", lineHeight: 1 }}
            >
              404
            </span>
          </motion.div>

          {/* Hero icerik */}
          <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-[calc(100dvh-5rem)] flex items-center justify-center">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center gap-6 max-w-4xl w-full py-24"
            >
              {/* Ticket header pill: INC-404 + status nokta */}
              <motion.div
                variants={heroItem}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <AlertCircle
                  className="w-4 h-4"
                  style={{ color: tokens.colors.brand.primary }}
                />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-white">
                  {notFoundData.hero.ticketCode}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-(--color-text-muted)">
                  Durum:{" "}
                  <span className="text-(--color-text-secondary)">
                    {notFoundData.hero.ticketStatus}
                  </span>
                </span>
                {/* Status nokta — primary, ping animasyonu */}
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                    style={{ backgroundColor: tokens.colors.brand.primary }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: tokens.colors.brand.primary }}
                  />
                </span>
              </motion.div>

              {/* Overline */}
              <motion.div
                variants={heroItem}
                className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)"
              >
                {notFoundData.hero.overline}
              </motion.div>

              {/* Baslik */}
              <motion.h1
                variants={heroItem}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              >
                {notFoundData.hero.title
                  .split(notFoundData.hero.titleHighlight)
                  .map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <span className={tokens.effects.gradient.brandText}>
                          {notFoundData.hero.titleHighlight}
                        </span>
                      )}
                    </span>
                  ))}
              </motion.h1>

              {/* Aciklama (lead) */}
              <motion.p
                variants={heroItem}
                className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-2xl"
              >
                {notFoundData.hero.description}
              </motion.p>

              {/* CTA'lar */}
              <motion.div
                variants={heroItem}
                className="flex flex-wrap items-center justify-center gap-4 mt-4"
              >
                <Link href={notFoundData.hero.primaryCta.href}>
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
                    {notFoundData.hero.primaryCta.label}
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: shouldReduceMotion ? 0 : 5 }}
                      transition={springSnappy}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </Link>
                <Link href={notFoundData.hero.secondaryCta.href}>
                  <motion.button
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                    transition={springSnappy}
                    className="h-14 px-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl font-medium text-white flex items-center gap-2 hover:bg-white/10 hover:border-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                  >
                    <LifeBuoy className="w-5 h-5" />
                    {notFoundData.hero.secondaryCta.label}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. DIAGNOSTICS — Olay analizi paneli */}
        <section className="relative w-full py-24 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={diagnosticsRef}
              variants={diagContainer}
              initial="hidden"
              animate={diagnosticsInView ? "visible" : "hidden"}
              className="max-w-3xl mx-auto bg-white/2 border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
            >
              {/* Header */}
              <motion.div
                variants={diagItem}
                className="flex flex-col items-center text-center mb-8"
              >
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-2">
                  {notFoundData.diagnostics.overline}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {notFoundData.diagnostics.title}
                </h2>
              </motion.div>

              {/* 4'lu grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {notFoundData.diagnostics.items.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    variants={diagItem}
                    className={`flex flex-col items-center text-center gap-2 lg:px-2 ${
                      idx < notFoundData.diagnostics.items.length - 1
                        ? "lg:border-r lg:border-white/10"
                        : ""
                    }`}
                  >
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
                      {item.label}
                    </span>
                    <span
                      className="text-sm font-mono font-medium"
                      style={{ color: tokens.colors.text.primary }}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. SUGGESTIONS — Onerilen rotalar */}
        <section className="relative w-full py-24 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={suggestionsRef}
              variants={suggestContainer}
              initial="hidden"
              animate={suggestionsInView ? "visible" : "hidden"}
              className="max-w-6xl mx-auto"
            >
              {/* Section header */}
              <motion.div
                variants={suggestItem}
                className="flex flex-col items-center text-center mb-12 lg:mb-16"
              >
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-3">
                  {notFoundData.suggestions.overline}
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                  {notFoundData.suggestions.title}
                </h2>
                <p className="text-lg text-(--color-text-secondary) font-light max-w-2xl">
                  {notFoundData.suggestions.description}
                </p>
              </motion.div>

              {/* 4'lu kart grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {notFoundData.suggestions.items.map((suggestion) => {
                  const Icon = ICON_MAP[suggestion.icon] ?? Home;
                  const accent = resolveAccent(suggestion.iconAccent);
                  return (
                    <motion.div
                      key={suggestion.id}
                      variants={suggestItem}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { scale: 1.02, transition: springSnappy }
                      }
                    >
                      <Link
                        href={suggestion.href}
                        className="group block h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 transition-colors duration-200 hover:bg-white/[0.07] hover:border-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
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
                              {suggestion.title}
                            </h3>
                          </div>
                          <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed flex-1">
                            {suggestion.description}
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

        {/* 4. QUICKLINKS — Modul kisayollari */}
        <section className="relative w-full py-24 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              ref={quicklinksRef}
              variants={pillContainer}
              initial="hidden"
              animate={quicklinksInView ? "visible" : "hidden"}
              className="max-w-3xl mx-auto flex flex-col items-center"
            >
              {/* Separator line */}
              <div className="h-px w-full max-w-md mb-12 bg-linear-to-r from-transparent via-white/10 to-transparent" />

              {/* Section header */}
              <motion.div
                variants={pillItem}
                className="flex flex-col items-center text-center mb-10"
              >
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-3">
                  {notFoundData.search.overline}
                </span>
                <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-white mb-3">
                  {notFoundData.search.title}
                </h3>
                <p className="text-base text-(--color-text-secondary) font-light">
                  {notFoundData.search.description}
                </p>
              </motion.div>

              {/* Pill grid */}
              <div className="flex flex-wrap gap-3 justify-center">
                {notFoundData.search.quickLinks.map((quick) => (
                  <motion.div
                    key={quick.href}
                    variants={pillItem}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.05, transition: springSnappy }
                    }
                  >
                    <Link
                      href={quick.href}
                      className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-(--color-text-secondary) hover:bg-white/10 hover:border-white/20 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                    >
                      {quick.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
