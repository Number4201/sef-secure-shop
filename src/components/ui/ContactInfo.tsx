
import React from 'react';
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="grid gap-6 py-2">
      <p className="text-center text-gray-600">
        Neváhejte nás kontaktovat pro jakékoliv dotazy nebo pomoc s výběrem trezoru.
      </p>
      
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-lg font-semibold text-gray-800">Kontaktní údaje</h3>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-esejfy-burgundy" />
          <a href="tel:+420123456789" className="hover:text-esejfy-burgundy">+420 123 456 789</a>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-esejfy-burgundy" />
          <a href="mailto:info@esejfy.net" className="hover:text-esejfy-burgundy">info@esejfy.net</a>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-lg font-semibold text-gray-800">Sociální sítě</h3>
        <div className="flex gap-4 justify-start">
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
      
      <div className="flex flex-col gap-3 mt-2">
        <h3 className="text-lg font-semibold text-gray-800">Otevírací doba</h3>
        <p className="text-sm text-gray-600">Pondělí - Pátek: 8:00 - 17:00</p>
        <p className="text-sm text-gray-600">Sobota: 9:00 - 12:00</p>
        <p className="text-sm text-gray-600">Neděle: Zavřeno</p>
      </div>
    </div>
  );
};

export default ContactInfo;
