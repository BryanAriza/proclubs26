'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'proclubs-intro';

export function AppIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || sessionStorage.getItem(STORAGE_KEY) === '1') return;
    setVisible(true);
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setVisible(false);
    }, 1700);
    return () => window.clearTimeout(timeout);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Entrar"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#0b1220] text-white"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 flex h-20 w-20 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full bg-amber-400/25 blur-2xl" />
            <svg viewBox="0 0 100 100" className="relative h-16 w-16">
              <path
                d="M50 6 L86 22 L86 52 Q86 78, 50 94 Q14 78, 14 52 L14 22 Z"
                fill="#fbbf24"
              />
              <path
                d="M50 18 L74 28 L74 50 Q74 68, 50 80 Q26 68, 26 50 L26 28 Z"
                fill="#0b1220"
              />
            </svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300"
          >
            EA SPORTS FC 27
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="mt-3 text-4xl font-black tracking-tight"
          >
            ProClubs Stats
          </motion.p>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
