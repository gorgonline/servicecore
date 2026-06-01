import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./Brand.module.css";

/* ────────────────────────────────────────────────
 * ServiceCore sembolü — brand/assets/logo.svg (iki renkli mark).
 * Renkler token'a bağlı: koyu kısım → text-primary, mavi kısım → accent.
 * Hardcoded hex yok; zemine göre token üzerinden uyum sağlar.
 * ──────────────────────────────────────────────── */

function ServiceCoreSymbol({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 9.11 8.542 L 11.967 8.543 L 14.823 3.379 L 11.14 6.708 Z M 13.101 10.063 L 13.689 11.125 L 19.991 11.125 L 15.559 3.113 L 12.408 8.809 Z M 9.11 14.238 L 5.958 19.934 L 15.117 19.934 L 11.967 14.238 Z M 19.991 11.656 L 13.689 11.656 L 13.048 12.814 L 12.408 13.972 L 15.559 19.668 Z"
        fill="var(--sc-color-text-primary)"
      />
      <path
        d="M 7.583 5.962 L 4.432 0.266 L 0 8.277 L 6.302 8.277 Z M 8.025 11.391 L 5.168 16.553 L 10.882 11.391 Z M 7.583 11.125 L 6.302 8.809 L 0 8.809 L 4.433 16.819 Z M 10.882 5.696 L 14.033 0 L 4.874 0 L 8.023 5.695 Z"
        fill="var(--sc-color-accent)"
      />
    </svg>
  );
}

export interface BrandProps extends ComponentPropsWithoutRef<"span"> {
  /**
   * Müşteri logosu (görsel URL).
   * ── White-label: developer kurulumda müşterinin logosunu buradan geçer. ──
   * Verilmezse ServiceCore sembolüne düşer (fallback).
   */
  logoSrc?: string;
  /** Logonun yanındaki marka adı. Default: "ServiceCore". */
  name?: string;
  /** Sembol / logo yüksekliği (px). Default: 24. */
  size?: number;
}

/**
 * Brand — panel/navbar'ın logo + ad lockup'ı (white-label hazır).
 *
 * AntD'de Brand/Logo bileşeni yok; logo bir img veya semantic markup ister.
 * Bu bileşen logoyu sabit yüksekliğe ve maks. genişliğe sokar → müşteri logosu
 * ne olursa olsun navbar layout'u bozulmaz. AntD bağımlılığı yok (server-safe).
 *
 * @example
 * <Brand />                                   // ServiceCore sembolü
 * <Brand logoSrc="/musteri-logo.svg" name="Acme" />  // white-label
 */
export function Brand({
  logoSrc,
  name = "ServiceCore",
  size = 24,
  className,
  ...rest
}: BrandProps) {
  return (
    <span className={clsx(styles.brand, className)} {...rest}>
      {logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- framework-agnostic lib: next/image kullanamaz
        <img src={logoSrc} alt={name} className={styles.logo} style={{ height: size }} />
      ) : (
        <ServiceCoreSymbol size={size} />
      )}
      <span className={styles.name}>{name}</span>
    </span>
  );
}
