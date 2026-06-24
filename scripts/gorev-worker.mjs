#!/usr/bin/env node
/**
 * Görev Worker — deterministik taşıma katmanı.
 *
 * launchd (com.gorgo.gorev-worker) her 2 dakikada bir çalıştırır.
 * Tur başına en fazla 1 "geldi" + 1 "kuyruk" işi (FIFO + önceliğe göre).
 *
 * Akış — görevin tip'ine göre dallanır:
 *   geldi/  (gorev) → [Opus 4.8: spec yaz]      → spec/   (Levent onaylar → kuyruk/)
 *   geldi/  (rapor) → [Opus 4.8: araştır + yaz]  → inceleme/ | hata/   (spec/onay YOK)
 *   kuyruk/ (gorev) → [Opus 4.8: uygula]         → inceleme/ | hata/
 *   kuyruk/ (rapor) → [Opus 4.8: araştır + yaz]  → inceleme/ | hata/   (öksüz/elle taşıma)
 *
 * Tüm durum taşımaları panel API'si üzerinden yapılır (geçmiş kaydı otomatik).
 * Spec ve RAPOR aşamasında Claude SALT-OKUR araç alır; dosya yazımını worker yapar.
 * Rapor: tam metin ekler/<id>/rapor-*.md'ye yazılır (gövde tavanı kırpmaz).
 * Güvenlik: kilit dosyası, zaman aşımı, günlük çağrı limiti, commit/push yasağı.
 */

import { spawn } from "node:child_process";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";

const PANEL = "http://localhost:3000";
const REPO = "/Users/leventusta/Desktop/servicecore";

// Proje → çalışma dizini. Listede olmayan projeler servicecore reposunda işlenir.
const PROJE_DIZINLERI = {
  gemma: "/Users/leventusta/Desktop/gemma",
};

function calismaDizini(gorev) {
  return PROJE_DIZINLERI[gorev.proje] ?? REPO;
}
const EKLER_KOK = path.join(REPO, "gorevler", "ekler");
const CLAUDE = path.join(os.homedir(), ".local", "bin", "claude");
const LOG_KLASORU = path.join(os.homedir(), "Library", "Logs", "gorev-worker");
const KILIT = "/tmp/gorev-worker.lock";

const SPEC_MODELI = "claude-opus-4-8";
const ISLEME_MODELI = "claude-opus-4-8";
const SPEC_ZAMAN_ASIMI = 15 * 60 * 1000; // 15 dk
const ISLEME_ZAMAN_ASIMI = 60 * 60 * 1000; // 60 dk
const KILIT_BAYATLAMA = 90 * 60 * 1000; // 90 dk — spec+işleme üst sınırı + tampon
const GUNLUK_CAGRI_LIMITI = 100; // kaçak maliyet sigortası — ~50 görev/gün (2 çağrı/görev)
const GOVDE_TAVANI = 19500; // API şemasındaki 20000 sınırının altında kal

// ---------- yardımcılar ----------

function log(mesaj) {
  mkdirSync(LOG_KLASORU, { recursive: true });
  const satir = `[${new Date().toISOString()}] ${mesaj}\n`;
  appendFileSync(path.join(LOG_KLASORU, "worker.log"), satir);
  process.stdout.write(satir);
}

function kilitAl() {
  try {
    mkdirSync(KILIT);
    return true;
  } catch {
    try {
      const yas = Date.now() - statSync(KILIT).mtimeMs;
      if (yas > KILIT_BAYATLAMA) {
        log(`bayat kilit kırılıyor (${Math.round(yas / 60000)} dk)`);
        rmdirSync(KILIT);
        mkdirSync(KILIT);
        return true;
      }
    } catch {
      // kilit bu arada kalkmış olabilir — bu turu yine de atla
    }
    return false;
  }
}

function kilitBirak() {
  try {
    rmdirSync(KILIT);
  } catch {
    // zaten yoksa sorun değil
  }
}

function gunlukSayacDosyasi() {
  const gun = new Date().toISOString().slice(0, 10);
  return path.join(LOG_KLASORU, `sayac-${gun}`);
}

function gunlukCagriSayisi() {
  try {
    return parseInt(readFileSync(gunlukSayacDosyasi(), "utf8"), 10) || 0;
  } catch {
    return 0;
  }
}

