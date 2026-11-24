import data from "@/data/applicore/tasarim.json";
import AppIcon from "./AppIcon";
import IconCard from "./IconCard";
import PointList from "./PointList";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";
import Section from "./Section";
import SubHeading from "./SubHeading";
import TextCard from "./TextCard";
import ViewDemo from "./ViewDemo";

export function JourneySection() {
  const { journey } = data;

  return (
    <Section id={journey.id} eyebrow={journey.eyebrow} title={journey.title} lead={journey.lead} band>
      <ol className="relative grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        {journey.steps.map((step, i) => (
          <li key={step.title} className="flex gap-6 border-t border-white/10 py-7">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--color-brand-accent)/30 bg-(--color-brand-accent)/10 font-mono text-sm text-(--color-accent-sky-light)">
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white">{step.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary) md:text-base">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function StudioSection() {
  const { studio } = data;

  return (
    <Section id={studio.id} eyebrow={studio.eyebrow} title={studio.title} lead={studio.lead}>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <PointList points={studio.bullets} className="space-y-6 lg:col-span-4" />
        <Reveal className="lg:col-span-8">
          <Screenshot src={studio.image} alt={studio.imageAlt} caption={studio.imageCaption} width={1440} height={848} />
        </Reveal>
      </div>

      <SubHeading className="mt-20 mb-8">{studio.areasTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {studio.areas.map((area) => (
          <IconCard key={area.title} icon={area.icon} title={area.title} text={area.text} />
        ))}
      </div>

      <SubHeading className="mt-20 mb-8">{studio.toolsTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {studio.tools.map((tool) => (
          <TextCard key={tool.title} title={tool.title} text={tool.text} />
        ))}
      </div>
    </Section>
  );
}

export function DataSection() {
  const { data: datasets } = data;

  return (
    <Section id={datasets.id} eyebrow={datasets.eyebrow} title={datasets.title} lead={datasets.lead} band>
      <Reveal>
        <dl className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
          {datasets.groups.map((group) => (
              <div
                key={group.name}
                className="grid grid-cols-1 gap-4 border-b border-white/10 px-6 py-5 last:border-b-0 md:grid-cols-[14rem_1fr] md:items-center lg:px-8"
              >
                <dt className="flex items-center gap-3 font-medium text-white">
                  <AppIcon name={group.icon} className="h-4 w-4 text-(--color-accent-sky-light)" />
                  {group.name}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {group.types.map((type) => (
                    <span key={type} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-(--color-text-overline)">
                      {type}
                    </span>
                  ))}
                </dd>
              </div>
          ))}
        </dl>
      </Reveal>

      <SubHeading className="mt-20 mb-8">{datasets.featuresTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {datasets.features.map((feature) => (
          <TextCard key={feature.title} title={feature.title} text={feature.text} />
        ))}
      </div>
    </Section>
  );
}

export function ScreensSection() {
  const { screens } = data;

  return (
    <Section id={screens.id} eyebrow={screens.eyebrow} title={screens.title} lead={screens.lead}>
      <ViewDemo />
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {screens.cards.map((card) => (
          <IconCard key={card.title} icon={card.icon} title={card.title} text={card.text} items={card.items} />
        ))}
      </div>
    </Section>
  );
}
