import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, CartItem, UserInfo, DeliveryInfo, PaymentInfo, Order, CheckoutStep } from '@/types';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Checkout
  currentStep: CheckoutStep;
  setCurrentStep: (step: CheckoutStep) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: (info: PaymentInfo) => void;
  
  // Orders
  orders: Order[];
  createOrder: () => Order | null;
  
  // Navigation
  currentPage: 'home' | 'shop' | 'product' | 'checkout';
  setCurrentPage: (page: 'home' | 'shop' | 'product' | 'checkout') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Checkout state
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  
  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Navigation
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'product' | 'checkout'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = useCallback((): Order | null => {
    if (!userInfo || !deliveryInfo || !paymentInfo || cart.length === 0) {
      return null;
    }

    const order: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [...cart],
      userInfo,
      deliveryInfo,
      paymentInfo,
      status: 'pending',
      total: cartTotal,
      createdAt: new Date(),
    };

    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  }, [cart, userInfo, deliveryInfo, paymentInfo, cartTotal, clearCart]);

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    currentStep,
    setCurrentStep,
    userInfo,
    setUserInfo,
    deliveryInfo,
    setDeliveryInfo,
    paymentInfo,
    setPaymentInfo,
    orders,
    createOrder,
    currentPage,
    setCurrentPage,
    selectedProduct,
    setSelectedProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
