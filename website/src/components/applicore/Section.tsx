import Reveal from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Bolumu zeminden ayiran serit. */
  band?: boolean;
  children: React.ReactNode;
}

export default function Section({ id, eyebrow, title, lead, band = false, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-14 py-20 lg:py-28 ${band ? "border-y border-white/5 bg-white/2" : ""}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <Reveal className="mb-12 max-w-3xl lg:mb-16">
          <p className="mb-4 text-sm font-medium text-(--color-accent-sky-light)">{eyebrow}</p>
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {lead && (
            <p className="mt-5 text-base font-light leading-relaxed text-(--color-text-secondary) md:text-lg">
              {lead}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
