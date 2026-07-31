import {
  calculateForecastMonths,
  calculateHousingPlan,
  calculateProgress,
  type HousingPlanCalculation,
  type HousingType,
} from './housingPlanMath';

export interface HouseCalculatorInput {
  homePrice: number;
  downPaymentPercent: number;
  currentSavings: number;
  monthlySaving: number;
  annualReturn: number;
  mortgageRate: number;
  amortizationRate: number;
  horizonYears: number;
  currentHomeValue: number;
  remainingMortgageDebt: number;
  brokerFeePercent: number;
  housingType?: HousingType;
  existingMortgageDeeds?: number;
  assessedValue?: number;
  extraBuffer?: number;
}

export interface HousePreview {
  downPayment: number;
  remainingToSave: number;
  monthsToGoal: number | null;
  monthlyInterest: number;
  monthlyAmortization: number;
  monthlyHousingCost: number;
}

export interface SavingsProjectionPoint {
  year: number;
  contributions: number;
  growth: number;
  balance: number;
  goal: number;
}

export interface SaleEquityPreview {
  brokerFee: number;
  netSaleProceeds: number;
  negativeEquity: boolean;
}

export interface PublicHousingScenarioInput extends HouseCalculatorInput {
  housingType: HousingType;
  includeSaleCapital: boolean;
}

export interface PublicHousingScenario {
  plan: HousingPlanCalculation;
  sale: SaleEquityPreview | null;
  saleCapital: number;
  totalAvailableCapital: number;
  remainingCapital: number;
  progressPercent: number;
  forecastMonths: number | null;
  monthlyHousingCost: number;
}

const MAX_PROJECTION_YEARS = 100;
const MONTHS_PER_YEAR = 12;

export const HOUSE_INPUT_LIMITS = {
  homePrice: { min: 100_000, max: 100_000_000 },
  downPaymentPercent: { min: 0, max: 100 },
  currentSavings: { min: 0, max: 100_000_000 },
  monthlySaving: { min: 0, max: 1_000_000 },
  annualReturn: { min: -100, max: 30 },
  mortgageRate: { min: 0, max: 30 },
  amortizationRate: { min: 0, max: 30 },
  horizonYears: { min: 1, max: 50 },
  currentHomeValue: { min: 0, max: 100_000_000 },
  remainingMortgageDebt: { min: 0, max: 100_000_000 },
  brokerFeePercent: { min: 0, max: 20 },
} as const;

function isFiniteNumber(value: number) {
  return Number.isFinite(value);
}

function getMonthlyReturnRate(annualReturn: number) {
  return annualReturn / 100 / MONTHS_PER_YEAR;
}

function getDownPayment(homePrice: number, downPaymentPercent: number) {
  return homePrice * (downPaymentPercent / 100);
}

function getLoanAmount(homePrice: number, downPayment: number) {
  return Math.max(0, homePrice - downPayment);
}

function projectBalance(currentSavings: number, monthlySaving: number, monthlyRate: number, months: number) {
  let balance = currentSavings;

  for (let month = 0; month < months; month += 1) {
    balance = (balance + monthlySaving) * (1 + monthlyRate);
  }

  return balance;
}

