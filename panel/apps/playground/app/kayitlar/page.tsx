"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui";
import { DataTable } from "@servicecoreui/ui/custom";
import type { DataTableColumn } from "@servicecoreui/ui/custom";
import { Avatar, Button, Tag } from "@servicecoreui/ui/wraps";
import type { TagProps } from "@servicecoreui/ui/wraps";
import { PanelShell } from "../_components/PanelShell";
import styles from "./kayitlar.module.css";

interface Kayit {
  key: string;
  id: string;
  konu: string;
  aciklama: string;
  oncelik: string;
  oncelikTone: NonNullable<TagProps["tone"]>;
  durum: string;
  durumTone: NonNullable<TagProps["tone"]>;
  destekGrubu: string | null;
  teknisyen: string | null;
  kullanici: string | null;
  asama: string;
}

/* Mock kayıtlar — olay/çağrı/problem/istek/değişiklik karışık (gerçekçi). */
const KAYITLAR: Kayit[] = [
  { key: "1", id: "INC-211", konu: "Hesap şifre hatası — DMZ ortamı", aciklama: "DMZ ortamında kullanıcı şifre sıfırlama başarısız oluyor", oncelik: "Yüksek", oncelikTone: "warning", durum: "Açık", durumTone: "info", destekGrubu: "Güvenlik Destek", teknisyen: "En Üst Yönetici", kullanici: "Semih Yılmaz", asama: "Triyaj" },
  { key: "2", id: "INC-210", konu: "VPN bağlantısı çok yavaş — ev ofisi", aciklama: "Ev ofisinden VPN throughput çok düşük", oncelik: "Çok Yüksek", oncelikTone: "danger", durum: "İşlemde", durumTone: "accent", destekGrubu: "Ağ Destek", teknisyen: "Mehmet Kaya", kullanici: "Mehmet Kaya", asama: "Çözüm" },
  { key: "3", id: "INC-209", konu: "Outlook senkronizasyon hatası", aciklama: "Outlook takvim ve mail senkronizasyonu durdu", oncelik: "Orta", oncelikTone: "info", durum: "Çözüldü", durumTone: "success", destekGrubu: "Sistem Destek", teknisyen: "Ayşe Tan", kullanici: "Ayşe Tan", asama: "Kapanış" },
  { key: "4", id: "INC-208", konu: "Yazıcı toner bitti — Muhasebe katı", aciklama: "Muhasebe katı yazıcısı toner uyarısı veriyor", oncelik: "Düşük", oncelikTone: "neutral", durum: "SLA Aşıldı", durumTone: "danger", destekGrubu: "Donanım Destek", teknisyen: "Can Erdem", kullanici: "Can Erdem", asama: "Triyaj" },
  { key: "5", id: "CHN-57", konu: "Varsayılan dil ayarı değişikliği", aciklama: "Her tenant için varsayılan dil TR yapılacak", oncelik: "Öncelik Yok", oncelikTone: "neutral", durum: "Açık", durumTone: "info", destekGrubu: "Donanım Destek", teknisyen: "En Üst Yönetici", kullanici: "Jack Bauer", asama: "Açık" },
  { key: "6", id: "CHN-56", konu: "DMZ sunucu sertifikası yenileme", aciklama: "DMZ sunucu SSL sertifikası yenilenecek", oncelik: "Orta", oncelikTone: "info", durum: "Gözden Geçiriliyor", durumTone: "warning", destekGrubu: "Güvenlik Destek", teknisyen: "Güvenlik Ekibi", kullanici: "En Üst Yönetici", asama: "Onay" },
  { key: "7", id: "PRB-24", konu: "Tekrarlayan hesap kilitlenmeleri", aciklama: "Birden fazla kullanıcıda hesap kilitlenmesi", oncelik: "Yüksek", oncelikTone: "warning", durum: "Açık", durumTone: "info", destekGrubu: null, teknisyen: null, kullanici: "En Üst Yönetici", asama: "Açık" },
  { key: "8", id: "PRB-23", konu: "Antivirus uygulaması çöküyor", aciklama: "Antivirus uygulaması başlangıçta çöküyor", oncelik: "Çok Yüksek", oncelikTone: "danger", durum: "İşlemde", durumTone: "accent", destekGrubu: "Sistem Destek", teknisyen: "Jack Bauer", kullanici: "Semih Yılmaz", asama: "Çözüm" },
  { key: "9", id: "SR-1162", konu: "Kulaklık isteği", aciklama: "Sunucu kurulumu — kulaklık talebi", oncelik: "Öncelik Yok", oncelikTone: "neutral", durum: "Açık", durumTone: "info", destekGrubu: null, teknisyen: null, kullanici: "Demo Admin", asama: "Açık" },
  { key: "10", id: "SR-1161", konu: "Dizüstü bilgisayar isteği", aciklama: "Sunucu kurulumu — dizüstü talebi", oncelik: "Düşük", oncelikTone: "neutral", durum: "Açık", durumTone: "info", destekGrubu: null, teknisyen: "Demo Admin", kullanici: "Demo Admin", asama: "Açık" },
  { key: "11", id: "SR-1160", konu: "Masaüstü PC kurulum isteği", aciklama: "Sunucu kurulumu — masaüstü PC talebi", oncelik: "Düşük", oncelikTone: "neutral", durum: "Beklemede", durumTone: "warning", destekGrubu: null, teknisyen: "Demo Admin", kullanici: "Demo Admin", asama: "Onay" },
  { key: "12", id: "SR-1159", konu: "Yeni sunucu kurulum isteği", aciklama: "Yeni sunucu kurulum isteği oluşturuldu", oncelik: "Orta", oncelikTone: "info", durum: "İşlemde", durumTone: "accent", destekGrubu: "Sistem Destek", teknisyen: "Selin Koç", kullanici: "Selin Koç", asama: "Çözüm" },
  { key: "13", id: "CI-101", konu: "Donanım envanteri güncelleme", aciklama: "Donanım envanteri toplu güncelleme", oncelik: "Öncelik Yok", oncelikTone: "neutral", durum: "Çözüldü", durumTone: "success", destekGrubu: "Donanım Destek", teknisyen: "En Üst Yönetici", kullanici: "Jack Bauer", asama: "Kapanış" },
];

