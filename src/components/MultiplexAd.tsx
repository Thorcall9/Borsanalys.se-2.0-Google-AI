import React, { useEffect } from 'react';

/**
 * MultiplexAd component for rendering Google AdSense "autorelaxed" ads.
 * These are typically placed at the bottom of content to show 
 * recommended content-style advertisements.
 */
const MultiplexAd: React.FC = () => {
  useEffect(() => {
    // We wrap this in a try-catch and check for window.adsbygoogle 
    // to prevent errors in development or if the script is blocked.
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn('AdSense Multiplex error:', e);
    }
  }, []);

  return (
    <div className="w-full mt-12 mb-8 border-t border-slate-100 pt-8 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-3092389795479215"
        data-ad-slot="4667293922"
      />
    </div>
  );
};

export default MultiplexAd;
