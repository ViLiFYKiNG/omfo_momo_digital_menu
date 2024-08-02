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
import { CartItem, ChineseItem, ChineseSizeType } from '../../shared/modals';

@Component({
  selector: 'app-chinese-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chinese-popup.component.html',
  styleUrl: './chinese-popup.component.scss',
})
export class ChinesePopupComponent {
  readonly dialogRef = inject(MatDialogRef<ChinesePopupComponent>);

  readonly chineseItem = inject<ChineseItem>(MAT_DIALOG_DATA);

  priceForOneChineseItem: number = this.chineseItem.price.half;

  size: ChineseSizeType = 'half';

  cartItem: CartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.chineseItem.itemId,
    name: this.chineseItem.name,
    perItemPrice: this.chineseItem.price.half,
    price: this.chineseItem.price.half,
    quantity: 1,
    itemType: this.chineseItem.itemType,
    size: this.size,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onToggleSize(size: ChineseSizeType) {
    this.size = size;
    this.cartItem.size = size;
    this.priceForOneChineseItem = this.chineseItem['price'][this.size];
    this.cartItem.perItemPrice = this.priceForOneChineseItem;
    this.cartItem.price = this.priceForOneChineseItem * this.cartItem.quantity;
  }

  getMomoPrice(size: ChineseSizeType) {
    return this.chineseItem.price[size];
  }

  getTotalPrice() {
    return this.cartItem.price;
  }

  getCartItemQuantity() {
    return this.cartItem.quantity;
  }

  increaseQuantity() {
    this.cartItem.quantity += 1;
    this.cartItem.price = this.priceForOneChineseItem * this.cartItem.quantity;
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.cartItem.price =
        this.priceForOneChineseItem * this.cartItem.quantity;
    }
  }
}
