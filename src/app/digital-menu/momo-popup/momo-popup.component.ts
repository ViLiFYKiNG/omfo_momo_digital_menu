import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CartItem, MomoItem, MomoSizeType } from '../../shared/modals';

@Component({
  selector: 'app-momo-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './momo-popup.component.html',
  styleUrl: './momo-popup.component.scss',
})
export class MomoPopupComponent {
  readonly dialogRef = inject(MatDialogRef<MomoPopupComponent>);

  readonly momoItem = inject<MomoItem>(MAT_DIALOG_DATA);

  priceForOneMomo: number = this.momoItem.price.half;

  size: MomoSizeType = 'half';

  cartItem: CartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.momoItem.itemId,
    name: this.momoItem.name,
    perItemPrice: this.momoItem.price.half,
    price: this.momoItem.price.half,
    quantity: 1,
    itemType: this.momoItem.itemType,
    size: this.size,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onToggleSize(size: MomoSizeType) {
    this.size = size;
    this.cartItem.size = size;
    this.priceForOneMomo = this.momoItem['price'][this.size];
    this.cartItem.perItemPrice = this.priceForOneMomo;
    this.cartItem.price = this.priceForOneMomo * this.cartItem.quantity;
  }

  getMomoPrice(size: MomoSizeType) {
    return this.momoItem.price[size];
  }

  getTotalPrice() {
    return this.cartItem.price;
  }

  getCartItemQuantity() {
    return this.cartItem.quantity;
  }

  increaseQuantity() {
    this.cartItem.quantity += 1;
    this.cartItem.price = this.priceForOneMomo * this.cartItem.quantity;
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.cartItem.price = this.priceForOneMomo * this.cartItem.quantity;
    }
  }
}
