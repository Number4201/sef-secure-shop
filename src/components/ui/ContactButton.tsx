
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
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            size="lg" 
            className="bg-[#E5334B] hover:bg-[#c52435] text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-slow-glow"
          >
            <Phone size={18} />
            <span>Kontaktujte nás</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-esejfy-dark-primary text-white rounded-md p-6 border-esejfy-dark-secondary">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2 text-white">Kontaktní informace</DialogTitle>
          </DialogHeader>
          <ContactInfo />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactButton;
