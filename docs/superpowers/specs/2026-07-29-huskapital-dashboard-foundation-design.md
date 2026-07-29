# Huskapital dashboard foundation design

## Product focus

The authenticated Huskapital dashboard is the primary product. It answers: current capital, remaining capital to the target, and approximate time to the target. The public calculator remains a later entrypoint to the same calculation engine.

## Phase-one experience

The dashboard has two primary actions:

1. **Planera nästa bostad** opens a right-side drawer on desktop and a near-full-screen sheet on mobile. The initial fields are purchase price, housing type, a 15% down-payment default, and monthly saving. Advanced choices are hidden under `Fler val`.
2. **Uppdatera huskapital** opens a short dialog/sheet with the existing total and a new total. Saving creates a dated capital-history entry and immediately refreshes the dashboard.

The main card presents total current capital, total capital need, percentage, remaining amount, approximate time, the last capital change, and a progress-sensitive support message.

## Housing plan model

```ts
type HousingType = 'HOUSE' | 'CONDOMINIUM' | 'OWNER_APARTMENT';

type HousingPlan = {
  housingType: HousingType;
  purchasePrice: number;
  downPaymentRate: number;
  monthlySavings: number;
  existingMortgageDeeds?: number;
  assessedValue?: number;
  extraBuffer?: number;
};
```

Derived values are not manually editable: down payment, loan amount, title-deed fee, new mortgage deeds, mortgage-deed fee, capital need, progress, and remaining capital.

## Calculation rules

- `HOUSE` and `OWNER_APARTMENT`: down payment + title-deed fee + mortgage-deed fee + optional buffer.
- `CONDOMINIUM`: down payment + optional buffer only. Title deed and mortgage deed rows are absent.
- Title-deed basis is `max(purchasePrice, assessedValue ?? purchasePrice)`.
- Private-person title-deed fee: 1.5% plus 825 SEK administration fee.
- New mortgage deeds are `max(0, loanAmount - existingMortgageDeeds)`.
- Mortgage-deed cost is 2% of new mortgage deeds plus 375 SEK only when new deeds are required.
- Existing savings remain the source for the investment projection. A capital update does not rewrite its history or monthly saving.

## Data compatibility

Existing `SavingsGoal` documents retain price, savings and monthly saving. Missing plan fields are read with defaults: `HOUSE`, 15%, no existing mortgage deeds, no assessed value, and no buffer. Capital-history records live in a goal subcollection and are optional for old goals; the dashboard falls back to the current saved capital when no history exists.

## UI constraints

- Keep the warm green Huskapital visual identity and reference-image hierarchy.
- Do not show title deed or mortgage deed at zero for condominiums.
- Keep advanced fields hidden initially.
- Inputs must be keyboard and screen-reader usable; drawers/sheets have focus management and close controls.
- Mobile targets 320–390px without horizontal overflow.

## Scope boundary

- No report-calendar, API, CORS, or authentication changes.
- No capital-gains-tax calculation.
- No parallel calculator or route.
- All values are formatted through shared `sv-SE` helpers.
