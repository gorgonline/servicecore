/**
 * ServiceCore — Form gönderimlerini Zoho CRM'e Lead olarak aktarır.
 *
 * KURULUM
 * 1. Apps Script projesinde (script.google.com) Dosya → Yeni → Komut dosyası
 *    de ve bu dosyanın TAMAMINI "ZohoLead.gs" adıyla yapıştır.
 *
 * 2. Proje Ayarları (sol menü dişli) → Komut Dosyası Özellikleri (Script
 *    Properties) → şu 5 özelliği ekle:
 *
 *      ZOHO_CLIENT_ID      = (Erman'dan gelen Client ID)
 *      ZOHO_CLIENT_SECRET  = (Erman'dan gelen Client Secret)
 *      ZOHO_REFRESH_TOKEN  = (Erman'dan gelen Refresh Token)
 *      ZOHO_ACCOUNTS_BASE  = https://accounts.zoho.com   (EU hesabıysa https://accounts.zoho.eu)
 *      ZOHO_API_BASE       = https://www.zohoapis.com    (EU hesabıysa https://www.zohoapis.eu)
 *
 * 3. Mevcut doPost fonksiyonunda, Sheets'e yazma + mail adımlarından SONRA
 *    şu bloğu ekle (payload = formdan gelen {sheet, data} objesi):
 *
 *      try {
 *        pushLeadToZoho(payload.sheet, payload.data);
 *      } catch (err) {
 *        console.error('Zoho push hatası: ' + err);
 *      }
 *
 *    try/catch ŞART — Zoho'ya ulaşılamazsa bile Sheets + mail akışı bozulmaz.
 *
 * 4. Editörde testZohoPush fonksiyonunu seçip Çalıştır'a bas → CRM'de
 *    Leads modülünde "Test ServiceCore" kaydı görünmeli.
 *
 * 5. Dağıt → Dağıtımları yönet → kalem (düzenle) → Sürüm: "Yeni sürüm"
 *    → Dağıt. (Web App URL'si AYNI kalır; formlarda değişiklik gerekmez.)
 */

/**
 * Bilinen form alanı → Zoho Lead alanı eşlemesi.
 * Burada olmayan her alan Description'a "Alan: değer" satırı olarak eklenir,
 * yani Analiz/Register gibi dinamik formlarda hiçbir veri kaybolmaz.
 */
var ZOHO_FIELD_MAP = {
  'Ad': 'First_Name',
  'Soyad': 'Last_Name',
  'Ad Soyad': '__fullname', // özel: son kelime Soyad, kalanı Ad olur
  'E-posta': 'Email',
  'Email': 'Email',
  'Telefon': 'Phone',
  'Firma': 'Company',
  'Firma İsmi': 'Company',
  'Şirket': 'Company',
  'Ünvan': 'Designation'
};

/**
 * Form verisini Zoho CRM Leads modülüne yazar.
 * @param {string} sheetName - Form/tab adı ("Demo", "İletişim", "Analiz", ...)
 * @param {Object} data - Form alanları ({"Ad": "...", "E-posta": "...", ...})
 * @return {string} Oluşan lead'in Zoho kayıt id'si
 */
function pushLeadToZoho(sheetName, data) {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ZOHO_REFRESH_TOKEN')) {
    console.warn('Zoho yapılandırılmamış (ZOHO_REFRESH_TOKEN yok), atlanıyor.');
    return '';
  }

  var lead = buildZohoLead_(sheetName, data);
  var apiBase = props.getProperty('ZOHO_API_BASE') || 'https://www.zohoapis.com';

  var response = zohoFetch_(apiBase + '/crm/v8/Leads', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ data: [lead] }),
    muteHttpExceptions: true
  });

  var code = response.getResponseCode();
  var text = response.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error('Zoho insert hatası (HTTP ' + code + '): ' + text);
  }

  var body = JSON.parse(text);
  var row = body && body.data && body.data[0];
  if (!row || row.status !== 'success') {
    throw new Error('Zoho insert başarısız: ' + text);
  }

  console.log('Zoho lead oluştu: ' + row.details.id + ' (' + sheetName + ')');
  return row.details.id;
}

