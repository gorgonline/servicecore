import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Radar } from "lucide-react";
import discoveryData from "@/data/discovery.json";

interface DiscoveryFeature {
  id: number;
  title: string;
  tagline: string;
  bullets: string[];
  image?: string;
  imageAlt?: string;
}

export const metadata: Metadata = {
  title: "Discovery — Otomatik BT Varlık Keşfi | ServiceCore",
  description: discoveryData.hero.lede,
};

export default function DiscoveryPage() {
  const { hero, promise, value_table, packages, version } = discoveryData;
  const features = discoveryData.features as DiscoveryFeature[];

  const galleryImages = features
    .filter((f): f is DiscoveryFeature & { image: string; imageAlt: string } =>
      Boolean(f.image),
    )
    .map((f) => ({ src: f.image, alt: f.imageAlt }));

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden pb-32">
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,112,243,0.10), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 pt-32">
        {/* HERO */}
        <section>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-cyan-base)/40 bg-(--color-accent-cyan-base)/8 mb-10">
            <Radar className="w-3.5 h-3.5 text-(--color-accent-cyan-light)" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-cyan-light)">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
            {hero.title_main}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-cyan-light) to-(--color-brand-accent)">
              {hero.title_accent}
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {hero.lede}
          </p>

          <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
            >
              Demo İste
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
            >
              Bize Ulaşın
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero görseli */}
          {features[0]?.image && (
            <div className="mt-16 rounded-3xl overflow-hidden border border-white/10 bg-white/2 shadow-2xl">
              <Image
                src={features[0].image}
                alt={features[0].imageAlt ?? "Discovery Jobs"}
                width={1840}
                height={1080}
                priority
                className="w-full h-auto"
              />
            </div>
          )}
        </section>

        {/* PROMISE / KPI strip */}
        <section className="mt-24 border-y border-white/8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
            {promise.map((p) => (
              <div key={p.label}>
                <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-3">
                  {p.label}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl lg:text-4xl font-mono font-semibold tracking-tight text-white">
                    {p.value}
                  </span>
                  {"suffix" in p && p.suffix && (
                    <span className="text-lg font-mono font-medium text-(--color-accent-cyan-light)">
                      {p.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs font-light text-(--color-text-muted) leading-relaxed">
                  {p.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VALUE TABLE — Sorun / Çözüm */}
        <section className="mt-24">
          <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            Müşteri Açısından Asıl Değer
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12 max-w-3xl">
            Karşılaştığınız sorun, Discovery&apos;nin çözümü
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {value_table.map((row, i) => (
              <article
                key={i}
                className="rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-white/15 transition-all p-5"
              >
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-(--color-accent-red-light) mb-2">
                  Sorun
                </div>
                <p className="text-sm font-medium text-white leading-snug mb-4">
                  &ldquo;{row.problem}&rdquo;
                </p>
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-(--color-accent-emerald-light) mb-2">
                  Çözüm
                </div>
                <p className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                  {row.solution}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* FEATURES — alternating zig-zag */}
        <section className="mt-32 space-y-24">
          <div>
            <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              Yetenekler
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-3xl">
              {features.length} ana yetenekle bütüncül keşif
            </h2>
          </div>

          {features.map((f, idx) => {
            const flipped = idx % 2 === 1;
            return (
              <article
                key={f.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                {/* Text */}
                <div
                  className={`lg:col-span-5 ${flipped ? "lg:col-start-8" : ""}`}
                >
                  <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-accent-cyan-light) mb-3">
                    Yetenek {String(f.id).padStart(2, "0")}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="text-base font-light text-(--color-text-secondary) leading-relaxed mb-6">
                    {f.tagline}
                  </p>
                  <ul className="space-y-3">
                    {f.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-(--color-accent-cyan-light) shrink-0 mt-1" />
                        <span className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                {f.image && (
                  <div
                    className={`lg:col-span-7 ${flipped ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/2">
                      <Image
                        src={f.image}
                        alt={f.imageAlt ?? f.title}
                        width={1840}
                        height={1080}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* PACKAGES */}
        <section className="mt-32">
          <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            Paket Önerisi
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12">
            İhtiyacınıza uygun paketi seçin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((p) => (
              <article
                key={p.name}
                className="rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-(--color-accent-cyan-base)/30 transition-all p-6"
              >
                <div className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-(--color-accent-cyan-light) mb-3">
                  {p.name}
                </div>
                <p className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                  {p.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* GALLERY — kalan görseller */}
        <section className="mt-32">
          <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            Ekran Görüntüleri
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-12">
            Discovery&apos;yi yakından inceleyin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((g) => (
              <div
                key={g.src}
                className="rounded-xl overflow-hidden border border-white/8 bg-white/2"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1840}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="mt-32 pt-12 border-t border-white/8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 max-w-2xl">
                30 dakikada ilk tarama sonucunuzu alın.
              </h2>
              <p className="text-base font-light text-(--color-text-secondary) max-w-2xl leading-relaxed">
                Onboarding wizard, default şablonlar ve hazır job&apos;larla yeni
                müşterilerimiz 30 dakika içinde ilk envanter ekranlarını görür.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
              >
                Demo İste
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Bize Ulaşın
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 text-[11px] font-mono uppercase tracking-[0.18em] text-(--color-text-muted)">
            ServiceCore Discovery · Versiyon {version}
          </div>
        </section>
      </div>
    </main>
  );
}
