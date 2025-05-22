
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

            {/* Enhanced Security Certification Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <ShieldCheck size={20} className="mr-2 text-blue-700" />
                Bezpečnostní certifikace
              </h2>

              {product.safeClass && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <ShieldCheck size={24} className="text-blue-700" />
                    </div>
                    <h3 className="text-lg font-semibold">Bezpečnostní třída {product.safeClass}</h3>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-3">
                    <p className="font-medium text-blue-900">
                      Tento produkt má bezpečnostní certifikaci třídy {product.safeClass} dle normy {product.certificationStandard || 'ČSN EN 1143-1'}.
                    </p>
                    <p className="mt-2 text-blue-800">
                      Bezpečnostní třída určuje odolnost trezoru proti vloupání a je klíčovým parametrem při výběru trezoru.
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold flex items-center">
                      <Info size={16} className="mr-2 text-blue-700" />
                      Co znamená bezpečnostní třída {product.safeClass}?
                    </h4>
                    <p className="mt-2 text-gray-700">
                      {getSafeClassDescription(product.safeClass)}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {product.certificationStandard && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full shrink-0">
                      <Award size={20} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Standard: {product.certificationStandard}</p>
                      <p className="text-sm text-green-800">Evropská norma pro bezpečnostní úschovné objekty</p>
                    </div>
                  </div>
                )}

                {product.recommendedInsurance && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full shrink-0">
                      <Info size={20} className="text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Doporučená pojistná částka:</p>
                      <p className="text-lg font-bold text-blue-800">{new Intl.NumberFormat('cs-CZ', {
                        style: 'currency',
                        currency: 'CZK',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(product.recommendedInsurance)}</p>
                      <p className="text-xs text-blue-700 mt-1">Maximální doporučená hodnota uložených cenností</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Dimensions Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <Ruler size={20} className="mr-2 text-blue-700" />
                Rozměry
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {product.dimensions && (
                  <div className="bg-esejfy-burgundy/10 p-4 rounded-lg border border-esejfy-burgundy/20">
                    <div className="flex items-center mb-3">
                      <div className="bg-esejfy-burgundy/20 p-2 rounded-full mr-3">
                        <Ruler size={20} className="text-esejfy-burgundy" />
                      </div>
                      <h3 className="text-lg font-semibold">Vnější rozměry</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-2">
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Šířka</p>
                        <p className="font-bold text-lg">{product.dimensions.width} cm</p>
                        <p className="text-xs text-esejfy-burgundy font-medium">{product.dimensions.width * 10} mm</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Výška</p>
                        <p className="font-bold text-lg">{product.dimensions.height} cm</p>
                        <p className="text-xs text-esejfy-burgundy font-medium">{product.dimensions.height * 10} mm</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Hloubka</p>
                        <p className="font-bold text-lg">{product.dimensions.depth} cm</p>
                        <p className="text-xs text-esejfy-burgundy font-medium">{product.dimensions.depth * 10} mm</p>
                      </div>
                    </div>
                  </div>
                )}

                {product.internalDimensions && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Layers size={20} className="text-blue-700" />
                      </div>
                      <h3 className="text-lg font-semibold">Vnitřní rozměry</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-2">
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Šířka</p>
                        <p className="font-bold text-lg">{(product.internalDimensions.width / 10).toFixed(1)} cm</p>
                        <p className="text-xs text-blue-700 font-medium">{product.internalDimensions.width} mm</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Výška</p>
                        <p className="font-bold text-lg">{(product.internalDimensions.height / 10).toFixed(1)} cm</p>
                        <p className="text-xs text-blue-700 font-medium">{product.internalDimensions.height} mm</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Hloubka</p>
                        <p className="font-bold text-lg">{(product.internalDimensions.depth / 10).toFixed(1)} cm</p>
                        <p className="text-xs text-blue-700 font-medium">{product.internalDimensions.depth} mm</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {product.weight && (
                <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 flex items-center gap-3 max-w-xs">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <Scale size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hmotnost</p>
                    <p className="font-bold text-lg">{product.weight} kg</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Interior Features Section */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-bold mb-3 flex items-center">
                <BookOpen size={20} className="mr-2 text-blue-700" />
                Vnitřní vybavení
              </h2>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-green-800">
                  Vnitřní vybavení trezoru je navrženo pro maximální využití prostoru a organizaci uložených předmětů.
                  Každý prvek vnitřního vybavení má svůj účel a pomáhá udržet obsah trezoru přehledný a dobře dostupný.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {product.hooks !== undefined && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full shrink-0">
                      <Anchor size={20} className="text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Háčky: {product.hooks} ks</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Háčky jsou určeny pro zavěšení klíčů nebo jiných předmětů, které chcete mít přehledně uspořádané a snadno dostupné.
                      </p>
                    </div>
                  </div>
                )}

                {product.shelves !== undefined && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full shrink-0">
                      <Layers size={20} className="text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Police: {product.shelves} {product.shelves === 1 ? 'ks' :
                        (product.shelves > 1 && product.shelves < 5) ? 'ks' : 'ks'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Police umožňují přehledné uspořádání dokumentů, cenností a dalších předmětů v trezoru.
                        Jsou navrženy tak, aby maximalizovaly využitelný prostor.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {product.interiorFeatures && product.interiorFeatures.length > 0 && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Check size={18} className="text-green-700 mr-2" />
                    Další vnitřní vybavení
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.interiorFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 bg-gray-50 p-2 rounded">
                        <div className="bg-green-100 p-1 rounded-full shrink-0 mt-0.5">
                          <Check size={12} className="text-green-700" />
                        </div>
                        <p className="text-sm text-gray-800">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
