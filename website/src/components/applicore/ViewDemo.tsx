"use client";

import { useState } from "react";
import data from "@/data/applicore/tasarim.json";
import SegmentedControl from "./SegmentedControl";
import Swap from "./Swap";
import { toneFor } from "./tones";

const DEMO = data.screens.demo;
/** Kasim 2026 pazar gunu baslar: takvimin ilk haftasinda alti bos gun var. */
const LEADING_DAYS = 6;
const DAYS_IN_MONTH = 30;

function stageTone(stage: string): string {
  return DEMO.stages.find((item) => item.name === stage)?.tone ?? "slate";
}

function ListView() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-160 text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-(--color-text-muted)">
            {DEMO.columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-3 font-medium last:text-right">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DEMO.records.map((record) => (
            <tr key={record.no} className="border-b border-white/5 last:border-b-0">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-(--color-text-secondary)">{record.no}</td>
              <td className="px-4 py-3 text-white">{record.title}</td>
              <td className="px-4 py-3 text-(--color-text-secondary)">{record.priority}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 ${toneFor(stageTone(record.stage)).chip}`}>
                  {record.stage}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-(--color-text-overline)">{record.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BoardView() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {DEMO.stages.map((stage) => {
        const cards = DEMO.records.filter((record) => record.stage === stage.name);
        return (
          <div key={stage.name} className="w-60 shrink-0 rounded-xl border border-white/10 bg-white/3 p-3 lg:w-auto lg:flex-1">
            <div className="mb-3 flex items-center justify-between px-1 text-sm">
              <span className="flex items-center gap-2 font-medium text-white">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${toneFor(stage.tone).dot}`} />
                {stage.name}
              </span>
              <span className="font-mono text-(--color-text-muted)">{cards.length}</span>
            </div>
            <ul className="space-y-2">
              {cards.map((record) => (
                <li key={record.no} className="rounded-lg border border-white/10 bg-(--color-surface-elevated-solid) p-3">
                  <p className="font-mono text-xs text-(--color-text-muted)">{record.no}</p>
                  <p className="mt-1 text-sm text-white">{record.title}</p>
                  <p className="mt-2 flex justify-between text-xs text-(--color-text-secondary)">
                    <span>{record.priority}</span>
                    <span className="font-mono">{record.total}</span>
                  </p>
                </li>
              ))}
              {cards.length === 0 && (
                <li className="px-1 py-4 text-sm text-(--color-text-muted)">{DEMO.emptyColumn}</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function CalendarView() {
  const cells = Array.from({ length: 42 }, (_, i) => i - LEADING_DAYS + 1).map((day) =>
    day >= 1 && day <= DAYS_IN_MONTH ? day : 0,
  );

  return (
    <div className="overflow-x-auto">
      <div className="min-w-176">
        <p className="mb-3 font-medium text-white">{DEMO.month}</p>
        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
          {DEMO.days.map((day) => (
            <div key={day} className="bg-(--color-surface-elevated-solid) px-2 py-2 text-sm text-(--color-text-muted)">{day}</div>
          ))}
          {cells.map((day, i) => {
            const items = day > 0 ? DEMO.records.filter((record) => record.day === day) : [];
            return (
              <div key={i} className="min-h-14 bg-(--color-surface-base) p-2">
                <span className="font-mono text-xs text-(--color-text-muted)">{day > 0 ? day : ""}</span>
                {items.map((record) => (
                  <p key={record.no} className="mt-1 rounded border-l-2 border-(--color-brand-accent) bg-white/5 px-2 py-1 text-xs leading-snug text-white">
                    {record.title}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ViewDemo() {
  const [view, setView] = useState(DEMO.views[0].id);

  return (
    <figure>
      <div className="rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur-xl md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{DEMO.title}</h3>
          <SegmentedControl label={DEMO.label} options={DEMO.views} value={view} onChange={setView} />
        </div>
        <Swap swapKey={view} className="lg:min-h-120">
          {view === "liste" && <ListView />}
          {view === "pano" && <BoardView />}
          {view === "takvim" && <CalendarView />}
        </Swap>
      </div>
      <figcaption className="mt-3 text-sm font-light text-(--color-text-secondary)">{DEMO.caption}</figcaption>
    </figure>
  );
}
