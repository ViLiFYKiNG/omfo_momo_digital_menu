import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { DeliveryType } from '../../../shared/modals';

@Component({
  selector: 'app-checkout-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './checkout-popup.component.html',
  styleUrl: './checkout-popup.component.scss',
})
export class CheckoutPopupComponent {
  readonly dialogRef = inject(MatDialogRef<CheckoutPopupComponent>);

  readonly orderAmount = inject<number>(MAT_DIALOG_DATA);

  deliveryType: DeliveryType = 'DELIVERY';

  message: string = '';

  name: string = '';

  isError: boolean = false;

  isNameError: boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onNameChange() {
    this.isNameError = this.name.trim() === '';
  }

  onADDChange() {
    this.isError = this.message.trim() === '';
  }

  onSubmit() {
    if (this.name.trim() === '') {
      this.isNameError = true;
      this.isError =
        this.deliveryType === 'DELIVERY' && this.message.trim() === '';
      return;
    }
    if (this.deliveryType === 'DELIVERY') {
      if (
        this.message !== '' &&
        this.message !== undefined &&
        this.message !== null
      ) {
        this.dialogRef.close({
          deliveryType: this.deliveryType,
          message: this.message,
          name: this.name,
        });
      } else {
        this.isError = true;
        return;
      }
    } else {
      this.dialogRef.close({
        deliveryType: this.deliveryType,
        name: this.name,
      });
    }
  }

  onToggleDeliveryType(deliveryType: DeliveryType) {
    this.deliveryType = deliveryType;
    this.isError = false;
  }

  getRemainingAmount() {
    return 300 - (this.orderAmount ?? 0);
  }
}
