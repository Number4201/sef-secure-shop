
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
    <section className="relative bg-gradient-to-b from-esejfy-dark-primary to-esejfy-dark-secondary text-white min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto text-gray-300 mb-8">
              Profesionální trezory a sejfy s certifikovanou ochranou
            </p>
          </div>
          
          <div className="bg-esejfy-dark-accent/30 backdrop-blur-sm rounded-lg shadow-lg p-6 mx-auto max-w-lg border border-white/5 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FeatureBadge 
                icon={<ShieldCheck size={24} />} 
                text="Certifikováno" 
              />
              <FeatureBadge 
                icon={<Lock size={24} />} 
                text="Zabezpečeno" 
              />
              <FeatureBadge 
                icon={<Flame size={24} />} 
                text="Ohnivzdorné" 
              />
            </div>
          </div>

          {!isMobile && (
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-esejfy-burgundy/30 blur-xl opacity-20"></div>
              <img 
                src="/lovable-uploads/fe2b8111-2fab-4f28-8fbf-914c1baf888d.png" 
                alt="Moderní trezor eSEJFY" 
                className="w-full rounded-xl shadow-2xl border border-white/10 object-cover relative z-10"
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
