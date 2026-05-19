"use client";

import { useEffect, useState } from "react";

interface UseActiveSectionOptions {
  ids: string[];
  rootMargin?: string;
  threshold?: number[];
}

/**
 * IntersectionObserver hook that tracks the most prominently visible
 * section id from a list of candidate ids. Designed for TOC highlighting.
 */
export function useActiveSection({
  ids,
  rootMargin = "-30% 0px -55% 0px",
  threshold = [0, 0.25, 0.5, 0.75, 1],
}: UseActiveSectionOptions): string {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin, threshold },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, rootMargin, threshold]);

  return active;
}
