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
import { CartItem, ShakeItem, ShakeSizeType } from '../../shared/modals';

@Component({
  selector: 'app-shake-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shake-popup.component.html',
  styleUrl: './shake-popup.component.scss',
})
export class ShakePopupComponent {
  readonly dialogRef = inject(MatDialogRef<ShakePopupComponent>);

  readonly shakeItem = inject<ShakeItem>(MAT_DIALOG_DATA);

  priceForOneShakeItem: number = this.shakeItem.price;

  size: ShakeSizeType = 'regular';

  cartItem: CartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.shakeItem.itemId,
    name: this.shakeItem.name,
    perItemPrice: this.shakeItem.price,
    price: this.shakeItem.price,
    quantity: 1,
    itemType: this.shakeItem.itemType,
    size: this.size,
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTotalPrice() {
    return this.cartItem.price;
  }

  getCartItemQuantity() {
    return this.cartItem.quantity;
  }

  increaseQuantity() {
    this.cartItem.quantity += 1;
    this.cartItem.price = this.priceForOneShakeItem * this.cartItem.quantity;
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.cartItem.price = this.priceForOneShakeItem * this.cartItem.quantity;
    }
  }
}
