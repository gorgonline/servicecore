"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Code,
  ArrowRight,
  CheckCircle2,
  MousePointer2,
  RefreshCw,
  Share2,
  ClipboardList,
  BookOpen,
  Zap,
  Filter,
  GitBranch,
  Type,
  Hash,
  Calendar,
  ListChecks,
  Paperclip,
  ToggleRight,
  ChevronRight,
} from "lucide-react";
import data from "@/data/low-code-gelistirme.json";

export default function LowCodeGelistirmePage() {
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
              <Code size={14} />
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
              src="/images/low-code-modulu/form-tasarim.avif"
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
          {/* Feature 1: Tasarım araçları */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-white border border-white/5 shadow-2xl">
                  <Image
                    src="/images/low-code-modulu/form-tasarim.avif"
                    alt="Low Code form tasarım panosu"
                    width={1250}
                    height={707}
                    className="absolute inset-0 w-full h-full object-cover object-top-left group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <MousePointer2 size={32} />
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
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { icon: Type, label: "Metin" },
                  { icon: Hash, label: "Sayı" },
                  { icon: ListChecks, label: "Seçim" },
                  { icon: Calendar, label: "Tarih" },
                  { icon: Paperclip, label: "Dosya" },
                  { icon: ToggleRight, label: "Anahtar" },
                ].map((tag, i) => {
                  const Icon = tag.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light)"
                    >
                      <Icon className="w-3 h-3" />
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Gerçek zamanlı özelleştirme (mock taslak/yayın) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Form Versiyon Akışı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      anlık yayın
                    </span>
                  </div>

                  {[
                    {
                      v: "v1.0",
                      label: "İlk yayın",
                      date: "12 Mar",
                      status: "Yayında",
                      tone: "emerald",
                    },
                    {
                      v: "v1.1",
                      label: "Lokasyon alanı eklendi",
                      date: "21 Mar",
                      status: "Yayında",
                      tone: "emerald",
                    },
                    {
                      v: "v1.2",
                      label: "Aciliyet seçim listesi",
                      date: "08 Nis",
                      status: "Yayında",
                      tone: "emerald",
                    },
                    {
                      v: "v1.3",
                      label: "Maliyet alanı zorunlu",
                      date: "Bugün",
                      status: "Taslak",
                      tone: "orange",
                    },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                    >
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 w-12 text-center ${
                          row.tone === "emerald"
                            ? "bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)"
                            : "bg-orange-500/15 border border-orange-500/30 text-(--color-accent-orange-light)"
                        }`}
                      >
                        {row.v}
                      </span>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-white truncate">
                          {row.label}
                        </span>
                        <span className="text-[9px] text-(--color-text-muted)">
                          {row.date}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono shrink-0 ${
                          row.tone === "emerald"
                            ? "text-(--color-accent-emerald-light)"
                            : "text-(--color-accent-orange-light)"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}

                  <button className="mt-auto rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light) text-[10px] font-semibold py-2 cursor-pointer">
                    Yayınla
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <RefreshCw size={32} />
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

          {/* Feature 3: Entegrasyon (mock akış) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-8 gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Form Veri Akışı
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      REST API
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-linear-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/30">
                    <ClipboardList className="w-4 h-4 text-(--color-accent-purple-light)" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] font-bold text-white">
                        Memnuniyet Anketi
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        342 yanıt · Bugün
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-1">
                    <div className="w-px h-4 bg-purple-500/40" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "ServiceCore", color: "blue" },
                      { label: "CRM", color: "orange" },
                      { label: "BI", color: "emerald" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg border ${
                          row.color === "blue"
                            ? "bg-blue-500/10 border-blue-500/20"
                            : row.color === "orange"
                              ? "bg-orange-500/10 border-orange-500/20"
                              : "bg-emerald-500/10 border-emerald-500/20"
                        }`}
                      >
                        <Share2
                          className={`w-3.5 h-3.5 ${
                            row.color === "blue"
                              ? "text-(--color-accent-blue-light)"
                              : row.color === "orange"
                                ? "text-(--color-accent-orange-light)"
                                : "text-(--color-accent-emerald-light)"
                          }`}
                        />
                        <span className="text-[9px] font-semibold text-white">
                          {row.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Akan veri
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-purple-light)">
                      gerçek zamanlı
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Share2 size={32} />
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
            {/* Bento 1 - Veri toplama (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <ClipboardList />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                  Bugünkü Yanıtlar
                </span>
                {[
                  { form: "Memnuniyet Anketi", count: 342 },
                  { form: "Çalışan Geri Bildirimi", count: 86 },
                  { form: "Tedarikçi Değerlendirme", count: 24 },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-medium text-white">
                        {row.form}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-(--color-accent-blue-light)">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 - Onay / talep (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <CheckCircle2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-center justify-between gap-2">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-(--color-accent-orange-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Form
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-(--color-accent-emerald-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Onay
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-(--color-text-muted)" />
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-(--color-accent-cyan-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-(--color-text-secondary)">
                    Aksiyon
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - Eğitim & geri bildirim (normal, mock yıldız) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <BookOpen />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { q: "İçerik kalitesi", r: 5 },
                  { q: "Eğitmen", r: 4 },
                  { q: "Süre", r: 3 },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-white">
                      {row.q}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`w-1.5 h-1.5 rounded-full ${
                            s <= row.r
                              ? "bg-(--color-accent-cyan-light)"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Hızlı uygulama, esneklik, düşük maliyet (wide, mock kpi) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Zap />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 grid grid-cols-3 gap-2 content-center">
                {[
                  { label: "Form süresi", value: "−85%", tone: "purple" },
                  { label: "Maliyet", value: "−60%", tone: "emerald" },
                  { label: "Esneklik", value: "x10", tone: "blue" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg border ${
                      row.tone === "purple"
                        ? "bg-purple-500/10 border-purple-500/20"
                        : row.tone === "emerald"
                          ? "bg-emerald-500/10 border-emerald-500/20"
                          : "bg-blue-500/10 border-blue-500/20"
                    }`}
                  >
                    <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted) text-center">
                      {row.label}
                    </span>
                    <span
                      className={`text-base font-bold ${
                        row.tone === "purple"
                          ? "text-(--color-accent-purple-light)"
                          : row.tone === "emerald"
                            ? "text-(--color-accent-emerald-light)"
                            : "text-(--color-accent-blue-light)"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 5 - Koşullu görünürlük (normal, mock if/then) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Filter />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[9px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/15">
                    IF
                  </span>
                  <span className="text-[10px] text-white">tip = Donanım</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded bg-emerald-500/15">
                    SHOW
                  </span>
                  <span className="text-[10px] text-white">marka, model alanı</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-[9px] font-mono font-bold text-(--color-accent-orange-light) px-1.5 py-0.5 rounded bg-orange-500/15">
                    HIDE
                  </span>
                  <span className="text-[10px] text-white">lisans tipi</span>
                </div>
              </div>
            </motion.div>

            {/* Bento 6 - Yayın & versiyon (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <GitBranch />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[10px] font-mono font-bold text-white">
                      v1.3
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                    yayında
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5 opacity-70">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[10px] font-mono text-white">
                      v1.2
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">
                    arşiv
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5 opacity-70">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3 text-(--color-text-muted)" />
                    <span className="text-[10px] font-mono text-white">
                      v1.1
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">
                    arşiv
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
                    <Code className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Low Code Geliştirme
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
                        Sürükle-Bırak
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Anlık Yayın
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Düşük Maliyet
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
