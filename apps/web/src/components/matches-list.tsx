'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type Platform, type MatchType, formatDate } from '@proclubs/shared';
import { clubsApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Target, 
  Activity,
  Shield,
  Crosshair,
  Award
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface MatchesListProps {
  platform: Platform;
  clubId: string;
}

export function MatchesList({ platform, clubId }: MatchesListProps) {
  const [matchType, setMatchType] = useState<MatchType>('league');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ['club', 'matches', platform, clubId, matchType],
    queryFn: () => clubsApi.getClubMatches(platform, clubId, matchType),
  });

  const toggleMatch = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  return (
    <Card className="shadow-lg border-2 border-slate-200 bg-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-300 pointer-events-none"></div>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-2xl text-slate-900 font-black flex items-center gap-2 md:gap-3 uppercase tracking-wide">
          <div className="p-1.5 md:p-2 bg-slate-900 rounded-lg shadow-lg">
            <Activity className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <span className="hidden sm:inline">Historial de Partidos</span>
          <span className="sm:hidden">Partidos</span>
        </CardTitle>
        <Tabs
          value={matchType}
          onValueChange={(v) => setMatchType(v as MatchType)}
        >
          <TabsList className="text-xs md:text-sm">
            <TabsTrigger value="league" className="text-xs md:text-sm">Liga</TabsTrigger>
            <TabsTrigger value="playoff" className="text-xs md:text-sm">Playoff</TabsTrigger>
            <TabsTrigger value="friendly" className="text-xs md:text-sm">Amistoso</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="relative inline-block">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-900 border-t-transparent"></div>
                <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-4 border-slate-900 opacity-20"></div>
              </div>
              <p className="mt-4 text-slate-900 font-bold uppercase tracking-wide">Cargando partidos...</p>
            </motion.div>
          ) : matches.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">⚽</div>
              <p className="text-slate-600 text-lg font-bold uppercase tracking-wide">No se encontraron partidos</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 md:space-y-4"
            >
            {matches.map((match) => {
              const myClub = match.clubs[clubId];
              const opponentId = Object.keys(match.clubs).find(
                (id) => id !== clubId,
              );
              const opponent = opponentId
                ? match.clubs[opponentId]
                : undefined;

              if (!myClub) return null;

              // Obtener jugadores de cada equipo
              const myPlayers = Object.values(match.players || {}).filter(
                (p: any) => p.team === '0' || p.clubId === clubId
              );
              const opponentPlayers = Object.values(match.players || {}).filter(
                (p: any) => p.team === '1' || (p.clubId && p.clubId !== clubId)
              );

              // 🔢 Calcular estadísticas del club desde los jugadores
              const calculateTeamStats = (players: any[]) => {
                if (players.length === 0) return {};
                
                const totalPasses = players.reduce((sum, p) => sum + (p.passes || 0), 0);
                const totalPassesCompleted = players.reduce((sum, p) => sum + (p.passesCompleted || 0), 0);
                const totalShots = players.reduce((sum, p) => sum + (p.shots || 0), 0);
                const totalTackles = players.reduce((sum, p) => sum + (p.tackles || 0), 0);
                const totalYellowCards = players.reduce((sum, p) => sum + (p.yellowCards || 0), 0);
                const totalRedCards = players.reduce((sum, p) => sum + (p.redCards || 0), 0);
                
                const passPct = totalPasses > 0 ? parseFloat(((totalPassesCompleted / totalPasses) * 100).toFixed(1)) : 0;
                
                return {
                  totalPasses,
                  totalPassesCompleted,
                  passPct,
                  totalShots,
                  totalTackles,
                  totalYellowCards,
                  totalRedCards,
                };
              };

              const myTeamStats = calculateTeamStats(myPlayers);
              const opponentTeamStats = calculateTeamStats(opponentPlayers);

              // Calcular posesión basada en pases totales
              const totalGamePasses = myTeamStats.totalPasses + opponentTeamStats.totalPasses;
              const myPossessionPct = totalGamePasses > 0 
                ? ((myTeamStats.totalPasses / totalGamePasses) * 100).toFixed(1)
                : 0;
              const opponentPossessionPct = totalGamePasses > 0
                ? ((opponentTeamStats.totalPasses / totalGamePasses) * 100).toFixed(1)
                : 0;

              // Calcular resultado basado en goles
              const myScore = Number(myClub.score) || 0;
              const opponentScore = opponent ? Number(opponent.score) || 0 : 0;
              const won = myScore > opponentScore;
              const lost = myScore < opponentScore;
              const tie = myScore === opponentScore;
              const isExpanded = expandedMatch === match.matchId;

              return (
                <motion.div
                  key={match.matchId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`border-2 rounded-2xl overflow-hidden transition-all shadow-lg hover:shadow-xl ${
                    won ? 'bg-green-50 border-green-300' : 
                    lost ? 'bg-red-50 border-red-300' : 
                    'bg-slate-50 border-slate-300'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 pointer-events-none ${
                    won ? 'bg-green-500' : 
                    lost ? 'bg-red-500' : 
                    'bg-slate-400'
                  }`}></div>
                  {/* Header del partido */}
                  <motion.div 
                    className="p-3 md:p-6 cursor-pointer hover:bg-white/50 transition-all"
                    onClick={() => toggleMatch(match.matchId)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      <span className="text-[10px] md:text-sm text-slate-600 font-bold uppercase tracking-wider">
                        {formatDate(match.timestamp)}
                      </span>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Badge className={`text-[10px] md:text-sm font-black px-2 md:px-4 py-0.5 md:py-1 shadow-lg text-white uppercase tracking-wider ${
                          won ? 'bg-green-600' : 
                          lost ? 'bg-red-600' : 
                          'bg-slate-600'
                        }`}>
                          {won ? 'WIN' : lost ? 'LOSS' : 'DRAW'}
                        </Badge>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-slate-800" />
                          ) : (
                            <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-slate-800" />
                          )}
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Marcador */}
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-black text-sm md:text-xl text-slate-900 mb-1 md:mb-2 uppercase tracking-wide truncate">
                          {myClub.clubName || 'Tu Club'}
                        </p>
                        <motion.p 
                          className="text-4xl md:text-6xl font-black text-slate-900"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {myClub.score || 0}
                        </motion.p>
                      </div>
                      <div className="text-3xl md:text-5xl font-black text-slate-400 px-3 md:px-8">
                        VS
                      </div>
                      <div className="flex-1 text-right">
                        <p className="font-black text-sm md:text-xl text-slate-900 mb-1 md:mb-2 uppercase tracking-wide truncate">
                          {opponent?.clubName || 'Oponente'}
                        </p>
                        <motion.p 
                          className="text-4xl md:text-6xl font-black text-slate-900"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        >
                          {opponent?.score || 0}
                        </motion.p>
                      </div>
                    </div>

                    {/* Estadísticas rápidas del equipo */}
                    {(myPossessionPct || myTeamStats.passPct) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-4"
                      >
                        {myPossessionPct && (
                          <div className="text-center bg-slate-100 border border-slate-300 rounded-xl p-2 md:p-3 shadow-sm">
                            <p className="text-[10px] md:text-xs text-slate-700 mb-0.5 md:mb-1 uppercase tracking-wider font-black">Posesión</p>
                            <p className="text-lg md:text-2xl font-black text-slate-900">{myPossessionPct}%</p>
                          </div>
                        )}
                        {myTeamStats.passPct && (
                          <div className="text-center bg-slate-100 border border-slate-300 rounded-xl p-2 md:p-3 shadow-sm">
                            <p className="text-[10px] md:text-xs text-slate-700 mb-0.5 md:mb-1 uppercase tracking-wider font-black">Pases</p>
                            <p className="text-lg md:text-2xl font-black text-slate-900">{myTeamStats.passPct}%</p>
                          </div>
                        )}
                        {myTeamStats.totalShots > 0 && (
                          <div className="text-center bg-slate-100 border border-slate-300 rounded-xl p-2 md:p-3 shadow-sm">
                            <p className="text-[10px] md:text-xs text-slate-700 mb-0.5 md:mb-1 uppercase tracking-wider font-black">Tiros</p>
                            <p className="text-lg md:text-2xl font-black text-slate-900">{myTeamStats.totalShots}</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Detalles expandidos */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t-2 border-slate-200 bg-slate-50 backdrop-blur-sm p-6 space-y-6"
                      >
                        {/* Estadísticas Generales del Partido */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 }}
                        >
                          <h4 className="font-black text-xl mb-4 flex items-center gap-3 text-slate-900 uppercase tracking-wide">
                            <Target className="h-6 w-6" />
                            Estadísticas del Partido
                          </h4>
                          <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg overflow-hidden">
                            {/* Fila de Goles */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myClub.goals || myClub.score || 0}
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                ⚽ Goles
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponent?.goals || opponent?.score || 0}
                              </div>
                            </div>
                            
                            {/* Fila de Posesión */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myPossessionPct}%
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                Posesión
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentPossessionPct}%
                              </div>
                            </div>

                            {/* Fila de Tiros */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myTeamStats.totalShots}
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                Tiros
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentTeamStats.totalShots}
                              </div>
                            </div>

                            {/* Fila de Pases Completados */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myTeamStats.totalPassesCompleted}/{myTeamStats.totalPasses}
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                Pases
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentTeamStats.totalPassesCompleted}/{opponentTeamStats.totalPasses}
                              </div>
                            </div>

                            {/* Fila de Precisión de Pases */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myTeamStats.passPct}%
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                Precisión Pases
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentTeamStats.passPct}%
                              </div>
                            </div>

                            {/* Fila de Entradas */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myTeamStats.totalTackles}
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                Entradas
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentTeamStats.totalTackles}
                              </div>
                            </div>

                            {/* Fila de Tarjetas Amarillas */}
                            <div className="grid grid-cols-3 border-b border-slate-200 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myTeamStats.totalYellowCards}
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                🟨 Tarjetas Amarillas
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentTeamStats.totalYellowCards}
                              </div>
                            </div>

                            {/* Fila de Tarjetas Rojas */}
                            <div className="grid grid-cols-3 hover:bg-slate-50 transition-colors">
                              <div className={`p-4 text-center font-black text-2xl ${won ? 'text-green-600' : lost ? 'text-red-600' : 'text-slate-700'}`}>
                                {myTeamStats.totalRedCards}
                              </div>
                              <div className="p-4 text-center font-bold text-slate-600 uppercase tracking-wider text-sm flex items-center justify-center">
                                🟥 Tarjetas Rojas
                              </div>
                              <div className={`p-4 text-center font-black text-2xl ${lost ? 'text-green-600' : won ? 'text-red-600' : 'text-slate-700'}`}>
                                {opponentTeamStats.totalRedCards}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Estadísticas de Tu Equipo */}
                        {myPlayers.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h4 className="font-black text-xl mb-4 flex items-center gap-3 text-slate-900 uppercase tracking-wide">
                              <Shield className="h-6 w-6" />
                              {myClub.clubName || 'Tu Club'}
                            </h4>
                            <div className="overflow-x-auto rounded-xl border-2 border-slate-200 bg-white shadow-lg">
                              <Table>
                              <TableHeader>
                                <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50">
                                  <TableHead className="font-bold">Jugador</TableHead>
                                  <TableHead className="text-center font-bold">Pos</TableHead>
                                  <TableHead className="text-center font-bold">Goles</TableHead>
                                  <TableHead className="text-center font-bold">Asist</TableHead>
                                  <TableHead className="text-center font-bold">Tiros</TableHead>
                                  <TableHead className="text-center font-bold">Pases</TableHead>
                                  <TableHead className="text-center font-bold">Entradas</TableHead>
                                  <TableHead className="text-center font-bold">🟨</TableHead>
                                  <TableHead className="text-center font-bold">🟥</TableHead>
                                  <TableHead className="text-center font-bold">⭐</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {myPlayers.map((player: any, idx) => (
                                  <TableRow key={idx} className="hover:bg-blue-50/50 transition-colors">
                                    <TableCell className="font-medium">
                                      <div className="flex items-center gap-2">
                                        <span className="text-slate-900">{player.vProName || player.name}</span>
                                        {player.manOfTheMatch > 0 && (
                                          <Award className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge variant="outline" className="text-xs font-semibold border-slate-300">
                                        {player.vProPosition || player.position}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-blue-600">
                                      {player.goals}
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-indigo-600">
                                      {player.assists || 0}
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-700">
                                      {player.shots || 0}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                      <div className="flex flex-col items-center">
                                        <div>
                                          <span className="font-semibold text-slate-700">
                                            {player.passesCompleted || 0}
                                          </span>
                                          <span className="text-slate-400 mx-0.5">/</span>
                                          <span className="text-slate-500">{player.passes || 0}</span>
                                        </div>
                                        {player.passAccuracy && (
                                          <span className="text-xs text-blue-600 font-medium">
                                            {player.passAccuracy.toFixed(0)}%
                                          </span>
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                      <span className="font-semibold text-slate-700">{player.tackles || 0}</span>
                                      {player.interceptions > 0 && (
                                        <span className="text-slate-500 text-xs ml-1">
                                          +{player.interceptions}
                                        </span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {player.yellowCards ? (
                                        <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold px-2">
                                          {player.yellowCards}
                                        </Badge>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {player.redCards ? (
                                        <Badge className="bg-red-600 text-white hover:bg-red-700 font-bold px-2">
                                          {player.redCards}
                                        </Badge>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {player.rating ? (
                                        <Badge className={`font-bold ${
                                          player.rating >= 8 ? 'bg-green-600 hover:bg-green-700' :
                                          player.rating >= 7 ? 'bg-blue-600 hover:bg-blue-700' :
                                          player.rating >= 6 ? 'bg-slate-600 hover:bg-slate-700' :
                                          'bg-red-600 hover:bg-red-700'
                                        } text-white`}>
                                          {player.rating.toFixed(1)}
                                        </Badge>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          </motion.div>
                        )}

                        {/* Estadísticas del Oponente */}
                        {opponentPlayers.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h4 className="font-black text-xl mb-4 flex items-center gap-3 text-slate-900 uppercase tracking-wide">
                              <Shield className="h-6 w-6" />
                              {opponent?.clubName || 'Oponente'}
                            </h4>
                            <div className="overflow-x-auto rounded-xl border-2 border-slate-200 bg-white shadow-lg">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50">
                                  <TableHead className="font-bold">Jugador</TableHead>
                                  <TableHead className="text-center font-bold">Pos</TableHead>
                                  <TableHead className="text-center font-bold">Goles</TableHead>
                                  <TableHead className="text-center font-bold">Asist</TableHead>
                                  <TableHead className="text-center font-bold">Tiros</TableHead>
                                  <TableHead className="text-center font-bold">Pases</TableHead>
                                  <TableHead className="text-center font-bold">Entradas</TableHead>
                                  <TableHead className="text-center font-bold">🟨</TableHead>
                                  <TableHead className="text-center font-bold">🟥</TableHead>
                                  <TableHead className="text-center font-bold">⭐</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {opponentPlayers.map((player: any, idx) => (
                                  <TableRow key={idx} className="hover:bg-blue-50/50 transition-colors">
                                    <TableCell className="font-medium">
                                      <div className="flex items-center gap-2">
                                        <span className="text-slate-900">{player.vProName || player.name}</span>
                                        {player.manOfTheMatch > 0 && (
                                          <Award className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge variant="outline" className="text-xs font-semibold border-slate-300">
                                        {player.vProPosition || player.position}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-blue-600">
                                      {player.goals}
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-indigo-600">
                                      {player.assists || 0}
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-slate-700">
                                      {player.shots || 0}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                      <div className="flex flex-col items-center">
                                        <div>
                                          <span className="font-semibold text-slate-700">
                                            {player.passesCompleted || 0}
                                          </span>
                                          <span className="text-slate-400 mx-0.5">/</span>
                                          <span className="text-slate-500">{player.passes || 0}</span>
                                        </div>
                                        {player.passAccuracy && (
                                          <span className="text-xs text-blue-600 font-medium">
                                            {player.passAccuracy.toFixed(0)}%
                                          </span>
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                      <span className="font-semibold text-slate-700">{player.tackles || 0}</span>
                                      {player.interceptions > 0 && (
                                        <span className="text-slate-500 text-xs ml-1">
                                          +{player.interceptions}
                                        </span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {player.yellowCards ? (
                                        <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold px-2">
                                          {player.yellowCards}
                                        </Badge>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {player.redCards ? (
                                        <Badge className="bg-red-600 text-white hover:bg-red-700 font-bold px-2">
                                          {player.redCards}
                                        </Badge>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {player.rating ? (
                                        <Badge className={`font-bold ${
                                          player.rating >= 8 ? 'bg-green-600 hover:bg-green-700' :
                                          player.rating >= 7 ? 'bg-blue-600 hover:bg-blue-700' :
                                          player.rating >= 6 ? 'bg-slate-600 hover:bg-slate-700' :
                                          'bg-red-600 hover:bg-red-700'
                                        } text-white`}>
                                          {player.rating.toFixed(1)}
                                        </Badge>
                                      ) : (
                                        <span className="text-slate-300">-</span>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
