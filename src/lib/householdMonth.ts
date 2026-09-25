export interface HouseholdMonth {
  month: string;
  calleSalary: number;
  idaSalary: number;
  benefit: number;
  childAllowance: number;
  liquidSavings: number | null;
  childrenInvested: number;
  callePension: number;
  idaPension: number;
  otherInvested: number;
}

export type MoneyField = Exclude<keyof HouseholdMonth, 'month'>;

export function emptyHouseholdMonth(month: string): HouseholdMonth {
  return { month, calleSalary: 0, idaSalary: 0, benefit: 0, childAllowance: 0,
    liquidSavings: null, childrenInvested: 0, callePension: 0, idaPension: 0, otherInvested: 0 };
}

export function householdTotals(entry: HouseholdMonth) {
  const income = entry.calleSalary + entry.idaSalary + entry.benefit + entry.childAllowance;
  const invested = entry.childrenInvested + entry.callePension + entry.idaPension + entry.otherInvested;
  const liquid = entry.liquidSavings ?? 0;
  return { income, invested, liquid, saved: liquid + invested,
    rate: income > 0 ? Math.round(((liquid + invested) / income) * 100) : 0,
    complete: entry.liquidSavings !== null };
}

export function validHouseholdMonth(entry: HouseholdMonth): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(entry.month) &&
    (Object.keys(entry) as (keyof HouseholdMonth)[]).every((key) =>
      key === 'month' || (key === 'liquidSavings' && entry[key] === null) ||
      (typeof entry[key] === 'number' && Number.isFinite(entry[key]) && entry[key] >= 0 && entry[key] <= 100_000_000));
}

export function monthLabel(month: string) {
  const [year, number] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('sv-SE', { month: 'long', year: 'numeric' }).format(new Date(year, number - 1, 1));
}

// Income received in September funds October; the October result is entered on October 24.
export function settlementDate(month: string) {
  const [year, number] = month.split('-').map(Number);
  return new Date(year, number - 1, 24);
}
