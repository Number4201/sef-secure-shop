
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Filter, ShieldCheck, Lock, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryNames } from '@/utils/categoryMapping';

const FeatureBadge: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-esejfy-dark-secondary/70 p-3 rounded-lg backdrop-blur-sm border border-white/5">
    <span className="text-esejfy-burgundy">{icon}</span>
    <span className="font-medium text-sm text-white">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [safeClass, setSafeClass] = useState<string>('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCategory) params.append('category', selectedCategory);
    if (priceRange) params.append('price', priceRange);
    if (safeClass) params.append('class', safeClass);
    
    navigate(`/products?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-esejfy-dark-primary to-esejfy-dark-secondary text-white min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto text-gray-300 mb-8">
              Profesionální trezory a sejfy s certifikovanou ochranou
            </p>
          </div>
          
          <div className="bg-esejfy-dark-accent/30 backdrop-blur-sm rounded-lg shadow-lg p-6 mx-auto max-w-4xl border border-white/5 mb-12">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <FeatureBadge 
                  icon={<ShieldCheck size={24} />} 
                  text="Certifikováno" 
                />
                <FeatureBadge 
                  icon={<Lock size={24} />} 
                  text="Zabezpečeno" 
                />
                <FeatureBadge 
                  icon={<Flame size={24} />} 
                  text="Ohnivzdorné" 
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Vyhledejte trezor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Hledat
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryNames).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Cenové rozpětí" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5000">Do 5 000 Kč</SelectItem>
                    <SelectItem value="5000-10000">5 000 - 10 000 Kč</SelectItem>
                    <SelectItem value="10000-20000">10 000 - 20 000 Kč</SelectItem>
                    <SelectItem value="20000+">Nad 20 000 Kč</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={safeClass} onValueChange={setSafeClass}>
                  <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Bezpečnostní třída" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S1">Třída S1</SelectItem>
                    <SelectItem value="S2">Třída S2</SelectItem>
                    <SelectItem value="I">Třída I</SelectItem>
                    <SelectItem value="II">Třída II</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
