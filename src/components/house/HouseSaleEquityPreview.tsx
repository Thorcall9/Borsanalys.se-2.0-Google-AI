import { Home, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SaleEquityPreview } from '../../lib/savingsGoalMath';

interface HouseSaleEquityPreviewProps {
  preview: SaleEquityPreview | null;
  hasValidationErrors: boolean;
  currentHomeValue: number;
  remainingMortgageDebt: number;
}

const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, value));
}

export function HouseSaleEquityPreview({
  preview,
  hasValidationErrors,
  currentHomeValue,
  remainingMortgageDebt,
}: HouseSaleEquityPreviewProps) {
  if (hasValidationErrors || !preview) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      aria-live="polite"
      aria-labelledby="sale-equity-heading"
      className="overflow-hidden rounded-3xl border border-[#d9cfbd] bg-[#fffaf0] shadow-sm"
    >
      <div className="grid sm:grid-cols-[minmax(0,1fr)_9rem]">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#456654]">Ditt nuvarande hem</p>
              <h3 id="sale-equity-heading" className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#123f2d]">
                Om du säljer idag
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                En enkel uppskattning efter bolån och mäklararvode.
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#dbe7d6] text-[#123f2d] sm:hidden">
              <Home size={19} aria-hidden="true" />
            </span>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-[#e8dfd0] pb-3">
              <dt className="text-muted-foreground">Bostadsvärde</dt>
              <dd className="font-mono font-bold text-[#123f2d]">{formatCurrency(currentHomeValue)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-[#e8dfd0] pb-3">
              <dt className="text-muted-foreground">Kvarvarande bolån</dt>
              <dd className="font-mono font-bold text-[#123f2d]">− {formatCurrency(remainingMortgageDebt)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-[#e8dfd0] pb-3">
              <dt className="text-muted-foreground">Mäklararvode</dt>
              <dd className="font-mono font-bold text-[#123f2d]">− {formatCurrency(preview.brokerFee)}</dd>
            </div>
          </dl>

          <div className="mt-5 rounded-2xl bg-[#123f2d] p-4 text-[#fffaf0]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#cfe0c7]">Ungefär kvar efter försäljning</p>
            <p className="mt-2 font-serif text-3xl font-bold">{formatCurrency(preview.netSaleProceeds)}</p>
          </div>

          {preview.negativeEquity ? (
            <p className="mt-4 rounded-xl bg-[#f2ecdf] px-4 py-3 text-sm leading-relaxed text-[#5d564d]">
              Med dessa uppskattningar täcker försäljningen inte både lån och mäklararvode.
            </p>
          ) : null}

          <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info size={15} className="mt-0.5 shrink-0 text-[#456654]" aria-hidden="true" />
            <span>Vinstskatt, flyttkostnader, bankavgifter, pantbrev och andra eventuella lån ingår inte</span>
          </p>
        </div>

        <div className="relative hidden min-h-full overflow-hidden bg-[#dbe7d6] sm:block">
          <img
            src="/images/house-sale-editorial.png"
            alt="Illustration av ett vitt svenskt trähus"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#123f2d]/40 to-transparent p-5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#fffaf0]/90 text-[#123f2d]">
              <Home size={17} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
