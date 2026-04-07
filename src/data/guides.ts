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
  "allt-om-fonder": {
    slug: "allt-om-fonder",
    title: "Bästa fonderna för nybörjare – En komplett guide",
    excerpt: "Lär dig hur fonder fungerar, skillnaden mellan index och aktiv förvaltning, och hur du väljer rätt.",
    content: `
      <div class="space-y-16">
        <section class="not-prose space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Fonder — allt du behöver veta</h2>
          <div class="space-y-4">
            <p class="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Att köpa en enskild aktie innebär att du satsar på ett specifikt bolag. Köper du en fond satsar du på hundratals eller tusentals bolag samtidigt — med ett enda köp.
            </p>
            <p class="text-xl text-foreground leading-relaxed font-black max-w-3xl">
              För de flesta sparare är fonder det <span class="text-primary">enklaste, billigaste och mest effektiva</span> sättet att bygga långsiktigt välstånd.
            </p>
            <p class="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
              Den här guiden förklarar hur fonder fungerar, vilka typer som finns och hur du väljer rätt för din situation.
            </p>
          </div>
        </section>

        <div class="not-prose space-y-12">
          <!-- VAD ÄR EN FOND -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Vad är en fond och hur fungerar det?</h3>
            <div class="space-y-6">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En fond är en samling av värdepapper — aktier, obligationer eller en blandning — som förvaltas gemensamt av ett fondbolag. När du köper en fondandel äger du en liten bit av hela portföljen.
              </p>
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Fördelen är omedelbar <span class="text-primary font-black">diversifiering</span>. Istället för att köpa 30 enskilda aktier och betala courtage för varje köp, investerar du i en fond och får exponering mot hundratals bolag på en gång.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Länsförsäkringar Global</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    När du köper en andel i Länsförsäkringar Global äger du indirekt en liten bit av Microsoft, Apple, NVIDIA, Amazon och ytterligare 1 500+ bolag i 23 länder. Ett enda köp ger dig exponering mot hela den globala ekonomin.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Spiltan Aktiefond Investmentbolag</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Denna fond äger andelar i svenska investmentbolag — Investor, Industrivärden, Latour och Kinnevik. Köper du fonden får du automatiskt exponering mot hundratals underliggande bolag via investmentbolagens portföljer. Det är diversifiering i flera lager.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- INDEX VS AKTIV -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Indexfonder vs aktivt förvaltade fonder</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Det är den viktigaste distinktionen att förstå när du väljer fond.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-4">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Indexfonder</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Följer ett index mekaniskt (t.ex. MSCI World). Ingen förvaltare fattar beslut. Resultatet är låga avgifter — ofta 0,1-0,3% per år.
                  </p>
                </div>
                <div class="space-y-4">
                  <div class="text-foreground font-black text-sm uppercase tracking-widest">Aktivt förvaltade</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Förvaltare väljer aktivt aktier för att slå index. Avgifterna är högre — ofta 1-2% per år — för att betala förvaltarnas arbete.
                  </p>
                </div>
              </div>

              <div class="p-8 bg-red-500/5 border border-red-500/20 rounded-[2rem] space-y-4">
                <h4 class="text-xl font-black text-red-200">Det stora problemet med aktiv förvaltning</h4>
                <p class="text-base text-muted-foreground leading-relaxed">
                  Forskning visar konsekvent att 80-90% av aktivt förvaltade fonder underpresterar sitt jämförelseindex över en 10-årsperiod efter avgifter. Avgiften är ett matematiskt handikapp som förvaltaren måste övervinna varje år.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Avgiftens dramatiska effekt</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Investera 100 000 kr med 8% avkastning i 30 år:<br/>
                    • Indexfond (0,2% avgift): <b>930 000 kr</b><br/>
                    • Aktiv fond (1,5% avgift): <b>660 000 kr</b><br/>
                    Skillnaden är 270 000 kr — enbart pga avgiften.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — När aktiv förvaltning kan löna sig</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    På ineffektiva marknader — som småbolagsfonder eller tillväxtmarknader — har aktiva förvaltare bättre förutsättningar att hitta felprissatta aktier. På stora marknader som S&P 500 är det nästan omöjligt att konsekvent slå index.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- GLOBALFONDER -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Globalfonder — basen i de flesta portföljer</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En globalfond investerar i bolag över hela världen och är för de flesta sparare det bästa grundinnehavet. Du får automatisk geografisk diversifiering.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">LF Global Indexnära</div>
                  <p class="text-sm text-muted-foreground">Avgift: 0,20%. Följer MSCI World (1500+ bolag). USA utgör ca 70%. Utmärkt basinnehav.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Swedbank Robur Access Global</div>
                  <p class="text-sm text-muted-foreground">Avgift: 0,30%. Bred global exponering med hållbarhetsfokus (ESG).</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">SPP Global Solutions</div>
                  <p class="text-sm text-muted-foreground">Avgift: 0,34%. Aktivt förvaltad med stark hållbarhetsprofil. Har historiskt presterat väl.</p>
                </div>
              </div>

              <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel — Hur globalfonder skiljer sig</div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Under AI-boomen 2023-2024 presterade Länsförsäkringar Global exceptionellt bra pga NVIDIA och Microsoft. En globalfond med hållbarhetsfokus som exkluderar energibolag underpresterade under 2022 när oljepriser steg.
                </p>
              </div>
            </div>
          </div>

          <!-- SVERIGEFONDER -->
          <div class="p-10 md:p-12 bg-muted/30 border border-border rounded-[3rem] relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter mb-6">Sverigefonder — exponering mot hemmaplan</h3>
            <div class="space-y-8">
              <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                En Sverigefond investerar enbart i svenska bolag. Det ger koncentrerad exponering mot en liten marknad men också mot några av världens bästa industribolag.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Spiltan Investmentbolag</div>
                  <p class="text-sm text-muted-foreground">Avgift: 0,20%. Investerar i svenska investmentbolag. Diversifiering i flera lager.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Handelsbanken Sverige Index</div>
                  <p class="text-sm text-muted-foreground">Avgift: 0,40%. Följer OMXS30 mekaniskt. Enkelt, billigt och transparent.</p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-2">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Swedbank Robur Sverigefond</div>
                  <p class="text-sm text-muted-foreground">Avgift: 1,40%. Aktivt förvaltad. Den höga avgiften är ett handikapp mot index.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 1 — Spiltans fördel</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Spiltan Aktiefond Investmentbolag har avkastat ca 15% per år i snitt de senaste 10 åren. Det beror på att investmentbolag historiskt presterat bättre än börsen tack vare aktivt ägarskap.
                  </p>
                </div>
                <div class="p-6 bg-card border border-border rounded-2xl space-y-4">
                  <div class="text-primary font-black text-xs uppercase tracking-widest">Exempel 2 — Koncentrationsrisken</div>
                  <p class="text-sm text-muted-foreground leading-relaxed">
                    Sverige är en liten exportberoende ekonomi. Under 2025 stärktes kronan kraftigt mot dollarn vilket pressade exportbolagens vinster och Stockholmsbörsen underpresterade globala index.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <p class="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Fonder är fundamentet i ett framgångsrikt sparande. Genom att välja billiga indexfonder som bas ger du dig själv de bästa förutsättningarna för att lyckas över tid.
          </p>
        </section>
      </div>
    `,
    category: "Fonder",
    readTime: "7 min",
    part: 7,
    icon: "Layers"
  }
};
