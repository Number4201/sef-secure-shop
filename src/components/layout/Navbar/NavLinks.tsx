
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const categories = [
  { name: 'Nábytkové trezory', path: '/products?category=nabytkove-trezory' },
  { name: 'Trezory do zdi', path: '/products?category=trezory-do-zdi' },
  { name: 'Trezory do podlahy', path: '/products?category=trezory-do-podlahy' },
  { name: 'Trezory na zbraně', path: '/products?category=trezory-na-zbrane' },
  { name: 'Vhozové trezory', path: '/products?category=vhozove-trezory' },
  { name: 'Ohnivzdorné trezory', path: '/products?category=ohnivzdorne-trezory' },
  { name: 'Trezory na hotovost', path: '/products?category=trezory-na-hotovost' },
  { name: 'Trezory na dokumenty', path: '/products?category=trezory-na-dokumenty' },
  { name: 'Trezory na klíče', path: '/products?category=trezory-na-klice' },
  { name: 'Hotelové trezory', path: '/products?category=hotelove-trezory' },
  { name: 'Archivační skříně', path: '/products?category=archivacni-skrine' },
];

const NavLinks: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Link to="/" className="text-gray-900 hover:text-esejfy-burgundy transition-colors font-medium">
        Domů
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="text-gray-900 hover:text-esejfy-burgundy transition-colors flex items-center gap-1 p-0 font-medium">
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
      <Link to="/o-nas" className="text-gray-900 hover:text-esejfy-burgundy transition-colors font-medium">
        O nás
      </Link>
      <Link to="/kontakt" className="text-gray-900 hover:text-esejfy-burgundy transition-colors font-medium">
        Kontakt
      </Link>
    </nav>
  );
};

export default NavLinks;
