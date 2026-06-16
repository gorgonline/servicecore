"use client";

import { useState } from "react";
import { Folder, FolderOpen, Document, ServerProxy } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui/typography";
import { Alert, Tree } from "@servicecoreui/ui/wraps";
import type { TreeDataNode } from "@servicecoreui/ui/wraps";
import styles from "./tree.module.css";

/* ────────────────────────────────────────────────
 * Mock data
 * ──────────────────────────────────────────────── */

const ASSET_TREE: TreeDataNode[] = [
  {
    title: "İstanbul Veri Merkezi",
    key: "ist",
    children: [
      {
        title: "Rack A-12 (Production)",
        key: "ist.a12",
        children: [
          { title: "srv-app-01", key: "ist.a12.app01", isLeaf: true },
          { title: "srv-app-02", key: "ist.a12.app02", isLeaf: true },
          { title: "srv-db-01", key: "ist.a12.db01", isLeaf: true },
        ],
      },
      {
        title: "Rack B-04 (Staging)",
        key: "ist.b04",
        children: [
          { title: "srv-stg-01", key: "ist.b04.stg01", isLeaf: true },
          { title: "srv-stg-02", key: "ist.b04.stg02", isLeaf: true, disabled: true },
        ],
      },
    ],
  },
  {
    title: "Ankara Veri Merkezi",
    key: "ank",
    children: [
      { title: "Rack 1 (DR)", key: "ank.1", children: [
        { title: "srv-dr-01", key: "ank.1.dr01", isLeaf: true },
      ] },
    ],
  },
];

const PERMISSIONS_TREE: TreeDataNode[] = [
  {
    title: "Bilet Yönetimi",
    key: "tickets",
    children: [
      { title: "Görüntüle", key: "tickets.view" },
      { title: "Oluştur", key: "tickets.create" },
      { title: "Düzenle", key: "tickets.edit" },
      { title: "Sil", key: "tickets.delete" },
    ],
  },
  {
    title: "Asset Yönetimi",
    key: "assets",
    children: [
      { title: "Görüntüle", key: "assets.view" },
      { title: "Düzenle", key: "assets.edit" },
      { title: "Sil", key: "assets.delete" },
    ],
  },
  {
    title: "Kullanıcı Yönetimi",
    key: "users",
    children: [
      { title: "Görüntüle", key: "users.view" },
      { title: "Oluştur", key: "users.create" },
      { title: "Rol Atama", key: "users.role" },
    ],
  },
];

const FILES_TREE: TreeDataNode[] = [
  {
    title: "kb-articles",
    key: "0",
    children: [
      { title: "vpn-baglanma-rehberi.md", key: "0-0", isLeaf: true },
      { title: "outlook-kurulum.md", key: "0-1", isLeaf: true },
      {
        title: "ag-konfigurasyon",
        key: "0-2",
        children: [
          { title: "switch-port-reset.md", key: "0-2-0", isLeaf: true },
          { title: "vlan-yapilandirma.md", key: "0-2-1", isLeaf: true },
        ],
      },
    ],
  },
  {
    title: "templates",
    key: "1",
    children: [
      { title: "ticket-bildirim.html", key: "1-0", isLeaf: true },
      { title: "csat-anket.html", key: "1-1", isLeaf: true },
    ],
  },
];

/* ────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────── */

