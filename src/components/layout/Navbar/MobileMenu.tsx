
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from './NavLinks';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onLinkClick }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute right-0 top-0 h-screen w-3/4 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLinkClick}
            className="hover:bg-gray-100 h-10 w-10 p-2 rounded-full"
            aria-label="Zavřít"
          >
            <X size={18} />
          </Button>
        </div>

        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={onLinkClick}
              >
                Domů
              </Link>
            </li>
            <li>
              <button
                className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                aria-expanded={isCategoryOpen}
              >
                <span>Produkty</span>
                {isCategoryOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              {isCategoryOpen && (
                <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                  {categories.map((category) => (
                    <li key={category.path}>
                      <Link
                        to={category.path}
                        className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={onLinkClick}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/o-nas"
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={onLinkClick}
              >
                O nás
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={onLinkClick}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/kontakt"
                className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={onLinkClick}
              >
                Kontakt
              </Link>
            </li>
          </ul>

          {/* Contact information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Kontaktujte nás</h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@esejfy.net" className="flex items-center p-2 hover:bg-gray-100 rounded-md text-esejfy-burgundy">
                <span>info@esejfy.net</span>
              </a>
              <a href="tel:+420123456789" className="flex items-center p-2 hover:bg-gray-100 rounded-md text-esejfy-burgundy whitespace-nowrap">
                <span>+420 123 456 789</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
