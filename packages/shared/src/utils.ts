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

export const platformLabel = (platform: string): string => {
  switch (platform) {
    case 'common-gen5':
      return 'Current Gen';
    case 'common-gen4':
      return 'Last Gen';
    case 'nx':
      return 'Switch';
    default:
      return platform;
  }
};