/**
 * Form alanlarını Zoho Lead objesine çevirir.
 * Zoho'da Last_Name ve Company zorunludur; eksikse güvenli varsayılan konur.
 */
function buildZohoLead_(sheetName, data) {
  var lead = { Lead_Source: 'Web Form — ' + String(sheetName || 'Bilinmeyen') };
  var descLines = [];

  Object.keys(data || {}).forEach(function (key) {
    var value = data[key] == null ? '' : String(data[key]).trim();
    if (!value) return;

    var target = ZOHO_FIELD_MAP[key];
    if (target === '__fullname') {
      var parts = value.split(/\s+/);
      if (parts.length > 1) {
        lead.Last_Name = parts.pop();
        lead.First_Name = parts.join(' ');
      } else {
        lead.Last_Name = value;
      }
    } else if (target) {
      lead[target] = value;
    } else {
      descLines.push(key + ': ' + value);
    }
  });

  if (!lead.Last_Name) lead.Last_Name = lead.First_Name || 'Bilinmiyor';
  if (!lead.Company) lead.Company = 'Bilinmiyor';
  if (descLines.length) lead.Description = descLines.join('\n');

  return lead;
}

/**
 * Zoho API çağrısı yapar; access token süresi dolmuşsa (401) bir kez
 * token'ı tazeleyip yeniden dener.
 */
function zohoFetch_(url, options) {
  options.headers = { Authorization: 'Zoho-oauthtoken ' + getZohoAccessToken_(false) };
  var response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 401) {
    options.headers = { Authorization: 'Zoho-oauthtoken ' + getZohoAccessToken_(true) };
    response = UrlFetchApp.fetch(url, options);
  }
  return response;
}

/**
 * Geçerli bir access token döner. Token 60 dk geçerlidir; 50 dk cache'lenir
 * ki her form gönderiminde refresh çağrısı yapılmasın (Zoho rate limit'i var).
 * @param {boolean} forceRefresh - true ise cache atlanıp yeni token alınır
 */
function getZohoAccessToken_(forceRefresh) {
  var cache = CacheService.getScriptCache();
  if (!forceRefresh) {
    var cached = cache.get('zoho_access_token');
    if (cached) return cached;
  }

  var props = PropertiesService.getScriptProperties();
  var accountsBase = props.getProperty('ZOHO_ACCOUNTS_BASE') || 'https://accounts.zoho.com';

  var response = UrlFetchApp.fetch(accountsBase + '/oauth/v2/token', {
    method: 'post',
    payload: {
      grant_type: 'refresh_token',
      client_id: props.getProperty('ZOHO_CLIENT_ID'),
      client_secret: props.getProperty('ZOHO_CLIENT_SECRET'),
      refresh_token: props.getProperty('ZOHO_REFRESH_TOKEN')
    },
    muteHttpExceptions: true
  });

  var body = JSON.parse(response.getContentText());
  if (!body.access_token) {
    throw new Error('Zoho access token alınamadı: ' + response.getContentText());
  }

  cache.put('zoho_access_token', body.access_token, 3000); // 50 dakika
  return body.access_token;
}

/**
 * Elle test: Apps Script editöründe bu fonksiyonu seçip Çalıştır'a bas.
 * Başarılıysa log'da lead id görünür, CRM Leads modülüne test kaydı düşer.
 * Test sonrası kaydı CRM'den silebilirsiniz.
 */
function testZohoPush() {
  var id = pushLeadToZoho('Demo', {
    'Ad': 'Test',
    'Soyad': 'ServiceCore',
    'E-posta': 'test@servicecore.com.tr',
    'Telefon': '+90 555 000 00 00',
    'Toplantı Günü': 'Çarşamba',
    'Toplantı Saati': '14:00'
  });
  console.log('Test lead id: ' + id);
}
