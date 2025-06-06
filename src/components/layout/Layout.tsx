
import React from 'react';
import { Suspense, lazy } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from './Navbar';
import ContactButton from '../ui/ContactButton';

const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-esejfy-dark-primary text-white overflow-hidden">
      <Navbar />
      <main className="flex-grow relative w-full">
        {children}
      </main>
      <Suspense fallback={<div className="h-16 bg-esejfy-dark-secondary"></div>}>
        <Footer />
      </Suspense>
      
      {/* Contact button - displayed on all pages */}
      <ContactButton />
    </div>
  );
};

export default Layout;
