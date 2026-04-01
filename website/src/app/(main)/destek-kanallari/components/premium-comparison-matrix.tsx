"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Minus, Info } from "lucide-react";
import destekData from "@/data/destek-kanallari.json";

export function PremiumComparisonMatrix() {
  const { headers, features } = destekData.supportPackages;
  
  // headers: ["Destek Paketleri", "Basic", "Gold", "Platin", "Mission Critical"]
  // First column is the feature name, next 4 columns are the tiers
  const tiers = headers.slice(1);

  return (
    <section id="packages" className="relative w-full py-24 overflow-hidden bg-(--color-surface-base-dark)">
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-(--color-brand-primary)/10 via-transparent to-transparent pointer-events-none blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.7 }}
           className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            SLA <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light)">Paket Karşılaştırması</span>
          </h2>
          <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
            İhtiyacınıza uygun destek seviyesini seçin. Mission Critical ve Platinum paketlerimizle en üst düzey ayrıcalıklara sahip olun.
          </p>
        </motion.div>

        {/* The Matrix Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full overflow-x-auto pb-6 custom-scrollbar"
        >
          <div className="min-w-[900px] w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden relative shadow-2xl">
             
             {/* Table Header Row */}
             <div className="grid grid-cols-5 border-b border-white/10 bg-(--color-surface-elevated-dark)/80 backdrop-blur-md sticky top-0 z-20">
               {/* Feature Header */}
               <div className="col-span-1 p-4 md:p-6 flex flex-col justify-end border-r border-white/5 bg-(--color-surface-elevated-dark)">
                  <h3 className="text-xs md:text-sm font-semibold text-(--color-text-secondary) uppercase tracking-widest">
                    Özellikler
                  </h3>
               </div>
               
               {/* Tiers Headers */}
               {tiers.map((tierName, idx) => {
                  const isPro = tierName === "Platinum" || tierName === "Mission Critical";
                  return (
                    <div 
                      key={idx} 
                      className={`col-span-1 p-4 md:p-6 flex flex-col items-center justify-end text-center relative border-r border-white/5 last:border-r-0 ${
                        isPro ? "bg-gradient-to-t from-(--color-brand-primary)/10 to-transparent" : ""
                      }`}
                    >
                      {isPro && (
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light) shadow-[0_0_15px_rgba(0,112,243,0.5)]" />
                      )}
                      
                      {isPro && (
                         <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-(--color-accent-cyan-light) mb-2">
                           {tierName === "Mission Critical" ? "En Kapsamlı" : "Tavsiye Edilen"}
                         </span>
                      )}
                      <h3 className={`text-lg md:text-xl font-bold ${isPro ? "text-white" : "text-(--color-text-overline)"}`}>
                        {tierName}
                      </h3>
                    </div>
                  );
               })}
             </div>

             {/* Table Body Rows */}
             <div className="flex flex-col">
               {features.map((feature, featureIndex) => (
                 <motion.div 
                   key={featureIndex}
                   whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                   className="grid grid-cols-5 border-b border-white/5 last:border-b-0 transition-colors duration-200 group relative"
                 >
                   {/* Row Name */}
                   <div className="col-span-1 p-4 md:p-5 flex items-center justify-between gap-3 border-r border-white/5 bg-(--color-surface-elevated-dark)/50 sticky left-0 z-10">
                      <span className="text-xs md:text-sm font-medium text-(--color-text-overline) group-hover:text-white transition-colors">
                        {feature.name}
                      </span>
                      {/* Optional Info Icon for Specific Rows */}
                      {(feature.name.includes("Süresi") || feature.name.includes("Saat") || typeof feature.values[0] === "string") ? (
                         <div className="group-hover:opacity-100 opacity-50 transition-opacity hidden sm:block" title="Detaylı bilgi için uzmanlarımıza danışın">
                           <Info className="w-3.5 h-3.5 text-(--color-text-muted)" />
                         </div>
                      ) : null}
                   </div>
                   
                   {/* Row Values (Tiers) */}
                   {feature.values.map((val, valIndex) => {
                      const tierName = tiers[valIndex];
                      const isProColumn = tierName === "Platinum" || tierName === "Mission Critical";
                      const isTrue = val === true;
                      const isFalse = val === false;
                      const isString = typeof val === "string";

                      return (
                        <div 
                          key={valIndex} 
                          className={`col-span-1 p-4 md:p-5 flex items-center justify-center border-r border-white/5 last:border-r-0 ${
                            isProColumn ? "bg-(--color-brand-primary)/[0.02]" : ""
                          }`}
                        >
                          {isTrue && (
                            <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 ${isProColumn ? "text-(--color-brand-primary)" : "text-emerald-400/80"}`} />
                          )}
                          {isFalse && (
                            <Minus className="w-4 h-4 md:w-5 md:h-5 text-slate-600/50" />
                          )}
                          {isString && (
                            <span className={`text-xs md:text-sm font-semibold text-center ${isProColumn ? "text-white" : "text-(--color-text-overline)"}`}>
                              {val}
                            </span>
                          )}
                        </div>
                      );
                   })}
                 </motion.div>
               ))}
             </div>
             
          </div>
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="mt-4 text-center text-xs text-(--color-text-muted) md:hidden flex items-center justify-center gap-2">
           <span>Tabloyu kaydırmak için sağa/sola sürükleyin</span>
        </div>

      </div>
    </section>
  );
}
