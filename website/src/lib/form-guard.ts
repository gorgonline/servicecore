/**
 * Form bot koruması — honeypot + zaman tuzağı (Aşama 1).
 *
 * İki sinyal:
 *  1. Honeypot: insanlara görünmez gizli bir alan. Botlar bir formdaki tüm
 *     inputları doldurma eğiliminde olduğu için bu alan dolu gelirse gönderim
 *     bot kabul edilir.
 *  2. Zaman tuzağı: form yüklendikten sonra eşik süreden (MIN_FILL_MS) daha
 *     hızlı gelen gönderim bot kabul edilir; bir insan formu saniyeler içinde
 *     dolduramaz.
 *
 * Asıl zorlama Apps Script tarafında yapılmalıdır (endpoint herkese açık
 * olduğu için doğrudan POST atan botları da elemek için). Buradaki client
 * tarafı yalnızca gereksiz isteği sessizce eler ve bota başarı sinyali vermez.
 */

/** Honeypot input'unun name/id'si — bota cazip gelecek bir isim. */
export const HONEYPOT_NAME = "website_url";

/**
 * Form mount'ından gönderime kadar en az geçmesi beklenen süre (ms).
 *
 * Süre, ilk etkileşimden değil mount'tan (≈ sayfaya gelme anı) ölçülür; bu
 * yüzden geçen süre pratikte "sayfada geçirilen süre"dir ve gerçek bir insan
 * için her zaman birkaç saniyedir. Eşik, en hızlı autofill kullanıcısının bile
 * (~1.5sn) altında kalacak şekilde düşük tutulur; programatik/anında submit
 * eden botlar (ms mertebesinde) yine de yakalanır. Asıl savunma honeypot.
 */
export const MIN_FILL_MS = 1200;

export interface FormGuard {
  /** Honeypot alanının değeri — gerçek kullanıcılarda her zaman boş. */
  hp: string;
  /** Form mount'ından gönderime kadar geçen süre (ms). */
  t: number;
}

/** Gönderimin bot olma ihtimalini değerlendirir. true → bot, ele. */
export function isLikelyBot(guard: FormGuard): boolean {
  if (guard.hp.trim() !== "") return true;
  if (guard.t < MIN_FILL_MS) return true;
  return false;
}
