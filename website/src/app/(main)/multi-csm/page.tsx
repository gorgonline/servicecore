"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Network,
  Share2,
  Lock,
  CheckCircle2,
  ListChecks,
  FileSearch,
  Layers,
  KeyRound,
  Combine,
  Crown,
  Target,
  Timer,
  Clock,
  Inbox,
  UserCheck,
  Smile,
  Award,
  Calculator,
  Truck,
  Wrench,
  Building2,
  MapPin,
  Server,
  BarChart3,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Scale,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  GitBranch,
  MonitorSmartphone,
  BookOpen,
  LayoutGrid,
  Gauge,
} from "lucide-react";
import data from "@/data/multi-csm.json";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

const iconMap: Record<string, IconComponent> = {
  Network,
  Share2,
  Lock,
  CheckCircle2,
  ListChecks,
  FileSearch,
  Layers,
  KeyRound,
  Combine,
  Crown,
  Target,
  Timer,
  Clock,
  Inbox,
  UserCheck,
  Smile,
  Award,
  Calculator,
  Truck,
  Wrench,
  Building2,
  MapPin,
  Server,
  BarChart3,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Scale,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  GitBranch,
  MonitorSmartphone,
  BookOpen,
  LayoutGrid,
  Gauge,
};

const accentText: Record<string, string> = {
  blue: "text-(--color-accent-blue-light)",
  emerald: "text-(--color-accent-emerald-light)",
  purple: "text-(--color-accent-purple-light)",
  cyan: "text-(--color-accent-cyan-light)",
  orange: "text-(--color-accent-orange-light)",
  amber: "text-amber-300",
  pink: "text-pink-300",
  indigo: "text-indigo-300",
};

const accentBg: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20",
  emerald: "bg-emerald-500/10 border-emerald-500/20",
  purple: "bg-purple-500/10 border-purple-500/20",
  cyan: "bg-cyan-500/10 border-cyan-500/20",
  orange: "bg-orange-500/10 border-orange-500/20",
  amber: "bg-amber-500/10 border-amber-500/20",
  pink: "bg-pink-500/10 border-pink-500/20",
  indigo: "bg-indigo-500/10 border-indigo-500/20",
};

const accentBgStrong: Record<string, string> = {
  blue: "bg-blue-500/15 border-blue-500/30",
  emerald: "bg-emerald-500/15 border-emerald-500/30",
  purple: "bg-purple-500/15 border-purple-500/30",
  cyan: "bg-cyan-500/15 border-cyan-500/30",
  orange: "bg-orange-500/15 border-orange-500/30",
  amber: "bg-amber-500/15 border-amber-500/30",
  pink: "bg-pink-500/15 border-pink-500/30",
  indigo: "bg-indigo-500/15 border-indigo-500/30",
};

const accentGradient: Record<string, string> = {
  blue: "from-blue-500/15 to-blue-500/5 border-blue-500/25",
  emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/25",
  purple: "from-purple-500/15 to-purple-500/5 border-purple-500/25",
  cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/25",
  orange: "from-orange-500/15 to-orange-500/5 border-orange-500/25",
  amber: "from-amber-500/15 to-amber-500/5 border-amber-500/25",
  pink: "from-pink-500/15 to-pink-500/5 border-pink-500/25",
  indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/25",
};

const accentBlur: Record<string, string> = {
  blue: "bg-blue-500/10",
  emerald: "bg-emerald-500/10",
  purple: "bg-purple-500/10",
  cyan: "bg-cyan-500/10",
  orange: "bg-orange-500/10",
  amber: "bg-amber-500/10",
  pink: "bg-pink-500/10",
  indigo: "bg-indigo-500/10",
};

