import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type RefObject } from 'react';
import { AlertTriangle, CirclePlus, Home, Pencil, RefreshCw, Target, X } from 'lucide-react';
import { calculateHousePreview, validateHouseInput, type HouseCalculatorInput } from '../../lib/savingsGoalMath';
import {
  createSavingsGoal,
  deleteSavingsGoal,
  listSavingsGoals,
  updateSavingsGoal,
  type SavingsGoal,
} from '../../services/savingsGoalService';
import { notifySavingsGoalRefresh, subscribeToSavingsGoalRefresh } from '../../services/savingsGoalRefresh';
import { HouseCalculatorInputs } from './HouseCalculatorInputs';
import { SavingsGoalCard } from './SavingsGoalCard';
import { useDialogFocus } from './useDialogFocus';

export interface SavingsGoalDashboardProps {
  uid: string;
  onGoalsChanged?: (goals: SavingsGoal[]) => void;
}

export type SavingsGoalDraft = Omit<SavingsGoal, 'id' | 'uid' | 'createdAt' | 'updatedAt'>;

type GoalFormValues = SavingsGoalDraft;

const DEFAULT_INPUT: HouseCalculatorInput = {
  homePrice: 4_000_000,
  downPaymentPercent: 15,
  currentSavings: 150_000,
  monthlySaving: 10_000,
  annualReturn: 5,
  mortgageRate: 3.5,
  amortizationRate: 2,
  horizonYears: 10,
};

const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, value));
}

function createFormValues(goal?: SavingsGoal): GoalFormValues {
  if (goal) {
    const { id: _id, uid: _uid, createdAt: _createdAt, updatedAt: _updatedAt, ...draft } = goal;
    return draft;
  }

  return { name: 'Mitt husmål', ...DEFAULT_INPUT };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Något gick fel. Försök igen.';
}

