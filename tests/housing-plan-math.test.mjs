import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateForecastMonths,
  calculateHousingPlan,
  calculateProgress,
} from '../src/lib/housingPlanMath.ts';

const basePlan = {
  housingType: 'HOUSE',
  purchasePrice: 6_500_000,
  downPaymentRate: 15,
  monthlySavings: 10_000,
};

test('house plan includes down payment, title deed and new mortgage deeds', () => {
  const result = calculateHousingPlan(basePlan);

  assert.equal(result.downPayment, 975_000);
  assert.equal(result.loanAmount, 5_525_000);
  assert.equal(result.titleDeedFee, 98_325);
  assert.equal(result.newMortgageDeeds, 5_525_000);
  assert.equal(result.mortgageDeedFee, 110_875);
  assert.equal(result.totalCapitalNeed, 1_184_200);
});

test('condominium hides property registration costs from the capital need', () => {
  const result = calculateHousingPlan({ ...basePlan, housingType: 'CONDOMINIUM', extraBuffer: 20_000 });

  assert.equal(result.titleDeedFee, 0);
  assert.equal(result.mortgageDeedFee, 0);
  assert.equal(result.totalCapitalNeed, 995_000);
  assert.equal(result.includesPropertyFees, false);
});

test('existing mortgage deeds can remove the mortgage-deed fee entirely', () => {
  const result = calculateHousingPlan({ ...basePlan, existingMortgageDeeds: 6_000_000 });

  assert.equal(result.newMortgageDeeds, 0);
  assert.equal(result.mortgageDeedFee, 0);
});

test('higher assessed value is used as the title-deed basis', () => {
  const result = calculateHousingPlan({ ...basePlan, assessedValue: 7_000_000 });

  assert.equal(result.titleDeedBasis, 7_000_000);
  assert.equal(result.titleDeedFee, 105_825);
});

test('owner apartment follows the property-purchase rules', () => {
  const result = calculateHousingPlan({ ...basePlan, housingType: 'OWNER_APARTMENT' });

  assert.equal(result.includesPropertyFees, true);
  assert.equal(result.titleDeedFee, 98_325);
  assert.equal(result.mortgageDeedFee, 110_875);
});

test('progress is clamped between zero and one hundred percent', () => {
  assert.equal(calculateProgress(-1, 1_000_000), 0);
  assert.equal(calculateProgress(1_500_000, 1_000_000), 100);
  assert.equal(calculateProgress(250_000, 1_000_000), 25);
});

test('forecast is unavailable when the remaining goal has no monthly saving', () => {
  assert.equal(calculateForecastMonths(100_000, 500_000, 0), null);
  assert.equal(calculateForecastMonths(500_000, 500_000, 0), 0);
});
