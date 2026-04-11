import React from "react";
import AdUnit from "./AdUnit";

interface AdZoneProps {
  id: string;
  type?: "sidebar" | "banner" | "inline";
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
      default:
        return "w-full min-h-[100px] my-8";
    }
  };

  if (isPublic) {
    return (
      <div id={`ad-zone-${id}`} className={`${getStyles()} ${className}`}>
        <AdUnit minimal={discrete} showLabel={!discrete} />
      </div>
    );
  }

  // Fallback for development/preview
  return (
    <div 
      id={`ad-zone-${id}`}
      className={`${discrete ? '' : 'bg-muted/30 border border-dashed border-border rounded-3xl'} flex flex-col items-center justify-center p-6 text-center group hover:border-primary/30 transition-colors ${getStyles()} ${className}`}
    >
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
  );
};

export default AdZone;
