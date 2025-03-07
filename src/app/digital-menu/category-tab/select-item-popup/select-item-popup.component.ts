/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
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
import {
  NewCartItem,
  OmfoItem,
  OmfoItemSize,
  Topping,
} from '../../../shared/modals';

@Component({
  selector: 'app-select-item-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './select-item-popup.component.html',
  styleUrl: './select-item-popup.component.scss',
})
export class SelectItemPopupComponent {
  readonly dialogRef = inject(MatDialogRef<SelectItemPopupComponent>);

  readonly selectedItem = inject<OmfoItem>(MAT_DIALOG_DATA);

  public itemSizes: OmfoItemSize[] = this.selectedItem.sizes;

  public selectedItemSize = this.itemSizes.at(0);

  public selectedToppings: string[] = [];

  public size = this.itemSizes.at(0)?.size;

  priceForOneSelectedItem: number = 0;

  cartItem: NewCartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.selectedItem.itemId!,
    name: this.selectedItem.name,
    perItemPrice: this.itemSizes.at(0)?.price!,
    price: this.itemSizes.at(0)?.price!,
    quantity: 1,
    category: this.selectedItem.category,
    size: this.size!,
    toppings: [],
  };

  onClose(): void {
    this.dialogRef.close();
  }

  onToggleSize(itemSize: OmfoItemSize) {
    this.size = itemSize.size;
    this.cartItem.size = itemSize.size;

    this.selectedItemSize = itemSize;

    this.cartItem.size = itemSize.size;
    this.cartItem.perItemPrice = itemSize.price;

    this.cartItem.price = itemSize.price * this.cartItem.quantity;

    this.selectedToppings = [];
    this.cartItem.toppings = [];
  }

  onToggleTopping(topping: Topping): void {
    const index = this.selectedToppings.indexOf(topping.name);
    if (index === -1) {
      this.selectedToppings.push(topping.name);
      this.cartItem.perItemPrice += topping.price;
    } else {
      this.selectedToppings.splice(index, 1);
      this.cartItem.perItemPrice -= topping.price;
    }

    this.refreshPrice();
    this.cartItem.toppings = this.selectedToppings;
  }

  getTotalPrice() {
    return this.cartItem.price;
  }

  getCartItemQuantity() {
    return this.cartItem.quantity;
  }

  refreshPrice() {
    this.cartItem.price = this.cartItem.perItemPrice * this.cartItem.quantity;
  }

  increaseQuantity() {
    this.cartItem.quantity += 1;
    this.refreshPrice();
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.refreshPrice();
    }
  }
}
