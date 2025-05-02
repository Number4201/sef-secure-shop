
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // This is a placeholder for handling the OAuth callback from your backend
        console.log('Auth callback would handle OAuth response here');
        
        // Simulate successful login for demo purposes
        const mockUser = {
          id: '1',
          email: 'google-user@example.com',
          user_metadata: {
            full_name: 'Google User',
            avatar_url: ''
          }
        };
        
        localStorage.setItem('demo_auth_user', JSON.stringify(mockUser));
        
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
