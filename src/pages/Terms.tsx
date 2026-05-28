import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
          <h1 className="text-5xl font-serif font-bold tracking-tight text-foreground">Användarvillkor</h1>
          <p className="text-muted-foreground font-semibold">Senast uppdaterad: 28 maj 2026</p>
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
              Börsanalys.se publicerar analyser av noterade bolag och finansiella instrument. Sådana analyser kan innehålla bedömningar av bolagets kvalitet, risker och framtidsutsikter, värderingsresonemang, uppskattat rimligt värde, scenarier, estimat samt investeringsbeslut såsom KÖP, BEVAKA, AVVAKTA eller SÄLJ.
            </p>
            <p>
              Dese bedömningar speglar analytikerns uppfattning vid analystillfället och kan förändras om nya uppgifter publiceras, aktiekursen förändras eller marknadsförutsättningarna utvecklas annorlunda än väntat.
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
            <p>
              Börsanalys.se lämnar ingen garanti för att en publicerad analys, ett värdeintervall eller ett investeringsbeslut kommer att leda till positiv avkastning.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">4. Intressekonflikter och innehav</h2>
            <p>
              Börsanalys.se redovisar relevanta direkta innehav och relevanta indirekta exponeringar i anslutning till respektive bolagsanalys samt på sidan <Link to="/aktieinnehav-och-intressekonflikter" className="text-primary hover:underline font-semibold">Aktieinnehav och intressekonflikter</Link>.
            </p>
            <p>
              Om Börsanalys.se eller författaren har mottagit ersättning från, utfört uppdrag åt eller haft annan kommersiell relation direkt till ett analyserat bolag ska detta anges i anslutning till den aktuella analysen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">5. Annonser och affiliatelänkar</h2>
            <p>
              Börsanalys.se kan finansieras genom annonser och affiliatelänkar till externa företag eller tjänster, exempelvis nätmäklare eller privatekonomiska tjänster.
            </p>
            <p>
              Annonser och kommersiella länkar ska vara tydligt markerade. Förekomsten av annonser eller affiliatelänkar påverkar inte analysernas poängsättning, investeringsbeslut eller bedömda rimliga värde.
            </p>
            <p>
              Läs mer på sidan <Link to="/aktieinnehav-och-intressekonflikter" className="text-primary hover:underline font-semibold">Aktieinnehav och intressekonflikter</Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">6. Informationens riktighet och ansvarsbegränsning</h2>
            <p>
              Börsanalys.se strävar efter att informationen på webbplatsen ska vara korrekt, tydlig och baserad på tillförlitliga offentliga källor. Fel, fördröjningar, ändrade marknadsuppgifter eller ofullständigheter kan dock förekomma.
            </p>
            <p>
              Börsanalys.se ansvarar inte för ekonomisk förlust eller annan skada som uppstår till följd av beslut som fattas med stöd av innehåll på webbplatsen, i den utsträckning en sådan ansvarsbegränsning är tillåten enligt tillämplig lag.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">7. Immateriella rättigheter</h2>
            <p>
              Allt innehåll på webbplatsen, inklusive texter, analyser, tabeller, grafik, design, logotyper och annat redaktionellt material, tillhör Börsanalys.se eller dess licensgivare och är skyddat enligt tillämplig upphovsrättslagstiftning.
            </p>
            <p>
              Innehållet får inte kopieras, distribueras, publiceras, bearbetas eller användas kommersiellt utan skriftligt tillstånd från Börsanalys.se, utöver vad som följer av tvingande lag eller sedvanlig citaträtt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">8. Användarkonto</h2>
            <p>
              Om du skapar ett konto på Börsanalys.se ansvarar du för att hålla dina inloggningsuppgifter säkra och för aktivitet som sker genom ditt konto.
            </p>
            <p>
              Börsanalys.se förbehåller sig rätten att begränsa eller stänga av konton som missbrukar tjänsten, försöker kringgå säkerhetsfunktioner eller bryter mot dessa villkor.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">9. Ändringar av villkoren</h2>
            <p>
              Börsanalys.se kan uppdatera dessa villkor från tid till annan. Den senaste versionen finns alltid publicerad på denna sida tillsammans med datum för senaste uppdatering.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">10. Kontakt</h2>
            <p>
              Frågor om användarvillkor, analyser, metod, källor eller redovisade intressekonflikter kan skickas till:
            </p>
            <p className="bg-muted/10 border border-border/60 p-6 rounded-2xl shadow-inner max-w-sm">
              <strong className="text-foreground text-sm uppercase tracking-widest block mb-2">Börsanalys.se</strong>
              <span className="font-bold text-foreground block mb-1">Carl Fredrik Thor</span>
              <a href="mailto:carl@borsanalys.se" className="text-primary hover:underline font-bold">carl@borsanalys.se</a>
            </p>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
