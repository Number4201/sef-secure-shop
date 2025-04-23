
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
    <section className="relative bg-gradient-to-r from-esejfy-burgundy to-esejfy-burgundy/80 text-white overflow-hidden">
      <div className={`container mx-auto px-4 ${isMobile ? 'py-8 mobile-simple' : 'py-16 md:py-28'}`}>
        <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'}`}>
          <div className="space-y-4 fade-in">
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold leading-tight`}>
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-90 max-w-lg`}>
              Profesionální trezory a sejfy s certifikovanou ochranou
            </p>
          </div>
          
          {!isMobile && (
            <div className="slide-in">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1610130383669-95917c70ca20?q=80&w=1200" 
                  alt="eSEJFY trezor" 
                  className="w-full rounded-xl shadow-2xl border-4 border-white/20"
                  loading="eager"
                />
                
                <div className="absolute -bottom-8 left-0 right-0 mx-auto w-11/12">
                  <div className="bg-white text-gray-800 rounded-lg shadow-xl p-3 grid grid-cols-3 gap-1">
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
              </div>
            </div>
          )}
        </div>
        
        {isMobile && (
          <div className="mt-6 flex justify-center">
            <div className="bg-white text-gray-800 rounded-lg shadow-xl p-3 grid grid-cols-3 gap-2 w-full">
              <FeatureBadge 
                icon={<ShieldCheck size={18} className="text-esejfy-burgundy" />} 
                text="Certifikováno" 
              />
              <FeatureBadge 
                icon={<Lock size={18} className="text-esejfy-burgundy" />} 
                text="Zabezpečeno" 
              />
              <FeatureBadge 
                icon={<Flame size={18} className="text-esejfy-burgundy" />} 
                text="Ohnivzdorné" 
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 75% 70%, 50% 50%, 25% 70%, 0 30%)'
      }}></div>
    </section>
  );
};

export default HeroSection;
