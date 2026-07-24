import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Cloud,
  FileSignature,
  FileText,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import PrivacyContact from "@/components/ui/privacy-contact";
import { PocForm } from "@/components/ui/poc-form";

export const metadata: Metadata = {
  title: "PoC Süreci — Online PoC ve Yerinde PoC | ServiceCore",
  description:
    "ServiceCore'u satın almadan önce deneyin: aynı gün teslim edilen size özel Online PoC ortamı veya üst yönetim taahhüdüyle yürütülen Yerinde PoC süreci ve başvuru formu.",
};

const ONLINE_MADDELER = [
  "Size özel adres: kurumadi.servicecore.app — erişim yalnızca sizde",
  "Kendi senaryolarınız kurulur, kendi hızınızda denersiniz",
  "Başvuru formu, taahhüt, NDA, VPN, sunucu hazırlığı GEREKMEZ",
  "Talebinizi ekibimize iletmeniz yeterli — kurulum aynı gün teslim edilir",
];

const YERINDE_ADIMLAR = [
  {
    icon: ClipboardList,
    title: "1. Sistem Gereksinimleri",
    desc: "Servicecore PoC Talep ve Takip Formu'ndaki sistem gereksinimleri (sunucu, VPN erişimi, DNS/SSL) müşteri tarafından temin edilir.",
  },
  {
    icon: Lock,
    title: "2. Gizlilik Sözleşmesi",
    desc: "Müşteri ortamına kurulum öncesi Servicecore Gizlilik Sözleşmesi imzalanır — iki tarafın bilgisi de koruma altına alınır.",
  },
  {
    icon: FileText,
    title: "3. Kapsam Çalışması",
    desc: "Müşteri senaryoları alınarak PoC Kapsam Dokümanı hazırlanır: kabul için üründe gösterilmesi zorunlu (MUST) koşullar madde madde netleştirilir.",
  },
  {
    icon: FileSignature,
    title: "4. Niyet Mektubu (LOI)",
    desc: "Kapsamdaki çalışmanın gösterilmesi durumunda satın alımın gerçekleşeceğini belirten Niyet Mektubu imzalanır — PoC çalışması bununla başlar.",
  },
];

const KIYAS: { k: string; online: string; yerinde: string }[] = [
  { k: "Kurulum yeri", online: "ServiceCore bulutu — size özel ortam", yerinde: "Sizin sunucularınız" },
  { k: "Teslim süresi", online: "Aynı gün", yerinde: "Hazırlık + kurulum (planlı)" },
  { k: "Başvuru / sözleşme", online: "Gerekmez — talep yeterli", yerinde: "Başvuru formu + Gizlilik Sözleşmesi + LOI" },
  { k: "Altyapı hazırlığı", online: "Gerekmez", yerinde: "Sunucu, VPN, DNS/SSL müşteri tarafından" },
  { k: "Ön koşul", online: "Yok", yerinde: "Üst yönetimin satın alma taahhüdü" },
  { k: "Bedel", online: "Ücretsiz", yerinde: "Kapsam ispatlanır da alım olmazsa PoC efor bedeli" },
];

export default function PocPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/8 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-(--color-brand-accent)" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-brand-accent)">
            SERVICECORE · POC SÜRECİ
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Satın almadan önce{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-accent) to-(--color-brand-primary)">
            deneyin
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          ServiceCore&apos;u değerlendirmenin iki yolu var: aynı gün teslim edilen,
          size özel <strong className="font-semibold text-white">Online PoC</strong> ortamı — ya da üst yönetim
          taahhüdüyle yürütülen <strong className="font-semibold text-white">Yerinde PoC</strong> süreci.
        </p>

        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative rounded-3xl border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/6 p-8">
            <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-emerald-300">
              Önerilen
            </span>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/10 text-(--color-brand-accent) mb-5">
              <Cloud className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Online PoC</h2>
            <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Kendinize özel, yalnızca sizin eriştiğiniz canlı bir ServiceCore
              ortamı — kendi senaryolarınızla.
            </p>
            <ul className="mt-6 space-y-3">
              {ONLINE_MADDELER.map((m) => (
                <li key={m} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/85 leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
            >
              Online PoC Talep Et
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/2 p-8">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/5 text-white/80 mb-5">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Yerinde PoC</h2>
            <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary)">
              Ürünün sizin sunucularınıza kurulduğu kapsamlı değerlendirme.
              Gerçek bir implementasyon eforudur; bu nedenle{" "}
              <strong className="font-medium text-white/90">üst yönetimin satın alma
              taahhüdü</strong> ile yürütülür.
            </p>
            <div className="mt-6 space-y-3">
              {YERINDE_ADIMLAR.map((a) => (
                <div key={a.title} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/12 bg-white/4 text-white/70 shrink-0">
                    <a.icon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{a.title}</div>
                    <p className="text-[13px] font-light leading-relaxed text-(--color-text-secondary)">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#basvuru"
              className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer"
            >
              Yerinde PoC Başvuru Formu
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="mt-20">
          <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            İKİ YOLUN KARŞILAŞTIRMASI
          </div>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-160">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)"></th>
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-brand-accent)">
                      <span className="inline-flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Online PoC (önerilen)
                      </span>
                    </th>
                    <th className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-muted)">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" /> Yerinde PoC
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KIYAS.map((r) => (
                    <tr key={r.k} className="border-b border-white/6 last:border-b-0">
                      <td className="px-5 py-4 text-sm font-medium text-white/85 whitespace-nowrap">{r.k}</td>
                      <td className="px-5 py-4 text-sm font-light text-white/85">{r.online}</td>
                      <td className="px-5 py-4 text-sm font-light text-(--color-text-secondary)">{r.yerinde}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-sm font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
            Neden böyle? Yerinde PoC, ekiplerimizin haftalar süren gerçek
            implementasyon eforudur. Karşılıklı taahhüt, iki tarafın da zamanını
            korur: kapsam baştan netleşir, başarı ölçütü belli olur, sonuç
            sürprizsiz olur. Hızlı ve yükümlülüksüz değerlendirme isteyen her
            kurum için Online PoC her zaman açıktır.
          </p>
        </section>

        <section id="basvuru" className="mt-24 scroll-mt-28">
          <div className="flex items-center gap-2.5 mb-3">
            <CalendarCheck className="w-5 h-5 text-(--color-brand-accent)" />
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Yerinde PoC Başvuru Formu
            </h2>
          </div>
          <p className="mb-8 text-sm font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            Form, kapsam ve taahhüt bilgilerinizle birlikte ekibimize iletilir;
            uygunluk değerlendirmesi sonrası sizinle iletişime geçilir. Kurulum
            öncesinde Servicecore Gizlilik Sözleşmesi imzalanır ve Niyet Mektubu
            (LOI) süreci yürütülür.
          </p>
          <div className="rounded-3xl bg-white/2 border border-white/5 p-8 lg:p-10 max-w-4xl">
            <PocForm />
          </div>
        </section>

        <section className="mt-16 flex items-start gap-3 rounded-2xl border border-white/8 bg-white/2 p-5 max-w-4xl">
          <ShieldCheck className="w-4 h-4 text-(--color-brand-accent) shrink-0 mt-0.5" />
          <p className="text-[13px] font-light leading-relaxed text-(--color-text-muted)">
            Yerinde PoC kurulumları, değerlendirme amaçlı sınırlı ve süre kilitli
            PoC sürümüyle yapılır; tam ürün, satın alma sonrasında devreye alınır.
            PoC süresi sonunda kurulum ve tüm kopyalar kaldırılır.
          </p>
        </section>
      </div>

      <PrivacyContact />
    </main>
  );
}
