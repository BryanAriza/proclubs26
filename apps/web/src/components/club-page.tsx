'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clubsApi } from '@/lib/api';
import {
  formatNumber,
  formatWinRate,
  getRegionName,
  type Platform,
} from '@proclubs/shared';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PlayersTable } from './players-table';
import { PlayerRankings } from './player-rankings';
import { MatchesList } from './matches-list';
import AdBanner from './ad-banner';

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

  const divisionLabels: Record<number, string> = {
    1: 'Elite',
    2: 'División 1',
    3: 'División 2',
    4: 'División 3',
    5: 'División 4',
    6: 'División 5',
  };
  const currentDivisionLabel =
    overall.currentDivision != null
      ? divisionLabels[overall.currentDivision]
      : null;
  const currentDivisionCrest = currentDivisionLabel
    ? `https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/divisioncrest${overall.currentDivision}.png`
    : null;
  const winRate = formatWinRate(overall.wins, overall.gamesPlayed);
  const reputationNames = ['Hometown Heroes', 'Emerging Stars', 'Well Known', 'World Renown'];
  const reputationName =
    overall.reputationTier != null ? reputationNames[overall.reputationTier] : null;
  const achievements = overall.playoffAchievements ?? [];
  const defaultDivisionCrest =
    'https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/default-division.png';
  const roleCounts = members.reduce(
    (counts, member) => {
      const position = Number(member.proPos || member.position);
      if (position === 0) counts.gk += 1;
      else if (position >= 1 && position <= 9) counts.def += 1;
      else if (position >= 10 && position <= 18) counts.mid += 1;
      else if (!Number.isNaN(position)) counts.fwd += 1;
      return counts;
    },
    { gk: 0, def: 0, mid: 0, fwd: 0 },
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-slate-100 to-amber-50 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>
      <div className="pointer-events-none absolute top-40 -left-16 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl"></div>
      
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
          <Card className="mb-4 md:mb-8 overflow-hidden border border-white/70 bg-white/80 shadow-xl shadow-slate-200/70 backdrop-blur-sm">
            <CardHeader className="relative z-10 p-5 md:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 shadow-inner">
                    {info.customKit?.crestAssetId ? (
                      <img
                        src={`https://eafc24.content.easports.com/fifa/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fcweb/crests/256x256/l${info.customKit.crestAssetId}.png`}
                        alt={`Escudo de ${info.name}`}
                        className="h-16 w-16 md:h-20 md:w-20 object-contain"
                      />
                    ) : (
                      <Trophy className="h-10 w-10 text-slate-700" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                      {getRegionName(info.regionId)}
                    </p>
                    <CardTitle className="mt-1 text-3xl md:text-5xl font-black tracking-tight text-slate-950">
                      {info.name}
                    </CardTitle>
                    <p className="mt-1 text-sm text-slate-500">{members.length} miembros</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 lg:justify-end">
                  {currentDivisionCrest && currentDivisionLabel && (
                    <div className="flex items-center gap-3">
                      <img
                        src={currentDivisionCrest}
                        alt={currentDivisionLabel}
                        className="h-16 w-16 object-contain"
                      />
                      <div className="text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                          División actual
                        </p>
                        <p className="text-2xl font-black tracking-tight text-slate-950">
                          {currentDivisionLabel}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="text-left lg:text-right">
                    <p className="text-5xl md:text-6xl font-black tracking-tight text-slate-950">
                      {overall.skillRating ?? '—'}
                    </p>
                    <p className="text-sm font-medium text-slate-500">Valoración de habilidad</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">V {overall.wins}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">E {overall.ties}</span>
                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700">D {overall.losses}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">{winRate} victorias</span>
                {reputationName && overall.reputationTier != null && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-900">
                    <img
                      src={`https://media.contentapi.ea.com/content/dam/eacom/fc/pro-clubs/reputation-tier${overall.reputationTier}.png`}
                      alt=""
                      className="h-5 w-5 object-contain"
                    />
                    {reputationName}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Defensas {roleCounts.def}</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Medios {roleCounts.mid}</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Delanteros {roleCounts.fwd}</span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1">Porteros {roleCounts.gk}</span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 px-5 pb-6 md:px-8">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Logros en playoff
                </p>
                {achievements.length === 0 ? (
                  <div className="mt-4 flex flex-col items-center gap-3 py-2 text-center">
                    <img
                      src={defaultDivisionCrest}
                      alt="Sin división de temporada"
                      className="h-28 w-28 object-contain"
                    />
                    <p className="text-base font-semibold text-slate-800">
                      Ninguna temporada completada
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => (
                      <div
                        key={`${achievement.seasonName}-${achievement.divisionLabel}`}
                        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                      >
                        <img
                          src={achievement.crestUrl}
                          alt={achievement.divisionLabel}
                          className="h-20 w-20 object-contain"
                        />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {achievement.seasonName}
                          </p>
                          <p className="text-xl font-black text-slate-950">
                            {achievement.divisionLabel}
                          </p>
                          <p className="text-sm text-slate-600">{achievement.finishLabel}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Anuncio Banner Superior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="my-6"
        >
          <AdBanner 
            dataAdSlot="1234567890" 
            dataAdFormat="horizontal"
            className="flex justify-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
            <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:grid-cols-4">
              <TabsTrigger value="overview" className="rounded-xl text-xs normal-case tracking-normal md:text-sm">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="ranking" className="rounded-xl text-xs normal-case tracking-normal md:text-sm">
                Ranking
              </TabsTrigger>
              <TabsTrigger value="players" className="rounded-xl text-xs normal-case tracking-normal md:text-sm">
                Jugadores
              </TabsTrigger>
              <TabsTrigger value="matches" className="rounded-xl text-xs normal-case tracking-normal md:text-sm">
                Partidos
              </TabsTrigger>
            </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Información del Estadio */}
            {info.customKit && (info.customKit as any).stadName && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.7)]"
              >
                <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                      Sede del club
                    </p>
                    <p className="mt-2 break-words text-3xl font-black tracking-tight">
                      {(info.customKit as any).stadName}
                    </p>
                  </div>
                  <p className="text-sm text-slate-300">Estadio local de {info.name}</p>
                </div>
              </motion.div>
            )}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Partidos', value: formatNumber(overall.gamesPlayed) },
                { label: 'Victorias', value: formatNumber(overall.wins) },
                { label: 'Empates', value: formatNumber(overall.ties) },
                { label: 'Derrotas', value: formatNumber(overall.losses) },
                { label: 'Goles a favor', value: formatNumber(overall.goalsFor) },
                { label: 'Goles en contra', value: formatNumber(overall.goalsAgainst) },
                {
                  label: 'Diferencia',
                  value: `${overall.goalsFor - overall.goalsAgainst > 0 ? '+' : ''}${formatNumber(overall.goalsFor - overall.goalsAgainst)}`,
                },
                {
                  label: 'Goles por partido',
                  value: overall.gamesPlayed ? (overall.goalsFor / overall.gamesPlayed).toFixed(2) : '0.00',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="rounded-3xl border border-slate-200 bg-white px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                  <p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {recentResults && recentResults.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Últimos {recentResults.length} partidos
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recentResults.map((result, i) => (
                    <span
                      key={i}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                        result === 'W'
                          ? 'bg-emerald-600'
                          : result === 'L'
                          ? 'bg-rose-600'
                          : 'bg-slate-400'
                      }`}
                    >
                      {result === 'W' ? 'V' : result === 'L' ? 'D' : 'E'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {members.length > 0 && (
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    label: 'Máximo goleador',
                    player: members.reduce((prev, current) => (current.goals > prev.goals ? current : prev)),
                    stat: (player: typeof members[number]) => `${player.goals} goles`,
                  },
                  {
                    label: 'Máximo asistente',
                    player: members.reduce((prev, current) => (current.assists > prev.assists ? current : prev)),
                    stat: (player: typeof members[number]) => `${player.assists} asistencias`,
                  },
                  {
                    label: 'Más pases',
                    player: members.reduce((prev, current) => ((current.passesMade || 0) > (prev.passesMade || 0) ? current : prev)),
                    stat: (player: typeof members[number]) => `${player.passesMade || 0} pases`,
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                    <p className="mt-2 text-lg font-bold text-slate-950">{item.player.name}</p>
                    <p className="text-2xl font-black text-slate-950">{item.stat(item.player)}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ranking">
            <PlayerRankings members={members} isLoading={loadingMembers} />
          </TabsContent>

          <TabsContent value="players">
            <PlayersTable members={members} isLoading={loadingMembers} />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesList platform={plat} clubId={clubId} />
          </TabsContent>
        </Tabs>
        </motion.div>

        {/* Anuncio Banner Inferior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 mb-6"
        >
          <AdBanner 
            dataAdSlot="5555555555" 
            dataAdFormat="horizontal"
            className="flex justify-center"
          />
        </motion.div>
      </div>
    </div>
  );
}
