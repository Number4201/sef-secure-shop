
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
    icon: <Shield size={28} className="text-esejfy-burgundy" />,
    title: 'Certifikovaná kvalita',
    description: 'Všechny naše trezory splňují přísné bezpečnostní normy ČSN EN 1143-1.'
  },
  {
    icon: <Truck size={28} className="text-esejfy-burgundy" />,
    title: 'Rychlá doprava',
    description: 'Doručení do 1-3 pracovních dnů po celé ČR s možností odborné instalace.'
  },
  {
    icon: <Headphones size={28} className="text-esejfy-burgundy" />,
    title: 'Odborné poradenství',
    description: 'Naši specialisté vám pomohou vybrat ideální řešení pro vaše potřeby.'
  },
  {
    icon: <CreditCard size={28} className="text-esejfy-burgundy" />,
    title: 'Bezpečná platba',
    description: 'Nabízíme různé platební metody včetně zabezpečené online platby.'
  }
];

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/95">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="mt-1 shrink-0">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-esejfy-lightgray/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Proč si vybrat eSEJFY.net</h2>
          <p className="text-gray-600 mt-2 text-sm max-w-2xl mx-auto">
            Nabízíme kompletní služby od výběru vhodného trezoru přes dopravu až po instalaci a servis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
