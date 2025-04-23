
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  title?: string;
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title, columns = 4 }) => {
  // Dynamically determine grid columns class
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid grid-cols-1 gap-6";
      case 2:
        return "grid grid-cols-1 sm:grid-cols-2 gap-6";
      case 3:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
      case 5:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
    }
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>}
      <div className={getGridClass()}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
