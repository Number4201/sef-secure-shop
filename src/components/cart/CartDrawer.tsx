
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import EmptyCartDrawer from './EmptyCartDrawer';
import CartDrawerContent from './CartDrawerContent';

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
          <EmptyCartDrawer onClose={onClose} />
        ) : (
          <CartDrawerContent
            cart={cart}
            updateItemQuantity={updateItemQuantity}
            removeItem={removeItem}
            onClose={onClose}
            totalPrice={totalPrice}
            formatPrice={formatPrice}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
