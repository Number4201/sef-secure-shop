
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CallToAction: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'py-12' : 'py-24'} bg-gradient-to-r from-[#1A1F2C] to-[#7E69AB] text-white`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col items-center justify-between ${isMobile ? 'gap-6 p-6' : 'gap-10 p-10'} bg-white/20 rounded-xl backdrop-blur-sm shadow-xl border border-white/30`}>
          <div className={`w-full ${!isMobile && 'md:w-2/3'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-white drop-shadow-md`}>
              Potřebujete poradit?
            </h2>
            <p className={`mb-0 text-white ${isMobile ? 'text-base' : 'text-xl'} leading-relaxed`}>
              Naši specialisté jsou připraveni zodpovědět vaše dotazy.
            </p>
          </div>
          <div>
            <Button 
              asChild 
              variant="outline" 
              size={isMobile ? "default" : "lg"} 
              className="border-2 border-white text-white hover:bg-white hover:text-[#7E69AB] shadow-lg transition-all duration-300 hover:scale-105 font-medium w-full text-base px-6 py-4"
            >
              <a href="mailto:info@esejfy.net" className="flex items-center gap-2 justify-center">
                <Mail size={isMobile ? 18 : 22} />
                <span>Napsat e-mail</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
