
import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import ContactInfo from './ContactInfo';

const ContactButton: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-[#ea384c] rounded-full blur-xl opacity-70 animate-slow-glow" />
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="relative bg-[#ea384c] hover:bg-[#c52435] text-white font-bold px-6 py-6 rounded-full shadow-2xl border-2 border-white transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Phone size={20} />
                Kontaktujte nás
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-md p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-2">Kontaktní informace</DialogTitle>
            </DialogHeader>
            <ContactInfo />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ContactButton;
