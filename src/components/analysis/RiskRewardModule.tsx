import { CalendarDays, Info, LockKeyhole, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

type ZoneId = "ATTRACTIVE" | "BALANCED" | "WEAK";

type ApprovedRiskRewardZones = {
  status: "APPROVED" | "DRAFT" | "NOT_APPLICABLE";
  visibility: "MEMBER";
  title: string;
  introduction: string;
  valuationDate: string;
  zones: {
    id: ZoneId;
    title: string;
    priceLabel: string;
    annualPotentialLabel: string;
    bearDownsideLabel: string;
    rationale: string;
  }[];
  disclaimer: string;
  /**
   * MEMBER-presentationen får bara fyllas från godkänd canonical v11.2-data.
   * Komponenten räknar aldrig fram eller interpolerar dessa värden.
   */
  memberPresentation?: {
    riskLabel: string;
    currentPriceLabel: string;
    currentZoneLabel: string;
    bearLabel: string;
    weightedValueLabel: string;
    bullLabel: string;
    annualizedPotentialLabel: string;
    bearDownsideLabel: string;
    interpretation: string;
  };
};

type Props = {
  user: unknown;
  zones?: ApprovedRiskRewardZones;
  onSignup: () => void;
  onLogin: () => void;
};

const DEMO = {
  currentPrice: "135 USD",
  currentZone: "Svag risk/reward",
  annualizedPotential: "−3,1 %/år",
  bearDownside: "−40 %",
  valuationDate: "31 dec 2028",
  points: [
    { label: "Bear", value: "80 USD", position: "left-[8%]", tone: "bg-emerald-600" },
    { label: "Sannolikhetsvägt värde", value: "125 USD", position: "left-1/2", tone: "bg-amber-500" },
    { label: "Bull", value: "160 USD", position: "right-[8%]", tone: "bg-emerald-500" },
  ],
} as const;

function Stat({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail?: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3 px-1 py-2 sm:px-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold text-slate-500">{label}</dt>
        <dd className="mt-1 text-lg font-black tracking-[-0.02em] text-slate-950">{value}</dd>
        {detail && <p className="mt-0.5 text-xs text-slate-500">{detail}</p>}
      </div>
    </div>
  );
}

function RiskRewardBand({ demo = false, currentPriceLabel, currentZoneLabel }: { demo?: boolean; currentPriceLabel: string; currentZoneLabel: string }) {
  return (
    <div className="mt-7">
      <div className="relative overflow-visible rounded-xl border border-slate-200 bg-white pt-14">
        <div className="absolute right-[12%] top-0 z-10 -translate-y-1/2 rounded-xl bg-slate-950 px-4 py-2 text-center text-white shadow-lg">
          <p className="text-xs font-semibold text-white/70">{demo ? "Illustrativ dagens kurs" : "Dagens kurs"}</p>
          <p className="mt-0.5 text-lg font-black">{currentPriceLabel}</p>
          <span className="absolute bottom-[-8px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-slate-950" aria-hidden="true" />
        </div>
        <div className="grid overflow-hidden sm:grid-cols-3">
          <section className="border-b border-emerald-950/10 bg-emerald-50 px-4 py-5 text-center sm:border-b-0 sm:border-r">
            <h4 className="text-sm font-black text-emerald-950">ATTRAKTIV RISK/REWARD</h4>
            <p className="mt-2 text-sm font-bold text-emerald-900">Förbättrad säkerhetsmarginal</p>
          </section>
          <section className="border-b border-emerald-900/10 bg-[#f1f7f2] px-4 py-5 text-center sm:border-b-0 sm:border-r">
            <h4 className="text-sm font-black text-emerald-950">BALANSERAD RISK/REWARD</h4>
            <p className="mt-2 text-sm font-bold text-emerald-900">Relevant potential med begränsad marginal</p>
          </section>
          <section className="bg-[#f4f0e9] px-4 py-5 text-center">
            <h4 className="text-sm font-black text-stone-800">SVAG RISK/REWARD</h4>
            <p className="mt-2 text-sm font-bold text-stone-700">Begränsad säkerhetsmarginal</p>
          </section>
        </div>
        <p className="border-t border-slate-200 px-4 py-3 text-center text-xs font-semibold text-slate-600">
          {currentZoneLabel}
        </p>
      </div>
    </div>
  );
}

function DemoPoints() {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
      {DEMO.points.map((point) => (
        <div key={point.label} className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-white/70 px-4 py-3 text-left sm:block sm:border-0 sm:bg-transparent sm:p-0 sm:text-center">
          <span className={`block h-3 w-3 shrink-0 rounded-full ${point.tone} sm:mx-auto`} aria-hidden="true" />
          <div className="sm:mt-2">
            <p className="text-sm font-bold text-slate-950">{point.label}</p>
            <p className="mt-0.5 text-sm text-slate-600 sm:mt-1">{point.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DemoModule({ onSignup, onLogin }: Pick<Props, "onSignup" | "onLogin">) {
  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/35 p-5 sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Exempel – illustrativt bolag</p>
          <h3 id="risk-reward-title" className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">När blir risk/reward mer attraktiv?</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">Se hur våra risk/reward-zoner fungerar. Som gratis medlem får du de faktiska nivåerna för Meta.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200"><ShieldCheck size={16} aria-hidden="true" /> EXEMPEL</span>
      </div>
      <RiskRewardBand demo currentPriceLabel={DEMO.currentPrice} currentZoneLabel={`Illustrativ dagens kurs ligger i: ${DEMO.currentZone}`} />
      <DemoPoints />
      <dl className="mt-7 grid gap-4 border-y border-emerald-100 py-4 sm:grid-cols-3">
        <Stat icon={<TrendingUp size={19} aria-hidden="true" />} label="Illustrativ annualiserad värdepotential" value={DEMO.annualizedPotential} />
        <Stat icon={<TrendingDown size={19} aria-hidden="true" />} label="Illustrativ nedsida till Bear" value={DEMO.bearDownside} />
        <Stat icon={<CalendarDays size={19} aria-hidden="true" />} label="Illustrativt värderingsdatum" value={DEMO.valuationDate} />
      </dl>
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="font-bold text-slate-950">Skapa gratis konto för att se Metas risk/reward-nivåer</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">Exakta kursgränser, dagens placering och Meta-specifik tolkning visas först när de är godkända i den redaktionella modellen.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <button type="button" onClick={onSignup} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white transition-colors hover:bg-emerald-800">Skapa gratis konto</button>
          <button type="button" onClick={onLogin} className="min-h-9 text-sm font-bold text-emerald-700 hover:text-emerald-900">Har du redan konto? Logga in</button>
        </div>
      </div>
    </aside>
  );
}

function PendingMemberModule() {
  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200"><Info size={20} aria-hidden="true" /></span>
        <div>
          <h3 id="risk-reward-title" className="font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950">När blir risk/reward mer attraktiv?</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Meta:s faktiska kursnivåer visas först när zonanalysen är godkänd i den canonical v11.2-modellen. Vi visar inga preliminära eller maskerade nivåer.</p>
        </div>
      </div>
    </aside>
  );
}

function UnavailableModule({ companyLabel, ticker, referenceLabel, analysisDate }: { companyLabel: string; ticker: string; referenceLabel: string; analysisDate: string }) {
  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200"><Info size={20} aria-hidden="true" /></span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{companyLabel} ({ticker}) · Referenskurs {referenceLabel} · {analysisDate}</p>
          <h3 id="risk-reward-title" className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950">Medlemsinsikt: När blir risk/reward mer attraktiv?</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Balanserad risk/reward. Godkända canonical risk/reward-zoner saknas ännu för denna analys, därför visas inga kursgränser, markörer eller spridningsmått.</p>
          <p className="mt-4 text-xs leading-5 text-slate-500">Kurs vid analystillfället, inte en live-kurs. Zonerna är fasta redaktionella bedömningar och inte personlig rådgivning.</p>
        </div>
      </div>
    </aside>
  );
}

function MemberModule({ zones }: { zones: ApprovedRiskRewardZones & { memberPresentation: NonNullable<ApprovedRiskRewardZones["memberPresentation"]> } }) {
  const presentation = zones.memberPresentation;
  return (
    <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/35 p-5 sm:p-7" aria-labelledby="risk-reward-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl"><h3 id="risk-reward-title" className="font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">När blir risk/reward mer attraktiv?</h3><p className="mt-3 text-sm leading-6 text-slate-600">{zones.introduction}</p></div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 ring-1 ring-slate-200"><ShieldCheck size={16} aria-hidden="true" /> {presentation.riskLabel}</span>
      </div>
      <RiskRewardBand currentPriceLabel={presentation.currentPriceLabel} currentZoneLabel={`Dagens kurs ligger i: ${presentation.currentZoneLabel}`} />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[{ label: "Bear", value: presentation.bearLabel }, { label: "Sannolikhetsvägt värde", value: presentation.weightedValueLabel }, { label: "Bull", value: presentation.bullLabel }].map((point) => <div key={point.label} className="text-center"><p className="text-sm font-bold text-slate-950">{point.label}</p><p className="mt-1 text-sm text-slate-600">{point.value}</p></div>)}
      </div>
      <dl className="mt-7 grid gap-4 border-y border-emerald-100 py-4 sm:grid-cols-3">
        <Stat icon={<TrendingUp size={19} aria-hidden="true" />} label="Annualiserad värdepotential" value={presentation.annualizedPotentialLabel} />
        <Stat icon={<TrendingDown size={19} aria-hidden="true" />} label="Nedsida till Bear" value={presentation.bearDownsideLabel} />
        <Stat icon={<CalendarDays size={19} aria-hidden="true" />} label="Värderingsdatum" value={zones.valuationDate} />
      </dl>
      <div className="mt-6 rounded-xl border border-emerald-200 bg-white/80 p-5"><p className="font-bold text-slate-950">Kort tolkning</p><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{presentation.interpretation}</p></div>
      <p className="mt-5 text-xs leading-5 text-slate-500">{zones.disclaimer}</p>
    </aside>
  );
}

export default function RiskRewardModule({ user, zones, onSignup, onLogin }: Props) {
  const hasApprovedMemberData = zones?.status === "APPROVED" && zones.visibility === "MEMBER" && Boolean(zones.memberPresentation);
  if (hasApprovedMemberData && user) return <MemberModule zones={zones as ApprovedRiskRewardZones & { memberPresentation: NonNullable<ApprovedRiskRewardZones["memberPresentation"]> }} />;
  if (user) return <PendingMemberModule />;
  return <DemoModule onSignup={onSignup} onLogin={onLogin} />;
}

export { UnavailableModule };
