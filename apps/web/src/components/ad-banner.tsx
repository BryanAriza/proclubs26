'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdInitialized = useRef(false);

  useEffect(() => {
    // Evitar doble inicialización en React StrictMode (desarrollo)
    if (isAdInitialized.current) {
      return;
    }

    try {
      // Verificar que el elemento existe y tiene dimensiones
      if (adRef.current && adRef.current.offsetWidth > 0) {
        // Inicializar anuncio de AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isAdInitialized.current = true;
      }
    } catch (err) {
      // Errores comunes en desarrollo - solo mostrar en consola
      if (process.env.NODE_ENV === 'development') {
        console.log('AdSense (desarrollo):', err instanceof Error ? err.message : err);
      }
    }
  }, []);

  return (
    <div className={`ad-container min-h-[50px] ${className}`} style={{ minWidth: '300px' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '50px' }}
        data-ad-client="ca-pub-5068650876748087"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
