"use client";

import { MotionConfig, motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Baslangic hali sunucuda ve tarayicida ayni kalir; hareketi azalt ayarini MotionConfig uygular.
 * Boylece icerik, ayar acikken de gorunur.
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 180, damping: 26, delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
