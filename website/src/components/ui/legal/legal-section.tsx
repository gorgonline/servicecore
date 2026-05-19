"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { getAccent } from "../datasheet/accents";
import { renderLegalIcon } from "./icon-map";
import type { LegalSection as LegalSectionType } from "./types";

interface LegalSectionProps {
  section: LegalSectionType;
  index: number;
}

interface InlineSegment {
  text: string;
  bold: boolean;
}

/**
 * Parses simple inline markdown (`**bold**`) into segment tokens.
 * Preserves order, handles unmatched markers safely.
 */
function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }
  return segments;
}

interface ParagraphBlock {
  kind: "para";
  lines: string[];
}
interface ListBlock {
  kind: "list";
  items: string[];
}
type Block = ParagraphBlock | ListBlock;

/**
 * Splits raw section content into paragraph/list blocks.
 * Lines starting with "- " inside a paragraph chunk become a list block.
 */
function blocksFromContent(content: string): Block[] {
  const result: Block[] = [];
  const chunks = content.split(/\n{2,}/);
  for (const chunk of chunks) {
    const lines = chunk.split("\n");
    let buffer: string[] = [];
    let list: string[] = [];

    const flushBuffer = () => {
      if (buffer.length) {
        result.push({ kind: "para", lines: buffer });
        buffer = [];
      }
    };
    const flushList = () => {
      if (list.length) {
        result.push({ kind: "list", items: list });
        list = [];
      }
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (/^\s*-\s+/.test(line)) {
        flushBuffer();
        list.push(line.replace(/^\s*-\s+/, ""));
      } else if (line.trim().length === 0) {
        flushBuffer();
        flushList();
      } else {
        flushList();
        buffer.push(line);
      }
    }
    flushBuffer();
    flushList();
  }
  return result;
}

export function LegalSection({ section, index }: LegalSectionProps) {
  const reduced = useReducedMotion();
  const accent = getAccent(section.accent);
  const number = String(index + 1).padStart(2, "0");
  const blocks = blocksFromContent(section.content);
  const showLocalGlow = (index + 1) % 2 === 0;

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 240, damping: 28 },
    },
  };

  const gridContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 280, damping: 26 },
    },
  };

  return (
    <motion.section
      id={section.id}
      data-legal-section
      variants={reduced ? undefined : sectionVariants}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className="relative scroll-mt-32"
    >
      {showLocalGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-0 w-105 h-105 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent.alpha10}, transparent 70%)`,
            filter: "blur(120px)",
            opacity: reduced ? 0 : 1,
          }}
        />
      )}

      <header className="relative mb-10">
        <div className="flex items-center gap-2 mb-6">
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: accent.base,
              boxShadow: `0 0 10px ${accent.alpha30}`,
            }}
          />
          <span
            lang="en"
            className="text-[10px] font-mono font-semibold tracking-[0.22em]"
            style={{ color: accent.light }}
          >
            BÖLÜM {number}
          </span>
        </div>

        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="shrink-0 mt-1"
            style={{ color: accent.base }}
          >
            {renderLegalIcon(section.icon, {
              className: "w-6 h-6",
              strokeWidth: 1.5,
            })}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-white leading-[1.2]">
            {section.title}
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="mt-4 h-px w-24"
          style={{
            background: `linear-gradient(to right, ${accent.base}, transparent)`,
          }}
        />
      </header>

      <div className="max-w-prose">
        {blocks.map((block, bi) => {
          if (block.kind === "list") {
            return (
              <ul
                key={bi}
                className="my-6 space-y-2.5"
              >
                {block.items.map((item, ii) => {
                  const segments = parseInline(item);
                  return (
                    <li
                      key={ii}
                      className="flex items-start gap-3 text-[17px] font-light leading-[1.8] text-(--color-text-secondary)"
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0 mt-3 inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: accent.base }}
                      />
                      <span>
                        {segments.map((seg, si) =>
                          seg.bold ? (
                            <strong
                              key={si}
                              className="font-semibold text-white"
                            >
                              {seg.text}
                            </strong>
                          ) : (
                            <Fragment key={si}>{seg.text}</Fragment>
                          ),
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          const paragraphText = block.lines.join(" ");
          const segments = parseInline(paragraphText);
          const isAddressBlock = block.lines.length > 1;

          if (isAddressBlock) {
            return (
              <p
                key={bi}
                className="mb-6 text-[17px] font-light leading-[1.8] text-(--color-text-secondary) whitespace-pre-line"
              >
                {block.lines.map((line, li) => {
                  const lineSegments = parseInline(line);
                  return (
                    <Fragment key={li}>
                      {lineSegments.map((seg, si) =>
                        seg.bold ? (
                          <strong
                            key={si}
                            className="font-semibold text-white"
                          >
                            {seg.text}
                          </strong>
                        ) : (
                          <Fragment key={si}>{seg.text}</Fragment>
                        ),
                      )}
                      {li < block.lines.length - 1 ? "\n" : null}
                    </Fragment>
                  );
                })}
              </p>
            );
          }

          return (
            <p
              key={bi}
              className="mb-6 text-[17px] font-light leading-[1.8] text-(--color-text-secondary)"
            >
              {segments.map((seg, si) =>
                seg.bold ? (
                  <strong key={si} className="font-semibold text-white">
                    {seg.text}
                  </strong>
                ) : (
                  <Fragment key={si}>{seg.text}</Fragment>
                ),
              )}
            </p>
          );
        })}
      </div>

      {section.purposes && section.purposes.length > 0 && (
        <motion.div
          variants={reduced ? undefined : gridContainerVariants}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {section.purposes.map((purpose, idx) => (
            <motion.div
              key={idx}
              variants={reduced ? undefined : gridItemVariants}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span
                aria-hidden="true"
                className="shrink-0 inline-block w-2 h-2 rounded-full"
                style={{
                  background: accent.base,
                  boxShadow: `0 0 10px ${accent.alpha30}`,
                }}
              />
              <span className="text-sm md:text-[15px] font-light leading-snug text-(--color-text-overline)">
                {purpose}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {section.rights && section.rights.length > 0 && (
        <motion.div
          variants={reduced ? undefined : gridContainerVariants}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {section.rights.map((right, idx) => (
            <motion.div
              key={idx}
              variants={reduced ? undefined : gridItemVariants}
              className="p-5 rounded-2xl bg-white/2 border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/5"
            >
              <p className="text-sm md:text-[15px] font-medium text-white leading-snug">
                {right}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
