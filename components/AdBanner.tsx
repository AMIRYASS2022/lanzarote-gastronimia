import React, { useEffect } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  dataAdSlot, 
  dataAdFormat = 'auto', 
  dataFullWidthResponsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`my-6 text-center overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold block mb-1">Advertisement</span>
      <div className="bg-stone-100 border border-stone-200 rounded min-h-[100px] flex items-center justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-9271869468286466" 
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
        ></ins>
        {/* Placeholder text only visible if ad doesn't load/dev mode */}
        <span className="text-stone-300 text-xs hidden empty:block">Ad Space</span>
      </div>
    </div>
  );
};

export default AdBanner;