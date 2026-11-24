"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";

interface SwapProps {
  /** Degisince icerik yeniden belirir; ilk acilista hareket yok. */
  swapKey: string;
  className?: string;
  children: React.ReactNode;
}

export default function Swap({ swapKey, className, children }: SwapProps) {
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence initial={false}>
        <motion.div
          key={swapKey}
          className={className}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
