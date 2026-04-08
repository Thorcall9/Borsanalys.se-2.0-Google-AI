import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Tools from "./pages/Tools";
import About from "./pages/About";
import StockHub from "./components/StockHub";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Terminology from "./pages/Terminology";
import MacroDashboard from "./pages/MacroDashboard";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { AdminSubscribers } from "./components/AdminSubscribers";
import PreviewHeaderPage from "./pages/PreviewHeader";
import { Analytics } from "@vercel/analytics/react";

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
                  </Routes>
                </Layout>
              </SearchProvider>
            </ThemeProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
