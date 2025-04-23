
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CartItem } from '@/types/cart';
import { Zap } from 'lucide-react';

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  // Výpočet celkové ceny
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  // Formátování cen
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('cs-CZ', { 
      style: 'currency', 
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Souhrn objednávky</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Mezisoučet</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Doprava</span>
          <span>{shipping === 0 ? 'Zdarma' : formatPrice(shipping)}</span>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between font-semibold">
            <span>Celkem</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Včetně DPH</div>
        </div>
      </div>
      
      <Button asChild className="w-full bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 mt-4">
        <Link to="/checkout">
          Pokračovat k objednávce
        </Link>
      </Button>
      
      <div className="mt-6 text-sm space-y-2">
        <p className="flex items-center gap-1">
          <Zap size={16} className="text-yellow-500" />
          <span>Doprava zdarma při objednávce nad 5 000 Kč</span>
        </p>
        <p className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
          <span>Bezpečná platba online</span>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
