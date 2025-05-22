
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { ShieldCheck, Flame, Droplets, Lock, Award, Ruler, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <Card className="overflow-hidden h-full border border-gray-700 bg-esejfy-dark-secondary product-card transition-all hover:border-esejfy-burgundy">
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
              <h3 className="font-semibold mb-2 text-white">{product.name}</h3>
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              {/* Bezpečnostní certifikace */}
              {product.certificationStandard && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="flex items-center gap-1 text-xs bg-green-700 hover:bg-green-800 text-white cursor-help">
                        <Award size={12} /> {product.certificationStandard}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Certifikováno podle evropské normy pro bezpečnostní úschovné objekty</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {/* Bezpečnostní třída */}
              {product.safeClass && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-blue-500 text-blue-400">
                  <ShieldCheck size={12} /> Třída {product.safeClass}
                </Badge>
              )}

              {/* Ohnivzdornost */}
              {product.fireResistance && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-orange-500 text-orange-400">
                  <Flame size={12} /> {product.fireResistance}
                </Badge>
              )}

              {/* Vodotěsnost */}
              {product.waterResistant && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-blue-500 text-blue-400">
                  <Droplets size={12} /> Vodotěsný
                </Badge>
              )}

              {/* Typ zámku */}
              {product.lockType && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs border-gray-500 text-gray-400">
                  <Lock size={12} /> {product.lockType === 'electronic' ? 'Elektronický zámek' : 'Klíčový zámek'}
                </Badge>
              )}
            </div>

            {/* Rozměry a specifikace */}
            <div className="text-xs text-gray-400 mb-3">
              {product.dimensions && (
                <div className="flex items-center gap-1 mb-1">
                  <Ruler size={12} className="text-gray-500" />
                  <span>
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} mm
                    {product.internalDimensions && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help ml-1 underline decoration-dotted">
                              (vnější)
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Vnitřní rozměry: {product.internalDimensions.width} × {product.internalDimensions.height} × {product.internalDimensions.depth} mm</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </span>
                </div>
              )}

              {/* Vnitřní vybavení */}
              {(product.shelves || product.hooks || (product.interiorFeatures && product.interiorFeatures.length > 0)) && (
                <div className="flex items-center gap-1">
                  <BookOpen size={12} className="text-gray-500" />
                  <span>
                    {product.shelves && `${product.shelves} ${product.shelves === 1 ? 'police' : 'police'}`}
                    {product.shelves && product.hooks && ', '}
                    {product.hooks && `${product.hooks} ${product.hooks === 1 ? 'háček' : 'háčky'}`}
                    {((product.shelves || product.hooks) && product.interiorFeatures && product.interiorFeatures.length > 0) && ', '}
                    {product.interiorFeatures && product.interiorFeatures.length > 0 && product.interiorFeatures.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-esejfy-burgundy">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">{formattedOriginalPrice}</span>
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
