"use client";

interface Option {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}

export default function SegmentedControl({ label, options, value, onChange }: SegmentedControlProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={`min-h-9 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) ${
            value === option.id ? "bg-(--color-brand-primary) text-white" : "text-(--color-text-secondary) hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
