import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  BurgerItem,
  BurgerSizeType,
  CartItem,
  MomoItem,
  MomoSizeType,
  PizzaItem,
  PizzaSizeType,
  ShakeItem,
  ShakeSizeType,
} from '../../shared/modals';
import { EXTRA_PRICE, ITEMTYPES } from '../../shared/constants';

@Component({
  selector: 'app-select-item-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './select-item-popup.component.html',
  styleUrl: './select-item-popup.component.scss',
})
export class SelectItemPopupComponent implements OnInit {
  ngOnInit(): void {
    console.log('onInit');
    console.log(this.selectedItem);

    if (this.selectedItem.itemType === ITEMTYPES.PIZZA) {
      this.priceForOneSelectedItem = (
        this.selectedItem as PizzaItem
      ).price.small;
      this.size = 'small';
    } else if (this.selectedItem.itemType === ITEMTYPES.MOMO) {
      this.priceForOneSelectedItem = (this.selectedItem as MomoItem).price.half;
      this.size = 'half';
    } else {
      this.priceForOneSelectedItem = (
        this.selectedItem as BurgerItem | ShakeItem
      ).price;
      this.size = 'regular';
    }

    this.cartItem.perItemPrice = this.priceForOneSelectedItem;
    this.cartItem.price = this.priceForOneSelectedItem;
  }

  readonly dialogRef = inject(MatDialogRef<SelectItemPopupComponent>);

  readonly selectedItem = inject<PizzaItem | MomoItem | BurgerItem | ShakeItem>(
    MAT_DIALOG_DATA
  );

  priceForOneSelectedItem: number = 0;

  size: PizzaSizeType | MomoSizeType | BurgerSizeType | ShakeSizeType = 'small';

  isExtraCheese: boolean = false;

  isCheeseBurst: boolean = false;

  cartItem: CartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.selectedItem.itemId,
    name: this.selectedItem.name,
    perItemPrice: 0,
    price: 0,
    quantity: 1,
    itemType: this.selectedItem.itemType,
    size: this.size,
    withExtraCheese: false,
    withCheeseBurst: false,
  };

  onClose(): void {
    this.dialogRef.close();
  }

  onToggleSize(
    size: PizzaSizeType | MomoSizeType | BurgerSizeType | ShakeSizeType
  ) {
    this.size = size;
    this.cartItem.size = size;

    if (this.selectedItem.itemType === ITEMTYPES.PIZZA) {
      this.priceForOneSelectedItem = (this.selectedItem as PizzaItem)['price'][
        this.size as PizzaSizeType
      ];
      if (this.isExtraCheese)
        this.priceForOneSelectedItem +=
          EXTRA_PRICE[size as PizzaSizeType].EXTRA_CHEESE;
      if (this.isCheeseBurst)
        this.priceForOneSelectedItem +=
          EXTRA_PRICE[size as PizzaSizeType].CHEESE_BURST;
    } else if (this.selectedItem.itemType === ITEMTYPES.MOMO) {
      this.priceForOneSelectedItem = (this.selectedItem as MomoItem)['price'][
        this.size as MomoSizeType
      ];
    } else {
      this.priceForOneSelectedItem = (
        this.selectedItem as BurgerItem | ShakeItem
      ).price;
    }

    this.cartItem.perItemPrice = this.priceForOneSelectedItem;
    this.cartItem.price = this.priceForOneSelectedItem * this.cartItem.quantity;
  }

  onToggleExtraCheese() {
    this.isExtraCheese = !this.isExtraCheese;
    this.cartItem.withExtraCheese = this.isExtraCheese;
    if (this.isExtraCheese)
      this.priceForOneSelectedItem +=
        EXTRA_PRICE[this.size as PizzaSizeType].EXTRA_CHEESE;
    else
      this.priceForOneSelectedItem -=
        EXTRA_PRICE[this.size as PizzaSizeType].EXTRA_CHEESE;

    this.cartItem.perItemPrice = this.priceForOneSelectedItem;
    this.cartItem.price = this.priceForOneSelectedItem * this.cartItem.quantity;
  }

  onToggleCheeseBurst() {
    this.isCheeseBurst = !this.isCheeseBurst;
    this.cartItem.withCheeseBurst = this.isCheeseBurst;
    if (this.isCheeseBurst)
      this.priceForOneSelectedItem +=
        EXTRA_PRICE[this.size as PizzaSizeType].CHEESE_BURST;
    else
      this.priceForOneSelectedItem -=
        EXTRA_PRICE[this.size as PizzaSizeType].CHEESE_BURST;

    this.cartItem.perItemPrice = this.priceForOneSelectedItem;
    this.cartItem.price = this.priceForOneSelectedItem * this.cartItem.quantity;
  }

  getExtraCheesePrice() {
    return EXTRA_PRICE[this.size as PizzaSizeType].EXTRA_CHEESE;
  }

  getCheeseBurstPrice() {
    return EXTRA_PRICE[this.size as PizzaSizeType].CHEESE_BURST;
  }

  getPriceForSize(size: PizzaSizeType | MomoSizeType): number {
    if (this.selectedItem.itemType === ITEMTYPES.PIZZA) {
      return (this.selectedItem as PizzaItem)['price'][size as PizzaSizeType];
    }
    return (this.selectedItem as MomoItem)['price'][size as MomoSizeType];
  }

  getTotalPrice() {
    return this.cartItem.price;
  }

  getCartItemQuantity() {
    return this.cartItem.quantity;
  }

  increaseQuantity() {
    this.cartItem.quantity += 1;
    this.cartItem.price = this.priceForOneSelectedItem * this.cartItem.quantity;
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.cartItem.price =
        this.priceForOneSelectedItem * this.cartItem.quantity;
    }
  }
}
