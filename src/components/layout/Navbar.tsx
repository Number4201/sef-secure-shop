
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User, ShoppingCart, Phone, Mail } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main navbar */}
      <div className="bg-gradient-to-r from-gray-50 to-white shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo and brand */}
            <div className="flex items-center flex-1 lg:flex-initial">
              <Link to="/" className="flex items-center mr-6 group">
                <div className="bg-white rounded-lg p-2 shadow-sm transition-all group-hover:shadow-md">
                  <img
                    src="/lovable-uploads/7b944fb8-655b-4973-9817-efca20874478.png"
                    alt="eSEJFY.net"
                    className="h-9 object-contain"
                  />
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-xl font-bold text-esejfy-burgundy tracking-tight group-hover:text-esejfy-burgundy/80 transition-colors">eSEJFY.net</span>
                  <span className="text-xs text-gray-500">Specialista na trezory</span>
                </div>
              </Link>

              {/* Contact info - visible on desktop only */}
              {!isMobile && (
                <div className="flex items-center space-x-4 text-gray-700 text-sm ml-4">
                  <a href="mailto:info@esejfy.net" className="hover:text-esejfy-burgundy transition-colors flex items-center">
                    <Mail size={16} className="mr-1 text-esejfy-burgundy" />
                    <span className="hidden xl:inline">info@esejfy.net</span>
                    <span className="xl:hidden">Email</span>
                  </a>
                  <a href="tel:+420123456789" className="hover:text-esejfy-burgundy transition-colors flex items-center whitespace-nowrap">
                    <Phone size={16} className="mr-1 text-esejfy-burgundy" />
                    <span>+420 123 456 789</span>
                  </a>
                </div>
              )}
            </div>

            {/* Search Bar - visible on desktop only */}
            {!isMobile && (
              <div className="flex-1 max-w-md mx-4">
                <SearchBar compact={true} />
              </div>
            )}

            {/* Desktop Navigation */}
            {!isMobile && <NavLinks />}

            {/* Action buttons */}
            <div className="flex items-center space-x-1">

              {/* Login button/User menu */}
              {loading ? (
                <div className="h-10 w-28 bg-gray-200 animate-pulse rounded-md"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <LoginDialog
                  trigger={
                    <Button
                      variant={isMobile ? "ghost" : "default"}
                      size={isMobile ? "icon" : "default"}
                      className={isMobile ?
                        "hover:bg-gray-100 h-10 w-10 p-2" :
                        "bg-white text-esejfy-burgundy border border-esejfy-burgundy hover:bg-esejfy-burgundy hover:text-white transition-all duration-200 shadow-sm"}
                      aria-label="Přihlášení"
                    >
                      {isMobile ? <User size={18} /> : (
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>Přihlášení</span>
                        </div>
                      )}
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
