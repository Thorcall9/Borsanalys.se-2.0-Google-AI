import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const files = {
  calculator: new URL('../src/components/house/HouseCalculator.tsx', import.meta.url),
  inputs: new URL('../src/components/house/HouseCalculatorInputs.tsx', import.meta.url),
  preview: new URL('../src/components/house/HouseCalculatorPreview.tsx', import.meta.url),
  unlock: new URL('../src/components/house/MemberUnlockPanel.tsx', import.meta.url),
  memberPlanPreview: new URL('../src/components/house/MemberPlanPreview.tsx', import.meta.url),
  routePage: new URL('../src/pages/HouseCalculator.tsx', import.meta.url),
  app: new URL('../src/App.tsx', import.meta.url),
  footer: new URL('../src/components/layout/Footer.tsx', import.meta.url),
  tools: new URL('../src/pages/Tools.tsx', import.meta.url),
};

const math = new URL('../src/lib/savingsGoalMath.ts', import.meta.url);

async function source(key) {
  return readFile(files[key], 'utf8');
}

test('house calculator inputs expose the Swedish labels for the public MVP fields', async () => {
  const inputSource = await source('inputs');

  for (const label of [
    'Bostadspris',
    'Kontantinsats (%)',
    'Nuvarande sparande',
    'Månadssparande',
    'Årlig avkastning (%)',
    'Bolåneränta (%)',
    'Amorteringstakt (%)',
    'Sparhorisont (år)',
  ]) {
    assert.match(inputSource, new RegExp(label.replace(/[()]/g, '\\$&')));
  }
});

test('house calculator preview keeps the public result copy and a null-safe goal timeline state', async () => {
  const previewSource = await source('preview');

  for (const copy of [
    'Kontantinsats',
    'Kvar att spara',
    'Tid till mål',
    'Uppskattad månadskostnad',
  ]) {
    assert.match(previewSource, new RegExp(copy));
  }

  const validationGuardIndex = previewSource.indexOf('if (hasValidationErrors)');
  const nullGuardIndex = previewSource.indexOf('if (!preview)');
  const destructureIndex = previewSource.indexOf('const { downPayment, remainingToSave, monthsToGoal, monthlyHousingCost } = preview;');

  assert.notEqual(validationGuardIndex, -1);
  assert.notEqual(nullGuardIndex, -1);
  assert.notEqual(destructureIndex, -1);
  assert.ok(validationGuardIndex < destructureIndex, 'validation guard should run before preview destructuring');
  assert.ok(nullGuardIndex < destructureIndex, 'null guard should run before preview destructuring');
  assert.match(previewSource, /monthsToGoal\s*===\s*null/);
  assert.match(previewSource, /hasValidationErrors/);
});

test('member unlock panel keeps the locked CTA copy for guests', async () => {
  const unlockSource = await source('unlock');

  assert.match(unlockSource, /Logga in för att se hela prognosen/);
  assert.match(unlockSource, /Spara mitt husmål/);
});

test('guest calculator shows a clearly labelled member-plan preview with an example state', async () => {
  const [calculator, memberPreview] = await Promise.all([
    source('calculator'),
    source('memberPlanPreview'),
  ]);

  assert.match(calculator, /<MemberPlanPreview onUnlock=\{openLoginModal\} \/>/);
  assert.match(memberPreview, /Så här ser din plan ut som medlem/);
  assert.match(memberPreview, /Exempel/);
  assert.match(memberPreview, /personliga prognos, sparmål och årsöversikt/);
  assert.match(memberPreview, /onClick=\{onUnlock\}/);
});

test('house calculator keeps invalid values out of calculations and provides an authenticated projection table', async () => {
  const calculatorSource = await source('calculator');

  assert.match(calculatorSource, /useAuth/);
  assert.match(calculatorSource, /openLoginModal/);
  assert.match(calculatorSource, /onSave/);
  assert.match(calculatorSource, /hasValidationErrors\s*\?\s*null\s*:\s*calculateHousePreview/);
  assert.match(calculatorSource, /hasValidationErrors\s*\?\s*\[\]\s*:\s*calculateSavingsProjection/);
  assert.match(calculatorSource, /isAuthenticated\s*&&\s*!hasValidationErrors/);
  assert.match(calculatorSource, /ResponsiveContainer/);
  assert.match(calculatorSource, /AreaChart|LineChart|ComposedChart/);
  assert.match(calculatorSource, /<table/);
  assert.match(calculatorSource, /<caption/);
});

