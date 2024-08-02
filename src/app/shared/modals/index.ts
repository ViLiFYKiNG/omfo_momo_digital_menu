export type PizzaSizeType = 'small' | 'medium' | 'large';
export type MomoSizeType = 'half' | 'full';
export type ChineseSizeType = 'half' | 'full';
export type DeliveryType = 'PICKUP' | 'DELIVERY';

export interface OrderType {
  deliveryType: DeliveryType;
  message?: string;
}
export interface PizzaPrice {
  small: number;
  medium: number;
  large: number;
}
export interface PizzaItem {
  itemId: number;
  name: string;
  quantity: number;
  imagePath: string;
  description: string;
  itemType: string;
  price: PizzaPrice;
}

export interface MomoItem {
  itemId: number;
  name: string;
  quantity: number;
  imagePath: string;
  description: string;
  itemType: string;
  price: {
    half: number;
    full: number;
  };
}

export interface ChineseItem {
  itemId: number;
  name: string;
  quantity: number;
  imagePath: string;
  description: string;
  itemType: string;
  price: {
    half: number;
    full: number;
  };
}

export interface OmfoMomoItems {
  pizzaItems: PizzaItem[];
  momosItems: MomoItem[];
  chineseItems: ChineseItem[];
}

export interface CartItem {
  cartItemId: number;
  itemId: number;
  name: string;
  perItemPrice: number;
  price: number;
  quantity: number;
  itemType: string;
  size?: string;
  withExtraCheese?: boolean;
  withCheeseBurst?: boolean;
}
