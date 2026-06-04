"use client";

/* ════════════════════════════════════════════════════════════════════════
 * ServiceCore — App Shell BLUEPRINT (dashboard içeriği)
 *
 * Developer referansı: "Bir panel sayfası NASIL kurulur." Chrome (üst navbar +
 * sidebar + CommandPalette) PanelShell'de; burada yalnız dashboard içeriği var.
 * Kural:
 *   • SADECE @servicecoreui/ui + /wraps bileşenleri kullanılır.
 *   • İkonlar Carbon (@carbon/icons-react).
 *   • Renk/boşluk/radius YALNIZCA var(--sc-*) token'larından.
 *   • Hardcoded hex/px YOK (yalnız frame layout ölçüleri token).
 *   • antd DOĞRUDAN import edilmez.
 *
 * KPI → Statistic+Card · kategori/dağılım/trend/SLA → charts (BarChart/
 * DonutChart/LineChart/SlaGauge) · header aksiyonları → Button/Dropdown · nav → PanelShell.
 * ════════════════════════════════════════════════════════════════════════ */

import {
  Add,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Export,
  OverflowMenuVertical,
  Renew,
  Time,
} from "@carbon/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Text } from "@servicecoreui/ui";
import { PageHeader, RecentPanels, SearchableMenu } from "@servicecoreui/ui/custom";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Modal,
  Statistic,
  Tag,
  message,
} from "@servicecoreui/ui/wraps";
import type { MenuProps } from "@servicecoreui/ui/wraps";
import { BarChart, DonutChart, LineChart, SlaGauge } from "@servicecoreui/ui/charts";
import { PanelShell } from "../_components/PanelShell";
import { RECENT_PANELS } from "../_data/recentPanels";
import styles from "./pano.module.css";

/* ────────────────────────────────────────────────
 * Menüler & mock veri
 * ──────────────────────────────────────────────── */

const widgetMenu: MenuProps = {
  items: [
    { key: "yenile", icon: <Renew />, label: "Yenile" },
    { key: "disa", icon: <Export />, label: "Dışa aktar" },
  ],
};

// Pano seçici — SearchableMenu (üstte arama + filtrelenmiş liste; çoklu → scroll)
const PANO_ITEMS = [
  { key: "ornek", label: "Örnek Pano" },
  { key: "ikd", label: "IKD PANO" },
  { key: "sla", label: "SLA PANO" },
  { key: "ops", label: "Operasyon Panosu" },
  { key: "cmdb", label: "CMDB Panosu" },
  { key: "kb", label: "Bilgi Tabanı Panosu" },
  { key: "degisiklik", label: "Değişiklik Yönetimi" },
  { key: "problem", label: "Problem Analizi" },
  { key: "varlik", label: "Varlık Envanteri" },
  { key: "katalog", label: "Hizmet Kataloğu" },
  { key: "csat", label: "Müşteri Memnuniyeti" },
  { key: "ekip", label: "Ekip Performansı" },
  { key: "trend", label: "Olay Trendleri" },
];

/* ────────────────────────────────────────────────
 * Mock veri
 * ──────────────────────────────────────────────── */

const kpis = [
  { label: "Açık Çağrı", value: 12, suffix: "adet", trend: "+3", tone: "success" as const, dir: "up" as const, sub: "düne göre" },
  { label: "SLA Aşıldı", value: 3, suffix: "adet", trend: "−1", tone: "success" as const, dir: "down" as const, sub: "düne göre (iyi)" },
  { label: "Bekleyen Olay", value: 148, suffix: "adet", trend: null, tone: "neutral" as const, dir: null, sub: "toplam aktif" },
  { label: "Bu Hafta Kapanan", value: 47, suffix: "adet", trend: "%12", tone: "success" as const, dir: "up" as const, sub: "geçen haftaya göre" },
];

