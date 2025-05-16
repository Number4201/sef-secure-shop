
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, User, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import NavLinks from './Navbar/NavLinks';
import SearchBar from './Navbar/SearchBar';
import MobileMenu from './Navbar/MobileMenu';
import CartButton from './Navbar/CartButton';
import LoginDialog from '../auth/LoginDialog';
import UserMenu from '../auth/UserMenu';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();

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
      {/* Main navbar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and contact info */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center mr-4">
                <div className="bg-white rounded p-1">
                  <img
                    src="/lovable-uploads/7b944fb8-655b-4973-9817-efca20874478.png"
                    alt="eSEJFY.net"
                    className="h-8 object-contain"
                  />
                </div>
              </Link>

              {/* Contact info - visible on desktop only */}
              {!isMobile && (
                <div className="flex items-center space-x-4 text-esejfy-burgundy text-sm ml-4">
                  <a href="mailto:info@esejfy.net" className="hover:underline flex items-center">
                    <span className="hidden xl:inline">info@esejfy.net</span>
                    <span className="xl:hidden">Email</span>
                  </a>
                  <a href="tel:+420123456789" className="hover:underline flex items-center">
                    <span>+420 123 456 789</span>
                  </a>
                </div>
              )}
            </div>

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

              {/* Login button/User menu */}
              {loading ? (
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <LoginDialog
                  trigger={
                    <Button
                      variant={isMobile ? "ghost" : "outline"}
                      size="sm"
                      className={isMobile ?
                        "hover:bg-gray-100 h-10 w-10 p-2" :
                        "bg-esejfy-burgundy text-white border-esejfy-burgundy hover:bg-esejfy-burgundy/90"}
                      aria-label="Přihlášení"
                    >
                      {isMobile ? <User size={18} /> : "Přihlášení"}
                    </Button>
                  }
                />
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
