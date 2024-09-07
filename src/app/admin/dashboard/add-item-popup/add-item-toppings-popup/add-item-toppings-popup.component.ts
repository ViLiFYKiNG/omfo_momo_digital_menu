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
    MatDialogClose,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
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
    console.log('***');
    this.toppingsForm = this.fb.group({
      toppings: this.fb.array([this.createSizeField()]),
    });
  }

  readonly dialogRef = inject(MatDialogRef<AddItemPopupComponent>);

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
    console.log(index);
    if (this.toppings.length > 1) {
      this.toppings.removeAt(index);
    }
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
