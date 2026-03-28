import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeColor = "emerald" | "forest";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const colors: Record<ThemeColor, string> = {
  emerald: "#10B981",
  forest: "#059669",
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem("theme-color") as ThemeColor;
    return saved && colors[saved] ? saved : "emerald";
  });

  useEffect(() => {
    const root = document.documentElement;
    const colorValue = colors[themeColor];
    
    // Update the CSS variable
    root.style.setProperty("--primary", colorValue);
    
    // Also update related variables if needed, or let Tailwind handle it if they are derived
    // In our index.css, --primary is used for --color-primary
    
    localStorage.setItem("theme-color", themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
