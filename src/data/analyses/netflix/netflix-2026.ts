import { AnalysisData } from "../../../types/analysis.js";
import { netflixV112Dossier } from "./netflix-v11-model.js";

/**
 * Public archive metadata. All values are in USD and use the 13 August 2026
 * close unless another date is stated.
 */
export const netflix2026: AnalysisData = {
  contentType: "analysis",
  slug: "netflix-2026",
  title: "Netflix",
  listTitle: "Netflix: monetisering före tittartid",
  ticker: "NFLX",
  isin: "US64110L1061",
  date: "2026-08-14",
  displayDate: "14 augusti 2026",
  market: "NASDAQ",
  sector: "Streaming / Media",
  recommendation: "BEVAKA",
  recommendationReason: "Värdet bygger på 2028E och ett sannolikhetsvägt utfall. Direkta innehav, indirekt exponering och kommersiella relationer är redovisade i analysens metoddel.",
  price: "$78,24",
  pe: "24,7x",
  yield: "0,0%",
  marketCap: "$326 md",
  sharesCount: "4,221 md (Q2 2026)",
  employees: "≈14 000",
  published: true,
  upside: Number((netflixV112Dossier.valuation.totalPotentialPct * 100).toFixed(0)),
  summary: "Netflix visar stark vinst- och kassaflödesutveckling, men aktien kräver att monetiseringen fortsätter växa snabbare än tittandet utan att marginalen tappar fart.",
  investmentCase: `Vår bedömning: Monetisering före tittartid är hela caset
• Rekommendation: BEVAKA · Medel–hög risk
• Sannolikhetsvägt värde 2028E: $96
• Referenskurs: $78,24
• Värdepotential: +23 % totalt, cirka +9 % per år

Netflix har strukturellt förbättrat ekonomin: 2025 ökade omsättningen 16 % och rörelsemarginalen nådde 29,5 %. Nästa fas måste bevisas i ekonomin, inte i narrativet. H1 2026 steg aggregerad tittartid 2 %, medan intäkterna växte 15 %. Det indikerar bättre monetisering på bolagsnivå, men visar inte isolerat hur intäkt eller engagemang per medlem har utvecklats. Skillnaden kan påverkas av medlemsökning, pris, regional- och planmix, reklam, betald delning, valuta och tittartid per medlem.`,
  overviewPoints: [
    { title: "Vår syn", body: "Ett högkvalitativt, globalt abonnemangsbolag med växande annonsben och tydlig operating leverage. Risk/reward är dock mer balanserad än rubriken 'streamingvinnare' antyder." },
    { title: "Investment insight", body: "Marknaden behöver inte främst få rätt om tittartiden. Den behöver få rätt om att Netflix kan fortsätta höja monetiseringen på bolagsnivå utan att kundvärdet eller innehållsekonomin försämras." },
    { title: "Metod", body: "Normaliserad EPS 2028E × P/E. Metoden passar en mogen, kassagenerativ plattform; FCF och EV/EBIT används som rimlighetskontroller." },
    { title: "Datastatus", body: "Beslutsbärande rapportdata bygger på Netflix kvartalsrapporter och Q2 2026 shareholder letter. Vendor-FCF i bildmaterialet används inte då det avviker från primärkälla." }
  ],
  marketOverview: "Netflix säljer global underhållning genom abonnemang, reklam och tilläggstjänster. Bolagets ekonomiska motor är inte längre nettoantalet abonnenter som ensamt KPI, utan pris/planmix, annonsmonetisering, engagemang och kostnaden för innehåll per intäktsdollar.",
  geography: "Global · UCAN · EMEA · LATAM · APAC",
  managementOverview: "Ted Sarandos och Greg Peters leder en modell där innehållsinvesteringar, produktutveckling och distribution ska ge högre intäkt per hushåll. Kapitalallokeringen är allt mer aktieägarorienterad: cirka $6,0 md i återköp under H1 2026.",
  ownershipStructure: "Börsnoterad amerikansk aktie. Börsanalys.se har inget direkt innehav i Netflix; indirekt exponering kan förekomma via breda globala fonder. Ingen ersättning eller annat kommersiellt uppdrag från Netflix har erhållits (bekräftat 14 augusti 2026).",
  analystVerdict: "Den centrala avvägningen är enkel: marginal- och FCF-profilen har blivit klart bättre, men den historiska multipelpremien kan inte användas mekaniskt när tittandet planar ut och reklammodellen fortfarande ska skala.",
  strategyMoat: "Netflix har global skala, direkt kundrelation, produktdistribution och en väldokumenterad förmåga att omsätta engagemang i intäkt. Vallgraven är stark men inte absolut: innehåll är inte exklusivt för evigt och konkurrenterna kan acceptera lägre streaminglönsamhet av strategiska skäl.",
  competitiveAdvantages: [
    "Global skala: Samma produkt- och distributionsplattform kan monetiseras på många marknader med låg inkrementell kostnad.",
    "Direktrelation med användaren: Prissättning, planmix, reklam och rekommendationer kan testas och skalas snabbt.",
    "Operating leverage: 2022–2025 steg EBIT-marginalen från 17,8 % till 29,5 % när omsättningen växte och innehållsbasen utnyttjades bättre."
  ],
  strengths: ["Global räckvidd och varumärke", "Tydlig FCF-profil", "Annonsaffär med växande intäktspotential"],
  weaknesses: ["Innehållsberoende modell", "Tittartiden växer långsamt", "Begränsad transparens i nya KPI:er"],
  opportunities: ["Annonsintäkter omkring $3 md i 2026-guiden", "Pris- och planmix", "Återköp som minskar aktieantalet"],
  threats: ["Multipelkompression", "Konkurrens om innehåll och tid", "Högre innehållskostnad per ny intäktsdollar"],
  financialAnalysis: "Historiken visar ett relevant regimskifte. Omsättningen steg från $31,6 md 2022 till $45,2 md 2025, medan EBIT-marginalen ökade från 17,8 % till 29,5 %. 2026-guiden är $51,0–51,4 md i omsättning, 31,5 % rörelsemarginal och cirka $12,5 md i rapporterat fritt kassaflöde. Q1 2026 innehöll en mottagen WBD-uppsägningsersättning på $2,8 md i interest and other income, utanför EBIT; rapporterad TTM-vinst och FCF-guidning ska därför inte behandlas som ren återkommande kapacitet.",
  financialTimeline: [
    { year: "2022", highlight: "17,8 % EBIT", description: "Omsättning $31,6 md. Ett svagare normaliseringsår före den tydliga marginalexpansionen." },
    { year: "2024", highlight: "26,7 % EBIT", description: "Omsättning +15,6 %. Operating leverage blev synlig och EPS nådde $2,03 enligt bildmaterialet." },
    { year: "2025", highlight: "29,5 % EBIT", description: "Omsättning $45,2 md, fritt kassaflöde $9,5 md och reklamintäkter över $1,5 md." },
    { year: "H1 2026", highlight: "+15 % intäkt", description: "Tittartid +2 % men omsättning +15 %: monetisering, inte volym, bär tillväxten." }
  ],
  financialTables: [
    { title: "Historisk kalibrering", headers: ["USD md, utom marginal", "2022", "2023", "2024", "2025", "R12 Q2 2026"], rows: [["Omsättning", "31,6", "33,7", "39,0", "45,2", "48,4"], ["Tillväxt", "6,5 %", "6,7 %", "15,6 %", "15,9 %", "—"], ["EBIT-marginal", "17,8 %", "20,6 %", "26,7 %", "29,5 %", "29,7 %"], ["Aktier, md", "4,447", "4,416", "4,295", "4,250", "4,221"]], footer: "R12 Q2 2026 innehåller Q3 2025:s brasilianska skattepost och Q1 2026:s mottagna WBD-uppsägningsersättning i nettovinst; posten redovisades utanför EBIT och normaliseras därför endast i EPS/FCF-analysen." },
    { title: "Balansräkning och kassaflöde", headers: ["Q2 2026", "Värde", "Bedömning"], rows: [["Nettoskuld", "$5,2 md", "Hanterbar med FCF, men innehållsåtaganden är centrala."], ["Innehållsåtaganden", "$25,1 md", "$11,9 md förfaller inom 12 månader; jämför inte stocken mekaniskt med ett års FCF."], ["2026 rapporterad FCF-guidning", "≈$12,5 md", "Inkluderar WBD-engångseffekt; inte återkommande kapacitet."], ["Återköp H1 2026", "$5,9 md", "Stödjer EPS, men ersätter inte organisk vinsttillväxt."]], footer: "Primärkälla: Netflix Q2 2026 Form 10-Q och shareholder letter. Bildmaterialets FCF-rad har inte använts eftersom den avviker från bolagets rapporterade fria kassaflöde." }
  ],
  valuation: "Sannolikhetsvägt värde är $96 per aktie på valuation date 31 december 2028. Vi använder normaliserad EPS och scenarioanpassad P/E eftersom Netflix är lönsamt, återköper aktier och har en FCF-profil som lämpar sig för en vinstmultipel. Ett P/E på 23x i Base kräver fortsatt tvåsiffrig intäktstillväxt, 34 % EBIT-marginal och bevisad monetisering; det är en kvalitetsmultipel, men lägre än toppåren.",
  valuationTables: [
    { title: "Full valuation bridge – 2028E", headers: ["USD md, utom EPS och P/E", "Bear", "Base", "Bull"], rows: [["Omsättning", "58,1", "61,4", "63,7"], ["EBIT-marginal", "30,5 %", "34,0 %", "36,0 %"], ["EBIT", "17,7", "20,9", "22,9"], ["Finansnetto", "−0,6", "−0,5", "−0,4"], ["Skatt", "18 %", "18 %", "18 %"], ["Nettoresultat", "14,0", "16,7", "18,5"], ["Utspädda aktier, md", "4,05", "3,95", "3,85"], ["Normaliserad EPS", "$3,46", "$4,23", "$4,80"], ["P/E", "18x", "23x", "28x"], ["Fair value", "$62", "$97", "$134"]], footer: "ASSUMPTION: 2027–2028 tillväxt, marginal, finansnetto, skatt, aktier och multipel. DERIVED: EBIT, nettoresultat, EPS och fair value. Valuation date: 2028-12-31." },
    { title: "Sensitivitet – Base", headers: ["2028E EBIT-marginal / P/E", "20x", "23x", "26x"], rows: [["32 %", "$79", "$91", "$103"], ["34 %", "$85", "$97", "$110"], ["36 %", "$90", "$103", "$117"]], footer: "Mest värdekänsliga variabler är marginal och P/E. Vid 34 % marginal ger $59 md/$61,4 md/$64 md i omsättning cirka $93/$97/$102 per aktie vid 23x P/E." }
  ],
  valuationMotivation: "Historisk P/E var omkring 30–45x 2022–2025, men den perioden omfattar både multipelåterhämtning och snabb marginalexpansion. Base på 23x är avsiktligt mer återhållsam och kräver ändå fortsatta bevis på reklam- och prisdriven tillväxt.",
  growth: "Reklam, pris/planmix, bättre kontodelningsekonomi och internationell monetisering är de viktigaste drivarna. Bolaget guidar reklamintäkter kring $3 md 2026, ungefär en fördubbling mot 2025. Base förutsätter +10 % omsättning 2027 och +9 % 2028 — en avmattning från 2024–2026, men inte en återgång till 2022–2023 års lågväxt.",
  growthPoints: [
    { title: "Reklam", body: "Guidning om cirka $3 md 2026 gör reklam till en reell resultatdrivare, inte bara en option." },
    { title: "Pris och mix", body: "H1 2026 visar att intäkten kan växa klart snabbare än tittartiden. Uthålligheten är nästa test." },
    { title: "Kapitalallokering", body: "Återköp kan sänka aktieantalet, men Base räknar med en måttlig minskning till 3,95 md aktier 2028." }
  ],
  growthTables: [{ title: "Börsanalys.se:s intäktsantaganden", headers: ["ASSUMPTION", "2026E", "2027E", "2028E"], rows: [["Bear tillväxt", "≈13 %", "7 %", "6 %"], ["Base tillväxt", "≈13 %", "10 %", "9 %"], ["Bull tillväxt", "≈13 %", "12 %", "11 %"]], footer: "2026E utgår från bolagets guidning $51,0–51,4 md. 2027–2028 är Börsanalys.se:s egna scenarioantaganden." }],
  growthMotivation: "Historiken är relevant som intervall, inte facit. Marginalen var 17,8 % 2022 och 29,5 % 2025; en Base-marginal på 34 % 2028 förutsätter fortsatt operating leverage, men inte att varje kvartal kan överträffa den nuvarande vinstnivån.",
  risks: ["Monetiseringen kan mattas snabbare än marknaden räknar med när pris och annonsbelastning når kundvärdets gräns.", "Innehållsbehovet kan öka och pressa marginal/FCF även om omsättningen fortsätter upp.", "En vinstutveckling enligt Base kan ändå ge svag aktieavkastning om P/E faller mot Bear-nivåer."],
  riskAnalysis: "Risknivå: MEDEL–HÖG. Finansiell risk begränsas av FCF och likviditet, men affärsrisk (innehåll och konkurrens), prognosrisk (pris, mix och reklam), kassaflödesrisk (innehållsbetalningar) och multipelrisk är alla värderingsavgörande.",
  riskTables: [{ title: "Djävulens advokat", headers: ["Fråga", "Motargument", "Vad bevisar att vi har fel?"], rows: [["Är Base för optimistisk?", "34 % EBIT-marginal kräver att annonser och pris inte äter kundvärde eller kostnadseffektivitet.", "Intäktstillväxt under 8 % kombinerat med utebliven marginalexpansion."], ["Är 23x rimligt?", "Marknaden kan betala lägre multipel trots stigande EPS om tillväxten blir mer mogen.", "Vinst växer men aktien avkastar svagt genom multipelkompression."], ["Är Bull realistiskt?", "36 % marginal och 11–12 % tillväxt kräver flera positiva drivare samtidigt.", "Reklam, pris/mix och innehållseffektivitet måste leverera parallellt."]], footer: "Bear är inte katastrof: bolaget fortsätter växa och vara lönsamt, men multipel och marginal återgår till en mognare regim." }],
  managementAnalysis: "Ledningen har styrt mot högre lönsamhet och kapitalretur, samtidigt som man tonat ned traditionell abonnentrapportering. Det kan vara rationellt för ett moget bolag, men gör externa kontrollpunkter viktigare: reklamintäkt, intäktstillväxt, marginal, FCF och innehållsåtaganden.",
  managementTables: [{ title: "Nästa rapport – först att följa", headers: ["KPI", "Varför", "Tesstatus påverkas"], rows: [["Q3 2026 omsättning och 11,7 %-guidning", "Testar om monetiseringen håller över 2026.", "Tillväxttes"], ["Rörelsemarginal mot 33,2 %-guidning", "Testar om operating leverage är uthållig.", "Marginaltes"], ["Annonsintäkt och 2026-ambition ≈$3 md", "Testar om det nya benet blir materialiserat.", "Monetiseringstes"]] }],
  esg: "Makro- och hållbarhetsfaktorer är sekundära för den korta värderingshorisonten. De ekonomiskt relevanta externa faktorerna är valuta, konsumentbudgetar, innehållsproduktion och reglering av reklam/data på lokala marknader.",
  aiSummary: "Konsensus används som sanity check, inte facit. Tillgänglig extern data indikerar omkring $51,2 md i 2026-omsättning och cirka $57,0 md 2027. Base ligger nära 2026 men är mer försiktig i marginal/multipelankaret än ett mekaniskt användande av historiska toppmultiplar.",
  aiTables: [{ title: "Teser att följa", headers: ["Status", "Tes", "Senaste bevis", "Nästa bevis"], rows: [["På väg", "Intäkt per tittad timme kan växa uthålligt.", "H1 2026: intäkter +15 %, tittartid +2 %.", "Q3: omsättning minst i linje med guidning och fortsatt stark planmix."], ["På väg", "Reklam blir en materiell vinstdrivare.", "2025 reklamintäkter >$1,5 md; 2026-guidning ≈$3 md.", "Rapporterad utveckling mot 2026-ambitionen."], ["Obekräftad", "34 % EBIT-marginal 2028 är uthållig.", "2025: 29,5 %; 2026-guidning: 31,5 %.", "Marginal nära/över guidning utan att FCF försvagas."], ["På väg", "Återköp förstärker EPS utan att försvaga flexibiliteten.", "$6,0 md återköp under H1 2026; nettoskuld ≈$5,2 md.", "Aktieantal och nettoskuld efter fortsatt kapitalretur."]], footer: "STATUS är analytisk bedömning. SENASTE BEVIS är FACT; nästa bevis är en mätbar uppföljningspunkt." }],
  aiMotivation: "Värderingen ska inte drivas av ett enda KPI. Kombinationen tillväxt, EBIT-marginal och P/E har störst effekt på fair value.",
  conclusion: "BEVAKA. Netflix är ett bättre bolag än dess äldre streamingnarrativ: lönsamhet, FCF och kapitalretur har förbättrats väsentligt. Men $96 i sannolikhetsvägt 2028-värde ger endast cirka 9 % årlig potential från $78,24, samtidigt som Bear ger omkring 20 % nedsida. Säkerhetsmarginalen är därför för liten för KÖP.",
  summaryQnA: [
    { question: "Varför inte KÖP?", answer: "Base kräver både 34 % EBIT-marginal och 23x P/E. Det är rimligt, men inte tillräckligt asymmetriskt från dagens kurs." },
    { question: "Vad är starkaste positiva datapunkten?", answer: "H1 2026 växte intäkterna 15 % trots endast 2 % tillväxt i tittartid — monetiseringen fungerar." },
    { question: "Starkaste argumentet mot synen?", answer: "Om reklam och pris/mix fortsätter skala samtidigt som innehållseffektiviteten förbättras kan Bull bli mer sannolikt än vår 20 %-vikt." }
  ],
  watchTable: [{ title: "Publiceringskontroll", headers: ["Kontroll", "Status", "Underlag"], rows: [["Faktakällor", "Klar", "Primära rapporter och extern marknadsreferens dokumenterade."], ["Värderingsmodell", "Klar", "Samma valuation date och 100 % sannolikheter."], ["Ägar-/ersättningsupplysning", "Klar", "Inget direkt innehav; möjlig indirekt exponering via globala fonder; ingen ersättning eller kommersiell relation till Netflix (14 augusti 2026)."]], footer: "Analysen är publiceringsklar enligt dossierns v11.2-kontroller." }],
  targetPrice: "$96",
  buyZone: "Ej fastställd · invänta större säkerhetsmarginal eller starkare bevis",
  totalScore: "28/40",
  rating: "BEVAKA · MEDEL RISK",
  scenarios: [
    { type: "bear", label: "Bear", probability: "25 %", value: "$62", change: "−20 %", description: "2027–2028 intäkt +7 % / +6 %, EBIT-marginal 30,5 %, EPS $3,46 och P/E 18x." },
    { type: "base", label: "Base · huvudscenario", probability: "55 %", value: "$97", change: "+24 %", description: "2027–2028 intäkt +10 % / +9 %, EBIT-marginal 34,0 %, EPS $4,23 och P/E 23x." },
    { type: "bull", label: "Bull", probability: "20 %", value: "$134", change: "+72 %", description: "2027–2028 intäkt +12 % / +11 %, EBIT-marginal 36,0 %, EPS $4,80 och P/E 28x." }
  ],
  scores: { affarsmodell: 4, strategiskMoat: 4, finansiellKvalitet: 4, vardering: 3, tillvaxtutsikter: 4, riskprofil: 3, esgMakro: 3, aiObservationer: 3, vdAnalys: 4 }
};
