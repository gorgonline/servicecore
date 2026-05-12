import {
  Activity,
  BarChart3,
  BookOpen,
  Box,
  Boxes,
  Brain,
  Building2,
  CalendarRange,
  Check,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Code,
  FileSignature,
  GitBranch,
  Inbox,
  KanbanSquare,
  Layers,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Network,
  PhoneCall,
  Plug,
  QrCode,
  Radar,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  UserCog,
  Warehouse,
  Workflow,
  type LucideIcon,
} from "lucide-react";

interface Section {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  items: string[];
}

interface EditionTier {
  name: string;
  tagline: string;
  accent: string;
  highlight?: boolean;
  items: string[];
}

interface Editions {
  title: string;
  description: string;
  tiers: EditionTier[];
}

interface Closing {
  title: string;
  description: string;
  highlights: string[];
}

interface SolutionContent {
  narrative: string[];
  sections: Section[];
  editions?: Editions;
  closing: Closing;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  BarChart3,
  BookOpen,
  Box,
  Boxes,
  Brain,
  Building2,
  CalendarRange,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Code,
  FileSignature,
  GitBranch,
  Inbox,
  KanbanSquare,
  Layers,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Network,
  PhoneCall,
  Plug,
  QrCode,
  Radar,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  UserCog,
  Warehouse,
  Workflow,
};

const ACCENT_MAP: Record<string, { text: string; bg: string; border: string; glow: string; ring: string }> = {
  blue: {
    text: "text-(--color-accent-blue-light)",
    bg: "bg-(--color-accent-blue-base)/10",
    border: "border-(--color-accent-blue-base)/30",
    glow: "from-(--color-accent-blue-base)/14",
    ring: "bg-(--color-accent-blue-base)/16",
  },
  purple: {
    text: "text-(--color-accent-purple-light)",
    bg: "bg-(--color-accent-purple-base)/10",
    border: "border-(--color-accent-purple-base)/30",
    glow: "from-(--color-accent-purple-base)/14",
    ring: "bg-(--color-accent-purple-base)/16",
  },
  emerald: {
    text: "text-(--color-accent-emerald-light)",
    bg: "bg-(--color-accent-emerald-base)/10",
    border: "border-(--color-accent-emerald-base)/30",
    glow: "from-(--color-accent-emerald-base)/14",
    ring: "bg-(--color-accent-emerald-base)/16",
  },
  orange: {
    text: "text-(--color-accent-orange-light)",
    bg: "bg-(--color-accent-orange-base)/10",
    border: "border-(--color-accent-orange-base)/30",
    glow: "from-(--color-accent-orange-base)/14",
    ring: "bg-(--color-accent-orange-base)/16",
  },
  cyan: {
    text: "text-(--color-accent-cyan-light)",
    bg: "bg-(--color-accent-cyan-base)/10",
    border: "border-(--color-accent-cyan-base)/30",
    glow: "from-(--color-accent-cyan-base)/14",
    ring: "bg-(--color-accent-cyan-base)/16",
  },
  pink: {
    text: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    glow: "from-pink-500/14",
    ring: "bg-pink-500/16",
  },
  indigo: {
    text: "text-indigo-300",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    glow: "from-indigo-500/14",
    ring: "bg-indigo-500/16",
  },
  amber: {
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "from-amber-500/14",
    ring: "bg-amber-500/16",
  },
};

function getAccent(accent: string) {
  return ACCENT_MAP[accent] ?? ACCENT_MAP.blue;
}

