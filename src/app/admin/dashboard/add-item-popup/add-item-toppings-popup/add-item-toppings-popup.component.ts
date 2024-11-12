import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddItemPopupComponent } from '../add-item-popup.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-item-toppings-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './add-item-toppings-popup.component.html',
  styleUrl: './add-item-toppings-popup.component.scss',
})
export class AddItemToppingsPopupComponent {
  toppingsForm!: FormGroup;

  ngOnInit(): void {
    this.toppingsForm = this.fb.group({
      toppings: this.fb.array([]),
    });
    if (this.inputTopplings.value.length) {
      this.inputTopplings.value.forEach((topping: any) => {
        this.toppings.push(
          this.fb.group({
            name: [topping.name, Validators.required],
            price: [topping.price, Validators.required],
          })
        );
      });
    } else {
      this.addToppingField();
    }
  }

  readonly dialogRef = inject(MatDialogRef<AddItemPopupComponent>);

  readonly inputTopplings = inject<FormArray>(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder) {}

  createSizeField(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get toppings(): FormArray {
    return this.toppingsForm.get('toppings') as FormArray;
  }

  addToppingField() {
    this.toppings.push(this.createSizeField());
  }

  removeToppingField(index: number) {
    this.toppings.removeAt(index);
  }

  onSubmit(): void {
    if (this.toppingsForm.valid) {
      this.dialogRef.close(this.toppingsForm.value.toppings);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
