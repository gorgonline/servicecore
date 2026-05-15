import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import aicoreData from "@/data/aicore.json";

export const metadata: Metadata = {
  title: "AICore — Yapay Zeka Araç Ailesi | ServiceCore",
  description: aicoreData.intro.description,
};

interface AicoreTool {
  slug: string;
  name: string;
  tier: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  year: number;
  release: string;
}

export default function AicoreIndexPage() {
  const { intro, tools } = aicoreData as { intro: typeof aicoreData.intro; tools: AicoreTool[] };
  const productionTools = tools.filter((t) => t.tier === "production");
  const betaTools = tools.filter((t) => t.tier === "beta");

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden pb-32">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.20), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-purple-light)">
            {intro.title}
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          Yapay Zeka{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-purple-light) to-(--color-brand-accent)">
            Araç Ailesi
          </span>
        </h1>

        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          {intro.subtitle}
        </p>

        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          {intro.description}
        </p>

        <section className="mt-20">
          <div className="flex items-baseline justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted)">
                ÜRETİM HATTINDA
              </h2>
              <p className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                AICore araçları
              </p>
            </div>
            <span className="text-xs font-mono text-(--color-text-muted) shrink-0">
              {productionTools.length.toString().padStart(2, "0")} ARAÇ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productionTools.map((t) => (
              <Link
                key={t.slug}
                href={`/aicore/${t.slug}`}
                className="group rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-(--color-accent-purple-base)/30 transition-all p-6 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-(--color-accent-purple-light) transition-colors">
                    {t.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-(--color-text-muted) group-hover:text-(--color-accent-purple-light) shrink-0" />
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                  {t.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="flex items-baseline justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light)">
                BETA · YOL HARİTASI
              </h2>
              <p className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Yakında AICore ailesine katılacak araçlar
              </p>
            </div>
            <span className="text-xs font-mono text-(--color-text-muted) shrink-0">
              {betaTools.length.toString().padStart(2, "0")} ARAÇ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {betaTools.map((t) => (
              <Link
                key={t.slug}
                href={`/aicore/${t.slug}`}
                className="group rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-(--color-accent-purple-base)/30 transition-all p-6 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-(--color-accent-purple-light) transition-colors">
                    {t.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-(--color-text-muted) group-hover:text-(--color-accent-purple-light) shrink-0" />
                </div>
                <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
                  {t.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light)">
                  <span className="w-1 h-1 rounded-full bg-(--color-accent-purple-light)" />
                  Beta
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
