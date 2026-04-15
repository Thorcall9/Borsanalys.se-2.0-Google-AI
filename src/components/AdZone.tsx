import React from "react";
import AdUnit from "./AdUnit";

interface AdZoneProps {
  id: string;
  type?: "sidebar" | "banner" | "inline" | "card";
  className?: string;
  discrete?: boolean;
}


const AdZone: React.FC<AdZoneProps> = ({ id, type = "inline", className = "", discrete = false }) => {
  // SEO-annonser förberedda.
  // Byt denna till 'true' i framtiden när Google AdSense är redo för produktion.
  const SHOW_ADS_IN_PROD = true; // Nu aktiverad enligt önskemål
  
  // Visar platshållare enbart lokalt för dig, men förblir osynlig för användare i produktion.
  const isPublic = SHOW_ADS_IN_PROD;
  const isDev = process.env.NODE_ENV === 'development';
  const isVisible = isDev || isPublic;

  if (!isVisible) {
    return <div id={`ad-zone-${id}`} className="hidden" aria-hidden="true" />;
  }
  
  const getStyles = () => {
    switch (type) {
      case "sidebar":
        return "w-full aspect-[4/5] mb-8";
      case "banner":
        return "w-full min-h-[100px] my-12";
      case "inline":
        return "w-full min-h-[100px] my-8";
      case "card":
        return "w-full bg-card border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden shadow-xl shadow-black/5";
      default:
        return "w-full min-h-[100px] my-8";
    }
  };


  if (isPublic) {
    return (
      <div id={`ad-zone-${id}`} className={`${getStyles()} ${className}`}>
        <div className="relative z-10">
          <AdUnit minimal={discrete} showLabel={!discrete} />
        </div>
        {type === "card" && (
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] transition-colors duration-700 pointer-events-none" />
        )}
      </div>
    );
  }


  // Fallback for development/preview
  const fallbackStyles = discrete 
    ? '' 
    : type === "card"
      ? '' // getStyles covers it
      : 'bg-muted/30 border border-dashed border-border rounded-3xl p-6';

  return (
    <div 
      id={`ad-zone-${id}`}
      className={`${fallbackStyles} flex flex-col items-center justify-center text-center group transition-colors ${getStyles()} ${className}`}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
          discrete ? 'text-muted-foreground/10' : 'text-muted-foreground/40 group-hover:text-primary/40'
        }`}>
          Annonsplats
        </div>
        {!discrete && (
          <div className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest max-w-[120px] mt-2">
            Strategisk placering för framtida partnerskap
          </div>
        )}
      </div>
      {type === "card" && (
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
      )}
    </div>
  );
};


export default AdZone;
