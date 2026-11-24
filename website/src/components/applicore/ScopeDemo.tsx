"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "@/data/applicore/yonetim.json";
import SegmentedControl from "./SegmentedControl";

const DEMO = data.access.scopeDemo;

function rowsFor(scope: string) {
  return DEMO.rows.filter((row) => {
    if (scope === "tumu") return true;
    if (row.owner === DEMO.user) return true;
    return scope === "grubunun" && row.group === DEMO.group;
  });
}

export default function ScopeDemo() {
  const [scope, setScope] = useState(DEMO.scopes[0].id);
  const rows = rowsFor(scope);
  const selected = DEMO.scopes.find((item) => item.id === scope) ?? DEMO.scopes[0];

  return (
    <figure>
      <div className="rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur-xl md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <SegmentedControl label={DEMO.label} options={DEMO.scopes} value={scope} onChange={setScope} />
          <p aria-live="polite" className="text-sm text-(--color-text-secondary)">
            <span className="font-mono text-white">{rows.length}</span> {DEMO.countLabel}
          </p>
        </div>
        <p className="mb-4 min-h-10 text-sm font-light text-(--color-text-overline)">{selected.text}</p>
        <div className="overflow-x-auto lg:min-h-72">
          <table className="w-full min-w-136 text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-(--color-text-muted)">
                {DEMO.columns.map((column) => (
                  <th key={column} scope="col" className="px-3 py-3 font-medium">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {rows.map((row) => (
                  <motion.tr
                    key={row.no}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-(--color-text-secondary)">{row.no}</td>
                    <td className="px-3 py-3 text-white">{row.title}</td>
                    <td className={`px-3 py-3 ${row.owner === DEMO.user ? "text-(--color-accent-sky-light)" : "text-(--color-text-secondary)"}`}>{row.owner}</td>
                    <td className={`px-3 py-3 ${row.group === DEMO.group ? "text-(--color-accent-sky-light)" : "text-(--color-text-secondary)"}`}>{row.group}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="mt-3 text-sm font-light text-(--color-text-secondary)">{DEMO.caption}</figcaption>
    </figure>
  );
}
