import { useState, useEffect, useCallback } from 'react';
import medusaService from '@/services/medusa-service';
import { Product } from '@/types/product';

/**
 * Hook pro práci s produkty v Medusa.js
 */
export const useProducts = () => {
  // Stav produktů
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Funkce pro načtení všech produktů
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await medusaService.fetchProducts();
      setProducts(products);
      return products;
    } catch (err) {
      console.error('[Products] Error fetching products:', err);
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Načtení produktů při prvním načtení
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Funkce pro načtení produktů podle kategorie
  const fetchProductsByCategory = useCallback(async (categoryHandle: string) => {
    setLoading(true);
    setError(null);
    try {
      const products = await medusaService.fetchProductsByCategory(categoryHandle);
      return products;
    } catch (err) {
      console.error(`[Products] Error fetching products for category ${categoryHandle}:`, err);
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro načtení produktu podle handle (slug)
  const fetchProductByHandle = useCallback(async (handle: string) => {
    setLoading(true);
    setError(null);
    try {
      const product = await medusaService.fetchProductByHandle(handle);
      return product;
    } catch (err) {
      console.error(`[Products] Error fetching product with handle ${handle}:`, err);
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro načtení doporučených produktů
  const fetchFeaturedProducts = useCallback(async (count: number = 4) => {
    setLoading(true);
    setError(null);
    try {
      const products = await medusaService.fetchFeaturedProducts(count);
      return products;
    } catch (err) {
      console.error(`[Products] Error fetching featured products:`, err);
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro vyhledávání produktů
  const searchProducts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // Medusa nemá přímo endpoint pro vyhledávání, takže načteme všechny produkty a filtrujeme je
      const allProducts = await medusaService.fetchProducts();
      const searchQuery = query.toLowerCase();
      
      const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        (product.description && product.description.toLowerCase().includes(searchQuery))
      );
      
      return filteredProducts;
    } catch (err) {
      console.error(`[Products] Error searching products:`, err);
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Vrátíme všechny potřebné funkce a stav
  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductByHandle,
    fetchFeaturedProducts,
    searchProducts,
    refreshProducts: fetchProducts,
  };
};

export default useProducts;
