import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import aicoreData from "@/data/aicore.json";

interface ToolData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
}

const TOOLS = aicoreData.tools as ToolData[];

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
    title: `${tool.name} — AICORE | ServiceCore`,
    description: tool.tagline,
  };
}

export default async function AicoreToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden pb-32">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light)">
            AICORE · ARAÇ
          </span>
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

        <div className="mt-16 flex flex-wrap items-center gap-3">
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
            Tüm AICORE Ailesi
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-32 pt-12 border-t border-white/8">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            Diğer AICORE Araçları
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOOLS.filter((t) => t.slug !== tool.slug)
              .slice(0, 8)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/aicore/${t.slug}`}
                  className="group rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 px-4 py-3 transition-all"
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
    </main>
  );
}
