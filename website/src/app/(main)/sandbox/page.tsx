import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Beaker,
  CircleDollarSign,
  FlaskConical,
  RefreshCw,
  ScrollText,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import { En } from "@/components/ui/En";
import PrivacyContact from "@/components/ui/privacy-contact";
import sandboxData from "@/data/sandbox.json";

export const metadata: Metadata = {
  title: "Sandbox / Test Sistem Add-on — Test Ortamı Neden Ayrı Lisanslanır | ServiceCore",
  description:
    "ServiceCore Sandbox / Test Sistem Add-on'un üç maliyet bileşeni: lisans ve fikri mülkiyet hakkı, kurulum ve mimari mühendislik eforu, sürekli bakım ve destek. Üretim ile test ortamının karşılaştırmalı özeti.",
  alternates: { canonical: "/sandbox" },
};

const SUTUN_IKONLARI = [CircleDollarSign, Wrench, RefreshCw];
const BAKIM_IKONLARI = [RefreshCw, Wrench, ShieldCheck];

export default function SandboxPage() {
  const { hero, ozet, yanilsama, sutunlar, efor, bakim, karsilastirma, sektor, faq, kapanis, ilgili } =
    sandboxData;

  return (
    <div className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,112,243,0.18), transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-260 -right-60 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.10), transparent 70%)",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        {/* Hero */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/8 mb-10">
          <FlaskConical className="w-3.5 h-3.5 text-(--color-brand-accent)" aria-hidden="true" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-brand-accent)">
            {hero.badge}
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          {hero.titleLead}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-accent) to-(--color-brand-primary)">
            {hero.titleAccent}
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          {hero.lead}
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          {hero.support}
        </p>

        {/* Ozet — uc kalem */}
        <section className="mt-16 rounded-3xl border border-white/8 bg-white/2 backdrop-blur-md p-8 lg:p-10 max-w-4xl shadow-(--shadow-glow-primary-subtle)">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted)">
            {ozet.overline}
          </p>
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-white">{ozet.title}</h2>

          <ul className="mt-8 divide-y divide-white/6 border-y border-white/6">
            {ozet.items.map((item) => (
              <li
                key={item.no}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4 sm:flex-nowrap"
              >
                <span className="font-mono text-sm font-semibold text-(--color-brand-accent) shrink-0">
                  {item.no}
                </span>
                <span className="min-w-0 flex-1 text-base text-white/90">{item.label}</span>
                <span className="w-full pl-8 text-xs font-mono tracking-wider uppercase text-(--color-text-secondary) sm:w-auto sm:pl-0 sm:shrink-0">
                  {item.hint}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-light leading-relaxed text-(--color-text-secondary)">
            {ozet.description}
          </p>
        </section>

        {/* Yanilsama — sanilan / gercek */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {yanilsama.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {yanilsama.title}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {yanilsama.intro}
          </p>

          <div className="mt-10 space-y-4">
            {yanilsama.items.map((item) => (
              <article
                key={item.myth}
                className="rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 lg:p-8 hover:border-white/15 transition-colors"
              >
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 lg:gap-10">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <X
                        className="w-4 h-4 text-(--color-accent-red-light) shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-secondary) mb-1">
                          Sanılan
                        </span>
                        <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                          {item.myth}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck
                        className="w-4 h-4 text-(--color-accent-emerald-light) shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-accent-emerald-light) mb-1">
                          Gerçek
                        </span>
                        <p className="text-base font-semibold leading-snug text-white">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-(--color-text-secondary) lg:border-l lg:border-white/8 lg:pl-10">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Uc maliyet sutunu */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {sutunlar.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {sutunlar.title}
          </h2>

          <div className="mt-10 space-y-5">
            {sutunlar.items.map((sutun, idx) => {
              const Icon = SUTUN_IKONLARI[idx] ?? CircleDollarSign;
              return (
                <article
                  key={sutun.no}
                  className="rounded-3xl border border-white/8 bg-white/2 backdrop-blur-md p-8 lg:p-10 hover:border-white/15 transition-colors"
                >
                  <header className="flex items-start gap-5">
                    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-2xl border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/10 text-(--color-brand-accent)">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-xs font-semibold tracking-[0.18em] text-(--color-brand-accent) mb-2">
                        {sutun.no}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                        {sutun.title}
                      </h3>
                      <p className="mt-1 text-sm font-light text-(--color-text-secondary)">{sutun.subtitle}</p>
                    </div>
                  </header>

                  <div className="mt-7 lg:pl-16 space-y-6">
                    <p className="text-base font-light leading-relaxed text-(--color-text-secondary)">
                      {sutun.text}
                    </p>

                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                      {sutun.items.map((madde) => (
                        <li key={madde} className="flex items-start gap-2.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-(--color-brand-primary) shrink-0 mt-2"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                            {madde}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={sutun.linkHref}
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-(--color-brand-accent) hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) rounded-sm"
                    >
                      {sutun.linkLabel}
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Kurulum eforu dokumu */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {efor.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {efor.title}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {efor.intro}
          </p>

          <ol className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-px">
            {efor.items.map((item, idx) => (
              <li
                key={item.title}
                className="flex items-start gap-4 py-5 border-t border-white/6 first:border-t-0 md:[&:nth-child(2)]:border-t-0"
              >
                <span className="font-mono text-xs font-semibold text-(--color-text-secondary) shrink-0 pt-1 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white tracking-tight">{item.title}</h3>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Bakim */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {bakim.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {bakim.title}
          </h2>

          <div className="mt-10 space-y-4">
            {bakim.items.map((item, idx) => {
              const Icon = BAKIM_IKONLARI[idx] ?? ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 lg:p-8 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3 md:w-64 md:shrink-0">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/10 text-(--color-brand-accent) shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Karsilastirma tablosu */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {karsilastirma.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {karsilastirma.title}
          </h2>

          <div className="mt-10 rounded-2xl border border-white/8 overflow-hidden">
            <div
              className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-inset"
              tabIndex={0}
              role="region"
              aria-label={karsilastirma.title}
            >
              <table className="w-full text-left min-w-175">
                <caption className="sr-only">{karsilastirma.title}</caption>
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th
                      scope="col"
                      className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-secondary)"
                    >
                      {karsilastirma.columns.parametre}
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-text-secondary)"
                    >
                      {karsilastirma.columns.canli}{" "}
                      <En className="normal-case">({karsilastirma.columns.canliEn})</En>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-brand-accent)"
                    >
                      {karsilastirma.columns.test}{" "}
                      <En className="normal-case">({karsilastirma.columns.testEn})</En>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {karsilastirma.rows.map((row) => (
                    <tr key={row.parametre} className="border-b border-white/6 last:border-b-0">
                      <th
                        scope="row"
                        className="px-5 py-4 text-sm font-medium text-white/85 text-left align-top whitespace-nowrap"
                      >
                        {row.parametre}
                      </th>
                      <td className="px-5 py-4 text-sm font-light text-(--color-text-secondary) align-top">
                        {row.canli}
                      </td>
                      <td className="px-5 py-4 text-sm font-light text-white/85 align-top">{row.test}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sektor */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {sektor.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {sektor.title}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {sektor.intro}
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {sektor.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-6 hover:border-white/15 transition-colors"
              >
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section className="mt-24">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {faq.overline}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-3xl">
            {faq.title}
          </h2>

          <div className="mt-10 space-y-4">
            {faq.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md open:border-white/15 transition-colors"
              >
                <summary className="flex items-start justify-between gap-6 p-6 lg:p-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) rounded-2xl">
                  <h3 className="text-base md:text-lg font-semibold text-white tracking-tight">
                    {item.question}
                  </h3>
                  <span
                    className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/12 text-(--color-brand-accent) transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <span className="text-lg leading-none pb-0.5">+</span>
                  </span>
                </summary>
                <p className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-1 text-sm font-light leading-relaxed text-(--color-text-secondary) max-w-4xl">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Kapanis */}
        <section className="mt-24 rounded-3xl border border-(--color-brand-primary)/30 bg-(--color-brand-primary)/6 backdrop-blur-md p-8 lg:p-12 shadow-(--shadow-glow-primary-card)">
          <p className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-brand-accent) mb-6">
            {kapanis.overline}
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white max-w-3xl leading-snug">
            {kapanis.title}
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {kapanis.text}
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {kapanis.text2}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={kapanis.ctaPrimary.href}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)"
            >
              {kapanis.ctaPrimary.label}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href={kapanis.ctaSecondary.href}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/15 text-white/85 hover:text-white hover:border-white/30 font-medium text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)"
            >
              {kapanis.ctaSecondary.label}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Ilgili sayfalar */}
        <section className="mt-20 mb-8">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            {ilgili.overline}
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ilgili.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-11 items-start gap-3 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-5 hover:border-white/15 hover:bg-white/4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)"
              >
                <Beaker
                  className="w-4 h-4 text-(--color-brand-accent) shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    {item.label}
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-(--color-brand-accent) opacity-70 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="mt-1 text-[13px] font-light leading-relaxed text-(--color-text-secondary)">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md p-5 max-w-4xl">
          <ScrollText
            className="w-4 h-4 text-(--color-brand-accent) shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-[13px] font-light leading-relaxed text-(--color-text-secondary)">
            Bu sayfa Sandbox / Test Sistem Add-on&apos;un kapsamını ve maliyet yapısını anlatır. Add-on
            adedi, kurulum kapsamı ve destek paketi ilişkisi kuruma göre değişir; bağlayıcı kalem ve
            bedeller yalnızca size özel hazırlanan teklifte yer alır.
          </p>
        </div>
      </div>

      <PrivacyContact />
    </div>
  );
}
