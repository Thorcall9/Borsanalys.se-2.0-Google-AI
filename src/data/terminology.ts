export interface TerminologyEntry {
  id: string;
  title: string;
  category: "Värdering" | "Lönsamhet" | "Finansiell styrka" | "Kassaflöde" | "Strategi & Kvalitet" | "Tillväxt & Effektivitet";
  description: string;
  explanation: string;
  formula?: string;
  example: {
    company: string;
    value: string;
    context: string;
  };
}

export const terminology: TerminologyEntry[] = [
  // VÄRDERING
  {
    id: "pe-ratio",
    title: "P/E-tal",
    category: "Värdering",
    description: "Visar hur många årsvinster marknaden värderar bolaget till.",
    explanation: "P/E står för Price/Earnings. Ett högt P/E kan betyda att marknaden förväntar sig hög tillväxt, medan ett lågt kan tyda på undervärdning eller problem.",
    formula: "Aktiekurs / Vinst per aktie (EPS)",
    example: {
      company: "Evolution AB",
      value: "9,95x",
      context: "Evolution handlas till ett historiskt lågt P/E-tal, vilket innebär att du betalar knappt 10 kronor för varje krona bolaget tjänar."
    }
  },
  {
    id: "pb-ratio",
    title: "P/B-tal",
    category: "Värdering",
    description: "Jämför börsvärdet mot det bokförda värdet.",
    explanation: "Jämför vad börsen värderar bolaget till mot vad tillgångarna faktiskt är värda på pappret. P/B under 1 innebär att du köper bolaget för mindre än dess redovisade tillgångsvärde. Vanligt vid analys av banker och fastighetsbolag.",
    formula: "Aktiekurs / Eget kapital per aktie",
    example: {
      company: "Swedbank",
      value: "ca 1,5x",
      context: "Banker värderas ofta med P/B eftersom deras tillgångar är lätta att värdera. Swedbank handlas nära bokfört värde, typiskt för en mogen lönsam bank."
    }
  },
  {
    id: "ps-ratio",
    title: "P/S-tal",
    category: "Värdering",
    description: "Värderar bolaget i förhållande till omsättningen.",
    explanation: "Används ofta för att värdera bolag som ännu inte är lönsamma men växer snabbt. Nackdelen är att det ignorerar hur mycket av försäljningen som faktiskt blir vinst.",
    formula: "Aktiekurs / Omsättning per aktie",
    example: {
      company: "Tesla",
      value: "Hög multipel",
      context: "Tesla har historiskt handlats till höga P/S-tal jämfört med traditionella biltillverkare, eftersom marknaden prissätter tillväxtpotentialen snarare än dagens vinst."
    }
  },
  {
    id: "ev-ebitda",
    title: "EV/EBITDA",
    category: "Värdering",
    description: "Värderar hela bolaget inklusive skulder mot kassaflödet.",
    explanation: "Värderar hela bolaget inklusive skulder i förhållande till kassaflödet före avskrivningar. Populärt vid företagsköp och gränsöverskridande jämförelser. Typiska nivåer: industri 8–12x, techbolag 15–25x.",
    formula: "Enterprise Value / EBITDA",
    example: {
      company: "Volvo AB",
      value: "ca 8–10x",
      context: "Volvo handlas till EV/EBITDA runt 8–10x, i linje med andra tunga industribolag."
    }
  },
  {
    id: "dividend-yield",
    title: "Direktavkastning",
    category: "Värdering",
    description: "Den procentuella kontantutdelningen per år.",
    explanation: "Visar den procentuella kontantutdelning du får på din investering varje år – som en ränta på dina aktier. Hög direktavkastning är inte alltid bra; kontrollera att utdelningen är hållbar.",
    formula: "Utdelning per aktie / Aktiekurs × 100",
    example: {
      company: "Tele2",
      value: "7–9%",
      context: "Tele2 är känt för sin höga direktavkastning. Telekombolag har stabila kassaflöden som gör höga utdelningar möjliga."
    }
  },
  {
    id: "nav-discount",
    title: "Substansrabatt / Substanspremie",
    category: "Värdering",
    description: "Relevant för investmentbolag och fastighetsbolag.",
    explanation: "Handlas bolaget under NAV (Net Asset Value) är det substansrabatt – över NAV är det substanspremie.",
    formula: "(Börskurs – NAV per aktie) / NAV per aktie × 100",
    example: {
      company: "Investor AB",
      value: "Varierande",
      context: "Investor handlas historiskt med substansrabatt. Marknaden har historiskt värderat bolaget lägre än dess substansvärde, trots Wallenbergsfärens framgångsrika förvaltning."
    }
  },

  // LÖNSAMHET
  {
    id: "roe",
    title: "ROE - avkastning på eget kapital",
    category: "Lönsamhet",
    description: "Mäter hur effektivt bolaget använder ägarnas pengar.",
    explanation: "Ett ROE på 20% betyder 20 kr vinst per 100 kr aktieägarna investerat. Hög och stabil ROE över tid är ett tecken på en stark affärsmodell.",
    formula: "Nettoresultat / Eget kapital",
    example: {
      company: "Investor AB",
      value: "Hög avkastning",
      context: "Investor fokuserar på att öka substansvärdet, vilket i praktiken är deras sätt att maximera avkastningen på det egna kapitalet över tid."
    }
  },
  {
    id: "roce",
    title: "ROCE - avkastning på sysselsatt kapital",
    category: "Lönsamhet",
    description: "Bredare mått som inkluderar räntebärande skulder.",
    explanation: "Visar hur bra bolaget genererar avkastning på allt kapital som används i verksamheten. Särskilt användbart för att jämföra kapitalintensiva bolag med olika skuldsättning.",
    formula: "EBIT / (Eget kapital + Räntebärande skulder)",
    example: {
      company: "Atlas Copco",
      value: "Konsekvent hög",
      context: "Atlas Copco levererar konsekvent ROCE långt över sin kapitalkostnad, vilket innebär att varje investerad krona skapar mer värde än den kostar."
    }
  },
  {
    id: "ebitda-margin",
    title: "EBITDA-marginal",
    category: "Lönsamhet",
    description: "Lönsamhet i kärnverksamheten före avskrivningar.",
    explanation: "Visar hur lönsam kärnverksamheten är innan finansiella poster och bokföringsmässiga avskrivningar räknas in. En hög marginal innebär att bolaget behåller en stor del av varje intäktskrona.",
    formula: "EBITDA / Omsättning × 100",
    example: {
      company: "Evolution AB",
      value: "66%",
      context: "Evolutions extremt höga EBITDA-marginal förklaras av att spelstudios är dyra att bygga men billiga att driva i stor skala."
    }
  },
  {
    id: "ebit-margin",
    title: "Rörelsemarginal (EBIT-marginal)",
    category: "Lönsamhet",
    description: "Andel av försäljningen som blir kvar efter operativa kostnader.",
    explanation: "Visar hur stor andel av varje försäljningskrona som blir kvar efter operativa kostnader – men innan räntor och skatt. Mer fullständigt än EBITDA eftersom det inkluderar avskrivningar.",
    formula: "EBIT / Omsättning × 100",
    example: {
      company: "Apple",
      value: "30%+",
      context: "Apple bibehåller en mycket hög rörelsemarginal trots sin enorma storlek, drivet av tjänsteintäkter med nästan obefintliga marginalkostnader."
    }
  },
  {
    id: "net-margin",
    title: "Nettomarginal",
    category: "Lönsamhet",
    description: "Det slutliga måttet på lönsamhet efter alla kostnader.",
    explanation: "Hur mycket som faktiskt blir vinst efter allt: kostnader, räntor och skatt. Låg nettomarginal kan vara okej i branscher med hög omsättning men är oroande i kapitalintensiva branscher.",
    formula: "Nettoresultat / Omsättning × 100",
    example: {
      company: "H&M",
      value: "ca 5–7%",
      context: "H&M:s nettomarginal är relativt blygsam för ett globalt varumärke, vilket speglar hård priskonkurrens i modebranschen."
    }
  },
  {
    id: "roic",
    title: "ROIC - avkastning på investerat kapital",
    category: "Lönsamhet",
    description: "Mäter värdeskapande i förhållande till kapitalkostnad.",
    explanation: "Ett av de mest kraftfulla lönsamhetsmåtten. Om ROIC är högre än bolagets kapitalkostnad (WACC) skapar bolaget värde. Om det är lägre förstör det värde.",
    formula: "NOPAT / Investerat kapital",
    example: {
      company: "Atlas Copco",
      value: "Värdeskapande",
      context: "Atlas Copcos förmåga att år efter år leverera hög ROIC är ett kvitto på en stark och hållbar affärsmodell."
    }
  },

  // FINANSIELL STYRKA
  {
    id: "debt-equity",
    title: "Skuldsättningsgrad",
    category: "Finansiell styrka",
    description: "Lån jämfört med ägarnas kapital.",
    explanation: "Visar hur stor del av bolagets finansiering som kommer från lån jämfört med ägarnas kapital. Hög skuldsättning förstärker avkastningen i goda tider men ökar risken dramatiskt i dåliga.",
    formula: "Räntebärande skulder / Eget kapital",
    example: {
      company: "SBB (historiskt)",
      value: "Hög risk",
      context: "SBB byggde upp extremt hög skuldsättning under lågränteåren. När räntorna steg 2022–2023 kollapsade modellen."
    }
  },
  {
    id: "net-debt-ebitda",
    title: "Nettoskuld / EBITDA",
    category: "Finansiell styrka",
    description: "Tid för att betala av skulder med rörelseresultat.",
    explanation: "Visar hur många år det tar för bolaget att betala av sina nettoskulder med nuvarande rörelseresultat. Under 2x anses tryggt. Över 4x börjar det bli ansträngt.",
    formula: "(Räntebärande skulder – Kassa) / EBITDA",
    example: {
      company: "Volvo AB",
      value: "under 1x",
      context: "Volvo har historiskt hållit en mycket låg skuldsättning relativt sin storlek, vilket ger finansiell flexibilitet."
    }
  },
  {
    id: "net-debt-ebit",
    title: "Nettoskuld / EBIT",
    category: "Finansiell styrka",
    description: "Mer konservativt mått på skuldbörda.",
    explanation: "Liknar Nettoskuld/EBITDA men använder EBIT istället – avskrivningar räknas in. Relevant för kapitalintensiva bolag där avskrivningar speglar verkligt slitage.",
    formula: "(Räntebärande skulder – Kassa) / EBIT",
    example: {
      company: "Volvo AB",
      value: "Stabil",
      context: "För ett bolag som Volvo ger Nettoskuld/EBIT en mer rättvisande bild av skuldbördan."
    }
  },
  {
    id: "solidity",
    title: "Soliditet",
    category: "Finansiell styrka",
    description: "Andel av tillgångar finansierade med eget kapital.",
    explanation: "Visar hur stor del av bolagets tillgångar som finansieras med ägarnas eget kapital. Hög soliditet innebär låg finansiell risk och större motståndskraft i en kris.",
    formula: "Eget kapital / Totala tillgångar × 100",
    example: {
      company: "Investor AB vs SBB",
      value: "Hög vs Låg",
      context: "Investor har historiskt haft mycket hög soliditet, medan SBB hade en för låg soliditet för sin riskprofil."
    }
  },
  {
    id: "interest-coverage",
    title: "Räntetäckningsgrad",
    category: "Finansiell styrka",
    description: "Förmåga att betala räntekostnader.",
    explanation: "Visar hur många gånger bolaget kan betala sina räntekostnader med sin rörelsevinst. Under 2x är ett varningstecken. Över 5x är robust.",
    formula: "EBIT / Räntekostnader",
    example: {
      company: "Castellum vs SBB",
      value: "Stark vs Svag",
      context: "Castellum hade en betydligt starkare räntetäckningsgrad än SBB när räntorna steg."
    }
  },
  {
    id: "current-ratio",
    title: "Kassalikviditet",
    category: "Finansiell styrka",
    description: "Kortsiktig betalningsförmåga.",
    explanation: "Mäter bolagets kortsiktiga betalningsförmåga – kan de betala sina räkningar här och nu utan att behöva sälja lagret? Över 1,0 anses godkänt.",
    formula: "(Omsättningstillgångar – Lager) / Kortfristiga skulder",
    example: {
      company: "Byggbolag",
      value: "Kritisk nivå",
      context: "Byggbolag kan ha stora tillgångar men om kassalikviditeten är låg kan likviditetsproblem uppstå snabbt."
    }
  },

  // KASSAFLÖDE
  {
    id: "fcf",
    title: "Fritt kassaflöde (FCF)",
    category: "Kassaflöde",
    description: "Pengar bolaget genererar och kan använda fritt.",
    explanation: "De pengar bolaget faktiskt genererar och kan använda fritt – för utdelningar, återköp, förvärv eller amorteringar. Svårare att manipulera än vinst.",
    formula: "Operativt kassaflöde – Capex",
    example: {
      company: "Microsoft",
      value: "Världsledande",
      context: "Microsoft genererar ett av världens högsta fria kassaflöden, vilket finansierar utdelningar och AI-investeringar."
    }
  },
  {
    id: "capex",
    title: "Capex (investeringsutgifter)",
    category: "Kassaflöde",
    description: "Utgifter för anläggningstillgångar.",
    explanation: "Bolagets utgifter för att köpa eller underhålla anläggningstillgångar. Kapitallätta affärsmodeller med låg capex är generellt mer värdefulla.",
    formula: "Investeringar i anläggningstillgångar",
    example: {
      company: "Volvo vs Evolution",
      value: "Hög vs Låg",
      context: "Volvo har hög capex för fabriker, medan Evolution har extremt låg capex för sin digitala tjänst."
    }
  },

  // STRATEGI & KVALITET
  {
    id: "moat",
    title: "Moat (vallgrav)",
    category: "Strategi & Kvalitet",
    description: "Hållbara konkurrensfördelar.",
    explanation: "Skyddar bolagets vinster från konkurrenter. Typer: kostnadsfördelar, nätverkseffekter, immateriella tillgångar, byteskostnad och effektiv skala.",
    example: {
      company: "Alphabet (Google)",
      value: "Stark vallgrav",
      context: "Googles sökmotor har en nätverkseffekt och datainsamlingsfördel som skapar en vallgrav."
    }
  },
  {
    id: "payout-ratio",
    title: "Pay-out ratio",
    category: "Strategi & Kvalitet",
    description: "Andel av vinsten som går till utdelning.",
    explanation: "Visar hur stor del av nettoresultatet som går till utdelning. Låg ratio innebär kapital för tillväxt. Över 80% kan vara ett varningstecken.",
    formula: "Utdelning per aktie / Vinst per aktie × 100",
    example: {
      company: "Investor AB",
      value: "Låg ratio",
      context: "Investor delar ut en relativt liten andel och prioriterar återinvestering i portföljbolagen."
    }
  },
  {
    id: "buybacks",
    title: "Återköp av aktier",
    category: "Strategi & Kvalitet",
    description: "Minskar antalet aktier för att öka vinst per aktie.",
    explanation: "Minskar antalet utestående aktier, vilket ökar vinsten per aktie för kvarvarande ägare. Alternativ till utdelning och ofta mer skatteeffektivt.",
    example: {
      company: "Swedbank",
      value: "Värdeskapande",
      context: "Swedbank har genomfört stora återköpsprogram när kapitaltäckningen tillåtit det."
    }
  },

  // TILLVÄXT & EFFEKTIVITET
  {
    id: "revenue-growth",
    title: "Omsättningstillväxt",
    category: "Tillväxt & Effektivitet",
    description: "Det enklaste måttet på ett bolags momentum.",
    explanation: "Hög och konsekvent omsättningstillväxt är ofta det första tecknet på ett bolag som vinner marknadsandelar. Men tillväxt utan lönsamhet är inte hållbart.",
    formula: "(Omsättning år 2 – Omsättning år 1) / Omsättning år 1 × 100",
    example: {
      company: "Evolution AB",
      value: "20–40% per år",
      context: "Evolution har under ett decennium levererat konsekvent hög omsättningstillväxt."
    }
  },
  {
    id: "eps-growth",
    title: "Vinsttillväxt (EPS Growth)",
    category: "Tillväxt & Effektivitet",
    description: "Viktigaste drivkraften för en aktiekurs långsiktigt.",
    explanation: "Långsiktigt tenderar kursen att följa vinstutvecklingen. En aktie kan tillfälligt handlas fel, men vinsten styr i längden.",
    formula: "(EPS år 2 – EPS år 1) / EPS år 1 × 100",
    example: {
      company: "Investor AB",
      value: "Konsekvent",
      context: "Investors substansvärde per aktie har vuxit konsekvent under decennier."
    }
  },
  {
    id: "inventory-turnover",
    title: "Lagrets omsättningshastighet",
    category: "Tillväxt & Effektivitet",
    description: "Hur många gånger per år lagret säljs och ersätts.",
    explanation: "Hög hastighet innebär att kapital inte är bundet i osålt lager. Låg hastighet kan tyda på inaktuella produkter eller svag efterfrågan.",
    formula: "Kostnad för sålda varor / Genomsnittligt lager",
    example: {
      company: "H&M vs Hermès",
      value: "Hög vs Låg",
      context: "H&M behöver hög lageromsättning för mode, medan Hermès kan hålla lägre hastighet pga exklusivitet."
    }
  }
];
