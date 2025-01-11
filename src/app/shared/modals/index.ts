export type DeliveryType = 'PICKUP' | 'DELIVERY' | 'DINE_OUT';

export interface OrderType {
  deliveryType: DeliveryType;
  name: string;
  message?: string;
}

export interface StoreItems {
  pizzaItems: OmfoItem[];
  momosItems: OmfoItem[];
  burgerItems: OmfoItem[];
  shakesItems: OmfoItem[];
  chaapItems: OmfoItem[];
  chineseItems: OmfoItem[];
  otherItems: OmfoItem[];
}

export interface NewCartItem {
  cartItemId: number;
  itemId: number | string;
  name: string;
  perItemPrice: number;
  price: number;
  quantity: number;
  category: string;
  size: string;
  toppings: string[];
}

export interface Topping {
  name: string;
  price: number;
}

export interface OmfoItemSize {
  size: string;
  price: number;
  toppings?: Topping[];
}

export interface OmfoItem {
  itemId?: number | string;
  restaurantId?: number | string;
  name: string;
  description: string;
  category: 'PIZZA' | 'MOMO' | 'CHINESE' | 'BURGER' | 'SHAKE' | 'CHAAP' | 'OTHER';
  isAvailable: boolean;
  imageURL: string;
  sizes: OmfoItemSize[];
}
