/*
 * ServiceCore — Müşteri toplantısı derin-analiz raporu üretici (marka tasarımı, beyaz zemin).
 * Kullanım: node build_report.js <content.json yolu> <çıktı .docx yolu>
 * content.json şeması için ../references/rapor-format.md
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType, PageNumber, Header, Footer
} = require("docx");

// ---- ServiceCore brand palette (white-surface document) ----
const INK     = "010E21"; // brand surface.base → near-black headings
const PRIMARY = "0070F3"; // brand.primary
const PRIMARY_DK = "005CCC";
const BODY    = "334155"; // slate-700 govde
const MUTED   = "64748B"; // text.muted
const FAINT   = "94A3B8"; // text.secondary
const EMERALD = "059669"; // olgu (brand.secondary, white'ta okunur ton)
const AMBER   = "B45309"; // orta güven
const RED      = "DC2626"; // risk
const BORDER  = "E2E8F0"; // slate-200 ince çizgi
const TINT    = "EFF4FF"; // çok açık primary tint (etiket hücresi)
const ROW     = "F8FAFC"; // slate-50
const FONT    = "Arial";  // Geist her Word'de kurulu olmadığından güvenli, marka-nötr eş; tek satırda değiştirilebilir

const FILL = { PRIMARY, INK, RED };

// ---- inline markup → TextRun[] ----
const TAGS = {
  olgu: { t: " [Olgu] ", c: EMERALD },
  cy:   { t: " [Çıkarım · güven: yüksek] ", c: PRIMARY },
  coy:  { t: " [Çıkarım · güven: orta-yüksek] ", c: PRIMARY },
  co:   { t: " [Çıkarım · güven: orta] ", c: AMBER },
  cd:   { t: " [Çıkarım · güven: düşük] ", c: MUTED },
};
function parseRuns(text, baseColor) {
  if (text == null) text = "";
  const out = [];
  const re = /(\*\*[^*]+\*\*|\{\{[a-z]+\}\})/g;
  let last = 0, m;
  const push = (t) => { if (t) out.push(new TextRun(baseColor ? { text: t, color: baseColor } : { text: t })); };
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(new TextRun({ text: tok.slice(2, -2), bold: true, color: INK }));
    } else {
      const tg = TAGS[tok.slice(2, -2)];
      if (tg) out.push(new TextRun({ text: tg.t, color: tg.c, bold: true, size: 15 }));
      else push(tok);
    }
    last = re.lastIndex;
  }
  if (last < text.length) push(text.slice(last));
  return out.length ? out : [new TextRun("")];
}

// ---- builders ----
function H1(t) {
  // "N · Başlık" → numarayı primary, başlığı ink yap
  const mm = /^(\S+\s·\s)(.*)$/.exec(t);
  const runs = mm
    ? [new TextRun({ text: mm[1], bold: true, color: PRIMARY, size: 28 }), new TextRun({ text: mm[2], bold: true, color: INK, size: 28 })]
    : [new TextRun({ text: t, bold: true, color: INK, size: 28 })];
  return new Paragraph({
    spacing: { before: 300, after: 130 }, outlineLevel: 0,
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BORDER, space: 4 } },
    children: runs,
  });
}
const H2 = (t) => new Paragraph({ spacing: { before: 200, after: 90 }, outlineLevel: 1,
  children: [new TextRun({ text: t, bold: true, color: PRIMARY_DK, size: 22 })] });
const Pp = (t) => new Paragraph({ spacing: { after: 130, line: 268 }, children: parseRuns(t, BODY) });
const Bul = (t) => new Paragraph({ numbering: { reference: "b", level: 0 }, spacing: { after: 90, line: 264 }, children: parseRuns(t, BODY) });
const Num = (t) => new Paragraph({ numbering: { reference: "n", level: 0 }, spacing: { after: 110, line: 264 }, children: parseRuns(t, BODY) });

const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, w, opts = {}) {
  let runs;
  if (opts.header) runs = [new TextRun({ text, bold: true, color: "FFFFFF", size: 19 })];
  else if (opts.label) runs = parseRuns("**" + text.replace(/\*\*/g, "") + "**", BODY);
  else runs = parseRuns(text, BODY);
  return new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    children: [new Paragraph({ spacing: { after: 0, line: 252 }, children: runs })],
  });
}
const TOTAL = 9360;
function buildTable(tbl) {
  const n = tbl.head.length;
  const widths = n === 3 ? [2200, 3680, 3480] : [2700, 6660];
  const headFill = FILL[tbl.fill] || PRIMARY;
  const rows = [new TableRow({ tableHeader: true, children: tbl.head.map((h, i) => cell(h, widths[i], { header: true, fill: headFill })) })];
  tbl.rows.forEach((r, ri) => {
    rows.push(new TableRow({ children: r.map((c, i) =>
      cell(c, widths[i], i === 0 ? { label: true, fill: TINT } : (ri % 2 ? { fill: ROW } : {}))) }));
  });
  return new Table({ width: { size: TOTAL, type: WidthType.DXA }, columnWidths: widths, rows });
}

