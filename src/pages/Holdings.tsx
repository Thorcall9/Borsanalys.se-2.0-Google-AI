import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const directHoldings = [
  { company: "Investor AB", instrument: "Investor A", type: "Direkt innehav" },
  { company: "Investor AB", instrument: "Investor B", type: "Direkt innehav" },
  { company: "New Wave Group AB", instrument: "New Wave B", type: "Direkt innehav" },
  { company: "RVRC Holding AB / RevolutionRace", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Alphabet Inc.", instrument: "Alphabet A", type: "Direkt innehav" },
  { company: "Bahnhof AB", instrument: "Bahnhof B", type: "Direkt innehav" },
  { company: "AQ Group AB", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Inwido AB", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Microsoft Corporation", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Taiwan Semiconductor Manufacturing Company", instrument: "ADR", type: "Direkt innehav" },
  { company: "Nvidia Corporation", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Apple Inc.", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Amazon.com, Inc.", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Europris ASA", instrument: "Aktie", type: "Direkt innehav" },
  { company: "Brødrene A & O Johansen A/S", instrument: "Aktie", type: "Direkt innehav" },
];

const fundHoldings = [
  { name: "Spiltan Aktiefond Investmentbolag", exposure: "Svenska investmentbolag" },
  { name: "Länsförsäkringar USA Index", exposure: "Amerikanska aktier" },
  { name: "Länsförsäkringar Global Index", exposure: "Globala aktier" },
  { name: "AMF Aktiefond Småbolag", exposure: "Svenska småbolag" },
  { name: "Spiltan Aktiefond Småland", exposure: "Svenska bolag med regional anknytning" },
  { name: "Spiltan Småbolagsfond", exposure: "Svenska småbolag" },
];

export default function Holdings() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <Helmet>
        <title>Aktieinnehav och intressekonflikter | Börsanalys.se</title>
        <meta name="description" content="Redovisning av aktieinnehav och potentiella intressekonflikter för Börsanalys.se" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold tracking-tight">Aktieinnehav och intressekonflikter</h1>
          <p className="text-muted-foreground">Senast uppdaterad: 28 maj 2026 kl. 23:26</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">Om denna sida</h2>
            <p>
              Börsanalys.se publicerar analyser av noterade bolag och finansiella instrument. För att läsaren ska kunna bedöma analysernas objektivitet redovisas här författarens direktägda aktier, fondinnehav och relevanta kommersiella relationer.
            </p>
            <p>
              Uppgifterna avser Carl Fredrik Thor, författare och ansvarig för analyserna på Börsanalys.se.
            </p>
            <p>
              Vid varje enskild bolagsanalys anges även om författaren har ett direkt eller relevant indirekt innehav i det analyserade bolaget vid analystillfället eller vid senaste väsentliga uppdatering.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Direktägda aktier och finansiella instrument</h2>
            <p>
              Författaren äger vid senaste uppdatering följande aktier eller aktierelaterade instrument:
            </p>
            
            <div className="overflow-x-auto border border-border/80 rounded-2xl bg-muted/10 shadow-sm backdrop-blur-sm">
              <table className="min-w-full divide-y divide-border/60">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-muted-foreground/80">Bolag</th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-muted-foreground/80">Instrument / aktieslag</th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-muted-foreground/80">Typ av innehav</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-sm">
                  {directHoldings.map((holding, index) => (
                    <tr key={index} className="hover:bg-muted/20 transition-colors duration-150">
                      <td className="px-6 py-3 font-semibold text-foreground">{holding.company}</td>
                      <td className="px-6 py-3 text-muted-foreground">{holding.instrument}</td>
                      <td className="px-6 py-3 text-muted-foreground">{holding.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Fondinnehav</h2>
            <p>
              Författaren äger vid senaste uppdatering följande fonder:
            </p>

            <div className="overflow-x-auto border border-border/80 rounded-2xl bg-muted/10 shadow-sm backdrop-blur-sm">
              <table className="min-w-full divide-y divide-border/60">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-muted-foreground/80">Fond</th>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-muted-foreground/80">Typ av exponering</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-sm">
                  {fundHoldings.map((fund, index) => (
                    <tr key={index} className="hover:bg-muted/20 transition-colors duration-150">
                      <td className="px-6 py-3 font-semibold text-foreground">{fund.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{fund.exposure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Fondinnehaven innebär att författaren kan ha indirekt exponering mot bolag som analyseras på Börsanalys.se. Fondinnehavens underliggande portföljbolag förändras över tid och följs inte löpande bolag för bolag i denna redovisning.
            </p>
            <p>
              Om ett fondinnehav eller annat indirekt innehav bedöms vara särskilt relevant för en enskild analys ska detta anges direkt i den aktuella analysen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">Relevant indirekt exponering</h2>
            <p>
              Författaren äger aktier i Investor AB, som är en betydande ägare i several noterade bolag. När ett bolag analyseras där Investor AB är en väsentlig ägare kan detta innebära indirekt ekonomisk exponering för författaren. Sådan relevant indirekt exponering ska anges i anslutning till den aktuella analysen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">Kommersiella relationer och affiliatelänkar</h2>
            <p>
              Börsanalys.se kan erhålla ersättning genom annonser och affiliatelänkar till externa tjänster, exempelvis nätmäklare eller privatekonomiska tjänster.
            </p>
            <p>
              Sådana annonser eller affiliatelänkar ska vara tydligt markerade och påverkar inte analysernas poängsättning, investeringsbeslut eller bedömda rimliga värde.
            </p>
            <p>
              Om Börsanalys.se eller författaren har mottagit ersättning från, utfört uppdrag åt eller haft annan kommersiell relation direkt till ett analyserat bolag ska detta anges tydligt i anslutning till den aktuella analysen.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">Handel och uppdateringar</h2>
            <p>
              Författarens innehav kan förändras över tid. Denna sida visar innehaven vid angivet uppdateringsdatum.
            </p>
            <p>
              Om författarens innehav i ett analyserat bolag förändras efter att en analys publicerats innebär det inte automatiskt att analysens tidigare bedömning har ändrats. Vid en väsentlig uppdatering av analysen ska däremot aktuell innehavsstatus framgå på nytt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-foreground">Kontakt</h2>
            <p>
              Frågor om innehav, intressekonflikter eller kommersiella relationer kan skickas till:
            </p>
            <p>
              Börsanalys.se<br />
              Carl Fredrik Thor<br />
              <a href="mailto:carl@borsanalys.se" className="text-primary hover:underline font-medium">carl@borsanalys.se</a>
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
