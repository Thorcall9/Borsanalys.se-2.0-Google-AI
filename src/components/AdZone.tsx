import React from "react";

interface AdZoneProps {
  id: string;
  type?: "sidebar" | "banner" | "inline";
  className?: string;
}

const AdZone: React.FC<AdZoneProps> = ({ id, type = "inline", className = "" }) => {
  // In the future, you can integrate Google AdSense or other providers here.
  // For now, we show a subtle placeholder that matches the site's aesthetic.
  
  const getStyles = () => {
    switch (type) {
      case "sidebar":
        return "w-full aspect-[4/5] mb-8";
      case "banner":
        return "w-full h-32 my-12";
      case "inline":
        return "w-full h-24 my-8";
      default:
        return "w-full h-24 my-8";
    }
  };

  return (
    <div 
      id={`ad-zone-${id}`}
      className={`bg-muted/30 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-6 text-center group hover:border-primary/30 transition-colors ${getStyles()} ${className}`}
    >
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2 group-hover:text-primary/40 transition-colors">
        Annonsplats
      </div>
      <div className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest max-w-[120px]">
        Strategisk placering för framtida partnerskap
      </div>
      
      {/* 
        Example AdSense integration:
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
};

export default AdZone;
