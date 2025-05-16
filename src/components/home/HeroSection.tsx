import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Search, Shield, Lock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FeatureInfo: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-esejfy-burgundy">{icon}</span>
    <span className="font-medium text-sm">{text}</span>
  </div>
);

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative bg-esejfy-burgundy text-white pb-16 md:pb-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold leading-tight`}>
              Bezpečnost bez kompromisů pro váš domov i firmu
            </h1>
            <p className="text-lg opacity-90 text-white">
              Profesionální trezory a sejfy s certifikovanou ochranou pro vaše cennosti, dokumenty a zbraně.
            </p>

            <form onSubmit={handleSearch} className="relative max-w-xl">
              <Input
                type="search"
                placeholder="Vyhledat trezor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/30"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-esejfy-burgundy hover:bg-gray-100"
                size="sm"
              >
                Hledat
              </Button>
            </form>
          </div>

          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl bg-black h-[400px]">
              <div className="absolute top-4 right-4 bg-[#222] text-[#ea384c] px-3 py-1 rounded-md text-sm font-bold">
                Reklama
              </div>
            </div>

            <div className="absolute -bottom-5 left-0 right-0 bg-white rounded-lg p-4 mx-4 shadow-lg flex justify-around">
              <FeatureInfo icon={<Shield size={24} />} text="Certifikováno" />
              <FeatureInfo icon={<Lock size={24} />} text="Zabezpečeno" />
              <FeatureInfo icon={<Flame size={24} />} text="Ohnivzdorné" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
