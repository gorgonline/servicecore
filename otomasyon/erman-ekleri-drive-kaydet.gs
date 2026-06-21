/**
 * ServiceCore — Erman'ın e-posta eklerini otomatik Google Drive'a kaydeder.
 * Çalışma mantığı: Gmail'de Erman'dan gelen + eki olan mailleri bulur, ekleri
 * "ServiceCore-Gelen" Drive klasörüne kopyalar, maili "işlendi" diye etiketler.
 * Tamamı SENİN Google hesabında çalışır — üçüncü tarafa erişim yok.
 *
 * ── KURULUM (tek seferlik, ~10 dk) ──────────────────────────────────────────
 * 1) script.google.com → "Yeni proje". Açılan örnek kodu sil, bu kodu yapıştır.
 * 2) Üstteki fonksiyon menüsünden "createTrigger" seç → "Çalıştır".
 *    Google izin isteyecek (Gmail'i oku + Drive'a yaz) → izin ver.
 *    Bu, her 10 dakikada bir otomatik çalışan tetikleyiciyi kurar.
 * 3) İlk testi: fonksiyon menüsünden "saveErmanAttachmentsToDrive" seç → "Çalıştır".
 *    Drive'da "ServiceCore-Gelen" klasörü oluşacak ve Erman'ın ekleri içine düşecek.
 * Bitti. Bundan sonra Erman ek attıkça dosyalar otomatik o klasöre gelir.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ====== AYARLAR ======
var CONFIG = {
  senders: ['erman.taskin@servicecore.com.tr'], // ekleri kaydedilecek gönderen(ler); virgülle çoğaltabilirsin
  driveFolderName: 'ServiceCore-Gelen',          // hedef Drive klasörü (yoksa otomatik oluşturulur)
  processedLabel: 'SC-Drive-Kaydedildi',         // işlenen maillere konan Gmail etiketi (tekrar kaydı önler)
  searchWindow: 'newer_than:60d',                // ilk taramada ne kadar geriye bakılsın (istersen 1y yap)
  includeInlineImages: true,                     // görselleri DE kaydet (Erman görselle/ekran görüntüsüyle tarif ediyor)
  minImageBytes: 20000,                          // sadece bundan KÜÇÜK görselleri atla (imza logoları ~birkaç KB). 0 yaparsan istisnasız tüm görseller gelir.
  prefixDate: true                               // dosya adının başına yyyy-MM-dd_ ekle (düzen için)
};

/** Ana fonksiyon — tetikleyici bunu çağırır. */
function saveErmanAttachmentsToDrive() {
  Logger.log('Çalışan hesap: ' + Session.getEffectiveUser().getEmail()); // hangi posta kutusu taranıyor
  var folder = getOrCreateFolder_(CONFIG.driveFolderName);
  var label = getOrCreateLabel_(CONFIG.processedLabel);

  var fromQuery = CONFIG.senders.map(function (s) { return 'from:' + s; }).join(' OR ');
  // Not: etiket filtresini sorguya KOYMUYORUZ (tireli etiket adı Gmail aramasını bozabiliyor);
  // bunun yerine zaten işlenmiş thread'leri aşağıda kodda atlıyoruz.
  var query = '(' + fromQuery + ') has:attachment ' + CONFIG.searchWindow;

  var threads = GmailApp.search(query, 0, 50);
  Logger.log('Sorgu: ' + query + ' | bulunan thread: ' + threads.length);
  var saved = 0;

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    if (threadHasLabel_(thread, label)) continue; // bu thread daha önce işlendi, atla
    var messages = thread.getMessages();
    for (var j = 0; j < messages.length; j++) {
      var msg = messages[j];
      if (!isFromConfiguredSender_(msg)) continue; // thread'deki yanıtları değil, sadece Erman'ın mesajlarını al
      var atts = msg.getAttachments({ includeInlineImages: CONFIG.includeInlineImages, includeAttachments: true });
      for (var k = 0; k < atts.length; k++) {
        var att = atts[k];
        if (att.getSize() === 0) continue;
        var isImage = (att.getContentType() || '').indexOf('image/') === 0;
        if (isImage && att.getSize() < CONFIG.minImageBytes) continue; // küçük imza/logo görselini atla, gerçek ekran görüntülerini al
        var name = uniqueName_(folder, buildFileName_(att.getName(), msg.getDate()));
        folder.createFile(att.copyBlob()).setName(name);
        saved++;
      }
    }
    thread.addLabel(label); // bu thread tekrar işlenmesin
  }

  Logger.log('Kaydedilen ek: ' + saved + ' | taranan thread: ' + threads.length);
}

/** Bir kez çalıştır: her 10 dakikada bir otomatik tetikleyici kurar (mükerrer kurmaz). */
function createTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'saveErmanAttachmentsToDrive') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('saveErmanAttachmentsToDrive').timeBased().everyMinutes(10).create();
  Logger.log('Tetikleyici kuruldu: her 10 dakikada bir.');
}

// ====== yardımcılar ======
function isFromConfiguredSender_(msg) {
  var from = msg.getFrom().toLowerCase();
  for (var i = 0; i < CONFIG.senders.length; i++) {
    if (from.indexOf(CONFIG.senders[i].toLowerCase()) !== -1) return true;
  }
  return false;
}

function buildFileName_(name, date) {
  if (!CONFIG.prefixDate) return name;
  var d = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  return d + '_' + name;
}

function uniqueName_(folder, name) {
  if (!folder.getFilesByName(name).hasNext()) return name;
  var dot = name.lastIndexOf('.');
  var base = dot === -1 ? name : name.substring(0, dot);
  var ext = dot === -1 ? '' : name.substring(dot);
  var n = 2;
  while (folder.getFilesByName(base + ' (' + n + ')' + ext).hasNext()) n++;
  return base + ' (' + n + ')' + ext;
}

function threadHasLabel_(thread, label) {
  var labels = thread.getLabels();
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].getName() === label.getName()) return true;
  }
  return false;
}

function getOrCreateFolder_(folderName) {
  var it = DriveApp.getFoldersByName(folderName);
  return it.hasNext() ? it.next() : DriveApp.createFolder(folderName);
}

function getOrCreateLabel_(labelName) {
  return GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);
}
