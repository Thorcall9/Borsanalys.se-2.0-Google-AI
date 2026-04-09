import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layoutKey?: string;
  className?: string;
  showLabel?: boolean;
}

export default function AdUnit({
  slot = '4630761792',
  format = 'auto',
  layoutKey,
  className = '',
  showLabel = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    // Endast initiera en gång per instans för att undvika hydratiseringsfel
    if (adRef.current && !initialized.current) {
      initialized.current = true;
      try {
        // @ts-ignore - adsbygoogle är externt injicerat via index.html
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div className={`w-full flex justify-center py-8 ${className}`}>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {showLabel && (
          <div className="mb-3 text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] w-full text-center border-b border-border/40 pb-2">
            Annons
          </div>
        )}
        <div className="min-h-[100px] w-full bg-muted/5 rounded-xl border border-border/40 flex items-center justify-center relative overflow-hidden transition-all duration-700 hover:border-primary/20">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '100px' }}
            data-ad-client="ca-pub-3092389795479215"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
            {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          />
        </div>
      </div>
    </div>
  );
}
