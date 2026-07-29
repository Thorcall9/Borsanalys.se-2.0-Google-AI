import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { AlertTriangle, ArrowUpRight, Home, Pencil, RefreshCw, Sparkles, Target, Trash2 } from 'lucide-react';
import { calculateForecastMonths, calculateHousingPlan, calculateProgress, type HousingPlan } from '../../lib/housingPlanMath';
import { toHousingPlan } from '../../lib/housingPlanAdapter';
import { type HouseCalculatorInput } from '../../lib/savingsGoalMath';
import { listHousingCapitalHistory, saveHousingCapitalUpdate, type HousingCapitalHistoryEntry } from '../../services/housingCapitalHistoryService';
import {
  createSavingsGoal,
  deleteSavingsGoal,
  listSavingsGoals,
  updateSavingsGoal,
  type SavingsGoal,
} from '../../services/savingsGoalService';
import { notifySavingsGoalRefresh, subscribeToSavingsGoalRefresh } from '../../services/savingsGoalRefresh';
import { CapitalUpdateSheet } from './CapitalUpdateSheet';
import { HousingPlanDrawer } from './HousingPlanDrawer';
import { useDialogFocus } from './useDialogFocus';

export interface SavingsGoalDashboardProps {
  uid: string;
  onGoalsChanged?: (goals: SavingsGoal[]) => void;
}

export type SavingsGoalDraft = Omit<SavingsGoal, 'id' | 'uid' | 'createdAt' | 'updatedAt'>;

const DEFAULT_INPUT: HouseCalculatorInput = {
  homePrice: 4_000_000,
  downPaymentPercent: 15,
  currentSavings: 150_000,
  monthlySaving: 10_000,
  annualReturn: 5,
  mortgageRate: 3.5,
  amortizationRate: 2,
  horizonYears: 10,
  currentHomeValue: 0,
  remainingMortgageDebt: 0,
  brokerFeePercent: 0,
  housingType: 'HOUSE',
  existingMortgageDeeds: 0,
  extraBuffer: 0,
};

const currencyFormatter = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 });

function formatCurrency(value: number) {
  return currencyFormatter.format(Math.max(0, value));
}

function formatTimeline(months: number | null) {
  if (months === null) return 'Lägg till ett månadssparande för en prognos';
  if (months === 0) return 'Ni har nått kapitalmålet';
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return `Om cirka ${[years ? `${years} år` : '', remainder ? `${remainder} mån` : ''].filter(Boolean).join(' och ')}`;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Något gick fel. Försök igen.';
}

function toGoalDraft(plan: HousingPlan, previous?: SavingsGoal): SavingsGoalDraft {
  const source: SavingsGoalDraft = previous
    ? (() => {
      const { id: _id, uid: _uid, createdAt: _createdAt, updatedAt: _updatedAt, ...draft } = previous;
      return draft;
    })()
    : { name: 'Vårt framtida hem', ...DEFAULT_INPUT };
  return {
    ...source,
    name: source.name || 'Vårt framtida hem',
    homePrice: plan.purchasePrice,
    downPaymentPercent: plan.downPaymentRate,
    monthlySaving: plan.monthlySavings,
    housingType: plan.housingType,
    assessedValue: plan.assessedValue,
    existingMortgageDeeds: plan.existingMortgageDeeds,
    extraBuffer: plan.extraBuffer,
  };
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
  return <div className="fixed inset-0 z-[220] flex items-center justify-center p-4"><button type="button" aria-label="Stäng" onClick={onCancel} className="absolute inset-0 bg-black/50 backdrop-blur-sm" /><section ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="delete-savings-goal-title" tabIndex={-1} className="relative w-full max-w-md rounded-3xl bg-[#fffaf0] p-6 shadow-2xl"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b85f3d]/10 text-[#9b4c30]"><AlertTriangle size={21} /></div><h3 id="delete-savings-goal-title" className="mt-4 font-serif text-2xl font-bold text-[#123f31]">Ta bort {goal.name}?</h3><p className="mt-2 text-sm leading-relaxed text-[#627168]">Planen och dess kapitalhistorik tas bort permanent. Det går inte att ångra.</p>{operationError ? <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{operationError}</p> : null}<div className="mt-6 flex justify-end gap-3"><button data-dialog-initial-focus type="button" onClick={onCancel} disabled={isDeleting} className="rounded-xl border border-[#ded3c0] px-4 py-3 text-sm font-bold text-[#123f31]">Avbryt</button><button type="button" onClick={onConfirm} disabled={isDeleting} className="rounded-xl bg-[#b85f3d] px-4 py-3 text-sm font-bold text-white">{isDeleting ? 'Tar bort…' : 'Ta bort plan'}</button></div></section></div>;
}

