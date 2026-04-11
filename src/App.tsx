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
import { Loader2 } from "lucide-react";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Tools = lazy(() => import("./pages/Tools"));
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
const AdminSubscribers = lazy(() => import("./components/AdminSubscribers").then(module => ({ default: module.AdminSubscribers })));
const PreviewHeaderPage = lazy(() => import("./pages/PreviewHeader"));
const MindmapBlueprint = lazy(() => import("./components/Mindmap"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Analytics />
        <ErrorBoundary>
          <AuthProvider>
            <ThemeProvider>
              <SearchProvider>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/analys" element={<Analysis />} />
                      <Route path="/analys/:slug" element={<Analysis />} />
                      <Route path="/profil" element={<Profile />} />
                      <Route path="/aktier/:slug" element={<StockHub />} />
                      <Route path="/guider" element={<Guides />} />
                      <Route path="/guider/:slug" element={<GuideDetail />} />
                      <Route path="/skola" element={<Terminology />} />
                      <Route path="/marknad" element={<MacroDashboard />} />
                      <Route path="/kontakt" element={<Contact />} />
                      <Route path="/villkor" element={<Terms />} />
                      <Route path="/integritet" element={<Privacy />} />
                      <Route path="/verktyg" element={<Tools />} />
                      <Route path="/verktyg/rantakalkylator" element={<Tools />} />
                      <Route path="/om-oss" element={<About />} />
                      <Route path="/admin/subscribers" element={<AdminSubscribers />} />
                      <Route path="/preview-header" element={<PreviewHeaderPage />} />
                      <Route path="/methodology-blueprint" element={<MindmapBlueprint />} />
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
