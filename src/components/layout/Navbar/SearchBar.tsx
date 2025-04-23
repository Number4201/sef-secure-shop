
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  isOpen: boolean;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, autoFocus }) => {
  return (
    <div className={cn(
      "overflow-hidden transition-all duration-300 ease-in-out",
      isOpen ? "max-h-16 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
    )}>
      <div className="flex items-center w-full">
        <Input
          type="search"
          placeholder="Hledejte produkty..."
          className="w-full bg-esejfy-dark-secondary border-esejfy-dark-accent text-white"
          autoFocus={autoFocus}
        />
        <Button className="ml-2 bg-esejfy-burgundy hover:bg-esejfy-burgundy/90">
          Hledat
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