test('house calculator rejects non-finite edits before state updates', async () => {
  const inputSource = await source('inputs');

  assert.match(inputSource, /Number\.parseFloat\(event\.target\.value\)/);
  assert.match(inputSource, /Number\.isFinite\(parsedValue\)/);
  assert.doesNotMatch(inputSource, /onChange\(field, Number\(event\.target\.value\)\)/);
});

test('shared validation enforces the four UI upper limits', async () => {
  const { validateHouseInput } = await import(math.href);
  const errors = validateHouseInput({
    homePrice: 4_000_000,
    downPaymentPercent: 15,
    currentSavings: 150_000,
    monthlySaving: 10_000,
    annualReturn: 30.1,
    mortgageRate: 30.1,
    amortizationRate: 30.1,
    horizonYears: 51,
  });

  assert.deepEqual(Object.keys(errors).sort(), [
    'amortizationRate',
    'annualReturn',
    'horizonYears',
    'mortgageRate',
  ]);
});

test('house calculator route presents the focused housing-goal MVP with Swedish SEO', async () => {
  const [appSource, pageSource] = await Promise.all([source('app'), source('routePage')]);

  assert.match(appSource, /const HouseCalculatorPage = lazy\(\(\) => import\("\.\/pages\/HouseCalculator"\)\)/);
  assert.match(appSource, /<Route path="\/verktyg\/huskalkylator" element=\{<HouseCalculatorPage \/>\} \/>/);
  assert.match(pageSource, /<SEO[\s\S]*title="Huskalkylator – planera vägen till ditt bostadsmål"/);
  assert.match(pageSource, /Planera vägen till ditt bostadsmål/);
  assert.match(pageSource, /kontantinsats/);
  assert.match(pageSource, /inte personlig ekonomisk rådgivning/);
});

test('house calculator route saves only for the signed-in member and refreshes the dashboard', async () => {
  const pageSource = await source('routePage');

  assert.match(pageSource, /useAuth/);
  assert.match(pageSource, /if \(!user\)\s*\{[\s\S]*openLoginModal\(\)/);
  assert.match(pageSource, /createSavingsGoal\(user\.uid, \{[\s\S]*name:[\s\S]*\.\.\.input/);
  assert.match(pageSource, /notifySavingsGoalRefresh\(user\.uid\)/);
  assert.match(pageSource, /Ditt husmål är sparat/);
  assert.match(pageSource, /role="status"/);
  assert.match(pageSource, /role="alert"/);
});

test('house calculator is linked from the existing tools area in the footer', async () => {
  const footerSource = await source('footer');

  assert.match(footerSource, /to="\/verktyg\/huskalkylator"/);
  assert.match(footerSource, /Huskalkylator/);
});

test('tools hub links keyboard users to the dedicated house calculator route without a dead house tab', async () => {
  const toolsSource = await source('tools');

  for (const path of [
    '/verktyg/rantakalkylator',
    '/verktyg/malsparandekalkylator',
    '/verktyg/dcf-kalkylator',
    '/verktyg/utdelningskalkylator',
  ]) {
    assert.match(toolsSource, new RegExp(path));
  }

  assert.match(toolsSource, /import \{ useLocation, useNavigate, Link \} from "react-router-dom"/);
  assert.match(toolsSource, /<Link\s+to="\/verktyg\/huskalkylator"/);
  assert.doesNotMatch(toolsSource, /type ToolTab =[^;]*"house"/);
  assert.doesNotMatch(toolsSource, /activeTab === "house"/);
  assert.match(toolsSource, />Huskalkylator</);
  assert.match(toolsSource, /Planera vägen till ditt bostadsmål/);
  assert.match(toolsSource, /grid-cols-1 sm:grid-cols-2 xl:grid-cols-5/);
});
