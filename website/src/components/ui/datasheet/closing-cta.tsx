import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DatasheetClosing, DatasheetContact } from "./types";

interface ClosingCtaProps {
  closing: DatasheetClosing;
  contact: DatasheetContact;
}

export function ClosingCTA({ closing, contact }: ClosingCtaProps) {
  return (
    <section
      className="relative py-32 print:py-12 print:break-before-page border-t border-white/5"
      data-ds-closing
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
          {closing.eyebrow}
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white max-w-3xl">
          {closing.title}
        </h2>

        <p className="mt-6 text-lg font-light leading-relaxed text-(--color-text-secondary) max-w-2xl">
          {closing.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3 print:hidden">
          {closing.ctas.map((cta) => {
            const isPrimary = cta.variant === "primary";
            const className = isPrimary
              ? "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
              : "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer";
            return (
              <Link key={cta.label} href={cta.href} className={className}>
                <span>{cta.label}</span>
                {!isPrimary && (
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-4">
            İletişim
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm font-mono">
            {closing.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-between py-1 text-white/80 hover:text-(--color-brand-accent) transition-colors"
              >
                <span className="truncate">{l.label}</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-(--color-text-muted)">
          <span>{contact.url}</span>
          <span>Servicecore Datasheet — v2026.05</span>
        </div>
      </div>
    </section>
  );
}
