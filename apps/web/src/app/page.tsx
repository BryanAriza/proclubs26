import { Metadata } from 'next';
import { SearchPage } from '@/components/search-page';

export const metadata: Metadata = {
  title: 'ProClubs Stats - Busca Estadísticas de EA SPORTS FC 26 Pro Clubs',
  description: 'Busca y consulta estadísticas completas de cualquier club en EA SPORTS FC 26 Pro Clubs. Análisis de jugadores, historial de partidos, división, habilidad y rankings. Compatible con PlayStation 5, Xbox Series X|S, PS4, Xbox One y Nintendo Switch. 100% Gratis, sin registro.',
  keywords: ['buscar pro clubs', 'estadísticas pro clubs', 'EA FC 26', 'stats tracker', 'club search', 'pro clubs rankings', 'player stats', 'match history', 'división pro clubs', 'habilidad club'],
  openGraph: {
    title: 'ProClubs Stats - Busca tu Club en EA SPORTS FC 26',
    description: 'Plataforma gratuita para buscar y analizar estadísticas de clubes en EA SPORTS FC 26 Pro Clubs. Información en tiempo real de todas las plataformas.',
    type: 'website',
    url: 'https://proclubsstats.com',
  },
};

export default function Home() {
  return <SearchPage />;
}
