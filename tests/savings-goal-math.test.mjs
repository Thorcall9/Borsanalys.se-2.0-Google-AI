import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateSaleEquity,
  calculateHousePreview,
  calculateSavingsProjection,
  validateHouseInput,
} from '../src/lib/savingsGoalMath.ts';

const baseInput = {
  homePrice: 4_000_000,
  downPaymentPercent: 15,
  currentSavings: 200_000,
  monthlySaving: 10_000,
  annualReturn: 6,
  mortgageRate: 4.5,
  amortizationRate: 2,
  horizonYears: 5,
  currentHomeValue: 4_000_000,
  remainingMortgageDebt: 2_400_000,
  brokerFeePercent: 2,
};

test('calculateSaleEquity estimates proceeds after mortgage debt and broker fee', () => {
  const preview = calculateSaleEquity(baseInput);

  assert.equal(preview.brokerFee, 80_000);
  assert.equal(preview.netSaleProceeds, 1_520_000);
  assert.equal(preview.negativeEquity, false);
});

test('calculateSaleEquity never shows a negative amount available for the next home', () => {
  const preview = calculateSaleEquity({
    ...baseInput,
    currentHomeValue: 2_000_000,
    remainingMortgageDebt: 2_100_000,
    brokerFeePercent: 2,
  });

  assert.equal(preview.brokerFee, 40_000);
  assert.equal(preview.netSaleProceeds, 0);
  assert.equal(preview.negativeEquity, true);
});

test('calculateHousePreview derives the down payment and zero-return months to goal', () => {
  const preview = calculateHousePreview({
    ...baseInput,
    annualReturn: 0,
  });

  assert.equal(preview.downPayment, 600_000);
  assert.equal(preview.remainingToSave, 400_000);
  assert.equal(preview.monthsToGoal, 40);
});

test('calculateHousePreview returns zero months when the down payment goal is already reached', () => {
  const preview = calculateHousePreview({
    ...baseInput,
    currentSavings: 700_000,
    monthlySaving: 0,
    annualReturn: 0,
  });

  assert.equal(preview.remainingToSave, 0);
  assert.equal(preview.monthsToGoal, 0);
});

test('calculateHousePreview can use opted-in sale capital as a one-off starting amount', () => {
  const withoutSaleCapital = calculateHousePreview({
    ...baseInput,
    currentSavings: 150_000,
    monthlySaving: 0,
    annualReturn: 0,
  });
  const withSaleCapital = calculateHousePreview({
    ...baseInput,
    currentSavings: 1_670_000,
    monthlySaving: 0,
    annualReturn: 0,
  });

  assert.equal(withoutSaleCapital.remainingToSave, 450_000);
  assert.equal(withSaleCapital.remainingToSave, 0);
});

test('calculateHousePreview marks the goal as impossible without savings or growth', () => {
  const preview = calculateHousePreview({
    ...baseInput,
    currentSavings: 100_000,
    monthlySaving: 0,
    annualReturn: 0,
  });

  assert.equal(preview.downPayment, 600_000);
  assert.equal(preview.remainingToSave, 500_000);
  assert.equal(preview.monthsToGoal, null);
});

test('calculateHousePreview computes the simplified monthly housing cost from interest and amortization', () => {
  const preview = calculateHousePreview(baseInput);

  assert.equal(preview.monthlyInterest, 12_750);
  assert.equal(preview.monthlyAmortization, 5_666.666666666667);
  assert.equal(preview.monthlyHousingCost, 18_416.666666666668);
});

test('calculateSavingsProjection includes the first and last yearly projection points', () => {
  const projection = calculateSavingsProjection({
    ...baseInput,
    currentSavings: 100_000,
    monthlySaving: 5_000,
    annualReturn: 12,
    horizonYears: 2,
  });

  assert.equal(projection.length, 3);

  assert.deepEqual(projection[0], {
    year: 0,
    contributions: 100_000,
    growth: 0,
    balance: 100_000,
    goal: 600_000,
  });

  const lastPoint = projection.at(-1);
  assert.equal(lastPoint.year, 2);
  assert.equal(lastPoint.goal, 600_000);
  assert.equal(lastPoint.contributions, 220_000);
  assert.ok(Math.abs(lastPoint.growth - 43_189.46236180817) < 1e-9);
  assert.ok(Math.abs(lastPoint.balance - 263_189.46236180817) < 1e-9);
});

test('validateHouseInput returns field errors instead of throwing', () => {
  const errors = validateHouseInput({
    ...baseInput,
    homePrice: 0,
    downPaymentPercent: 105,
    currentSavings: -1,
    monthlySaving: -1,
    annualReturn: -101,
    mortgageRate: -1,
    amortizationRate: -1,
    horizonYears: 0,
    currentHomeValue: -1,
    remainingMortgageDebt: -1,
    brokerFeePercent: -1,
  });

  assert.deepEqual(errors, {
    homePrice: 'Bostadspris måste vara mellan 100 000 och 100 000 000 kr.',
    downPaymentPercent: 'Kontantinsats måste vara mellan 0 och 100 procent.',
    currentSavings: 'Nuvarande sparande måste vara mellan 0 och 100 000 000 kr.',
    monthlySaving: 'Månadssparande måste vara mellan 0 och 1 000 000 kr.',
    annualReturn: 'Årlig avkastning måste vara mellan -100 och 30 procent.',
    mortgageRate: 'Bolåneränta måste vara mellan 0 och 30 procent.',
    amortizationRate: 'Amorteringstakt måste vara mellan 0 och 30 procent.',
    horizonYears: 'Sparhorisont måste vara mellan 1 och 50 år.',
    currentHomeValue: 'Nuvarande bostadsvärde måste vara mellan 0 och 100 000 000 kr.',
    remainingMortgageDebt: 'Kvarvarande bolån måste vara mellan 0 och 100 000 000 kr.',
    brokerFeePercent: 'Mäklararvode måste vara mellan 0 och 20 procent.',
  });
});
