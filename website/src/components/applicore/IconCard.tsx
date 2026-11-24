import AppIcon from "./AppIcon";

interface IconCardProps {
  icon: string;
  title: string;
  text: string;
  items?: string[];
}

export default function IconCard({ icon, title, text, items }: IconCardProps) {
  return (
    <article className="h-full rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/5 lg:p-8">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-(--color-brand-accent)/25 bg-(--color-brand-accent)/10">
        <AppIcon name={icon} className="h-5 w-5 text-(--color-accent-sky-light)" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary) md:text-base">{text}</p>
      {items && (
        <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm font-light leading-relaxed text-(--color-text-secondary)">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-accent)" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
