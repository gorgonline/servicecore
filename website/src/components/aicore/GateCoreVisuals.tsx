import {
  Ban,
  CircleCheck,
  Eye,
  FileClock,
  ScrollText,
  ShieldAlert,
  Waypoints,
} from "lucide-react";
import {
  Chip,
  KpiTile,
  MockFrame,
  TitleBar,
  resolveAccent,
  trUpper,
} from "@/components/ui/aicore/primitives";

// GateCoreAI sayfasinin gorsel panelleri. Sahnelerde sentetik veri kullanilir;
// gercek musteri verisi degildir.

const accent = resolveAccent("indigo");

/* ── 1. Kapıdan geçen canlı trafik ───────────────────────────────────── */

type Karar = "izin" | "onay" | "blok";

const TRAFIK: {
  ajan: string;
  islem: string;
  kapsam: string;
  karar: Karar;
}[] = [
  { ajan: "Kurum Asistanı", islem: "Kayıt okuma · 12 kayıt", kapsam: "okuma", karar: "izin" },
  { ajan: "Gece Otomasyonu", islem: "Durum güncelleme · 3 kayıt", kapsam: "yazma (tanımlı)", karar: "izin" },
  { ajan: "Kurum Asistanı", islem: "Toplu güncelleme · 38.412 kayıt", kapsam: "tanımsız", karar: "onay" },
  { ajan: "Dış Danışman Botu", islem: "Varlık envanteri dışa aktarma", kapsam: "kapsam dışı", karar: "blok" },
  { ajan: "Çözüm Asistanı", islem: "Bilgi bankası araması · 6 makale", kapsam: "okuma", karar: "izin" },
];

const KARAR_GORUNUM: Record<Karar, { etiket: string; tone: "success" | "warn" | "danger" }> = {
  izin: { etiket: "İzin verildi", tone: "success" },
  onay: { etiket: "Onaya düştü", tone: "warn" },
  blok: { etiket: "Engellendi", tone: "danger" },
};

