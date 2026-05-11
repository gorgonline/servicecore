import {
  AlertOctagon,
  CheckCircle2,
  MessageCircle,
  Mic,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import {
  type AccentClasses,
  AiBadge,
  Chip,
  KpiTile,
  MockFrame,
  TitleBar,
  resolveAccent,
} from "../primitives";

export function ToneCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<MessageCircle className="w-3.5 h-3.5" />}
          title="Yanıt Yaz · INC-2847"
          meta="Mert Kaya · taslak"
          accent={accent}
        />

        <div className="px-5 py-3 border-b border-white/8 bg-white/2 flex items-center gap-2">
          <span className="text-[10px] font-mono text-(--color-text-muted)">
            Alıcı:
          </span>
          <Chip>Selin Yıldız · Birikim Holding</Chip>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-300">
            <AlertOctagon className="w-3 h-3" />3 ton uyarısı
          </span>
        </div>

        <div className="px-5 py-4">
          <div className="rounded-xl border border-white/10 bg-white/2 p-4 min-h-70">
            <p className="text-sm text-white/90 leading-relaxed">
              Sayın Yıldız,
              <br />
              <br />
              <span className="bg-red-500/16 border-b border-dashed border-red-400/60 text-red-100 px-0.5 rounded-sm">
                Bu sorunun bu ay 5. kez bildirildiğini biliyor olmalısınız
              </span>
              . Posta sunucumuzda{" "}
              <span className="bg-amber-500/18 border-b border-dashed border-amber-400/60 text-amber-100 px-0.5 rounded-sm">
                queue depth
              </span>{" "}
              eşik üstüne çıktığında{" "}
              <span className="bg-amber-500/18 border-b border-dashed border-amber-400/60 text-amber-100 px-0.5 rounded-sm">
                failover
              </span>{" "}
              tetiklenmedi, bu yüzden trafiği manuel olarak ikinciye aktardım.
              <br />
              <br />
              <span className="bg-red-500/16 border-b border-dashed border-red-400/60 text-red-100 px-0.5 rounded-sm">
                Şube yöneticilerinin sürekli aynı şikayeti getirmesi yerine
              </span>{" "}
              sistem panelinden günlük durum raporlarını takip etmesini rica ediyorum.
              <br />
              <br />
              İyi çalışmalar.
              <br />
              Mert Kaya · L2 Mesajlaşma
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] font-mono text-(--color-text-muted)">
              <span>87 kelime</span>
              <span>·</span>
              <span>okuma 24sn</span>
              <span>·</span>
              <span className="text-amber-300">Ton skoru 4.2/10</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`text-[11px] font-mono px-2.5 py-1.5 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer inline-flex items-center gap-1.5`}
              >
                <Wand2 className="w-3 h-3" />
                AI Düzeltmesini Uygula
              </button>
              <button
                disabled
                className="text-[11px] font-mono px-2.5 py-1.5 rounded-md border border-white/8 bg-white/2 text-white/30 cursor-not-allowed inline-flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                Gönder
              </button>
            </div>
          </div>
        </div>
      </MockFrame>

      <div className="space-y-4">
        <MockFrame>
          <TitleBar
            icon={<Mic className="w-3.5 h-3.5" />}
            title="Ton Profili"
            meta="kurumsal hedef"
            accent={accent}
          />
          <div className="px-5 py-4 space-y-3.5">
            <ToneAxis label="Empati" current={2.8} target={7.5} accent={accent} />
            <ToneAxis label="Netlik" current={6.4} target={8} accent={accent} />
            <ToneAxis label="Saygı" current={4.0} target={9} accent={accent} />
            <ToneAxis label="Kısalık" current={7.2} target={6.5} accent={accent} aboveTarget />
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar
            icon={<AlertOctagon className="w-3.5 h-3.5" />}
            title="Kurumsal Stil İhlalleri"
            accent={accent}
          />
          <div className="divide-y divide-white/6">
            <Violation
              tone="defensive"
              title="Savunmacı dil"
              quote="“Bu sorunun bu ay 5. kez bildirildiğini biliyor olmalısınız.”"
              suggestion="Olayı kabul edip neyi farklı yapacağımızı söyleyelim."
            />
            <Violation
              tone="defensive"
              title="Müşteriyi suçlama"
              quote="“Şube yöneticilerinin sürekli aynı şikayeti getirmesi yerine…”"
              suggestion="Çözümü taahhüt edelim, sorgulamayalım."
            />
            <Violation
              tone="jargon"
              title="Anlaşılmaz teknik dil"
              quote="“queue depth, failover”"
              suggestion="“e-posta kuyruğu”, “yedek sunucuya geçiş”"
            />
          </div>
        </MockFrame>

        <MockFrame className={`border ${accent.border}`}>
          <TitleBar
            icon={<Sparkles className="w-3.5 h-3.5" />}
            title="Önerilen Versiyon"
            accent={accent}
          />
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <AiBadge label="ton 8.7/10" accent={accent} pulse={false} />
              <Chip tone="success">empatik · net</Chip>
            </div>
            <p className="text-xs text-white/85 leading-relaxed">
              Sayın Yıldız,
              <br />
              <br />
              Bu kesintinin tekrar etmesinden dolayı önce özür dilerim. Posta sunucumuzda e-posta
              kuyruğu eşik aşıldığında yedek sunucuya geçiş otomatik tetiklenmedi; trafiği şu an
              manuel olarak ikinci sunucuya aktardım,{" "}
              <span className={`${accent.text} font-medium`}>10 dakika içinde</span> tüm gönderim
              akışı normale dönecek.
              <br />
              <br />
              Bu otomatik geçişin neden tetiklenmediğini araştırıyoruz, kalıcı çözümün durumunu yarın
              09:00&apos;a kadar size yine ben raporlayacağım.
            </p>
            <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
              <span className="text-[10px] font-mono text-(--color-text-muted)">
                64 kelime · okuma 18sn
              </span>
              <button
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}
              >
                Bu versiyonu kullan
              </button>
            </div>
          </div>
        </MockFrame>

        <MockFrame>
          <TitleBar icon={<Mic className="w-3.5 h-3.5" />} title="Bu Hafta · Tone" accent={accent} />
          <div className="px-4 py-3 grid grid-cols-2 gap-2">
            <KpiTile label="Analiz" value="3.412" trend="mesaj" trendTone="up" />
            <KpiTile label="Düzeltildi" value="847" trend="otomatik" trendTone="up" />
            <KpiTile label="Ort. Ton" value="7.8" trend="↑ 0.6" trendTone="up" />
            <KpiTile label="CSAT etkisi" value="+0.4" trend="ay" trendTone="up" />
          </div>
        </MockFrame>
      </div>
    </div>
  );
}

