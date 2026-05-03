"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Link as LinkIcon,
  ArrowRight,
  CheckCircle2,
  ArrowLeftRight,
  Layers,
  ShieldCheck,
  Code2,
  Users,
  Wallet,
  LineChart,
  Sparkles,
  Database,
  Cpu,
  Globe,
  Activity,
  Zap,
  Key,
  Lock,
  Clock,
  Server,
  Webhook,
} from "lucide-react";
import data from "@/data/entegrasyon-yonetimi.json";

export default function EntegrasyonYonetimiPage() {
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
              <LinkIcon size={14} />
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
            className="relative mx-auto rounded-4xl border border-white/10 bg-white/2 backdrop-blur-3xl p-4 lg:p-6 shadow-2xl overflow-hidden group w-full"
          >
            <div className="rounded-2xl border border-white/10 bg-(--color-surface-elevated-solid)/95 p-5 flex flex-col gap-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-(--color-accent-blue-light)" />
                  <span className="text-sm font-semibold text-white">Integration Hub Console</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">REST · Webhook · Event</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-(--color-text-muted)">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" /> 18 bağlantı · canlı</span>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Aktif Endpoint", value: "120+", trend: "v2 API", c: "text-(--color-accent-blue-light) border-blue-500/30 bg-blue-500/10" },
                  { label: "Günlük Çağrı", value: "4.2M", trend: "▲ 8%", c: "text-(--color-accent-emerald-light) border-emerald-500/30 bg-emerald-500/10" },
                  { label: "P95 Yanıt", value: "142 ms", trend: "stabil", c: "text-(--color-accent-cyan-light) border-cyan-500/30 bg-cyan-500/10" },
                  { label: "Hata Oranı", value: "0.06%", trend: "↓ iyileşti", c: "text-(--color-accent-purple-light) border-purple-500/30 bg-purple-500/10" },
                ].map((k, i) => (
                  <div key={i} className={`rounded-lg border ${k.c} p-2.5`}>
                    <div className="text-[9px] uppercase tracking-wider opacity-80 mb-1">{k.label}</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-xl font-bold text-white font-mono leading-none">{k.value}</div>
                      <div className="text-[9px] font-mono opacity-80">{k.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Body — Connection table */}
              <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
                <div className="grid grid-cols-12 px-3 py-1.5 text-[9px] uppercase tracking-wider text-(--color-text-muted) bg-white/2 border-b border-white/5">
                  <span className="col-span-3">Sistem</span>
                  <span className="col-span-2">Tip</span>
                  <span className="col-span-2">Yetki</span>
                  <span className="col-span-2">Yön</span>
                  <span className="col-span-2">Çağrı (24sa)</span>
                  <span className="col-span-1">Durum</span>
                </div>
                {[
                  { sys: "Salesforce CRM", icon: Users, type: "REST", auth: "OAuth 2", dir: "↔ çift", calls: "82.4K", c: "text-(--color-accent-emerald-light)" },
                  { sys: "SAP ERP", icon: Wallet, type: "REST", auth: "Token", dir: "→ tek", calls: "14.2K", c: "text-(--color-accent-emerald-light)" },
                  { sys: "Active Directory", icon: ShieldCheck, type: "LDAP", auth: "Kerberos", dir: "← tek", calls: "1.8M", c: "text-(--color-accent-emerald-light)" },
                  { sys: "Slack Notify", icon: Webhook, type: "Webhook", auth: "HMAC", dir: "→ tek", calls: "9.6K", c: "text-(--color-accent-emerald-light)" },
                ].map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div key={i} className="grid grid-cols-12 px-3 py-2 text-[10px] border-b border-white/5 last:border-0 hover:bg-white/2 items-center">
                      <span className="col-span-3 text-white font-medium truncate flex items-center gap-1.5">
                        <Icon className="w-3 h-3 text-(--color-accent-blue-light)" />
                        {r.sys}
                      </span>
                      <span className="col-span-2 font-mono text-(--color-text-secondary)">{r.type}</span>
                      <span className="col-span-2 font-mono text-(--color-accent-purple-light)">{r.auth}</span>
                      <span className="col-span-2 font-mono text-(--color-text-muted)">{r.dir}</span>
                      <span className="col-span-2 font-mono text-(--color-accent-cyan-light)">{r.calls}</span>
                      <span className={`col-span-1 ${r.c}`}>● ok</span>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-(--color-text-muted)">
                <span>4 / 18 bağlantı · son senkron 14:32</span>
                <span className="text-(--color-accent-blue-light)">JSON · TLS 1.3 · v2</span>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-surface-base) to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. ZIG-ZAG FEATURE BLOCKS */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-6 lg:px-12 w-full max-w-7xl flex flex-col gap-32">
          {/* Feature 1: Veri transferi */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <ArrowLeftRight className="w-4 h-4 text-(--color-accent-blue-light)" />
                      <span className="text-xs font-semibold text-white">Veri Transferi · Live Trace</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">200 OK · 142ms</span>
                  </div>

                  {/* Request → Response */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30">POST</span>
                        <span className="text-[9px] font-mono text-white">/api/v2/incidents</span>
                      </div>
                      <div className="font-mono text-[8.5px] text-(--color-text-secondary) leading-relaxed pt-1">
                        <div>{`{`}</div>
                        <div className="pl-2"><span className="text-(--color-accent-purple-light)">&quot;source&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;monitoring&quot;</span>,</div>
                        <div className="pl-2"><span className="text-(--color-accent-purple-light)">&quot;severity&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;P1&quot;</span>,</div>
                        <div className="pl-2"><span className="text-(--color-accent-purple-light)">&quot;ci&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;auth-svc&quot;</span></div>
                        <div>{`}`}</div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30">201</span>
                        <span className="text-[9px] font-mono text-white">Created</span>
                      </div>
                      <div className="font-mono text-[8.5px] text-(--color-text-secondary) leading-relaxed pt-1">
                        <div>{`{`}</div>
                        <div className="pl-2"><span className="text-(--color-accent-purple-light)">&quot;id&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;INC-9214&quot;</span>,</div>
                        <div className="pl-2"><span className="text-(--color-accent-purple-light)">&quot;assigned&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;L2&quot;</span>,</div>
                        <div className="pl-2"><span className="text-(--color-accent-purple-light)">&quot;sla&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;1h&quot;</span></div>
                        <div>{`}`}</div>
                      </div>
                    </div>
                  </div>

                  {/* Pipeline timeline */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                      <span className="text-[10px] font-semibold text-white">İşlem Hattı</span>
                      <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">5 adım · 142 ms</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { step: "Webhook alındı", t: "0 ms", c: "bg-blue-400" },
                        { step: "Şema doğrulama", t: "8 ms", c: "bg-blue-400" },
                        { step: "Yetki kontrolü", t: "24 ms", c: "bg-blue-400" },
                        { step: "Kayıt oluştur", t: "82 ms", c: "bg-blue-400" },
                        { step: "Webhook tetikle", t: "142 ms", c: "bg-emerald-400" },
                      ].map((s, i) => (
                        <div key={i} className="grid grid-cols-12 items-center gap-2">
                          <div className="col-span-1 flex justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${s.c} shadow-[0_0_4px_rgba(96,165,250,0.6)]`} />
                          </div>
                          <span className="col-span-7 text-[9px] text-white truncate">{s.step}</span>
                          <span className="col-span-4 text-[9px] font-mono text-(--color-text-muted) text-right">{s.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] font-mono text-(--color-text-muted)">
                    <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-(--color-accent-cyan-light)" /> idempotent · retry-safe</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> trace-id 7f1e2a</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-(--color-accent-blue-light)">
                <ArrowLeftRight size={32} />
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

          {/* Feature 2: Esnek & ölçeklenebilir (mock REST endpoint list) */}
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
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-(--color-accent-emerald-light)" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-(--color-text-muted)">
                        REST API · v2
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-(--color-accent-emerald-light) px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      JSON
                    </span>
                  </div>

                  {[
                    { method: "GET", path: "/api/v2/incidents", color: "blue" },
                    { method: "POST", path: "/api/v2/requests", color: "emerald" },
                    { method: "PUT", path: "/api/v2/changes/{id}", color: "orange" },
                    { method: "GET", path: "/api/v2/assets", color: "blue" },
                    { method: "POST", path: "/api/v2/users", color: "emerald" },
                    { method: "DELETE", path: "/api/v2/sessions", color: "red" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/8"
                    >
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded shrink-0 w-14 text-center ${
                          row.color === "blue"
                            ? "bg-blue-500/15 text-(--color-accent-blue-light) border border-blue-500/30"
                            : row.color === "emerald"
                              ? "bg-emerald-500/15 text-(--color-accent-emerald-light) border border-emerald-500/30"
                              : row.color === "orange"
                                ? "bg-orange-500/15 text-(--color-accent-orange-light) border border-orange-500/30"
                                : "bg-red-500/15 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {row.method}
                      </span>
                      <span className="text-[10px] font-mono text-white truncate">
                        {row.path}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-medium text-(--color-text-muted)">
                      Toplam endpoint
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-(--color-accent-emerald-light)">
                      120+ aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-(--color-accent-emerald-light)">
                <Layers size={32} />
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

          {/* Feature 3: Yetkilendirme (görsel api-2) */}
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
                <div className="relative w-full h-135 rounded-2xl overflow-hidden bg-(--color-surface-elevated-solid)/95 border border-white/10 shadow-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-(--color-accent-purple-light)" />
                      <span className="text-xs font-semibold text-white">API Güvenliği · Token Yönetimi</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-(--color-accent-purple-light) border border-purple-500/30">OAuth 2.0 + RBAC</span>
                  </div>

                  {/* Token preview */}
                  <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Key className="w-3 h-3 text-(--color-accent-purple-light)" />
                        <span className="text-[10px] font-semibold text-white font-mono">Bearer Token</span>
                      </div>
                      <span className="text-[8px] font-mono text-(--color-accent-emerald-light)">geçerli · 47 dk</span>
                    </div>
                    <div className="font-mono text-[9px] text-(--color-text-muted) bg-(--color-surface-base) rounded px-2 py-1.5 truncate">
                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdmMtY3JtIn0.••••••
                    </div>
                  </div>

                  {/* Scopes */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-white flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-(--color-accent-purple-light)" /> Yetki Kapsamları</span>
                      <span className="text-[9px] font-mono text-(--color-text-muted)">5 scope</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { s: "incidents:read", on: true },
                        { s: "incidents:write", on: true },
                        { s: "users:read", on: true },
                        { s: "users:write", on: false },
                        { s: "assets:read", on: true },
                        { s: "admin:*", on: false },
                      ].map((sc, i) => (
                        <div key={i} className={`flex items-center gap-1.5 px-2 py-1 rounded border text-[9px] font-mono ${sc.on ? "bg-emerald-500/10 border-emerald-500/30 text-(--color-accent-emerald-light)" : "bg-white/3 border-white/10 text-(--color-text-muted)"}`}>
                          <span>{sc.on ? "✓" : "○"}</span>
                          <span className="truncate">{sc.s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audit log */}
                  <div className="rounded-xl border border-white/5 bg-white/2 p-3 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                      <span className="text-[10px] font-semibold text-white">Erişim Denetim Kaydı</span>
                      <span className="ml-auto text-[9px] font-mono text-(--color-text-muted)">son 4 olay</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { actor: "svc-crm", action: "POST /incidents", time: "14:32:18", c: "text-(--color-accent-emerald-light)" },
                        { actor: "svc-erp", action: "GET /assets", time: "14:31:54", c: "text-(--color-accent-emerald-light)" },
                        { actor: "svc-mon", action: "POST /incidents", time: "14:30:09", c: "text-(--color-accent-emerald-light)" },
                        { actor: "svc-bi", action: "GET /reports", time: "14:28:44", c: "text-amber-400" },
                      ].map((e, i) => (
                        <div key={i} className="grid grid-cols-12 items-center gap-2 px-2 py-1 rounded bg-white/2 border border-white/5">
                          <span className="col-span-3 text-[8.5px] font-mono text-(--color-accent-purple-light) truncate">{e.actor}</span>
                          <span className="col-span-6 text-[8.5px] font-mono text-white truncate">{e.action}</span>
                          <span className={`col-span-2 text-[8.5px] font-mono ${e.c}`}>● 200</span>
                          <span className="col-span-1 text-[7.5px] font-mono text-(--color-text-muted)">{e.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] font-mono text-(--color-text-muted)">
                    <span className="flex items-center gap-1.5"><Server className="w-3 h-3 text-(--color-accent-purple-light)" /> rate-limit · 1k/dk</span>
                    <span className="text-(--color-accent-purple-light)">TLS 1.3 · IP allow-list</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-(--color-accent-purple-light)">
                <ShieldCheck size={32} />
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
            {/* Bento 1 - REST API (wide, code mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 lg:col-span-2 row-span-1 rounded-4xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/10 p-8 hover:bg-white/4 transition-colors relative overflow-hidden group flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-(--color-accent-blue-light) flex items-center justify-center mb-6">
                  <Code2 />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {data.bento.items[0].title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light pr-4">
                  {data.bento.items[0].description}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-blue-500/40 transition-colors p-4 font-mono text-[10px] flex flex-col gap-1 justify-center">
                <div className="flex items-center gap-2 text-(--color-text-muted)">
                  <span className="text-(--color-accent-emerald-light) font-bold">
                    POST
                  </span>
                  <span className="text-white">
                    /api/v2/incidents
                  </span>
                </div>
                <div className="text-(--color-text-muted) pl-2">
                  <span className="text-(--color-accent-blue-light)">Authorization:</span> Bearer ••••••
                </div>
                <div className="text-(--color-text-muted) pl-2">
                  <span className="text-(--color-accent-blue-light)">Content-Type:</span> application/json
                </div>
                <div className="text-(--color-text-secondary) mt-1">{`{`}</div>
                <div className="pl-3 text-(--color-text-secondary)">
                  <span className="text-(--color-accent-purple-light)">&quot;title&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;VPN bağlanmıyor&quot;</span>,
                </div>
                <div className="pl-3 text-(--color-text-secondary)">
                  <span className="text-(--color-accent-purple-light)">&quot;priority&quot;</span>: <span className="text-(--color-accent-orange-light)">&quot;high&quot;</span>
                </div>
                <div className="text-(--color-text-secondary)">{`}`}</div>
                <div className="flex items-center gap-2 mt-1 pt-1 border-t border-white/5">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                    201 Created
                  </span>
                  <span className="text-[9px] text-(--color-text-muted)">
                    142ms
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 2 - CRM (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-(--color-accent-orange-light) flex items-center justify-center mb-6 shrink-0">
                <Users />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[1].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[1].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex items-center justify-between gap-2">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-(--color-accent-orange-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-white">CRM</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <ArrowLeftRight className="w-4 h-4 text-(--color-text-muted)" />
                  <span className="text-[8px] font-mono text-(--color-text-muted)">
                    sync
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    <Database className="w-4 h-4 text-(--color-accent-blue-light)" />
                  </div>
                  <span className="text-[9px] font-medium text-white">
                    ServiceCore
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bento 3 - ERP (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-(--color-accent-cyan-light) flex items-center justify-center mb-6 shrink-0">
                <Wallet />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[2].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[2].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-1.5 justify-center">
                {[
                  { label: "Gelir/Gider", value: "₺4.2M" },
                  { label: "Bütçe Mutabakat", value: "%96" },
                  { label: "Fatura Eşleşme", value: "2.4K" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <span className="text-[10px] font-medium text-white">
                      {row.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-(--color-accent-cyan-light)">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 4 - İzleme & raporlama (wide, mock) */}
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
              <div className="w-full md:w-1/2 h-45 md:h-full relative rounded-xl border border-white/10 overflow-hidden shadow-inner shrink-0 bg-(--color-surface-elevated-solid) group-hover:border-purple-500/40 transition-colors p-5 flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Database className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
                  <span className="text-[11px] font-semibold text-white flex-1">
                    ServiceCore
                  </span>
                  <span className="text-[9px] font-mono text-(--color-text-muted)">
                    kaynak
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-3 bg-purple-500/40" />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "BI", icon: LineChart },
                    { label: "Alarm", icon: Cpu },
                    { label: "DWH", icon: Database },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg bg-white/3 border border-white/8"
                      >
                        <Icon className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
                        <span className="text-[9px] font-medium text-white">
                          {row.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Bento 5 - Yetkilendirme (normal, mock) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 border border-white/10 bg-linear-to-br from-indigo-500/5 to-transparent rounded-4xl p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shrink-0">
                <ShieldCheck />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[4].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[4].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { name: "Bearer Token", scope: "read" },
                  { name: "OAuth 2.0", scope: "read+write" },
                  { name: "Role Based", scope: "admin" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-[10px] font-medium text-white">
                        {row.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {row.scope}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento 6 - Avantajlar (normal, mock metrikler) */}
            <motion.div
              variants={fadeUp}
              className="col-span-1 rounded-4xl bg-white/2 border border-white/10 p-8 hover:bg-white/4 transition-colors flex flex-col overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-(--color-accent-emerald-light) flex items-center justify-center mb-6 shrink-0">
                <Sparkles />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 shrink-0">
                {data.bento.items[5].title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) shrink-0 font-light mb-4">
                {data.bento.items[5].description}
              </p>
              <div className="relative w-full flex-1 rounded-xl border border-white/10 overflow-hidden bg-(--color-surface-elevated-solid) p-4 flex flex-col gap-2 justify-center">
                {[
                  { label: "Operasyonel hız", value: "+38%" },
                  { label: "Veri doğruluğu", value: "%99.6" },
                  { label: "Manuel iş", value: "−72%" },
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
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
                    <Globe className="w-4 h-4 text-(--color-accent-blue-light)" />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                      Entegrasyon Yönetimi
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
                        REST API
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        CRM & ERP
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                        Güvenli Yetki
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
