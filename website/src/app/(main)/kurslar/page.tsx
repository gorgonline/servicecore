"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Sparkles,
  GraduationCap,
  Users,
  Trophy,
  ArrowRight,
  Calendar,
  MonitorCheck,
  ShieldCheck,
  MessagesSquare,
  Zap,
  Search,
  MousePointerClick,
  BookOpen,
  RefreshCw,
  Box,
  Settings,
  TrendingUp,
  LineChart,
  Layout,
  Activity,
  Handshake,
  Briefcase
} from "lucide-react";
import ServiceCoreHero from "@/components/ui/ServiceCoreHero";
import kurslarData from "@/data/kurslar.json";

const iconMap: Record<string, React.ElementType> = {
  MessagesSquare,
  Zap,
  Search,
  MousePointerClick,
  BookOpen,
  RefreshCw,
  Box,
  Settings,
  TrendingUp,
  LineChart,
  Layout,
  Activity,
  Handshake,
  Users,
  Briefcase,
  ShieldCheck
};

interface KursModule {
  title: string;
  description: string;
  icon: string;
}

export default function KurslarPage() {
  const { kurslar } = kurslarData;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) text-white selection:bg-blue-500/30">
      
      {/* HERO SECTION */}
      <ServiceCoreHero 
        title={kurslar.hero.title}
        highlightedWord={kurslar.hero.highlighted}
        subtitle={kurslar.hero.subtitle}
        badge={kurslar.hero.badge}
      />

      {/* Hero Details (Modernized Features) */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-1 p-1 rounded-[2.5rem] bg-white/2 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Duration */}
          <div className="p-8 md:p-10 flex flex-col items-center text-center group hover:bg-white/[0.03] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-(--color-accent-blue-light) mb-6 group-hover:scale-110 group-hover:bg-(--color-accent-blue-base) group-hover:text-white transition-all duration-500">
              <Calendar size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">1 Yıl Süre</h4>
            <p className="text-(--color-text-secondary) text-sm font-light leading-relaxed">
              Düzenli periyotlarla açılan kapsamlı uzmanlık programı.
            </p>
          </div>

          {/* Training Method */}
          <div className="p-8 md:p-10 flex flex-col items-center text-center group hover:bg-white/[0.03] transition-colors border-y md:border-y-0 md:border-x border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-(--color-accent-purple-light) mb-6 group-hover:scale-110 group-hover:bg-(--color-accent-purple-base) group-hover:text-white transition-all duration-500">
              <Users size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">Hibrit Eğitim</h4>
            <p className="text-(--color-text-secondary) text-sm font-light leading-relaxed">
              Online canlı ve fiziksel sınıf seçenekleriyle esnek katılım.
            </p>
          </div>

          {/* Exam System */}
          <div className="p-8 md:p-10 flex flex-col items-center text-center group hover:bg-white/[0.03] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-(--color-accent-emerald-light) mb-6 group-hover:scale-110 group-hover:bg-(--color-accent-emerald-base) group-hover:text-white transition-all duration-500">
              <MonitorCheck size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">Dijital Sınav</h4>
            <p className="text-(--color-text-secondary) text-sm font-light leading-relaxed">
              Online sınav sistemimiz üzerinden uzaktan test metodları.
            </p>
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* MODULES GRID */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              {kurslar.programs_title}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {kurslar.programs_description}
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {kurslar.modules.map((module: KursModule, idx: number) => {
              const Icon = iconMap[module.icon] || ShieldCheck;
              
              return (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  className="group relative p-8 rounded-3xl bg-white/2 border border-white/5 hover:border-blue-500/30 hover:bg-white/4 transition-all duration-500 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-(--color-accent-blue-light) group-hover:scale-110 group-hover:bg-(--color-accent-blue-base) group-hover:text-white transition-all duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-(--color-accent-blue-light) transition-colors">
                      {module.title}
                    </h3>
                  </div>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed group-hover:text-(--color-text-overline) transition-colors">
                    {module.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* PARTICIPATION INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-[10px] font-black uppercase tracking-widest mb-6">
                <Trophy size={14} />
                Katılım Koşulları
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8">
                {kurslar.participation_info.title}
              </h2>
              
              <div className="space-y-6">
                {kurslar.participation_info.items.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform" />
                    <span className="text-(--color-text-overline) font-light leading-relaxed group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Info */}
            <div className="p-10 rounded-[2.5rem] bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-(--color-surface-elevated-solid) border border-white/10 flex items-center justify-center text-(--color-accent-blue-light) shadow-2xl">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Destek Hattı</h4>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:info@servicecore.app" className="text-(--color-text-secondary) hover:text-(--color-accent-blue-light) transition-colors flex items-center gap-2 text-sm font-medium">
                      <Mail size={14} /> info@servicecore.app
                    </a>
                    <a href="tel:444CORE" className="text-(--color-text-secondary) hover:text-(--color-accent-blue-light) transition-colors flex items-center gap-2 text-sm font-medium">
                      <Phone size={14} /> 444 CORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* REGISTRATION FORM */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sticky top-32"
          >
            <div className="relative p-10 rounded-[2.5rem] bg-(--color-surface-elevated-solid)/80 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all duration-700" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Sparkles size={20} className="text-(--color-accent-blue-light)" />
                  {kurslar.form_title}
                </h3>

                <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">{kurslar.form_fields.name}</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">{kurslar.form_fields.surname}</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">{kurslar.form_fields.company}</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">{kurslar.form_fields.title}</label>
                      <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">{kurslar.form_fields.email}</label>
                    <input type="email" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-(--color-text-muted) ml-4">{kurslar.form_fields.phone}</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all font-medium" />
                  </div>

                  <button className="w-full py-5 rounded-2xl bg-(--color-accent-blue-base) hover:bg-blue-600 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group/btn transition-all mt-4">
                    <span>Gönder</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* FOOTER DECORATION */}
      <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
