
import React from 'react';
import { Suspense, lazy } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from './Navbar';

// Lazy load Footer for better initial load performance
const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-full relative">
      <Navbar />
      <main className="flex-grow relative">
        {children}
      </main>
      <Suspense fallback={<div className="h-16 bg-esejfy-gray/10"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
