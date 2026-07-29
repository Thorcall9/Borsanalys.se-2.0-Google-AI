import { motion } from 'framer-motion';
import { CalendarDays, Home, Landmark, Wallet } from 'lucide-react';
import type { HousePreview } from '../../lib/savingsGoalMath';

interface HouseCalculatorPreviewProps {
  preview: HousePreview | null;
  hasValidationErrors: boolean;
  capitalSummary?: {
    currentSavings: number;
    saleCapital: number;
    totalCapital: number;
    includesSaleCapital: boolean;
  };
}

const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, value));
}

function formatTimeline(monthsToGoal: number | null) {
  if (monthsToGoal === null) {
    return 'Målet nås inte med de här förutsättningarna';
  }

  if (monthsToGoal === 0) {
    return 'Din kontantinsats är redan täckt';
  }

  const years = Math.floor(monthsToGoal / 12);
  const months = monthsToGoal % 12;
  const parts = [years > 0 ? `${years} ${years === 1 ? 'år' : 'år'}` : null, months > 0 ? `${months} mån` : null]
    .filter(Boolean)
    .join(' och ');

  return `Om cirka ${parts}`;
}

export function HouseCalculatorPreview({ preview, hasValidationErrors, capitalSummary }: HouseCalculatorPreviewProps) {
  if (hasValidationErrors) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-muted-foreground">
        Kontrollera de markerade fälten för att se din kalkyl.
      </div>
    );
  }

  if (!preview) {
    return null;
  }

  const { downPayment, remainingToSave, monthsToGoal, monthlyHousingCost } = preview;
  const progressPercent = downPayment === 0
    ? 0
    : Math.min(100, Math.max(0, ((downPayment - remainingToSave) / downPayment) * 100));

  const metrics = [
    { label: 'Kontantinsats', value: formatCurrency(downPayment), icon: Landmark },
    { label: 'Kvar att spara', value: formatCurrency(remainingToSave), icon: Wallet },
    { label: 'Tid till mål', value: formatTimeline(monthsToGoal), icon: CalendarDays },
    { label: 'Uppskattad månadskostnad', value: formatCurrency(monthlyHousingCost), icon: Home },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      aria-live="polite"
      className="space-y-5"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#123f2d]">Vägen till kontantinsatsen</p>
        <h3 className="mt-2 text-3xl font-serif font-bold tracking-tight text-[#123f2d]">Din första översikt</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Boendekostnaden omfattar ränta och amortering, men inte drift, avgift eller skatt.
        </p>
      </div>

      <div className="rounded-2xl border border-[#123f2d]/10 bg-[#fffaf0] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Beräknad kontantinsats</p>
            <p className="mt-2 text-3xl font-serif font-bold text-[#123f2d]">{formatCurrency(downPayment)}</p>
          </div>
          <p className="text-sm font-bold text-[#123f2d]">{Math.round(progressPercent)} % sparat</p>
        </div>
        <div
          className="mt-4 h-3 overflow-hidden rounded-full bg-[#dbe7d6]"
          role="progressbar"
          aria-label="Sparad andel av kontantinsatsen"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercent)}
        >
          <span className="block h-full rounded-full bg-[#123f2d]" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="mt-2 flex justify-between gap-3 text-xs text-muted-foreground">
          <span>Idag</span>
          <span>{formatCurrency(remainingToSave)} kvar att spara</span>
        </div>
      </div>

      {capitalSummary ? (
        <div className="overflow-hidden rounded-2xl border border-[#d9cfbd] bg-[#f2ecdf]">
          <div className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_8rem] sm:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#456654]">Kapital till nästa bostad</p>
              <h4 className="mt-2 font-serif text-2xl font-bold text-[#123f2d]">Din helhetsbild</h4>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Ditt sparande idag</dt><dd className="font-mono font-bold text-[#123f2d]">{formatCurrency(capitalSummary.currentSavings)}</dd></div>
                {capitalSummary.includesSaleCapital ? <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Kapital från nuvarande hem</dt><dd className="font-mono font-bold text-[#123f2d]">{formatCurrency(capitalSummary.saleCapital)}</dd></div> : null}
              </dl>
              <div className="mt-4 rounded-xl bg-[#123f2d] px-4 py-3 text-[#fffaf0]"><p className="text-xs font-bold uppercase tracking-wider text-[#cfe0c7]">Totalt kapital till nästa bostad</p><p className="mt-1 font-serif text-2xl font-bold">{formatCurrency(capitalSummary.totalCapital)}</p></div>
              {capitalSummary.includesSaleCapital ? <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Kapitalet från nuvarande hem är en uppskattad engångssumma och ingår inte i avkastningsprognosen.</p> : null}
            </div>
            <img src="/images/house-sale-editorial.png" alt="Illustration av ett vitt svenskt trähus" className="hidden h-40 w-full rounded-2xl object-cover sm:block" />
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-section-alt/40 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Icon size={15} className="text-primary" aria-hidden="true" />
              {label}
            </div>
            <p className="mt-3 text-xl font-serif font-bold leading-snug text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {monthsToGoal === null ? (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-foreground">
          Öka månadssparandet eller ändra antagandena för att få en möjlig tidplan.
        </p>
      ) : null}
    </motion.section>
  );
}
