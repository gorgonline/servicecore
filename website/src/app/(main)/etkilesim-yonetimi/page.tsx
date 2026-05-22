"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Filter,
  GitBranch,
  Search,
  FileText,
  Users,
  ShieldCheck,
  Headphones,
  Layers,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  MessagesSquare,
  Instagram,
  Linkedin,
  Send,
  Mail,
  Phone,
  Sparkles,
  Zap,
  AlertCircle,
  MousePointerClick,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckSquare,
  Eye,
  Star,
  ArrowDown,
  CornerDownRight,
} from "lucide-react";
import data from "@/data/etkilesim-yonetimi.json";
import PrivacyContact from "@/components/ui/privacy-contact";

export default function EtkilesimYonetimiPage() {
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
              <MessageSquare size={14} />
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
              src="/images/etkilesim-modulu-v2/index.png"
              alt={data.hero.imageAlt}
              width={1427}
              height={557}
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
          {/* Feature 1: Merkezi Karşılama — blue */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex items-center justify-center p-8">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Center node — ServiceCore */}
                    <div className="absolute z-20 w-28 h-28 rounded-3xl bg-linear-to-br from-blue-500/30 to-cyan-500/20 border border-blue-500/40 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.4)]">
                      <Image
                        src="/logo-v1.png"
                        alt="ServiceCore"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain mb-1"
                      />
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-white">
                        ServiceCore
                      </span>
                    </div>

                    {/* Connection lines — pentagon */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 400 400"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {[
                        { x: 200, y: 60 },
                        { x: 333, y: 157 },
                        { x: 282, y: 313 },
                        { x: 118, y: 313 },
                        { x: 67, y: 157 },
                      ].map((p, i) => (
                        <line
                          key={i}
                          x1={p.x}
                          y1={p.y}
                          x2={200}
                          y2={200}
                          stroke="url(#blueGradient)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.5"
                        />
                      ))}
                      <defs>
                        <linearGradient
                          id="blueGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Channel nodes — pentagon positions */}
                    {[
                      { label: "Teams", icon: MessagesSquare, pos: "top-2 left-1/2 -translate-x-1/2", colorClass: "text-(--color-accent-purple-light)", dot: "bg-(--color-accent-purple-light)" },
                      { label: "WhatsApp", icon: MessageCircle, pos: "top-[28%] right-2", colorClass: "text-(--color-accent-emerald-light)", dot: "bg-(--color-accent-emerald-light)" },
                      { label: "Instagram", icon: Instagram, pos: "bottom-2 right-[12%]", colorClass: "text-(--color-accent-orange-light)", dot: "bg-(--color-accent-orange-light)" },
                      { label: "LinkedIn", icon: Linkedin, pos: "bottom-2 left-[12%]", colorClass: "text-(--color-accent-blue-light)", dot: "bg-(--color-accent-blue-light)" },
                      { label: "Telegram", icon: Send, pos: "top-[28%] left-2", colorClass: "text-(--color-accent-cyan-light)", dot: "bg-(--color-accent-cyan-light)" },
                    ].map((node, i) => (
                      <div
                        key={i}
                        className={`absolute ${node.pos} z-10 px-3 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur-xl flex items-center gap-2 shadow-lg`}
                      >
                        <node.icon className={`w-4 h-4 ${node.colorClass}`} />
                        <span className="text-xs font-semibold text-white">
                          {node.label}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${node.dot} shadow-[0_0_8px_currentColor]`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <MessageSquare size={32} />
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

          {/* Feature 2: Tekilleştirme & Akıllı Sınıflandırma — emerald */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-emerald-500/10 blur-[50px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Stage 1: Gelen Kayıtlar */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        1 · Gelen Kayıtlar
                      </span>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        4 kayıt
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { icon: Mail, label: "E-posta", id: "#4218", dup: true },
                        { icon: Mail, label: "E-posta", id: "#4219", dup: true },
                        { icon: MessageCircle, label: "Chat", id: "#4220" },
                        { icon: Phone, label: "Telefon", id: "#4221" },
                      ].map((row, i) => {
                        const Icon = row.icon;
                        return (
                          <div
                            key={i}
                            className={`rounded-lg p-2 flex flex-col gap-1 border ${row.dup ? "bg-amber-500/8 border-amber-500/25" : "bg-white/3 border-white/8"}`}
                          >
                            <div className="flex items-center justify-between">
                              <Icon className="w-3 h-3 text-(--color-text-secondary)" />
                              {row.dup && (
                                <span className="text-[7px] font-mono font-bold text-amber-300 px-1 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                                  DUP
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] font-semibold text-white">
                              {row.label}
                            </span>
                            <span className="text-[8px] font-mono text-(--color-text-muted)">
                              {row.id}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center gap-2 py-0.5">
                    <ArrowDown className="w-3 h-3 text-(--color-accent-emerald-light)" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">
                      Tekilleştirme
                    </span>
                    <ArrowDown className="w-3 h-3 text-(--color-accent-emerald-light)" />
                  </div>

                  {/* Stage 2: AI Sınıflandırma */}
                  <div className="rounded-xl bg-linear-to-br from-emerald-500/12 to-cyan-500/8 border border-emerald-500/30 p-3 flex flex-col gap-2 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                          AI Akıllı Sınıflandırma
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-(--color-accent-emerald-light)">
                        3 tekil
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { icon: AlertCircle, label: "Olay", n: 1, tone: "blue" },
                        { icon: MousePointerClick, label: "İstek", n: 1, tone: "cyan" },
                        { icon: TrendingUp, label: "İyileştirme", n: 1, tone: "purple" },
                      ].map((c, i) => {
                        const Icon = c.icon;
                        const t: Record<string, string> = {
                          blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/25",
                          cyan: "text-(--color-accent-cyan-light) bg-cyan-500/12 border-cyan-500/25",
                          purple: "text-(--color-accent-purple-light) bg-purple-500/12 border-purple-500/25",
                        };
                        return (
                          <div
                            key={i}
                            className={`rounded-lg border p-2 flex items-center justify-between ${t[c.tone]}`}
                          >
                            <div className="flex items-center gap-1.5">
                              <Icon className="w-3 h-3" />
                              <span className="text-[9px] font-semibold text-white">
                                {c.label}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold">
                              {c.n}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center gap-2 py-0.5">
                    <ArrowDown className="w-3 h-3 text-(--color-accent-cyan-light)" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-cyan-light)">
                      No-code Yönlendirme
                    </span>
                    <ArrowDown className="w-3 h-3 text-(--color-accent-cyan-light)" />
                  </div>

                  {/* Stage 3: No-code Routing Rules */}
                  <div className="flex-1 rounded-xl border border-white/8 bg-white/2 p-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-(--color-accent-cyan-light)" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                          Atama Kuralları
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-(--color-text-muted)">
                        no-code
                      </span>
                    </div>
                    {[
                      { cond: "Olay · Yüksek", target: "BT Destek L2", icon: AlertCircle, tone: "text-(--color-accent-blue-light)" },
                      { cond: "İstek · Donanım", target: "Saha Ekibi", icon: MousePointerClick, tone: "text-(--color-accent-cyan-light)" },
                      { cond: "İyileştirme", target: "Ürün Yöneticisi", icon: TrendingUp, tone: "text-(--color-accent-purple-light)" },
                    ].map((r, i) => {
                      const Icon = r.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/3 border border-white/8"
                        >
                          <span className="text-[8px] font-mono text-(--color-text-muted) shrink-0">
                            EĞER
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Icon className={`w-3 h-3 ${r.tone}`} />
                            <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                              {r.cond}
                            </span>
                          </div>
                          <CornerDownRight className="w-3 h-3 text-(--color-text-muted) ml-auto shrink-0" />
                          <span className="text-[10px] font-medium text-(--color-accent-emerald-light) whitespace-nowrap">
                            {r.target}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Filter size={32} />
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

          {/* Feature 3: Dönüşüm, Yetki, Toplu İşlem — purple */}
          <motion.div
            animate="visible"
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
          >
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 backdrop-blur-xl group overflow-hidden">
                <div className="absolute -inset-10 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none" />
                <div className="relative w-full h-112.5 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-5 gap-3">
                  {/* Section A: Modül Dönüşümü */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        A · Modül Dönüşümü
                      </span>
                      <span className="text-[10px] font-mono text-(--color-text-muted)">
                        Çağrı #4218
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg px-3 py-2.5 bg-purple-500/15 border border-purple-500/35 flex items-center gap-2 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <MessageSquare className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                        <div className="flex flex-col">
                          <span className="text-[9px] font-semibold text-white">
                            Kaynak Çağrı
                          </span>
                          <span className="text-[8px] font-mono text-(--color-text-muted)">
                            VPN bağlantı sorunu
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
                      <div className="grid grid-cols-3 gap-1.5 flex-1 min-w-0">
                        {[
                          { icon: AlertCircle, label: "Olay", tone: "blue" },
                          { icon: MousePointerClick, label: "İstek", tone: "cyan" },
                          { icon: TrendingUp, label: "İyileştirme", tone: "emerald" },
                        ].map((d, i) => {
                          const Icon = d.icon;
                          const t: Record<string, string> = {
                            blue: "text-(--color-accent-blue-light) bg-blue-500/12 border-blue-500/30 hover:bg-blue-500/20",
                            cyan: "text-(--color-accent-cyan-light) bg-cyan-500/12 border-cyan-500/30 hover:bg-cyan-500/20",
                            emerald: "text-(--color-accent-emerald-light) bg-emerald-500/12 border-emerald-500/30 hover:bg-emerald-500/20",
                          };
                          return (
                            <div
                              key={i}
                              className={`rounded-lg border p-2 flex flex-col items-center gap-0.5 transition-colors ${t[d.tone]}`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span className="text-[9px] font-semibold text-white">
                                {d.label}
                              </span>
                              <span className="text-[7px] font-mono text-(--color-text-muted)">
                                Dönüştür
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section B: Yetki Matrisi */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        B · Yetki Matrisi
                      </span>
                      <ShieldCheck className="w-3 h-3 text-(--color-text-muted)" />
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/2 overflow-hidden">
                      <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-wider text-(--color-text-muted) bg-white/3 border-b border-white/5">
                        <span className="w-12">Rol</span>
                        <span>Dönüştür</span>
                        <span>Kapat</span>
                        <span>Sil</span>
                      </div>
                      {[
                        { role: "Ajan", a: true, b: true, c: false },
                        { role: "Kıdemli", a: true, b: true, c: false },
                        { role: "Yönetici", a: true, b: true, c: true },
                      ].map((r, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_1fr_1fr_1fr] gap-1 px-3 py-1.5 items-center border-b border-white/5 last:border-b-0"
                        >
                          <span className="text-[10px] font-semibold text-white w-12">
                            {r.role}
                          </span>
                          {[r.a, r.b, r.c].map((allowed, j) => (
                            <div key={j} className="flex items-center">
                              {allowed ? (
                                <CheckCircle2 className="w-3 h-3 text-(--color-accent-emerald-light)" />
                              ) : (
                                <span className="w-3 h-3 rounded-full border border-white/15 bg-white/5" />
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section C: Toplu İşlem */}
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        C · Toplu İşlem
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-(--color-accent-purple-light) px-2 py-0.5 rounded-full bg-purple-500/12 border border-purple-500/25">
                        4 seçili
                      </span>
                    </div>
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                      <CheckSquare className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-semibold text-white">
                        Toplu Aksiyon:
                      </span>
                      <div className="flex items-center gap-1.5 ml-1">
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/8 border border-white/12 text-white">
                          Atama Değiştir
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/8 border border-white/12 text-white">
                          Durum
                        </span>
                      </div>
                      <ChevronDown className="w-3 h-3 text-(--color-text-muted) ml-auto" />
                    </div>
                    {/* Rows */}
                    <div className="flex flex-col gap-1 flex-1">
                      {[
                        { id: "#4218", title: "VPN bağlantı sorunu", status: "Açık" },
                        { id: "#4219", title: "Mail gelmedi", status: "Açık" },
                        { id: "#4220", title: "Yazıcı arızası", status: "Beklemede" },
                        { id: "#4221", title: "Disk dolu uyarısı", status: "Açık" },
                      ].map((row, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-[auto_auto_1fr_auto] gap-2 items-center px-2.5 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/15"
                        >
                          <CheckSquare className="w-3 h-3 text-(--color-accent-purple-light)" />
                          <span className="text-[9px] font-mono text-(--color-text-muted)">
                            {row.id}
                          </span>
                          <span className="text-[10px] font-medium text-white truncate">
                            {row.title}
                          </span>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-(--color-text-secondary)">
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <GitBranch size={32} />
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

      {/* 3. BENTO GRID — 6 kart */}
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
            {/* Bento Item 1 - Takip & Filtre (wide, cyan) — filtre.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-cyan-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6">
                  <Search />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-cyan-500/40 transition-colors bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2.5">
                {/* Saved view tabs */}
                <div className="flex items-center gap-1 border-b border-white/8 pb-2 overflow-hidden">
                  {[
                    { label: "Tümü", active: false, icon: Eye },
                    { label: "Bana Atanan", active: true, icon: Star },
                    { label: "Kritik", active: false, icon: AlertCircle },
                  ].map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-medium ${
                          t.active
                            ? "bg-cyan-500/15 border border-cyan-500/30 text-(--color-accent-cyan-light)"
                            : "text-(--color-text-muted) border border-transparent"
                        }`}
                      >
                        <Icon className="w-2.5 h-2.5" />
                        <span>{t.label}</span>
                      </div>
                    );
                  })}
                  <div className="ml-auto flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                    <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">
                      Canlı
                    </span>
                  </div>
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1 flex-wrap">
                  <Filter className="w-2.5 h-2.5 text-(--color-text-muted)" />
                  {[
                    { label: "Durum: Açık", tone: "blue" },
                    { label: "Kategori: Olay", tone: "purple" },
                    { label: "Öncelik: Yüksek", tone: "red" },
                  ].map((c, i) => {
                    const t: Record<string, string> = {
                      blue: "bg-blue-500/12 border-blue-500/25 text-(--color-accent-blue-light)",
                      purple: "bg-purple-500/12 border-purple-500/25 text-(--color-accent-purple-light)",
                      red: "bg-red-500/12 border-red-500/25 text-(--color-accent-red-light)",
                    };
                    return (
                      <span
                        key={i}
                        className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full border ${t[c.tone]}`}
                      >
                        {c.label}
                      </span>
                    );
                  })}
                </div>

                {/* Live records list */}
                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                  {[
                    { id: "#4218", title: "VPN bağlantı sorunu", status: "Açık", tone: "blue", time: "2dk" },
                    { id: "#4217", title: "Mail server gecikmesi", status: "Devam", tone: "amber", time: "8dk" },
                    { id: "#4216", title: "Yetki talebi", status: "Yeni", tone: "emerald", time: "12dk" },
                    { id: "#4215", title: "Yazıcı arızası", status: "Açık", tone: "blue", time: "18dk" },
                  ].map((row, i) => {
                    const t: Record<string, string> = {
                      blue: "text-(--color-accent-blue-light) bg-blue-500/10 border-blue-500/20",
                      amber: "text-amber-300 bg-amber-500/10 border-amber-500/20",
                      emerald: "text-(--color-accent-emerald-light) bg-emerald-500/10 border-emerald-500/20",
                    };
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5"
                      >
                        <span className="text-[8px] font-mono text-(--color-text-muted)">
                          {row.id}
                        </span>
                        <span className="text-[10px] font-medium text-white truncate">
                          {row.title}
                        </span>
                        <span className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${t[row.tone]}`}>
                          {row.status}
                        </span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">
                          {row.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento Item 2 - İçerik & Ek (normal, orange) — topluislemmenu.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <FileText />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-white">
                <Image
                  src="/images/etkilesim-modulu-v2/topluislemmenu.png"
                  alt="Toplu işlem menüsü ve içerik yönetimi"
                  fill
                  className="object-cover object-top-left"
                />
              </div>
            </motion.div>

            {/* Bento Item 3 - Esnek Atama (normal, amber) — görselsiz */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-start relative overflow-hidden"
            >
              <div className="absolute -inset-16 bg-amber-500/5 blur-[70px] pointer-events-none" />
              <div className="relative w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 shrink-0">
                <Users />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="relative text-sm text-(--color-text-secondary) shrink-0 font-light mb-6">
                {data.bento.items[2].description}
              </p>
              <div className="relative mt-auto flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
                  <Users size={12} />
                  Ekip
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
                  <Layers size={12} />
                  Grup
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
                  <MessageSquare size={12} />
                  Kişi
                </span>
              </div>
            </motion.div>

            {/* Bento Item 4 - ITIL4 (wide, indigo) — donustur1.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-indigo-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                  <ShieldCheck />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[3].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[3].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 group-hover:border-indigo-500/40 transition-colors bg-white">
                <Image
                  src="/images/etkilesim-modulu-v2/donustur1.png"
                  alt="ITIL4 uyumlu modül dönüşüm akışı"
                  fill
                  className="object-cover object-top-left"
                />
              </div>
            </motion.div>

            {/* Bento Item 5 - İletişim & SPOC (normal, purple) — topluislemaction.png */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-(--color-accent-purple-light) flex items-center justify-center mb-6 shrink-0">
                <Headphones />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-3 flex flex-col gap-2">
                {/* Record header — SPOC */}
                <div className="flex items-center justify-between pb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-(--color-text-muted)">
                      #4218
                    </span>
                    <span className="text-[10px] font-bold text-white">
                      VPN bağlantı sorunu
                    </span>
                  </div>
                  <span className="text-[8px] font-mono font-semibold text-(--color-accent-purple-light) px-1.5 py-0.5 rounded-full bg-purple-500/12 border border-purple-500/25">
                    SPOC
                  </span>
                </div>

                {/* Conversation timeline */}
                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                  {/* User msg — email */}
                  <div className="flex items-start gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Mail className="w-2.5 h-2.5 text-(--color-accent-blue-light)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-semibold text-white">Müşteri</span>
                        <span className="text-[8px] font-mono text-(--color-text-muted)">09:14 · e-posta</span>
                      </div>
                      <div className="text-[9px] text-(--color-text-secondary) px-2 py-1 rounded-md bg-white/3 border border-white/8 mt-0.5">
                        VPN&apos;e bağlanamıyorum, acil destek lazım.
                      </div>
                    </div>
                  </div>

                  {/* Agent reply */}
                  <div className="flex items-start gap-1.5 flex-row-reverse">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Headphones className="w-2.5 h-2.5 text-(--color-accent-purple-light)" />
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[8px] font-mono text-(--color-text-muted)">09:18 · ajan</span>
                        <span className="text-[9px] font-semibold text-white">Ajan</span>
                      </div>
                      <div className="inline-block text-[9px] text-(--color-text-secondary) px-2 py-1 rounded-md bg-purple-500/8 border border-purple-500/20 mt-0.5 text-left">
                        Hemen kontrol ediyorum, 5 dk içinde döneceğim.
                      </div>
                    </div>
                  </div>

                  {/* Channel switch — system */}
                  <div className="flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-emerald-500/8 border border-emerald-500/20">
                    <ArrowRight className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[8px] font-mono uppercase tracking-wider text-(--color-accent-emerald-light)">
                      Kanal
                    </span>
                    <span className="text-[8px] text-white">e-posta</span>
                    <ChevronRight className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    <Phone className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                    <span className="text-[8px] text-white">telefon</span>
                    <span className="ml-auto text-[8px] font-mono text-(--color-text-muted)">09:24</span>
                  </div>

                  {/* Agent resolve */}
                  <div className="flex items-start gap-1.5 flex-row-reverse">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 text-(--color-accent-emerald-light)" />
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[8px] font-mono text-(--color-text-muted)">09:31 · çözüldü</span>
                      </div>
                      <div className="inline-block text-[9px] text-(--color-accent-emerald-light) px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 mt-0.5">
                        VPN sertifikası yenilendi · kapatıldı
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer — single touchpoint badge */}
                <div className="flex items-center justify-between pt-1.5 border-t border-white/8">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                    Tek temas noktası
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-(--color-text-muted)" />
                    <span className="text-[8px] font-mono text-(--color-text-secondary)">17 dk</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bento Item 6 - Ön Eleme (normal, red) — görselsiz */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col justify-start relative overflow-hidden"
            >
              <div className="absolute -inset-16 bg-red-500/5 blur-[70px] pointer-events-none" />
              <div className="relative w-12 h-12 rounded-xl bg-red-500/20 text-(--color-accent-red-light) flex items-center justify-center mb-6 shrink-0">
                <Layers />
              </div>
              <h3 className="relative text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="relative text-sm text-(--color-text-secondary) shrink-0 font-light mb-6">
                {data.bento.items[5].description}
              </p>
              <div className="relative mt-auto space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-red-light) shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Ön eleme katmanı
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-red-light) shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Modül yönlendirme
                  </span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-red-light) shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  <span className="text-xs text-(--color-text-secondary) font-light">
                    Operasyonel verim
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
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <MessageSquare className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Etkileşim Yönetimi
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
                        Omnichannel
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        SPOC Disiplini
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        ITIL 4 Uyumu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PrivacyContact />
    </div>
  );
}