export function SavingsGoalDashboard({ uid, onGoalsChanged }: SavingsGoalDashboardProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [history, setHistory] = useState<HousingCapitalHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [planOpen, setPlanOpen] = useState(false);
  const [capitalUpdateOpen, setCapitalUpdateOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [goalPendingDeletion, setGoalPendingDeletion] = useState<SavingsGoal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [latestCapitalDelta, setLatestCapitalDelta] = useState<number | null>(null);
  const requestId = useRef(0);
  const createGoalButtonRef = useRef<HTMLButtonElement>(null);

  const refreshGoals = useCallback(async () => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true); setLoadError(null);
    try {
      const nextGoals = await listSavingsGoals(uid);
      if (currentRequestId !== requestId.current) return;
      setGoals(nextGoals);
      setActiveGoalId((current) => nextGoals.some((goal) => goal.id === current) ? current : (nextGoals[0]?.id ?? null));
      onGoalsChanged?.(nextGoals);
    } catch (error) {
      if (currentRequestId === requestId.current) setLoadError(errorMessage(error));
    } finally { if (currentRequestId === requestId.current) setIsLoading(false); }
  }, [onGoalsChanged, uid]);

  useEffect(() => {
    void refreshGoals();
    return subscribeToSavingsGoalRefresh((changedUid) => changedUid === uid ? refreshGoals() : undefined);
  }, [refreshGoals, uid]);

  const activeGoal = useMemo(() => goals.find((goal) => goal.id === activeGoalId) ?? goals[0] ?? null, [activeGoalId, goals]);

  useEffect(() => {
    if (!activeGoal) { setHistory([]); return; }
    let cancelled = false;
    void listHousingCapitalHistory(uid, activeGoal.id).then((entries) => { if (!cancelled) setHistory(entries); }).catch(() => { if (!cancelled) setHistory([]); });
    return () => { cancelled = true; };
  }, [activeGoal, uid]);

  useEffect(() => {
    if (!planOpen && !capitalUpdateOpen && !goalPendingDeletion) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || isSaving || isDeleting) return;
      setPlanOpen(false); setCapitalUpdateOpen(false); setGoalPendingDeletion(null); setOperationError(null);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [capitalUpdateOpen, goalPendingDeletion, isDeleting, isSaving, planOpen]);

  const calculation = useMemo(() => activeGoal ? calculateHousingPlan(toHousingPlan(activeGoal)) : null, [activeGoal]);
  const progress = activeGoal && calculation ? calculateProgress(activeGoal.currentSavings, calculation.totalCapitalNeed) : 0;
  const remaining = activeGoal && calculation ? Math.max(0, calculation.totalCapitalNeed - activeGoal.currentSavings) : 0;
  const forecastMonths = activeGoal && calculation ? calculateForecastMonths(activeGoal.currentSavings, calculation.totalCapitalNeed, activeGoal.monthlySaving) : null;
  const historyDelta = history.at(-1)?.previousAmount !== null && history.at(-1)?.previousAmount !== undefined
    ? history.at(-1)!.amount - history.at(-1)!.previousAmount!
    : history.length > 1 ? history.at(-1)!.amount - history.at(-2)!.amount : null;
  const visibleDelta = latestCapitalDelta ?? historyDelta;

  const savePlan = async (plan: HousingPlan) => {
    setIsSaving(true); setOperationError(null);
    try {
      if (activeGoal) await updateSavingsGoal(uid, activeGoal.id, toGoalDraft(plan, activeGoal));
      else await createSavingsGoal(uid, toGoalDraft(plan));
      await notifySavingsGoalRefresh(uid);
      setPlanOpen(false);
    } catch (error) { setOperationError(errorMessage(error)); }
    finally { setIsSaving(false); }
  };

  const saveCapitalUpdate = async (amount: number) => {
    if (!activeGoal) return;
    setIsSaving(true); setOperationError(null);
    try {
      await saveHousingCapitalUpdate(uid, activeGoal.id, activeGoal.currentSavings, amount);
      setLatestCapitalDelta(amount - activeGoal.currentSavings);
      await notifySavingsGoalRefresh(uid);
      setCapitalUpdateOpen(false);
    } catch (error) { setOperationError(errorMessage(error)); }
    finally { setIsSaving(false); }
  };

  const confirmDelete = async () => {
    if (!goalPendingDeletion) return;
    setIsDeleting(true); setOperationError(null);
    try { await deleteSavingsGoal(uid, goalPendingDeletion.id); await notifySavingsGoalRefresh(uid); setGoalPendingDeletion(null); }
    catch (error) { setOperationError(errorMessage(error)); }
    finally { setIsDeleting(false); }
  };

  const initialPlan = activeGoal ? toHousingPlan(activeGoal) : toHousingPlan(DEFAULT_INPUT);

  return <section className="space-y-6" aria-labelledby="savings-goal-dashboard-heading">
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">Huskapital</p><h2 id="savings-goal-dashboard-heading" className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#123f31] sm:text-5xl">Din väg till nästa hem</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#627168]">Följ kapitalet, se nästa steg och bygg vidare på en plan som är er egen.</p></div>
      <button ref={createGoalButtonRef} type="button" onClick={() => { setOperationError(null); setPlanOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#123f31] px-5 py-3.5 text-sm font-bold text-[#fffaf0] hover:bg-[#1b5542]"><Home size={17} /> Planera nästa bostad</button>
    </header>

    {isLoading ? <div className="grid gap-5 lg:grid-cols-[1.5fr_0.7fr]"><div className="h-96 animate-pulse rounded-[2rem] bg-[#f4eee2]" /><div className="h-96 animate-pulse rounded-[2rem] bg-[#e6eedf]" /></div> : null}
    {!isLoading && loadError ? <div role="alert" className="rounded-3xl border border-[#dec5b6] bg-[#f7eee6] p-6"><AlertTriangle className="text-[#b85f3d]" /><p className="mt-3 font-serif text-xl font-bold text-[#123f31]">Din plan kunde inte laddas.</p><p className="mt-1 text-sm text-[#627168]">{loadError}</p><button type="button" onClick={() => void refreshGoals()} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#cbbca6] bg-[#fffaf0] px-4 py-2.5 text-sm font-bold text-[#123f31]"><RefreshCw size={15} /> Försök igen</button></div> : null}
    {!isLoading && !loadError && !activeGoal ? <div className="rounded-[2rem] border border-dashed border-[#cbbca6] bg-[#f4eee2] p-9 text-center"><Target className="mx-auto text-[#23694f]" size={30} /><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">Ett mål som lever</p><h3 className="mt-2 font-serif text-3xl font-bold text-[#123f31]">Börja med en enkel plan</h3><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#627168]">Fyra frågor räcker för att skapa er första riktning.</p><button type="button" onClick={() => setPlanOpen(true)} className="mt-6 rounded-2xl bg-[#123f31] px-5 py-3 text-sm font-bold text-[#fffaf0]">Planera nästa bostad</button></div> : null}
    {!isLoading && !loadError && activeGoal && calculation ? <>
      <div id="active-savings-goal-summary" className="grid overflow-hidden rounded-[2rem] border border-[#ded3c0] bg-[#fffaf0] shadow-[0_24px_70px_-45px_rgba(18,63,49,0.7)] lg:grid-cols-[1.45fr_0.75fr]">
        <div className="p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23694f]">Vårt huskapital</p><h3 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#123f31] sm:text-6xl">{formatCurrency(activeGoal.currentSavings)}</h3><p className="mt-2 text-sm text-[#627168]">av {formatCurrency(calculation.totalCapitalNeed)} som behövs till ert framtida hem</p></div><div className="text-left sm:text-right"><p className="font-serif text-4xl font-bold text-[#23694f]">{progress} %</p><p className="text-sm text-[#627168]">mot målet</p></div></div><div role="progressbar" aria-label={`Sparprogress för ${activeGoal.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="mt-7 h-3 overflow-hidden rounded-full bg-[#dfe5d9]"><div className="h-full rounded-full bg-[#23694f] transition-[width] duration-500" style={{ width: `${progress}%` }} /></div><div className="mt-3 flex justify-between text-xs font-semibold text-[#52705f]"><span>Idag</span><span>{formatCurrency(remaining)} kvar</span></div>{visibleDelta !== null && visibleDelta !== 0 ? <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e6eedf] px-3 py-2 text-sm font-bold text-[#23694f]"><Sparkles size={15} /> {visibleDelta > 0 ? '+' : ''}{formatCurrency(visibleDelta)} sedan sist</p> : null}<div className="mt-7 grid gap-3 border-t border-[#ded3c0] pt-5 sm:grid-cols-3"><div><p className="text-xs font-bold uppercase tracking-wider text-[#52705f]">Kvar</p><p className="mt-1 font-serif text-xl font-bold text-[#123f31]">{formatCurrency(remaining)}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-[#52705f]">Prognos</p><p className="mt-1 font-serif text-xl font-bold text-[#123f31]">{formatTimeline(forecastMonths)}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-[#52705f]">Månadssparande</p><p className="mt-1 font-serif text-xl font-bold text-[#123f31]">{formatCurrency(activeGoal.monthlySaving)}</p></div></div><div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={() => { setOperationError(null); setCapitalUpdateOpen(true); }} className="rounded-2xl bg-[#123f31] px-4 py-3 text-sm font-bold text-[#fffaf0]">Uppdatera huskapital</button><button type="button" onClick={() => { setOperationError(null); setPlanOpen(true); }} className="inline-flex items-center gap-2 rounded-2xl border border-[#ded3c0] bg-white px-4 py-3 text-sm font-bold text-[#123f31]"><Pencil size={15} /> Planera nästa bostad</button></div></div>
        <aside className="relative min-h-72 overflow-hidden bg-[#123f31] p-6 text-[#fffaf0] sm:p-8"><img src="/images/house-sale-editorial.png" alt="Ett ljust svenskt trähus" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen" /><div className="relative"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfe8d7]">Nästa bostad</p><h4 className="mt-3 max-w-xs font-serif text-3xl font-bold leading-tight">{activeGoal.name}</h4><p className="mt-3 max-w-xs text-sm leading-relaxed text-[#d9e4dc]">{activeGoal.housingType === 'CONDOMINIUM' ? 'Bostadsrätt med kontantinsats och valfri buffert.' : 'Kapitalmålet omfattar kontantinsats, lagfart och nya pantbrev.'}</p><div className="mt-8 rounded-2xl border border-white/20 bg-[#123f31]/80 p-4 backdrop-blur"><p className="text-xs font-bold uppercase tracking-wider text-[#bcd0c3]">Bostadspris</p><p className="mt-1 font-serif text-2xl font-bold">{formatCurrency(activeGoal.homePrice)}</p><p className="mt-3 text-sm text-[#d9e4dc]">Kontantinsats {activeGoal.downPaymentPercent} %</p></div></div></aside>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><article className="rounded-[2rem] border border-[#ded3c0] bg-white p-6 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52705f]">Utveckling</p><h3 className="mt-2 font-serif text-3xl font-bold text-[#123f31]">Kapitalet över tid</h3><div className="mt-6 flex h-24 items-end gap-2" aria-label="En enkel historik över sparat kapital">{history.slice(-8).map((entry) => <div key={entry.id} className="flex flex-1 flex-col justify-end"><div className="rounded-t-md bg-[#8fb08a]" style={{ height: `${Math.max(12, Math.round((entry.amount / Math.max(...history.map((item) => item.amount), 1)) * 100))}%` }} /><span className="mt-2 text-center text-[10px] text-[#627168]">{entry.createdAt ? entry.createdAt.toLocaleDateString('sv-SE', { month: 'short' }) : 'Idag'}</span></div>)}{history.length === 0 ? <p className="self-center text-sm text-[#627168]">Uppdatera huskapitalet för att börja se er utveckling här.</p> : null}</div></article><article className="rounded-[2rem] border border-[#ded3c0] bg-[#f4eee2] p-6 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52705f]">Planen</p><h3 className="mt-2 font-serif text-3xl font-bold text-[#123f31]">Så räknar vi</h3><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between gap-3"><dt className="text-[#627168]">Kontantinsats</dt><dd className="font-bold text-[#123f31]">{formatCurrency(calculation.downPayment)}</dd></div>{calculation.includesPropertyFees ? <><div className="flex justify-between gap-3"><dt className="text-[#627168]">Lagfart</dt><dd className="font-bold text-[#123f31]">{formatCurrency(calculation.titleDeedFee)}</dd></div><div className="flex justify-between gap-3"><dt className="text-[#627168]">Nya pantbrev</dt><dd className="font-bold text-[#123f31]">{formatCurrency(calculation.mortgageDeedFee)}</dd></div></> : null}</dl><button type="button" onClick={() => setPlanOpen(true)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#23694f]">Se och ändra plan <ArrowUpRight size={16} /></button></article></div>
      {goals.length > 1 ? <div className="rounded-3xl border border-[#ded3c0] bg-white p-5"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#52705f]">Fler planer</p><p className="mt-1 font-serif text-xl font-bold text-[#123f31]">Välj vilken bostadsresa du vill följa</p></div></div><div className="mt-4 flex flex-wrap gap-2">{goals.map((goal) => <button key={goal.id} type="button" onClick={() => { setActiveGoalId(goal.id); setLatestCapitalDelta(null); }} className={`rounded-xl border px-3 py-2 text-sm font-bold ${goal.id === activeGoal.id ? 'border-[#23694f] bg-[#e6eedf] text-[#123f31]' : 'border-[#ded3c0] text-[#52705f]'}`}>{goal.name}</button>)}</div><button type="button" onClick={() => setGoalPendingDeletion(activeGoal)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#9b4c30]"><Trash2 size={15} /> Ta bort vald plan</button></div> : null}
    </> : null}
    {operationError ? <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{operationError}</p> : null}
    <HousingPlanDrawer open={planOpen} initialPlan={initialPlan} isSaving={isSaving} fallbackFocusRef={createGoalButtonRef} onClose={() => { if (!isSaving) setPlanOpen(false); }} onSave={(plan) => void savePlan(plan)} />
    <CapitalUpdateSheet open={capitalUpdateOpen} currentCapital={activeGoal?.currentSavings ?? 0} isSaving={isSaving} fallbackFocusRef={createGoalButtonRef} onClose={() => { if (!isSaving) setCapitalUpdateOpen(false); }} onSave={(amount) => void saveCapitalUpdate(amount)} />
    {goalPendingDeletion ? <DeleteConfirmationDialog goal={goalPendingDeletion} isDeleting={isDeleting} operationError={operationError} fallbackFocusRef={createGoalButtonRef} onCancel={() => { if (!isDeleting) setGoalPendingDeletion(null); }} onConfirm={() => void confirmDelete()} /> : null}
  </section>;
}
