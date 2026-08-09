import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Hero } from "../components/Hero";
import SEO from "../components/SEO";
import { ArrowRight, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import RecentPublications from "../components/community/RecentPublications";
import TrustStrip from "../components/home/TrustStrip";
import FeaturedAnalysisCard from "../components/home/FeaturedAnalysisCard";
import FreeMembershipCard from "../components/home/FreeMembershipCard";
import { getAnalysisPresentation, getFeaturedAnalysis } from "../components/home/analysisPresentation";
import { buildWebsiteJsonLd } from "../lib/seo/structuredData";

const memberBenefits = [
  "Spara analyser och checklistor",
  "Följ bolag som är intressanta för dig",
  "Få tillgång till rapportkommentarer",
  "Rösta fram nästa analys",
];

const Newsletter = React.lazy(() => import("../components/Newsletter").then((module) => ({ default: module.Newsletter })));
const MethodologySection = React.lazy(() => import("../components/MethodologySection"));

const SectionLoader = () => (
  <div className="flex w-full items-center justify-center py-20 opacity-20">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
);

export default function Home() {
  const { openLoginModal, openSignupModal } = useAuth();
  const featuredAnalysis = getAnalysisPresentation(getFeaturedAnalysis());

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Hem - Professionella Aktieanalyser & AI-insikter"
        description="Börsanalys.se erbjuder professionella aktieanalyser drivna av data och AI. Hitta nästa vinnare på börsen med våra djupgående investment cases."
        canonical="/"
        ogImage="/og-image.png"
        jsonLd={buildWebsiteJsonLd()}
      />
      <Hero />

      <section className="homepage-section homepage-trust-section" aria-label="Börsanalys.se i korthet">
        <div className="homepage-container">
          <TrustStrip />
        </div>
      </section>

      <section className="homepage-section homepage-featured-section" aria-labelledby="featured-analysis-title">
        <div className="homepage-container">
          <div className="featured-section-heading">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="featured-section-intro"
            >
              <p className="section-kicker">Se hur en analys ser ut</p>
              <h2 id="featured-analysis-title">Ett tydligare underlag för dina egna beslut</h2>
              <p>Jämför bolagskvalitet, värdering och risk i ett konsekvent ramverk.</p>
            </motion.div>
          </div>
          <FeaturedAnalysisCard analysis={featuredAnalysis} />
          <div className="mobile-membership-only">
            <FreeMembershipCard compact onSignup={openSignupModal} />
          </div>
          <div className="homepage-value-card">
            <div>
              <p className="section-kicker">För medlemmar</p>
              <h3>Bygg din egen bevakning</h3>
              <p>Samla bolagen du följer och hitta snabbt tillbaka när nya analyser eller rapportkommentarer publiceras.</p>
            </div>
            <button type="button" className="text-link" onClick={openSignupModal}>Se medlemsfördelarna <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
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
            <p className="section-kicker">V11.1 i praktiken</p>
            <h2 id="analysis-example-title" className="text-3xl font-bold tracking-tight md:text-4xl">Ett beslut som går att följa upp</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">I stället för ett samlat poängbetyg visar vi vad som avgör caset och vad som behöver hända härnäst.</p>
          </div>
          <div className="surface-card mt-10 p-6 md:p-8">
            <p className="section-kicker">Från analys till uppföljning</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">Det viktiga i ett sammanhang</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">V11.1 håller fokus på beslutet och på de signaler som kan förändra det över tid.</p>
            <div className="mt-8 grid gap-5 border-t border-border pt-6 md:grid-cols-3">
              {[
                ["Vår syn", "Rekommendation, värde och risk i ett sammanhang."],
                ["Investeringsinsikt", "Den viktigaste frågan som driver värdet framåt."],
                ["Nästa bevis", "Konkreta signaler att följa i kommande rapporter."],
              ].map(([title, description]) => (
                <article key={title}>
                  <h4 className="text-base font-bold tracking-tight text-primary">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
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
