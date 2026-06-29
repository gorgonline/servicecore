import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import aicoreData from "@/data/aicore.json";
import modullerData from "@/data/moduller.json";
import { AicoreMock, hasMock } from "@/components/ui/aicore/mock-registry";
import PrivacyContact from "@/components/ui/privacy-contact";

interface HowItWorksStep {
  label: string;
  detail: string;
}

interface ToolData {
  slug: string;
  name: string;
  tier: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  whatItDoes?: string[];
  howItWorks?: HowItWorksStep[];
  modules?: string[];
}

interface ModuleEntry {
  name: string;
  href: string;
  icon: string;
  desc: string;
  tone: string;
  category: string;
}

const TOOLS = aicoreData.tools as ToolData[];
const MODULES = (modullerData as { modules: ModuleEntry[] }).modules;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return { title: "Araç Bulunamadı | ServiceCore" };
  return {
    title: `${tool.name} — AICore | ServiceCore`,
    description: tool.tagline,
  };
}

function resolveModules(hrefs: string[]): ModuleEntry[] {
  return hrefs
    .map((href) => MODULES.find((m) => m.href === href))
    .filter((m): m is ModuleEntry => m !== undefined);
}

export default async function AicoreToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const isBeta = tool.tier === "beta";
  const showMock = hasMock(tool.slug);
  const linkedModules = tool.modules ? resolveModules(tool.modules) : [];

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8">
            <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-purple-light)">
              AICore · Araç
            </span>
          </div>
          {isBeta && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8">
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent-purple-light) animate-pulse" />
              <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light)">
                Beta · Yol Haritası
              </span>
            </div>
          )}
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-purple-light) to-(--color-brand-accent)">
            {tool.name}
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          {tool.tagline}
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          {tool.description}
        </p>

        {tool.whatItDoes && tool.whatItDoes.length > 0 && (
          <section className="mt-20">
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              NE YAPAR
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tool.whatItDoes.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/8 bg-white/2 p-6"
                >
                  <div className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-accent-purple-light) mb-3">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {showMock && (
          <section className="mt-20">
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              {tool.name} · ÇALIŞIRKEN
            </div>
            <AicoreMock slug={tool.slug} accent={tool.accent} />
            <p className="mt-3 text-[11px] font-mono text-(--color-text-muted)">
              Sahnede sentetik kurum ve kayıt verisi kullanılmıştır.
            </p>
          </section>
        )}

        {tool.howItWorks && tool.howItWorks.length > 0 && (
          <section className="mt-20">
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              NASIL ÇALIŞIR
            </div>
            <div className="space-y-3">
              {tool.howItWorks.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 rounded-2xl border border-white/8 bg-white/2 p-6"
                >
                  <div className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/10 text-(--color-accent-purple-light) text-sm font-mono font-semibold tabular-nums">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="text-sm font-semibold text-white tracking-tight">
                      {step.label}
                    </div>
                    <p className="mt-1 text-sm font-light text-(--color-text-secondary) leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {linkedModules.length > 0 && (
          <section className="mt-20">
            <div className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              HANGİ MODÜLLERDE ÇALIŞIR
            </div>
            <div className="flex flex-wrap gap-3">
              {linkedModules.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/3 hover:bg-white/6 hover:border-(--color-accent-purple-base)/40 transition-all cursor-pointer"
                >
                  <span className="text-sm font-medium text-white/85 group-hover:text-(--color-accent-purple-light) transition-colors">
                    {m.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-(--color-text-muted) group-hover:text-(--color-accent-purple-light) transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {!showMock && !tool.whatItDoes && (
          <div className="mt-12 rounded-2xl border border-(--color-brand-primary)/20 bg-(--color-brand-primary)/5 p-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-(--color-brand-primary) mt-2 animate-pulse shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Sayfa Yapım Aşamasında</h3>
                <p className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                  {tool.name} eklentisinin detaylı içerik ve örnek senaryoları kısa süre içinde
                  eklenecek.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 flex flex-wrap items-center gap-3">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
          >
            Demo İste
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/aicore"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Tüm AICore Ailesi
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-32 pt-12 border-t border-white/8">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] text-(--color-text-muted) mb-6">
            Diğer AICore Araçları
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOOLS.filter((t) => t.slug !== tool.slug)
              .slice(0, 8)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/aicore/${t.slug}`}
                  className="group rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 px-4 py-3 transition-all cursor-pointer"
                >
                  <div className="text-sm font-semibold text-white group-hover:text-(--color-accent-purple-light) transition-colors">
                    {t.name}
                  </div>
                  <div className="text-xs text-(--color-text-secondary) mt-1 leading-snug truncate">
                    {t.tagline}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <PrivacyContact />
    </main>
  );
}
