interface TextCardProps {
  title: string;
  text: string;
}

export default function TextCard({ title, text }: TextCardProps) {
  return (
    <article className="h-full rounded-xl border border-white/10 bg-white/3 p-6 transition-colors duration-300 hover:border-white/20">
      <h4 className="font-medium text-white">{title}</h4>
      <p className="mt-2 text-sm font-light leading-relaxed text-(--color-text-secondary)">{text}</p>
    </article>
  );
}