const ONCELIK_OPTS = ["Çok Yüksek", "Yüksek", "Orta", "Düşük", "Öncelik Yok"].map((v) => ({ label: v, value: v }));
const DURUM_OPTS = ["Açık", "İşlemde", "Gözden Geçiriliyor", "Beklemede", "Çözüldü", "SLA Aşıldı"].map((v) => ({ label: v, value: v }));
const DESTEK_OPTS = ["Donanım Destek", "Güvenlik Destek", "Sistem Destek", "Ağ Destek"].map((v) => ({ label: v, value: v }));
const ASAMA_OPTS = ["Açık", "Triyaj", "Onay", "Çözüm", "Kapanış"].map((v) => ({ label: v, value: v }));

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Kayıt tarayıcısı kolonları — DataTable sort + filtre + Sütunlar'ı bunlardan üretir.
const COLUMNS: DataTableColumn<Kayit>[] = [
  {
    key: "id",
    title: "Id",
    dataIndex: "id",
    width: 130,
    sortable: true,
    filter: { type: "text" },
    render: (r) => (
      <Text size="sm" weight="medium" color="accent" style={{ fontFamily: "var(--sc-font-mono)" }}>
        {r.id}
      </Text>
    ),
  },
  {
    key: "konu",
    title: "Konu",
    dataIndex: "konu",
    ellipsis: true,
    sortable: true,
    filter: { type: "text" },
    render: (r) => <Text size="sm">{r.konu}</Text>,
  },
  {
    key: "aciklama",
    title: "Açıklama",
    dataIndex: "aciklama",
    width: 240,
    ellipsis: true,
    defaultHidden: true,
    sortable: true,
    filter: { type: "text" },
    render: (r) => (
      <Text size="sm" color="secondary">
        {r.aciklama}
      </Text>
    ),
  },
  {
    key: "oncelik",
    title: "Öncelik",
    dataIndex: "oncelik",
    width: 160,
    sortable: true,
    filter: { type: "enum", options: ONCELIK_OPTS },
    render: (r) => (
      <Tag tone={r.oncelikTone} dot size="small">
        {r.oncelik}
      </Tag>
    ),
  },
  {
    key: "durum",
    title: "Durum",
    dataIndex: "durum",
    width: 180,
    sortable: true,
    filter: { type: "enum", options: DURUM_OPTS },
    render: (r) => (
      <Tag tone={r.durumTone} dot size="small">
        {r.durum}
      </Tag>
    ),
  },
  {
    key: "destekGrubu",
    title: "Destek Grubu",
    dataIndex: "destekGrubu",
    width: 180,
    defaultHidden: true,
    sortable: true,
    filter: { type: "enum", options: DESTEK_OPTS },
    render: (r) =>
      r.destekGrubu ? <Text size="sm">{r.destekGrubu}</Text> : <Text size="sm" color="tertiary">—</Text>,
  },
  {
    key: "teknisyen",
    title: "Teknisyen",
    dataIndex: "teknisyen",
    width: 220,
    sortable: true,
    filter: { type: "text" },
    render: (r) =>
      r.teknisyen ? (
        <span className={styles.assignee}>
          <Avatar size="small" tone="neutral">
            {initials(r.teknisyen)}
          </Avatar>
          <Text size="sm">{r.teknisyen}</Text>
        </span>
      ) : (
        <Text size="sm" color="tertiary">
          —
        </Text>
      ),
  },
  {
    key: "kullanici",
    title: "Kullanıcı",
    dataIndex: "kullanici",
    width: 180,
    defaultHidden: true,
    sortable: true,
    filter: { type: "text" },
    render: (r) =>
      r.kullanici ? <Text size="sm">{r.kullanici}</Text> : <Text size="sm" color="tertiary">—</Text>,
  },
  {
    key: "asama",
    title: "Aşama",
    dataIndex: "asama",
    width: 150,
    sortable: true,
    filter: { type: "enum", options: ASAMA_OPTS },
    render: (r) => <Text size="sm">{r.asama}</Text>,
  },
];

export default function KayitlarPage() {
  const router = useRouter();

  return (
    <PanelShell>
      <div className={styles.body}>
        {/* Geri — buraya tek giriş "Hepsi"; geldiği yere döner */}
        <div>
          <Button type="text" size="small" leadingIcon={<ArrowLeft size={16} />} onClick={() => router.back()}>
            Geri
          </Button>
        </div>

        <div className={styles.head}>
          <Heading level={2}>Kayıtlar</Heading>
          <Text color="secondary">
            Tüm kayıtlar — olay, çağrı, problem, istek ve değişiklikler
          </Text>
        </div>

        <DataTable<Kayit> rowKey="key" data={KAYITLAR} columns={COLUMNS} />
      </div>
    </PanelShell>
  );
}
