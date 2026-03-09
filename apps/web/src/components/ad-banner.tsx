'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [hasError, setHasError] = useState(false);
  const [isContentPage, setIsContentPage] = useState(false);

  useEffect(() => {
    // Verificar que estamos en una página con contenido sustancial
    const checkContentPage = () => {
      if (typeof window === 'undefined') return false;
      
      // Verificar que hay contenido suficiente en la página
      const mainContent = document.querySelector('main') || document.body;
      const textContent = mainContent.textContent || '';
      const wordCount = textContent.trim().split(/\s+/).length;
      
      // Requerir al menos 200 palabras de contenido para mostrar anuncios
      return wordCount >= 200;
    };

    setIsContentPage(checkContentPage());
  }, []);

  useEffect(() => {
    // No inicializar anuncios si no hay contenido suficiente
    if (!isContentPage) {
      return;
    }

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
      setHasError(true);
      // Errores comunes en desarrollo - solo mostrar en consola
      if (process.env.NODE_ENV === 'development') {
        console.log('AdSense (desarrollo):', err instanceof Error ? err.message : err);
      }
    }
  }, [isContentPage]);

  // No renderizar nada si no hay contenido suficiente
  if (!isContentPage) {
    return null;
  }

  // No mostrar contenedor si hubo error
  if (hasError) {
    return null;
  }

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
