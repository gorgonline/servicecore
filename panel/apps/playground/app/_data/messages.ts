import type { LocalizationMessages } from "@servicecoreui/ui/i18n";

/**
 * Playground = TÜKETİCİ. Düz key-value dil nesnesi burada yaşıyor (kütüphanede değil).
 * Gerçek panelde kendi i18n'inizden (react-i18next vb.) üretilir; locale değişince
 * yeni obje verilir. `LocalizationMessages` tipi eksik anahtar bırakmana izin vermez.
 */
export const trMessages: LocalizationMessages = {
  "dataTable.search": "Ara",
  "dataTable.columns": "Sütunlar",
  "dataTable.filtersLabel": "Filtreler:",
  "dataTable.clearAll": "Tümünü temizle",
  "dataTable.filterApply": "Filtrele",
  "dataTable.filterClear": "Temizle",
  "dataTable.total": "Toplam {count} kayıt",
  "auth.trust": "ITIL 4 uyumlu · KVKK · Made in Türkiye",
};
