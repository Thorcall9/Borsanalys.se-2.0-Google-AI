import type { HousingPlan } from './housingPlanMath';
import { housingPurchaseRules } from './housingPurchaseRules';
import type { HouseCalculatorInput } from './savingsGoalMath';

export function toHousingPlan(input: HouseCalculatorInput): HousingPlan {
  return {
    housingType: input.housingType ?? 'HOUSE',
    purchasePrice: input.homePrice,
    downPaymentRate: input.downPaymentPercent ?? housingPurchaseRules.defaultDownPaymentRate,
    monthlySavings: input.monthlySaving,
    existingMortgageDeeds: input.existingMortgageDeeds ?? 0,
    assessedValue: input.assessedValue,
    extraBuffer: input.extraBuffer ?? 0,
  };
}
