
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const NavLinks: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-1">
      <Link to="/" className="text-gray-800 hover:text-esejfy-burgundy hover:bg-gray-50 transition-all font-medium px-4 py-2 rounded-md">
        Domů
      </Link>

      <Link to="/products" className="text-gray-800 hover:text-esejfy-burgundy hover:bg-gray-50 transition-all font-medium px-4 py-2 rounded-md">
        Produkty
      </Link>

      <Link to="/o-nas" className="text-gray-800 hover:text-esejfy-burgundy hover:bg-gray-50 transition-all font-medium px-4 py-2 rounded-md">
        O nás
      </Link>

      <Link to="/blog" className="text-gray-800 hover:text-esejfy-burgundy hover:bg-gray-50 transition-all font-medium px-4 py-2 rounded-md">
        Blog
      </Link>

      <Link to="/kontakt" className="text-gray-800 hover:text-esejfy-burgundy hover:bg-gray-50 transition-all font-medium px-4 py-2 rounded-md">
        Kontakt
      </Link>

      {/* Rozbalovací menu pro všechny kategorie */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-esejfy-burgundy text-gray-900 font-medium">Všechny kategorie</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {categories.map((category) => (
                  <ListItem key={category.path} href={category.path}>
                    {category.name}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavLinks;
