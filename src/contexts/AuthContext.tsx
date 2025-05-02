
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut, User } from '../services/auth';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          setUser(user);
          // Store user in localStorage for demo purposes
          if (user) localStorage.setItem('demo_auth_user', JSON.stringify(user));
        }
      } catch (error) {
        console.error('Error in auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up mock auth listener
    const mockAuthListener = () => {
      // This would be replaced with your actual auth listener
      console.log('Auth state listener would be set up here');
    };

    mockAuthListener();

    // Cleanup mock listener
    return () => {
      console.log('Auth listener cleanup would happen here');
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      // Clear demo user from localStorage
      localStorage.removeItem('demo_auth_user');
      
      setUser(null);
      toast({
        title: "Odhlášeno",
        description: "Byli jste úspěšně odhlášeni",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Chyba při odhlašování",
        description: "Zkuste to prosím znovu",
        variant: "destructive"
      });
    }
  };

  // Mock auth state changes - this simulates a successful login
  const simulateLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('demo_auth_user', JSON.stringify(userData));
    toast({
      title: "Přihlášení úspěšné",
      description: "Vítejte zpět!",
    });
  };

  // For development purposes, expose simulation function to window
  if (typeof window !== 'undefined') {
    (window as any).__simulateLogin = simulateLogin;
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
