
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-esejfy-burgundy text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* O nás */}
          <div>
            <h3 className="text-lg font-semibold mb-4">O nás</h3>
            <p className="text-sm mb-4">
              NIKDO s.r.o.<br />
              Václavské náměstí 1<br />
              110 00 Praha 1<br />
              IČO: 25060583<br />
              DIČ: CZ25060583
            </p>
          </div>

          {/* Prodejna */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Prodejna</h3>
            <p className="text-sm mb-4">
              Opletalova 10<br />
              110 00 Praha 2 - Nusle<br />
              <br />
              Otevírací doba:<br />
              Po-Pá: 9:00-17:00
            </p>
          </div>

          {/* Pro zákazníky */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pro zákazníky</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/obchodni-podminky" className="hover:text-gray-200 transition-colors">Obchodní podmínky</Link></li>
              <li><Link to="/zasady-ochrany" className="hover:text-gray-200 transition-colors">Zásady ochrany</Link></li>
              <li><Link to="/zpusob-dopravy" className="hover:text-gray-200 transition-colors">Způsob dopravy</Link></li>
              <li><Link to="/nase-sluzby" className="hover:text-gray-200 transition-colors">Naše služby</Link></li>
              <li><Link to="/doprava-a-doruceni" className="hover:text-gray-200 transition-colors">Doprava a doručení</Link></li>
              <li><Link to="/servis-trezoru" className="hover:text-gray-200 transition-colors">Servis trezorů</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section with social media and copyright */}
        <div className="mt-8 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <a href="https://www.facebook.com/esejfy" target="_blank" rel="noopener noreferrer" className="mr-4 text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/esejfy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>

          <div className="text-sm text-center md:text-right">
            © 2023 esejfy.net | Všechna práva vyhrazena | Vytvořeno s <span className="text-red-400">❤</span> by <a href="https://www.webdesign.cz" target="_blank" rel="noopener noreferrer" className="underline">WEBDESIGN.CZ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