// Kategoriye göre olaylar — BarChart (dikey)
const categories = [
  { label: "Donanım", value: 47 },
  { label: "Yazılım", value: 32 },
  { label: "Ağ", value: 18 },
  { label: "Hesap", value: 14 },
  { label: "Diğer", value: 9 },
];

// Duruma göre dağılım — DonutChart (parça/bütün)
const DURUM_DAGILIM = [
  { name: "Açık", value: 42 },
  { name: "İşlemde", value: 28 },
  { name: "Beklemede", value: 13 },
  { name: "Çözüldü", value: 67 },
  { name: "Kapatıldı", value: 35 },
];

// Teknisyene göre çağrılar — yatay BarChart (sıralama; uzun ad x-eksenine sığmaz)
const TEKNISYEN_CAGRI = [
  { ad: "Jack Bauer", adet: 42 },
  { ad: "Ayşe Tan", adet: 31 },
  { ad: "Mehmet Kaya", adet: 27 },
  { ad: "Selin Koç", adet: 19 },
  { ad: "Can Erdem", adet: 11 },
];

// Açılan / çözülen trend — LineChart (area)
const TREND = [
  { ay: "Oca", acilan: 64, cozulen: 58 },
  { ay: "Şub", acilan: 72, cozulen: 61 },
  { ay: "Mar", acilan: 58, cozulen: 66 },
  { ay: "Nis", acilan: 81, cozulen: 70 },
  { ay: "May", acilan: 69, cozulen: 74 },
  { ay: "Haz", acilan: 77, cozulen: 80 },
];

/* ────────────────────────────────────────────────
 * Sayfa
 * ──────────────────────────────────────────────── */

