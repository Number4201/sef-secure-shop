
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from '@/types/cart';
import CartItem from './CartItem';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartDrawerContentProps {
  cart: CartItemType[];
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  onClose: () => void;
  totalPrice: number;
  formatPrice: (price: number) => string;
}

const CartDrawerContent: React.FC<CartDrawerContentProps> = ({
  cart,
  updateItemQuantity,
  removeItem,
  onClose,
  totalPrice,
  formatPrice
}) => {
  const isFreeShipping = totalPrice >= 5000;
  const remainingForFreeShipping = 5000 - totalPrice;

  return (
    <>
      <div className="flex-1 overflow-y-auto py-4 px-6">
        {!isFreeShipping && (
          <div className="mb-6 neo-blur p-4 rounded-lg text-sm">
            <div className="text-white mb-2">
              Do dopravy zdarma zbývá {formatPrice(remainingForFreeShipping)}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-esejfy-burgundy h-2 rounded-full transition-all duration-300"
                style={{ width: `${(totalPrice / 5000) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateItemQuantity} 
              removeItem={removeItem}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>

      <div className={cn(
        "border-t border-white/10 px-6 py-4",
        "bg-esejfy-dark-primary/50 backdrop-blur-lg"
      )}>
        <div className="mb-4">
          <div className="flex justify-between text-base font-semibold">
            <span>Celkem:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Včetně DPH</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="w-full border-white/10 text-white hover:bg-white/5"
            onClick={onClose}
          >
            Pokračovat v nákupu
          </Button>
          <Button 
            asChild 
            className="w-full bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
          >
            <Link to="/cart" onClick={onClose}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Dokončit objednávku
            </Link>
          </Button>
        </div>
        
        {isFreeShipping && (
          <div className="mt-3 text-sm text-green-400 flex items-center justify-center gap-1">
            <span>✓</span> Doprava zdarma
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawerContent;
