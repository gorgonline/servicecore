import Image from "next/image";

interface ScreenshotProps {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
}

export default function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  sizes = "(min-width: 1280px) 720px, 100vw",
}: ScreenshotProps) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-(--shadow-glow-primary-card)">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm font-light text-(--color-text-secondary)">{caption}</figcaption>
    </figure>
  );
}
