"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import contactData from "@/data/contact.json";
import { submitForm } from "@/lib/forms";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      Ad: String(formData.get("firstName") ?? ""),
      Soyad: String(formData.get("lastName") ?? ""),
      "E-posta": String(formData.get("email") ?? ""),
      Telefon: String(formData.get("phone") ?? ""),
      Mesaj: String(formData.get("message") ?? ""),
    };

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("İletişim", data);
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
      className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-(--color-brand-primary)/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-linear-to-r from-(--color-brand-primary) to-transparent"></span>
          {contactData.contactForm.title}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                Ad <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                disabled={status === "loading"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                Soyad <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                disabled={status === "loading"}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
              E-Posta <span className="text-(--color-accent-red-light)">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Firma e-posta adresiniz"
              required
              disabled={status === "loading"}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
              Telefon <span className="text-(--color-accent-red-light)">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="05XX XXX XX XX"
              required
              disabled={status === "loading"}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-(--color-text-secondary)">
              Mesaj
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              disabled={status === "loading"}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all resize-none disabled:opacity-60"
            ></textarea>
          </div>

          {status === "success" && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-(--color-accent-emerald-light)">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Mesajınız ulaştı. En kısa sürede dönüş yapacağız.</span>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Bir hata oluştu: {errorMessage || "Lütfen tekrar deneyin."}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-14 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gönderiliyor…</span>
              </>
            ) : (
              <>
                <span>{contactData.contactForm.buttonText}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
