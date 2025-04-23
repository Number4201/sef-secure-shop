
import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types/cart';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  formatPrice: (price: number) => string;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  updateQuantity, 
  removeItem,
  formatPrice
}) => {
  const increaseQuantity = () => updateQuantity(item.id, item.quantity + 1);
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className={cn(
      "flex items-start gap-4 py-4",
      "border-b border-white/10 last:border-none"
    )}>
      <div className="w-20 h-20 overflow-hidden rounded-lg border border-white/10">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base truncate">{item.name}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {formatPrice(item.price)} / ks
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-white/10 rounded-md bg-white/5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              aria-label="Snížit množství"
              className="h-8 w-8 hover:bg-white/5 text-white"
            >
              <MinusCircle size={16} />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={increaseQuantity}
              aria-label="Zvýšit množství"
              className="h-8 w-8 hover:bg-white/5 text-white"
            >
              <PlusCircle size={16} />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {formatPrice(item.price * item.quantity)}
            </span>
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              aria-label="Odebrat položku"
              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
