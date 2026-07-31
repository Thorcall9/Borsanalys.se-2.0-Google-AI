import { useEffect, useRef, useState } from 'react';
import { HOUSE_INPUT_LIMITS, type HouseCalculatorInput } from '../../lib/savingsGoalMath';
import type { HousingType } from '../../lib/housingPlanMath';

export interface HouseCalculatorInputsProps {
  input: HouseCalculatorInput;
  errors: Record<string, string>;
  onChange: (field: keyof HouseCalculatorInput, value: number | HousingType | undefined) => void;
  includeSaleCapital?: boolean;
  onIncludeSaleCapitalChange?: (checked: boolean) => void;
}

interface NumberFieldProps {
  field: keyof HouseCalculatorInput;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  input: HouseCalculatorInput;
  errors: Record<string, string>;
  onChange: HouseCalculatorInputsProps['onChange'];
}

function NumberField({
  field,
  label,
  min,
  max,
  step,
  suffix,
  input,
  errors,
  onChange,
}: NumberFieldProps) {
  const error = errors[field];
  const errorId = `${field}-error`;
  const [displayValue, setDisplayValue] = useState(String(input[field]));
  const isEditingRef = useRef(false);

  useEffect(() => {
    if (!isEditingRef.current) {
      setDisplayValue(String(input[field]));
    }
  }, [field, input]);

  return (
    <div className="space-y-2">
      <label
        className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-muted-foreground"
        htmlFor={field}
      >
        <span>{label}</span>
        {suffix ? <span className="font-mono text-primary">{suffix}</span> : null}
      </label>
      <input
        id={field}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        onFocus={() => {
          isEditingRef.current = true;
        }}
        onChange={(event) => {
          setDisplayValue(event.target.value);

          if (event.target.value === '') {
            return;
          }

          const parsedValue = Number.parseFloat(event.target.value);

          if (Number.isFinite(parsedValue)) {
            onChange(field, parsedValue);
          }
        }}
        onBlur={() => {
          isEditingRef.current = false;
          setDisplayValue(String(input[field]));
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive"
      />
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function HouseCalculatorInputs({
  input,
  errors,
  onChange,
  includeSaleCapital = false,
  onIncludeSaleCapitalChange,
}: HouseCalculatorInputsProps) {
  const showSaleEstimateFields = includeSaleCapital;

  return (
    <fieldset className="space-y-5" aria-describedby="house-calculator-assumption">
      <legend className="text-2xl font-serif font-bold tracking-tight">
        Dina förutsättningar
      </legend>
      <p id="house-calculator-assumption" className="text-sm leading-relaxed text-muted-foreground">
        Börja med nästa bostad. Du kan sedan välja att räkna med ett uppskattat kapital från din nuvarande bostad.
      </p>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#cfd9c8] bg-[#fffaf0] p-4 text-sm text-[#123f2d]">
          <input
            type="checkbox"
            checked={includeSaleCapital}
            onChange={(event) => onIncludeSaleCapitalChange?.(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#123f2d]"
          />
          <span>
            <span className="block font-bold">Jag vill räkna med pengar från min nuvarande bostad</span>
            <span className="mt-1 block leading-relaxed text-muted-foreground">Vi visar en uppskattning och räknar in den i kapitalet till nästa bostad.</span>
          </span>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        {showSaleEstimateFields ? (
          <>
            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#456654]">Om du säljer ditt nuvarande hem</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">En enkel uppskattning av vad som kan bli kvar efter bolån och mäklararvode.</p>
            </div>
            <NumberField
              field="currentHomeValue"
              label="Nuvarande bostadsvärde"
              min={HOUSE_INPUT_LIMITS.currentHomeValue.min}
              max={HOUSE_INPUT_LIMITS.currentHomeValue.max}
              step={50000}
              suffix="kr"
              input={input}
              errors={errors}
              onChange={onChange}
            />
            <NumberField
              field="remainingMortgageDebt"
              label="Kvarvarande bolån"
              min={HOUSE_INPUT_LIMITS.remainingMortgageDebt.min}
              max={HOUSE_INPUT_LIMITS.remainingMortgageDebt.max}
              step={50000}
              suffix="kr"
              input={input}
              errors={errors}
              onChange={onChange}
            />
            <NumberField
              field="brokerFeePercent"
              label="Mäklararvode (%)"
              min={HOUSE_INPUT_LIMITS.brokerFeePercent.min}
              max={HOUSE_INPUT_LIMITS.brokerFeePercent.max}
              step={0.1}
              suffix="%"
              input={input}
              errors={errors}
              onChange={onChange}
            />
            <div className="hidden sm:block" aria-hidden="true" />
            <div className="sm:col-span-2 border-t border-[#d9cfbd] pt-5"><p className="text-xs font-bold uppercase tracking-widest text-[#456654]">Nästa bostad</p></div>
          </>
        ) : null}
        <>
        <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold uppercase tracking-wider text-muted-foreground" htmlFor="housingType">Bostadstyp</label><select id="housingType" value={input.housingType ?? 'HOUSE'} onChange={(event) => onChange('housingType', event.target.value as HousingType)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"><option value="HOUSE">Villa</option><option value="CONDOMINIUM">Bostadsrätt</option><option value="OWNER_APARTMENT">Ägarlägenhet</option></select></div>
        <NumberField
          field="homePrice"
          label="Bostadspris"
          min={HOUSE_INPUT_LIMITS.homePrice.min}
          max={HOUSE_INPUT_LIMITS.homePrice.max}
          step={50000}
          suffix="kr"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        <NumberField
          field="downPaymentPercent"
          label="Kontantinsats (%)"
          min={HOUSE_INPUT_LIMITS.downPaymentPercent.min}
          max={HOUSE_INPUT_LIMITS.downPaymentPercent.max}
          step={1}
          suffix="%"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        <NumberField
          field="currentSavings"
          label="Nuvarande sparande"
          min={HOUSE_INPUT_LIMITS.currentSavings.min}
          max={HOUSE_INPUT_LIMITS.currentSavings.max}
          step={5000}
          suffix="kr"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        <NumberField
          field="monthlySaving"
          label="Månadssparande"
          min={HOUSE_INPUT_LIMITS.monthlySaving.min}
          max={HOUSE_INPUT_LIMITS.monthlySaving.max}
          step={500}
          suffix="kr"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        <details className="sm:col-span-2"><summary className="cursor-pointer text-sm font-bold text-[#123f2d]">Fler val</summary><div className="mt-5 grid gap-5 sm:grid-cols-2">
        <NumberField
          field="mortgageRate"
          label="Bolåneränta (%)"
          min={HOUSE_INPUT_LIMITS.mortgageRate.min}
          max={HOUSE_INPUT_LIMITS.mortgageRate.max}
          step={0.1}
          suffix="%"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        <NumberField
          field="amortizationRate"
          label="Amorteringstakt (%)"
          min={HOUSE_INPUT_LIMITS.amortizationRate.min}
          max={HOUSE_INPUT_LIMITS.amortizationRate.max}
          step={0.1}
          suffix="%"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        <NumberField
          field="horizonYears"
          label="Sparhorisont (år)"
          min={HOUSE_INPUT_LIMITS.horizonYears.min}
          max={HOUSE_INPUT_LIMITS.horizonYears.max}
          step={1}
          suffix="år"
          input={input}
          errors={errors}
          onChange={onChange}
        />
        </div></details>
        </>
      </div>
    </fieldset>
  );
}
