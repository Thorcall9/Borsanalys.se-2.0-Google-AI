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
          <p className="text-muted-foreground">Senast uppdaterad: 27 mars 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">1. Introduktion</h2>
            <p>
              Välkommen till Börsanalys.se. Genom att använda vår webbplats och våra tjänster godkänner du dessa användarvillkor i sin helhet. Om du inte accepterar dessa villkor bör du inte använda webbplatsen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">2. Ingen finansiell rådgivning</h2>
            <p>
              Innehållet på Börsanalys.se är endast avsett för informations- och utbildningsändamål. Ingenting på denna webbplats ska betraktas som finansiell rådgivning, köprekommendation eller investeringsanalys. 
            </p>
            <p className="font-bold">
              Att investera i aktier och andra finansiella instrument innebär alltid en risk. Historisk avkastning är ingen garanti för framtida vinst. Du är själv ansvarig för dina investeringsbeslut.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">3. Immateriella rättigheter</h2>
            <p>
              Allt innehåll på webbplatsen, inklusive texter, analyser, grafer och logotyper, tillhör Börsanalys.se eller våra licensgivare och är skyddat av upphovsrättslagen. Du får inte kopiera, distribuera eller publicera vårt innehåll utan skriftligt tillstånd.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">4. Användarkonto</h2>
            <p>
              Om du skapar ett konto på Börsanalys.se är du ansvarig för att hålla dina inloggningsuppgifter säkra. Vi förbehåller oss rätten att stänga av konton som missbrukar tjänsten eller bryter mot våra villkor.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">5. Ansvarsbegränsning</h2>
            <p>
              Börsanalys.se strävar efter att informationen på webbplatsen ska vara korrekt och uppdaterad, men vi lämnar inga garantier för dess fullständighet eller exakthet. Vi ansvarar inte för eventuella förluster som uppstår till följd av användning av informationen på webbplatsen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">6. Ändringar av villkor</h2>
            <p>
              Vi kan komma att uppdatera dessa villkor från tid till annan. Den senaste versionen finns alltid tillgänglig på denna sida.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
