import { useState, useEffect, useCallback } from 'react';
import medusaService from '@/services/medusa-service';
import { Cart } from '@medusajs/medusa';

// Klíč pro uložení ID košíku v localStorage
const CART_ID_KEY = 'medusa_cart_id';

/**
 * Hook pro práci s košíkem v Medusa.js
 */
export const useCart = () => {
  // Stav košíku
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Funkce pro inicializaci košíku
  const initCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Zkusíme načíst ID košíku z localStorage
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      
      if (savedCartId) {
        try {
          // Pokud máme ID košíku, zkusíme ho načíst
          const cart = await medusaService.cart.getCart(savedCartId);
          setCart(cart);
          console.log(`[Cart] Loaded existing cart with ID: ${savedCartId}`);
          setLoading(false);
          return;
        } catch (err) {
          // Pokud se nepodařilo načíst košík, vytvoříme nový
          console.warn(`[Cart] Failed to load cart with ID: ${savedCartId}. Creating new cart.`);
          localStorage.removeItem(CART_ID_KEY);
        }
      }
      
      // Vytvoříme nový košík
      const newCart = await medusaService.cart.createCart();
      setCart(newCart);
      localStorage.setItem(CART_ID_KEY, newCart.id);
      console.log(`[Cart] Created new cart with ID: ${newCart.id}`);
    } catch (err) {
      console.error('[Cart] Error initializing cart:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Inicializace košíku při prvním načtení
  useEffect(() => {
    initCart();
  }, [initCart]);

  // Funkce pro přidání položky do košíku
  const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
    if (!cart) {
      throw new Error('Cart not initialized');
    }
    
    setLoading(true);
    try {
      const updatedCart = await medusaService.cart.addItem(cart.id, variantId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error(`[Cart] Error adding item to cart:`, err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Funkce pro aktualizaci položky v košíku
  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) {
      throw new Error('Cart not initialized');
    }
    
    setLoading(true);
    try {
      const updatedCart = await medusaService.cart.updateItem(cart.id, lineId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error(`[Cart] Error updating item in cart:`, err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Funkce pro odstranění položky z košíku
  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) {
      throw new Error('Cart not initialized');
    }
    
    setLoading(true);
    try {
      const updatedCart = await medusaService.cart.removeItem(cart.id, lineId);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error(`[Cart] Error removing item from cart:`, err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Funkce pro přidání adresy k košíku
  const addShippingAddress = useCallback(async (address: any) => {
    if (!cart) {
      throw new Error('Cart not initialized');
    }
    
    setLoading(true);
    try {
      const updatedCart = await medusaService.cart.addShippingAddress(cart.id, address);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error(`[Cart] Error adding shipping address to cart:`, err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Funkce pro dokončení objednávky
  const completeCheckout = useCallback(async () => {
    if (!cart) {
      throw new Error('Cart not initialized');
    }
    
    setLoading(true);
    try {
      const order = await medusaService.cart.completeCart(cart.id);
      // Po dokončení objednávky odstraníme ID košíku z localStorage
      localStorage.removeItem(CART_ID_KEY);
      // Resetujeme stav košíku
      setCart(null);
      // Vytvoříme nový košík
      await initCart();
      return order;
    } catch (err) {
      console.error(`[Cart] Error completing checkout:`, err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart, initCart]);

  // Funkce pro resetování košíku
  const resetCart = useCallback(async () => {
    localStorage.removeItem(CART_ID_KEY);
    await initCart();
  }, [initCart]);

  // Vrátíme všechny potřebné funkce a stav
  return {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    addShippingAddress,
    completeCheckout,
    resetCart,
    // Pomocné gettery pro snadnější práci s košíkem
    isEmpty: cart?.items?.length === 0,
    itemsCount: cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    subtotal: cart?.subtotal || 0,
    total: cart?.total || 0,
    items: cart?.items || [],
  };
};

export default useCart;
