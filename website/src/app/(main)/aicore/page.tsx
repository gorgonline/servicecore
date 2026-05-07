import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import aicoreData from "@/data/aicore.json";

export const metadata: Metadata = {
  title: "AICORE — Yapay Zeka Araç Ailesi | ServiceCore",
  description: aicoreData.intro.description,
};

export default function AicoreIndexPage() {
  const { intro, tools } = aicoreData;

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden pb-32">
      <div
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.20), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 mb-10">
          <Sparkles className="w-3.5 h-3.5 text-(--color-accent-purple-light)" />
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light)">
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/aicore/${t.slug}`}
              className="group rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-(--color-accent-purple-base)/30 transition-all p-6"
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
      </div>
    </main>
  );
}
