"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronDown, HelpCircle } from "lucide-react";
import sssData from "@/data/anasayfa-sss.json";

interface FaqLink {
  label: string;
  href: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  link?: FaqLink;
}

const ITEMS = sssData.items as FaqItem[];

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 26 },
  },
};

export function FaqSection() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(ITEMS[0]?.id ?? null);

  return (
    <section className="relative w-full py-24 overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 left-1/4 w-[50%] h-[60%] rounded-full bg-(--color-accent-purple-base)/8 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Sol sütun — başlık ve CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-(--color-accent-purple-base)/10 border border-(--color-accent-purple-base)/25 mb-6">
              <HelpCircle className="h-3.5 w-3.5 text-(--color-accent-purple-light)" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-accent-purple-light)">
                {sssData.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
              {sssData.title}
            </h2>
            <p className="text-base text-(--color-text-secondary) font-light leading-relaxed mb-8">
              {sssData.description}
            </p>

            <Link
              href={sssData.cta.href}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-(--color-brand-primary) px-6 font-medium text-sm text-white shadow-(--shadow-glow-primary) transition-all duration-300 hover:bg-(--color-brand-primary-hover) hover:shadow-(--shadow-glow-primary-strong) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface-base) cursor-pointer"
            >
              {sssData.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          {/* Sağ sütun — akordiyon */}
          <motion.div
            variants={listVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            {ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `sss-panel-${item.id}`;
              const buttonId = `sss-buton-${item.id}`;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`overflow-hidden rounded-2xl border bg-white/2 backdrop-blur-xl transition-colors duration-300 ${
                    isOpen ? "border-(--color-border-active-strong) bg-white/4" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full min-h-11 items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) rounded-2xl cursor-pointer"
                    >
                      <span className="text-base font-semibold text-white tracking-tight">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 240, damping: 24 }
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-(--color-text-overline)"
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>

                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            height: { type: "spring", stiffness: 220, damping: 30 },
                            opacity: { duration: 0.2 },
                          }
                    }
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5 px-6 pb-6 pt-4">
                      <p className="text-sm md:text-base text-(--color-text-secondary) font-light leading-relaxed">
                        {item.answer}
                      </p>
                      {item.link ? (
                        <Link
                          href={item.link.href}
                          tabIndex={isOpen ? 0 : -1}
                          className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-(--color-accent-blue-light) transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) rounded-sm cursor-pointer"
                        >
                          {item.link.label}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      ) : null}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
