"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import demoData from "@/data/demo.json";
import { submitForm } from "@/lib/forms";
import { useFormGuard } from "@/hooks/useFormGuard";

// Basari durumu artik /tesekkurler?from=demo redirect ile yonetiliyor — "success" stati state'te yok.
type Status = "idle" | "loading" | "error";

export function DemoForm() {
  const { form_section } = demoData;
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const guard = useFormGuard();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      Ad: String(formData.get("ad") ?? ""),
      Soyad: String(formData.get("soyad") ?? ""),
      "E-posta": String(formData.get("eposta") ?? ""),
      Telefon: String(formData.get("telefon") ?? ""),
      "Toplantı Günü": String(formData.get("tarih") ?? ""),
      "Toplantı Saati": String(formData.get("saat") ?? ""),
    };

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("Demo", data, guard.collect());
    if (result.ok) {
      router.push("/tesekkurler?from=demo");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-(--color-brand-primary)/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-linear-to-r from-(--color-brand-primary) to-transparent"></span>
          {form_section.title}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {guard.field}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="ad" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[0].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="ad"
                name="ad"
                required
                disabled={status === "loading"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="soyad" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[1].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="soyad"
                name="soyad"
                required
                disabled={status === "loading"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="eposta" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[2].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="email"
                id="eposta"
                name="eposta"
                placeholder={form_section.fields[2].placeholder}
                required
                disabled={status === "loading"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="telefon" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[3].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                placeholder={form_section.fields[3].placeholder}
                required
                disabled={status === "loading"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="tarih" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[4].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="tarih"
                  name="tarih"
                  required
                  disabled={status === "loading"}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="saat" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {form_section.fields[5].label} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="saat"
                  name="saat"
                  required
                  disabled={status === "loading"}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Bir hata oluştu: {errorMessage || "Lütfen tekrar deneyin."}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-14 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) group mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gönderiliyor…</span>
              </>
            ) : (
              <>
                <span>{form_section.submit_button.text}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
