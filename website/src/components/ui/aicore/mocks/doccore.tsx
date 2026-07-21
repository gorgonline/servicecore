import {
  Check,
  CheckCircle2,
  FileText,
  Layers,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
  trUpper,
} from "../primitives";

// Sahne, DocCore motorunun gerçek bir koşusundaki kart yapısını yansıtır:
// belge → sayfa korumalı parça → kaynak-dayanaklı kart → denetim → uzman onayı.

const ADIMLAR: { text: string; ref: string }[] = [
  { text: "Bireysel hesap ve şifreleri koruyun; şifreyi kimseyle paylaşmayın, başkasının hesabınızı kullanmasına izin vermeyin.", ref: "s.4" },
  { text: "Hesap bilgilerinin ifşa edildiğinden şüpheleniyorsanız şifreyi derhal değiştirin ve bilgi varlığı sahibine bildirin.", ref: "s.4" },
  { text: "Hesaptan çıkış yapın; bilgisayardan uzaklaşırken ekran kilidini kullanın.", ref: "s.4" },
  { text: "Yönetici hesap bilgilerini yetkisiz kullanıcılarla asla paylaşmayın.", ref: "s.4" },
];

interface DocJob {
  belge: string;
  meta: string;
  yayin: number;
  onay: number;
  elenen: number;
  current?: boolean;
}

const SIRA: DocJob[] = [
  {
    belge: "Hesap Yönetimi ve Erişim Prosedürü.pdf",
    meta: "7 parça · bitti",
    yayin: 1,
    onay: 4,
    elenen: 2,
    current: true,
  },
  {
    belge: "Değişim Yönetimi Pratiği.pdf",
    meta: "21 parça · 36 dk",
    yayin: 3,
    onay: 11,
    elenen: 7,
  },
];

export function DocCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<FileText className="w-3.5 h-3.5" />}
          title="DocCore · Onay Paneli"
          meta="Hesap Yönetimi ve Erişim Prosedürü.pdf"
          accent={accent}
        />

        <div className="px-5 py-4 border-b border-white/8 bg-white/2 flex flex-wrap items-center gap-2">
          <AiBadge label="belgeden üretildi" accent={accent} />
          <Chip tone="info">Prosedür</Chip>
          <Chip>kaynak: sayfa 4</Chip>
          <Chip tone="success">yeni — kopya değil</Chip>
          <span className="ml-auto text-[10px] font-mono text-(--color-text-muted)">
            uzman onayı bekliyor
          </span>
        </div>

        <div className="px-6 py-5">
          <h4 className="text-base font-semibold text-white tracking-tight leading-snug">
            Kullanıcı Hesap Güvenliği ve Şifre Yönetimi
          </h4>

          <div className="mt-5 space-y-4">
            <Section accent={accent} label="Problem Özeti">
              Personelin ve dış paydaşların bireysel hesaplarını koruma, şifre paylaşımını
              engelleme ve yetkisiz erişimi önleme yükümlülükleri bu bölümde tanımlanır.
            </Section>

            <Section accent={accent} label="Çözüm Adımları · her adım kaynak sayfasıyla">
              <ol className="space-y-2 mt-1">
                {ADIMLAR.map((a, i) => (
                  <StepRow key={i} n={i + 1} refChip={a.ref} accent={accent}>
                    {a.text}
                  </StepRow>
                ))}
              </ol>
            </Section>

            <Section accent={accent} label="Kaynak">
              <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg border border-white/8 bg-white/2">
                <FileText className={`w-3 h-3 ${accent.text} shrink-0`} />
                <span className="text-xs text-white/85 truncate flex-1">
                  Hesap Yönetimi ve Erişim Prosedürü.pdf
                </span>
                <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">
                  sayfa 4
                </span>
              </div>
              <p className="mt-1.5 text-[10px] font-mono text-(--color-text-muted)">
                Model yalnızca bu parçayı gördü — sayfa dışına atıf veremez.
              </p>
            </Section>
          </div>

          <div className="mt-5 pt-4 border-t border-white/8">
            <div className="flex items-center gap-2">
              <button
                className={`flex-1 text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5`}
              >
                <Check className="w-3 h-3" />
                Onayla ve bilgi bankasına ekle
              </button>
              <button className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer inline-flex items-center gap-1.5">
                <X className="w-3 h-3" />
                Reddet
              </button>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
              <Lock className="w-3 h-3" />
              Kart incelenmeden onay butonu kilitli kalır — damga basmaya kapalı
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<ShieldCheck className="w-3.5 h-3.5" />}
            title="Denetim Rozetleri"
            meta="kart temiz"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-baseline justify-between mb-1 text-[11px]">
              <span className="text-white/85">Motorun karta güveni</span>
              <span className={`font-mono tabular-nums ${accent.text}`}>%95</span>
            </div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden mb-4">
              <div className={`h-full rounded-full ${accent.dot}`} style={{ width: "95%" }} />
            </div>
            <div className="space-y-2.5">
              <CheckRow>Sayfa atıfları gördüğü aralıkta — 5/5</CheckRow>
              <CheckRow>Destekleyen alıntılar kaynakta birebir bulundu</CheckRow>
              <CheckRow>Çift yargıç temiz · onarım turu 0</CheckRow>
              <CheckRow>Yakın kopya taraması: yeni kart</CheckRow>
            </div>
          </div>
        </MockFrame>

        <MockFrame className={accent.glow}>
          <TitleBar
            icon={<Layers className="w-3.5 h-3.5" />}
            title="Belge İşleme Sırası"
            meta="2 belge"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3">
            {SIRA.map((j) => (
              <DocJobRow key={j.belge} job={j} accent={accent} />
            ))}
            <div className="flex items-center gap-3 pt-1 text-[9px] font-mono text-(--color-text-muted)">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> yayına hazır
              </span>
              <span className="inline-flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} /> uzman onayında
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> kart çıkmadı (gürültü)
              </span>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<FileText className="w-3.5 h-3.5" />}
            title="Bu Ay · DocCore"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="İşlenen Belge" value="12" trend="pdf · word · web" trendTone="up" />
            <KpiTile label="Üretilen Kart" value="86" trend="sayfa referanslı" trendTone="up" />
            <KpiTile label="Uzman Onayı" value="71" trend="insan kararı" trendTone="up" />
            <KpiTile label="Hayalet Atıf" value="9" trend="yakalandı" trendTone="down" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface SectionProps {
  accent: AccentClasses;
  label: string;
  children: ReactNode;
}

