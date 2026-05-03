"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Filter,
  Target,
  Search,
  TrendingUp,
  BarChart3,
  BookOpen,
  GitBranch,
  Network,
  Languages,
  Merge,
  CalendarClock,
  Eye,
  Heart,
  FileCheck,
  Mic,
  ShieldAlert,
  Clock,
  ShieldCheck,
  Package,
  FileSignature,
  Truck,
  AlertTriangle,
  Wallet,
  Leaf,
  Users,
  Megaphone,
  Phone,
  Headphones,
  X,
  Sparkles,
  Check,
  Loader2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { submitForm } from "@/lib/forms";

type Status = "idle" | "loading" | "success" | "error";

interface RoadmapItem {
  id: string;
  name: string;
  description: string;
  release: string;
  icon: string;
}

interface RoadmapYear {
  year: number;
  items: RoadmapItem[];
}

interface AIRoadmapData {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    instruction: string;
    ctaLabel: string;
  };
  years: RoadmapYear[];
}

const iconMap: Record<string, LucideIcon> = {
  FileText,
  MessageSquare,
  Filter,
  Target,
  Search,
  TrendingUp,
  BarChart3,
  BookOpen,
  GitBranch,
  Network,
  Languages,
  Merge,
  CalendarClock,
  Eye,
  Heart,
  FileCheck,
  Mic,
  ShieldAlert,
  Clock,
  ShieldCheck,
  Package,
  FileSignature,
  Truck,
  AlertTriangle,
  Wallet,
  Leaf,
  Users,
  Megaphone,
  Phone,
  Headphones,
};

