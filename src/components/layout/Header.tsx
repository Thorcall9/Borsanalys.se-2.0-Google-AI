import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu, X, Search, ChevronRight, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import GlobalSearch from "../GlobalSearch";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const location = useLocation();
  const { user, openLoginModal, logout } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch("top");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  const navItems = [
    { label: "Analyser", path: "/analys" },
    { label: "Guider", path: "/guider" },
    { label: "Börsskola", path: "/skola" },
    { label: "Makro", path: "/marknad" },
    { label: "Verktyg", path: "/verktyg" },
    { label: "Om oss", path: "/om-oss" },
  ];

  return (
    <header className="sticky top-0 z-[110] bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary/20">
            <TrendingUp size={20} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tighter text-foreground">
            Börsanalys<span className="text-primary">.se</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[13px] font-bold uppercase tracking-widest transition-all hover:text-primary relative group/nav ${
                location.pathname.startsWith(item.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/nav:w-full ${
                location.pathname.startsWith(item.path) ? "w-full" : ""
              }`} />
            </Link>
          ))}
          <div className="w-px h-4 bg-border mx-2" />
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profil" className="flex items-center gap-2 group cursor-pointer">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-border" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UserIcon size={16} />
                  </div>
                )}
                <span className="text-sm font-black text-foreground transition-colors hidden lg:inline">
                  {user.displayName?.split(' ')[0]}
                </span>
              </Link>
              <button 
                onClick={logout}
                className="text-muted-foreground hover:text-red-500 transition-colors"
                title="Logga ut"
                aria-label="Logga ut"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={openLoginModal}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <LogIn size={18} />
              Logga in
            </button>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openSearch("top")}
            className="w-10 h-10 flex items-center justify-center bg-muted/50 hover:bg-accent text-muted-foreground hover:text-primary transition-colors ml-2 rounded-full border border-border/50 relative group"
            title="Sök (⌘K)"
            aria-label="Sök efter bolag och analyser"
          >
            <Search size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card border border-border px-1.5 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
              Sök (⌘K)
            </span>
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openSearch("top")}
            className="w-10 h-10 flex items-center justify-center bg-muted/50 text-muted-foreground hover:text-primary rounded-full border border-border/50"
            aria-label="Öppna sök"
          >
            <Search size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center bg-muted/50 text-muted-foreground hover:text-primary rounded-full border border-border/50" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-full left-0 w-full p-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between text-lg font-serif font-bold py-2 border-b border-border/50"
            >
              {item.label}
              <ChevronRight size={18} className="text-muted-foreground" />
            </Link>
          ))}
          
          <div className="pt-4">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <UserIcon size={20} />
                    </div>
                  )}
                  <span className="font-black">{user.displayName}</span>
                </div>
                <button onClick={logout} className="text-red-500 font-bold text-sm">Logga ut</button>
              </div>
            ) : (
              <button 
                onClick={() => { openLoginModal(); setIsMenuOpen(false); }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                Logga in
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
