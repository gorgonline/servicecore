import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code,
  Database,
  GitBranch,
  LayoutGrid,
  PencilRuler,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import data from "@/data/applicore.json";
import PrivacyContact from "@/components/ui/privacy-contact";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("applicore");

const partIcons: Record<string, LucideIcon> = {
  CheckCircle2,
  Code,
  Database,
  GitBranch,
  LayoutGrid,
  ShieldCheck,
};

interface CtaLinksProps {
  className: string;
}

function CtaLinks({ className }: CtaLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link
        href={data.cta.primaryHref}
        className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
      >
        {data.cta.primaryLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
        href={data.cta.secondaryHref}
        className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
      >
        {data.cta.secondaryLabel}
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

interface SectionHeaderProps {
  overline: string;
  title: string;
  description: string;
}

function SectionHeader({ overline, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <div className="text-[10px] font-mono tracking-[0.22em] text-(--color-text-muted) mb-6">
        {overline}
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 max-w-3xl">
        {title}
      </h2>
      <p className="text-base font-light text-(--color-text-secondary) leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );
}

export default function AppliCorePage() {
  const { hero, parts, readyApps, cta } = data;

  return (
    <main className="relative min-h-screen bg-(--color-surface-base) overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-130 h-130 rounded-full bg-(--color-brand-primary)/15 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 w-130 h-130 rounded-full bg-(--color-brand-accent)/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 pt-32 lg:pt-40">
        {/* Hero */}
        <section>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 mb-10">
            <PencilRuler className="w-3.5 h-3.5 text-(--color-accent-blue-light)" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.22em] text-(--color-accent-blue-light)">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-white max-w-4xl">
            {hero.titleLead}
            <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-(--color-accent-blue-light) to-(--color-brand-accent)">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl font-light leading-relaxed text-(--color-text-secondary) max-w-3xl">
            {hero.lede}
          </p>

          <p className="mt-6 text-base font-light leading-relaxed text-(--color-text-muted) max-w-3xl">
            {hero.description}
          </p>

          <CtaLinks className="mt-10" />
        </section>

        {/* Uygulamanin parcalari */}
        <section className="mt-32">
          <SectionHeader
            overline={parts.overline}
            title={parts.title}
            description={parts.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parts.items.map((item) => {
              const Icon = partIcons[item.icon] ?? PencilRuler;
              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-white/15 transition-all p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-(--color-accent-blue-light) mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Hazir uygulamalar */}
        <section className="mt-32">
          <SectionHeader
            overline={readyApps.overline}
            title={readyApps.title}
            description={readyApps.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readyApps.items.map((app) => (
              <article
                key={app.id}
                className="rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-white/15 transition-all p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
                  {app.title}
                </h3>
                <p className="text-sm font-light text-(--color-text-secondary) leading-relaxed">
                  {app.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 pt-12 border-t border-white/8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 max-w-2xl">
                {cta.title}
              </h2>
              <p className="text-base font-light text-(--color-text-secondary) max-w-2xl leading-relaxed">
                {cta.description}
              </p>
            </div>
            <CtaLinks className="shrink-0" />
          </div>
        </section>
      </div>

      <PrivacyContact />
    </main>
  );
}
