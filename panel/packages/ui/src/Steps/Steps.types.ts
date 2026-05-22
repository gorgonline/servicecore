import type { ReactNode } from "react";
import type { StepsProps as AntStepsProps } from "antd";

/** "default" — numaralı dairelerle klasik adım çubuğu.
 *  "navigation" — adımlar arasında ok sembolüyle yatay menü. */
export type StepsType = "default" | "navigation";

/** "default" — 32px daire. "small" — 24px daire, daha kompakt. */
export type StepsSize = "default" | "small";

/** Adımların yerleşimi. Mobilde otomatik dikey (responsive=true varsayılan). */
export type StepsDirection = "horizontal" | "vertical";

/** Title'ın icon'a göre konumu. "horizontal" sağda, "vertical" altında. */
export type StepsLabelPlacement = "horizontal" | "vertical";

/** Adımın yaşam döngüsündeki yeri. AntD ile birebir.
 *  - wait    → henüz başlanmadı
 *  - process → şu an aktif
 *  - finish  → tamamlandı
 *  - error   → hata oluştu */
export type StepsStatus = "wait" | "process" | "finish" | "error";

export interface StepsItem {
  /** Başlık — adımın ana etiketi. */
  title?: ReactNode;
  /** İkincil başlık — başlığın yanında küçük metin (örn. "5 dk"). */
  subTitle?: ReactNode;
  /** Açıklama — başlığın altında ayrıntılı satır. */
  description?: ReactNode;
  /** Özel icon. Verilmezse AntD numara veya checkmark gösterir. */
  icon?: ReactNode;
  /** Adıma özel status override — Steps.status'ı baskılar. */
  status?: StepsStatus;
  /** onChange tetiklenmesin. clickable Steps'te bu adım tıklanamaz. */
  disabled?: boolean;
}

export interface StepsProps
  extends Omit<
    AntStepsProps,
    | "type"
    | "size"
    | "direction"
    | "labelPlacement"
    | "status"
    | "items"
    | "progressDot"
  > {
  /** Görsel tipi. Default: "default". */
  type?: StepsType;
  /** Boyut. Default: "default". */
  size?: StepsSize;
  /** Yönlendirme. Default: "horizontal". Mobilde responsive=true ise otomatik vertical. */
  direction?: StepsDirection;
  /** Title konumu. Default: "horizontal". */
  labelPlacement?: StepsLabelPlacement;
  /** Genel status. Adımın kendi `status`'ı baskındır. Default: "process". */
  status?: StepsStatus;
  /** Adımları nokta olarak göster veya nokta'yı custom render et. */
  progressDot?:
    | boolean
    | ((
        iconDot: ReactNode,
        info: {
          index: number;
          status: StepsStatus;
          title: ReactNode;
          description: ReactNode;
        },
      ) => ReactNode);
  /** Adım listesi. AntD 5.7'de tercih edilen API. */
  items?: StepsItem[];
}
