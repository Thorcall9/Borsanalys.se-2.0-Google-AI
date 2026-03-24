import React from 'react';

interface VerdictBoxProps {
  verdict: string;
  target: string;
  description: string;
  date: string;
  accentColor?: string;
}

export default function VerdictBox({ 
  verdict, 
  target, 
  description, 
  date, 
  accentColor = "#76B900" 
}: VerdictBoxProps) {
  return (
    <div className="bg-white border border-black/5 rounded-2xl p-8 text-center relative overflow-hidden shadow-sm">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 blur-[80px] pointer-events-none opacity-10"
        style={{ backgroundColor: accentColor }}
      />
      <div className="text-[11px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-4">
        Investeringsbeslut
      </div>
      <div className="text-7xl font-serif font-bold tracking-widest" style={{ color: accentColor }}>
        {verdict}
      </div>
      <div className="text-2xl font-serif font-bold mt-2" style={{ color: accentColor }}>
        Målpris: {target}
      </div>
      <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-md mx-auto italic">
        {description}
      </p>
      <div className="mt-8 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        Analys datum: {date} · Ej finansiell rådgivning
      </div>
    </div>
  );
}
