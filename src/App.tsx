
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { AppProvider } from './contexts/AppContext';
import { CartProvider } from './contexts/CartContext';
import { CustomerProvider } from './contexts/CustomerContext';
import LoadingScreen from './components/LoadingScreen';
import CookieConsent from './components/cookie/CookieConsent';

// Lazy load pages for better initial load performance
const IndexPage = lazy(() => import('./pages/Index'));
const ProductsPage = lazy(() => import('./pages/Products'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const BlogPage = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPost'));
const AboutUsPage = lazy(() => import('./pages/AboutUs'));
const ContactPage = lazy(() => import('./pages/Contact'));
const AuthCallbackPage = lazy(() => import('./pages/AuthCallback'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-16 h-16 border-4 border-esejfy-burgundy border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <AppProvider>
        <CustomerProvider>
          <CartProvider>
            <div className="overflow-hidden w-full max-w-[100vw]">
              <CookieConsent />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/o-nas" element={<AboutUsPage />} />
                  <Route path="/kontakt" element={<ContactPage />} />
                  <Route path="/auth/callback" element={<AuthCallbackPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </CartProvider>
        </CustomerProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
