import * as React from "react";

interface EnProps {
  children: React.ReactNode;
  className?: string;
}

const En = ({ children, className }: EnProps) => (
  <span lang="en" className={className}>
    {children}
  </span>
);

interface EnTermsProps {
  /** Karisik Turkce/Ingilizce metin. Gorunen metin hicbir sekilde degismez. */
  text: string;
  /** lang="en" ile sarilacak Ingilizce terimler (tam kelime eslesmesi). */
  terms: readonly string[];
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * <html lang="tr"> altinda CSS uppercase, Ingilizce kelimelerdeki "i" harfini
 * "İ" yapar (Service -> SERVİCE). EnTerms, karisik metinlerde yalnizca verilen
 * Ingilizce terimleri lang="en" ile sarar; Turkce kelimeler lang="tr"
 * mirasinda kalir (Garantisi -> GARANTİSİ). Metin JSON'dan gelmeye devam eder.
 */
const EnTerms = ({ text, terms }: EnTermsProps) => {
  const pattern = terms.map(escapeRegExp).join("|");
  if (!pattern) return <>{text}</>;

  const segments = text.split(new RegExp(`\\b(${pattern})\\b`));

  return (
    <>
      {segments.map((segment, i) =>
        i % 2 === 1 ? <En key={i}>{segment}</En> : segment,
      )}
    </>
  );
};

export { En, EnTerms };
