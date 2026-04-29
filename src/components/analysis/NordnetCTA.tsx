import React from 'react';
import { ExternalLink, TrendingUp, BarChart3, ShieldCheck } from 'lucide-react';

interface NordnetCTAProps {
  variant: 'high' | 'low';
}

const NordnetCTA: React.FC<NordnetCTAProps> = ({ variant }) => {
  const isHigh = variant === 'high';
  const affiliateLink = "https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1";

  const content = isHigh ? {
    badge: "Rekommenderad plattform",
    title: "Var kan man köpa aktien?",
    description: "För dig som vill gå från analys till handling är valet av plattform en viktig del av helheten. Vi använder själva Nordnet för delar av vårt kapital och uppskattar deras kombination av översikt, stabilitet och användarvänlighet.",
    buttonText: "Öppna konto och följ aktien",
    icon: <BarChart3 size={24} className="text-[#0052FF]" />,
    accentColor: "#0052FF"
  } : {
    badge: "Nästa steg",
    title: "Redo att agera på analysen?",
    description: "Har du gjort din egen bedömning och vill agera kan du använda Nordnet för att bevaka aktien, bygga en position eller strukturera ett långsiktigt sparande. En plattform som fungerar lika bra för nybörjare som för erfarna.",
    buttonText: "Kom igång med Nordnet",
    icon: <TrendingUp size={24} className="text-[#0052FF]" />,
    accentColor: "#0052FF"
  };

  return (
    <div className="not-prose my-16 p-8 md:p-12 bg-[#f0f7ff] border border-blue-100 rounded-[3rem] relative overflow-hidden group shadow-xl shadow-blue-500/5">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200/50 transition-colors duration-700"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center gap-3 text-[#0052FF]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-blue-50">
              {content.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">{content.badge}</span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-[#002B7A] leading-[1.1]">
              {content.title}
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              {content.description}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-blue-400" />
              Säker inloggning med BankID
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div>Innehåller affiliatelänk</div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[#0052FF] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#0041CC] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/20 group/btn"
          >
            {content.buttonText}
            <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NordnetCTA;

