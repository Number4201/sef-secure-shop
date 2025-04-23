
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Načtení košíku z local storage při prvním renderování
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Chyba při načítání košíku:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Uložení košíku do local storage při každé změně
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addItem = (product: Product, quantity: number) => {
    setCart(prevCart => {
      // Kontrola, zda už je produkt v košíku
      const existingItemIndex = prevCart.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex !== -1) {
        // Aktualizace množství, pokud je produkt již v košíku
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Množství aktualizováno",
          description: `${product.name} množství aktualizováno na ${updatedCart[existingItemIndex].quantity} ks`
        });
        
        return updatedCart;
      } else {
        // Přidání nového produktu do košíku
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        };
        
        toast({
          title: "Přidáno do košíku",
          description: `${product.name} byl přidán do košíku (${quantity} ks)`
        });
        
        return [...prevCart, newItem];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.id === id);
      if (item) {
        toast({
          title: "Odebráno z košíku",
          description: `${item.name} byl odebrán z košíku`
        });
      }
      return prevCart.filter(item => item.id !== id);
    });
  };
  
  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Košík vyprázdněn",
      description: "Všechny položky byly odebrány z košíku"
    });
  };
  
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const value = {
    cart,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
