import { forwardRef, createElement } from "react";
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

/** AntD Flex API (5.10+) ile 1:1 uyumlu — bizim 5.7 baseline'da çalışsın diye custom. */
export type FlexGap = "small" | "middle" | "large" | number | string;
export type FlexWrap = boolean | "nowrap" | "wrap" | "wrap-reverse";

export interface FlexProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** flex-direction: column (default false = row) */
  vertical?: boolean;
  /** flex-wrap. boolean: true=wrap, false=nowrap. String CSS değeri de geçerli */
  wrap?: FlexWrap;
  /** justify-content (main axis) */
  justify?: CSSProperties["justifyContent"];
  /** align-items (cross axis) */
  align?: CSSProperties["alignItems"];
  /** gap. preset: "small"=8px / "middle"=16px / "large"=24px (bizim space scale) — veya number/string */
  gap?: FlexGap;
  /** flex shorthand — bu Flex'in parent flex container'ı varsa */
  flex?: CSSProperties["flex"];
  /** Custom element type. Default: div */
  component?: ElementType;
  children?: ReactNode;
}

const GAP_PRESETS = {
  small: "var(--sc-space-2)",
  middle: "var(--sc-space-4)",
  large: "var(--sc-space-6)",
} as const;

function resolveGap(gap: FlexGap | undefined): string | number | undefined {
  if (gap === undefined) return undefined;
  if (typeof gap === "string" && gap in GAP_PRESETS) {
    return GAP_PRESETS[gap as keyof typeof GAP_PRESETS];
  }
  return gap;
}

function resolveWrap(wrap: FlexWrap | undefined): CSSProperties["flexWrap"] {
  if (wrap === undefined) return undefined;
  if (typeof wrap === "boolean") return wrap ? "wrap" : "nowrap";
  return wrap;
}

/** ServiceCore Flex — block-level flex layout helper.
 *
 * AntD 5.10+ Flex API'sının birebir aynısı. Biz 5.7'deyiz, AntD'nin kendi
 * Flex'i bizde yok — kendi inşa ettik. Gap preset'leri bizim space token'larına bağlı.
 *
 * Backend ileride AntD upgrade ederse `import { Flex } from "antd"` ile bizimkinin
 * yerini değiştirebilir, API aynı kalır.
 *
 * NOT: Inline style kullanıyoruz — layout için CSS class gerekmez, daha hafif.
 */
export const Flex = forwardRef<HTMLElement, FlexProps>(function Flex(
  { vertical, wrap, justify, align, gap, flex, component, style, children, ...rest },
  ref,
) {
  const Tag = (component ?? "div") as ElementType;
  return createElement(
    Tag,
    {
      ref,
      style: {
        display: "flex",
        flexDirection: vertical ? "column" : undefined,
        flexWrap: resolveWrap(wrap),
        justifyContent: justify,
        alignItems: align,
        gap: resolveGap(gap),
        flex,
        ...style,
      },
      ...rest,
    },
    children,
  );
});
