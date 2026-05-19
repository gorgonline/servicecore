"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  AlertCircle,
  RefreshCw,
  Home,
  LifeBuoy,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import tokens from "@/data/design-tokens.json";
import { runtimeTokens } from "@/lib/tokens";
import errorData from "@/data/error.json";

// Next.js 16 error boundary kontrati — error + reset prop'lari ZORUNLU.
// reset() cagrildiginda Next.js segmenti yeniden render etmeyi dener.
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const shouldReduceMotion = useReducedMotion();

  // Hatayi production'da log altyapisina iletmek icin (Sentry vb. yerine simdilik console).
  useEffect(() => {
    console.error("[ServiceCore] Sayfa hatasi:", error);
  }, [error]);

  // Diagnostics bolumu viewport'a girince animasyon basliyor — 404 pattern'i ile birebir.
  const diagnosticsRef = useRef<HTMLDivElement>(null);
  const diagnosticsInView = useInView(diagnosticsRef, {
    once: true,
    margin: "-80px 0px -80px 0px",
  });

  // Spring tanimlari — runtimeTokens.animation.spring.default ve snappy ile ayni.
  const springDefault = { type: "spring", stiffness: 300, damping: 24 } as const;
  const springSnappy = { type: "spring", stiffness: 400, damping: 17 } as const;

  // Hero stagger container — 404 ile ayni timing.
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

  // Amber tonu — 500 hatasi icin "inceleme/uyari" semantigi.
  const amberBase = runtimeTokens.colors.accent.amberBase;

  return (
    <>
      <Navbar />

      {/* (main)/layout.tsx'in pt-20/24 davranisini birebir taklit et — error.tsx route group disinda. */}
      <main
        className="flex flex-col"
        style={{ backgroundColor: tokens.colors.surface.base }}
      >
        {/* 1. HERO — INC-500 olay kaydi */}
        <section
          className="relative w-full overflow-hidden text-white pt-20 lg:pt-24"
          style={{ backgroundColor: tokens.colors.surface.base }}
        >
          {/* Background katmanlari — sirayla: amber glow (ust), primary glow (sol-alt), grid pattern. */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Ust merkez amber glow — 500 hatasi semantigi */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 rounded-full blur-[150px] opacity-25"
              style={{ backgroundColor: amberBase }}
            />
            {/* Sol-alt primary glow — marka bagi */}
            <div
              className="absolute bottom-0 left-0 w-125 h-125 rounded-full blur-[120px] opacity-15"
              style={{ backgroundColor: tokens.colors.brand.primary }}
            />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen" />
          </div>

          {/* Dev arka katman "500" rakami — aria-hidden, slow fade. */}
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
              500
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
              {/* Ticket header pill: INC-500 + amber status nokta */}
              <motion.div
                variants={heroItem}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <AlertCircle
                  className="w-4 h-4"
                  style={{ color: amberBase }}
                />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-white">
                  {errorData.hero.ticketCode}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-(--color-text-muted)">
                  Durum:{" "}
                  <span className="text-(--color-text-secondary)">
                    {errorData.hero.ticketStatus}
                  </span>
                </span>
                {/* Status nokta — amber, ping animasyonu */}
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                    style={{ backgroundColor: amberBase }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: amberBase }}
                  />
                </span>
              </motion.div>

              {/* Overline */}
              <motion.div
                variants={heroItem}
                className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)"
              >
                {errorData.hero.overline}
              </motion.div>

              {/* Baslik — gradient highlight bolumu 404 ile ayni */}
              <motion.h1
                variants={heroItem}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              >
                {errorData.hero.title
                  .split(errorData.hero.titleHighlight)
                  .map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <span className={tokens.effects.gradient.brandText}>
                          {errorData.hero.titleHighlight}
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
                {errorData.hero.description}
              </motion.p>

              {/* CTA'lar — 2 buton yan yana (3+ YASAK kurali), 3. aksiyon altta inline link */}
              <motion.div
                variants={heroItem}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Primary: Tekrar Dene — reset() cagirir, Link degil button */}
                  <motion.button
                    type="button"
                    onClick={() => reset()}
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
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: shouldReduceMotion ? 0 : -90 }}
                      transition={springSnappy}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                    {errorData.hero.primaryCta.label}
                  </motion.button>

                  {/* Secondary: Anasayfaya Don */}
                  <Link href={errorData.hero.secondaryCta.href}>
                    <motion.button
                      type="button"
                      whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                      whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                      transition={springSnappy}
                      className="h-14 px-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl font-medium text-white flex items-center gap-2 hover:bg-white/10 hover:border-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary)"
                    >
                      <Home className="w-5 h-5" />
                      {errorData.hero.secondaryCta.label}
                    </motion.button>
                  </Link>
                </div>

                {/* Tertiary: text-link altta — 3+ buton yasagindan kacinmak icin inline link */}
                <Link
                  href={errorData.hero.supportLink.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-(--color-text-secondary) hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) focus-visible:ring-(--color-brand-primary) rounded-sm"
                >
                  <LifeBuoy className="w-4 h-4" />
                  {errorData.hero.supportLink.label}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. DIAGNOSTICS — 404 pattern'i ile birebir, icerik degisir */}
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
                  {errorData.diagnostics.overline}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {errorData.diagnostics.title}
                </h2>
              </motion.div>

              {/* 4'lu grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {errorData.diagnostics.items.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    variants={diagItem}
                    className={`flex flex-col items-center text-center gap-2 lg:px-2 ${
                      idx < errorData.diagnostics.items.length - 1
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
      </main>

      <Footer />
    </>
  );
}
