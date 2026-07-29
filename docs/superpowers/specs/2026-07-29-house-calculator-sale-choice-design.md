# House calculator: sale-choice flow

## Goal

Replace the squeezed side-by-side sale card with a guided calculator that lets visitors choose whether their current home should be included in the plan for their next home.

## User flow

1. The calculator opens on **Nästa bostad**.
2. A clear, unchecked choice asks: **Jag vill räkna med pengar från min nuvarande bostad**.
3. When unchecked, the visitor sees only the down-payment and saving calculation.
4. When checked, the sale inputs are revealed in the same flow and the overview explicitly shows:
   - current savings
   - estimated capital after a sale
   - total capital toward the next home
   - remaining amount to save
5. A separate **Om du säljer idag** tab remains available for visitors who only want the sale estimate. It uses the same inputs and calculation.

## Layout

- Keep a two-column desktop shell: inputs on the left, result area on the right.
- Never place the sale estimate and the member panel side-by-side inside the narrow result column.
- In the next-home result, present a full-width editorial capital summary with a small house illustration rather than a tall image strip.
- In the sale-only tab, show the full-width sale estimate with the same small illustration and breakdown.
- Place the member invitation below the result as a compact, horizontal dark-green callout.

## Calculation rules

- `estimatedSaleCapital = currentHomeValue - remainingMortgageDebt - brokerFee`.
- When the choice is off, estimated sale capital is zero for the next-home calculation.
- When the choice is on, total available capital is `currentSavings + estimatedSaleCapital`.
- The down-payment goal, remaining amount, progress, and time-to-goal use total available capital only while the choice is on.
- The existing standalone savings projection stays based on actual current savings and monthly saving; it must explain that possible sale capital is a one-off contribution, not investment growth.
- The sale estimate remains an estimate. It excludes: `Vinstskatt, flyttkostnader, bankavgifter, pantbrev och andra eventuella lån ingår inte`.

## Member value

- Guests see the above calculation and a compact invitation to log in.
- The invitation says that members can save their plan and track personal progress; it does not promise automatic use of sale capital.

## Safety and scope

- No capital-gains-tax calculation.
- No report-calendar, API, CORS, or authentication changes.
- Existing users' saved goals remain compatible; any new sale-choice fields use safe defaults.

## Verification

- Automated tests cover choice-off and choice-on total-capital behavior.
- Browser checks cover both tabs, the checkbox reveal, 4 000 000 / 2 400 000 / 2%, and no mobile overflow.
