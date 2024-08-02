import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CartItem, PizzaItem, PizzaSizeType } from '../../shared/modals';
import { EXTRA_PRICE } from '../../shared/constants';

@Component({
  selector: 'app-pizza-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './pizza-popup.component.html',
  styleUrl: './pizza-popup.component.scss',
})
export class PizzaPopupComponent {
  readonly dialogRef = inject(MatDialogRef<PizzaPopupComponent>);

  readonly pizzItem = inject<PizzaItem>(MAT_DIALOG_DATA);

  priceForOnePizza: number = this.pizzItem.price.small;

  size: PizzaSizeType = 'small';

  isExtraCheese: boolean = false;

  isCheeseBurst: boolean = false;

  cartItem: CartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.pizzItem.itemId,
    name: this.pizzItem.name,
    perItemPrice: this.pizzItem.price.small,
    price: this.pizzItem.price.small,
    quantity: 1,
    itemType: this.pizzItem.itemType,
    size: this.size,
    withExtraCheese: false,
    withCheeseBurst: false,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onToggleSize(size: PizzaSizeType) {
    this.size = size;
    this.cartItem.size = size;
    this.priceForOnePizza = this.pizzItem['price'][this.size];
    if (this.isExtraCheese)
      this.priceForOnePizza += EXTRA_PRICE[size].EXTRA_CHEESE;
    if (this.isCheeseBurst)
      this.priceForOnePizza += EXTRA_PRICE[size].CHEESE_BURST;

    this.cartItem.perItemPrice = this.priceForOnePizza;
    this.cartItem.price = this.priceForOnePizza * this.cartItem.quantity;
  }

  onToggleExtraCheese() {
    this.isExtraCheese = !this.isExtraCheese;
    this.cartItem.withExtraCheese = this.isExtraCheese;
    if (this.isExtraCheese)
      this.priceForOnePizza += EXTRA_PRICE[this.size].EXTRA_CHEESE;
    else this.priceForOnePizza -= EXTRA_PRICE[this.size].EXTRA_CHEESE;

    this.cartItem.perItemPrice = this.priceForOnePizza;
    this.cartItem.price = this.priceForOnePizza * this.cartItem.quantity;
  }

  onToggleCheeseBurst() {
    this.isCheeseBurst = !this.isCheeseBurst;
    this.cartItem.withCheeseBurst = this.isCheeseBurst;
    if (this.isCheeseBurst)
      this.priceForOnePizza += EXTRA_PRICE[this.size].CHEESE_BURST;
    else this.priceForOnePizza -= EXTRA_PRICE[this.size].CHEESE_BURST;

    this.cartItem.perItemPrice = this.priceForOnePizza;
    this.cartItem.price = this.priceForOnePizza * this.cartItem.quantity;
  }

  getExtraCheesePrice() {
    return EXTRA_PRICE[this.size].EXTRA_CHEESE;
  }

  getCheeseBurstPrice() {
    return EXTRA_PRICE[this.size].CHEESE_BURST;
  }

  getPizzaPrice(size: PizzaSizeType) {
    return this.pizzItem.price[size];
  }

  getTotalPrice() {
    return this.cartItem.price;
  }

  getCartItemQuantity() {
    return this.cartItem.quantity;
  }

  increaseQuantity() {
    this.cartItem.quantity += 1;
    this.cartItem.price = this.priceForOnePizza * this.cartItem.quantity;
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.cartItem.price = this.priceForOnePizza * this.cartItem.quantity;
    }
  }
}
