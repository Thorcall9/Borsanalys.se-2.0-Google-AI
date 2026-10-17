import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, ChevronDown, ChevronUp,
  ExternalLink, GitCompareArrows, LockKeyhole, ShieldAlert, TrendingUp
} from "lucide-react";
import SEO from "../components/SEO";
import { useAuth } from "../contexts/AuthContext";
import { investorV112 as d } from "../data/analyses/investor/investor-v11-2-q3-2026";

const money = (value: number, digits = 0) =>
  value.toLocaleString("sv-SE",{minimumFractionDigits:digits,maximumFractionDigits:digits}) + " kr";
const percent = (value: number, digits = 1, withSign = false) =>
  (withSign && value > 0 ? "+" : "") +
  value.toLocaleString("sv-SE",{minimumFractionDigits:digits,maximumFractionDigits:digits}) + " %";

function SectionTitle({ eyebrow, title, description }: {eyebrow:string;title:string;description?:string}) {
  return <div className="mb-6 max-w-3xl">
    <p className="text-xs font-black uppercase tracking-[.17em] text-emerald-700">{eyebrow}</p>
    <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
    {description && <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>}
  </div>;
}
function SourceIds({ids}:{ids:readonly string[]}) {
  return <span className="ml-1 inline-flex text-[11px] font-semibold text-emerald-700" title={"Faktaposter: " + ids.join(", ")}>[{ids.join(" · ")}]</span>;
}
function SubtleWarning({children}:{children:React.ReactNode}) {
  return <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950">{children}</div>;
}
const comparisons = [
  {label:"Justerat NAV/aktie",q2:money(d.snapshot.navQ2),q3:money(d.snapshot.navQ3),src:["F01","F02"]},
  {label:"Redovisat NAV/aktie",q2:money(d.snapshot.reportedNavQ2),q3:money(d.snapshot.reportedNavQ3),src:["F03","F04"]},
  {label:"Rapporterad rabatt, A+B",q2:percent(d.snapshot.discountABQ2),q3:percent(d.snapshot.discountABQ3),src:["F31","F32"]},
  {label:"Patricia, kvartalsavkastning",q2:percent(d.snapshot.patrQ2,0,true),q3:percent(d.snapshot.patrQ3,0,true),src:["F09","F10"]},
  {label:"Justerad EBITA-tillväxt, Patricia (år/år)",q2:percent(d.snapshot.patrEbitaQ2,0,true),q3:percent(d.snapshot.patrEbitaQ3,0,true),src:["F11","F12"]},
  {label:"EQT, kvartalets värdeförändring",q2:percent(d.snapshot.eqtQ2,0,true),q3:percent(d.snapshot.eqtQ3,0,true),src:["F13","F14"]},
] as const;

