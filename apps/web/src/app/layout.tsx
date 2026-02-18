import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { Footer } from '@/components/footer';
import { AdBlockDetector } from '@/components/adblock-detector';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ProClubs Stats - EA SPORTS FC 25',
  description: 'Busca y rastrea las estadísticas de tu club en EA SPORTS FC 25 Pro Clubs',
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
        
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