function cagriSay() {
  mkdirSync(LOG_KLASORU, { recursive: true });
  writeFileSync(gunlukSayacDosyasi(), String(gunlukCagriSayisi() + 1));
}

function oncelikSira(oncelik) {
  if (oncelik === "yuksek") return 0;
  if (oncelik === "normal") return 1;
  return 2;
}

function siradakini(gorevler, durum) {
  return gorevler
    .filter((g) => g.durum === durum)
    .sort(
      (a, b) =>
        oncelikSira(a.oncelik) - oncelikSira(b.oncelik) ||
        a.olusturulma.localeCompare(b.olusturulma),
    )[0];
}

function ekYollari(id) {
  try {
    return readdirSync(path.join(EKLER_KOK, id))
      .filter((d) => !d.startsWith("."))
      .map((d) => path.join(EKLER_KOK, id, d));
  } catch {
    return [];
  }
}

function govdeKirp(govde) {
  if (govde.length <= GOVDE_TAVANI) return govde;
  return govde.slice(0, GOVDE_TAVANI) + "\n\n…[worker: gövde kısaltıldı]";
}

// ---------- panel API ----------

async function gorevleriGetir() {
  const yanit = await fetch(`${PANEL}/api/gorevler`, { cache: "no-store" });
  if (!yanit.ok) throw new Error(`panel API ${yanit.status}`);
  const veri = await yanit.json();
  return veri.gorevler;
}

