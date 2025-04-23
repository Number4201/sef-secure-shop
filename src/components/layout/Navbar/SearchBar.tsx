
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import SafeClassFilter from '@/components/products/SafeClassFilter';
import AvailabilityFilter from '@/components/products/AvailabilityFilter';

interface SearchBarProps {
  isOpen: boolean;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, autoFocus }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleSearch = () => {
    // Here you would implement the search logic
    console.log('Search:', { searchQuery, selectedClasses, inStockOnly });
  };

  const clearFilters = () => {
    setSelectedClasses([]);
    setInStockOnly(false);
  };

  const toggleSafeClass = (value: string) => {
    setSelectedClasses(prev =>
      prev.includes(value)
        ? prev.filter(c => c !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-16 py-2 opacity-100" : "max-h-0 py-0 opacity-0"
      )}>
        <div className="flex items-center w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Hledejte produkty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              autoFocus={autoFocus}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(true)}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Filtry
          </Button>
          <Button 
            onClick={handleSearch}
            className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white"
          >
            Hledat
          </Button>
        </div>
      </div>

      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[425px] bg-esejfy-gray text-white">
          <DialogHeader>
            <DialogTitle>Filtry vyhledávání</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <SafeClassFilter
              availableSafeClasses={['S1', 'S2', 'I', 'II']}
              selectedClasses={selectedClasses}
              onToggleClass={toggleSafeClass}
            />
            
            <AvailabilityFilter
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Vymazat filtry
            </Button>
            <Button
              onClick={() => setShowFilters(false)}
              className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
            >
              Potvrdit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
