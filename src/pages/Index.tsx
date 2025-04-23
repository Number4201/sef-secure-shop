
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import ProductGrid from '@/components/products/ProductGrid';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CallToAction from '@/components/home/CallToAction';
import { getFeaturedProducts } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      <HeroSection />
      
      <CategorySection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nejprodávanější produkty</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Objevte naše nejoblíbenější trezory a sejfy, které si naši zákazníci vybírají nejčastěji
            </p>
          </div>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="text-center mt-10">
            <a 
              href="/products" 
              className="inline-flex items-center text-esejfy-burgundy hover:text-esejfy-burgundy/80 font-medium animated-underline"
            >
              Zobrazit všechny produkty
            </a>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      
      <TestimonialSection />
      
      <CallToAction />
    </Layout>
  );
};

export default Index;
