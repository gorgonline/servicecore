"use client";

import { motion, Variants } from "framer-motion";
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
  Settings,
  UserCircle,
  Factory,
  MapPin,
  ToggleRight,
  Building2,
  Tags,
  Truck,
  ScrollText,
  GitBranch,
  Key,
  Users,
  Headphones,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  HardDrive,
  Database,
} from "lucide-react";
import data from "@/data/varlik-yonetimi.json";
import { En } from "@/components/ui/En";

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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-6 lg:p-10 shadow-2xl overflow-hidden group w-full"
          >
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 pb-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Boxes className="w-5 h-5 text-(--color-accent-blue-light)" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Varlık & Konfigürasyon Yönetimi · CMDB
                  </span>
                  <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                    Tüm Varlıklar · IT + non-IT
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-(--color-text-muted)">342 CI · 9 yapı taşı</span>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                </div>
              </div>
            </div>

            {/* KPI metric row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
              {[
                { icon: Server, label: "Donanım", value: "186", trend: "+8", tone: "blue" },
                { icon: Cpu, label: "Yazılım & Lisans", value: "124", trend: "+12", tone: "purple" },
                { icon: Headphones, label: "Aksesuar", value: "32", trend: "+4", tone: "cyan" },
                { icon: Wallet, label: "TCO Bu Yıl", value: "1.2M₺", trend: "−4%", tone: "amber" },
              ].map((m, i) => {
                const Icon = m.icon;
                const t: Record<string, string> = {
                  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                  cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25 text-(--color-accent-cyan-light) shadow-[0_0_25px_rgba(6,182,212,0.12)]",
                  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
                };
                return (
                  <div key={i} className={`rounded-2xl bg-linear-to-br ${t[m.tone]} border p-3 lg:p-4 flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4" />
                      <span className="text-[9px] font-mono font-semibold text-(--color-accent-emerald-light)">{m.trend}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                      <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{m.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Asset table + lifecycle stages */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-4 mb-5">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/8">
                <div className="flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Varlık Listesi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Search className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">5 / 342</span>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-2 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) bg-white/2 border border-white/5 rounded-md">
                <span className="w-3.5">Tip</span>
                <span>Varlık</span>
                <span>Sahip</span>
                <span>Konum</span>
                <span>Durum</span>
                <span>TCO</span>
              </div>
              <div className="flex flex-col gap-1.5 mt-1.5">
                {[
                  { icon: Server, name: "DB-PROD-04", owner: "BT Altyapı", location: "DC-1", status: "aktif", tco: "180k₺", statusTone: "emerald" },
                  { icon: Cpu, name: "Microsoft 365 E5", owner: "Tüm BT", location: "Cloud", status: "aktif", tco: "240k₺", statusTone: "emerald" },
                  { icon: Smartphone, name: "MacBook Pro M3", owner: "Ahmet Y.", location: "İstanbul HQ", status: "kullanımda", tco: "85k₺", statusTone: "emerald" },
                  { icon: HardDrive, name: "Storage Cluster", owner: "BT Altyapı", location: "DC-1", status: "bakım", tco: "320k₺", statusTone: "amber" },
                  { icon: Monitor, name: "Dell U2723", owner: "Selin K.", location: "Ankara Şb", status: "yeni", tco: "12k₺", statusTone: "blue" },
                ].map((r, i) => {
                  const Icon = r.icon;
                  const sT: Record<string, string> = {
                    emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                    blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                  };
                  return (
                    <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-2 items-center px-3 py-2 rounded-lg bg-white/2 border border-white/5 hover:bg-white/4 transition-colors">
                      <Icon className="w-3 h-3 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-medium text-white truncate">{r.name}</span>
                      <span className="text-[9px] text-(--color-text-secondary) hidden sm:block">{r.owner}</span>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">{r.location}</span>
                      <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${sT[r.statusTone]}`}>{r.status}</span>
                      <span className="text-[9px] font-mono font-semibold text-amber-300">{r.tco}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lifecycle horizontal flow */}
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center justify-between gap-2">
              {[
                { label: "Tedarik", icon: Truck },
                { label: "Devreye Alma", icon: Activity },
                { label: "Kullanım", icon: UserCircle },
                { label: "Bakım", icon: Settings },
                { label: "Emeklilik", icon: History },
              ].map((s, i, arr) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-1.5 flex-1 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-3 h-3 text-(--color-accent-blue-light)" />
                    </div>
                    <span className="text-[9px] font-semibold text-white truncate">{s.label}</span>
                    {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted) ml-auto shrink-0" />}
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Yaşam Döngüsü */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                        <Server className="w-4 h-4 text-(--color-accent-blue-light)" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Varlık Detayı · Donanım</span>
                        <span className="text-[12px] font-bold text-white">DB-PROD-04</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
                      AKTİF · DC-1
                    </span>
                  </div>

                  {/* Properties grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Üretici", value: "Dell PowerEdge R750" },
                      { label: "Sahip", value: "BT Altyapı" },
                      { label: "Konum", value: "İstanbul DC-1 / Rack 04" },
                      { label: "Garanti", value: "12 Ara 2027" },
                    ].map((p, i) => (
                      <div key={i} className="rounded-md bg-white/3 border border-white/8 p-2 flex flex-col gap-0.5">
                        <span className="text-[7px] font-mono uppercase tracking-wider text-(--color-text-muted)">{p.label}</span>
                        <span className="text-[10px] font-medium text-white truncate">{p.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lifecycle progress */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Yaşam Döngüsü Aşaması</span>
                    <div className="grid grid-cols-5 gap-1">
                      {[
                        { label: "Tedarik", done: true },
                        { label: "Devreye Alım", done: true },
                        { label: "Kullanım", done: true, active: true },
                        { label: "Bakım", done: false },
                        { label: "Emeklilik", done: false },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className={`flex flex-col items-center gap-1 px-1 py-1.5 rounded-md border ${
                            s.active
                              ? "bg-emerald-500/15 border-emerald-500/35 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                              : s.done
                                ? "bg-blue-500/10 border-blue-500/25"
                                : "bg-white/2 border-white/8 opacity-50"
                          }`}
                        >
                          {s.done ? (
                            <CheckCircle2 className={`w-3 h-3 ${s.active ? "text-(--color-accent-emerald-light)" : "text-(--color-accent-blue-light)"}`} />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-white/15" />
                          )}
                          <span className="text-[7px] font-medium text-white text-center leading-tight">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Linked services */}
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-text-muted)">Bağlı Hizmetler & İlişkiler</span>
                    {[
                      { icon: Activity, label: "ERP Servisi", rel: "depends-on", tone: "blue" },
                      { icon: Database, label: "Veri Ambarı", rel: "feeds", tone: "purple" },
                      { icon: Network, label: "API Gateway", rel: "uses", tone: "cyan" },
                      { icon: AlertCircle, label: "INC-2412 (açık olay)", rel: "linked", tone: "amber" },
                    ].map((l, i) => {
                      const Icon = l.icon;
                      const tone: Record<string, string> = {
                        blue: "text-(--color-accent-blue-light)",
                        purple: "text-(--color-accent-purple-light)",
                        cyan: "text-(--color-accent-cyan-light)",
                        amber: "text-amber-300",
                      };
                      return (
                        <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-2 items-center px-2 py-1.5 rounded-md bg-white/2 border border-white/5">
                          <Icon className={`w-2.5 h-2.5 ${tone[l.tone]}`} />
                          <span className="text-[10px] font-medium text-white truncate">{l.label}</span>
                          <span className={`text-[7px] font-mono font-bold uppercase ${tone[l.tone]}`}>{l.rel}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Financial summary */}
                  <div className="grid grid-cols-3 gap-1.5 mt-auto pt-2 border-t border-white/8">
                    <div className="flex flex-col gap-0.5 px-2 py-1.5 rounded-md bg-amber-500/8 border border-amber-500/20">
                      <span className="text-[7px] font-mono text-(--color-text-muted)">Satın Alma</span>
                      <span className="text-[10px] font-mono font-bold text-amber-300">120k₺</span>
                    </div>
                    <div className="flex flex-col gap-0.5 px-2 py-1.5 rounded-md bg-amber-500/8 border border-amber-500/20">
                      <span className="text-[7px] font-mono text-(--color-text-muted)">Bakım/yıl</span>
                      <span className="text-[10px] font-mono font-bold text-amber-300">18k₺</span>
                    </div>
                    <div className="flex flex-col gap-0.5 px-2 py-1.5 rounded-md bg-amber-500/12 border border-amber-500/25">
                      <span className="text-[7px] font-mono text-(--color-text-muted)">TCO</span>
                      <span className="text-[10px] font-mono font-bold text-amber-300">180k₺</span>
                    </div>
                  </div>
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
            animate="visible"
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
            animate="visible"
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
            animate="visible"
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

      {/* 3.5 PERSPECTIVES — Yönetici + Kullanıcı */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150 bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Users className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                {data.perspectives.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.perspectives.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                {data.perspectives.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.perspectives.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
          >
            {data.perspectives.groups.map((g) => {
              const groupIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Settings, UserCircle,
              };
              const GIcon = groupIconMap[g.icon] || Settings;
              const t: Record<string, { card: string; icon: string; chip: string; itemBg: string }> = {
                blue: {
                  card: "from-blue-500/12 to-blue-500/3 border-blue-500/25 shadow-[0_0_25px_rgba(59,130,246,0.1)]",
                  icon: "bg-blue-500/20 border-blue-500/35 text-(--color-accent-blue-light)",
                  chip: "bg-blue-500/15 border-blue-500/30 text-(--color-accent-blue-light)",
                  itemBg: "hover:bg-blue-500/8",
                },
                purple: {
                  card: "from-purple-500/12 to-purple-500/3 border-purple-500/25 shadow-[0_0_25px_rgba(168,85,247,0.1)]",
                  icon: "bg-purple-500/20 border-purple-500/35 text-(--color-accent-purple-light)",
                  chip: "bg-purple-500/15 border-purple-500/30 text-(--color-accent-purple-light)",
                  itemBg: "hover:bg-purple-500/8",
                },
              };
              const tone = t[g.tone];
              return (
                <motion.div
                  key={g.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${tone.card} border p-6 lg:p-7 flex flex-col gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${tone.icon}`}>
                      <GIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight">{g.title}</h3>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${tone.chip}`}>
                          {g.items.length}
                        </span>
                      </div>
                      <span className="text-[11px] text-(--color-text-muted) font-light">{g.subtitle}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {g.items.map((item, j) => {
                      const itemIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                        Factory, LayoutGrid, MapPin, ToggleRight, Building2, Network, FileSignature, Tags, Truck,
                        Boxes, ScrollText, Server, GitBranch, Key, Users, Headphones, History,
                      };
                      const Icon = itemIconMap[item.icon] || CheckCircle2;
                      return (
                        <div
                          key={j}
                          className={`flex items-start gap-2.5 px-3 py-2 rounded-lg bg-white/2 border border-white/5 transition-colors ${tone.itemBg}`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${g.tone === "blue" ? "text-(--color-accent-blue-light)" : "text-(--color-accent-purple-light)"}`} />
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-[11px] font-semibold text-white">{item.title}</span>
                            <span className="text-[10px] text-(--color-text-muted) font-light">{item.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.6 STRATEGIC VALUE */}
      <section className="py-24 relative z-20 overflow-hidden border-y border-white/5 bg-(--color-surface-base-dark)">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Network className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-emerald-light)">
                {data.strategic.badge}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.strategic.titleLead}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                {data.strategic.titleAccent}
              </span>
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.strategic.description}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {data.strategic.items.map((s) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Network, AlertCircle, FileSignature, Wallet,
              };
              const Icon = iconMap[s.icon] || Network;
              const t: Record<string, string> = {
                blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25 text-(--color-accent-blue-light) shadow-[0_0_25px_rgba(59,130,246,0.12)]",
                purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25 text-(--color-accent-purple-light) shadow-[0_0_25px_rgba(168,85,247,0.12)]",
                emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25 text-(--color-accent-emerald-light) shadow-[0_0_25px_rgba(16,185,129,0.12)]",
                amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]",
              };
              return (
                <motion.div
                  key={s.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${t[s.tone]} border p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">{s.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.7 FAQ */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-4xl">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Boxes className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Varlık Bilgi Bankası
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.faq.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.faq.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            animate="visible"
            className="flex flex-col gap-3"
          >
            {data.faq.items.map((item, i) => {
              const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
                Boxes, Settings, UserCircle, Filter, Network,
              };
              const Icon = iconMap[item.icon] || Boxes;
              return (
                <motion.details
                  key={item.id}
                  variants={fadeUp}
                  className="group rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl hover:bg-white/4 transition-colors overflow-hidden"
                  open={i === 0}
                >
                  <summary className="flex items-center gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-(--color-accent-blue-light)">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="flex-1 text-base lg:text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-(--color-text-muted) shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-sm lg:text-base text-(--color-text-secondary) font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.details>
              );
            })}
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
                        <En>Native</En> Entegrasyon
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
