import data from "@/data/applicore/giris.json";
import AppliCoreName from "./AppliCoreName";
import CtaLinks from "./CtaLinks";
import Screenshot from "./Screenshot";

export default function HeroSection() {
  const { hero, stats } = data;

  return (
    <section className="relative pt-16 pb-16 lg:pt-28 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm font-medium text-(--color-accent-sky-light)">{hero.eyebrow}</p>
          <h1 className="tracking-tight text-white">
            <AppliCoreName className="block text-6xl leading-none sm:text-7xl lg:text-8xl" />
            <span className="mt-6 block text-balance text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl">
              {hero.titleLead}{" "}
              <span className="bg-linear-to-r from-(--color-accent-blue-light) to-(--color-brand-accent) bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-(--color-text-overline) md:text-xl">
            {hero.lede}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base font-light leading-relaxed text-(--color-text-secondary)">
            {hero.description}
          </p>
          <div className="mt-10">
            <CtaLinks
              primaryLabel={hero.primaryLabel}
              primaryHref={hero.primaryHref}
              secondaryLabel={hero.secondaryLabel}
              secondaryHref={hero.secondaryHref}
              centered
            />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <Screenshot
            src={hero.image}
            alt={hero.imageAlt}
            caption={hero.imageCaption}
            width={1440}
            height={900}
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="flex items-baseline gap-2">
                <span className="font-mono text-4xl font-medium tracking-tight text-white lg:text-5xl">{stat.value}</span>
                <span className="text-base font-medium text-(--color-accent-sky-light)">{stat.label}</span>
              </dt>
              <dd className="mt-3 text-sm font-light leading-relaxed text-(--color-text-secondary)">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
