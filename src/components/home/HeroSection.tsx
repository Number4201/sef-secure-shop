
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ShieldCheck, Lock, Flame } from 'lucide-react';

const FeatureBadge: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-esejfy-dark-secondary/70 p-3 rounded-lg backdrop-blur-sm border border-white/5">
    <span className="text-esejfy-burgundy">{icon}</span>
    <span className="font-medium text-sm text-white">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative bg-gradient-to-b from-esejfy-dark-primary to-esejfy-dark-secondary text-white min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto text-gray-300">
              Profesionální trezory a sejfy s certifikovanou ochranou
            </p>
          </div>
          
          <div className="bg-esejfy-dark-accent/30 backdrop-blur-sm rounded-lg shadow-lg p-6 mx-auto max-w-lg border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
            <div className="mt-12 relative">
              <img 
                src="/lovable-uploads/8f21bda6-5f68-4c70-8705-7765d844b368.png" 
                alt="eSEJFY trezor" 
                className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl border border-white/5 object-cover"
                loading="eager"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
