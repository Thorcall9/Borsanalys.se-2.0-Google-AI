export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  part: number;
  icon: string;
}

export const guides: Record<string, Guide> = {
  "grunderna-i-aktieanalys": {
    slug: "grunderna-i-aktieanalys",
    title: "Grunderna i aktieanalys",
    excerpt: "Lär dig hur du analyserar ett bolag från grunden, steg för steg.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Vad är aktieanalys?</h2>
          <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Aktieanalys handlar om att bedöma om ett bolag är värt att investera i. Du tittar på bolagets affärsmodell, finansiella ställning, ledning och framtidsutsikter för att avgöra om aktien är rätt värderad på börsen. Målet är enkelt: <span class="text-primary font-black">köpa något som är värt mer än du betalar</span>.
          </p>
        </section>

        <div class="not-prose grid grid-cols-1 gap-10 my-20">
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 1</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Förstå affärsmodellen</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Börja alltid med att förstå hur bolaget tjänar sina pengar. Vad säljer de? Till vilka kunder? Vad är deras konkurrensfördel? Investor AB äger andelar i andra bolag och skapar värde genom aktivt ägarskap. Volvo säljer lastbilar, bussar och tjänster globalt. Förstår du inte hur bolaget tjänar pengar – investera inte.
            </p>
          </div>

          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 2</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Läs årsredovisningen</h3>
            <div class="space-y-6">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Årsredovisningen är din viktigaste källa. Fokusera på tre delar:
              </p>
              <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <li class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Resultat</div>
                  <div class="text-sm text-muted-foreground font-medium">Intäkter, kostnader och vinst</div>
                </li>
                <li class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Balans</div>
                  <div class="text-sm text-muted-foreground font-medium">Tillgångar, skulder och kapital</div>
                </li>
                <li class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Kassaflöde</div>
                  <div class="text-sm text-muted-foreground font-medium">Faktiska pengar in och ut</div>
                </li>
              </ul>
              <p class="text-base text-muted-foreground/60 font-medium italic">
                Vinst kan manipuleras med redovisningsval. Kassaflödet är svårare att fuska med.
              </p>
            </div>
          </div>

          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 3</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Nyckeltal i korthet</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              <span class="text-foreground font-black">P/E-talet</span> (Pris/Vinst) visar hur mycket du betalar per vinstkrona. <span class="text-foreground font-black">ROE</span> (avkastning på eget kapital) mäter hur effektivt bolaget använder aktieägarnas pengar. <span class="text-foreground font-black">Skuldsättningsgraden</span> visar hur mycket bolaget finansieras med lån jämfört med eget kapital. Nyckeltal ger snabb bild – men de berättar aldrig hela historien.
            </p>
          </div>

          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 4</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Jämför med konkurrenter</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              En aktie analyseras aldrig i ett vakuum. Är Volvos P/E på 12 billigt? Det beror helt på vad konkurrenterna Scania och TRATON handlas till. Branschjämförelse ger kontext till varje nyckeltal.
            </p>
          </div>

          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 5</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Ledning och incitament</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Ett bra bolag med dålig ledning är ett dåligt köp. Kolla vd:ns historik, hur ledningen ersätts och om de äger egäna aktier. Insiderägande är ett positivt tecken – de har samma intresse som du.
            </p>
          </div>
        </div>
      </div>
    `,
    category: "Grundläggande",
    readTime: "5 min",
    part: 1,
    icon: "BookOpen"
  },
  "vardering-av-aktier": {
    slug: "vardering-av-aktier",
    title: "Värdering av aktier",
    excerpt: "Hur vet man om en aktie är billig eller dyr? Vi går igenom de vanligaste nyckeltalen.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Varför värdering spelar roll</h2>
          <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Du kan köpa världens bästa bolag och ändå förlora pengar – om du betalade för mycket. Värdering handlar om att hitta aktier där priset är lägre än det verkliga värdet. Det är den klassiska principen: <span class="text-primary font-black">köp en krona för femtio öre</span>.
          </p>
        </section>

        <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all">
            <div class="text-primary text-[10px] font-black uppercase tracking-widest mb-4">P/E-talet</div>
            <h3 class="text-2xl font-black tracking-tighter mb-4">Det vanligaste nyckeltalet</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              P/E = Aktiekurs / Vinst per aktie. Ett P/E på 15 betyder att du betalar 15 kr per vinstkrona. Historiskt är P/E 15–20 normalt för mogna bolag. Banker handlas ofta till P/E 7–10, medan techbolag kan ha P/E 40+.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all">
            <div class="text-primary text-[10px] font-black uppercase tracking-widest mb-4">P/B-talet</div>
            <h3 class="text-2xl font-black tracking-tighter mb-4">Pris mot bokfört värde</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              P/B = Aktiekurs / Bokfört värde per aktie. P/B under 1 innebär att börsen värderar bolaget lägre än tillgångarna på pappret. Banker och fastighetsbolag analyseras ofta med P/B som huvudmått.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all">
            <div class="text-primary text-[10px] font-black uppercase tracking-widest mb-4">EV/EBITDA</div>
            <h3 class="text-2xl font-black tracking-tighter mb-4">För djupare analys</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Enterprise Value delat på rörelseresultat före avskrivningar. Mer robust än P/E eftersom det tar hänsyn till skuldsättning. Typiska nivåer: industri 8–12x, techbolag 15–25x.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] relative overflow-hidden group hover:border-primary/30 transition-all">
            <div class="text-primary text-[10px] font-black uppercase tracking-widest mb-4">Direktavkastning</div>
            <h3 class="text-2xl font-black tracking-tighter mb-4">Utdelningens kraft</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Utdelning / Aktiekurs × 100. Stockholmsbörsen ger i snitt 3–4%. Kontrollera alltid att utdelningen är hållbar (pay-out ratio bör vara under 70–80%).
            </p>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">DCF – diskonterat kassaflöde</h3>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Den teoretiskt mest korrekta metoden. Du beräknar nuvärdet av alla framtida kassaflöden. Kräver antaganden om tillväxttakt och diskonteringsränta, vilket gör den känslig för fel i inputen. Men processen tvingar dig att tänka igenom bolagets framtid på djupet – det är värdet i sig.
          </p>
        </section>
      </div>
    `,
    category: "Värdering",
    readTime: "8 min",
    part: 2,
    icon: "Calculator"
  },
  "bygga-en-portfolj": {
    slug: "bygga-en-portfolj",
    title: "Bygga en portfölj",
    excerpt: "Strategier för riskspridning och hur du väljer rätt mix av aktier.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Diversifiering – grunden i allt</h2>
          <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Lägg inte alla ägg i samma korg. En välspridd portfölj minskar risken utan att nödvändigtvis sänka förväntad avkastning. Sprid över branscher, geografier och bolagsstorlekar. Det är det närmaste en <span class="text-primary font-black">gratis lunch</span> du kommer i investeringsvärlden.
          </p>
        </section>

        <div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-8 my-20">
          <div class="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black">15</div>
            <div class="space-y-2">
              <h4 class="text-lg font-black tracking-tight">Antal aktier</h4>
              <p class="text-sm text-muted-foreground font-medium leading-relaxed">
                Forskning visar att 15–25 aktier ger majoriteten av diversifieringseffekten. Färre än 10 ger hög koncentrationsrisk.
              </p>
            </div>
          </div>
          <div class="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black">S</div>
            <div class="space-y-2">
              <h4 class="text-lg font-black tracking-tight">Branschspridning</h4>
              <p class="text-sm text-muted-foreground font-medium leading-relaxed">
                Täck in flera sektorer: finans, industri, teknik, konsument, hälsovård och råvaror reagerar olika på ekonomiska cykler.
              </p>
            </div>
          </div>
          <div class="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black">10%</div>
            <div class="space-y-2">
              <h4 class="text-lg font-black tracking-tight">Kassaposition</h4>
              <p class="text-sm text-muted-foreground font-medium leading-relaxed">
                En liten kassa, 5–10%, ger dig möjlighet att agera när marknaden faller. Det är inte passivitet – det är förberedelse.
              </p>
            </div>
          </div>
        </div>

        <div class="not-prose space-y-10">
          <div class="p-12 bg-card border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Core och Satellite</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              En populär och beprövad strategi: 70–80% i stabila kärninnehav – exempelvis investmentbolag som Investor och Industrivärden. Resterande 20–30% i mer spännande satellitinnehav med högre risk och potential.
            </p>
          </div>

          <div class="p-12 bg-card border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Balansera om portföljen</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              En aktie som stigit kraftigt tar nu en större del av portföljen – och en högre risk. Bestäm i förväg om du ska balansera om eller låta vinnarna rulla. Det viktiga är att du väljer en strategi och håller dig till den.
            </p>
          </div>
        </div>
      </div>
    `,
    category: "Strategi",
    readTime: "6 min",
    part: 3,
    icon: "TrendingUp"
  },
  "teknisk-analys-introduktion": {
    slug: "teknisk-analys-introduktion",
    title: "Introduktion till teknisk analys",
    excerpt: "Lär dig läsa grafer och förstå marknadens psykologi genom tekniska indikatorer.",
    content: `
      <div class="space-y-16">
        <div class="not-prose p-8 bg-red-500/5 border border-red-500/20 rounded-[2rem] flex gap-8 items-center">
          <div class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">⚠️</div>
          <p class="text-base text-red-200/70 font-medium leading-relaxed">
            <strong class="text-red-200">En not innan du läser:</strong> Teknisk analys har svagt vetenskapligt stöd. Det fungerar delvis som en självuppfyllande profetia. Du behöver känna till begreppen för att förstå hur marknaden pratar, inte för att följa dem blint.
          </p>
        </div>

        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Teknisk vs fundamental analys</h2>
          <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Fundamental analys fokuserar på bolagets verkliga värde. Teknisk analys fokuserar på kursutvecklingen i sig – priset och volymen. Tekniker menar att all information redan är inprisad och att historiska mönster tenderar att upprepas.
          </p>
        </section>

        <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Stöd och motstånd</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Stödnivåer är prisnivåer där aktien historiskt vänt uppåt. Motståndsnivåer är tak där kursen brukar bromsa. Bryts ett motstånd med hög volym kan det bli nytt stöd.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Glidande medelvärden</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              MA50 och MA200 är vanligast. Golden Cross (MA50 korsar MA200 uppåt) är en köpsignal. Death Cross är motsatsen. Aktier över MA200 anses vara i en långsiktig upptrend.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">RSI</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Mäter om en aktie är överköpt (>70) eller översåld (<30). Används för att identifiera vändpunkter. Fungerar bäst i sidledsrörliga marknader.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Volymen berättar sanningen</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              En kursuppgång på hög volym är trovärdigare än på låg volym. Volym avslöjar om det finns verkligt intresse bakom rörelsen.
            </p>
          </div>
        </div>

        <section class="not-prose p-12 bg-card border border-border rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Candlestick-mönster</h3>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Japanska candlesticks visar öppnings-, stängnings-, hög- och lågkurs. Mönster som "doji" (tveksamhet), "hammer" (botten) och "engulfing" (trendvändning) används för att tajma in- och utträden.
          </p>
        </section>
      </div>
    `,
    category: "Analys",
    readTime: "10 min",
    part: 4,
    icon: "TrendingUp"
  },
  "utdelningsstrategier": {
    slug: "utdelningsstrategier",
    title: "Utdelningsstrategier",
    excerpt: "Bygg en passiv inkomstmaskin med hjälp av utdelningsaktier och ränta-på-ränta.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Kraften i ränta-på-ränta</h2>
          <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Återinvesterade utdelningar köper fler aktier, som ger mer utdelning. En investering på 100 000 kr med 4% direktavkastning och 5% utdelningstillväxt är värd cirka <span class="text-primary font-black">700 000 kr efter 30 år</span>. Utan återinvestering: knappt 300 000 kr.
          </p>
        </section>

        <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Vad är en bra utdelningsaktie?</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Leta efter: stabil historik, pay-out ratio under 75%, förutsägbar affärsmodell och låg skuldsättning. Exempel: Investor, SHB, Swedbank, Industrivärden.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Utdelningstillväxt vs Direktavkastning</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Kvalitetsbolag med utdelningstillväxt ger ofta mer på sikt än bolag med enbart hög direktavkastning. Yield on cost kan stiga kraftigt över tid.
            </p>
          </div>
        </div>

        <section class="not-prose p-12 bg-red-500/5 border border-red-500/20 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter text-red-200">Utdelningsfällor att undvika</h3>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Extremt hög direktavkastning (>8%) är ofta ett varningstecken. Kontrollera att utdelningen täcks av kassaflödet. Ett bolag som delar ut mer än det tjänar är inte hållbart.
          </p>
        </section>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">ISK – det smarta kontot</h3>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            På ett ISK slipper du deklarera varje utdelning. Du betalar en schablonsskatt baserad på kontots värde. Det är oftast skattemässigt fördelaktigt på lång sikt.
          </p>
        </section>
      </div>
    `,
    category: "Strategi",
    readTime: "7 min",
    part: 5,
    icon: "DollarSign"
  },
  "psykologi-pa-borsen": {
    slug: "psykologi-pa-borsen",
    title: "Psykologi på börsen",
    excerpt: "Dina känslor är din största fiende. Lär dig hantera rädsla och girighet.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Den stora fienden – du själv</h2>
          <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Privatinvesterare underpresterar ofta mot index för att de köper och säljer vid fel tillfällen. Anledningen är beteende, inte aktieval. Hjärnan är helt enkelt inte byggd för börsen.
          </p>
        </section>

        <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Förlustaversion</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              En förlust känns dubbelt så intensivt som en vinst. Det leder till att man håller kvar förlorare för länge och säljer vinnare för tidigt.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Flockbeteende och FOMO</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Fear of Missing Out driver oss att köpa när det är som dyrast. Om alla pratar om en aktie är det dags att vara extra försiktig.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Confirmation bias</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              Vi söker information som bekräftar det vi redan tror. Sök istället aktivt efter argumentationen <strong>mot</strong> din investering.
            </p>
          </div>

          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Överdrivet självförtroende</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              De flesta tror sig vara bättre än genomsnittet. Det leder till för hög omsättning och för stora positioner. Ödmjukhet är en fördel.
            </p>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-10 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Hur du bekämpar dina biaser</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl">
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-black text-primary">1</div>
              <p class="text-base font-bold">Skriv ner din investeringstes</p>
            </div>
            <div class="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl">
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-black text-primary">2</div>
              <p class="text-base font-bold">Bestäm säljpris på förhand</p>
            </div>
            <div class="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl">
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-black text-primary">3</div>
              <p class="text-base font-bold">Håll en investeringsdagbok</p>
            </div>
            <div class="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl">
              <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-black text-primary">4</div>
              <p class="text-base font-bold">Undvik att kolla kursen dagligen</p>
            </div>
          </div>
        </section>
      </div>
    `,
    category: "Psykologi",
    readTime: "6 min",
    part: 6,
    icon: "Zap"
  }
};
