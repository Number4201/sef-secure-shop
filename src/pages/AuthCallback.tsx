
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // The hash fragment or query string contains the authentication result
        // Supabase client will automatically handle this when loaded
        
        // Navigate back to the home page or the page they were on before
        const returnTo = localStorage.getItem('authReturnTo') || '/';
        localStorage.removeItem('authReturnTo'); // Clean up
        
        toast({
          title: "Přihlášení úspěšné",
          description: "Vítejte zpět!"
        });
        
        navigate(returnTo);
      } catch (error) {
        console.error('OAuth callback error:', error);
        toast({
          title: "Chyba přihlášení",
          description: "Nepodařilo se dokončit přihlášení.",
          variant: "destructive"
        });
        navigate('/');
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg">Přihlašování...</p>
    </div>
  );
};

export default AuthCallback;
