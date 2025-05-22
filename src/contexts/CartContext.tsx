import React, { createContext, useContext, ReactNode } from 'react';
import useCart from '@/hooks/useCart';
import { Cart } from '@medusajs/medusa';

// Typ pro kontext košíku
interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: Error | null;
  addItem: (variantId: string, quantity?: number) => Promise<Cart>;
  updateItem: (lineId: string, quantity: number) => Promise<Cart>;
  removeItem: (lineId: string) => Promise<Cart>;
  addShippingAddress: (address: any) => Promise<Cart>;
  completeCheckout: () => Promise<any>;
  resetCart: () => Promise<void>;
  isEmpty: boolean;
  itemsCount: number;
  subtotal: number;
  total: number;
  items: any[];
}

// Vytvoření kontextu
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider komponenta
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pro použití kontextu
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
