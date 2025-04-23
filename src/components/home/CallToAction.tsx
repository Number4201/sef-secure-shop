
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#1A1F2C] to-[#7E69AB] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/20 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-white/30">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
              Potřebujete poradit? Kontaktujte nás!
            </h2>
            <p className="mb-0 md:max-w-xl text-white text-lg">
              Naši specialisté jsou připraveni zodpovědět vaše dotazy a pomoci vám vybrat ten pravý trezor.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-white text-[#7E69AB] hover:bg-white/90 shadow-lg transition-all duration-300 hover:scale-105 font-medium w-full sm:w-auto"
                >
                  <span className="flex items-center gap-2 justify-center">
                    Kontaktujte nás
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-center mb-4">Kontaktní informace</DialogTitle>
                  <DialogDescription className="text-center">
                    Neváhejte nás kontaktovat pro jakékoliv dotazy nebo pomoc s výběrem trezoru.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">Kontaktní údaje</h3>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="h-5 w-5 text-esejfy-burgundy" />
                      <a href="tel:+420123456789" className="hover:text-esejfy-burgundy">+420 123 456 789</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-esejfy-burgundy" />
                      <a href="mailto:info@esejfy.net" className="hover:text-esejfy-burgundy">info@esejfy.net</a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-2">
                    <h3 className="text-lg font-semibold">Sociální sítě</h3>
                    <div className="flex gap-4">
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Facebook className="h-6 w-6 text-[#1877F2]" />
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Instagram className="h-6 w-6 text-[#E4405F]" />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <h3 className="text-lg font-semibold">Otevírací doba</h3>
                    <p className="text-sm">Pondělí - Pátek: 8:00 - 17:00</p>
                    <p className="text-sm">Sobota: 9:00 - 12:00</p>
                    <p className="text-sm">Neděle: Zavřeno</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/20 shadow-lg transition-all duration-300 hover:scale-105 font-medium w-full sm:w-auto"
            >
              <a href="mailto:info@esejfy.net" className="flex items-center gap-2 justify-center">
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