export default function InvestorV112Preview() {
  const { user, openLoginModal } = useAuth();
  const [openEvidence,setOpenEvidence] = useState(false);
  const [openMethod,setOpenMethod] = useState(false);
  const lens=d.valueLens;
  const snap=d.snapshot;
  const history=lens.historical;
  const periodStats=[
    {label:"3 år",frequency:"13 kvartalsslut",data:history.threeYears},
    {label:"5 år",frequency:"21 kvartalsslut",data:history.fiveYears},
    {label:"10 år",frequency:"10 årsslut",data:history.tenYearEnds},
  ];
  const navChange=((snap.navQ3/snap.navQ2)-1)*100;

  return <div className="min-h-screen bg-background text-foreground">
    <SEO title="Investor AB – substansvärde, kvalitet och värderingsnivåer | Börsanalys.se" description="Oberoende granskning av Investor AB: dokumenterat NAV-värdeskapande, historisk substansrabatt, risker och daterade NAV-baserade värderingsnivåer. Förhandsvisning, ej publicerad." noIndex />
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs font-semibold text-amber-950 sm:text-sm">
      Redaktionell förhandsvisning · NOT_PUBLISH_READY · Ingen publicerad investeringsrekommendation
    </div>
    <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
      <Link to="/analys/investor-ab" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline"><ArrowLeft size={16}/> Till äldre Investor-analys</Link>
    </div>

    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-5 sm:px-6 sm:pt-9">
        <div className="mb-7 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[.13em] text-emerald-800">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">Investmentbolag</span>
          <span className="text-slate-400">/</span> INVE B
          <span className="text-slate-400">/</span> Substansvärdesanalys
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,.85fr)] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-emerald-700">Börsanalys.se · Fundamental analys</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.04] tracking-[-.055em] text-slate-950 sm:text-6xl">
              Investor AB <span className="mt-2 block text-[#087f55]">Kvalitet & värdering</span>
            </h1>
            <p className="mt-6 font-serif text-xl font-semibold leading-8 text-slate-900 sm:text-3xl">
              Stark historisk avkastning. Men vad är en attraktiv köpkurs?
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              För Investor är kvaliteten i substansvärdets tillväxt och priset relativt NAV viktigare än en skenbart exakt riktkurs för 2028. Vi granskar vad Investor äger, hur värdena skapas och vilken marginal köparen får mot senast rapporterat substansvärde.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-xs font-medium text-slate-500">
              <span>Analysdatum {d.analysisDate}</span>
              <span>Rapporterat NAV {lens.anchor.navDate}</span>
              <span className="font-semibold text-emerald-700">Metod NAV_DISCOUNT · kvalitativ kalibrering</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,.055)]">
            <div className="h-1 bg-[#10B981]" aria-hidden="true"/>
            <div className="p-6 sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-slate-500">Investment Snapshot <span className="text-emerald-700">· Utkast</span></p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-900">BEVAKA · preliminärt</span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">MEDEL–HÖG RISK · preliminärt</span>
              </div>
              <p className="mt-7 text-sm font-medium text-slate-600">Justerat substansvärde · 30 sep 2026</p>
              <p className="mt-1 font-serif text-[clamp(2.8rem,5vw,3.8rem)] font-bold tracking-tight text-slate-950 tabular-nums">{money(lens.anchor.adjustedNavPerShare)}</p>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">
                <div><p className="text-xs leading-5 text-slate-500">Rapportdagens A+B-rabatt</p><p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-950">{percent(lens.comparison.reportDateABDiscountPct)}</p></div>
                <div><p className="text-xs leading-5 text-slate-500">5-årig NAV-totalavkastning/år</p><p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-950">{percent(snap.historicNavReturn5y)}</p></div>
              </div>
              <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-bold text-slate-600">Senast använd kursreferens · 16 okt 2026</p>
                <p className="mt-1 text-xl font-extrabold text-slate-950 tabular-nums">{money(d.marketReference.price,2)}</p>
                <p className="mt-2 text-xs leading-5 text-slate-600">Kursen är senare än NAV. Vi redovisar därför <strong>ingen påstått aktuell rabatt eller premie</strong> utifrån dessa två datum.</p>
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-500">Inget sannolikhetsvägt kursmål används som huvudvärdering. Värderingsnivåerna nedan är beräknade på rapporterat NAV, inte prognoser för en framtida aktiekurs.</p>
              <SourceIds ids={["F01","F20","F23","F31"]}/>
            </div>
          </div>
        </div>
      </div>
    </header>

    <nav aria-label="Innehåll" className="sticky top-[68px] z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 sm:px-5">
        {[
          ["slutsats","Bedömning"],["kvalitet","Kvalitet"],["rabatt","Historik"],
          ["nivaer","Värderingsnivåer"],["rapport","Q3"],["teser","Teser"],
          ["risk","Risk"],["underlag","Källor"]
        ].map(([id,label])=><a key={id} href={"#"+id} className="shrink-0 border-b-2 border-transparent px-3 py-4 text-sm font-bold text-slate-600 hover:border-emerald-600 hover:text-emerald-800">{label}</a>)}
      </div>
    </nav>

    <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
      <section id="slutsats" className="scroll-mt-36">
        <SectionTitle eyebrow="Vår slutsats" title="Bra investmentbolag är inte samma sak som billig aktie" description="Vi skiljer mellan Investors kvaliteter, priset på innehaven och marknadens rabatt på investmentbolaget."/>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-950"><TrendingUp className="text-emerald-700"/> Investeringsstyrkor</h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">Investor har skapat betydande historisk NAV-tillväxt, har låg nettobelåning och äger en bred portfölj av internationella kvalitetsföretag. Historisk avkastning ger stöd åt förvaltningskvaliteten – men bevisar inte framtida avkastning.</p>
            <p className="mt-3 text-xs text-slate-500"><SourceIds ids={["F15","F19","F20"]}/></p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-slate-950"><ShieldAlert className="text-amber-700"/> Värderingsfrågan</h3>
            <p className="mt-4 text-sm leading-7 text-slate-700">Den officiellt jämförbara Q3-rabatten var omkring {percent(lens.comparison.reportDateABDiscountPct)}. Det ger liten rabattbaserad säkerhetsmarginal mot Investors justerade NAV, särskilt eftersom en del av Patricia värderas med modeller. Dagens rabatt kräver en ny samtida NAV-uppskattning.</p>
            <p className="mt-3 text-xs text-slate-500"><SourceIds ids={["F01","F03","F31"]}/></p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-6">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-800">INVESTERINGSTES · ANALYSIS</p>
          <p className="mt-3 font-serif text-xl font-semibold leading-8 text-slate-950">{lens.assessment.summary}</p>
          <p className="mt-4 text-sm leading-6 text-slate-700">Vi behåller <strong>BEVAKA</strong> som preliminär slutsats. Inte därför att vi tror oss veta en viss kurs 2028, utan för att dagens prissättning måste vägas mot kvaliteten och osäkerheten i substansvärdet.</p>
        </div>
      </section>

      <section id="kvalitet" className="scroll-mt-36">
        <SectionTitle eyebrow="Kvalitet och substansvärde" title="Varför har Investor varit framgångsrikt?" description="Vi bedömer kvaliteten i tillgångarna, historiskt värdeskapande, balansräkning och pristransparens. Varje bedömning kan prövas vid kommande rapporter."/>
        <div className="grid gap-4 md:grid-cols-2">
          {lens.qualityChecklist.map((item)=><article key={item.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">{item.signal.replaceAll("_"," / ")}</p>
            <h3 className="mt-2 font-serif text-xl font-bold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail} <SourceIds ids={item.claimIds}/></p>
          </article>)}
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-5">
          <h3 className="font-bold text-slate-950">Förstå 15,6 % historisk NAV-totalavkastning</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">Måttet inkluderar återlagd utdelning och avser en observerad femårsperiod till Q3 2026. Det är inte direkt samma sak som framtida kursutveckling eller en prognos för rapporterat NAV per aktie efter utdelningar. Vi extrapolerar därför inte 15,6 % till ett exakt framtida börsvärde.</p>
          <p className="mt-3 text-xs text-slate-500">Källa: Investor Q3 2026 <SourceIds ids={["F20"]}/></p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            {title:"Noterade Bolag",portion:74,desc:"Atlas Copco, ABB, AstraZeneca, SEB och andra noterade innehav. Marknadsvärden är observerbara; koncentrations- och börsrisken kvarstår."},
            {title:"Patricia Industries",portion:19,desc:"Mölnlycke, Permobil, Laborie m.fl. Möjlig långsiktig tillväxt men betydande osäkerhet i onoterade multiplar och kassaflöden."},
            {title:"Investeringar i EQT",portion:7,desc:"EQT AB och fondexponering. Värdeutvecklingen är känslig för private-equity-cykeln och marknadsvärderingar."},
          ].map(x=><article key={x.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <p className="text-3xl font-extrabold tabular-nums text-[#087f55]">{percent(x.portion,0)}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600" style={{width:x.portion+"%"}}/></div>
            <h3 className="mt-4 font-bold text-slate-950">{x.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{x.desc}</p>
          </article>)}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">Andelar av justerade totala tillgångar per Q3 2026, inte andelar av total investeringsrisk. <SourceIds ids={["F19"]}/></p>
      </section>

      <section id="rabatt" className="scroll-mt-36">
        <SectionTitle eyebrow="Vad marknaden historiskt betalat" title="Substansrabatt 3, 5 och 10 år" description="Historiska medianrabatter är ett värderingsankare, inte ett facit för vilken rabatt Investor förtjänar idag."/>
        <div className="grid gap-3 md:grid-cols-3">
          {periodStats.map(item=><article key={item.label} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.label} · {item.frequency}</p>
            <p className="mt-4 font-serif text-4xl font-bold tabular-nums text-slate-950">{percent(item.data.median*100)}</p>
            <p className="mt-1 text-xs font-medium text-slate-600">Medianrabatt</p>
            <div className="mt-5 flex justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
              <span>Genomsnitt {percent(item.data.average*100)}</span><span>{item.data.premiumCount} premieobs.</span>
            </div>
          </article>)}
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-slate-950">Vad säger historiken om en premie?</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">Investor har ofta handlats under justerat NAV, men rabatten har minskat betydligt jämfört med äldre år. En permanent premie kan inte motiveras bara genom att Investor är välskött. Högre betalningsvilja kräver stöd i förbättrad insyn, risk, kapitalallokering och förväntad totalavkastning.</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">Tre- och femårshistoriken bygger på kvartalsslut. Tioårshistoriken använder endast årsslut; den är alltså inte ett direkt jämförbart dagligt eller kvartalsvis tioårssnitt.</p>
        </div>
        <SubtleWarning><strong>Källstatus:</strong> {history.methodologyWarning} Vi använder därför historiken som referens, inte för att fastställa exakta köpgränser eller framtida rabattpercentiler.</SubtleWarning>
      </section>

      <section id="nivaer" className="scroll-mt-36">
        <SectionTitle eyebrow="Praktiskt värderingsstöd" title="Vilket pris motsvarar en viss substansrabatt?" description="Värdena härleds mekaniskt från justerat NAV 411 kr per aktie den 30 september 2026. De är historiska prisreferenser, inte riktkurser eller automatiska köp- och säljsignaler."/>
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_1fr] gap-3 bg-slate-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-600 sm:grid-cols-[1.2fr_1fr_1.5fr]">
            <span>Relativt justerat NAV</span><span className="text-right">B-kurs</span><span className="hidden text-right sm:block">Tolkning</span>
          </div>
          <div className="divide-y divide-slate-100">
            {lens.levels.map(level=><div key={level.discount} className="grid grid-cols-[1fr_1fr] items-center gap-3 px-5 py-4 text-sm sm:grid-cols-[1.2fr_1fr_1.5fr]">
              <span className="font-semibold text-slate-950">{level.label}</span>
              <span className="text-right text-lg font-extrabold tabular-nums text-slate-950">{money(level.price,1)}</span>
              <span className="col-span-2 text-xs leading-5 text-slate-600 sm:col-span-1 sm:text-right">{level.discount===0?"Ingen rabattbaserad buffert":level.discount<=0.075?"Begränsad till måttlig prisbuffert": "Större rabatt mot rapporterat NAV, men fortsatt NAV-risk"}</span>
            </div>)}
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-6">
          <h3 className="font-serif text-xl font-bold text-slate-950">Så avgör vi om en kursnivå är intressant</h3>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {lens.decisionRequirements.map((x,i)=><li key={x} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-900">{i+1}</span><span>{x}</span></li>)}
          </ol>
        </div>
        <SubtleWarning><strong>Viktig datumbegränsning:</strong> Senaste använda B-kurs är {money(lens.comparison.laterBSharePrice,2)} per {lens.comparison.laterPriceDate}. NAV är från {lens.anchor.navDate}. Det går inte att påstå att aktien har en viss aktuell substansrabatt eller premie genom att jämföra dessa datum. Nivåerna måste räknas om vid nytt NAV.</SubtleWarning>
      </section>

      <section id="rapport" className="scroll-mt-36">
        <SectionTitle eyebrow="Rapportkontroll" title="Vad tillförde Q3 2026?" description="Kvartalet är ett bevisunderlag för bolagskvalitet och NAV-utveckling, inte ensamt grund för en framtida riktkurs."/>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-5"><p className="text-xs font-bold uppercase text-slate-500">Justerat NAV/aktie</p><p className="mt-2 text-3xl font-black">{money(snap.navQ3)}</p><p className="mt-2 text-sm text-emerald-800">{percent(navChange,1,true)} från Q2</p><SourceIds ids={["F01","F02"]}/></div>
          <div className="rounded-xl border border-border bg-white p-5"><p className="text-xs font-bold uppercase text-slate-500">Patricia kvartalsavkastning</p><p className="mt-2 text-3xl font-black">{percent(snap.patrQ3,0,true)}</p><p className="mt-2 text-sm text-slate-600">Förändrat värde; inte samma sak som organisk tillväxt</p><SourceIds ids={["F09","F17"]}/></div>
          <div className="rounded-xl border border-border bg-white p-5"><p className="text-xs font-bold uppercase text-slate-500">EQT kvartalsvärdeförändring</p><p className="mt-2 text-3xl font-black">{percent(snap.eqtQ3,0,true)}</p><p className="mt-2 text-sm text-slate-600">Separat från tillväxt i EQT AB:s avgiftsintjäning</p><SourceIds ids={["F13"]}/></div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-slate-700"><tr><th className="px-5 py-4">Rapportmått</th><th className="px-4 py-4 text-right">Q2</th><th className="px-4 py-4 text-right">Q3</th></tr></thead><tbody className="divide-y divide-slate-100">{comparisons.map(row=><tr key={row.label}><th className="px-5 py-3 font-semibold text-slate-900">{row.label}<SourceIds ids={row.src}/></th><td className="px-4 py-3 text-right tabular-nums">{row.q2}</td><td className="px-4 py-3 text-right font-bold tabular-nums">{row.q3}</td></tr>)}</tbody></table>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-5">
          <h3 className="font-bold text-slate-950">Justerat NAV kontra redovisat NAV</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">Investor rapporterade {money(snap.navQ3)} i justerat NAV och {money(snap.reportedNavQ3)} i redovisat NAV per aktie. Skillnaden speglar bland annat marknadsvärdering av större onoterade verksamheter jämfört med redovisning enligt tillämpliga principer. Skillnaden är inte likvida tillgångar som aktieägaren kan realisera till säker kurs.</p>
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-950">Händelse efter balansdagen: EQT-förvärv</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">Den 16 oktober köpte Investor ytterligare 12,5 miljoner aktier i EQT AB för 282,70 kr/aktie från Wallenberg Investments och ökade ägandet till 14,98 %. Detta är främst ett byte av tillgångar, inte automatiskt ny NAV-vinst. Närståendetransaktionen bör följas upp. <SourceIds ids={["F25","F26"]}/></p>
        </div>
      </section>

      <section id="teser" className="scroll-mt-36">
        <SectionTitle eyebrow="Levande investeringsteser" title="Vad behöver följas framåt?" description="Tesen ska prövas mot nya fakta. Den ska inte överleva enbart för att Investor har hög historisk avkastning."/>
        <div className="grid gap-4 lg:grid-cols-3">
          {d.editorial.thesis.map(item=><article key={item.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-xs font-black text-emerald-700">{item.id}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">{item.status}</span></div>
            <h3 className="mt-4 font-serif text-xl font-bold text-slate-950">{item.name}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-700">{item.evidence} <SourceIds ids={item.claimIds}/></p>
            <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600"><strong>Nästa kontroll:</strong> {item.next}</p>
          </article>)}
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">Tesstatus är redaktionell. Mätbara trösklar och regler för statusändring måste slutgranskas innan offentlig publicering.</p>
      </section>

      <section id="risk" className="scroll-mt-36">
        <SectionTitle eyebrow="Risk och säkerhetsmarginal" title="Vad kan bryta värdeskapandet?" description="Rabatten är bara en av flera risker. En låg eller hög rabatt kan inte analyseras utan kvaliteten på de underliggande tillgångarna."/>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Noterad börsrisk","De noterade innehaven svarar för största delen av Investors tillgångar. En global nedgång slår direkt mot NAV."],
            ["Patricias värderingsmultiplar","Förändrad EBITDA, valuta eller jämförelsemultiplar kan få stora konsekvenser för onoterat NAV, även utan kassaflödesförändring."],
            ["EQT och marknadscykeln","EQT AB och EQT-fonderna är känsliga för börsklimat, kapitalflöden och realisationer."],
            ["Ökad substansrabatt","Även vid stigande NAV kan Investor-aktien utvecklas svagt om marknaden åter kräver större holdingbolagsrabatt."],
            ["Kapitalallokering och finansiering","Nyinvesteringar, skuldsättning och utdelningar måste bära sin kapitalkostnad och bevara finansiell flexibilitet."],
            ["Samverkande stress","I en svag marknad kan noterade innehav falla, Patricia omvärderas ned och Investor-rabatten öka samtidigt."]
          ].map(([title,detail])=><article key={title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{detail}</p>
          </article>)}
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-5">
          <p className="font-bold text-slate-950">Alternativkostnaden: Investor eller index?</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">Under Q3 var Investor B:s totalavkastning {percent(d.marketBenchmark.periods[0].investorTsrPct,0,true)} och SIXRX {percent(d.marketBenchmark.periods[0].sixrxTsrPct,0,true)}. För januari–september var motsvarande siffror {percent(d.marketBenchmark.periods[1].investorTsrPct,0,true)} och {percent(d.marketBenchmark.periods[1].sixrxTsrPct,0,true)}. Utfallen säger något om relativ historisk prestation men räcker inte för att fastställa framtida överavkastning. <SourceIds ids={["F33"]}/></p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#087f55]"><CalendarDays size={16}/> Nästa kontrollstation</div>
        <h2 className="mt-3 font-serif text-3xl font-bold text-slate-950">{d.editorial.nextCheckpoint.label}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">Planerat datum {d.editorial.nextCheckpoint.date}, enligt tidigare rapportkalender – ska återkontrolleras. Nytt NAV, samma-dags marknadsvärdering, Patricias organiska tillväxt, kassagenerering och multipelvärdering blir avgörande för nästa analysuppdatering.</p>
      </section>

      <section id="underlag" className="scroll-mt-36">
        <SectionTitle eyebrow="Källor, spårbarhet och metod" title="Så kan analysen granskas" description="Rapporterade fakta, härledda beräkningar och redaktionella omdömen hålls isär. Denna version är fortfarande under intern kvalitetskontroll."/>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.values(d.sourceRefs).map(source=><a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-emerald-400">
            <div className="flex justify-between gap-3 text-xs font-bold uppercase tracking-wider text-emerald-700"><span>{source.classification==="PRIMARY"?"Primärkälla":"Marknadsdata"} · {source.issued}</span><ExternalLink size={16}/></div>
            <h3 className="mt-3 font-bold text-slate-950 group-hover:underline">{source.label}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-600">{source.locations}</p>
            <p className="mt-2 text-[11px] text-slate-400">{source.id}</p>
          </a>)}
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-white p-5">
          <button className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-bold text-slate-950" onClick={()=>setOpenEvidence(!openEvidence)} aria-expanded={openEvidence} type="button">
            <span className="inline-flex items-center gap-2"><BookOpen size={18} className="text-emerald-700"/> Faktaregister ({d.claims.length} poster, källavstämning pågår)</span>{openEvidence?<ChevronUp/>:<ChevronDown/>}
          </button>
          {openEvidence && <div className="mt-5 space-y-2">{d.claims.map(item=><div key={item.id} className="rounded-lg bg-slate-50 p-3 text-xs"><span className="font-black text-emerald-700">{item.id} · {item.kind} · {item.period}</span><p className="mt-1 font-semibold text-slate-800">{item.statement}</p><p className="mt-1 text-slate-500">{item.sourceId} · {item.locator}</p></div>)}</div>}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-5">
          <button className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-bold text-slate-950" onClick={()=>setOpenMethod(!openMethod)} aria-expanded={openMethod} type="button">
            <span className="inline-flex items-center gap-2"><GitCompareArrows size={18} className="text-emerald-700"/> Metod och versionshistorik</span>{openMethod?<ChevronUp/>:<ChevronDown/>}
          </button>
          {openMethod && <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            <p><strong>Metod:</strong> Substansrabatt (+) = 1 − börsvärde för A+B / totalt justerat NAV, uppmätt på samma balansdag. B-aktiens kurs/avrundat NAV per aktie används endast som separat B-referens.</p>
            <p><strong>Värderingsnivåer:</strong> {money(lens.anchor.adjustedNavPerShare)} × (1 − visad rabatt). En mekanisk beräkning på NAV från 30 september, inte ett framtida kursmål.</p>
            <p><strong>Historik:</strong> Kvartalsbaserade medianer på tre och fem år samt tio bokslutsår. Äldre rapportdata är inte fullständigt källavstämda. Statistik är deskriptiv, inte en riskfri framtidsprognos.</p>
            <p><strong>Investeringsbeslut:</strong> BEVAKA tills uppdaterad NAV, Patricia-känslighet, historiska jämförelser och v11.2:s beslutsregel är verifierade. Inga mekaniska köp- eller säljzoner är godkända.</p>
            <p><strong>Tidigare modell:</strong> Provisoriska terminalkurs-/TSR-scenarier från DRAFT_003 finns kvar i versionerad research för revisionsspår, men visas inte som analysens huvudvärdering.</p>
            <p><strong>Version:</strong> {d.version.versionId} · {d.version.status}. Den tidigare publicerade Investor-analysen är orörd.</p>
            {d.changeTracking.map(event=><p key={event.eventId}><strong>{event.eventId}:</strong> {event.summary}</p>)}
          </div>}
        </div>
        <div className="mt-5 rounded-2xl border border-border bg-section-alt p-5">
          <h3 className="flex items-center gap-2 font-bold text-slate-950"><LockKeyhole size={17} className="text-emerald-700"/> Fördjupning</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">Vi öppnar inte ett spekulativt P/E- eller riktkurslabb för Investor. Nästa steg för fördjupad värdering är verifierad känslighet för Patricias värdering och uppdaterat NAV.</p>
          {!user && <button className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-800 px-5 text-sm font-bold text-white hover:bg-emerald-900" type="button" onClick={()=>openLoginModal()}>Skapa gratis konto <ArrowRight size={16}/></button>}
        </div>
        <p className="mt-6 text-xs leading-6 text-slate-600">{d.disclaimer.shortText} <Link to={d.disclaimer.url} className="font-bold text-emerald-700 underline">Läs mer</Link></p>
      </section>
    </main>
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-center text-xs text-slate-500">Börsanalys.se · Investor Q3 2026 · v11.2 NAV_DISCOUNT · Intern förhandsvisning, ej PUBLISH_READY</footer>
  </div>;
}
