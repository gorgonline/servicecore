"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import partnerData from "@/data/partner-kayit.json";
import { submitForm } from "@/lib/forms";
import { useFormGuard } from "@/hooks/useFormGuard";

// Basari durumu artik /tesekkurler?from=partner redirect ile yonetiliyor — "success" stati state'te yok.
// "invalid" = eksik zorunlu secim (gonderim hic denenmedi), "error" = sunucu/ag hatasi.
type Status = "idle" | "loading" | "invalid" | "error";

interface PartnerField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: string[];
}

interface PartnerSection {
  id: string;
  icon: string;
  title: string;
  description: string;
  fields: PartnerField[];
}

const inputClass =
  "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60";

export function PartnerKayitForm() {
  const { submit } = partnerData;
  const sections = partnerData.sections as PartnerSection[];

  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldState, setFieldState] = useState<Record<string, string>>({});
  const [missingIds, setMissingIds] = useState<string[]>([]);
  const guard = useFormGuard();

  // Zorunlu radyo gruplari tarayicinin native dogrulamasina takilmaz (gercek bir
  // form kontrolu degiller) — bu yuzden gonderimde elle kontrol edilirler.
  const requiredRadios = sections.flatMap((section) =>
    section.fields.filter((field) => field.type === "radio" && field.required),
  );

  function setField(id: string, value: string) {
    setFieldState((prev) => ({ ...prev, [id]: value }));
    setMissingIds((prev) => prev.filter((missingId) => missingId !== id));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const missing = requiredRadios.filter((field) => !(fieldState[field.id] ?? "").trim());
    if (missing.length > 0) {
      setMissingIds(missing.map((field) => field.id));
      setStatus("invalid");
      setErrorMessage(
        missing.length === 1
          ? `"${missing[0].label}" alanında bir seçim yapmanız gerekiyor.`
          : `${missing.length} zorunlu seçim eksik: ${missing.map((field) => field.label).join(", ")}.`,
      );

      const target = document.getElementById(`alan-${missing[0].id}`);
      if (target) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
      return;
    }

    setMissingIds([]);

    const data: Record<string, string> = {};
    for (const section of sections) {
      for (const field of section.fields) {
        data[`${section.title} — ${field.label}`] = fieldState[field.id] ?? "";
      }
    }

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("Register", data, guard.collect());
    if (result.ok) {
      router.push("/tesekkurler?from=partner");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  const disabled = status === "loading";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.15 }}
      className="space-y-8"
    >
      {guard.field}
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden scroll-mt-28"
        >
          <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-br from-(--color-brand-accent)/6 to-transparent rounded-br-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-8">
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/30 text-(--color-brand-accent) text-base font-mono font-semibold">
                {section.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {section.fields.map((field) => {
                const value = fieldState[field.id] ?? "";

                if (field.type === "radio") {
                  const missing = missingIds.includes(field.id);
                  return (
                    <div
                      key={field.id}
                      id={`alan-${field.id}`}
                      className={`space-y-3 scroll-mt-28 ${
                        missing ? "rounded-2xl border border-red-500/30 bg-red-500/5 p-4 -m-1" : ""
                      }`}
                    >
                      <label id={`etiket-${field.id}`} className="block text-sm font-medium text-white">
                        {field.label}
                        {field.required && <span className="text-(--color-accent-red-light) ml-1">*</span>}
                      </label>
                      {field.hint && (
                        <p className="text-xs text-(--color-text-muted) -mt-2 mb-2">{field.hint}</p>
                      )}
                      <div
                        role="radiogroup"
                        aria-labelledby={`etiket-${field.id}`}
                        aria-required={field.required}
                        aria-invalid={missing}
                        className="flex flex-wrap gap-2"
                      >
                        {(field.options ?? []).map((opt) => {
                          const selected = value === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              role="radio"
                              aria-checked={selected}
                              onClick={() => setField(field.id, opt)}
                              disabled={disabled}
                              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                selected
                                  ? "bg-(--color-brand-primary)/15 border-(--color-brand-primary)/60 text-white"
                                  : missing
                                    ? "bg-white/2 border-red-500/40 text-(--color-text-secondary) hover:border-red-500/70"
                                    : "bg-white/2 border-white/10 text-(--color-text-secondary) hover:border-white/30"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {missing && (
                        <p className="flex items-center gap-2 text-xs font-medium text-(--color-accent-red-light)">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          Bu alan zorunlu — bir seçenek işaretleyin.
                        </p>
                      )}
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="block text-sm font-medium text-white">
                        {field.label}
                        {field.required && <span className="text-(--color-accent-red-light) ml-1">*</span>}
                      </label>
                      {field.hint && (
                        <p className="text-xs text-(--color-text-muted)">{field.hint}</p>
                      )}
                      <textarea
                        id={field.id}
                        rows={4}
                        required={field.required}
                        value={value}
                        onChange={(e) => setField(field.id, e.target.value)}
                        disabled={disabled}
                        placeholder={field.placeholder ?? ""}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  );
                }

                const inputType =
                  field.type === "email"
                    ? "email"
                    : field.type === "tel"
                      ? "tel"
                      : field.type === "number"
                        ? "number"
                        : "text";

                return (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-sm font-medium text-white">
                      {field.label}
                      {field.required && <span className="text-(--color-accent-red-light) ml-1">*</span>}
                    </label>
                    {field.hint && (
                      <p className="text-xs text-(--color-text-muted)">{field.hint}</p>
                    )}
                    <input
                      id={field.id}
                      type={inputType}
                      required={field.required}
                      min={field.type === "number" ? 0 : undefined}
                      value={value}
                      onChange={(e) => setField(field.id, e.target.value)}
                      disabled={disabled}
                      placeholder={field.placeholder ?? ""}
                      className={inputClass}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <div className="space-y-4">
        {(status === "error" || status === "invalid") && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm font-medium leading-relaxed">
              {status === "invalid"
                ? errorMessage
                : `${submit.errorPrefix}: ${errorMessage || "Lütfen tekrar deneyin."}`}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-14 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{submit.loading}</span>
            </>
          ) : (
            <>
              <span>{submit.label}</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