function Section({ accent, label, children }: SectionProps) {
  return (
    <div>
      <SectionLabel accent={accent}>{label}</SectionLabel>
      <div className="mt-1.5 text-sm font-light text-white/85 leading-relaxed">{children}</div>
    </div>
  );
}

interface StepRowProps {
  n: number;
  refChip: string;
  accent: AccentClasses;
  children: ReactNode;
}

function StepRow({ n, refChip, accent, children }: StepRowProps) {
  return (
    <li className="flex items-start gap-3 text-sm font-light text-white/85 leading-relaxed">
      <span className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/15 bg-white/4 text-[10px] font-mono tabular-nums text-white/85 mt-0.5">
        {n}
      </span>
      <span className="flex-1">{children}</span>
      <span
        className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} text-[9px] font-mono font-semibold mt-0.5`}
      >
        {trUpper(refChip)}
      </span>
    </li>
  );
}

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
      <span className="text-[11px] text-white/85 leading-snug">{children}</span>
    </div>
  );
}

interface DocJobRowProps {
  job: DocJob;
  accent: AccentClasses;
}

function DocJobRow({ job, accent }: DocJobRowProps) {
  const toplam = job.yayin + job.onay + job.elenen;
  const pct = (n: number) => `${((n / toplam) * 100).toFixed(0)}%`;
  return (
    <div
      className={`rounded-xl border ${job.current ? accent.border : "border-white/8"} ${
        job.current ? accent.bg : "bg-white/2"
      } p-3`}
    >
      <div className="flex items-center gap-2">
        <FileText className={`w-3 h-3 ${job.current ? accent.text : "text-(--color-text-muted)"} shrink-0`} />
        <span className="text-xs text-white/90 font-medium truncate flex-1">{job.belge}</span>
        <span className="text-[10px] font-mono text-(--color-text-muted) shrink-0">{job.meta}</span>
      </div>
      <div className="mt-2 flex h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full bg-emerald-400" style={{ width: pct(job.yayin) }} />
        <div className={`h-full ${accent.dot}`} style={{ width: pct(job.onay) }} />
        <div className="h-full bg-white/30" style={{ width: pct(job.elenen) }} />
      </div>
      <div className="mt-1.5 text-[10px] font-mono text-(--color-text-muted)">
        {job.yayin} yayına hazır · {job.onay} uzman onayında · {job.elenen} kart çıkmadı
      </div>
    </div>
  );
}
