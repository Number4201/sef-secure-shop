
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import CartIcon from '@/components/cart/CartIcon';

const CartButton = () => {
  const isMobile = useIsMobile();

  // Na mobilních zařízeních zobrazíme pouze ikonu s odkazem na košík
  if (isMobile) {
    return (
      <Link to="/cart">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 h-10 w-10 p-2"
          aria-label="Košík"
        >
          <ShoppingCart size={18} />
        </Button>
      </Link>
    );
  }

  // Na desktopu zobrazíme CartIcon s popoverem
  return <CartIcon />;
};

export default CartButton;
