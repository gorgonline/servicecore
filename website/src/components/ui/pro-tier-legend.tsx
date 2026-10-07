import { Fragment } from "react";
import { En, EnTerms } from "@/components/ui/En";

/**
 * Pro kartinin alt seviyeleri (Pro Lite / Pro Full). Ilk seviye ek modul listesinin (mavi),
 * ikinci seviye ozgu listenin (yesil) rengini alir; siralama listelerle ayni olmali.
 */
export interface ProTier {
  name: string;
  summary: string;
}

interface ProTierLegendProps {
  tiers: ProTier[];
}

const TIER_CHIP_STYLES = [
  "bg-(--color-brand-primary)/10 border-(--color-brand-primary)/30 text-(--color-accent-blue-light)",
  "bg-(--color-accent-emerald-base)/10 border-(--color-accent-emerald-base)/25 text-(--color-accent-emerald-light)",
];

/** "Pro Lite = Standart + ...", "Pro Full = Pro Lite + ..." ozeti. /planlar kartlari ve anasayfa lisans tablosu ortak kullanir. */
export function ProTierLegend({ tiers }: ProTierLegendProps) {
  if (tiers.length === 0) return null;

  const tierNames = tiers.map((tier) => tier.name);

  return (
    <dl className="mb-6 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2.5 px-1 relative z-10">
      {tiers.map((tier, idx) => (
        <Fragment key={tier.name}>
          {/* flex: chip satir yuksekligine oturmasin, ozet metniyle ayni eksende ortalansin */}
          <dt className="flex">
            <En
              className={`inline-flex w-full justify-center px-2.5 py-1 rounded-md border text-[11px] font-semibold leading-none whitespace-nowrap ${TIER_CHIP_STYLES[idx % TIER_CHIP_STYLES.length]}`}
            >
              {tier.name}
            </En>
          </dt>
          <dd className="text-sm text-(--color-text-secondary) font-light leading-snug">
            <EnTerms text={tier.summary} terms={tierNames} />
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}
