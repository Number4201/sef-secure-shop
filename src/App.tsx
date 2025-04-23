
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import NotFoundPage from './pages/NotFound';
import CartPage from './pages/CartPage';
import { CartProvider } from './hooks/use-cart';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </CartProvider>
    </Router>
  );
}

export default App;
