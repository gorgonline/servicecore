import {
  BookOpen,
  Bot,
  ChevronRight,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
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

export function ChatcoreSelfMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<MessageSquare className="w-3.5 h-3.5" />}
          title="Self-Service Portal · Asistan"
          meta="LYR · 14:08"
          accent={accent}
        />

        <div className="px-5 py-2.5 border-b border-white/8 bg-white/2 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/8 text-[11px] font-mono text-white/85">
            NA
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-white/85">Naz Aksoy</div>
            <div className="text-[10px] font-mono text-(--color-text-muted)">
              Akademisyen · Sosyal Bilimler Fakültesi
            </div>
          </div>
          <Chip tone="success">Aktif</Chip>
        </div>

        <div className="px-5 py-4 space-y-3.5 max-h-120 overflow-hidden relative">
          <div className="flex items-start gap-2.5">
            <span
              className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full ${accent.bg} ${accent.text} ring-1 ${accent.ring}`}
            >
              <Bot className="w-3.5 h-3.5" />
            </span>
            <div className={`flex-1 rounded-2xl rounded-tl-sm border ${accent.border} ${accent.bg} px-3.5 py-2.5`}>
              <p className="text-xs text-white/90 leading-relaxed">
                Merhaba Naz Hocam, size nasıl yardımcı olabilirim?
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 flex-row-reverse">
            <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/8 text-[10px] font-mono text-white/85">
              NA
            </span>
            <div className="flex-1 rounded-2xl rounded-tr-sm border border-white/10 bg-white/5 px-3.5 py-2.5">
              <p className="text-xs text-white/90 leading-relaxed text-right">
                Outlook açılmıyor, 5 dakika içinde sınav duyurusu göndermem lazım, ne yapabilirim?
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span
              className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full ${accent.bg} ${accent.text} ring-1 ${accent.ring}`}
            >
              <Bot className="w-3.5 h-3.5" />
            </span>
            <div className="flex-1 space-y-2">
              <div className={`rounded-2xl rounded-tl-sm border ${accent.border} ${accent.bg} px-3.5 py-2.5`}>
                <p className="text-xs text-white/90 leading-relaxed">
                  Bu durumu çözmenize yardımcı olabilecek{" "}
                  <span className={`${accent.text} font-medium`}>3 yöntem</span> buldum. Sürenizi
                  düşünerek en kısa olandan başlayabiliriz.
                </p>
              </div>
              <div className="space-y-1.5">
                <KbCard
                  accent={accent}
                  title="Outlook profilini sıfırla"
                  duration="2 dk"
                  match="92%"
                  recommended
                />
                <KbCard accent={accent} title="Outlook önbelleğini temizle" duration="3 dk" match="78%" />
                <KbCard accent={accent} title="Web Outlook üzerinden gönder" duration="30 sn" match="64%" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 flex-row-reverse">
            <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/8 text-[10px] font-mono text-white/85">
              NA
            </span>
            <div className="flex-1 rounded-2xl rounded-tr-sm border border-white/10 bg-white/5 px-3.5 py-2.5">
              <p className="text-xs text-white/90 leading-relaxed text-right">
                İlkini denedim, profil sıfırlandı ama hâlâ açılmıyor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span
              className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full ${accent.bg} ${accent.text} ring-1 ${accent.ring}`}
            >
              <Bot className="w-3.5 h-3.5" />
            </span>
            <div className="flex-1 space-y-2">
              <div className={`rounded-2xl rounded-tl-sm border ${accent.border} ${accent.bg} px-3.5 py-2.5`}>
                <p className="text-xs text-white/90 leading-relaxed">
                  Anladım. Geçici çözüm için <span className={`${accent.text} font-medium`}>web Outlook</span>{" "}
                  üzerinden duyurunuzu gönderebilirsiniz. Bu sırada IT ekibine bir kayıt açıyorum, taslağı
                  sizin için hazırladım:
                </p>
              </div>
              <PreFilledTicket accent={accent} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 bg-white/2 px-4 py-2.5 flex items-center gap-2">
          <div className="flex-1 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-xs text-white/40 italic">
            Bir soru sor veya yanıtla...
          </div>
          <button
            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${accent.bg} ${accent.text} ring-1 ${accent.ring} cursor-pointer`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="ChatcoreSelf · Bu Konuşma"
            meta="3 etkileşim"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-4">
            <div>
              <SectionLabel accent={accent}>Algılanan Niyet</SectionLabel>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-sm font-medium text-white">Outlook erişim sorunu</span>
                <Chip tone="warn">acil</Chip>
              </div>
              <div className="mt-1 text-[10px] font-mono text-(--color-text-muted)">
                güven %94 · sınav duyurusu bağlamı
              </div>
            </div>

            <div>
              <SectionLabel>KB Eşleşmesi</SectionLabel>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/85">Outlook profil sıfırlama</span>
                  <span className={`font-mono tabular-nums ${accent.text}`}>92%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/65">Outlook cache temizleme</span>
                  <span className="font-mono tabular-nums text-(--color-text-muted)">78%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/65">Web Outlook erişimi</span>
                  <span className="font-mono tabular-nums text-(--color-text-muted)">64%</span>
                </div>
              </div>
            </div>

            <div>
              <SectionLabel>Bağlam</SectionLabel>
              <div className="mt-1.5 space-y-1 text-[11px] text-white/75">
                <div className="flex justify-between">
                  <span>Cihaz</span>
                  <span className="font-mono text-(--color-text-muted)">LYR-LT-2147</span>
                </div>
                <div className="flex justify-between">
                  <span>Outlook sürümü</span>
                  <span className="font-mono text-(--color-text-muted)">2024 LTSC</span>
                </div>
                <div className="flex justify-between">
                  <span>Son ticket</span>
                  <span className="font-mono text-(--color-text-muted)">42 gün önce</span>
                </div>
              </div>
            </div>

            <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3`}>
              <div className="text-[10px] font-mono font-semibold tracking-[0.18em] text-white/85 mb-1">
                {trUpper("AI Aksiyonu")}
              </div>
              <p className="text-[11px] text-white/75 leading-snug">
                İlk çözüm denemesi başarısız → P2 acil önceliğiyle kategorize edilmiş ticket taslağı
                kullanıcıya sunuldu, geçici çözüm önerildi.
              </p>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<BookOpen className="w-3.5 h-3.5" />}
            title="Bu Hafta · Self-Service"
            accent={accent}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Etkileşim" value="2.847" trend="+18% hafta" trendTone="up" />
            <KpiTile label="Ticket'sız" value="68%" trend="çözüldü" trendTone="up" />
            <KpiTile label="Ort. Süre" value="3:42" trend="dk" trendTone="flat" />
            <KpiTile label="Memnuniyet" value="4.6" trend="↑ 0.2" trendTone="up" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface KbCardProps {
  accent: AccentClasses;
  title: string;
  duration: string;
  match: string;
  recommended?: boolean;
}

function KbCard({ accent, title, duration, match, recommended = false }: KbCardProps) {
  return (
    <div
      className={`rounded-lg border ${
        recommended ? accent.border : "border-white/8"
      } ${recommended ? accent.bg : "bg-white/3"} px-3 py-2 flex items-center gap-3`}
    >
      <span
        className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md ${accent.bg} ${accent.text}`}
      >
        <BookOpen className="w-3 h-3" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-white/90 truncate">{title}</div>
        <div className="text-[10px] font-mono text-(--color-text-muted)">~{duration} · KB makalesi</div>
      </div>
      {recommended && <Chip tone="info">önerilen</Chip>}
      <div
        className={`shrink-0 text-[10px] font-mono tabular-nums ${
          recommended ? accent.text : "text-(--color-text-muted)"
        }`}
      >
        {match}
      </div>
      <ChevronRight className="w-3 h-3 text-(--color-text-muted) shrink-0" />
    </div>
  );
}

