"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/data/applicore/giris.json";

const ITEMS = data.nav.items;

/** Uzun sayfada yer gosteren serit: ilk bolume gelince cikar, son bolumden sonra gizlenir. */
export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const last = sections[sections.length - 1];
      if (!last || last.getBoundingClientRect().bottom < line) {
        setActive(null);
        return;
      }
      const current = sections.filter((el) => el.getBoundingClientRect().top <= line).pop();
      setActive(current?.id ?? null);
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>("[aria-current='true']");
    if (!list || !link) return;
    list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2 });
  }, [active]);

  const visible = active !== null;

  return (
    <nav
      aria-label={data.nav.label}
      inert={!visible}
      className={`fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-(--color-surface-base)/90 backdrop-blur-xl transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <ul
        ref={listRef}
        className="relative flex gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] lg:px-10"
      >
        {ITEMS.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`inline-flex min-h-9 cursor-pointer items-center whitespace-nowrap rounded-full px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) ${
                active === item.id
                  ? "bg-(--color-brand-primary)/20 font-medium text-white"
                  : "text-(--color-text-secondary) hover:text-white"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