interface ToneAxisProps {
  label: string;
  current: number;
  target: number;
  accent: AccentClasses;
  aboveTarget?: boolean;
}

function ToneAxis({ label, current, target, accent, aboveTarget = false }: ToneAxisProps) {
  const cur = Math.min(current * 10, 100);
  const tgt = target * 10;
  const offRange = aboveTarget ? false : current < target * 0.7;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-white/85">{label}</span>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-sm font-semibold tabular-nums ${
              offRange ? "text-red-300" : aboveTarget ? "text-emerald-300" : accent.text
            }`}
          >
            {current.toFixed(1)}
          </span>
          <span className="text-[10px] font-mono text-(--color-text-muted)">
            / hedef {target.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="relative h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 w-px bg-white/40 z-10"
          style={{ left: `${tgt}%` }}
        />
        <div
          className={`h-full rounded-full ${
            offRange ? "bg-red-400" : aboveTarget ? "bg-emerald-400" : accent.dot
          }`}
          style={{ width: `${cur}%` }}
        />
      </div>
    </div>
  );
}

interface ViolationProps {
  tone: "defensive" | "jargon";
  title: string;
  quote: string;
  suggestion: string;
}

function Violation({ tone, title, quote, suggestion }: ViolationProps) {
  const dotClass = tone === "defensive" ? "bg-red-400" : "bg-amber-400";
  return (
    <div className="px-5 py-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span className="text-xs font-semibold text-white/90">{title}</span>
      </div>
      <p className="text-[11px] italic text-white/65 leading-snug pl-3.5">{quote}</p>
      <div className="mt-1.5 pl-3.5 flex items-start gap-1.5">
        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
        <span className="text-[11px] text-white/85 leading-snug">{suggestion}</span>
      </div>
    </div>
  );
}
