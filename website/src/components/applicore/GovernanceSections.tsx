import { Minus, Plus } from "lucide-react";
import data from "@/data/applicore/yonetim.json";
import IconCard from "./IconCard";
import PointList from "./PointList";
import Reveal from "./Reveal";
import ScopeDemo from "./ScopeDemo";
import Screenshot from "./Screenshot";
import Section from "./Section";
import SensitiveDemo from "./SensitiveDemo";
import SubHeading from "./SubHeading";
import { toneFor } from "./tones";

export function PublishSection() {
  const { publish } = data;

  return (
    <Section id={publish.id} eyebrow={publish.eyebrow} title={publish.title} lead={publish.lead}>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <PointList points={publish.bullets} className="space-y-8 lg:col-span-6" />
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <Screenshot
            src={publish.image}
            alt={publish.imageAlt}
            caption={publish.imageCaption}
            width={760}
            height={900}
            sizes="(min-width: 1024px) 500px, 100vw"
          />
        </Reveal>
      </div>

      <SubHeading className="mt-16 mb-8">{publish.statesTitle}</SubHeading>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {publish.states.map((state) => (
          <div key={state.name} className="rounded-xl border border-white/10 bg-white/3 p-5">
            <dt>
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${toneFor(state.tone).chip}`}>
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${toneFor(state.tone).dot}`} />
                {state.name}
              </span>
            </dt>
            <dd className="mt-3 text-sm font-light leading-relaxed text-(--color-text-secondary)">{state.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function AuditSection() {
  const { audit } = data;

  return (
    <Section eyebrow={audit.eyebrow} title={audit.title} band>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Screenshot
            src={audit.image}
            alt={audit.imageAlt}
            caption={audit.imageCaption}
            width={760}
            height={900}
            sizes="(min-width: 1024px) 500px, 100vw"
          />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <PointList points={audit.bullets} className="space-y-8" />
          <SubHeading className="mt-12 mb-6">{audit.packageTitle}</SubHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { group: audit.packageIn, Icon: Plus },
              { group: audit.packageOut, Icon: Minus },
            ].map(({ group, Icon }) => (
              <div key={group.title} className="rounded-xl border border-white/10 bg-white/3 p-6">
                <h4 className="font-medium text-white">{group.title}</h4>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm font-light leading-relaxed text-(--color-text-secondary)">
                      <Icon aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-(--color-accent-sky-light)" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function AccessSection() {
  const { access } = data;

  return (
    <Section id={access.id} eyebrow={access.eyebrow} title={access.title} lead={access.lead}>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SubHeading className="mb-4">{access.actionsTitle}</SubHeading>
          <dl>
            {access.actions.map((action) => (
              <div key={action.name} className="grid grid-cols-[9rem_1fr] gap-4 border-t border-white/10 py-4">
                <dt className="text-sm font-medium text-white">{action.name}</dt>
                <dd className="text-sm font-light leading-relaxed text-(--color-text-secondary)">{action.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <SubHeading className="mb-4">{access.scopeTitle}</SubHeading>
          <p className="mb-6 font-light leading-relaxed text-(--color-text-secondary)">{access.scopeText}</p>
          <ScopeDemo />
        </div>
      </div>

      <SubHeading className="mt-16 mb-6">{access.rulesTitle}</SubHeading>
      <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
        {access.rules.map((rule) => (
          <li key={rule} className="border-t border-white/10 py-4 text-sm font-light leading-relaxed text-(--color-text-overline) md:text-base">
            {rule}
          </li>
        ))}
      </ul>

      <SubHeading className="mt-16 mb-8">{access.peopleTitle}</SubHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {access.people.map((person) => (
          <IconCard key={person.title} icon={person.icon} title={person.title} text={person.text} />
        ))}
      </div>
    </Section>
  );
}

export function SensitiveSection() {
  const { sensitive } = data;

  return (
    <Section id={sensitive.id} eyebrow={sensitive.eyebrow} title={sensitive.title} band>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <PointList points={sensitive.bullets} className="space-y-6 lg:col-span-5" />
        <div className="min-w-0 lg:col-span-7">
          <SensitiveDemo />
        </div>
      </div>
      <Reveal className="mx-auto mt-16 max-w-5xl">
        <Screenshot
          src={sensitive.image}
          alt={sensitive.imageAlt}
          caption={sensitive.imageCaption}
          width={1440}
          height={848}
          sizes="(min-width: 1280px) 1024px, 100vw"
        />
      </Reveal>
    </Section>
  );
}

export function UsageSection() {
  const { usage } = data;

  return (
    <Section id={usage.id} eyebrow={usage.eyebrow} title={usage.title} lead={usage.lead}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {usage.cards.map((card) => (
          <IconCard key={card.title} icon={card.icon} title={card.title} text={card.text} />
        ))}
      </div>
    </Section>
  );
}
