import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <Helmet>
        <title>Integritetspolicy | Börsanalys.se</title>
        <meta name="description" content="Integritetspolicy för Börsanalys.se" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold tracking-tight">Integritetspolicy</h1>
          <p className="text-muted-foreground">Senast uppdaterad: 27 mars 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">1. Introduktion</h2>
            <p>
              Din integritet är viktig för oss på Börsanalys.se. Denna policy förklarar hur vi samlar in, använder och skyddar dina personuppgifter när du använder vår webbplats och våra tjänster.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">2. Vilka uppgifter vi samlar in</h2>
            <p>
              Vi samlar in information som du tillhandahåller direkt till oss, till exempel när du skapar ett konto eller anmäler dig till vårt nyhetsbrev. Detta kan inkludera:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Namn</li>
              <li>E-postadress</li>
              <li>Profilbild (om du väljer att ladda upp en eller logga in via tredjepart)</li>
              <li>Användarinställningar och bevakningslistor</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">3. Hur vi använder dina uppgifter</h2>
            <p>
              Vi använder dina personuppgifter för att:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tillhandahålla, underhålla och förbättra våra tjänster</li>
              <li>Skicka nyhetsbrev och marknadsuppdateringar (om du har anmält dig)</li>
              <li>Kommunicera med dig gällande ditt konto eller tekniska frågor</li>
              <li>Anpassa din upplevelse på webbplatsen</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">4. Laglig grund för behandling</h2>
            <p>
              Vi behandlar dina personuppgifter baserat på:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ditt samtycke (t.ex. för nyhetsbrev)</li>
              <li>Uppfyllande av avtal (t.ex. för att tillhandahålla tjänsterna du registrerat dig för)</li>
              <li>Vårt berättigade intresse (t.ex. för att förbättra webbplatsens säkerhet och funktionalitet)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">5. Hur länge vi sparar dina uppgifter</h2>
            <p>
              Vi sparar dina personuppgifter så länge det är nödvändigt för att uppfylla de ändamål som beskrivs i denna policy, eller så länge som krävs enligt lag.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">6. Dina rättigheter</h2>
            <p>
              Du har rätt att begära tillgång till, rättelse eller radering av dina personuppgifter. Du kan också när som helst återkalla ditt samtycke till marknadsföring genom att klicka på avregistreringslänken i våra e-postmeddelanden.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">7. Cookies</h2>
            <p>
              Vi använder cookies för att förbättra användarupplevelsen och analysera trafik. Du kan styra användningen av cookies via inställningarna i din webbläsare.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">8. Kontakta oss</h2>
            <p>
              Om du har frågor om vår integritetspolicy eller hur vi hanterar dina personuppgifter, vänligen kontakta oss på <a href="mailto:info@borsanalys.se" className="text-primary hover:underline">info@borsanalys.se</a>.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
