import Link from "next/link";
import { ArrowDownRight, Check, X } from "lucide-react";
import data from "@/data/applicore/giris.json";
import IconCard from "./IconCard";
import Reveal from "./Reveal";
import Section from "./Section";
import SubHeading from "./SubHeading";
import TextCard from "./TextCard";

export function WhySection() {
  const { why } = data;

  return (
    <Section id={why.id} eyebrow={why.eyebrow} title={why.title} lead={why.lead} band>
      <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
        <table className="w-full border-collapse text-left text-sm md:text-base">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-white/10 text-sm">
              <th scope="col" className="w-1/5 px-6 py-4 font-medium text-(--color-text-muted)">{why.columns.topic}</th>
              <th scope="col" className="w-2/5 px-6 py-4 font-medium text-(--color-text-secondary)">{why.columns.separate}</th>
              <th scope="col" className="w-2/5 bg-(--color-brand-primary)/10 px-6 py-4 font-medium text-white">{why.columns.applicore}</th>
            </tr>
          </thead>
          <tbody>
            {why.rows.map((row) => (
              <tr key={row.topic} className="block border-b border-white/10 last:border-b-0 md:table-row">
                <th scope="row" className="block px-6 pt-5 pb-2 font-medium text-white md:table-cell md:py-5">{row.topic}</th>
                <td className="block px-6 py-2 font-light text-(--color-text-secondary) md:table-cell md:py-5">
                  <span className="flex items-start gap-3">
                    <X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-(--color-text-muted)" />
                    {row.separate}
                  </span>
                </td>
                <td className="block bg-(--color-brand-primary)/10 px-6 py-4 font-light text-(--color-text-overline) md:table-cell md:py-5">
                  <span className="flex items-start gap-3">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-(--color-accent-sky-light)" />
                    {row.applicore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}

export function WhatSection() {
  const { what, pillars } = data;

  return (
    <Section eyebrow={what.eyebrow} title={what.title} lead={what.lead}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {what.cards.map((card, i) => (
          <Reveal key={card.title} delay={(i % 3) * 0.05}>
            <IconCard icon={card.icon} title={card.title} text={card.text} />
          </Reveal>
        ))}
      </div>

      <SubHeading className="mt-20 mb-8">{pillars.title}</SubHeading>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.items.map((item) => (
          <Link
            key={item.no}
            href={item.href}
            className="group flex cursor-pointer flex-col bg-(--color-surface-base) p-6 transition-colors hover:bg-(--color-surface-elevated-solid) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-border-active) sm:last:col-span-2 lg:last:col-span-1"
          >
            <span className="flex items-center justify-between font-mono text-sm text-(--color-accent-sky-light)">
              {item.no}
              <ArrowDownRight aria-hidden="true" className="h-4 w-4 text-(--color-text-muted) transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-white" />
            </span>
            <span className="mt-4 font-medium text-white">{item.title}</span>
            <span className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary)">{item.text}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function InsideSection() {
  const { inside } = data;

  return (
    <Section id={inside.id} eyebrow={inside.eyebrow} title={inside.title} lead={inside.lead} band>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {inside.cards.map((card, i) => (
          <Reveal key={card.title} delay={(i % 2) * 0.05}>
            <IconCard icon={card.icon} title={card.title} text={card.text} />
          </Reveal>
        ))}
      </div>

      <SubHeading className="mt-20 mb-8">{inside.dataTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inside.dataPoints.map((point) => (
          <TextCard key={point.title} title={point.title} text={point.text} />
        ))}
      </div>
    </Section>
  );
}
