"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Share2,
  Clock,
  Layers,
  FilePlus2,
  ListOrdered,
  CalendarClock,
  Target,
  AlertCircle,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import data from "@/data/servis-seviye-yonetimi.json";

export default function ServisSeviyeYonetimiPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30 text-(--color-text-overline)">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Activity size={14} />
              {data.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              {data.hero.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                {data.hero.titleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-3xl"
            >
              {data.hero.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full max-h-125"
          >
            <Image
              src="/images/servis-seviye-modulu/sla-policy.webp"
              alt={data.hero.imageAlt}
              width={1250}
              height={707}
              className="block w-full h-auto rounded-2xl group-hover:scale-[1.01] transition-transform duration-700"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: SLA Policy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-white border border-white/5 shadow-2xl">
                  <Image
                    src="/images/servis-seviye-modulu/sla-policy.webp"
                    alt="SLA Policy yönetim panosu"
                    width={1250}
                    height={707}
                    className="absolute inset-0 w-full h-full object-cover object-top-left group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Gauge size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[0].titleLead}
                <br />
                <span className="text-(--color-accent-blue-light)">
                  {data.zigzag[0].titleAccent}
                </span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[0].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[0].bullets.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(--color-text-overline)"
                  >
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-blue-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 2: Incident & Request Entegrasyonu (mock) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  {/* SLM center node */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      SLA Policy Eşleşmesi
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      otomatik
                    </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-3 rounded-xl bg-linear-to-r from-emerald-500/15 to-cyan-500/10 border border-emerald-500/30 mb-2">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-(--color-accent-emerald-light)" />
                      <span className="text-sm font-bold text-white">
                        SLM Modülü
                      </span>
                    </div>
                  </div>

                  {/* Incident integration */}
                  <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-white/2 border border-white/8">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-(--color-accent-blue-light)" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white">
                          Olay #INC-2412
                        </span>
                        <span className="text-[9px] font-mono text-(--color-accent-blue-light)">
                          Yüksek
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-(--color-text-muted)">
                          SLA Policy → Premium-P1
                        </span>
                        <span className="font-mono text-white">2sa kaldı</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-3/4 bg-linear-to-r from-blue-500/70 to-cyan-400/80" />
                      </div>
                    </div>
                  </div>

                  {/* Request integration */}
                  <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-white/2 border border-white/8">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                      <MousePointerClick className="w-4 h-4 text-(--color-accent-emerald-light)" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-white">
                          İstek #REQ-0871
                        </span>
                        <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                          Standart
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-(--color-text-muted)">
                          SLA Policy → Standart-P3
                        </span>
                        <span className="font-mono text-white">
                          1 gün 4sa kaldı
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-2/5 bg-linear-to-r from-emerald-500/70 to-cyan-400/80" />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Önceliklendirme
                    </span>
                    <span className="text-[10px] font-semibold text-(--color-accent-emerald-light)">
                      kural bazlı, otomatik
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Share2 size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[1].titleLead}
                <br />
                <span className="text-(--color-accent-emerald-light)">
                  {data.zigzag[1].titleAccent}
                </span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[1].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[1].bullets.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(--color-text-overline)"
                  >
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-emerald-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3: Due Date Otomasyonu (mock calendar) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Due Date Hesaplaması
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      auto
                    </span>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                        Açılış
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        Cum 17:42
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                        SLA Hedefi
                      </span>
                      <span className="text-xs font-mono font-bold text-(--color-accent-blue-light)">
                        8 saat
                      </span>
                    </div>
                  </div>

                  {/* Calculation parameters */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                      <CalendarClock className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        Çalışma saati
                      </span>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        09:00 — 18:00
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                      <CalendarClock className="w-3.5 h-3.5 text-(--color-accent-orange-light)" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        Hafta sonu
                      </span>
                      <span className="text-[10px] font-mono text-(--color-accent-orange-light)">
                        sayaç dur
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/2 border border-white/5">
                      <CalendarClock className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-[10px] font-medium text-white flex-1">
                        Resmi tatil (1 Mayıs)
                      </span>
                      <span className="text-[10px] font-mono text-red-400">
                        sayaç dur
                      </span>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex items-center justify-between mt-auto px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/20 to-indigo-500/15 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                        Due Date
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">
                      Salı 14:42
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Clock size={32} />
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {data.zigzag[2].titleLead}
                <br />
                <span className="text-(--color-accent-purple-light)">
                  {data.zigzag[2].titleAccent}
                </span>
              </h2>
              <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                {data.zigzag[2].description}
              </p>
              <ul className="space-y-4">
                {data.zigzag[2].bullets.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-(--color-text-overline)"
                  >
                    <CheckCircle2 className="w-5 h-5 text-(--color-accent-purple-light) shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BENTO GRID */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.bento.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.bento.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          >
            {/* Bento 1 - Multi-Level SLA (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Layers />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                {[
                  { level: "Yanıt Süresi", target: "30dk", pct: 95 },
                  { level: "Ara Hedef", target: "2sa", pct: 70 },
                  { level: "Çözüm Süresi", target: "8sa", pct: 40 },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-medium text-(--color-text-secondary)">
                        {row.level}
                      </span>
                      <span className="font-mono font-semibold text-white">
                        {row.target}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-blue-500/70 to-cyan-400/80 rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                    Aynı kayıt
                  </span>
                  <span className="text-[10px] font-mono font-bold text-white">
                    3 paralel hedef
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Kolay SLA Girişi (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <FilePlus2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium text-(--color-text-muted)">
                    Servis
                  </span>
                  <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[11px] text-white">
                    E-posta Sistemi
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Yanıt
                    </span>
                    <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] font-mono font-bold text-(--color-accent-orange-light)">
                      30 dk
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Çözüm
                    </span>
                    <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] font-mono font-bold text-(--color-accent-orange-light)">
                      4 sa
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Kural Bazlı Öncelik (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <ListOrdered />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { p: "P1", label: "Kritik", color: "red" },
                  { p: "P2", label: "Yüksek", color: "orange" },
                  { p: "P3", label: "Orta", color: "cyan" },
                  { p: "P4", label: "Düşük", color: "emerald" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          row.color === "red"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : row.color === "orange"
                              ? "bg-orange-500/15 text-(--color-accent-orange-light) border border-orange-500/30"
                              : row.color === "cyan"
                                ? "bg-cyan-500/15 text-(--color-accent-cyan-light) border border-cyan-500/30"
                                : "bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30"
                        }`}
                      >
                        {row.p}
                      </span>
                      <span className="text-[11px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      kural #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Çalışma Takvimi (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <CalendarClock />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-1.5 justify-center">
                <div className="grid grid-cols-7 gap-1.5">
                  {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(
                    (d, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted) text-center"
                      >
                        {d}
                      </span>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[
                    { active: true },
                    { active: true },
                    { active: true, holiday: true },
                    { active: true },
                    { active: true },
                    { active: false },
                    { active: false },
                  ].map((cell, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg border flex items-center justify-center text-[10px] font-mono ${
                        cell.holiday
                          ? "bg-red-500/15 border-red-500/30 text-red-400"
                          : cell.active
                            ? "bg-purple-500/15 border-purple-500/30 text-white"
                            : "bg-white/2 border-white/5 text-(--color-text-muted)"
                      }`}
                    >
                      {cell.holiday ? "T" : cell.active ? "✓" : "—"}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5 text-[9px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-purple-500/30 border border-purple-500/40" />
                    <span className="text-(--color-text-secondary)">Mesai</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-red-500/30 border border-red-500/40" />
                    <span className="text-(--color-text-secondary)">Tatil</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-white/5 border border-white/10" />
                    <span className="text-(--color-text-secondary)">
                      Hafta sonu
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Servis Kalite Metrikleri (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Target />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[11px] font-medium text-white">
                      SLA uyumu
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-(--color-accent-emerald-light)">
                    %94
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-(--color-accent-orange-light)" />
                    <span className="text-[11px] font-medium text-white">
                      İhlal sayısı
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-(--color-accent-orange-light)">
                    8
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Eskalasyon
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-(--color-accent-cyan-light)">
                    3
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 6 - Otomatik Due Date (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Clock />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[10px] font-medium text-(--color-text-muted)">
                    Açılış
                  </span>
                  <span className="text-[11px] font-mono text-white">
                    Pzt 10:15
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-[10px] font-medium text-(--color-text-muted)">
                    SLA
                  </span>
                  <span className="text-[11px] font-mono text-white">4 sa</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-(--color-accent-emerald-light)">
                    Due Date
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white">
                    Pzt 14:15
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="font-medium text-(--color-text-muted)">
                    Otomatik yazıldı
                  </span>
                  <span className="font-mono text-(--color-accent-emerald-light)">
                    ✓
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Activity className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis Seviye Yönetimi
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {data.cta.title}
                  </h2>

                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
                    {data.cta.description}
                  </p>

                  <div className="flex flex-col items-center gap-8">
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

                    <div className="flex flex-wrap justify-center gap-8 text-(--color-text-muted)">
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        Multi-Level SLA
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Otomatik Önceliklendirme
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Takvim Hassas Due Date
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
