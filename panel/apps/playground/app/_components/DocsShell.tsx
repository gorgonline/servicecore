"use client";

/* ════════════════════════════════════════════════════════════════════════
 * DocsShell — playground dokümantasyon kabuğu (Vercel-docs tarzı)
 *
 * Sol sidebar: arama + iki üst başlık (SAYFALAR · BİLEŞENLER); her grup
 * chevron ile AÇILIR-KAPANIR. Sayfa grupları default açık, bileşen grupları
 * default kapalı (aktif olan açık); aramada eşleşen gruplar açılır.
 *
 * Scroll: window scroll (sidebar + topbar sticky) — Anchor/Affix/BackTop için.
 * Tam-ekran sayfalar (panel + auth) docs kabuğuna sarılmaz.
 * ════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Dashboard, Search } from "@carbon/icons-react";
import { VERSION } from "@servicecoreui/ui";
import { Input } from "@servicecoreui/ui/wraps";
import { navGroups, pageGroups } from "./nav";
import styles from "./DocsShell.module.css";

/** Kendi chrome'u olan tam-ekran sayfalar — docs kabuğuna sarılmaz. */
const FULL_BLEED = [
  "/pano",
  "/kayitlar",
  "/ayarlar",
  "/giris",
  "/sifremi-unuttum",
  "/sifre-sifirla",
  "/sifre-degistir",
  "/2fa",
  "/kayit",
  "/sifre-link-gonderildi",
  "/yetkisiz",
];

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    // Sayfa grupları default açık
    pageGroups.forEach((g) => {
      init[g.label] = true;
    });
    // Bileşen grupları default kapalı; aktif sayfayı içeren açık
    navGroups.forEach((g) => {
      init[g.label] = g.items.some((i) => i.href === pathname);
    });
    return init;
  });

  const isFullBleed = (pathname && FULL_BLEED.some((p) => pathname.startsWith(p))) ?? false;

  const q = query.trim().toLocaleLowerCase("tr");
  const matches = (name: string) => q === "" || name.toLocaleLowerCase("tr").includes(q);

  if (isFullBleed) {
    return <>{children}</>;
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  const toggle = (label: string) => setOpenGroups((p) => ({ ...p, [label]: !p[label] }));

  const renderGroup = (label: string, items: { name: string; href: string }[]) => {
    const filtered = items.filter((i) => matches(i.name));
    if (filtered.length === 0) return null;
    const open = q !== "" || (openGroups[label] ?? false);
    return (
      <div key={label} className={styles.navGroup}>
        <button
          type="button"
          className={styles.navGroupToggle}
          onClick={() => toggle(label)}
          aria-expanded={open}
        >
          <span>{label}</span>
          <ChevronDown
            size={14}
            className={`${styles.navChevron} ${open ? styles.navChevronOpen : ""}`}
          />
        </button>
        {open ? (
          <div className={styles.navGroupItems}>
            {filtered.map((item) => (
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
        ) : null}
      </div>
    );
  };

  const showStart = matches("Başlarken");
  const pagesMatch = pageGroups.some((g) => g.items.some((i) => matches(i.name)));
  const compsMatch = navGroups.some((g) => g.items.some((i) => matches(i.name)));
  const hasResults = showStart || pagesMatch || compsMatch;

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
        <aside className={styles.sidebar} aria-label="Dokümantasyon navigasyonu">
          <div className={styles.search}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              prefix={<Search size={16} />}
              placeholder="Ara…"
              allowClear
              aria-label="Ara"
            />
          </div>

          <nav className={styles.nav}>
            {showStart ? (
              <Link
                href="/"
                className={`${styles.navItem} ${styles.navTopLink} ${isActive("/") ? styles.navItemActive : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Başlarken
              </Link>
            ) : null}

            {pagesMatch ? (
              <div className={styles.navSection}>
                <span className={styles.navSectionTitle}>Sayfalar</span>
                {pageGroups.map((g) => renderGroup(g.label, g.items))}
              </div>
            ) : null}

            {compsMatch ? (
              <div className={styles.navSection}>
                <span className={styles.navSectionTitle}>Bileşenler</span>
                {navGroups.map((g) => renderGroup(g.label, g.items))}
              </div>
            ) : null}

            {!hasResults ? (
              <p className={styles.navEmpty}>&quot;{query}&quot; ile eşleşen sonuç yok</p>
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
