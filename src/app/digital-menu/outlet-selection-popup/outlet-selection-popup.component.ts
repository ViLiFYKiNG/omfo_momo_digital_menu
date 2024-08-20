import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { FoodService } from '../../services/food.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-outlet-selection-popup',
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
    MatSelectModule,
  ],
  templateUrl: './outlet-selection-popup.component.html',
  styleUrl: './outlet-selection-popup.component.scss',
})
export class OutletSelectionPopupComponent {
  private foodService = inject(FoodService);

  outlet = '';

  constructor() {
    effect(() => {
      this.outlet = this.foodService.outlet();
    });
  }

  readonly dialogRef = inject(MatDialogRef<OutletSelectionPopupComponent>);

  onSubmit() {
    this.dialogRef.close(this.outlet);
  }

  onToggleOUTLET(value: string) {
    this.outlet = value;
  }
}
