import { Check } from "lucide-react";

interface Point {
  title: string;
  text: string;
}

interface PointListProps {
  points: Point[];
  className?: string;
}

export default function PointList({ points, className = "space-y-6" }: PointListProps) {
  return (
    <ul className={className}>
      {points.map((point) => (
        <li key={point.title} className="flex items-start gap-4">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-(--color-brand-accent)/30 bg-(--color-brand-accent)/10">
            <Check aria-hidden="true" className="h-3.5 w-3.5 text-(--color-accent-sky-light)" />
          </span>
          <div>
            <p className="font-medium text-white">{point.title}</p>
            <p className="mt-1 text-sm font-light leading-relaxed text-(--color-text-secondary) md:text-base">
              {point.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
