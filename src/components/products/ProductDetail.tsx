
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getProductBySlug, getRelatedProducts, getProductBySlugSync, getRelatedProductsSync } from '@/data/products';
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

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch product data based on slug
  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        // First, try to get a synchronous version for immediate display
        const syncProduct = getProductBySlugSync(slug);
        if (syncProduct) {
          setProduct(syncProduct);
        }

        // Then fetch the product with hooks and other database data
        const fetchedProduct = await getProductBySlug(slug);

        if (fetchedProduct) {
          setProduct(fetchedProduct);

          // Fetch related products
          const fetchedRelatedProducts = await getRelatedProducts(fetchedProduct.id, fetchedProduct.category);
          setRelatedProducts(fetchedRelatedProducts);
        } else {
          setError(true);
          toast({
            title: "Produkt nenalezen",
            description: "Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.",
            variant: "destructive"
          });
          setTimeout(() => navigate('/'), 2000);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(true);
        toast({
          title: "Chyba při načítání produktu",
          description: "Nastala chyba při načítání produktu. Zkuste to prosím znovu.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug, navigate, toast]);

  // Show loading state
  if (loading && !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <h1 className="text-2xl font-bold mb-4 text-white">Načítání produktu</h1>
        <p className="text-gray-300">Prosím vyčkejte, načítáme informace o produktu...</p>
      </div>
    );
  }

  // If product not found, show error
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Produkt nenalezen</h1>
        <p className="text-gray-300">Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.</p>
      </div>
    );
  }

  // If we don't have related products from the database yet, use the sync version
  const displayRelatedProducts = relatedProducts.length > 0
    ? relatedProducts
    : getRelatedProductsSync(product.id, product.category);

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
        <ProductInfo product={product} />
      </div>

      {/* Tabs section */}
      <ProductTabs product={product} />

      {/* Related products */}
      {displayRelatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid products={displayRelatedProducts} title="Související produkty" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
