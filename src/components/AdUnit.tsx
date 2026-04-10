import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layoutKey?: string;
  className?: string;
  showLabel?: boolean;
}

export default function AdUnit({
  slot = '7332946752',
  format = 'fluid',
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
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {showLabel && (
          <div className="mb-2 text-[7px] font-bold text-slate-300/40 uppercase tracking-[0.3em] w-full text-center">
            Annons
          </div>
        )}
        <div className="min-h-[100px] w-full flex items-center justify-center relative overflow-hidden transition-all duration-700">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center', width: '100%', minHeight: '100px' }}
            data-ad-layout="in-article"
            data-ad-format={format}
            data-ad-client="ca-pub-3092389795479215"
            data-ad-slot={slot}
            {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          />
        </div>
      </div>
    </div>
  );
}
