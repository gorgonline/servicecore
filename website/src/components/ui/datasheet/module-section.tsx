import { renderModuleIcon } from "./icon-map";
import { ModuleMock, type MockAccent } from "./module-mocks";
import { ProjectFeatureGrid } from "./project-feature-grid";
import { transformItems } from "./text-blocks";
import type { DatasheetModule } from "./types";

interface ModuleSectionProps {
  module: DatasheetModule;
  index: number;
}

const VARIANT_C_IDS = new Set(["project-management"]);

export function ModuleSection({ module, index }: ModuleSectionProps) {
  const number = String(index + 1).padStart(2, "0");
  const isFeatureGrid = VARIANT_C_IDS.has(module.id);

  return (
    <section
      id={module.id}
      data-ds-module
      className="relative scroll-mt-28 print:break-before-page border-t border-white/5"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12 py-24 print:py-14">
        <header className="mb-14 print:mb-8">
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-(--color-text-muted) mb-10">
            <span className="text-(--color-brand-accent)">MODÜL {number}</span>
            <span className="text-white/15">/</span>
            <span className="truncate">{module.title}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span aria-hidden="true" className="shrink-0 text-(--color-text-muted)">
              {renderModuleIcon(module.icon, {
                className: "w-6 h-6",
                strokeWidth: 1.5,
              })}
            </span>
            <h2 className="datasheet-h2-large text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
              {module.title_tr || module.title}
            </h2>
          </div>

          <p className="text-lg font-light leading-relaxed text-(--color-text-secondary) max-w-2xl">
            {module.tagline}
          </p>
        </header>

        <div className="mt-12 mb-12 rounded-3xl border border-white/10 bg-white/2 p-8 print:hidden">
          <ModuleMock moduleId={module.id} accent={module.accent as MockAccent} />
        </div>

        {isFeatureGrid ? (
          <ProjectFeatureGrid module={module} />
        ) : (
          <ModuleBody module={module} />
        )}
      </div>
    </section>
  );
}

interface ModuleBodyProps {
  module: DatasheetModule;
}

function ModuleBody({ module }: ModuleBodyProps) {
  const blocks = transformItems(module.items);

  return (
    <div className="max-w-prose">
      {blocks.map((b, bi) => {
        if (b.kind === "para") {
          return (
            <p
              key={bi}
              className="datasheet-body break-inside-avoid mb-6 text-[17px] leading-[1.8] font-light text-(--color-text-secondary) print:text-[11pt] print:leading-[1.7] print:mb-3"
            >
              {b.text}
            </p>
          );
        }
        if (b.kind === "subheading") {
          return (
            <h3
              key={bi}
              className="break-inside-avoid mt-12 mb-6 text-xs font-mono uppercase tracking-[0.22em] text-white print:mt-6 print:mb-3"
            >
              {b.text}
            </h3>
          );
        }
        return (
          <ol
            key={bi}
            className="my-8 space-y-3 print:my-4 print:space-y-2 break-inside-avoid"
          >
            {b.items.map((it, ii) => (
              <li key={ii} className="flex gap-4 break-inside-avoid">
                <span className="shrink-0 w-6 text-[11px] font-mono text-(--color-text-muted) tabular-nums mt-1.5">
                  {String(it.number).padStart(2, "0")}
                </span>
                <p className="flex-1 min-w-0 text-[17px] font-light leading-[1.75] text-(--color-text-secondary) print:text-[11pt]">
                  {it.text}
                </p>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
