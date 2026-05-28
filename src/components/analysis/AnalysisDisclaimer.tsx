import React from "react";
import { useLocation } from "react-router-dom";
import AnalysisDisclosure from "./AnalysisDisclosure.js";
import { analyses } from "../../data/analyses/index.js";
import { AnalysisDisclosureKey } from "../../data/analysisDisclosures.js";

interface AnalysisDisclaimerProps {
  className?: string;
  theme?: "light" | "dark";
}

// Map path slug to disclosure key
const slugToDisclosureKey: Record<string, AnalysisDisclosureKey> = {
  "investor-ab": "investor",
  "sbb": "sbb",
  "nvidia-fy2026": "nvidia",
  "apple": "apple",
  "microsoft": "microsoft",
  "novo-nordisk": "novoNordisk",
  "volvo": "volvo",
  "alphabet": "alphabet",
  "evolution-2025": "evolution",
  "swedbank-2025": "swedbank",
  "ericsson-2025": "ericsson",
  "handelsbanken-2025": "handelsbanken",
  "new-wave-group-april-2026": "newWave",
  "aq-group": "aqGroup",
  "nibe-industrier-2026": "nibe",
  "nordea-bank-2026": "nordea",
  "saab-2026": "saab"
};

export default function AnalysisDisclaimer({ className = "", theme = "dark" }: AnalysisDisclaimerProps) {
  const location = useLocation();
  const segments = location.pathname.split("/");
  const slug = segments[segments.length - 1]; // Get the last part of the URL path

  const disclosureKey = slugToDisclosureKey[slug];
  const analysisData = analyses[slug];

  if (disclosureKey && analysisData) {
    // Render the new premium interactive AnalysisDisclosure dynamically for the specific analysis
    return (
      <div className={className}>
        <AnalysisDisclosure
          disclosureKey={disclosureKey}
          analysisDate={analysisData.date}
          analysisPrice={analysisData.price}
          recommendation={analysisData.recommendation}
          fairValue={analysisData.targetPrice || analysisData.scenarios?.find(s => s.type === "base")?.value}
        />
      </div>
    );
  }

  // Fallback: General risk information for guides or other static content pages
  const isLight = theme === "light";
  
  return (
    <div className={`mt-16 p-8 md:p-10 rounded-[2rem] border transition-colors duration-300 ${
      isLight 
        ? "bg-slate-100/50 border-slate-200 text-slate-500" 
        : "bg-card border-border/50 text-muted-foreground"
    } ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 ${
          isLight ? "text-slate-900" : "text-foreground"
        }`}>Riskinformation</h3>
        
        <div className="space-y-4 font-medium leading-relaxed text-sm md:text-base opacity-80">
          <p>
            Innehållet på Börsanalys.se är framtaget för allmän information och utbildning. Innehållet utgör inte personlig investeringsrådgivning och är inte anpassat efter en enskild läsares ekonomiska situation, mål, placeringshorisont, kunskap eller risktolerans.
          </p>
          <p>
            Investeringar i aktier och andra finansiella instrument innebär risk. Värdet på en investering kan både öka och minska, och du kan förlora hela eller delar av det investerade kapitalet. Historisk utveckling är ingen garanti för framtida avkastning. Prognoser, estimat, scenarier och bedömda värdeintervall bygger på antaganden som kan visa sig vara felaktiga. Varje läsare ansvarar själv för sina investeringsbeslut och bör göra en egen bedömning innan en investering genomförs.
          </p>
        </div>
      </div>
    </div>
  );
}
