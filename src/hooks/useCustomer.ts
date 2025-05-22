import { useState, useEffect, useCallback } from 'react';
import medusaService from '@/services/medusa-service';
import { Customer } from '@medusajs/medusa';

/**
 * Hook pro práci s uživatelem v Medusa.js
 */
export const useCustomer = () => {
  // Stav uživatele
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Funkce pro načtení aktuálního uživatele
  const fetchCustomer = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const customer = await medusaService.customer.getCurrentCustomer();
      setCustomer(customer);
      setIsAuthenticated(!!customer);
      return customer;
    } catch (err) {
      console.error('[Customer] Error fetching customer:', err);
      setError(err as Error);
      setIsAuthenticated(false);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Načtení uživatele při prvním načtení
  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  // Funkce pro registraci nového uživatele
  const register = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    setError(null);
    try {
      const customer = await medusaService.customer.register(email, password, firstName, lastName);
      setCustomer(customer);
      setIsAuthenticated(true);
      return customer;
    } catch (err) {
      console.error('[Customer] Error registering customer:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro přihlášení uživatele
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const customer = await medusaService.customer.login(email, password);
      setCustomer(customer);
      setIsAuthenticated(true);
      return customer;
    } catch (err) {
      console.error('[Customer] Error logging in customer:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro odhlášení uživatele
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await medusaService.customer.logout();
      setCustomer(null);
      setIsAuthenticated(false);
      return true;
    } catch (err) {
      console.error('[Customer] Error logging out customer:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro získání objednávek uživatele
  const getOrders = useCallback(async () => {
    if (!isAuthenticated) {
      throw new Error('Customer not authenticated');
    }
    
    setLoading(true);
    try {
      const orders = await medusaService.order.getCustomerOrders();
      return orders;
    } catch (err) {
      console.error('[Customer] Error fetching customer orders:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Vrátíme všechny potřebné funkce a stav
  return {
    customer,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    getOrders,
    refreshCustomer: fetchCustomer,
  };
};

export default useCustomer;
