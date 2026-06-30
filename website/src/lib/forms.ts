/**
 * Form gönderim yardımcısı — Google Apps Script Web App endpoint'ine POST atar.
 * Tüm form gönderimleri "Servicecore Formlar" adlı Google Sheets dosyasına düşer.
 *
 * Apps Script CORS preflight'ı tetiklememesi için Content-Type 'text/plain' kullanılır;
 * payload yine JSON string olarak gönderilir, Apps Script JSON.parse ile çözer.
 */

import { isLikelyBot, type FormGuard } from "@/lib/form-guard";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";

export type FormSheet =
  | "Demo"
  | "İletişim"
  | "Soru"
  | "Eğitim"
  | "Kurs"
  | "Partnerlik"
  | "Analiz"
  | "Register";

export type FormSubmitResult =
  | { ok: true; sheet: FormSheet }
  | { ok: false; error: string };

export async function submitForm(
  sheet: FormSheet,
  data: Record<string, unknown>,
  guard?: FormGuard,
): Promise<FormSubmitResult> {
  if (!ENDPOINT) {
    return { ok: false, error: "Form gönderim adresi yapılandırılmamış." };
  }

  // Bot koruması — honeypot dolu veya form eşik süreden hızlı gönderildiyse
  // isteği sunucuya hiç gönderme; bota başarı sinyali vererek sessizce ele.
  // (Sunucu tarafı / Apps Script de ayrıca zorlar — bu yalnızca client ön-eleme.)
  if (guard && isLikelyBot(guard)) {
    return { ok: true, sheet };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ sheet, data, guard }),
    });

    if (!response.ok) {
      return { ok: false, error: `Sunucu hatası (${response.status})` };
    }

    const result = (await response.json()) as FormSubmitResult;
    return result;
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Bilinmeyen ağ hatası",
    };
  }
}