export function AIRoadmapSection({ data }: { data: AIRoadmapData }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const allItems = useMemo(
    () => data.years.flatMap((y) => y.items),
    [data.years]
  );

  const selectedItems = useMemo(
    () => allItems.filter((i) => selected.has(i.id)),
    [allItems, selected]
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openDrawer = () => {
    setDrawerOpen(true);
    setStatus("idle");
    setErrorMessage("");
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("AI Yol Haritası", {
      "Ad Soyad": form.name,
      "E-posta": form.email,
      Telefon: form.phone,
      "Geri Bildirim": form.message,
      "Seçilen Modüller": selectedItems.map((i) => i.name).join(", "),
    });
    if (result.ok) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-(--color-surface-base-dark)">
      {/* Background glow */}
      <div className="absolute top-1/4 -left-[20%] w-[60%] h-[60%] rounded-full bg-(--color-brand-primary)/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-[20%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        {/* Sticky CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 lg:p-8 rounded-4xl bg-linear-to-br from-(--color-brand-primary)/10 to-purple-500/10 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-(--color-brand-primary)/20 border border-(--color-brand-primary)/30 shrink-0">
              <Sparkles className="w-6 h-6 text-(--color-brand-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {selected.size > 0
                  ? `${selected.size} modül seçildi`
                  : "Görüşünüz bizim için önemli"}
              </h3>
              <p className="text-sm text-(--color-text-secondary) leading-relaxed max-w-2xl">
                {data.hero.instruction}
              </p>
            </div>
          </div>
          <button
            onClick={openDrawer}
            disabled={selected.size === 0}
            className="h-12 px-6 rounded-full bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) disabled:bg-white/5 disabled:text-white/40 disabled:cursor-not-allowed text-white font-semibold shadow-(--shadow-glow-primary) transition-all shrink-0 cursor-pointer"
          >
            {data.hero.ctaLabel}
          </button>
        </motion.div>

        {/* Years */}
        {data.years.map((yearBlock, yi) => (
          <div key={yearBlock.year} className={yi > 0 ? "mt-20" : ""}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5 }}
              className="flex items-end justify-between gap-4 pb-6 mb-10 border-b border-white/10"
            >
              <div className="flex items-baseline gap-4">
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  {yearBlock.year}
                </h2>
                <span className="text-sm font-medium text-(--color-text-muted)">
                  {yearBlock.items.length} modül
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yearBlock.items.map((item, idx) => {
                const Icon = iconMap[item.icon] ?? Sparkles;
                const isSelected = selected.has(item.id);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "30px" }}
                    transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      className={`group relative w-full h-full flex flex-col text-left p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-(--color-brand-primary)/10 border-(--color-brand-primary)/50 shadow-(--shadow-glow-primary-weak)"
                          : "bg-white/2 border-white/5 hover:bg-white/4 hover:border-white/10"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`absolute top-5 right-5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-(--color-brand-primary) border-(--color-brand-primary)"
                            : "border-white/20 group-hover:border-white/40"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>

                      {/* Icon */}
                      <div
                        className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-(--color-brand-primary)/20 border-(--color-brand-primary)/40 text-(--color-brand-primary)"
                            : "bg-white/5 border-white/10 text-(--color-accent-blue-light) group-hover:bg-(--color-brand-primary)/10 group-hover:border-(--color-brand-primary)/30"
                        }`}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight pr-8">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-(--color-text-secondary) leading-relaxed font-light mb-5 grow">
                        {item.description}
                      </p>

                      {/* Release badge */}
                      <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-(--color-brand-primary)/10 text-(--color-accent-blue-light) border border-(--color-brand-primary)/20">
                        <CalendarClock className="w-3 h-3" />
                        {item.release}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-90"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed top-0 right-0 h-full w-full sm:w-115 bg-(--color-surface-elevated-solid) border-l border-white/10 z-100 flex flex-col"
            >
              <header className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  Görüş Bildir
                </h3>
                <button
                  onClick={closeDrawer}
                  aria-label="Kapat"
                  className="p-2 rounded-lg text-(--color-text-secondary) hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-(--color-accent-emerald-base)/20 border border-(--color-accent-emerald-base)/40 flex items-center justify-center">
                      <Check className="w-8 h-8 text-(--color-accent-emerald-light)" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-xl font-semibold text-white">Teşekkürler!</h4>
                    <p className="text-sm text-(--color-text-secondary) max-w-xs leading-relaxed">
                      Geri bildiriminiz ekibimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-(--color-text-secondary) mb-2 uppercase tracking-wider">
                        Seçilen Modüller ({selectedItems.length})
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedItems.length > 0 ? (
                          selectedItems.map((item) => (
                            <span
                              key={item.id}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-(--color-brand-primary)/15 text-(--color-accent-blue-light) border border-(--color-brand-primary)/30"
                            >
                              {item.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-(--color-text-muted)">Henüz seçim yapmadınız.</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-(--color-text-secondary) mb-2 uppercase tracking-wider">
                        Ad Soyad
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        disabled={status === "loading"}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Adınız ve soyadınız"
                        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-(--color-text-muted) text-sm focus:outline-none focus:border-(--color-brand-primary)/60 focus:ring-2 focus:ring-(--color-brand-primary)/20 transition-colors disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-(--color-text-secondary) mb-2 uppercase tracking-wider">
                        E-posta
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        disabled={status === "loading"}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="isim@sirket.com"
                        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-(--color-text-muted) text-sm focus:outline-none focus:border-(--color-brand-primary)/60 focus:ring-2 focus:ring-(--color-brand-primary)/20 transition-colors disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-(--color-text-secondary) mb-2 uppercase tracking-wider">
                        Telefon
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        disabled={status === "loading"}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="05xx xxx xx xx"
                        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-(--color-text-muted) text-sm focus:outline-none focus:border-(--color-brand-primary)/60 focus:ring-2 focus:ring-(--color-brand-primary)/20 transition-colors disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-(--color-text-secondary) mb-2 uppercase tracking-wider">
                        Geri Bildirim
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        disabled={status === "loading"}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Seçtiğiniz modüller hakkında önerilerinizi yazın..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-(--color-text-muted) text-sm focus:outline-none focus:border-(--color-brand-primary)/60 focus:ring-2 focus:ring-(--color-brand-primary)/20 transition-colors resize-none disabled:opacity-60"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">Bir hata oluştu: {errorMessage || "Lütfen tekrar deneyin."}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={selectedItems.length === 0 || status === "loading"}
                      className="mt-2 h-12 rounded-full bg-(--color-brand-primary) hover:bg-(--color-brand-primary-hover) disabled:bg-white/5 disabled:text-white/40 disabled:cursor-not-allowed text-white font-semibold shadow-(--shadow-glow-primary) transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Gönderiliyor…</span>
                        </>
                      ) : (
                        <span>Formu Gönder</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
