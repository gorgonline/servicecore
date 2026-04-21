"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, MessageSquare, ShieldCheck, Zap, Minus } from "lucide-react";
import destekData from "@/data/destek-kanallari.json";

// Shared Accordion Component (Extracted logic from PricingSection principles)
const FeatureAccordion = ({ featureName, value, isProHighlight }: { featureName: string, value: string | boolean, isProHighlight: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAvailable = value === true || typeof value === "string";

  return (
    <div className="border-b border-white/5 last:border-0 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3.5 text-left group focus:outline-none rounded-sm cursor-pointer z-10 relative"
      >
        <div className="flex items-center gap-3 pr-4">
          {isAvailable ? (
             <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${
               isProHighlight ? "text-(--color-brand-primary)" : "text-(--color-accent-emerald-light)"
             }`} />
          ) : (
             <Minus className="w-4 h-4 shrink-0 text-(--color-text-dim)" />
          )}
          <span className={`text-[13px] sm:text-sm font-medium transition-colors ${
            !isAvailable ? "text-(--color-text-muted)" : "text-(--color-text-overline) group-hover:text-white"
          }`}>
            {featureName}
          </span>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          {typeof value === "string" && (
             <span className={`text-[11px] font-bold uppercase tracking-wider ${
               isProHighlight ? "text-(--color-brand-primary)" : "text-white"
             }`}>
               {value}
             </span>
          )}
          {isAvailable && (
             <ChevronDown className={`w-4 h-4 text-(--color-text-muted) transition-transform duration-300 hidden sm:block ${isOpen ? "rotate-180" : ""}`} />
          )}
        </div>
      </button>
      
      {/* If there's an explanation required we could fetch it, for now we just show a static hint or collapse text if open */}
      <AnimatePresence>
        {isOpen && isAvailable && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-7 text-[13px] text-(--color-text-muted) font-light leading-relaxed">
              {featureName} süreçlerinizi ServiceCore SLA taahhütleri ile optimize edin.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function SupportTiersCards() {
  const { headers, features } = destekData.supportPackages;
  
  // Extract packages ignoring the first empty header
  const pkgs = headers.slice(1);
  // pkgs: ["Standart", "Genel Merkez", "Mission Critical", "Platinum"]
  
  // We'll map the indices. Standart = 0, Genel Merkez = 1, Mission Critical = 2, Platinum = 3

  return (
    <section id="packages" className="relative w-full py-24 overflow-hidden bg-(--color-surface-base-dark)">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -right-[20%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-(--color-brand-primary)/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Performans <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light)">SLA Paketleri</span>
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            Operasyonel kritiklik derecenize göre optimize edilmiş, esnek müdahale ve çözüm sürelerini barındıran lisans bazlı hizmet paketlerimizi karşılaştırın.
          </p>
        </motion.div>

        {/* Pricing Cards Grid - Using a 4 Column Custom Setup or 2 Row Setup */}
        {/* We have 4 packages. We'll show Standart & Genel Merkez first, then Critical & Platinum, or a 4-col scroll on mobile */ }
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          
          {pkgs.map((pkgName, index) => {
             const isPro = pkgName === "Mission Critical" || pkgName === "Platinum";
             
             return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col rounded-4xl p-8 relative group transition-colors h-full ${
                  isPro 
                    ? "bg-linear-to-b from-(--color-brand-primary)/[0.08] to-(--color-surface-base) border border-(--color-brand-primary)/30 shadow-(--shadow-glow-primary-card)" 
                    : "bg-(--color-surface-elevated-dark) border border-white/10"
                }`}
              >
                {/* Pro Badge */}
                {isPro && (
                  <div className="absolute -top-3 1/2 transform -translate-x-1/2 left-1/2 z-20 w-max">
                     <div className="relative bg-linear-to-r from-(--color-brand-primary) to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl ring-1 ring-white/20">
                        {pkgName === "Mission Critical" ? "Popüler Seçim" : "En Kapsamlı"}
                     </div>
                  </div>
                )}
                
                {/* Header Area */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                     <div className={`p-2.5 rounded-lg border ${isPro ? "bg-(--color-brand-primary)/20 border-(--color-brand-primary)/30" : "bg-slate-800/50 border-white/5"}`}>
                        {isPro ? <Zap className="w-5 h-5 text-(--color-brand-primary)" /> : <ShieldCheck className="w-5 h-5 text-(--color-text-overline)" />}
                     </div>
                     <h3 className="text-xl font-bold text-white leading-tight">{pkgName}</h3>
                  </div>
                  
                  <button className={`w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-medium transition-all focus:outline-none cursor-pointer mt-4 ${
                    isPro 
                      ? "bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) text-white shadow-(--shadow-glow-primary)" 
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  }`}>
                     <MessageSquare className="w-4 h-4" />
                     <span className="text-sm">İletişime Geç</span>
                  </button>
                </div>

                <div className={`w-full h-px mb-6 ${isPro ? "bg-linear-to-r from-(--color-brand-primary)/30 via-(--color-brand-primary)/20 to-transparent" : "bg-linear-to-r from-transparent via-white/10 to-transparent"}`} />

                {/* Features Accordion List */}
                <div className="flex flex-col gap-1 flex-grow">
                   <h4 className={`text-[11px] font-semibold mb-3 px-1 uppercase tracking-wider ${isPro ? "text-(--color-brand-primary)" : "text-(--color-text-muted)"}`}>
                     Paket Kapsamı
                   </h4>
                   <div className="flex flex-col pr-1">
                      {features.map((featureObj, fIdx) => (
                          <FeatureAccordion 
                            key={fIdx} 
                            featureName={featureObj.name} 
                            value={featureObj.values[index]} 
                            isProHighlight={isPro}
                          />
                      ))}
                   </div>
                </div>
              </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
}
