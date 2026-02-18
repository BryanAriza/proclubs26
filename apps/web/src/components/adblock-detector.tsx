'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export function AdBlockDetector() {
  // Estrategia mejorada: NO asumir bloqueo por defecto
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const detectAdBlock = async () => {
      if (typeof window === 'undefined') {
        setAdBlockDetected(false);
        setIsChecking(false);
        return;
      }

      // Esperar 2 segundos para que AdSense se cargue completamente
      await new Promise(resolve => setTimeout(resolve, 2000));

      const results = {
        scriptBlocked: false,
        fetchBlocked: false,
        baitBlocked: false,
        adsNotLoaded: false
      };

      // Check 1: Verificar si adsbygoogle está disponible en window
      try {
        results.scriptBlocked = typeof (window as any).adsbygoogle === 'undefined';
      } catch (e) {
        results.scriptBlocked = true;
      }

      // Check 2: Verificar errores de red al cargar el script
      try {
        const response = await fetch(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5068650876748087',
          { method: 'HEAD', cache: 'no-cache' }
        ).catch(() => null);
        
        results.fetchBlocked = response === null || response.status !== 200;
      } catch (e) {
        results.fetchBlocked = true;
      }

      // Check 3: Elemento "cebo" para detectar bloqueadores
      try {
        const bait = document.createElement('div');
        bait.innerHTML = '&nbsp;';
        bait.className = 'adsbox';
        bait.style.cssText = 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;';
        document.body.appendChild(bait);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        results.baitBlocked = 
          bait.offsetParent === null || 
          bait.offsetHeight === 0 || 
          window.getComputedStyle(bait).display === 'none';
        
        document.body.removeChild(bait);
      } catch (e) {
        results.baitBlocked = false; // No asumir bloqueo si hay error
      }

      // Check 4: Verificar si los anuncios se iniciaron
      try {
        const adsElements = document.querySelectorAll('.adsbygoogle');
        if (adsElements.length > 0) {
          // Verificar si al menos un anuncio se inicializó correctamente
          let initialized = false;
          adsElements.forEach(el => {
            const status = el.getAttribute('data-adsbygoogle-status');
            if (status === 'done' || (window as any).adsbygoogle?.loaded) {
              initialized = true;
            }
          });
          results.adsNotLoaded = !initialized;
        } else {
          results.adsNotLoaded = false; // No hay anuncios en DOM aún, no es un bloqueo
        }
      } catch (e) {
        results.adsNotLoaded = false;
      }

      // Contar cuántos checks detectaron bloqueo
      const blockCount = Object.values(results).filter(v => v === true).length;
      
      // LÓGICA MEJORADA: Requiere al menos 3 de 4 checks para confirmar bloqueo
      const isBlocked = blockCount >= 3;

      console.log('🛡️ AdBlock Detection:', {
        ...results,
        blockCount,
        isBlocked,
        threshold: '3/4 checks required'
      });

      setAdBlockDetected(isBlocked);
      setIsChecking(false);
    };

    detectAdBlock();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  // Solo mostrar si está verificando o si detectó AdBlock
  if (!isChecking && !adBlockDetected) {
    return null;
  }

  return (
    <AnimatePresence>
      {/* Mostrar loading durante verificación inicial */}
      {isChecking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-slate-600 font-semibold">Verificando...</p>
          </div>
        </motion.div>
      )}

      {/* Mostrar modal de AdBlock si se detectó */}
      {!isChecking && adBlockDetected && (
        <>
          {/* Overlay bloqueante */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
              {/* Ícono de alerta animado */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-full p-4 shadow-lg">
                    <ShieldAlert className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Título */}
              <h2 className="text-3xl font-black text-center mb-4 text-slate-900">
                ⚠️ Bloqueador de Anuncios Detectado
              </h2>

              {/* Mensaje */}
              <div className="space-y-4 mb-8 text-center">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Esta aplicación es <strong className="text-red-600">100% gratuita</strong> y se mantiene 
                  gracias a los anuncios.
                </p>
                <p className="text-base text-slate-600">
                  Para continuar disfrutando de las estadísticas de Pro Clubs, por favor:
                </p>
              </div>

              {/* Instrucciones */}
              <div className="bg-slate-50 rounded-xl p-6 mb-6 border-2 border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">📋 Pasos para continuar:</h3>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span>Desactiva tu bloqueador de anuncios (AdBlock, uBlock, etc.) para este sitio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span>Haz clic en el botón de abajo para recargar la página</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span>¡Disfruta de todas las estadísticas de EA Sports FC 26! ⚽</span>
                  </li>
                </ol>
              </div>

              {/* Botón de recarga */}
              <button
                onClick={handleRefresh}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Ya Desactivé el Bloqueador - Recargar</span>
              </button>

              {/* Nota adicional */}
              <p className="text-xs text-slate-500 text-center mt-6">
                💡 Los anuncios nos ayudan a mantener este servicio gratuito y actualizado
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
