"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import analizData from "@/data/analiz.json";
import { submitForm } from "@/lib/forms";

// Basari durumu artik /tesekkurler?from=analiz redirect ile yonetiliyor — "success" stati state'te yok.
type Status = "idle" | "loading" | "error";

type ContactState = {
  firma: string;
  adSoyad: string;
  unvan: string;
  eposta: string;
  telefon: string;
};

type FieldState = Record<string, string>;
type SubState = { kullanilacak: string; adet: string };
type ModuleState = Record<string, SubState>;
type AddonState = Record<string, SubState>;

interface AnalizField {
  id: string;
  label: string;
  type: string;
  hint?: string;
  placeholder?: string;
  options?: string[];
  countLabel?: string;
}

interface AnalizSection {
  id: string;
  icon: string;
  title: string;
  description: string;
  fields: AnalizField[];
}

const inputClass =
  "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60";

export function AnalizForm() {
  const { contact, notes, submit, page } = analizData;
  const sections = analizData.sections as AnalizSection[];

  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [contactState, setContactState] = useState<ContactState>({
    firma: "",
    adSoyad: "",
    unvan: "",
    eposta: "",
    telefon: "",
  });
  const [fieldState, setFieldState] = useState<FieldState>({});
  const [moduleState, setModuleState] = useState<ModuleState>({});
  const [addonState, setAddonState] = useState<AddonState>({});
  const [notesValue, setNotesValue] = useState<string>("");

  function setContact<K extends keyof ContactState>(key: K, value: string) {
    setContactState((prev) => ({ ...prev, [key]: value }));
  }
  function setField(id: string, value: string) {
    setFieldState((prev) => ({ ...prev, [id]: value }));
  }
  function setModule(id: string, partial: Partial<SubState>) {
    setModuleState((prev) => {
      const current: SubState = prev[id] ?? { kullanilacak: "", adet: "" };
      return { ...prev, [id]: { ...current, ...partial } };
    });
  }
  function setAddon(id: string, partial: Partial<SubState>) {
    setAddonState((prev) => {
      const current: SubState = prev[id] ?? { kullanilacak: "", adet: "" };
      return { ...prev, [id]: { ...current, ...partial } };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const data: Record<string, string> = {
      "Firma İsmi": contactState.firma,
      "Ad Soyad": contactState.adSoyad,
      "Ünvan": contactState.unvan,
      "E-posta": contactState.eposta,
      "Telefon": contactState.telefon,
    };

    for (const section of sections) {
      for (const field of section.fields) {
        const label = field.label;
        if (field.type === "module" || field.type === "yesno_count") {
          const state =
            field.type === "module"
              ? moduleState[field.id]
              : addonState[field.id];
          const used = state?.kullanilacak ?? "";
          const count = state?.adet ?? "";
          data[`${section.title} — ${label}`] = used
            ? `${used}${count ? ` (${count})` : ""}`
            : "";
        } else if (field.type === "yesno") {
          data[`${section.title} — ${label}`] = addonState[field.id]?.kullanilacak ?? "";
        } else {
          data[`${section.title} — ${label}`] = fieldState[field.id] ?? "";
        }
      }
    }

    data["Ek Notlar"] = notesValue;

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("Analiz", data);
    if (result.ok) {
      router.push("/tesekkurler?from=analiz");
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
      {/* İletişim */}
      <div className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-(--color-brand-primary)/8 to-transparent rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-linear-to-r from-(--color-brand-primary) to-transparent" />
            <span className="text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase">
              {contact.subtitle}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-8">
            {contact.title}
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="firma" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                {contact.fields.firma} <span className="text-(--color-accent-red-light)">*</span>
              </label>
              <input
                id="firma"
                type="text"
                required
                value={contactState.firma}
                onChange={(e) => setContact("firma", e.target.value)}
                disabled={disabled}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="adSoyad" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                  {contact.fields.adSoyad} <span className="text-(--color-accent-red-light)">*</span>
                </label>
                <input
                  id="adSoyad"
                  type="text"
                  required
                  value={contactState.adSoyad}
                  onChange={(e) => setContact("adSoyad", e.target.value)}
                  disabled={disabled}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="unvan" className="text-sm font-medium text-(--color-text-secondary)">
                  {contact.fields.unvan}
                </label>
                <input
                  id="unvan"
                  type="text"
                  value={contactState.unvan}
                  onChange={(e) => setContact("unvan", e.target.value)}
                  disabled={disabled}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="eposta" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                  {contact.fields.eposta} <span className="text-(--color-accent-red-light)">*</span>
                </label>
                <input
                  id="eposta"
                  type="email"
                  required
                  value={contactState.eposta}
                  onChange={(e) => setContact("eposta", e.target.value)}
                  disabled={disabled}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="telefon" className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1">
                  {contact.fields.telefon} <span className="text-(--color-accent-red-light)">*</span>
                </label>
                <input
                  id="telefon"
                  type="tel"
                  required
                  value={contactState.telefon}
                  onChange={(e) => setContact("telefon", e.target.value)}
                  disabled={disabled}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bölümler */}
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
                if (field.type === "module") {
                  const state = moduleState[field.id] ?? { kullanilacak: "", adet: "" };
                  const aktif = state.kullanilacak === "Evet";
                  return (
                    <div key={field.id} className="rounded-2xl border border-white/5 bg-black/10 p-5">
                      <p className="text-sm font-medium text-white mb-4">
                        {field.label} kullanılacak mı?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-wrap gap-2">
                          {["Evet", "Hayır"].map((opt) => {
                            const selected = state.kullanilacak === opt;
                            return (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setModule(field.id, { kullanilacak: opt })}
                                disabled={disabled}
                                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                  selected
                                    ? "bg-(--color-brand-primary)/15 border-(--color-brand-primary)/60 text-white"
                                    : "bg-white/2 border-white/10 text-(--color-text-secondary) hover:border-white/30"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-(--color-text-muted) mb-2">
                            Kaç adet?
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={state.adet}
                            onChange={(e) => setModule(field.id, { adet: e.target.value })}
                            disabled={disabled || !aktif}
                            placeholder={aktif ? "Örn. 5" : "Önce 'Evet' seçin"}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                if (field.type === "yesno") {
                  const state = addonState[field.id] ?? { kullanilacak: "", adet: "" };
                  return (
                    <div key={field.id} className="rounded-2xl border border-white/5 bg-black/10 p-5">
                      <p className="text-sm font-medium text-white mb-4">
                        {field.label} kullanılacak mı?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Evet", "Hayır"].map((opt) => {
                          const selected = state.kullanilacak === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setAddon(field.id, { kullanilacak: opt })}
                              disabled={disabled}
                              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                selected
                                  ? "bg-(--color-brand-primary)/15 border-(--color-brand-primary)/60 text-white"
                                  : "bg-white/2 border-white/10 text-(--color-text-secondary) hover:border-white/30"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if (field.type === "yesno_count") {
                  const state = addonState[field.id] ?? { kullanilacak: "", adet: "" };
                  const aktif = state.kullanilacak === "Evet";
                  return (
                    <div key={field.id} className="rounded-2xl border border-white/5 bg-black/10 p-5">
                      <p className="text-sm font-medium text-white mb-4">
                        {field.label} kullanılacak mı?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-wrap gap-2">
                          {["Evet", "Hayır"].map((opt) => {
                            const selected = state.kullanilacak === opt;
                            return (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setAddon(field.id, { kullanilacak: opt })}
                                disabled={disabled}
                                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                  selected
                                    ? "bg-(--color-brand-primary)/15 border-(--color-brand-primary)/60 text-white"
                                    : "bg-white/2 border-white/10 text-(--color-text-secondary) hover:border-white/30"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-(--color-text-muted) mb-2">
                            {field.countLabel ?? "Adet"}
                          </label>
                          <input
                            type="text"
                            value={state.adet}
                            onChange={(e) => setAddon(field.id, { adet: e.target.value })}
                            disabled={disabled || !aktif}
                            placeholder={aktif ? "Örn. 2 sunucu" : "Önce 'Evet' seçin"}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                if (field.type === "radio") {
                  const value = fieldState[field.id] ?? "";
                  return (
                    <div key={field.id} className="space-y-3">
                      <label className="block text-sm font-medium text-white">
                        {field.label}
                      </label>
                      {field.hint && (
                        <p className="text-xs text-(--color-text-muted) -mt-2 mb-2">{field.hint}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {(field.options ?? []).map((opt) => {
                          const selected = value === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setField(field.id, opt)}
                              disabled={disabled}
                              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                selected
                                  ? "bg-(--color-brand-primary)/15 border-(--color-brand-primary)/60 text-white"
                                  : "bg-white/2 border-white/10 text-(--color-text-secondary) hover:border-white/30"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="block text-sm font-medium text-white">
                        {field.label}
                      </label>
                      {field.hint && (
                        <p className="text-xs text-(--color-text-muted)">{field.hint}</p>
                      )}
                      <textarea
                        id={field.id}
                        rows={3}
                        value={fieldState[field.id] ?? ""}
                        onChange={(e) => setField(field.id, e.target.value)}
                        disabled={disabled}
                        placeholder={field.placeholder ?? ""}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  );
                }

                if (field.type === "number") {
                  return (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="block text-sm font-medium text-white">
                        {field.label}
                      </label>
                      {field.hint && (
                        <p className="text-xs text-(--color-text-muted)">{field.hint}</p>
                      )}
                      <input
                        id={field.id}
                        type="number"
                        min={0}
                        value={fieldState[field.id] ?? ""}
                        onChange={(e) => setField(field.id, e.target.value)}
                        disabled={disabled}
                        placeholder={field.placeholder ?? ""}
                        className={inputClass}
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-sm font-medium text-white">
                      {field.label}
                    </label>
                    {field.hint && (
                      <p className="text-xs text-(--color-text-muted)">{field.hint}</p>
                    )}
                    <input
                      id={field.id}
                      type="text"
                      value={fieldState[field.id] ?? ""}
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

      {/* Notlar */}
      <div className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10">
        <label htmlFor="ek-notlar" className="block text-sm font-medium text-white mb-3">
          {notes.label}
        </label>
        <textarea
          id="ek-notlar"
          rows={4}
          value={notesValue}
          onChange={(e) => setNotesValue(e.target.value)}
          disabled={disabled}
          placeholder={notes.placeholder}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Status & Submit */}
      <div className="space-y-4">
        {status === "error" && (
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm font-medium leading-relaxed">
              {submit.errorPrefix}: {errorMessage || "Lütfen tekrar deneyin."}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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
          <p className="text-xs text-(--color-text-muted) font-light leading-relaxed">
            {page.description.split(".")[0]}.
          </p>
        </div>
      </div>
    </motion.form>
  );
}
