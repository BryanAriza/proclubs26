'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, Trophy, Users, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clubsApi } from '@/lib/api';
import {
  formatNumber,
  formatWinRate,
  platformLabel,
  type Platform,
} from '@proclubs/shared';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { PlayersTable } from './players-table';
import { MatchesList } from './matches-list';

interface ClubPageProps {
  platform: string;
  clubId: string;
}

export function ClubPage({ platform, clubId }: ClubPageProps) {
  const plat = platform as Platform;

  const { data: info, isLoading: loadingInfo } = useQuery({
    queryKey: ['club', 'info', plat, clubId],
    queryFn: () => clubsApi.getClubInfo(plat, clubId),
  });

  const { data: overall, isLoading: loadingOverall } = useQuery({
    queryKey: ['club', 'overall', plat, clubId],
    queryFn: () => clubsApi.getClubOverall(plat, clubId),
  });

  // Debug: Log club info data
  if (info) {
    // console.log('🏆 Club Info Data:', info);
    // console.log('🎨 Custom Kit:', info.customKit);
    // console.log('🖼️ Crest Asset ID:', info.customKit?.crestAssetId);
    // console.log('🔢 Club ID:', clubId);
  }

  const { data: members = [], isLoading: loadingMembers } = useQuery({
    queryKey: ['club', 'members', plat, clubId],
    queryFn: () => clubsApi.getClubMembers(plat, clubId),
  });

  const { data: matches = [], isLoading: loadingMatches } = useQuery({
    queryKey: ['club', 'matches', plat, clubId, 'recent'],
    queryFn: () => clubsApi.getClubMatches(plat, clubId, 'gameType'),
  });

  const isLoading = loadingInfo || loadingOverall;

  // Calcular racha reciente basada en partidos reales
  const recentResults = matches.slice(0, 10).map(match => {
    // Encontrar el score del club actual y convertir a número
    const clubScore = Number(match.clubs[clubId]?.goals) || 0;
    
    // Encontrar el ID del oponente y su score, convertir a número
    const opponentId = Object.keys(match.clubs).find(id => id !== clubId);
    const opponentScore = opponentId ? Number(match.clubs[opponentId]?.goals) || 0 : 0;
    
    // Determinar resultado
    if (clubScore > opponentScore) return 'W';
    if (clubScore < opponentScore) return 'L';
    return 'D';
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-slate-900 border-t-transparent"></div>
            <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full border-4 border-slate-900 opacity-20"></div>
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-6 text-xl text-slate-900 font-bold uppercase tracking-wider"
          >
            Cargando datos del club...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!info || !overall) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-slate-300 bg-white shadow-lg">
            <CardContent className="py-12 px-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-6 text-center"
              >
                ❌
              </motion.div>
              <p className="text-center text-2xl text-slate-900 font-black uppercase tracking-wide mb-4">
                Club no encontrado
              </p>
              <div className="mt-6 text-center">
                <Link href="/">
                  <Button variant="outline" size="lg" className="bg-white border-2 border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-slate-400 font-bold uppercase tracking-wide">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Volver a la Búsqueda
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const winRate = formatWinRate(overall.wins, overall.gamesPlayed);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Efectos de fondo tipo estadio */}
      <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)'}}></div>
      
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 md:mb-6"
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-900 hover:text-slate-700 hover:bg-slate-100 font-bold uppercase tracking-wide text-xs md:text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-4 md:mb-8 shadow-xl border-2 border-slate-200 bg-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
            <CardHeader className="relative z-10 p-4 md:p-6">
              <div className="flex items-center justify-between flex-wrap gap-3 md:gap-6">
                <div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-2xl md:text-5xl font-black mb-2 md:mb-3 text-slate-900 flex items-center gap-2 md:gap-4 uppercase tracking-tight">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex-shrink-0"
                      >
                        {info.customKit?.crestAssetId ? (
                          <>
                            <img 
                              src={`https://eafc24.content.easports.com/fifa/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fcweb/crests/256x256/l${info.customKit.crestAssetId}.png`}
                              alt={`Escudo de ${info.name}`}
                              className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-lg"
                              onError={(e) => {
                                // console.log('❌ Error loading crest image');
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden">
                              <Trophy className="w-8 h-8 md:w-16 md:h-16 text-slate-800" />
                            </div>
                          </>
                        ) : (
                          <Trophy className="w-8 h-8 md:w-16 md:h-16 text-slate-800" />
                        )}
                      </motion.div>
                      {info.name}
                    </CardTitle>
                  </motion.div>
                  
                </div>
                {info.customKit?.clubColors && (
                  <motion.div 
                    className="flex gap-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {info.customKit.clubColors.map((color, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 rounded-full border-4 border-white/30 shadow-2xl"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.div 
                className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="text-center bg-slate-100 p-3 md:p-6 rounded-2xl border-2 border-slate-300 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  <p className="text-xs md:text-sm text-slate-600 mb-1 md:mb-2 font-black uppercase tracking-wider">División</p>
                  {overall.division != null ? (
                    <div className="flex flex-col items-center gap-2">
                      <img 
                        src={`https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/divisioncrest${Number(overall.division) + 1}.png`}
                        alt={`División ${overall.division}`}
                        className="w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-lg"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                      <p className="text-2xl md:text-3xl font-black text-slate-900 hidden">
                        {overall.division}
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl md:text-5xl font-black text-slate-900">N/A</p>
                  )}
                </motion.div>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="text-center bg-slate-100 p-3 md:p-6 rounded-2xl border-2 border-slate-300 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  <p className="text-xs md:text-sm text-slate-600 mb-1 md:mb-2 font-black uppercase tracking-wider">Habilidad</p>
                  <p className="text-3xl md:text-5xl font-black text-slate-900">
                    {overall.skillRating || 'N/A'}
                  </p>
                </motion.div>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="text-center bg-slate-100 p-3 md:p-6 rounded-2xl border-2 border-slate-300 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  <p className="text-xs md:text-sm text-slate-600 mb-1 md:mb-2 font-black uppercase tracking-wider">Récord</p>
                  <p className="text-2xl md:text-4xl font-black text-slate-900">
                    {overall.wins}-{overall.losses}-{overall.ties}
                  </p>
                </motion.div>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="text-center bg-slate-100 p-3 md:p-6 rounded-2xl border-2 border-slate-300 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  <p className="text-xs md:text-sm text-slate-600 mb-1 md:mb-2 font-black uppercase tracking-wider">% Victorias</p>
                  <p className="text-3xl md:text-5xl font-black text-slate-900">{winRate}</p>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="text-xs md:text-sm">
                <Star className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Resumen</span>
              </TabsTrigger>
              <TabsTrigger value="players" className="text-xs md:text-sm">
                <Users className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Jugadores ({members.length})</span>
                <span className="md:hidden">({members.length})</span>
              </TabsTrigger>
              <TabsTrigger value="matches" className="text-xs md:text-sm">
                <TrendingUp className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Partidos</span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Información del Estadio */}
            {info.customKit && (info.customKit as any).stadName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-lg border-2 border-slate-200 bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600 pointer-events-none"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-base md:text-xl text-slate-900 font-black flex items-center gap-2 uppercase tracking-wide">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      🏟️ Estadio Local
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl md:text-4xl font-black text-slate-900 mb-1">
                          {(info.customKit as any).stadName}
                        </p>
                        <p className="text-xs md:text-sm text-slate-600 font-semibold uppercase tracking-wide">
                          Sede oficial del club
                        </p>
                      </div>
                      <div className="text-4xl md:text-7xl opacity-10">
                        🏟️
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div 
              className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Card className="shadow-lg border-2 border-slate-200 bg-white hover:shadow-xl transition-all group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl text-slate-900 font-black flex items-center gap-2 uppercase tracking-wide">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                      Estadísticas Generales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">
                        Partidos Jugados:
                      </span>
                      <span className="font-black text-2xl text-slate-900">
                        {formatNumber(overall.gamesPlayed)}
                      </span>
                    </div>
                    <Separator className="bg-slate-200" />
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Victorias:</span>
                      <span className="font-black text-2xl text-slate-900">
                        {formatNumber(overall.wins)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Derrotas:</span>
                      <span className="font-black text-2xl text-slate-900">
                        {formatNumber(overall.losses)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Empates:</span>
                      <span className="font-black text-2xl text-slate-900">
                        {formatNumber(overall.ties)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Card className="shadow-lg border-2 border-slate-200 bg-white hover:shadow-xl transition-all group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl text-slate-900 font-black flex items-center gap-2 uppercase tracking-wide">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                      Estadísticas de Goles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Goles a Favor:</span>
                      <span className="font-black text-2xl text-slate-900">
                        {formatNumber(overall.goalsFor)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">
                        Goles en Contra:
                      </span>
                      <span className="font-black text-2xl text-slate-900">
                        {formatNumber(overall.goalsAgainst)}
                      </span>
                    </div>
                  <Separator className="bg-slate-200" />
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">
                      Diferencia de Goles:
                    </span>
                    <span className="font-black text-xl text-slate-900">
                      {overall.goalsFor - overall.goalsAgainst > 0 ? '+' : ''}
                      {formatNumber(overall.goalsFor - overall.goalsAgainst)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">
                      Promedio Goles/PJ:
                    </span>
                    <span className="font-black text-xl text-slate-900">
                      {(overall.goalsFor / overall.gamesPlayed).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Card className="shadow-lg border-2 border-slate-200 bg-white hover:shadow-xl transition-all group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl text-slate-900 font-black flex items-center gap-2 uppercase tracking-wide">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                      Información del Club
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Miembros:</span>
                      <span className="font-black text-2xl text-slate-900">
                        {info.memberCount || members.length}
                      </span>
                    </div>
                  <Separator className="bg-slate-200" />
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Títulos Ganados:</span>
                    <span className="font-black text-xl text-slate-900">
                      {formatNumber(overall.titlesWon)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600 font-bold uppercase text-sm tracking-wide">Temporadas:</span>
                    <span className="font-black text-2xl text-slate-900">
                      {formatNumber(overall.seasons)}
                    </span>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {recentResults && recentResults.length > 0 && (
              <Card className="shadow-lg border-2 border-slate-200 bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-slate-900 font-black flex items-center gap-2 uppercase tracking-wide">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                    Racha Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex gap-2 flex-wrap">
                    {recentResults.map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.05, type: "spring" }}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg shadow-md transition-all hover:scale-110 ${
                          result === 'W' 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : result === 'L' 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-slate-400 text-white hover:bg-slate-500'
                        }`}
                        title={
                          result === 'W' 
                            ? 'Victoria' 
                            : result === 'L' 
                            ? 'Derrota' 
                            : 'Empate'
                        }
                      >
                        {result}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mt-3 font-semibold">
                    Los últimos {recentResults.length} partidos (más reciente a la izquierda)
                  </p>
                  <div className="mt-4 pt-4 border-t-2 border-slate-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-black text-green-600">{recentResults.filter(r => r === 'W').length}</p>
                        <p className="text-xs text-slate-600 font-bold uppercase">Victorias</p>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-slate-400">{recentResults.filter(r => r === 'D').length}</p>
                        <p className="text-xs text-slate-600 font-bold uppercase">Empates</p>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-red-600">{recentResults.filter(r => r === 'L').length}</p>
                        <p className="text-xs text-slate-600 font-bold uppercase">Derrotas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top Players Section */}
            {members.length > 0 && (
              <Card className="shadow-lg border-2 border-slate-200 bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-slate-900 font-black flex items-center gap-2 uppercase tracking-wide">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                    Jugadores Destacados
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200 shadow-md">
                      <p className="text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                        🏆 Máximo Goleador
                      </p>
                      {(() => {
                        const topScorer = members.reduce((prev, current) => 
                          (current.goals > prev.goals) ? current : prev
                        );
                        return (
                          <>
                            <p className="font-black text-lg text-slate-900">{topScorer.proName || topScorer.name}</p>
                            <p className="text-2xl font-black text-slate-900">{topScorer.goals} goles</p>
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200 shadow-md">
                      <p className="text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                        🎯 Máximo Asistente
                      </p>
                      {(() => {
                        const topAssist = members.reduce((prev, current) => 
                          (current.assists > prev.assists) ? current : prev
                        );
                        return (
                          <>
                            <p className="font-black text-lg text-slate-900">{topAssist.proName || topAssist.name}</p>
                            <p className="text-2xl font-black text-slate-900">{topAssist.assists} asistencias</p>
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200 shadow-md">
                      <p className="text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                        ⭐ Mejor Valoración
                      </p>
                      {(() => {
                        const topRating = members.reduce((prev, current) => 
                          (current.averageRating > prev.averageRating) ? current : prev
                        );
                        return (
                          <>
                            <p className="font-black text-lg text-slate-900">{topRating.proName || topRating.name}</p>
                            <p className="text-2xl font-black text-slate-900">{topRating.averageRating.toFixed(1)}</p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="players">
            <PlayersTable members={members} isLoading={loadingMembers} />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesList platform={plat} clubId={clubId} />
          </TabsContent>
        </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
