
import React from 'react';
import { Check, Info, Truck, Package, ShieldCheck, Ruler, Layers, Anchor, Award, BookOpen, Lock, Flame, Droplets } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/product';

interface ProductTabsProps {
  product: Product;
}

// Helper function to get description based on safe class
const getSafeClassDescription = (safeClass: string): string => {
  switch (safeClass) {
    case 'S1':
      return 'Základní bezpečnostní třída vhodná pro domácí použití. Poskytuje ochranu proti příležitostným zlodějům s jednoduchými nástroji.';
    case 'S2':
      return 'Zvýšená bezpečnost pro domácnosti a malé firmy. Odolává pokusům o vloupání s použitím základních nástrojů.';
    case 'I':
      return 'Profesionální bezpečnostní třída vhodná pro firmy. Poskytuje ochranu proti zkušeným zlodějům s pokročilými nástroji.';
    case 'II':
      return 'Vysoká bezpečnostní třída pro firmy s vyššími nároky na zabezpečení. Odolává pokusům o vloupání s použitím elektrického nářadí.';
    case '2':
      return 'Certifikovaná bezpečnostní třída pro uložení hotovosti a cenností vyšší hodnoty. Vhodné pro finanční instituce.';
    default:
      return 'Tato bezpečnostní třída poskytuje adekvátní ochranu proti vloupání dle certifikovaných standardů.';
  }
};

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

            {/* Security Certification Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <ShieldCheck size={20} className="mr-2 text-blue-700" />
                Bezpečnostní certifikace
              </h2>

              {product.safeClass && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Bezpečnostní třída {product.safeClass}</h3>
                  <p>Tento produkt má bezpečnostní certifikaci třídy {product.safeClass} dle normy {product.certificationStandard || 'ČSN EN 1143-1'}.</p>
                  <p className="mt-2">Bezpečnostní třída určuje odolnost trezoru proti vloupání a je klíčovým parametrem při výběru trezoru.</p>
                  <div className="mt-2 bg-gray-100 p-3 rounded-md">
                    <h4 className="font-semibold">Co znamená bezpečnostní třída {product.safeClass}?</h4>
                    <p className="mt-1">
                      {getSafeClassDescription(product.safeClass)}
                    </p>
                  </div>
                </div>
              )}

              {product.certificationStandard && (
                <div className="flex items-start gap-2 mb-3">
                  <Award size={18} className="text-green-700 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Standard: {product.certificationStandard}</p>
                    <p className="text-sm text-gray-600">Evropská norma pro bezpečnostní úschovné objekty</p>
                  </div>
                </div>
              )}

              {product.recommendedInsurance && (
                <div className="flex items-start gap-2 mb-3">
                  <Info size={18} className="text-blue-700 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Doporučená pojistná částka: {new Intl.NumberFormat('cs-CZ', {
                      style: 'currency',
                      currency: 'CZK',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(product.recommendedInsurance)}</p>
                    <p className="text-sm text-gray-600">Maximální doporučená hodnota uložených cenností</p>
                  </div>
                </div>
              )}
            </div>

            {/* Dimensions Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Ruler size={20} className="mr-2 text-blue-700" />
                Rozměry
              </h2>

              {product.dimensions && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Vnější rozměry</h3>
                  <ul className="list-disc pl-5 mb-2">
                    <li>Šířka: {product.dimensions.width} cm ({product.dimensions.width * 10} mm)</li>
                    <li>Výška: {product.dimensions.height} cm ({product.dimensions.height * 10} mm)</li>
                    <li>Hloubka: {product.dimensions.depth} cm ({product.dimensions.depth * 10} mm)</li>
                  </ul>
                </div>
              )}

              {product.internalDimensions && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Vnitřní rozměry</h3>
                  <ul className="list-disc pl-5 mb-2">
                    <li>Šířka: {(product.internalDimensions.width / 10).toFixed(1)} cm ({product.internalDimensions.width} mm)</li>
                    <li>Výška: {(product.internalDimensions.height / 10).toFixed(1)} cm ({product.internalDimensions.height} mm)</li>
                    <li>Hloubka: {(product.internalDimensions.depth / 10).toFixed(1)} cm ({product.internalDimensions.depth} mm)</li>
                  </ul>
                </div>
              )}

              {product.weight && (
                <div className="flex items-start gap-2 mb-3">
                  <Info size={18} className="text-blue-700 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Hmotnost: {product.weight} kg</p>
                  </div>
                </div>
              )}
            </div>

            {/* Interior Features Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <BookOpen size={20} className="mr-2 text-blue-700" />
                Vnitřní vybavení
              </h2>

              <ul className="space-y-2">
                {product.hooks !== undefined && (
                  <li className="flex items-start gap-2">
                    <Anchor size={18} className="text-blue-700 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Háčky: {product.hooks} ks</p>
                      <p className="text-sm text-gray-600">Pro zavěšení klíčů nebo jiných předmětů</p>
                    </div>
                  </li>
                )}

                {product.shelves !== undefined && (
                  <li className="flex items-start gap-2">
                    <Layers size={18} className="text-blue-700 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Police: {product.shelves} ks</p>
                      <p className="text-sm text-gray-600">Pro organizaci uložených předmětů</p>
                    </div>
                  </li>
                )}

                {product.interiorFeatures && product.interiorFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={18} className="text-green-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">{feature}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Features Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Info size={20} className="mr-2 text-blue-700" />
                Další specifikace
              </h2>

              <ul className="space-y-2">
                {product.lockType && (
                  <li className="flex items-start gap-2">
                    <Lock size={18} className="text-blue-700 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Typ zámku: {product.lockType}</p>
                    </div>
                  </li>
                )}

                {product.fireProtectionTime && (
                  <li className="flex items-start gap-2">
                    <Flame size={18} className="text-orange-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Doba ohnivzdornosti: {product.fireProtectionTime} minut</p>
                    </div>
                  </li>
                )}

                {product.waterResistant && (
                  <li className="flex items-start gap-2">
                    <Droplets size={18} className="text-blue-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Vodotěsné provedení</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
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
