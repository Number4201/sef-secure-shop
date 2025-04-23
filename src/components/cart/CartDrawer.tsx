
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import CartItem from './CartItem';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, updateItemQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', { 
      style: 'currency', 
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(price);
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const isFreeShipping = totalPrice >= 5000;
  const remainingForFreeShipping = 5000 - totalPrice;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-lg p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <span>Košík ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingCart size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Váš košík je prázdný</p>
            <Button asChild variant="default" onClick={onClose}>
              <Link to="/products">Prozkoumat produkty</Link>
            </Button>
          </div>
        ) : (
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
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
