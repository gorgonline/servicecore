import { ChevronDown } from "lucide-react";
import data from "@/data/applicore/kapanis.json";
import CtaLinks from "./CtaLinks";
import NumberedSteps from "./NumberedSteps";
import Section from "./Section";
import TextCard from "./TextCard";

export function ScaleSection() {
  const { scale } = data;

  return (
    <Section id={scale.id} eyebrow={scale.eyebrow} title={scale.title} lead={scale.lead} band>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {scale.items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse justify-end bg-(--color-surface-base) p-6">
            <dt className="mt-2 text-sm font-light text-(--color-text-secondary)">{item.label}</dt>
            <dd className="font-mono text-2xl font-medium tracking-tight text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function DemoSection() {
  const { demo } = data;

  return (
    <Section eyebrow={demo.eyebrow} title={demo.title}>
      <NumberedSteps steps={demo.items} className="sm:grid-cols-2 lg:grid-cols-3" />
    </Section>
  );
}

export function FaqSection() {
  const { faq } = data;

  return (
    <Section id={faq.id} eyebrow={faq.eyebrow} title={faq.title} band>
      <div className="max-w-4xl">
        {faq.items.map((item) => (
          <details key={item.q} className="group border-t border-white/10 last:border-b">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) md:text-lg [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-(--color-text-muted) transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="pb-6 pr-10 font-light leading-relaxed text-(--color-text-secondary)">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export function NextSection() {
  const { next } = data;

  return (
    <Section eyebrow={next.eyebrow} title={next.title}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {next.steps.map((step, i) => (
          <TextCard key={step.title} title={`${i + 1}. ${step.title}`} text={step.text} />
        ))}
      </div>
      <p className="mt-6 mb-10 font-light text-(--color-text-secondary)">{next.note}</p>
      <CtaLinks
        primaryLabel={next.primaryLabel}
        primaryHref={next.primaryHref}
        secondaryLabel={next.secondaryLabel}
        secondaryHref={next.secondaryHref}
      />
    </Section>
  );
}
