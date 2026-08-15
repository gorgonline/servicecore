"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import partnerData from "@/data/partner-kayit.json";
import { submitForm } from "@/lib/forms";
import { isLikelyBot } from "@/lib/form-guard";
import {
  ZOHO_CAPTCHA_URL,
  buildZohoLeadPayload,
  submitZohoWebToLead,
  zohoMaxLength,
} from "@/lib/zoho-web-to-lead";
import { useFormGuard } from "@/hooks/useFormGuard";

// Basari durumu Zoho'nun returnURL yonlendirmesiyle (/tesekkurler?from=partner) yonetiliyor.
// "invalid" = eksik/bos zorunlu alan (gonderim denenmedi), "error" = Zoho navigasyonu gerceklesmedi (bekci sayaci).
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

function formatMessage(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

function scrollToInvalid(elementId: string) {
  const target = document.getElementById(elementId);
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
}

export function PartnerKayitForm() {
  const { submit, captcha, validation } = partnerData;
  const sections = partnerData.sections as PartnerSection[];

  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldState, setFieldState] = useState<Record<string, string>>({});
  const [missingIds, setMissingIds] = useState<string[]>([]);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState(ZOHO_CAPTCHA_URL);
  const guard = useFormGuard();
  const unmountedRef = useRef(false);
  const zohoWatchdogRef = useRef<number | null>(null);

  function reloadCaptcha() {
    setCaptchaUrl(`${ZOHO_CAPTCHA_URL}&d=${Date.now()}`);
  }

  // İki yaşam döngüsü işi: (1) bfcache'ten dönüşte (Zoho'ya gidip tarayıcı geri
  // tuşuyla dönülürse) buton kilidi açılır ve tüketilmiş captcha yenilenir ki
  // kazara ikinci bir POST oluşmasın; (2) unmount/pagehide'da navigasyon bekçisi
  // susturulur ve unmount işaretlenir ki bekleyen gönderim, sayfadan ayrılan
  // kullanıcıyı Zoho'ya POST'lamasın.
  useEffect(() => {
    unmountedRef.current = false;

    function clearWatchdog() {
      if (zohoWatchdogRef.current !== null) {
        window.clearTimeout(zohoWatchdogRef.current);
        zohoWatchdogRef.current = null;
      }
    }
    function handlePageShow(event: PageTransitionEvent) {
      if (!event.persisted) return;
      clearWatchdog();
      setStatus("idle");
      setCaptchaCode("");
      setCaptchaUrl(`${ZOHO_CAPTCHA_URL}&d=${Date.now()}`);
    }
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", clearWatchdog);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", clearWatchdog);
      clearWatchdog();
      unmountedRef.current = true;
    };
  }, []);

  // Zorunlu radyo gruplari tarayicinin native dogrulamasina takilmaz (gercek bir
  // form kontrolu degiller) — bu yuzden gonderimde elle kontrol edilirler.
  const requiredRadios = sections.flatMap((section) =>
    section.fields.filter((field) => field.type === "radio" && field.required),
  );

  function setField(id: string, value: string) {
    setFieldState((prev) => ({ ...prev, [id]: value }));
    setMissingIds((prev) => prev.filter((missingId) => missingId !== id));
  }

  // WAI-ARIA radyo deseni: grupta tek tabbable öğe bulunur, seçim ok tuşlarıyla
  // gezinir — role="radio" bunu vaat ettiği için klavye desteği şart.
  function handleRadioKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    field: PartnerField,
    index: number,
  ) {
    const options = field.options ?? [];
    let nextIndex: number;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + options.length) % options.length;
    } else {
      return;
    }
    e.preventDefault();
    setField(field.id, options[nextIndex]);
    const next = e.currentTarget.parentElement?.children[nextIndex];
    if (next instanceof HTMLButtonElement) next.focus();
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
          ? formatMessage(validation.radioSingle, { label: missing[0].label })
          : formatMessage(validation.radioMultiple, {
              count: String(missing.length),
              labels: missing.map((field) => field.label).join(", "),
            }),
      );
      scrollToInvalid(`alan-${missing[0].id}`);
      return;
    }

    setMissingIds([]);

    // Native required boşluk karakterini dolu sayar; Zoho ise değeri trimleyip
    // boş bulursa gönderimi kendi hata sayfasıyla reddeder. Zorunlu alanlar bu
    // yüzden gönderim öncesi trimlenmiş değerle bir kez daha kontrol edilir.
    for (const section of sections) {
      for (const field of section.fields) {
        if (!field.required || field.type === "radio") continue;
        if ((fieldState[field.id] ?? "").trim()) continue;
        setStatus("invalid");
        setErrorMessage(formatMessage(validation.requiredField, { label: field.label }));
        scrollToInvalid(field.id);
        return;
      }
    }

    if (!captchaCode.trim()) {
      setStatus("invalid");
      setErrorMessage(captcha.required);
      scrollToInvalid("alan-captcha");
      return;
    }

    const data: Record<string, string> = {};
    for (const section of sections) {
      for (const field of section.fields) {
        data[`${section.title} — ${field.label}`] = fieldState[field.id] ?? "";
      }
    }

    setStatus("loading");
    setErrorMessage("");

    const guardData = guard.collect();
    // Bot şüphesinde önceki davranış korunur: hiçbir uca gönderim yapılmaz,
    // bota sessizce başarı sinyali verilir.
    if (isLikelyBot(guardData)) {
      router.push("/tesekkurler?from=partner");
      return;
    }

    // Yedek kayıt: mevcut Google Sheets akışı korunuyor. Birincil kayıt artık
    // Zoho olduğu için buradaki sonuç ne olursa olsun gönderim sürer; Sheets
    // ucu yanıt vermezse Zoho gönderimi en fazla 5 sn gecikir (fetch keepalive
    // olduğu için istek navigasyondan sonra da tamamlanır).
    await Promise.race([
      submitForm("Register", data, guardData),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);

    // Bekleme sırasında kullanıcı client-side navigasyonla sayfadan ayrıldıysa
    // gönderim iptal — ayrılan kullanıcı Zoho'ya zorla POST'lanmamalı.
    if (unmountedRef.current) return;

    // Tam sayfa POST — Zoho lead'i oluşturur ve tarayıcıyı returnURL'e
    // yönlendirir; bu satırdan sonra sayfa yaşam döngüsü Zoho'ya geçer.
    submitZohoWebToLead(buildZohoLeadPayload(fieldState), captchaCode);

    // Navigasyon hiç gerçekleşmezse (ör. istekleri kesen bir tarayıcı eklentisi)
    // sayfa kilitli kalmasın: süre dolunca hata durumuna dönülür. Gerçek
    // navigasyonda sayaç pagehide dinleyicisiyle temizlenir.
    zohoWatchdogRef.current = window.setTimeout(() => {
      if (unmountedRef.current) return;
      setStatus("error");
      setErrorMessage(validation.zohoFailed);
      setCaptchaCode("");
      setCaptchaUrl(`${ZOHO_CAPTCHA_URL}&d=${Date.now()}`);
    }, 15000);
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
                        {(field.options ?? []).map((opt, optIndex) => {
                          const selected = value === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              role="radio"
                              aria-checked={selected}
                              tabIndex={selected || (!value && optIndex === 0) ? 0 : -1}
                              onClick={() => setField(field.id, opt)}
                              onKeyDown={(e) => handleRadioKeyDown(e, field, optIndex)}
                              disabled={disabled}
                              className={`cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 rounded-full text-sm font-medium transition-all border ${
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
                          {validation.radioOption}
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

                // Zoho'nun alan sınırı aşılırsa değer CRM tarafında kırpılır —
                // sınır burada input'a uygulanır (number'da hane sayısı üst sınırdır).
                const limit = zohoMaxLength(field.id);

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
                      max={
                        field.type === "number" && limit !== undefined ? 10 ** limit - 1 : undefined
                      }
                      maxLength={field.type === "number" ? undefined : limit}
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

      {/* Bilinen kısıt: Zoho captcha yalnızca görsel modalite sunar (üreticide
          sesli/metinsel alternatif yok) — ekran okuyucu kullanıcıları için tam
          çözüm Zoho form yapılandırmasında captcha'yı kapatmaktır. */}
      <section
        id="alan-captcha"
        className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 relative overflow-hidden scroll-mt-28"
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-br from-(--color-brand-accent)/6 to-transparent rounded-br-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-8">
            <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/30 text-(--color-brand-accent) text-base font-mono font-semibold">
              {captcha.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">
                {captcha.title}
              </h3>
              <p className="text-sm text-(--color-text-secondary) font-light leading-relaxed">
                {captcha.description}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="enterdigest" className="block text-sm font-medium text-white">
              {captcha.label}
              <span className="text-(--color-accent-red-light) ml-1">*</span>
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3 shrink-0">
                <Image
                  src={captchaUrl}
                  alt={captcha.imageAlt}
                  width={220}
                  height={60}
                  unoptimized
                  className="h-12 w-auto rounded-xl border border-white/10 bg-white"
                />
                <button
                  type="button"
                  onClick={reloadCaptcha}
                  disabled={disabled}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/2 border border-white/10 text-(--color-text-secondary) hover:border-white/30 hover:text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="w-4 h-4" />
                  {captcha.reload}
                </button>
              </div>
              <input
                id="enterdigest"
                type="text"
                required
                maxLength={10}
                value={captchaCode}
                onChange={(e) => setCaptchaCode(e.target.value)}
                disabled={disabled}
                placeholder={captcha.placeholder}
                autoComplete="off"
                className={`${inputClass} sm:max-w-60`}
              />
            </div>
            <p className="text-xs text-(--color-text-muted)">{captcha.hint}</p>
          </div>
        </div>
      </section>

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