export function validateHouseInput(input: HouseCalculatorInput): Record<string, string> {
  const errors: Record<string, string> = {};

  if (
    !isFiniteNumber(input.homePrice) ||
    input.homePrice < HOUSE_INPUT_LIMITS.homePrice.min ||
    input.homePrice > HOUSE_INPUT_LIMITS.homePrice.max
  ) {
    errors.homePrice = 'Bostadspris måste vara mellan 100 000 och 100 000 000 kr.';
  }

  if (
    !isFiniteNumber(input.currentHomeValue) ||
    input.currentHomeValue < HOUSE_INPUT_LIMITS.currentHomeValue.min ||
    input.currentHomeValue > HOUSE_INPUT_LIMITS.currentHomeValue.max
  ) {
    errors.currentHomeValue = 'Nuvarande bostadsvärde måste vara mellan 0 och 100 000 000 kr.';
  }

  if (
    !isFiniteNumber(input.remainingMortgageDebt) ||
    input.remainingMortgageDebt < HOUSE_INPUT_LIMITS.remainingMortgageDebt.min ||
    input.remainingMortgageDebt > HOUSE_INPUT_LIMITS.remainingMortgageDebt.max
  ) {
    errors.remainingMortgageDebt = 'Kvarvarande bolån måste vara mellan 0 och 100 000 000 kr.';
  }

  if (
    !isFiniteNumber(input.brokerFeePercent) ||
    input.brokerFeePercent < HOUSE_INPUT_LIMITS.brokerFeePercent.min ||
    input.brokerFeePercent > HOUSE_INPUT_LIMITS.brokerFeePercent.max
  ) {
    errors.brokerFeePercent = 'Mäklararvode måste vara mellan 0 och 20 procent.';
  }

  if (
    !isFiniteNumber(input.downPaymentPercent) ||
    input.downPaymentPercent < HOUSE_INPUT_LIMITS.downPaymentPercent.min ||
    input.downPaymentPercent > HOUSE_INPUT_LIMITS.downPaymentPercent.max
  ) {
    errors.downPaymentPercent = 'Kontantinsats måste vara mellan 0 och 100 procent.';
  }

  if (
    !isFiniteNumber(input.currentSavings) ||
    input.currentSavings < HOUSE_INPUT_LIMITS.currentSavings.min ||
    input.currentSavings > HOUSE_INPUT_LIMITS.currentSavings.max
  ) {
    errors.currentSavings = 'Nuvarande sparande måste vara mellan 0 och 100 000 000 kr.';
  }

  if (
    !isFiniteNumber(input.monthlySaving) ||
    input.monthlySaving < HOUSE_INPUT_LIMITS.monthlySaving.min ||
    input.monthlySaving > HOUSE_INPUT_LIMITS.monthlySaving.max
  ) {
    errors.monthlySaving = 'Månadssparande måste vara mellan 0 och 1 000 000 kr.';
  }

  if (
    !isFiniteNumber(input.annualReturn) ||
    input.annualReturn < HOUSE_INPUT_LIMITS.annualReturn.min ||
    input.annualReturn > HOUSE_INPUT_LIMITS.annualReturn.max
  ) {
    errors.annualReturn = 'Årlig avkastning måste vara mellan -100 och 30 procent.';
  }

  if (
    !isFiniteNumber(input.mortgageRate) ||
    input.mortgageRate < HOUSE_INPUT_LIMITS.mortgageRate.min ||
    input.mortgageRate > HOUSE_INPUT_LIMITS.mortgageRate.max
  ) {
    errors.mortgageRate = 'Bolåneränta måste vara mellan 0 och 30 procent.';
  }

  if (
    !isFiniteNumber(input.amortizationRate) ||
    input.amortizationRate < HOUSE_INPUT_LIMITS.amortizationRate.min ||
    input.amortizationRate > HOUSE_INPUT_LIMITS.amortizationRate.max
  ) {
    errors.amortizationRate = 'Amorteringstakt måste vara mellan 0 och 30 procent.';
  }

  if (
    !isFiniteNumber(input.horizonYears) ||
    input.horizonYears < HOUSE_INPUT_LIMITS.horizonYears.min ||
    input.horizonYears > HOUSE_INPUT_LIMITS.horizonYears.max
  ) {
    errors.horizonYears = 'Sparhorisont måste vara mellan 1 och 50 år.';
  }

  return errors;
}

