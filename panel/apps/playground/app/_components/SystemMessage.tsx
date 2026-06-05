/* SystemMessage — tam-ekran sistem sayfası (404 / 500). position:fixed ile
 * DocsShell chrome'unu örter → her yerde tam-ekran. Server-safe. */

import type { ReactNode } from "react";
import { Heading, Text } from "@servicecoreui/ui";
import { BrandMark } from "@servicecoreui/ui/custom";
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
