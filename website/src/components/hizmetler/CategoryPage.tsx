"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Hammer,
  LifeBuoy,
  Star,
  type LucideIcon,
} from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { CategoryHero } from "./CategoryHero";
import { getAccentTone, HIZMET_ICON_MAP } from "./icon-map";
import {
  getServicesByCategory,
  type HizmetCategory,
  type HizmetService,
} from "@/lib/hizmetler";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";

interface CategoryPageProps {
  category: HizmetCategory;
  /** Optional intro stat eyebrow shown below hero stat */
  heroStat: string;
  /** Optional process steps section after grid */
  processSteps?: { label: string; detail: string; iconKey: string }[];
  processTitle?: string;
  /** Optional sub-section before grid */
  prefaceTitle?: string;
  prefaceLead?: string;
  /** CTA messaging override */
  ctaTitle: string;
  ctaDescription: string;
  ctaBadge: string;
  /** Render annual subscription block separately (Support category) */
  annualLayout?: boolean;
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const CATEGORY_HERO_ICON: Record<string, LucideIcon> = {
  Hammer,
  LifeBuoy,
  GraduationCap,
  Compass,
};

export function CategoryPage({
  category,
  heroStat,
  processSteps,
  processTitle,
  prefaceTitle,
  prefaceLead,
  ctaTitle,
  ctaDescription,
  ctaBadge,
  annualLayout = false,
}: CategoryPageProps) {
  const tone = getAccentTone(category.accent);
  const services = getServicesByCategory(category.slug);
  const HeroIcon = CATEGORY_HERO_ICON[category.icon] ?? Hammer;

  const oneTimeServices = services.filter((s) => s.paymentTerm === "one-time");
  const annualServices = services.filter((s) => s.paymentTerm === "annual");

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      <CategoryHero
        badge={<En>{category.nameEn}</En>}
        badgeIcon={HeroIcon}
        titleLead={getTitleLead(category.slug)}
        titleAccent={getTitleAccent(category.slug)}
        description={category.description}
        stat={heroStat}
        accent={category.accent}
        breadcrumb={[
          { label: "Hizmetler", href: "/hizmetler" },
          { label: category.name },
        ]}
      />

      {/* Preface */}
      {prefaceTitle && (
        <section className="relative py-12 lg:py-16 z-20">
          <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div
                className={`text-xs font-mono font-semibold tracking-[0.22em] uppercase ${tone.badgeText} mb-3`}
              >
                {prefaceTitle}
              </div>
              {prefaceLead && (
                <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
                  {prefaceLead}
                </p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Grid: one-time first */}
      <section className="relative py-12 lg:py-16 z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          {annualLayout && (
            <div className="mb-8 flex items-center gap-3">
              <div
                className={`text-xs font-mono font-semibold tracking-[0.22em] uppercase ${tone.badgeText}`}
              >
                Proje Bazlı Destek Hizmetleri
              </div>
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[10px] font-mono text-(--color-text-muted) tracking-wider uppercase">
                <En>One-Time</En>
              </span>
            </div>
          )}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
              category.slug === "consultancy" ? "lg:grid-cols-2" : ""
            }`}
          >
            {(annualLayout ? oneTimeServices : services).map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                prominent={service.featured && service.hasDetailPage}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Annual block (only support) */}
      {annualLayout && annualServices.length > 0 && (
        <section className="relative py-12 lg:py-16 z-20">
          <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div
                className={`text-xs font-mono font-semibold tracking-[0.22em] uppercase ${tone.badgeText}`}
              >
                Yıllık Destek Paketleri
              </div>
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[10px] font-mono text-(--color-text-muted) tracking-wider uppercase">
                <En>Annual subscription</En>
              </span>
            </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {annualServices.map((service) => (
                <AnnualPackageCard key={service.slug} service={service} />
              ))}
            </motion.div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                Paket karşılaştırma matrisi, destek seviyelerinin tüm
                özelliklerini yan yana sunar.
              </p>
              <Link
                href="/destek"
                className={`inline-flex items-center gap-2 px-4 h-10 rounded-full border ${tone.iconBorder} ${tone.iconBg} ${tone.iconText} text-xs font-semibold hover:brightness-125 transition-all cursor-pointer shrink-0`}
              >
                Paketleri Karşılaştır
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Process steps (optional) */}
      {processSteps && processSteps.length > 0 && (
        <section className="relative py-16 lg:py-24 z-20">
          <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12"
            >
              <div
                className={`text-xs font-mono font-semibold tracking-[0.22em] uppercase ${tone.badgeText} mb-3`}
              >
                Süreç
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                {processTitle}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {processSteps.map((step, idx) => {
                const StepIcon = HIZMET_ICON_MAP[step.iconKey] ?? Hammer;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${tone.iconBg} border ${tone.iconBorder} ${tone.iconText} mb-4`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div
                      className={`text-[10px] font-mono font-semibold tracking-[0.18em] uppercase ${tone.badgeText} mb-2`}
                    >
                      Adım {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                      {step.label}
                    </h3>
                    <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                      {step.detail}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CategoryCTA
        accent={category.accent}
        badge={ctaBadge}
        title={ctaTitle}
        description={ctaDescription}
      />

      <PrivacyContact />
    </div>
  );
}

interface AnnualPackageCardProps {
  service: HizmetService;
}

function AnnualPackageCard({ service }: AnnualPackageCardProps) {
  const Icon = HIZMET_ICON_MAP[service.icon] ?? Star;
  const isPlatinum = service.slug === "platinum";
  const isMc = service.slug === "mission-critical";
  const accent = isMc ? "amber" : isPlatinum ? "cyan" : service.slug === "gold" ? "amber" : "slate";
  const tone = getAccentTone(accent);

  // Show 5 dahil olanlar items max from valueProps
  return (
    <Link
      href={`/hizmetler/support/${service.slug}`}
      className={`group relative rounded-3xl border bg-white/2 hover:bg-white/4 backdrop-blur-xl transition-all p-7 overflow-hidden cursor-pointer flex flex-col ${
        isPlatinum
          ? "border-cyan-400/40 shadow-[0_0_30px_-12px_rgba(56,189,248,0.45)] hover:shadow-[0_0_45px_-12px_rgba(56,189,248,0.7)]"
          : isMc
            ? "border-amber-400/40 shadow-[0_0_30px_-12px_rgba(251,191,36,0.4)] hover:shadow-[0_0_45px_-12px_rgba(251,191,36,0.7)]"
            : "border-white/10 hover:border-white/20"
      }`}
    >
      {isPlatinum && (
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-cyan-400 to-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.6)]" />
      )}
      {isMc && (
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-amber-400 to-red-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
      )}

