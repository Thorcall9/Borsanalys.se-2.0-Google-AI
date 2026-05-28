import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <Helmet>
        <title>Användarvillkor | Börsanalys.se</title>
        <meta name="description" content="Användarvillkor för Börsanalys.se" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold tracking-tight">Användarvillkor</h1>
          <p className="text-muted-foreground">Senast uppdaterad: 28 maj 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">1. Introduktion</h2>
            <p>
              Välkommen till Börsanalys.se. Genom att använda webbplatsen accepterar du dessa användarvillkor. Om du inte accepterar villkoren bör du inte använda webbplatsen.
            </p>
            <p>
              Börsanalys.se tillhandahåller bolagsanalyser, utbildningsmaterial, guider, verktyg och annat redaktionellt innehåll med inriktning mot aktier, börs och privatekonomi.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">2. Analyser och ingen personlig investeringsrådgivning</h2>
            <p>
              Innehållet på Börsanalys.se är framtaget för allmän information och utbildning. Innehållet utgör inte personlig investeringsrådgivning och är inte anpassat efter en enskild läsares ekonomiska situation, mål, placeringshorisont, kunskap eller risktolerans.
            </p>
            <p>
              Börsanalys.se publicerar analyser av noterade bolag och finansiella instrument. Sådana analyser kan innehålla:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>bedömningar av bolagets kvalitet, risker och framtidsutsikter,</li>
              <li>värderingsresonemang och uppskattat rimligt värde,</li>
              <li>scenarier och estimat,</li>
              <li>investeringsbeslut såsom KÖP, BEVAKA, AVVAKTA eller SÄLJ.</li>
            </ul>
            <p>
              Dessa bedömningar speglar analytikerns uppfattning vid analystillfället och kan förändras om nya uppgifter publiceras, aktiekursen förändras eller marknadsförutsättningarna utvecklas annorlunda än väntat.
            </p>
            <p>
              Varje läsare ansvarar själv för sina investeringsbeslut och bör göra en egen bedömning innan en investering genomförs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">3. Riskinformation</h2>
            <p>
              Investeringar i aktier och andra finansiella instrument innebär risk. Värdet på en investering kan både öka och minska, och du kan förlora hela eller delar av det investerade kapitalet.
            </p>
            <p>
              Historisk utveckling är ingen garanti för framtida avkastning. Prognoser, estimat, scenarier och bedömda värdeintervall bygger på antaganden som kan visa sig vara felaktiga.
            </p>
            <p>Aktiekurser kan påverkas av bland annat:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>bolagets resultat och finansiella ställning,</li>
              <li>förändrade marknadsförhållanden,</li>
              <li>räntor, valutor och konjunktur,</li>
              <li>politiska och regulatoriska beslut,</li>
              <li>branschspecifika risker,</li>
              <li>allmänt börssentiment.</li>
            </ul>
            <p>
              Börsanalys.se lämnar ingen garanti för att en publicerad analys, ett värdeintervall eller ett investeringsbeslut kommer att leda till positiv avkastning.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">4. Metod, källor och uppdateringar</h2>
            <p>
              Analyser på Börsanalys.se baseras på offentligt tillgänglig information, exempelvis årsredovisningar, delårsrapporter, bokslutskommunikéer, pressmeddelanden, bolagspresentationer samt offentligt tillgänglig marknads- och konsensusdata.
            </p>
            <p>I analyserna eftersträvar Börsanalys.se att tydligt skilja mellan:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>verifierbara fakta från offentliga källor,</li>
              <li>externa estimat och prognoser,</li>
              <li>analytikerns egna antaganden, tolkningar och slutsatser.</li>
            </ul>
            <p>
              Varje analys ska ange analysdatum, analyspris, författare, investeringsbeslut, bedömt rimligt värde eller värdeintervall samt relevanta risker och metodantaganden.
            </p>
            <p>
              En analys speglar bedömningen vid den tidpunkt som anges i analysen. Börsanalys.se åtar sig inte att löpande uppdatera varje analys efter rapporter, kursrörelser eller andra bolagshändelser. Om en analys uppdateras väsentligt ska detta framgå genom uppdateringsdatum eller ändringsinformation på analyssidan.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">5. Intressekonflikter och innehav</h2>
            <p>
              Börsanalys.se ska i anslutning till varje bolagsanalys redovisa relevanta intressen eller intressekonflikter som rör det analyserade bolaget eller finansiella instrumentet.
            </p>
            <p>Detta kan omfatta:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>om författaren äger aktier eller andra finansiella instrument i det analyserade bolaget,</li>
              <li>om Börsanalys.se eller författaren har mottagit ersättning från det analyserade bolaget,</li>
              <li>om det finns sponsring, uppdrag eller annan kommersiell relation till det analyserade bolaget,</li>
              <li>andra omständigheter som rimligen kan påverka läsarens bedömning av analysens objektivitet.</li>
            </ul>
            <p>Informationen i respektive analys gäller vid den tidpunkt som anges där.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">6. Annonser och affiliatelänkar</h2>
            <p>
              Börsanalys.se kan finansieras genom annonser och affiliatelänkar till externa företag eller tjänster, exempelvis banker, nätmäklare eller privatekonomiska tjänster.
            </p>
            <p>
              Annonser och kommersiella länkar ska vara tydligt markerade. Förekomsten av annonser eller affiliatelänkar ska inte påverka analysens poängsättning, investeringsbeslut eller bedömda rimliga värde.
            </p>
            <p>
              Om Börsanalys.se har en kommersiell relation direkt till det bolag som analyseras, eller om sådan relation annars är relevant för bedömningen av analysens objektivitet, ska detta anges tydligt i anslutning till analysen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">7. Informationens riktighet och ansvarsbegränsning</h2>
            <p>
              Börsanalys.se strävar efter att informationen på webbplatsen ska vara korrekt, tydlig och baserad på tillförlitliga offentliga källor. Fel, fördröjningar, ändrade marknadsuppgifter eller ofullständigheter kan dock förekomma.
            </p>
            <p>
              Börsanalys.se ansvarar inte för ekonomisk förlust eller annan skada som uppstår till följd av beslut som fattas med stöd av innehåll på webbplatsen, i den utsträckning en sådan ansvarsbegränsning är tillåten enligt tillämplig lag.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">8. Immateriella rättigheter</h2>
            <p>
              Allt innehåll på webbplatsen, inklusive texter, analyser, tabeller, grafik, design, logotyper och annat redaktionellt material, tillhör Börsanalys.se eller dess licensgivare och är skyddat enligt tillämplig upphovsrättslagstiftning.
            </p>
            <p>
              Innehållet får inte kopieras, distribueras, publiceras, bearbetas eller användas kommersiellt utan skriftligt tillstånd från Börsanalys.se, utöver vad som följer av tvingande lag eller sedvanlig citaträtt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">9. Användarkonto</h2>
            <p>
              Om du skapar ett konto på Börsanalys.se ansvarar du för att hålla dina inloggningsuppgifter säkra och för aktivitet som sker genom ditt konto.
            </p>
            <p>
              Börsanalys.se förbehåller sig rätten att begränsa eller stänga av konton som missbrukar tjänsten, försöker kringgå säkerhetsfunktioner eller bryter mot dessa villkor.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">10. Ändringar av villkoren</h2>
            <p>
              Börsanalys.se kan uppdatera dessa villkor från tid till annan. Den senaste versionen finns alltid publicerad på denna sida tillsammans med datum för senaste uppdatering.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">11. Kontakt</h2>
            <p>
              Frågor om användarvillkor, analyser, metod, källor eller redovisade intressekonflikter kan skickas till:
            </p>
            <p>
              Börsanalys.se<br />
              Carl Fredrik Thor<br />
              <a href="mailto:carl@borsanalys.se" className="text-primary hover:underline">carl@borsanalys.se</a>
            </p>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
