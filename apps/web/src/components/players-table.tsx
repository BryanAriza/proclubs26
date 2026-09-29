'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { type MemberStats } from '@proclubs/shared';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ArrowUpDown } from 'lucide-react';
import { positionLabel } from './player-position';

interface PlayersTableProps {
  members: MemberStats[];
  isLoading: boolean;
}

type SortKey =
  | 'name'
  | 'proOverall'
  | 'gamesPlayed'
  | 'goals'
  | 'passesMade'
  | 'passSuccessRate'
  | 'tacklesMade'
  | 'tackleSuccessRate'
  | 'cleanSheets'
  | 'winRate'
  | 'assists';

const MotionRow = motion.create(TableRow);

export function PlayersTable({ members, isLoading }: PlayersTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('goals');
  const [sortDesc, setSortDesc] = useState(true);

  const filteredAndSorted = useMemo(() => {
    const filtered = members.filter((member) =>
      `${member.name} ${member.proName || ''}`.toLowerCase().includes(search.toLowerCase()),
    );

    filtered.sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDesc ? bVal - aVal : aVal - bVal;
      }
      return sortDesc
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });

    return filtered;
  }, [members, search, sortKey, sortDesc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(key !== 'name');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-slate-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        Cargando jugadores
      </div>
    );
  }

  const columns: Array<{ key: SortKey; label: string }> = [
    { key: 'proOverall', label: 'Media' },
    { key: 'gamesPlayed', label: 'PJ' },
    { key: 'goals', label: 'Goles' },
    { key: 'passesMade', label: 'Pases' },
    { key: 'passSuccessRate', label: '% pase' },
    { key: 'tacklesMade', label: 'Entradas' },
    { key: 'tackleSuccessRate', label: '% entrada' },
    { key: 'cleanSheets', label: 'Vallas' },
    { key: 'winRate', label: '% victorias' },
    { key: 'assists', label: 'Asist.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">Estadísticas individuales</h2>
          <p className="mt-1 text-sm text-slate-500">{members.length} jugadores del club</p>
        </div>
        <Input
          placeholder="Buscar jugador"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full rounded-2xl border-slate-200 bg-slate-50 md:max-w-xs"
        />
      </div>
      {filteredAndSorted.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-slate-500">No hay jugadores con ese nombre</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-[180px] bg-slate-950">
                <SortButton active={sortKey === 'name'} onClick={() => handleSort('name')} label="Jugador" onDark />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.key} className="bg-slate-950 text-right">
                  <SortButton
                    active={sortKey === column.key}
                    onClick={() => handleSort(column.key)}
                    label={column.label}
                    align="right"
                    onDark
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.map((member, index) => (
              <MotionRow
                key={member.playerId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index, 8) * 0.03 }}
              >
                <TableCell>
                  <p className="text-xs font-medium text-slate-400">{positionLabel(member)}</p>
                  <p className="font-bold text-slate-950">{member.name}</p>
                  {member.proName && member.proName !== member.name && (
                    <p className="text-xs font-medium text-slate-400">{member.proName}</p>
                  )}
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{member.proOverall ?? '—'}</TableCell>
                <TableCell className="text-right tabular-nums">{member.gamesPlayed}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{member.goals}</TableCell>
                <TableCell className="text-right tabular-nums">{member.passesMade ?? 0}</TableCell>
                <TableCell className="text-right tabular-nums">{member.passSuccessRate ?? 0}</TableCell>
                <TableCell className="text-right tabular-nums">{member.tacklesMade ?? 0}</TableCell>
                <TableCell className="text-right tabular-nums">{member.tackleSuccessRate ?? 0}</TableCell>
                <TableCell className="text-right tabular-nums">{member.cleanSheets ?? 0}</TableCell>
                <TableCell className="text-right tabular-nums">{member.winRate ?? 0}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">{member.assists}</TableCell>
              </MotionRow>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
}

function SortButton({
  label,
  active,
  align = 'left',
  onDark = false,
  onClick,
}: {
  label: string;
  active: boolean;
  align?: 'left' | 'right';
  onDark?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide transition ${
        align === 'right' ? 'ml-auto' : ''
      } ${
        onDark
          ? active
            ? 'text-amber-300'
            : 'text-slate-300 hover:text-white'
          : active
            ? 'text-slate-950'
            : 'text-slate-400 hover:text-slate-700'
      }`}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );
}