      <div className="relative flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <div
            className={`w-11 h-11 rounded-xl ${tone.iconBg} border ${tone.iconBorder} ${tone.iconText} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-5 h-5" />
          </div>
          {isPlatinum && (
            <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-cyan-300">
              Tavsiye edilen
            </span>
          )}
          {isMc && (
            <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-amber-300">
              En kapsamlı
            </span>
          )}
        </div>

        <div>
          <h3
            className={`text-2xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-r ${tone.headerGradient}`}
          >
            {service.name.replace(" Destek Paketi", "")}
          </h3>
          <div className="text-[11px] font-mono text-(--color-text-muted) mt-1 tracking-[0.16em] uppercase">
            <En>{service.code}</En>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2.5">
            <div className="text-[9px] font-mono font-semibold tracking-[0.2em] uppercase text-(--color-text-muted) mb-1">
              Ticket
            </div>
            <div className="text-xl font-bold text-white tabular-nums">
              {service.slug === "silver"
                ? "15"
                : service.slug === "gold"
                  ? "30"
                  : "60"}
            </div>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2.5">
            <div className="text-[9px] font-mono font-semibold tracking-[0.2em] uppercase text-(--color-text-muted) mb-1">
              Saat
            </div>
            <div className="text-xl font-bold text-white tabular-nums">
              <En>
                {service.slug === "silver"
                  ? "5x8"
                  : service.slug === "gold"
                    ? "5x8"
                    : service.slug === "platinum"
                      ? "7x8"
                      : "7x24"}
              </En>
            </div>
          </div>
        </div>

        <p className="text-xs text-(--color-text-secondary) font-light leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        <ul className="flex flex-col gap-1.5 mt-1">
          {service.valueProps.slice(0, 4).map((prop, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-[11px] text-(--color-text-overline) font-light leading-snug"
            >
              <span className={`mt-1 w-1 h-1 rounded-full ${tone.iconText.replace("text-", "bg-")} shrink-0`} />
              <span className="line-clamp-2">{prop}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-5 pt-3 border-t border-white/8 flex items-center justify-between">
        <span
          className={`text-xs font-semibold ${tone.ctaText} group-hover:translate-x-0.5 transition-transform`}
        >
          Detayları Gör
        </span>
        <ArrowRight
          className={`w-4 h-4 ${tone.ctaText} group-hover:translate-x-1 transition-transform`}
        />
      </div>
    </Link>
  );
}

interface CategoryCTAProps {
  accent: string;
  badge: string;
  title: string;
  description: string;
}

function CategoryCTA({ accent, badge, title, description }: CategoryCTAProps) {
  const tone = getAccentTone(accent);
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="container mx-auto pb-20 max-w-7xl mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br ${tone.gradientFrom} ${tone.gradientTo} p-px`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-14 md:px-12">
              <div className={`absolute top-0 left-1/4 w-64 h-64 ${tone.glowBg} blur-[100px] rounded-full pointer-events-none opacity-50`} />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                  <Star className={`w-4 h-4 ${tone.iconText}`} fill="currentColor" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                    {badge}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {title}
                </h2>
                <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                  {description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/demo">
                    <button className="px-8 py-4 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                      Demo İste
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link href="/iletisim">
                    <button className="px-8 py-4 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                      Bize Ulaşın
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getTitleLead(slug: string): string {
  switch (slug) {
    case "setup":
      return "Sıfırdan canlıya hazır";
    case "support":
      return "Canlı sistemler için";
    case "training":
      return "Sertifikalı ServiceCore";
    case "consultancy":
      return "ITIL4 süreç ve";
    default:
      return "Profesyonel";
  }
}

function getTitleAccent(slug: string): string {
  switch (slug) {
    case "setup":
      return "ServiceCore kurulumu.";
    case "support":
      return "uzman müdahale.";
    case "training":
      return "ve ITIL4 yetkinliği.";
    case "consultancy":
      return "proje yönetimi danışmanlığı.";
    default:
      return "hizmet.";
  }
}
