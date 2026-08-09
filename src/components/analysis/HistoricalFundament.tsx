import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnalysisData } from "../../types/analysis";

type HistoricalFundamentData = NonNullable<AnalysisData["historicalFundament"]>;

const money = (value: number) => `$${value.toFixed(1)} md`;

export default function HistoricalFundament({ data }: { data: HistoricalFundamentData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const first = data.annual[0];
  const last = data.annual[data.annual.length - 1];
  const latest = data.latest;
  const yearOnYear = data.derived?.latestAnnualYearOnYear;
  const firstYear = Number(first?.period.match(/\d{4}/)?.[0]);
  const lastYear = Number(last?.period.match(/\d{4}/)?.[0]);
  const years = Number.isFinite(firstYear) && Number.isFinite(lastYear) ? Math.max(1, lastYear - firstYear) : 1;
  const calculatedCagr = ((last.revenueUsdBn / first.revenueUsdBn) ** (1 / years) - 1) * 100;
  const revenueCagr = data.derived?.revenueCagr2019To2025Pct ?? calculatedCagr;
  const marginRange = data.derived?.operatingMarginRange2019To2025Pct ?? [
    Math.min(...data.annual.map((item) => item.operatingMarginPct)),
    Math.max(...data.annual.map((item) => item.operatingMarginPct)),
  ];
  const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}`;
  const quarterYoY = (value: number, suffix = "%") => `${value >= 0 ? "+" : ""}${value.toFixed(1)}${suffix} YoY`;

  if (!first || !last) return null;

  return (
    <section className="border-t border-slate-200 py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Rapporterad utveckling</p>
          <h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">Historik, utan estimat</h2>
        </div>
        <p className="text-sm text-slate-500">Senaste fyra rapporterade kvartal</p>
      </div>

      {data.recentQuarters && <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
        <div className="hidden grid-cols-4 gap-5 bg-emerald-50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-800 md:grid"><span>Period</span><span>Omsättning · YoY</span><span>EBIT-marginal · YoY</span><span>Fritt kassaflöde · YoY</span></div>
        <div className="divide-y divide-slate-200">{data.recentQuarters.map((item) => <div key={item.period} className="grid gap-2 px-5 py-4 md:grid-cols-4 md:gap-5"><h3 className="font-bold text-slate-950">{item.period}</h3><p className="text-sm font-semibold text-slate-700"><span className="mr-2 font-medium text-slate-500 md:hidden">Omsättning</span>{money(item.revenueUsdBn)}{item.yearOnYear && <span className="ml-2 text-xs font-bold text-emerald-700">{quarterYoY(item.yearOnYear.revenueGrowthPct)}</span>}</p><p className="text-sm text-slate-600"><span className="mr-2 font-medium text-slate-500 md:hidden">EBIT-marginal</span>{item.operatingMarginPct.toFixed(1)} %{item.yearOnYear && <span className="ml-2 text-xs font-bold text-amber-700">{quarterYoY(item.yearOnYear.operatingMarginChangePp, " p.p.")}</span>}</p><p className="text-sm text-slate-600"><span className="mr-2 font-medium text-slate-500 md:hidden">Fritt kassaflöde</span>{money(item.freeCashFlowUsdBn)}{item.yearOnYear && <span className={`ml-2 text-xs font-bold ${item.yearOnYear.freeCashFlowGrowthPct >= 0 ? "text-emerald-700" : "text-amber-700"}`}>{quarterYoY(item.yearOnYear.freeCashFlowGrowthPct)}</span>}</p></div>)}</div>
        <p className="px-5 py-3 text-xs text-slate-500">YoY = förändring jämfört med samma kvartal föregående år. Marginal visas i procentenheter.</p>
      </div>}

      <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
        <div className="bg-white p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Omsättning {first.period}–{last.period}</p><p className="mt-2 font-serif text-3xl font-bold text-slate-950">{money(first.revenueUsdBn)} → {money(last.revenueUsdBn)}</p><p className="mt-2 text-sm font-bold text-emerald-700">{yearOnYear ? `${yearOnYear.period}: ${signed(yearOnYear.revenueGrowthPct)} % mot ${yearOnYear.comparedWithPeriod}` : `CAGR ${revenueCagr.toFixed(1)} %`}</p><p className="mt-2 text-sm leading-6 text-slate-600">Omsättning är allt bolaget säljer. Högre försäljning ger mer utrymme för vinst och investeringar.</p><p className="mt-2 text-xs text-slate-500">Historisk CAGR: {revenueCagr.toFixed(1)} %</p></div>
        <div className="bg-white p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">EBIT-marginal</p><p className="mt-2 font-serif text-3xl font-bold text-slate-950">{marginRange.join("–")} %</p><p className="mt-2 text-sm font-bold text-emerald-700">{yearOnYear ? `${yearOnYear.period}: ${signed(yearOnYear.operatingMarginChangePp)} p.p. mot ${yearOnYear.comparedWithPeriod}` : `LTM ${latest?.operatingMarginPct.toFixed(1)} %`}</p><p className="mt-2 text-sm leading-6 text-slate-600">Visar hur mycket som blir kvar av varje 100 USD i omsättning före räntor och skatt.</p><p className="mt-2 text-xs text-slate-500">Historiskt intervall · LTM {latest?.operatingMarginPct.toFixed(1)} %</p></div>
        <div className="bg-white p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Fritt kassaflöde</p><p className="mt-2 font-serif text-3xl font-bold text-slate-950">{money(first.freeCashFlowUsdBn)} → {money(last.freeCashFlowUsdBn)}</p><p className="mt-2 text-sm font-bold text-amber-700">{yearOnYear ? `${yearOnYear.period}: ${signed(yearOnYear.freeCashFlowGrowthPct)} % mot ${yearOnYear.comparedWithPeriod}` : `LTM ${money(latest?.freeCashFlowUsdBn ?? 0)}`}</p><p className="mt-2 text-sm leading-6 text-slate-600">Pengar som återstår efter den löpande verksamheten och investeringarna. Det visar finansiellt handlingsutrymme.</p><p className="mt-2 text-xs text-slate-500">{first.period}–{last.period} · LTM {money(latest?.freeCashFlowUsdBn ?? 0)}</p></div>
      </div>

      <button type="button" onClick={() => setIsExpanded((value) => !value)} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900" aria-expanded={isExpanded}>
        {isExpanded ? "Dölj full historik" : `Visa full historik ${first.period}–${last.period}`}
        {isExpanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>

      {isExpanded && <div className="mt-3 border-t border-slate-200 pt-5">
        <div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="min-w-[860px] w-full text-left"><thead className="bg-emerald-50"><tr className="text-xs font-black uppercase tracking-[0.12em] text-emerald-800"><th className="px-5 py-3">År</th><th className="px-4 py-3">Omsättning</th><th className="px-4 py-3">Rörelseresultat</th><th className="px-4 py-3">Marginal</th><th className="px-4 py-3">FCF</th><th className="px-4 py-3">Klass</th><th className="px-5 py-3">Källa</th></tr></thead><tbody>{[...data.annual, ...(latest ? [latest] : [])].map((item) => <tr key={item.period} className="border-t border-slate-200 text-sm"><th className="px-5 py-3 text-left font-bold">{item.period}</th><td className="px-4 py-3">{money(item.revenueUsdBn)}</td><td className="px-4 py-3">{money(item.operatingIncomeUsdBn)}</td><td className="px-4 py-3">{item.operatingMarginPct.toFixed(1)} %</td><td className="px-4 py-3">{money(item.freeCashFlowUsdBn)}</td><td className="px-4 py-3 font-bold text-emerald-700">{item.classification}</td><td className="px-5 py-3 text-slate-600">{item.source.document}<span className="block text-xs text-slate-400">{item.source.locator}</span></td></tr>)}</tbody></table></div>
        <p className="mt-3 text-xs leading-5 text-slate-500">{data.derived?.formula ?? "Historiken visar rapporterade helår och den senaste tillgängliga perioden."}</p>
      </div>}
    </section>
  );
}
