
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { categoryNames } from '@/utils/categoryMapping';
import ProductGrid from './ProductGrid';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import ProductBreadcrumb from './ProductBreadcrumb';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

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
        <h1 className="text-2xl font-bold mb-4 text-white">Produkt nenalezen</h1>
        <p className="text-gray-300">Požadovaný produkt nebyl nalezen. Budete přesměrováni na hlavní stránku.</p>
      </div>
    );
  }

  // Get related products
  const relatedProducts = getRelatedProducts(product.id, product.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductBreadcrumb product={product} categoryNames={categoryNames} />

      {/* Product details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product image */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-700 p-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product info */}
        <ProductInfo product={product} />
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
