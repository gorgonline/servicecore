/**
 * @servicecoreui/ui/i18n — Lokalizasyon SÖZLEŞMESİ (düz key-value, veri YOK).
 *
 * Kütüphane hiçbir çeviri taşımaz. Tip de sabit anahtar listesi dayatmaz —
 * düz `key → string` sözlüğüdür; tüketicinin flat çeviri dosyasıyla birebir.
 * Tüketici objesini `LocalizationProvider`'a verir; bileşenler
 * `const t = useLocalization(); t("auth.trust")` ile okur.
 *
 * Interpolation: değer içinde `{ad}` placeholder → `t(key, { ad: deger })`.
 * Eksik anahtar → `t` anahtarın kendisini döner (sessiz boş yerine).
 *
 * Kullanılan anahtarlar (namespace.anahtar) — yeni feature kendi anahtarını ekler:
 *   dataTable.search · dataTable.columns · dataTable.filtersLabel · dataTable.clearAll
 *   dataTable.filterApply · dataTable.filterClear · dataTable.total ("{count}")
 *   auth.trust
 *
 * NOT: AntD-native string'ler (pagination, "veri yok") buraya GİRMEZ — tüketicinin
 * `ConfigProvider locale={trTR}`'sinden gelir.
 */
export type LocalizationMessages = Record<string, string>;

/** Çeviri fonksiyonu — `useLocalization()` bunu döner. */
export type TranslateFn = (
  key: string,
  vars?: Record<string, string | number>,
) => string;
