import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { getProductsByCategorySync, getProductBySlugSync } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ChevronRight, ChevronLeft, Shield, Package, Truck, Clock } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { getTrendingProductIdForCategory } from '@/data/trendingProducts';
import { H3, P } from '@/components/ui/typography';

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
  // Získat produkty z dané kategorie a omezit na 6-8 produktů
  const products = getProductsByCategorySync(categorySlug).slice(0, 8);
  const { addItem } = useCart();

  // Získat trendující produkt pro kategorii
  const trendingProductId = getTrendingProductIdForCategory(categorySlug);
  const initialTrendingIndex = products.findIndex(p => p.id === trendingProductId);

  // Stav pro zobrazení trendujícího produktu
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(
    initialTrendingIndex >= 0 ? initialTrendingIndex : 0
  );

  // Funkce pro změnu trendujícího produktu - jednoduchý mechanismus bez slideru
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
    <section className="py-12 bg-white border-b border-gray-100 last:border-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8 fade-in">
          <div className="mr-4 bg-esejfy-burgundy/10 p-3 rounded-full">
            <Shield className="w-8 h-8 text-esejfy-burgundy" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 font-heading">{title}</h2>
            <p className="text-gray-700 max-w-3xl text-base font-body">{description}</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p>Žádné produkty v této kategorii nebyly nalezeny.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="mb-8">
              <H3 className="text-gray-900 mb-2">Nejoblíbenější {title.toLowerCase()}</H3>
              <P variant="muted" className="max-w-3xl">
                Vyberte si z nejoblíbenějších trezorů s certifikací a ochraňte to, co je pro vás nejcenější
              </P>

              <div className="flex flex-wrap gap-2 mt-6">
                <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-esejfy-lightgray hover:border-esejfy-burgundy/20 text-gray-700 font-medium flex items-center transition-all duration-200">
                  <span>Velikost trezorů</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
                <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-esejfy-lightgray hover:border-esejfy-burgundy/20 text-gray-700 font-medium flex items-center transition-all duration-200">
                  <span>Zámek</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
                <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-esejfy-lightgray hover:border-esejfy-burgundy/20 text-gray-700 font-medium flex items-center transition-all duration-200">
                  <span>Bezpečnostní třída</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
                <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-esejfy-lightgray hover:border-esejfy-burgundy/20 text-gray-700 font-medium flex items-center transition-all duration-200">
                  <span>Sleva</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            {/* Grid produktů - zobrazení produktů v řadě */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="product-card group">
                  <div className="relative">
                    <Link to={`/product/${product.slug}`} className="block">
                      <div className="relative pt-[75%] bg-white">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-contain p-6 product-image"
                        />
                      </div>
                    </Link>

                    {/* Badges */}
                    {product.safeClass && (
                      <div className="product-certification">
                        <Shield size={12} className="text-white" />
                        Třída {product.safeClass}
                      </div>
                    )}

                    {product.originalPrice && (
                      <div className="product-badge">
                        -{calculateDiscount(product.price, product.originalPrice)}%
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <Link to={`/product/${product.slug}`} className="block">
                      <h3 className="product-title mb-1 line-clamp-2 h-14">{product.name}</h3>
                    </Link>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600 font-body">
                        {product.safeClass && `Třída ${product.safeClass}`}
                        {product.lockType && ` - Zámek: ${product.lockType}`}
                      </p>
                    </div>

                    <div className="flex items-baseline mb-4">
                      <span className="product-price">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        className="btn-primary w-full"
                        disabled={!product.inStock}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem(product, 1);
                        }}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Do košíku
                      </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-4 space-y-2 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-700">
                        <Shield size={14} className="mr-2 text-esejfy-burgundy" />
                        Certifikace {product.safeClass && `Třída ${product.safeClass}`}
                      </div>
                      <div className="flex items-center text-xs text-gray-700">
                        <Clock size={14} className="mr-2 text-esejfy-burgundy" />
                        Záruka 10 let
                      </div>
                      <div className="flex items-center text-xs text-gray-700">
                        <Truck size={14} className="mr-2 text-esejfy-burgundy" />
                        Doprava zdarma
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to={`/products?category=${categorySlug}`}
                className="btn-primary px-8 py-3"
              >
                <span>Zobrazit celý sortiment trezorů</span>
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategorySection;