export default function ShellPage() {
  const router = useRouter();
  const [yeniPanoOpen, setYeniPanoOpen] = useState(false);
  const [panoAdi, setPanoAdi] = useState("");
  const [panoError, setPanoError] = useState(false);
  const [messageApi, msgContext] = message.useMessage();

  const closeYeniPano = () => {
    setYeniPanoOpen(false);
    setPanoAdi("");
    setPanoError(false);
  };

  const saveYeniPano = () => {
    if (!panoAdi.trim()) {
      setPanoError(true); // zorunlu alan — inline hata
      return;
    }
    messageApi.success(`"${panoAdi.trim()}" panosu oluşturuldu`);
    closeYeniPano();
  };

  // Widget kartlarının sağ-üst "…" menüsü (Yenile / Dışa aktar) — tüm kartlarda ortak.
  const widgetExtra = (
    <Dropdown menu={widgetMenu} trigger={["click"]} placement="bottomRight">
      <Button
        type="text"
        size="small"
        leadingIcon={<OverflowMenuVertical size={16} />}
        aria-label="Widget menüsü"
      />
    </Dropdown>
  );

  return (
    <PanelShell activeNav="olay">
      {/* ── Page header ── */}
      <PageHeader
        title={
          <span className={styles.panoNav}>
            {/* saat — Son Panolar (ana seçiciden ayrı: silinebilir geçmiş listesi).
                NOT: overlay tetikleyicisi AntD Tooltip ile SARILMAZ — iç içe iki
                overlay (Popover>Tooltip) ref zincirini kırar ("same shadow root"
                uyarısı). Hover ipucu native title ile; a11y aria-label ile. */}
            <RecentPanels panels={RECENT_PANELS}>
              <Button
                type="text"
                leadingIcon={<Time size={18} />}
                aria-label="Son panolar"
                title="Son panolar"
              />
            </RecentPanels>
            <span className={styles.panoLabel}>Pano</span>
            <ChevronRight size={16} className={styles.panoSep} />
            {/* pano seçici — üstte arama + filtrelenmiş liste */}
            <SearchableMenu items={PANO_ITEMS} selectedKey="ornek" placeholder="Pano ara">
              <Button trailingIcon={<ChevronDown size={14} />}>Örnek Pano</Button>
            </SearchableMenu>
          </span>
        }
        extra={
          <>
            {/* Hepsi → tüm kayıtlar sayfası (Modal değil, tam sayfa Table) */}
            <Button type="default" onClick={() => router.push("/kayitlar")}>
              Hepsi
            </Button>
            <Button type="primary" leadingIcon={<Add />} onClick={() => setYeniPanoOpen(true)}>
              Yeni Pano
            </Button>
          </>
        }
      />

      {/* ── Content body ── */}
      <div className={styles.contentBody}>
        {/* KPI strip */}
        <div className={styles.kpiStrip}>
          {kpis.map((k) => (
            <Card key={k.label}>
              <Statistic title={k.label} value={k.value} suffix={k.suffix} />
              <div className={styles.kpiTrendRow}>
                {k.trend ? (
                  <Tag
                    tone={k.tone}
                    size="small"
                    leadingIcon={k.dir === "up" ? <ArrowUp /> : <ArrowDown />}
                  >
                    {k.trend}
                  </Tag>
                ) : null}
                <Text size="xs" color="tertiary">
                  {k.sub}
                </Text>
              </div>
            </Card>
          ))}
        </div>

        {/* Widget grid — gerçek chart bileşenleri (doğru veri → doğru chart) */}
        <div className={styles.widgetGrid}>
          <Card title="Kategoriye göre olaylar" extra={widgetExtra}>
            <BarChart
              data={categories}
              categoryKey="label"
              series={[{ key: "value", label: "Olay" }]}
              height={260}
            />
          </Card>

          <Card title="Duruma göre dağılım" extra={widgetExtra}>
            <DonutChart data={DURUM_DAGILIM} centerLabel="Toplam" height={260} />
          </Card>

          {/* yatay bar — uzun teknisyen adları + sıralama (çarpık dikey bar yerine) */}
          <Card title="Teknisyene göre çağrılar" extra={widgetExtra}>
            <BarChart
              data={TEKNISYEN_CAGRI}
              categoryKey="ad"
              series={[{ key: "adet", label: "Çağrı" }]}
              horizontal
              height={260}
            />
          </Card>

          <Card title="SLA uyumu (bu ay)" extra={widgetExtra}>
            <SlaGauge value={94} label="SLA uyumu" size={180} />
          </Card>

          {/* Trend — 2 kolon kaplar (3'lü grid'de 2. satırı tamamlar) */}
          <Card
            title="Açılan / çözülen kayıt (aylık)"
            extra={widgetExtra}
            className={styles.widgetWide}
          >
            <LineChart
              data={TREND}
              categoryKey="ay"
              series={[
                { key: "acilan", label: "Açılan" },
                { key: "cozulen", label: "Çözülen" },
              ]}
              variant="area"
              height={260}
            />
          </Card>
        </div>
      </div>

      {/* Yeni Pano — kısa tek-alanlı oluşturma formu (Modal'ın doğru kullanımı) */}
      {msgContext}
      <Modal
        title="Yeni Pano"
        open={yeniPanoOpen}
        onCancel={closeYeniPano}
        footer={
          <div className={styles.modalFooter}>
            <Button onClick={closeYeniPano}>Vazgeç</Button>
            <Button type="primary" onClick={saveYeniPano}>
              Kaydet
            </Button>
          </div>
        }
      >
        <div className={styles.yeniPanoBody}>
          <Text size="sm" weight="medium">
            Adı
          </Text>
          <Input
            autoFocus
            placeholder="Adı"
            value={panoAdi}
            status={panoError ? "error" : undefined}
            onChange={(e) => {
              setPanoAdi(e.target.value);
              if (panoError) setPanoError(false);
            }}
            onPressEnter={saveYeniPano}
          />
          {panoError ? (
            <Text size="xs" color="danger">
              Bu alan zorunlu.
            </Text>
          ) : null}
        </div>
      </Modal>
    </PanelShell>
  );
}
