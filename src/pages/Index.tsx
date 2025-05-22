
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoryIconsSection from '@/components/home/CategoryIconsSection';
import FeaturedCategoriesSection from '@/components/home/FeaturedCategoriesSection';
import CertifiedSafesInfo from '@/components/home/CertifiedSafesInfo';
import FeaturesSection from '@/components/home/FeaturesSection';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="w-full bg-white">
        <HeroSection />
        <CategoryIconsSection />
        <FeaturedCategoriesSection />
        <CertifiedSafesInfo />
        <FeaturesSection />
      </div>
    </Layout>
  );
};

export default Index;
