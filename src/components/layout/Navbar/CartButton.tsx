
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import CartDrawer from '@/components/cart/CartDrawer';

const CartButton = () => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsCartOpen(true)}
        className="hover:bg-esejfy-lightgray relative"
        aria-label="Košík"
      >
        <ShoppingCart size={20} />
        <span className="absolute top-0 right-0 bg-esejfy-burgundy text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {getTotalItems()}
        </span>
      </Button>
      
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartButton;