async function eylemGonder(id, govde) {
  const yanit = await fetch(`${PANEL}/api/gorevler/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(govde),
  });
  // 409/404: görev biz işlerken Levent tarafından taşınmış/silinmiş (yarış).
  // Hata değil — sessizce atla; çağıran zaten dönüş değerini kullanmıyor ve
  // yapiliyor-durumu yeniden doğrulamasıyla korunuyor. Spurious hata-taşıma yok.
  if (yanit.status === 409 || yanit.status === 404) {
    log(`eylem yarışı (${yanit.status}): ${id} — görev taşınmış/silinmiş, atlanıyor`);
    return null;
  }
  if (!yanit.ok) {
    const detay = await yanit.text().catch(() => "");
    throw new Error(`PATCH ${id} ${yanit.status}: ${detay.slice(0, 200)}`);
  }
  return yanit.json();
}

// ---------- claude çağrısı ----------

function claudeCalistir({ prompt, model, araclar, izinModu, zamanAsimi, dizin }) {
  return new Promise((resolve) => {
    const args = ["-p", prompt, "--model", model, "--output-format", "text"];
    if (araclar && araclar.length > 0) {
      args.push("--allowedTools", ...araclar);
    }
    if (izinModu) args.push("--permission-mode", izinModu);

    const cocuk = spawn(CLAUDE, args, {
      cwd: dizin ?? REPO,
      env: {
        ...process.env,
        PATH: `${path.join(os.homedir(), ".local", "bin")}:/usr/bin:/bin:/usr/sbin:/sbin`,
      },
    });

    let cikti = "";
    let hataCiktisi = "";
    let oldu = false;

    const sayac = setTimeout(() => {
      oldu = true;
      cocuk.kill("SIGKILL");
    }, zamanAsimi);

    cocuk.stdout.on("data", (parca) => (cikti += parca));
    cocuk.stderr.on("data", (parca) => (hataCiktisi += parca));
    // 'close' DEĞİL 'exit' dinlenir: render'dan kalan öksüz torun süreçler
    // (headless Chrome vb.) stdio pipe'ını açık tutarsa 'close' hiç gelmez
    // ve worker sonsuza dek asılı kalır (2026-06-11 dersi). exit sonrası
    // 1 sn drenaj bekleyip eldeki çıktıyla devam ediyoruz.
    cocuk.on("exit", (kod) => {
      clearTimeout(sayac);
      setTimeout(() => {
        resolve({
          kod,
          cikti: cikti.trim(),
          hataCiktisi: hataCiktisi.trim(),
          zamanAsimi: oldu,
        });
      }, 1000);
    });
    cocuk.on("error", (hata) => {
      clearTimeout(sayac);
      resolve({ kod: -1, cikti: "", hataCiktisi: String(hata), zamanAsimi: false });
    });
  });
}

// ---------- aşama 1: spec üretimi (geldi → spec) ----------

async function specUret(gorev) {
  log(`SPEC başlıyor: ${gorev.id} — ${gorev.baslik}`);

  const ekler = ekYollari(gorev.id);
  const ekBolumu =
    ekler.length > 0
      ? `\nEKLER (Read aracıyla aç ve incele — görselleri görerek değerlendir):\n${ekler.map((y) => `- ${y}`).join("\n")}\n`
      : "";

  const prompt = `Sen ServiceCore görev panelinin spec yazarısın. Aşağıdaki görev için uygulanabilir bir SPEC ve ALT-TASK listesi yaz.

GÖREV (id: ${gorev.id} · proje: ${gorev.proje} · öncelik: ${gorev.oncelik}):
Başlık: ${gorev.baslik}

${gorev.govde}
${ekBolumu}
Kurallar:
- Çalışma dizinin: ${calismaDizini(gorev)} — oradaki CLAUDE.md kurallarını dikkate al. Araştırma için Read/Glob/Grep kullanabilirsin ama HİÇBİR DOSYA YAZMA.
- Alt-tasklar küçük, sırayla uygulanabilir, doğrulanabilir adımlar olsun; her adımda doğrulama kriteri/komutu belirt.
- Görevde belirsizlik varsa spec'in başına "### Açık Sorular" bölümü ekle.
- SADECE aşağıdaki formatta çıktı ver, öncesinde/sonrasında başka hiçbir şey yazma:

## Spec
<spec metni>

## Alt-tasklar
- [ ] <adım 1 — doğrulama: ...>
- [ ] <adım 2 — doğrulama: ...>`;

  cagriSay();
  const sonuc = await claudeCalistir({
    prompt,
    model: SPEC_MODELI,
    araclar: ["Read", "Glob", "Grep"],
    zamanAsimi: SPEC_ZAMAN_ASIMI,
    dizin: calismaDizini(gorev),
  });

  if (sonuc.zamanAsimi || sonuc.kod !== 0 || !sonuc.cikti.includes("## Spec")) {
    const neden = sonuc.zamanAsimi
      ? "zaman aşımı (15 dk)"
      : `çıkış kodu ${sonuc.kod} / format ihlali`;
    log(`SPEC BAŞARISIZ: ${gorev.id} — ${neden}`);
    const hataNotu = `\n\n## Worker Hatası (${new Date().toISOString().slice(0, 16)})\n\nSpec üretimi başarısız: ${neden}\n${(sonuc.hataCiktisi || sonuc.cikti).slice(0, 500)}\n\nDüzeltip görevi "Geldi" durumuna geri taşıyabilirsin.`;
    await eylemGonder(gorev.id, {
      eylem: "duzenle",
      govde: govdeKirp(gorev.govde + hataNotu),
    });
    await eylemGonder(gorev.id, { eylem: "tasi", durum: "hata" });
    return false;
  }

  await eylemGonder(gorev.id, {
    eylem: "duzenle",
    govde: govdeKirp(`${gorev.govde.trimEnd()}\n\n${sonuc.cikti}`),
  });
  await eylemGonder(gorev.id, { eylem: "tasi", durum: "spec" });
  log(`SPEC tamam: ${gorev.id} → onay bekliyor`);
  return true;
}

// ---------- aşama 2: işleme (kuyruk → inceleme | hata) ----------

