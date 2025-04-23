
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import CartDrawer from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';

const CartButton = () => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = getTotalItems();
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsCartOpen(true)}
        className="hover:bg-white/5 relative"
        aria-label="Košík"
      >
        <ShoppingCart size={20} className="text-white" />
        {totalItems > 0 && (
          <span className={cn(
            "absolute -top-1 -right-1 bg-esejfy-burgundy text-white",
            "text-xs rounded-full min-w-[18px] h-[18px]",
            "flex items-center justify-center",
            "animate-in fade-in duration-200"
          )}>
            {totalItems}
          </span>
        )}
      </Button>
      
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartButton;
