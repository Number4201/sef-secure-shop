
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import CartItem from './CartItem';
import { useCart } from '@/hooks/use-cart';

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

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <span>Košík ({getTotalItems()})</span>
          </SheetTitle>
          <SheetDescription>
            Prohlédněte si produkty přidané do košíku
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingCart size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Váš košík je prázdný</p>
              <Button asChild className="bg-esejfy-burgundy" onClick={onClose}>
                <Link to="/products">Prozkoumat produkty</Link>
              </Button>
            </div>
          ) : (
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
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-semibold">
                <span>Celkem:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={onClose}>
                  Pokračovat v nákupu
                </Button>
                <Button asChild className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
                  <Link to="/cart" onClick={onClose}>
                    Dokončit objednávku
                  </Link>
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
