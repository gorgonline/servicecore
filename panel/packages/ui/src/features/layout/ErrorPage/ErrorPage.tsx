"use client";

import type { ReactNode } from "react";
import { SystemMessage } from "../../../components/SystemMessage";

export type ErrorPageVariant = "404" | "403" | "500";

export interface ErrorPageProps {
  variant: ErrorPageVariant;
  /** Başlık override'ı; verilmezse variant'a göre varsayılan kullanılır. */
  title?: string;
  /** Açıklama override'ı; verilmezse variant'a göre varsayılan kullanılır. */
  description?: string;
  /** Aksiyon override'ı; verilmezse variant'a göre varsayılan kullanılır. */
  action?: ReactNode;
  /** Gezinme callback'i — aksiyonların link davranışı için. Ör. `router.push`. */
  onNavigate?: (path: string) => void;
  /** Yalnız 500 variant'ı: "Tekrar dene" butonuna bağlı callback. */
  onRetry?: () => void;
}

const VARIANT_DEFAULTS: Record<
  ErrorPageVariant,
  { code: string; title: string; description: string }
> = {
  "404": {
    code: "404",
    title: "Sayfa bulunamadı",
    description:
      "Aradığın sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir.",
  },
  "403": {
    code: "403",
    title: "Erişim yetkin yok",
    description:
      "Bu sayfaya erişim iznin bulunmuyor. Yetkin olduğunu düşünüyorsan sistem yöneticinle iletişime geç.",
  },
  "500": {
    code: "500",
    title: "Bir şeyler ters gitti",
    description:
      "Beklenmeyen bir hata oluştu. Tekrar deneyebilir ya da ana sayfaya dönebilirsin.",
  },
};

/**
 * ErrorPage — 404 / 403 / 500 sayfaları tek bileşen.
 *
 * SystemMessage üzerine kurulu; variant prop'u ile kod/başlık/açıklama/aksiyonlar
 * otomatik ayarlanır. onNavigate ve onRetry ile framework-agnostik kalır.
 */
export function ErrorPage({
  variant,
  title,
  description,
  action,
  onNavigate,
  onRetry,
}: ErrorPageProps) {
  const defaults = VARIANT_DEFAULTS[variant];

  const resolvedAction: ReactNode =
    action ?? buildDefaultAction(variant, onNavigate, onRetry);

  return (
    <SystemMessage
      code={defaults.code}
      title={title ?? defaults.title}
      description={description ?? defaults.description}
      action={resolvedAction}
    />
  );
}

function buildDefaultAction(
  variant: ErrorPageVariant,
  onNavigate?: (path: string) => void,
  onRetry?: () => void,
): ReactNode {
  if (variant === "404") {
    return (
      <DefaultActionButton onClick={() => onNavigate?.("/")}>
        Ana sayfaya dön
      </DefaultActionButton>
    );
  }
  if (variant === "403") {
    return (
      <DefaultActionButton onClick={() => onNavigate?.("/giris")}>
        Girişe dön
      </DefaultActionButton>
    );
  }
  // 500
  return (
    <DefaultActionGroup>
      <DefaultActionButton primary onClick={onRetry}>
        Tekrar dene
      </DefaultActionButton>
      <DefaultActionButton onClick={() => onNavigate?.("/")}>
        Ana sayfa
      </DefaultActionButton>
    </DefaultActionGroup>
  );
}

/* Minimal inline buton — Next.js bağımlılığı olmadan çalışır.
 * Playground bu bileşeni sarar ve next/link ile yeniden oluşturabilir. */
function DefaultActionButton({
  children,
  onClick,
  primary,
}: {
  children: ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 var(--sc-space-5)",
        height: 40,
        borderRadius: "var(--sc-radius-md)",
        border: primary ? "none" : "1px solid var(--sc-color-border-default)",
        background: primary ? "var(--sc-color-accent)" : "transparent",
        color: primary ? "var(--sc-color-text-inverse)" : "var(--sc-color-text-default)",
        fontSize: "var(--sc-font-size-sm)",
        fontWeight: "var(--sc-font-weight-medium)",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

function DefaultActionGroup({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "var(--sc-space-3)", flexWrap: "wrap", justifyContent: "center" }}>
      {children}
    </div>
  );
}
