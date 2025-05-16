import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryNames } from '@/utils/categoryMapping';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CategoryProductsPreview from './CategoryProductsPreview';
import { getProductsByCategorySync } from '@/data/products';

// Define the category icons with their paths and names
const categoryIcons = [
  // Tři hlavní a nejznámější druhy sejfů na začátku
  {
    name: 'Nábytkové trezory',
    path: '/products?category=nabytkove-trezory',
    icon: '/assets/icons/nabytkove.png',
  },
  {
    name: 'Trezory do zdi',
    path: '/products?category=trezory-do-zdi',
    icon: '/assets/icons/do-zdi.png',
  },
  {
    name: 'Trezory na zbraně',
    path: '/products?category=trezory-na-zbrane',
    icon: '/assets/icons/na-zbrane.png',
  },
  // Ostatní kategorie
  {
    name: 'Ohnivzdorné trezory',
    path: '/products?category=ohnivzdorne-trezory',
    icon: '/assets/icons/ohnivzdorne.png',
  },
  {
    name: 'Trezory do podlahy',
    path: '/products?category=trezory-do-podlahy',
    icon: '/assets/icons/do-podlahy.png',
  },
  {
    name: 'Trezory na hotovost',
    path: '/products?category=trezory-na-hotovost',
    icon: '/assets/icons/na-hotovost.png',
  },
  {
    name: 'Vhozové trezory',
    path: '/products?category=vhozove-trezory',
    icon: '/assets/icons/vhozove.png',
  },
  {
    name: 'Trezorové dveře',
    path: '/products?category=trezorove-dvere',
    icon: '/assets/icons/dvere.png',
  }
];

// Additional categories for the complete list
const additionalCategories = [
  {
    name: 'Archivační skříně',
    path: '/products?category=archivacni-skrine',
    icon: '/assets/icons/archivacni.png'
  },
  {
    name: 'Trezory na klíče',
    path: '/products?category=trezory-na-klice',
    icon: '/assets/icons/na-klice.png'
  },
  {
    name: 'Hotelové trezory',
    path: '/products?category=hotelove-trezory',
    icon: '/assets/icons/hotelove.png'
  },
  {
    name: 'Trezory na dokumenty',
    path: '/products?category=trezory-na-dokumenty',
    icon: '/assets/icons/na-dokumenty.png'
  },
  {
    name: 'Peněžní boxy',
    path: '/products?category=penezni-boxy',
    icon: '/assets/icons/penezni-boxy.png'
  },
  {
    name: 'Výprodej - rozbaleno',
    path: '/products?category=rozbalene-produkty',
    icon: '/assets/icons/vyprodej.png'
  },
  {
    name: 'Creone / Keybox',
    path: '/products?category=kreone-keybox',
    icon: '/assets/icons/keybox.png'
  }
];

const CategoryIconsSection: React.FC = () => {
  const isMobile = useIsMobile();

  // Extrahovat slug kategorie z cesty
  const getCategorySlug = (path: string) => {
    // Mapování cest na slugy
    const pathToSlug = {
      '/products?category=nabytkove-trezory': 'nabytkove-trezory',
      '/products?category=trezory-do-zdi': 'trezory-do-zdi',
      '/products?category=trezory-na-zbrane': 'trezory-na-zbrane',
      '/products?category=trezory-do-podlahy': 'trezory-do-podlahy',
      '/products?category=ohnivzdorne-trezory': 'ohnivzdorne-trezory',
      '/products?category=trezory-na-hotovost': 'trezory-na-hotovost',
      '/products?category=vhozove-trezory': 'vhozove-trezory',
      '/products?category=trezorove-dvere': 'trezorove-dvere'
    };

    // Pokud je cesta přímo v mapování, vrátíme odpovídající slug
    if (pathToSlug[path]) {
      return pathToSlug[path];
    }

    // Přímý způsob extrakce slugu z cesty
    if (path.includes('nabytkove-trezory')) return 'nabytkove-trezory';
    if (path.includes('trezory-do-zdi')) return 'trezory-do-zdi';
    if (path.includes('trezory-na-zbrane')) return 'trezory-na-zbrane';
    if (path.includes('trezory-do-podlahy')) return 'trezory-do-podlahy';
    if (path.includes('ohnivzdorne-trezory')) return 'ohnivzdorne-trezory';
    if (path.includes('trezory-na-hotovost')) return 'trezory-na-hotovost';
    if (path.includes('vhozove-trezory')) return 'vhozove-trezory';
    if (path.includes('trezorove-dvere')) return 'trezorove-dvere';

    // Původní způsob extrakce slugu z cesty
    const match = path.match(/category=([^&]+)/);
    return match ? match[1] : null;
  };



  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Kategorie trezorů</h2>
          <p className="text-gray-800 font-medium">Vyberte si z našeho širokého sortimentu trezorů a sejfů</p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex justify-start md:justify-center gap-4 md:gap-6 min-w-max px-2">
            {categoryIcons.map((category, index) => {
              const categorySlug = getCategorySlug(category.path);

              return (
                <div key={index} className="group flex flex-col items-center w-16 md:w-20">
                  <Link to={category.path} className="block text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-1 transition-all duration-300 hover:shadow-md hover:scale-105 bg-gray-100 group-hover:bg-esejfy-burgundy/20">
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-7 h-7 md:w-8 md:h-8 object-contain"
                      />
                    </div>
                    <span className="text-xs md:text-sm text-center font-medium text-gray-900 group-hover:text-esejfy-burgundy transition-colors">
                      {category.name}
                    </span>
                  </Link>
                </div>
              );
            })}
            <Link
              to="/products"
              className="group flex flex-col items-center w-16 md:w-20"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-esejfy-burgundy/10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:bg-esejfy-burgundy/20">
                <ArrowRight size={16} className="text-esejfy-burgundy" />
              </div>
              <span className="text-xs md:text-sm text-center font-medium text-esejfy-burgundy">
                Všechny produkty
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryIconsSection;
