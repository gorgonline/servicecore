interface Tone {
  chip: string;
  dot: string;
}

const TONES: Record<string, Tone> = {
  slate: {
    chip: "border-white/15 bg-white/5 text-(--color-text-overline)",
    dot: "bg-(--color-accent-slate-light)",
  },
  amber: {
    chip: "border-amber-500/30 bg-amber-500/10 text-(--color-accent-amber-light)",
    dot: "bg-(--color-accent-amber-light)",
  },
  blue: {
    chip: "border-blue-500/30 bg-blue-500/10 text-(--color-accent-blue-light)",
    dot: "bg-(--color-accent-blue-light)",
  },
  emerald: {
    chip: "border-emerald-500/30 bg-emerald-500/10 text-(--color-accent-emerald-light)",
    dot: "bg-(--color-accent-emerald-light)",
  },
  red: {
    chip: "border-red-500/30 bg-red-500/10 text-(--color-accent-red-light)",
    dot: "bg-(--color-accent-red-light)",
  },
};

export function toneFor(name: string): Tone {
  return TONES[name] ?? TONES.slate;
}
