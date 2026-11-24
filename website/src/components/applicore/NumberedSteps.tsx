interface Step {
  title: string;
  text: string;
}

interface NumberedStepsProps {
  steps: Step[];
  className: string;
}

export default function NumberedSteps({ steps, className }: NumberedStepsProps) {
  return (
    <ol className={`grid grid-cols-1 gap-4 ${className}`}>
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-xl border border-white/10 bg-white/3 p-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-brand-accent)/30 bg-(--color-brand-accent)/10 font-mono text-sm text-(--color-accent-sky-light)">
            {i + 1}
          </span>
          <h4 className="mt-4 font-medium text-white">{step.title}</h4>
          <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary)">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
