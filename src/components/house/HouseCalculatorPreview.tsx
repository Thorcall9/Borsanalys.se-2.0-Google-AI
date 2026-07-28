import { motion } from 'framer-motion';
import { CalendarDays, Home, Landmark, Wallet } from 'lucide-react';
import type { HousePreview } from '../../lib/savingsGoalMath';

interface HouseCalculatorPreviewProps {
  preview: HousePreview | null;
  hasValidationErrors: boolean;
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

export function HouseCalculatorPreview({ preview, hasValidationErrors }: HouseCalculatorPreviewProps) {
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
        <h3 className="text-2xl font-serif font-bold tracking-tight">Din första översikt</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Boendekostnaden omfattar ränta och amortering, men inte drift, avgift eller skatt.
        </p>
      </div>

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
