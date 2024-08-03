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
import { BurgerItem, BurgerSizeType, CartItem } from '../../shared/modals';

@Component({
  selector: 'app-burger-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './burger-popup.component.html',
  styleUrl: './burger-popup.component.scss',
})
export class BurgerPopupComponent {
  readonly dialogRef = inject(MatDialogRef<BurgerPopupComponent>);

  readonly burgerItem = inject<BurgerItem>(MAT_DIALOG_DATA);

  priceForOneBurgerItem: number = this.burgerItem.price;

  size: BurgerSizeType = 'regular';

  cartItem: CartItem = {
    cartItemId: new Date().getTime(),
    itemId: this.burgerItem.itemId,
    name: this.burgerItem.name,
    perItemPrice: this.burgerItem.price,
    price: this.burgerItem.price,
    quantity: 1,
    itemType: this.burgerItem.itemType,
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
    this.cartItem.price = this.priceForOneBurgerItem * this.cartItem.quantity;
  }

  decreaseQuantity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity -= 1;
      this.cartItem.price = this.priceForOneBurgerItem * this.cartItem.quantity;
    }
  }
}
