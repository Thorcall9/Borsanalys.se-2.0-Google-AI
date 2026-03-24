import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu, X, Search, ChevronRight, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import GlobalSearch from "../GlobalSearch";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch } = useSearch();
  const location = useLocation();
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
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
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <TrendingUp size={20} className="text-white" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">
            Börsanalys<span className="text-primary">.se</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.startsWith(item.path) ? "text-primary" : "text-muted"
              }`}
            >
              {item.label}
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
                <span className="text-sm font-medium text-muted group-hover:text-primary transition-colors hidden lg:inline">
                  {user.displayName?.split(' ')[0]}
                </span>
              </Link>
              <button 
                onClick={logout}
                className="text-muted hover:text-red-500 transition-colors"
                title="Logga ut"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <LogIn size={18} />
              Logga in
            </button>
          )}
          
          <button 
            onClick={openSearch}
            className="text-muted hover:text-primary transition-colors ml-2 relative group"
            title="Sök (⌘K)"
          >
            <Search size={18} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card border border-border px-1.5 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Sök (⌘K)
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={openSearch}
            className="text-muted hover:text-primary transition-colors"
          >
            <Search size={20} />
          </button>
          <button className="text-muted" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              <ChevronRight size={18} className="text-muted" />
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
                  <span className="font-bold">{user.displayName}</span>
                </div>
                <button onClick={logout} className="text-red-500 font-bold text-sm">Logga ut</button>
              </div>
            ) : (
              <button 
                onClick={() => { login(); setIsMenuOpen(false); }}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                Logga in med Google
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