function MockBlock({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className={styles.mock}>
      <span className={styles.mockCaption}>{caption}</span>
      <div className={styles.mockFrame}>{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <Code block>{children}</Code>;
}

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

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function TreePage() {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([
    "tickets.view",
    "tickets.create",
    "assets.view",
  ]);

  const selectedTitle = (() => {
    if (selectedKeys.length === 0) return "Bir asset seç";
    const key = String(selectedKeys[0]);
    // Recursive find
    const find = (nodes: TreeDataNode[]): TreeDataNode | undefined => {
      for (const n of nodes) {
        if (n.key === key) return n;
        if (n.children) {
          const found = find(n.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    const node = find(ASSET_TREE);
    return node?.title ?? "Bir asset seç";
  })();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Tree</Display>
        <Text size="lg" color="secondary">
          Hiyerarşik veri görüntüleme. Asset hierarchy, permission tree,
          organization chart, KB taxonomy, file explorer. <strong>Tree vs
          TreeSelect:</strong> Tree standalone gösterim/seçim, TreeSelect
          input içinde dropdown.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#vs">Tree vs TreeSelect</a>
        <a href="#temel">Temel</a>
        <a href="#checkable">Checkable</a>
        <a href="#strict">checkStrictly</a>
        <a href="#icon">Icon + showLine</a>
        <a href="#directory">DirectoryTree</a>
        <a href="#mock">Asset Hierarchy</a>
        <a href="#anti">Anti-pattern</a>
      </nav>

      {/* ── API Notu ── */}
      <section id="api-notu" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>not</span>
          <Heading level={2}>API: AntD 5.7 baseline</Heading>
        </div>
        <Alert
          type="success"
          showIcon
          message="5.7'de mevcut tüm temel API"
          description={
            <>
              <code>treeData</code>, <code>fieldNames</code> (4.17+),{" "}
              <code>checkable</code>, <code>checkedKeys</code>,{" "}
              <code>checkStrictly</code>, <code>selectable</code>,{" "}
              <code>selectedKeys</code>, <code>multiple</code>,{" "}
              <code>expandedKeys</code>, <code>defaultExpandAll</code>,{" "}
              <code>autoExpandParent</code>, <code>onExpand</code>,{" "}
              <code>onLoad</code>, <code>showIcon</code>, <code>icon</code>,{" "}
              <code>showLine</code>, <code>switcherIcon</code>,{" "}
              <code>draggable</code> (object form — 4.17+),{" "}
              <code>allowDrop</code>, <code>onDrop</code>,{" "}
              <code>blockNode</code>, <code>virtual</code> (4.1+),{" "}
              <code>height</code>, <code>filterTreeNode</code>,{" "}
              <code>loadData</code>, <code>loadedKeys</code>,{" "}
              <code>rootStyle</code> (4.20+), <code>titleRender</code> (4.5+),{" "}
              <code>Tree.DirectoryTree</code>.
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>switcherLoadingIcon</code> (5.20+),{" "}
              <code>classNames</code>/<code>styles</code> semantic DOM (6.0+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="checkStrictly — parent-child sync kontrolü"
          description={
            <>
              Default <code>false</code> — parent checked = tüm child'lar
              checked. <strong>checkStrictly=true:</strong> parent/child
              bağımsız (permission tree gibi <strong>fine-grained</strong>
              seçim için kritik — "modül seç" ≠ "tüm operasyonlar seç").
            </>
          }
        />
      </section>

      {/* ── VS ── */}
      <section id="vs" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>karar</span>
          <Heading level={2}>Tree vs TreeSelect</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Tree: standalone widget (sidebar nav, file explorer, permission)",
            "Tree: drag & drop ile reorganize",
            "TreeSelect: form alanı içinde dropdown (kategori seç)",
            "Tree: virtual scroll ile 1000+ node",
          ]}
          dontItems={[
            "Tree'yi form input için (yer kapar — TreeSelect kullan)",
            "TreeSelect'i sidebar nav için (dropdown overhead)",
            "1-2 seviyeli az veri için Tree (Collapse veya Radio.Group yeter)",
          ]}
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — selectable</Heading>
        </div>
        <MockBlock caption="Tıkla, expand/collapse, select">
          <Tree treeData={ASSET_TREE} defaultExpandAll />
        </MockBlock>
        <CodeBlock>{`<Tree
  treeData={categories}
  defaultExpandAll
  onSelect={(keys) => setSelected(keys)}
/>`}</CodeBlock>
      </section>

      {/* ── CHECKABLE ── */}
      <section id="checkable" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>checkable</span>
          <Heading level={2}>Checkable — parent-child sync (default)</Heading>
        </div>
        <Text size="md" color="secondary">
          Parent check = tüm child check. Default davranış. Permission tree'de
          "modülün tüm operasyonlarını ver" pattern'i için ideal.
        </Text>
        <MockBlock caption="Parent seçilince child'lar otomatik check">
          <Tree
            checkable
            treeData={PERMISSIONS_TREE}
            defaultExpandAll
            checkedKeys={checkedKeys}
            onCheck={(keys) => setCheckedKeys(keys as React.Key[])}
          />
        </MockBlock>
        <CodeBlock>{`<Tree
  checkable
  checkedKeys={checked}
  onCheck={setChecked}
  treeData={permissions}
/>`}</CodeBlock>
      </section>

      {/* ── STRICTLY ── */}
      <section id="strict" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>checkStrictly</span>
          <Heading level={2}>checkStrictly — parent/child bağımsız</Heading>
        </div>
        <Text size="md" color="secondary">
          Default sync davranışı kapanır — kullanıcı her node'u bağımsız işaretler.
          Permission tree'de <strong>fine-grained</strong> seçim için kritik.
        </Text>
        <MockBlock caption="checkStrictly=true">
          <Tree
            checkable
            checkStrictly
            treeData={PERMISSIONS_TREE}
            defaultExpandAll
          />
        </MockBlock>
      </section>

      {/* ── ICON + SHOW LINE ── */}
      <section id="icon" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>showIcon + showLine</span>
          <Heading level={2}>Icon + Connect Lines</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>showIcon</code> her node'a icon. <code>showLine</code> dikey
          bağlantı çizgileri. Eski masaüstü tarzı UI için.
        </Text>
        <MockBlock caption="showLine + custom icon">
          <Tree
            showIcon
            showLine
            defaultExpandAll
            treeData={[
              {
                title: "Veri Merkezi",
                key: "dc",
                icon: <Folder />,
                children: [
                  {
                    title: "App Tier",
                    key: "dc.app",
                    icon: <FolderOpen />,
                    children: [
                      { title: "srv-app-01", key: "dc.app.01", isLeaf: true, icon: <ServerProxy /> },
                      { title: "srv-app-02", key: "dc.app.02", isLeaf: true, icon: <ServerProxy /> },
                    ],
                  },
                ],
              },
            ]}
          />
        </MockBlock>
      </section>

      {/* ── DIRECTORY ── */}
      <section id="directory" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>Tree.DirectoryTree</span>
          <Heading level={2}>DirectoryTree — file explorer tarzı</Heading>
        </div>
        <Text size="md" color="secondary">
          Folder icon otomatik. <code>multiple</code> ile Ctrl/Cmd + click
          çoklu seçim. KB asset library, doküman yönetimi için.
        </Text>
        <MockBlock caption="DirectoryTree — KB content">
          <Tree.DirectoryTree multiple treeData={FILES_TREE} defaultExpandAll />
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Asset Hierarchy — master-detail</Heading>
        </div>
        <MockBlock caption="Sol: asset tree · Sağ: seçili asset detayı">
          <div className={styles.twoCol}>
            <Tree
              treeData={ASSET_TREE}
              defaultExpandAll
              selectedKeys={selectedKeys}
              onSelect={(keys) => setSelectedKeys(keys)}
            />
            <div className={styles.detail}>
              <Eyebrow tone="accent">Seçili Asset</Eyebrow>
              <Heading level={4}>{String(selectedTitle)}</Heading>
              <Text size="sm" color="secondary">
                {selectedKeys.length === 0
                  ? "Soldaki ağaçtan bir asset seç. Detay buraya yüklenir."
                  : "Asset detayı, network bilgisi, sahibi, bağlı biletler bu panelde gösterilir."}
              </Text>
            </div>
          </div>
        </MockBlock>
      </section>

      {/* ── ANTI-PATTERN ── */}
      <section id="anti" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>YAPMA</span>
          <Heading level={2}>Anti-Pattern</Heading>
        </div>

        <Alert
          type="error"
          showIcon
          message="Hata 1 — Permission tree'de checkStrictly yok"
          description={
            <>
              "Bilet → Görüntüle" işaretle → "Bilet" parent de checked olur
              (sync). Backend "tüm bilet operasyonları" olarak yorumlar →
              fazla yetki. <strong>Çözüm:</strong> permission tree'lerde her
              zaman <code>checkStrictly</code>.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — 1000+ node virtual'sız"
          description={
            <>
              Tüm node'lar DOM'da → perf ölümü. <strong>Çözüm:</strong>{" "}
              <code>virtual</code> (4.1+) + <code>height</code> ver.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — Form input için Tree"
          description={
            <>
              Tree dar yer kaplar, form'da çirkin durur.{" "}
              <strong>Çözüm:</strong> TreeSelect (input içinde dropdown).
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Drag & drop var ama persistence yok"
          description={
            <>
              <code>draggable</code> ile drag aktif ama <code>onDrop</code>{" "}
              callback'i state'i güncellemiyor → drop animasyonu var ama
              veri eski. Backend'e save + local state update gerek.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — 1-2 seviyeli az veri için Tree"
          description={
            <>
              "Aktif/Pasif" altında 5 alt option Tree overkill. Collapse veya
              Radio.Group yeter. Tree 3+ seviye veya 30+ node için anlamlı.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — switcherLoadingIcon beklemek (5.20+, yok)"
          description={
            <>
              Async loadData sırasında custom loading icon istiyorsan{" "}
              <code>switcherLoadingIcon</code> 5.20+'da geldi. 5.7'de default
              spinner gösterilir.
            </>
          }
        />
      </section>
    </main>
  );
}
