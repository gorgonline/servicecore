"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  LifeBuoy,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import { getAccentTone, HIZMET_ICON_MAP } from "./icon-map";
import {
  HIZMET_CATEGORIES,
  HIZMET_SERVICES,
  buildServiceHref,
  getCategoryBySlug,
  getServicesByCategory,
  type HizmetService,
} from "@/lib/hizmetler";
import { En } from "@/components/ui/En";

interface BaseSection {
  id: string;
  title: string;
}

interface TextSection extends BaseSection {
  type: "text";
  content: string;
}

interface ListSection extends BaseSection {
  type: "list";
  intro?: string;
  items: string[];
}

interface StepItem {
  label: string;
  detail: string;
}

interface StepsSection extends BaseSection {
  type: "steps";
  intro?: string;
  items: StepItem[];
}

interface TableSection extends BaseSection {
  type: "table";
  intro?: string;
  tableTitle?: string;
  headers: string[];
  rows: string[][];
  footer?: string[];
}

interface ComparisonItem {
  title: string;
  description: string;
}

interface ComparisonSection extends BaseSection {
  type: "comparison";
  items: ComparisonItem[];
}

type Section =
  | TextSection
  | ListSection
  | StepsSection
  | TableSection
  | ComparisonSection;

interface Hero {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
}

interface Summary {
  ticketCount: string;
  workingHours: string;
  responseChannels: string[];
}

