import { type MemberStats } from '@proclubs/shared';

const POSITION_GROUP: Record<string, string> = {
  goalkeeper: 'Portero',
  keeper: 'Portero',
  gk: 'Portero',
  defender: 'Defensa',
  midfielder: 'Mediocampista',
  forward: 'Delantero',
  striker: 'Delantero',
  any: 'Cualquiera',
};

const POSITION_MAP: Record<string, string> = {
  '0': 'POR',
  '1': 'LI',
  '2': 'LIB',
  '3': 'DFC',
  '4': 'LD',
  '5': 'CAR',
  '6': 'CAI',
  '7': 'MCD',
  '8': 'CAD',
  '9': 'CAD',
  '10': 'MCD',
  '11': 'MC',
  '12': 'MI',
  '13': 'MD',
  '14': 'MCO',
  '15': 'EI',
  '16': 'ED',
  '17': 'MI',
  '18': 'MD',
  '19': 'SD',
  '20': 'DC',
  '21': 'EI',
  '22': 'ED',
  '23': 'DC',
  '24': 'DC',
  '25': 'ANY',
};

export function positionName(value?: string | number | null) {
  if (value === undefined || value === null || value === '' || value === 'N/A') return 'Jugador';
  const raw = String(value).trim();
  const group = POSITION_GROUP[raw.toLowerCase()];
  if (group) return group;
  if (POSITION_MAP[raw]) return POSITION_MAP[raw];
  if (/^\d+$/.test(raw)) return 'Jugador';
  return raw;
}

export function positionLabel(member: MemberStats) {
  if (member.favoritePosition && POSITION_GROUP[member.favoritePosition.toLowerCase()]) {
    return POSITION_GROUP[member.favoritePosition.toLowerCase()];
  }
  return positionName(member.proPos || member.position);
}
