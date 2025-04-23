
import React from 'react';
import { Suspense, lazy } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from './Navbar';

const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-full relative bg-esejfy-dark-primary text-white">
      <Navbar />
      <main className="flex-grow relative">
        {children}
      </main>
      <Suspense fallback={<div className="h-16 bg-esejfy-dark-secondary"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
