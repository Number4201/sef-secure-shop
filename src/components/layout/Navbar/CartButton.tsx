
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import CartDrawer from '@/components/cart/CartDrawer';

const CartButton = () => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const itemCount = getTotalItems();
  
  return (
    <>
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setIsCartOpen(true)}
        aria-label="Otevřít košík"
      >
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-esejfy-burgundy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartButton;
