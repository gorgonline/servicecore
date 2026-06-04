"use client";

/* ════════════════════════════════════════════════════════════════════════
 * DocsShell — playground'un dokümantasyon kabuğu
 *
 * Kalıcı sol sidebar (kategorili bileşen navigasyonu + filtre) + sticky topbar
 * + içerik alanı. Tüm bileşen rehber sayfaları bunun içinde render olur.
 *
 * Scroll modeli: WINDOW scroll korunur (sidebar + topbar `position: sticky`).
 * Sebep: bileşen sayfalarındaki sayfa-içi TOC ankraları, Anchor scroll-spy ve
 * Affix/BackTop demoları window scroll'a bağlı — internal scroll kabı bunları
 * bozardı.
 *
 * İstisna: /pano · /kayitlar · /ayarlar tam-ekran panel sayfalarıdır (kendi chrome'u
 * PanelShell'de) → docs kabuğuna sarılmaz, children doğrudan döner.
 * ════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Dashboard, ArrowUpRight } from "@carbon/icons-react";
import { VERSION } from "@servicecoreui/ui";
import { Input } from "@servicecoreui/ui/wraps";
import { appPages, navGroups } from "./nav";
import styles from "./DocsShell.module.css";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  // /pano · /kayitlar · /ayarlar: tam-ekran panel sayfaları, kendi chrome'u (PanelShell) var.
  const isFullBleed =
    (pathname?.startsWith("/pano") ||
      pathname?.startsWith("/kayitlar") ||
      pathname?.startsWith("/ayarlar")) ??
    false;

  const q = query.trim().toLocaleLowerCase("tr");
  const matches = (name: string) => q === "" || name.toLocaleLowerCase("tr").includes(q);

  const filteredGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => matches(item.name)),
    }))
    .filter((group) => group.items.length > 0);

  const showStart = matches("Başlarken");
  const filteredPages = appPages.filter((p) => matches(p.name));
  const hasResults = showStart || filteredPages.length > 0 || filteredGroups.length > 0;

  if (isFullBleed) {
    return <>{children}</>;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <div className={styles.shell}>
      {/* ── Topbar ── */}
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="ServiceCore UI — Başlarken">
          <span className={styles.brandMark}>SC</span>
          <span className={styles.brandName}>ServiceCore UI</span>
          <span className={styles.brandVersion}>v{VERSION}</span>
        </Link>

        <div className={styles.topbarSpacer} />

        <Link href="/pano" className={styles.topbarLink}>
          <Dashboard size={16} />
          Panel Önizleme
        </Link>
      </header>

      {/* ── Body: sidebar + content ── */}
      <div className={styles.body}>
        <aside className={styles.sidebar} aria-label="Bileşen navigasyonu">
          <div className={styles.search}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              prefix={<Search size={16} />}
              placeholder="Bileşen ara"
              allowClear
              aria-label="Bileşen ara"
            />
          </div>

          <nav className={styles.nav}>
            {showStart ? (
              <Link
                href="/"
                className={`${styles.navItem} ${isActive("/") ? styles.navItemActive : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Başlarken
              </Link>
            ) : null}

            {/* Sayfalar — yeniden tasarladığımız gerçek panel sayfaları */}
            {filteredPages.length > 0 ? (
              <div className={styles.navGroup}>
                <span className={styles.navGroupLabel}>Sayfalar</span>
                {filteredPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`${styles.navItem} ${isActive(page.href) ? styles.navItemActive : ""}`}
                    aria-current={isActive(page.href) ? "page" : undefined}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            ) : null}

            {filteredGroups.map((group) => (
              <div key={group.label} className={styles.navGroup}>
                <span className={styles.navGroupLabel}>{group.label}</span>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive(item.href) ? styles.navItemActive : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}

            {!hasResults ? (
              <p className={styles.navEmpty}>
                &quot;{query}&quot; ile eşleşen bileşen yok
              </p>
            ) : null}
          </nav>

          <a
            className={styles.sidebarFootLink}
            href="https://www.npmjs.com/package/@servicecoreui/ui"
            target="_blank"
            rel="noreferrer"
          >
            npm: @servicecoreui/ui
            <ArrowUpRight size={14} />
          </a>
        </aside>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
