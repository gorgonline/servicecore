import { CheckCircle2 } from "lucide-react";
import { getAccent } from "./accents";
import type { DatasheetItem, DatasheetModule } from "./types";

interface ProjectFeatureGridProps {
  module: DatasheetModule;
}

interface FeatureItem {
  title: string;
  text: string;
  checks: string[];
  index: number;
}

interface SubheadingItem {
  text: string;
}

const COL_SPANS: Record<string, string> = {
  "Projenizin Kontrol Paneli": "lg:col-span-6 print:col-span-2",
  "Akış Bazlı Kanban & Scrum Board": "lg:col-span-6 print:col-span-2",
  "Sprint Kapasitesi ve Yük Dengesi": "lg:col-span-4 print:col-span-1",
  "Agile Odaklı Backlog Yönetimi": "lg:col-span-4 print:col-span-1",
  "Isı Haritası & Utilization Takibi": "lg:col-span-4 print:col-span-2",
  "Gerçek Zamanlı Ekip İş Yükü Takibi": "lg:col-span-6 print:col-span-1",
  "Gantt Vizyonuyla Proje Yol Haritası": "lg:col-span-6 print:col-span-1",
  "Görev Zamanlama (Scheduler)": "lg:col-span-4 print:col-span-1",
  "İş Akışı & Geçiş Kontrolü": "lg:col-span-4 print:col-span-1",
  "Görev Türü Tanımı (Task Types)": "lg:col-span-4 print:col-span-2",
  "Hassas Zaman Kaydı (Worklog)": "lg:col-span-4 print:col-span-1",
  "Board / Pano Özelleştirme": "lg:col-span-4 print:col-span-1",
  "Table & Inline Kaba Düzen": "lg:col-span-4 print:col-span-2",
};

export function ProjectFeatureGrid({ module }: ProjectFeatureGridProps) {
  const accent = getAccent(module.accent);

  // Build sequential blocks: para / subheading / feature row groups
  const blocks: (
    | { kind: "para"; text: string; isFirst: boolean }
    | { kind: "subheading"; text: string }
    | { kind: "features"; items: FeatureItem[] }
  )[] = [];

  let featureBuffer: FeatureItem[] = [];
  let featureCounter = 0;
  let firstParaPlaced = false;

  function flushFeatures() {
    if (featureBuffer.length > 0) {
      blocks.push({ kind: "features", items: featureBuffer });
      featureBuffer = [];
    }
  }

  for (const it of module.items as DatasheetItem[]) {
    if (it.kind === "feature") {
      featureCounter += 1;
      featureBuffer.push({
        title: it.title ?? "",
        text: it.text ?? "",
        checks: it.checks ?? [],
        index: featureCounter,
      });
      continue;
    }
    flushFeatures();
    if (it.kind === "para") {
      blocks.push({ kind: "para", text: it.text ?? "", isFirst: !firstParaPlaced });
      firstParaPlaced = true;
    } else if (it.kind === "subheading") {
      blocks.push({ kind: "subheading", text: (it as SubheadingItem).text ?? "" });
    }
  }
  flushFeatures();

  return (
    <div className="max-w-7xl">
      {blocks.map((block, bi) => {
        if (block.kind === "para") {
          return (
            <p
              key={bi}
              className="text-base lg:text-[17px] leading-[1.75] font-light text-(--color-text-secondary) mb-8 max-w-[68ch] break-inside-avoid"
            >
              {block.isFirst && block.text.length > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="float-left mr-3 mt-1 text-[56px] leading-none font-mono font-bold"
                    style={{
                      color: "transparent",
                      backgroundImage: `linear-gradient(180deg, white, ${accent.light})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {block.text.charAt(0)}
                  </span>
                  {block.text.slice(1)}
                </>
              ) : (
                block.text
              )}
            </p>
          );
        }
        if (block.kind === "subheading") {
          return (
            <div key={bi} className="my-12 print:my-6 break-inside-avoid">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span
                  className="w-1 h-8 rounded-full"
                  style={{ background: accent.base }}
                  aria-hidden="true"
                />
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                  {block.text}
                </h3>
              </div>
            </div>
          );
        }
        return (
          <div
            key={bi}
            className="grid grid-cols-1 lg:grid-cols-12 print:grid-cols-2 gap-5 lg:gap-6 print:gap-3 mb-10"
          >
            {block.items.map((f) => (
              <FeatureCard
                key={f.index}
                feature={f}
                accentBase={accent.base}
                accentLight={accent.light}
                accentAlpha10={accent.alpha10}
                accentAlpha30={accent.alpha30}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

interface FeatureCardProps {
  feature: FeatureItem;
  accentBase: string;
  accentLight: string;
  accentAlpha10: string;
  accentAlpha30: string;
}

function FeatureCard({
  feature,
  accentBase,
  accentLight,
  accentAlpha10,
  accentAlpha30,
}: FeatureCardProps) {
  const span = COL_SPANS[feature.title] ?? "lg:col-span-4 print:col-span-1";
  return (
    <article
      className={`${span} group relative rounded-2xl bg-white/3 border border-white/10 backdrop-blur-md p-6 lg:p-8 print:p-4 print:rounded-md break-inside-avoid hover:border-white/20 transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold tracking-wider"
          style={{
            background: accentAlpha10,
            border: `1px solid ${accentAlpha30}`,
            color: accentLight,
          }}
        >
          F.{String(feature.index).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full opacity-60"
          style={{ background: accentBase }}
        />
      </div>
      <h4 className="text-lg lg:text-xl font-semibold tracking-tight text-white mb-2">
        {feature.title}
      </h4>
      <p className="text-sm font-light leading-relaxed text-(--color-text-secondary)">
        {feature.text}
      </p>
      {feature.checks.length > 0 && (
        <ul className="mt-5 pt-4 border-t border-white/5 space-y-2">
          {feature.checks.map((c, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm font-light text-(--color-text-secondary)"
            >
              <CheckCircle2
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: accentLight }}
                aria-hidden="true"
              />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
