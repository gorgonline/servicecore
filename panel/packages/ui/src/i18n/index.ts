/**
 * @servicecoreui/ui/i18n — lokalizasyon sözleşmesi + sağlayıcı.
 *
 * Tüketici: düz key-value dil nesnesini `LocalizationMessages` tipine göre kurup
 * `<LocalizationProvider messages={…}>` ile sarar.
 * Bileşenler: `const t = useLocalization(); t("anahtar")` ile okur.
 */
export { LocalizationProvider, useLocalization } from "./context";
export type { LocalizationProviderProps } from "./context";
export type { LocalizationMessages, TranslateFn } from "./messages";
