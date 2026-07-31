import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  calculatePublicHousingScenario,
  validateHouseInput,
  type HouseCalculatorInput,
} from '../../lib/savingsGoalMath';
import { HouseCalculatorInputs } from './HouseCalculatorInputs';
import { HouseCalculatorPreview } from './HouseCalculatorPreview';
import { HouseSaleEquityPreview } from './HouseSaleEquityPreview';

const DEFAULT_INPUT: HouseCalculatorInput = {
  homePrice: 4_000_000, housingType: 'HOUSE', downPaymentPercent: 15,
  currentSavings: 150_000, monthlySaving: 10_000, annualReturn: 0,
  mortgageRate: 3.5, amortizationRate: 2, horizonYears: 10,
  currentHomeValue: 4_000_000, remainingMortgageDebt: 2_400_000, brokerFeePercent: 2,
};

export function HouseCalculator() {
  const [input, setInput] = useState<HouseCalculatorInput>(DEFAULT_INPUT);
  const [includeSaleCapital, setIncludeSaleCapital] = useState(false);
  const errors = useMemo(() => validateHouseInput(input), [input]);
  const hasValidationErrors = Object.keys(errors).length > 0;
  const scenario = useMemo(() => hasValidationErrors ? null : calculatePublicHousingScenario({
    ...input, housingType: input.housingType ?? 'HOUSE', includeSaleCapital,
  }), [hasValidationErrors, includeSaleCapital, input]);
  const handleInputChange = useCallback((field: keyof HouseCalculatorInput, value: number | HouseCalculatorInput['housingType']) => {
    setInput((current) => ({ ...current, [field]: value }));
  }, []);

  return <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
    <div className="grid lg:grid-cols-12">
      <div className="bg-[#f2ecdf] p-6 sm:p-8 lg:col-span-5 lg:border-r">
        <HouseCalculatorInputs input={input} errors={errors} onChange={handleInputChange} includeSaleCapital={includeSaleCapital} onIncludeSaleCapitalChange={setIncludeSaleCapital} />
      </div>
      <div className="space-y-7 p-6 sm:p-8 lg:col-span-7">
        <HouseCalculatorPreview
          preview={scenario ? { downPayment: scenario.plan.downPayment, remainingToSave: scenario.remainingCapital, monthsToGoal: scenario.forecastMonths, monthlyInterest: 0, monthlyAmortization: 0, monthlyHousingCost: scenario.monthlyHousingCost } : null}
          hasValidationErrors={hasValidationErrors}
          capitalSummary={scenario ? { currentSavings: input.currentSavings, saleCapital: scenario.saleCapital, totalCapital: scenario.totalAvailableCapital, includesSaleCapital: includeSaleCapital, capitalGoal: scenario.plan.totalCapitalNeed, progressPercent: scenario.progressPercent, includesPropertyFees: scenario.plan.includesPropertyFees, titleDeedFee: scenario.plan.titleDeedFee, mortgageDeedFee: scenario.plan.mortgageDeedFee } : undefined}
        />
        {includeSaleCapital ? <HouseSaleEquityPreview preview={scenario?.sale ?? null} hasValidationErrors={hasValidationErrors} currentHomeValue={input.currentHomeValue} remainingMortgageDebt={input.remainingMortgageDebt} /> : null}
        <p className="rounded-xl border border-[#d9cfbd] bg-[#fffaf0] p-4 text-xs leading-relaxed text-muted-foreground"><strong className="text-[#123f2d]">Uppskattning – inte ett löfte.</strong> Beräkningen är förenklad och tar inte hänsyn till vinstskatt, flyttkostnader, bankavgifter, pantbrev eller andra möjliga kostnader.</p>
      </div>
    </div>
  </motion.section>;
}
