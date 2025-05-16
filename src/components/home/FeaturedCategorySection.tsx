import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { getProductsByCategorySync, getProductBySlugSync } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { getTrendingProductIdForCategory } from '@/data/trendingProducts';

interface FeaturedCategorySectionProps {
  categorySlug: string;
  title: string;
  description: string;
}

const FeaturedCategorySection: React.FC<FeaturedCategorySectionProps> = ({
  categorySlug,
  title,
  description
}) => {
  // Získat produkty z dané kategorie a omezit na 8
  const products = getProductsByCategorySync(categorySlug).slice(0, 8);
  const { addItem } = useCart();

  // Získat trendující produkt pro kategorii
  const trendingProductId = getTrendingProductIdForCategory(categorySlug);
  const trendingProduct = trendingProductId
    ? products.find(p => p.id === trendingProductId) || products[0]
    : products[0];

  // Stav pro zobrazení trendujícího produktu
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [showTrendingProduct, setShowTrendingProduct] = useState(true);

  // Funkce pro změnu trendujícího produktu
  const changeTrendingProduct = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTrendingIndex((prev) => (prev + 1) % products.length);
    } else {
      setCurrentTrendingIndex((prev) => (prev - 1 + products.length) % products.length);
    }
  };

  // Výpočet slevy
  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return null;
    return Math.round((1 - price / originalPrice) * 100);
  };

  return (
    <section className="py-4 bg-white last:border-0">
      <div className="container mx-auto px-4">
        <div className="mb-2">
          <h2 className="text-xl md:text-2xl font-bold mb-0.5">{title}</h2>
          <p className="text-gray-800 max-w-3xl font-medium text-sm md:text-base">{description}</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p>Žádné produkty v této kategorii nebyly nalezeny.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-2">
            {/* Trendující produkt */}
            <div className="mb-2 border-b border-gray-100 pb-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-500 mr-1" />
                  <h3 className="text-sm font-semibold">Trendující produkt v kategorii</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => changeTrendingProduct('prev')}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => changeTrendingProduct('next')}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/3 sm:w-1/4 md:w-1/5">
                  <Link to={`/product/${products[currentTrendingIndex].slug}`} className="block">
                    <div className="relative h-32 sm:h-36 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={products[currentTrendingIndex].image}
                        alt={products[currentTrendingIndex].name}
                        className="w-full h-full object-cover"
                      />
                      {products[currentTrendingIndex].originalPrice && (
                        <div className="absolute top-1 right-1 bg-esejfy-burgundy text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          -{calculateDiscount(products[currentTrendingIndex].price, products[currentTrendingIndex].originalPrice)}%
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                <div className="w-2/3 sm:w-3/4 md:w-4/5 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${products[currentTrendingIndex].slug}`} className="hover:text-esejfy-burgundy transition-colors">
                      <h4 className="font-medium text-sm mb-1 line-clamp-2 text-gray-900">{products[currentTrendingIndex].name}</h4>
                    </Link>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">{products[currentTrendingIndex].description.substring(0, 100)}...</p>

                    <div className="flex items-baseline mb-1">
                      <span className="text-base font-bold text-esejfy-burgundy">
                        {formatPrice(products[currentTrendingIndex].price)}
                      </span>
                      {products[currentTrendingIndex].originalPrice && (
                        <span className="ml-1 text-xs text-gray-500 line-through">
                          {formatPrice(products[currentTrendingIndex].originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white py-1 px-2 rounded text-xs flex items-center justify-center"
                      disabled={!products[currentTrendingIndex].inStock}
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(products[currentTrendingIndex], 1);
                      }}
                    >
                      <ShoppingCart size={12} className="mr-1" />
                      Do košíku
                    </button>
                    <Link
                      to={`/product/${products[currentTrendingIndex].slug}`}
                      className="border border-esejfy-burgundy text-esejfy-burgundy hover:bg-esejfy-burgundy hover:text-white transition-colors py-1 px-2 rounded text-xs flex items-center justify-center"
                    >
                      Detail produktu
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid produktů */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1.5">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <Link to={`/product/${product.slug}`} className="block">
                    <div className="relative h-40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-1 right-1 bg-esejfy-burgundy text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          -{calculateDiscount(product.price, product.originalPrice)}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white py-0.5 px-1 text-xs text-center">
                          Nedostupné
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-1.5">
                    <Link to={`/product/${product.slug}`} className="hover:text-esejfy-burgundy transition-colors">
                      <h4 className="font-medium text-xs mb-1 line-clamp-2 h-8 text-gray-900">{product.name}</h4>
                    </Link>

                    <div className="flex items-baseline mb-1">
                      <span className="text-sm font-bold text-esejfy-burgundy">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-1 text-xs text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      className="w-full bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white py-1 px-2 rounded text-xs flex items-center justify-center"
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem(product, 1);
                      }}
                    >
                      <ShoppingCart size={12} className="mr-1" />
                      Do košíku
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 text-center">
              <Link
                to={`/products?category=${categorySlug}`}
                className="inline-flex items-center px-2 py-1 border border-esejfy-burgundy text-esejfy-burgundy hover:bg-esejfy-burgundy hover:text-white transition-colors duration-200 rounded text-xs font-medium"
              >
                Zobrazit všechny produkty v této kategorii
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategorySection;
