import React from "react";
import { ArrowRight, Search, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSearch } from "../contexts/SearchContext";
import { useAuth } from "../contexts/AuthContext";
import FreeMembershipCard from "./home/FreeMembershipCard";
import MarketBackdrop from "./home/MarketBackdrop";

export const Hero: React.FC = () => {
  const { openSearch } = useSearch();
  const { openLoginModal, openSignupModal } = useAuth();

  return (
    <section className="homepage-section homepage-hero">
      <div className="homepage-container hero-layout">
        <div className="hero-content-column">
          <div className="hero-trust-pill"><ShieldCheck size={15} aria-hidden="true" /><span>OBEROENDE</span><b>·</b><span>DATADRIVEN</span><b>·</b><span>PÅLITLIG</span></div>
          <h1 className="hero-title">
            <span className="hero-title-line hero-title-line-primary">Förstå bolaget.</span>
            <span className="hero-title-line hero-title-line-accent">Investera smartare.</span>
          </h1>
          <p className="hero-lead">Förstå affärsmodell, värdering och risk innan ditt nästa investeringsbeslut.</p>
          <button
            type="button"
            onClick={() => openSearch("hero")}
            aria-label="Sök efter bolag, analyser eller guider"
            className="hero-search surface-card"
          >
            <Search size={20} aria-hidden="true" />
            <span>Sök efter bolag, analyser eller guider...</span>
            <kbd aria-hidden="true"><span>⌘</span><span>K</span></kbd>
          </button>
          <div className="hero-actions">
            <Link to="/analys" className="primary-action hero-primary-action">Utforska analyser <ArrowRight size={17} aria-hidden="true" /></Link>
            <motion.button type="button" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="secondary-action hero-secondary-action" onClick={openSignupModal}>
              <UserRound size={17} aria-hidden="true" />Skapa gratis konto
            </motion.button>
          </div>
          <p className="hero-reassurance"><UserRound size={14} aria-hidden="true" /> Spara analyser, följ bolag och påverka nästa analys.</p>
          <p className="hero-free-note">Gratis. Ingen betalningsinformation krävs.</p>
        </div>
        <div className="hero-visual-column">
          <MarketBackdrop />
          <FreeMembershipCard onSignup={openSignupModal} />
        </div>
      </div>
    </section>
  );
};
