import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import ProductGrid from '@/components/products/ProductGrid';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CallToAction from '@/components/home/CallToAction';
import { getFeaturedProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PhoneCall, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      <HeroSection />
      
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-[#ea384c] rounded-full blur-lg opacity-70 animate-[glow_3s_ease-in-out_infinite]" />
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="relative bg-[#ea384c] hover:bg-[#c52435] text-white font-bold px-6 py-6 rounded-full shadow-2xl border-2 border-white transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <PhoneCall size={20} />
                  Kontaktujte nás
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center mb-4">Kontaktní informace</DialogTitle>
                <DialogDescription className="text-center">
                  Neváhejte nás kontaktovat pro jakékoliv dotazy nebo pomoc s výběrem trezoru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold">Kontaktní údaje</h3>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 text-esejfy-burgundy" />
                    <a href="tel:+420123456789" className="hover:text-esejfy-burgundy">+420 123 456 789</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-esejfy-burgundy" />
                    <a href="mailto:info@esejfy.net" className="hover:text-esejfy-burgundy">info@esejfy.net</a>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 mt-2">
                  <h3 className="text-lg font-semibold">Sociální sítě</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Facebook className="h-6 w-6 text-[#1877F2]" />
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Instagram className="h-6 w-6 text-[#E4405F]" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-4">
                  <h3 className="text-lg font-semibold">Otevírací doba</h3>
                  <p className="text-sm">Pondělí - Pátek: 8:00 - 17:00</p>
                  <p className="text-sm">Sobota: 9:00 - 12:00</p>
                  <p className="text-sm">Neděle: Zavřeno</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
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