function render(s) {
  if (s.h1 !== undefined) return [H1(s.h1)];
  if (s.h2 !== undefined) return [H2(s.h2)];
  if (s.p !== undefined) return [Pp(s.p)];
  if (s.bul !== undefined) return s.bul.map(Bul);
  if (s.num !== undefined) return s.num.map(Num);
  if (s.table !== undefined) return [buildTable(s.table), new Paragraph({ spacing: { after: 60 }, children: [] })];
  return [];
}

// ---- main ----
const contentPath = process.argv[2], outPath = process.argv[3];
if (!contentPath || !outPath) { console.error("Kullanım: node build_report.js <content.json> <çıktı.docx>"); process.exit(1); }
const data = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const meta = data.meta || {};
const children = [];

// --- Başlık bloğu: logo lockup + overline + başlık + alt başlık + primary çizgi ---
const lockup = [];
try {
  const logoPath = path.join(__dirname, "..", "assets", "logo.png");
  const logo = fs.readFileSync(logoPath);
  lockup.push(new ImageRun({ type: "png", data: logo, transformation: { width: 30, height: 30 },
    altText: { title: "ServiceCore", description: "ServiceCore logo", name: "logo" } }));
  lockup.push(new TextRun({ text: "  ServiceCore", bold: true, color: INK, size: 24 }));
} catch (e) {
  lockup.push(new TextRun({ text: "ServiceCore", bold: true, color: INK, size: 24 }));
}
children.push(new Paragraph({ spacing: { after: 220 }, children: lockup }));

children.push(new Paragraph({ spacing: { after: 60 },
  children: [new TextRun({ text: (meta.ust || "MÜŞTERİ TOPLANTISI · DERİN ANALİZ"), bold: true, color: PRIMARY, size: 17, characterSpacing: 36 })] }));
children.push(new Paragraph({ spacing: { after: 40 },
  children: [new TextRun({ text: meta.baslik || "Müşteri Analizi", bold: true, color: INK, size: 38 })] }));
if (meta.altbaslik) children.push(new Paragraph({ spacing: { after: 140 },
  children: [new TextRun({ text: meta.altbaslik, color: MUTED, size: 21 })] }));
children.push(new Paragraph({ spacing: { after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: PRIMARY, space: 1 } }, children: [] }));
children.push(new Paragraph({ spacing: { after: 200 },
  children: [new TextRun({ text: meta.altbilgi || "Gizli", italics: true, color: FAINT, size: 17 })] }));

// --- Taraflar ---
if (Array.isArray(data.taraflar) && data.taraflar.length) {
  children.push(H2("Taraflar"));
  children.push(new Table({ width: { size: TOTAL, type: WidthType.DXA }, columnWidths: [2700, 6660],
    rows: data.taraflar.map(([k, v]) => new TableRow({ children: [
      cell(k, 2700, { header: true, fill: INK }), cell(v, 6660),
    ] })) }));
  children.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
}

for (const s of (data.sections || [])) for (const node of render(s)) children.push(node);

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 21, color: BODY } } } },
  numbering: { config: [
    { reference: "b", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 460, hanging: 250 } } } }] },
    { reference: "n", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 470, hanging: 260 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1400, right: 1440, bottom: 1400, left: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "SERVICECORE · MÜŞTERİ ANALİZİ — GİZLİ", color: FAINT, size: 14, characterSpacing: 20 })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Gorgo Agency · Servicecore Bilgi Teknolojileri A.Ş. · GİZLİ · sayfa ", color: MUTED, size: 15 }),
                 new TextRun({ children: [PageNumber.CURRENT], color: MUTED, size: 15 })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(outPath, buf); console.log("WROTE " + outPath + " (" + buf.length + " bytes)"); });
