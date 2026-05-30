import { Result as AntResult } from "antd";
import clsx from "clsx";
import type { ResultProps } from "./Result.types";
import styles from "./Result.module.css";

/** ServiceCore Result — sayfa/bölüm seviyesi durum sonucu.
 *
 * <strong>Ne için:</strong> Bir akış bittikten sonra (form gönderildi,
 * ödeme tamamlandı, 404, 403, 500) full-page veya bölüm dolduran sonuç
 * gösterimi. Title + subTitle + büyük status iconu + action butonları.
 *
 * <strong>Result vs Empty vs Alert vs Modal:</strong>
 *   • <strong>Result:</strong> Bir akış SONUCU — "Bilet oluşturuldu",
 *     "Sayfa bulunamadı". Full-page veya büyük bölüm.
 *   • <strong>Empty:</strong> Veri YOK — "Hiç bilet yok, oluştur".
 *     Listenin yerine geçer.
 *   • <strong>Alert:</strong> Sayfa içi inline uyarı (kullanıcı dismiss
 *     edebilir).
 *   • <strong>Modal:</strong> Akışı kesen onay/karar.
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>status</code>: success/error/info/warning/404/403/500.
 *   • <code>title</code>, <code>subTitle</code>, <code>icon</code>,
 *     <code>extra</code> (action buttons), <code>children</code> (ek
 *     içerik bloğu — error log, code, detay liste).
 *   • <code>classNames</code>/<code>styles</code> semantic DOM (5.8+) yok.
 *
 * @example Success — bilet oluşturuldu
 * ```tsx
 * <Result
 *   status="success"
 *   title="Bilet oluşturuldu"
 *   subTitle="SC-4127 — Acme A.Ş., P1, atanmamış"
 *   extra={[
 *     <Button key="open" type="primary">Bileti aç</Button>,
 *     <Button key="new">Yeni bilet</Button>,
 *   ]}
 * />
 * ```
 *
 * @example 404
 * ```tsx
 * <Result
 *   status="404"
 *   title="404"
 *   subTitle="Aradığın sayfa mevcut değil."
 *   extra={<Button type="primary" onClick={() => router.push("/")}>Ana sayfa</Button>}
 * />
 * ```
 *
 * @example 500 + log children
 * ```tsx
 * <Result
 *   status="500"
 *   title="Sunucu hatası"
 *   subTitle="Talebin işlenemedi. Detay loglarda."
 *   extra={<Button onClick={retry}>Yeniden dene</Button>}
 * >
 *   <pre>Trace ID: 7c4a-...</pre>
 * </Result>
 * ```
 *
 * @example Custom icon
 * ```tsx
 * <Result
 *   icon={<CheckmarkFilled size={72} style={{ color: "var(--sc-color-accent)" }} />}
 *   title="Export hazır"
 *   subTitle="bilet-export-2025-Q4.xlsx (47 KB)"
 *   extra={<Button type="primary">İndir</Button>}
 * />
 * ```
 */
export function Result(props: ResultProps) {
  const { className, ...rest } = props;
  return <AntResult {...rest} className={clsx(styles.result, className)} />;
}
