'use client';

import { useState, useMemo } from 'react';
import { type MemberStats } from '@proclubs/shared';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ArrowUpDown, Trophy, Target, TrendingUp, Activity, Medal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface PlayersTableProps {
  members: MemberStats[];
  isLoading: boolean;
}

type SortKey = keyof MemberStats;

// Mapeo de códigos de posición a nombres
const POSITION_MAP: Record<string, string> = {
  '0': 'POR',    // Portero
  '1': 'LI',     // Lateral Izquierdo
  '2': 'LIB',    // Líbero
  '3': 'DFC',    // Defensa Central
  '4': 'LD',     // Lateral Derecho
  '5': 'CAR',    // Carrilero
  '6': 'LWB',    // Left Wing Back
  '7': 'LDM',    // Lateral Defensa Mediocampo
  '8': 'RDM',    // Right Defensive Midfielder
  '9': 'RWB',    // Right Wing Back
  '10': 'MCD',   // Mediocampista Defensivo
  '11': 'MC',    // Mediocampista Central
  '12': 'LM',    // Mediocampista Izquierdo
  '13': 'RM',    // Mediocampista Derecho
  '14': 'CAM',   // Mediocampista Ofensivo
  '15': 'LW',    // Extremo Izquierdo
  '16': 'RW',    // Extremo Derecho
  '17': 'LAM',   // Left Attacking Midfielder
  '18': 'RAM',   // Right Attacking Midfielder
  '19': 'CF',    // Centro Delantero
  '20': 'ST',    // Delantero
  '21': 'LF',    // Left Forward
  '22': 'RF',    // Right Forward
  '23': 'LS',    // Left Striker
  '24': 'RS',    // Right Striker
  '25': 'ANY',   // Cualquier posición
};

function getPositionName(position: string | number | undefined): string {
  if (!position) return 'N/A';
  const posCode = String(position);
  return POSITION_MAP[posCode] || posCode;
}

