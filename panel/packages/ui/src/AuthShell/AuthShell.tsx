/**
 * AuthShell — auth sayfalarının ortak split-screen kabuğu (login / şifremi
 * unuttum / sıfırla / 2FA / kayıt / yetkisiz).
 *
 * Sol: form slot (children). Sağ: marka paneli (mavi gradient + glow + dot
 * pattern + iki-tonlu wordmark). 900px altında sağ panel gizlenir.
 */

import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { BrandMark } from "../Brand";
import styles from "./AuthShell.module.css";

export interface AuthShellProps {
  /** Sağ panel: küçük mono üst-etiket. */
  eyebrow?: string;
  /** Sağ panel: büyük başlık. */
  title?: string;
  /** Sağ panel: alt metin. */
  subtitle?: string;
  /** Sağ panel: alttaki güven şeridi. */
  trust?: string;
  /** Sol taraf — form içeriği. */
  children: ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  trust = "ITIL 4 uyumlu · KVKK · Made in Türkiye",
  children,
}: AuthShellProps) {
  return (
    <div className={styles.shell}>
      <main className={styles.formSide}>
        <div className={styles.formInner}>{children}</div>
      </main>

      <aside className={styles.brandSide}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.pattern} aria-hidden="true" />
        <div className={styles.content}>
          {/* Logo lockup: ikon + (iki-tonlu wordmark / eşit-genişlik tagline).
              Uppercase metinler LİTERAL yazıldı (text-transform tr yerelinde
              "SUITE"→"SUİTE" yapardı). */}
          <div className={styles.logo}>
            <BrandMark size={44} />
            <div className={styles.word}>
              <div className={styles.wordmark}>
                <span className={styles.wmService}>SERVICE</span>
                <span className={styles.wmCore}>CORE</span>
              </div>
              <div className={styles.tagline}>SERVICE MANAGEMENT SUITE</div>
            </div>
          </div>

          <div className={styles.text}>
            {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
            {title ? <Heading level={2}>{title}</Heading> : null}
            {subtitle ? (
              <Text size="lg" className={styles.subtitle}>
                {subtitle}
              </Text>
            ) : null}
          </div>

          {trust ? <div className={styles.trust}>{trust}</div> : null}
        </div>
      </aside>
    </div>
  );
}
