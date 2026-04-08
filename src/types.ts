export type BottleColor = 'Silver' | 'Black' | 'Blue' | 'Red';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface CartItem {
  id: string;
  color: BottleColor;
  quantity: number;
  price: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}
