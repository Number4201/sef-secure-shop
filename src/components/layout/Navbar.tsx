
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NavLinks from './Navbar/NavLinks';
import SearchBar from './Navbar/SearchBar';
import MobileMenu from './Navbar/MobileMenu';
import CartButton from './Navbar/CartButton';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Lock body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Clean up scroll lock when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar with contact info */}
      <div className="flex justify-end items-center h-10 px-4 bg-esejfy-burgundy text-white text-sm">
        <div className="container mx-auto flex justify-end items-center space-x-4">
          <a href="mailto:info@esejfy.net" className="hover:underline">
            info@esejfy.net
          </a>
          <a href="tel:+420123456789" className="hover:underline">
            +420 123 456 789
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/7b944fb8-655b-4973-9817-efca20874478.png" 
                alt="eSEJFY.net" 
                className="h-8"
              />
            </Link>
            
            {/* Desktop Navigation */}
            {!isMobile && <NavLinks />}
            
            {/* Action buttons */}
            <div className="flex items-center space-x-1">
              {!isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSearch}
                  className="hover:bg-gray-100 h-10 w-10 p-2"
                  aria-label="Vyhledat"
                >
                  <Search size={18} />
                </Button>
              )}
              
              {!isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100 h-10 w-10 p-2"
                  aria-label="Účet"
                >
                  <User size={18} />
                </Button>
              )}
              
              <CartButton />
              
              {/* Mobile menu button */}
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100 h-10 w-10 p-2"
                  onClick={toggleMobileMenu}
                  aria-label="Menu"
                >
                  <Menu size={18} />
                </Button>
              )}
            </div>
          </div>
          
          {/* Search bar */}
          {!isMobile && <SearchBar isOpen={isSearchOpen} autoFocus={isSearchOpen} />}
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onLinkClick={() => {
          setIsMobileMenuOpen(false);
          document.body.style.overflow = '';
        }} 
      />
    </header>
  );
};

export default Navbar;
