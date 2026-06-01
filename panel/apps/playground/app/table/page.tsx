"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Edit, TrashCan, Send } from "@carbon/icons-react";
import { Code, Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Alert, Button, Table } from "@servicecoreui/ui/wraps";
import styles from "./table.module.css";

/* ────────────────────────────────────────────────
 * Mock data — 25 bilet
 * ──────────────────────────────────────────────── */

type Ticket = {
  id: string;
  title: string;
  priority: "p1" | "p2" | "p3" | "p4";
  status: "open" | "in_progress" | "resolved";
  category: "network" | "hardware" | "software" | "access";
  assignee: string;
  opened: string;
  description: string;
};

const ASSIGNEES = ["Mehmet K.", "Ayşe T.", "Burak D.", "Selin Y.", "Emre K."];

const TICKETS: Ticket[] = Array.from({ length: 25 }, (_, i) => {
  const num = 4100 + i;
  const priorities: Ticket["priority"][] = ["p1", "p2", "p3", "p4"];
  const statuses: Ticket["status"][] = ["open", "in_progress", "resolved"];
  const categories: Ticket["category"][] = ["network", "hardware", "software", "access"];
  const titles = [
    "Print server bağlanamıyor",
    "VPN bağlantısı yavaş",
    "Outlook senkronizasyon hatası",
    "Yeni kullanıcı AD hesabı",
    "Switch port arızası",
    "DNS çözümleme sorunu",
    "Bilgisayar açılmıyor",
    "Office aktivasyon hatası",
    "Yazıcı toner uyarısı",
    "Şifre sıfırlama talebi",
  ];
  return {
    id: `SC-${num}`,
    title: `${titles[i % titles.length]} #${i + 1}`,
    priority: priorities[i % 4]!,
    status: statuses[i % 3]!,
    category: categories[i % 4]!,
    assignee: ASSIGNEES[i % ASSIGNEES.length]!,
    opened: `2026-05-${(i % 28) + 1}`,
    description: `Detaylı açıklama satırı. Bilet ${num} kullanıcı tarafından oluşturuldu.`,
  };
});

const PRIORITY_LABEL: Record<Ticket["priority"], string> = {
  p1: "P1 — Kritik",
  p2: "P2 — Yüksek",
  p3: "P3 — Orta",
  p4: "P4 — Düşük",
};

const STATUS_LABEL: Record<Ticket["status"], string> = {
  open: "Açık",
  in_progress: "İşleniyor",
  resolved: "Çözüldü",
};

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

function PriorityPill({ p }: { p: Ticket["priority"] }) {
  const cls =
    p === "p1" ? styles.priorityP1 :
    p === "p2" ? styles.priorityP2 :
    p === "p3" ? styles.priorityP3 : styles.priorityP4;
  return <span className={`${styles.priorityPill} ${cls}`}>{PRIORITY_LABEL[p]}</span>;
}

function StatusPill({ s }: { s: Ticket["status"] }) {
  const cls =
    s === "open" ? styles.statusOpen :
    s === "in_progress" ? styles.statusInProgress : styles.statusResolved;
  return <span className={`${styles.statusPill} ${cls}`}>{STATUS_LABEL[s]}</span>;
}

/* ────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────── */

