export const formatNumber = (num: number | undefined): string => {
  if (num === undefined || num === null) return '0';
  return num.toLocaleString('en-US');
};

export const formatWinRate = (wins: number, total: number): string => {
  if (total === 0) return '0%';
  return ((wins / total) * 100).toFixed(1) + '%';
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Nombres publicados por EA en el sitio de Clubs.
const regionNames: Record<number, string> = {
  4344147: 'Islas Británicas',
  4539733: 'Europa del Este',
  5129557: 'Europa del Norte',
  5457237: 'Europa del Sur',
  4543827: 'Costa Este de EE. UU.',
  5723475: 'Costa Oeste de EE. UU.',
  5719381: 'Europa Occidental',
  5456205: 'América del Sur',
  4407629: 'América Central',
  4281153: 'Asia',
  4281683: 'Australia y Nueva Zelanda',
};

export const getRegionName = (regionId?: number | null): string => {
  if (!regionId) return 'Desconocida';
  return regionNames[regionId] || `Región ${regionId}`;
};

export const platformLabel = (platform: string): string => {
  switch (platform) {
    case 'common-gen5':
      return 'Cross-Play';
    case 'common-gen4':
      return 'Last Gen';
    case 'nx':
      return 'Switch 2';
    default:
      return platform;
  }
};
