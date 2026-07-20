import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import SEO from "../components/SEO";
import { ArrowRight, CheckCircle2, ChevronRight, Loader2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import RecentPublications from "../components/community/RecentPublications";

const revolutionRaceCategories = [
  { label: "Företagsöversikt", score: 4.0 },
  { label: "Affärsmodell", score: 4.0 },
  { label: "Konkurrensfördelar", score: 4.0 },
  { label: "Finansiell utveckling", score: 4.0 },
  { label: "Fundamental värdering", score: 2.0 },
  { label: "Potentiella kursdrivare", score: 3.0 },
  { label: "Risker", score: 4.0 },
];

const memberBenefits = [
  "Spara analyser och checklistor",
  "Följ bolag som är intressanta för dig",
  "Få tillgång till rapportkommentarer",
  "Rösta fram nästa analys",
];

const scenarios = [
  { label: "Bull", price: "74 kr", note: "Högre tillväxt och bättre värdering", tone: "positive" },
  { label: "Base", price: "58 kr", note: "Försiktig återhämtning enligt grundcaset", tone: "neutral" },
  { label: "Bear", price: "48 kr", note: "Lägre tillväxt och pressad multipel", tone: "caution" },
] as const;

const scenarioStyles = {
  positive: "border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-400",
  neutral: "border-border text-foreground",
  caution: "border-red-200 text-red-700 dark:border-red-900 dark:text-red-400",
} as const;

const ScoreCard = React.lazy(() => import("../components/ScoreCard").then((module) => ({ default: module.ScoreCard })));
const Newsletter = React.lazy(() => import("../components/Newsletter").then((module) => ({ default: module.Newsletter })));
const MethodologySection = React.lazy(() => import("../components/MethodologySection"));

const SectionLoader = () => (
  <div className="flex w-full items-center justify-center py-20 opacity-20">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

export default function Home() {
  const { openLoginModal } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hem - Professionella Aktieanalyser & AI-insikter"
        description="Börsanalys.se erbjuder professionella aktieanalyser drivna av data och AI. Hitta nästa vinnare på börsen med våra djupgående investment cases."
      />
      <Hero />

      <section className="homepage-section" aria-labelledby="featured-analysis-title">
        <div className="homepage-container">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <p className="section-kicker">Utvalda analyser</p>
              <h2 id="featured-analysis-title" className="text-3xl font-bold tracking-tight md:text-4xl">
                RevolutionRace: Friluftskläder med direktförsäljning och stark lönsamhet
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Nya förklaringsmodellen visar 25/35 poäng: hög bolagskvalitet, nettokassa och stark ställning på de tyskspråkiga marknaderna, men värderingen kräver att tillväxten tar fart igen.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/analys/revolutionrace-2026" className="secondary-action">
                Läs hela analysen <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <React.Suspense fallback={<SectionLoader />}>
            <ScoreCard
              companyName="RevolutionRace"
              ticker="RVRC.ST"
              totalScore={3.6}
              categories={revolutionRaceCategories}
              linkTo="/analys/revolutionrace-2026"
            />
          </React.Suspense>
        </div>
      </section>

      <section className="homepage-section bg-section-alt" aria-labelledby="why-us-title">
        <div className="homepage-container">
          <div className="max-w-2xl">
            <p className="section-kicker">Varför Börsanalys.se</p>
            <h2 id="why-us-title" className="text-3xl font-bold tracking-tight md:text-4xl">Ett tydligare underlag för dina egna beslut</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">Vi samlar de frågor som hjälper dig att förstå vad som driver bolaget, vad aktien kostar och vad som kan förändra caset.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Från bolag till aktie", "Affärsmodell, finansiell utveckling och värdering presenteras i samma sammanhang."],
              ["Samma frågor varje gång", "Ett konsekvent ramverk gör det enklare att jämföra analysen av olika bolag."],
              ["Riskerna får plats", "Vi lyfter vad som kan förändra investeringscaset, inte bara vad som talar för det."],
            ].map(([title, description]) => (
              <article key={title} className="surface-card surface-card-hover p-6">
                <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <React.Suspense fallback={<SectionLoader />}>
        <MethodologySection />
      </React.Suspense>

      <section className="homepage-section" aria-labelledby="analysis-example-title">
        <div className="homepage-container">
          <div className="max-w-2xl">
            <p className="section-kicker">Exempel</p>
            <h2 id="analysis-example-title" className="text-3xl font-bold tracking-tight md:text-4xl">Så kan en sammanvägd bedömning se ut</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">En analys gör kvalitet, värdering och möjliga utfall konkreta utan att dölja osäkerheten i caset.</p>
          </div>
          <div className="surface-card mt-10 p-6 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">RevolutionRace · RVRC.ST</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">Samlad bedömning</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Bolagskvalitet och balansräkning är styrkor, medan värderingen kräver en tydligare återhämtning i tillväxten.</p>
              </div>
              <div className="shrink-0 rounded-xl bg-primary/10 px-4 py-3 text-center text-primary">
                <span className="block text-2xl font-bold">25 / 35</span>
                <span className="text-xs font-semibold">BEVAKA</span>
              </div>
            </div>
            <div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Kvalitet</p>
                <div className="mt-2 flex text-primary" aria-label="Kvalitet: fem av fem stjärnor">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-5 w-5 fill-current" />)}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Värdering</p>
                <div className="mt-2 flex" aria-label="Värdering: två av fem stjärnor">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} className={`h-5 w-5 ${index < 2 ? "fill-current text-primary" : "fill-muted text-muted-foreground/30"}`} />)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {scenarios.map((scenario) => (
              <article key={scenario.label} className={`surface-card p-6 ${scenarioStyles[scenario.tone]}`}>
                <p className="text-sm font-semibold">{scenario.label}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight">{scenario.price}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scenario.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section bg-section-alt">
        <div className="homepage-container">
          <RecentPublications />
        </div>
      </section>

      <React.Suspense fallback={<SectionLoader />}>
        <Newsletter />
      </React.Suspense>

      <section className="homepage-section" aria-labelledby="member-benefits-title">
        <div className="homepage-container">
          <div className="surface-card grid gap-10 p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
            <div>
              <p className="section-kicker">För medlemmar</p>
              <h2 id="member-benefits-title" className="text-3xl font-bold tracking-tight md:text-4xl">Gör analysläsningen till din egen</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">Samla din analysläsning på ett ställe och följ bolag över tid.</p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openLoginModal} className="primary-action mt-7">
                Bli medlem gratis
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <ul className="space-y-4">
              {memberBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-foreground p-8 text-center text-background md:p-16"
          >
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                  Följ bolagen som betyder något för dig
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-background/70 md:text-lg">
                  Spara analyser och följ bolag så att dina viktigaste investeringscase alltid finns samlade.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    onClick={openLoginModal}
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:w-auto"
                  >
                    Skapa gratis konto
                  </button>
                  <Link to="/analys" className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-background/70 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                    Utforska analyser <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
