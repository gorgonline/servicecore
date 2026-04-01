"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, Plus, Infinity as InfinityIcon, Sparkles, Building2, MessageSquare, ShieldCheck, Zap, Blocks } from "lucide-react";
import pricingData from "@/data/pricing.json";

const FeatureAccordion = ({ name, desc, isPro = false }: { name: string, desc: string, isPro?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) rounded-sm cursor-pointer z-10 relative"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${
             isPro ? "text-(--color-brand-primary)" : "text-emerald-400/70"
          }`} />
          <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-(--color-text-muted) group-hover:text-(--color-text-overline) transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-7 text-xs leading-relaxed text-(--color-text-secondary) font-light">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function DetailedPricingSection() {
  return (
    <section id="detailed-pricing" className="relative w-full py-24 overflow-hidden bg-(--color-surface-base-dark)">
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-(--color-brand-primary)/10 to-emerald-500/10 border border-white/10  mb-6">
            <Sparkles className="w-4 h-4 text-(--color-brand-primary)" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">Detaylı Versiyon Karşılaştırması</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
            {pricingData.title.split(" ").slice(0, -1).join(" ")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) font-bold">
              {pricingData.title.split(" ").pop()} Seçin.
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            {pricingData.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
             {pricingData.deployment.map((item, idx) => (
               <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-(--color-text-overline)">
                  <Building2 className="w-4 h-4 text-(--color-brand-primary)" />
                  {item}
               </div>
             ))}
             <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-(--color-text-overline)">
                <InfinityIcon className="w-4 h-4 text-(--color-accent-emerald-light)" />
                {pricingData.model}
             </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
          {pricingData.plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`flex flex-col rounded-[2rem] p-8 md:p-10 relative group transition-all duration-500 ${
                plan.popular 
                ? "bg-gradient-to-b from-(--color-brand-primary)/[0.08] to-(--color-surface-base-dark) border border-(--color-brand-primary)/30 shadow-(--shadow-glow-primary-card)" 
                : "bg-(--color-surface-elevated-dark) border border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 -right-2 md:right-8 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-(--color-brand-primary) blur-md opacity-60 rounded-full" />
                    <div className="relative bg-gradient-to-r from-(--color-brand-primary) to-(--color-accent-blue-base) text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-xl ring-1 ring-white/20 whitespace-nowrap">
                      En Çok Tercih Edilen
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg border ${plan.popular ? "bg-(--color-brand-primary)/20 border-(--color-brand-primary)/30" : "bg-slate-800/50 border-white/5"}`}>
                    {plan.popular ? <Zap className="w-6 h-6 text-(--color-brand-primary)" /> : <ShieldCheck className="w-6 h-6 text-(--color-text-overline)" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>
                
                <p className="text-(--color-text-secondary) text-sm leading-relaxed mb-6 h-12">
                  {plan.tagline}
                </p>
                
                <button className={`w-full inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                  plan.popular 
                  ? "bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) text-white shadow-(--shadow-glow-primary)" 
                  : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                }`}>
                  <MessageSquare className="w-4 h-4" />
                  Şimdi Teklif Alın
                </button>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              <div className="flex flex-col pr-2 max-h-[700px] overflow-y-auto custom-scrollbar">
                {plan.features.map((feat, fIdx) => (
                  <FeatureAccordion key={fIdx} name={feat.name} desc={feat.desc} isPro={plan.popular} />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-xs text-(--color-text-muted) leading-relaxed font-light">
                * Minimum {plan.minTechnicians} teknisyen zorunluluğu bulunmaktadır. {plan.id === "professional" && "Hibrit kurulum desteği mevcuttur."}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons Grid */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.6 }}
           className="w-full rounded-[2rem] bg-(--color-surface-addon) border border-white/5 p-8 md:p-12 relative overflow-hidden"
        >
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-fuchsia-400 shrink-0">
                  <Blocks className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Eklentiler ve Çözümler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {pricingData.addons.map((addon, aIdx) => (
                      <div key={aIdx} className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-fuchsia-500/30 transition-all cursor-default">
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-fuchsia-400 transition-colors">{addon.name}</h4>
                        <p className="text-[11px] text-(--color-text-muted) leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                          {addon.desc}
                        </p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
