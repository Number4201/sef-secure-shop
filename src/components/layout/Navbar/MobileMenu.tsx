
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { categories } from './NavLinks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onLinkClick }) => {
  return (
    <div 
      className={cn(
        "fixed inset-x-0 z-50 bg-white transition-all duration-300 ease-in-out",
        isOpen ? "top-16 bottom-0" : "-top-[100vh]"
      )}
    >
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4">
          {/* Mobile search */}
          <div className="mb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Hledat produkty..."
                className="pr-10"
              />
              <Button 
                size="icon" 
                className="absolute right-0 top-0 bg-transparent hover:bg-transparent"
              >
                <Search size={18} className="text-gray-500" />
              </Button>
            </div>
          </div>
          
          {/* Navigation links - simplified */}
          <nav className="flex flex-col space-y-1">
            <Link 
              to="/" 
              className="px-3 py-3 hover:bg-gray-100 rounded-md"
              onClick={onLinkClick}
            >
              Domů
            </Link>
            
            {/* Products section */}
            <div className="mb-1">
              <div className="px-3 py-2 font-medium">Produkty</div>
              <div className="pl-3 space-y-1">
                {categories.map((category) => (
                  <Link 
                    key={category.path}
                    to={category.path}
                    className="block py-2 px-3 hover:bg-gray-100 rounded-md text-sm"
                    onClick={onLinkClick}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              to="/o-nas" 
              className="px-3 py-3 hover:bg-gray-100 rounded-md"
              onClick={onLinkClick}
            >
              O nás
            </Link>
            <Link 
              to="/kontakt" 
              className="px-3 py-3 hover:bg-gray-100 rounded-md"
              onClick={onLinkClick}
            >
              Kontakt
            </Link>
            
            {/* Contact info */}
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <div className="text-sm font-medium mb-2">Kontakt</div>
              <div className="text-sm mb-1">info@esejfy.net</div>
              <div className="text-sm">+420 123 456 789</div>
            </div>
          </nav>
        </div>
        
        {/* Close button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onLinkClick}
          className="absolute top-2 right-2"
          aria-label="Zavřít menu"
        >
          <X size={18} />
        </Button>
      </ScrollArea>
    </div>
  );
};

export default MobileMenu;
