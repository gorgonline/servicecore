import { ArrowRight, CornerDownRight } from "lucide-react";
import data from "@/data/applicore/tasarim.json";
import Reveal from "./Reveal";
import Section from "./Section";
import SubHeading from "./SubHeading";
import TextCard from "./TextCard";
import { toneFor } from "./tones";

interface StageBoxProps {
  name: string;
  tag: string;
  tone: string;
}

function StageBox({ name, tag, tone }: StageBoxProps) {
  return (
    <div className="rounded-xl border border-white/15 bg-(--color-surface-elevated-solid) px-5 py-4">
      <p className="flex items-center gap-2.5 font-medium text-white">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${toneFor(tone).dot}`} />
        {name}
      </p>
      {tag && <span className={`mt-3 inline-flex rounded-full border px-2.5 py-0.5 text-xs ${toneFor(tone).chip}`}>{tag}</span>}
    </div>
  );
}

export default function StagesSection() {
  const { stages } = data;
  const { diagram } = stages;

  return (
    <Section id={stages.id} eyebrow={stages.eyebrow} title={stages.title} lead={stages.lead} band>
      <Reveal className="rounded-2xl border border-white/10 bg-white/3 p-6 lg:p-10">
        <ol aria-label={diagram.label} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-0">
          {diagram.main.map((stage) => (
            <li
              key={stage.name}
              className={`flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-0 ${stage.action ? "lg:flex-1" : ""}`}
            >
              <div className="lg:w-44 lg:shrink-0">
                <StageBox name={stage.name} tag={stage.tag} tone={stage.tone} />
              </div>
              {stage.action && (
                <div className="flex items-center gap-2 px-3 text-sm text-(--color-text-secondary) lg:flex-1 lg:flex-col lg:gap-1 lg:text-center lg:text-xs">
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 rotate-90 text-(--color-accent-sky-light) lg:order-2 lg:rotate-0" />
                  {stage.action}
                </div>
              )}
            </li>
          ))}
        </ol>
        <ul className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 md:grid-cols-2">
          {diagram.side.map((stage) => (
            <li key={stage.name} className="flex flex-wrap items-center gap-4">
              <CornerDownRight aria-hidden="true" className="h-4 w-4 shrink-0 text-(--color-text-muted)" />
              <div className="w-44">
                <StageBox name={stage.name} tag={stage.tag} tone={stage.tone} />
              </div>
              <span className="flex-1 basis-40 text-sm font-light text-(--color-text-secondary)">{stage.from}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <SubHeading className="mt-16 mb-8">{stages.rulesTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.rules.map((rule) => (
          <TextCard key={rule.title} title={rule.title} text={rule.text} />
        ))}
      </div>
      <p className="mt-6 max-w-4xl text-sm font-light leading-relaxed text-(--color-text-secondary)">{stages.note}</p>
    </Section>
  );
}
