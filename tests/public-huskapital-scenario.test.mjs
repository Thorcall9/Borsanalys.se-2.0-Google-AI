import assert from 'node:assert/strict';
import test from 'node:test';

import { calculatePublicHousingScenario } from '../src/lib/savingsGoalMath.ts';

const baseInput = {
  homePrice: 4_000_000,
  housingType: 'HOUSE',
  downPaymentPercent: 15,
  currentSavings: 150_000,
  monthlySaving: 10_000,
  annualReturn: 0,
  mortgageRate: 3.5,
  amortizationRate: 2,
  horizonYears: 10,
  currentHomeValue: 4_000_000,
  remainingMortgageDebt: 2_400_000,
  brokerFeePercent: 2,
};

test('uses savings only until estimated sale proceeds are selected', () => {
  const scenario = calculatePublicHousingScenario({ ...baseInput, includeSaleCapital: false });

  assert.equal(scenario.sale, null);
  assert.equal(scenario.saleCapital, 0);
  assert.equal(scenario.totalAvailableCapital, 150_000);
});

test('adds estimated net sale proceeds to available capital', () => {
  const scenario = calculatePublicHousingScenario({ ...baseInput, includeSaleCapital: true });

  assert.equal(scenario.sale?.netSaleProceeds, 1_520_000);
  assert.equal(scenario.totalAvailableCapital, 1_670_000);
});

test('includes property fees for a villa but not a condominium', () => {
  const villa = calculatePublicHousingScenario({ ...baseInput, includeSaleCapital: false });
  const condominium = calculatePublicHousingScenario({ ...baseInput, housingType: 'CONDOMINIUM', includeSaleCapital: false, extraBuffer: 20_000 });

  assert.equal(villa.plan.includesPropertyFees, true);
  assert.equal(condominium.plan.includesPropertyFees, false);
  assert.equal(condominium.plan.totalCapitalNeed, 620_000);
});

test('never subtracts a negative sale estimate from savings', () => {
  const scenario = calculatePublicHousingScenario({
    ...baseInput,
    includeSaleCapital: true,
    currentHomeValue: 1_000_000,
    remainingMortgageDebt: 1_100_000,
  });

  assert.equal(scenario.saleCapital, 0);
  assert.equal(scenario.totalAvailableCapital, 150_000);
});
