'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ShieldCheck,
  LucideIcon,
  Workflow,
  Settings,
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';
import ServiceCoreHero from '@/components/ui/ServiceCoreHero';
import { Card, CardContent } from '@/components/ui/card';
import pratiklerData from '@/data/pratikler.json';
import PrivacyContact from '@/components/ui/privacy-contact';

// Icon mapping for categories
const sectionIcons: Record<string, LucideIcon> = {
  "genel-yonetim": Settings,
  "hizmet-yonetimi": Workflow,
  "teknik-yonetim": Database
};

const sectionColors: Record<string, string> = {
  "genel-yonetim": "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
  "hizmet-yonetimi": "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
  "teknik-yonetim": "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20"
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function PratiklerPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) text-white pb-0 overflow-hidden">
      {/* Background depth glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] -left-[5%] w-150 h-150 bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[5%] w-125 h-125 bg-emerald-600/5 blur-[120px] rounded-full" />
      </div>

      <ServiceCoreHero 
        title={pratiklerData.page.title}
        highlightedWord={pratiklerData.page.highlight}
        subtitle={pratiklerData.page.description}
        badge="ITIL 4 STANDARTLARI"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-32 relative z-20">
        {pratiklerData.sections.map((section) => {
          const Icon = sectionIcons[section.id] || ShieldCheck;
          const colorClass = sectionColors[section.id];

          return (
            <section key={section.id} className="mb-32">
              {/* Section Header */}
              <motion.div
                className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
              >
                <div className="max-w-3xl">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{section.title}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    {section.title}
                  </h2>
                  <p className="text-lg text-(--color-text-secondary) font-light leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="hidden lg:block h-px grow bg-linear-to-r from-white/10 to-transparent ml-16 mb-8" />
              </motion.div>

              {/* Items Grid */}
              <motion.div
                variants={containerVariants}
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {section.items.map((item, index) => (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Card className="group h-full bg-white/2 border-white/5 backdrop-blur-3xl hover:bg-white/6 hover:border-white/10 transition-all duration-500 overflow-hidden rounded-4xl">
                      <div className="absolute inset-0 bg-linear-to-br from-(--color-brand-primary)/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardContent className="p-8 relative z-10 flex flex-col h-full">
                        <div className="mb-8 flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-(--color-text-muted) group-hover:text-(--color-accent-blue-light) group-hover:border-blue-500/30 transition-all duration-500 shadow-inner">
                            <span className="text-xs font-black">{index + 1}</span>
                          </div>
                          <Sparkles className="w-4 h-4 text-white/0 group-hover:text-blue-400/40 transition-colors duration-700" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-(--color-text-secondary) group-hover:text-(--color-text-overline) leading-relaxed text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.desc}
                        </p>
                        <div className="mt-auto pt-10 flex items-center gap-2 text-[10px] font-black text-(--color-text-dim) group-hover:text-blue-500 transition-colors duration-300 tracking-widest">
                          <div className="w-1 h-1 rounded-full bg-current" />
                          <span>EĞİTİM & DANIŞMANLIK</span>
                          <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* Full-Width Footer CTA */}
      <motion.div
        transition={{ duration: 0.8 }}
        className="mt-20"
      >
        <PrivacyContact />
      </motion.div>
    </main>
  );
}
