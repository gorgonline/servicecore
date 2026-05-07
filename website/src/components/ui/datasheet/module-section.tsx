import { getAccent } from "./accents";
import { renderModuleIcon } from "./icon-map";
import { renderModuleGlyph } from "./module-glyphs";
import { ProjectFeatureGrid } from "./project-feature-grid";
import type { DatasheetItem, DatasheetModule } from "./types";

interface ModuleSectionProps {
  module: DatasheetModule;
  index: number;
}

const VARIANT_C_IDS = new Set(["project-management"]);

export function ModuleSection({ module, index }: ModuleSectionProps) {
  const accent = getAccent(module.accent);
  const number = String(index + 1).padStart(2, "0");
  const startPage = module.pages?.[0];
  const endPage = module.pages?.[module.pages.length - 1];
  const pageRef =
    startPage !== undefined && endPage !== undefined && endPage !== startPage
      ? `s.${String(startPage).padStart(2, "0")}-${String(endPage).padStart(2, "0")}`
      : startPage !== undefined
        ? `s.${String(startPage).padStart(2, "0")}`
        : "";

  const isFeatureGrid = VARIANT_C_IDS.has(module.id);

  return (
    <section
      id={module.id}
      data-ds-module
      className="relative scroll-mt-28 print:break-before-page border-t border-white/5"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-12 py-24 print:py-10">
        {/* Header */}
        <header className="mb-12 print:mb-6">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-(--color-text-muted) mb-8">
            <span style={{ color: accent.light }}>MODÜL {number}</span>
            <span className="text-white/15">/</span>
            <span>{pageRef}</span>
          </div>

          {/* Glyph + Title block */}
          <div className="flex items-start gap-6 mb-6">
            <span
              aria-hidden="true"
              className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl border"
              style={{
                background: accent.alpha10,
                borderColor: accent.alpha30,
              }}
            >
              {renderModuleIcon(module.icon, {
                className: "w-6 h-6",
                style: { color: accent.light },
                strokeWidth: 1.5,
              })}
            </span>

            <div className="flex-1 min-w-0">
              <h2 className="datasheet-h2-large text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
                {module.title_tr || module.title}
              </h2>
              {module.title_tr && (
                <div className="mt-2 text-xs font-mono tracking-[0.18em] text-(--color-text-muted) uppercase">
                  {module.title}
                </div>
              )}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg lg:text-xl font-light leading-relaxed text-(--color-text-secondary)">
            {module.tagline}
          </p>

          {/* Mock visual for module — abstract glyph */}
          <div
            aria-hidden="true"
            className="mt-12 mb-2 rounded-2xl border p-10 flex items-center justify-center print:p-6 print:mt-8"
            style={{
              background: `linear-gradient(135deg, ${accent.alpha10}, transparent)`,
              borderColor: accent.alpha30,
            }}
          >
            <div className="scale-150 origin-center" style={{ color: accent.light }}>
              {renderModuleGlyph(module.id, {
                stroke: accent.light,
                fill: accent.alpha10,
              })}
            </div>
          </div>
        </header>

        {/* Body */}
        {isFeatureGrid ? (
          <ProjectFeatureGrid module={module} />
        ) : (
          <ModuleBody module={module} accent={accent} />
        )}
      </div>
    </section>
  );
}

interface ModuleBodyProps {
  module: DatasheetModule;
  accent: ReturnType<typeof getAccent>;
}

function ModuleBody({ module, accent }: ModuleBodyProps) {
  const items = module.items;
  const groups = groupItems(items);

  return (
    <div className="max-w-prose mx-auto">
      {groups.map((group, gi) => {
        if (group.kind === "para") {
          return (
            <p
              key={gi}
              className="datasheet-body break-inside-avoid mb-6 text-[17px] leading-[1.8] font-light text-(--color-text-secondary) print:text-[11pt] print:leading-[1.7] print:mb-3"
            >
              {group.item.text}
            </p>
          );
        }
        if (group.kind === "subheading") {
          return (
            <h3
              key={gi}
              className="break-inside-avoid mt-10 mb-5 pl-4 border-l-2 text-sm font-mono uppercase tracking-[0.22em] text-white print:mt-6 print:mb-3"
              style={{ borderColor: accent.base }}
            >
              {group.item.text}
            </h3>
          );
        }
        // bullets
        return (
          <ol key={gi} className="my-8 space-y-4 print:my-4 print:space-y-2 break-inside-avoid">
            {group.items.map((b, bi) => (
              <li
                key={bi}
                className="flex gap-4 break-inside-avoid"
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-xs font-semibold mt-0.5"
                  style={{
                    background: accent.alpha10,
                    border: `1px solid ${accent.alpha30}`,
                    color: accent.light,
                  }}
                >
                  {b.number ?? bi + 1}
                </span>
                <p className="flex-1 min-w-0 text-[17px] font-light leading-[1.75] text-(--color-text-secondary) print:text-[11pt]">
                  {b.text}
                </p>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}

type Group =
  | { kind: "para"; item: DatasheetItem }
  | { kind: "subheading"; item: DatasheetItem }
  | { kind: "bullets"; items: DatasheetItem[] };

function groupItems(items: DatasheetItem[]): Group[] {
  const out: Group[] = [];
  let bulletBuffer: DatasheetItem[] = [];

  function flushBullets() {
    if (bulletBuffer.length > 0) {
      out.push({ kind: "bullets", items: bulletBuffer });
      bulletBuffer = [];
    }
  }

  for (const it of items) {
    if (it.kind === "bullet") {
      bulletBuffer.push(it);
      continue;
    }
    flushBullets();
    if (it.kind === "para") out.push({ kind: "para", item: it });
    else if (it.kind === "subheading") out.push({ kind: "subheading", item: it });
    else if (it.kind === "feature") {
      out.push({ kind: "para", item: { kind: "para", text: it.text } });
    }
  }
  flushBullets();
  return out;
}
