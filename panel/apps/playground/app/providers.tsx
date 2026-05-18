"use client";

import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { servicecoreTheme } from "@servicecore/ui/theme";

// AntD 5.7 + React 18.3 dev mode'da `element.ref` deprecation warning'i tetikler.
// Library bug'ı değil — AntD'nin içindeki cloneElement çağrısı. Prod'da yok.
// Dev console'u temiz tutmak için bu specific mesajı filtrele (hem server hem client).
{
  const g = globalThis as unknown as { __SC_ERROR_PATCHED__?: boolean };
  if (!g.__SC_ERROR_PATCHED__) {
    g.__SC_ERROR_PATCHED__ = true;
    const original = console.error;
    console.error = (...args: unknown[]) => {
      const first = args[0];
      if (typeof first === "string" && first.includes("element.ref was removed in React 19")) return;
      original(...args);
    };
  }
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={servicecoreTheme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
