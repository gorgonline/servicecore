"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  AlarmClock,
  CalendarRange,
  ChartColumn,
  ChartGantt,
  CheckCircle2,
  ClipboardCheck,
  CopyPlus,
  FileSpreadsheet,
  Gauge,
  Hourglass,
  MailCheck,
  Puzzle,
  ShieldAlert,
  Target,
  type LucideIcon,
} from "lucide-react";
import { EnTerms } from "@/components/ui/En";
import data from "@/data/jira-karsilastirma.json";

/*
 * Jira Alternatifi › "Jira'da eklentiyle gelen yetenekler" bölümü.
 * Jira tarafı: uygulamanın Atlassian Marketplace'teki Data Center sayfası (ad, üretici, tanım).
 * ServiceCore tarafı: ürünün kullanım belgesindeki ekran adları (servicecore-docs) ve /planlar-pm metinleri.
 */

interface MarketplaceApp {
  name: string;
  vendor: string;
}

interface MarketplaceItem {
  id: string;
  icon: string;
  accent?: string;
  category: string;
  apps: MarketplaceApp[];
  jiraText: string;
  oursTitle: string;
  oursText: string;
  screens?: string[];
}

const iconMap: Record<string, LucideIcon> = {
  AlarmClock,
  CalendarRange,
  ChartColumn,
  ChartGantt,
  ClipboardCheck,
  CopyPlus,
  FileSpreadsheet,
  Gauge,
  Hourglass,
  MailCheck,
  ShieldAlert,
  Target,
};

const accents: Record<string, { iconBg: string; iconText: string; glow: string }> = {
  emerald: {
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconText: "text-(--color-accent-emerald-light)",
    glow: "bg-emerald-500/10",
  },
  blue: {
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconText: "text-(--color-accent-blue-light)",
    glow: "bg-blue-500/10",
  },
  purple: {
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconText: "text-(--color-accent-purple-light)",
    glow: "bg-purple-500/10",
  },
  cyan: {
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    iconText: "text-(--color-accent-cyan-light)",
    glow: "bg-cyan-500/10",
  },
};

function AppChips({ apps }: { apps: MarketplaceApp[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {apps.map((app) => (
        <span
          key={app.name}
          lang="en"
          className="inline-flex flex-wrap items-baseline gap-x-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/3"
        >
          <span className="text-sm font-semibold text-white">{app.name}</span>
          <span className="text-xs text-(--color-text-muted)">{app.vendor}</span>
        </span>
      ))}
    </div>
  );
}

function IncludedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-emerald-500/10 border-emerald-500/20">
      <CheckCircle2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-(--color-accent-emerald-light)">
        {label}
      </span>
    </span>
  );
}

function SmallLabel({ text }: { text: string }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-muted)">
      <EnTerms text={text} terms={["ServiceCore", "Jira"]} />
    </span>
  );
}

export function JiraMarketplaceSection() {
  const reduceMotion = useReducedMotion();
  const m = data.marketplace;
  const featured = m.featured as MarketplaceItem[];
  const others = m.others as MarketplaceItem[];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
  };
  const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  return (
    <section id={m.id} className="relative w-full py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-200 h-100 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/8 via-transparent to-transparent pointer-events-none blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Başlık */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-(--color-accent-emerald-light) text-xs font-black tracking-widest uppercase mb-6 shadow-inner">
            <Puzzle size={14} />
            <EnTerms text={m.badge} terms={["Jira"]} />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight text-balance">
            {m.title}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-emerald-light) to-(--color-accent-cyan-light)">
              {m.titleHighlight}
            </span>
          </h2>
          <p className="text-base lg:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            {m.subtitle}
          </p>
        </motion.div>

        {/* Erman'ın saydığı dört yetenek: büyük kartlar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {featured.map((item) => {
            const accent = accents[item.accent ?? "blue"] ?? accents.blue;
            const Icon = iconMap[item.icon] ?? Puzzle;
            return (
              <motion.article
                key={item.id}
                variants={reduceMotion ? undefined : fadeUp}
                className="relative rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-6 lg:p-8 flex flex-col gap-6 overflow-hidden transition-colors hover:border-white/20"
              >
                <div className={`absolute -top-20 -right-20 w-60 h-60 ${accent.glow} blur-[80px] rounded-full pointer-events-none`} />

                <div className="relative flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl border ${accent.iconBg} flex items-center justify-center ${accent.iconText}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">{item.category}</h3>
                </div>

                <div className="relative flex flex-col gap-3">
                  <SmallLabel text={m.jiraLabel} />
                  <AppChips apps={item.apps} />
                  <p className="text-sm text-(--color-text-muted) font-light leading-relaxed">{item.jiraText}</p>
                </div>

                <div className="relative flex flex-col gap-3 pt-6 border-t border-white/8">
                  <div className="flex flex-wrap items-center gap-3">
                    <SmallLabel text={m.oursLabel} />
                    <IncludedBadge label={m.includedLabel} />
                  </div>
                  <h4 className="text-lg font-semibold text-white tracking-tight">{item.oursTitle}</h4>
                  <p className="text-sm lg:text-[15px] text-(--color-text-secondary) font-light leading-relaxed">
                    {item.oursText}
                  </p>
                  {item.screens && item.screens.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {item.screens.map((screen) => (
                        <li
                          key={screen}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/3 border border-white/8 text-(--color-text-overline)"
                        >
                          {screen}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Öbür eklentiler: satır satır */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-8 text-center">{m.othersTitle}</h3>

          <div className="rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.1fr)_minmax(0,1.45fr)] gap-8 px-8 py-4 bg-white/3 border-b border-white/8">
              <SmallLabel text={m.capabilityLabel} />
              <SmallLabel text={m.jiraLabel} />
              <SmallLabel text={m.oursLabel} />
            </div>

            <ul>
              {others.map((item, i) => {
                const Icon = iconMap[item.icon] ?? Puzzle;
                return (
                  <li
                    key={item.id}
                    className={`grid grid-cols-1 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.1fr)_minmax(0,1.45fr)] gap-4 md:gap-8 px-5 md:px-8 py-6 ${
                      i > 0 ? "border-t border-white/5" : ""
                    }`}
                  >
                    <div className="flex items-center md:items-start gap-3">
                      <div className="w-9 h-9 rounded-lg border bg-white/3 border-white/10 flex items-center justify-center text-(--color-accent-cyan-light) shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-base font-semibold text-white tracking-tight md:pt-1.5">{item.category}</span>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <span className="md:hidden">
                        <SmallLabel text={m.jiraLabel} />
                      </span>
                      <AppChips apps={item.apps} />
                      <p className="text-sm text-(--color-text-muted) font-light leading-relaxed">{item.jiraText}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="md:hidden">
                        <SmallLabel text={m.oursLabel} />
                      </span>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-1 text-(--color-accent-emerald-light) shrink-0" />
                        <span className="text-base font-semibold text-white tracking-tight">{item.oursTitle}</span>
                      </div>
                      <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{item.oursText}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-8 text-center text-xs text-(--color-text-muted) font-light max-w-3xl mx-auto">
            {m.footnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
