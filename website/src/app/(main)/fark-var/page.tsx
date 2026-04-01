'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  ShieldCheck, 
  LucideIcon,
  Workflow, 
  Layers, 
  Zap, 
  BarChart3, 
  Users, 
  Lock, 
  RefreshCw, 
  Code2, 
  Globe, 
  Clock, 
  Gem,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import ServiceCoreHero from '@/components/ui/ServiceCoreHero';
import { Card, CardContent } from '@/components/ui/card';
import farkVarData from '@/data/fark-var.json';
import PrivacyContact from '@/components/ui/privacy-contact';

// Icon mapping for premium categorization
const categoryIcons: Record<string, LucideIcon> = {
  "Platform Çekirdeği": ShieldCheck,
  "Operasyonel Güç": Workflow,
  "Ticari & Destek": Gem
};

const categoryColors: Record<string, string> = {
  "Platform Çekirdeği": "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
  "Operasyonel Güç": "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
  "Ticari & Destek": "text-(--color-accent-purple-light) bg-purple-500/10 border-purple-500/20"
};

// Categorize 44 items into 3 main pillars for better UX
const categories = [
  {
    title: "Platform Çekirdeği",
    description: "ITIL 4 uyumlu, esnek ve ölçeklenebilir altyapı mimarisi.",
    items: farkVarData.fark_yaratan_ozellikler.slice(0, 15)
  },
  {
    title: "Operasyonel Güç",
    description: "İş akışlarını hızlandıran, otomasyon odaklı derin yetenekler.",
    items: farkVarData.fark_yaratan_ozellikler.slice(15, 30)
  },
  {
    title: "Ticari & Destek",
    description: "Yerel destek, esnek lisanslama ve maliyet avantajları.",
    items: farkVarData.fark_yaratan_ozellikler.slice(30)
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
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

export default function FarkVarPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-base) text-white pb-0 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <ServiceCoreHero 
        title="Fark Yaratan Özellikler"
        highlightedWord="Fark Yaratan"
        subtitle="Rakiplerimizde bulunmayan, ServiceCore'a özel 44+ benzersiz yetenek ve kurumsal değer önerisi."
        badge="NEDEN SERVICECORE?"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-32 relative z-20">
        {categories.map((category, catIdx) => {
          const Icon = categoryIcons[category.title];
          const colorClass = categoryColors[category.title];

          return (
            <section key={category.title} className="mb-32">
              {/* Category Header */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
              >
                <div className="max-w-2xl">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{category.title}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    {category.title}
                  </h2>
                  <p className="text-lg text-(--color-text-secondary) font-light leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="hidden md:block h-px flex-grow bg-gradient-to-r from-white/10 to-transparent ml-12 mb-6" />
              </motion.div>

              {/* Items Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.items.map((item, index) => (
                  <motion.div key={item.baslik} variants={itemVariants}>
                    <Card className="group h-full bg-white/[0.03] border-white/5 backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/10 transition-all duration-500 overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-(--color-brand-primary)/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <CardContent className="p-8 relative z-10 flex flex-col h-full">
                        <div className="mb-6 flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-(--color-text-secondary) group-hover:text-(--color-brand-primary) group-hover:border-(--color-brand-primary)/30 transition-all duration-300">
                            <span className="text-xs font-bold">{(catIdx * 15) + index + 1}</span>
                          </div>
                          <Sparkles className="w-4 h-4 text-white/0 group-hover:text-(--color-brand-primary)/40 transition-colors duration-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-(--color-brand-accent) transition-colors duration-300 tracking-tight">
                          {item.baslik}
                        </h3>
                        <p className="text-(--color-text-secondary) group-hover:text-(--color-text-overline) leading-relaxed text-sm font-light">
                          {item.aciklama}
                        </p>
                        <div className="mt-auto pt-8 flex items-center gap-2 text-xs font-medium text-(--color-text-dim) group-hover:text-(--color-brand-primary) transition-colors duration-300">
                          <div className="w-1 h-1 rounded-full bg-current" />
                          <span>DETAYLI İNCELE</span>
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

      {/* GLOBAL CTA - CONTAINER DIŞINDA VE FULL-WIDTH */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20"
      >
        <PrivacyContact />
      </motion.div>
    </main>
  );
}
