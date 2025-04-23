
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Menu,
  Search,
  ChevronDown,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: 'Nábytkové trezory', path: '/products?category=nabytkove-trezory' },
    { name: 'Trezory do zdi', path: '/products?category=trezory-do-zdi' },
    { name: 'Trezory do podlahy', path: '/products?category=trezory-do-podlahy' },
    { name: 'Trezory na zbraně', path: '/products?category=trezory-na-zbrane' },
    { name: 'Vhozové trezory', path: '/products?category=vhozove-trezory' },
    { name: 'Ohnivzdorné trezory', path: '/products?category=ohnivzdorne-trezory' },
    { name: 'Trezory na hotovost', path: '/products?category=trezory-na-hotovost' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* Top bar with contact info */}
      <div className="hidden md:flex justify-end items-center h-8 px-4 bg-esejfy-burgundy text-white text-xs">
        <div className="flex items-center space-x-4">
          <span>info@esejfy.net</span>
          <span>+420 123 456 789</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/7b944fb8-655b-4973-9817-efca20874478.png" 
              alt="eSEJFY.net" 
              className="h-10 md:h-12"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-esejfy-burgundy transition-colors animated-underline">
              Domů
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-sm font-medium hover:text-esejfy-burgundy transition-colors flex items-center gap-1 p-0 animated-underline">
                  Produkty <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.path} asChild>
                    <Link to={category.path} className="w-full">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/o-nas" className="text-sm font-medium hover:text-esejfy-burgundy transition-colors animated-underline">
              O nás
            </Link>
            <Link to="/kontakt" className="text-sm font-medium hover:text-esejfy-burgundy transition-colors animated-underline">
              Kontakt
            </Link>
          </nav>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="hover:bg-esejfy-lightgray"
              aria-label="Vyhledat"
            >
              <Search size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-esejfy-lightgray"
              aria-label="Uživatelský účet"
            >
              <User size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-esejfy-lightgray relative"
              aria-label="Košík"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-esejfy-burgundy text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-esejfy-lightgray"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Search bar - toggles on click */}
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isSearchOpen ? "max-h-16 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
        )}>
          <div className="flex items-center w-full">
            <Input
              type="search"
              placeholder="Hledejte produkty..."
              className="w-full"
              autoFocus={isSearchOpen}
            />
            <Button className="ml-2 bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
              Hledat
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - slides down when toggled */}
      <div 
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col bg-white shadow-lg">
          <Link 
            to="/" 
            className="px-5 py-3 border-b hover:bg-esejfy-lightgray"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Domů
          </Link>
          <div className="px-5 py-3 border-b hover:bg-esejfy-lightgray">
            <details>
              <summary className="cursor-pointer">Produkty</summary>
              <div className="pl-4 mt-2 space-y-1">
                {categories.map((category) => (
                  <Link 
                    key={category.path}
                    to={category.path}
                    className="block py-2 hover:text-esejfy-burgundy"
                    onClick={() => setIsMobileMenuOpen(false)}
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
            onClick={() => setIsMobileMenuOpen(false)}
          >
            O nás
          </Link>
          <Link 
            to="/kontakt" 
            className="px-5 py-3 border-b hover:bg-esejfy-lightgray"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
