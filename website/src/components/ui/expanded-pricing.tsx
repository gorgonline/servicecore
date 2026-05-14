"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, Plus, Infinity as InfinityIcon, Sparkles, Building2, Blocks, MessageSquare, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

// --- Data Models ---
export interface PricingFeature {
  title: string;
  description: string;
}

export interface AddonItem {
  name: string;
  desc?: string;
  link?: string;
}

export interface AddonCategory {
  title: string;
  items: AddonItem[];
}

export interface ProInfoBox {
  prefix: string;
  highlight: string;
  suffix: string;
}

export interface PricingData {
  section: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    deploymentPill: string;
    subscriptionPill: string;
  };
  standard: {
    title: string;
    description: string;
    infoBox: string;
    featuresLabel: string;
    ctaLabel: string;
    footerNote: string;
    features: PricingFeature[];
  };
  pro: {
    title: string;
    description: string;
    infoBox: ProInfoBox;
    extraLabel: string;
    onlyLabel: string;
    ctaLabel: string;
    popularLabel: string;
    footerNote: string;
    extraModules: PricingFeature[];
    onlyFeatures: PricingFeature[];
  };
  addons: {
    title: string;
    description: string;
    categories: AddonCategory[];
  };
}

const FeatureAccordion = ({ feature, isPro = false, isHighlight = false }: { feature: PricingFeature, isPro?: boolean, isHighlight?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) rounded-sm cursor-pointer z-10 relative"
        tabIndex={0}
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${
            isHighlight ? "text-(--color-accent-emerald-light)" : isPro ? "text-(--color-brand-primary)" : "text-(--color-text-secondary)"
          }`} />
          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            {feature.title}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-(--color-text-muted) transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-7 text-xs text-(--color-text-secondary) font-light leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function ExpandedPricingSection({ data }: { data: PricingData }) {
  const { section, standard, pro, addons } = data;

  return (
    <section id="expanded-pricing" className="relative w-full py-24 overflow-hidden bg-(--color-surface-base-dark)">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-[20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-(--color-brand-primary)/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-(--color-brand-primary)/10 to-emerald-500/10 border border-white/10  mb-6">
            <Sparkles className="w-4 h-4 text-(--color-brand-primary)" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">{section.badge}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
            {section.titleLead} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) font-bold">
              {section.titleHighlight}
            </span>
          </h2>

          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            {section.description}
          </p>

          {/* Pricing Model Info Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/2 border border-white/5 text-sm text-(--color-text-overline)">
                <Building2 className="w-4 h-4 text-(--color-brand-primary)" />
                {section.deploymentPill}
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/2 border border-white/5 text-sm text-(--color-text-overline)">
                <InfinityIcon className="w-4 h-4 text-(--color-accent-emerald-light)" />
                {section.subscriptionPill}
             </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid - 2 Columns Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">

          {/* 1. Standart Versiyon */}
          <motion.div
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-4xl bg-(--color-surface-elevated-dark) border border-white/10 p-8 md:p-10  relative group transition-colors"
          >
            {/* Header Area */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2.5 rounded-lg bg-slate-800/50 border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-(--color-text-overline)" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">{standard.title}</h3>
              </div>

              <p className="text-(--color-text-secondary) text-sm leading-relaxed mb-6 h-16">
                {standard.description}
              </p>

              <Link
                href="/iletisim"
                className="w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
              >
                 <MessageSquare className="w-4 h-4" />
                 {standard.ctaLabel}
              </Link>
            </div>

            <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Features Info Box - Standart (Green Theme) */}
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-100/80 font-light leading-relaxed flex items-start gap-3">
               <div className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent-emerald-base)" />
               <span>{standard.infoBox}</span>
            </div>

            {/* Features Accordion List - NO SCROLLBAR HERE */}
            <div className="flex flex-col gap-1">
               <h4 className="text-xs font-semibold text-(--color-text-secondary) mb-4 px-1 uppercase tracking-wider">{standard.featuresLabel} ({standard.features.length})</h4>
               <div className="pr-2 pb-4">
                  {standard.features.map((feat, idx) => (
                      <FeatureAccordion key={idx} feature={feat} />
                  ))}
               </div>
            </div>

             {/* Footer Info Box */}
            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-(--color-text-muted) leading-relaxed font-light">
               {standard.footerNote}
            </div>
          </motion.div>


          {/* 2. Profesyonel Versiyon */}
          <motion.div
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col rounded-4xl bg-linear-to-b from-(--color-brand-primary)/8 to-(--color-surface-base-dark) border border-(--color-brand-primary)/30 p-8 md:p-10  relative group shadow-(--shadow-glow-primary-card)"
          >
             {/* Clipping Wrapper for Background Glow */}
            <div className="absolute inset-0 rounded-4xl overflow-hidden pointer-events-none">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-(--color-brand-primary)/15 to-transparent rounded-full pointer-events-none" />
            </div>

            {/* Pro Highlight Label */}
            <div className="absolute -top-4 -right-2 md:right-8 z-20">
                <div className="relative">
                   <div className="absolute inset-0 bg-(--color-brand-primary) blur-md opacity-60 rounded-full" />
                   <div className="relative bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-blue-base) text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-xl ring-1 ring-white/20 whitespace-nowrap">
                      {pro.popularLabel}
                   </div>
                </div>
            </div>

            {/* Header Area */}
            <div className="mb-8 relative z-10 pt-2">
               <div className="flex items-center gap-3 mb-4">
                 <div className="p-2.5 rounded-lg bg-(--color-brand-primary)/20 border border-(--color-brand-primary)/30">
                    <Zap className="w-6 h-6 text-(--color-brand-primary)" />
                 </div>
                 <h3 className="text-2xl font-bold text-white">{pro.title}</h3>
              </div>

              <p className="text-blue-100/90 text-sm leading-relaxed mb-6 h-16 font-medium">
                {pro.description}
              </p>

              <Link
                href="/iletisim"
                className="w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) text-white font-semibold transition-all duration-300 shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
              >
                 <MessageSquare className="w-4 h-4" />
                 {pro.ctaLabel}
              </Link>
            </div>

            <div className="w-full h-px bg-linear-to-r from-(--color-brand-primary)/30 via-(--color-brand-primary)/20 to-transparent mb-8" />

            {/* Features Info Box - Pro (Blue Theme) */}
            <div className="mb-6 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-(--color-brand-primary)/15 border border-(--color-brand-primary)/30 shadow-(--shadow-glow-primary-weak)">
               <Plus className="w-4 h-4 text-(--color-brand-primary) mt-0.5 shrink-0" />
               <span className="text-sm text-blue-100/90 leading-relaxed font-medium">{pro.infoBox.prefix}<strong>{pro.infoBox.highlight}</strong>{pro.infoBox.suffix}</span>
            </div>

            {/* Scrollable Features Area - NO SCROLLBAR HERE */}
            <div className="flex flex-col gap-6 relative z-10">

               {/* Ek Modüller */}
               <div>
                  <h4 className="text-xs font-semibold text-(--color-brand-primary) mb-3 px-1 uppercase tracking-wider">{pro.extraLabel} ({pro.extraModules.length})</h4>
                  <div className="flex flex-col gap-0.5">
                     {pro.extraModules.map((feat, idx) => (
                         <FeatureAccordion key={idx} feature={feat} isPro={true} />
                     ))}
                  </div>
               </div>

               {/* Proya Özgü Modüller */}
               <div>
                  <h4 className="text-xs font-semibold text-(--color-accent-emerald-light) mb-3 px-1 uppercase tracking-wider flex items-center gap-2">
                     <Sparkles className="w-3 h-3" />
                     {pro.onlyLabel} ({pro.onlyFeatures.length})
                  </h4>
                  <div className="flex flex-col gap-0.5">
                     {pro.onlyFeatures.map((feat, idx) => (
                         <FeatureAccordion key={idx} feature={feat} isHighlight={true} />
                     ))}
                  </div>
               </div>

            </div>

             {/* Footer Info Box */}
             <div className="mt-8 pt-6 border-t border-(--color-brand-primary)/20 text-xs text-slate-400/80 leading-relaxed font-light relative z-10">
               {pro.footerNote}
            </div>

          </motion.div>

        </div>

        {/* Add-ons & Solutions Section (Bottom Row) */}
        <motion.div
           transition={{ duration: 0.6, delay: 0.4 }}
           className="w-full rounded-4xl bg-(--color-surface-addon) border border-white/5 p-8 md:p-12 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-fuchsia-500/50 to-transparent opacity-50" />

            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-fuchsia-400 shrink-0">
                  <Blocks className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{addons.title}</h3>
                  <p className="text-(--color-text-secondary) text-sm md:text-base leading-relaxed max-w-3xl">
                     {addons.description}
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
               {addons.categories.map((category, idx) => (
                  <div key={idx} className="flex flex-col">
                     <h4 className="text-sm font-semibold text-white mb-6 border-b border-white/10 pb-4 uppercase tracking-wider">{category.title}</h4>
                     <ul className="flex flex-col gap-4">
                        {category.items.map((item, itemIdx) => {
                          const link = "link" in item ? (item as { link?: string }).link : undefined;
                          const inner = (
                            <div className="flex items-start gap-3">
                              <div className="mt-1.5 w-1 h-1 rounded-full bg-fuchsia-500/50 group-hover:bg-fuchsia-400 transition-colors shrink-0" />
                              <div className="flex-1">
                                <span className="text-[13px] font-medium text-(--color-text-overline) group-hover:text-white transition-colors flex items-center gap-1.5">
                                  {item.name}
                                  {link && (
                                    <ArrowUpRight
                                      className="w-3.5 h-3.5 text-fuchsia-400 opacity-70 group-hover:opacity-100 transition-opacity"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                                {item.desc && (
                                  <span className="text-xs text-(--color-text-muted) mt-1.5 block leading-relaxed group-hover:text-(--color-text-secondary) transition-colors">
                                    {item.desc}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                          return (
                            <li key={itemIdx} className="group relative pr-4">
                              {link ? (
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block cursor-pointer"
                                >
                                  {inner}
                                </a>
                              ) : (
                                inner
                              )}
                            </li>
                          );
                        })}
                     </ul>
                  </div>
               ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
}
