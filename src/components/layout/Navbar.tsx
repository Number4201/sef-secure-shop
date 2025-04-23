
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User } from 'lucide-react';
import NavLinks from './Navbar/NavLinks';
import SearchBar from './Navbar/SearchBar';
import MobileMenu from './Navbar/MobileMenu';
import CartButton from './Navbar/CartButton';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
          <NavLinks />
          
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
            <CartButton />
            
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
        
        {/* Search bar */}
        <SearchBar isOpen={isSearchOpen} autoFocus={isSearchOpen} />
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onLinkClick={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
