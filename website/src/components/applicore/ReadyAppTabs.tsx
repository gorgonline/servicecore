"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import data from "@/data/applicore/uygulamalar.json";
import AppIcon from "./AppIcon";
import Swap from "./Swap";

const APPS = data.apps;

export default function ReadyAppTabs() {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const app = APPS[index];

  function move(step: number) {
    const next = (index + step + APPS.length) % APPS.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      move(1);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(-1);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div
        role="tablist"
        aria-label={data.tabsLabel}
        onKeyDown={handleKeyDown}
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {APPS.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`uygulama-sekme-${item.id}`}
              aria-selected={selected}
              aria-controls="uygulama-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`flex shrink-0 cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) ${
                selected
                  ? "border-(--color-border-active) bg-(--color-brand-primary)/10"
                  : "border-white/10 bg-white/3 hover:border-white/20"
              }`}
            >
              <AppIcon
                name={item.icon}
                className={`h-5 w-5 shrink-0 ${selected ? "text-(--color-accent-sky-light)" : "text-(--color-text-muted)"}`}
              />
              <span>
                <span className="block whitespace-nowrap font-medium text-white">{item.name}</span>
                <span className="mt-0.5 block whitespace-nowrap text-sm font-light text-(--color-text-secondary)">{item.kind}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="uygulama-panel"
        aria-labelledby={`uygulama-sekme-${app.id}`}
        className="rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl lg:col-span-8 lg:min-h-136 lg:p-10"
      >
        <Swap swapKey={app.id}>
          <h3 className="text-2xl font-semibold tracking-tight text-white">{app.name}</h3>
          <p className="mt-3 max-w-2xl font-light leading-relaxed text-(--color-text-secondary)">{app.summary}</p>

          <h4 className="mt-8 text-sm font-medium text-(--color-accent-sky-light)">{data.labels.highlights}</h4>
          <ul className="mt-3 space-y-3">
            {app.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-light leading-relaxed text-(--color-text-overline) md:text-base">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-(--color-accent-sky-light)" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
            <div>
              <h4 className="text-sm font-medium text-(--color-accent-sky-light)">{data.labels.datasets}</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {app.datasets.map((item) => (
                  <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-(--color-text-overline)">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {app.stages.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-(--color-accent-sky-light)">{data.labels.stages}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {app.stages.map((stage) => (
                    <li key={stage} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-(--color-text-overline)">
                      {stage}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {app.approval && (
              <div>
                <h4 className="text-sm font-medium text-(--color-accent-sky-light)">{data.labels.approval}</h4>
                <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-overline) md:text-base">{app.approval}</p>
              </div>
            )}
          </div>
        </Swap>
      </div>
    </div>
  );
}
