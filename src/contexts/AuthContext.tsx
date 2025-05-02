
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut, supabase } from '../services/auth';
import { toast } from '@/components/ui';

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
};

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
        }
      } catch (error) {
        console.error('Error in auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Přihlášení úspěšné",
          description: "Vítejte zpět!",
        });
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Odhlášeno",
          description: "Byli jste úspěšně odhlášeni",
        });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Chyba při odhlašování",
        description: "Zkuste to prosím znovu",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
