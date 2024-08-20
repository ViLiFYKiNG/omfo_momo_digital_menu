import { Injectable, signal } from '@angular/core';
import {
  OMFO_MOMO_ITEMS,
  PIZZA_ITEMS,
  MOMO_ITEMS,
  CHINESE_ITEM,
} from '../../data';
import { CartItem, ChineseItem, MomoItem, OmfoMomoItems, PizzaItem } from '../shared/modals';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  cartItems: CartItem[] = [];

  outlet = signal<string>('SITAPUR');

  constructor() {}

  setOutlet(value: string) {
    this.outlet.set(value);
  }

  getAll(): OmfoMomoItems {
    return OMFO_MOMO_ITEMS;
  }

  getAllCartItems() {
    return this.cartItems;
  }

  increaseQuantity(item: CartItem) {
    if (item.itemType === 'PIZZA') {
      PIZZA_ITEMS.forEach((pizzItem: PizzaItem) => {
        if (pizzItem.name === item.name) {
          pizzItem.quantity = (pizzItem.quantity || 0) + 1;
        }
      });
    }
    if (item.itemType === 'MOMO') {
      MOMO_ITEMS.forEach((momoItem: MomoItem) => {
        if (momoItem.name === item.name) {
          momoItem.quantity = (momoItem.quantity || 0) + 1;
        }
      });
    }
    if (item.itemType === 'CHINESE') {
      CHINESE_ITEM.forEach((chineseItem: ChineseItem) => {
        if (chineseItem.name === item.name) {
          chineseItem.quantity = (chineseItem.quantity || 0) + 1;
        }
      });
    }
    this.updateCart(item);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity && item.quantity > 0) {
      item.quantity--;
      this.decreaseItemQuantityInCart(item);
    }
  }

  updateCart(item: CartItem) {
    const index = this.cartItems.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        cartItem.withExtraCheese === item.withExtraCheese &&
        cartItem.withCheeseBurst === item.withCheeseBurst
    );
    if (index > -1) {
      item.quantity = item.quantity + this.cartItems[index].quantity;
      this.cartItems[index] = { ...item };
    } else {
      this.cartItems.push({ ...item });
    }
  }

  increaseItemQuantityInCart(item: CartItem) {
    const index = this.cartItems.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        cartItem.withExtraCheese === item.withExtraCheese &&
        cartItem.withCheeseBurst === item.withCheeseBurst
    );

    if (index > -1) {
      this.cartItems[index].quantity = item.quantity + 1;
    }
  }

  decreaseItemQuantityInCart(item: CartItem) {
    const index = this.cartItems.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        cartItem.withExtraCheese === item.withExtraCheese &&
        cartItem.withCheeseBurst === item.withCheeseBurst
    );

    if (index > -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity = this.cartItems[index].quantity - 1;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }

  clearCart() {
    PIZZA_ITEMS.forEach((item: PizzaItem) => {
      item.quantity = 0;
    });
    MOMO_ITEMS.forEach((item: MomoItem) => {
      item.quantity = 0;
    });
    CHINESE_ITEM.forEach((item: ChineseItem) => {
      item.quantity = 0;
    });
    this.cartItems = [];
  }
}
