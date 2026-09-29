'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ChevronRight, Search, Shield, Swords, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/hooks/use-debounce';
import { clubsApi } from '@/lib/api';
import { getRegionName } from '@proclubs/shared';
import { Input } from './ui/input';
import AdBanner from './ad-banner';

const DIVISION_LABELS: Record<number, string> = {
  1: 'Elite',
  2: 'División 1',
  3: 'División 2',
  4: 'División 3',
  5: 'División 4',
  6: 'División 5',
};

function ClubCrest({
  primaryUrl,
  fallbackUrl,
  clubName,
  clubColors,
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
      setUseFallback(true);
    } else {
      setImageError(true);
    }
  };

  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return name.substring(0, 3).toUpperCase();
    return words.slice(0, 3).map((word) => word[0]).join('').toUpperCase();
  };

  if (!primaryUrl || imageError) {
    const initials = getInitials(clubName);
    const primaryColor = clubColors?.[0] || '#1e293b';
    const secondaryColor = clubColors?.[1] || '#334155';

    return (
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <linearGradient id={`grad-${clubName.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L85 20 L85 50 Q85 75, 50 95 Q15 75, 15 50 L15 20 Z"
            fill={`url(#grad-${clubName.replace(/\s/g, '')})`}
          />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="white"
            fontSize={initials.length > 2 ? '24' : '32'}
            fontWeight="700"
            fontFamily="Inter, Arial, sans-serif"
          >
            {initials}
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
      <img
        src={useFallback && fallbackUrl ? fallbackUrl : primaryUrl}
        alt=""
        className="h-full w-full object-contain"
        onError={handleImageError}
      />
    </div>
  );
}

export function SearchPage() {
  const [platform, setPlatform] = useState<'common-gen5' | 'nx'>('common-gen5');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const platforms: Array<{
    id: 'common-gen5' | 'nx';
    name: string;
    detail: string;
  }> = [
    { id: 'common-gen5', name: 'Cross-Play', detail: 'PS5 · Xbox Series · PC' },
    { id: 'nx', name: 'Switch 2', detail: 'Nintendo Switch 2' },
  ];

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['clubs', 'search', platform, debouncedSearch],
    queryFn: () => clubsApi.searchClubs(platform, debouncedSearch),
    enabled: debouncedSearch.length >= 2,
  });

  return (
    <div className="min-h-screen bg-[#f3f5f7]">
      <section className="relative overflow-hidden bg-[#0b1220] text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="container relative mx-auto max-w-5xl px-4 pb-10 pt-14 md:pb-12 md:pt-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            EA SPORTS FC 27 · Clubs
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-black tracking-tight md:text-6xl">
            Encuentra tu club
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
            División actual, récord y jugadores de The Clubhouse. Los datos salen de la API pública de EA.
          </p>
        </motion.div>
      </section>

      <div className="relative z-10 bg-[#f3f5f7] pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-5xl bg-white p-4 shadow-xl shadow-slate-900/10 sm:mt-5 sm:w-[calc(100%-2rem)] sm:rounded-3xl sm:border sm:border-slate-200 md:p-6"
        >
          <div className="grid grid-cols-2 items-stretch gap-2">
            {platforms.map((item) => {
              const selected = platform === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlatform(item.id)}
                  className={`min-w-0 rounded-2xl px-3 py-3 text-left transition sm:px-4 ${
                    selected
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="block truncate text-sm font-bold">{item.name}</span>
                  <span className={`mt-0.5 block truncate text-[11px] leading-4 sm:text-xs ${selected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {item.detail}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Nombre del club"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base font-medium text-slate-950 placeholder:font-normal placeholder:text-slate-400 focus-visible:ring-amber-300"
            />
          </div>

          <AnimatePresence>
            {debouncedSearch.length < 2 && searchTerm.length > 0 && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-sm text-slate-500"
              >
                Escribe al menos 2 caracteres.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mx-auto max-w-5xl px-3 sm:px-4">

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-3 py-12 text-slate-500"
            >
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
              Buscando clubs
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {results.length} {results.length === 1 ? 'club' : 'clubs'}
              </div>
              <ul>
                {results.map((club) => {
                  const divisionLabel =
                    club.currentDivision != null
                      ? DIVISION_LABELS[club.currentDivision]
                      : null;
                  return (
                    <li key={club.clubId} className="border-b border-slate-100 last:border-b-0">
                      <Link
                        href={`/club/${platform}/${club.clubId}`}
                        className="flex items-center gap-4 px-4 py-4 transition hover:bg-slate-50 md:px-5"
                      >
                        <ClubCrest
                          primaryUrl={club.customKit?.crestUrl}
                          fallbackUrl={club.customKit?.crestUrlFallback}
                          clubName={club.name}
                          clubColors={club.customKit?.clubColors}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-lg font-bold text-slate-950">{club.name}</p>
                          <p className="mt-0.5 truncate text-sm text-slate-500">
                            {club.regionId ? getRegionName(club.regionId) : 'Región no disponible'}
                            {typeof club.gamesPlayed === 'number' ? ` · ${club.gamesPlayed} partidos` : ''}
                          </p>
                          <div className="mt-2 flex items-center gap-3 sm:hidden">
                            {divisionLabel && (
                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                                <img
                                  src={`https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/divisioncrest${club.currentDivision}.png`}
                                  alt=""
                                  className="h-7 w-7 object-contain"
                                />
                                {divisionLabel}
                              </span>
                            )}
                            <span className="text-sm font-semibold tabular-nums text-slate-600">
                              {club.wins ?? 0}-{club.ties ?? 0}-{club.losses ?? 0}
                            </span>
                          </div>
                        </div>
                        <div className="hidden items-center gap-4 sm:flex">
                          {divisionLabel && (
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/divisioncrest${club.currentDivision}.png`}
                                alt=""
                                className="h-10 w-10 object-contain"
                              />
                              <span className="text-sm font-semibold text-slate-800">{divisionLabel}</span>
                            </div>
                          )}
                          <div className="text-right text-sm font-semibold tabular-nums text-slate-700">
                            <span className="text-emerald-700">{club.wins ?? 0}</span>
                            <span className="mx-1 text-slate-300">·</span>
                            <span>{club.ties ?? 0}</span>
                            <span className="mx-1 text-slate-300">·</span>
                            <span className="text-rose-700">{club.losses ?? 0}</span>
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">V · E · D</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-300" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isLoading && debouncedSearch.length >= 2 && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
            >
              <p className="text-lg font-bold text-slate-900">No hay clubs con ese nombre</p>
              <p className="mt-1 text-sm text-slate-500">
                Prueba otro nombre o cambia entre Cross-Play y Switch 2.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isLoading && results.length > 0 && (
          <div className="mt-4">
            <AdBanner
              dataAdSlot="1111111111"
              dataAdFormat="horizontal"
              className="flex justify-center"
            />
          </div>
        )}

        {debouncedSearch.length === 0 && (
          <div className="mt-10">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: 'División actual',
                  text: 'El escudo de la división en la que está el club ahora, y cómo cambia con los resultados.',
                },
                {
                  icon: Users,
                  title: 'Plantilla',
                  text: 'Goles, asistencias y posición de cada jugador del Clubhouse.',
                },
                {
                  icon: Swords,
                  title: 'Partidos',
                  text: 'Liga, playoffs y amistosos, con el resultado de cada encuentro.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5">
                  <item.icon className="h-5 w-5 text-amber-500" />
                  <h2 className="mt-3 text-base font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-400">
              ProClubs Stats es un proyecto independiente y no está afiliado con Electronic Arts. EA SPORTS FC y Clubs son marcas de Electronic Arts Inc.
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
