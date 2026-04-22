import React from 'react';
import { ExternalLink, TrendingUp, Shield, BarChart3 } from 'lucide-react';

interface NordnetCTAProps {
  variant: 'high' | 'low';
}

const NordnetCTA: React.FC<NordnetCTAProps> = ({ variant }) => {
  const isHigh = variant === 'high';
  const affiliateLink = "https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1";

  const content = isHigh ? {
    title: "Var kan man köpa aktien?",
    description: "För dig som vill gå från analys till handling är valet av plattform en viktig del av helheten.\nVi använder själva Nordnet för delar av vårt kapital och uppskattar deras kombination av översikt, stabilitet och användarvänlighet.\n\nFör både långsiktigt sparande och mer aktiv portföljförvaltning är det ett av de mest kompletta alternativen på den svenska marknaden.",
    buttonText: "Öppna konto och följ aktien",
    icon: <BarChart3 size={20} className="text-[#1a3c6e]" />
  } : {
    title: "Nästa steg",
    description: "Har du gjort din egen bedömning och vill agera på analysen kan du använda Nordnet för att bevaka aktien, bygga en position eller strukturera ett långsiktigt sparande.\n\nDet är en plattform som fungerar lika bra för nybörjare som för mer erfarna investerare — med tydlig överblick och ett brett utbud av investeringsmöjligheter.",
    buttonText: "Kom igång med Nordnet",
    icon: <TrendingUp size={20} className="text-[#1a3c6e]" />
  };

  return (
    <div className={`my-12 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow group`}>
      <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
              {content.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 italic">
              {content.title}
            </h3>
          </div>
          
          <div className="text-slate-600 leading-relaxed max-w-2xl whitespace-pre-line font-medium opacity-90">
            {content.description}
          </div>
        </div>

        <div className="shrink-0 flex items-center">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a3c6e] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#152e55] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#1a3c6e]/20"
          >
            {content.buttonText}
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
      
      {/* Dynamic Accent Bar */}
      <div className="h-1.5 w-full bg-[#1a3c6e]/5 flex">
        <div className="h-full w-1/3 bg-[#1a3c6e]/10 group-hover:w-full transition-all duration-700 ease-in-out" />
      </div>
    </div>
  );
};

export default NordnetCTA;
