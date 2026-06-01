import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./providers";
import { DocsShell } from "./_components/DocsShell";
import "@servicecoreui/ui/tokens.css";
import "@servicecoreui/ui/styles.css";
import "./globals.css";

export const metadata = {
  title: "ServiceCore UI Playground",
  description: "AntD 5.7 wrap bileşenlerini test ortamı",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>
          <DocsShell>{children}</DocsShell>
        </Providers>
      </body>
    </html>
  );
}
