'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type Platform, type MatchType } from '@proclubs/shared';
import { clubsApi } from '@/lib/api';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Award, ChevronDown } from 'lucide-react';
import { positionName } from './player-position';
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

function formatMatchDate(timestamp: number) {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
  });
}

function teamTotals(players: any[]) {
  const totalPasses = players.reduce((sum, player) => sum + (player.passes || 0), 0);
  const totalPassesCompleted = players.reduce((sum, player) => sum + (player.passesCompleted || 0), 0);
  return {
    totalPasses,
    totalPassesCompleted,
    passPct: totalPasses > 0 ? Math.round((totalPassesCompleted / totalPasses) * 100) : 0,
    totalShots: players.reduce((sum, player) => sum + (player.shots || 0), 0),
    totalTackles: players.reduce((sum, player) => sum + (player.tackles || 0), 0),
    totalYellowCards: players.reduce((sum, player) => sum + (player.yellowCards || 0), 0),
    totalRedCards: players.reduce((sum, player) => sum + (player.redCards || 0), 0),
  };
}

function PlayerTable({ title, players }: { title: string; players: any[] }) {
  if (players.length === 0) return null;

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200">
      <p className="border-b border-slate-100 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">{title}</p>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {['Jugador', 'Pos', 'G', 'A', 'Tiros', 'Pases', 'Ent.', 'Nota'].map((label) => (
                <TableHead key={label} className="h-9 px-2 text-center text-[11px] first:text-left">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...players]
              .sort((a, b) => Number(b.manOfTheMatch > 0) - Number(a.manOfTheMatch > 0) || (b.rating || 0) - (a.rating || 0))
              .map((player, index) => {
              const isMvp = player.manOfTheMatch > 0;
              return (
              <TableRow key={`${player.name}-${index}`} className={isMvp ? 'bg-amber-50 hover:bg-amber-50' : undefined}>
                <TableCell className="px-2 py-2">
                  <span className="inline-flex items-center gap-2 font-semibold text-slate-950">
                    {player.vProName || player.name}
                    {isMvp && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-950">
                        <Award className="h-3 w-3" />
                        MVP
                      </span>
                    )}
                  </span>
                </TableCell>
                <TableCell className="px-2 py-2 text-center text-xs text-slate-500">
                  {positionName(player.vProPosition || player.position)}
                </TableCell>
                <TableCell className="px-2 py-2 text-center font-bold">{player.goals || 0}</TableCell>
                <TableCell className="px-2 py-2 text-center">{player.assists || 0}</TableCell>
                <TableCell className="px-2 py-2 text-center">{player.shots || 0}</TableCell>
                <TableCell className="px-2 py-2 text-center text-xs">
                  {player.passesCompleted || 0}/{player.passes || 0}
                  {player.passAccuracy ? ` · ${player.passAccuracy.toFixed(0)}%` : ''}
                </TableCell>
                <TableCell className="px-2 py-2 text-center">{player.tackles || 0}</TableCell>
                <TableCell className="px-2 py-2 text-center font-semibold">
                  {player.rating ? Number(player.rating).toFixed(1) : '—'}
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function MatchesList({ platform, clubId }: MatchesListProps) {
  const [matchType, setMatchType] = useState<MatchType>('league');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ['club', 'matches', platform, clubId, matchType],
    queryFn: () => clubsApi.getClubMatches(platform, clubId, matchType),
  });

  const types: Array<{ id: MatchType; label: string }> = [
    { id: 'league', label: 'Liga' },
    { id: 'playoff', label: 'Playoff' },
    { id: 'friendly', label: 'Amistoso' },
    { id: 'tournament', label: 'Torneo' },
  ];

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.55)] ring-1 ring-slate-200">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950">Partidos</h2>
          <p className="text-sm text-slate-500">Toca un resultado para ver el detalle</p>
        </div>
        <Tabs value={matchType} onValueChange={(value) => setMatchType(value as MatchType)}>
          <TabsList className="grid h-auto w-full grid-cols-4 rounded-2xl p-1 sm:w-auto">
            {types.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="rounded-xl px-3 text-xs normal-case tracking-normal">
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
          Cargando partidos
        </div>
      )}

      {!isLoading && matches.length === 0 && (
        <div className="px-6 py-14 text-center">
          <p className="font-bold text-slate-900">No hay partidos de este tipo</p>
          {matchType === 'tournament' && (
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Los Club Tournaments son nuevos en FC 27. Aparecerán aquí cuando EA los publique, aparte de liga y playoff.
            </p>
          )}
        </div>
      )}

      {!isLoading && matches.length > 0 && (
        <ul>
          {matches.map((match) => {
            const myClub = match.clubs[clubId];
            const opponentId = Object.keys(match.clubs).find((id) => id !== clubId);
            const opponent = opponentId ? match.clubs[opponentId] : undefined;
            if (!myClub) return null;

            const myPlayers = Object.values(match.players || {}).filter(
              (player: any) => player.team === '0' || player.clubId === clubId,
            );
            const opponentPlayers = Object.values(match.players || {}).filter(
              (player: any) => player.team === '1' || (player.clubId && player.clubId !== clubId),
            );
            const mine = teamTotals(myPlayers);
            const theirs = teamTotals(opponentPlayers);
            const totalPasses = mine.totalPasses + theirs.totalPasses;
            const myPossession = totalPasses > 0 ? Math.round((mine.totalPasses / totalPasses) * 100) : 0;
            const theirPossession = totalPasses > 0 ? 100 - myPossession : 0;
            const myScore = Number(myClub.score) || 0;
            const opponentScore = opponent ? Number(opponent.score) || 0 : 0;
            const result = myScore > opponentScore ? 'V' : myScore < opponentScore ? 'D' : 'E';
            const open = expandedMatch === match.matchId;
            const resultClass =
              result === 'V'
                ? 'bg-emerald-100 text-emerald-800'
                : result === 'D'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-slate-100 text-slate-600';

            const mvps = [...myPlayers, ...opponentPlayers].filter((player: any) => player.manOfTheMatch > 0);

            const comparison = [
              ['Goles', myScore, opponentScore],
              ['Posesión', `${myPossession}%`, `${theirPossession}%`],
              ['Tiros', mine.totalShots, theirs.totalShots],
              ['Pases', `${mine.passPct}%`, `${theirs.passPct}%`],
              ['Entradas', mine.totalTackles, theirs.totalTackles],
              ['Rojas', mine.totalRedCards, theirs.totalRedCards],
            ];

            return (
              <li key={match.matchId} className="border-t border-slate-100 first:border-t-0">
                <button
                  type="button"
                  onClick={() => setExpandedMatch(open ? null : match.matchId)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-black ${resultClass}`}>
                    {result}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate text-sm font-bold text-slate-950">
                        {myClub.clubName || 'Tu club'}
                      </p>
                      <p className="w-16 flex-shrink-0 text-center text-lg font-black tabular-nums text-slate-950">
                        {myScore}<span className="mx-1 text-slate-300">-</span>{opponentScore}
                      </p>
                      <p className="min-w-0 flex-1 truncate text-right text-sm font-semibold text-slate-700">
                        {opponent?.clubName || 'Rival'}
                      </p>
                    </div>
                    {mvps.length > 0 && (
                      <p className="mt-0.5 truncate text-xs font-semibold text-amber-700">
                        MVP {mvps.map((player: any) => player.vProName || player.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="hidden w-16 flex-shrink-0 text-right text-xs text-slate-400 sm:block">
                    {formatMatchDate(match.timestamp)}
                  </span>
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-300 transition ${open ? 'rotate-180' : ''}`} />
                </button>

                {open && (
                  <div className="space-y-4 border-t border-slate-100 bg-slate-50/70 px-4 py-4">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="grid grid-cols-[1fr_auto_1fr] border-b border-slate-100 px-3 py-2 text-xs font-semibold text-slate-400">
                        <span className="truncate">{myClub.clubName || 'Tu club'}</span>
                        <span />
                        <span className="truncate text-right">{opponent?.clubName || 'Rival'}</span>
                      </div>
                      {comparison.map(([label, left, right]) => (
                        <div key={String(label)} className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-slate-100 px-3 py-2 text-sm">
                          <span className="font-bold tabular-nums text-slate-950">{left}</span>
                          <span className="px-4 text-center text-xs text-slate-400">{label}</span>
                          <span className="text-right font-bold tabular-nums text-slate-950">{right}</span>
                        </div>
                      ))}
                    </div>
                    {mvps.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {mvps.map((player: any) => (
                          <p
                            key={player.playerId || player.name}
                            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1.5 text-sm font-black text-amber-950"
                          >
                            <Award className="h-4 w-4" />
                            MVP · {player.vProName || player.name}
                            {player.rating ? ` · ${Number(player.rating).toFixed(1)}` : ''}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="grid gap-3 xl:grid-cols-2">
                      <PlayerTable title={myClub.clubName || 'Tu club'} players={myPlayers} />
                      <PlayerTable title={opponent?.clubName || 'Rival'} players={opponentPlayers} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