function ZigzagMock({ id }: { id: string; accent: string }) {
  if (id === "multi-csm-uzmanlik") {
    return (
      <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex items-center justify-center p-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute z-10 w-60 h-60 rounded-full border border-blue-500/15 pointer-events-none" />
          <div className="absolute z-10 w-90 h-90 rounded-full border border-blue-500/10 pointer-events-none" />

          <div className="absolute z-30 w-32 h-32 rounded-3xl bg-linear-to-br from-blue-500/35 to-cyan-500/25 border border-blue-500/45 flex flex-col items-center justify-center backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.45)] gap-1">
            <Network className="w-7 h-7 text-(--color-accent-blue-light)" />
            <span lang="en" className="text-[8px] font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
              Shared Pool
            </span>
            <span className="text-xs font-bold text-white tracking-tight">
              Uzmanlık
            </span>
            <span className="text-[7px] font-mono text-(--color-accent-emerald-light)">
              ● aktif
            </span>
          </div>

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const x = Number((50 + 40 * Math.cos(angle)).toFixed(3));
              const y = Number((50 + 40 * Math.sin(angle)).toFixed(3));
              return (
                <line
                  key={i}
                  x1={x}
                  y1={y}
                  x2={50}
                  y2={50}
                  stroke="url(#poolGrad)"
                  strokeWidth="0.25"
                  strokeDasharray="0.6 0.6"
                  opacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            <defs>
              <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>

          {[
            { label: "Bayi A", sub: "ağ uzmanı", tone: "blue" },
            { label: "Bayi B", sub: "donanım", tone: "emerald" },
            { label: "Bayi C", sub: "yazılım", tone: "purple" },
            { label: "Bayi D", sub: "saha", tone: "orange" },
            { label: "Bayi E", sub: "veri", tone: "cyan" },
            { label: "Bayi F", sub: "güvenlik", tone: "indigo" },
          ].map((node, i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = Number((50 + 40 * Math.cos(angle)).toFixed(3));
            const y = Number((50 + 40 * Math.sin(angle)).toFixed(3));
            return (
              <div
                key={i}
                className="absolute z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-(--color-surface-elevated-solid)/95 border border-white/15 backdrop-blur-xl shadow-xl hover:scale-105 transition-all duration-300"
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className={`w-7 h-7 rounded-lg ${accentBgStrong[node.tone]} border ${accentText[node.tone]} flex items-center justify-center shrink-0`}>
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white">{node.label}</span>
                  <span className="text-[8px] font-mono text-(--color-text-muted)">
                    {node.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (id === "multi-csm-cross-akis") {
    return (
      <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <GitBranch className="w-4 h-4 text-(--color-accent-emerald-light)" />
            </div>
            <div className="flex flex-col">
              <span lang="en" className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                Cross-Tenant Flow
              </span>
              <span className="text-[10px] font-bold text-white">Destek Talepleri Panosu</span>
            </div>
          </div>
          <span className="text-[8px] font-mono font-semibold text-(--color-accent-emerald-light) px-1.5 py-0.5 rounded-full bg-emerald-500/12 border border-emerald-500/25">
            CANLI
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Bekleyen", value: 12, tone: "amber" },
            { label: "Onaylı", value: 38, tone: "emerald" },
            { label: "Reddedilen", value: 4, tone: "pink" },
          ].map((m, i) => (
            <div key={i} className={`rounded-lg ${accentBg[m.tone]} border p-2 flex flex-col gap-0.5`}>
              <span className="text-[7px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
              <span className={`text-base font-bold tracking-tight ${accentText[m.tone]}`}>{m.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) px-1">
            Paylaşılan Kayıtlar
          </span>
          {[
            { tid: "INC-1421", source: "Bayi A", target: "Bayi C", status: "onaylandı", tone: "emerald" },
            { tid: "INC-1428", source: "Bayi B", target: "Bayi D", status: "beklemede", tone: "amber" },
            { tid: "INC-1434", source: "Bayi A", target: "Bayi F", status: "kabul edildi", tone: "emerald" },
            { tid: "INC-1437", source: "Bayi E", target: "Bayi C", status: "atandı", tone: "blue" },
            { tid: "INC-1441", source: "Bayi B", target: "Bayi A", status: "reddedildi", tone: "pink" },
            { tid: "INC-1445", source: "Bayi C", target: "Bayi D", status: "beklemede", tone: "amber" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5">
              <span className="text-[9px] font-mono font-bold text-(--color-accent-blue-light)">{row.tid}</span>
              <span className="text-[10px] font-medium text-white truncate">
                {row.source} <ArrowRight className="inline w-2.5 h-2.5 text-(--color-text-muted)" /> {row.target}
              </span>
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${accentBg[row.tone]} ${accentText[row.tone]} border`}>
                {row.status}
              </span>
              <ListChecks className={`w-3 h-3 ${accentText[row.tone]}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "multi-csm-kalite") {
    return (
      <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <BarChart3 className="w-4 h-4 text-(--color-accent-purple-light)" />
            </div>
            <div className="flex flex-col">
              <span lang="en" className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">
                Master Tenant Console
              </span>
              <span className="text-[10px] font-bold text-white">Bayi Performans Panosu</span>
            </div>
          </div>
          <span className="text-[8px] font-mono text-(--color-text-muted)">Q2 · 2026</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Ortalama SLA", value: "%93.4", trend: "+1.8", tone: "emerald" },
            { label: "Ort. Çözüm", value: "28dk", trend: "−4dk", tone: "blue" },
            { label: "Memnuniyet", value: "4.6/5", trend: "+0.2", tone: "purple" },
            { label: "Aktif Talep", value: "264", trend: "+12", tone: "amber" },
          ].map((m, i) => (
            <div key={i} className={`rounded-lg bg-linear-to-br ${accentGradient[m.tone]} border p-2.5 flex flex-col gap-1`}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                <span className={`text-[8px] font-mono font-semibold ${accentText[m.tone]}`}>{m.trend}</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) px-1">
            Bayi Karşılaştırma
          </span>
          {[
            { name: "Bayi A — İstanbul", sla: 96, tone: "emerald" },
            { name: "Bayi B — Ankara", sla: 92, tone: "emerald" },
            { name: "Bayi C — İzmir", sla: 88, tone: "amber" },
            { name: "Bayi D — Bursa", sla: 95, tone: "emerald" },
            { name: "Bayi E — Antalya", sla: 81, tone: "pink" },
          ].map((row, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-medium text-white">{row.name}</span>
                <span className={`font-mono font-semibold ${accentText[row.tone]}`}>
                  SLA %{row.sla}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    row.tone === "emerald"
                      ? "bg-linear-to-r from-emerald-500/70 to-emerald-400/80"
                      : row.tone === "amber"
                        ? "bg-linear-to-r from-amber-500/70 to-amber-400/80"
                        : "bg-linear-to-r from-pink-500/70 to-rose-400/80"
                  }`}
                  style={{ width: `${row.sla}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // multi-csm-gizlilik
  return (
    <div className="relative w-full h-135 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-(--color-surface-elevated-solid) flex flex-col p-4 gap-3">
      <div className="flex items-center justify-between pb-2 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Lock className="w-4 h-4 text-(--color-accent-cyan-light)" />
          </div>
          <div className="flex flex-col">
            <span lang="en" className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">
              Field-Level <En>ABAC</En>
            </span>
            <span className="text-[10px] font-bold text-white">Alan Bazlı Görünürlük</span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-(--color-accent-cyan-light) px-1.5 py-0.5 rounded-full bg-cyan-500/12 border border-cyan-500/25">
          ŞİFRELİ
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 px-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted)">Alt Bayi (Tenant)</span>
          <span className="text-[11px] font-bold text-white">Bayi C — İzmir</span>
        </div>
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted)">Erişim</span>
          <span className="text-[11px] font-bold text-(--color-accent-cyan-light)">Ana Bayi</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <span className="text-[8px] font-semibold uppercase tracking-widest text-(--color-text-muted) px-1">
          Alan Yetkileri
        </span>
        {[
          { field: "Müşteri Adı", visible: true, edit: false, tone: "emerald" },
          { field: "Sözleşme Tutarı", visible: false, edit: false, tone: "pink" },
          { field: "Fiyat Listesi", visible: false, edit: false, tone: "pink" },
          { field: "İç Notlar (Bayi)", visible: false, edit: false, tone: "pink" },
          { field: "Kayıt Durumu", visible: true, edit: true, tone: "emerald" },
          { field: "SLA Sayacı", visible: true, edit: false, tone: "emerald" },
          { field: "Worklog Süresi", visible: true, edit: false, tone: "emerald" },
          { field: "Çözüm Açıklaması", visible: true, edit: true, tone: "emerald" },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-2 py-1.5 rounded-lg bg-white/2 border border-white/5">
            <span className="text-[10px] font-medium text-white truncate">{row.field}</span>
            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${row.visible ? "bg-emerald-500/10 text-(--color-accent-emerald-light) border border-emerald-500/20" : "bg-pink-500/10 text-pink-300 border border-pink-500/20"}`}>
              {row.visible ? "görünür" : "gizli"}
            </span>
            <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${row.edit ? "bg-blue-500/10 text-(--color-accent-blue-light) border border-blue-500/20" : "bg-white/5 text-(--color-text-muted) border border-white/10"}`}>
              {row.edit ? "düzenle" : "okuma"}
            </span>
          </div>
        ))}
      </div>

      <div className="px-2">
        <span className="text-[8px] font-mono text-(--color-text-muted)">
          shared database · tenant filter · permission middleware
        </span>
      </div>
    </div>
  );
}

export default function MultiCsmPage() {
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
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-300 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-40 right-1/4 w-100 h-100 bg-purple-600/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-(--color-accent-blue-light) text-xs font-black tracking-widest uppercase mb-8 shadow-inner self-start"
              >
                <Network size={14} />
                <En>{data.hero.badge}</En>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
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
                className="text-lg lg:text-xl text-(--color-text-secondary) font-light leading-relaxed mb-10"
              >
                {data.hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href={data.cta.primaryHref}>
                  <button className="px-7 py-3.5 rounded-full bg-(--color-brand-primary) text-white font-semibold hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-(--shadow-glow-primary-weak) cursor-pointer flex items-center gap-2">
                    {data.cta.primaryLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href={data.cta.secondaryHref}>
                  <button className="px-7 py-3.5 rounded-full bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    {data.cta.secondaryLabel}
                  </button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-5 lg:p-7 shadow-2xl overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 pb-4 border-b border-white/8">
                <div className="flex flex-col gap-1">
                  <span lang="en" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                    Multi-CSM Console
                  </span>
                  <span className="text-base font-bold text-white tracking-tight">
                    Federe Bayi Ağı
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-emerald-light) shadow-[0_0_8px_currentColor] animate-pulse" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-(--color-accent-emerald-light)">canlı</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {[
                  { icon: Network, label: "Federe Bayi", value: "18", tone: "blue" },
                  { icon: Share2, label: "Cross-Tenant", value: "264", tone: "purple" },
                  { icon: ShieldCheck, label: "SLA Uyum", value: "%93", tone: "emerald" },
                  { icon: Calculator, label: "Worklog Maliyet", value: "₺142K", tone: "amber" },
                ].map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className={`rounded-2xl bg-linear-to-br ${accentGradient[m.tone]} border p-3 flex flex-col gap-1.5`}>
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${accentText[m.tone]}`} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-medium uppercase tracking-wider text-(--color-text-muted)">{m.label}</span>
                        <span className="text-xl font-bold tracking-tight text-white">{m.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 mb-4">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/8">
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-3 h-3 text-amber-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Ana Bayi · Süper Tenant</span>
                  </div>
                  <span lang="en" className="text-[8px] font-mono text-(--color-text-muted)">IsMasterTenant: true</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { name: "Bayi A", sla: 96, tone: "emerald" },
                    { name: "Bayi B", sla: 92, tone: "emerald" },
                    { name: "Bayi C", sla: 88, tone: "amber" },
                    { name: "Bayi D", sla: 95, tone: "emerald" },
                    { name: "Bayi E", sla: 81, tone: "pink" },
                    { name: "Bayi F", sla: 94, tone: "emerald" },
                  ].map((b, i) => (
                    <div key={i} className={`rounded-lg bg-linear-to-br ${accentGradient[b.tone]} border p-2 flex flex-col gap-0.5`}>
                      <span className="text-[9px] font-bold text-white">{b.name}</span>
                      <span className={`text-[8px] font-mono ${accentText[b.tone]}`}>SLA %{b.sla}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid) p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-(--color-accent-blue-light)">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span lang="en" className="text-[8px] font-mono uppercase tracking-widest text-(--color-text-muted)">RBAC + ABAC · Tenant Isolation</span>
                  <span className="text-[10px] font-medium text-white">Alan bazlı yetki · veri gizliliği aktif</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-(--color-accent-emerald-light)" />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ZIG-ZAG */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {data.zigzag.map((item, idx) => {
            const Icon = iconMap[item.icon] || Network;
            const reverse = idx % 2 === 1;
            return (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-24`}
              >
                <div className="w-full lg:w-1/2">
                  <div className={`relative rounded-[2.5rem] p-6 lg:p-8 border border-white/10 bg-linear-to-br ${accentGradient[item.accent]} backdrop-blur-xl group overflow-hidden`}>
                    <div className={`absolute -inset-10 ${accentBlur[item.accent]} blur-[50px] group-hover:opacity-150 transition-opacity duration-700 pointer-events-none`} />
                    <ZigzagMock id={item.imageKey} accent={item.accent} />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className={`w-16 h-16 rounded-2xl ${accentBg[item.accent]} border flex items-center justify-center ${accentText[item.accent]}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                    {item.titleLead}
                    <br />
                    <span className={accentText[item.accent]}>
                      {item.titleAccent}
                    </span>
                  </h2>
                  <p className="text-lg text-(--color-text-secondary) leading-relaxed font-light">
                    {item.description}
                  </p>
                  <ul className="space-y-4">
                    {item.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-(--color-text-overline)"
                      >
                        <CheckCircle2 className={`w-5 h-5 ${accentText[item.accent]} shrink-0 mt-1`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CSM TEMELI — 5 MODUL */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Layers className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                <En>CSM</En> Çekirdek Modülleri
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.csmTemeli.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.csmTemeli.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5"
          >
            {data.csmTemeli.items.map((item) => {
              const Icon = iconMap[item.icon] || LayoutGrid;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="group rounded-3xl bg-white/2 border border-white/10 p-6 hover:bg-white/4 hover:border-white/20 transition-all flex flex-col gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl ${accentBg[item.accent]} border ${accentText[item.accent]} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${accentText[item.accent]} hover:gap-2.5 transition-all cursor-pointer`}
                  >
                    İncele
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. CROSS-TENANT — BENTO */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Combine className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
              <span lang="en" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-purple-light)">
                Cross-Tenant Layer
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.crossTenant.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.crossTenant.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]"
          >
            {data.crossTenant.items.map((item) => {
              const Icon = iconMap[item.icon] || Share2;
              const wide = item.size === "wide";
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className={`${wide ? "lg:col-span-2" : "lg:col-span-1"} rounded-4xl bg-linear-to-br ${accentGradient[item.accent]} border p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col gap-4`}
                >
                  <div className={`absolute -top-12 -right-12 w-40 h-40 ${accentBlur[item.accent]} blur-[60px] rounded-full pointer-events-none`} />
                  <div className={`w-12 h-12 rounded-xl ${accentBgStrong[item.accent]} border ${accentText[item.accent]} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. MIMARI — 4 KART 2x2 */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Layers className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
              <span lang="en" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-cyan-light)">
                Hybrid Tenant Access Model
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.mimari.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.mimari.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {data.mimari.items.map((item) => {
              const Icon = iconMap[item.icon] || Layers;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="rounded-3xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 hover:border-white/20 transition-all flex flex-col gap-5 relative overflow-hidden group"
                >
                  <div className={`absolute -top-16 -right-16 w-48 h-48 ${accentBlur[item.accent]} blur-[70px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${accentBgStrong[item.accent]} border ${accentText[item.accent]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm lg:text-base text-(--color-text-secondary) font-light leading-relaxed relative z-10">
                    {item.description}
                  </p>
                  <ul className="space-y-2.5 relative z-10">
                    {item.items.map((subItem, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-(--color-text-secondary) font-light">
                        <span className={`w-1.5 h-1.5 rounded-full ${accentText[item.accent]} bg-current shrink-0 mt-2`} />
                        <span>{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 6. PERFORMANS KPI + MALIYET TABLO */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <BarChart3 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
              <span lang="en" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-emerald-light)">
                Performance &amp; <En>KPI</En>
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.performansKpi.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.performansKpi.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16"
          >
            {data.performansKpi.metrics.map((metric) => {
              const Icon = iconMap[metric.icon] || Target;
              return (
                <motion.div
                  key={metric.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${accentGradient[metric.accent]} border p-6 hover:bg-white/4 transition-colors flex flex-col gap-4 relative overflow-hidden group`}
                >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 ${accentBlur[metric.accent]} blur-[50px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-12 h-12 rounded-xl ${accentBgStrong[metric.accent]} border ${accentText[metric.accent]} flex items-center justify-center shrink-0 relative z-10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-tight relative z-10">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed relative z-10">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="relative rounded-4xl border border-white/10 bg-linear-to-br from-amber-500/8 to-amber-500/2 backdrop-blur-xl p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 relative z-10">
              <div className="lg:w-1/2 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                  <Calculator className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
                    Maliyet Hesabı
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {data.performansKpi.maliyet.title}
                </h3>
                <p className="text-base text-(--color-text-secondary) font-light leading-relaxed">
                  {data.performansKpi.maliyet.description}
                </p>
                <div className="rounded-2xl bg-(--color-surface-elevated-solid) border border-white/10 p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-(--color-text-muted) block mb-2">
                    Formül
                  </span>
                  <span className="text-base font-mono font-semibold text-white">
                    {data.performansKpi.maliyet.formula}
                  </span>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="rounded-2xl bg-(--color-surface-elevated-solid) border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-4 gap-2 px-4 py-3 border-b border-white/8 bg-white/2">
                    {data.performansKpi.maliyet.ornekTablo.basliklar.map((header, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-widest text-(--color-text-muted)"
                      >
                        {header}
                      </span>
                    ))}
                  </div>
                  {data.performansKpi.maliyet.ornekTablo.satirlar.map((row, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 px-4 py-3 border-b border-white/5 last:border-b-0">
                      <span className="text-sm font-medium text-white">{row.teknisyen}</span>
                      <span className="text-sm font-mono text-(--color-text-secondary)">{row.sure}</span>
                      <span className="text-sm font-mono text-(--color-text-secondary)">{row.saatlikUcret}</span>
                      <span className="text-sm font-mono font-semibold text-amber-300">{row.toplam}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-[1fr_auto] gap-2 px-4 py-3 bg-amber-500/8 border-t border-amber-500/20">
                    <span className="text-sm font-bold uppercase tracking-widest text-amber-300">
                      {data.performansKpi.maliyet.ornekTablo.toplamSatiri.etiket}
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                      {data.performansKpi.maliyet.ornekTablo.toplamSatiri.deger}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. HEDEF ORGANIZASYONLAR */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Building2 className="w-3.5 h-3.5 text-indigo-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-300">
                Hedef Organizasyonlar
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.hedefOrganizasyonlar.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.hedefOrganizasyonlar.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.hedefOrganizasyonlar.items.map((item) => {
              const Icon = iconMap[item.icon] || Building2;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="rounded-3xl bg-white/2 border border-white/10 p-7 hover:bg-white/4 hover:border-white/20 transition-all flex flex-col gap-4 relative overflow-hidden group"
                >
                  <div className={`absolute -top-12 -right-12 w-36 h-36 ${accentBlur[item.accent]} blur-[60px] rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-12 h-12 rounded-xl ${accentBgStrong[item.accent]} border ${accentText[item.accent]} flex items-center justify-center shrink-0 relative z-10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 8. FAZLANDIRMA TIMELINE */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <GitBranch className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-blue-light)">
                Fazlandırılmış Kurulum
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.fazlandirma.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.fazlandirma.sectionSubtitle}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-500/40 via-purple-500/40 to-cyan-500/40 -translate-x-1/2 hidden sm:block" />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-10 lg:gap-16"
            >
              {data.fazlandirma.phases.map((phase, idx) => {
                const Icon = iconMap[phase.icon] || GitBranch;
                const reverse = idx % 2 === 1;
                return (
                  <motion.div
                    key={phase.id}
                    variants={fadeUp}
                    className={`relative grid grid-cols-[auto_1fr] lg:grid-cols-2 gap-6 lg:gap-16 items-start ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className="hidden lg:block" />
                    <div className={`${reverse ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                      <div className={`flex items-center gap-3 mb-4 ${reverse ? "lg:flex-row-reverse" : ""}`}>
                        <div className={`relative w-16 h-16 rounded-2xl ${accentBgStrong[phase.accent]} border ${accentText[phase.accent]} flex items-center justify-center shrink-0 z-10`}>
                          <Icon className="w-8 h-8" />
                          <div className={`absolute inset-0 rounded-2xl ${accentBlur[phase.accent]} blur-xl -z-10`} />
                        </div>
                        <div className={`flex flex-col ${reverse ? "lg:items-end" : ""}`}>
                          <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${accentText[phase.accent]}`}>
                            {phase.label}
                          </span>
                          <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                            {phase.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-base text-(--color-text-secondary) font-light leading-relaxed mb-5">
                        {phase.description}
                      </p>
                      <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${reverse ? "lg:[&>li]:flex-row-reverse" : ""}`}>
                        {phase.items.map((subItem, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-(--color-text-secondary) font-light"
                          >
                            <CheckCircle2 className={`w-4 h-4 ${accentText[phase.accent]} shrink-0 mt-0.5`} />
                            <span>{subItem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. AI YOL HARITASI */}
      <section className="py-24 border-y border-white/5 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-(--color-accent-purple-light)">
                <En>AICore</En> Yol Haritası
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {data.aiYolHaritasi.sectionTitle}
            </h2>
            <p className="text-(--color-text-secondary) text-lg font-light leading-relaxed">
              {data.aiYolHaritasi.sectionSubtitle}
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {data.aiYolHaritasi.items.map((item) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className={`rounded-3xl bg-linear-to-br ${accentGradient[item.accent]} border p-8 hover:bg-white/4 transition-colors flex flex-col gap-5 relative overflow-hidden group`}
                >
                  <div className={`absolute -top-16 -right-16 w-48 h-48 ${accentBlur[item.accent]} blur-[70px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${accentBgStrong[item.accent]} border ${accentText[item.accent]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base text-(--color-text-secondary) font-light leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="container mx-auto pb-20 max-w-7xl mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Network className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span lang="en" className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Multi-CSM · Federated Service Network
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                    {data.cta.title}
                  </h2>

                  <p className="text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-2xl mx-auto">
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
                        Cross-Tenant Paylaşım
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        Merkezi Performans
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Veri Gizliliği
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
