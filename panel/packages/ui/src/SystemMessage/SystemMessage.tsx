/**
 * SystemMessage — tam-ekran sistem sayfası (404 / 500 / bakım).
 *
 * `position:fixed; inset:0` ile çevre chrome'unu (sidebar/topbar) örter → her
 * yerde tam-ekran. BrandMark + büyük durum kodu + başlık + açıklama + aksiyon.
 */

import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { BrandMark } from "../Brand";
import styles from "./SystemMessage.module.css";

export interface SystemMessageProps {
  /** Büyük durum kodu (ör. "404", "500"). */
  code?: string;
  title: string;
  description: string;
  /** Aksiyon(lar) — buton(lar). */
  action: ReactNode;
}

export function SystemMessage({ code, title, description, action }: SystemMessageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <BrandMark size={40} />
        {code ? <div className={styles.code}>{code}</div> : null}
        <Heading level={2}>{title}</Heading>
        <Text size="lg" color="secondary">
          {description}
        </Text>
        <div className={styles.action}>{action}</div>
      </div>
    </div>
  );
}
