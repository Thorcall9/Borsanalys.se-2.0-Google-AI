import { useCallback, useState } from 'react';
import SEO from '../components/SEO';
import { HouseCalculator } from '../components/house/HouseCalculator';
import { useAuth } from '../contexts/AuthContext';
import type { HouseCalculatorInput } from '../lib/savingsGoalMath';
import { createSavingsGoal } from '../services/savingsGoalService';
import { notifySavingsGoalRefresh } from '../services/savingsGoalRefresh';

const priceFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
  maximumFractionDigits: 0,
});

function goalNameFor(input: HouseCalculatorInput) {
  return `Bostadsmål ${priceFormatter.format(input.homePrice)}`;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Ditt husmål kunde inte sparas. Försök igen.';
}

export default function HouseCalculatorPage() {
  const { user, openLoginModal } = useAuth();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = useCallback(async (input: HouseCalculatorInput) => {
    if (!user) {
      openLoginModal();
      return;
    }

    setSaveSuccess(false);
    setSaveError(null);

    try {
      await createSavingsGoal(user.uid, {
        name: goalNameFor(input),
        ...input,
      });
      await notifySavingsGoalRefresh(user.uid);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(errorMessage(error));
    }
  }, [openLoginModal, user]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-12 sm:space-y-12">
      <SEO
        title="Huskalkylator – planera vägen till ditt bostadsmål"
        description="Planera vägen till ditt bostadsmål med en huskalkylator för kontantinsats, sparande och uppskattad boendekostnad."
      />

      <header className="max-w-3xl space-y-4">
        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary">Huskalkylator</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Planera vägen till ditt bostadsmål
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Börja med kontantinsatsen, ditt sparande och en uppskattad månadskostnad. Logga in när du vill spara målet och följa prognosen över tid.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Beräkningen bygger på dina egna antaganden och är inte personlig ekonomisk rådgivning.
        </p>
      </header>

      <HouseCalculator onSave={handleSave} />

      {saveSuccess ? (
        <p role="status" className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm font-medium text-foreground">
          Ditt husmål är sparat och syns på din profilsida.
        </p>
      ) : null}
      {saveError ? (
        <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm font-medium text-destructive">
          {saveError}
        </p>
      ) : null}
    </div>
  );
}
