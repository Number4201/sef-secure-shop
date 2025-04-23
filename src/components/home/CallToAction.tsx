
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#1A1F2C] to-[#7E69AB] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white/20 p-10 rounded-2xl backdrop-blur-sm shadow-xl border border-white/30">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
              Potřebujete poradit?
            </h2>
            <p className="mb-0 md:max-w-xl text-white text-xl leading-relaxed">
              Naši specialisté jsou připraveni zodpovědět vaše dotazy a pomoci vám vybrat ten pravý trezor pro vaše potřeby.
            </p>
          </div>
          <div>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#7E69AB] shadow-lg transition-all duration-300 hover:scale-105 font-medium w-full sm:w-auto text-lg px-8 py-7"
            >
              <a href="mailto:info@esejfy.net" className="flex items-center gap-3 justify-center">
                <Mail size={22} />
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