export function GateCoreTrafik() {
  return (
    <MockFrame className={accent.glow}>
      <TitleBar
        icon={<Waypoints className="w-3.5 h-3.5" />}
        title="Kapıdan geçen trafik"
        meta="CANLI"
        accent={accent}
      />
      <div className="divide-y divide-white/6">
        {TRAFIK.map((t, i) => {
          const k = KARAR_GORUNUM[t.karar];
          return (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <span
                className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg ${
                  t.karar === "blok"
                    ? "bg-red-500/12 text-red-300"
                    : t.karar === "onay"
                      ? "bg-amber-500/12 text-amber-300"
                      : "bg-emerald-500/12 text-emerald-300"
                }`}
              >
                {t.karar === "blok" ? (
                  <Ban className="w-3.5 h-3.5" />
                ) : t.karar === "onay" ? (
                  <FileClock className="w-3.5 h-3.5" />
                ) : (
                  <CircleCheck className="w-3.5 h-3.5" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-white truncate">{t.islem}</div>
                <div className="text-[11px] font-mono text-(--color-text-muted) truncate">
                  {t.ajan} · yetki: {t.kapsam}
                </div>
              </div>
              <Chip tone={k.tone}>{k.etiket}</Chip>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3 border-t border-white/8 bg-white/2 text-[10px] font-mono text-(--color-text-muted)">
        {trUpper("Her satır kimlik, yetki kapsamı ve sonuçla birlikte kayda geçer")}
      </div>
    </MockFrame>
  );
}

/* ── 2. Onay kuyruğu ─────────────────────────────────────────────────── */

const KUYRUK = [
  {
    baslik: "38.412 kaydın çözüm tarihi güncellenecek",
    ajan: "Kurum Asistanı",
    gerekce: "Talimatta tarih aralığı belirtilmemiş; kapsam beklenenden geniş.",
    etki: "Etkilenecek son kullanıcı: 5.104 · bildirim gidecek",
    durum: "Durduruldu — onay bekliyor",
  },
  {
    baslik: "300 varlık kaydı güncellenecek",
    ajan: "Keşif Entegrasyonu",
    gerekce: "Her sabah 06:00'da tekrarlanan tanımlı iş.",
    etki: "Tanımlı kapsam içinde · veri kaybı riski yok",
    durum: "Rutin olarak işaretlendi — bir daha sorulmayacak",
  },
];

export function GateCoreOnayKuyrugu() {
  return (
    <MockFrame className={accent.glow}>
      <TitleBar
        icon={<ShieldAlert className="w-3.5 h-3.5" />}
        title="Onay kuyruğu"
        meta="2 KAYIT"
        accent={accent}
      />
      <div className="p-5 space-y-3">
        {KUYRUK.map((k, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 ${
              i === 0 ? "border-amber-500/30 bg-amber-500/5" : "border-white/8 bg-white/2"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="text-[13px] font-semibold text-white leading-snug">{k.baslik}</h4>
              <Chip tone={i === 0 ? "warn" : "success"}>{i === 0 ? "Beklemede" : "Rutin"}</Chip>
            </div>
            <div className="space-y-1 text-[11.5px] font-light leading-relaxed text-(--color-text-secondary)">
              <div>
                <span className="font-mono text-[10px] text-(--color-text-muted)">İSTEYEN</span>{" "}
                {k.ajan}
              </div>
              <div>
                <span className="font-mono text-[10px] text-(--color-text-muted)">GEREKÇE</span>{" "}
                {k.gerekce}
              </div>
              <div>
                <span className="font-mono text-[10px] text-(--color-text-muted)">ETKİ</span> {k.etki}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-(--color-text-muted)">{k.durum}</span>
              {i === 0 && (
                <div className="flex gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-white/8 text-[10px] font-medium text-white/80">
                    Reddet
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-(--color-brand-primary)/80 text-[10px] font-medium text-white">
                    Onayla
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

/* ── 3. Denetim kaydı ────────────────────────────────────────────────── */

const KAYITLAR = [
  { saat: "03:14", ajan: "Gece Otomasyonu", sorumlu: "A. Yılmaz", is: "3 kayıt kapatıldı", maske: "2 alan maskelendi" },
  { saat: "03:21", ajan: "Kurum Asistanı", sorumlu: "M. Demir", is: "12 kayıt okundu", maske: "7 alan maskelendi" },
  { saat: "03:22", ajan: "Dış Danışman Botu", sorumlu: "—", is: "Envanter dışa aktarma", maske: "engellendi" },
  { saat: "06:00", ajan: "Keşif Entegrasyonu", sorumlu: "S. Kaya", is: "300 varlık güncellendi", maske: "maskeleme gerekmedi" },
];

export function GateCoreDenetim() {
  return (
    <MockFrame className={accent.glow}>
      <TitleBar
        icon={<ScrollText className="w-3.5 h-3.5" />}
        title="Denetim kaydı"
        meta="SON 24 SAAT"
        accent={accent}
      />
      <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <KpiTile label="İstek" value="1.284" />
        <KpiTile label="Onaya düşen" value="6" />
        <KpiTile label="Engellenen" value="2" trend="kapsam dışı" trendTone="down" />
        <KpiTile label="Maskelenen alan" value="418" />
      </div>
      <div className="divide-y divide-white/6 border-t border-white/8">
        {KAYITLAR.map((k, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-2.5">
            <span className="text-[10px] font-mono text-(--color-text-muted) w-11 shrink-0">{k.saat}</span>
            <span className="text-[12px] text-white/85 flex-1 min-w-0 truncate">{k.is}</span>
            <span className="text-[10px] font-mono text-(--color-text-muted) hidden sm:block truncate max-w-40">
              {k.ajan} → {k.sorumlu}
            </span>
            <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0 hidden md:flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {k.maske}
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-white/8 bg-white/2 text-[10px] font-mono text-(--color-text-muted)">
        {trUpper("İşi hangi yazılım yaptı, kimin sorumluluğunda, hangi veriyi gördü")}
      </div>
    </MockFrame>
  );
}
