
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

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
  return (
    <Card className="overflow-hidden border-none product-card group rounded-xl shadow-lg">
      <Link to={link} className="block h-full">
        <div className="relative h-56">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-5 text-white">
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-base opacity-90">{description}</p>
          </div>
        </div>
        <CardContent className="p-4 bg-esejfy-burgundy text-white flex justify-between items-center">
          <span className="font-medium">Zobrazit kategorii</span>
          <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
        </CardContent>
      </Link>
    </Card>
  );
};

const CategorySection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Naše kategorie</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Objevte naši širokou nabídku kvalitních trezorů a sejfů pro různé potřeby a účely
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