export function SolutionNarrative({ narrative }: { narrative: string[] }) {
  if (!narrative?.length) return null;
  return (
    <div className="mt-16 max-w-3xl space-y-5">
      {narrative.map((paragraph, idx) => (
        <p
          key={idx}
          className={
            idx === 0
              ? "text-lg md:text-xl font-light leading-relaxed text-(--color-text-secondary)"
              : "text-base font-light leading-relaxed text-(--color-text-muted)"
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function SolutionCapabilities({ sections }: { sections: Section[] }) {
  return (
    <div className="mt-32 space-y-8">
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/3 mb-6">
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-text-muted)">
            Yetenekler · Capabilities
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Tek platform altında birleşen modüller
        </h2>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => {
          const Icon = ICON_MAP[section.icon] ?? Layers;
          const accent = getAccent(section.accent);
          const num = String(idx + 1).padStart(2, "0");

          return (
            <article
              key={`${section.title}-${idx}`}
              className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/2 hover:bg-white/3 hover:border-white/12 transition-colors"
            >
              <div
                className={`pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full ${accent.ring} blur-3xl opacity-40 group-hover:opacity-70 transition-opacity`}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10">
                <div className="lg:col-span-5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${accent.border} ${accent.bg} mb-5`}>
                    <span className={`text-[10px] font-mono font-semibold tracking-[0.22em] uppercase ${accent.text}`}>
                      {num} · {section.eyebrow}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border ${accent.border} ${accent.bg}`}
                    >
                      <Icon className={`w-6 h-6 stroke-[1.5] ${accent.text}`} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
                      {section.title}
                    </h3>
                  </div>

                  <p className="text-base font-light leading-relaxed text-(--color-text-secondary)">
                    {section.description}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-1 shrink-0 ${accent.text}`} strokeWidth={2.5} />
                        <span className="text-sm font-light text-(--color-text-secondary) leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function SolutionEditions({ editions }: { editions: Editions }) {
  return (
    <div className="mt-32">
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-brand-primary)/30 bg-(--color-brand-primary)/8 mb-6">
          <span className="text-[10px] font-mono font-semibold tracking-[0.22em] uppercase text-(--color-brand-accent)">
            Edition · Lisans
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">{editions.title}</h2>
        <p className="text-base font-light leading-relaxed text-(--color-text-secondary)">{editions.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {editions.tiers.map((tier) => {
          const accent = getAccent(tier.accent);
          const isHighlight = tier.highlight ?? false;

          return (
            <div
              key={tier.name}
              className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 ${
                isHighlight
                  ? `${accent.border} bg-linear-to-br ${accent.glow} via-white/3 to-transparent`
                  : "border-white/8 bg-white/2"
              }`}
            >
              {isHighlight && (
                <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-(--color-brand-primary)/40 bg-(--color-brand-primary)/12">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-brand-accent) animate-pulse" />
                  <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-(--color-brand-accent)">
                    Önerilen
                  </span>
                </div>
              )}

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${accent.border} ${accent.bg} mb-5`}>
                <span className={`text-[10px] font-mono font-semibold tracking-[0.22em] uppercase ${accent.text}`}>
                  {tier.name}
                </span>
              </div>

              <p className="text-lg font-light leading-relaxed text-white mb-6">{tier.tagline}</p>

              <ul className="space-y-2.5">
                {tier.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accent.text}`} strokeWidth={2.5} />
                    <span className="text-sm font-light text-(--color-text-secondary) leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SolutionClosing({ closing }: { closing: Closing }) {
  return (
    <div className="mt-32 relative overflow-hidden rounded-3xl border border-white/8 bg-linear-to-br from-(--color-brand-primary)/10 via-(--color-accent-purple-base)/6 to-transparent p-8 md:p-12">
      <div className="pointer-events-none absolute -top-40 -right-40 w-130 h-130 rounded-full bg-(--color-brand-primary)/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-130 h-130 rounded-full bg-(--color-accent-purple-base)/12 blur-3xl" />

      <div className="relative max-w-4xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          {closing.title}
        </h2>
        <p className="text-base md:text-lg font-light leading-relaxed text-(--color-text-secondary) mb-10">
          {closing.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {closing.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-xs font-medium text-(--color-text-overline) backdrop-blur-sm"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SolutionSections({ content }: { content: SolutionContent }) {
  return (
    <>
      <SolutionNarrative narrative={content.narrative} />
      <SolutionCapabilities sections={content.sections} />
      {content.editions && <SolutionEditions editions={content.editions} />}
      <SolutionClosing closing={content.closing} />
    </>
  );
}
