
import React from 'react';
import { Shield, CreditCard, Truck, Headphones } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Shield size={22} className="text-esejfy-burgundy" />,
    title: 'Certifikovaná kvalita',
    description: 'Všechny naše trezory splňují přísné bezpečnostní normy ČSN EN 1143-1.'
  },
  {
    icon: <Truck size={22} className="text-esejfy-burgundy" />,
    title: 'Rychlá doprava',
    description: 'Doručení do 1-3 pracovních dnů po celé ČR s možností odborné instalace.'
  },
  {
    icon: <Headphones size={22} className="text-esejfy-burgundy" />,
    title: 'Odborné poradenství',
    description: 'Naši specialisté vám pomohou vybrat ideální řešení pro vaše potřeby.'
  },
  {
    icon: <CreditCard size={22} className="text-esejfy-burgundy" />,
    title: 'Bezpečná platba',
    description: 'Nabízíme různé platební metody včetně zabezpečené online platby.'
  }
];

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/95">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-base font-medium mb-0.5">{title}</h3>
            <p className="text-gray-600 text-xs leading-tight">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-esejfy-lightgray/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Proč si vybrat eSEJFY.net</h2>
          <p className="text-gray-600 mt-1 text-xs max-w-2xl mx-auto">
            Nabízíme kompletní služby od výběru vhodného trezoru přes dopravu až po instalaci a servis
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
