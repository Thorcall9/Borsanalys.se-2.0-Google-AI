import React from 'react';

interface AnalysisDisclaimerProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function AnalysisDisclaimer({ className = "", theme = 'dark' }: AnalysisDisclaimerProps) {
  const isLight = theme === 'light';
  
  return (
    <div className={`mt-16 p-8 md:p-10 rounded-[2rem] border transition-colors duration-300 ${
      isLight 
        ? 'bg-slate-100/50 border-slate-200 text-slate-500' 
        : 'bg-card border-border/50 text-muted-foreground'
    } ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 ${
          isLight ? 'text-slate-900' : 'text-foreground'
        }`}>2. Ingen finansiell rådgivning</h3>
        
        <div className="space-y-4 font-medium leading-relaxed text-sm md:text-base opacity-80">
          <p>
            Innehållet på Börsanalys.se är endast avsett för informations- och utbildningsändamål. 
            Ingenting på denna webbplats ska betraktas som finansiell rådgivning, köprekommendation eller investeringsanalys.
          </p>

          <p>
            Att investera i aktier och andra finansiella instrument innebär alltid en risk. 
            Historisk avkastning är ingen garanti för framtida vinst. 
            Du är själv ansvarig för dina investeringsbeslut.
          </p>
        </div>
      </div>
    </div>
  );
}
