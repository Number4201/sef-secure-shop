
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/use-cart';
import { Toaster } from './components/ui/toaster';

// Lazy load pages for better initial load performance
const IndexPage = lazy(() => import('./pages/Index'));
const ProductsPage = lazy(() => import('./pages/Products'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="overflow-hidden w-full max-w-[100vw]">
      <Router>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
