import React from 'react';
import FeaturedCategorySection from './FeaturedCategorySection';
import CategoryInfoBlock from './CategoryInfoBlock';
import { getCategoryDescription } from '@/utils/categoryMapping';

// Definice nejoblíbenějších kategorií
const featuredCategories = [
  {
    slug: 'nabytkove-trezory',
    title: 'Nábytkové trezory a sejfy',
    description: 'Nábytkové trezory a sejfy určené pro běžné použití v domácnostech nebo kancelářích k úschově cenností, šperků a dokumentů.'
  },
  {
    slug: 'trezory-do-zdi',
    title: 'Trezory a sejfy do zdi',
    description: 'Trezory určené k zabudování do zdi s důrazem na diskrétnost a zvýšenou ochranu proti fyzickému odstranění.'
  },
  {
    slug: 'trezory-na-zbrane',
    title: 'Trezory na zbraně',
    description: 'Trezory splňující legislativní požadavky pro bezpečné uložení střelných zbraní a střeliva.'
  },
  {
    slug: 'ohnivzdorne-trezory',
    title: 'Ohnivzdorné trezory',
    description: 'Trezory testované a certifikované pro ochranu cenností a dokumentů před požárem s garantovanou dobou ohnivzdornosti.'
  }
];

const FeaturedCategoriesSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-2">
      <div className="container mx-auto px-4 pt-1 pb-2">
        <div className="text-center mb-2">
          <h2 className="text-xl md:text-2xl font-bold mb-0.5">Nejoblíbenější kategorie trezorů</h2>
          <p className="text-gray-700 font-medium text-sm">Vyberte si z našeho širokého sortimentu trezorů a sejfů pro maximální bezpečnost vašich cenností</p>
        </div>
      </div>

      <div className="bg-white">
        {featuredCategories.flatMap((category, index) => ([
          <FeaturedCategorySection
            key={`${category.slug}-section`}
            categorySlug={category.slug}
            title={category.title}
            description={category.description}
          />,
          <CategoryInfoBlock
            key={`${category.slug}-info`}
            categorySlug={category.slug}
          />
        ]))}
      </div>
    </div>
  );
};

export default FeaturedCategoriesSection;
