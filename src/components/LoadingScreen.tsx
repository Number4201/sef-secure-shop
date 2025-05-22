import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Načítání aplikace...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <h1 className="text-2xl font-bold mb-4 text-white">{message}</h1>
        <p className="text-gray-300">Prosím vyčkejte, načítáme data...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
