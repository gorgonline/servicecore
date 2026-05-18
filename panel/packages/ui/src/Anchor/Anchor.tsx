import type { ReactNode, MouseEvent } from "react";
import { Anchor as AntAnchor } from "antd";
import type {
  AnchorProps as AntAnchorProps,
  AnchorLinkItemProps,
} from "antd/es/anchor/Anchor";
import clsx from "clsx";
import styles from "./Anchor.module.css";

export type AnchorDirection = "vertical" | "horizontal";

/** Scroll container — `getContainer` dönüş tipi. AntD 5.7 ile aynı. */
export type AnchorContainer = HTMLElement | Window;

/** Anchor item — `items` prop'unda kullanılır (AntD 5.1+).
 *
 * Backend kendi AntD kodunda `AnchorLinkItemProps` olarak görür — biz aynı
 * tipin alias'ını kendi adımızla expose ediyoruz.
 */
export type AnchorItem = AnchorLinkItemProps;

/** Tıklama callback'ine gelen link objesi — title + href. */
export interface AnchorClickLink {
  title: ReactNode;
  href: string;
}

export interface AnchorProps extends AntAnchorProps {
  /** Yön. `vertical` = sol border + ink (sidebar TOC).
   *  `horizontal` = üst sticky bar (nested children desteklemez). Default: `"vertical"` */
  direction?: AnchorDirection;
  /** Anchor öğeleri (AntD 5.1+). JSX `Anchor.Link` yerine bunu tercih et. */
  items?: AnchorItem[];
  /** Sayfa üstüne sabitle (Affix sarmalı). Default: `true` */
  affix?: boolean;
  /** Bounding distance — px. Section bu eşiği geçince aktif sayılır. Default: `5` */
  bounds?: number;
  /** Sayfa üstünden offset — sticky header altına kaymasın diye. Default: `0` */
  offsetTop?: number;
  /** Scroll hedef offset — tıklama sonrası hedef bu kadar aşağıdan başlar.
   *  Verilmezse `offsetTop` kullanılır. */
  targetOffset?: number;
  /** `affix={false}` iken bile ink göstergesini göster. Default: `false` */
  showInkInFixed?: boolean;
  /** `history.pushState` yerine `history.replaceState` kullan (AntD 5.7+).
   *  Back button anchor değişimlerini atlar. Default: `false` */
  replace?: boolean;
  /** Aktif link değiştiğinde tetiklenir — analytics, scroll tracking için. */
  onChange?: (currentActiveLink: string) => void;
  /** Link tıklanınca tetiklenir. */
  onClick?: (e: MouseEvent<HTMLElement>, link: AnchorClickLink) => void;
  /** Aktif link'i custom hesapla — varsayılan algılamayı override et. */
  getCurrentAnchor?: (activeLink: string) => string;
  /** Scroll container'ı belirle. Default: `() => window` */
  getContainer?: () => AnchorContainer;
}

/** ServiceCore Anchor — AntD Anchor wrap.
 *
 * Sayfa içi navigation — scroll spy. Uzun sayfalarda section listesini yan
 * tarafta (vertical) veya üstte (horizontal) gösterir, scroll sırasında aktif
 * item highlight olur.
 *
 * API tamamen AntD ile aynı. `items` prop'u (5.1+) tercih edilen veri yöntemi —
 * eski `Anchor.Link` children pattern'i deprecated.
 */
export function Anchor({ className, ...rest }: AnchorProps) {
  return <AntAnchor {...rest} className={clsx(styles.anchor, className)} />;
}
