
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shield, Lock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeatureInfo: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-esejfy-burgundy">{icon}</span>
    <span className="font-medium text-sm">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleExploreProducts = () => {
    navigate('/products');
  };

  return (
    <section className="relative bg-esejfy-dark-secondary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold leading-tight`}>
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg opacity-90 text-white">
              Profesionální trezory a sejfy s certifikovanou ochranou pro vaše cennosti, dokumenty a zbraně.
            </p>
            
            <div>
              <Button 
                onClick={handleExploreProducts}
                size={isMobile ? "default" : "lg"}
                className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white font-medium"
              >
                Prozkoumat produkty
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/lovable-uploads/61aa061a-fdac-40e0-baf5-49d9f35949cb.png" 
                alt="Bezpečnostní trezory a sejfy" 
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            
            <div className="absolute -bottom-5 left-0 right-0 bg-esejfy-dark-accent rounded-lg p-4 mx-4 shadow-lg flex justify-around">
              <FeatureInfo icon={<Shield size={24} />} text="Certifikováno" />
              <FeatureInfo icon={<Lock size={24} />} text="Zabezpečeno" />
              <FeatureInfo icon={<Flame size={24} />} text="Ohnivzdorné" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Vlna na spodní části sekce */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440 74V21.6542C1314.73 58.6542 1134.25 74 898.669 74C663.084 74 453.822 58.6542 270.881 21.6542C179.406 3.98615 89.7029 -4.91725 0 4.99691V74H1440Z"
            fill="#1A1F2C"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
