"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  ArrowRight,
  CheckCircle2,
  Boxes,
  SlidersHorizontal,
  Share2,
  Wallet,
  FileSignature,
  History,
  Network,
  LayoutGrid,
  Activity,
  Cpu,
  Server,
  Monitor,
  Smartphone,
} from "lucide-react";
import data from "@/data/varlik-yonetimi.json";

export default function VarlikYonetimiPage() {
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
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-emerald-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner"
            >
              <Box size={14} />
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
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
              src="/images/varlik-modulu/panel.avif"
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
          {/* Feature 1: Yaşam Döngüsü */}
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
                    src="/images/varlik-modulu/panel.avif"
                    alt="Varlık yaşam döngüsü panosu"
                    width={1250}
                    height={707}
                    className="absolute inset-0 w-full h-full object-cover object-top-left group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Boxes size={32} />
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

          {/* Feature 2: Esnek Konfigürasyon */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col gap-3 p-8">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--color-text-muted) mb-2">
                    Varlık Türleri
                  </div>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {[
                      { icon: Server, label: "Sunucu", value: 124 },
                      { icon: Monitor, label: "İş İstasyonu", value: 312 },
                      { icon: Cpu, label: "Yazılım Lisansı", value: 87 },
                      { icon: Smartphone, label: "Mobil Cihaz", value: 56 },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="rounded-xl border border-white/10 bg-white/2 p-4 flex flex-col gap-3 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                              {item.value}
                            </span>
                          </div>
                          <div className="text-xs font-medium text-(--color-text-secondary)">
                            {item.label}
                          </div>
                          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-emerald-500/60 to-emerald-400/80"
                              style={{ width: `${30 + i * 18}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-medium text-(--color-text-muted) tracking-wide pt-2 border-t border-white/5">
                    <span>Özelleştirilebilir öznitelikler</span>
                    <span className="text-(--color-accent-emerald-light)">
                      24 alan tanımlı
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <SlidersHorizontal size={32} />
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

          {/* Feature 3: Native Entegrasyon */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex items-center justify-center p-8">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Center asset node */}
                    <div className="absolute z-20 w-24 h-24 rounded-2xl bg-linear-to-br from-purple-500/30 to-indigo-500/20 border border-purple-500/40 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.3)]">
                      <Box className="w-7 h-7 text-(--color-accent-purple-light) mb-1" />
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-white">
                        Varlık
                      </span>
                    </div>

                    {/* Connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 400 400"
                    >
                      {[
                        { x: 60, y: 60 },
                        { x: 340, y: 60 },
                        { x: 60, y: 340 },
                        { x: 340, y: 340 },
                      ].map((p, i) => (
                        <line
                          key={i}
                          x1={p.x}
                          y1={p.y}
                          x2={200}
                          y2={200}
                          stroke="url(#purpleGradient)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.5"
                        />
                      ))}
                      <defs>
                        <linearGradient
                          id="purpleGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Module nodes */}
                    {[
                      { label: "Olay", pos: "top-4 left-4", color: "blue" },
                      { label: "Problem", pos: "top-4 right-4", color: "emerald" },
                      { label: "Değişiklik", pos: "bottom-4 left-4", color: "cyan" },
                      { label: "Sözleşme", pos: "bottom-4 right-4", color: "orange" },
                    ].map((node, i) => (
                      <div
                        key={i}
                        className={`absolute ${node.pos} z-10 px-3 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur-xl flex items-center gap-2`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            node.color === "blue"
                              ? "bg-(--color-accent-blue-light)"
                              : node.color === "emerald"
                                ? "bg-(--color-accent-emerald-light)"
                                : node.color === "cyan"
                                  ? "bg-(--color-accent-cyan-light)"
                                  : "bg-(--color-accent-orange-light)"
                          }`}
                        />
                        <span className="text-xs font-semibold text-white">
                          {node.label}
                        </span>
                      </div>
                    ))}
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
            {/* Bento 1 - Finansal (wide, mock chart) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Wallet />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col justify-center gap-3 p-5">
                {[
                  { label: "Satın alma", pct: 80, value: "₺4.2M" },
                  { label: "Amortisman", pct: 55, value: "₺1.8M" },
                  { label: "Bakım", pct: 32, value: "₺640K" },
                  { label: "TCO", pct: 95, value: "₺6.6M" },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-medium text-(--color-text-secondary)">
                        {row.label}
                      </span>
                      <span className="font-mono font-semibold text-white">
                        {row.value}
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
              </div>
            </motion.div>

            {/* Bento 2 - Sözleşme (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <FileSignature />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) flex flex-col gap-2 p-4">
                {[
                  { name: "Lisans Sözleşmesi A", days: 12, status: "warn" },
                  { name: "Donanım Bakımı B", days: 87, status: "ok" },
                  { name: "Yazılım Aboneliği C", days: 3, status: "alert" },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/2 border border-white/5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileSignature className="w-3.5 h-3.5 text-(--color-accent-orange-light) shrink-0" />
                      <span className="text-[11px] font-medium text-white truncate">
                        {c.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold shrink-0 ml-2 ${
                        c.status === "alert"
                          ? "text-red-400"
                          : c.status === "warn"
                            ? "text-(--color-accent-orange-light)"
                            : "text-(--color-accent-emerald-light)"
                      }`}
                    >
                      {c.days}g
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - History (normal, mock timeline) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <History />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-3">
                {[
                  { date: "12 Nis", text: "Sahiplik transferi" },
                  { date: "08 Mar", text: "Lokasyon değişti" },
                  { date: "21 Şub", text: "Bakım kaydı eklendi" },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-2 h-2 rounded-full bg-(--color-accent-cyan-light) ring-2 ring-cyan-500/20" />
                      {i < 2 && (
                        <div className="w-px flex-1 mt-1 bg-linear-to-b from-cyan-500/40 to-cyan-500/0" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 pb-2">
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        {row.date}
                      </span>
                      <span className="text-xs font-medium text-white">
                        {row.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Bağımlılık (wide, mock network) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Network />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2.5 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8">
                  <Server className="w-3.5 h-3.5 text-(--color-accent-purple-light) shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    Üretim DB Sunucusu
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-3 h-px bg-purple-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Cpu className="w-3.5 h-3.5 text-(--color-accent-blue-light) shrink-0" />
                    <span className="text-[11px] font-medium text-white">
                      ERP Uygulaması
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                      bağımlı
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-3 h-px bg-purple-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Cpu className="w-3.5 h-3.5 text-(--color-accent-emerald-light) shrink-0" />
                    <span className="text-[11px] font-medium text-white">
                      Raporlama Servisi
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                      bağımlı
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-10">
                  <div className="w-3 h-px bg-emerald-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Monitor className="w-3.5 h-3.5 text-(--color-accent-cyan-light) shrink-0" />
                    <span className="text-[11px] font-medium text-white">
                      Self Servis Portal
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Konfigürasyon Kütüphanesi (normal, mock grid) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <LayoutGrid />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 grid grid-cols-3 gap-2">
                {[
                  { icon: Server, label: "Sunucu" },
                  { icon: Monitor, label: "PC" },
                  { icon: Smartphone, label: "Mobil" },
                  { icon: Cpu, label: "Lisans" },
                  { icon: Network, label: "Ağ" },
                  { icon: Box, label: "Diğer" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-lg bg-white/3 border border-white/8 flex flex-col items-center justify-center gap-1.5 p-2 hover:border-indigo-500/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-[9px] font-medium text-(--color-text-secondary)">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 - Proaktif Uyarı (normal, mock alerts) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Activity />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Garanti bitişi", count: 8, tone: "warn" },
                  { label: "Bakım periyodu", count: 14, tone: "ok" },
                  { label: "Sözleşme yenileme", count: 5, tone: "alert" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.tone === "alert"
                            ? "bg-red-400"
                            : row.tone === "warn"
                              ? "bg-(--color-accent-orange-light)"
                              : "bg-(--color-accent-emerald-light)"
                        }`}
                      />
                      <span className="text-[11px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-(--color-text-secondary)">
                      {row.count}
                    </span>
                  </div>
                ))}
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Box className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Varlık Yönetimi
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
                        Yaşam Döngüsü
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Native Entegrasyon
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        IT & Non-IT
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