export default function TablePage() {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const baseColumns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id", width: 100, render: (v: string) => <span className={styles.mono}>{v}</span> },
      { title: "Bilet", dataIndex: "title", key: "title", ellipsis: true },
      {
        title: "Öncelik",
        dataIndex: "priority",
        key: "priority",
        width: 140,
        render: (v: Ticket["priority"]) => <PriorityPill p={v} />,
      },
      {
        title: "Durum",
        dataIndex: "status",
        key: "status",
        width: 130,
        render: (v: Ticket["status"]) => <StatusPill s={v} />,
      },
      { title: "Atanan", dataIndex: "assignee", key: "assignee", width: 140 },
      { title: "Açıldı", dataIndex: "opened", key: "opened", width: 120 },
    ],
    [],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">Bileşen Rehberi</Eyebrow>
        <Display size="md">Table</Display>
        <Text size="lg" color="secondary">
          ITSM panelinin omurgası. Bilet listesi, asset envanteri, kullanıcı,
          audit log, change request. Sortable/filterable kolonlar, pagination,
          row selection (bulk action), expandable rows, fixed kolonlar.
        </Text>
      </header>

      {/* ── TOC ── */}
      <nav className={styles.toc}>
        <a href="#api-notu">API Notu</a>
        <a href="#temel">Temel</a>
        <a href="#sort">Sort</a>
        <a href="#filter">Filter</a>
        <a href="#pagination">Pagination</a>
        <a href="#selection">Selection</a>
        <a href="#expandable">Expandable</a>
        <a href="#fixed">Fixed/Scroll</a>
        <a href="#sticky">Sticky</a>
        <a href="#loading">Loading</a>
        <a href="#mock">Bilet Listesi</a>
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
              <strong>Core:</strong> <code>columns</code>, <code>dataSource</code>,{" "}
              <code>rowKey</code>, <code>bordered</code>, <code>size</code>,{" "}
              <code>loading</code>, <code>pagination</code>,{" "}
              <code>rowSelection</code>, <code>expandable</code>,{" "}
              <code>scroll {`{x, y}`}</code>, <code>sticky</code> (4.6+),{" "}
              <code>showHeader</code>, <code>title</code>, <code>footer</code>,{" "}
              <code>onRow</code>, <code>locale</code>,{" "}
              <code>tableLayout</code>, <code>onChange</code>.
              <br />
              <strong>Column:</strong> <code>title</code>, <code>dataIndex</code>,{" "}
              <code>key</code>, <code>render</code>, <code>width</code>,{" "}
              <code>fixed</code>, <code>align</code>, <code>sorter</code>,{" "}
              <code>sortIcon</code> (5.6+), <code>filters</code>,{" "}
              <code>onFilter</code>, <code>filterMode</code> (4.17+),{" "}
              <code>filterSearch</code> (4.17+), <code>ellipsis</code>,{" "}
              <code>children</code> (nested column).
            </>
          }
        />
        <Alert
          type="warning"
          showIcon
          message="5.7'de YOK — kullanma"
          description={
            <>
              <code>virtual</code> (5.9+) — virtual scroll için kendi react-window
              integration gerek,{" "}
              <code>nativeElement</code>/<code>scrollTo</code> ref (5.11+),{" "}
              <code>hidden</code> column (5.13+) — manuel{" "}
              <code>columns.filter()</code> ile,{" "}
              <code>showSorterTooltip</code> (5.16+),{" "}
              <code>rowHoverable</code> (5.16+) — CSS module'la hover disable,{" "}
              <code>minWidth</code> column (5.21+).
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="onChange — pagination/filter/sorter unified"
          description={
            <>
              <code>{`(pagination, filters, sorter, extra) => void`}</code> —
              tüm değişiklikler tek callback. Backend'e gönderirken{" "}
              <code>sorter.field</code> + <code>sorter.order</code> al,{" "}
              <code>filters[field]</code>'tan filter array'i.
            </>
          }
        />
        <Alert
          type="info"
          showIcon
          message="rowKey zorunlu — performance"
          description={
            <>
              <code>rowKey="id"</code> veya <code>{`rowKey={r => r.id}`}</code>{" "}
              ile her satır için stable key. Yoksa AntD index kullanır → satır
              ekleme/silme'de re-render karışır.
            </>
          }
        />
      </section>

      {/* ── TEMEL ── */}
      <section id="temel" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>basic</span>
          <Heading level={2}>Temel — columns + dataSource</Heading>
        </div>
        <MockBlock caption="Bordered + middle size">
          <Table
            columns={baseColumns}
            dataSource={TICKETS.slice(0, 5)}
            rowKey="id"
            pagination={false}
            bordered
            size="middle"
          />
        </MockBlock>
        <CodeBlock>{`<Table
  columns={[
    { title: "ID", dataIndex: "id", width: 100 },
    { title: "Bilet", dataIndex: "title", ellipsis: true },
    { title: "Atanan", dataIndex: "assignee", width: 140 },
  ]}
  dataSource={tickets}
  rowKey="id"
  pagination={false}
/>`}</CodeBlock>
      </section>

      {/* ── SORT ── */}
      <section id="sort" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>sorter</span>
          <Heading level={2}>Sort — sortable kolonlar</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>sorter</code> client-side compare function veya{" "}
          <code>true</code> (server-side — onChange'i dinle).
        </Text>
        <MockBlock caption="Atanan/Açıldı kolonları sortable">
          <Table
            columns={[
              { title: "ID", dataIndex: "id", width: 100, render: (v: string) => <span className={styles.mono}>{v}</span> },
              { title: "Bilet", dataIndex: "title", ellipsis: true },
              { title: "Atanan", dataIndex: "assignee", width: 140, sorter: (a: Ticket, b: Ticket) => a.assignee.localeCompare(b.assignee) },
              { title: "Açıldı", dataIndex: "opened", width: 120, sorter: (a: Ticket, b: Ticket) => a.opened.localeCompare(b.opened), defaultSortOrder: "descend" as const },
            ]}
            dataSource={TICKETS.slice(0, 8)}
            rowKey="id"
            pagination={false}
          />
        </MockBlock>
      </section>

      {/* ── FILTER ── */}
      <section id="filter" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>filters · onFilter</span>
          <Heading level={2}>Filter — menu dropdown</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>filters</code> menü seçenekleri, <code>onFilter</code> predicate.{" "}
          <code>filterSearch</code> (4.17+) ile arama; <code>filterMode="tree"</code>{" "}
          ile tree görünüm.
        </Text>
        <MockBlock caption="Öncelik + Durum filter (header'da huni ikonu)">
          <Table
            columns={[
              { title: "ID", dataIndex: "id", width: 100, render: (v: string) => <span className={styles.mono}>{v}</span> },
              { title: "Bilet", dataIndex: "title", ellipsis: true },
              {
                title: "Öncelik",
                dataIndex: "priority",
                width: 140,
                filters: [
                  { text: "P1 — Kritik", value: "p1" },
                  { text: "P2 — Yüksek", value: "p2" },
                  { text: "P3 — Orta", value: "p3" },
                  { text: "P4 — Düşük", value: "p4" },
                ],
                onFilter: (value: React.Key | boolean, record: Ticket) =>
                  record.priority === value,
                render: (v: Ticket["priority"]) => <PriorityPill p={v} />,
              },
              {
                title: "Durum",
                dataIndex: "status",
                width: 130,
                filters: [
                  { text: "Açık", value: "open" },
                  { text: "İşleniyor", value: "in_progress" },
                  { text: "Çözüldü", value: "resolved" },
                ],
                onFilter: (value: React.Key | boolean, record: Ticket) =>
                  record.status === value,
                render: (v: Ticket["status"]) => <StatusPill s={v} />,
              },
            ]}
            dataSource={TICKETS.slice(0, 10)}
            rowKey="id"
            pagination={false}
          />
        </MockBlock>
      </section>

      {/* ── PAGINATION ── */}
      <section id="pagination" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>pagination</span>
          <Heading level={2}>Pagination — sayfalama</Heading>
        </div>
        <MockBlock caption="pageSize=5, showSizeChanger">
          <Table
            columns={baseColumns}
            dataSource={TICKETS}
            rowKey="id"
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total: number) => `Toplam ${total} bilet`,
            }}
          />
        </MockBlock>
        <CodeBlock>{`<Table
  pagination={{
    pageSize: 20,
    showSizeChanger: true,
    showTotal: total => \`Toplam \${total}\`,
    position: ["bottomRight"],
  }}
/>

// Disable:
<Table pagination={false} />`}</CodeBlock>
      </section>

      {/* ── SELECTION ── */}
      <section id="selection" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>rowSelection</span>
          <Heading level={2}>Selection — bulk action</Heading>
        </div>
        <Text size="md" color="secondary">
          Header'da master checkbox (indeterminate), satırlarda satır
          checkbox. Selection olduğunda <strong>bulk action bar</strong>{" "}
          göster.
        </Text>
        <MockBlock caption="Bulk select + action bar">
          <div>
            {selectedKeys.length > 0 && (
              <div className={styles.bulkBar}>
                <span className={styles.bulkBarCount}>{selectedKeys.length} seçildi</span>
                <span className={styles.bulkBarSpacer} />
                <Button size="small" type="default" leadingIcon={<Edit />}>Toplu ata</Button>
                <Button size="small" type="default" leadingIcon={<Send />}>Yanıt gönder</Button>
                <Button size="small" type="primary" danger leadingIcon={<TrashCan />}>Sil</Button>
              </div>
            )}
            <Table
              columns={baseColumns}
              dataSource={TICKETS.slice(0, 8)}
              rowKey="id"
              pagination={false}
              rowSelection={{
                selectedRowKeys: selectedKeys,
                onChange: setSelectedKeys,
              }}
            />
          </div>
        </MockBlock>
        <CodeBlock>{`const [selected, setSelected] = useState<React.Key[]>([]);

<Table
  rowSelection={{
    selectedRowKeys: selected,
    onChange: setSelected,
    getCheckboxProps: r => ({ disabled: r.status === "resolved" }),
  }}
  ...
/>`}</CodeBlock>
      </section>

      {/* ── EXPANDABLE ── */}
      <section id="expandable" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>expandable</span>
          <Heading level={2}>Expandable rows — detay/timeline</Heading>
        </div>
        <Text size="md" color="secondary">
          Satıra tıklayınca alt panel açılır — bilet detayı, comments,
          activity timeline için.
        </Text>
        <MockBlock caption="Satırı genişlet — detay göster">
          <Table
            columns={baseColumns}
            dataSource={TICKETS.slice(0, 5)}
            rowKey="id"
            pagination={false}
            expandable={{
              expandedRowRender: (record: Ticket) => (
                <div style={{ padding: "var(--sc-space-2) 0" }}>
                  <Text size="sm" color="secondary">
                    <strong>Açıklama:</strong> {record.description}
                  </Text>
                  <br />
                  <Text size="xs" color="tertiary">
                    Kategori: {record.category} · ID: {record.id}
                  </Text>
                </div>
              ),
              rowExpandable: (r: Ticket) => r.status !== "resolved",
            }}
          />
        </MockBlock>
      </section>

      {/* ── FIXED + SCROLL ── */}
      <section id="fixed" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>fixed · scroll</span>
          <Heading level={2}>Fixed kolonlar + horizontal scroll</Heading>
        </div>
        <Text size="md" color="secondary">
          Çok kolonlu tablolarda ID/Bilet adı sol fixed, eylemler sağ fixed,
          ortası scroll.
        </Text>
        <MockBlock caption='scroll={{ x: 1200 }} + sol+sağ fixed'>
          <Table
            columns={[
              { title: "ID", dataIndex: "id", key: "id", width: 100, fixed: "left" as const, render: (v: string) => <span className={styles.mono}>{v}</span> },
              { title: "Bilet", dataIndex: "title", key: "title", width: 220, fixed: "left" as const },
              { title: "Öncelik", dataIndex: "priority", key: "priority", width: 140, render: (v: Ticket["priority"]) => <PriorityPill p={v} /> },
              { title: "Durum", dataIndex: "status", key: "status", width: 130, render: (v: Ticket["status"]) => <StatusPill s={v} /> },
              { title: "Kategori", dataIndex: "category", key: "category", width: 120 },
              { title: "Atanan", dataIndex: "assignee", key: "assignee", width: 140 },
              { title: "Açıldı", dataIndex: "opened", key: "opened", width: 120 },
              { title: "ID(dup)", dataIndex: "id", key: "id2", width: 100, render: (v: string) => <span className={styles.mono}>{v}</span> },
              {
                title: "Eylem",
                key: "action",
                width: 140,
                fixed: "right" as const,
                render: () => (
                  <>
                    <Button type="text" size="small" leadingIcon={<Edit />} aria-label="Düzenle" />
                    <Button type="text" size="small" danger leadingIcon={<TrashCan />} aria-label="Sil" />
                  </>
                ),
              },
            ]}
            dataSource={TICKETS.slice(0, 6)}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1300 }}
          />
        </MockBlock>
      </section>

      {/* ── STICKY ── */}
      <section id="sticky" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>sticky</span>
          <Heading level={2}>Sticky header — uzun listede</Heading>
        </div>
        <Text size="md" color="secondary">
          <code>sticky</code> ile header scroll'da üstte kalır.
        </Text>
        <MockBlock caption="sticky + scroll y=300">
          <Table
            columns={baseColumns}
            dataSource={TICKETS.slice(0, 15)}
            rowKey="id"
            pagination={false}
            scroll={{ y: 300 }}
            sticky
          />
        </MockBlock>
      </section>

      {/* ── LOADING ── */}
      <section id="loading" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>loading</span>
          <Heading level={2}>Loading — Spin overlay</Heading>
        </div>
        <MockBlock caption="loading=true">
          <Table
            columns={baseColumns}
            dataSource={TICKETS.slice(0, 4)}
            rowKey="id"
            pagination={false}
            loading
          />
        </MockBlock>
      </section>

      {/* ── MOCK ── */}
      <section id="mock" className={styles.section}>
        <div className={styles.typeHeader}>
          <span className={styles.typeBadge}>real-world</span>
          <Heading level={2}>Bilet Listesi — full ITSM</Heading>
        </div>
        <DoDontGrid
          doItems={[
            "Production: server-side pagination + sort + filter (onChange backend'e gider)",
            "rowKey her zaman ver (id veya unique)",
            "Action kolonu sağ fixed, dar (140-180px)",
            "Bulk action: rowSelection + sticky bar",
          ]}
          dontItems={[
            "1000+ row client-side render (5.9+ virtual yok 5.7'de → server pagination şart)",
            "rowKey vermemek (warning + re-render bug)",
            "Tüm kolonları ellipsis yapmak (tooltip patlamasından kaçınılmaz)",
            "Action button sayı 3'ten fazla → Dropdown menu",
          ]}
        />
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
          message="Hata 1 — rowKey yok"
          description={
            <>
              AntD index kullanır → satır ekle/sil sonrası re-render karışır,
              expand state kaybolur. <strong>Çözüm:</strong>{" "}
              <code>rowKey="id"</code> her zaman.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 2 — 1000+ row client-side render"
          description={
            <>
              5.7'de virtual scroll YOK (5.9+). 1000 row client-side render →
              perf ölümü. <strong>Çözüm:</strong> server-side pagination, onChange'e
              backend query.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 3 — virtual prop'u beklemek (5.9+, yok)"
          description={
            <>
              <code>{`virtual={true}`}</code> 5.9+'da geldi. 5.7'de etkisiz.
              Çok sayıda row için react-window/react-virtualized custom entegre
              et veya pagination kullan.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 4 — Action button 3'ten fazla"
          description={
            <>
              Her satırda 5 action butonu → tablo gürültü olur.{" "}
              <strong>Çözüm:</strong> 1-2 primary action + Dropdown ile diğerleri.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 5 — Tüm kolonlar ellipsis"
          description={
            <>
              Her hücre tooltip ile patlar. <strong>Çözüm:</strong> Sadece
              uzun text kolonlarına (title, description) <code>ellipsis</code>{" "}
              + tooltip; kısa kolonlara genişlik ver.
            </>
          }
        />

        <Alert
          type="error"
          showIcon
          message="Hata 6 — Selection olduğunda bulk bar yok"
          description={
            <>
              "3 seçildi" ama eylem yok → kullanıcı stuck. Her zaman selection
              ile birlikte bulk action bar (Toplu ata, Sil, Durum değiştir).
            </>
          }
        />
      </section>

      <Link href="/" className={styles.backLink}>
        ← Ana sayfa
      </Link>
    </main>
  );
}