async function gorevIsle(gorev) {
  log(`İŞLEME başlıyor: ${gorev.id} — ${gorev.baslik}`);
  await eylemGonder(gorev.id, { eylem: "tasi", durum: "yapiliyor" });

  const ekler = ekYollari(gorev.id);
  const ekBolumu =
    ekler.length > 0
      ? `\nEKLER:\n${ekler.map((y) => `- ${y}`).join("\n")}\n`
      : "";

  const prompt = `Sen ServiceCore otonom işleme ajanısın. Aşağıdaki ONAYLANMIŞ görevi uygula.

GÖREV (id: ${gorev.id} · proje: ${gorev.proje} · öncelik: ${gorev.oncelik}):
Başlık: ${gorev.baslik}

${gorev.govde}
${ekBolumu}
Kurallar:
- Çalışma dizinin: ${calismaDizini(gorev)} — oradaki CLAUDE.md ve kurallarına uy.
- Spec'teki alt-taskları SIRAYLA uygula; dosya değişikliklerinden sonra ilgili lint/typecheck'i çalıştır.
- git commit ve git push YAPMA — değişiklikler working tree'de kalsın, insan inceleyecek.
- Yıkıcı komut YASAK: rm -rf, force push, sudo, sistem ayarı değiştirme.
- Bitiremediğin/yapamadığın bir şey varsa dürüstçe HATA bildir, uydurma.
- Ürettiğin görsel/video çıktıları (MP4, PNG, PDF...) Levent panelde uzaktan izleyebilsin diye
  ${EKLER_KOK}/${gorev.id}/ klasörüne KOPYALA (cp; orijinali yerinde kalsın, klasörü gerekirse oluştur).
- Çıktının İLK SATIRI mutlaka şu ikisinden biri olmalı:
SONUC: TAMAM
SONUC: HATA
- Ardından "## Rapor" başlığı altında: ne yaptın, hangi dosyalar değişti, doğrulama sonuçları (lint/typecheck/test çıktısı özetleri), varsa kalan işler.`;

  cagriSay();
  const sonuc = await claudeCalistir({
    prompt,
    model: ISLEME_MODELI,
    araclar: ["Read", "Glob", "Grep", "Edit", "Write", "Bash", "TodoWrite", "WebFetch"],
    izinModu: "acceptEdits",
    zamanAsimi: ISLEME_ZAMAN_ASIMI,
    dizin: calismaDizini(gorev),
  });

  // Yarış koruması: claude çalışırken Levent görevi el ile taşımış olabilir.
  // Görev artık yapiliyor'da değilse rapor yazılmaz, sonuç çöpe gider.
  const guncel = (await gorevleriGetir()).find((g) => g.id === gorev.id);
  if (!guncel || guncel.durum !== "yapiliyor") {
    log(
      `İŞLEME iptal: ${gorev.id} el ile taşınmış (durum: ${guncel?.durum ?? "silinmiş"}) — sonuç yazılmadı`,
    );
    return false;
  }

  const basarili =
    !sonuc.zamanAsimi &&
    sonuc.kod === 0 &&
    /^SONUC:\s*TAMAM/m.test(sonuc.cikti.slice(0, 200));

  const damga = new Date().toISOString().slice(0, 16);
  const raporGovdesi = sonuc.zamanAsimi
    ? `Zaman aşımı (60 dk) — işlem yarıda kesildi.\n${sonuc.cikti.slice(-1000)}`
    : sonuc.cikti || sonuc.hataCiktisi.slice(0, 1000) || "(çıktı yok)";

  const yeniGovde = govdeKirp(
    `${guncel.govde.trimEnd()}\n\n## Worker Raporu (${damga})\n\n${raporGovdesi}`,
  );
  await eylemGonder(gorev.id, { eylem: "duzenle", govde: yeniGovde });
  await eylemGonder(gorev.id, {
    eylem: "tasi",
    durum: basarili ? "inceleme" : "hata",
  });
  log(
    `İŞLEME ${basarili ? "tamam" : "BAŞARISIZ"}: ${gorev.id} → ${basarili ? "inceleme" : "hata"}`,
  );
  return basarili;
}

// ---------- aşama: rapor (geldi|kuyruk → inceleme | hata) ----------
// Rapor görevleri spec/onay aşamasını ATLAR. Salt-okur araştırılır; bulgular
// hem gövdeye (kırpılmış) hem ekler/<id>/rapor-*.md'ye (tam metin) yazılır.

