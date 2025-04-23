
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import ProductGrid from '@/components/products/ProductGrid';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CallToAction from '@/components/home/CallToAction';
import { getFeaturedProducts } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';

const FeaturedProductsSection = React.memo(() => {
  const featuredProducts = getFeaturedProducts();
  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'py-12' : 'py-20'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-4`}>Nejprodávanější produkty</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Objevte naše nejoblíbenější trezory
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} />
        
        <div className="text-center mt-8">
          <a 
            href="/products" 
            className="inline-flex items-center text-lg text-esejfy-burgundy hover:text-esejfy-burgundy/80 font-medium animated-underline"
          >
            Zobrazit všechny produkty
          </a>
        </div>
      </div>
    </section>
  );
});

FeaturedProductsSection.displayName = 'FeaturedProductsSection';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="w-full bg-white">
        <HeroSection />
        <CategorySection />
        <FeaturedProductsSection />
        <FeaturesSection />
        {!isMobile && <TestimonialSection />}
        <CallToAction />
      </div>
    </Layout>
  );
};

export default Index;
