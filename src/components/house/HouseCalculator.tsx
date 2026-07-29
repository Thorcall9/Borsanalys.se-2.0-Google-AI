import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart3, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  calculateHousePreview,
  calculateSaleEquity,
  calculateSavingsProjection,
  validateHouseInput,
  type HouseCalculatorInput,
} from '../../lib/savingsGoalMath';
import { HouseCalculatorInputs } from './HouseCalculatorInputs';
import { HouseCalculatorPreview } from './HouseCalculatorPreview';
import { HouseSaleEquityPreview } from './HouseSaleEquityPreview';
import { MemberPlanPreview } from './MemberPlanPreview';
import { MemberUnlockPanel } from './MemberUnlockPanel';

export interface HouseCalculatorProps {
  onSave?: (input: HouseCalculatorInput) => void | Promise<void>;
}

const DEFAULT_INPUT: HouseCalculatorInput = {
  homePrice: 4_000_000,
  downPaymentPercent: 15,
  currentSavings: 150_000,
  monthlySaving: 10_000,
  annualReturn: 5,
  mortgageRate: 3.5,
  amortizationRate: 2,
  horizonYears: 10,
  currentHomeValue: 4_000_000,
  remainingMortgageDebt: 2_400_000,
  brokerFeePercent: 2,
};

const compactNumberFormatter = new Intl.NumberFormat('sv-SE', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function HouseCalculator({ onSave }: HouseCalculatorProps) {
  const { user, openLoginModal } = useAuth();
  const [input, setInput] = useState<HouseCalculatorInput>(DEFAULT_INPUT);
  const [isSaving, setIsSaving] = useState(false);

  const errors = useMemo(() => validateHouseInput(input), [input]);
  const hasValidationErrors = Object.keys(errors).length > 0;
  const preview = useMemo(
    () => (hasValidationErrors ? null : calculateHousePreview(input)),
    [hasValidationErrors, input],
  );
  const projection = useMemo(
    () => (hasValidationErrors ? [] : calculateSavingsProjection(input)),
    [hasValidationErrors, input],
  );
  const saleEquityPreview = useMemo(
    () => (hasValidationErrors ? null : calculateSaleEquity(input)),
    [hasValidationErrors, input],
  );
  const isAuthenticated = Boolean(user);

  const handleInputChange = useCallback((field: keyof HouseCalculatorInput, value: number) => {
    setInput((currentInput) => ({ ...currentInput, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!onSave || hasValidationErrors) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(input);
    } finally {
      setIsSaving(false);
    }
  }, [hasValidationErrors, input, onSave]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
    >
      <div className="grid lg:grid-cols-12">
        <div className="border-b border-[#e4dac8] bg-[#f2ecdf] p-6 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r [&_legend]:text-[#123f2d]">
          <HouseCalculatorInputs input={input} errors={errors} onChange={handleInputChange} showSaleEstimateFields />
        </div>

        <div className="space-y-8 p-6 sm:p-8 lg:col-span-7">
          {!isAuthenticated ? (
            <div className="space-y-6">
              <HouseCalculatorPreview preview={preview} hasValidationErrors={hasValidationErrors} />
              <div className="grid gap-6 lg:grid-cols-2">
                <HouseSaleEquityPreview
                  preview={saleEquityPreview}
                  hasValidationErrors={hasValidationErrors}
                  currentHomeValue={input.currentHomeValue}
                  remainingMortgageDebt={input.remainingMortgageDebt}
                />
                <MemberPlanPreview onUnlock={openLoginModal} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <HouseCalculatorPreview preview={preview} hasValidationErrors={hasValidationErrors} />
              <HouseSaleEquityPreview
                preview={saleEquityPreview}
                hasValidationErrors={hasValidationErrors}
                currentHomeValue={input.currentHomeValue}
                remainingMortgageDebt={input.remainingMortgageDebt}
              />
            </div>
          )}

          {isAuthenticated && !hasValidationErrors ? (
            <section className="space-y-4" aria-labelledby="full-projection-heading">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 id="full-projection-heading" className="flex items-center gap-2 text-xl font-serif font-bold">
                    <BarChart3 size={20} className="text-primary" aria-hidden="true" />
                    År-för-år-prognos
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">Utveckling baserat på dina inmatade antaganden.</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Info size={14} aria-hidden="true" />
                  Ej personlig rådgivning
                </span>
              </div>

              <div className="h-72 w-full rounded-2xl border border-border bg-background p-4 sm:p-5">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={projection} margin={{ top: 8, right: 4, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="houseProjectionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: 'currentColor' }}
                      className="text-muted-foreground"
                      tickFormatter={(year) => `År ${year}`}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={48}
                      tick={{ fontSize: 11, fill: 'currentColor' }}
                      className="text-muted-foreground"
                      tickFormatter={(value) => compactNumberFormatter.format(Number(value))}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-card)',
                        color: 'var(--color-foreground)',
                        fontSize: '12px',
                      }}
                      formatter={(value: number | string | undefined) => formatCurrency(Number(value ?? 0))}
                      labelFormatter={(year) => `År ${year}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      name="Prognos"
                      stroke="var(--color-primary)"
                      strokeWidth={3}
                      fill="url(#houseProjectionGradient)"
                    />
                    <Line
                      type="monotone"
                      dataKey="goal"
                      name="Kontantinsats"
                      stroke="var(--color-muted-foreground)"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <details className="rounded-2xl border border-border bg-section-alt/30 p-4">
                <summary className="cursor-pointer text-sm font-bold text-foreground">Visa prognos i tabell</summary>
                <div className="mt-4 max-h-64 overflow-auto">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">Årlig prognos för sparande och kontantinsats</caption>
                    <thead className="sticky top-0 bg-section-alt text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-2 py-2 font-bold">År</th>
                        <th scope="col" className="px-2 py-2 font-bold">Prognos</th>
                        <th scope="col" className="px-2 py-2 font-bold">Kontantinsats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projection.map(({ year, balance, goal }) => (
                        <tr key={year} className="border-t border-border">
                          <th scope="row" className="px-2 py-2 font-medium text-foreground">År {year}</th>
                          <td className="px-2 py-2 text-muted-foreground">{formatCurrency(balance)}</td>
                          <td className="px-2 py-2 text-muted-foreground">{formatCurrency(goal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </section>
          ) : null}

          {isAuthenticated && !hasValidationErrors ? (
            <MemberUnlockPanel
              isAuthenticated
              onUnlock={openLoginModal}
              onSave={handleSave}
              isSaving={isSaving}
            />
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
