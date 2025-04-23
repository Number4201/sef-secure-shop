
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { ShieldCheck, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format price with Czech formatting
  const formattedPrice = new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.originalPrice) : null;

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice ? 
    Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <Card className="overflow-hidden h-full border border-gray-200 product-card transition-all">
      <Link to={`/product/${product.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {discountPercentage && (
            <Badge className="absolute top-2 right-2 bg-esejfy-burgundy">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white py-1 px-2 text-sm text-center">
              Momentálně nedostupné
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Link to={`/product/${product.slug}`} className="hover:text-esejfy-burgundy transition-colors">
              <h3 className="font-semibold mb-2">{product.name}</h3>
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.safeClass && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  <ShieldCheck size={12} /> Třída {product.safeClass}
                </Badge>
              )}
              {product.fireResistance && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  <Flame size={12} /> {product.fireResistance}
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-esejfy-burgundy">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">{formattedOriginalPrice}</span>
              )}
            </div>
            <div className="mt-3">
              <Link 
                to={`/product/${product.slug}`} 
                className="block text-center bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white py-2 px-4 rounded transition-colors w-full"
              >
                Zobrazit detail
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
