import { CheckCircle2, FileText, Inbox, Sparkles, Wand2 } from "lucide-react";
import {
  Chip,
  MockFrame,
  SectionLabel,
  TitleBar,
  resolveAccent,
} from "../primitives";

export function ReplyCoreMock({ accent: accentName }: { accent: string }) {
  const accent = resolveAccent(accentName);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-4">
      <MockFrame>
        <TitleBar
          icon={<Inbox className="w-3.5 h-3.5" />}
          title="Konuşma · 32 mesaj"
          meta="REQ-9132 · LYR"
          accent={accent}
        />

        <div className="max-h-110 overflow-hidden relative">
          <div className="px-5 py-4 space-y-3">
            <div className="rounded-lg bg-white/3 border border-white/6 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-medium text-white/85">Naz Aksoy</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">11 Mar · 13:22</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Online sınav portalına şifre sıfırlama maili gelmiyor, denedim çalışmıyor, ne yapacağım
                bilmiyorum, yarınki ara sınava 200&apos;e yakın öğrenci giremeyecek...
              </p>
            </div>

            <div className="rounded-lg bg-white/3 border border-white/6 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-medium text-white/85">Elif Şahin</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">11 Mar · 13:28</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                SMTP loglarına baktım, gönderim kuyruklanmış görünüyor, mail relay tarafına soruyorum.
              </p>
            </div>

            <div className="rounded-lg bg-white/3 border border-white/6 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-medium text-white/85">Kerem Doğan</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">11 Mar · 13:41</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Edge bağlantısında throttling var, 200/dk limit, dün gece kotaya takılmış olabilir.
                Geçici olarak limiti yükselttim ama kalıcı çözüm gerekiyor...
              </p>
            </div>

            <div className="rounded-lg bg-white/3 border border-white/6 p-3 opacity-70">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-medium text-white/85">Naz Aksoy</span>
                <span className="text-[10px] font-mono text-(--color-text-muted)">11 Mar · 13:55</span>
              </div>
              <p className="text-xs text-white/55 leading-relaxed">
                Hâlâ mail gelmedi, denemem gereken farklı bir adım var mı? Saat bana geçiyor...
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-(--color-surface-elevated) to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="text-[10px] font-mono text-(--color-text-muted) px-2 py-1 rounded-full bg-white/4 border border-white/8">
              28 mesaj daha · ↓
            </span>
          </div>
        </div>
      </MockFrame>

      <MockFrame className={accent.glow}>
        <TitleBar
          icon={<Wand2 className="w-3.5 h-3.5" />}
          title="ReplyCoreAI · Yanıt Taslağı"
          meta="2.4s'de üretildi"
          accent={accent}
        />

        <div className="px-5 py-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel accent={accent}>Konuşma Özeti</SectionLabel>
              <span className="text-[9px] font-mono text-(--color-text-muted)">
                32 → 4 madde
              </span>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/3 p-3 space-y-1.5">
              <div className="flex items-start gap-2">
                <span className={`shrink-0 w-1 h-1 rounded-full ${accent.dot} mt-1.5`} />
                <p className="text-xs text-white/85 leading-snug">
                  Sınav portalı şifre sıfırlama mailleri gönderilemiyor, mağdur kullanıcı: 200+ öğrenci.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className={`shrink-0 w-1 h-1 rounded-full ${accent.dot} mt-1.5`} />
                <p className="text-xs text-white/85 leading-snug">
                  Kök sebep: Mail relay throttling kotası dolmuş (Kerem Doğan, 13:41).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className={`shrink-0 w-1 h-1 rounded-full ${accent.dot} mt-1.5`} />
                <p className="text-xs text-white/85 leading-snug">
                  Geçici aksiyon alındı: limit yükseltildi, kuyruk işleniyor.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className={`shrink-0 w-1 h-1 rounded-full ${accent.dot} mt-1.5`} />
                <p className="text-xs text-white/85 leading-snug">
                  Açık aksiyon: kalıcı kota artışı için relay sağlayıcı talebi.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel accent={accent}>Önerilen Yanıt Taslağı</SectionLabel>
              <Chip tone="info">
                <Sparkles className="w-2.5 h-2.5" /> Empatik · Çözüm odaklı
              </Chip>
            </div>
            <div className={`rounded-xl border ${accent.border} ${accent.bg} p-3.5`}>
              <p className="text-xs text-white/90 leading-relaxed">
                Naz Hocam,
                <br /><br />
                Sıfırlama maillerinin gelmemesinin sebebini tespit ettik — mail çıkış sunucumuzda dakikalık
                gönderim kotası dolmuştu. Limiti az önce yükselttik, kuyruktaki mailler şu an
                kullanıcılarınıza ulaşıyor. <span className={`${accent.text}`}>Önümüzdeki 5 dakika
                içinde</span> 200 kullanıcının da sıfırlama bağlantılarına erişeceğini öngörüyoruz.
                <br /><br />
                Yarınki sınav öncesi tekrar bu olayın yaşanmaması için kalıcı kota artışını da bugün
                içinde devreye alacağız. Sürecin her adımında size dönüş yapacağız.
              </p>
              <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-(--color-text-muted)">
                  <FileText className="w-3 h-3" />
                  Atıf: 3 önceki çözüm + 1 KB makalesi
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="text-[10px] font-mono px-2 py-1 rounded-md border border-white/10 text-white/70 hover:bg-white/5 cursor-pointer">
                    Yeniden üret
                  </button>
                  <button className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${accent.border} ${accent.bg} ${accent.text} font-semibold cursor-pointer`}>
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                    Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MockFrame>
    </div>
  );
}
