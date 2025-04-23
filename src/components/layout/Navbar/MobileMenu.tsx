
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { categories } from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onLinkClick }) => {
  return (
    <div 
      className={cn(
        "fixed lg:hidden inset-x-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out",
        isOpen ? "top-16 max-h-[80vh] overflow-y-auto" : "-top-[100vh]"
      )}
    >
      <nav className="flex flex-col">
        <Link 
          to="/" 
          className="px-5 py-3 border-b hover:bg-esejfy-lightgray"
          onClick={onLinkClick}
        >
          Domů
        </Link>
        <div className="px-5 py-3 border-b hover:bg-esejfy-lightgray">
          <details>
            <summary className="cursor-pointer">Produkty</summary>
            <div className="pl-4 mt-2 space-y-1 mb-2">
              {categories.map((category) => (
                <Link 
                  key={category.path}
                  to={category.path}
                  className="block py-2 hover:text-esejfy-burgundy"
                  onClick={onLinkClick}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </details>
        </div>
        <Link 
          to="/o-nas" 
          className="px-5 py-3 border-b hover:bg-esejfy-lightgray"
          onClick={onLinkClick}
        >
          O nás
        </Link>
        <Link 
          to="/kontakt" 
          className="px-5 py-3 border-b hover:bg-esejfy-lightgray"
          onClick={onLinkClick}
        >
          Kontakt
        </Link>
      </nav>
    </div>
  );
};

export default MobileMenu;
