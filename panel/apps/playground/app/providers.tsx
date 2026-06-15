"use client";

import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import trTR from "antd/locale/tr_TR";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { I18nextProvider } from "react-i18next";
import { servicecoreTheme } from "@servicecoreui/ui";
import { i18next } from "../lib/i18n";

// dayjs için global Türkçe locale — DatePicker, Calendar, RangePicker
// hepsi bu locale'i kullanır. Pazartesi haftanın ilk günü olur.
dayjs.locale("tr");

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
    <I18nextProvider i18n={i18next}>
      <AntdRegistry>
        <ConfigProvider theme={servicecoreTheme} locale={trTR}>
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </I18nextProvider>
  );
}