export function PlayersTable({ members, isLoading }: PlayersTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('goals');
  const [sortDesc, setSortDesc] = useState(true);

  const filteredAndSorted = useMemo(() => {
    let filtered = members.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDesc ? bVal - aVal : aVal - bVal;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDesc
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }

      return 0;
    });

    return filtered;
  }, [members, search, sortKey, sortDesc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-900 border-r-transparent"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Rankings Top 5 */}
      {filteredAndSorted.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Top 5 Goleadores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            <Card className="shadow-lg border-2 border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-base font-black text-blue-900 uppercase tracking-wide">Top 5 Goleadores</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {[...filteredAndSorted]
                    .sort((a, b) => (b.goals || 0) - (a.goals || 0))
                    .slice(0, 5)
                    .map((player, index) => (
                      <motion.div
                        key={player.playerId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                          index === 0 ? 'bg-gradient-to-r from-blue-100 to-blue-50 shadow-md' : 'hover:bg-slate-50'
                        }`}
                      >
                        {index < 3 ? (
                          <Medal className={`h-6 w-6 ${
                            index === 0 ? 'text-yellow-500 fill-yellow-500' :
                            index === 1 ? 'text-slate-400 fill-slate-400' :
                            'text-amber-700 fill-amber-700'
                          }`} />
                        ) : (
                          <span className="font-black text-lg text-slate-400 w-6 text-center">{index + 1}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate ${
                            index === 0 ? 'text-sm text-blue-900' : 'text-xs text-slate-900'
                          }`}>
                            {player.proName || player.name}
                          </p>
                          <Badge variant="outline" className="text-[10px] mt-0.5 border-blue-200">
                            {getPositionName(player.proPos || player.position)}
                          </Badge>
                        </div>
                        <span className={`font-black ${
                          index === 0 ? 'text-xl text-blue-600' : 'text-lg text-blue-500'
                        }`}>{player.goals || 0}</span>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top 5 Asistentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="shadow-lg border-2 border-green-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3 bg-gradient-to-br from-green-100 via-green-50 to-white">
                <div className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-base font-black text-green-900 uppercase tracking-wide">Top 5 Asistentes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {[...filteredAndSorted]
                    .sort((a, b) => (b.assists || 0) - (a.assists || 0))
                    .slice(0, 5)
                    .map((player, index) => (
                      <motion.div
                        key={player.playerId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                          index === 0 ? 'bg-gradient-to-r from-green-100 to-green-50 shadow-md' : 'hover:bg-slate-50'
                        }`}
                      >
                        {index < 3 ? (
                          <Medal className={`h-6 w-6 ${
                            index === 0 ? 'text-yellow-500 fill-yellow-500' :
                            index === 1 ? 'text-slate-400 fill-slate-400' :
                            'text-amber-700 fill-amber-700'
                          }`} />
                        ) : (
                          <span className="font-black text-lg text-slate-400 w-6 text-center">{index + 1}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate ${
                            index === 0 ? 'text-sm text-green-900' : 'text-xs text-slate-900'
                          }`}>
                            {player.proName || player.name}
                          </p>
                          <Badge variant="outline" className="text-[10px] mt-0.5 border-green-200">
                            {getPositionName(player.proPos || player.position)}
                          </Badge>
                        </div>
                        <span className={`font-black ${
                          index === 0 ? 'text-xl text-green-600' : 'text-lg text-green-500'
                        }`}>{player.assists || 0}</span>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top 5 MVPs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-lg border-2 border-amber-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3 bg-gradient-to-br from-amber-100 via-amber-50 to-white">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                  <CardTitle className="text-base font-black text-amber-900 uppercase tracking-wide">Top 5 <br /> MVPs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {[...filteredAndSorted]
                    .sort((a, b) => (b.manOfTheMatch || 0) - (a.manOfTheMatch || 0))
                    .slice(0, 5)
                    .map((player, index) => (
                      <motion.div
                        key={player.playerId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                          index === 0 ? 'bg-gradient-to-r from-amber-100 to-amber-50 shadow-md' : 'hover:bg-slate-50'
                        }`}
                      >
                        {index < 3 ? (
                          <Medal className={`h-6 w-6 ${
                            index === 0 ? 'text-yellow-500 fill-yellow-500' :
                            index === 1 ? 'text-slate-400 fill-slate-400' :
                            'text-amber-700 fill-amber-700'
                          }`} />
                        ) : (
                          <span className="font-black text-lg text-slate-400 w-6 text-center">{index + 1}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate ${
                            index === 0 ? 'text-sm text-amber-900' : 'text-xs text-slate-900'
                          }`}>
                            {player.proName || player.name}
                          </p>
                          <Badge variant="outline" className="text-[10px] mt-0.5 border-amber-200">
                            {getPositionName(player.proPos || player.position)}
                          </Badge>
                        </div>
                        <span className={`font-black ${
                          index === 0 ? 'text-xl text-amber-600' : 'text-lg text-amber-500'
                        }`}>{player.manOfTheMatch || 0}</span>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top 5 Más Partidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="shadow-lg border-2 border-indigo-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3 bg-gradient-to-br from-indigo-100 via-indigo-50 to-white">
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-base font-black text-indigo-900 uppercase tracking-wide">Top 5 Más Partidos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {[...filteredAndSorted]
                    .sort((a, b) => (b.gamesPlayed || 0) - (a.gamesPlayed || 0))
                    .slice(0, 5)
                    .map((player, index) => (
                      <motion.div
                        key={player.playerId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                          index === 0 ? 'bg-gradient-to-r from-indigo-100 to-indigo-50 shadow-md' : 'hover:bg-slate-50'
                        }`}
                      >
                        {index < 3 ? (
                          <Medal className={`h-6 w-6 ${
                            index === 0 ? 'text-yellow-500 fill-yellow-500' :
                            index === 1 ? 'text-slate-400 fill-slate-400' :
                            'text-amber-700 fill-amber-700'
                          }`} />
                        ) : (
                          <span className="font-black text-lg text-slate-400 w-6 text-center">{index + 1}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate ${
                            index === 0 ? 'text-sm text-indigo-900' : 'text-xs text-slate-900'
                          }`}>
                            {player.proName || player.name}
                          </p>
                          <Badge variant="outline" className="text-[10px] mt-0.5 border-indigo-200">
                            {getPositionName(player.proPos || player.position)}
                          </Badge>
                        </div>
                        <span className={`font-black ${
                          index === 0 ? 'text-xl text-indigo-600' : 'text-lg text-indigo-500'
                        }`}>{player.gamesPlayed || 0}</span>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top 5 Más Expulsiones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="shadow-lg border-2 border-red-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3 bg-gradient-to-br from-red-100 via-red-50 to-white">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🟥</span>
                  <CardTitle className="text-base font-black text-red-900 uppercase tracking-wide">Top 5 Expulsiones</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {[...filteredAndSorted]
                    .sort((a, b) => (b.redCards || 0) - (a.redCards || 0))
                    .slice(0, 5)
                    .map((player, index) => (
                      <motion.div
                        key={player.playerId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                          index === 0 ? 'bg-gradient-to-r from-red-100 to-red-50 shadow-md' : 'hover:bg-slate-50'
                        }`}
                      >
                        {index < 3 ? (
                          <Medal className={`h-6 w-6 ${
                            index === 0 ? 'text-yellow-500 fill-yellow-500' :
                            index === 1 ? 'text-slate-400 fill-slate-400' :
                            'text-amber-700 fill-amber-700'
                          }`} />
                        ) : (
                          <span className="font-black text-lg text-slate-400 w-6 text-center">{index + 1}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate ${
                            index === 0 ? 'text-sm text-red-900' : 'text-xs text-slate-900'
                          }`}>
                            {player.proName || player.name}
                          </p>
                          <Badge variant="outline" className="text-[10px] mt-0.5 border-red-200">
                            {getPositionName(player.proPos || player.position)}
                          </Badge>
                        </div>
                        <span className={`font-black ${
                          index === 0 ? 'text-xl text-red-600' : 'text-lg text-red-500'
                        }`}>{player.redCards || 0}</span>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Tabla Principal de Jugadores */}
      <Card className="shadow-md">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Jugadores</CardTitle>
          <Input
            placeholder="Buscar jugadores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-3 md:mt-4 text-sm"
          />
        </CardHeader>
        <CardContent className="p-2 md:p-6">
        {filteredAndSorted.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No se encontraron jugadores
          </p>
        ) : (
          <div className="overflow-x-auto -mx-2 md:mx-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('name')}
                      className="text-xs md:text-sm"
                    >
                      Nombre <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs md:text-sm">Pos</TableHead>
                  <TableHead className="text-xs md:text-sm hidden sm:table-cell">ID PlayStation</TableHead>
                  <TableHead className="text-xs md:text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('gamesPlayed')}
                      className="text-xs md:text-sm"
                    >
                      PJ <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs md:text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('goals')}
                      className="text-xs md:text-sm"
                    >
                      Goles <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs md:text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('assists')}
                      className="text-xs md:text-sm"
                    >
                      Asist. <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs md:text-sm hidden md:table-cell">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('averageRating')}
                      className="text-xs md:text-sm"
                    >
                      Val. <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-xs md:text-sm hidden lg:table-cell">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('manOfTheMatch')}
                      className="text-xs md:text-sm"
                    >
                      MVP <ArrowUpDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TableHead>
                 
                  <TableHead className="text-xs md:text-sm hidden lg:table-cell">Expulsiones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSorted.map((member) => {
                  const isTopScorer = member.goals === Math.max(...filteredAndSorted.map(m => m.goals || 0));
                  const isTopAssist = member.assists === Math.max(...filteredAndSorted.map(m => m.assists || 0));
                  const isTopRating = member.averageRating === Math.max(...filteredAndSorted.map(m => m.averageRating || 0));
                  
                  return (
                    <TableRow key={member.playerId} className="text-xs md:text-sm">
                      <TableCell className="font-medium p-2 md:p-4">
                        <div className="flex items-center gap-1 md:gap-2">
                          <span className="truncate max-w-[100px] md:max-w-none">{member.proName || member.name}</span>
                          {(isTopScorer || isTopAssist || isTopRating) && (
                            <div className="flex gap-1">
                              {isTopScorer && (
                                <span title="Máximo goleador">
                                  <Trophy className="h-3 w-3 md:h-4 md:w-4 text-slate-800" />
                                </span>
                              )}
                              {isTopAssist && (
                                <span title="Máximo asistente">
                                  <Target className="h-3 w-3 md:h-4 md:w-4 text-slate-800" />
                                </span>
                              )}
                              {isTopRating && (
                                <span title="Mejor valoración">
                                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-slate-800" />
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-2 md:p-4">
                        <Badge variant="outline" className="font-mono text-[10px] md:text-xs">
                          {getPositionName(member.proPos || member.position)}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-2 md:p-4 hidden sm:table-cell">
                        <span className="font-mono text-[10px] md:text-xs text-slate-600 bg-slate-100 px-1 md:px-2 py-0.5 md:py-1 rounded">
                          {member.name}
                        </span>
                      </TableCell>
                      <TableCell className="p-2 md:p-4">{member.gamesPlayed}</TableCell>
                      <TableCell className="font-semibold text-slate-900 p-2 md:p-4">
                        {member.goals}
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900 p-2 md:p-4">
                        {member.assists}
                      </TableCell>
                      <TableCell className="p-2 md:p-4 hidden md:table-cell">
                        <Badge className="bg-slate-900 text-white text-[10px] md:text-xs">
                          {member.averageRating.toFixed(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900 p-2 md:p-4 hidden lg:table-cell">
                        {member.manOfTheMatch || 0}
                      </TableCell>
                     
                      <TableCell className="p-2 md:p-4 hidden lg:table-cell">
                        <div className="flex gap-1">
                          {typeof member.yellowCards === 'number' && member.yellowCards > 0 && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-[10px] md:text-xs">
                              {member.yellowCards}🟨
                            </Badge>
                          )}
                          {typeof member.redCards === 'number' && member.redCards > 0 && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 text-[10px] md:text-xs">
                              {member.redCards}🟥
                            </Badge>
                          )}
                          {(!member.yellowCards || member.yellowCards === 0) && (!member.redCards || member.redCards === 0) && '-'}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}
