import React from 'react';
import FeaturedCategorySection from './FeaturedCategorySection';
import CategoryInfoBlock from './CategoryInfoBlock';
import { getCategoryDescription } from '@/utils/categoryMapping';
import { SectionTitle } from '@/components/ui/typography';
import SectionDivider from '@/components/ui/SectionDivider';
import { ShieldCheck, Lock, Award, Flame } from 'lucide-react';

// Definice nejoblíbenějších kategorií - prioritně zobrazujeme tři nejdůležitější kategorie
const featuredCategories = [
  {
    slug: 'nabytkove-trezory',
    title: 'Nábytkové trezory a sejfy',
    description: 'Nábytkové trezory a sejfy určené pro běžné použití v domácnostech nebo kancelářích k úschově cenností, šperků a dokumentů.',
    icon: <ShieldCheck size={20} className="text-blue-500" />,
    color: 'blue'
  },
  {
    slug: 'trezory-do-zdi',
    title: 'Trezory a sejfy do zdi',
    description: 'Trezory určené k zabudování do zdi s důrazem na diskrétnost a zvýšenou ochranu proti fyzickému odstranění.',
    icon: <Lock size={20} className="text-green-500" />,
    color: 'green'
  },
  {
    slug: 'trezory-na-zbrane',
    title: 'Trezory na zbraně',
    description: 'Trezory splňující legislativní požadavky pro bezpečné uložení střelných zbraní a střeliva.',
    icon: <Award size={20} className="text-amber-500" />,
    color: 'amber'
  },
  {
    slug: 'ohnivzdorne-trezory',
    title: 'Ohnivzdorné trezory',
    description: 'Trezory testované a certifikované pro ochranu cenností a dokumentů před požárem s garantovanou dobou ohnivzdornosti.',
    icon: <Flame size={20} className="text-orange-500" />,
    color: 'orange'
  }
];

const FeaturedCategoriesSection: React.FC = () => {
  return (
    <div className="section-container with-bg-pattern relative">
      <SectionDivider type="wave" position="top" color="white" className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 pt-8">
        <SectionTitle
          title="Nejoblíbenější kategorie trezorů"
          description="Vyberte si z našeho širokého sortimentu trezorů a sejfů s certifikací pro maximální bezpečnost vašich cenností"
          icon={<ShieldCheck size={20} />}
          align="center"
          decorative={true}
          className="fade-in"
        />
      </div>

      <div className="bg-white">
        {featuredCategories.map((category, index) => (
          <React.Fragment key={category.slug}>
            <FeaturedCategorySection
              categorySlug={category.slug}
              title={category.title}
              description={category.description}
            />
            {index < featuredCategories.length - 1 && (
              <CategoryInfoBlock categorySlug={category.slug} />
            )}
          </React.Fragment>
        ))}
      </div>

      <SectionDivider type="curve" position="bottom" color="white" className="absolute bottom-0 left-0 right-0" />
    </div>
  );
};

export default FeaturedCategoriesSection;
