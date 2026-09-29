'use client';

import { motion } from 'framer-motion';
import { type MemberStats } from '@proclubs/shared';
import { positionLabel } from './player-position';

function topBy(
  members: MemberStats[],
  pick: (member: MemberStats) => number,
  minimumGames = 0,
) {
  return [...members]
    .filter((member) => member.gamesPlayed >= minimumGames && pick(member) > 0)
    .sort((a, b) => pick(b) - pick(a))
    .slice(0, 5);
}

function RankingCard({
  title,
  note,
  rows,
  format,
  index,
}: {
  title: string;
  note: string;
  rows: MemberStats[];
  format: (member: MemberStats) => string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.55)] ring-1 ring-slate-200"
    >
      <header className="px-5 pb-2 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Top 5</p>
        <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{title}</h3>
      </header>
      <ol className="mt-2 flex-1 px-2">
        {rows.length === 0 && (
          <li className="px-3 py-8 text-sm text-slate-400">Nadie acumula este dato todavía</li>
        )}
        {rows.map((member, rowIndex) => (
          <motion.li
            key={`${title}-${member.playerId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + rowIndex * 0.04 }}
            className="flex items-center gap-3 border-t border-slate-100 px-3 py-3"
          >
            <span
              className={`w-6 text-center text-base font-black tabular-nums ${
                rowIndex === 0 ? 'text-amber-500' : 'text-slate-300'
              }`}
            >
              {rowIndex + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-slate-950">{member.name}</p>
              <p className="truncate text-xs text-slate-500">
                {member.proName && member.proName !== member.name ? `${member.proName} · ` : ''}
                {positionLabel(member)} · {member.gamesPlayed} PJ
              </p>
            </div>
            <span className="text-2xl font-black tabular-nums tracking-tight text-slate-950">
              {format(member)}
            </span>
          </motion.li>
        ))}
      </ol>
      <p className="mt-2 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs leading-relaxed text-slate-500">
        {note}
      </p>
    </motion.article>
  );
}

export function PlayerRankings({
  members,
  isLoading,
}: {
  members: MemberStats[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        Cargando ranking
      </div>
    );
  }

  const cards = [
    {
      title: 'Goles',
      note: 'Total de goles que EA publica para el jugador en este club. No es un promedio por partido.',
      rows: topBy(members, (member) => member.goals),
      format: (member: MemberStats) => String(member.goals),
    },
    {
      title: 'Asistencias',
      note: 'Total de asistencias del jugador en el club, tal como lo entrega EA.',
      rows: topBy(members, (member) => member.assists),
      format: (member: MemberStats) => String(member.assists),
    },
    {
      title: 'Pases',
      note: 'Cantidad de pases realizados. Mide volumen, no calidad: quien más juega suele quedar arriba.',
      rows: topBy(members, (member) => member.passesMade || 0),
      format: (member: MemberStats) => String(member.passesMade || 0),
    },
    {
      title: 'Precisión de pase',
      note: 'Porcentaje de pase exitoso que EA ya calcula. Solo entran jugadores con al menos 5 partidos.',
      rows: topBy(members, (member) => member.passSuccessRate || 0, 5),
      format: (member: MemberStats) => `${member.passSuccessRate || 0}%`,
    },
    {
      title: 'Entradas',
      note: 'Total de entradas hechas. No usa el porcentaje de entradas ganadas.',
      rows: topBy(members, (member) => member.tacklesMade || 0),
      format: (member: MemberStats) => String(member.tacklesMade || 0),
    },
    {
      title: 'Valoración media',
      note: 'Nota media del partido (por ejemplo 7.5), no la media de la carta. Mínimo 5 partidos.',
      rows: topBy(members, (member) => member.averageRating, 5),
      format: (member: MemberStats) => member.averageRating.toFixed(1),
    },
    {
      title: 'MVP',
      note: 'Veces que el jugador fue el mejor del partido, según el dato que publica EA para este club.',
      rows: topBy(members, (member) => member.manOfTheMatch || 0),
      format: (member: MemberStats) => String(member.manOfTheMatch || 0),
    },
    {
      title: 'Expulsiones',
      note: 'Total de tarjetas rojas que EA registra para el jugador en este club.',
      rows: topBy(members, (member) => member.redCards || 0),
      format: (member: MemberStats) => String(member.redCards || 0),
    },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">Ranking del club</h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Los cinco mejores en cada apartado. La nota de cada lista está al pie de la tarjeta.
        </p>
      </motion.div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <RankingCard key={card.title} index={index} {...card} />
        ))}
      </div>
    </div>
  );
}
