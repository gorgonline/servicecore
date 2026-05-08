import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DatasheetClosing, DatasheetContact } from "./types";

interface ClosingCtaProps {
  closing: DatasheetClosing;
  contact: DatasheetContact;
}

export function ClosingCTA({ closing, contact }: ClosingCtaProps) {
  const primaryCta = closing.ctas.find((c) => c.variant === "primary") ?? closing.ctas[0];

  return (
    <section
      className="relative py-32 print:py-16 print:break-before-page border-t border-white/5"
      data-ds-closing
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <div className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted) mb-10">
          {closing.eyebrow}
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white max-w-3xl">
          {closing.title}
        </h2>

        <p className="mt-6 text-lg font-light leading-relaxed text-(--color-text-secondary) max-w-2xl">
          {closing.description}
        </p>

        {primaryCta && (
          <div className="mt-12 print:hidden">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-(--color-brand-primary) text-white font-medium text-sm shadow-(--shadow-glow-primary) hover:shadow-(--shadow-glow-primary-strong) transition-all cursor-pointer"
            >
              <span>{primaryCta.label}</span>
            </Link>
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-(--color-text-muted) mb-6">
            İletişim
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm font-mono">
            {closing.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-between text-white/80 hover:text-(--color-brand-accent) transition-colors"
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

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-(--color-text-muted)">
          <span>{contact.url}</span>
          <span>Servicecore Datasheet · v2026.05</span>
        </div>
      </div>
    </section>
  );
}