async function raporIsle(gorev) {
  log(`RAPOR başlıyor: ${gorev.id} — ${gorev.baslik}`);
  await eylemGonder(gorev.id, { eylem: "tasi", durum: "yapiliyor" });

  const ekler = ekYollari(gorev.id);
  const ekBolumu =
    ekler.length > 0
      ? `\nEKLER (Read aracıyla aç ve incele — görselleri görerek değerlendir):\n${ekler.map((y) => `- ${y}`).join("\n")}\n`
      : "";

  const prompt = `Sen ServiceCore görev panelinin ARAŞTIRMA/RAPOR ajanısın. Aşağıdaki görev bir RAPOR talebidir: kod yazmak/dosya değiştirmek DEĞİL, araştırıp bulgularını raporlamak.

GÖREV (id: ${gorev.id} · proje: ${gorev.proje} · öncelik: ${gorev.oncelik}):
Başlık: ${gorev.baslik}

${gorev.govde}
${ekBolumu}
Kurallar:
- Çalışma dizinin: ${calismaDizini(gorev)} — oradaki CLAUDE.md'yi dikkate al.
- SALT-OKUR çalış: Read/Glob/Grep + Bash (yalnız okuma/analiz; komutla DOSYA OLUŞTURMA/DEĞİŞTİRME yok) + WebFetch/WebSearch.
- git'e dokunma, hiçbir dosyayı değiştirme/silme, yıkıcı komut (rm -rf, sudo, force push...) YOK.
- Soruyu gerçek kaynaklardan (kod, dosya, web) doğrula; uydurma; emin değilsen "emin değilim" de ve nedenini yaz.
- Çıktının İLK SATIRI mutlaka şu ikisinden biri olmalı:
SONUC: TAMAM
SONUC: HATA
- Ardından "## Rapor" başlığı altında: soruya net cevap + bulgular + dayandığın kaynaklar/dosya yolları + (varsa) öneri. Markdown kullan, somut ol, gereksiz girişten kaçın.`;

  cagriSay();
  const sonuc = await claudeCalistir({
    prompt,
    model: ISLEME_MODELI,
    araclar: ["Read", "Glob", "Grep", "Bash", "WebFetch", "WebSearch", "TodoWrite"],
    zamanAsimi: ISLEME_ZAMAN_ASIMI,
    dizin: calismaDizini(gorev),
  });

  // Yarış koruması: claude çalışırken Levent görevi el ile taşımış olabilir.
  // Görev artık yapiliyor'da değilse rapor yazılmaz, sonuç çöpe gider.
  const guncel = (await gorevleriGetir()).find((g) => g.id === gorev.id);
  if (!guncel || guncel.durum !== "yapiliyor") {
    log(
      `RAPOR iptal: ${gorev.id} el ile taşınmış (durum: ${guncel?.durum ?? "silinmiş"}) — sonuç yazılmadı`,
    );
    return false;
  }

  const basarili =
    !sonuc.zamanAsimi &&
    sonuc.kod === 0 &&
    /^SONUC:\s*TAMAM/m.test(sonuc.cikti.slice(0, 200));

  const damga = new Date().toISOString().slice(0, 16);
  const ciktiMetni = sonuc.zamanAsimi
    ? `Zaman aşımı (60 dk) — araştırma yarıda kesildi.\n${sonuc.cikti.slice(-1000)}`
    : sonuc.cikti || sonuc.hataCiktisi.slice(0, 1000) || "(çıktı yok)";

  // Tam raporu ek olarak kaydet: gövde tavanına (GOVDE_TAVANI) takılmadan tam
  // metin korunur, Levent panelden ek olarak indirip okur. Worker yazar (ajan
  // salt-okur kaldı). Başarısızlıkta da eldeki kısmi çıktıyı saklamak için yazılır.
  let ekNotu = "";
  if (sonuc.cikti) {
    try {
      const klasor = path.join(EKLER_KOK, gorev.id);
      mkdirSync(klasor, { recursive: true });
      const dosyaAdi = `rapor-${damga.replace(/[:T]/g, "-")}.md`;
      writeFileSync(
        path.join(klasor, dosyaAdi),
        `# Rapor — ${gorev.baslik}\n\n_${damga} · ${gorev.id}_\n\n${sonuc.cikti}\n`,
      );
      ekNotu = `📄 Tam rapor eki: \`${dosyaAdi}\`\n\n`;
      log(`RAPOR eki yazıldı: ${gorev.id}/${dosyaAdi}`);
    } catch (hata) {
      log(`RAPOR eki yazılamadı: ${gorev.id} — ${hata.message}`);
    }
  }

  const yeniGovde = govdeKirp(
    `${guncel.govde.trimEnd()}\n\n## Worker Raporu (${damga})\n\n${ekNotu}${ciktiMetni}`,
  );
  await eylemGonder(gorev.id, { eylem: "duzenle", govde: yeniGovde });
  await eylemGonder(gorev.id, {
    eylem: "tasi",
    durum: basarili ? "inceleme" : "hata",
  });
  log(
    `RAPOR ${basarili ? "tamam" : "BAŞARISIZ"}: ${gorev.id} → ${basarili ? "inceleme" : "hata"}`,
  );
  return basarili;
}

