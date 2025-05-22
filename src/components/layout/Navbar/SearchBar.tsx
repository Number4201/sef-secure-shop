
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Tag, Flame, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import SafeClassFilter from '@/components/products/SafeClassFilter';
import AvailabilityFilter from '@/components/products/AvailabilityFilter';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from './NavLinks';

interface SearchBarProps {
  className?: string;
  compact?: boolean;
}

// Import funkcí pro získání produktů
import { getProductsOnSale } from '@/data/products';

// Definice typů pro produkty v akci
interface SaleProduct {
  id: string;
  name: string;
  slug: string;
  discount: string;
  image?: string;
}

// Definice populárních kategorií
const popularCategories = [
  { name: 'Nábytkové trezory', path: '/products?category=nabytkove-trezory' },
  { name: 'Trezory do zdi', path: '/products?category=trezory-do-zdi' },
  { name: 'Trezory na zbraně', path: '/products?category=trezory-na-zbrane' },
  { name: 'Ohnivzdorné trezory', path: '/products?category=ohnivzdorne-trezory' },
];

const SearchBar: React.FC<SearchBarProps> = ({ className, compact = false }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Načtení produktů v akci
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        // V reálné aplikaci by toto bylo načteno z API
        const products = await getProductsOnSale(3);
        const formattedProducts = products.map(product => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          discount: calculateDiscount(product.price, product.originalPrice),
          image: product.image
        }));
        setSaleProducts(formattedProducts);
      } catch (error) {
        console.error('Chyba při načítání produktů v akci:', error);
        // Fallback na statická data
        setSaleProducts([
          { id: '1', name: 'Nábytkový trezor NT 105', slug: 'nabytkovy-trezor-nt-105', discount: '15%' },
          { id: '2', name: 'Trezor do zdi TZ 250', slug: 'trezor-do-zdi-tz-250', discount: '10%' },
          { id: '3', name: 'Ohnivzdorný trezor OT 120', slug: 'ohnivzdorny-trezor-ot-120', discount: '20%' },
        ]);
      }
    };

    fetchSaleProducts();
  }, []);

  // Výpočet slevy v procentech
  function calculateDiscount(currentPrice?: number, originalPrice?: number): string {
    if (!currentPrice || !originalPrice || originalPrice <= currentPrice) return '';
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return `${discount}%`;
  }

  // Zavřít dropdown při kliknutí mimo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generování návrhů vyhledávání
  useEffect(() => {
    const generateSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // V reálné aplikaci by toto bylo načteno z API
        // Simulace API volání s timeoutem
        await new Promise(resolve => setTimeout(resolve, 300));

        // Simulované návrhy vyhledávání
        const suggestions = [
          'trezor nábytkový',
          'trezor do zdi',
          'trezor na zbraně',
          'trezor ohnivzdorný',
          'trezor s elektronickým zámkem',
          'trezor s klíčovým zámkem',
          'trezor vodotěsný',
          'trezor certifikovaný'
        ].filter(suggestion =>
          suggestion.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);

        setSearchSuggestions(suggestions);
      } catch (error) {
        console.error('Chyba při generování návrhů vyhledávání:', error);
        setSearchSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      generateSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
    setShowDropdown(false);
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
      <div
        ref={searchRef}
        className={cn(
          "overflow-visible relative",
          className
        )}
      >
        <form onSubmit={handleSearch} className="flex items-center w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Hledejte produkty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className={cn(
                "pl-10 pr-4 w-full border-gray-200",
                compact ? "h-9 text-sm" : "h-10"
              )}
            />

            {/* Enhanced Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-xl z-50 border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out">
                {/* Search Suggestions Section */}
                {searchQuery.trim().length >= 2 && (
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2 text-esejfy-burgundy font-medium">
                      <Search size={16} />
                      <span>Návrhy vyhledávání</span>
                    </div>

                    {isLoading ? (
                      <div className="flex justify-center py-2">
                        <div className="w-5 h-5 border-2 border-esejfy-burgundy border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : searchSuggestions.length > 0 ? (
                      <ul className="space-y-1">
                        {searchSuggestions.map((suggestion, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left flex items-center gap-2 hover:bg-gray-50 p-2 rounded text-sm"
                            >
                              <Search size={14} className="text-gray-400" />
                              <span className="text-gray-800">{suggestion}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 py-1">Žádné návrhy nenalezeny</p>
                    )}
                  </div>
                )}

                {/* Sale Products Section */}
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-2 text-esejfy-burgundy font-medium">
                    <Flame size={16} />
                    <span>Produkty v akci</span>
                  </div>
                  <ul className="space-y-2">
                    {saleProducts.map(product => (
                      <li key={product.id}>
                        <Link
                          to={`/product/${product.slug}`}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded text-sm"
                          onClick={() => setShowDropdown(false)}
                        >
                          {product.image && (
                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="text-gray-800 block truncate">{product.name}</span>
                          </div>
                          <span className="bg-esejfy-burgundy text-white text-xs px-2 py-0.5 rounded flex-shrink-0">
                            -{product.discount}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Categories Section */}
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-2 text-esejfy-burgundy font-medium">
                    <TrendingUp size={16} />
                    <span>Populární kategorie</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularCategories.map(category => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="text-gray-800 hover:bg-gray-50 p-2 rounded text-sm flex items-center gap-2"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="w-2 h-2 rounded-full bg-esejfy-burgundy"></div>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* All Categories Section */}
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 text-esejfy-burgundy font-medium">
                    <Tag size={16} />
                    <span>Všechny kategorie</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto">
                    {categories.map(category => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="text-gray-800 hover:bg-gray-50 p-1.5 rounded text-xs flex items-center gap-1"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {!compact && (
            <Button
              variant="outline"
              onClick={() => setShowFilters(true)}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
              type="button"
              size={compact ? "sm" : "default"}
            >
              Filtry
            </Button>
          )}
          <Button
            type="submit"
            className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white"
            size={compact ? "sm" : "default"}
          >
            Hledat
          </Button>
        </form>
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
