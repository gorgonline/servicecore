import datasheetData from "@/data/datasheet.json";
import { ClosingCTA } from "./datasheet/closing-cta";
import { DatasheetHero } from "./datasheet/hero";
import { ExecutiveSummary } from "./datasheet/executive-summary";
import { KpiStrip } from "./datasheet/kpi-strip";
import { ModuleSection } from "./datasheet/module-section";
import { TableOfContents } from "./datasheet/table-of-contents";
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

export function DatasheetContent() {
  const { meta, cover, kpis, executive_summary, modules, closing, contact } =
    data;

  return (
    <main
      className="datasheet-root relative min-h-screen bg-(--color-surface-base) text-white"
      data-ds-root
    >
      <DatasheetHero cover={cover} meta={meta} />
      <KpiStrip kpis={kpis} />
      <ExecutiveSummary summary={executive_summary} modules={modules} />
      <TableOfContents modules={modules} />

      <div className="space-y-0">
        {modules.map((m, i) => (
          <ModuleSection key={m.id} module={m} index={i} />
        ))}
      </div>

      <ClosingCTA closing={closing} contact={contact} />
    </main>
  );
}
