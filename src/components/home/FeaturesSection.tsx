
import React from 'react';
import { Shield, CreditCard, Truck, Headphones } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Shield size={40} className="text-esejfy-burgundy" />,
    title: 'Certifikovaná kvalita',
    description: 'Všechny naše trezory splňují přísné bezpečnostní normy a jsou certifikovány dle ČSN EN 1143-1.'
  },
  {
    icon: <Truck size={40} className="text-esejfy-burgundy" />,
    title: 'Rychlá doprava',
    description: 'Doručení do 1-3 pracovních dnů po celé České republice s možností odborné instalace.'
  },
  {
    icon: <Headphones size={40} className="text-esejfy-burgundy" />,
    title: 'Odborné poradenství',
    description: 'Naši specialisté vám pomohou vybrat ideální řešení pro vaše potřeby a zodpoví všechny dotazy.'
  },
  {
    icon: <CreditCard size={40} className="text-esejfy-burgundy" />,
    title: 'Bezpečná platba',
    description: 'Nabízíme různé platební metody včetně zabezpečené online platby kartou a bankovního převodu.'
  }
];

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-esejfy-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Proč si vybrat eSEJFY.net</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nabízíme kompletní služby od výběru vhodného trezoru přes dopravu až po instalaci a servis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
