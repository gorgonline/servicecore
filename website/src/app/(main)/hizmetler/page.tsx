"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Hammer,
  LayoutGrid,
  LifeBuoy,
  Star,
} from "lucide-react";
import {
  HIZMETLER,
  HIZMET_CATEGORIES,
  HIZMET_SERVICES,
  buildServiceHref,
  getFeaturedServices,
} from "@/lib/hizmetler";
import { getAccentTone } from "@/components/hizmetler/icon-map";
import { ServiceCard } from "@/components/hizmetler/ServiceCard";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";

const CATEGORY_HUB_ICON_MAP = {
  Hammer,
  LifeBuoy,
  GraduationCap,
  Compass,
};

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
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const featuredStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export default function HizmetlerHubPage() {
  const featured = getFeaturedServices();

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* 1. HERO */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {HIZMETLER.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {HIZMETLER.hero.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {HIZMETLER.hero.titleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl mb-12"
            >
              {HIZMETLER.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 text-xs font-mono text-(--color-text-muted) tracking-wider flex-wrap justify-center"
            >
              <span>
                <span className="text-(--color-accent-blue-light) font-semibold">
                  {HIZMET_SERVICES.length}
                </span>{" "}
                hizmet
              </span>
              <span className="opacity-40">·</span>
              <span>
                <span className="text-(--color-accent-cyan-light) font-semibold">
                  {HIZMET_CATEGORIES.length}
                </span>{" "}
                kategori
              </span>
              <span className="opacity-40">·</span>
              <span>uçtan uca yaşam döngüsü</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES INTRO */}
      <section className="relative py-20 lg:py-24 z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-3">
              Dört Disiplin
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
              Dört disiplin, tek çatı altında.
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              ServiceCore profesyonel hizmetleri; kurulumdan canlıya geçişe,
              destekten eğitime ve danışmanlığa kadar tüm operasyonel yaşam
              döngüsünü kapsayan dört disipline ayrılır. Her kategori, ITIL4
              uygulamasına sadık şekilde tasarlanmış pakethaller ve uzman
              ekibimizle teslim edilir.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {HIZMET_CATEGORIES.map((cat) => {
              const Icon =
                CATEGORY_HUB_ICON_MAP[cat.icon as keyof typeof CATEGORY_HUB_ICON_MAP] ??
                Hammer;
              const tone = getAccentTone(cat.accent);
              return (
                <motion.div key={cat.slug} variants={fadeUp}>
                  <Link
                    href={cat.href}
                    className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-white/20 backdrop-blur-xl transition-all p-8 md:p-10 overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`pointer-events-none absolute -inset-10 bg-linear-to-br ${tone.cardHoverGradient} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    <div className="relative flex flex-col gap-5 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl ${tone.iconBg} border ${tone.iconBorder} ${tone.iconText} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-[0.18em] uppercase ${tone.badgeBg} border ${tone.badgeBorder} ${tone.badgeText}`}
                        >
                          {cat.count} hizmet
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                          {cat.name}
                        </h3>
                        <p
                          className={`text-sm font-light leading-relaxed ${tone.ctaText}`}
                        >
                          {cat.tagline}
                        </p>
                      </div>

                      <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="relative mt-6 pt-4 border-t border-white/8 flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold ${tone.ctaText} group-hover:translate-x-0.5 transition-transform`}
                      >
                        Kategoriyi İncele
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 ${tone.ctaText} group-hover:translate-x-1 transition-transform`}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED 8 SERVICES */}
      <section className="relative py-20 lg:py-24 z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-cyan-light) mb-3">
              <Star className="w-3 h-3" fill="currentColor" />
              {HIZMETLER.featuredCallout.title}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
              ServiceCore’un en çok talep gören 8 hizmeti.
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {HIZMETLER.featuredCallout.description}
            </p>
          </motion.div>

          <motion.div
            variants={featuredStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                prominent={service.slug === "platinum"}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. ALL SERVICES COMPACT GRID */}
      <section className="relative py-20 lg:py-24 z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-3">
              Tüm Hizmetler
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
              {HIZMET_SERVICES.length} profesyonel hizmet — tek bakışta.
            </h2>
            <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              18 tek seferlik · 4 yıllık destek · 4 yıllık eğitim ve
              danışmanlık. Her kategori altında uzman ekiplerimizle teslim
              edilen, ITIL4 disiplinine sadık 26 paket.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIZMET_CATEGORIES.map((cat) => {
              const Icon =
                CATEGORY_HUB_ICON_MAP[cat.icon as keyof typeof CATEGORY_HUB_ICON_MAP] ??
                Hammer;
              const tone = getAccentTone(cat.accent);
              const services = HIZMET_SERVICES.filter(
                (s) => s.category === cat.slug
              );
              return (
                <div
                  key={cat.slug}
                  className="rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/8">
                    <div
                      className={`w-9 h-9 rounded-lg ${tone.iconBg} border ${tone.iconBorder} ${tone.iconText} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-semibold tracking-tight ${tone.badgeText}`}
                      >
                        {cat.name}
                      </div>
                      <div className="text-[10px] font-mono text-(--color-text-muted)">
                        {cat.count} hizmet
                      </div>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-1.5 flex-1">
                    {services.map((service) => {
                      const isAnnual = service.paymentTerm === "annual";
                      return (
                        <li key={service.slug}>
                          <Link
                            href={buildServiceHref(service)}
                            className="group flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-medium text-white/85 group-hover:text-white leading-snug">
                                  {service.name}
                                </span>
                                {service.featured && (
                                  <Star
                                    className={`w-2.5 h-2.5 ${tone.iconText} shrink-0`}
                                    fill="currentColor"
                                  />
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-(--color-text-muted) mt-0.5 flex items-center gap-1.5">
                                <span><En>{service.code}</En></span>
                                <span className="opacity-40">·</span>
                                <span>
                                  {isAnnual ? (
                                    <En>Annual</En>
                                  ) : (
                                    <En>One-Time</En>
                                  )}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    href={cat.href}
                    className={`mt-4 pt-3 border-t border-white/8 inline-flex items-center gap-1 text-xs font-semibold ${tone.ctaText} hover:text-white transition-colors cursor-pointer`}
                  >
                    Kategori sayfası
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
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
                      Hizmetler
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {HIZMETLER.cta.title}
                  </h2>
                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                    {HIZMETLER.cta.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={HIZMETLER.cta.primaryHref}>
                      <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                        {HIZMETLER.cta.primaryLabel}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link href={HIZMETLER.cta.secondaryHref}>
                      <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                        {HIZMETLER.cta.secondaryLabel}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PrivacyContact />
    </div>
  );
}
