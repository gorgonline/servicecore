"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitForm, type FormSheet } from "@/lib/forms";

type Status = "idle" | "loading" | "success" | "error";

export default function PrivacyContact({ sheet = "İletişim" }: { sheet?: FormSheet }) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    if (!email.trim() || !message.trim()) return;

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm(sheet, {
      "E-posta": email.trim(),
      Mesaj: message.trim(),
      "Sayfa Kaynağı": pathname || "/",
    });

    if (result.ok) {
      setStatus("success");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  const disabled = status === "loading";

  return (
    <div className="container mx-auto px-6 lg:px-12 pb-40 max-w-7xl">
      <motion.div
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-linear-to-br from-(--color-brand-primary) to-(--color-brand-purple) p-1 md:p-px"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-full flex flex-col items-center justify-center text-center rounded-[23px] bg-(--color-surface-elevated-solid)/90 backdrop-blur-3xl px-8 py-16 md:px-12">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 mx-auto">
              <MessageSquare className="w-4 h-4 text-(--color-accent-cyan-light)" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">İletişim</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Sorularınız mı var?
            </h3>

            <p className="text-base md:text-lg text-(--color-text-overline) font-light leading-relaxed mb-10 max-w-xl mx-auto">
              E-posta adresinizi ve sorunuzu bırakın, uzman ekibimiz en kısa sürede dönüş yapsın.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="flex flex-col md:flex-row gap-3">
                {/* E-posta */}
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disabled}
                    placeholder="İş e-postanız"
                    className="w-full bg-black/30 border border-white/15 rounded-xl pl-11 pr-4 h-12 text-white placeholder:text-(--color-text-secondary) focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
                  />
                </div>

                {/* Mesaj */}
                <div className="relative flex-1">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-muted) pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={disabled}
                    placeholder="Mesajınız"
                    className="w-full bg-black/30 border border-white/15 rounded-xl pl-11 pr-4 h-12 text-white placeholder:text-(--color-text-secondary) focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-(--color-accent-emerald-light)">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">Mesajınız alındı. En kısa sürede dönüş yapacağız.</span>
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
                disabled={disabled}
                className="w-full inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-12 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {disabled ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gönderiliyor…</span>
                  </>
                ) : (
                  <>
                    <span>Gönder</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-8 text-(--color-text-muted) mt-8">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                Hızlı Yanıt
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-blue-base) shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Uzman Destek
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-base) shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                7/24 Erişim
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
