import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  isSearchOpen: boolean;
  searchPosition: "top" | "hero";
  openSearch: (position?: "top" | "hero") => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchPosition, setSearchPosition] = useState<"top" | "hero">("top");

  const openSearch = (position: "top" | "hero" = "top") => {
    setSearchPosition(position);
    setIsSearchOpen(true);
  };
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <SearchContext.Provider value={{ isSearchOpen, searchPosition, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
