import datasheetData from "@/data/datasheet.json";
import { renderModuleIcon } from "./datasheet/icon-map";
import { ModuleMock, type MockAccent } from "./datasheet/module-mocks";
import { transformItems } from "./datasheet/text-blocks";
import type {
  DatasheetClosing,
  DatasheetContact,
  DatasheetCover,
  DatasheetExecutiveSummary,
  DatasheetKpi,
  DatasheetMeta,
  DatasheetModule,
} from "./datasheet/types";

interface DatasheetData {
  meta: DatasheetMeta;
  cover: DatasheetCover;
  kpis: DatasheetKpi[];
  executive_summary: DatasheetExecutiveSummary;
  modules: DatasheetModule[];
  closing: DatasheetClosing;
  contact: DatasheetContact;
}

const data = datasheetData as unknown as DatasheetData;

// Modül başına accent renk paleti — moduller sayfasındaki kart stilini birebir yansıtır.
interface AccentTone {
  bg: string;
  border: string;
  text: string;
  glow: string;
  fade: string;
}

const ACCENT: Record<string, AccentTone> = {
  blue: {
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.32)",
    text: "#60a5fa",
    glow: "rgba(59,130,246,0.18)",
    fade: "rgba(59,130,246,0.06)",
  },
  red: {
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.32)",
    text: "#f87171",
    glow: "rgba(239,68,68,0.18)",
    fade: "rgba(239,68,68,0.06)",
  },
  amber: {
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.32)",
    text: "#fbbf24",
    glow: "rgba(245,158,11,0.18)",
    fade: "rgba(245,158,11,0.06)",
  },
  cyan: {
    bg: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.32)",
    text: "#22d3ee",
    glow: "rgba(6,182,212,0.18)",
    fade: "rgba(6,182,212,0.06)",
  },
  purple: {
    bg: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.32)",
    text: "#c084fc",
    glow: "rgba(168,85,247,0.18)",
    fade: "rgba(168,85,247,0.06)",
  },
  orange: {
    bg: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.32)",
    text: "#fb923c",
    glow: "rgba(249,115,22,0.18)",
    fade: "rgba(249,115,22,0.06)",
  },
  sky: {
    bg: "rgba(56,189,248,0.15)",
    border: "rgba(56,189,248,0.32)",
    text: "#7dd3fc",
    glow: "rgba(56,189,248,0.18)",
    fade: "rgba(56,189,248,0.06)",
  },
  pink: {
    bg: "rgba(236,72,153,0.15)",
    border: "rgba(236,72,153,0.32)",
    text: "#f472b6",
    glow: "rgba(236,72,153,0.18)",
    fade: "rgba(236,72,153,0.06)",
  },
  emerald: {
    bg: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.32)",
    text: "#34d399",
    glow: "rgba(16,185,129,0.18)",
    fade: "rgba(16,185,129,0.06)",
  },
};

const PAGE_CSS = `
  @page {
    size: A4;
    margin: 0;
  }

  .ds-doc {
    background: #010E21;
    color: #ffffff;
    font-family: var(--font-geist-sans), system-ui, sans-serif;
  }

  .ds-page {
    page-break-after: always;
    break-after: page;
    position: relative;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    /*
     * box-decoration-break: clone — bir element birden fazla sayfaya taştığında
     * padding ve background her sayfada yeniden uygulanır. Bu sayede @page margin
     * kullanmadan dark bg + 22mm üst boşluk her fiziksel sayfada korunur.
     */
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  .ds-page:last-child {
    page-break-after: auto;
    break-after: auto;
  }

  .ds-page p,
  .ds-page li,
  .ds-page h2,
  .ds-page h3,
  .ds-page figure,
  .ds-mock {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  @media screen {
    html, body {
      background: #050a14;
      margin: 0;
      padding: 0;
    }
    body {
      padding: 32px 0;
    }
    .ds-page {
      width: 210mm;
      min-height: 297mm;
      padding: 22mm;
      margin: 0 auto 28px;
      background: #010E21;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .ds-bleed { display: none; }
  }

  @media print {
    html, body {
      background: #010E21 !important;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .ds-bleed { display: none; }
    .ds-page {
      width: 210mm;
      min-height: 297mm;
      padding: 22mm;
      margin: 0;
      background: #010E21;
    }
  }
`;

export function DatasheetPdfTemplate() {
  const { meta, cover, kpis, executive_summary, modules, closing, contact } =
    data;

  // page numbering: cover=1, kpi=2, summary=3, toc=4, modules start at 5
  const tocOffset = 5;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div className="ds-bleed" aria-hidden="true" />
      <div className="ds-doc">
        <CoverPage cover={cover} meta={meta} />
        <KpiPage kpis={kpis} pageNum={2} />
        <SummaryPage summary={executive_summary} pageNum={3} />
        <TocPage modules={modules} pageNum={4} tocOffset={tocOffset} />
        {modules.map((m, i) => (
          <ModulePage
            key={m.id}
            module={m}
            index={i}
            pageNum={tocOffset + i}
          />
        ))}
        <ClosingPage closing={closing} contact={contact} />
      </div>
    </>
  );
}

