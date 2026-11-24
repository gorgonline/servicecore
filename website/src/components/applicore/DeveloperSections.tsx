import { ArrowRight } from "lucide-react";
import data from "@/data/applicore/gelistirici.json";
import CodeWindow from "./CodeWindow";
import IconCard from "./IconCard";
import PointList from "./PointList";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";
import Section from "./Section";
import SubHeading from "./SubHeading";
import TextCard from "./TextCard";

interface DotListProps {
  items: string[];
}

function DotList({ items }: DotListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm font-light leading-relaxed text-(--color-text-secondary) md:text-base">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-accent)" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ScriptsSection() {
  const { scripts } = data;

  return (
    <Section id={scripts.id} eyebrow={scripts.eyebrow} title={scripts.title} lead={scripts.lead} band>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {scripts.types.map((type) => (
          <IconCard key={type.title} icon={type.icon} title={type.title} text={type.text} />
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <Screenshot src={scripts.image} alt={scripts.imageAlt} caption={scripts.imageCaption} width={1440} height={848} />
        </Reveal>
        <PointList points={scripts.bullets} className="space-y-6 lg:col-span-4" />
      </div>

      <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div className="min-w-0">
          <SubHeading className="mb-6">{scripts.sampleTitle}</SubHeading>
          <CodeWindow title={scripts.sampleFile} lines={scripts.sample.map((text) => ({ text }))} />
        </div>
        <div>
          <SubHeading className="mb-4">{scripts.componentsTitle}</SubHeading>
          <p className="mb-6 font-light leading-relaxed text-(--color-text-overline)">{scripts.componentsText}</p>
          <DotList items={scripts.componentsItems} />
          <h4 className="mt-10 mb-4 font-medium text-white">{scripts.limitsTitle}</h4>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {scripts.limits.map((limit) => (
              <div key={limit.label} className="bg-(--color-surface-base) p-4 last:col-span-2 sm:last:col-span-2">
                <dt className="text-sm text-(--color-text-secondary)">{limit.label}</dt>
                <dd className="mt-1 font-mono text-white">{limit.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

export function CliSection() {
  const { cli } = data;

  return (
    <Section id={cli.id} eyebrow={cli.eyebrow} title={cli.title} lead={cli.lead}>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {cli.flow.map((step, i) => (
          <li key={step.title} className="relative rounded-xl border border-white/10 bg-white/3 p-6">
            <p className="font-medium text-(--color-accent-sky-light)">
              <span className="mr-2 font-mono text-sm">{i + 1}</span>
              {step.title}
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary)">{step.text}</p>
            {i < cli.flow.length - 1 && (
              <ArrowRight aria-hidden="true" className="absolute top-1/2 -right-8 hidden h-5 w-5 -translate-y-1/2 text-(--color-brand-accent) lg:block" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div className="min-w-0">
          <CodeWindow
            title={cli.terminalTitle}
            lines={cli.terminal.map((line) => ({ text: line.text, muted: line.comment }))}
          />
        </div>
        <div>
          <SubHeading className="mb-6">{cli.notesTitle}</SubHeading>
          <DotList items={cli.notes} />
        </div>
      </div>

      <SubHeading className="mt-16 mb-6">{cli.commandsTitle}</SubHeading>
      <dl className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
        {cli.commands.map((command) => (
          <div key={command.name} className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-white/10 py-4">
            <dt lang="en" className="font-mono text-sm text-(--color-accent-sky-light)">{command.name}</dt>
            <dd className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{command.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function IntegrationSection() {
  const { integration } = data;

  return (
    <Section id={integration.id} eyebrow={integration.eyebrow} title={integration.title} lead={integration.lead} band>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {integration.cards.map((card) => (
          <IconCard key={card.title} icon={card.icon} title={card.title} text={card.text} />
        ))}
      </div>

      <SubHeading className="mt-16 mb-8">{integration.usesTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {integration.uses.map((use) => (
          <TextCard key={use.title} title={use.title} text={use.text} />
        ))}
      </div>

      <SubHeading className="mt-16 mb-4">{integration.queriesTitle}</SubHeading>
      <p className="mb-8 max-w-3xl font-light leading-relaxed text-(--color-text-secondary)">{integration.queriesText}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {integration.queries.map((query) => (
          <TextCard key={query.title} title={query.title} text={query.text} />
        ))}
      </div>
    </Section>
  );
}
