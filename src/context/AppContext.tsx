import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { Product, CartItem, UserInfo, DeliveryInfo, PaymentInfo, Order, CheckoutStep } from '@/types';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  couponCodeInput: string;
  setCouponCodeInput: (value: string) => void;
  appliedCoupon: string | null;
  couponError: string;
  applyCoupon: () => void;
  clearCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  
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
  currentPage: 'home' | 'shop' | 'product' | 'checkout' | 'cart';
  setCurrentPage: (page: 'home' | 'shop' | 'product' | 'checkout' | 'cart') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('stayrp_cart');
    if (!storedCart) return [];

    try {
      const parsed = JSON.parse(storedCart) as CartItem[];
      if (Array.isArray(parsed)) {
        return parsed.filter(item => item.quantity > 0);
      }
    } catch {
      localStorage.removeItem('stayrp_cart');
    }

    return [];
  });
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isCartOpen, setCartOpen] = useState(false);
  
  // Checkout state
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  
  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Navigation
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'product' | 'checkout' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem('stayrp_cart', JSON.stringify(cart));
  }, [cart]);

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

  const updateCartItemQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }

      return prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError('');
  }, []);

  const applyCoupon = useCallback(() => {
    const normalizedCode = couponCodeInput.trim().toUpperCase();
    if (!normalizedCode) {
      setCouponError('Digite um cupom para aplicar.');
      return;
    }

    if (normalizedCode !== 'STAY5') {
      setCouponError('Cupom inválido.');
      return;
    }

    const couponAlreadyUsed = localStorage.getItem('stayrp_coupon_stay5_used') === 'true';
    if (couponAlreadyUsed) {
      setCouponError('Este cupom já foi usado neste dispositivo.');
      return;
    }

    setAppliedCoupon('STAY5');
    setCouponCodeInput('STAY5');
    setCouponError('');
  }, [couponCodeInput]);

  const clearCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError('');
    setCouponCodeInput('');
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const discountAmount = useMemo(() => (
    appliedCoupon === 'STAY5' ? cartTotal * 0.05 : 0
  ), [appliedCoupon, cartTotal]);
  const finalTotal = Math.max(cartTotal - discountAmount, 0);

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
      total: finalTotal,
      createdAt: new Date(),
    };

    setOrders(prev => [order, ...prev]);

    if (appliedCoupon === 'STAY5') {
      localStorage.setItem('stayrp_coupon_stay5_used', 'true');
    }

    clearCart();
    return order;
  }, [cart, userInfo, deliveryInfo, paymentInfo, finalTotal, clearCart, appliedCoupon]);

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    couponCodeInput,
    setCouponCodeInput,
    appliedCoupon,
    couponError,
    applyCoupon,
    clearCoupon,
    discountAmount,
    finalTotal,
    cartTotal,
    cartCount,
    isCartOpen,
    setCartOpen,
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
