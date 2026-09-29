import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { Footer } from '@/components/footer';
import { AdBlockDetector } from '@/components/adblock-detector';
import { AppIntro } from '@/components/app-intro';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ProClubs Stats - Estadísticas de EA SPORTS FC 27 Pro Clubs',
    template: '%s | ProClubs Stats'
  },
  description: 'Busca y rastrea las estadísticas completas de tu club en EA SPORTS FC 27 Pro Clubs. Análisis de jugadores, historial de partidos, división, habilidad y más. Compatible con PlayStation 5, Xbox Series X|S, PC y Nintendo Switch 2.',
  keywords: ['Pro Clubs', 'EA SPORTS FC 27', 'FC 27', 'Clubs', 'The Grounds', 'estadísticas', 'clubes', 'FIFA', 'EA Sports', 'PlayStation 5', 'Xbox Series', 'PC', 'Nintendo Switch 2', 'Pro Clubs Stats', 'stats tracker', 'club stats', 'player stats'],
  authors: [{ name: 'ProClubs Stats' }],
  creator: 'ProClubs Stats',
  publisher: 'ProClubs Stats',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://proclubsstats.com',
    title: 'ProClubs Stats - Estadísticas de EA SPORTS FC 27 Pro Clubs',
    description: 'Plataforma completa para consultar estadísticas de clubes en EA SPORTS FC 27 Pro Clubs. Análisis detallado, historial de partidos y rankings de jugadores.',
    siteName: 'ProClubs Stats',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProClubs Stats - Estadísticas de EA SPORTS FC 27 Pro Clubs',
    description: 'Busca y analiza las estadísticas de tu club en EA SPORTS FC 27 Pro Clubs. Gratis y sin registro.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code', // Reemplazar con tu código de verificación de Google
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Google AdSense Script */}
        <Script
          id="adsbygoogle-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5068650876748087"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        
        {/* Detector de AdBlock */}
        <AdBlockDetector />
        <AppIntro />
        
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
