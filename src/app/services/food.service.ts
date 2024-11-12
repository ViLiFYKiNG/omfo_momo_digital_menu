import { Injectable, signal } from '@angular/core';
import {
  OMFO_MOMO_ITEMS,
  PIZZA_ITEMS,
  MOMO_ITEMS,
  CHINESE_ITEM,
} from '../../data';
import {
  CartItem,
  ChineseItem,
  MomoItem,
  OmfoItem,
  OmfoMomoItems,
  PizzaItem,
} from '../shared/modals';
import { map, Subject } from 'rxjs';
import { DataStorageService } from '../admin/services/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  public items = signal<OmfoItem[]>([]);

  public isFetching = signal<boolean>(false);

  public error = signal<string | null>(null);
  
  public itemAddedSuccessFully = new Subject<null>();

  cartItems: CartItem[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  public getAll() {
    this.isFetching.set(true);
    this.dataStorageService
      .fetchItems()
      .pipe(
        map((response: Record<string, any> | null) => {
          return (
            response &&
            Object.keys(response).map((itemId) => ({
              itemId,
              ...response[itemId],
            }))
          );
        })
      )
      .subscribe({
        next: (response: OmfoItem[] | null) => {
          console.log('KING');
          console.log(response);
          if (response) this.items.set(response);
          else this.items.set([]);
        },
        complete: () => {
          console.log('KING COMPLETE');
          this.isFetching.set(false);

          console.log(this.items());
        },
        error: (error) => {
          console.log('Error fetching items:', error);
          console.log(error.message);
          this.error.set(error.message);
          this.isFetching.set(false);
        },
      });
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

    this.itemAddedSuccessFully.next(null);
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
