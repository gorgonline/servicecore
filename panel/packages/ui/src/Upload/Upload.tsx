import { Upload as AntUpload } from "antd";
import { View, TrashCan, Download } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Upload.module.css";
import type { UploadProps, UploadDraggerProps } from "./Upload.types";

/* ── Carbon ikon enjeksiyonu (file list action ikonları) ──────────────────────
 * AntD Upload, liste öğesi action'larında @ant-design/icons glyph'i basar:
 * EyeOutlined (preview), DeleteOutlined (remove), DownloadOutlined (download).
 * Bunlar `showUploadList` objesinin previewIcon/removeIcon/downloadIcon alanları
 * üzerinden override edilebilir (5.7 baseline'da `ShowUploadListInterface` bu üç
 * alanı içerir; imza: ReactNode | ((file) => ReactNode) — antd/es/upload/
 * interface.d.ts ile doğrulandı).
 *
 * Davranış (kanonik obje-form pattern):
 *   showUploadList === false      → dokunma (liste gizli)
 *   showUploadList === true/undef → ikonlu objeye çevir (Carbon enjekte)
 *   showUploadList === obje        → eksik ikon alanlarını Carbon ile doldur
 *
 * undefined → Carbon enjekte; null/false → consumer ikonu gizlemek istiyor;
 * custom node/fonksiyon → korunur. Bu yüzden `=== undefined`; `??` değil.
 *
 * `showRemoveIcon/showPreviewIcon/showDownloadIcon` boolean'larına ve consumer'ın
 * verdiği ikonlara DOKUNULMAZ — yalnızca eksik ikon glyph'i Carbon'a çekilir.
 * (`showUploadList === true` → boş objeye çevirince AntD default show* değerleri
 * korunur: preview/remove görünür, download `done`'da showDownloadIcon=false ile
 * gizli kalır — orijinal `true` davranışıyla birebir aynı.)
 *
 * Action ikonları AntD Button `icon` slotuna (preview ise <a> içine) girer; mevcut
 * CSS `.ant-upload-list-item ... svg` token rengini, hover'da accent/danger rengini
 * verir (Carbon fill=currentColor → renk mirasla çalışır). Boyut netliği için Carbon
 * ikonlara .actionIcon module class'ı ile 16px verilir (AntD font-size'ı miras
 * alınmaz). */
const PREVIEW_ICON = <View className={styles.actionIcon} />;
const REMOVE_ICON = <TrashCan className={styles.actionIcon} />;
const DOWNLOAD_ICON = <Download className={styles.actionIcon} />;

/** `showUploadList` prop'una liste action ikonlarını (preview/remove/download)
 *  Carbon olarak enjekte eder. Override-edilebilir kalır. */
function withCarbonListIcons(
  showUploadList: UploadProps["showUploadList"],
): UploadProps["showUploadList"] {
  // Liste gizli — dokunma.
  if (showUploadList === false) return showUploadList;
  // boolean true ya da verilmemiş → ikonlu objeye çevir (show* AntD default'ında kalır).
  if (showUploadList === undefined || showUploadList === true) {
    return {
      previewIcon: PREVIEW_ICON,
      removeIcon: REMOVE_ICON,
      downloadIcon: DOWNLOAD_ICON,
    };
  }
  // Obje form — eksik ikon alanlarını Carbon ile doldur; geri kalanı (show* dahil) koru.
  return {
    ...showUploadList,
    previewIcon:
      showUploadList.previewIcon === undefined
        ? PREVIEW_ICON
        : showUploadList.previewIcon,
    removeIcon:
      showUploadList.removeIcon === undefined
        ? REMOVE_ICON
        : showUploadList.removeIcon,
    downloadIcon:
      showUploadList.downloadIcon === undefined
        ? DOWNLOAD_ICON
        : showUploadList.downloadIcon,
  };
}

/** ServiceCore Upload — AntD Upload wrap.
 *
 * Dosya yükleme. Bilet eki, asset import, KB ek dosya, profil avatarı.
 * Real backend ile <code>action</code> veya <code>customRequest</code>
 * kullanılır; demo/dev'de <code>beforeUpload</code>'tan <code>false</code>
 * dönerek client-side simülasyon yapılabilir.
 *
 * AntD API'sini 1:1 korur (listType: text/picture/picture-card/picture-circle,
 * multiple, maxCount, accept, directory, drag&drop için Upload.Dragger).
 *
 * Liste öğesi action ikonları (preview/remove/download) Carbon'a çekilir;
 * <code>showUploadList</code> objesinde kendi ikonunu verirsen korunur.
 *
 * NOT — dosya satırı glyph'i (<code>iconRender</code> default'u: PaperClipOutlined /
 * FileTwoTone) wrap'ta Carbon'a çevrilMEDİ: AntD'nin loading durumu dönen spinner
 * (LoadingOutlined) gösterir; Carbon'da animasyonlu spinner karşılığı yok ve
 * <code>iconRender</code> verilince AntD'nin loading/thumbnail dallarına kısmi
 * dönüş mümkün değil. Mevcut CSS bu glyph'i zaten token rengiyle gösteriyor.
 * Kendi glyph'ini geçmek için <code>iconRender</code> prop'u açık.
 *
 * @example Temel
 * ```tsx
 * <Upload action="/api/upload" multiple>
 *   <Button leadingIcon={<Upload />}>Dosya seç</Button>
 * </Upload>
 * ```
 *
 * @example Drag & drop
 * ```tsx
 * <Upload.Dragger action="/api/upload" multiple>
 *   <p>Dosya sürükle veya tıkla</p>
 * </Upload.Dragger>
 * ```
 */
function UploadRoot({ className, showUploadList, ...rest }: UploadProps) {
  return (
    <AntUpload
      {...rest}
      showUploadList={withCarbonListIcons(showUploadList)}
      className={clsx(styles.upload, className)}
    />
  );
}

/** ServiceCore Upload.Dragger — drag & drop varyantı.
 *
 * Geniş drop alanı. Bilet eki, asset import (CSV), KB doc upload için.
 * Liste action ikonları (preview/remove/download) Carbon'a çekilir.
 *
 * @example
 * ```tsx
 * <Upload.Dragger action="/api/upload" multiple accept=".csv,.xlsx">
 *   <p className="ant-upload-drag-icon"><CloudUpload size={32} /></p>
 *   <p className="ant-upload-text">Dosya sürükle veya tıkla</p>
 * </Upload.Dragger>
 * ```
 */
function UploadDragger({ className, showUploadList, ...rest }: UploadDraggerProps) {
  return (
    <AntUpload.Dragger
      {...rest}
      showUploadList={withCarbonListIcons(showUploadList)}
      className={clsx(styles.dragger, className)}
    />
  );
}

UploadRoot.Dragger = UploadDragger;

export const Upload = UploadRoot;
