/**
 * Zoho CRM Web-to-Lead entegrasyon sözleşmesi — /register formunun Zoho
 * Leads modülüne gönderimi için gereken üretilmiş sabitler ve alan eşlemeleri.
 *
 * xnQsjsdp / xmIwtLD / actionType değerleri Zoho'nun form üreticisinden
 * birebir alınmıştır; değiştirilirse Zoho gönderimi reddeder. Bu değerler
 * tarayıcı kaynağında görünmek üzere tasarlanmıştır, gizli kimlik bilgisi
 * değildir.
 *
 * Gönderim fetch ile YAPILAMAZ: Zoho Web-to-Lead CORS başlığı döndürmez ve
 * başarı akışı Zoho'nun returnURL'e yaptığı yönlendirmeye dayanır. Bu yüzden
 * gönderim tam sayfa form POST'u olarak yapılır (submitZohoWebToLead).
 */

export const ZOHO_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";

const XNQSJSDP = "8914925d1331e8e40011bbcfaf5b75e39c8e4244c0044ea6562a15f81d7092c3";
const XMIWTLD =
  "0b94dafc1f5e1e5d1a0e570aa3a9e4dd8acc53728756b1cd87e65b5e711997f83a5938ef835d1387834714607d17852d";

/**
 * Zoho form üreticisinin orijinal returnURL değeri
 * "https://servicecore.app/tr/basvuru-alindi" idi. Site bu formun onaylı
 * başarı sayfası olarak /tesekkurler'i kullandığı için hedef korunmuştur;
 * farklı bir hedef onaylanırsa yalnızca bu sabit değiştirilmelidir.
 */
export const ZOHO_RETURN_URL = "https://www.servicecore.com.tr/tesekkurler?from=partner";

const ZOHO_HIDDEN_FIELDS: Record<string, string> = {
  xnQsjsdp: XNQSJSDP,
  zc_gad: "",
  xmIwtLD: XMIWTLD,
  actionType: "TGVhZHM=",
  returnURL: ZOHO_RETURN_URL,
};

/** Captcha görseli — formId/grpid eşleşmesi Zoho kaynağındaki gibi (formId=xmIwtLD, grpid=xnQsjsdp). */
export const ZOHO_CAPTCHA_URL = `https://crm.zoho.com/crm/CaptchaServlet?formId=${XMIWTLD}&grpid=${XNQSJSDP}`;

/** partner-kayit.json alan id'si → Zoho POST alan adı (input "name" değeri, id değil). */
const ZOHO_FIELD_NAMES: Record<string, string> = {
  partner_adi: "LEADCF7",
  partner_sorumlu: "LEADCF14",
  musteri_firma: "Company",
  musteri_ad: "First Name",
  musteri_soyad: "Last Name",
  musteri_gorev: "Designation",
  musteri_eposta: "Email",
  musteri_telefon: "Phone",
  ekonomik_karar_verici: "LEADCF5",
  bt_personel_sayisi: "LEADCF51",
  gecis_tarihi: "LEADCF1",
  itil_surecleri: "LEADCF4",
  mevcut_cozum: "LEADCF2",
  alim_modeli: "LEADCF3",
  butce_durumu: "LEADCF6",
  diger_detaylar: "Description",
};

/** Zoho form üreticisindeki maxlength sınırları — aşan değerleri Zoho sessizce kırpabilir. */
const ZOHO_MAX_LENGTHS: Record<string, number> = {
  partner_adi: 255,
  partner_sorumlu: 255,
  musteri_firma: 200,
  musteri_ad: 40,
  musteri_soyad: 80,
  musteri_gorev: 100,
  musteri_eposta: 100,
  musteri_telefon: 30,
  ekonomik_karar_verici: 255,
  bt_personel_sayisi: 9,
  gecis_tarihi: 255,
  mevcut_cozum: 255,
};

export function zohoMaxLength(fieldId: string): number | undefined {
  return ZOHO_MAX_LENGTHS[fieldId];
}

/**
 * Görünür Türkçe seçenek → Zoho'nun kabul ettiği picklist değeri.
 * Eşlemesi olmayan seçenekler ham etiketiyle gönderilir (buildZohoLeadPayload).
 *
 * TODO: CRM PICKLIST VALUE REQUIRED — aşağıdaki seçeneklerin Zoho picklist'inde
 * karşılığı yok; CRM'e eklenene kadar ham Türkçe etiket gönderilir:
 *  - alim_modeli (LEADCF3): "SaaS / Bulut", "Bilmiyorum"
 *  - butce_durumu (LEADCF6): "Bütçe planlanıyor"
 */
const ZOHO_PICKLIST_VALUES: Record<string, Record<string, string>> = {
  itil_surecleri: {
    "Evet, tamamı işletiliyor": "Var, olgun",
    "Kısmen işletiliyor": "Var, başlangıç seviyesi",
    "Yok": "Yok",
  },
  alim_modeli: {
    "Lisans (Perpetual)": "Satınalma - Perpetual",
    "Abonelik (Subscription)": "Kiralama - Subscription",
  },
  butce_durumu: {
    "Evet, ayrılmış": "Evet",
    "Hayır": "Hayır",
    "Bilinmiyor": "Bilinmiyor",
  },
};

/** Form state'ini (alan id → değer) Zoho POST alanlarına çevirir; değerler trimlenir. */
export function buildZohoLeadPayload(fieldState: Record<string, string>): Record<string, string> {
  const payload: Record<string, string> = {};
  for (const [fieldId, zohoName] of Object.entries(ZOHO_FIELD_NAMES)) {
    const value = (fieldState[fieldId] ?? "").trim();
    payload[zohoName] = ZOHO_PICKLIST_VALUES[fieldId]?.[value] ?? value;
  }
  // Number input "1e3" gibi bilimsel gösterimi geçirir; Zoho'nun sayı alanı
  // bunu reddedebilir — düz tam sayı stringine çevrilir.
  const staffCount = Number(payload.LEADCF51);
  if (payload.LEADCF51 && Number.isFinite(staffCount)) {
    payload.LEADCF51 = String(Math.trunc(staffCount));
  }
  return payload;
}

/**
 * Zoho'ya tam sayfa POST atar. Bu çağrıdan sonra sayfa yaşam döngüsü Zoho'ya
 * geçer: lead işlenir ve tarayıcı returnURL'e yönlendirilir.
 */
export function submitZohoWebToLead(payload: Record<string, string>, captchaCode: string): void {
  const fields: Record<string, string> = {
    ...ZOHO_HIDDEN_FIELDS,
    ...payload,
    enterdigest: captchaCode.trim(),
  };

  // Orijinal Zoho scriptindeki smarturl parametresi davranışı korunuyor.
  const params = new URLSearchParams(window.location.search);
  if (params.get("service") === "smarturl") {
    fields.service = "smarturl";
  }

  const form = document.createElement("form");
  form.action = ZOHO_ENDPOINT;
  form.method = "POST";
  form.acceptCharset = "UTF-8";
  form.style.display = "none";

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  // Navigasyon isteği submit ile senkron başladı; kişisel veri taşıyan gizli
  // form bfcache'e sayfayla birlikte donup kalmasın diye hemen kaldırılır.
  form.remove();
}
