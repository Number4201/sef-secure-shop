
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ShieldCheck, Lock, Flame } from 'lucide-react';

const FeatureBadge: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-esejfy-dark-secondary/50 p-3 rounded-lg backdrop-blur-sm">
    <span className="text-esejfy-burgundy">{icon}</span>
    <span className="font-medium text-sm text-white">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative bg-gradient-to-r from-esejfy-dark-primary to-esejfy-dark-secondary text-white min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-gradient">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto text-gray-300">
              Profesionální trezory a sejfy s certifikovanou ochranou
            </p>
          </div>
          
          <div className="bg-esejfy-dark-accent/30 backdrop-blur-sm rounded-lg shadow-lg p-6 mx-auto max-w-sm border border-white/10">
            <div className="grid grid-cols-1 gap-3">
              <FeatureBadge 
                icon={<ShieldCheck size={20} />} 
                text="Certifikováno" 
              />
              <FeatureBadge 
                icon={<Lock size={20} />} 
                text="Zabezpečeno" 
              />
              <FeatureBadge 
                icon={<Flame size={20} />} 
                text="Ohnivzdorné" 
              />
            </div>
          </div>

          {!isMobile && (
            <div className="mt-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200" 
                alt="eSEJFY trezor" 
                className="w-full max-w-xl mx-auto rounded-xl shadow-2xl border border-white/10"
                loading="eager"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="h-8 bg-gradient-to-b from-esejfy-dark-primary to-white/5"></div>
    </section>
  );
};

export default HeroSection;
