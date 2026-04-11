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
          <div class="space-y-4">
            <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Aktieanalys handlar om att bedöma om ett bolag är värt att investera i. Du tittar på affärsmodellen, den finansiella ställningen, ledningen och framtidsutsikterna för att avgöra om aktien är rätt värderad på börsen.
            </p>
            <p class="text-xl text-foreground leading-relaxed font-black max-w-3xl">
              Målet är enkelt: <span class="text-primary">köpa något som är värt mer än du betalar</span>.
            </p>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Det låter självklart — men i praktiken kräver det disciplin, tålamod och en strukturerad process. De flesta privatinvesterare hoppar direkt till aktiekursen och missar det som verkligen avgör om en investering blir lyckad. Den här guiden ger dig ramverket för att göra det rätt.
            </p>
          </div>
        </section>

        <div class="not-prose space-y-12">
          <!-- STEG 1 -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 1</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Förstå affärsmodellen</h3>
            <div class="space-y-6">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Börja alltid med att förstå hur bolaget tjänar sina pengar. Vad säljer de? Till vilka kunder? Hur ser prismodellen ut? Vad är deras konkurrensfördel och varför väljer kunderna dem framför alternativen?
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Investor AB</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Investor är ett investmentbolag som äger andelar i andra bolag — ABB, Atlas Copco, SEB och Saab är några av de största innehaven. De tjänar pengar genom att portföljbolagen växer i värde och delar ut pengar. Deras konkurrensfördel är Wallenbergsfärens 110-åriga nätverk, industriella kompetens och förmågan att sitta i styrelserna och aktivt påverka bolagen de äger.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Evolution AB</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Evolution säljer live casino-spel till spelbolag som Betsson och Unibet. De bygger studior, anställer dealers och streamar spelen i realtid. Kunderna är spelbolagen — inte spelarna. Det är en B2B-modell med mycket höga byteskostnader. Evolution tar betalt som en procent av spelbolagens intäkter — ju mer spelarna spelar, desto mer tjänar Evolution.
                  </p>
                </div>
              </div>
              
              <p class="text-base text-primary font-black italic">
                Förstår du inte exakt hur bolaget tjänar pengar och varför kunderna väljer dem — investera inte.
              </p>
            </div>
          </div>

          <!-- STEG 2 -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 2</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Läs årsredovisningen</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Årsredovisningen är din viktigaste källa och den är alltid gratis att ladda ned från bolagets IR-sida. Fokusera på tre delar:
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-2">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Resultaträkningen</div>
                  <p class="text-sm text-muted-foreground">Visar intäkter, kostnader och vinst. Här ser du om bolaget växer och om marginalerna förbättras.</p>
                </div>
                <div class="space-y-2">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Balansräkningen</div>
                  <p class="text-sm text-muted-foreground">Visar tillgångar och skulder. Skillnaden är eget kapital — aktieägarnas andel.</p>
                </div>
                <div class="space-y-2">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Kassaflödesanalysen</div>
                  <p class="text-sm text-muted-foreground">Visar faktiska pengar in och ut. Det är den svåraste delen att manipulera och därför den viktigaste.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Volvo AB</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Volvos årsredovisning 2025 visar nettoomsättning på 479 miljarder kronor och en rörelsemarginal på 10,7%. Kassaflödet från industriverksamheten halverades till 21,9 miljarder — ett tydligt varningstecken om att den underliggande affären är under press trots att vinsten ser okej ut på ytan.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Novo Nordisk</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Novo Nordisks årsredovisning visar explosiv intäktstillväxt driven av Ozempic och Wegovy. Men kassaflödesanalysen avslöjar att en stor del återinvesteras i kapacitetsutbyggnad. Vinsten är hög men kassaflödet per aktie är lägre än vad P/E-talet antyder.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEG 3 -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 3</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Nyckeltal i korthet</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Nyckeltal är genvägar till att förstå ett bolag. De ersätter inte en djupanalys men ger dig snabb orientering.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">P/E-talet (Pris/Vinst)</div>
                  <p class="text-sm text-muted-foreground">Visar hur mycket du betalar per vinstkrona. P/E 15 innebär att du betalar 15 kr för varje krona bolaget tjänar.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">ROE (Avkastning på EK)</div>
                  <p class="text-sm text-muted-foreground">Mäter hur effektivt bolaget använder aktieägarnas pengar. Hög ROE är ett tecken på en stark affärsmodell.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Skuldsättningsgrad</div>
                  <p class="text-sm text-muted-foreground">Visar hur mycket bolaget finansieras med lån. Hög skuldsättning blir farlig när räntor stiger.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Investor AB</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Investor har P/E runt 20x, ROE 18,5% och en belåningsgrad på bara 2,1%. Kombinationen av måttlig värdering, hög kapitaleffektivitet och nästan skuldfri balansräkning förklarar varför långsiktiga investerare betalar en premie.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Volvo AB</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Volvo har P/E 19x på FY2025-vinsten men analytikerna estimerar P/E 15,5x på 2026. ROE föll från 27% till 18,5% under 2025. Det illustrerar hur nyckeltal förändras med konjunkturen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEG 4 -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 4</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Jämför med konkurrenter</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En aktie analyseras aldrig i ett vakuum. Nyckeltal får sin mening först när du jämför med relevanta konkurrenter i samma bransch.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Volvo vs lastbilssektorn</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Volvos P/E på 15,5x (2026e) jämfört med Daimler Truck på 13,2x och PACCAR på 17x. Volvo handlas med en liten premie relativt Daimler — motiverat av starkare balansräkning och mer diversifierad affärsmodell.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Evolution vs casino-sektorn</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Evolutions rörelsemarginal på 65%+ är nästan dubbelt så hög som närmaste konkurrenterna Playtech och Scientific Games. Det visar att moaten är exceptionell — men det motiverar också en premiumvärdering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEG 5 -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-50">Steg 5</div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Ledning och incitament</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Ett bra bolag med dålig ledning är ett dåligt köp. Ledningen fattar de strategiska besluten som avgör om bolaget lyckas de kommande 5-10 åren.
              </p>
              
              <p class="text-base text-muted-foreground leading-relaxed">
                Kolla tre saker: VD:ns historik och track record, hur ledningen ersätts (fast lön vs aktiebaserat) och om de äger egna aktier i bolaget. Insiderägande är ett starkt positivt tecken.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Investor AB</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    VD Christian Cederholm äger 227 500 aktier i Investor. Wallenbergsfamiljen kontrollerar 42,96% av rösterna. Alla parter tjänar på att bolaget lyckas på lång sikt — det skapar en ovanlig samstämmighet.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Ett varningstecken</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Om en VD säljer stora aktieposter kort efter att ha kommunicerat en positiv outlook är det ett allvarligt varningstecken. Kolla alltid Finansinspektionens insynsregister på fi.se.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Nyckeltal ger en snabb bild — men de berättar aldrig hela historien. Kombinera alltid siffrorna med en kvalitativ förståelse för affärsmodellen och ledningen.
          </p>
        </section>

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
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Diversifiering — grunden i allt</h2>
          <div class="space-y-4">
            <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              “Lägg inte alla ägg i samma korg” är rådet du har hört tusen gånger. Men vad innebär det i praktiken, och varför fungerar det egentligen?
            </p>
            <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Diversifiering handlar om att äga tillgångar som inte rör sig exakt likadant. När en aktie faller behöver inte en annan falla lika mycket — eller ens falla alls. Genom att kombinera tillgångar med låg korrelation kan du minska portföljens totala svängningar utan att ge upp förväntad avkastning. Det är det närmaste en <span class="text-primary font-black">gratis lunch</span> du kommer i investeringsvärlden.
            </p>
          </div>
        </section>

        <div class="not-prose space-y-12">
          <!-- HUR MÅNGA AKTIER -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Hur många aktier behöver du?</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Det finns en matematisk gräns för hur mycket diversifiering hjälper. Forskning visar att:
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="p-6 bg-card border border-border rounded-2xl">
                  <div class="text-primary font-black text-xl mb-1">1-5</div>
                  <div class="text-xs font-black uppercase tracking-widest opacity-50 mb-2">Aktier</div>
                  <p class="text-sm text-muted-foreground">Extremt hög koncentrationsrisk.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl">
                  <div class="text-primary font-black text-xl mb-1">10-15</div>
                  <div class="text-xs font-black uppercase tracking-widest opacity-50 mb-2">Aktier</div>
                  <p class="text-sm text-muted-foreground">Eliminerar majoriteten av bolagsspecifik risk.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl">
                  <div class="text-primary font-black text-xl mb-1">15-25</div>
                  <div class="text-xs font-black uppercase tracking-widest opacity-50 mb-2">Aktier</div>
                  <p class="text-sm text-muted-foreground">Optimalt för de flesta privatinvesterare.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl">
                  <div class="text-primary font-black text-xl mb-1">50+</div>
                  <div class="text-xs font-black uppercase tracking-widest opacity-50 mb-2">Aktier</div>
                  <p class="text-sm text-muted-foreground">Du börjar likna ett index.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — För koncentrerad</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    En portfölj med bara Investor, Volvo och Evolution kan se diversifierad ut men är i praktiken kraftigt exponerad mot Sverige, industri och konjunkturkänslighet. Om den svenska kronan stärks kraftigt påverkas alla tre negativt samtidigt.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Välspridd</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    En portfölj med Investor (investmentbolag), AstraZeneca (läkemedel), Microsoft (tech), en globalfond och en räntefond reagerar väldigt olika på samma makrohändelse. AstraZeneca är defensivt, Microsoft pressas mer, räntefonden kan stiga.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- BRANSCHSPRIDNING -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Branschspridning — varför det spelar roll</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Olika branscher reagerar olika på ekonomiska cykler. Det är viktigt att förstå dessa mönster när du bygger din portfölj.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Cykliska</div>
                  <p class="text-sm text-muted-foreground">Industri, råvaror, finans. Går bra när ekonomin växer men faller hårt vid recession.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Defensiva</div>
                  <p class="text-sm text-muted-foreground">Läkemedel, dagligvaror. Stabila oavsett konjunktur eftersom behoven finns kvar.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Tillväxt</div>
                  <p class="text-sm text-muted-foreground">Tech, AI, bioteknik. Växer snabbt men är känsliga för ränteförändringar.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Finanskris 2008</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Banker och fastighetssektorn kollapsade. Läkemedelsbolag och dagligvarubolag föll mycket mindre. En spridd portfölj förlorade kanske 30-40% — fortfarande smärtsamt men hanterbart jämfört med 60-80% för finans.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Coronakraschen 2020</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Flygbolag och hotell föll 60-80%. Techbolag och e-handel steg kraftigt. Den som hade bred branschspridning återhämtade sig snabbt — den som ägde enbart reseaktier fick vänta år.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- KASSAPOSITION -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Kassaposition — undervärdat verktyg</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En kassa på 5-10% av portföljen kan verka som ett slöseri — du tjänar ingenting på pengar som ligger stilla. Men kassan fyller tre viktiga funktioner:
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Psykologi</div>
                  <p class="text-sm text-muted-foreground">Du sover bättre när du vet att du inte är fullinvesterad och måste sälja i panik.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Möjlighet</div>
                  <p class="text-sm text-muted-foreground">När marknaden kraschar 20-30% vill du ha ammunition att köpa billigt.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Buffert</div>
                  <p class="text-sm text-muted-foreground">Om du behöver pengar akut behöver du inte sälja aktier i fel läge.</p>
                </div>
              </div>

              <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel — Coronakraschen</div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Under coronakraschen i mars 2020 föll börsen 30% på tre veckor. Den som hade 10% i kassa och använde dem att köpa på botten fick en avkastning på 40%+ under de följande 12 månaderna. Den som var fullinvesterad kunde inte agera.
                </p>
              </div>
            </div>
          </div>

          <!-- CORE OCH SATELLITE -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Core och Satellite — en beprövad strategi</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Core-Satellite är en av de mest använda portföljstrategierna bland professionella investerare och passar utmärkt för privatpersoner.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Core (70-80%)</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Stabila, välbeprövade innehav med lång historik. Investmentbolag som Investor och Industrivärden är klassiska kärninnehav — de ger automatisk diversifiering och professionell förvaltning.
                  </p>
                </div>
                <div class="space-y-4">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Satellite (20-30%)</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Mer koncentrerade satsningar med högre risk och potential. Det kan vara ett spännande tillväxtbolag eller en specifik sektor. De kan gå till noll utan att förstöra din ekonomi, men kan bidra kraftigt vid succé.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Konservativ</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Core: 50% Investor + Industrivärden, 20% global indexfond. Satellite: 15% Evolution, 15% NVIDIA. Kärnan ger stabilitet, satelliten ger exponering mot AI och gaming.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Tillväxtorienterad</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Core: 40% global indexfond, 20% Microsoft. Satellite: 20% ett bioteknikbolag, 10% ett litet tillväxtbolag, 10% kassa. Kärnan är defensiv, satelliten tar mer risk.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- BALANSERA OM -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Balansera om portföljen — disciplin som lönar sig</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En aktie som stiger kraftigt tar automatiskt en större del av din portfölj. Det innebär i praktiken ökad risk — du är mer exponerad mot ett enskilt bolag än planerat.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Strategi 1 — Balansera om</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    En gång per år säljer du av vinnarna och köper mer av förlorarna. Det tvingar dig att systematiskt köpa billigt och sälja dyrt.
                  </p>
                </div>
                <div class="space-y-4">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Strategi 2 — Låt vinnarna rulla</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Du säljer aldrig en vinnare bara för att den stigit. Istället fyller du på med nytt kapital i de innehav som underpresterat.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Ombalansering</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Du köper Investor och Evolution 50/50. Evolution tredubblas och utgör 75%. Du säljer tillbaka till 50/50. Ett år senare faller Evolution 40% — din disciplin räddade dig från en stor förlust.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Låt vinnarna rulla</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Du köper Microsoft tidigt och låter det växa från 10% till 40% utan att sälja. De senaste 10 åren har Microsoft stigit 1000%. Den som sålde av missade en enorm avkastning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Det viktigaste är inte vilken strategi du väljer — det är att du väljer en och håller dig till den. Disciplin slår alltid timing.
          </p>
        </section>

        <div class="not-prose pt-10 border-t border-border">
          <div class="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-50">Läs nästa guide</div>
          <a href="/guider/vardering-av-aktier" class="group block space-y-2">
            <h4 class="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors">Värdering av aktier</h4>
            <p class="text-muted-foreground font-medium">Hur vet man om en aktie är billig eller dyr? Vi går igenom P/E, EV/EBIT, PEG och DCF — och visar när de fungerar och när de vilseleder.</p>
          </a>
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
      <div class="space-y-24">
        <!-- Intro Section -->
        <section class="not-prose space-y-8">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Strategi: Utdelningar
          </div>
          <h2 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Kraften i <span class="text-primary">ränta på ränta</span>
          </h2>
          <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Föreställ dig ett träd som varje år producerar frukter. Du kan äta frukterna direkt — eller plantera dem och låta dem växa till nya träd. Efter 30 år har den som planterade sina frukter en hel fruktträdgård.
          </p>
          <div class="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-4">
            <p class="text-lg text-muted-foreground leading-relaxed">
              När ett bolag betalar utdelning har du två val: ta ut pengarna och spendera dem, eller återinvestera dem i fler aktier. De nya aktierna ger nästa år ännu mer utdelning, som köper ännu fler aktier. Processen accelererar exponentiellt ju längre tid du låter den verka.
            </p>
          </div>
        </section>

        <!-- Mathematics Section -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Matematiken bakom magin</h3>
            <p class="text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
              Du investerar 100 000 kronor i ett bolag med 4% direktavkastning och 5% utdelningstillväxt per år — ungefär vad Investor AB har levererat historiskt. Låt oss se hur valet att återinvestera eller spendera utdelningen påverkar ditt slutresultat dramatiskt.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-10 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6">
              <div class="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h4 class="text-2xl font-black tracking-tighter">Med återinvestering</h4>
              <ul class="space-y-3 text-muted-foreground font-medium">
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div> År 1: 4 000 kr i utdelning</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div> År 10: ca 7 000 kr per år</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div> År 30: Värde ca 700 000 kr</li>
              </ul>
            </div>

            <div class="p-10 bg-muted/30 border border-border rounded-[3rem] space-y-6">
              <div class="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </div>
              <h4 class="text-2xl font-black tracking-tighter">Utan återinvestering</h4>
              <ul class="space-y-3 text-muted-foreground font-medium">
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-border"></div> Du spenderar utdelningen varje år</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-border"></div> Inget kapital växer via utdelning</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-border"></div> År 30: Värde ca 300 000 kr</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-4">
              <h4 class="text-xl font-black tracking-tighter italic">Exempel: Investor AB</h4>
              <p class="text-muted-foreground leading-relaxed">
                Den som investerade 100 000 kr för 20 år sedan och återinvesterade allt sitter idag med över 1 miljon kr. Direktavkastningen på det ursprungliga beloppet — <span class="text-foreground font-bold italic">yield on cost</span> — är nu långt över 10% per år.
              </p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-4">
              <h4 class="text-xl font-black tracking-tighter italic">Exempel: Swedbank</h4>
              <p class="text-muted-foreground leading-relaxed">
                Swedbank har historiskt haft hög direktavkastning (5-7%). Den som höll kvar genom kriser och återinvesterade när utdelningen återupptogs har sett sin yield on cost stiga dramatiskt trots tillfälliga stopp.
              </p>
            </div>
          </div>
        </section>

        <!-- Criteria Section -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Vad är en bra utdelningsaktie?</h3>
            <p class="text-lg text-muted-foreground font-medium">Leta efter dessa fem egenskaper för att hitta hållbara vinnare.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-8 bg-muted/30 border border-border rounded-[2rem] space-y-4">
              <div class="text-primary font-black text-4xl opacity-20">01</div>
              <h4 class="text-xl font-black tracking-tighter">Stabil historik</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">10+ år av höjda eller stabila utdelningar visar att ledningen prioriterar ägarna även i svåra tider.</p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-[2rem] space-y-4">
              <div class="text-primary font-black text-4xl opacity-20">02</div>
              <h4 class="text-xl font-black tracking-tighter">Pay-out ratio < 75%</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">Andelen av vinsten som delas ut. Under 60% är tryggt, över 75% kräver extra granskning.</p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-[2rem] space-y-4">
              <div class="text-primary font-black text-4xl opacity-20">03</div>
              <h4 class="text-xl font-black tracking-tighter">Kassaflödet täcker</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">Vinst kan manipuleras. Kontrollera att det fria kassaflödet täcker utdelningen — inte bara vinsten.</p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-[2rem] space-y-4">
              <div class="text-primary font-black text-4xl opacity-20">04</div>
              <h4 class="text-xl font-black tracking-tighter">Förutsägbar modell</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">Banker, investmentbolag och fastigheter har ofta stabilare intäkter än cykliska råvarubolag.</p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-[2rem] space-y-4">
              <div class="text-primary font-black text-4xl opacity-20">05</div>
              <h4 class="text-xl font-black tracking-tighter">Låg skuldsättning</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">Ett skuldsatt bolag prioriterar räntekostnader före utdelningar när räntorna stiger.</p>
            </div>
          </div>
        </section>

        <!-- Growth vs Yield Section -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Utdelningstillväxt vs Hög direktavkastning</h3>
            <p class="text-lg text-muted-foreground font-medium">Ett av de vanligaste misstagen: att jaga högsta direktavkastningen idag.</p>
          </div>

          <div class="p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="space-y-4">
                <h4 class="text-2xl font-black tracking-tighter">Bolag A (Hög Yield)</h4>
                <p class="text-muted-foreground">6% direktavkastning, 0% tillväxt. Efter 20 år ger det fortfarande 6% på ditt kapital.</p>
              </div>
              <div class="space-y-4">
                <h4 class="text-2xl font-black tracking-tighter text-primary">Bolag B (Tillväxt)</h4>
                <p class="text-muted-foreground">3% direktavkastning, 10% tillväxt. Efter 20 år ger det <span class="text-primary font-bold text-xl">20% yield on cost</span>.</p>
              </div>
            </div>
            <div class="pt-8 border-top border-primary/10">
              <p class="text-sm italic text-muted-foreground">
                Exempel: Microsoft hade 1% yield för 15 år sedan. Idag har de som köpte då en yield on cost på över 8% — och aktien har tiodubblats.
              </p>
            </div>
          </div>
        </section>

        <!-- Traps Section -->
        <section class="not-prose p-12 bg-red-500/5 border border-red-500/20 rounded-[3rem] space-y-12 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="space-y-4 relative">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter text-red-200">Utdelningsfällor — så undviker du dem</h3>
            <p class="text-lg text-muted-foreground font-medium">När en hög direktavkastning döljer en katastrof.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-none w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">!</div>
                <div>
                  <h4 class="text-xl font-black tracking-tighter text-red-100">Yield över 8%</h4>
                  <p class="text-sm text-muted-foreground">Marknaden tror ofta inte att utdelningen är hållbar. Kräver djupgranskning.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-none w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">!</div>
                <div>
                  <h4 class="text-xl font-black tracking-tighter text-red-100">Pay-out ratio > 100%</h4>
                  <p class="text-sm text-muted-foreground">Bolaget delar ut mer än de tjänar. Finansieras ofta med lån.</p>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-none w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">!</div>
                <div>
                  <h4 class="text-xl font-black tracking-tighter text-red-100">Fallande intäkter</h4>
                  <p class="text-sm text-muted-foreground">Utdelningen är en illusion som köps med framtida tillväxt.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-none w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">!</div>
                <div>
                  <h4 class="text-xl font-black tracking-tighter text-red-100">Hög skuldsättning</h4>
                  <p class="text-sm text-muted-foreground">Räntekostnader prioriteras före utdelningar när räntan stiger.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8 bg-red-500/10 border border-red-500/20 rounded-[2rem] relative">
            <p class="text-sm text-muted-foreground italic">
              Exempel: Corem och SAS. Den som lockades av hög yield utan att granska balansräkningen förlorade merparten av sitt kapital när verkligheten hann ikapp.
            </p>
          </div>
        </section>

        <!-- ISK Section -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">ISK — det smartaste kontot</h3>
            <p class="text-lg text-muted-foreground font-medium">Svenska spararens bästa vän för utdelningsinvestering.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-6">
              <h4 class="text-2xl font-black tracking-tighter">Varför ISK?</h4>
              <ul class="space-y-4">
                <li class="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span class="text-muted-foreground">Ingen skatt på enskilda utdelningar (30% skatteläckage undviks).</span>
                </li>
                <li class="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span class="text-muted-foreground">Hela utdelningen kan återinvesteras omedelbart.</span>
                </li>
                <li class="flex gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span class="text-muted-foreground">Inga deklarationskrav för enskilda affärer.</span>
                </li>
              </ul>
            </div>
            <div class="p-10 bg-muted/30 border border-border rounded-[3rem] space-y-6">
              <h4 class="text-xl font-black tracking-tighter italic">Skatteeffekten</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Vid 10 000 kr i utdelning betalar du 3 000 kr i skatt direkt på ett vanligt konto. På ISK betalar du en låg schablonskatt och kan återinvestera hela beloppet. Över 30 år gör detta en enorm skillnad.
              </p>
            </div>
          </div>
        </section>

        <section class="not-prose p-12 bg-primary border border-primary rounded-[3rem] text-primary-foreground space-y-6">
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Sammanfattning</h3>
          <p class="text-xl leading-relaxed font-medium opacity-90">
            Utdelningsinvestering handlar inte om att hitta den högsta direktavkastningen idag. Det handlar om att hitta bolag som kan växa sin utdelning år efter år i decennier. Tålamod är din starkaste tillgång.
          </p>
        </section>
      </div>
    `,
    category: "Strategi",
    readTime: "12 min",
    part: 5,
    icon: "DollarSign"
  },
  "psykologi-pa-borsen": {
    slug: "psykologi-pa-borsen",
    title: "Psykologi på börsen",
    excerpt: "Dina känslor är din största fiende. Lär dig hantera rädsla och girighet.",
    content: `
      <div class="space-y-20">
        <!-- Intro Section -->
        <section class="not-prose space-y-8">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">Den stora fienden — <span class="text-primary italic">du själv</span></h2>
          <div class="space-y-6 text-xl text-muted-foreground leading-relaxed font-medium max-w-4xl">
            <p>
              Du kan ha världens bästa analysmodell, läsa alla årsredovisningar och förstå varje nyckeltal — och ändå underprestera mot en enkel indexfond som ingen människa förvaltar.
            </p>
            <p>
              Det låter paradoxalt men forskning bekräftar det gång på gång. DALBAR, ett amerikanskt analysföretag, har i decennier mätt hur privatinvesterare faktiskt presterar jämfört med marknaden. Resultatet är nedslående: den genomsnittlige privatinvesteraren underpresterar S&P 500 med 3-5 procentenheter per år — inte för att de väljer fel aktier, utan för att de köper och säljer vid fel tillfällen.
            </p>
            <div class="p-8 bg-destructive/5 border border-destructive/20 rounded-[2rem] text-destructive italic">
              "Problemet är inte din kunskap. Problemet är din hjärna."
            </div>
            <p>
              Den mänskliga hjärnan utvecklades under hundratusentals år för att överleva på savannen — inte för att navigera finansmarknader. De instinkter som räddade dina förfäder från lejon är exakt de instinkter som förstör din portfölj. Rädsla, girighet, flockbeteende och önsketänkande är inbyggda i oss alla och de slår till hårdast precis när det är som viktigast att vara rationell.
            </p>
          </div>
        </section>

        <!-- Loss Aversion -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Förlustaversion — varför förluster gör så ont</h3>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Nobelpristagarna Daniel Kahneman och Amos Tversky visade i sin forskning att en förlust känns ungefär dubbelt så intensivt som en vinst av samma storlek.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6">
              <h4 class="text-xl font-black tracking-tighter italic">Du håller kvar förlorare för länge</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                När en aktie faller vill du inte sälja med förlust — det gör för ont psykologiskt. Istället hoppas du att den ska komma tillbaka. Men marknaden bryr sig inte om vad du betalade. Frågan du ska ställa är: <span class="text-foreground font-bold italic">"Om jag inte ägde den här aktien idag — skulle jag köpa den?"</span>
              </p>
            </div>
            <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6">
              <h4 class="text-xl font-black tracking-tighter italic">Du säljer vinnare för tidigt</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                En aktie som stigit 30% säljer du gärna för att "ta hem vinsten" och skydda dig mot att den ska falla tillbaka. Det känns klokt men i praktiken kapar du dina bästa investeringar i förtid och låter dina sämsta ligga kvar.
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="p-8 border-l-4 border-primary bg-primary/5 rounded-r-[2rem] space-y-4">
              <h4 class="font-black tracking-tight">Exempel: Nokia & Evolution</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Många höll kvar <strong>Nokia</strong> i 10+ år medan den föll från 60€ till 2€. Förlustaversionen förvandlade en möjlig förlust på 30% till 95%. Samtidigt säljer många <strong>Evolution</strong> efter 40% uppgång för att "säkra vinst", bara för att se aktien sjudubblas efteråt.
              </p>
            </div>
          </div>
        </section>

        <!-- FOMO Section -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Flockbeteende och FOMO</h3>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Människan är ett flockdjur. Vi söker trygghet i konsensus, men på börsen är detta dödligt.
            </p>
          </div>

          <div class="p-12 bg-muted/30 border border-border rounded-[3rem] space-y-8">
            <div class="space-y-4">
              <h4 class="text-2xl font-black tracking-tighter italic">Varningssignalen du måste känna igen</h4>
              <p class="text-base text-muted-foreground leading-relaxed">
                Om din frisör, taxichaufför eller kollega som aldrig pratat om aktier börjar tipsa om en specifik aktie — var extremt försiktig. Det är ett klassiskt tecken på att en bubbla är mogen.
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
              <div class="space-y-4">
                <span class="text-xs font-black uppercase tracking-widest text-primary">Gamestop 2021</span>
                <p class="text-sm text-muted-foreground">FOMO drev privatinvesterare att köpa när aktien redan var upp 2 000%. De flesta förlorade 80-90% när bubblan sprack.</p>
              </div>
              <div class="space-y-4">
                <span class="text-xs font-black uppercase tracking-widest text-primary">Fastigheter 2021</span>
                <p class="text-sm text-muted-foreground">De som köpte SBB eller Corem 2021 för att inte missa tåget förlorade 60-80% när räntorna steg.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Confirmation Bias -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Confirmation bias — vi ser vad vi vill se</h3>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Hjärnan är en mästare på att hitta bevis för det den redan tror. Vi söker bekräftelse istället för sanning.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <p class="text-base text-muted-foreground leading-relaxed">
                När du bestämt dig för en aktie läser du de positiva artiklarna noga och avfärdar de negativa. Du pratar med vänner som också äger aktien och ni bekräftar varandras övertygelse.
              </p>
              <div class="p-8 bg-primary text-primary-foreground rounded-[2rem] space-y-4">
                <h4 class="text-xl font-black tracking-tighter italic">Motgiftet: Sök falsifiering</h4>
                <p class="text-sm opacity-90 leading-relaxed">
                  Leta aktivt efter de starkaste argumenten <strong>mot</strong> investeringen. Vad säger skeptikerna? Varför är aktien inte dyrare om det är så uppenbart bra?
                </p>
              </div>
            </div>
            <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6">
              <h4 class="text-xl font-black tracking-tighter italic text-primary">Howard Marks process</h4>
              <p class="text-sm text-muted-foreground leading-relaxed italic">
                "Howard Marks anställer analytiker med uppdraget att motbevisa hans teorier. Han betalar för att höra de starkaste argumenten mot hans positioner."
              </p>
            </div>
          </div>
        </section>

        <!-- Overconfidence -->
        <section class="not-prose space-y-12">
          <div class="space-y-4">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Överdrivet självförtroende</h3>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              De flesta anser sig vara bättre bilförare och bättre investerare än genomsnittet. På börsen leder detta till tre konkreta misstag:
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 text-center">
              <div class="text-3xl font-black text-primary italic">1</div>
              <h4 class="font-black tracking-tight">För hög omsättning</h4>
              <p class="text-xs text-muted-foreground">Fler affärer betyder mer skatt och courtage, vilket sänker avkastningen.</p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 text-center">
              <div class="text-3xl font-black text-primary italic">2</div>
              <h4 class="font-black tracking-tight">För stora positioner</h4>
              <p class="text-xs text-muted-foreground">Övertygelse leder till koncentration, vilket är förödande när man har fel.</p>
            </div>
            <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 text-center">
              <div class="text-3xl font-black text-primary italic">3</div>
              <h4 class="font-black tracking-tight">Underskattning av risk</h4>
              <p class="text-xs text-muted-foreground">Man räknar inte med "Svarta svanar" — händelser ingen kunde förutse.</p>
            </div>
          </div>
        </section>

        <!-- Actionable Process -->
        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-12 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="space-y-4 relative z-10">
            <h3 class="text-3xl md:text-5xl font-black tracking-tighter">Hur du bekämpar dina biaser</h3>
            <p class="text-xl text-muted-foreground font-medium">Bygg system som skyddar dig från dig själv.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div class="space-y-8">
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0">1</div>
                <div class="space-y-2">
                  <h4 class="text-xl font-black tracking-tight">Skriv ned din investeringstes</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">Varför köper jag? Vad måste hända för att det ska stämma? När ska jag sälja? Läs detta när känslorna tar över.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0">2</div>
                <div class="space-y-2">
                  <h4 class="text-xl font-black tracking-tight">Bestäm säljpris på förhand</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">Sätt en stop-loss och ett målpris innan du köper. Det tar bort den emotionella kampen i stunden.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0">3</div>
                <div class="space-y-2">
                  <h4 class="text-xl font-black tracking-tight">Håll en investeringsdagbok</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">Skriv ner vad du kände vid varje affär. Det är din spegel mot dina egna biaser.</p>
                </div>
              </div>
            </div>
            <div class="space-y-8">
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0">4</div>
                <div class="space-y-2">
                  <h4 class="text-xl font-black tracking-tight">Undvik att kolla kursen dagligen</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">Varje gång du kollar utsätter du dig för stimuli som triggar impulser. Kolla en gång i veckan istället.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0">5</div>
                <div class="space-y-2">
                  <h4 class="text-xl font-black tracking-tight">Sök aktivt motargument</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">Läs pessimistiska analyser. Om du inte kan bemöta kritiken — köp inte.</p>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black shrink-0">6</div>
                <div class="space-y-2">
                  <h4 class="text-xl font-black tracking-tight">Ha en investeringspolicy</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">Sätt fasta regler: "Jag säljer aldrig mer än 10% på en dag" eller "Jag analyserar i minst en vecka".</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="not-prose p-12 bg-muted/30 border border-border rounded-[3rem] text-center space-y-4">
          <p class="text-xl font-black tracking-tighter italic">"Den bästa investeraren är inte den som vet mest — det är den som gör minst misstag."</p>
        </footer>
      </div>
    `,
    category: "Psykologi",
    readTime: "15 min",
    part: 6,
    icon: "Zap"
  },
  "basta-fonderna-for-nyborjare": {
    slug: "basta-fonderna-for-nyborjare",
    title: "Bästa fonderna för nybörjare 2026 – komplett guide till fondsparande",
    excerpt: "Lär dig allt om fonder: vad en fond är, skillnaden mellan indexfonder och aktiva fonder, vilka fondtyper som finns och hur du väljer rätt som nybörjare.",
    content: `
      <div class="space-y-16">
        <!-- Intro -->
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Bästa fonderna för nybörjare 2026</h2>
          <div class="space-y-4">
            <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Vill du börja spara i fonder men är osäker på vilka fonder du ska välja? Då är du långt ifrån ensam. För många nybörjare känns fondsparande först rörigt: globalfond, indexfond, aktiv fond, räntefond, avgifter, risk och månadssparande. Det låter lätt komplicerat.
            </p>
            <p class="text-xl text-foreground leading-relaxed font-black max-w-3xl">
              I praktiken behöver det <span class="text-primary">inte vara svårt</span>.
            </p>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              För de flesta småsparare är fonder det enklaste sättet att bygga upp ett långsiktigt sparande. Du får bred riskspridning, låg arbetsinsats och ofta låga avgifter. Det gör att fonder passar särskilt bra för dig som vill komma igång utan att behöva analysera enskilda aktier.
            </p>
            <div class="p-6 bg-muted/30 border border-border rounded-3xl mt-8">
              <h4 class="text-sm font-black uppercase tracking-widest text-primary mb-4">I den här guiden går vi igenom:</h4>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground font-medium">
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div>vad en fond är & hur fonder fungerar</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div>vilka typer av fonder som finns</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div>skillnaden mellan index och aktivt</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div>hur du väljer rätt fond</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div>hur du bygger en portfölj</li>
                <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div>vanliga misstag att undvika</li>
              </ul>
            </div>
          </div>
        </section>

        <div class="not-prose space-y-12">
          <!-- Vad är en fond -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Vad är en fond?</h3>
            <div class="space-y-6">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En fond är en samling värdepapper som ägs gemensamt av många sparare. När du köper en fond köper du inte en enskild aktie, utan en liten del av en hel portfölj. Portföljen kan innehålla aktier, obligationer eller en blandning av båda.
              </p>
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Det är en stor skillnad mot att köpa en enskild aktie. Om du köper en aktie i ett enda bolag är du helt beroende av hur just det bolaget utvecklas. I en fond sprids risken över många innehav, vilket gör sparandet mindre sårbart.
              </p>
              
              <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel: så fungerar det i praktiken</div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Köper du en globalfond får du ofta exponering mot stora bolag som Microsoft, Apple, Nvidia, Amazon och många fler samtidigt. Köper du en svensk investmentbolagsfond får du indirekt exponering mot flera investmentbolag, som i sin tur äger många andra bolag. Det är därför fonder ofta beskrivs som ett av de mest effektiva sätten att bygga långsiktigt välstånd.
                </p>
              </div>
            </div>
          </div>

          <!-- Hur fungerar en fond -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Hur fungerar en fond?</h3>
            <div class="space-y-6">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                När du investerar pengar i en fond köper du fondandelar. Fondens värde förändras sedan beroende på hur de underliggande innehaven utvecklas. Om innehaven stiger i värde stiger fonden. Om marknaden faller kan fonden också gå ner.
              </p>
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Det viktiga att förstå är att en fond <span class="font-bold text-foreground">inte ger någon garanterad avkastning</span>. Värdet svänger över tid. Men eftersom fonden äger många olika värdepapper blir utvecklingen ofta stabilare än om du bara äger enstaka aktier.
              </p>
            </div>
          </div>

          <!-- Varför fonder -->
          <div class="space-y-6">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Varför är fonder bra för nybörjare?</h3>
            <p class="text-lg text-muted-foreground font-medium">Fonder är särskilt bra för nya sparare av flera skäl.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4">
                <div class="text-primary font-black text-4xl opacity-20">01</div>
                <h4 class="text-xl font-black tracking-tighter">Riskspridning direkt</h4>
                <p class="text-sm text-muted-foreground">I stället för att välja ett fåtal aktier får du en färdig portfölj.</p>
              </div>
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4">
                <div class="text-primary font-black text-4xl opacity-20">02</div>
                <h4 class="text-xl font-black tracking-tighter">Det är enkelt</h4>
                <p class="text-sm text-muted-foreground">Du behöver inte lägga timmar på att analysera bolag, rapporter och värderingar.</p>
              </div>
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4">
                <div class="text-primary font-black text-4xl opacity-20">03</div>
                <h4 class="text-xl font-black tracking-tighter">Perfekt för månadsspar</h4>
                <p class="text-sm text-muted-foreground">Fonder fungerar utmärkt för den som vill spara lite varje månad.</p>
              </div>
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4">
                <div class="text-primary font-black text-4xl opacity-20">04</div>
                <h4 class="text-xl font-black tracking-tighter">Låga avgifter</h4>
                <p class="text-sm text-muted-foreground">Särskilt indexfonder är ofta billiga, vilket gör stor skillnad på lång sikt.</p>
              </div>
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4">
                <div class="text-primary font-black text-4xl opacity-20">05</div>
                <h4 class="text-xl font-black tracking-tighter">Mindre risk för misstag</h4>
                <p class="text-sm text-muted-foreground">Många nybörjare gör fel när de försöker välja enskilda aktier direkt. Fonder ger en stabil start.</p>
              </div>
            </div>
          </div>

          <!-- Olika typer av fonder -->
          <div class="space-y-8 mt-16">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Olika typer av fonder</h3>
            <p class="text-lg text-muted-foreground font-medium">Här är de viktigaste fondtyperna att känna till.</p>
            
            <div class="grid grid-cols-1 gap-6">
              <!-- Globalfonder -->
              <div class="p-8 bg-card border border-border rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                  <h4 class="text-2xl font-black tracking-tighter mb-2">Globalfonder</h4>
                  <p class="text-sm text-muted-foreground">Investerar i bolag från stora delar av världen, ofta med tyngdpunkt i USA.</p>
                </div>
                <div class="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-green-500 font-bold block mb-1">Fördelar</span>
                    <ul class="text-muted-foreground space-y-1">
                      <li>• Bred riskspridning</li>
                      <li>• Enkel grund i portföljen</li>
                      <li>• Passar de flesta</li>
                    </ul>
                  </div>
                  <div>
                    <span class="text-red-400 font-bold block mb-1">Nackdelar</span>
                    <ul class="text-muted-foreground space-y-1">
                      <li>• Ofta tung vikt mot USA</li>
                      <li>• Begränsad mot mindre marknader</li>
                    </ul>
                  </div>
                  <div class="col-span-2 mt-2 pt-4 border-t border-border">
                    <span class="font-bold text-foreground">Passar för:</span> <span class="text-muted-foreground">Nästan alla långsiktiga småsparare. En billig global indexfond räcker ofta långt.</span>
                  </div>
                </div>
              </div>

              <!-- Sverigefonder -->
              <div class="p-8 bg-card border border-border rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                  <h4 class="text-2xl font-black tracking-tighter mb-2">Sverigefonder</h4>
                  <p class="text-sm text-muted-foreground">Investerar i svenska bolag (storbolag, småbolag eller en blandning).</p>
                </div>
                <div class="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-green-500 font-bold block mb-1">Fördelar</span>
                    <ul class="text-muted-foreground space-y-1">
                      <li>• Exponering mot hemmamarknaden</li>
                      <li>• Lättare att förstå bolagen</li>
                      <li>• Bra komplement</li>
                    </ul>
                  </div>
                  <div>
                    <span class="text-red-400 font-bold block mb-1">Nackdelar</span>
                    <ul class="text-muted-foreground space-y-1">
                      <li>• Sverige är en liten marknad</li>
                      <li>• Mindre riskspridning</li>
                    </ul>
                  </div>
                  <div class="col-span-2 mt-2 pt-4 border-t border-border">
                    <span class="font-bold text-foreground">Passar för:</span> <span class="text-muted-foreground">Dig som vill ha en del av portföljen lokalt, men sällan som enda fond.</span>
                  </div>
                </div>
              </div>

              <!-- Småbolagsfonder -->
              <div class="p-8 bg-card border border-border rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                  <h4 class="text-2xl font-black tracking-tighter mb-2">Småbolagsfonder</h4>
                  <p class="text-sm text-muted-foreground">Fokuserar på mindre bolag. Högre risk men mer tillväxtpotential.</p>
                </div>
                <div class="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-green-500 font-bold block mb-1">Fördelar</span>
                    <ul class="text-muted-foreground space-y-1">
                      <li>• Högre avkastningspotential</li>
                      <li>• Snabbväxande bolag</li>
                    </ul>
                  </div>
                  <div>
                    <span class="text-red-400 font-bold block mb-1">Nackdelar</span>
                    <ul class="text-muted-foreground space-y-1">
                      <li>• Större svängningar</li>
                      <li>• Ofta högre avgifter</li>
                    </ul>
                  </div>
                  <div class="col-span-2 mt-2 pt-4 border-t border-border">
                    <span class="font-bold text-foreground">Passar för:</span> <span class="text-muted-foreground">Sparare med lång tidshorisont och högre risktolerans.</span>
                  </div>
                </div>
              </div>

              <!-- Extra types condensed to Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div class="p-6 bg-muted/30 border border-border rounded-3xl space-y-3">
                  <h4 class="text-xl font-black tracking-tighter">Tillväxtmarknadsfonder</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Länder som Indien, Kina och Brasilien.<br/>
                    <b>Fördelar:</b> Extra tillväxtpotential.<br/>
                    <b>Nackdelar:</b> Högre politisk risk & svängningar.<br/>
                    <b>För vem:</b> Som ett mindre komplement.
                  </p>
                </div>
                <div class="p-6 bg-muted/30 border border-border rounded-3xl space-y-3">
                  <h4 class="text-xl font-black tracking-tighter">Räntefonder</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Investerar i räntebärande papper.<br/>
                    <b>Fördelar:</b> Stabilitet, lägre risk.<br/>
                    <b>Nackdelar:</b> Lägre förväntad avkastning.<br/>
                    <b>För vem:</b> Kort sparhorisont eller låg riskvilja.
                  </p>
                </div>
                <div class="p-6 bg-muted/30 border border-border rounded-3xl space-y-3">
                  <h4 class="text-xl font-black tracking-tighter">Blandfonder</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Kombinerar aktier och räntor.<br/>
                    <b>Fördelar:</b> Enkel helhetslösning.<br/>
                    <b>Nackdelar:</b> Mindre kontroll, ibland dyrare.<br/>
                    <b>För vem:</b> Spararen som vill slippa bygga portfölj.
                  </p>
                </div>
                <div class="p-6 bg-muted/30 border border-border rounded-3xl space-y-3">
                  <h4 class="text-xl font-black tracking-tighter">Temafonder</h4>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Specifikt tema som Teknik, AI, Hälso- och sjukvård.<br/>
                    <b>Fördelar:</b> Tydlig inriktning.<br/>
                    <b>Nackdelar:</b> Hög risk, smal exponering.<br/>
                    <b>För vem:</b> Litet komplement i portföljen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Index vs Aktivt -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500 mt-16">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Indexfonder eller aktivt förvaltade fonder – vad är bäst?</h3>
            <p class="text-lg text-muted-foreground mb-8">Det här är en av de viktigaste frågorna inom fondsparande.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div class="text-foreground font-black text-lg uppercase tracking-widest">Indexfonder</div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  En indexfond följer ett index, till exempel MSCI World eller OMX Stockholm. Fonden försöker inte slå marknaden, utan spegla den så nära som möjligt. Eftersom förvaltningen är enkel blir avgiften låg.
                </p>
                <ul class="text-sm text-muted-foreground space-y-2 mt-4 font-medium">
                  <li>✅ Låga avgifter</li>
                  <li>✅ Bred exponering</li>
                  <li>✅ Enkel och transparent strategi</li>
                  <li>✅ Svårslaget alternativ för många sparare</li>
                </ul>
              </div>
              <div class="space-y-4">
                <div class="text-foreground font-black text-lg uppercase tracking-widest">Aktivt förvaltade fonder</div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  En aktivt förvaltad fond har en förvaltare som väljer vilka innehav fonden ska köpa och sälja. Målet är att slå sitt jämförelseindex. Problemet är att det är svårt att göra det konsekvent över lång tid, särskilt efter avgifter.
                </p>
                <ul class="text-sm text-muted-foreground space-y-2 mt-4 font-medium">
                  <li>✅ Möjlighet till meravkastning</li>
                  <li>✅ Bra i vissa nischer (småbolag/tillväxt)</li>
                  <li>❌ Högre avgifter</li>
                  <li>❌ Många underpresterar index på sikt</li>
                </ul>
              </div>
            </div>

            <div class="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-3xl">
              <h4 class="text-xl font-black tracking-tighter text-red-200 mb-2">Varför avgiften spelar så stor roll</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Avgifter kan se små ut, men över lång tid gör de stor skillnad. Anta att du investerar 100 000 kronor och får 8 procent avkastning per år före avgifter i 30 år.
                <br/><br/>
                • En fond med låg avgift kan ge dig runt <b>930 000 kronor</b>.<br/>
                • En fond med hög avgift kan ge dig runt <b>660 000 kronor</b>.<br/><br/>
                Skillnaden kan alltså bli hundratusentals kronor över tid. Det är därför billiga indexfonder så ofta är det bästa förstavalet för nybörjare.
              </p>
            </div>
          </div>

          <!-- Välja fond -->
          <div class="space-y-8 mt-16">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Så väljer du rätt fond</h3>
            <p class="text-lg text-muted-foreground">Det finns ingen enskild fond som är bäst för alla, men vissa egenskaper utmärker en bra nybörjarfond: bred, billig, enkel att förstå, långsiktig och lätt att månadsspara i. När du väljer, använd denna enkla checklista:</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 bg-card border border-border rounded-2xl">
                <span class="text-primary font-black mb-2 block">1. Vad investerar fonden i?</span>
                <p class="text-sm text-muted-foreground">Förstå om det är global, Sverige, småbolag eller räntor.</p>
              </div>
              <div class="p-6 bg-card border border-border rounded-2xl">
                <span class="text-primary font-black mb-2 block">2. Hur hög är avgiften?</span>
                <p class="text-sm text-muted-foreground">Låg avgift är ofta en stor fördel, särskilt i basen av portföljen.</p>
              </div>
              <div class="p-6 bg-card border border-border rounded-2xl">
                <span class="text-primary font-black mb-2 block">3. Hur stor risk tar du?</span>
                <p class="text-sm text-muted-foreground">Aktiefonder svänger mer än räntefonder.</p>
              </div>
              <div class="p-6 bg-card border border-border rounded-2xl">
                <span class="text-primary font-black mb-2 block">4. Tidshorisont?</span>
                <p class="text-sm text-muted-foreground">Ju längre tidshorisont, desto mer risk kan du normalt tåla.</p>
              </div>
              <div class="p-6 bg-card border border-border rounded-2xl md:col-span-2">
                <span class="text-primary font-black mb-2 block">5. Förstår du vad du äger?</span>
                <p class="text-sm text-muted-foreground">Om fonden känns krånglig eller svår att förklara är det ofta bättre att välja något enklare.</p>
              </div>
            </div>
          </div>

          <!-- Fondportföljer -->
          <div class="space-y-12 mt-16">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Bästa fondportföljen för nybörjare</h3>
            <p class="text-lg text-muted-foreground font-medium">Här är några enkla portföljer som passar olika typer av sparare. För de flesta räcker 1–3 fonder. Det behöver inte vara svårare än så.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 relative overflow-hidden group hover:border-primary/30 transition-all">
                <h4 class="text-2xl font-black tracking-tighter">1. Den enklaste</h4>
                <div class="text-5xl font-black text-primary">100%</div>
                <div class="text-sm uppercase tracking-widest font-bold">Global indexfond</div>
                <p class="text-sm text-muted-foreground">Passar dig som vill hålla det så enkelt som möjligt. Det här är en fullt rimlig lösning för många.</p>
              </div>
              
              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 relative overflow-hidden group hover:border-primary/30 transition-all">
                <h4 class="text-2xl font-black tracking-tighter">2. Enkel med Sverige</h4>
                <div class="flex gap-4">
                  <div class="space-y-1"><div class="text-4xl font-black text-primary">80%</div><div class="text-[10px] uppercase tracking-widest font-bold">Global index</div></div>
                  <div class="space-y-1"><div class="text-4xl font-black text-foreground">20%</div><div class="text-[10px] uppercase tracking-widest font-bold">Sverigefond</div></div>
                </div>
                <p class="text-sm text-muted-foreground">Passar dig som vill ha global riskspridning men också viss exponering mot svenska bolag.</p>
              </div>

              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 relative overflow-hidden group hover:border-primary/30 transition-all">
                <h4 class="text-2xl font-black tracking-tighter">3. Högre risk/tillväxt</h4>
                <div class="flex gap-4 flex-wrap">
                  <div class="space-y-1"><div class="text-2xl font-black text-primary">70%</div><div class="text-[9px] uppercase tracking-widest font-bold">Global index</div></div>
                  <div class="space-y-1"><div class="text-2xl font-black text-foreground">20%</div><div class="text-[9px] uppercase tracking-widest font-bold">Sverigefond</div></div>
                  <div class="space-y-1"><div class="text-2xl font-black text-muted-foreground">10%</div><div class="text-[9px] uppercase tracking-widest font-bold">Tillväxtmarknad</div></div>
                </div>
                <p class="text-sm text-muted-foreground">Passar dig som sparar långsiktigt och tål större svängningar.</p>
              </div>

              <div class="p-8 bg-muted/30 border border-border rounded-3xl space-y-4 relative overflow-hidden group hover:border-primary/30 transition-all">
                <h4 class="text-2xl font-black tracking-tighter">4. Lägre risk</h4>
                <div class="flex gap-4">
                  <div class="space-y-1"><div class="text-4xl font-black text-primary">60%</div><div class="text-[10px] uppercase tracking-widest font-bold">Global index</div></div>
                  <div class="space-y-1"><div class="text-4xl font-black text-foreground">40%</div><div class="text-[10px] uppercase tracking-widest font-bold">Räntefond</div></div>
                </div>
                <p class="text-sm text-muted-foreground">Passar dig som vill ha mindre svängningar eller har kortare sparhorisont.</p>
              </div>
            </div>
            
            <div class="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-3xl">
              <span class="font-bold text-lg">Hur vet man vilken som passar?</span>
              <p class="text-sm text-muted-foreground mt-2 leading-relaxed">
                Det avgörs framför allt av två saker: <b>din tidshorisont</b> och <b>din riskvilja</b>. Om du sparar i 10 år eller mer kan hög andel aktiefonder vara rimligt. Om du behöver pengarna inom några år, eller om du blir extremt stressad när börsen faller, kan räntefonder ge bättre balans.<br/><br/>
                <i>Den bästa portföljen är inte den som ser bäst ut på papper – utan den du faktiskt klarar att hålla fast vid när börsen stormar.</i>
              </p>
            </div>
          </div>

          <!-- Misstag & Psykologi -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden mt-16">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Det nybörjare missar: Börsen går ner ibland</h3>
            <div class="space-y-6">
              <p class="text-lg text-muted-foreground leading-relaxed">
                Alla fonder har inte samma risk, men även bra fonder kan falla i värde. En vanlig missuppfattning är att något är fel när fonden plötsligt sjunker i värde. Men nedgångar är normala. Börsen rör sig inte i en rak linje uppåt. Det kommer perioder där marknaden faller snabbt och nyhetsflödet känns negativt.
              </p>
              <p class="text-lg text-muted-foreground leading-relaxed font-bold">
                Det viktigaste är att inte blanda ihop tillfälliga nedgångar med att sparandet är dåligt. För den som sparar långsiktigt är svängningar en del av resan.
              </p>
              
              <h4 class="text-xl font-black mt-8 mb-4">Vanliga misstag när man sparar i fonder:</h4>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li class="bg-card p-4 rounded-xl border border-border"><span class="font-bold text-red-500 block">Jaga fonder som gått bäst</span> Det som gått bäst nyligen är inte automatiskt bäst framåt.</li>
                <li class="bg-card p-4 rounded-xl border border-border"><span class="font-bold text-red-500 block">Sälja när börsen faller</span> Det här är ett av de vanligaste och dyraste misstagen.</li>
                <li class="bg-card p-4 rounded-xl border border-border"><span class="font-bold text-red-500 block">Ha för många fonder</span> Det gör ofta portföljen rörigare utan att förbättra den särskilt mycket.</li>
                <li class="bg-card p-4 rounded-xl border border-border"><span class="font-bold text-red-500 block">Betala för höga avgifter</span> En dyr fond måste verkligen förtjäna sin avgift.</li>
                <li class="bg-card p-4 rounded-xl border border-border"><span class="font-bold text-red-500 block">Ta för hög risk</span> Många tror att de tål stora svängningar tills de väl kommer.</li>
                <li class="bg-card p-4 rounded-xl border border-border"><span class="font-bold text-red-500 block">Vänta för länge</span> Det viktigaste är ofta inte att välja perfekt, utan att komma igång.</li>
              </ul>
            </div>
          </div>

          <!-- Så kommer du igång -->
          <div class="space-y-8 mt-16 pb-12 border-b border-border">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Så kommer du igång med fondsparande</h3>
            <p class="text-lg text-muted-foreground font-medium">Att börja spara i fonder är enklare än många tror.</p>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="p-6 bg-primary/10 border border-primary/20 rounded-2xl"><div class="font-black text-xl mb-2 text-primary">Steg 1</div><p class="text-sm font-medium text-foreground">Öppna ett konto.</p><p class="text-xs text-muted-foreground mt-1">De flesta småsparare använder ett ISK hos ex. Avanza eller Nordnet.</p></div>
              <div class="p-6 bg-primary/10 border border-primary/20 rounded-2xl"><div class="font-black text-xl mb-2 text-primary">Steg 2</div><p class="text-sm font-medium text-foreground">Välj en fondportfölj.</p><p class="text-xs text-muted-foreground mt-1">För många räcker det att börja med en global indexfond.</p></div>
              <div class="p-6 bg-primary/10 border border-primary/20 rounded-2xl"><div class="font-black text-xl mb-2 text-primary">Steg 3</div><p class="text-sm font-medium text-foreground">Starta månadssparande.</p><p class="text-xs text-muted-foreground mt-1">Bestäm ett belopp som dras automatiskt varje månad. Beloppet avgör inte framgången, det gör vanan.</p></div>
              <div class="p-6 bg-primary/10 border border-primary/20 rounded-2xl"><div class="font-black text-xl mb-2 text-primary">Steg 4</div><p class="text-sm font-medium text-foreground">Tänk långsiktigt.</p><p class="text-xs text-muted-foreground mt-1">Låt inte kortsiktiga svängningar styra besluten.</p></div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="space-y-8 mt-12">
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Vanliga frågor om fonder</h3>
            <div class="space-y-4">
              <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
                <summary class="font-bold cursor-pointer outline-none marker:text-primary">Hur mycket ska man spara i fonder varje månad?</summary>
                <p class="text-muted-foreground mt-4 text-sm">Det viktigaste är inte exakt belopp, utan att du kommer igång och gör sparandet regelbundet. Att spara 500 kr, 1 000 kr eller 2 000 kr i månaden kan bli stora summor över tid tack vare ränta på ränta. Små belopp gör skillnad när de får växa länge.</p>
              </details>
              <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
                <summary class="font-bold cursor-pointer outline-none marker:text-primary">Är det bättre att månadsspara eller investera allt direkt?</summary>
                <p class="text-muted-foreground mt-4 text-sm">För många nybörjare är månadssparande den enklaste lösningen. Du bygger en vana, slipper försöka tajma marknaden, och det känns ofta tryggare. Har du redan en stor summa pengar kan det såklart direktinvesteras om horisonten är lång.</p>
              </details>
              <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
                <summary class="font-bold cursor-pointer outline-none marker:text-primary">Ska man välja hållbara fonder?</summary>
                <p class="text-muted-foreground mt-4 text-sm">Det beror på vad som är viktigt för dig. Vissa fonder väljer bort branscher eller bolag utifrån hållbarhetskriterier. Förstå att detta kan påverka fondens utveckling (tex om de helt utesluter energi eller försvar). Det viktiga är att du vet vad fonden faktiskt gör, inte bara att namnet låter bra.</p>
              </details>
              <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
                <summary class="font-bold cursor-pointer outline-none marker:text-primary">Vilken fond är bäst för nybörjare?</summary>
                <p class="text-muted-foreground mt-4 text-sm">För många är en billig global indexfond det bästa förstavalet eftersom den ger bred riskspridning till låg avgift.</p>
              </details>
              <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
                <summary class="font-bold cursor-pointer outline-none marker:text-primary">Kan man förlora pengar i fonder?</summary>
                <p class="text-muted-foreground mt-4 text-sm">Ja, särskilt på kort sikt. Det är inte riskfritt. Alla fonder kan gå ner, men breda fonder minskar risken betydligt jämfört med enskilda aktier.</p>
              </details>
            </div>
          </div>

          <!-- Slutsats -->
          <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden mt-16">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Slutsats</h3>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Fonder är ett av de mest användbara verktygen för den som vill bygga ett långsiktigt sparande utan att behöva bli expert på aktier. De ger bred riskspridning, kräver lite arbete och gör det lätt att spara regelbundet.
            </p>
            <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              För de flesta nybörjare är den enklaste vägen också en av de bästa: börja med en billig global indexfond och månadsspara långsiktigt. Det viktigaste är inte att hitta den perfekta fonden. Det viktigaste är att börja.
            </p>
          </section>

          <!-- Interna Länkar -->
          <div class="mt-16 border-t border-border pt-12">
            <h4 class="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Läs vidare på Börsskolan</h4>
            <div class="flex flex-wrap gap-4">
              <a href="/guider/vad-ar-en-indexfond" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Vad är en indexfond?</a>
              <a href="/guider/isk-vs-kapitalforsakring" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">ISK vs kapitalförsäkring</a>
              <a href="/guider/vad-ar-ranta-pa-ranta" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Vad är ränta på ränta?</a>
              <a href="/guider/hur-mycket-ska-man-manadsspara" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Hur mycket ska man månadsspara?</a>
              <a href="/guider/aktier-eller-fonder" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Aktier eller fonder – vad passar bäst?</a>
              <a href="/guider/vad-betyder-risk-i-investeringar" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Vad betyder risk i investeringar?</a>
              <a href="/guider/basta-globalfonderna" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Bästa globalfonderna</a>
              <a href="/guider/basta-indexfonderna-i-sverige" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Bästa indexfonderna i Sverige</a>
            </div>
          </div>
        </div>
      </div>
    `,
    category: "Fonder",
    readTime: "10 min",
    part: 7,
    icon: "Layers"
  },
  "isk-vs-kapitalforsakring": {
    slug: "isk-vs-kapitalforsakring",
    title: "ISK vs kapitalförsäkring 2026 – vad är bäst för sparare?",
    excerpt: "Jämför ISK och kapitalförsäkring 2026. Lär dig skillnaden i skatt, ägande, förmånstagare, barnsparande, rösträtt och utländska aktier – och se vilken sparform som passar dig bäst.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Ska du välja ISK eller kapitalförsäkring?</h2>
          <div class="space-y-4">
            <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Det är en av de vanligaste frågorna bland svenska småsparare, och det är också en fråga där många gör det onödigt komplicerat. Sanningen är att båda sparformerna fungerar bra för långsiktigt sparande i aktier och fonder.
            </p>
            <p class="text-xl text-foreground font-black max-w-3xl">
              ISK är oftast standardvalet, medan Kapitalförsäkring är bäst när du har ett tydligt specialskäl.
            </p>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Vad är ett ISK?</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              ISK står för investeringssparkonto. Du äger själv tillgångarna på ett ISK, vilket innebär att du har rösträtt för aktierna vid bolagsstämma. Det beskattas schablonmässigt och du slipper deklarera varje försäljning.
            </p>
          </div>
          <div class="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all">
            <h3 class="text-2xl font-black tracking-tighter">Vad är en kapitalförsäkring?</h3>
            <p class="text-base text-muted-foreground leading-relaxed font-medium">
              En kapitalförsäkring (KF) är en försäkringslösning där försäkringsbolaget formellt äger tillgångarna. Du äger rätten till försäkringens värde. Du har normalt inte rösträtt, men kan sätta in en förmånstagare.
            </p>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-8 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Skattefri grundnivå 2026: 300 000 kronor</h3>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Från och med 1 januari 2026 är den skattefria grundnivån för ISK, kapitalförsäkring och PEPP-produkt 300 000 kronor. Den gäller för ditt sammanlagda sparande i dessa sparformer, inte per konto.
          </p>
          <div class="p-6 bg-card border border-border rounded-2xl">
            <p class="text-sm text-primary font-black uppercase tracking-widest mb-2">Viktigt att veta</p>
            <p class="text-sm text-muted-foreground">Har du alltså både ISK och kapitalförsäkring räknas de ihop i den delen. Det gör båda sparformerna ännu mer attraktiva för småsparare.</p>
          </div>
        </section>

        <div class="space-y-12 mt-20">
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">När ska du välja vad?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-10 bg-muted/30 border border-border rounded-[3rem] space-y-6">
              <div class="text-primary font-black text-xs uppercase tracking-widest">Välj ISK om du:</div>
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-muted-foreground font-medium"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div> Vill ha maximal enkelhet och äga aktierna själv.</li>
                <li class="flex items-start gap-3 text-muted-foreground font-medium"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div> Vill ha rösträtt på bolagsstämmor.</li>
                <li class="flex items-start gap-3 text-muted-foreground font-medium"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div> Sparar i fonder eller svenska aktier.</li>
              </ul>
            </div>
            <div class="p-10 bg-muted/30 border border-border rounded-[3rem] space-y-6">
              <div class="text-primary font-black text-xs uppercase tracking-widest">Välj KF om du:</div>
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-muted-foreground font-medium"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div> Sparar till barn men vill behålla kontrollen.</li>
                <li class="flex items-start gap-3 text-muted-foreground font-medium"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div> Vill kunna sätta in en förmånstagare.</li>
                <li class="flex items-start gap-3 text-muted-foreground font-medium"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div> Äger utländska utdelningsaktier (utländsk källskatt).</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden mt-16">
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Barnsparande & Förmånstagare</h3>
          <div class="space-y-6">
            <p class="text-lg text-muted-foreground leading-relaxed">
              Här blir kapitalförsäkring ofta extra relevant. Sparar du i barnets namn på ett ISK blir pengarna barnets när det fyller 18. Med en kapitalförsäkring i ditt namn kan du styra när och hur pengarna betalas ut.
            </p>
            <div class="p-6 bg-card border border-border rounded-2xl">
              <h4 class="font-black mb-2">Förmånstagare</h4>
              <p class="text-sm text-muted-foreground">På ett ISK kan du inte bygga in en förmånstagarlösning på samma sätt som i en kapitalförsäkring, där det är en central funktion.</p>
            </div>
          </div>
        </div>

        <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden mt-16">
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Utländska utdelningsaktier</h3>
          <div class="space-y-6">
            <p class="text-lg text-muted-foreground leading-relaxed">
              Om du äger utländska aktier som ger utdelning dras källskatt. I en kapitalförsäkring sköter försäkringsbolaget (som formell ägare) ofta processen med att söka tillbaka skatten, vilket förenklar för dig.
            </p>
            <p class="text-sm italic text-muted-foreground">
              Kontrollera alltid vad just din bank erbjuder – vissa aktörer som Avanza Pension automatiserar detta i hög grad.
            </p>
          </div>
        </div>

        <div class="space-y-8 mt-16">
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Vanliga frågor</h3>
          <div class="space-y-4">
            <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
              <summary class="font-bold cursor-pointer outline-none marker:text-primary">Är ISK bättre än kapitalförsäkring?</summary>
              <p class="text-muted-foreground mt-4 text-sm">För de flesta småsparare är ISK ofta det bästa förstavalet eftersom det är enkelt och flexibelt. KF passar bättre vid specifika behov som barnsparande eller utländska aktier.</p>
            </details>
            <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
              <summary class="font-bold cursor-pointer outline-none marker:text-primary">Är skatten samma på ISK och kapitalförsäkring?</summary>
              <p class="text-muted-foreground mt-4 text-sm">Inte exakt, men båda är schablonbeskattade. ISK beskattas via schablonintäkt medan KF beskattas via avkastningsskatt.</p>
            </details>
            <details class="group bg-card border border-border rounded-2xl p-6 open:bg-muted/50">
              <summary class="font-bold cursor-pointer outline-none marker:text-primary">Kan man ha både ISK och kapitalförsäkring?</summary>
              <p class="text-muted-foreground mt-4 text-sm">Ja, det kan du. Många har ISK för det vanliga sparandet och en KF för t.ex. barnsparande.</p>
            </details>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden mt-16">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 class="text-3xl md:text-4xl font-black tracking-tighter">Slutsats</h3>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            ISK är standardvalet för de allra flesta. Välj kapitalförsäkring om du har ett specifikt skäl som rör barnsparande, förmånstagare eller utländska utdelningar. Det viktigaste är att du börjar spara – båda formerna är milsvida bättre än ett vanligt sparkonto eller en traditionell depå.
          </p>
        </section>

        <div class="mt-16 border-t border-border pt-12">
          <h4 class="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Läs vidare på Börsskolan</h4>
          <div class="flex flex-wrap gap-4">
            <a href="/guider/grunderna-i-aktieanalys" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Grunderna i aktieanalys</a>
            <a href="/guider/vardering-av-aktier" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Värdering av aktier</a>
            <a href="/guider/allt-om-fonder" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Allt om fonder</a>
            <a href="/guider/bygga-en-portfolj" class="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium rounded-full">Bygga en portfölj</a>
          </div>
        </div>
      </div>
    `,
    category: "Sparande",
    readTime: "10 min",
    part: 8,
    icon: "Shield"
  }
};
