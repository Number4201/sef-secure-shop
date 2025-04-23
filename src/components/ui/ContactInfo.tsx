
import React from 'react';
import { PhoneCall, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
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
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6 text-[#1877F2]" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6 text-[#E4405F]" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="LinkedIn"
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
  );
};

export default ContactInfo;
