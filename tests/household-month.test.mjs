import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyHouseholdMonth, householdTotals, settlementDate, validHouseholdMonth } from '../src/lib/householdMonth.ts';

test('income belongs to the selected month and investments show before the 24th', () => {
  const month = { ...emptyHouseholdMonth('2026-10'), calleSalary: 30000, idaSalary: 27000,
    benefit: 1000, childAllowance: 2000, childrenInvested: 1000, callePension: 700, idaPension: 700 };
  assert.deepEqual(householdTotals(month), { income: 60000, invested: 2400, liquid: 0, saved: 2400, rate: 4, complete: false });
  assert.equal(settlementDate(month.month).getDate(), 24);

  const finished = householdTotals({ ...month, liquidSavings: 12000 });
  assert.equal(finished.saved, 14400);
  assert.equal(finished.rate, 24);
  assert.equal(finished.complete, true);
  assert.equal(householdTotals({ ...month, liquidSavings: 0 }).complete, true);
});

test('invalid months and non-finite amounts cannot be saved', () => {
  assert.equal(validHouseholdMonth(emptyHouseholdMonth('2026-13')), false);
  assert.equal(validHouseholdMonth({ ...emptyHouseholdMonth('2026-10'), otherInvested: Number.NaN }), false);
  assert.equal(validHouseholdMonth({ ...emptyHouseholdMonth('2026-10'), liquidSavings: -1 }), false);
});