// ============================================================
// Cover
// ============================================================

interface CoverPageProps {
  cover: DatasheetCover;
  meta: DatasheetMeta;
}

function CoverPage({ cover, meta }: CoverPageProps) {
  return (
    <section className="ds-page">
      <div className="text-[8.5pt] font-mono tracking-[0.32em] uppercase text-slate-400">
        {cover.eyebrow}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-[44pt] font-semibold tracking-tight leading-[1.05] text-white max-w-[150mm]">
          {cover.title_main} {cover.title_accent}
        </h1>
        <p className="mt-[10mm] text-[14pt] font-light leading-normal text-slate-300 max-w-[140mm]">
          {cover.lede}
        </p>
      </div>

      <div className="border-t border-white/10 pt-[6mm] flex justify-between text-[8pt] font-mono uppercase tracking-[0.2em] text-slate-500">
        <span>
          {meta.version} · {meta.release_date} · {meta.language}
        </span>
        <span>{meta.company_full}</span>
      </div>
    </section>
  );
}

// ============================================================
// KPI
// ============================================================

interface KpiPageProps {
  kpis: DatasheetKpi[];
  pageNum: number;
}

function KpiPage({ kpis, pageNum }: KpiPageProps) {
  return (
    <section className="ds-page">
      <PageHeader overline="Anahtar Göstergeler" pageNum={pageNum} />

      <div className="flex-1 grid grid-cols-2 gap-x-[14mm] gap-y-[18mm] content-center">
        {kpis.map((k, i) => (
          <div key={`${k.label}-${i}`}>
            <div className="flex items-baseline gap-1 mb-[4mm]">
              <span className="text-[44pt] font-mono font-medium tracking-tight text-white leading-none">
                {k.value}
              </span>
              {k.suffix && (
                <span className="text-[20pt] font-mono font-medium text-slate-400">
                  {k.suffix}
                </span>
              )}
            </div>
            <div className="text-[8.5pt] font-mono tracking-[0.22em] uppercase text-slate-500 mb-[2mm]">
              {k.label}
            </div>
            <div className="text-[10pt] font-light text-slate-400">
              {k.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Executive Summary
// ============================================================

interface SummaryPageProps {
  summary: DatasheetExecutiveSummary;
  pageNum: number;
}

function SummaryPage({ summary, pageNum }: SummaryPageProps) {
  return (
    <section className="ds-page">
      <PageHeader overline="Yönetici Özeti" pageNum={pageNum} />

      <div className="mt-[14mm] flex-1 max-w-[160mm]">
        <div className="space-y-[6mm]">
          {summary.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[11pt] leading-[1.7] text-slate-300 font-light"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TOC
// ============================================================

interface TocPageProps {
  modules: DatasheetModule[];
  pageNum: number;
  tocOffset: number;
}

function TocPage({ modules, pageNum, tocOffset }: TocPageProps) {
  return (
    <section className="ds-page">
      <PageHeader overline="İçindekiler" pageNum={pageNum} />

      <ol className="mt-[12mm] flex-1 divide-y divide-white/5 border-y border-white/5">
        {modules.map((m, i) => {
          const num = String(i + 1).padStart(2, "0");
          const docPage = String(tocOffset + i).padStart(2, "0");
          return (
            <li
              key={m.id}
              className="flex items-baseline gap-[6mm] py-[3mm]"
            >
              <span className="w-[8mm] text-[9pt] font-mono text-slate-500 tabular-nums">
                {num}
              </span>
              <span className="flex-1 text-[10.5pt] font-light text-white">
                {m.title_tr || m.title}
              </span>
              <span className="text-[9pt] font-mono text-slate-500 tabular-nums">
                {docPage}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// ============================================================
// Mock Visual — moduller sayfasındaki kart stiline uygun
// ============================================================

interface MockVisualProps {
  module: DatasheetModule;
  index: number;
}

function MockVisual({ module, index }: MockVisualProps) {
  const accent = ACCENT[module.accent] ?? ACCENT.blue;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className="ds-mock relative my-[6mm] rounded-[5mm] border border-white/10 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      {/* Gradient overlay — sağ üst köşeden accent rengi */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 100% 0%, ${accent.glow}, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent.fade}, transparent 45%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative p-[10mm]">
        <div className="flex gap-[10mm] items-center mb-[8mm]">
          {/* Icon box — moduller kartlarındaki w-12 h-12 rounded-xl tone.bg/border */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width: "24mm",
              height: "24mm",
              background: accent.bg,
              border: `1px solid ${accent.border}`,
              borderRadius: "5mm",
              color: accent.text,
            }}
          >
            {renderModuleIcon(module.icon, {
              className: "w-[11mm] h-[11mm]",
              strokeWidth: 1.5,
            })}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* Top meta row — modül numarası + EN başlık */}
            <div className="flex items-center gap-[3mm] mb-[3mm]">
              <span
                className="text-[7pt] font-mono uppercase tracking-[0.24em]"
                style={{ color: accent.text }}
              >
                MODÜL {number}
              </span>
              <span className="text-white/15 text-[7pt]">·</span>
              <span className="text-[7pt] font-mono uppercase tracking-[0.22em] text-slate-500 truncate">
                {module.title}
              </span>
            </div>

            {/* TR Title */}
            <h3 className="text-[20pt] font-semibold tracking-tight text-white leading-[1.1] mb-[3mm]">
              {module.title_tr || module.title}
            </h3>

            {/* Tagline */}
            <p className="text-[10.5pt] font-light leading-normal text-slate-300">
              {module.tagline}
            </p>

            {/* Bottom border accent line */}
            <div className="mt-[5mm] pt-[3mm] border-t border-white/8 flex items-center gap-[2mm]">
              <span
                className="inline-block"
                style={{
                  width: "5mm",
                  height: "0.5mm",
                  background: accent.text,
                }}
                aria-hidden="true"
              />
              <span
                className="text-[7pt] font-mono uppercase tracking-[0.22em]"
                style={{ color: accent.text }}
              >
                ITIL4 Pratiği
              </span>
            </div>
          </div>
        </div>

        {/* Modül-özgün mock UI */}
        <ModuleMock moduleId={module.id} accent={module.accent as MockAccent} />
      </div>
    </div>
  );
}

// ============================================================
// Module
// ============================================================

interface ModulePageProps {
  module: DatasheetModule;
  index: number;
  pageNum: number;
}

function ModulePage({ module, index, pageNum }: ModulePageProps) {
  const number = String(index + 1).padStart(2, "0");
  const blocks = transformItems(module.items);

  return (
    <section className="ds-page">
      <PageHeader
        overline={`Modül ${number} · ${module.title}`}
        pageNum={pageNum}
      />

      <div className="mt-[8mm] flex-1 max-w-[160mm]">
        <MockVisual module={module} index={index} />

        <div className="mt-[8mm] space-y-[5mm]">
          {blocks.map((b, bi) => {
            if (b.kind === "para") {
              return (
                <p
                  key={bi}
                  className="text-[10.5pt] leading-[1.7] font-light text-slate-300"
                >
                  {b.text}
                </p>
              );
            }
            if (b.kind === "subheading") {
              return (
                <h3
                  key={bi}
                  className="mt-[6mm] mb-[2mm] text-[9pt] font-mono uppercase tracking-[0.22em] text-white"
                >
                  {b.text}
                </h3>
              );
            }
            return (
              <ol key={bi} className="space-y-[3mm] my-[4mm]">
                {b.items.map((it, ii) => (
                  <li key={ii} className="flex gap-[5mm]">
                    <span className="w-[8mm] shrink-0 text-[9pt] font-mono text-slate-500 tabular-nums mt-[2pt]">
                      {String(it.number).padStart(2, "0")}
                    </span>
                    <p className="flex-1 text-[10.5pt] leading-[1.65] font-light text-slate-300">
                      {it.text}
                    </p>
                  </li>
                ))}
              </ol>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Closing
// ============================================================

interface ClosingPageProps {
  closing: DatasheetClosing;
  contact: DatasheetContact;
}

function ClosingPage({ closing, contact }: ClosingPageProps) {
  return (
    <section className="ds-page">
      <div className="text-[8pt] font-mono tracking-[0.22em] uppercase text-slate-500">
        {closing.eyebrow}
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-[160mm]">
        <h2 className="text-[32pt] font-semibold tracking-tight leading-[1.1] text-white mb-[8mm]">
          {closing.title}
        </h2>
        <p className="text-[12pt] font-light leading-normal text-slate-300 max-w-[140mm]">
          {closing.description}
        </p>

        <div className="mt-[14mm] pt-[8mm] border-t border-white/10">
          <div className="text-[8.5pt] font-mono tracking-[0.22em] uppercase text-slate-500 mb-[5mm]">
            İletişim
          </div>
          <div className="grid grid-cols-2 gap-x-[10mm] gap-y-[3mm] text-[10pt] font-mono text-slate-300">
            {closing.links.map((l) => (
              <span key={l.label}>{l.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-[6mm] flex justify-between text-[8pt] font-mono uppercase tracking-[0.2em] text-slate-500">
        <span>{contact.url}</span>
        <span>Servicecore Datasheet</span>
      </div>
    </section>
  );
}

// ============================================================
// Page header
// ============================================================

interface PageHeaderProps {
  overline: string;
  pageNum: number;
}

function PageHeader({ overline, pageNum }: PageHeaderProps) {
  return (
    <header className="flex items-baseline justify-between border-b border-white/5 pb-[4mm]">
      <div className="text-[8pt] font-mono tracking-[0.22em] uppercase text-slate-500 truncate pr-[6mm]">
        {overline}
      </div>
      <div className="text-[8pt] font-mono tracking-[0.18em] text-slate-500 tabular-nums shrink-0">
        {String(pageNum).padStart(2, "0")}
      </div>
    </header>
  );
}

