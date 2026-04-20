import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AnalysisTopAd = () => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    // Only initialize once per mount and if the element is ready
    if (adRef.current && !initialized.current) {
      initialized.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, []);

  return (
    <div className="analysis-top-ad-wrapper mt-6 mb-8 w-full overflow-hidden flex justify-center">
      {/* 
          Reserved space with responsive min-height:
          - Mobile: ~100px
          - Desktop: ~280px (common for top display ads)
      */}
      <div className="w-full min-h-[100px] md:min-h-[280px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200/50">
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-3092389795479215"
          data-ad-slot="7647291421"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AnalysisTopAd;
