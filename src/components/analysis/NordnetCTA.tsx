import React from 'react';
import { ExternalLink, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

interface NordnetCTAProps {
  variant: 'high' | 'low';
}

const NordnetCTA: React.FC<NordnetCTAProps> = ({ variant }) => {
  const affiliateLink = "https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1";

  return (
    <div className="not-prose my-16 p-8 md:p-12 bg-[#f8fafc] border border-slate-200 rounded-[3rem] relative overflow-hidden group shadow-xl shadow-slate-200/50">
      {/* Subtle Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#10b981]/10 transition-colors duration-700"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-3 text-[#059669]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
              {variant === 'high' ? <BarChart3 size={24} /> : <TrendingUp size={24} />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Sparplattform</span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Var kan man följa aktien?
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              För dig som vill följa aktien vidare eller själv jämföra olika sparalternativ finns flera plattformar att välja mellan. Nordnet är en digital plattform för handel i aktier och fonder.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Innehåller affiliatelänk</span>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col gap-4 min-w-[280px]">
          <a
            href={affiliateLink}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 bg-[#10b981] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#059669] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-[#10b981]/20 group/btn"
          >
            Öppna konto hos Nordnet
            <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
          
          <div className="flex gap-2 text-slate-400">
            <AlertCircle size={12} className="shrink-0 mt-0.5 opacity-60" />
            <p className="text-[10px] leading-relaxed font-medium">
              Historisk avkastning är ingen garanti för framtida avkastning. Det finns risk att du inte får tillbaka de pengar du investerat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NordnetCTA;


