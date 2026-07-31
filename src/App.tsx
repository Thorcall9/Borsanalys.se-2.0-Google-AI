import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Loader2 } from "lucide-react";
import SEO from "./components/SEO";
import NotFound from "./pages/NotFound";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Tools = lazy(() => import("./pages/Tools"));
const HouseCalculatorPage = lazy(() => import("./pages/HouseCalculator"));
const Huskapital = lazy(() => import("./pages/Huskapital"));
const About = lazy(() => import("./pages/About"));
const StockHub = lazy(() => import("./components/StockHub"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideDetail = lazy(() => import("./pages/GuideDetail"));
const Terminology = lazy(() => import("./pages/Terminology"));
const MacroDashboard = lazy(() => import("./pages/MacroDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Holdings = lazy(() => import("./pages/Holdings"));
const AdminSubscribers = lazy(() => import("./components/AdminSubscribers").then(module => ({ default: module.AdminSubscribers })));
const RvrcPreview = lazy(() => import("./pages/RvrcPreview"));
const StockChecklist = lazy(() => import("./pages/StockChecklist"));
const MyChecklists = lazy(() => import("./pages/MyChecklists"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
  </div>
);

function InternalRoute({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <>
      <SEO title={title} noindex nofollow />
      {children}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
        <ErrorBoundary>
          <AuthProvider>
            <ThemeProvider>
              <SearchProvider>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/analys" element={<Analysis />} />
                      <Route path="/analys/revolutionrace-2026" element={<RvrcPreview />} />
                      <Route path="/analys/rvrc-2026" element={<RvrcPreview />} />
                      <Route path="/analys/:slug" element={<Analysis />} />
                      <Route path="/aktiechecklista" element={<StockChecklist />} />
                      <Route path="/mina-checklistor" element={<InternalRoute title="Mina checklistor"><MyChecklists /></InternalRoute>} />
                      <Route path="/profil" element={<InternalRoute title="Profil"><Profile /></InternalRoute>} />
                      <Route path="/aktier/:slug" element={<StockHub />} />
                      <Route path="/guider" element={<Guides />} />
                      <Route path="/guider/:slug" element={<GuideDetail />} />
                      <Route path="/borsskolan/:slug" element={<GuideDetail />} />
                      <Route path="/skola" element={<Terminology />} />
                      <Route path="/marknad" element={<MacroDashboard />} />
                      <Route path="/kontakt" element={<Contact />} />
                      <Route path="/villkor" element={<Terms />} />
                      <Route path="/integritet" element={<Privacy />} />
                      <Route path="/innehav" element={<Holdings />} />
                      <Route path="/intressekonflikter" element={<Holdings />} />
                      <Route path="/aktieinnehav-och-intressekonflikter" element={<Holdings />} />
                      <Route path="/verktyg" element={<Tools />} />
                      <Route path="/verktyg/huskalkylator" element={<HouseCalculatorPage />} />
                      <Route path="/huskapital" element={<Huskapital />} />
                      <Route path="/verktyg/rantakalkylator" element={<Tools />} />
                      <Route path="/verktyg/malsparandekalkylator" element={<Tools />} />
                      <Route path="/verktyg/dcf-kalkylator" element={<Tools />} />
                      <Route path="/verktyg/utdelningskalkylator" element={<Tools />} />
                      <Route path="/om-oss" element={<About />} />
                      <Route path="/admin/subscribers" element={<InternalRoute title="Administratör"><AdminSubscribers /></InternalRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </SearchProvider>
            </ThemeProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