function PreFilledTicket({ accent }: { accent: AccentClasses }) {
  return (
    <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3.5`}>
      <div className="flex items-center gap-2 mb-2.5">
        <FileText className={`w-3.5 h-3.5 ${accent.text}`} />
        <span className="text-[10px] font-mono font-semibold tracking-[0.18em] text-white/85">
          {trUpper("Hazırlanan Ticket Taslağı")}
        </span>
        <AiBadge label="otomatik" accent={accent} pulse={false} />
      </div>
      <div className="space-y-1.5 text-[11px]">
        <div className="flex">
          <span className="w-20 text-(--color-text-muted)">Kategori</span>
          <span className="text-white/85">İstemci · E-posta</span>
        </div>
        <div className="flex">
          <span className="w-20 text-(--color-text-muted)">Öncelik</span>
          <span className="text-white/85">P2 · Acil (sınav duyurusu)</span>
        </div>
        <div className="flex">
          <span className="w-20 text-(--color-text-muted)">Cihaz</span>
          <span className="font-mono text-white/85">LYR-LT-2147</span>
        </div>
        <div className="flex">
          <span className="w-20 text-(--color-text-muted)">Denenen</span>
          <span className="text-white/85">Outlook profili sıfırlandı, sonuç vermedi</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/8 flex items-center gap-2 justify-end">
        <button className="text-[10px] font-mono px-2 py-1 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
          Düzenle
        </button>
        <button
          className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}
        >
          Onayla &amp; Aç
        </button>
      </div>
    </div>
  );
}
