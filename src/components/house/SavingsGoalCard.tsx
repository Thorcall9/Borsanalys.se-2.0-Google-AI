import { CalendarDays, Home, Pencil, Trash2, Wallet } from 'lucide-react';
import { calculateHousePreview } from '../../lib/savingsGoalMath';
import type { SavingsGoal } from '../../services/savingsGoalService';

export interface SavingsGoalCardProps {
  goal: SavingsGoal;
  isActive: boolean;
  isBusy?: boolean;
  onOpen: (goal: SavingsGoal) => void;
  onEdit: (goal: SavingsGoal) => void;
  onDelete: (goal: SavingsGoal) => void;
}

const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, value));
}

function formatTimeline(months: number | null) {
  if (months === null) return 'Justera sparandet för en tidplan';
  if (months === 0) return 'Kontantinsatsen är täckt';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [years > 0 ? `${years} år` : null, remainingMonths > 0 ? `${remainingMonths} mån` : null]
    .filter(Boolean)
    .join(' och ');

  return `Cirka ${parts}`;
}

export function SavingsGoalCard({ goal, isActive, isBusy = false, onOpen, onEdit, onDelete }: SavingsGoalCardProps) {
  const preview = calculateHousePreview(goal);
  const headingId = `savings-goal-${goal.id}-title`;
  const progress = preview.downPayment > 0
    ? Math.min(100, Math.round((goal.currentSavings / preview.downPayment) * 100))
    : 100;

  return (
    <article
      aria-labelledby={headingId}
      className={`rounded-2xl border p-5 transition-colors ${
        isActive ? 'border-primary/50 bg-primary/5 shadow-sm' : 'border-border bg-card'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p id={headingId} className="truncate font-serif text-xl font-bold text-foreground">{goal.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">Bostadspris {formatCurrency(goal.homePrice)}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {progress}% sparat
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
          <span>Kontantinsats</span>
          <span>{formatCurrency(goal.currentSavings)} av {formatCurrency(preview.downPayment)}</span>
        </div>
        <div
          role="progressbar"
          aria-label={`Sparprogress för ${goal.name}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-2 h-2 overflow-hidden rounded-full bg-border"
        >
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <Wallet size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          <div><dt className="text-muted-foreground">Månadssparande</dt><dd className="mt-0.5 font-bold text-foreground">{formatCurrency(goal.monthlySaving)}</dd></div>
        </div>
        <div className="flex items-start gap-2">
          <CalendarDays size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          <div><dt className="text-muted-foreground">Tid till mål</dt><dd className="mt-0.5 font-bold text-foreground">{formatTimeline(preview.monthsToGoal)}</dd></div>
        </div>
        <div className="flex items-start gap-2">
          <Home size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          <div><dt className="text-muted-foreground">Månadskostnad</dt><dd className="mt-0.5 font-bold text-foreground">{formatCurrency(preview.monthlyHousingCost)}</dd></div>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => onOpen(goal)}
          aria-pressed={isActive}
          aria-controls="active-savings-goal-summary"
          aria-label={`Visa ${goal.name} som aktivt mål`}
          className="rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Visa mål
        </button>
        <button
          type="button"
          onClick={() => onEdit(goal)}
          disabled={isBusy}
          aria-haspopup="dialog"
          aria-label={`Redigera ${goal.name}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-section-alt disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Pencil size={15} aria-hidden="true" /> Redigera
        </button>
        <button
          type="button"
          onClick={() => onDelete(goal)}
          disabled={isBusy}
          aria-haspopup="dialog"
          aria-label={`Ta bort ${goal.name}`}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 size={15} aria-hidden="true" /> Ta bort
        </button>
      </div>
    </article>
  );
}
