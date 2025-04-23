
import React from 'react';
import { Check, Info, Truck, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/product';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  return (
    <Tabs defaultValue="details" className="w-full mb-16">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="details">Detaily produktu</TabsTrigger>
        <TabsTrigger value="features">Vlastnosti</TabsTrigger>
        <TabsTrigger value="shipping">Doprava a platba</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="prose max-w-none">
        <Card>
          <CardContent className="pt-6">
            <p>{product.description}</p>
            
            {product.dimensions && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Rozměry</h3>
                <ul className="list-disc pl-5">
                  <li>Šířka: {product.dimensions.width} cm</li>
                  <li>Výška: {product.dimensions.height} cm</li>
                  <li>Hloubka: {product.dimensions.depth} cm</li>
                  {product.weight && <li>Hmotnost: {product.weight} kg</li>}
                </ul>
              </div>
            )}
            
            {product.safeClass && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Bezpečnostní certifikace</h3>
                <p>Tento produkt má bezpečnostní certifikaci třídy {product.safeClass} dle normy ČSN EN 1143-1.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="features">
        <Card>
          <CardContent className="pt-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="shipping">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Způsoby dopravy</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Truck size={18} className="mt-1 text-esejfy-burgundy shrink-0" />
                    <div>
                      <p className="font-medium">Doprava kurýrem</p>
                      <p className="text-sm text-gray-600">Doručení na adresu po celé ČR do 1-3 pracovních dnů.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Package size={18} className="mt-1 text-esejfy-burgundy shrink-0" />
                    <div>
                      <p className="font-medium">Osobní odběr na prodejně</p>
                      <p className="text-sm text-gray-600">Praha - Brno - Ostrava - Plzeň</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Způsoby platby</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-esejfy-burgundy shrink-0" />
                    <span>Platba kartou online</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-esejfy-burgundy shrink-0" />
                    <span>Bankovní převod</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={18} className="text-esejfy-burgundy shrink-0" />
                    <span>Platba na dobírku</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-md">
                <Info size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <p className="text-sm">
                  V případě zájmu o instalaci nebo další služby nás kontaktujte na <a href="mailto:info@esejfy.net" className="text-esejfy-burgundy hover:underline">info@esejfy.net</a> nebo na telefonním čísle +420 123 456 789.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
