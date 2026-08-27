import { Info, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { AnalysisData } from "../../types/analysis";

type ApprovedRiskRewardZones = NonNullable<NonNullable<AnalysisData["v11"]>["riskRewardZones"]>;
type MemberInsight = NonNullable<ApprovedRiskRewardZones["memberInsight"]>;
type Zone = ApprovedRiskRewardZones["zones"][number];

type Props = {
  user: unknown;
  zones?: ApprovedRiskRewardZones;
  companyLabel: string;
  ticker: string;
  referenceLabel: string;
  analysisDate: string;
  onSignup: () => void;
  onLogin: () => void;
};

const NOTE = "Kurs vid analystillfället, inte en live-kurs. Zonerna är fasta redaktionella bedömningar och inte personlig rådgivning.";

const DEMO_ZONES: Zone[] = [
  { id: "ATTRACTIVE", title: "Attraktiv risk/reward", priceLabel: "Under 100", annualPotentialLabel: "Illustrativ nivå", bearDownsideLabel: "Illustrativ nivå", rationale: "Förbättrad säkerhetsmarginal." },
  { id: "BALANCED", title: "Balanserad risk/reward", priceLabel: "100–125", annualPotentialLabel: "Illustrativ nivå", bearDownsideLabel: "Illustrativ nivå", rationale: "Mer balanserad potential och risk." },
  { id: "WEAK", title: "Svag risk/reward", priceLabel: "Över 125", annualPotentialLabel: "Illustrativ nivå", bearDownsideLabel: "Illustrativ nivå", rationale: "Begränsad säkerhetsmarginal." },
];

const DEMO_INSIGHT: MemberInsight = {
  companyLabel: "Illustrativt bolag",
  ticker: "EXEMPEL",
  referencePriceLabel: "135",
  referenceDateLabel: "exempeldatum",
  assessmentLabel: "Svag risk/reward",
  assessmentNote: "Bedömningen visar ersättningen för risk i ett illustrativt exempel och är ingen köp- eller säljsignal.",
  marker: { zoneId: "WEAK", positionPct: 76, label: "Illustrativ referenskurs", note: "Markören gäller endast exemplet." },
  scenarioSpread: {
    label: "Illustrativt scenariospann",
    points: [
      { label: "Bear", valueLabel: "80", annualPotentialLabel: "−18 %/år" },
      { label: "Sannolikhetsvägt värde", valueLabel: "125", annualPotentialLabel: "−3 %/år" },
      { label: "Bull", valueLabel: "160", annualPotentialLabel: "+8 %/år" },
    ],
    rangeSharesPct: [56, 44],
    distanceLabel: "Illustrativ spridning: 80 → 125 → 160",
  },
  footerNote: "Illustrativa siffror som endast visar hur verktyget fungerar.",
};

const zoneStyles: Record<Zone["id"], { rail: string; surface: string; label: string }> = {
  ATTRACTIVE: { rail: "bg-[#3d8b68]", surface: "bg-emerald-100/75", label: "text-[#245b43]" },
  BALANCED: { rail: "bg-[#aac6b3]", surface: "bg-[#edf4ee]", label: "text-[#496252]" },
  WEAK: { rail: "bg-[#d8d2c6]", surface: "bg-stone-100", label: "text-[#625f58]" },
};

function Panel({ children, illustrative = false }: { children: ReactNode; illustrative?: boolean }) {
  return <aside id="risk-reward" className="scroll-mt-36 mt-8 rounded-2xl border border-[#d8e6dc] bg-white p-5 shadow-sm sm:p-7" aria-labelledby="risk-reward-title">{illustrative && <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Exempel – illustrativt bolag</p>}{children}</aside>;
}

function Scale({ zones, insight }: { zones: Zone[]; insight: MemberInsight }) {
  const markerZoneIndex = insight.marker ? zones.findIndex((zone) => zone.id === insight.marker?.zoneId) : -1;
  return <div className="mt-7">
    <div className="relative">
      <div className="flex min-h-24 overflow-hidden rounded-xl border border-slate-200 bg-white" aria-label="Risk/reward-skala">
        {zones.map((zone) => <section key={zone.id} className={`flex min-w-0 flex-1 flex-col items-center justify-center border-r px-1.5 py-3 text-center last:border-r-0 sm:px-3 ${zoneStyles[zone.id].surface}`}><p className={`text-[10px] font-black uppercase leading-4 sm:text-xs ${zoneStyles[zone.id].label}`}>{zone.title}</p><p className="mt-1 text-[11px] font-semibold leading-4 text-slate-600 sm:text-sm">{zone.priceLabel}</p></section>)}
      </div>
      {insight.marker && <span className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2 border-l-2 border-slate-800/70" style={{ left: `${insight.marker.positionPct}%` }} aria-label={`${insight.marker.label}: ${insight.referencePriceLabel}. ${insight.marker.note}`}><span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-800 shadow-sm" /></span>}
    </div>
    <div className="mt-3 grid gap-2 text-[11px] leading-4 text-slate-500" style={{ gridTemplateColumns: `repeat(${zones.length}, minmax(0, 1fr))` }}>
      {zones.map((zone, index) => <div key={zone.id} className={index === zones.length - 1 ? "text-right" : index > 0 ? "text-center" : ""}>{index === markerZoneIndex && <p className="font-bold text-slate-700">Referenskurs här</p>}</div>)}
    </div>
    <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-500"><Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />{insight.marker?.note ?? "Referensmarkör saknas i godkänt presentationsunderlag."}</p>
  </div>;
}

function ScenarioSpan({ insight }: { insight: MemberInsight }) {
  if (!insight.scenarioSpread) return <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">Scenariospann saknas i godkänt presentationsunderlag.</div>;
  return <section className="mt-7 rounded-xl border border-[#d8e6dc] bg-[#f6faf7] p-4 sm:p-5" aria-labelledby="scenario-spread-title">
    <p id="scenario-spread-title" className="text-sm font-bold text-[#496252]">{insight.scenarioSpread.label}</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">{insight.scenarioSpread.points.map((point, index) => <div key={point.label} className={`rounded-lg bg-white/75 px-3 py-3 ring-1 ring-slate-200/80 ${index === insight.scenarioSpread!.points.length - 1 ? "sm:text-right" : index > 0 ? "sm:text-center" : ""}`}><p className="text-xs font-bold text-slate-500">{point.label}</p><p className="mt-1 text-lg font-black text-slate-950">{point.valueLabel}</p><p className="mt-1 text-sm font-semibold text-slate-600">{point.annualPotentialLabel}</p></div>)}</div>
    <div className="mt-5 flex h-1.5 overflow-hidden rounded-full bg-[#e5e3da]" aria-hidden="true"><span className="bg-slate-400/55" style={{ width: `${insight.scenarioSpread.rangeSharesPct[0]}%` }} /><span className="w-px bg-slate-700" /><span className="bg-[#2f7d5a]/55" style={{ width: `${insight.scenarioSpread.rangeSharesPct[1]}%` }} /></div>
    <p className="mt-3 text-xs leading-5 text-slate-500">{insight.scenarioSpread.distanceLabel}</p>
  </section>;
}

function FullInsight({ zones, insight, illustrative = false, children }: { zones: Zone[]; insight: MemberInsight; illustrative?: boolean; children?: ReactNode }) {
  return <Panel illustrative={illustrative}>
    <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">{insight.companyLabel} · {insight.ticker}</p><h3 id="risk-reward-title" className="mt-2 font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">Medlemsinsikt: När blir risk/reward mer attraktiv?</h3><p className="mt-3 text-sm leading-6 text-slate-600">{illustrative ? "Se hur våra risk/reward-zoner fungerar. Som gratis medlem får du de faktiska nivåerna för Meta." : "Zonerna visar hur säkerhetsmarginalen förändras vid olika kursnivåer. De ändrar inte analysens rekommendation."}</p></div>
      {illustrative && <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-xs font-black text-slate-600 ring-1 ring-slate-200"><ShieldCheck size={16} aria-hidden="true" /> EXEMPEL</span>}
    </div>
    <div className="mt-6 grid gap-4 rounded-xl bg-slate-50/80 p-4 sm:grid-cols-2 sm:p-5"><div><p className="text-xs font-semibold text-slate-500">Referenskurs vid analysen</p><p className="mt-1 text-2xl font-black text-slate-950">{insight.referencePriceLabel}</p><p className="mt-1 text-xs text-slate-500">{insight.referenceDateLabel}</p></div><div><p className="text-xs font-semibold text-slate-500">Aktuell bedömning</p><p className="mt-1 text-lg font-black text-[#496252]">{insight.assessmentLabel}</p><p className="mt-1 text-xs leading-5 text-slate-500">{insight.assessmentNote}</p></div></div>
    <Scale zones={zones} insight={insight} />
    <ScenarioSpan insight={insight} />
    {children}
    <p className="mt-5 text-xs leading-5 text-slate-500">{insight.footerNote}</p>
  </Panel>;
}

function DemoModule({ onSignup, onLogin }: Pick<Props, "onSignup" | "onLogin">) {
  return <FullInsight zones={DEMO_ZONES} insight={DEMO_INSIGHT} illustrative><div className="mt-5 flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-xl"><p className="font-bold text-slate-950">Skapa gratis konto för att se Metas risk/reward-nivåer</p><p className="mt-1 text-sm leading-6 text-slate-600">Som medlem ser du godkända kursgränser, scenariospann och placeringen vid analystillfället.</p></div><div className="flex shrink-0 flex-col gap-2 sm:items-end"><button type="button" onClick={onSignup} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white transition-colors hover:bg-emerald-800">Skapa gratis konto</button><button type="button" onClick={onLogin} className="min-h-9 text-sm font-bold text-emerald-700 hover:text-emerald-900">Har du redan konto? Logga in</button></div></div></FullInsight>;
}

function UnavailableModule({ companyLabel, ticker, referenceLabel, analysisDate, isMember = true }: Pick<Props, "companyLabel" | "ticker" | "referenceLabel" | "analysisDate"> & { isMember?: boolean }) {
  return <Panel><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{companyLabel} · {ticker}</p><h3 id="risk-reward-title" className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em] text-slate-950">Medlemsinsikt: När blir risk/reward mer attraktiv?</h3>{isMember && <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="font-semibold text-slate-500">Referenskurs vid analysen</dt><dd className="mt-1 font-black text-slate-950">{referenceLabel} · {analysisDate}</dd></div><div><dt className="font-semibold text-slate-500">Aktuell bedömning</dt><dd className="mt-1 font-black text-slate-950">Inväntar godkänd zonanalys</dd></div></dl>}<p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">Godkända canonical risk/reward-zoner eller komplett presentationsdata saknas. Därför visas inga kursgränser, markörer eller scenariovärden.</p><p className="mt-4 text-xs leading-5 text-slate-500">{NOTE}</p></Panel>;
}

export default function RiskRewardModule({ user, zones, companyLabel, ticker, referenceLabel, analysisDate, onSignup, onLogin }: Props) {
  const insight = zones?.memberInsight;
  const completeInsight = Boolean(insight?.marker && insight.scenarioSpread && insight.scenarioSpread.points.length === 3 && insight.scenarioSpread.rangeSharesPct.length === 2 && zones?.zones.some((zone) => zone.id === insight.marker?.zoneId));
  const hasApprovedMemberData = zones?.status === "APPROVED" && zones.visibility === "MEMBER" && completeInsight;
  if (hasApprovedMemberData && user) return <FullInsight zones={zones!.zones} insight={insight!} />;
  if (user) return <UnavailableModule companyLabel={companyLabel} ticker={ticker} referenceLabel={referenceLabel} analysisDate={analysisDate} />;
  return <DemoModule onSignup={onSignup} onLogin={onLogin} />;
}

export { UnavailableModule };