function GoalFormDialog({
  goal,
  form,
  errors,
  isSaving,
  operationError,
  fallbackFocusRef,
  onNameChange,
  onChange,
  onClose,
  onSubmit,
}: {
  goal: SavingsGoal | null;
  form: GoalFormValues;
  errors: Record<string, string>;
  isSaving: boolean;
  operationError: string | null;
  fallbackFocusRef: RefObject<HTMLElement | null>;
  onNameChange: (name: string) => void;
  onChange: (field: keyof HouseCalculatorInput, value: number) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const titleId = 'savings-goal-form-title';
  const nameErrorId = 'savings-goal-name-error';
  const dialogRef = useDialogFocus<HTMLElement>(true, fallbackFocusRef);

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Husmål</p>
            <h3 id={titleId} className="mt-1 font-serif text-2xl font-bold tracking-tight">
              {goal ? 'Redigera husmål' : 'Skapa husmål'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-muted-foreground hover:bg-section-alt hover:text-foreground" aria-label="Stäng">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <form className="mt-6 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label htmlFor="savings-goal-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Namn på mål</label>
            <input
              id="savings-goal-name"
              data-dialog-initial-focus
              value={form.name}
              onChange={(event) => onNameChange(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? nameErrorId : undefined}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive"
            />
            {errors.name ? <p id={nameErrorId} role="alert" className="text-xs font-medium text-destructive">{errors.name}</p> : null}
          </div>

          <HouseCalculatorInputs input={form} errors={errors} onChange={onChange} />

          {operationError ? <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{operationError}</p> : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={isSaving} className="rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground hover:bg-section-alt disabled:cursor-not-allowed disabled:opacity-60">Avbryt</button>
            <button type="submit" disabled={isSaving} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {isSaving ? 'Sparar…' : goal ? 'Spara ändringar' : 'Skapa mål'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function DeleteConfirmationDialog({ goal, isDeleting, operationError, fallbackFocusRef, onCancel, onConfirm }: {
  goal: SavingsGoal;
  isDeleting: boolean;
  operationError: string | null;
  fallbackFocusRef: RefObject<HTMLElement | null>;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useDialogFocus<HTMLElement>(true, fallbackFocusRef);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div aria-hidden="true" onClick={onCancel} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <section
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-savings-goal-title"
        aria-describedby="delete-savings-goal-description"
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle size={21} aria-hidden="true" />
        </div>
        <h3 id="delete-savings-goal-title" className="mt-4 font-serif text-2xl font-bold">Ta bort {goal.name}?</h3>
        <p id="delete-savings-goal-description" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Målet och dess sparantaganden tas bort permanent. Det går inte att ångra.
        </p>
        {operationError ? <p role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">{operationError}</p> : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" data-dialog-initial-focus onClick={onCancel} disabled={isDeleting} className="rounded-xl border border-border px-4 py-3 text-sm font-bold text-foreground hover:bg-section-alt disabled:opacity-60">Avbryt</button>
          <button type="button" onClick={onConfirm} disabled={isDeleting} className="rounded-xl bg-destructive px-4 py-3 text-sm font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
            {isDeleting ? 'Tar bort…' : 'Ta bort mål'}
          </button>
        </div>
      </section>
    </div>
  );
}

export function SavingsGoalDashboard({ uid, onGoalsChanged }: SavingsGoalDashboardProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null | undefined>(undefined);
  const [form, setForm] = useState<GoalFormValues>(() => createFormValues());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [operationError, setOperationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [goalPendingDeletion, setGoalPendingDeletion] = useState<SavingsGoal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const requestId = useRef(0);
  const createGoalButtonRef = useRef<HTMLButtonElement>(null);

  const refreshGoals = useCallback(async () => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true);
    setLoadError(null);

    try {
      const nextGoals = await listSavingsGoals(uid);
      if (currentRequestId !== requestId.current) return;

      setGoals(nextGoals);
      setActiveGoalId((currentId) => nextGoals.some((goal) => goal.id === currentId) ? currentId : (nextGoals[0]?.id ?? null));
      onGoalsChanged?.(nextGoals);
    } catch (error) {
      if (currentRequestId === requestId.current) setLoadError(errorMessage(error));
    } finally {
      if (currentRequestId === requestId.current) setIsLoading(false);
    }
  }, [onGoalsChanged, uid]);

  useEffect(() => {
    void refreshGoals();
    return subscribeToSavingsGoalRefresh((changedUid) => changedUid === uid ? refreshGoals() : undefined);
  }, [refreshGoals, uid]);

  useEffect(() => {
    if (editingGoal === undefined && !goalPendingDeletion) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || isSaving || isDeleting) return;
      setEditingGoal(undefined);
      setGoalPendingDeletion(null);
      setOperationError(null);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [editingGoal, goalPendingDeletion, isDeleting, isSaving]);

  const activeGoal = useMemo(
    () => goals.find((goal) => goal.id === activeGoalId) ?? goals[0] ?? null,
    [activeGoalId, goals],
  );
  const activePreview = useMemo(() => activeGoal ? calculateHousePreview(activeGoal) : null, [activeGoal]);
  const activeProgress = activeGoal && activePreview && activePreview.downPayment > 0
    ? Math.min(100, Math.round((activeGoal.currentSavings / activePreview.downPayment) * 100))
    : 100;

  const openCreate = () => {
    setForm(createFormValues());
    setFormErrors({});
    setOperationError(null);
    setEditingGoal(null);
  };

  const openEdit = (goal: SavingsGoal) => {
    setForm(createFormValues(goal));
    setFormErrors({});
    setOperationError(null);
    setEditingGoal(goal);
  };

  const updateFormField = (field: keyof HouseCalculatorInput, value: number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateFormName = (name: string) => {
    setForm((current) => ({ ...current, name }));
  };

  const saveGoal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateHouseInput(form);
    if (!form.name.trim()) errors.name = 'Ge ditt mål ett namn.';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    setOperationError(null);
    try {
      const draft: SavingsGoalDraft = { ...form, name: form.name.trim() };
      if (editingGoal) {
        await updateSavingsGoal(uid, editingGoal.id, draft);
      } else {
        await createSavingsGoal(uid, draft);
      }
      await notifySavingsGoalRefresh(uid);
      setEditingGoal(undefined);
    } catch (error) {
      setOperationError(errorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!goalPendingDeletion) return;

    setIsDeleting(true);
    setOperationError(null);
    try {
      await deleteSavingsGoal(uid, goalPendingDeletion.id);
      await notifySavingsGoalRefresh(uid);
      setGoalPendingDeletion(null);
    } catch (error) {
      setOperationError(errorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-6" aria-labelledby="savings-goal-dashboard-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Huskalkylator</p>
          <h2 id="savings-goal-dashboard-heading" className="mt-1 font-serif text-3xl font-bold tracking-tight">Mina husmål</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Följ kontantinsatsen och dina egna antaganden. Avkastning är ett antagande, inte ett löfte.</p>
        </div>
        <button ref={createGoalButtonRef} type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
          <CirclePlus size={17} aria-hidden="true" /> Skapa husmål
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2" aria-label="Laddar husmål">
          {[0, 1].map((index) => <div key={index} className="h-64 animate-pulse rounded-3xl border border-border bg-section-alt/50" />)}
        </div>
      ) : null}

      {!isLoading && loadError ? (
        <div role="alert" className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
          <p className="font-bold text-destructive">Dina husmål kunde inte laddas.</p>
          <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
          <button type="button" onClick={() => void refreshGoals()} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:bg-section-alt">
            <RefreshCw size={15} aria-hidden="true" /> Försök igen
          </button>
        </div>
      ) : null}

      {!isLoading && !loadError && goals.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-section-alt/30 p-8 text-center sm:p-10">
          <Target size={28} className="mx-auto text-primary" aria-hidden="true" />
          <h3 className="mt-4 font-serif text-2xl font-bold">Inga husmål ännu</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Skapa ett mål för att samla bostadspris, kontantinsats och din sparplan på ett ställe.</p>
          <button type="button" onClick={openCreate} className="mt-5 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">Skapa ditt första husmål</button>
        </div>
      ) : null}

      {!isLoading && !loadError && activeGoal && activePreview ? (
        <div id="active-savings-goal-summary" className="overflow-hidden rounded-3xl border border-primary/20 bg-primary/5">
          <div className="flex flex-col gap-5 p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Aktivt mål</p>
                <h3 className="mt-1 font-serif text-2xl font-bold tracking-tight">{activeGoal.name}</h3>
              </div>
              <button type="button" onClick={() => openEdit(activeGoal)} className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-card px-3 py-2 text-sm font-bold text-foreground hover:bg-section-alt">
                <Pencil size={15} aria-hidden="true" /> Redigera
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mot kontantinsats</p><p className="mt-2 font-serif text-2xl font-bold">{activeProgress}%</p><p className="mt-1 text-sm text-muted-foreground">{formatCurrency(activeGoal.currentSavings)} av {formatCurrency(activePreview.downPayment)}</p></div>
              <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kvar att spara</p><p className="mt-2 font-serif text-2xl font-bold">{formatCurrency(activePreview.remainingToSave)}</p><p className="mt-1 text-sm text-muted-foreground">Mot din kontantinsats</p></div>
              <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Månadssparande</p><p className="mt-2 font-serif text-2xl font-bold">{formatCurrency(activeGoal.monthlySaving)}</p><p className="mt-1 text-sm text-muted-foreground">Enligt din sparplan</p></div>
              <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Boendekostnad</p><p className="mt-2 font-serif text-2xl font-bold">{formatCurrency(activePreview.monthlyHousingCost)}</p><p className="mt-1 text-sm text-muted-foreground">Ränta och amortering</p></div>
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && !loadError && goals.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2"><Home size={18} className="text-primary" aria-hidden="true" /><h3 className="font-serif text-xl font-bold">Alla husmål</h3></div>
          <div className="grid gap-4 xl:grid-cols-2">
            {goals.map((goal) => (
              <SavingsGoalCard
                key={goal.id}
                goal={goal}
                isActive={goal.id === activeGoal?.id}
                isBusy={isSaving || isDeleting}
                onOpen={(openedGoal) => setActiveGoalId(openedGoal.id)}
                onEdit={openEdit}
                onDelete={setGoalPendingDeletion}
              />
            ))}
          </div>
        </div>
      ) : null}

      {editingGoal !== undefined ? (
        <GoalFormDialog
          goal={editingGoal}
          form={form}
          errors={formErrors}
          isSaving={isSaving}
          operationError={operationError}
          fallbackFocusRef={createGoalButtonRef}
          onNameChange={updateFormName}
          onChange={updateFormField}
          onClose={() => { if (!isSaving) { setEditingGoal(undefined); setOperationError(null); } }}
          onSubmit={(event) => void saveGoal(event)}
        />
      ) : null}

      {goalPendingDeletion ? (
        <DeleteConfirmationDialog
          goal={goalPendingDeletion}
          isDeleting={isDeleting}
          operationError={operationError}
          fallbackFocusRef={createGoalButtonRef}
          onCancel={() => { if (!isDeleting) { setGoalPendingDeletion(null); setOperationError(null); } }}
          onConfirm={() => void confirmDelete()}
        />
      ) : null}

    </section>
  );
}
