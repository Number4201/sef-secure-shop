
import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  const formattedPrice = new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(item.price);

  const formattedTotal = new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(item.price * item.quantity);

  const increaseQuantity = () => updateQuantity(item.id, item.quantity + 1);
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200">
      <div className="sm:w-24 h-24 relative overflow-hidden rounded">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col sm:flex-row flex-1 gap-4 justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-base">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-1">Jednotková cena: {formattedPrice}</p>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex items-center border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              aria-label="Snížit množství"
              className="h-8 w-8"
            >
              <MinusCircle size={16} />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={increaseQuantity}
              aria-label="Zvýšit množství"
              className="h-8 w-8"
            >
              <PlusCircle size={16} />
            </Button>
          </div>
          
          <div className="text-right min-w-[90px]">
            <div className="font-semibold">{formattedTotal}</div>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            aria-label="Odebrat položku"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
