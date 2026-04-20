import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AnalysisTopAd = () => {
  useEffect(() => {
    // Load script if not present
    const scriptId = 'adsense-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3092389795493036";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Push ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  return (
    <div className="analysis-top-ad-wrapper mt-6 mb-8 w-full overflow-hidden flex justify-center">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3092389795493036"
        data-ad-slot="9323485761"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AnalysisTopAd;
