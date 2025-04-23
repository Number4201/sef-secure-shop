
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-esejfy-burgundy mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Stránka nebyla nalezena</p>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Omlouváme se, ale hledaná stránka neexistuje nebo byla přesunuta.
        </p>
        <Button asChild className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
          <Link to="/">
            Zpět na hlavní stránku
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
