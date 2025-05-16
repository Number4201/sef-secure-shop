import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { getProductsByCategorySync } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Flame } from 'lucide-react';

interface CategoryProductsPreviewProps {
  category: string | null;
  onClose: () => void;
}

const CategoryProductsPreview: React.FC<CategoryProductsPreviewProps> = ({ category, onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    if (category) {
      // Získat produkty z dané kategorie a omezit na 5
      const categoryProducts = getProductsByCategorySync(category).slice(0, 5);
      setProducts(categoryProducts);
    }
  }, [category]);

  // Pokud není vybrána žádná kategorie, nezobrazovat nic
  if (!category) {
    return null;
  }

  // Získat název kategorie pro zobrazení
  const getCategoryName = (categorySlug: string) => {
    const categoryMap: Record<string, string> = {
      'nabytkove-trezory': 'Nábytkové trezory',
      'trezory-do-zdi': 'Trezory do zdi',
      'trezory-na-zbrane': 'Trezory na zbraně',
      'trezory-do-podlahy': 'Trezory do podlahy',
      'ohnivzdorne-trezory': 'Ohnivzdorné trezory',
      'trezory-na-hotovost': 'Trezory na hotovost',
      'vhozove-trezory': 'Vhozové trezory',
      'trezorove-dvere': 'Trezorové dveře',
      'archivacni-skrine': 'Archivační skříně',
      'trezory-na-klice': 'Trezory na klíče',
      'hotelove-trezory': 'Hotelové trezory',
      'trezory-na-dokumenty': 'Trezory na dokumenty',
      'penezni-boxy': 'Peněžní boxy',
      'rozbalene-produkty': 'Výprodej - rozbaleno',
      'kreone-keybox': 'Creone / Keybox'
    };

    return categoryMap[categorySlug] || categorySlug;
  };

  // Formátování ceny
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Výpočet slevy
  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice) return null;
    return Math.round((1 - price / originalPrice) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{getCategoryName(category)}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Zavřít náhled"
        >
          <X size={24} />
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p>Žádné produkty v této kategorii nebyly nalezeny.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="relative h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {calculateDiscount(product.price, product.originalPrice) && (
                      <Badge className="absolute top-2 right-2 bg-esejfy-burgundy">
                        -{calculateDiscount(product.price, product.originalPrice)}%
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white py-1 px-2 text-sm text-center">
                        Momentálně nedostupné
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/product/${product.slug}`} className="hover:text-esejfy-burgundy transition-colors">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
                  </Link>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.safeClass && (
                      <Badge variant="outline" className="flex items-center gap-1 text-xs border-blue-500 text-blue-600">
                        <ShieldCheck size={10} /> {product.safeClass}
                      </Badge>
                    )}
                    {product.fireResistance && (
                      <Badge variant="outline" className="flex items-center gap-1 text-xs border-orange-500 text-orange-600">
                        <Flame size={10} /> {product.fireResistance}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-baseline mb-2">
                    <span className="text-base font-bold text-esejfy-burgundy">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="w-full bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white"
                      onClick={() => addItem(product, 1)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart size={14} className="mr-1" />
                      Do košíku
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              to={`/products?category=${category}`}
              className="inline-block text-esejfy-burgundy hover:text-esejfy-burgundy/80 font-medium"
            >
              Zobrazit všechny produkty v této kategorii
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProductsPreview;
