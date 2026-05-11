import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import cozumlerData from "@/data/cozumler.json";
import { FeaturesGrid } from "@/components/ui/features-grid";

interface SolutionData {
  slug: string;
  abbr: string;
  name: string;
  name_tr: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  modules: string[];
}

const SOLUTIONS = cozumlerData.solutions as SolutionData[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return { title: "Çözüm Bulunamadı | ServiceCore" };
  return {
    title: `${solution.abbr} — ${solution.name_tr} | ServiceCore`,
    description: solution.tagline,
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) notFound();

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden pb-32">
      <div className="absolute -top-40 -left-40 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.16), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-32">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-accent-purple-base)/40 bg-(--color-accent-purple-base)/8 mb-10">
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-accent-purple-light)">
            ÇÖZÜM · {solution.abbr}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl">
          {solution.name_tr}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-accent-cyan-light)">
            ({solution.abbr})
          </span>
        </h1>

        {/* English subtitle */}
        <div className="mt-4 text-sm font-mono uppercase tracking-[0.18em] text-(--color-text-muted)">
          {solution.name}
        </div>

        {/* Tagline */}
        <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
          {solution.tagline}
        </p>

        {/* Description */}
        <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
          {solution.description}
        </p>

        {/* ITSM: zenginlestirilmis ozellikler grid'i. Diger cozumler icin yapim asamasi banner'i. */}
        {solution.slug === "itsm" ? (
          <div className="mt-16">
            <FeaturesGrid />
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-(--color-brand-primary)/20 bg-(--color-brand-primary)/5 p-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-(--color-brand-primary) mt-2 animate-pulse shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Sayfa Yapım Aşamasında</h3>
                <p className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                  Bu çözüm sayfası detaylandırma sürecinde. Aşağıda paketin kapsamındaki modülleri inceleyebilir, demo talep edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related modules */}
        {solution.modules.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
              Pakete Dahil Modüller
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {solution.modules.map((moduleSlug) => (
                <Link
                  key={moduleSlug}
                  href={`/${moduleSlug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 px-4 py-3 transition-all"
                >
                  <span className="text-sm font-medium text-white/90 group-hover:text-(--color-brand-accent) transition-colors capitalize">
                    {moduleSlug.replaceAll("-", " ")}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-(--color-text-muted) group-hover:text-(--color-brand-accent) shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-16 flex flex-wrap items-center gap-3">
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

        {/* Other solutions */}
        <div className="mt-32 pt-12 border-t border-white/8">
          <h2 className="text-xs font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            Diğer Çözümler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SOLUTIONS.filter((s) => s.slug !== solution.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/cozumler/${s.slug}`}
                className="group rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 px-4 py-3 transition-all"
              >
                <div className="text-sm font-mono font-bold text-(--color-accent-purple-light) group-hover:text-(--color-brand-accent) transition-colors">
                  {s.abbr}
                </div>
                <div className="text-xs text-(--color-text-secondary) mt-1 leading-snug truncate">
                  {s.name_tr}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
