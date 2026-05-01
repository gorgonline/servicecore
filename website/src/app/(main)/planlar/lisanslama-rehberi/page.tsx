import { CheckCircle2, HelpCircle, ChevronRight } from "lucide-react";
import AboutHero from "@/components/ui/AboutHero";
import lisansData from "@/data/lisanslama-rehberi.json";

interface ListBlock {
  title?: string;
  items: string[];
  footer?: string;
}

interface Group {
  label: string;
  tagline?: string;
  items?: string[];
}

interface Category {
  label: string;
  items: string[];
}

interface Section {
  number: string;
  title: string;
  intro?: string;
  items?: string[];
  groups?: Group[];
  categories?: Category[];
  examples?: ListBlock;
  moduleList?: ListBlock;
  note?: ListBlock;
}

export default function LisanslamaRehberiPage() {
  const sections = lisansData.sections as Section[];

  return (
    <div className="bg-(--color-surface-base-dark) text-white selection:bg-(--color-brand-primary)/30">
      <AboutHero
        title={lisansData.hero.title}
        subtitle={lisansData.hero.subtitle}
        description={lisansData.hero.description}
      />

      <section className="py-24 bg-(--color-surface-base) relative overflow-hidden">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-(--color-brand-primary)/8 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

        <div className="mx-auto max-w-5xl px-6 lg:px-12 relative z-10 space-y-10">
          {sections.map((section) => (
            <SectionCard key={section.number} section={section} />
          ))}
        </div>
      </section>

      <section className="py-24 bg-(--color-surface-base-dark) relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="mx-auto max-w-4xl px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/20">
              <HelpCircle className="w-6 h-6 text-(--color-brand-primary)" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Sıkça Sorulan Sorular</h2>
          </div>

          <div className="grid gap-6">
            {lisansData.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors group"
              >
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-(--color-brand-primary) transition-colors">
                  {item.question}
                </h3>
                <p className="text-(--color-text-secondary) leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  return (
    <article className="relative p-10 rounded-3xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-md">
      <header className="flex items-start gap-6 mb-8">
        <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-(--color-brand-primary)/10 border border-(--color-brand-primary)/30 text-(--color-brand-primary) font-mono font-semibold text-lg">
          {section.number}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight pt-2">
          {section.title}
        </h2>
      </header>

      <div className="space-y-7 pl-0 md:pl-20">
        {section.intro && (
          <p className="text-(--color-text-secondary) leading-relaxed font-light text-base md:text-lg">
            {section.intro}
          </p>
        )}

        {section.items && <BulletList items={section.items} />}

        {section.groups && (
          <div className="grid gap-5">
            {section.groups.map((g) => (
              <GroupBlock key={g.label} group={g} />
            ))}
          </div>
        )}

        {section.categories && (
          <div className="grid md:grid-cols-2 gap-4">
            {section.categories.map((c) => (
              <CategoryBlock key={c.label} category={c} />
            ))}
          </div>
        )}

        {section.moduleList && <CalloutBlock block={section.moduleList} variant="primary" />}

        {section.examples && <CalloutBlock block={section.examples} variant="accent" />}

        {section.note && <CalloutBlock block={section.note} variant="muted" />}
      </div>
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-(--color-text-secondary) font-light leading-relaxed">
          <CheckCircle2 className="w-5 h-5 text-(--color-brand-secondary) shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <div className="p-6 rounded-2xl bg-white/2 border border-white/5">
      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{group.label}</h3>
      {group.tagline && (
        <p className="text-(--color-text-secondary) font-light leading-relaxed mb-4">
          {group.tagline}
        </p>
      )}
      {group.items && (
        <ul className="space-y-2.5">
          {group.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-(--color-text-secondary) font-light leading-relaxed text-sm">
              <ChevronRight className="w-4 h-4 text-(--color-brand-primary) shrink-0 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CategoryBlock({ category }: { category: Category }) {
  return (
    <div className="p-5 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors">
      <h4 className="text-sm font-semibold tracking-[0.1em] uppercase text-(--color-brand-primary) mb-3">
        {category.label}
      </h4>
      <ul className="space-y-2">
        {category.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-(--color-text-secondary) font-light leading-relaxed text-sm">
            <span className="w-1 h-1 rounded-full bg-white/30 shrink-0 mt-2.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalloutBlock({
  block,
  variant,
}: {
  block: ListBlock;
  variant: "primary" | "accent" | "muted";
}) {
  const styles =
    variant === "primary"
      ? "bg-(--color-brand-primary)/5 border-(--color-brand-primary)/20"
      : variant === "accent"
        ? "bg-(--color-brand-accent)/5 border-(--color-brand-accent)/20"
        : "bg-white/2 border-white/8";

  const titleColor =
    variant === "primary"
      ? "text-(--color-brand-primary)"
      : variant === "accent"
        ? "text-(--color-brand-accent)"
        : "text-white/70";

  return (
    <div className={`p-6 rounded-2xl border ${styles}`}>
      {block.title && (
        <h4 className={`text-xs font-semibold tracking-[0.18em] uppercase mb-4 ${titleColor}`}>
          {block.title}
        </h4>
      )}
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-(--color-text-secondary) font-light leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0 mt-2.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {block.footer && (
        <p className="mt-4 pt-4 border-t border-white/5 text-(--color-text-secondary) font-light leading-relaxed text-sm">
          {block.footer}
        </p>
      )}
    </div>
  );
}
