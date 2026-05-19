import { Calendar, FileText, Clock } from "lucide-react";
import type { LegalMeta } from "./types";

interface LegalFooterMetaProps {
  meta: LegalMeta;
}

export function LegalFooterMeta({ meta }: LegalFooterMetaProps) {
  return (
    <div className="mt-24 pt-8 border-t border-white/5">
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-[11px] font-mono text-(--color-text-muted)">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2">
            <Calendar
              className="w-3 h-3 text-(--color-text-muted)"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>{meta.lastUpdatedLabel}</span>
          </span>
          <span
            aria-hidden="true"
            className="hidden md:inline-block w-px h-3 bg-white/10"
          />
          <span className="inline-flex items-center gap-2">
            <FileText
              className="w-3 h-3 text-(--color-text-muted)"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span lang="en" className="tracking-wider">
              {meta.version}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden md:inline-block w-px h-3 bg-white/10"
          />
          <span className="inline-flex items-center gap-2">
            <Clock
              className="w-3 h-3 text-(--color-text-muted)"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>{meta.reading_time_minutes} dk</span>
          </span>
        </div>
        <div className="text-[10px] tracking-[0.22em]">
          <span lang="en">SERVICECORE</span> · {meta.eyebrow}
        </div>
      </div>
    </div>
  );
}
