
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, Flame } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-esejfy-burgundy to-esejfy-burgundy/80 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Profesionální trezory a sejfy s certifikovanou ochranou pro vaše cennosti, dokumenty a zbraně.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-white text-esejfy-burgundy hover:bg-white/90">
                <Link to="/products">
                  Prozkoumat produkty
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/kontakt">
                  Kontaktujte nás
                </Link>
              </Button>
            </div>
          </div>
          <div className="slide-in">
            <div className="relative">
              {/* Main image */}
              <img 
                src="https://images.unsplash.com/photo-1610130383669-95917c70ca20?q=80&w=2000" 
                alt="eSEJFY trezor" 
                className="w-full rounded-lg shadow-2xl"
              />
              
              {/* Features */}
              <div className="absolute -bottom-6 left-0 right-0 mx-auto w-5/6">
                <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={24} className="text-esejfy-burgundy" />
                    <span className="font-medium text-sm">Certifikováno</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={24} className="text-esejfy-burgundy" />
                    <span className="font-medium text-sm">Zabezpečeno</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame size={24} className="text-esejfy-burgundy" />
                    <span className="font-medium text-sm">Ohnivzdorné</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
      }}></div>
    </section>
  );
};

export default HeroSection;
