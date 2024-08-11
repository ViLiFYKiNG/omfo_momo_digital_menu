import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { FoodService } from '../../services/food.service';

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
export class OutletSelectionPopupComponent implements OnInit {
  constructor(private foodService: FoodService) {}
  ngOnInit(): void {
    this.foodService.selectedValue$.subscribe((value: string) => {
      this.outlet = value;
    });
  }

  readonly dialogRef = inject(MatDialogRef<OutletSelectionPopupComponent>);

  outlet: string | null = null;

  onSubmit() {
    this.dialogRef.close(this.outlet);
  }

  onToggleOUTLET(outlet: string) {
    this.outlet = outlet;
  }
}
