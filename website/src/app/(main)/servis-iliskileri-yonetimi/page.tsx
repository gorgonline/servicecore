"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  UserSquare2,
  FileSignature,
  Share2,
  LayoutDashboard,
  Bell,
  LineChart,
  ShieldCheck,
  Mail,
  Phone,
  CalendarDays,
  Briefcase,
  HeadphonesIcon,
  Crown,
} from "lucide-react";
import data from "@/data/servis-iliskileri-yonetimi.json";

export default function ServisIliskileriYonetimiPage() {
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
              <Users size={14} />
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
              src="/images/servis-iliskileri-modulu/musteri-liste.webp"
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
          {/* Feature 1: Kayıt Takibi */}
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
                    src="/images/servis-iliskileri-modulu/musteri-detay.webp"
                    alt="Müşteri kayıt detay panosu"
                    width={1250}
                    height={707}
                    className="absolute inset-0 w-full h-full object-cover object-top-left group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <UserSquare2 size={32} />
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

          {/* Feature 2: Sözleşme Yönetimi */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-white border border-white/5 shadow-2xl">
                  <Image
                    src="/images/servis-iliskileri-modulu/sozlesme.webp"
                    alt="Sözleşme yönetimi panosu"
                    width={1250}
                    height={707}
                    className="absolute inset-0 w-full h-full object-cover object-top-left group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <FileSignature size={32} />
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

          {/* Feature 3: Entegre Süreç (mock) */}
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
                  {/* Customer card */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                      Entegre Müşteri Görünümü
                    </span>
                    <span className="text-[10px] font-mono text-(--color-accent-purple-light)">
                      tek panel
                    </span>
                  </div>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/30">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-sm font-bold text-(--color-accent-purple-light)">
                      A
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm font-bold text-white">
                        Acme Holding A.Ş.
                      </span>
                      <span className="text-[10px] text-(--color-text-muted)">
                        Premium Müşteri · 3 sözleşme aktif
                      </span>
                    </div>
                  </div>

                  {/* Sozlesme */}
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <FileSignature className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[11px] font-semibold text-white">
                        Yıllık Bakım Sözleşmesi
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light)">
                      yenilemeye 47 gün
                    </span>
                  </div>

                  {/* Active records */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Olay", count: 3, tone: "blue" },
                      { label: "İstek", count: 12, tone: "cyan" },
                      { label: "Değişiklik", count: 1, tone: "orange" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-white/2 border border-white/5 p-2 flex flex-col gap-0.5"
                      >
                        <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                          {row.label}
                        </span>
                        <span
                          className={`text-xl font-bold tracking-tight ${
                            row.tone === "blue"
                              ? "text-(--color-accent-blue-light)"
                              : row.tone === "cyan"
                                ? "text-(--color-accent-cyan-light)"
                                : "text-(--color-accent-orange-light)"
                          }`}
                        >
                          {row.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Recent interactions */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                      Son Etkileşimler
                    </span>
                    {[
                      {
                        icon: Mail,
                        text: "Yenileme teklifi gönderildi",
                        time: "2g önce",
                      },
                      {
                        icon: Phone,
                        text: "Telefon görüşmesi — kapsam genişletme",
                        time: "5g önce",
                      },
                      {
                        icon: CalendarDays,
                        text: "Yıllık review toplantısı planlandı",
                        time: "1h önce",
                      },
                    ].map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/2 border border-white/5"
                        >
                          <Icon className="w-3 h-3 text-(--color-accent-purple-light)" />
                          <span className="text-[10px] font-medium text-white flex-1">
                            {row.text}
                          </span>
                          <span className="text-[9px] font-mono text-(--color-text-muted)">
                            {row.time}
                          </span>
                        </div>
                      );
                    })}
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
            {/* Bento 1 - Merkezi Yönetim (wide, mock unified) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <LayoutDashboard />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors flex flex-col gap-2 p-4 justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <UserSquare2 className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Müşteri
                    </span>
                    <span className="text-base font-bold text-white">218</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <FileSignature className="w-4 h-4 text-(--color-accent-emerald-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Sözleşme
                    </span>
                    <span className="text-base font-bold text-white">124</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Mail className="w-4 h-4 text-(--color-accent-cyan-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Etkileşim
                    </span>
                    <span className="text-base font-bold text-white">1.4K</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-3 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Share2 className="w-4 h-4 text-(--color-accent-purple-light)" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-(--color-text-muted)">
                      Talep
                    </span>
                    <span className="text-base font-bold text-white">372</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - Otomatik bildirim (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Bell />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { name: "Acme Yıllık Bakım", days: 12, tone: "warn" },
                  { name: "Beta Lisans", days: 87, tone: "ok" },
                  { name: "Gamma Destek", days: 3, tone: "alert" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Bell
                        className={`w-3.5 h-3.5 shrink-0 ${
                          row.tone === "alert"
                            ? "text-red-400"
                            : row.tone === "warn"
                              ? "text-(--color-accent-orange-light)"
                              : "text-(--color-accent-emerald-light)"
                        }`}
                      />
                      <span className="text-[10px] font-medium text-white truncate">
                        {row.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold shrink-0 ml-2 ${
                        row.tone === "alert"
                          ? "text-red-400"
                          : row.tone === "warn"
                            ? "text-(--color-accent-orange-light)"
                            : "text-(--color-accent-emerald-light)"
                      }`}
                    >
                      {row.days}g
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 3 - Raporlama (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <LineChart />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-end justify-between gap-2">
                {[55, 70, 45, 85, 62, 78, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-linear-to-t from-cyan-500/40 to-cyan-400/80 border border-cyan-500/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - Entegre talep akışı (wide) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <Share2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2.5 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/15 border border-purple-500/30">
                  <UserSquare2 className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                  <span className="text-[11px] font-semibold text-white">
                    Müşteri Kaydı
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-3 h-px bg-purple-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <FileSignature className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[11px] font-medium text-white">
                      Sözleşme & SLA
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                      kapsam
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-10">
                  <div className="w-3 h-px bg-emerald-500/40" />
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8 flex-1">
                    <Share2 className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                    <span className="text-[11px] font-medium text-white">
                      IT Talebi
                    </span>
                    <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">
                      otomatik bağ
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Kim için ideal (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Users />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { icon: Briefcase, label: "Satış & Pazarlama" },
                  { icon: HeadphonesIcon, label: "BT Destek Ekipleri" },
                  { icon: Crown, label: "İşletme Yöneticileri" },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/3 border border-white/5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-[11px] font-medium text-white">
                        {row.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bento 6 - Güçlü ilişkiler (normal) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Memnuniyet", value: "94%" },
                  { label: "Yenileme oranı", value: "88%" },
                  { label: "Hata payı", value: "−72%" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[11px] font-medium text-white">
                      {row.label}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-(--color-accent-emerald-light)">
                      {row.value}
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
                    <Users className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Servis İlişkileri Yönetimi
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
                        Merkezi Yönetim
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Sözleşme Otomasyonu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        IT Talep Entegrasyonu
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
