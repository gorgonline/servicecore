import { Upload as AntUpload } from "antd";
import clsx from "clsx";
import styles from "./Upload.module.css";
import type { UploadProps, UploadDraggerProps } from "./Upload.types";

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
function UploadRoot({ className, ...rest }: UploadProps) {
  return <AntUpload {...rest} className={clsx(styles.upload, className)} />;
}

/** ServiceCore Upload.Dragger — drag & drop varyantı.
 *
 * Geniş drop alanı. Bilet eki, asset import (CSV), KB doc upload için.
 *
 * @example
 * ```tsx
 * <Upload.Dragger action="/api/upload" multiple accept=".csv,.xlsx">
 *   <p className="ant-upload-drag-icon"><CloudUpload size={32} /></p>
 *   <p className="ant-upload-text">Dosya sürükle veya tıkla</p>
 * </Upload.Dragger>
 * ```
 */
function UploadDragger({ className, ...rest }: UploadDraggerProps) {
  return (
    <AntUpload.Dragger
      {...rest}
      className={clsx(styles.dragger, className)}
    />
  );
}

UploadRoot.Dragger = UploadDragger;

export const Upload = UploadRoot;
