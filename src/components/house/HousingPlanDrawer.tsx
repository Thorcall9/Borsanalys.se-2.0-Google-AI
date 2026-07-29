import { useEffect, useState, type RefObject } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import type { HousingPlan, HousingType } from '../../lib/housingPlanMath';
import { useDialogFocus } from './useDialogFocus';

export interface HousingPlanDrawerProps {
  open: boolean;
  initialPlan: HousingPlan;
  isSaving?: boolean;
  fallbackFocusRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
  onSave: (plan: HousingPlan) => void;
}

type PlanForm = Record<'purchasePrice' | 'downPaymentRate' | 'monthlySavings' | 'assessedValue' | 'existingMortgageDeeds' | 'extraBuffer', string> & {
  housingType: HousingType;
};

function toForm(plan: HousingPlan): PlanForm {
  return {
    housingType: plan.housingType,
    purchasePrice: String(plan.purchasePrice),
    downPaymentRate: String(plan.downPaymentRate),
    monthlySavings: String(plan.monthlySavings),
    assessedValue: plan.assessedValue ? String(plan.assessedValue) : '',
    existingMortgageDeeds: plan.existingMortgageDeeds ? String(plan.existingMortgageDeeds) : '',
    extraBuffer: plan.extraBuffer ? String(plan.extraBuffer) : '',
  };
}

function toNumber(value: string) {
  const numeric = Number(value.replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(numeric) ? Math.max(0, numeric) : 0;
}

function NumericField({ id, label, suffix, value, onChange }: {
  id: string;
  label: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#52705f]">{label}</span>
      <span className="mt-2 flex overflow-hidden rounded-2xl border border-[#ded3c0] bg-white shadow-sm transition focus-within:border-[#23694f] focus-within:ring-2 focus-within:ring-[#23694f]/15">
        <input
          id={id}
          value={value}
          inputMode="decimal"
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-semibold text-[#123f31] outline-none"
        />
        <span className="flex items-center px-3 text-xs font-bold text-[#52705f]">{suffix}</span>
      </span>
    </label>
  );
}

export function HousingPlanDrawer({ open, initialPlan, isSaving = false, fallbackFocusRef, onClose, onSave }: HousingPlanDrawerProps) {
  const [form, setForm] = useState<PlanForm>(() => toForm(initialPlan));
  const [showMore, setShowMore] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const dialogRef = useDialogFocus<HTMLElement>(open, fallbackFocusRef);

  useEffect(() => {
    if (open) {
      setForm(toForm(initialPlan));
      setShowMore(false);
      setValidationError(null);
    }
  }, [initialPlan, open]);

  if (!open) return null;

  const update = (field: keyof PlanForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const propertyPurchase = form.housingType !== 'CONDOMINIUM';

  return (
    <div className="fixed inset-0 z-[200] flex justify-end" role="presentation">
      <button type="button" aria-label="Stäng bostadsplan" onClick={onClose} className="absolute inset-0 bg-[#123f31]/35 backdrop-blur-sm" />
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="housing-plan-title" tabIndex={-1} className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-[#fffaf0] shadow-2xl">
        <header className="flex items-start justify-between border-b border-[#ded3c0] px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">Er bostadsresa</p>
            <h2 id="housing-plan-title" className="mt-2 font-serif text-3xl font-bold text-[#123f31]">Planera nästa bostad</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#627168]">Börja enkelt. Vi räknar fram resten utifrån era val.</p>
          </div>
          <button type="button" onClick={onClose} disabled={isSaving} className="rounded-xl p-2 text-[#52705f] hover:bg-[#f4eee2]" aria-label="Stäng"><X size={20} /></button>
        </header>

        <form className="flex flex-1 flex-col px-5 py-6 sm:px-7" onSubmit={(event) => {
          event.preventDefault();
          const purchasePrice = toNumber(form.purchasePrice);
          const downPaymentRate = toNumber(form.downPaymentRate);
          if (purchasePrice <= 0) {
            setValidationError('Ange ett bostadspris större än 0 kr.');
            return;
          }
          if (downPaymentRate < 1 || downPaymentRate > 100) {
            setValidationError('Kontantinsatsen behöver vara mellan 1 och 100 %.');
            return;
          }
          setValidationError(null);
          onSave({
            housingType: form.housingType,
            purchasePrice,
            downPaymentRate,
            monthlySavings: toNumber(form.monthlySavings),
            assessedValue: toNumber(form.assessedValue),
            existingMortgageDeeds: toNumber(form.existingMortgageDeeds),
            extraBuffer: toNumber(form.extraBuffer),
          });
        }}>
          <div className="space-y-6">
            <NumericField id="housing-plan-price" label="Bostadspris" suffix="kr" value={form.purchasePrice} onChange={(value) => update('purchasePrice', value)} />
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.12em] text-[#52705f]">Bostadstyp</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {([['HOUSE', 'Villa'], ['CONDOMINIUM', 'Bostadsrätt'], ['OWNER_APARTMENT', 'Ägarlägenhet']] as const).map(([type, label]) => (
                  <button key={type} type="button" onClick={() => setForm((current) => ({ ...current, housingType: type }))} aria-pressed={form.housingType === type} className={`rounded-2xl border px-2 py-3 text-sm font-bold transition ${form.housingType === type ? 'border-[#23694f] bg-[#23694f] text-white' : 'border-[#ded3c0] bg-white text-[#123f31] hover:border-[#8fb08a]'}`}>{label}</button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <NumericField id="housing-plan-down-payment" label="Kontantinsats" suffix="%" value={form.downPaymentRate} onChange={(value) => update('downPaymentRate', value)} />
              <NumericField id="housing-plan-monthly-savings" label="Månadssparande" suffix="kr" value={form.monthlySavings} onChange={(value) => update('monthlySavings', value)} />
            </div>

            <div className="rounded-2xl border border-[#ded3c0] bg-[#f7f2e8] p-4">
              <button type="button" onClick={() => setShowMore((shown) => !shown)} className="flex w-full items-center justify-between gap-3 text-left text-sm font-bold text-[#123f31]">
                <span>Fler val</span>{showMore ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {showMore ? <div className="mt-5 space-y-5 border-t border-[#ded3c0] pt-5">
                {propertyPurchase ? <>
                  <NumericField id="housing-plan-assessed-value" label="Taxeringsvärde" suffix="kr" value={form.assessedValue} onChange={(value) => update('assessedValue', value)} />
                  <NumericField id="housing-plan-existing-deeds" label="Befintliga pantbrev" suffix="kr" value={form.existingMortgageDeeds} onChange={(value) => update('existingMortgageDeeds', value)} />
                </> : null}
                <NumericField id="housing-plan-buffer" label="Extra buffert" suffix="kr" value={form.extraBuffer} onChange={(value) => update('extraBuffer', value)} />
              </div> : null}
            </div>
            {validationError ? <p role="alert" className="rounded-xl border border-[#dec5b6] bg-[#f7eee6] px-4 py-3 text-sm font-medium text-[#9b4c30]">{validationError}</p> : null}
          </div>
          <div className="mt-auto pt-8">
            <button data-dialog-initial-focus type="submit" disabled={isSaving} className="w-full rounded-2xl bg-[#123f31] px-4 py-4 text-sm font-bold text-[#fffaf0] transition hover:bg-[#1b5542] disabled:opacity-60">{isSaving ? 'Sparar…' : 'Spara bostadsplan'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
