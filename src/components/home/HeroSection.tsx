
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, Flame } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-esejfy-burgundy to-esejfy-burgundy/80 text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-lg leading-relaxed">
              Profesionální trezory a sejfy s certifikovanou ochranou pro vaše cennosti, dokumenty a zbraně.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-esejfy-burgundy hover:bg-white/90 text-lg px-8 py-7">
                <Link to="/products">
                  Prozkoumat produkty
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
                className="w-full rounded-xl shadow-2xl border-4 border-white/20"
              />
              
              {/* Features */}
              <div className="absolute -bottom-8 left-0 right-0 mx-auto w-11/12">
                <div className="bg-white text-gray-800 rounded-lg shadow-xl p-5 flex justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={28} className="text-esejfy-burgundy" />
                    <span className="font-medium text-base">Certifikováno</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock size={28} className="text-esejfy-burgundy" />
                    <span className="font-medium text-base">Zabezpečeno</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Flame size={28} className="text-esejfy-burgundy" />
                    <span className="font-medium text-base">Ohnivzdorné</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative shape with more curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 75% 70%, 50% 50%, 25% 70%, 0 30%)'
      }}></div>
    </section>
  );
};

export default HeroSection;
