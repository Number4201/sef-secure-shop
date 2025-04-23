
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ShieldCheck, Lock, Flame } from 'lucide-react';

const FeatureBadge: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-medium text-sm">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative bg-gradient-to-r from-esejfy-burgundy to-esejfy-burgundy/80 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Profesionální trezory a sejfy s certifikovanou ochranou
            </p>
          </div>
          
          {/* Mobile feature badges - simplified and redesigned */}
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 mx-auto max-w-sm">
            <div className="grid grid-cols-1 gap-3">
              <FeatureBadge 
                icon={<ShieldCheck size={20} className="text-esejfy-burgundy" />} 
                text="Certifikováno" 
              />
              <FeatureBadge 
                icon={<Lock size={20} className="text-esejfy-burgundy" />} 
                text="Zabezpečeno" 
              />
              <FeatureBadge 
                icon={<Flame size={20} className="text-esejfy-burgundy" />} 
                text="Ohnivzdorné" 
              />
            </div>
          </div>

          {/* Desktop image - only shown on larger screens */}
          {!isMobile && (
            <div className="mt-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1610130383669-95917c70ca20?q=80&w=1200" 
                alt="eSEJFY trezor" 
                className="w-full max-w-xl mx-auto rounded-xl shadow-2xl border-4 border-white/20"
                loading="eager"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Removed the wave divider that could cause layout issues */}
      <div className="h-8 bg-white"></div>
    </section>
  );
};

export default HeroSection;
