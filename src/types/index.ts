export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'vehicles' | 'houses' | 'coins' | 'packs';
  image?: string;
  featured?: boolean;
  specs?: {
    label: string;
    value: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserInfo {
  fullName: string;
  email: string;
  cpf?: string;
}

export interface DeliveryInfo {
  fivemId: string;
  discordConnected: boolean;
  discordUsername?: string;
  discordAvatar?: string;
}

export type PaymentMethod = 'pix' | 'credit_card';

export interface PaymentInfo {
  method: PaymentMethod;
  termsAccepted: boolean;
}

export type OrderStatus = 'pending' | 'paid' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  userInfo: UserInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  paidAt?: Date;
  deliveredAt?: Date;
}

export type CheckoutStep = 1 | 2 | 3 | 4;
