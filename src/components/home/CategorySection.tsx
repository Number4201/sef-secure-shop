
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CategoryProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

// Optimized smaller dataset for mobile
const categories: CategoryProps[] = [
  {
    title: 'Nábytkové trezory',
    description: 'Ideální pro domácnost i kancelář',
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800',
    link: '/products?category=nabytkove-trezory'
  },
  {
    title: 'Trezory do zdi',
    description: 'Maximální diskrétnost a bezpečí',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800',
    link: '/products?category=trezory-do-zdi'
  },
  {
    title: 'Trezory na zbraně',
    description: 'Certifikovaná bezpečnost pro vaše zbraně',
    image: 'https://images.unsplash.com/photo-1584743579083-b933b3d23268?q=80&w=800',
    link: '/products?category=trezory-na-zbrane'
  },
  {
    title: 'Ohnivzdorné trezory',
    description: 'Ochrana před ohněm až 120 minut',
    image: 'https://images.unsplash.com/photo-1622060896522-88306aa5ee0b?q=80&w=800',
    link: '/products?category=ohnivzdorne-trezory'
  }
];

const CategoryCard: React.FC<CategoryProps> = ({ title, description, image, link }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden border-none product-card group rounded-xl shadow-lg">
      <Link to={link} className="block h-full">
        <div className={`relative ${isMobile ? 'h-40' : 'h-56'}`}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>{title}</h3>
            {!isMobile && <p className="text-base opacity-90">{description}</p>}
          </div>
        </div>
        <CardContent className="p-3 bg-esejfy-burgundy text-white flex justify-between items-center">
          <span className="font-medium text-sm">Zobrazit</span>
          <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
        </CardContent>
      </Link>
    </Card>
  );
};

const CategorySection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'py-12' : 'py-24'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-14'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-3`}>Naše kategorie</h2>
          <p className={`text-gray-600 ${isMobile ? 'text-base' : 'text-lg'} max-w-3xl mx-auto`}>
            Objevte naši širokou nabídku trezorů
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