interface CTA {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface ServiceDetailData {
  slug: string;
  code: string;
  name: string;
  nameEn: string;
  category: string;
  categoryLabel: string;
  paymentTerm: "one-time" | "annual";
  paymentTermLabel: string;
  accent: string;
  icon: string;
  tier?: string;
  highlight?: boolean;
  highlightLabel?: string;
  hero: Hero;
  summary?: Summary;
  sections: Section[];
  cta: CTA;
  docsLink?: string;
}

interface ServiceDetailPageProps {
  data: ServiceDetailData;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 140 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

function renderTextSection(section: TextSection) {
  return (
    <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed max-w-3xl">
      {section.content}
    </p>
  );
}

function renderListSection(section: ListSection, accent: string) {
  const tone = getAccentTone(accent);
  return (
    <div className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-8 md:p-10">
      {section.intro && (
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed mb-6">
          {section.intro}
        </p>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {section.items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3"
          >
            <Check className={`w-4 h-4 ${tone.iconText} mt-0.5 shrink-0`} />
            <span className="text-sm text-white/85 font-light leading-snug">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderStepsSection(section: StepsSection, accent: string) {
  const tone = getAccentTone(accent);
  return (
    <div className="space-y-3">
      {section.intro && (
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed mb-4 max-w-3xl">
          {section.intro}
        </p>
      )}
      {section.items.map((step, idx) => (
        <div
          key={idx}
          className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6"
        >
          <div
            className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl border ${tone.iconBorder} ${tone.iconBg} ${tone.iconText} text-sm font-mono font-semibold tabular-nums`}
          >
            {(idx + 1).toString().padStart(2, "0")}
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <div className="text-sm md:text-base font-semibold text-white tracking-tight">
              {step.label}
            </div>
            <p className="mt-1 text-sm font-light text-(--color-text-secondary) leading-relaxed">
              {step.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderTableSection(section: TableSection, accent: string) {
  const tone = getAccentTone(accent);
  return (
    <div className="space-y-6">
      {section.intro && (
        <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed max-w-3xl">
          {section.intro}
        </p>
      )}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl">
        {section.tableTitle && (
          <div
            className={`px-6 py-3 text-[11px] font-mono font-semibold tracking-[0.18em] uppercase ${tone.badgeText} ${tone.badgeBg} border-b border-white/10`}
          >
            {section.tableTitle}
          </div>
        )}
        <table className="w-full">
          <thead>
            <tr className="bg-white/3 border-b border-white/10">
              {section.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-(--color-text-muted)"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, ridx) => (
              <tr key={ridx} className="border-b border-white/5 last:border-b-0">
                {row.map((cell, cidx) => (
                  <td
                    key={cidx}
                    className={`px-6 py-3.5 text-sm leading-relaxed font-light ${
                      cidx === 0 ? "text-white font-medium" : "text-(--color-text-secondary)"
                    }`}
                  >
                    <En>{cell}</En>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.footer && section.footer.length > 0 && (
        <ul className="space-y-2 pl-1">
          {section.footer.map((line, idx) => (
            <li
              key={idx}
              className="text-xs text-(--color-text-muted) font-mono leading-snug"
            >
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function renderComparisonSection(section: ComparisonSection, accent: string) {
  const tone = getAccentTone(accent);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {section.items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-8 flex flex-col gap-3"
        >
          <div
            className={`inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border ${tone.iconBorder} ${tone.iconBg}`}
          >
            <Award className={`w-3.5 h-3.5 ${tone.iconText}`} />
            <span
              className={`text-[10px] font-mono font-semibold tracking-[0.18em] uppercase ${tone.badgeText}`}
            >
              Sertifika
            </span>
          </div>
          <h4 className="text-lg font-semibold text-white tracking-tight leading-tight">
            {item.title}
          </h4>
          <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function renderSection(section: Section, accent: string) {
  switch (section.type) {
    case "text":
      return renderTextSection(section);
    case "list":
      return renderListSection(section, accent);
    case "steps":
      return renderStepsSection(section, accent);
    case "table":
      return renderTableSection(section, accent);
    case "comparison":
      return renderComparisonSection(section, accent);
    default:
      return null;
  }
}

export function ServiceDetailPage({ data }: ServiceDetailPageProps) {
  const tone = getAccentTone(data.accent);
  const HeroIcon = HIZMET_ICON_MAP[data.icon] ?? Sparkles;
  const category = getCategoryBySlug(data.category);
  const categoryHref = category?.href ?? `/hizmetler/${data.category}`;
  const isAnnual = data.paymentTerm === "annual";

  // Related services: 8 detay sayfasi olan diger hizmetler
  const otherDetails = HIZMET_SERVICES.filter(
    (s) => s.hasDetailPage && s.slug !== data.slug
  ).slice(0, 6);

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden pb-12">
      {/* Background glows */}
      <div
        className={`absolute -top-40 -left-40 w-150 h-150 rounded-full pointer-events-none ${tone.glowBg} blur-[140px] opacity-50`}
      />
      <div
        className={`absolute top-1/2 -right-40 w-130 h-130 rounded-full pointer-events-none bg-purple-500/10 blur-[120px] opacity-50`}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32 lg:pt-40">
        {/* Breadcrumb */}
        <nav
          aria-label="Sayfa hiyerarşisi"
          className="mb-6 flex items-center gap-2 text-[11px] font-mono text-(--color-text-muted) flex-wrap"
        >
          <Link href="/hizmetler" className="hover:text-white transition-colors cursor-pointer">
            Hizmetler
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={categoryHref} className="hover:text-white transition-colors cursor-pointer">
            {data.categoryLabel}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{data.name}</span>
        </nav>

        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${tone.iconBorder} ${tone.iconBg}`}
          >
            <HeroIcon className={`w-3.5 h-3.5 ${tone.iconText}`} />
            <span
              className={`text-[10px] font-mono font-semibold tracking-[0.22em] uppercase ${tone.badgeText}`}
            >
              <En>{data.hero.eyebrow}</En>
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/4">
            <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-overline)">
              {isAnnual ? <En>Annual subscription</En> : data.paymentTermLabel}
            </span>
          </div>
          {data.highlight && data.highlightLabel && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${tone.iconBorder} ${tone.iconBg}`}
            >
              <Star className={`w-3 h-3 ${tone.iconText}`} fill="currentColor" />
              <span
                className={`text-[10px] font-mono font-semibold tracking-[0.18em] uppercase ${tone.badgeText}`}
              >
                {data.highlightLabel}
              </span>
            </div>
          )}
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white">
            <span
              className={`text-transparent bg-clip-text bg-linear-to-r ${tone.headerGradient}`}
            >
              {data.hero.title}
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {data.hero.subtitle}
          </p>

          <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
            {data.hero.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
            >
              Demo İste
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/85 hover:text-white border border-white/10 hover:bg-white/5 font-medium text-sm transition-colors cursor-pointer"
            >
              Bize Ulaşın
            </Link>
          </div>
        </motion.div>

        {/* Summary metric strip (for support packages) */}
        {data.summary && (
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-8"
            >
              <div
                className={`text-[11px] font-mono font-semibold tracking-[0.2em] uppercase ${tone.badgeText} mb-3`}
              >
                Yıllık Ticket
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-white tabular-nums tracking-tight">
                {data.summary.ticketCount}
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-8"
            >
              <div
                className={`text-[11px] font-mono font-semibold tracking-[0.2em] uppercase ${tone.badgeText} mb-3`}
              >
                Çalışma Saatleri
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-white tabular-nums tracking-tight">
                <En>{data.summary.workingHours}</En>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl p-8"
            >
              <div
                className={`text-[11px] font-mono font-semibold tracking-[0.2em] uppercase ${tone.badgeText} mb-3`}
              >
                Destek Kanalları
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.summary.responseChannels.map((channel) => (
                  <span
                    key={channel}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono text-white/85 border border-white/10 bg-white/4"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Sections */}
        <div className="mt-20 space-y-20">
          {data.sections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="scroll-mt-32"
            >
              <div
                className={`text-[11px] font-mono font-semibold tracking-[0.22em] uppercase ${tone.badgeText} mb-3`}
              >
                Bölüm
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
                {section.title}
              </h2>
              {renderSection(section, data.accent)}
            </motion.section>
          ))}
        </div>

        {/* Docs link */}
        {data.docsLink && (
          <div className="mt-20 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl ${tone.iconBg} border ${tone.iconBorder} ${tone.iconText} flex items-center justify-center shrink-0`}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted) mb-1">
                  Resmi dokümantasyon
                </div>
                <p className="text-sm text-white/85 font-light leading-snug break-all">
                  {data.docsLink}
                </p>
              </div>
            </div>
            <Link
              href={data.docsLink}
              target="_blank"
              rel="noreferrer noopener"
              className={`inline-flex items-center gap-2 px-4 h-10 rounded-full border ${tone.iconBorder} ${tone.iconBg} ${tone.iconText} text-xs font-semibold hover:brightness-125 transition-all cursor-pointer shrink-0`}
            >
              Dokümana Git
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Other detail services */}
        {otherDetails.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/8">
            <h2 className="text-xs font-mono font-semibold tracking-[0.22em] text-(--color-text-muted) mb-6 uppercase">
              Diğer Profesyonel Hizmetler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherDetails.map((service) => {
                const otherTone = getAccentTone(service.accentColor);
                const ServiceIcon = HIZMET_ICON_MAP[service.icon] ?? Sparkles;
                return (
                  <Link
                    key={service.slug}
                    href={buildServiceHref(service)}
                    className="group rounded-2xl border border-white/10 bg-white/2 hover:bg-white/5 hover:border-white/20 px-5 py-4 transition-all cursor-pointer flex items-start gap-3"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg ${otherTone.iconBg} border ${otherTone.iconBorder} ${otherTone.iconText} flex items-center justify-center shrink-0`}
                    >
                      <ServiceIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white group-hover:text-white transition-colors leading-snug">
                        {service.name}
                      </div>
                      <div className="text-xs text-(--color-text-secondary) mt-1 leading-snug line-clamp-2">
                        {service.tagline}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Categories quick links */}
        <section className="mt-16">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] text-(--color-text-muted) mb-6 uppercase">
            Tüm Kategoriler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HIZMET_CATEGORIES.map((cat) => {
              const catTone = getAccentTone(cat.accent);
              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="group rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 px-4 py-3 transition-all cursor-pointer"
                >
                  <div
                    className={`text-xs font-mono font-semibold tracking-[0.16em] uppercase ${catTone.badgeText} mb-1`}
                  >
                    {cat.count} hizmet
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                    {cat.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`group relative overflow-hidden rounded-3xl bg-linear-to-br ${tone.gradientFrom} ${tone.gradientTo} p-px`}
          >
            <div className="relative rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-14 md:px-12 md:py-16 text-center">
              <div className={`absolute top-0 left-1/4 w-64 h-64 ${tone.glowBg} blur-[100px] rounded-full pointer-events-none opacity-40`} />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 mx-auto">
                  {isAnnual ? (
                    <LifeBuoy className={`w-4 h-4 ${tone.iconText}`} />
                  ) : (
                    <Wrench className={`w-4 h-4 ${tone.iconText}`} />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                    {data.categoryLabel}
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
        </section>

        {/* Foot navigation */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/8">
          <Link
            href={categoryHref}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4 rotate-180" />
            {data.categoryLabel} kategori sayfasına dön
          </Link>
          <Link
            href={getServicesByCategory(data.category)
              .filter((s) => s.hasDetailPage && s.slug !== data.slug)
              .at(0)?.slug
              ? buildServiceHref(
                  getServicesByCategory(data.category).filter(
                    (s) => s.hasDetailPage && s.slug !== data.slug
                  )[0] as HizmetService
                )
              : "/hizmetler"}
            className={`inline-flex items-center gap-2 text-sm ${tone.ctaText} hover:text-white transition-colors cursor-pointer`}
          >
            Diğer detay sayfası
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
