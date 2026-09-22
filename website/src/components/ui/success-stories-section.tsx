"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import referencesData from "@/data/references.json";
import bolumler from "@/data/anasayfa-bolumler.json";
import { En } from "@/components/ui/En";

interface DetailedReference {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const CONTENT = bolumler.basariOykuleri;
const DETAILED = referencesData.detailedReferences as DetailedReference[];

/** Kurum adı → referans kategorisi (çözüm ailesi) eşlemesi, references.json'dan türetilir. */
const CATEGORY_BY_NAME: Record<string, string> = {};
for (const category of referencesData.categories) {
  for (const reference of category.references) {
    CATEGORY_BY_NAME[reference.name.toLowerCase()] = category.title;
  }
}

const STORIES = CONTENT.secilenler
  .map((id) => DETAILED.find((ref) => ref.id === id))
  .filter((ref): ref is DetailedReference => ref !== undefined)
  .map((ref) => ({
    ...ref,
    category: CATEGORY_BY_NAME[ref.name.toLowerCase()] ?? null,
  }));

const ACCENT_GLOWS = [
  "bg-(--color-brand-primary)/20",
  "bg-(--color-accent-purple-base)/20",
  "bg-(--color-accent-emerald-base)/20",
  "bg-(--color-accent-cyan-base)/20",
];

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 190, damping: 24 },
  },
};

export function SuccessStoriesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-24 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[45%] h-[55%] rounded-full bg-(--color-brand-primary)/8 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header — sola dayalı, sağa uzayan çizgi */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-(--color-brand-secondary)" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-text-overline)">
                {CONTENT.eyebrow}
              </span>
            </div>
            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 lg:items-end">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {CONTENT.title}
            </h2>
            <p className="text-base md:text-lg text-(--color-text-secondary) font-light leading-relaxed">
              {CONTENT.description}
            </p>
          </div>
        </motion.div>

        {/* Geniş vaka kartları */}
        <motion.div
          variants={listVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-6"
        >
          {STORIES.map((story, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.article
                key={story.id}
                variants={cardVariants}
                className={`group relative grid grid-cols-1 overflow-hidden rounded-[28px] border border-white/8 bg-white/2 backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:bg-white/4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${
                  isReversed ? "lg:grid-cols-[1fr_280px]" : "lg:grid-cols-[280px_1fr]"
                }`}
              >
                <div
                  className={`absolute -top-24 h-56 w-56 rounded-full blur-[100px] opacity-50 transition-opacity duration-700 group-hover:opacity-100 ${
                    ACCENT_GLOWS[index % ACCENT_GLOWS.length]
                  } ${isReversed ? "left-0" : "right-0"}`}
                />

                {/* Logo paneli */}
                <div
                  className={`relative z-10 flex items-center justify-center border-white/5 bg-white/3 px-8 py-10 lg:py-12 border-b lg:border-b-0 ${
                    isReversed ? "lg:order-2 lg:border-l" : "lg:border-r"
                  }`}
                >
                  <Image
                    src={story.logo}
                    alt={`${story.name} logosu`}
                    width={180}
                    height={64}
                    className="h-12 w-auto max-w-[180px] object-contain brightness-0 invert opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                {/* Anlatım */}
                <div className={`relative z-10 p-8 lg:p-10 ${isReversed ? "lg:order-1" : ""}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {story.name}
                    </h3>
                    {story.category ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--color-text-overline)">
                        <En>{story.category}</En>
                      </span>
                    ) : null}
                  </div>

                  <div className="flex gap-4">
                    <Quote className="h-5 w-5 shrink-0 text-(--color-text-dim)" aria-hidden="true" />
                    <p className="text-sm md:text-base text-(--color-text-secondary) font-light leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href={CONTENT.cta.href}
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 font-medium text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-(--shadow-glow-primary-weak) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-border-active) cursor-pointer"
          >
            {CONTENT.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
