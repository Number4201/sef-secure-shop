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
              Kvalitní trezory pro každou potřebu
            </h1>

            <p className="text-white/90 text-lg mt-4 max-w-xl">
              Vyberte si z našeho širokého sortimentu trezorů a sejfů s certifikací pro maximální bezpečnost vašich cenností.
            </p>

            <div className="flex gap-4 mt-8">
              <Button
                size="lg"
                className="bg-white text-esejfy-burgundy hover:bg-white/90 shadow-lg"
                onClick={() => navigate('/products')}
              >
                Prohlédnout nabídku
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/kontakt')}
              >
                Kontaktovat nás
              </Button>
            </div>
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
