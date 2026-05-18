"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  TrashCan,
  Copy,
  Download,
  Filter,
  Add,
  Save,
  UserAvatar,
  Settings,
  Logout,
  Notification as NotificationIcon,
  OverflowMenuVertical,
  Catalog,
  Phone,
  WarningAlt,
  Help,
  Asset,
  Idea,
  ShoppingCart,
  Book,
  Time,
  Renew,
} from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Alert, Button, Card, Dropdown, Tag } from "@servicecore/ui/wraps";
import styles from "./dropdowns.module.css";

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

function DoDontGrid({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  const renderList = (items: string[]) => (
    <ul style={{ margin: 0, paddingInlineStart: "var(--sc-space-4)" }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
  return (
    <div className={styles.subgrid}>
      <Alert type="success" showIcon message="Ne zaman kullan" description={renderList(doItems)} />
      <Alert type="error" showIcon message="KULLANMA" description={renderList(dontItems)} />
    </div>
  );
}

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

function AntiPattern({ title, children }: { title: string; children: React.ReactNode }) {
  return <Alert type="error" showIcon message={title} description={children} />;
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function DropdownsPage() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["asc"]);
  const [clickedKey, setClickedKey] = useState<string | null>(null);
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Dropdown</Display>
        <Text size="lg" color="secondary">
          Bir trigger elemana (button, avatar, icon, row aksiyonu) bağlı menü.
          3+ aksiyon barındıran kompakt seçim — bu sayıda Button toplamak yerine
          kullan. Modern API: <code>menu={`{{ items: [...] }}`}</code>{" "}
          (<code>overlay</code> 4.24+ deprecated).
        </Text>
      </header>

      <nav className={styles.toc}>
        <a href="#basic">Basic</a>
        <a href="#trigger">Trigger</a>
        <a href="#placement">Placement</a>
        <a href="#arrow">Arrow</a>
        <a href="#items">Item Türleri</a>
        <a href="#submenu">Submenu</a>
        <a href="#selectable">Selectable</a>
        <a href="#button">Dropdown.Button</a>
        <a href="#render">dropdownRender</a>
        <a href="#controlled">Controlled</a>
        <a href="#mock">Gerçek Kullanım</a>
        <a href="#api-notu">API Notu</a>
        <a href="#do-dont">Ne zaman</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── BASIC ── */}
      <section id="basic" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>menu</span>
          <Heading level={2}>Basic — menu prop</Heading>
        </div>
        <Text size="md" color="secondary">
          Modern API: <code>menu</code> objesine <code>items</code> array'i ver.
          Her item <code>{`{ key, label, icon?, disabled?, danger?, type? }`}</code>.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>basit</span>
            <Dropdown
              menu={{
                items: [
                  { key: "1", label: "Profilim" },
                  { key: "2", label: "Tercihler" },
                  { key: "3", label: "Çıkış" },
                ],
              }}
            >
              <Button>
                Hesap <ChevronDown />
              </Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>onClick handler</span>
            <Dropdown
              menu={{
                onClick: ({ key }) => setClickedKey(key),
                items: [
                  { key: "edit", label: "Düzenle", icon: <Edit /> },
                  { key: "copy", label: "Kopyala", icon: <Copy /> },
                  { key: "download", label: "İndir", icon: <Download /> },
                ],
              }}
            >
              <Button>
                Aksiyonlar <ChevronDown />
              </Button>
            </Dropdown>
            {clickedKey && (
              <Text size="xs" color="tertiary" style={{ marginInlineStart: "var(--sc-space-3)" }}>
                Seçilen: <code>{clickedKey}</code>
              </Text>
            )}
          </div>
        </div>
        <CodeBlock>{`<Dropdown
  menu={{
    onClick: ({ key }) => console.log(key),
    items: [
      { key: "edit", label: "Düzenle", icon: <Edit /> },
      { key: "copy", label: "Kopyala", icon: <Copy /> },
      { key: "download", label: "İndir", icon: <Download /> },
    ],
  }}
>
  <Button>Aksiyonlar <ChevronDown /></Button>
</Dropdown>`}</CodeBlock>
      </section>

      {/* ── TRIGGER ── */}
      <section id="trigger" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>trigger</span>
          <Heading level={2}>Trigger — hover / click / contextMenu</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>['hover']</code>. Touch cihazda hover çalışmaz —{" "}
          dokunmatik destek gerekiyorsa <code>['click']</code> kullan.
          Combine etmek mümkün: <code>{`['click', 'hover']`}</code>.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>hover (default)</span>
            <Dropdown
              menu={{
                items: [
                  { key: "1", label: "Item 1" },
                  { key: "2", label: "Item 2" },
                ],
              }}
            >
              <Button>Hover et <ChevronDown /></Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>click</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  { key: "1", label: "Item 1" },
                  { key: "2", label: "Item 2" },
                ],
              }}
            >
              <Button>Tıkla <ChevronDown /></Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>contextMenu</span>
            <Dropdown
              trigger={["contextMenu"]}
              menu={{
                items: [
                  { key: "cut", label: "Kes", icon: <Edit /> },
                  { key: "copy", label: "Kopyala", icon: <Copy /> },
                  { key: "del", label: "Sil", icon: <TrashCan />, danger: true },
                ],
              }}
            >
              <div className={styles.ctxZone}>
                Sağ tıkla → menü pozisyonu cursor'a uyar
              </div>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* ── PLACEMENT ── */}
      <section id="placement" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>placement</span>
          <Heading level={2}>Placement — 6+ pozisyon</Heading>
        </div>
        <Text size="md" color="secondary">
          Default <code>bottomLeft</code>. Top variant'ları, button'un altında
          yer kalmadığında (viewport alt kenarı yakın) kullan — AntD <code>autoAdjustOverflow</code>{" "}
          (default <strong>açık</strong>) gerektiğinde otomatik flip yapar.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.placementGrid}>
            {(
              [
                "bottomLeft",
                "bottom",
                "bottomRight",
                "topLeft",
                "top",
                "topRight",
              ] as const
            ).map((p) => (
              <div key={p} className={styles.placementCell}>
                <span className={styles.placementLabel}>{p}</span>
                <Dropdown
                  trigger={["click"]}
                  placement={p}
                  menu={{
                    items: [
                      { key: "1", label: "Item 1" },
                      { key: "2", label: "Item 2" },
                      { key: "3", label: "Item 3" },
                    ],
                  }}
                >
                  <Button size="small">Aç</Button>
                </Dropdown>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARROW ── */}
      <section id="arrow" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>arrow</span>
          <Heading level={2}>Arrow — trigger'a işaret</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>arrow</code> popup'a küçük üçgen okluk ekler. Default kapalı —
          context kazanmak için aç. <code>{`{ pointAtCenter: true }`}</code>{" "}
          arrow'u trigger'in tam ortasına nişanlar (placement bottomLeft/bottomRight
          için faydalı).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>arrow yok (default)</span>
            <Dropdown
              trigger={["click"]}
              menu={{ items: [{ key: "1", label: "Item 1" }, { key: "2", label: "Item 2" }] }}
            >
              <Button size="small">Aç</Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>arrow=true</span>
            <Dropdown
              trigger={["click"]}
              arrow
              menu={{ items: [{ key: "1", label: "Item 1" }, { key: "2", label: "Item 2" }] }}
            >
              <Button size="small">Aç</Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>pointAtCenter</span>
            <Dropdown
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
              menu={{ items: [{ key: "1", label: "Item 1" }, { key: "2", label: "Item 2" }] }}
            >
              <Button size="small">Aç</Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* ── ITEMS — icon, divider, group, disabled, danger ── */}
      <section id="items" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>items[]</span>
          <Heading level={2}>Item Türleri</Heading>
        </div>
        <Text size="md" color="secondary">
          Item objesi şu field'ları kabul eder:{" "}
          <code>key</code>, <code>label</code>, <code>icon</code> (Carbon),{" "}
          <code>disabled</code>, <code>danger</code>, <code>type: 'divider' | 'group'</code>,{" "}
          <code>children</code> (submenu için).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>icon + divider</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  { key: "edit", label: "Düzenle", icon: <Edit /> },
                  { key: "copy", label: "Kopyala", icon: <Copy /> },
                  { key: "download", label: "İndir", icon: <Download /> },
                  { type: "divider" },
                  { key: "del", label: "Sil", icon: <TrashCan />, danger: true },
                ],
              }}
            >
              <Button>Aksiyonlar <ChevronDown /></Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>disabled</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  { key: "1", label: "Aktif aksiyon" },
                  { key: "2", label: "Bekleyen aksiyon", disabled: true },
                  { key: "3", label: "Henüz hazır değil", disabled: true },
                ],
              }}
            >
              <Button>Aç <ChevronDown /></Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>group başlığı</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "g1",
                    type: "group",
                    label: "Görünüm",
                    children: [
                      { key: "compact", label: "Sıkı" },
                      { key: "comfortable", label: "Geniş" },
                    ],
                  },
                  { type: "divider" },
                  {
                    key: "g2",
                    type: "group",
                    label: "Tema",
                    children: [
                      { key: "light", label: "Açık" },
                      { key: "dark", label: "Koyu" },
                    ],
                  },
                ],
              }}
            >
              <Button>Görünüm <ChevronDown /></Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* ── SUBMENU ── */}
      <section id="submenu" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>children[]</span>
          <Heading level={2}>Submenu — Cascading Menu</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>children</code> alanı ile alt menü aç. 2 seviyeden derinleşme —
          okunabilirlik düşer ve cascade hatası riski artar (yanlış item'a hover).
        </Text>
        <div className={styles.showcase}>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                { key: "open", label: "Aç", icon: <Add /> },
                {
                  key: "move",
                  label: "Taşı",
                  icon: <ChevronRight />,
                  children: [
                    { key: "m-cagri", label: "Çağrılar'a", icon: <Phone /> },
                    { key: "m-olay", label: "Olaylar'a", icon: <WarningAlt /> },
                    { key: "m-problem", label: "Problemler'e", icon: <Idea /> },
                    { type: "divider" },
                    { key: "m-arsiv", label: "Arşiv'e" },
                  ],
                },
                {
                  key: "share",
                  label: "Paylaş",
                  icon: <ChevronRight />,
                  children: [
                    { key: "s-link", label: "Bağlantı kopyala" },
                    { key: "s-email", label: "E-posta gönder" },
                    { key: "s-export", label: "Dışa aktar (PDF)" },
                  ],
                },
                { type: "divider" },
                { key: "del", label: "Sil", icon: <TrashCan />, danger: true },
              ],
            }}
          >
            <Button>Daha fazla <ChevronDown /></Button>
          </Dropdown>
        </div>
        <Alert
          type="info"
          showIcon
          message="2 seviyeden fazla derinleşme"
          description="3+ kademeli cascade okunması zor, hover yanlış item'a kaymaya yatkın. Çok seviyeli ihtiyaç varsa Drawer/Modal içinde Tree veya Menu kullan."
        />
      </section>

      {/* ── SELECTABLE ── */}
      <section id="selectable" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>selectable</span>
          <Heading level={2}>Selectable — Sıralama / Filtre</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>menu.selectable</code> + <code>selectedKeys</code> ile item state
          tut. Sort/filter gibi <strong>seçim sürekli görünür</strong> olması
          gereken durumlar için. Birden çok seçim için{" "}
          <code>menu.multiple</code> kullan (toplu filtre).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>tek seçim</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                selectable: true,
                selectedKeys,
                onSelect: ({ selectedKeys: ks }) => setSelectedKeys(ks as string[]),
                items: [
                  { key: "asc", label: "Tarih (eski → yeni)" },
                  { key: "desc", label: "Tarih (yeni → eski)" },
                  { key: "prio", label: "Öncelik" },
                  { key: "sla", label: "SLA kalan süre" },
                ],
              }}
            >
              <Button>
                Sırala: <strong style={{ marginInlineStart: 4 }}>{selectedKeys[0]}</strong>{" "}
                <ChevronDown />
              </Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>çoklu (multiple)</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                selectable: true,
                multiple: true,
                defaultSelectedKeys: ["acik", "beklemede"],
                items: [
                  { key: "acik", label: "Açık" },
                  { key: "islemde", label: "İşlemde" },
                  { key: "beklemede", label: "Beklemede" },
                  { key: "cozuldu", label: "Çözüldü" },
                  { key: "kapali", label: "Kapalı" },
                ],
              }}
            >
              <Button leadingIcon={<Filter />}>Filtre <ChevronDown /></Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* ── DROPDOWN.BUTTON ── */}
      <section id="button" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>Dropdown.Button</span>
          <Heading level={2}>Split Button</Heading>
        </div>
        <Text size="md" color="secondary">
          Sol tarafta primary aksiyon (Kaydet) + sağ tarafta caret ile alternatifler
          (Kaydet ve kapat / Taslak kaydet / Şablon yap). Default caret: Carbon{" "}
          <code>ChevronDown</code>.
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>default</span>
            <Dropdown.Button
              menu={{
                items: [
                  { key: "save-close", label: "Kaydet ve kapat" },
                  { key: "save-new", label: "Kaydet ve yeni ekle" },
                  { key: "draft", label: "Taslak olarak kaydet" },
                ],
              }}
              onClick={() => alert("Kaydet")}
            >
              <Save /> Kaydet
            </Dropdown.Button>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>primary</span>
            <Dropdown.Button
              type="primary"
              menu={{
                items: [
                  { key: "save-close", label: "Kaydet ve kapat" },
                  { key: "save-new", label: "Kaydet ve yeni ekle" },
                ],
              }}
            >
              Kaydet
            </Dropdown.Button>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>loading + disabled</span>
            <div style={{ display: "flex", gap: "var(--sc-space-3)" }}>
              <Dropdown.Button
                loading
                menu={{ items: [{ key: "1", label: "Item 1" }] }}
              >
                Kaydediliyor
              </Dropdown.Button>
              <Dropdown.Button
                disabled
                menu={{ items: [{ key: "1", label: "Item 1" }] }}
              >
                Disabled
              </Dropdown.Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── dropdownRender ── */}
      <section id="render" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>dropdownRender</span>
          <Heading level={2}>Custom Content (dropdownRender)</Heading>
        </div>
        <Text size="md" color="secondary">
          Menü değil, custom panel (form, summary, filter set) göstermek için{" "}
          <code>dropdownRender</code> kullan. Function alır default menu node'unu,
          istediğin gibi sar.
        </Text>
        <Alert
          type="warning"
          showIcon
          message="popupRender (5.25+) — bizde yok"
          description={
            <>
              AntD 5.25+ <code>popupRender</code> tanıttı. 5.7 baseline'da{" "}
              <code>dropdownRender</code> (4.24+) kullanılır — aynı işi yapar.
            </>
          }
        />
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>custom panel</span>
            <Dropdown
              trigger={["click"]}
              menu={{ items: [] }}
              dropdownRender={() => (
                <div
                  style={{
                    background: "var(--sc-color-bg-base)",
                    border: "1px solid var(--sc-color-border-default)",
                    borderRadius: "var(--sc-radius-md)",
                    boxShadow: "var(--sc-shadow-md)",
                  }}
                >
                  <div className={styles.customPanel}>
                    <span className={styles.customPanelTitle}>Filtre</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                        <input type="checkbox" defaultChecked /> SLA aşıldı
                      </label>
                      <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                        <input type="checkbox" /> Yüksek öncelik
                      </label>
                      <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                        <input type="checkbox" /> Bana atanmış
                      </label>
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Button size="small" type="text">Sıfırla</Button>
                      <Button size="small" type="primary">Uygula</Button>
                    </div>
                  </div>
                </div>
              )}
            >
              <Button leadingIcon={<Filter />}>Filtre <ChevronDown /></Button>
            </Dropdown>
          </div>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>menu + extra footer</span>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  { key: "1", label: "Profilim", icon: <UserAvatar /> },
                  { key: "2", label: "Tercihler", icon: <Settings /> },
                ],
              }}
              dropdownRender={(menu) => (
                <div
                  style={{
                    background: "var(--sc-color-bg-base)",
                    border: "1px solid var(--sc-color-border-default)",
                    borderRadius: "var(--sc-radius-md)",
                    boxShadow: "var(--sc-shadow-md)",
                  }}
                >
                  {menu}
                  <div
                    style={{
                      borderTop: "1px solid var(--sc-color-border-subtle)",
                      padding: "8px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 11, color: "var(--sc-color-text-tertiary)" }}>
                      v1.15.10
                    </span>
                    <Button type="link" size="small">
                      <Logout style={{ marginInlineEnd: 4 }} /> Çıkış
                    </Button>
                  </div>
                </div>
              )}
            >
              <Button>Hesap <ChevronDown /></Button>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* ── CONTROLLED ── */}
      <section id="controlled" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>open</span>
          <Heading level={2}>Controlled — open / onOpenChange</Heading>
        </div>
        <Text size="md" color="secondary">
          Dış state ile aç/kapat yönet — keyboard shortcut, programmatik trigger,
          item tıklamasında popup'ı açık tutma gibi durumlar. AntD 5.7'de{" "}
          <code>onOpenChange</code> sadece <code>(open: boolean) =&gt; void</code>{" "}
          alır (<code>info.source</code> 5.11+ özelliği).
        </Text>
        <div className={styles.showcase}>
          <div className={styles.showcaseRow}>
            <span className={styles.rowLabel}>controlled</span>
            <div style={{ display: "flex", gap: "var(--sc-space-3)", alignItems: "center" }}>
              <Dropdown
                open={controlledOpen}
                onOpenChange={setControlledOpen}
                menu={{
                  items: [
                    { key: "1", label: "Item 1" },
                    { key: "2", label: "Item 2" },
                    { key: "3", label: "Item 3" },
                  ],
                }}
              >
                <Button>Tetiklenmiş <ChevronDown /></Button>
              </Dropdown>
              <Button size="small" onClick={() => setControlledOpen((v) => !v)}>
                Dışarıdan {controlledOpen ? "kapat" : "aç"}
              </Button>
              <Text size="xs" color="tertiary">
                open: <code>{String(controlledOpen)}</code>
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>gerçek</span>
          <Heading level={2}>Gerçek Kullanım</Heading>
        </div>

        <MockBlock caption="Header — kullanıcı menüsü (avatar + isim → profil aksiyonları)">
          <div className={styles.mockFrame}>
            <div className={styles.headerMock}>
              <button className={styles.iconBtn} aria-label="Bildirimler">
                <NotificationIcon />
              </button>
              <button className={styles.iconBtn} aria-label="Yardım">
                <Help />
              </button>
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                menu={{
                  items: [
                    { key: "profile", label: "Profilim", icon: <UserAvatar /> },
                    { key: "prefs", label: "Tercihler", icon: <Settings /> },
                    { key: "help", label: "Yardım", icon: <Help /> },
                    { type: "divider" },
                    { key: "logout", label: "Çıkış", icon: <Logout />, danger: true },
                  ],
                }}
              >
                <button className={styles.profileTrigger}>
                  <span className={styles.avatar}>AY</span>
                  Ayşe Y.
                  <ChevronDown size={14} />
                </button>
              </Dropdown>
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Tablo satırı — 3-nokta aksiyon menüsü (overflow)">
          <div className={styles.mockFrame}>
            {[
              { id: "SC-4127", title: "Print server bağlanamıyor", tone: "warning" as const, status: "Beklemede" },
              { id: "SC-4126", title: "VPN yavaş — ev ofisi", tone: "accent" as const, status: "İşlemde" },
              { id: "SC-4125", title: "Yeni kullanıcı AD entegrasyonu", tone: "success" as const, status: "Çözüldü" },
            ].map((row) => (
              <div key={row.id} className={styles.rowMock}>
                <Text size="xs" color="tertiary" style={{ fontFamily: "var(--sc-font-mono)" }}>
                  {row.id}
                </Text>
                <Text size="sm">{row.title}</Text>
                <Tag tone={row.tone} dot size="small">
                  {row.status}
                </Tag>
                <Dropdown
                  trigger={["click"]}
                  placement="bottomRight"
                  menu={{
                    items: [
                      { key: "open", label: "Aç", icon: <Add /> },
                      { key: "assign", label: "Bana ata", icon: <UserAvatar /> },
                      { key: "edit", label: "Düzenle", icon: <Edit /> },
                      { key: "copy", label: "ID kopyala", icon: <Copy /> },
                      { type: "divider" },
                      {
                        key: "move",
                        label: "Taşı",
                        icon: <ChevronRight />,
                        children: [
                          { key: "m-olay", label: "Olay olarak işaretle" },
                          { key: "m-problem", label: "Problem'e dönüştür" },
                        ],
                      },
                      { type: "divider" },
                      { key: "del", label: "Sil", icon: <TrashCan />, danger: true },
                    ],
                  }}
                >
                  <button className={styles.iconBtn} aria-label="Daha fazla">
                    <OverflowMenuVertical />
                  </button>
                </Dropdown>
              </div>
            ))}
          </div>
        </MockBlock>

        <MockBlock caption="PageHeader — Split button (Kaydet + alternatifler)">
          <div className={styles.mockFrame}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Heading level={3}>Yeni Çağrı</Heading>
              <div style={{ display: "flex", gap: "var(--sc-space-2)" }}>
                <Button type="default">İptal</Button>
                <Dropdown.Button
                  type="primary"
                  menu={{
                    items: [
                      { key: "save-close", label: "Kaydet ve kapat" },
                      { key: "save-new", label: "Kaydet ve yeni" },
                      { type: "divider" },
                      { key: "draft", label: "Taslak olarak kaydet" },
                      { key: "template", label: "Şablon yap" },
                    ],
                  }}
                >
                  <Save /> Kaydet
                </Dropdown.Button>
              </div>
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Toolbar — Filtre paneli (dropdownRender ile custom panel)">
          <div className={styles.mockFrame}>
            <div style={{ display: "flex", gap: "var(--sc-space-2)" }}>
              <Dropdown
                trigger={["click"]}
                menu={{
                  selectable: true,
                  defaultSelectedKeys: ["sla"],
                  items: [
                    { key: "asc", label: "Tarih (eski → yeni)" },
                    { key: "desc", label: "Tarih (yeni → eski)" },
                    { key: "prio", label: "Öncelik" },
                    { key: "sla", label: "SLA kalan süre" },
                  ],
                }}
              >
                <Button size="small">Sırala <ChevronDown /></Button>
              </Dropdown>
              <Dropdown
                trigger={["click"]}
                menu={{
                  selectable: true,
                  multiple: true,
                  defaultSelectedKeys: ["acik", "islemde"],
                  items: [
                    { key: "acik", label: "Açık" },
                    { key: "islemde", label: "İşlemde" },
                    { key: "beklemede", label: "Beklemede" },
                    { key: "cozuldu", label: "Çözüldü" },
                  ],
                }}
              >
                <Button size="small" leadingIcon={<Filter />}>Durum <ChevronDown /></Button>
              </Dropdown>
              <Dropdown
                trigger={["click"]}
                menu={{
                  selectable: true,
                  multiple: true,
                  items: [
                    { key: "donanim", label: "Donanım", icon: <Asset /> },
                    { key: "yazilim", label: "Yazılım", icon: <Catalog /> },
                    { key: "ag", label: "Ağ" },
                    { key: "hesap", label: "Hesap", icon: <UserAvatar /> },
                  ],
                }}
              >
                <Button size="small" leadingIcon={<Filter />}>Kategori <ChevronDown /></Button>
              </Dropdown>
            </div>
          </div>
        </MockBlock>

        <MockBlock caption="Bilgi tabanı — Context menu (sağ tık → makale aksiyonları)">
          <div className={styles.mockFrame}>
            <Dropdown
              trigger={["contextMenu"]}
              menu={{
                items: [
                  { key: "open", label: "Yeni sekmede aç" },
                  { key: "copy-link", label: "Bağlantı kopyala", icon: <Copy /> },
                  { type: "divider" },
                  {
                    key: "label",
                    label: "Etiket ekle",
                    icon: <ChevronRight />,
                    children: [
                      { key: "l-donanim", label: "Donanım" },
                      { key: "l-print", label: "Print" },
                      { key: "l-network", label: "Ağ" },
                    ],
                  },
                  { type: "divider" },
                  { key: "remove", label: "Yer imlerinden çıkar", danger: true },
                ],
              }}
            >
              <Card hoverable size="small">
                <div style={{ display: "flex", gap: "var(--sc-space-3)", alignItems: "center" }}>
                  <Book />
                  <div style={{ flex: 1 }}>
                    <Text size="sm" weight="semibold">
                      Print Server Bağlantı Hatalarını Çözme
                    </Text>
                    <Text size="xs" color="tertiary">
                      Donanım › Print · 5 dk okuma
                    </Text>
                  </div>
                  <Tag tone="info" size="small">
                    Sağ tıkla
                  </Tag>
                </div>
              </Card>
            </Dropdown>
          </div>
        </MockBlock>

        <CodeBlock>{`<Dropdown
  trigger={["click"]}
  placement="bottomRight"
  menu={{
    items: [
      { key: "open", label: "Aç", icon: <Add /> },
      { key: "assign", label: "Bana ata", icon: <UserAvatar /> },
      { type: "divider" },
      { key: "del", label: "Sil", icon: <TrashCan />, danger: true },
    ],
  }}
>
  <button className="iconBtn"><OverflowMenuVertical /></button>
</Dropdown>`}</CodeBlock>
      </section>

      {/* ── API NOTU ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>not</span>
          <Heading level={2}>API Notu — 5.7 baseline farkları</Heading>
        </div>

        <Alert
          type="warning"
          showIcon
          message="overlay prop'u — 4.24+ DEPRECATED"
          description={
            <>
              <code>overlay={`{<Menu>...</Menu>}`}</code> eski yöntem.{" "}
              <code>menu={`{{ items: [...] }}`}</code> kullan — data-driven,
              tip-güvenli, refactor kolay.
            </>
          }
        />

        <Alert
          type="warning"
          showIcon
          message="visible / onVisibleChange — 4.23+ DEPRECATED"
          description={
            <>
              <code>visible</code> ve <code>onVisibleChange</code> deprecated.{" "}
              <code>open</code> ve <code>onOpenChange</code> kullan.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="popupRender / destroyOnHidden — 5.25+ özelliği"
          description={
            <>
              AntD 5.25+ <code>popupRender</code> ve <code>destroyOnHidden</code>{" "}
              tanıttı. Biz 5.7 baseline'dayız — <code>dropdownRender</code> (4.24+)
              ve <code>destroyPopupOnHide</code> kullanılır. Backend AntD upgrade
              ederse rename mümkün.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="onOpenChange info.source — 5.11+ özelliği"
          description={
            <>
              5.11+ ile <code>onOpenChange</code>'a ikinci argüman olarak{" "}
              <code>{`{ source: 'trigger' | 'menu' }`}</code> geliyor. 5.7'de yok
              — sadece <code>(open: boolean) =&gt; void</code>.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="autoAdjustOverflow — 5.2+ açık (default true)"
          description={
            <>
              Viewport kenarına yaklaşınca popup otomatik flip eder. Genelde
              dokunma — sadece özel scroll container'larda{" "}
              <code>getPopupContainer</code> ile birlikte gerekirse kapat.
            </>
          }
        />

        <Alert
          type="info"
          showIcon
          message="getPopupContainer — scrollable parent için"
          description={
            <>
              Default popup <code>document.body</code>'e portal'lanır. Modal,
              Drawer, virtualized table gibi kendi scroll'u olan parent'larda
              popup yerinde kalmaz —{" "}
              <code>{`getPopupContainer={(trigger) => trigger.parentElement!}`}</code>{" "}
              ile o scope'a bağla.
            </>
          }
        />
      </section>

      {/* ── DO/DONT ── */}
      <section id="do-dont" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>kural</span>
          <Heading level={2}>Ne Zaman Kullan</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "3+ aksiyon barındıran kompakt seçim (row aksiyonu, header user menü)",
            "Sort/filter gibi sıkışık toolbar'da (Button yerine)",
            "Split button — primary + alternatifler (Dropdown.Button)",
            "Context menu (sağ tık → veri satırı aksiyonları)",
            "Custom panel (dropdownRender + filter set, mini-form)",
            "Pano/tenant seçici (Breadcrumb içinde menu prop)",
          ]}
          dontItems={[
            "2 veya daha az seçenek — direkt Button kullan",
            "Form input seçimi — Select kullan (search, multi-tag, async)",
            "Persistent navigation — sidebar/Menu kullan",
            "Modal/Drawer açılışı için (Button + onClick yeterli)",
            "Touch-only ortamda hover trigger ile — click'e geç",
            "10+ item'lık uzun listeler — Modal + Tree/Table'a geçir",
          ]}
        />
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <AntiPattern title="Hata 1 — overlay prop'u (deprecated)">
          AntD 4.24+ <code>overlay={`{<Menu>...</Menu>}`}</code> deprecated. Yeni
          kodda hep <code>menu={`{{ items }}`}</code> kullan — data-driven,
          serileştirilebilir, test edilebilir.
        </AntiPattern>

        <AntiPattern title="Hata 2 — Select yerine Dropdown ile form input">
          Dropdown <strong>aksiyon menüsüdür</strong>, form input değil. Form
          için <code>Select</code> kullan: arama, multi-tag, validation, async
          loading, value/onChange hepsi hazır.
        </AntiPattern>

        <AntiPattern title="Hata 3 — Persistent nav için Dropdown">
          Sidebar / ana navigasyon her zaman görünür olmalı —{" "}
          <code>Menu</code> kullan. Dropdown sadece tetiklenince açılır,{" "}
          ana navigasyona uygun değil.
        </AntiPattern>

        <AntiPattern title="Hata 4 — Touch-only ekranda hover trigger">
          Default <code>['hover']</code> dokunmatik cihazda çalışmaz. Mobile/tablet
          panel ediyorsan <code>trigger={`{['click']}`}</code> veya{" "}
          <code>{`['click', 'hover']`}</code> ver.
        </AntiPattern>

        <AntiPattern title="Hata 5 — 3+ seviyeli submenu">
          Cascade submenu 2 seviyede kal. 3+ seviye hover ile yanlış item'a
          kayar, kullanıcı yolunu kaybeder. Derin hiyerarşi için Drawer + Tree
          veya Modal + Menu kullan.
        </AntiPattern>

        <AntiPattern title="Hata 6 — Scrollable parent içinde getPopupContainer'sız">
          Modal/Drawer/virtualized table içindeki Dropdown, scroll'da yerinde
          kalmaz —{" "}
          <code>{`getPopupContainer={(t) => t.parentElement!}`}</code> ver,{" "}
          parent'a portal'lansın.
        </AntiPattern>

        <AntiPattern title="Hata 7 — children'a ReactNode olmayan element">
          Dropdown trigger'inin <strong>onMouseEnter/Leave/Focus/Click</strong>{" "}
          event'lerini propagate etmesi gerek. Custom div verirsen unutma —{" "}
          Button, Avatar, &lt;a&gt; yerine span/div sararsan event kaybolur.
        </AntiPattern>

        <AntiPattern title="Hata 8 — 10+ item'lık uzun liste">
          Dropdown menü kompakt aksiyon için. 10+ item olduğunda Modal +
          arama/Tree yapısına geçir — kullanıcı kaydırırken context kaybeder.
        </AntiPattern>
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
