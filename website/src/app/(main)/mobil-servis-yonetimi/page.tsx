"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Activity,
  Sparkles,
  MessageSquare,
  AlertCircle,
  GitBranch,
  LineChart,
  Bell,
  Link2,
  Wifi,
  Battery,
  Signal,
  Plus,
  Clock,
  Search,
  Users,
  Shield,
} from "lucide-react";
import data from "@/data/mobil-servis-yonetimi.json";

function PhoneFrame({
  children,
  glowTone = "blue",
}: {
  children: React.ReactNode;
  glowTone?: "blue" | "emerald" | "purple";
}) {
  const glowClass =
    glowTone === "blue"
      ? "from-blue-500/20"
      : glowTone === "emerald"
        ? "from-emerald-500/20"
        : "from-purple-500/20";
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-linear-to-br ${glowClass} via-transparent to-transparent blur-2xl pointer-events-none`}
      />
      <div className="relative h-full max-h-full aspect-9/19 rounded-[2.5rem] bg-(--color-surface-elevated-solid) border-[3px] border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="relative flex items-center justify-center pt-2 pb-1 bg-(--color-surface-base-dark)">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-black/80 border border-white/5" />
          <div className="flex items-center justify-between w-full px-6 text-[8px] font-mono text-(--color-text-secondary) pt-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="w-2.5 h-2.5" />
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3" />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
        {/* Home indicator */}
        <div className="flex justify-center pb-1.5 pt-1">
          <div className="w-20 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

export default function MobilServisYonetimiPage() {
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
              <Smartphone size={14} />
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

          {/* Hero phone mock */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-6 lg:p-12 shadow-2xl overflow-hidden w-full h-200 lg:h-225 flex items-stretch justify-center gap-8"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            <div className="absolute -inset-10 bg-blue-500/10 blur-[80px] pointer-events-none" />

            <div className="relative h-full hidden md:flex flex-col justify-center gap-3 max-w-xs">
              {[
                { label: "Açık olaylar", value: "12", tone: "blue" },
                { label: "Hizmet Seviyesi uyumu", value: "94%", tone: "emerald" },
                { label: "Bekleyen onay", value: "3", tone: "orange" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <span className="text-xs font-medium text-(--color-text-secondary)">
                    {row.label}
                  </span>
                  <span
                    className={`text-lg font-bold tracking-tight ${
                      row.tone === "blue"
                        ? "text-(--color-accent-blue-light)"
                        : row.tone === "emerald"
                          ? "text-(--color-accent-emerald-light)"
                          : "text-(--color-accent-orange-light)"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <PhoneFrame glowTone="blue">
              <div className="flex flex-col flex-1 px-3 pt-2 gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[8px] font-medium text-(--color-text-muted)">
                      Hoş geldin,
                    </div>
                    <div className="text-[11px] font-bold text-white">
                      Ayşe Demir
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-(--color-accent-blue-light)">
                      AD
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2 flex flex-col">
                    <span className="text-[7px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                      Olay
                    </span>
                    <span className="text-base font-bold text-(--color-accent-blue-light)">
                      12
                    </span>
                  </div>
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2 flex flex-col">
                    <span className="text-[7px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                      Talep
                    </span>
                    <span className="text-base font-bold text-(--color-accent-emerald-light)">
                      28
                    </span>
                  </div>
                </div>
                <div className="text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted) mt-1">
                  Bana atananlar
                </div>
                {[
                  { label: "VPN bağlanmıyor", time: "10dk" },
                  { label: "Outlook senkronizasyon", time: "1sa" },
                  { label: "Yazıcı kurulum", time: "3sa" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[9px] text-white truncate">
                      {row.label}
                    </span>
                    <span className="text-[8px] font-mono text-(--color-text-muted)">
                      {row.time}
                    </span>
                  </div>
                ))}
                <button className="mt-auto mb-1 rounded-lg bg-(--color-brand-primary) text-white text-[9px] font-semibold py-2 flex items-center justify-center gap-1 cursor-pointer">
                  <Plus className="w-2.5 h-2.5" />
                  Yeni talep
                </button>
              </div>
            </PhoneFrame>

            <div className="relative h-full hidden md:flex flex-col justify-center gap-3 max-w-xs">
              {[
                {
                  icon: Bell,
                  title: "Kritik olay",
                  desc: "Üretim DB yanıt vermiyor",
                  tone: "red",
                },
                {
                  icon: CheckCircle2,
                  title: "Onay alındı",
                  desc: "RFC #2412",
                  tone: "emerald",
                },
                {
                  icon: Clock,
                  title: "Hizmet Seviyesi uyarısı",
                  desc: "30dk kaldı",
                  tone: "orange",
                },
              ].map((row, i) => {
                const Icon = row.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        row.tone === "red"
                          ? "bg-red-500/15 border border-red-500/30 text-red-400"
                          : row.tone === "orange"
                            ? "bg-orange-500/15 border border-orange-500/30 text-(--color-accent-orange-light)"
                            : "bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-white truncate">
                        {row.title}
                      </span>
                      <span className="text-[9px] text-(--color-text-muted) truncate">
                        {row.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Tam mobilite */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-160 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid) border border-white/5 shadow-2xl flex items-center justify-center p-4">
                  <PhoneFrame glowTone="blue">
                    <div className="flex flex-col flex-1 px-3 pt-2 gap-2">
                      <div className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Saha Modu
                      </div>
                      <div className="rounded-lg bg-blue-500/15 border border-blue-500/30 p-2 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white">
                            #INC-2412
                          </span>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400">
                            Kritik
                          </span>
                        </div>
                        <span className="text-[9px] text-(--color-text-secondary)">
                          Ağ anahtarı yanıt vermiyor
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                        <span className="text-[9px] text-white">Saha varış kaydı</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                        <span className="text-[9px] text-white">Diagnostik tamam</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <Clock className="w-2.5 h-2.5 text-(--color-accent-orange-light)" />
                        <span className="text-[9px] text-white">Parça değişimi</span>
                      </div>
                      <button className="mt-auto mb-1 rounded-lg bg-emerald-500/20 text-(--color-accent-emerald-light) text-[9px] font-semibold py-1.5 flex items-center justify-center gap-1 cursor-pointer border border-emerald-500/30">
                        Çözüldü olarak işaretle
                      </button>
                    </div>
                  </PhoneFrame>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <Smartphone size={32} />
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
                  { icon: Shield, label: "ITIL 4 Uyumlu" },
                  { icon: Activity, label: "Olay" },
                  { icon: MessageSquare, label: "Talep" },
                  { icon: GitBranch, label: "Değişiklik" },
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

          {/* Feature 2: Gerçek zamanlı izleme */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-160 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid) border border-white/5 shadow-2xl flex items-center justify-center p-4">
                  <PhoneFrame glowTone="emerald">
                    <div className="flex flex-col flex-1 px-3 pt-2 gap-2">
                      <div className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Bildirimler
                      </div>
                      <div className="flex items-start gap-2 px-2 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                        <Bell className="w-3 h-3 text-red-400 mt-0.5 shrink-0 animate-pulse" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-white">
                            Hizmet Seviyesi ihlali yakın
                          </span>
                          <span className="text-[8px] text-(--color-text-muted)">
                            #INC-2401 · 12dk kaldı
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 px-2 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <AlertCircle className="w-3 h-3 text-(--color-accent-orange-light) mt-0.5 shrink-0" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-white">
                            Yeni kritik olay
                          </span>
                          <span className="text-[8px] text-(--color-text-muted)">
                            ERP servisi yavaş
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 px-2 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3 text-(--color-accent-emerald-light) mt-0.5 shrink-0" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-white">
                            Onay alındı
                          </span>
                          <span className="text-[8px] text-(--color-text-muted)">
                            RFC #2412
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 px-2 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Clock className="w-3 h-3 text-(--color-accent-blue-light) mt-0.5 shrink-0" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[9px] font-bold text-white">
                            Hatırlatma
                          </span>
                          <span className="text-[8px] text-(--color-text-muted)">
                            Bakım planı 17:00
                          </span>
                        </div>
                      </div>
                    </div>
                  </PhoneFrame>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Activity size={32} />
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

          {/* Feature 3: UX & entegrasyon */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-160 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid) border border-white/5 shadow-2xl flex items-center justify-center p-4">
                  <PhoneFrame glowTone="purple">
                    <div className="flex flex-col flex-1 px-3 pt-2 gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                        <span className="text-[8px] text-(--color-text-secondary)">
                          Ara…
                        </span>
                      </div>
                      <div className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        Hızlı Aksiyonlar
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { icon: Plus, label: "Talep Aç" },
                          { icon: AlertCircle, label: "Olay" },
                          { icon: GitBranch, label: "Değişiklik" },
                          { icon: Users, label: "Onay" },
                        ].map((row, i) => {
                          const Icon = row.icon;
                          return (
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white/3 border border-white/8 p-2"
                            >
                              <Icon className="w-3 h-3 text-(--color-accent-purple-light)" />
                              <span className="text-[8px] font-medium text-white">
                                {row.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) mt-1">
                        Bağlı Sistemler
                      </div>
                      {[
                        "Active Directory",
                        "MS Teams",
                        "Outlook",
                      ].map((row, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/3 border border-white/5"
                        >
                          <div className="flex items-center gap-1.5">
                            <Link2 className="w-2.5 h-2.5 text-(--color-accent-purple-light)" />
                            <span className="text-[9px] font-medium text-white">
                              {row}
                            </span>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light)" />
                        </div>
                      ))}
                    </div>
                  </PhoneFrame>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <Sparkles size={32} />
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
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]"
          >
            {/* Bento 1 - Talep yönetimi (wide, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <MessageSquare />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors p-4 flex flex-col gap-2 justify-center">
                {[
                  { id: "REQ-0871", title: "Yeni laptop talebi", status: "Açık", tone: "blue" },
                  { id: "REQ-0870", title: "VPN erişimi", status: "İşlemde", tone: "orange" },
                  { id: "REQ-0869", title: "Mail kotası", status: "Kapalı", tone: "emerald" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/3 border border-white/8"
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-(--color-text-muted)">
                        {row.id}
                      </span>
                      <span className="text-[11px] font-semibold text-white">
                        {row.title}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                        row.tone === "blue"
                          ? "bg-blue-500/10 border-blue-500/20 text-(--color-accent-blue-light)"
                          : row.tone === "orange"
                            ? "bg-orange-500/10 border-orange-500/20 text-(--color-accent-orange-light)"
                            : "bg-emerald-500/10 border-emerald-500/20 text-(--color-accent-emerald-light)"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 2 - Olay yönetimi (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <AlertCircle />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-white flex-1">
                    Üretim DB yanıt vermiyor
                  </span>
                  <span className="text-[9px] font-mono text-red-400">P1</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <AlertCircle className="w-3.5 h-3.5 text-(--color-accent-orange-light)" />
                  <span className="text-[10px] font-semibold text-white flex-1">
                    Mail servisi yavaş
                  </span>
                  <span className="text-[9px] font-mono text-(--color-accent-orange-light)">
                    P2
                  </span>
                </div>
                <button className="mt-2 rounded-lg bg-(--color-brand-primary) text-white text-[10px] font-semibold py-2 cursor-pointer">
                  Tek tıkla devral
                </button>
              </div>
            </motion.div>

            {/* Bento 3 - Değişiklik (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <GitBranch />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-(--color-text-muted)">
                      RFC-2412
                    </span>
                    <span className="text-[11px] font-semibold text-white">
                      Patch uygulama
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-(--color-accent-orange-light)">
                    Onay bekliyor
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light) text-[10px] font-semibold py-2 cursor-pointer">
                    Onayla
                  </button>
                  <button className="flex-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-semibold py-2 cursor-pointer">
                    Reddet
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Bento 4 - Performans (wide, mock dashboard) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-purple-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6">
                  <LineChart />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-4 flex flex-col gap-3 justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                      Hizmet Seviyesi Uyumu
                    </span>
                    <span className="text-lg font-bold text-(--color-accent-purple-light)">
                      94%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-(--color-text-muted)">
                      Çözüm Hızı
                    </span>
                    <span className="text-lg font-bold text-(--color-accent-emerald-light)">
                      2.4sa
                    </span>
                  </div>
                </div>
                <svg viewBox="0 0 200 40" className="w-full h-10">
                  <defs>
                    <linearGradient
                      id="mobLine"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#mobLine)"
                    strokeWidth="2"
                    points="0,30 30,22 60,26 90,14 120,18 150,8 180,12 200,6"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Bento 5 - Bildirim (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <Bell />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Push", desc: "Anlık", on: true },
                  { label: "E-posta", desc: "Özet", on: true },
                  { label: "Uygulama içi", desc: "Tüm", on: true },
                  { label: "SMS", desc: "Sadece kritik", on: false },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium text-white">
                        {row.label}
                      </span>
                      <span className="text-[9px] text-(--color-text-muted)">
                        {row.desc}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-3.5 rounded-full ${
                        row.on
                          ? "bg-indigo-500/40 border border-indigo-500/60"
                          : "bg-white/5 border border-white/10"
                      } relative`}
                    >
                      <div
                        className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${
                          row.on ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Entegrasyon (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Link2 />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  "Active Directory",
                  "MS Teams",
                  "Outlook & Exchange",
                  "Slack",
                  "ServiceCore Web",
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <Link2 className="w-3 h-3 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-medium text-white">
                        {row}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light)" />
                      <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                        bağlı
                      </span>
                    </div>
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
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Smartphone className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Mobil Servis Yönetimi
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
                        ITIL 4 Uyumlu
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Tam Mobilite
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Anlık Bildirim
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
