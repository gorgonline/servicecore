"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { submitForm } from "@/lib/forms";
import { useFormGuard } from "@/hooks/useFormGuard";

type Status = "idle" | "loading" | "error";

const INPUT_CLS =
  "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-(--color-border-active) focus:border-(--color-border-active) transition-all disabled:opacity-60";

const DATE_CLS = `${INPUT_CLS} [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert`;

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-(--color-text-secondary) flex items-center gap-1"
      >
        {label} <span className="text-(--color-accent-red-light)">*</span>
      </label>
      {children}
    </div>
  );
}

export function PocForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const guard = useFormGuard();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      "Kurum Adı": String(fd.get("kurum") ?? ""),
      "Yetkili Ad Soyad": String(fd.get("yetkili") ?? ""),
      "E-posta": String(fd.get("eposta") ?? ""),
      Telefon: String(fd.get("telefon") ?? ""),
      "PoC Başlangıç Tarihi": String(fd.get("baslangic") ?? ""),
      "PoC Bitiş Tarihi": String(fd.get("bitis") ?? ""),
      "Satın Alma Taahhüt Tarihi": String(fd.get("satinalma") ?? ""),
      "Canlıya Geçiş Hedef Tarihi": String(fd.get("canliya_gecis") ?? ""),
      "Kapsam (MUST Koşullar)": String(fd.get("kapsam") ?? ""),
      "Satın Alma ve Efor Bedeli Taahhüdü": fd.get("taahhut") ? "Kabul edildi" : "",
      "Gizlilik Sözleşmesi Onayı": fd.get("gizlilik") ? "Okudum, kabul ediyorum" : "",
    };

    setStatus("loading");
    setErrorMessage("");
    const result = await submitForm("PoC", data, guard.collect());
    if (result.ok) {
      router.push("/tesekkurler?from=poc");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {guard.field}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="kurum" label="Kurum Adı">
          <input type="text" id="kurum" name="kurum" required disabled={status === "loading"} className={INPUT_CLS} />
        </Field>
        <Field id="yetkili" label="Yetkili Ad Soyad">
          <input type="text" id="yetkili" name="yetkili" required disabled={status === "loading"} className={INPUT_CLS} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="eposta" label="Kurumsal E-posta">
          <input type="email" id="eposta" name="eposta" placeholder="ad.soyad@kurum.com" required disabled={status === "loading"} className={INPUT_CLS} />
        </Field>
        <Field id="telefon" label="Telefon">
          <input type="tel" id="telefon" name="telefon" placeholder="0 (5xx) xxx xx xx" required disabled={status === "loading"} className={INPUT_CLS} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="baslangic" label="PoC Başlangıç Tarihi">
          <input type="date" id="baslangic" name="baslangic" required disabled={status === "loading"} className={DATE_CLS} />
        </Field>
        <Field id="bitis" label="PoC Bitiş Tarihi">
          <input type="date" id="bitis" name="bitis" required disabled={status === "loading"} className={DATE_CLS} />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field id="satinalma" label="Satın Alma Taahhüt Tarihi">
          <input type="date" id="satinalma" name="satinalma" required disabled={status === "loading"} className={DATE_CLS} />
        </Field>
        <Field id="canliya_gecis" label="Canlıya Geçiş Hedef Tarihi">
          <input type="date" id="canliya_gecis" name="canliya_gecis" required disabled={status === "loading"} className={DATE_CLS} />
        </Field>
      </div>

      <Field id="kapsam" label="PoC Kapsamı — MUST Koşullar">
        <textarea
          id="kapsam"
          name="kapsam"
          rows={6}
          required
          disabled={status === "loading"}
          placeholder={"Kabul için üründe gösterilmesi zorunlu (MUST) maddeleri satır satır yazınız.\nÖrn: 1) AD entegrasyonu ile kullanıcıların içeri alınması  2) E-posta kanalından otomatik kayıt açılması  3) ..."}
          className={INPUT_CLS}
        />
      </Field>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/3 p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="taahhut"
            required
            disabled={status === "loading"}
            className="mt-1 h-4 w-4 shrink-0 accent-(--color-brand-primary)"
          />
          <span className="text-sm text-white/85 leading-relaxed">
            Yukarıda tanımlı kapsamın (MUST koşulların) PoC çalışmasında
            ispatlanması durumunda ürünü satın almayı taahhüt ediyoruz; satın
            almamamız hâlinde PoC efor bedelini ödemeyi kabul ediyoruz.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="gizlilik"
            required
            disabled={status === "loading"}
            className="mt-1 h-4 w-4 shrink-0 accent-(--color-brand-primary)"
          />
          <span className="text-sm text-white/85 leading-relaxed">
            <Link href="/gizlilik" className="underline hover:text-white" target="_blank">
              Gizlilik Sözleşmesi
            </Link>
            &apos;ni okudum, kabul ediyorum. (Kurulum öncesinde Servicecore
            Gizlilik Sözleşmesi ayrıca ıslak imza ile imzalanır.)
          </span>
        </label>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-(--color-accent-red-light)">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="text-sm font-medium">
            Bir hata oluştu: {errorMessage || "Lütfen tekrar deneyin."}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-(--color-brand-primary) hover:bg-(--color-brand-primary)/90 text-white font-semibold px-8 h-14 rounded-full transition-all hover:shadow-(--shadow-glow-primary-weak) group mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Gönderiliyor…</span>
          </>
        ) : (
          <>
            <span>Yerinde PoC Başvurusunu Gönder</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
