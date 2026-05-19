"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const transition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 26 };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={transition}
          aria-label="Sayfanın başına dön"
          className="fixed bottom-8 right-8 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white transition-colors hover:bg-white/10 hover:border-white/20 cursor-pointer shadow-[0_0_20px_-5px_rgba(0,112,243,0.4)] print:hidden"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
