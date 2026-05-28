import { SectionHeader, MetricCard, VerdictBox, SwotGrid, ScenarioCards, RatingBox, Card as AnalysisCard, ProgressBar, FadeIn as AnalysisFadeIn, ChartCard, EditorialReadNext } from "./index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, Info, TrendingUp, AlertTriangle } from "lucide-react";
import NordnetCTA from "./NordnetCTA";
import AdUnit from "./AdUnit";
import SEO from "../SEO";
import { AnalysisData } from "../../data/analyses";
import AnalysisDisclaimer from "./AnalysisDisclaimer";

const allScores = [
  {key:"Affärsmodell",val:4,max:5},
  {key:"Strategisk Moat",val:4,max:5},
  {key:"Finansiell",val:3,max:5},
  {key:"Värdering",val:2,max:5},
  {key:"Tillväxt",val:4,max:5},
  {key:"Riskprofil",val:3,max:5},
  {key:"VD-analys",val:4,max:5},
  {key:"AI-obs.",val:3,max:5},
];

interface NibeDeepDiveProps {
  data: AnalysisData;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
  isWatchlistLoading?: boolean;
  nextAnalysis?: AnalysisData;
}

export default function NibeDeepDive({ 
  data,
  onToggleWatchlist, 
  isInWatchlist, 
  isWatchlistLoading,
  nextAnalysis
}: NibeDeepDiveProps){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),50);return()=>clearTimeout(t);},[]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pt-16">
      <SEO 
        title={`Analys: ${data.title} (${data.ticker}) - Börsanalys.se`}
        description={data.summary}
      />
      {/* 1. HERO BAND */}
      <div className="w-full bg-[#0F766E] text-white py-8 md:py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">Vår bedömning</span>
              <div className="bg-white text-[#0F766E] w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-[18px] font-black tracking-tighter">BEVAKA</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-2">
                <Link to="/analys" className="text-white/70 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                  NIBE Industrier AB — 30 april 2026
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold tracking-wide">NIBE B</span>
                <span className="text-sm font-medium opacity-90">Industrivaror & Tjänster • Stockholm</span>
                
                <button 
                  onClick={onToggleWatchlist}
                  disabled={isWatchlistLoading}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isInWatchlist 
                      ? 'bg-white text-[#0F766E] border-white' 
                      : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  <Star size={14} fill={isInWatchlist ? "currentColor" : "none"} />
                  {isWatchlistLoading ? "Laddar..." : isInWatchlist ? "Bevakar" : "Bevaka"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end w-full md:w-64">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black tracking-tighter">27/40</span>
              <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Poäng</span>
            </div>
            <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '67.5%' }} />
            </div>
            <span className="text-sm font-bold tracking-tight">3.37 / 5.0 – Rating 68%</span>
          </div>
        </div>
      </div>

      {/* 2. SCORE STRIP */}
      <div className="w-full bg-[#0F766E] border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8">
          {allScores.map(({key, val, max}, i) => (
            <div key={key} className={`py-4 text-center ${i !== allScores.length - 1 ? 'border-r border-white/10' : ''}`}>
              <div className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-white/70 mb-1.5">{key}</div>
              <div className="font-serif text-xl leading-none text-white">
                {val}<span className="text-[10px] text-white/50 font-mono">/{max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-16">
        
        {/* SUMMARY BOX */}
        <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl flex items-start gap-4 text-teal-900">
          <Info size={24} className="shrink-0 mt-1" />
          <p className="text-sm font-medium leading-relaxed">
            <strong>Sammanfattning:</strong> NIBE är ett absolut kvalitetsbolag vars finansiella svacka ser ut att bottna ur. Omsättning och marginaler har vänt uppåt, men till nuvarande aktiekurs (ca 41 kr) är mycket av återhämtningen redan inprisad. Utan en tydligare säkerhetsmarginal eller snabbare marginallyft i de svagare segmenten rekommenderas investerare att avvakta ett bättre ingångsläge.
          </p>
        </div>

        {/* KEY METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalysisCard className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börskurs</span>
            <div className="text-2xl font-black text-slate-900">41,00 kr</div>
            <span className="text-xs text-slate-500 mt-1 block">Nasdaq Large Cap</span>
          </AnalysisCard>
          <AnalysisCard className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Börsvärde</span>
            <div className="text-2xl font-black text-slate-900">82,6 mdkr</div>
            <span className="text-xs text-slate-500 mt-1 block">Familjen Lindkvist röststark huvudägare</span>
          </AnalysisCard>
          <AnalysisCard className="p-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">P/E-tal</span>
            <div className="text-2xl font-black text-slate-900">34,2x</div>
            <span className="text-xs text-slate-500 mt-1 block">2025 (Justerat)</span>
          </AnalysisCard>
          <AnalysisCard className="p-6 border-2 border-[#0F766E]/20">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nettoskuld/EBITDA</span>
            <div className="text-2xl font-black text-[#0F766E]">2,7x</div>
            <span className="text-xs text-[#0F766E] font-bold mt-1 block">Minskar från 3,9x (2024)</span>
          </AnalysisCard>
        </div>

        {/*
          ═══════════════════════════════════════════════════════════
          AD UNIT: analysis-top-display
          Placering: Direkt efter snabb översikt (Key Metrics) och
          omedelbart FÖRE Sektion I.

          SCROLL-LOGIK: Användare visar hög uppmärksamhet direkt
          efter den snabba översikten – de har fått ett first
          impression av bolaget och befinner sig i ett naturligt
          uppehåll innan djupanalysen börjar. CPM maximeras eftersom
          annonsören når en aktiv, investeringsintresserad läsare i
          ett "above the fold"-nära läge.
          ═══════════════════════════════════════════════════════════
        */}
        <AdUnit variant="top-display" />

        {/* ── INLEDNING ── */}
        <section>
            <p className="text-[18px] leading-[1.8] text-slate-700 italic border-l-4 border-[#0F766E] pl-6 py-2">
                Smålands stolthet, värmepumpsjätten NIBE, har de senaste åren gett aktieägarna en berg-och-dalbana som fått Lisebergs attraktioner att blekna. Efter att ha hyllats som en av Stockholmsbörsens klarast lysande stjärnor under det senaste decenniet, träffade bolaget en veritabel tegelvägg under 2024. Grossisternas lager svämmade över, räntorna bedövade byggsektorn och marknaden tvärnitade. Nu när vi stängt böckerna för 2025 ger dock signalerna från Markaryd och VD Gerteric Lindquist starka tecken på att stålbadet ser ut att vara över.
            </p>
            <p className="text-[16px] leading-[1.75] text-slate-700 mt-6">
                Är det dags att välkomna NIBE in i den långsiktiga portföljen igen till dagens kurs, eller döljer sig fler spöken i de småländska skogarna? Låt oss dyka djupt ner i bolagets finansiella hjärta, strategiska vallgravar och framtidsutsikter!
            </p>
        </section>

        {/* ── I. FÖRETAGSÖVERSIKT ── */}
        <section id="oversikt" className="scroll-mt-24">
          <AnalysisFadeIn>
             <SectionHeader number="Sektion I" title="Företagsöversikt" accentColor="#0F766E" />
             
             <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
               <div className="relative z-10 space-y-5">
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>Bakgrund & Geografi:</strong> Resan började i småländska Markaryd 1949, initialt med rör- och varmvattenelement. Idag har företaget transformerats till en av Europas ledande industrikoncerner med över 20 000 anställda. Geografiskt är bolaget oerhört välbalanserat: Europa (exkl. Norden) drar in 45 % av intäkterna, Nordamerika bidrar med 31 %, medan den mognare nordiska hemmamarknaden står för 18 %.
                 </p>
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>Kärna – Affärsidé & Affärsmodell:</strong> NIBE existerar för att förse världen med bättre och mer hållbara energilösningar – ett uppdrag som landat i en historisk sweet spot. Verksamheten vilar på tre ben:
                 </p>
                 <ul className="list-disc pl-5 space-y-2 text-[15px] text-slate-700">
                    <li><strong>Climate Solutions (66 % av intäkterna):</strong> Koncernens kassako. Värmepumpar, kylaggregat och ventilationssystem för såväl villor som enorma kommersiella fastigheter. Här finns även ett växande inslag av återkommande intäkter genom serviceavtal.</li>
                    <li><strong>Element (28 % av intäkterna):</strong> Skräddarsydda underleverantörskomponenter för uppvärmning och styrning som säljs B2B till industrier som vindkraft, tåg, HVAC och den heta halvledarsektorn.</li>
                    <li><strong>Stoves (8 % av intäkterna):</strong> Braskaminer för mys och trygghet. Säsongsdrivet och tydligt inriktat mot konsument.</li>
                 </ul>
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>Styrning & Ledning:</strong> Det är omöjligt att analysera NIBE utan att tala om VD Gerteric Lindquist, som styrt skutan med säker hand sedan 1989. Tillsammans med ledningen har han odlat fram en närmast unik kultur: extrem decentralisering där lokala bolag behåller sitt namn och entreprenörsdriv, men får tillgång till en miljardkoncerns inköpsmuskler. NIBE har en evig, kaxig målsättning om att växa 20 % per år (varav hälften via förvärv). I ägarlistan finns tydligt <em>skin in the game</em> via grundarfamiljen Lindkvist (som kontrollerar bolaget röstmässigt via A-aktier), kompletterat av trygga institutioner som Robur och AMF.
                 </p>
                 <p className="text-[15px] leading-[1.75] text-slate-700">
                   <strong>ESG & Hållbarhet:</strong> Kärnan i NIBEs affärsidé är energieffektivitet och elektrifiering – bolaget bidrar direkt till energiomställningen genom att ersätta fossila uppvärmningssystem. Man rapporterar enligt högsta svenska standarder och ses ofta som ett "grönt" alternativ för långsiktiga investerare.
                 </p>
               </div>
             </div>
             
             <RatingBox rating={4} maxRating={5} title="Betyg I – Affärsmodell" accentColor="#0F766E" description="En exceptionellt stark och välstyrd affärsmodell, bevisad förmåga att integrera hundratals förvärv framgångsrikt, och en av börsens i särklass mest respekterade företagsledningar. Att betyget stannar på 4 beror på att bolaget primärt säljer hårdvara och saknar de tunga återkommande prenumerationsintäkter (t.ex. SaaS) som krävs för ett rent toppbetyg." />
          </AnalysisFadeIn>
        </section>

        {/* ── II. STRATEGISK ANALYS & MOAT ── */}
        <section id="strategi" className="scroll-mt-24">
             <AnalysisFadeIn delay={100}>
                <SectionHeader number="Sektion II" title="Strategisk analys & Moat" accentColor="#0F766E" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Makro & Bransch:</strong> Den breda makrotrenden är NIBEs allra bästa vän: energiomställningen och elektrifieringen av världen. REPowerEU och globala initiativ vill fasa ut gas- och oljepannor, vilket gör värmepumpen till framtidens standard. Men de senaste två åren har visat att även megatrender tar paus när plånboken svider. Höga räntor och inflation kvävde renoveringsviljan, medan politiskt velande skapat osäkerhet. Nu vänder dock räntorna ner och distributionslagren har äntligen ebbat ut och nått acceptabla nivåer.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      En geopolitisk joker är Hormuzsundet. Om spänningar i Mellanöstern skulle störa flöden av olja och LNG kan det driva upp energipriserna och skapa ny inflationsoro. För NIBE är effekten dubbelverkande: på kort sikt kan högre energipriser, stigande osäkerhet och eventuellt räntetryck försämra konsumenternas investeringsvilja. På längre sikt kan samma utveckling däremot stärka argumentet för energieffektivisering och minskat beroende av fossila uppvärmningslösningar. För fastigheter med stora värme- och kylbehov kan värmepumpar – särskilt bergvärme med möjlighet till frikyla – få en tydligare ekonomisk logik när fossila energipriser är volatila.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      <strong>Konkurrens &amp; Moat (Vallgrav):</strong> Marknaden för värmepumpar och industrikomponenter är konkurrensutsatt, med jättar som Daikin, Bosch och kinesiska aktörer som knackar på dörren. Trots detta har NIBE en massiv och bred vallgrav:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-[15px] text-slate-700">
                        <li><strong>Distributionsnätverket:</strong> Värmepumpar är komplexa system, inte hyllvaror. NIBE har spenderat decennier på att utbilda och certifiera ett enormt nätverk av lokala installatörer. Dessa byter ogärna ut "sitt" märke (höga byteskostnader).</li>
                        <li><strong>Kontinentbaserad tillverkning:</strong> NIBE strävar efter att tillverka sina produkter nära kunden (Nordamerika för Nordamerika, Europa för Europa). I en värld av eskalerande handelskrig och tullar skapar detta säkrare leveranskedjor och är en strukturell superkraft.</li>
                        <li><strong>Bergvärme som teknisk vallgrav:</strong> En viktig men lätt förbisedd del av NIBEs konkurrensfördel är bolagets starka position inom mark- och bergvärmepumpar. Till skillnad från enklare luftbaserade lösningar kräver bergvärme borrning, korrekt dimensionering, lokal installationskompetens och systemintegration i fastigheten. Det gör segmentet svårare att kopiera snabbt för lågprisaktörer. Asiatiska konkurrenter kan pressa priset inom mer standardiserade luft/vatten-lösningar, men har inte samma historiska styrka, installatörsnät eller lokala systemkunnande inom bergvärme i Norden och Nordamerika. För fastigheter med stort värmebehov – och särskilt där kylning/frikyla på sommaren är relevant – ger bergvärme en mycket hög årseffektivitet, vilket stärker NIBEs moat inom den tekniskt mest krävande delen av marknaden.</li>
                    </ol>
                  </div>
                </div>

                <SwotGrid data={{
                    strengths: [
                      "Global aktör med stark portfölj av lokala premiumvarumärken.",
                      "Urstarkt installatörsnätverk och egna utbildningscentra.",
                      "Stark position inom svårkopierad bergvärme/markvärme.",
                      "Kontinentbaserad tillverkning som minskar sårbarhet för tullar.",
                      "Exceptionell förvärvshistorik och integration."
                    ],
                    weaknesses: [
                      "Stark exponering mot nybyggnation och konsumenternas räntekänslighet.",
                      "NIBE Stoves brottas med utdragen marginalpress.",
                      "Förhöjd skuldsättning begränsar kortsiktigt förvärvsutrymmet."
                    ],
                    opportunities: [
                      "Expansion inom kommersiell kyla och AI-datacenter via NIBE Element.",
                      "Sjunkande räntor kan sätta fart på uppdämd renoveringsvilja.",
                      "Volatila fossilpriser kan stärka kalkylen för värmepumpar.",
                      "Megatrenden kring Europas energiomställning och REPowerEU."
                    ],
                    threats: [
                      "Politiskt velande kring gröna subventioner.",
                      "Asiatiska lågprisaktörer ökar närvaron inom mer standardiserade segment.",
                      "Handelskrig och tullar, särskilt mellan USA och Kanada.",
                      "Energichocker kan skapa inflation, svagare konsumentförtroende och investeringspaus."
                    ]
                }} />
                
                <RatingBox rating={4} maxRating={5} title="Betyg II – Strategisk Moat" accentColor="#0F766E" description="De underliggande megatrenderna är urstarka och nätverket av installatörer bygger en tung vallgrav. Att betyget stannar på 4 beror på bolagets visade kortsiktiga sårbarhet för byggcykler och osäkra politiska subventioner, samt det långsiktiga hotet från asiatisk prispress." />
             </AnalysisFadeIn>
        </section>

        {/* ── III. FINANSIELL ANALYS ── */}
        <section id="finansiellt" className="scroll-mt-24">
            <AnalysisFadeIn delay={200}>
                <SectionHeader number="Sektion III" title="Finansiell analys" accentColor="#0F766E" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      För att förstå NIBEs finansiella situation måste vi se på historiken före och efter krisen 2024. <br /><br />
                      <em>(För nya investerare: P/E står för Pris/Vinst och visar hur många årsvinster bolaget värderas till. EBITDA är rörelseresultat före avskrivningar, ett viktigt mått på operativt kassaflöde. ROE är avkastning på eget kapital och mäter hur effektivt bolaget förräntar ägarnas pengar.)</em>
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Resultaträkning: Omsättning, Tillväxt och Marginaler</h3>
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">År</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Omsättnings-tillväxt</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EPS (Just.)</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">EBIT-marg.*</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Nettomarg.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2021</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">13,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,65 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">14,5%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">11,0%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2022</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">30,0%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">2,16 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">14,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">11,0%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2023</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">16,4%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">2,37 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">14,9%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">10,3%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2024</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">-13,1%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">0,80 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">8,0%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">4,0%</td></tr>
                      <tr className="bg-[#CCFBF1] hover:bg-[#CCFBF1]"><td className="p-2.5 text-[#0F766E] font-bold">2025</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">0,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">1,20 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">10,5%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">5,6%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#92400E]">2026e</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">5,3%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">1,55 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">11,8%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">7,0%</td></tr>
                    </tbody>
                  </table>
                  <div className="font-mono text-[11px] text-slate-400 mt-2">*Rörelsemarginal (EBIT) och EPS 2024-2025 är justerade för jämförelsestörande poster.</div>
                </div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Ovanstående tabell berättar historien om ett bolag som under 2024 tog en brutal smäll när grossisterna slutade köpa och istället tömde sina lador. Under 2025 vänder skutan – den totala omsättningen landade på 40 841 Mkr. Tillväxten omräknat i fast valuta var fina 5,3 %, men den svenska kronans styrka påverkade försäljningen negativt med över 1,8 miljarder kronor. Huvudsegmentet <em>Climate Solutions</em> har sensationellt nog återtagit mycket av sin historiska lönsamhet och presterar 13,0 % marginal för helåret (och 15,7 % i Q4), men Stoves underpresterar kraftigt (4,1 %).
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Balansräkning: Skuldsättning och Kapital</h3>
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">År</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Nettoskuld / EBITDA</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Soliditet</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Räntetäckningsgrad*</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2023</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">2,1x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">44,4%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">6,7x</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2024</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C] font-semibold">3,9x</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">45,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">1,9x</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#0F766E] font-bold">2025</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">2,7x</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">46,6%</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">3,4x</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Skuldsättningen var ett stort orosmoln i slutet av 2024 när den sköt upp närmare 4 gånger vinsten. Idag ser vi en lugnande och snabb minskning till 2,7x. Kassaflödet från den löpande verksamheten (före förändringar av rörelsekapital) uppgick till 4 192 Mkr, medan det renodlade operativa kassaflödet (enligt årsredovisningens snävare definition) landade på goda 2,9 mdkr. Kassaflöde efter investeringar uppgick till 1,9 mdkr. Soliditeten är trygg på 46,6 %, men NIBE är inte ett skuldfritt bolag och man behöver kassaflödet för att trycka ner nettoskulden ytterligare innan nya stora förvärv kan göras.
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Utdelningshistorik</h3>
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Utdelningsår</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Utdelning per aktie</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Andel av EPS (Just)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2024 (för 2023)</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">0,65 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">~30%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2025 (för 2024)</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">0,30 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700">38%</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#0F766E] font-bold">2026 (för 2025)*</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">0,35 kr</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">29%</td></tr>
                    </tbody>
                  </table>
                  <div className="font-mono text-[11px] text-slate-400 mt-2">*Styrelsens förslag för utdelning våren 2026.</div>
                </div>

                <RatingBox rating={3} maxRating={5} title="Betyg III – Finansiell Kvalitet" accentColor="#0F766E" description="Historiskt en absolut 5-poängare, men fallet 2024 drar ner helhetsbilden. Återhämtningen under 2025 med starka kassaflöden, kraftigt sänkt skuldsättning (från 3,9x till 2,7x EBITDA) och marginaler på väg upp visar stor operativ styrka. Dock är lönsamheten (ROE 8,5 %) fortfarande en bra bit ifrån bolagets historiska guldstandard." />
            </AnalysisFadeIn>
        </section>

        {/* ── IV. VÄRDERING ── */}
        <section id="vardering" className="scroll-mt-24">
            <AnalysisFadeIn delay={300}>
                <SectionHeader number="Sektion IV" title="Värdering" accentColor="#0F766E" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      NIBE värderades under nollränteåren snudd på som ett mjukvarubolag. Den värderingen är död. Frågan är nu vad man ska betala för en påbörjad återhämtning, när aktien står i 41 kr.
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">P/E-talets historiska utveckling & Estimat</h3>
                <div className="overflow-x-auto my-5">
                  <table className="w-full border-collapse text-[13.5px]">
                    <thead>
                      <tr className="bg-[#111827] text-white">
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Period</th>
                        <th className="p-2.5 text-right font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">P/E-tal</th>
                        <th className="p-2.5 text-left font-mono text-[9.5px] tracking-[0.1em] uppercase font-medium text-white/85">Kommentar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700 font-bold">5-årshistoriskt snitt</td><td className="p-2.5 text-right font-mono text-[13px] text-slate-700 font-bold">~48,6x</td><td className="p-2.5 text-left text-[13px] text-slate-700">Extremvärderingar från pandemiåren snedvrider historiken.</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-slate-700">2024 (Krisåret)</td><td className="p-2.5 text-right font-mono text-[13px] text-[#B91C1C]">~51,3x</td><td className="p-2.5 text-left text-[13px] text-slate-700">Vinstkollapsen gjorde att aktien såg extremt dyr ut trots massivt kursras.</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#0F766E] font-bold">2025 (Nuvarande)</td><td className="p-2.5 text-right font-mono text-[13px] text-[#0F766E] font-bold">~34,2x</td><td className="p-2.5 text-left text-[13px] text-slate-700">Vid kurs 41 kr och 2025 justerade EPS på 1,20 kr.</td></tr>
                      <tr className="hover:bg-gray-50"><td className="p-2.5 text-[#92400E]">2026 (Estimat)</td><td className="p-2.5 text-right font-mono text-[13px] text-[#92400E]">~26,0x</td><td className="p-2.5 text-left text-[13px] text-slate-700">Förutsatt att EPS letar sig upp mot 1,55 kr.</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Ett nuvarande P/E-tal kring 34x på en vinst som fortfarande repar sig från en kris är dyrt. Även om vi blickar framåt mot 2026, när maskineriet beräknas gå för fullt igen och EPS letar sig upp mot 1,55 kr, ligger värderingen fortfarande över 26x vinsten. För att kunna motivera denna multipel som attraktiv krävs att marknaden fullt ut prisar in en snabb återgång till 2022/2023 års nivåer, vilket den politiska osäkerheten i omvärlden just nu sätter käppar i hjulet för.
                    </p>
                  </div>
                </div>
                
                <RatingBox rating={2} maxRating={5} title="Betyg IV – Värdering" accentColor="#0F766E" description="Värderingen är ansträngd. Även om marginalerna klättrar tillbaka, lämnar en multipel på 34x årets vinst (och 26x nästa års förväntade vinst) i princip noll säkerhetsmarginal om marknadsåterhämtningen skulle dra ut på tiden." />
            </AnalysisFadeIn>
        </section>

        {/* ── V. TILLVÄXT ── */}
        <section id="tillvaxt" className="scroll-mt-24">
             <AnalysisFadeIn delay={400}>
                <SectionHeader number="Sektion V" title="Tillväxtutsikter & Triggers" accentColor="#0F766E" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      NIBE sitter på flera spännande drivkrafter som gör att tillväxten inte bara vilar på om vi bygger villor eller inte:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-[15px] text-slate-700">
                        <li><strong>Expansion inom kommersiella fastigheter:</strong> NIBE slår sig in allt hårdare på storskaliga klimatsystem, kyla och ventilation för företag. Detta driver högre snittordrar och minskar beroendet av konsumenternas plånböcker.</li>
                        <li><strong>Datacenter & Halvledare:</strong> Affärsområdet NIBE Element surfar på den globala tech-vågen. Fabriker och enorma datahallar knutna till AI-utveckling och halvledarproduktion kräver industriell kylning, styrning och värmeteknik.</li>
                        <li><strong>Nya regelverk och plattformar:</strong> Kommande direktiv tvingar branschen mot naturliga köldmedier. NIBE släpper nya gemensamma plattformar för detta, bland annat serier med R290, under 2026.</li>
                    </ul>
                    <p className="text-[15px] leading-[1.75] text-slate-700 mt-4">
                      <strong>Katalysatorer (Triggers) i närtid:</strong> Den enskilt viktigaste triggern just nu är att se hur de europeiska konsumenterna (särskilt den viktiga tyska marknaden) agerar nu när ECB sänkt räntorna. Ytterligare en joker är att NIBEs förvärvsmaskin har gått på sparlåga under 2024/2025. Nu när balansräkningen stabiliserats lär förvärvsmotorn snart ryta igång igen.
                    </p>
                  </div>
                </div>

                <RatingBox rating={4} maxRating={5} title="Betyg V – Tillväxtutsikter" accentColor="#0F766E" description="Megatrenderna i ryggen (energiomställning, elektrifiering och industriell infrastruktur) är urstarka, och expansionen inom kommersiella fastigheter är mycket lovande. Att det inte blir full pott beror på risken för politisk inbromsning av gröna subventioner." />
             </AnalysisFadeIn>
        </section>

        {/* ── VI. RISKPROFIL ── */}
        <section id="risk" className="scroll-mt-24">
            <AnalysisFadeIn delay={500}>
                <SectionHeader number="Sektion VI" title="Riskprofil ⚠️" accentColor="#0F766E" />
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-4 text-amber-900 mb-8">
                  <AlertTriangle size={24} className="shrink-0 mt-1" />
                  <p className="text-sm font-medium leading-relaxed">
                    ⚠️ <strong>Inverterad skala:</strong> I denna sektion innebär 5/5 mycket låg risk. NIBE erhåller 3/5 = medelhög risk.
                  </p>
                </div>

                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Risken i NIBE har omvärderats radikalt av marknaden de senaste åren. Följande faktorer måste investerare ha respekt för:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-[15px] text-slate-700">
                        <li><strong>Politisk osäkerhet (Hög):</strong> Värmepumpsmarknaden är starkt beroende av politiska styrmedel och subventioner. Ett politiskt velande skapar direkt iskalla konsumenter. I USA togs vissa skattesubventioner bort vid årsskiftet.</li>
                        <li><strong>Geopolitik & Tullar (Medel):</strong> Affärsområdet Stoves blöder redan idag från de under 2025 införda handelstullarna mellan Kanada och USA.</li>
                        <li><strong>Räntekänslighet (Medel):</strong> Värmepumpar och renoveringar kostar stora pengar. Som bevisat under 2024 stannar plånboken i fickan när räntorna biter.</li>
                        <li><strong>Konkurrens från Asien (Medel):</strong> De kinesiska jättarna har ögonen på den europeiska marknaden. Än så länge skyddas NIBE av sitt installatörsnätverk, men hotet om strukturell prispress är ständigt närvarande.</li>
                    </ul>
                    <p className="text-[15px] leading-[1.75] text-slate-700 mt-4">
                        Trots dessa varningstecken bör vi komma ihåg att NIBE klarat stålbadet med svarta siffror. Balansräkningen är numera solid (Nettoskuld/EBITDA nere på 2,7x), vilket fungerar som en stark livboj.
                    </p>
                  </div>
                </div>

                <RatingBox rating={3} maxRating={5} title="Betyg VI – Riskprofil" accentColor="#0F766E" description="Medelhög risk. Balansräkningen är tryggad och verksamheten är mycket väl diversifierad globalt. Däremot är bolagets exponering mot politiska vindkast (subventioner), räntecykler och tullar bevisligen en direkt riskfaktor för volymtillväxten." />
            </AnalysisFadeIn>
        </section>

        {/* ── VII. VD-ANALYS ── */}
        <section id="vd-analys" className="scroll-mt-24">
            <AnalysisFadeIn delay={600}>
                <SectionHeader number="Sektion VII" title="Analys av VD-ordet" accentColor="#0F766E" />
                
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                  <div className="relative z-10 space-y-5">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                      Gerteric Lindquist skriver inga vanliga kvartalsrapporter; han författar små manifest. Att analysera hans ord över de senaste fyra kvartalen ger en mästarklass i svensk industrikommunikation.
                    </p>
                    <ul className="list-disc pl-5 space-y-3 text-[15px] text-slate-700">
                        <li><strong>Ton och transparens:</strong> Oerhört hög. VD blundar aldrig för motgångar. När målen missades för Stoves och Element under 2025, kvantifierade han exakt i bokslutskommunikén med hur många miljoner man föll kort (t.ex. "NIBE Stoves avvek med hela 5,9 procentenheter [...] vilket motsvarar 205 Mkr"). Denna ärlighet bygger enormt förtroende.</li>
                        <li><strong>Strategisk kontinuitet:</strong> Fullkomlig. Budskapet rubbas inte en centimeter oavsett marknadsklimat. Det är "regionbaserad produktion", "decentraliserad organisation" och de ständigt återkommande "rörelsemarginalintervallen" (13-15% för Climate Solutions, 8-11% för Element, 10-13% för Stoves) som dikterar rytmen i varje rapport.</li>
                        <li><strong>Makro & Bransch:</strong> Lindquist är krass. Han noterar den starka svenska kronan (-1,8 miljarder kr i påverkan på omsättningen 2025) och den geopolitiska turbulensen (tullar/tariffer), men framhåller att företaget bara har sig själva att förlita sig på för att parera detta.</li>
                        <li><strong>Framåtblickande fokus:</strong> Trots glasklara marginalmål är kommunikationen ofta mer övergripande och filosofisk framåt ("vi ska växa 20 %"). Man saknar ibland de där knivskarpa, tidsbundna KPI:erna för exakt hur kapitalet ska allokeras det kommande året.</li>
                    </ul>
                  </div>
                </div>

                <RatingBox rating={4} maxRating={5} title="Betyg VII – VD-ordet" accentColor="#0F766E" description="Klart och ärligt med en exceptionell balans mellan framgångar och utmaningar, samt en konsekvent kommunikation. Nås dock inte full pott (5/5) eftersom ledningen, trots sin transparens kring historiska missar, saknar tillräcklig skärpa kring framåtblickande, tidsbundna och mätbara KPI:er för exempelvis specifika förvärvsvolymer eller kapitalallokeringsmål framåt." />
            </AnalysisFadeIn>
        </section>

        {/* ── VIII. AI-OBSERVATIONER ── */}
        <section id="ai" className="scroll-mt-24">
             <AnalysisFadeIn delay={700}>
                 <SectionHeader number="Sektion VIII" title="AI-observationer 🔍" accentColor="#0F766E" />
                 
                 <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
                   <div className="relative z-10 space-y-5">
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Insidertransaktioner:</strong> Försiktigt positiva signaler. I närtid har tunga namn som finanschefen (CFO) gjort stödjande insiderköp när aktien pressades. Att CFO köper i den öppna marknaden ger ett visst stöd för att ledningen ser nuvarande nivåer som attraktiva.
                     </p>
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Sentiment & Konsensus:</strong> Analytikerkåren är oerhört delad, men har en lutning åt det neutrala/positiva hållet (ca 7 köp, 3 sälj, 3 behåll, snittriktkurs kring 43,7 kr). Bank of America var bland de tunga aktörer som ställde sig på köpsidan i spåren av den starka marginalåterhämtningen i Q4-rapporten.
                     </p>
                     <p className="text-[15px] leading-[1.75] text-slate-700">
                       <strong>Historiska mönster & Avvikelser:</strong> NIBE handlas nu extremt långt under sin historiska snittvärdering, men det speglar snarare att den forna pandemidopade multipeln dött ut. Marknaden prisar in en normalisering men ifrågasätter det underliggande tillväxttempot när subventioner sviktar.
                     </p>
                   </div>
                 </div>

                 <RatingBox rating={3} maxRating={5} title="Betyg VIII – AI-observationer" accentColor="#0F766E" description="De tekniska och insynsdrivna observationerna lutar svagt åt det positiva hållet tack vare tydliga stödköp från ledningen. Den fundamentala osäkerheten och höga optiska värderingen håller dock analytikerkåren splittrad, varför starkare köpsignaler saknas." />
             </AnalysisFadeIn>
        </section>

        {/* ── IX. SAMMANFATTNING ── */}
        <section id="sammanfattning" className="scroll-mt-24">
            <SectionHeader number="Sektion IX" title="Sammanfattning & Investeringsbeslut" accentColor="#0F766E" />
            
            <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">De tre centrala frågorna</h3>

            <div className="bg-[#CCFBF1] border-l-4 border-[#0F766E] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>1. Är detta ett kvalitetsbolag?</strong> Utan tvekan. NIBE är ett industribolag av yppersta världsklass. De har en bevisad, extremt skalbar, decentraliserad maskin, ett lojalt nätverk av underleverantörer/installatörer och rider på decenniets största strukturella megatrend: elektrifieringen av världen.
            </div>
            <div className="bg-[#F9FAFB] border-l-4 border-[#92400E] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>2. Är aktien rimligt värderad?</strong> Nej, vid 41 kr är värderingen krävande. Att betala ett P/E på 34 för 2025 års intjäning, och 26x för ett framtida estimat, lämnar närmast noll utrymme för felsteg. Visserligen repade sig Climate Solutions magiskt snabbt till 13 % EBIT-marginal under året, men hela maskineriet måste prestera felfritt för att 41 kr ska kännas som en fyndlapp.
            </div>
            <div className="bg-[#DBEAFE] border-l-4 border-[#1E3A5F] p-3.5 text-[13.5px] text-slate-700 my-4.5 leading-[1.65]">
              <strong>3. Passar bolaget som ett långsiktigt innehav?</strong> Ja, NIBE är en aktie som ska låsas in i byrålådan i 5–10 år. Det är sällan en bra swing-trade, men en fantastisk sammansättare av värde över decennier. Däremot kan det finnas bättre lägen att kliva in.
            </div>

            <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Slutsats</h3>
            <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:shadow-md transition-all duration-500 mb-8 mt-4">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0F766E]/10 transition-colors duration-700 pointer-events-none"></div>
              <div className="relative z-10 space-y-5">
                <p className="text-[15px] leading-[1.75] text-slate-700">
                  NIBE har precis genomlidit en massiv efterfrågechock, men står nu på andra sidan med blanka vapen. Bolagets främsta styrkor är de strukturella megatrenderna i ryggen och en fenomenal förmåga att pressa upp marginalerna genom kostnadskontroll även när volymerna sviker (vilket bevisades av Climate Solutions under 2025). 
                </p>
                <p className="text-[15px] leading-[1.75] text-slate-700">
                  De största riskerna i närtid är politikernas klåfingrighet kring subventioner och att kaminsegmentet (Stoves) tappat lönsamhetsgnistan på grund av tullar. Värderingen vid nuvarande kursnivå (41 kr) är utmanande och lämnar en obefintlig säkerhetsmarginal. NIBE är ett kvalitetsbolag, men just nu saknas den prislapp som motiverar en helhjärtad köprekommendation.
                </p>
                <p className="text-[15px] leading-[1.75] text-slate-700 font-bold mt-4 uppercase">
                  REKOMMENDATION: BEVAKA
                </p>
                <p className="text-[15px] leading-[1.75] text-slate-700">
                  Till dagens kursnivå kring 41 kr ser vi att mycket av marginalåterhämtningen redan är inprisad. Vi bedömer rekommendationerna utifrån följande nivåer:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[15px] text-slate-700">
                    <li><strong>Vid kurs runt 35–36 kr:</strong> Tydligt KÖP. Då finns en inbyggd säkerhetsmarginal om återhämtningen haltar.</li>
                    <li><strong>Vid kurs runt 40–42 kr (idag):</strong> BEVAKA tills EPS-momentumet och tillväxten bekräftas starkare i kommande rapporter.</li>
                </ul>
              </div>
            </div>

            <VerdictBox 
              verdict="BEVAKA"
              target="40 kr"
              description="NIBE är ett absolut kvalitetsbolag vars finansiella svacka ser ut att bottna ur. Omsättning och marginaler har vänt uppåt, men till nuvarande aktiekurs (ca 41 kr) är mycket av återhämtningen redan inprisad. Vi rekommenderar att avvakta för en bättre ingångsnivå kring 35–36 kr."
              date="30 april 2026"
              accentColor="#0F766E"
            />

            <div className="bg-[#0F766E] text-white p-9 my-8 rounded-3xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-9 items-start">
              <div className="font-serif text-[56px] leading-none text-white whitespace-nowrap uppercase tracking-tighter font-black">BEVAKA</div>
              <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Totalpoäng</div>
                  <div className="font-mono text-[14px] text-white">27 / 40 · Rating 0,68</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Målpris (12 mån)</div>
                  <div className="font-mono text-[14px] text-white">40 kr</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Mer attraktiv köpnivå</div>
                  <div className="font-mono text-[14px] text-white">~35–36 kr</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Risknivå</div>
                  <div className="font-mono text-[14px] text-white">Medel (3/5)</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Värderingsbedömning</div>
                  <div className="font-mono text-[14px] text-[#FCA5A5]">Neutral/Hög</div>
                </div>
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/70 mb-1">Analysdatum</div>
                  <div className="font-mono text-[14px] text-white">30 april 2026</div>
                </div>
              </div>
            </div>

            <h3 className="font-serif text-[19px] text-[#111827] mt-7 mb-3">Vad ska investeraren bevaka framåt?</h3>
            <div className="my-5 space-y-0">
              {[
                { num: "01", title: "Marginalen i NIBE Stoves & Element", text: "Climate Solutions har återtagit mycket av sin historiska lönsamhet, nu måste de två andra benen bevisa att de kan leta sig tillbaka till sina historiska intervall (10-13 % resp. 8-11 %)." },
                { num: "02", title: "Volymåterhämtningen i Tyskland/Europa", text: "Hur agerar konsumenterna när räntorna fallit? Sätter det fart på orderingången hos tillverkarna?" },
                { num: "03", title: "Skuldsättningen (Nettoskuld/EBITDA)", text: "Om kvoten tickar ner mot 2,0x vet vi att Lindquists förvärvskanon snart är redo att avfyras igen." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 py-3.5 border-b border-slate-200 last:border-b-0 items-start">
                  <div className="font-mono text-[11px] text-slate-400 shrink-0 pt-0.5 w-6">{item.num}</div>
                  <div>
                    <div className="font-semibold text-[#111827] mb-1 text-[14px]">{item.title}</div>
                    <div className="text-[13px] text-slate-600 leading-[1.55]">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

        </section>

        {/*
          ═══════════════════════════════════════════════════════════
          AD UNIT: analysis-middle-article
          Placering: EXAKT mellan Sektion IX (Sammanfattning) och
          Sektion X (Scenarier).

          SCROLL-LOGIK: Datapunkten är tydlig – högst engagemang
          sker vid punkt 9–10. Läsaren har precis absorbe rat
          investeringsrekommendationen (Sektion IX) och gör ett
          naturligt mentalt uppehåll INNAN scenarierna. Detta är
          det optimala "break point" för en kontextuell annons:
          hög sida-tid, högt scroll-djup = premium CPM-segment.
          ═══════════════════════════════════════════════════════════
        */}
        <AdUnit variant="middle-article" className="my-2" />

        {/* ── X. SCENARIER ── */}
        <section id="scenarier" className="scroll-mt-24 pb-12">
            <SectionHeader number="Sektion X" title="Scenarier: Bull, Base & Bear" accentColor="#0F766E" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {/* Bull Case */}
              <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Bull Case · 25%</span>
                </div>
                <div className="font-serif text-4xl text-slate-900 mb-2 leading-none">50 kr</div>
                <div className="font-mono text-[10px] text-slate-500 mb-6">+22% från nuv. kurs</div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Antaganden</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">Europas omställning accelererar kraftigt, Stoves vänder och M&A-motorn drar igång storförvärv.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">EPS-estimat</span>
                      <span className="text-sm font-bold text-slate-700">1,80 kr</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Multipel</span>
                      <span className="text-sm font-bold text-slate-700">28x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Base Case */}
              <div className="p-8 bg-white border-4 border-[#0F766E] rounded-3xl shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#0F766E]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0F766E]">Base Case · 50%</span>
                </div>
                <div className="font-serif text-4xl text-slate-900 mb-2 leading-none">40 kr</div>
                <div className="font-mono text-[10px] text-slate-500 mb-6">−2% från nuv. kurs</div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Antaganden</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">Stabil och lugn volymtillväxt. Marginalerna normaliseras helt under 2027.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">EPS-estimat</span>
                      <span className="text-sm font-bold text-slate-700">1,55 kr</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Multipel</span>
                      <span className="text-sm font-bold text-slate-700">26x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bear Case */}
              <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Bear Case · 25%</span>
                </div>
                <div className="font-serif text-4xl text-slate-900 mb-2 leading-none">26 kr</div>
                <div className="font-mono text-[10px] text-slate-500 mb-6">−37% från nuv. kurs</div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Antaganden</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">Tysklands tvärnit smittar Europa. Priskrig bryter ut och tullar förstör Stoves export.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">EPS-estimat</span>
                      <span className="text-sm font-bold text-slate-700">1,20 kr</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">Multipel</span>
                      <span className="text-sm font-bold text-slate-700">22x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-6">
                <h3 className="font-serif text-[19px] text-[#111827]">Scenariokommentarer</h3>
                <div className="relative overflow-hidden bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                        Vi bedömer <strong>Base case</strong> som allra mest sannolikt (~50 % sannolikhet). Här ser vi att det värsta lagertrasslet är över och att Europa långsamt ställer om mot värmepumpar enligt megatrenderna, utan att det blir den explosion vi såg under pandemiåren. Marginalerna kryper stadigt tillbaka in i komfortzonen, men en kurs på 41 kr innebär att marknaden redan betalar för 40 kr i Base Case.
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                        För att <strong>Bull case</strong> (~25 % sannolikhet) ska slå in krävs att den allmänna konjunkturen i Europa, och särskilt byggmarknaden i Tyskland och Norden, vaknar till liv rejält. Samtidigt lyckas Element kapitalisera massivt på AI-datacenter och skulden faller så pass att ett värdeskapande storförvärv kan genomföras. 
                    </p>
                    <p className="text-[15px] leading-[1.75] text-slate-700">
                        Om <strong>Bear case</strong> (~25 % sannolikhet) materialiseras beror det troligen på att den geopolitiska spänningen (tullar i Nordamerika) eskalerar utom kontroll och att lågprisaktörer från Asien lyckas penetrera installationsledet i Europa med aggressiv prissättning, vilket raserar branschens lönsamhet. 
                    </p>
                </div>
            </div>
        </section>

        <AnalysisCard>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-mono text-center">Score: 27 / 40</div>
          <div className="space-y-6">
            {allScores.map(score => (
              <div key={score.key}>
                <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wide">
                  <span>{score.key}</span>
                  <span className="text-[#0F766E]">{score.val}/{score.max}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0F766E] rounded-full" 
                    style={{ width: `${(score.val / score.max) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </AnalysisCard>

        {/*
          ═══════════════════════════════════════════════════════════
          AD UNIT: analysis-footer-multiplex (slot 4667293922)
          Placering: Längst ner i artikeln som EXIT-annons.

          SCROLL-LOGIK: Läsaren har konsumerat hela analysen och
          befinner sig i "exit intent"-zonen. Bred display-annons
          ger maximal synlighet och täcker hela artikelbredden.
          ═══════════════════════════════════════════════════════════
        */}
        <AdUnit variant="footer-multiplex" />

        {/*
          ═══════════════════════════════════════════════════════════
          NORDNET AFFILIATE CTA – Visuellt dominant
          Placering: EFTER analysens slut och footer-multiplex.

          AFFILIATE-REGLER:
          • Minst 300px spacing till närmaste annons (uppfylls via
            mt-[300px] padding + AdUnit-höjd ovan).
          • CTA är visuellt dominant med gradient-bakgrund,
            stor typografi och call-to-action-knapp.
          ═══════════════════════════════════════════════════════════
        */}
        <div className="mt-[300px]">
          <NordnetCTA variant="low" />
        </div>

        <AnalysisDisclaimer theme="light" className="mt-16" />

        {nextAnalysis && (
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="font-serif text-2xl text-slate-900 mb-8 text-center">Läs nästa analys</h3>
            <EditorialReadNext recommendations={nextAnalysis ? [nextAnalysis] : []} />
          </div>
        )}

      </div>
    </div>
  );
}
