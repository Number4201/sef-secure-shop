import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AppContextType {
  isLoading: boolean;
  isApiAvailable: boolean;
  apiError: string | null;
}

const AppContext = createContext<AppContextType>({
  isLoading: true,
  isApiAvailable: false,
  apiError: null,
});

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isApiAvailable, setIsApiAvailable] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        console.log('[App] Checking API availability...');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000';
        
        // Přidáno logování pro debugging
        console.log(`[App] Using API URL: ${apiUrl}`);
        
        const response = await axios.get(`${apiUrl}`, { timeout: 5000 });
        
        console.log('[App] API response:', response.data);
        
        if (response.status === 200) {
          console.log('[App] API is available');
          setIsApiAvailable(true);
        } else {
          console.error('[App] API returned non-200 status:', response.status);
          setApiError(`API server returned status ${response.status}`);
        }
      } catch (error) {
        console.error('[App] Error checking API availability:', error);
        setApiError('Nepodařilo se připojit k API serveru');
      } finally {
        // Simulujeme delší načítání, aby byl vidět loading screen
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    checkApiAvailability();
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, isApiAvailable, apiError }}>
      {children}
    </AppContext.Provider>
  );
};
