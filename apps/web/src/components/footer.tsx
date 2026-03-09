'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mt-16 pt-8 border-t border-blue-200/30"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-br from-blue-50/40 to-indigo-50/30 backdrop-blur-sm border border-blue-200/30 rounded-2xl p-6 shadow-lg shadow-blue-100/30">
          <div className="text-center space-y-3">
            <p className="text-sm font-bold text-blue-900/90">
              Creado por <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">BryanTech</span>
            </p>
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} ProClubs Stats · Proyecto comunitario independiente
            </p>
            <div className="flex items-center justify-center gap-3 text-xs text-slate-500 flex-wrap">
              <Link 
                href="/about" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Acerca de
              </Link>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <Link 
                href="/guides" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Guías
              </Link>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Contacto
              </Link>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Privacidad
              </Link>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <Link 
                href="/terms" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Términos
              </Link>
            </div>
            <p className="text-xs text-slate-400 pt-2">
              No afiliado con EA Sports · Datos de API pública
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
