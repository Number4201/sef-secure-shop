
import React from 'react';
import { Suspense, lazy } from 'react';
import Navbar from './Navbar';

// Lazy load Footer for better initial load performance
const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Suspense fallback={<div className="h-64 bg-esejfy-gray/10"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
