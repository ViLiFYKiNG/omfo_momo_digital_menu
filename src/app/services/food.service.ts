import { Injectable, signal } from '@angular/core';
import { NewCartItem, OmfoItem } from '../shared/modals';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { DataStorageService } from '../admin/services/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  public items = signal<OmfoItem[]>([]);

  activeCategory: string | null = 'Pizza';

  public isFetching = signal<boolean>(false);

  public error = signal<string | null>(null);

  public itemAddedSuccessFully = new Subject<null>();

  public newCartItems: NewCartItem[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  public getAll(restaurant_id: number): Observable<OmfoItem[]> {
    console.log('***');
    console.log(restaurant_id);
    this.isFetching.set(true);

    return this.dataStorageService.fetchItems().pipe(
      map((response: Record<string, any> | null) => {
        if (response) {
          return Object.keys(response)
            .map((itemId) => ({
              itemId,
              ...response[itemId],
            }))
            .filter((item) => {
              return (
                item.restaurantId.toString() === restaurant_id.toString() &&
                item.isAvailable
              );
            });
        } else {
          return [];
        }
      }),
      tap((items) => {
        console.log('&&&');
        console.log(items);
        this.items.set(items || []);
        this.isFetching.set(false);
      }),
      catchError((error) => {
        this.error.set(error.message);
        this.isFetching.set(false);
        return of([]);
      })
    );
  }

  public getAllCartItems() {
    return this.newCartItems;
  }

  private areToppingsEqual(
    toppingArray_1: string[],
    toppingArray_2: string[]
  ): boolean {
    if (toppingArray_1.length !== toppingArray_2.length) return false;

    const sortedArr1 = toppingArray_1.slice().sort();
    const sortedArr2 = toppingArray_2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }

  updateCartNew(item: NewCartItem) {
    const index = this.newCartItems.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        this.areToppingsEqual(cartItem.toppings, item.toppings)
    );
    if (index > -1) {
      item.quantity = item.quantity + this.newCartItems[index].quantity;
      this.newCartItems[index] = { ...item };
    } else {
      this.newCartItems.push({ ...item });
    }

    this.itemAddedSuccessFully.next(null);
  }

  increaseItemQuantityInCartNew(item: NewCartItem) {
    const index = this.newCartItems.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        this.areToppingsEqual(cartItem.toppings, item.toppings)
    );

    if (index > -1) {
      this.newCartItems[index].quantity = item.quantity + 1;
    }
  }

  decreaseItemQuantityInCartNew(item: NewCartItem) {
    const index = this.newCartItems.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        this.areToppingsEqual(cartItem.toppings, item.toppings)
    );

    if (index > -1) {
      if (this.newCartItems[index].quantity > 1) {
        this.newCartItems[index].quantity =
          this.newCartItems[index].quantity - 1;
      } else {
        this.newCartItems.splice(index, 1);
      }
    }
  }

  clearCart() {
    this.newCartItems = [];
  }
}