export function calculateHousePreview(input: HouseCalculatorInput): HousePreview {
  const downPayment = getDownPayment(input.homePrice, input.downPaymentPercent);
  const remainingToSave = Math.max(0, downPayment - input.currentSavings);
  const monthlyRate = getMonthlyReturnRate(input.annualReturn);
  const loanAmount = getLoanAmount(input.homePrice, downPayment);
  const monthlyInterest = loanAmount * (input.mortgageRate / 100 / MONTHS_PER_YEAR);
  const monthlyAmortization = loanAmount * (input.amortizationRate / 100 / MONTHS_PER_YEAR);
  const monthlyHousingCost = monthlyInterest + monthlyAmortization;

  let monthsToGoal: number | null = null;

  if (remainingToSave === 0) {
    monthsToGoal = 0;
  } else if (monthlyRate === 0) {
    monthsToGoal = input.monthlySaving > 0 ? Math.ceil(remainingToSave / input.monthlySaving) : null;
  } else if (input.currentSavings > 0 || input.monthlySaving > 0) {
    const maxMonths = MAX_PROJECTION_YEARS * MONTHS_PER_YEAR;
    let balance = input.currentSavings;

    for (let month = 1; month <= maxMonths; month += 1) {
      balance = (balance + input.monthlySaving) * (1 + monthlyRate);

      if (balance >= downPayment) {
        monthsToGoal = month;
        break;
      }
    }
  }

  return {
    downPayment,
    remainingToSave,
    monthsToGoal,
    monthlyInterest,
    monthlyAmortization,
    monthlyHousingCost,
  };
}

export function calculateSaleEquity(input: HouseCalculatorInput): SaleEquityPreview {
  const brokerFee = input.currentHomeValue * (input.brokerFeePercent / 100);
  const rawNetSaleProceeds = input.currentHomeValue - input.remainingMortgageDebt - brokerFee;

  return {
    brokerFee,
    netSaleProceeds: Math.max(0, rawNetSaleProceeds),
    negativeEquity: rawNetSaleProceeds < 0,
  };
}

export function calculatePublicHousingScenario(input: PublicHousingScenarioInput): PublicHousingScenario {
  const plan = calculateHousingPlan({
    housingType: input.housingType,
    purchasePrice: input.homePrice,
    downPaymentRate: input.downPaymentPercent,
    monthlySavings: input.monthlySaving,
    existingMortgageDeeds: input.existingMortgageDeeds,
    assessedValue: input.assessedValue,
    extraBuffer: input.extraBuffer,
  });
  const sale = input.includeSaleCapital ? calculateSaleEquity(input) : null;
  const saleCapital = Math.max(0, sale?.netSaleProceeds ?? 0);
  const totalAvailableCapital = Math.max(0, input.currentSavings) + saleCapital;
  const remainingCapital = Math.max(0, plan.totalCapitalNeed - totalAvailableCapital);
  const monthlyHousingCost = plan.loanAmount * ((input.mortgageRate + input.amortizationRate) / 100 / MONTHS_PER_YEAR);

  return {
    plan,
    sale,
    saleCapital,
    totalAvailableCapital,
    remainingCapital,
    progressPercent: calculateProgress(totalAvailableCapital, plan.totalCapitalNeed),
    forecastMonths: calculateForecastMonths(totalAvailableCapital, plan.totalCapitalNeed, input.monthlySaving),
    monthlyHousingCost,
  };
}

export function calculateSavingsProjection(input: HouseCalculatorInput): SavingsProjectionPoint[] {
  const goal = getDownPayment(input.homePrice, input.downPaymentPercent);
  const monthlyRate = getMonthlyReturnRate(input.annualReturn);
  const points: SavingsProjectionPoint[] = [];

  for (let year = 0; year <= input.horizonYears; year += 1) {
    const months = year * MONTHS_PER_YEAR;
    const contributions = input.currentSavings + input.monthlySaving * months;
    const balance = projectBalance(input.currentSavings, input.monthlySaving, monthlyRate, months);

    points.push({
      year,
      contributions,
      growth: balance - contributions,
      balance,
      goal,
    });
  }

  return points;
}
