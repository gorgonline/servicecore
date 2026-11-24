import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaLinksProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  centered?: boolean;
}

export default function CtaLinks({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  centered = false,
}: CtaLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <Link
        href={primaryHref}
        className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-(--color-brand-primary) px-7 text-sm font-medium text-white shadow-(--shadow-glow-primary) transition-shadow hover:shadow-(--shadow-glow-primary-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base)"
      >
        {primaryLabel}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
      <Link
        href={secondaryHref}
        className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active)"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
