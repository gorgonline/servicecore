"use client";

import { useState } from "react";
import { Eye, EyeOff, History } from "lucide-react";
import data from "@/data/applicore/yonetim.json";
import SegmentedControl from "./SegmentedControl";

const DEMO = data.sensitive.demo;
const PERMISSIONS = [
  { id: "var", label: DEMO.permissionOn },
  { id: "yok", label: DEMO.permissionOff },
];

export default function SensitiveDemo() {
  const [permission, setPermission] = useState("var");
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<string[]>([]);
  const allowed = permission === "var";

  function handlePermission(id: string) {
    setPermission(id);
    if (id === "yok") setOpen(false);
  }

  function handleToggle() {
    if (!open) {
      const time = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setEntries((prev) => [time, ...prev].slice(0, 3));
    }
    setOpen((prev) => !prev);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{DEMO.title}</h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-(--color-text-secondary)">{DEMO.permissionLabel}</span>
          <SegmentedControl label={DEMO.permissionLabel} options={PERMISSIONS} value={permission} onChange={handlePermission} />
        </div>
      </div>

      <dl className="mt-6">
        {DEMO.fields.map((field) => (
          <div key={field.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-white/10 py-3 text-sm">
            <dt className="text-(--color-text-secondary)">{field.label}</dt>
            <dd className={field.sensitive ? "font-mono text-white" : "text-white"}>
              {field.sensitive && !open ? DEMO.mask : field.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex min-h-11 items-center">
        {allowed ? (
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active)"
          >
            {open ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
            {open ? DEMO.closeLabel : DEMO.openLabel}
          </button>
        ) : (
          <p className="text-sm font-light text-(--color-text-secondary)">{DEMO.noPermission}</p>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-(--color-surface-base)/60 p-5">
        <h4 className="flex items-center gap-2 text-sm font-medium text-white">
          <History aria-hidden="true" className="h-4 w-4 text-(--color-accent-sky-light)" />
          {DEMO.historyTitle}
        </h4>
        <ul aria-live="polite" className="mt-3 min-h-18 space-y-2 text-sm">
          {entries.length === 0 && <li className="text-(--color-text-muted)">{DEMO.historyEmpty}</li>}
          {entries.map((time, i) => (
            <li key={`${time}-${i}`} className="flex flex-wrap gap-x-3 text-(--color-text-secondary)">
              <span className="font-mono">{time}</span>
              <span className="text-white">{DEMO.historyUser}</span>
              <span>{DEMO.historyEntry}</span>
              <span className="text-(--color-text-muted)">{DEMO.historyFields}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm font-light text-(--color-text-muted)">{DEMO.historyNote}</p>
    </div>
  );
}
