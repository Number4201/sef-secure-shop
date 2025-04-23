
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-esejfy-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/7b944fb8-655b-4973-9817-efca20874478.png" 
                alt="eSEJFY.net" 
                className="h-10 mb-2" 
              />
              <p className="text-sm opacity-75">Specialista na trezory a bezpečnostní řešení</p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm">
                <Phone size={16} /> +420 123 456 789
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Mail size={16} /> info@esejfy.net
              </p>
              <p className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5" /> eSEJFY.net s.r.o.<br />
                Ulice 123<br />
                123 45 Praha<br />
                Česká republika
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategorie produktů</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=nabytkove-trezory" className="hover:text-esejfy-burgundy transition-colors">Nábytkové trezory</Link></li>
              <li><Link to="/products?category=trezory-do-zdi" className="hover:text-esejfy-burgundy transition-colors">Trezory do zdi</Link></li>
              <li><Link to="/products?category=trezory-do-podlahy" className="hover:text-esejfy-burgundy transition-colors">Trezory do podlahy</Link></li>
              <li><Link to="/products?category=trezory-na-zbrane" className="hover:text-esejfy-burgundy transition-colors">Trezory na zbraně</Link></li>
              <li><Link to="/products?category=vhozove-trezory" className="hover:text-esejfy-burgundy transition-colors">Vhozové trezory</Link></li>
              <li><Link to="/products?category=ohnivzdorne-trezory" className="hover:text-esejfy-burgundy transition-colors">Ohnivzdorné trezory</Link></li>
              <li><Link to="/products?category=trezory-na-hotovost" className="hover:text-esejfy-burgundy transition-colors">Trezory na hotovost</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informace</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/o-nas" className="hover:text-esejfy-burgundy transition-colors">O nás</Link></li>
              <li><Link to="/obchodni-podminky" className="hover:text-esejfy-burgundy transition-colors">Obchodní podmínky</Link></li>
              <li><Link to="/ochrana-osobnich-udaju" className="hover:text-esejfy-burgundy transition-colors">Ochrana osobních údajů</Link></li>
              <li><Link to="/doprava-a-platba" className="hover:text-esejfy-burgundy transition-colors">Doprava a platba</Link></li>
              <li><Link to="/reklamace" className="hover:text-esejfy-burgundy transition-colors">Reklamace</Link></li>
              <li><Link to="/kontakt" className="hover:text-esejfy-burgundy transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Odběr novinek</h3>
            <p className="text-sm mb-4">Přihlaste se k odběru novinek a dostávejte informace o akcích a slevách.</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Váš e-mail" 
                className="w-full p-2 rounded text-black text-sm" 
                required 
              />
              <button 
                type="submit"
                className="w-full bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 py-2 px-4 rounded text-white transition-colors text-sm"
              >
                Přihlásit se
              </button>
            </form>
          </div>
        </div>

        {/* Payment methods & copyright */}
        <div className="mt-12 pt-4 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm opacity-75">
              © 2025 eSEJFY.net – Všechna práva vyhrazena
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Platební metody:</span>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-2 py-1 text-xs text-black">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-black">Master Card</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-black">Bankovní převod</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
