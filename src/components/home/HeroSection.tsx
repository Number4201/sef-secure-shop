
import React from 'react';
import { ShieldCheck, Lock, Flame } from 'lucide-react';

const FeatureBadge: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-medium text-sm md:text-base">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-esejfy-burgundy to-esejfy-burgundy/80 text-white">
      <div className="container mx-auto px-4 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed">
              Profesionální trezory a sejfy s certifikovanou ochranou pro vaše cennosti, dokumenty a zbraně.
            </p>
          </div>
          <div className="slide-in">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1610130383669-95917c70ca20?q=80&w=2000" 
                alt="eSEJFY trezor" 
                className="w-full rounded-xl shadow-2xl border-4 border-white/20"
                loading="eager"
              />
              
              <div className="absolute -bottom-8 left-0 right-0 mx-auto w-11/12">
                <div className="bg-white text-gray-800 rounded-lg shadow-xl p-3 md:p-5 grid grid-cols-3 gap-1 md:gap-2">
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
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 75% 70%, 50% 50%, 25% 70%, 0 30%)'
      }}></div>
    </section>
  );
};

export default HeroSection;
