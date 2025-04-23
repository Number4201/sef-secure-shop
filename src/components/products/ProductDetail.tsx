
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Flame, 
  Package, 
  Check, 
  Info, 
  MinusCircle, 
  PlusCircle,
  Truck
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import ProductGrid from './ProductGrid';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Get product data based on slug
  const product = slug ? getProductBySlug(slug) : null;

  // If product not found, show error and redirect
  if (!product) {
    React.useEffect(() => {
      toast({
        title: "Produkt nenalezen",
        description: "Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.",
        variant: "destructive"
      });
      setTimeout(() => navigate('/'), 2000);
    }, []);
    
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkt nenalezen</h1>
        <p>Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.</p>
      </div>
    );
  }

  // Get related products
  const relatedProducts = getRelatedProducts(product.id, product.category);
  
  // Format price with Czech formatting
  const formattedPrice = new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('cs-CZ', { 
    style: 'currency', 
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(product.originalPrice) : null;

  // Category name mapping
  const categoryNames: Record<string, string> = {
    'nabytkove-trezory': 'Nábytkové trezory',
    'trezory-do-zdi': 'Trezory do zdi',
    'trezory-do-podlahy': 'Trezory do podlahy',
    'trezory-na-zbrane': 'Trezory na zbraně',
    'vhozove-trezory': 'Vhozové trezory',
    'ohnivzdorne-trezory': 'Ohnivzdorné trezory',
    'trezory-na-hotovost': 'Trezory na hotovost'
  };

  // Handle quantity changes
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // Add to cart handler
  const handleAddToCart = () => {
    toast({
      title: "Přidáno do košíku",
      description: `Produkt ${product.name} byl přidán do košíku v počtu ${quantity} ks.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Domů</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/products?category=${product.category}`}>
            {categoryNames[product.category] || product.category}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/product/${product.slug}`} isCurrentPage>
            {product.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Product details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product image */}
        <div className="bg-white rounded-lg overflow-hidden border p-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Product badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.safeClass && (
              <Badge className="bg-esejfy-blue text-white">
                <ShieldCheck size={16} className="mr-1" /> Bezpečnostní třída {product.safeClass}
              </Badge>
            )}
            {product.fireResistance && (
              <Badge className="bg-orange-600 text-white">
                <Flame size={16} className="mr-1" /> Ohnivzdornost {product.fireResistance}
              </Badge>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Product dimensions */}
          {product.dimensions && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Rozměry:</h3>
              <p className="text-gray-700">
                {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
              </p>
            </div>
          )}
          
          {/* Product weight */}
          {product.weight && (
            <div className="mb-6">
              <h3 className="font-semibold mb-1">Hmotnost:</h3>
              <p className="text-gray-700">{product.weight} kg</p>
            </div>
          )}
          
          {/* Price section */}
          <div className="mt-auto">
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-esejfy-burgundy">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="ml-3 text-lg text-gray-500 line-through">{formattedOriginalPrice}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-4">Včetně DPH</p>
            
            {/* Availability */}
            <div className="flex items-center mb-6">
              <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{product.inStock ? 'Skladem' : 'Momentálně nedostupné'}</span>
            </div>
            
            {/* Add to cart */}
            {product.inStock && (
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Snížit množství"
                  >
                    <MinusCircle size={18} />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseQuantity}
                    aria-label="Zvýšit množství"
                  >
                    <PlusCircle size={18} />
                  </Button>
                </div>
                <Button 
                  className="flex-1 bg-esejfy-burgundy hover:bg-esejfy-burgundy/90"
                  onClick={handleAddToCart}
                >
                  Přidat do košíku
                </Button>
              </div>
            )}
            
            {/* Delivery info */}
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={18} className="text-esejfy-burgundy" />
                <span>Doprava zdarma při objednávce nad 5 000 Kč</span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={18} className="text-esejfy-burgundy" />
                <span>Osobní odběr na prodejně zdarma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <Tabs defaultValue="details" className="w-full mb-16">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="details">Detaily produktu</TabsTrigger>
          <TabsTrigger value="features">Vlastnosti</TabsTrigger>
          <TabsTrigger value="shipping">Doprava a platba</TabsTrigger>
        </TabsList>
        
        {/* Details tab */}
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
        
        {/* Features tab */}
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
        
        {/* Shipping tab */}
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

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid products={relatedProducts} title="Související produkty" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
