import { housingPurchaseRules } from './housingPurchaseRules';

export type HousingType = 'HOUSE' | 'CONDOMINIUM' | 'OWNER_APARTMENT';

export interface HousingPlan {
  housingType: HousingType;
  purchasePrice: number;
  downPaymentRate: number;
  monthlySavings: number;
  existingMortgageDeeds?: number;
  assessedValue?: number;
  extraBuffer?: number;
}

export interface HousingPlanCalculation {
  downPayment: number;
  loanAmount: number;
  titleDeedBasis: number;
  titleDeedFee: number;
  newMortgageDeeds: number;
  mortgageDeedFee: number;
  totalCapitalNeed: number;
  includesPropertyFees: boolean;
}

function nonNegative(value: number | undefined) {
  return Math.max(0, value ?? 0);
}

function isPropertyPurchase(type: HousingType) {
  return type === 'HOUSE' || type === 'OWNER_APARTMENT';
}

export function calculateStampDuty(basis: number) {
  const titleDeedBasis = nonNegative(basis);
  return titleDeedBasis > 0
    ? titleDeedBasis * housingPurchaseRules.titleDeedRate + housingPurchaseRules.titleDeedAdministrationFee
    : 0;
}

export function calculateMortgageDeedCost(newMortgageDeeds: number) {
  const newDeeds = nonNegative(newMortgageDeeds);
  return newDeeds > 0
    ? newDeeds * housingPurchaseRules.mortgageDeedRate + housingPurchaseRules.mortgageDeedAdministrationFee
    : 0;
}

export function calculateProgress(currentCapital: number, capitalGoal: number) {
  const goal = nonNegative(capitalGoal);
  if (goal === 0) return 0;
  return Math.min(100, Math.max(0, Math.round((nonNegative(currentCapital) / goal) * 100)));
}

export function calculateForecastMonths(currentCapital: number, capitalGoal: number, monthlySavings: number) {
  const remaining = Math.max(0, nonNegative(capitalGoal) - nonNegative(currentCapital));
  if (remaining === 0) return 0;
  const monthly = nonNegative(monthlySavings);
  return monthly > 0 ? Math.ceil(remaining / monthly) : null;
}

export function calculateDownPayment(purchasePrice: number, downPaymentRate: number) {
  return nonNegative(purchasePrice) * Math.max(0, Math.min(100, downPaymentRate)) / 100;
}

export function calculateLoanAmount(purchasePrice: number, downPayment: number) {
  return Math.max(0, nonNegative(purchasePrice) - nonNegative(downPayment));
}

export function calculateHousingPlan(plan: HousingPlan): HousingPlanCalculation {
  const purchasePrice = nonNegative(plan.purchasePrice);
  const downPayment = calculateDownPayment(purchasePrice, plan.downPaymentRate);
  const loanAmount = calculateLoanAmount(purchasePrice, downPayment);
  const includesPropertyFees = isPropertyPurchase(plan.housingType);
  const titleDeedBasis = includesPropertyFees ? Math.max(purchasePrice, nonNegative(plan.assessedValue)) : 0;
  const titleDeedFee = includesPropertyFees ? calculateStampDuty(titleDeedBasis) : 0;
  const newMortgageDeeds = includesPropertyFees
    ? Math.max(0, loanAmount - nonNegative(plan.existingMortgageDeeds))
    : 0;
  const mortgageDeedFee = includesPropertyFees ? calculateMortgageDeedCost(newMortgageDeeds) : 0;
  const totalCapitalNeed = downPayment + titleDeedFee + mortgageDeedFee + nonNegative(plan.extraBuffer);

  return {
    downPayment,
    loanAmount,
    titleDeedBasis,
    titleDeedFee,
    newMortgageDeeds,
    mortgageDeedFee,
    totalCapitalNeed,
    includesPropertyFees,
  };
}
