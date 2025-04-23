
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/hooks/use-cart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, updateItemQuantity, removeItem } = useCart();

  if (cart.length === 0) {
    return (
      <Layout>
        <EmptyCart />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Nákupní košík</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="border-b pb-4 mb-4 hidden md:flex text-sm text-gray-500">
                <div className="w-1/3">Produkt</div>
                <div className="w-1/3 text-center">Množství</div>
                <div className="w-1/3 text-right">Cena</div>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateItemQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
              
              <div className="mt-8">
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link to="/products">
                    <ArrowLeft size={16} />
                    <span>Pokračovat v nákupu</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-80">
            <CartSummary items={cart} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
