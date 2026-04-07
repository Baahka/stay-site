import { useEffect } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import './App.css';

function AppContent() {
  const { currentPage, setCartOpen } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'cart') {
      setCartOpen(true);
    }
  }, [currentPage, setCartOpen]);

  return (
    <div className="relative min-h-screen bg-midnight">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page content */}
      <div className="relative z-10">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'cart' && <ShopPage />}
        {currentPage === 'product' && <ProductPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
