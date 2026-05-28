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
        }`}>Information och intressekonflikter</h3>
        
        <div className="space-y-4 font-medium leading-relaxed text-sm md:text-base opacity-80">
          <p>
            Analysen är framtagen av Börsanalys.se i informations- och utbildningssyfte och utgör inte personlig investeringsrådgivning. Bedömningen bygger på offentligt tillgänglig information och speglar analytikerns uppfattning vid analystillfället. Aktiekurser, estimat och förutsättningar kan förändras efter publicering.
          </p>

          <p>
            Investeringar i aktier innebär risk. Du ansvarar själv för dina investeringsbeslut och bör göra en egen bedömning utifrån din ekonomi, tidshorisont och risktolerans.
          </p>

          <p>
            <strong className={isLight ? 'text-slate-700' : 'text-foreground/90'}>Analytikerns innehav:</strong> Inget innehav &nbsp;·&nbsp; <strong className={isLight ? 'text-slate-700' : 'text-foreground/90'}>Eventuella kommersiella relationer:</strong> Inga
          </p>
        </div>
      </div>
    </div>
  );
}