// ---------- ana tur ----------

async function tur() {
  if (!existsSync(CLAUDE)) {
    log(`HATA: claude CLI bulunamadı: ${CLAUDE}`);
    return;
  }
  if (gunlukCagriSayisi() >= GUNLUK_CAGRI_LIMITI) {
    log(`günlük çağrı limiti dolu (${GUNLUK_CAGRI_LIMITI}) — tur atlanıyor`);
    return;
  }

  let gorevler;
  try {
    gorevler = await gorevleriGetir();
  } catch (hata) {
    log(`panel API erişilemiyor: ${hata.message} — tur atlanıyor`);
    return;
  }

  // Öksüz kurtarma: kilidi biz tuttuğumuza göre yapiliyor'daki her görev
  // yarıda kalmış bir önceki turdan kalmadır — kuyruğa geri alınır.
  const oksuzler = gorevler.filter((g) => g.durum === "yapiliyor");
  for (const oksuz of oksuzler) {
    log(`öksüz görev kurtarılıyor: ${oksuz.id} → kuyruk (önceki tur yarıda kalmış)`);
    try {
      await eylemGonder(oksuz.id, { eylem: "tasi", durum: "kuyruk" });
    } catch (hata) {
      log(`öksüz kurtarma başarısız: ${oksuz.id} — ${hata.message}`);
    }
  }
  if (oksuzler.length > 0) gorevler = await gorevleriGetir();

  // Tur bütçesi: en fazla 1 HAFİF (spec ~15dk) + 1 AĞIR (~60dk) iş. Böylece tur
  // süresi kilit-bayatlama eşiğinin (90dk) altında kalır, eşzamanlı worker doğmaz.
  // Rapor AĞIR olduğundan: "geldi"de rapor çalıştıysa bu tur ayrıca "kuyruk" işi
  // ALINMAZ (raporIsle+gorevIsle = ~120dk > 90dk olurdu). Kuyruk işi sonraki tura
  // (2dk sonra) kalır.
  const geldiSiradaki = siradakini(gorevler, "geldi");
  let geldiAgirCalisti = false;
  if (geldiSiradaki) {
    try {
      if (geldiSiradaki.tip === "rapor") {
        geldiAgirCalisti = true;
        await raporIsle(geldiSiradaki);
      } else {
        await specUret(geldiSiradaki);
      }
    } catch (hata) {
      log(`GELDI istisna: ${geldiSiradaki.id} — ${hata.message}`);
      // Rapor kolunda hata-taşımayı burada yaparız (specUret kendi hatasını
      // zaten içeride yönetir; onu ikinci kez taşımayız).
      if (geldiSiradaki.tip === "rapor") {
        try {
          await eylemGonder(geldiSiradaki.id, { eylem: "tasi", durum: "hata" });
        } catch {
          // panel de düştüyse görev yerinde kalır; sonraki tur kurtarır
        }
      }
    }
  }

  // "kuyruk": onaylanmış görev uygulanır; rapor (elle taşıma/öksüz) raporlanır.
  // geldi'de ağır iş (rapor) çalıştıysa bu tur atlanır (yukarıdaki bütçe notu).
  const kuyrukSiradaki = geldiAgirCalisti
    ? null
    : siradakini(gorevler, "kuyruk");
  if (kuyrukSiradaki) {
    try {
      if (kuyrukSiradaki.tip === "rapor") {
        await raporIsle(kuyrukSiradaki);
      } else {
        await gorevIsle(kuyrukSiradaki);
      }
    } catch (hata) {
      log(`KUYRUK istisna: ${kuyrukSiradaki.id} — ${hata.message}`);
      try {
        await eylemGonder(kuyrukSiradaki.id, { eylem: "tasi", durum: "hata" });
      } catch {
        // panel de düştüyse görev yapiliyor'da kalır; bayat kilit kırılınca
        // sonraki tur kullanıcı taşımasıyla kurtarılır
      }
    }
  }

  if (!geldiSiradaki && !kuyrukSiradaki) {
    // sessiz tur — log şişmesin diye yazmıyoruz
  }
}

// ---------- giriş ----------

if (!kilitAl()) {
  process.exit(0); // önceki tur sürüyor
}

try {
  await tur();
} catch (hata) {
  log(`tur istisnası: ${hata.message}`);
} finally {
  kilitBirak();
}
