import React, { createContext, useContext, ReactNode } from 'react';
import useCustomer from '@/hooks/useCustomer';
import { Customer } from '@medusajs/medusa';

// Typ pro kontext uživatele
interface CustomerContextType {
  customer: Customer | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<Customer>;
  login: (email: string, password: string) => Promise<Customer>;
  logout: () => Promise<boolean>;
  getOrders: () => Promise<any[]>;
  refreshCustomer: () => Promise<Customer | null>;
}

// Vytvoření kontextu
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Provider komponenta
export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const customer = useCustomer();

  return (
    <CustomerContext.Provider value={customer}>
      {children}
    </CustomerContext.Provider>
  );
};

// Hook pro použití kontextu
export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

export default CustomerContext;
