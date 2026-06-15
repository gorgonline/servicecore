import type { ReactNode } from "react";
import type { TabsProps as AntTabsProps } from "antd";

/** "line" — alt çizgi (ink bar) ile aktif sekme göstergesi. Default.
 *  "card" — sekmeler kart şeklinde, aktif olan içeriğe bağlanır.
 *  "editable-card" — kart + ekle/sil butonları (closable tabs). */
export type TabsType = "line" | "card" | "editable-card";

/** Boyut. AntD ile aynı isimler. */
export type TabsSize = "small" | "middle" | "large";

/** Tab bar konumu. Default: "top". */
export type TabsPosition = "top" | "right" | "bottom" | "left";

export interface TabsItem {
  /** Benzersiz ID — zorunlu. activeKey eşleşmesi için. */
  key: string;
  /** Tab header (üst yazı veya custom node). */
  label: ReactNode;
  /** Tab içeriği — sekme aktif olduğunda render olur. */
  children?: ReactNode;
  /** Tıklamayı engelle. */
  disabled?: boolean;
  /** "editable-card" mode'unda kapatma butonu görünsün mü. Default true. */
  closable?: boolean;
  /** Custom kapatma ikonu (editable-card mode). */
  closeIcon?: ReactNode;
  /** Aktif olmasa bile DOM'da render et — form state korunsun isteniyorsa. */
  forceRender?: boolean;
}

export interface TabsProps
  extends Omit<
    AntTabsProps,
    "type" | "size" | "tabPosition" | "items"
  > {
  /** Görsel tipi. Default: "line". */
  type?: TabsType;
  /** Boyut. Default: "middle". */
  size?: TabsSize;
  /** Tab bar konumu. Default: "top". */
  tabPosition?: TabsPosition;
  /** Tab listesi. AntD 5.7'de tercih edilen API. */
  items?: TabsItem[];
}
