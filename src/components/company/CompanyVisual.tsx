import { Grid2X2, Share2, Sparkles } from "lucide-react";

type CompanyVisualProps = {
  ticker: string;
  className?: string;
};

const visualByTicker = {
  MSFT: { Icon: Grid2X2, tone: "company-visual--microsoft", label: "Microsoft" },
  GOOG: { Icon: Sparkles, tone: "company-visual--alphabet", label: "Alphabet" },
  GOOGL: { Icon: Sparkles, tone: "company-visual--alphabet", label: "Alphabet" },
  META: { Icon: Share2, tone: "company-visual--meta", label: "Meta" },
} as const;

/**
 * A neutral, original visual identifier for analysis cards. These are not
 * company logos or copied brand assets; ticker data remains the source of
 * truth and unfamiliar companies fall back to their ticker.
 */
export default function CompanyVisual({ ticker, className = "" }: CompanyVisualProps) {
  const normalizedTicker = ticker.toUpperCase().replace(".ST", "");
  const visual = visualByTicker[normalizedTicker as keyof typeof visualByTicker];

  if (!visual) {
    return <span className={`company-visual company-visual--fallback ${className}`} aria-label={ticker}>{normalizedTicker.toLowerCase()}</span>;
  }

  const { Icon, tone, label } = visual;
  return (
    <span className={`company-visual ${tone} ${className}`} aria-label={`${label} bolagsmarkör`}>
      <Icon aria-hidden="true" strokeWidth={2.15} />
    </span>
  );
}
