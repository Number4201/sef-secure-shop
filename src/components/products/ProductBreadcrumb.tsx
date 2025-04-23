
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Product } from '@/types/product';

interface ProductBreadcrumbProps {
  product: Product;
  categoryNames: Record<string, string>;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ product, categoryNames }) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbItem>
        <BreadcrumbLink to="/">Domů</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink to={`/products?category=${product.category}`}>
          {categoryNames[product.category] || product.category}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink to={`/product/${product.slug}`} isCurrentPage>
          {product.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
