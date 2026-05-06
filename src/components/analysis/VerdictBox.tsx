import React from 'react';

interface VerdictBoxProps {
  verdict: string;
  target: string;
  description: string;
  date: string;
  accentColor?: string;
  buyZone?: string;
}

export default function VerdictBox({ 
  verdict, 
  target, 
  description, 
  date, 
  accentColor = "#10B981",
  buyZone
}: VerdictBoxProps) {
  return (
    <div className="bg-card border border-border rounded-[3rem] p-10 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-black/10">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 blur-[120px] pointer-events-none opacity-20"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative z-10">
        <div className="text-[10px] font-black tracking-[0.4em] text-muted-foreground/50 uppercase mb-8">
          Investeringsbeslut
        </div>
        <div className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4" style={{ color: accentColor }}>
          {verdict}
        </div>
        <div className="text-2xl md:text-4xl font-black tracking-tighter mb-10" style={{ color: accentColor }}>
          Målpris: {target}
          {buyZone && (
            <div className="text-sm font-black uppercase tracking-widest mt-2 opacity-70">
              Köpzon: {buyZone}
            </div>
          )}
        </div>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium italic mb-12">
          "{description}"
        </p>
        <div className="pt-10 border-t border-border/50 inline-block px-10">
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            Analyserat: {date} · Ej finansiell rådgivning
          </div>
        </div>
      </div>
    </div>
  );
}
