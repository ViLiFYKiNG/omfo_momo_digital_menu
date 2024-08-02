import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DeliveryType } from '../../shared/modals';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
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

  deliveryType: DeliveryType = 'DELIVERY';

  message!: string;

  isError: boolean = false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.deliveryType === 'DELIVERY') {
      if (this.message !== '' && this.message !== undefined && this.message !== null) {
        this.dialogRef.close({ deliveryType: this.deliveryType, message: this.message });
      } else {
        this.isError = true;
        return;
      }
    } else {
      this.dialogRef.close({ deliveryType: this.deliveryType });
    }
  }

  onToggleDeliveryType(deliveryType: DeliveryType) {
    this.deliveryType = deliveryType;
    this.isError = false;
  }
}
