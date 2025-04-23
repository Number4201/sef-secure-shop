
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Potřebujete poradit? Kontaktujte nás!
            </h2>
            <p className="mb-0 md:max-w-xl text-white/90 text-lg">
              Naši specialisté jsou připraveni zodpovědět vaše dotazy a pomoci vám vybrat ten pravý trezor.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-[#7E69AB] hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <a href="/kontakt" className="flex items-center gap-2">
                <PhoneCall size={18} />
                <span>Zavolat</span>
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/20 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <a href="mailto:info@esejfy.net" className="flex items-center gap-2">
                <Mail size={18} />
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

