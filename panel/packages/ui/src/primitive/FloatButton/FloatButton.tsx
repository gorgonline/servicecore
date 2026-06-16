import { FloatButton as AntFloatButton } from "antd";
import type { FloatButtonProps as AntFloatButtonProps } from "antd/es/float-button/interface";
import type { FloatButtonGroupProps as AntGroupProps } from "antd/es/float-button/interface";
import type { BackTopProps as AntBackTopProps } from "antd/es/float-button/interface";
import { Help, Add, Close, ArrowUp } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./FloatButton.module.css";

export type FloatButtonType = "default" | "primary";
export type FloatButtonShape = "circle" | "square";

export interface FloatButtonProps extends AntFloatButtonProps {
  /** Tip. Default: "default" */
  type?: FloatButtonType;
  /** Şekil. Default: "circle" */
  shape?: FloatButtonShape;
}

/** ServiceCore FloatButton — AntD FloatButton wrap.
 *
 * Global, sayfa düzeyinde sabit kalan buton — sağ alt köşede tipik kullanım.
 * Yardım/destek, hızlı aksiyon menüsü, geri-bildirim açma, BackTop için.
 *
 * Default icon: Carbon Help. Override mümkün.
 *
 * Sub-component'ler:
 *   - `FloatButton.Group` — birden çok buton bir trigger altında
 *   - `FloatButton.BackTop` — sayfayı en üste kaydır
 */
function FloatButtonImpl({ icon, className, ...rest }: FloatButtonProps) {
  return (
    <AntFloatButton
      {...rest}
      icon={icon ?? <Help />}
      className={clsx(styles.button, className)}
    />
  );
}

/* ── Group ─────────────────────────────────────────────────── */

export type FloatButtonGroupProps = AntGroupProps;

function GroupImpl({ icon, closeIcon, className, children, ...rest }: FloatButtonGroupProps) {
  return (
    <AntFloatButton.Group
      {...rest}
      icon={icon ?? <Add />}
      closeIcon={closeIcon ?? <Close />}
      className={clsx(styles.group, className)}
    >
      {children}
    </AntFloatButton.Group>
  );
}

/* ── BackTop ───────────────────────────────────────────────── */

function BackTopImpl({ icon, className, ...rest }: AntBackTopProps) {
  return (
    <AntFloatButton.BackTop
      {...rest}
      icon={icon ?? <ArrowUp />}
      className={clsx(styles.button, className)}
    />
  );
}

/* ── Compose ───────────────────────────────────────────────── */

type FloatButtonComponent = typeof FloatButtonImpl & {
  Group: typeof GroupImpl;
  BackTop: typeof BackTopImpl;
};

export const FloatButton = FloatButtonImpl as FloatButtonComponent;
FloatButton.Group = GroupImpl;
FloatButton.BackTop = BackTopImpl;
