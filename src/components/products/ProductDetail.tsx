
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { categoryNames } from '@/utils/categoryMapping';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import ProductGrid from './ProductGrid';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import ProductBreadcrumb from './ProductBreadcrumb';
import { Product } from '@/types/product';
import useProducts from '@/hooks/useProducts';
import { useCartContext } from '@/contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Použijeme náš hook pro práci s produkty
  const {
    loading,
    error: productsError,
    fetchProductByHandle,
    fetchProductsByCategory
  } = useProducts();

  // Použijeme náš hook pro práci s košíkem
  const { addItem } = useCartContext();

  // Stav pro chyby
  const [error, setError] = useState(false);

  // Načtení produktu podle slugu
  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) {
        console.error('No slug provided');
        setError(true);
        return;
      }

      console.log(`ProductDetail: Fetching data for product with slug: ${slug}`);

      try {
        // Načtení produktu z Medusa backendu
        const fetchedProduct = await fetchProductByHandle(slug);

        if (fetchedProduct) {
          console.log(`ProductDetail: Successfully fetched product data from API:`, fetchedProduct);
          setProduct(fetchedProduct);

          // Načtení souvisejících produktů
          if (fetchedProduct.category) {
            console.log(`ProductDetail: Fetching related products for category: ${fetchedProduct.category}`);
            const categoryProducts = await fetchProductsByCategory(fetchedProduct.category);

            // Filtrujeme produkty, abychom odstranili aktuální produkt
            const filteredProducts = categoryProducts.filter(p => p.id !== fetchedProduct.id).slice(0, 4);
            console.log(`ProductDetail: Found ${filteredProducts.length} related products`);
            setRelatedProducts(filteredProducts);
          }
        } else {
          console.error(`ProductDetail: Product with slug ${slug} not found in API`);
          setError(true);
          toast({
            title: "Produkt nenalezen",
            description: "Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.",
            variant: "destructive"
          });
          setTimeout(() => navigate('/'), 2000);
        }
      } catch (err) {
        console.error('ProductDetail: Error fetching product:', err);
        setError(true);
        toast({
          title: "Chyba při načítání produktu",
          description: "Nastala chyba při načítání produktu. Zkuste to prosím znovu.",
          variant: "destructive"
        });
      }
    };

    fetchProductData();
  }, [slug, navigate, toast, fetchProductByHandle, fetchProductsByCategory]);

  // Funkce pro přidání produktu do košíku
  const handleAddToCart = async (variantId: string, quantity: number = 1) => {
    try {
      await addItem(variantId, quantity);
      toast({
        title: "Produkt přidán do košíku",
        description: `${product?.name} byl přidán do košíku.`,
        variant: "default"
      });
    } catch (err) {
      console.error('Error adding product to cart:', err);
      toast({
        title: "Chyba při přidávání do košíku",
        description: "Nastala chyba při přidávání produktu do košíku. Zkuste to prosím znovu.",
        variant: "destructive"
      });
    }
  };

  // Zobrazení načítání
  if (loading && !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <h1 className="text-2xl font-bold mb-4 text-white">Načítání produktu</h1>
        <p className="text-gray-300">Prosím vyčkejte, načítáme informace o produktu...</p>
      </div>
    );
  }

  // Pokud produkt nebyl nalezen, zobrazíme chybu
  if (error || productsError || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Produkt nenalezen</h1>
        <p className="text-gray-300">Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductBreadcrumb product={product} categoryNames={categoryNames} />

      {/* Product details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product image with hover card */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-700 p-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg cursor-zoom-in"
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-[600px] h-auto p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain rounded-lg"
              />
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Product info */}
        <ProductInfo
          product={product}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Tabs section */}
      <ProductTabs product={product} />

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
