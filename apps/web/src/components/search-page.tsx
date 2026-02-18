'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Search, Trophy, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/hooks/use-debounce';
import { clubsApi } from '@/lib/api';
import { platformLabel, type Platform } from '@proclubs/shared';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AdBanner from './ad-banner';

// Componente para manejar el crest con fallbacks automáticos
function ClubCrest({ 
  primaryUrl, 
  fallbackUrl, 
  clubName, 
  clubColors 
}: { 
  primaryUrl?: string; 
  fallbackUrl?: string | null; 
  clubName: string; 
  clubColors?: string[];
}) {
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleImageError = () => {
    if (!useFallback && fallbackUrl) {
      // console.log(`⚠️ Primary crest failed for ${clubName}, trying fallback...`);
      setUseFallback(true);
    } else {
      // console.warn(`❌ Crest not available for ${clubName}, using custom badge`);
      setImageError(true);
    }
  };

  // Obtener iniciales del club (máximo 3 letras)
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
      return name.substring(0, 3).toUpperCase();
    }
    return words.slice(0, 3).map(w => w[0]).join('').toUpperCase();
  };

  // Si no hay URL o falló todo, mostrar badge personalizado
  if (!primaryUrl || imageError) {
    const initials = getInitials(clubName);
    const primaryColor = clubColors?.[0] || '#3B82F6';
    const secondaryColor = clubColors?.[1] || '#6366F1';

    return (
      <motion.div
        className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id={`grad-${clubName.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {/* Escudo clásico */}
          <path
            d="M50 5 L85 20 L85 50 Q85 75, 50 95 Q15 75, 15 50 L15 20 Z"
            fill={`url(#grad-${clubName.replace(/\s/g, '')})`}
            stroke="white"
            strokeWidth="2"
          />
          {/* Iniciales del club */}
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fill="white"
            fontSize={initials.length === 1 ? "45" : initials.length === 2 ? "35" : "28"}
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            {initials}
          </text>
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 relative"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={useFallback && fallbackUrl ? fallbackUrl : primaryUrl}
        alt={`${clubName} crest`}
        className="w-full h-full object-contain rounded-lg drop-shadow-lg"
        onError={handleImageError}
      />
    </motion.div>
  );
}

// Mapeo de IDs de región a nombres
// Basado en regionIds comunes de EA Sports FC Pro Clubs
const regionNames: Record<number, string> = {
  4407629: 'América del Sur', // COKA FC (Colombia) usa este ID
  4407630: 'Europa',
  4407631: 'América del Norte',
  4407632: 'Asia',
  4407633: 'Oceanía',
  4407634: 'África',
  4407635: 'Medio Oriente',
};

const getRegionName = (regionId: number | null): string => {
  if (!regionId) return 'Desconocida';
  const regionName = regionNames[regionId];
  // Si encuentras un nuevo regionId, dime el número y el nombre del club para agregarlo
  return regionName || `Región ID: ${regionId}`;
};

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>('common-gen5');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const platformInfo = {
    'common-gen5': {
      name: 'Current Gen',
      consoles: ['PlayStation 5', 'Xbox Series X/S'],
      icon: '🎮',
      description: 'Nueva generación de consolas'
    },
    'common-gen4': {
      name: 'Last Gen',
      consoles: ['PlayStation 4', 'Xbox One'],
      icon: '🕹️',
      description: 'Generación anterior de consolas'
    },
    'nx': {
      name: 'Switch',
      consoles: ['Nintendo Switch'],
      icon: '🎯',
      description: 'Consola híbrida de Nintendo'
    }
  };

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['clubs', 'search', platform, debouncedSearch],
    queryFn: () => clubsApi.searchClubs(platform, debouncedSearch),
    enabled: debouncedSearch.length >= 2,
  });

  // Debug: Log results to console
  if (results.length > 0) {
    // console.log('🔍 Search results:', results);
    // console.log('🎨 First club customKit:', results[0]?.customKit);
    // console.log('🎨 First club ALL data:', JSON.stringify(results[0], null, 2));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Efectos de fondo futurista */}
      <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99, 102, 241, 0.03) 2px, rgba(99, 102, 241, 0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)'}}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-100/40 to-blue-100/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {/* Logo EA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-lg shadow-blue-100/50"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-xl blur-md"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-700 p-3 rounded-xl">
                <Trophy className="w-8 h-8 text-blue-100" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">EA SPORTS</div>
              <div className="text-2xl font-black text-slate-900 uppercase tracking-tight">SPORTS</div>
            </div>
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent uppercase tracking-tighter">
            FC 26
          </h1>
          <div className="h-1 w-32 mx-auto mb-6 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-full"></div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 font-semibold uppercase tracking-wider"
          >
            <Users className="inline mr-2 w-6 h-6 text-blue-500/70" />
            Rastrea las estadísticas de tu Pro Club
          </motion.p>
        </motion.div>

        {/* Anuncio Banner Superior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <AdBanner 
            dataAdSlot="2093958364" 
            dataAdFormat="horizontal"
            className="flex justify-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="mb-8 shadow-xl shadow-blue-100/50 border border-slate-200/50 bg-white/70 backdrop-blur-md">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-wide">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-xl blur-sm"></div>
                  <div className="relative p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                </div>
                Buscar Clubs
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="mb-4">
              <Tabs
                value={platform}
                onValueChange={(v) => setPlatform(v as Platform)}
                className="mb-3"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="common-gen5">
                    {platformLabel('common-gen5')}
                  </TabsTrigger>
                  <TabsTrigger value="common-gen4">
                    {platformLabel('common-gen4')}
                  </TabsTrigger>
                  <TabsTrigger value="nx">{platformLabel('nx')}</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Información de plataformas - Dinámica */}
              <motion.div 
                key={platform}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200/40 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{platformInfo[platform].icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-blue-900 text-sm mb-0.5">{platformInfo[platform].name}</p>
                    <p className="text-xs text-slate-600 mb-2">{platformInfo[platform].description}</p>
                    <div className="flex flex-wrap gap-2">
                      {platformInfo[platform].consoles.map((console, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center px-2.5 py-1 bg-white/70 border border-blue-100/50 rounded-full text-xs font-semibold text-blue-700"
                        >
                          {console}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="relative"
              whileTap={{ scale: 0.98 }}
            >
              <Search className="absolute left-5 top-5 h-5 w-5 text-blue-400" />
              <Input
                placeholder="Ingresa el nombre del club..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 h-16 text-lg font-semibold bg-white/80 border border-slate-200/50 text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-300/50 focus:ring-4 focus:ring-blue-100/50 transition-all rounded-xl shadow-sm"
              />
            </motion.div>

            <AnimatePresence>
              {debouncedSearch.length < 2 && searchTerm.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-sm text-blue-600/80 font-semibold"
                >
                  💡 Escribe al menos 2 caracteres para buscar
                </motion.p>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
        </motion.div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-12"
            >
              <div className="inline-block relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-400 border-t-transparent"></div>
                <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-blue-300 opacity-30"></div>
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold uppercase tracking-wide"
              >
                Buscando clubs...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && results.length > 0 && (
            <motion.div 
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid gap-6 md:grid-cols-2"
            >
              {results.map((club, index) => (
                <motion.div
                  key={club.clubId}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Link href={`/club/${platform}/${club.clubId}`}>
                    <Card className="group hover:shadow-2xl hover:shadow-blue-100/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-slate-200/50 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-200/50 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent pointer-events-none"></div>
                      <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-3 text-lg md:text-xl text-slate-900 group-hover:text-blue-900 transition-colors font-bold uppercase tracking-wide">
                          {/* Logo del club con fallback automático */}
                          <ClubCrest
                            primaryUrl={club.customKit?.crestUrl}
                            fallbackUrl={club.customKit?.crestUrlFallback}
                            clubName={club.name}
                            clubColors={club.customKit?.clubColors}
                          />
                          {club.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="text-sm text-slate-600 space-y-2">
                          {club.regionId && (
                            <p className="flex items-center gap-2 text-slate-600">
                              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></span>
                              <span className="font-semibold text-blue-900">{getRegionName(club.regionId)}</span>
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading &&
            debouncedSearch.length >= 2 &&
            results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="border-2 border-dashed border-blue-200/50 bg-gradient-to-br from-white/80 to-blue-50/30 backdrop-blur-sm shadow-lg shadow-blue-100/30">
                  <CardContent className="py-16 text-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      🔍
                    </motion.div>
                    <p className="text-xl bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent font-black uppercase tracking-wide">No se encontraron clubs</p>
                    <p className="text-sm text-slate-600 mt-2 font-medium">Intenta con otro término de búsqueda</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
