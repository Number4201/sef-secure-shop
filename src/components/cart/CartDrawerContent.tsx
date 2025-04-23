
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from '@/types/cart';
import CartItem from './CartItem';
import { ShoppingCart } from 'lucide-react';

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
          <div className="mb-4 bg-blue-50 p-3 rounded-lg text-sm">
            <div className="text-blue-700 mb-1">
              Do dopravy zdarma zbývá {formatPrice(remainingForFreeShipping)}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
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
            />
          ))}
        </div>
      </div>

      <div className="border-t px-6 py-4 bg-gray-50">
        <div className="mb-4">
          <div className="flex justify-between text-base font-semibold">
            <span>Celkem:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Včetně DPH</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Pokračovat v nákupu
          </Button>
          <Button 
            asChild 
            className="w-full bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
          >
            <Link to="/cart" onClick={onClose}>
              Dokončit objednávku
            </Link>
          </Button>
        </div>
        
        {isFreeShipping && (
          <div className="mt-3 text-sm text-green-600 flex items-center justify-center gap-1">
            <span>✓</span> Doprava zdarma
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawerContent;
