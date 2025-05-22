
import React from 'react';
import Layout from '@/components/layout/Layout';
import CartDisplay from '@/components/cart/CartDisplay';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';

const CartPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Domů</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink to="/cart" isCurrentPage>
              Košík
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8 text-white">Nákupní košík</h1>

        <CartDisplay />
      </div>
    </Layout>
  );
};

export default CartPage;
