import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeColor = "emerald";

interface ThemeContextType {
  themeColor: ThemeColor;
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
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor] = useState<ThemeColor>("emerald");

  useEffect(() => {
    const root = document.documentElement;
    const colorValue = colors[themeColor];
    
    // Update the CSS variable
    root.style.setProperty("--primary", colorValue);
    
    localStorage.setItem("theme-color", themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
