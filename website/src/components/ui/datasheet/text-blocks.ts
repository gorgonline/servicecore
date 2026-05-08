import type { DatasheetItem } from "./types";

export type Block =
  | { kind: "para"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: { number: number; text: string }[] };

/**
 * `module.items` dizisini okunabilir bloklara dönüştürür:
 *  - Uzun paragraflar 2 cümlelik küçük paragraflara bölünür.
 *  - Metin içindeki gömülü "1.X 2.Y 3.Z" tarzı numaralı listeler ayrıştırılıp
 *    gerçek `<ol>` listesine çevrilir.
 *  - Ardışık `bullet` item'ları tek bir liste olarak gruplanır.
 */
export function transformItems(items: DatasheetItem[]): Block[] {
  const out: Block[] = [];
  let bulletBuf: { number: number; text: string }[] = [];

  function flushBullets() {
    if (bulletBuf.length > 0) {
      out.push({ kind: "list", items: bulletBuf });
      bulletBuf = [];
    }
  }

  for (const it of items) {
    if (it.kind === "bullet") {
      bulletBuf.push({
        number: it.number ?? bulletBuf.length + 1,
        text: it.text ?? "",
      });
      continue;
    }
    flushBullets();

    if (it.kind === "subheading") {
      out.push({ kind: "subheading", text: it.text ?? "" });
    } else if (it.kind === "para" || it.kind === "feature") {
      const expanded = parseTextToBlocks(it.text ?? "");
      for (const b of expanded) out.push(b);
    }
  }
  flushBullets();
  return out;
}

function parseTextToBlocks(text: string): Block[] {
  const numberedRe = /(\d+)\.\s*([A-ZÇĞIİÖŞÜ])/g;
  const matches = [...text.matchAll(numberedRe)];

  if (matches.length >= 3) {
    const blocks: Block[] = [];

    if (matches[0].index !== undefined && matches[0].index > 0) {
      const pre = text.slice(0, matches[0].index).trim();
      if (pre) {
        for (const chunk of chunkSentences(pre)) {
          blocks.push({ kind: "para", text: chunk });
        }
      }
    }

    const listItems: { number: number; text: string }[] = [];
    for (let i = 0; i < matches.length; i++) {
      const startIdx = matches[i].index ?? 0;
      const endIdx =
        i < matches.length - 1
          ? (matches[i + 1].index ?? text.length)
          : text.length;
      const segment = text.slice(startIdx, endIdx).trim();
      const cleaned = segment.replace(/^\d+\.\s*/, "").trim();
      listItems.push({
        number: parseInt(matches[i][1], 10),
        text: cleaned,
      });
    }
    blocks.push({ kind: "list", items: listItems });

    return blocks;
  }

  return chunkSentences(text).map((t) => ({ kind: "para" as const, text: t }));
}

function chunkSentences(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-ZÇĞIİÖŞÜ0-9“"])/);
  if (sentences.length <= 2) return [trimmed];

  const TARGET = 2;
  const chunks: string[] = [];
  let buf: string[] = [];
  for (const s of sentences) {
    buf.push(s.trim());
    if (buf.length >= TARGET) {
      chunks.push(buf.join(" "));
      buf = [];
    }
  }
  if (buf.length > 0) {
    if (chunks.length > 0) {
      chunks[chunks.length - 1] =
        chunks[chunks.length - 1] + " " + buf.join(" ");
    } else {
      chunks.push(buf.join(" "));
    }
  }
  return chunks;
}
