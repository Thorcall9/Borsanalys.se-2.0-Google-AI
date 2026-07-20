import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, TrendingUp, UserRound, X, LogIn, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import GlobalSearch from "../GlobalSearch";

const navItems = [
  { label: "Analyser", path: "/analys" },
  { label: "Guider", path: "/guider" },
  { label: "Börsskola", path: "/skola" },
  { label: "Makro", path: "/marknad" },
  { label: "Verktyg", path: "/verktyg" },
  { label: "Om oss", path: "/om-oss" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const location = useLocation();
  const { user, loading, openLoginModal, openSignupModal, logout } = useAuth();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch("top");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  const isActive = (path: string) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand-lockup" aria-label="Börsanalys.se startsida">
          <span className="brand-mark"><TrendingUp size={18} aria-hidden="true" /></span>
          <span className="brand-name">Börsanalys<span>.se</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Huvudnavigation">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`nav-link${isActive(item.path) ? " nav-link-active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="header-search-button" onClick={() => openSearch("top")} aria-label="Sök efter bolag, analyser eller guider">
            <Search size={16} aria-hidden="true" />
            <span>Sök bolag, analyser eller guider...</span>
            <kbd aria-hidden="true">⌘ K</kbd>
          </button>
          {loading ? <span className="header-loading" aria-hidden="true" /> : user ? (
            <div className="header-user-actions">
              <Link to="/profil" className="header-profile-link" aria-label="Öppna profil">
                {user.photoURL ? <img src={user.photoURL} alt="" /> : <span><UserRound size={15} aria-hidden="true" /></span>}
                <strong>{user.displayName?.split(" ")[0]}</strong>
              </Link>
              <button type="button" onClick={logout} className="header-icon-button" aria-label="Logga ut"><LogOut size={16} /></button>
            </div>
          ) : (
            <button type="button" className="header-login-button" onClick={openLoginModal}><LogIn size={16} aria-hidden="true" />Logga in</button>
          )}
          {!user && !loading && <button type="button" className="header-signup-button" onClick={openSignupModal}>Bli medlem gratis</button>}
        </div>

        <div className="mobile-header-actions">
          <button type="button" className="mobile-header-button" onClick={() => openSearch("top")} aria-label="Öppna sök"><Search size={20} /></button>
          <button type="button" className="mobile-header-button" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />

      {isMenuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobilnavigation">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={`mobile-menu-link${isActive(item.path) ? " mobile-menu-link-active" : ""}`}>
                {item.label}<ChevronRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-auth">
            {loading ? <span className="header-loading" aria-hidden="true" /> : user ? (
              <>
                <Link to="/profil" onClick={() => setIsMenuOpen(false)} className="mobile-profile-link"><UserRound size={18} />{user.displayName || "Din profil"}</Link>
                <button type="button" className="mobile-logout-button" onClick={() => { logout(); setIsMenuOpen(false); }}><LogOut size={16} />Logga ut</button>
              </>
            ) : (
              <>
                <button type="button" className="secondary-action mobile-auth-button" onClick={() => { openLoginModal(); setIsMenuOpen(false); }}>Logga in</button>
                <button type="button" className="primary-action mobile-auth-button" onClick={() => { openSignupModal(); setIsMenuOpen(false); }}>Bli medlem gratis</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
