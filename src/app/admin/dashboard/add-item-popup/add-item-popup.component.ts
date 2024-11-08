import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CATEGORYTYPES } from '../../../shared/constants';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AddItemToppingsPopupComponent } from './add-item-toppings-popup/add-item-toppings-popup.component';
import { Topping } from '../../../shared/modals';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-item-popup',
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
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './add-item-popup.component.html',
  styleUrl: './add-item-popup.component.scss',
})
export class AddItemPopupComponent implements OnInit {
  sizeForm!: FormGroup;

  selectedIndex: number = -1;

  ngOnInit(): void {
    console.log('***');
    this.sizeForm = this.fb.group({
      name: [''],
      description: [''],
      restaurantId: [''],
      imageUrl: [''],
      category: ['PIZZA'],
      isPublished: [false],
      sizes: this.fb.array([this.createSizeField()]),
    });
  }

  readonly dialogRef = inject(MatDialogRef<AddItemPopupComponent>);

  readonly CATEGORYTYPES: { cNAME: string; cVALUE: string }[] = CATEGORYTYPES;

  constructor(private fb: FormBuilder) {}

  getToppings(index: number): FormArray {
    return this.sizes.at(index).get('toppings') as FormArray;
  }

  isSizeValid(index: number): boolean {
    return this.sizes.at(index).valid;
  }

  addToppings(index: number, toppings: Topping[]) {
    const toppingsArray = this.getToppings(index);
    toppingsArray.clear();

    toppings.forEach((topping: Topping) => {
      toppingsArray.push(
        this.fb.group({
          name: [topping.name],
          price: [topping.price],
        })
      );
    });

    this.selectedIndex = -1;
    console.log(toppingsArray.value);
    console.log(this.sizeForm.value);
  }

  get sizes(): FormArray {
    return this.sizeForm.get('sizes') as FormArray;
  }

  addSizeField() {
    this.sizes.push(this.createSizeField());
  }

  createSizeField(): FormGroup {
    return this.fb.group({
      size: ['', Validators.required],
      price: ['', Validators.required],
      toppings: this.fb.array([]),
    });
  }

  removeSizeField(index: number) {
    console.log(index);
    if (this.sizes.length > 1) {
      this.sizes.removeAt(index);
    }
  }

  readonly dialog = inject(MatDialog);

  public addToppingPopUp(index: number): void {
    this.selectedIndex = index;
    const dialogRef = this.dialog.open(AddItemToppingsPopupComponent, {
      data: this.getToppings(index),
    });
    dialogRef.afterClosed().subscribe((toppings: Topping[]) => {
      if (toppings) {
        console.log('...***---');
        console.log(toppings);

        if (this.selectedIndex !== -1) {
          this.addToppings(this.selectedIndex, toppings);
        }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.sizeForm.valid);
    console.log(this.sizeForm.value);

    return;
    this.dialogRef.close('KING AB');
  }
}
