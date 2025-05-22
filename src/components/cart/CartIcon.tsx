import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CartIcon: React.FC = () => {
  const { itemsCount, items, total, loading } = useCartContext();

  // Formátování ceny
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price / 100); // Medusa ukládá ceny v nejmenších jednotkách měny (centy)
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {!loading && itemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-esejfy-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemsCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white">Váš košík</h3>
          <p className="text-sm text-gray-400">
            {itemsCount > 0 
              ? `${itemsCount} ${itemsCount === 1 ? 'položka' : itemsCount >= 2 && itemsCount <= 4 ? 'položky' : 'položek'}`
              : 'Košík je prázdný'}
          </p>
        </div>
        
        {items.length > 0 ? (
          <>
            <div className="max-h-60 overflow-auto">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 border-b border-gray-700 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title || 'Produkt'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ShoppingCart size={16} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-white truncate">{item.title}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{item.quantity} ks</span>
                      <span className="text-sm text-esejfy-burgundy">{formatPrice(item.unit_price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {items.length > 3 && (
                <div className="p-3 text-center text-sm text-gray-400">
                  + {items.length - 3} další {items.length - 3 === 1 ? 'položka' : 'položky'}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-white">Celkem:</span>
                <span className="font-semibold text-esejfy-burgundy">{formatPrice(total)}</span>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1 text-sm">
                  <Link to="/cart">Košík</Link>
                </Button>
                <Button asChild className="flex-1 bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-sm">
                  <Link to="/checkout">Pokladna</Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 mb-4">Váš košík je prázdný</p>
            <Button asChild className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
              <Link to="/products">Prohlédnout produkty</Link>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CartIcon;
