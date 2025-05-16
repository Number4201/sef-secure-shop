import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import TrendingProductManager from '@/components/admin/TrendingProductManager';

const TrendingProductsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Správa trendujících produktů</h1>
        <p className="mb-6 text-gray-600">
          Zde můžete nastavit, které produkty se budou zobrazovat jako trendující v jednotlivých kategoriích na hlavní stránce.
        </p>
        <TrendingProductManager />
      </div>
    </AdminLayout>
  );
};

export default TrendingProductsPage;
