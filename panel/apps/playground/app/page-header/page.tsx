"use client";

import { Add, ChevronDown, ChevronRight, Time } from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow, Code } from "@servicecoreui/ui/typography";
import { PageHeader } from "@servicecoreui/ui/custom";
import { Breadcrumb, Button, Dropdown } from "@servicecoreui/ui/wraps";
import type { MenuProps } from "antd";
import styles from "./page-header.module.css";

const panoMenu: MenuProps = {
  selectable: true,
  selectedKeys: ["ornek"],
  items: [
    { key: "ornek", label: "Örnek Pano" },
    { key: "ikd", label: "IKD PANO" },
    { key: "sla", label: "SLA PANO" },
    { key: "ops", label: "Operasyon PANO" },
  ],
};

export default function PageHeaderPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Eyebrow tone="accent">ServiceCore Özel</Eyebrow>
        <Display size="md">PageHeader</Display>
        <Text size="lg" color="secondary">
          Her iç sayfanın ortak üst çubuğu: solda <code>title</code> (başlık ya da
          bir seçici kümesi), sağda <code>extra</code> (aksiyon butonları), üstte
          opsiyonel <code>breadcrumb</code>. Sadece düzen — içeriği consumer verir,
          AntD bağımlılığı yoktur.
        </Text>
      </header>

      <section className={styles.section}>
        <Heading level={2}>Pano seçici (shell kullanımı)</Heading>
        <div className={styles.demo}>
          <PageHeader
            title={
              <span className={styles.panoNav}>
                <Dropdown menu={panoMenu} trigger={["click"]}>
                  <Button
                    type="text"
                    leadingIcon={<Time size={18} />}
                    trailingIcon={<ChevronDown size={12} />}
                    aria-label="Panolar"
                  />
                </Dropdown>
                <span className={styles.panoLabel}>Pano</span>
                <ChevronRight size={16} className={styles.panoSep} />
                <Dropdown menu={panoMenu} trigger={["click"]}>
                  <Button trailingIcon={<ChevronDown size={14} />}>Örnek Pano</Button>
                </Dropdown>
              </span>
            }
            extra={
              <>
                <Button type="default" leadingIcon={<Add />}>
                  Yeni Pano
                </Button>
                <Button type="default">Hepsi</Button>
              </>
            }
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Breadcrumb + başlık</Heading>
        <div className={styles.demo}>
          <PageHeader
            breadcrumb={
              <Breadcrumb
                items={[{ title: "Ana sayfa" }, { title: "Olaylar" }, { title: "SC-4127" }]}
              />
            }
            title={<Heading level={2}>SC-4127</Heading>}
            extra={
              <>
                <Button type="default">Düzenle</Button>
                <Button type="primary">Çözüldü</Button>
              </>
            }
          />
        </div>
      </section>

      <section className={styles.section}>
        <Heading level={2}>API</Heading>
        <table className={styles.props}>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tip</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>breadcrumb</code></td>
              <td><code>ReactNode?</code></td>
              <td>Üstte ince breadcrumb satırı.</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode?</code></td>
              <td>Sol ana içerik — başlık ya da seçici kümesi.</td>
            </tr>
            <tr>
              <td><code>extra</code></td>
              <td><code>ReactNode?</code></td>
              <td>Sağda hizalı aksiyonlar (butonlar).</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode?</code></td>
              <td>Header'ın altında ek içerik (filtre çubuğu vb.).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <Heading level={2}>Kullanım</Heading>
        <Code block>{`<PageHeader
  breadcrumb={<Breadcrumb items={[...]} />}
  title={<Heading level={2}>SC-4127</Heading>}
  extra={
    <>
      <Button type="default">Düzenle</Button>
      <Button type="primary">Çözüldü</Button>
    </>
  }
/>`}</Code>
      </section>
    </main>
  );
}
